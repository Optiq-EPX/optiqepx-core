'use client';

import { motion } from 'motion/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  ShieldAlert, 
  Eye, 
  Swords, 
  RadioReceiver, 
  Search,
  AlertCircle,
  ArrowRight
} from 'lucide-react';
import { fadeInUp, staggerContainer, cardHover } from '@/lib/animations';

interface ModeratorDashboardClientProps {
  roomCount: number;
  battleCount: number;
}

export default function ModeratorDashboardClient({ 
  roomCount, 
  battleCount 
}: ModeratorDashboardClientProps) {
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
          <h1 className="text-5xl font-space-grotesk font-black tracking-tighter bg-gradient-to-r from-amber-600 to-orange-500 bg-clip-text text-transparent pb-2">
            Moderator Hub
          </h1>
          <p className="text-muted-foreground font-outfit mt-2 font-semibold flex items-center gap-3">
            <span className="px-3 py-1 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 text-xs font-black uppercase tracking-widest">
              Officer Active
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-black/20 dark:bg-white/20" />
            Ensuring a safe learning arena
          </p>
        </div>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button variant="outline" className="h-16 px-10 rounded-[1.5rem] font-black font-outfit uppercase tracking-widest text-xs border-amber-500/20 bg-amber-500/5 dark:bg-amber-500/10 hover:bg-amber-500/10 dark:hover:bg-amber-500/20 text-amber-600 dark:text-amber-400 shadow-xl shadow-amber-500/5 transition-all gap-4">
            <Eye className="w-6 h-6" />
            Watch Room Feed
          </Button>
        </motion.div>
      </motion.div>

      
      <div className="grid gap-8 md:grid-cols-2">
        <motion.div variants={fadeInUp} whileHover="hover" initial="rest" animate="rest">
          <motion.div 
            variants={cardHover}
            className="glass-card p-10 rounded-[3rem] border-white/60 dark:border-white/10 hover:border-amber-500/20 transition-all group relative overflow-hidden h-full shadow-2xl shadow-black/[0.02] bg-white/50 dark:bg-white/5"
          >
            <div className="flex justify-between items-start mb-8">
              <div className="w-20 h-20 rounded-[1.5rem] bg-amber-500/10 dark:bg-amber-500/5 border border-amber-500/20 flex items-center justify-center text-amber-600 dark:text-amber-400 shadow-inner group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 bg-white/50 dark:bg-white/5">
                <RadioReceiver className="w-10 h-10" />
              </div>
              <div className="px-4 py-2 rounded-full bg-amber-500/10 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 text-[10px] font-black uppercase tracking-widest border border-amber-500/20">
                Priority 1
              </div>
            </div>

            <div className="mb-10">
              <h3 className="text-3xl font-space-grotesk font-black text-foreground/90 tracking-tight mb-2">Study Room Search</h3>
              <p className="text-sm font-outfit text-muted-foreground font-medium opacity-70">Monitor live groups for platform compliance.</p>
            </div>

            <div className="flex items-end justify-between">
              <div>
                <p className="text-4xl font-space-grotesk font-black text-amber-600 dark:text-amber-400">{roomCount}</p>
                <p className="text-[10px] font-black font-outfit text-muted-foreground uppercase tracking-widest opacity-60">Active Sessions</p>
              </div>
              <Button className="h-14 px-8 rounded-2xl bg-amber-600 hover:bg-amber-700 dark:bg-amber-500 dark:hover:bg-amber-600 text-white font-black font-outfit uppercase tracking-widest text-xs border-0 shadow-lg shadow-amber-500/20 group/btn transition-all">
                Review Rooms
                <ArrowRight className="w-4 h-4 ml-3 group-hover/btn:translate-x-1 transition-transform" />
              </Button>
            </div>
          </motion.div>
        </motion.div>

        <motion.div variants={fadeInUp} whileHover="hover" initial="rest" animate="rest">
          <motion.div 
            variants={cardHover}
            className="glass-card p-10 rounded-[3rem] border-white/60 dark:border-white/10 hover:border-amber-500/30 transition-all group relative overflow-hidden h-full shadow-2xl shadow-black/[0.02] bg-white/50 dark:bg-white/5"
          >
            <div className="flex justify-between items-start mb-8">
              <div className="w-20 h-20 rounded-[1.5rem] bg-rose-500/10 dark:bg-rose-500/5 border border-rose-500/20 flex items-center justify-center text-rose-600 dark:text-rose-400 shadow-inner group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 bg-white/50 dark:bg-white/5">
                <Swords className="w-10 h-10" />
              </div>
              <div className="px-4 py-2 rounded-full bg-rose-500/10 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400 text-[10px] font-black uppercase tracking-widest border border-rose-500/20">
                Active Match
              </div>
            </div>

            <div className="mb-10">
              <h3 className="text-3xl font-space-grotesk font-black text-foreground/90 tracking-tight mb-2">Arena Supervision</h3>
              <p className="text-sm font-outfit text-muted-foreground font-medium opacity-70">Oversee competitive integrity and conduct.</p>
            </div>

            <div className="flex items-end justify-between">
              <div>
                <p className="text-4xl font-space-grotesk font-black text-rose-600 dark:text-rose-400">{battleCount}</p>
                <p className="text-[10px] font-black font-outfit text-muted-foreground uppercase tracking-widest opacity-60">Running Duels</p>
              </div>
              <Button className="h-14 px-8 rounded-2xl bg-rose-600 hover:bg-rose-700 dark:bg-rose-500 dark:hover:bg-rose-600 text-white font-black font-outfit uppercase tracking-widest text-xs border-0 shadow-lg shadow-rose-500/20 group/btn transition-all">
                Investigate
                <Search className="w-4 h-4 ml-3 group-hover/btn:scale-110 transition-transform" />
              </Button>
            </div>
          </motion.div>
        </motion.div>
      </div>

      
      <motion.div variants={fadeInUp}>
        <div className="glass-card p-10 rounded-[3rem] border-amber-500/20 dark:border-amber-500/10 bg-amber-500/[0.03] dark:bg-amber-500/[0.05] flex flex-col md:flex-row items-center gap-10 shadow-xl bg-white/40 dark:bg-white/5">
          <div className="w-20 h-20 rounded-[2rem] bg-amber-500/10 dark:bg-amber-500/5 flex items-center justify-center text-amber-600 dark:text-amber-400 shrink-0 bg-white/50 dark:bg-white/5">
            <AlertCircle className="w-10 h-10" />
          </div>
          <div className="flex-1">
             <h4 className="text-xl font-space-grotesk font-black text-amber-700 dark:text-amber-400 mb-2">Protocol Reminder</h4>
             <p className="font-outfit text-muted-foreground font-medium text-base leading-relaxed opacity-80">
                As a moderator, you represent the standard of OptiqEPX. Monitor interactions for toxicity or bias. For user-specific restrictions or ban requests, please escalate directly to the System Administrator.
             </p>
          </div>
          <Button variant="ghost" className="shrink-0 h-16 px-10 rounded-2xl font-black font-outfit text-amber-600 dark:text-amber-400 hover:bg-amber-500/10 dark:hover:bg-amber-500/20 uppercase tracking-widest text-xs">
            Review Guidelines
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
}
