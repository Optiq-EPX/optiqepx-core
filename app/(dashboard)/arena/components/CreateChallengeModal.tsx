'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import { X, Users, Swords, Search, Send, Check, Lock, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { createClient } from '@/utils/supabase/client';
import { createBattle, sendInvite, abandonActiveBattles, updateBattle } from '../actions';
import { toast } from 'sonner';
import { getHighResAvatar } from '@/lib/utils';

export default function CreateChallengeModal({ isOpen, onClose, userClass, initialBattleId, initialTopic, initialMaxPlayers, initialStep = 1, currentUser }: { isOpen: boolean, onClose: () => void, userClass?: string, initialBattleId?: string | null, initialTopic?: string, initialMaxPlayers?: number, initialStep?: number, currentUser?: any }) {
  const [step, setStep] = useState(initialStep);
  const [maxPlayers, setMaxPlayers] = useState(initialMaxPlayers || 2);
  const [topic, setTopic] = useState(initialTopic || '');
  const [loading, setLoading] = useState(false);
  const [battleId, setBattleId] = useState<string | null>(initialBattleId || null);
  const [classmates, setClassmates] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [invitedIds, setInvitedIds] = useState<string[]>([]);
  const [isDraft, setIsDraft] = useState(false);
  const [password, setPassword] = useState('');
  const [mounted, setMounted] = useState(false);
  const [isFetchingClassmates, setIsFetchingClassmates] = useState(false);
  
  const supabase = createClient();
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setStep(initialStep);
      setBattleId(initialBattleId || null);
      if (initialTopic) setTopic(initialTopic);
      if (initialMaxPlayers) setMaxPlayers(initialMaxPlayers);
    }
  }, [isOpen, initialStep, initialBattleId]);

  useEffect(() => {
    if (step === 2 && isOpen && currentUser?.id) {
      fetchClassmates();
    }
  }, [step, isOpen, userClass, currentUser?.id]);

  const fetchClassmates = async () => {
    if (!currentUser?.id) return;
    setIsFetchingClassmates(true);

    try {
      let myClass = userClass;
      if (!myClass) {
        const { data: profile } = await supabase
          .from('users')
          .select('class')
          .eq('id', currentUser.id)
          .maybeSingle();
        if (profile) myClass = profile.class;
      }

      let { data: users, error } = await supabase
        .from('users')
        .select('id, username, avatar_url, class')
        .neq('id', currentUser.id)
        .limit(100);

      if (error || !users || users.length === 0) {
        const { data: up, error: upErr } = await supabase
          .from('users_profile')
          .select('id, username, avatar_url, class')
          .neq('id', currentUser.id)
          .limit(100);
        
        if (up) users = up;
      }

      if (users && users.length > 0) {
        const sameClass = users.filter(u => u.class && myClass && u.class.toLowerCase() === myClass.toLowerCase());
        const others = users.filter(u => !u.class || !myClass || u.class.toLowerCase() !== myClass.toLowerCase());
        setClassmates([...sameClass, ...others]);
      } else {
        setClassmates([]);
      }
    } catch (err: any) {
      console.error('rivals loading error:', err);
    } finally {
      setIsFetchingClassmates(false);
    }
  };

  const handleUpdate = async () => {
    if (!battleId) return;
    setLoading(true);
    try {
      await updateBattle(battleId, topic, maxPlayers);
      toast.success('Battle updated!');
      setStep(2);
    } catch (error: any) {
      toast.error(error.message || 'Failed to update battle');
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async () => {
    if (!topic) {
      toast.error('Please enter a topic');
      return;
    }
    setLoading(true);
    try {
      const battle = await createBattle(topic, maxPlayers, isDraft ? 'draft' : 'waiting', isDraft ? password : undefined);
      setBattleId(battle.id);
      setStep(2);
      toast.success(isDraft ? 'Draft battle created! Invite your squad.' : 'Battle created! Now invite players.');
    } catch (error: any) {
      if (error.message?.includes('already have an active battle')) {
        toast.error(error.message, {
          duration: 10000,
          action: {
            label: 'Abandon & Start New',
            onClick: async () => {
              try {
                await abandonActiveBattles();
                handleCreate();
              } catch (e: any) {
                toast.error('Failed to abandon: ' + (e.message || 'Unknown error'));
              }
            }
          }
        });
      } else {
        toast.error(error.message || 'Failed to create battle');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (step === 2 && isOpen && search.length > 2) {
      setIsFetchingClassmates(true);
      const delayDebounceFn = setTimeout(async () => {
        if (!currentUser?.id) return;

        try {
          let { data, error } = await supabase
            .from('users')
            .select('id, username, avatar_url, class')
            .ilike('username', `%${search}%`)
            .neq('id', currentUser.id)
            .limit(15);
          
          if (error || !data || data.length === 0) {
            const { data: up } = await supabase
              .from('users_profile')
              .select('id, username, avatar_url, class')
              .ilike('username', `%${search}%`)
              .neq('id', currentUser.id)
              .limit(15);
            if (up) data = up;
          }
          
          if (data && data.length > 0) {
            setClassmates(prev => {
              const userMap = new Map();
              prev.forEach(u => userMap.set(u.id, u));
              data!.forEach(u => userMap.set(u.id, u));
              return Array.from(userMap.values());
            });
          }
        } finally {
          setIsFetchingClassmates(false);
        }
      }, 300);

      return () => clearTimeout(delayDebounceFn);
    } else if (step === 2 && isOpen && search.length === 0) {
      fetchClassmates();
    }
  }, [search, step, isOpen, currentUser?.id]);

  const handleInvite = async (userId: string) => {
    if (!battleId) return;
    try {
      await sendInvite(battleId, userId);
      setInvitedIds(prev => [...prev, userId]);
      toast.success('Invite sent!');
    } catch (error) {
      toast.error('Failed to send invite');
    }
  };

  const filteredClassmates = classmates.filter(c => {
    const name = c.username || 'Mystery Competitor';
    const searchStr = name.toLowerCase();
    return searchStr.includes(search.toLowerCase()) && c.id !== currentUser?.id;
  });

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />
          
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 30 }}
            className="relative w-full max-w-lg bg-white dark:bg-slate-950 rounded-[3rem] border border-white/10 shadow-[0_32px_128px_-16px_rgba(0,0,0,0.5)] overflow-hidden"
          >
            <div className="p-8 border-b border-black/5 dark:border-white/5 flex justify-between items-center bg-black/2 dark:bg-white/2">
              <div>
                <h2 className="text-2xl font-space-grotesk font-black tracking-tight">
                  {step === 1 ? (isDraft ? 'Draft Academy Duel' : 'Create Challenge') : 'Invite Players'}
                </h2>
                <p className="text-sm text-muted-foreground font-medium">
                  {step === 1 ? 'Configure your battle arena' : 'Gather your competitors'}
                </p>
              </div>
              <Button variant="ghost" size="icon" onClick={onClose} className="rounded-2xl hover:bg-rose-500/10 hover:text-rose-500 w-11 h-11">
                <X className="w-5 h-5" />
              </Button>
            </div>

            <div className="p-8">
              {step === 1 ? (
                <div className="space-y-8">
                  <div className="flex items-center justify-between p-4 rounded-3xl bg-black/2 dark:bg-white/5 border border-dashed border-black/10 dark:border-white/10">
                    <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${isDraft ? 'bg-indigo-500/10 text-indigo-500' : 'bg-rose-500/10 text-rose-500'}`}>
                            <Users className="w-5 h-5" />
                        </div>
                        <div>
                            <span className="block text-[11px] font-black uppercase tracking-widest">Private Draft</span>
                            <span className="text-[10px] text-muted-foreground font-bold">Invite-only, hidden from Arena</span>
                        </div>
                    </div>
                    <Button 
                        size="sm"
                        variant={isDraft ? 'default' : 'outline'}
                        onClick={() => setIsDraft(!isDraft)}
                        className={`rounded-xl px-5 h-9 font-black text-[10px] uppercase tracking-wider transition-all ${isDraft ? 'bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-500/20 text-white' : 'border-black/10 dark:border-white/10'}`}
                    >
                        {isDraft ? 'Enabled' : 'Enable'}
                    </Button>
                  </div>
                  
                  <AnimatePresence>
                    {isDraft && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="space-y-4 overflow-hidden"
                      >
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground pl-1">Battle Password (Optional)</label>
                        <div className="relative">
                          <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-indigo-500" />
                          <Input
                            type="password"
                            placeholder="Set a secret code..."
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="pl-14 h-14 rounded-2xl bg-indigo-500/5 border-indigo-500/20 font-bold focus:border-indigo-500/40 focus:ring-indigo-500/10 transition-all"
                          />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="space-y-4">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground pl-1">Max Battle Size</label>
                    <div className="flex gap-3">
                      {[2, 3, 4, 5].map(num => (
                        <Button
                          key={num}
                          variant={maxPlayers === num ? 'default' : 'outline'}
                          onClick={() => setMaxPlayers(num)}
                          className={`flex-1 h-14 rounded-2xl font-black text-sm transition-all ${maxPlayers === num ? 'bg-rose-600 text-white shadow-lg shadow-rose-500/20' : 'border-black/5 dark:border-white/5 hover:bg-black/2 dark:hover:bg-white/5'}`}
                        >
                          {num}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground pl-1">Battle Topic</label>
                    <div className="relative">
                      <Swords className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-rose-500" />
                      <Input
                        placeholder="e.g. Quantum Physics, React, History"
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                        className="pl-14 h-14 rounded-2xl bg-black/3 dark:bg-white/5 border-black/10 dark:border-white/10 font-bold focus:border-rose-500/30 transition-all"
                      />
                    </div>
                    <div className="flex flex-wrap gap-2 pt-1">
                      {['Math', 'History', 'Sci-Fi', 'Pop Culture', 'Coding'].map(t => (
                        <Badge
                          key={t}
                          variant="secondary"
                          className={`cursor-pointer transition-all py-2 px-4 rounded-xl font-black text-[10px] uppercase tracking-wider ${topic === t ? 'bg-rose-600 text-white' : 'hover:bg-rose-500/10 hover:text-rose-600'}`}
                          onClick={() => setTopic(t)}
                        >
                          {t}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <Button
                    onClick={initialBattleId ? handleUpdate : handleCreate}
                    disabled={loading || !topic}
                    className="w-full h-16 rounded-2xl bg-linear-to-r from-rose-600 to-orange-500 text-white font-black uppercase tracking-[0.2em] text-xs shadow-xl shadow-rose-500/25 mt-4 group"
                  >
                    {loading ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <>
                        {initialBattleId ? 'Update Arena Details' : 'Next: Summon Players'}
                        <Check className="w-4 h-4 ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </>
                    )}
                  </Button>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground opacity-40" />
                    <Input
                      placeholder="Search for competitors..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      className="pl-11 h-12 rounded-xl bg-black/2 dark:bg-white/5 border-black/5 dark:border-white/5 font-bold"
                    />
                  </div>

                  <div className="max-h-64 overflow-y-auto space-y-3 pr-2 custom-scrollbar">
                    {isFetchingClassmates ? (
                      <div className="py-16 text-center space-y-4">
                        <Loader2 className="w-8 h-8 animate-spin mx-auto text-rose-500/50" />
                        <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground opacity-40">Searching the Database...</p>
                      </div>
                    ) : (
                      <>
                        {filteredClassmates.map(classmate => (
                          <div key={classmate.id} className="flex items-center justify-between p-4 rounded-2xl bg-black/2 dark:bg-white/5 border border-black/5 dark:border-white/5 group hover:border-violet-500/30 transition-all">
                            <div className="flex items-center gap-4">
                              <div className="w-11 h-11 rounded-xl bg-linear-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-black text-xs shadow-md overflow-hidden">
                                {(() => {
                                  const name = classmate.username || 'Competitor';
                                  const avatar = getHighResAvatar(classmate.avatar_url);
                                  return avatar ? (
                                    <img src={avatar} className="w-full h-full object-cover" alt={name} />
                                  ) : (
                                    name.charAt(0).toUpperCase()
                                  );
                                })()}
                              </div>
                              <div>
                                <span className="block font-black text-sm leading-none">{classmate.username || 'Mystery Competitor'}</span>
                                <span className="text-[9px] uppercase font-black text-muted-foreground opacity-40 tracking-widest mt-1 block">
                                  {classmate.class ? `${classmate.class} Classmate` : 'Rival Competitor'}
                                </span>
                              </div>
                            </div>
                            <Button
                              size="sm"
                              disabled={invitedIds.includes(classmate.id)}
                              onClick={() => handleInvite(classmate.id)}
                              className={`rounded-xl font-black text-[9px] uppercase tracking-widest h-9 px-5 transition-all ${invitedIds.includes(classmate.id) ? 'bg-green-500/10 text-green-500 hover:bg-green-500/10' : 'bg-rose-600 hover:bg-rose-700 shadow-md shadow-rose-500/10'}`}
                            >
                              {invitedIds.includes(classmate.id) ? (
                                <span className="flex items-center gap-1.5"><Check className="w-3 h-3" /> Sent</span>
                              ) : (
                                <span className="flex items-center gap-1.5"><Send className="w-3 h-3" /> Summon</span>
                              )}
                            </Button>
                          </div>
                        ))}
                        {filteredClassmates.length === 0 && (
                          <div className="py-16 text-center space-y-4">
                            <div className="w-16 h-16 rounded-full bg-black/5 dark:bg-white/5 flex items-center justify-center mx-auto opacity-20">
                                <Users className="w-8 h-8" />
                            </div>
                            <p className="text-sm font-outfit font-black text-muted-foreground opacity-40 uppercase tracking-widest">
                              No rivals found
                            </p>
                          </div>
                        )}
                      </>
                    )}
                  </div>

                  <div className="flex gap-4 pt-4">
                    <Button
                      variant="outline"
                      onClick={onClose}
                      className="flex-1 h-14 rounded-2xl font-black uppercase tracking-widest text-[10px] border-black/10 dark:border-white/10"
                    >
                      Done
                    </Button>
                    <Button
                      onClick={() => {
                        if (battleId) {
                          router.push(`/arena?battle=${battleId}`);
                        }
                        onClose();
                      }}
                      className="flex-1 h-14 rounded-2xl bg-slate-900 dark:bg-white text-white dark:text-slate-950 font-black uppercase tracking-widest text-[10px] shadow-xl shadow-black/10"
                    >
                      Enter Lobby
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}
