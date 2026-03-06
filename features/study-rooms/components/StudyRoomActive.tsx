'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Brain, Users, Clock, Send, Lightbulb } from 'lucide-react';
import { toast } from 'sonner';

type PresenceUser = { id: string; username: string };

export function StudyRoomActive({ 
  roomId, 
  topic, 
  hostName, 
  userProfile 
}: { 
  roomId: string, 
  topic: string, 
  hostName: string, 
  userProfile: any 
}) {
  const supabase = createClient();
  const [participants, setParticipants] = useState<PresenceUser[]>([]);
  const [activeQuiz, setActiveQuiz] = useState<any>(null);
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    
    const channel = supabase.channel(`room:${roomId}`, {
      config: { presence: { key: userProfile.id } },
    });

    channel
      .on('presence', { event: 'sync' }, () => {
        const state = channel.presenceState();
        const users = Object.values(state).flatMap((s) => s) as unknown as PresenceUser[];
        
        const uniqueUsers = Array.from(new Map(users.map(item => [item.id, item])).values());
        setParticipants(uniqueUsers);
      })
      .on('presence', { event: 'join' }, ({ key, newPresences }) => {
        toast.info(`${newPresences[0]?.username || 'A student'} joined the room`);
      })
      .on('presence', { event: 'leave' }, ({ key, leftPresences }) => {
        toast.info(`${leftPresences[0]?.username || 'A student'} left the room`);
      })
      .subscribe(async (status) => {
        if (status === 'SUBSCRIBED') {
          await channel.track({ id: userProfile.id, username: userProfile.username });
        }
      });

    const timer = setInterval(() => {
      setElapsedTime(prev => prev + 1);
    }, 1000);

    const quizTimer = setInterval(() => {
       toast('Surprise Pop Quiz!', { icon: '🧠', description: 'Generating a question...' });
       fetch('/api/ai/quiz', {
         method: 'POST',
         body: JSON.stringify({ topic, classLevel: userProfile.class, questionCount: 1 })
       })
       .then(res => res.json())
       .then(data => {
          if (data.questions && data.questions.length > 0) {
            setActiveQuiz(data.questions[0]);
          }
       });
    }, 60000); 

    return () => {
      channel.unsubscribe();
      clearInterval(timer);
      clearInterval(quizTimer);
    };
  }, [roomId, supabase, userProfile, topic]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-full">
      {}
      <div className="col-span-1 lg:col-span-3 flex flex-col gap-6">
        <Card className="bg-gradient-to-br from-blue-900/20 to-blue-800/10 border-blue-500/20 backdrop-blur-md">
          <CardHeader className="flex flex-row items-center justify-between pb-4 border-b border-white/5">
            <div>
              <CardTitle className="text-2xl font-space-grotesk text-blue-500">{topic} Study Session</CardTitle>
              <CardDescription>Hosted by {hostName}</CardDescription>
            </div>
            <div className="flex items-center gap-2 bg-black/40 px-4 py-2 rounded-full border border-white/10">
              <Clock className="w-4 h-4 text-blue-400" />
              <span className="font-mono text-lg">{formatTime(elapsedTime)}</span>
            </div>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col items-center justify-center min-h-[400px]">
            {activeQuiz ? (
              <div className="w-full max-w-xl mx-auto space-y-6 bg-card/80 p-8 rounded-2xl border border-blue-500/30 shadow-2xl animate-in slide-in-from-bottom-8">
                <div className="flex items-center gap-2 text-blue-500 mb-2">
                  <Lightbulb className="w-5 h-5" />
                  <span className="font-space-grotesk font-semibold uppercase tracking-wider text-sm">Pop Quiz</span>
                </div>
                <h3 className="text-xl font-space-grotesk">{activeQuiz.text}</h3>
                <div className="space-y-3">
                  {activeQuiz.options.map((opt: string, idx: number) => (
                    <Button 
                      key={idx} 
                      variant="outline" 
                      className="w-full justify-start py-6 text-left hover:bg-blue-500/10 hover:border-blue-500/50"
                      onClick={() => {
                        if (idx === activeQuiz.correctAnswerIndex) {
                          toast.success('Correct! Brilliant work.');
                        } else {
                          toast.error('Not quite. Keep studying!');
                        }
                        setActiveQuiz(null); 
                      }}
                    >
                       <span className="text-blue-500 font-mono mr-4">{String.fromCharCode(65 + idx)}</span>
                       {opt}
                    </Button>
                  ))}
                </div>
                <Button variant="ghost" className="w-full mt-4 text-muted-foreground" onClick={() => setActiveQuiz(null)}>Dismiss Quiz</Button>
              </div>
            ) : (
              <div className="text-center space-y-4 opacity-60">
                <Brain className="w-16 h-16 mx-auto text-blue-400 opacity-50" />
                <h3 className="text-2xl font-space-grotesk font-medium">Focus Time</h3>
                <p className="font-outfit text-muted-foreground max-w-md">The room is currently studying. An AI pop quiz will evaluate your knowledge soon.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {}
      <Card className="flex flex-col h-[500px] lg:h-full bg-card/40 border-white/5 backdrop-blur-md">
        <CardHeader className="pb-3 border-b border-white/5">
           <CardTitle className="flex items-center gap-2 text-lg font-space-grotesk">
             <Users className="w-5 h-5 text-blue-500" />
             Participants ({participants.length})
           </CardTitle>
        </CardHeader>
        <CardContent className="flex-1 p-0 overflow-hidden">
          <ScrollArea className="h-full w-full">
            <div className="p-4 space-y-2">
              {participants.map((p) => (
                <div key={p.id} className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/5">
                  <div className="w-8 h-8 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold uppercase text-xs">
                    {p.username.substring(0, 2)}
                  </div>
                  <span className="font-outfit text-sm font-medium">
                    {p.username} {p.id === userProfile.id && "(You)"}
                  </span>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}
