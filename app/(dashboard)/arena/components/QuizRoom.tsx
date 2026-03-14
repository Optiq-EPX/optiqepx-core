'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Timer, Trophy, Check, X, Shield, Clock, Rocket } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { createClient } from '@/utils/supabase/client';
import { submitAnswer, finishBattle } from '../actions';
import { toast } from 'sonner';
import QuestionCard from './QuestionCard';
import Leaderboard from './Leaderboard';
import BattleResults from './BattleResults';

export default function QuizRoom({ battleId, currentUser }: { battleId: string, currentUser: any }) {
  const [questions, setQuestions] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15);
  const [status, setStatus] = useState<'playing' | 'finished'>('playing');
  const [answersState, setAnswersState] = useState<Record<number, { selectedOption: string | null, hasAnswered: boolean }>>({});
  const [players, setPlayers] = useState<any[]>([]);
  
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const supabase = createClient();

  const fetchQuestions = async () => {
    const { data } = await supabase
      .from('quiz_questions')
      .select('*')
      .eq('battle_id', battleId)
      .order('order_index', { ascending: true });
    setQuestions(data || []);
  };

  const fetchPlayers = async () => {
    const { data } = await supabase
      .from('battle_players')
      .select('*, users(username, avatar_url)')
      .eq('battle_id', battleId)
      .order('score', { ascending: false });
    setPlayers(data || []);
  };

  useEffect(() => {
    fetchQuestions();
    fetchPlayers();
    
    const channel = supabase
      .channel(`battle_game_${battleId}`)
      .on('postgres_changes', { 
        event: '*', 
        schema: 'public', 
        table: 'battle_players',
        filter: `battle_id=eq.${battleId}`
      }, (payload) => {
          if (payload.eventType === 'UPDATE') {
              const updatedPlayer = payload.new as any;
              setPlayers(prev => {
                  const exists = prev.some(p => p.user_id === updatedPlayer.user_id);
                  if (!exists) {
                      fetchPlayers();
                      return prev;
                  }
                  const newList = prev.map(p => 
                      p.user_id === updatedPlayer.user_id 
                      ? { ...p, score: updatedPlayer.score, correct_answers: updatedPlayer.correct_answers } 
                      : p
                  );
                  return newList.sort((a, b) => (b.score || 0) - (a.score || 0));
              });
          } else {
              fetchPlayers();
          }
      })
      .on('postgres_changes', {
        event: 'UPDATE',
        schema: 'public',
        table: 'battles',
        filter: `id=eq.${battleId}`
      }, (payload) => {
          if (payload.new.status === 'finished') setStatus('finished');
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [battleId]);

  useEffect(() => {
    if (status === 'playing' && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      handleNext();
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [timeLeft, status]);

  const handleAnswer = async (option: string) => {
    const currentAnswerState = answersState[currentIndex] || { selectedOption: null, hasAnswered: false };
    if (currentAnswerState.hasAnswered) return;
    
    const newState = { selectedOption: option, hasAnswered: true };
    setAnswersState(prev => ({ ...prev, [currentIndex]: newState }));
    
    const isCorrect = option === questions[currentIndex].correct_answer;

    if (isCorrect) {
        setPlayers(prev => {
            const index = prev.findIndex(p => p.user_id === currentUser?.id);
            if (index !== -1) {
                const newList = [...prev];
                newList[index] = { 
                    ...newList[index], 
                    score: (newList[index].score || 0) + 10,
                    correct_answers: (newList[index].correct_answers || 0) + 1
                };
                return newList.sort((a, b) => (b.score || 0) - (a.score || 0));
            }
            return prev;
        });
    }
    
    try {
      await submitAnswer(battleId, questions[currentIndex].id, option, isCorrect);
      if (isCorrect) {
          toast.success('Correct! +10 XP', { icon: <Rocket className="w-4 h-4 text-green-500" /> });
      } else {
          toast.error('Ouch! Not quite.', { icon: <X className="w-4 h-4 text-rose-500" /> });
      }
    } catch (error) {
      toast.error('Failed to submit answer');
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      if (!answersState[currentIndex + 1]?.hasAnswered) {
        setTimeLeft(15);
      }
    } else {
      handleFinish();
    }
  };

  const handleFinish = async () => {
    setStatus('finished');
    const {data: battle} = await supabase.from('battles').select('status, owner_id').eq('id', battleId).single();
    if (battle?.status !== 'finished' && battle?.owner_id === currentUser.id) {
        await finishBattle(battleId);
    }
  };

  if (questions.length === 0) return (
      <div className="flex flex-col items-center justify-center py-32 space-y-6">
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 rounded-3xl border-4 border-rose-500/20 border-t-rose-500"
          />
          <p className="font-outfit font-black text-xs uppercase tracking-[0.4em] text-rose-600 animate-pulse">Forging Questions with AI...</p>
      </div>
  );

  if (status === 'finished') {
    return <BattleResults battleId={battleId} players={players} currentUser={currentUser} questions={questions} />;
  }

  const currentQuestion = questions[currentIndex];

  return (
    <div className="max-w-7xl mx-auto px-4">
      <div className="flex flex-col lg:grid lg:grid-cols-12 gap-10">
        <div className="lg:col-span-8 space-y-8">
            <div className="flex items-center justify-between bg-white/50 dark:bg-white/5 backdrop-blur-xl p-6 rounded-[2.5rem] border border-white/60 dark:border-white/10 shadow-xl">
                <div className="flex items-center gap-6">
                    <div className="w-14 h-14 rounded-2xl bg-black dark:bg-slate-900 flex flex-col items-center justify-center text-white border border-white/10">
                        <span className="text-[10px] font-black uppercase tracking-tighter opacity-50">Q</span>
                        <span className="text-xl font-black">{currentIndex + 1}</span>
                    </div>
                    <div>
                        <h2 className="font-space-grotesk font-black text-lg tracking-tight">Level 1 Knowledge</h2>
                        <div className="flex gap-1.5 mt-1">
                            {questions.map((_, i) => (
                                <div 
                                    key={i} 
                                    className={`h-1.5 rounded-full transition-all duration-500 ${i === currentIndex ? 'w-8 bg-rose-600' : i < currentIndex ? 'w-3 bg-green-500' : 'w-3 bg-black/10 dark:bg-white/10'}`} 
                                />
                            ))}
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-5">
                    <div className="hidden sm:flex flex-col items-end">
                        <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground opacity-60">Time Remaining</span>
                        <span className={`text-xl font-black font-space-grotesk ${timeLeft <= 5 ? 'text-rose-600 animate-pulse' : 'text-foreground'}`}>{timeLeft}s</span>
                    </div>
                    <div className="w-16 h-16 rounded-2xl border-4 border-black/5 dark:border-white/10 flex items-center justify-center relative">
                        <svg className="w-full h-full p-2 origin-center -rotate-90">
                            <circle
                                cx="50%" cy="50%" r="40%"
                                className="fill-none stroke-black/5 dark:stroke-white/5 stroke-[8px]"
                            />
                            <motion.circle
                                cx="50%" cy="50%" r="40%"
                                className="fill-none stroke-rose-600 stroke-[8px]"
                                strokeDasharray="100"
                                animate={{ strokeDashoffset: 100 - (timeLeft / 15) * 100 }}
                            />
                        </svg>
                        <Clock className="absolute w-5 h-5 text-rose-500" />
                    </div>
                </div>
            </div>

            <QuestionCard 
                question={currentQuestion} 
                onAnswer={handleAnswer} 
                hasAnswered={answersState[currentIndex]?.hasAnswered || false} 
                selectedOption={answersState[currentIndex]?.selectedOption || null}
            />

            <div className="flex items-center justify-between gap-6">
                <Button
                    variant="outline"
                    onClick={handlePrev}
                    disabled={currentIndex === 0}
                    className="h-16 px-10 rounded-2xl font-black font-outfit uppercase tracking-widest text-xs border-black/5 dark:border-white/10 bg-white/50 dark:bg-white/5 hover:bg-black/5 dark:hover:bg-white/10 transition-all disabled:opacity-20"
                >
                    Previous
                </Button>

                <div className="flex-1 h-px bg-linear-to-r from-transparent via-black/5 dark:via-white/10 to-transparent" />

                <Button
                    onClick={handleNext}
                    className={`h-16 px-10 rounded-2xl font-black font-outfit uppercase tracking-widest text-xs shadow-xl transition-all ${
                        (answersState[currentIndex]?.hasAnswered || timeLeft === 0) 
                        ? 'bg-rose-600 hover:bg-rose-700 text-white' 
                        : 'bg-black/5 dark:bg-white/10 text-muted-foreground'
                    }`}
                >
                    {currentIndex === questions.length - 1 ? 'Finish Duel' : 'Next Question'}
                </Button>
            </div>
        </div>

        <div className="lg:col-span-4 h-fit sticky top-8">
            <Leaderboard players={players} />
        </div>
      </div>
    </div>
  );
}
