'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Swords, PlusCircle, Trophy, Zap, ArrowRight, Loader2, Shield, Trash2, MoreVertical, Edit2, Eye, UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { createClient } from '@/utils/supabase/client';
import { fadeInUp, staggerContainer, cardHover } from '@/lib/animations';
import { getHighResAvatar } from '@/lib/utils';

import CreateChallengeModal from './components/CreateChallengeModal';
import NotificationPanel from './components/NotificationPanel';
import BattleLobby from './components/BattleLobby';
import QuizRoom from './components/QuizRoom';
import { joinBattle, deleteBattle } from './actions';
import { toast } from 'sonner';

export default function ArenaClient({ 
  userClass, 
  activeBattles: initialBattles,
  currentUser: initialUser
}: { 
  userClass: string | undefined; 
  activeBattles: any[] | null;
  currentUser: any;
}) {
  const searchParams = useSearchParams();
  const battleId = searchParams.get('battle');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(initialUser);
  const [battleState, setBattleState] = useState<any>(null);
  const [joiningBattle, setJoiningBattle] = useState<string | null>(null);
  const [activeBattles, setActiveBattles] = useState(initialBattles || []);
  const [editingBattle, setEditingBattle] = useState<any>(null);
  const supabase = createClient();
  const router = useRouter();

  useEffect(() => {
    let activeBattleSub: any;

    if (battleId) {
      fetchBattleStatus(battleId);
      
      activeBattleSub = supabase
        .channel(`current_battle_${battleId}`)
        .on('postgres_changes', {
          event: 'UPDATE',
          schema: 'public',
          table: 'battles',
          filter: `id=eq.${battleId}`
        }, (payload) => {
          setBattleState(payload.new);
        })
        .subscribe();
    }

    const channel = supabase
      .channel('arena_updates')
      .on('postgres_changes', { 
        event: '*', 
        schema: 'public', 
        table: 'battles'
      }, () => {
        refreshBattles();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
      if (activeBattleSub) supabase.removeChannel(activeBattleSub);
    };
  }, [battleId]);

  const fetchBattleStatus = async (id: string) => {
    const { data } = await supabase.from('battles').select('*').eq('id', id).single();
    setBattleState(data);
  };

  const refreshBattles = async () => {
    const { data } = await supabase
      .from('battles')
      .select('*, users:owner_id(username, avatar_url)')
      .in('status', ['draft', 'waiting', 'active', 'finished'])
      .order('created_at', { ascending: false })
      .limit(50);
    setActiveBattles(data || []);
  };

  const handleJoin = async (id: string) => {
    setJoiningBattle(id);
    try {
      await joinBattle(id);
      router.push(`/arena?battle=${id}`);
    } catch (error: any) {
      toast.error(error.message || 'Failed to join battle');
    } finally {
      setJoiningBattle(null);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteBattle(id);
      toast.success('Battle deleted');
      refreshBattles();
    } catch (error: any) {
      toast.error('Failed to delete battle');
    }
  };

  if (battleId) {
    if (!battleState) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center gap-4">
                <div className="relative">
                    <div className="w-16 h-16 rounded-3xl border-2 border-rose-500/20 animate-[spin_3s_linear_infinite]" />
                    <Loader2 className="w-8 h-8 animate-spin text-rose-500 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                </div>
                <p className="text-[10px] font-black uppercase tracking-[3px] text-muted-foreground opacity-50 animate-pulse ml-1">Entering Arena</p>
            </div>
        );
    }

    if (battleState.status === 'waiting' || battleState.status === 'draft') {
      return (
        <div className="min-h-screen py-10">
          <BattleLobby battleId={battleId} currentUser={currentUser} />
        </div>
      );
    }
    if (battleState.status === 'active' || battleState.status === 'finished') {
      return (
        <div className="min-h-screen py-10">
          <QuizRoom battleId={battleId} currentUser={currentUser} />
        </div>
      );
    }
  }

  return (
    <>
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="space-y-10"
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8 pb-8 border-b border-black/5 dark:border-white/5">
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 rounded-2xl bg-rose-500/10 dark:bg-rose-500/5 border border-rose-500/20 flex items-center justify-center text-rose-500 shadow-inner">
              <Swords className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-space-grotesk font-black tracking-tighter bg-linear-to-r from-rose-600 to-orange-500 bg-clip-text text-transparent">
                Battle Arena
              </h1>
              <p className="text-muted-foreground font-outfit mt-1 font-semibold flex items-center gap-3">
                <span className="px-3 py-1 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-600 text-xs font-black uppercase tracking-widest text-[10px]">
                  Class {userClass?.toUpperCase() || 'GENERAL'}
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-black/20 dark:bg-white/20" />
                <span className="text-sm opacity-70">Compete, dominate and climb the global leaderboard</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 w-full md:w-auto">
            <NotificationPanel currentUser={currentUser} />
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex-1 md:flex-none">
              <Button 
                  onClick={() => setIsModalOpen(true)}
                  className="w-full md:w-auto h-14 px-8 rounded-2xl font-black font-outfit uppercase tracking-widest text-xs bg-linear-to-r from-rose-600 to-orange-500 hover:from-rose-700 hover:to-orange-600 text-white border-0 shadow-lg shadow-rose-500/20 gap-3 group"
              >
                  <PlusCircle className="w-5 h-5 group-hover:rotate-90 transition-all duration-500" />
                  Create Challenge
              </Button>
            </motion.div>
          </div>
        </div>

        <motion.div 
          variants={staggerContainer}
          className="grid gap-8 md:grid-cols-3"
        >
          <ArenaStatCard 
            title="Battle MMR"
            value="1,250"
            label="Rank: Silver III"
            icon={<Trophy className="w-7 h-7 text-amber-500" />}
            color="from-amber-500/20 to-amber-600/10"
          />
          <ArenaStatCard 
            title="Matches Won"
            value="12"
            label="Win Rate: 68%"
            icon={<Swords className="w-7 h-7 text-rose-500" />}
            color="from-rose-500/20 to-rose-600/10"
          />
          <ArenaStatCard 
            title="Total XP"
            value={currentUser?.user_metadata?.xp || "0"}
            label="Top 5% in Class"
            icon={<Zap className="w-7 h-7 text-cyan-500" />}
            color="from-cyan-500/20 to-cyan-600/10"
          />
        </motion.div>

        <div className="space-y-16">
          {activeBattles.filter(b => b.owner_id === currentUser?.id && (b.status === 'draft' || b.status === 'waiting')).length > 0 && (
            <BattleSection 
              title="Manage My Duels" 
              icon={<Shield className="w-6 h-6 text-indigo-500" />}
              iconBg="bg-indigo-500/10"
              battles={activeBattles.filter(b => b.owner_id === currentUser?.id && (b.status === 'draft' || b.status === 'waiting'))}
              onJoin={handleJoin}
              onDelete={handleDelete}
              joiningId={joiningBattle}
              currentUser={currentUser}
              countLabel="Drafts & Waiting"
              setEditingBattle={setEditingBattle}
              setIsModalOpen={setIsModalOpen}
            />
          )}

          {activeBattles.filter(b => b.owner_id === currentUser?.id && b.status === 'active').length > 0 && (
            <BattleSection 
              title="My Live Duels" 
              icon={<Zap className="w-6 h-6 text-rose-500" />}
              iconBg="bg-rose-500/10"
              battles={activeBattles.filter(b => b.owner_id === currentUser?.id && b.status === 'active')}
              onJoin={handleJoin}
              joiningId={joiningBattle}
              currentUser={currentUser}
              setEditingBattle={setEditingBattle}
              setIsModalOpen={setIsModalOpen}
            />
          )}

          <BattleSection 
            title="Active Arena" 
            icon={<Swords className="w-6 h-6 text-orange-500" />}
            iconBg="bg-orange-500/10"
            battles={activeBattles.filter(b => b.owner_id !== currentUser?.id && b.status === 'waiting')}
            onJoin={handleJoin}
            onDelete={handleDelete}
            joiningId={joiningBattle}
            currentUser={currentUser}
            countLabel={`${activeBattles.filter(b => b.status === 'waiting' && b.owner_id !== currentUser?.id).length} Waiting`}
            setEditingBattle={setEditingBattle}
            setIsModalOpen={setIsModalOpen}
            emptyState={
              <div className="col-span-full py-20 text-center rounded-[3rem] bg-black/2 dark:bg-white/2 border border-black/5 dark:border-white/5 backdrop-blur-xl flex flex-col items-center">
                <div className="w-20 h-20 rounded-3xl bg-rose-500/10 flex items-center justify-center mb-6 text-rose-500/30">
                  <Swords className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-space-grotesk font-black text-foreground/90 mb-2">The Arena is Quiet</h3>
                <p className="text-sm font-outfit text-muted-foreground max-w-xs mx-auto mb-8 font-medium">
                  No active battles found for your class. Be the champion and ignite the competition!
                </p>
                <Button 
                  variant="outline" 
                  onClick={() => setIsModalOpen(true)}
                  className="border-rose-500/20 bg-rose-500/5 hover:bg-rose-500/10 rounded-2xl px-8 h-12 font-black font-outfit text-rose-600 transition-all shadow-sm"
                >
                  Create First Battle
                  <PlusCircle className="ml-3 w-4 h-4" />
                </Button>
              </div>
            }
          />

          {activeBattles.filter(b => b.status === 'finished').length > 0 && (
            <BattleSection 
              title="Glory Memorial" 
              icon={<Trophy className="w-6 h-6 text-amber-500" />}
              iconBg="bg-amber-500/10"
              battles={activeBattles.filter(b => b.status === 'finished')}
              onJoin={handleJoin}
              onDelete={handleDelete}
              joiningId={joiningBattle}
              currentUser={currentUser}
              setEditingBattle={setEditingBattle}
              setIsModalOpen={setIsModalOpen}
            />
          )}
        </div>
      </motion.div>

      <CreateChallengeModal 
          isOpen={isModalOpen} 
          onClose={() => {
            setIsModalOpen(false);
            setEditingBattle(null);
          }} 
          userClass={userClass} 
          currentUser={currentUser}
          initialBattleId={editingBattle?.id}
          initialTopic={editingBattle?.topic}
          initialMaxPlayers={editingBattle?.max_players}
      />
    </>
  );
}

