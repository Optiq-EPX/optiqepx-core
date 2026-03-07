'use client';

import { motion } from 'motion/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Trophy, Swords, Users, PlusCircle, ArrowRight, Zap } from 'lucide-react';
import Link from 'next/link';
import { fadeInUp, staggerContainer, cardHover } from '@/lib/animations';

export default function ArenaClient({ 
  userClass, 
  activeBattles 
}: { 
  userClass: string | undefined; 
  activeBattles: any[] | null;
}) {
  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
      className="space-y-10"
    >
      
      <motion.div 
        variants={fadeInUp}
        className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8"
      >
        <div>
          <h1 className="text-5xl font-space-grotesk font-black tracking-tighter bg-gradient-to-r from-rose-600 to-orange-500 bg-clip-text text-transparent pb-2">
            Battle Arena
          </h1>
          <p className="text-muted-foreground font-outfit mt-2 font-semibold flex items-center gap-3">
            <span className="px-3 py-1 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-600 text-xs font-black uppercase tracking-widest">
              Class {userClass?.toUpperCase() || 'GENERAL'}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-black/20 dark:bg-white/20" />
            Compete and dominate
          </p>
        </div>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button className="h-16 px-10 rounded-[1.5rem] font-black font-outfit uppercase tracking-widest text-xs bg-gradient-to-r from-rose-600 to-orange-500 hover:from-rose-700 hover:to-orange-600 text-white border-0 shadow-[0_20px_40px_-10px_rgba(225,29,72,0.3)] gap-4 group">
            <PlusCircle className="w-6 h-6 group-hover:rotate-90 transition-all duration-500" />
            Create Challenge
          </Button>
        </motion.div>
      </motion.div>

      
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
          title="Global Rank"
          value="#42"
          label="Top 5% in Class"
          icon={<Zap className="w-7 h-7 text-cyan-500" />}
          color="from-cyan-500/20 to-cyan-600/10"
        />
      </motion.div>

      
      <motion.section variants={fadeInUp} className="space-y-8">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-space-grotesk font-black tracking-tight flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-rose-500/10 flex items-center justify-center">
              <Swords className="w-6 h-6 text-rose-500" />
            </div>
            Active Duels
          </h2>
          <div className="flex items-center gap-3 text-[10px] font-black font-outfit text-muted-foreground uppercase tracking-[0.2em] bg-black/[0.03] dark:bg-white/5 border border-black/5 dark:border-white/10 px-5 py-2.5 rounded-full shadow-sm">
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
            {activeBattles?.length || 0} Waiting
          </div>
        </div>

        <motion.div 
          variants={staggerContainer}
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {activeBattles && activeBattles.length > 0 ? (
            activeBattles.map((battle) => (
              <motion.div 
                key={battle.id} 
                variants={fadeInUp}
                whileHover="hover"
                initial="rest"
                animate="rest"
              >
                <motion.div
                  variants={cardHover}
                  className="glass-card p-10 rounded-[3rem] border-white/60 dark:border-white/10 hover:border-rose-500/30 transition-all group relative overflow-hidden h-full flex flex-col shadow-2xl shadow-black/[0.02]"
                >
                  <div className="absolute top-0 right-0 p-10 opacity-[0.03] transform translate-x-4 -translate-y-4">
                    <Swords className="w-32 h-32" />
                  </div>
                  
                  <div className="flex justify-between items-start mb-8">
                    <Badge className="rounded-xl bg-violet-600/10 text-violet-700 dark:text-violet-400 border-0 font-black px-4 py-1.5 uppercase tracking-wider text-[10px]">
                      {battle.topic}
                    </Badge>
                    <span className="text-[10px] font-black font-outfit text-muted-foreground uppercase tracking-[0.2em] opacity-50 italic">
                      Lvl 12 • Entry Free
                    </span>
                  </div>

                  <h3 className="text-2xl font-space-grotesk font-black mb-3 group-hover:text-rose-600 transition-colors">
                    {battle.topic} Duel
                  </h3>
                  <p className="text-sm font-outfit text-muted-foreground mb-10 line-clamp-2 font-medium leading-relaxed">
                    Challenge <span className="text-foreground font-black underline decoration-rose-500/30">{battle.users_profile?.username}</span> in a high-stakes knowledge battle!
                  </p>

                  <div className="mt-auto space-y-6">
                    <div className="flex items-center gap-4 bg-black/[0.02] p-3 rounded-2xl border border-black/5">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-500 to-orange-500 flex items-center justify-center text-[10px] font-black text-white shadow-lg">
                        {battle.users_profile?.username?.charAt(0).toUpperCase()}
                      </div>
                      <span className="text-xs font-bold font-outfit text-muted-foreground italic opacity-80">
                        "Dare to challenge?"
                      </span>
                    </div>
                    <Button className="w-full h-14 rounded-2xl bg-white dark:bg-slate-900 text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 font-black font-outfit uppercase tracking-widest text-xs group/btn border border-rose-200 dark:border-rose-900/30 shadow-xl shadow-rose-500/[0.05] transition-all">
                      Accept Challenge
                      <ArrowRight className="w-4 h-4 ml-3 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </motion.div>
              </motion.div>
            ))
          ) : (
            <motion.div 
              variants={fadeInUp}
              className="col-span-full py-32 text-center rounded-[3rem] bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/5 backdrop-blur-xl flex flex-col items-center shadow-2xl shadow-black/[0.02]"
            >
              <div className="w-24 h-24 rounded-[2rem] bg-rose-500/10 border border-rose-500/20 flex items-center justify-center mb-8 text-rose-500/30 group">
                <Swords className="w-12 h-12 transition-all group-hover:scale-110 group-hover:rotate-12 duration-500" />
              </div>
              <h3 className="text-3xl font-space-grotesk font-black text-foreground/90 mb-4 tracking-tight">The Arena is Quiet</h3>
              <p className="text-base font-outfit text-muted-foreground max-w-sm mx-auto mb-10 font-medium leading-relaxed opacity-70">
                No active battles found for your class. Be the champion and ignite the competition yourself!
              </p>
              <Button variant="outline" className="border-black/5 dark:border-white/10 bg-black/[0.03] dark:bg-white/5 hover:bg-black/[0.06] dark:hover:bg-white/10 rounded-[1.25rem] px-8 h-14 font-black font-outfit transition-all shadow-sm">
                Create First Battle
                <PlusCircle className="ml-3 w-5 h-5 group-hover:rotate-90 transition-transform duration-500" />
              </Button>
            </motion.div>
          )}
        </motion.div>
      </motion.section>
    </motion.div>
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
        <div className={`absolute -right-8 -bottom-8 w-32 h-32 rounded-full bg-gradient-to-br ${color} opacity-30 blur-3xl group-hover:scale-150 transition-all duration-1000`} />
        
        <div className="relative z-10 flex flex-col h-full">
          <div className="w-16 h-16 rounded-[1.25rem] bg-black/[0.03] dark:bg-white/5 border border-black/5 dark:border-white/10 flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500 shadow-inner bg-white/40 dark:bg-white/5 transform-gpu">
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

