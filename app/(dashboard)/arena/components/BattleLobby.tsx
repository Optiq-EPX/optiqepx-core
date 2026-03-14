'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, Swords, Crown, Shield, Loader2, Play, UserPlus, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { createClient } from '@/utils/supabase/client';
import { startBattle, publishBattle, toggleReady } from '../actions';
import { getHighResAvatar } from '@/lib/utils';
import CreateChallengeModal from './CreateChallengeModal';
import { toast } from 'sonner';

export default function BattleLobby({ battleId, currentUser }: { battleId: string, currentUser: any }) {
  const [battle, setBattle] = useState<any>(null);
  const [players, setPlayers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [starting, setStarting] = useState(false);
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [togglingReady, setTogglingReady] = useState(false);
  const [language, setLanguage] = useState<'english' | 'bengali'>('english');
  const [publishing, setPublishing] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    fetchBattleData();

    const playersChannel = supabase
      .channel(`battle_players_${battleId}`)
      .on('postgres_changes', { 
        event: '*', 
        schema: 'public', 
        table: 'battle_players', 
        filter: `battle_id=eq.${battleId}` 
      }, (payload) => {
        if (payload.eventType === 'UPDATE') {
           setPlayers(prev => prev.map(p => p.id === payload.new.id ? { ...p, is_ready: payload.new.is_ready } : p));
        } else {
           fetchPlayers();
        }
      })
      .subscribe();

    const battleChannel = supabase
      .channel(`battle_${battleId}`)
      .on('postgres_changes', { 
        event: 'UPDATE', 
        schema: 'public', 
        table: 'battles', 
        filter: `id=eq.${battleId}` 
      }, (payload) => {
        setBattle(payload.new);
      })
      .subscribe();

    return () => {
      supabase.removeChannel(playersChannel);
      supabase.removeChannel(battleChannel);
    };
  }, [battleId]);

  const fetchBattleData = async () => {
    const { data: b } = await supabase.from('battles').select('*, users:owner_id(username, avatar_url)').eq('id', battleId).single();
    setBattle(b);
    fetchPlayers();
    setLoading(false);
  };

  const fetchPlayers = async () => {
    const { data: p } = await supabase
      .from('battle_players')
      .select('*, users(username, avatar_url)')
      .eq('battle_id', battleId);
    setPlayers(p || []);
  };

  const handleStart = async () => {
    if (players.length < 2) {
      toast.error('Need at least 2 players to start');
      return;
    }
    setStarting(true);
    try {
      await startBattle(battleId, language);
      toast.success('AI is generating questions... Game starting soon!');
    } catch (error) {
      toast.error('Failed to start battle');
      setStarting(false);
    }
  };

  const handlePublish = async () => {
    setPublishing(true);
    try {
      await publishBattle(battleId);
      toast.success('Battle is now public in the Arena!');
    } catch (error) {
      toast.error('Failed to publish battle');
    } finally {
      setPublishing(false);
    }
  };

  const handleToggleReady = async () => {
    const me = players.find(p => p.user_id === currentUser?.id);
    if (!me || me.user_id === battle?.owner_id) return;

    const newReadyState = !me.is_ready;
    
    setPlayers(prev => prev.map(p => 
      p.user_id === currentUser?.id ? { ...p, is_ready: newReadyState } : p
    ));

    try {
        await toggleReady(battleId, newReadyState);
    } catch (error) {
        setPlayers(prev => prev.map(p => 
          p.user_id === currentUser?.id ? { ...p, is_ready: !newReadyState } : p
        ));
        toast.error('Failed to update status');
    }
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center py-32 space-y-6">
      <Loader2 className="w-12 h-12 text-rose-500 animate-spin" />
      <p className="font-outfit font-black text-xs uppercase tracking-[0.3em] opacity-40">Initializing Lobby...</p>
    </div>
  );

  const isOwner = battle?.owner_id === currentUser.id;
  const isDraft = battle?.status === 'draft';

  return (
    <div className="max-w-4xl mx-auto space-y-12">
      <div className="text-center space-y-4">
        {isDraft && (
            <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 text-[10px] font-black uppercase tracking-widest mb-4"
            >
                <Shield className="w-3 h-3" /> Private Academy Duel
            </motion.div>
        )}
        <div className="flex justify-center -space-x-4 mb-4">
            {players.map((p, i) => {
              const isMe = p.user_id === currentUser?.id;
              const rawAvatar = isMe ? (currentUser?.user_metadata?.avatar_url || p.users?.avatar_url) : (p.users?.avatar_url);
              const avatar = getHighResAvatar(rawAvatar);
              return (
                <motion.div 
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: i * 0.1 }}
                    key={p.id} 
                    className="w-16 h-16 rounded-2xl border-4 border-white dark:border-slate-950 bg-linear-to-br from-rose-500 to-orange-500 flex items-center justify-center text-white font-black text-xl shadow-xl overflow-hidden"
                >
                    {avatar ? <img src={avatar} className="w-full h-full object-cover" alt={p.users?.username} /> : p.users?.username?.charAt(0).toUpperCase()}
                </motion.div>
              );
            })}
            {Array.from({ length: Math.max(0, (battle?.max_players || 0) - players.length) }).map((_, i) => (
                <div key={i} className="w-16 h-16 rounded-2xl border-4 border-white/20 dark:border-white/5 bg-black/5 dark:bg-white/5 flex items-center justify-center text-muted-foreground/30 border-dashed">
                    <Users className="w-6 h-6" />
                </div>
            ))}
        </div>
        <h1 className="text-5xl font-space-grotesk font-black tracking-tight text-foreground">
          {battle?.topic} <span className="bg-linear-to-r from-rose-600 to-orange-500 bg-clip-text text-transparent">Arena</span>
        </h1>
        <p className="text-muted-foreground font-outfit font-semibold flex items-center justify-center gap-3">
            <span className={`px-3 py-1 rounded-xl border text-xs font-black uppercase tracking-widest text-[10px] ${isDraft ? 'bg-indigo-500/10 border-indigo-500/20 text-indigo-600' : 'bg-violet-500/10 border-violet-500/20 text-violet-600'}`}>
                {isDraft ? 'Draft Session' : 'Lobby'}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-black/20 dark:bg-white/20" />
            <span className="text-sm opacity-70">Waiting for players ({players.length}/{battle?.max_players})</span>
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="glass-card p-8 rounded-[3rem] border-white/60 dark:border-white/10 shadow-2xl space-y-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-space-grotesk font-black text-xl tracking-tight flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-rose-500/10 flex items-center justify-center text-rose-500">
                    <Users className="w-4 h-4" />
                </div>
                Player Feed
            </h3>
            <Badge className="rounded-lg bg-green-500/10 text-green-500 border-0 font-black px-3 py-1 uppercase tracking-wider text-[10px]">Realtime</Badge>
          </div>
          <div className="space-y-4">
            {players.map((player) => {
              const isMe = player.user_id === currentUser?.id;
              const rawAvatar = isMe ? (currentUser?.user_metadata?.avatar_url || player.users?.avatar_url) : (player.users?.avatar_url);
              const avatar = getHighResAvatar(rawAvatar);
              return (
                <motion.div 
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  key={player.id} 
                  className="flex items-center justify-between p-5 rounded-3xl bg-black/2 dark:bg-white/5 border border-black/5 dark:border-white/5 group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-linear-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-black overflow-hidden shadow-md">
                      {avatar ? (
                        <img src={avatar} className="w-full h-full object-cover" alt={player.users?.username} />
                      ) : (
                        player.users?.username?.charAt(0).toUpperCase()
                      )}
                    </div>
                    <div>
                      <span className="block font-black text-sm tracking-tight">{player.users?.username}</span>
                      <span className="text-[10px] uppercase font-black tracking-widest text-muted-foreground opacity-50">Student</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {player.user_id === battle?.owner_id ? (
                      <Badge className="rounded-xl bg-amber-500/10 text-amber-600 border-amber-500/20 font-black px-3 py-1 uppercase tracking-[1.5px] text-[8px] flex gap-1.5 items-center">
                        <Crown className="w-3 h-3" /> Master
                      </Badge>
                    ) : (
                      <Badge className={`rounded-xl font-black px-3 py-1 uppercase tracking-[1.5px] text-[8px] flex gap-1.5 items-center ${player.is_ready ? 'bg-green-500/10 text-green-600 border-green-500/20' : 'bg-slate-500/10 text-slate-500 border-slate-500/10'}`}>
                        {player.is_ready ? <><Check className="w-3 h-3" /> Ready</> : 'Waiting'}
                      </Badge>
                    )}
                  </div>
                </motion.div>
              );
            })}
            {Array.from({ length: Math.max(0, (battle?.max_players || 0) - players.length) }).map((_, i) => (
              <motion.div
                key={`empty-${i}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center justify-between p-5 rounded-3xl bg-black/1 dark:bg-white/2 border border-dashed border-black/10 dark:border-white/10"
              >
                <div className="flex items-center gap-4 text-muted-foreground/30">
                  <div className="w-12 h-12 rounded-xl border border-dashed border-current flex items-center justify-center">
                    <UserPlus className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] uppercase font-black tracking-widest italic">Awaiting Rival...</span>
                </div>
                {isOwner && (
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    onClick={() => setIsInviteModalOpen(true)}
                    className="rounded-xl h-9 px-4 font-black text-[9px] uppercase tracking-widest text-rose-500 hover:bg-rose-500/10 border border-rose-500/20"
                  >
                    Invite
                  </Button>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        <div className="space-y-8">
            {isDraft && isOwner && (
                <div className="glass-card p-8 rounded-[3rem] border-indigo-500/20 bg-indigo-500/5 shadow-xl space-y-4">
                    <div className="flex items-center gap-3 text-indigo-600">
                        <Users className="w-5 h-5" />
                        <h4 className="font-space-grotesk font-black text-lg">Draft Mode Active</h4>
                    </div>
                    <p className="text-xs font-outfit font-bold text-muted-foreground leading-relaxed">
                        This battle is currently <span className="text-indigo-600">private</span>. Only players you invite can join. You can make it public to allow anyone in your class to join.
                    </p>
                    <Button 
                        onClick={handlePublish}
                        disabled={publishing}
                        variant="outline"
                        className="w-full h-12 rounded-2xl border-indigo-500/30 text-indigo-600 hover:bg-indigo-50 font-black uppercase tracking-widest text-[10px]"
                    >
                        {publishing ? 'Publishing...' : 'Make Battle Public'}
                    </Button>
                </div>
            )}

            <div className="glass-card p-8 rounded-[3rem] bg-linear-to-br from-rose-500/5 to-orange-500/5 border-rose-500/20 shadow-xl space-y-6">
                <h4 className="font-space-grotesk font-black text-lg text-orange-600">Battle Strategy</h4>
                <ul className="space-y-4">
                    {[
                        'Quick thinking: 10-15s per question',
                        'Total 10 AI-generated questions',
                        'Fast answers earn bonus points',
                        'Climb the leaderboard in real-time'
                    ].map((rule, i) => (
                        <li key={i} className="flex gap-3 text-sm font-outfit font-bold items-center text-muted-foreground">
                            <Shield className="w-4 h-4 text-rose-500 shrink-0" />
                            {rule}
                        </li>
                    ))}
                </ul>

                {isOwner && (
                    <div className="flex flex-col gap-3 pt-6 border-t border-black/5 dark:border-white/5">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground pl-1 text-center">Questions Language</label>
                        <div className="flex gap-2">
                            <Button
                                variant={language === 'english' ? 'default' : 'outline'}
                                onClick={() => setLanguage('english')}
                                className={`flex-1 h-10 rounded-xl font-black text-[10px] uppercase tracking-wider transition-all ${language === 'english' ? 'bg-rose-600 text-white shadow-lg' : 'border-black/5 dark:border-white/5'}`}
                            >
                                English
                            </Button>
                            <Button
                                variant={language === 'bengali' ? 'default' : 'outline'}
                                onClick={() => setLanguage('bengali')}
                                className={`flex-1 h-10 rounded-xl font-black text-[10px] uppercase tracking-wider transition-all ${language === 'bengali' ? 'bg-rose-600 text-white shadow-lg' : 'border-black/5 dark:border-white/5'}`}
                            >
                                Bengali (বাংলা)
                            </Button>
                        </div>
                    </div>
                )}

                {!isOwner && (
                    <div className="pt-6 border-t border-black/5 dark:border-white/5">
                        <Button
                            onClick={handleToggleReady}
                            disabled={togglingReady}
                            className={`w-full h-14 rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] shadow-xl transition-all ${players.find(p => p.user_id === currentUser?.id)?.is_ready ? 'bg-green-600 text-white shadow-green-500/20' : 'bg-slate-900 text-white dark:bg-white dark:text-slate-950 shadow-black/20'}`}
                        >
                            {togglingReady ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : players.find(p => p.user_id === currentUser?.id)?.is_ready ? (
                                <span className="flex items-center gap-2"><Check className="w-4 h-4" /> You're Ready!</span>
                            ) : (
                                "Signal Ready"
                            )}
                        </Button>
                    </div>
                )}
            </div>

            {isOwner ? (
                <Button
                    onClick={handleStart}
                    disabled={starting || players.length < 2 || players.some(p => p.user_id !== battle?.owner_id && !p.is_ready)}
                    className="w-full h-20 rounded-3xl bg-linear-to-r from-rose-600 to-orange-500 hover:from-rose-700 hover:to-orange-600 disabled:opacity-50 disabled:grayscale text-white font-black uppercase tracking-[4px] text-sm shadow-2xl shadow-rose-500/30 gap-4 group transition-all"
                >
                    {starting ? (
                        <>
                            <Loader2 className="w-6 h-6 animate-spin" />
                            Generating Quiz...
                        </>
                    ) : ( 
                        <>
                            <Play className="w-6 h-6 fill-current group-hover:scale-110 transition-transform" />
                            {players.some(p => p.user_id !== battle?.owner_id && !p.is_ready) ? 'Waiting for Rivals' : 'Ignite Battle'}
                        </>
                    )}
                </Button>
            ) : (
                <div className="p-8 rounded-[2.5rem] bg-black/5 dark:bg-white/5 border border-dashed border-black/10 dark:border-white/10 text-center space-y-4">
                    <Loader2 className="w-8 h-8 mx-auto animate-spin text-muted-foreground opacity-50" />
                    <p className="text-sm font-outfit font-bold text-muted-foreground italic">Waiting for Battle Owner to start the quest...</p>
                </div>
            )}
        </div>
      </div>
      <CreateChallengeModal 
        isOpen={isInviteModalOpen} 
        onClose={() => setIsInviteModalOpen(false)} 
        initialBattleId={battleId}
        initialStep={2}
        currentUser={currentUser}
      />
    </div>
  );
}