function BattleSection({ title, icon, iconBg, battles, onJoin, onDelete, joiningId, currentUser, countLabel, emptyState, setEditingBattle, setIsModalOpen }: any) {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleClickOutside = () => setActiveDropdown(null);
    window.addEventListener('click', handleClickOutside);
    return () => window.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <motion.section variants={fadeInUp} className="space-y-8">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-space-grotesk font-black tracking-tight flex items-center gap-4">
            <div className={`w-12 h-12 rounded-2xl ${iconBg} flex items-center justify-center border border-white/10`}>
              {icon}
            </div>
            {title}
          </h2>
          {countLabel && (
            <div className="flex items-center gap-3 text-[10px] font-black font-outfit text-muted-foreground uppercase tracking-[0.2em] bg-black/3 dark:bg-white/5 border border-black/5 dark:border-white/10 px-5 py-2.5 rounded-full shadow-sm">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
              {countLabel}
            </div>
          )}
        </div>

        <motion.div 
          variants={staggerContainer}
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {battles.length > 0 ? (
            battles.map((battle: any) => (
              <motion.div 
                key={battle.id} 
                variants={fadeInUp}
                whileHover="hover"
                initial="rest"
                animate="rest"
              >
                <motion.div
                  variants={cardHover}
                  className={`glass-card p-10 rounded-[3rem] border-white/60 dark:border-white/10 hover:border-rose-500/30 transition-all group relative overflow-hidden h-full flex flex-col shadow-2xl shadow-black/2 ${battle.status === 'finished' ? 'opacity-70 grayscale-[0.5]' : ''}`}
                >
                  <div className="absolute top-0 right-0 p-10 opacity-5 transform translate-x-4 -translate-y-4">
                    {battle.status === 'finished' ? <Trophy className="w-32 h-32" /> : <Swords className="w-32 h-32" />}
                  </div>
                  
                  <div className="flex justify-between items-center mb-8 relative z-20">
                    <Badge className="rounded-xl bg-violet-600/10 text-violet-700 dark:text-violet-400 border-0 font-black px-4 py-1.5 uppercase tracking-wider text-[10px]">
                      {battle.topic}
                    </Badge>
                    
                    <div className="flex items-center gap-3">
                      <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-lg ${
                        battle.status === 'waiting' ? 'bg-green-400/10 text-green-500' : 
                        battle.status === 'active' ? 'bg-rose-500/10 text-rose-500 animate-pulse' : 
                        battle.status === 'draft' ? 'bg-indigo-400/10 text-indigo-400' :
                        'bg-slate-400/10 text-slate-400'
                      }`}>
                        {battle.status}
                      </span>
                      
                      <div className="relative">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveDropdown(activeDropdown === battle.id ? null : battle.id);
                          }}
                          className={`w-8 h-8 rounded-lg transition-all p-0 flex items-center justify-center border border-white/5 ${activeDropdown === battle.id ? 'bg-rose-600 text-white border-rose-600 shadow-lg shadow-rose-500/20' : 'bg-white/5 text-muted-foreground/30 hover:text-rose-500 hover:bg-rose-500/10'}`}
                        >
                          <MoreVertical className="w-4 h-4" />
                        </Button>

                        <AnimatePresence>
                          {activeDropdown === battle.id && (
                            <motion.div
                              initial={{ opacity: 0, scale: 0.95, y: 10 }}
                              animate={{ opacity: 1, scale: 1, y: 0 }}
                              exit={{ opacity: 0, scale: 0.95, y: 10 }}
                              onClick={(e) => e.stopPropagation()}
                              className="absolute right-0 mt-3 w-48 bg-white dark:bg-slate-900 border border-black/5 dark:border-white/10 rounded-2xl shadow-xl z-50 overflow-hidden"
                            >
                              <div className="p-1.5">
                                <button
                                  onClick={() => {
                                    onJoin(battle.id);
                                    setActiveDropdown(null);
                                  }}
                                  className="w-full flex items-center gap-2.5 px-3 py-2.5 text-[9px] font-black uppercase tracking-widest text-muted-foreground hover:text-rose-500 hover:bg-rose-500/5 rounded-xl transition-all text-left"
                                >
                                  <Eye className="w-3 h-3" /> View Duel
                                </button>
                                
                                {battle.owner_id === currentUser?.id && battle.status !== 'finished' && (
                                  <>
                                    <button
                                      onClick={() => {
                                        setEditingBattle(battle);
                                        setActiveDropdown(null);
                                        setIsModalOpen(true); 
                                      }}
                                      className="w-full flex items-center gap-2.5 px-3 py-2.5 text-[9px] font-black uppercase tracking-widest text-muted-foreground hover:text-rose-500 hover:bg-rose-500/5 rounded-xl transition-all text-left"
                                    >
                                      <Edit2 className="w-3 h-3" /> Edit Details
                                    </button>
                                    
                                    <button
                                      onClick={() => {
                                        setEditingBattle(battle);
                                        setActiveDropdown(null);
                                        setIsModalOpen(true); 
                                      }}
                                      className="w-full flex items-center gap-2.5 px-3 py-2.5 text-[9px] font-black uppercase tracking-widest text-muted-foreground hover:text-rose-500 hover:bg-rose-500/5 rounded-xl transition-all text-left"
                                    >
                                      <UserPlus className="w-3 h-3" /> Invite Players
                                    </button>
                                  </>
                                )}

                                {battle.owner_id === currentUser?.id && (
                                  <>
                                    <div className="h-px bg-black/5 dark:bg-white/10 my-1.5" />
                                    <button
                                      onClick={() => {
                                        onDelete(battle.id);
                                        setActiveDropdown(null);
                                      }}
                                      className="w-full flex items-center gap-2.5 px-3 py-2.5 text-[9px] font-black uppercase tracking-widest text-rose-500 hover:bg-rose-500/10 rounded-xl transition-all text-left"
                                    >
                                      <Trash2 className="w-3 h-3" /> Delete Arena
                                    </button>
                                  </>
                                )}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-2xl font-space-grotesk font-black mb-3 group-hover:text-rose-600 transition-colors uppercase tracking-tight">
                    {battle.topic} Duel
                  </h3>
                  <p className="text-sm font-outfit text-muted-foreground mb-10 line-clamp-2 font-medium leading-relaxed">
                    {battle.status === 'finished' ? 
                      `This legendary duel has concluded. Glory to the victor!` : 
                      `Challenge ${battle.users?.username} in a high-stakes knowledge battle!`
                    }
                  </p>

                  <div className="mt-auto space-y-6">
                    <div className="flex items-center gap-4 bg-black/2 dark:bg-white/5 p-3 rounded-2xl border border-black/5 dark:border-white/10">
                      <div className="w-10 h-10 rounded-xl bg-linear-to-br from-rose-500 to-orange-500 flex items-center justify-center text-[10px] font-black text-white shadow-lg overflow-hidden">
                        {(() => {
                          const isMe = battle.owner_id === currentUser?.id;
                          const rawAvatar = isMe ? (currentUser?.user_metadata?.avatar_url || currentUser?.user_metadata?.picture || battle.users?.avatar_url || battle.users?.image || battle.users?.picture) : (battle.users?.avatar_url || battle.users?.image || battle.users?.picture);
                          const avatar = getHighResAvatar(rawAvatar);
                          return avatar ? (
                            <img src={avatar} className="w-full h-full object-cover" alt={battle.users?.username} />
                          ) : (
                            battle.users?.username?.charAt(0).toUpperCase()
                          );
                        })()}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[9px] font-black text-muted-foreground/50 uppercase leading-none mb-1">Created By</span>
                        <span className="text-xs font-black font-outfit">{battle.users?.username}</span>
                      </div>
                    </div>
                    
                    {battle.status !== 'finished' ? (
                      <Button 
                          onClick={() => onJoin(battle.id)}
                          disabled={joiningId === battle.id}
                          className="w-full h-14 rounded-2xl bg-white dark:bg-slate-900 text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 font-black font-outfit uppercase tracking-widest text-xs group/btn border border-rose-200 dark:border-rose-900/30 shadow-xl shadow-rose-500/5 transition-all"
                      >
                        {joiningId === battle.id ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <>
                            {battle.status === 'active' ? 'Re-Join Duel' : 'Enter Arena'}
                            <ArrowRight className="w-4 h-4 ml-3 group-hover/btn:translate-x-1 transition-transform" />
                          </>
                        )}
                      </Button>
                    ) : (
                      <Button 
                          onClick={() => onJoin(battle.id)}
                          className="w-full h-14 rounded-2xl bg-black/5 dark:bg-white/5 text-muted-foreground hover:bg-black/10 dark:hover:bg-white/10 font-black font-outfit uppercase tracking-widest text-xs border border-transparent transition-all"
                      >
                        View Results
                        <Trophy className="w-4 h-4 ml-3" />
                      </Button>
                    )}
                  </div>
                </motion.div>
              </motion.div>
            ))
          ) : (
            emptyState
          )}
        </motion.div>
      </motion.section>
  );
}

interface ArenaStatCardProps {
  title: string;
  value: string;
  label: string;
  icon: React.ReactNode;
  color: string;
}

function ArenaStatCard({ title, value, label, icon, color }: ArenaStatCardProps) {
  return (
    <motion.div 
      variants={fadeInUp} 
      whileHover="hover" 
      initial="rest"
      animate="rest"
    >
      <motion.div 
        variants={cardHover}
        className="glass-card p-10 rounded-[2.5rem] border-white/60 dark:border-white/10 hover:border-violet-500/20 transition-[border-color,box-shadow] duration-500 group h-full flex flex-col bg-white/50 dark:bg-white/5 transform-gpu"
      >
        <div className={`absolute -right-8 -bottom-8 w-32 h-32 rounded-full bg-linear-to-br ${color} opacity-30 blur-3xl group-hover:scale-150 transition-all duration-1000`} />
        
        <div className="relative z-10 flex flex-col h-full">
          <div className="w-16 h-16 rounded-[1.25rem] bg-black/3 dark:bg-white/5 border border-black/5 dark:border-white/10 flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500 shadow-inner transform-gpu">
            {icon}
          </div>
          <div className="space-y-2 mt-auto">
            <h3 className="text-4xl font-space-grotesk font-black text-foreground/90 tracking-tighter">
              {value}
            </h3>
            <p className="text-xs font-black font-outfit text-muted-foreground uppercase tracking-[0.2em] opacity-60">
              {title}
            </p>
          </div>
          <div className="mt-8 pt-8 border-t border-black/5 dark:border-white/5">
            <p className="text-[10px] font-black font-outfit text-rose-600 flex items-center gap-2.5 uppercase tracking-[0.2em]">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-600 shadow-[0_0_8px_rgba(225,29,72,0.4)]" />
              {label}
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
