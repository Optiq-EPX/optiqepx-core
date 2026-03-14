'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Home, RotateCcw, ChevronRight, Check, X, Star, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';
import { getHighResAvatar } from '@/lib/utils';

export default function BattleResults({ players, currentUser, questions }: any) {
  const [showReview, setShowReview] = useState(false);
  const { width, height } = useWindowSize();
  const winner = players[0];
  const isWinner = winner?.user_id === currentUser.id;

  const xpRewards = [50, 35, 20, 10, 5];
  const myRank = players.findIndex((p: any) => p.user_id === currentUser.id);
  const myXP = xpRewards[myRank] || 0;

  return (
    <div className="max-w-4xl mx-auto space-y-12 pb-20">
      {isWinner && <Confetti width={width} height={height} numberOfPieces={200} recycle={false} gravity={0.1} colors={['#e11d48', '#f97316', '#fbbf24']} />}

      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-8"
      >
        <div className="relative inline-block">
            <motion.div 
                animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-32 h-32 rounded-[2.5rem] bg-linear-to-br from-amber-400 to-orange-600 flex items-center justify-center text-white shadow-2xl shadow-orange-500/40 relative z-10"
            >
                <Trophy className="w-16 h-16" />
            </motion.div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-orange-500/20 blur-3xl rounded-full" />
        </div>
        
        <div className="space-y-3">
            <h1 className="text-6xl font-space-grotesk font-black tracking-tighter">
                {isWinner ? "COLOSSAL VICTORY!" : "BATTLE ENDED"}
            </h1>
            <p className="text-xl font-outfit font-bold text-muted-foreground">
                {isWinner ? "You dominated the arena today!" : "Great effort in the arena!"}
            </p>
        </div>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-10">
          <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="glass-card p-10 rounded-[3rem] border-rose-500/20 shadow-2xl relative overflow-hidden h-full"
          >
              <div className="absolute top-0 right-0 p-8 opacity-5">
                  <Star className="w-40 h-40" />
              </div>
              <h3 className="text-2xl font-space-grotesk font-black mb-8 flex items-center gap-3">
                  <span className="w-10 h-10 rounded-xl bg-rose-500/10 flex items-center justify-center text-rose-600">
                    <Zap className="w-5 h-5 shrink-0" />
                  </span>
                  Your Performance
              </h3>
              
              <div className="grid grid-cols-2 gap-6">
                  <StatItem label="Rank" value={`#${myRank + 1}`} sub={`${players.length} Players`} />
                  <StatItem label="Score" value={players[myRank]?.score || 0} sub="Points" />
                  <StatItem label="Accuracy" value={Math.round(((players[myRank]?.correct_answers || 0) / questions.length) * 100) + '%'} sub={`${players[myRank]?.correct_answers || 0}/${questions.length}`} />
                  <StatItem label="XP Gained" value={`+${myXP}`} sub="Current Level" highlight />
              </div>
          </motion.div>

          <motion.div 
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="glass-card p-10 rounded-[3rem] border-white/60 dark:border-white/10 shadow-2xl h-full"
          >
              <h3 className="text-2xl font-space-grotesk font-black mb-8">Honor Roll</h3>
              <div className="space-y-4">
                  {players.slice(0, 3).map((player: any, i: number) => (
                      <div key={i} className={`flex items-center justify-between p-5 rounded-2xl border ${i === 0 ? 'bg-amber-500/10 border-amber-500/20' : 'bg-black/2 dark:bg-white/5 border-black/5 dark:border-white/10'}`}>
                          <div className="flex items-center gap-4">
                              <span className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-white overflow-hidden ${i === 0 ? 'bg-amber-500 shadow-lg shadow-amber-500/20' : i === 1 ? 'bg-slate-400' : i === 2 ? 'bg-orange-400' : 'bg-indigo-500'}`}>
                                  {(() => {
                                    const rawAvatar = player.users?.avatar_url || player.users?.image || player.users?.picture;
                                    const avatar = getHighResAvatar(rawAvatar);
                                    return avatar ? (
                                      <img src={avatar} className="w-full h-full object-cover" alt={player.users.username} />
                                    ) : (
                                      player.users?.username?.charAt(0).toUpperCase()
                                    );
                                  })()}
                              </span>
                              <div>
                                  <span className="block font-black text-sm">{player.users?.username}</span>
                                  <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground opacity-50">{i === 0 ? 'Champion' : i === 1 ? 'Runner Up' : '3rd Place'}</span>
                              </div>
                          </div>
                          <span className="text-xl font-black font-space-grotesk">{player.score}</span>
                      </div>
                  ))}
              </div>
          </motion.div>
      </div>

      <div className="flex flex-col sm:flex-row gap-6">
          <Button 
            onClick={() => setShowReview(!showReview)}
            className="flex-1 h-20 rounded-3xl bg-white dark:bg-slate-900 border-2 border-rose-500/20 text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 font-black uppercase tracking-widest text-sm shadow-xl transition-all"
          >
            Review Answers
          </Button>
          <Link href="/arena" className="flex-1">
            <Button className="w-full h-20 rounded-3xl bg-linear-to-r from-rose-600 to-orange-500 text-white font-black uppercase tracking-widest text-sm shadow-2xl shadow-rose-500/30 gap-4 group">
                Back to Arena
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
      </div>

      <AnimatePresence>
          {showReview && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-6 pt-10"
              >
                  <h3 className="text-2xl font-space-grotesk font-black mb-6">Quest Review</h3>
                  <div className="grid gap-6">
                      {questions.map((q: any, i: number) => (
                          <div key={i} className="glass-card p-8 rounded-[2rem] border-white/60 dark:border-white/10 space-y-4">
                              <div className="flex gap-4 items-start">
                                  <span className="w-10 h-10 rounded-xl bg-black dark:bg-slate-900 text-white flex items-center justify-center shrink-0 font-black text-xs">{i + 1}</span>
                                  <p className="font-bold text-lg leading-tight pt-1">{q.question}</p>
                              </div>
                              <div className="grid sm:grid-cols-2 gap-3 pl-14">
                                  <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20 text-green-600">
                                      <span className="block text-[8px] font-black uppercase tracking-widest mb-1 opacity-60">Correct Answer</span>
                                      <div className="flex items-center gap-2 font-black text-sm">
                                          <Check className="w-4 h-4" /> {q.correct_answer}
                                      </div>
                                  </div>
                              </div>
                          </div>
                      ))}
                  </div>
              </motion.div>
          )}
      </AnimatePresence>
    </div>
  );
}

function StatItem({ label, value, sub, highlight }: any) {
    return (
        <div className={`p-6 rounded-3xl bg-black/2 dark:bg-white/5 border border-black/5 dark:border-white/10 ${highlight ? 'bg-rose-500/5 border-rose-500/20' : ''}`}>
            <span className="block text-[10px] font-black uppercase tracking-[2px] text-muted-foreground opacity-50 mb-2">{label}</span>
            <div className={`text-4xl font-space-grotesk font-black tracking-tighter ${highlight ? 'text-rose-600' : 'text-foreground'}`}>
                {value}
            </div>
            <span className="text-[10px] font-bold text-muted-foreground opacity-40">{sub}</span>
        </div>
    );
}
