'use client';

import { motion } from 'motion/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { 
  Trophy, 
  Users, 
  Brain, 
  ArrowRight, 
  TrendingUp, 
  History,
  Sword,
  Zap
} from 'lucide-react';
import { fadeInUp, staggerContainer, cardHover } from '@/lib/animations';

export default function StudentDashboardPage({ 
  profile 
}: { 
  profile: any 
}) {
  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
      className="space-y-10"
    >
      {}
      <motion.div 
        variants={fadeInUp}
        className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8"
      >
        <div>
          <h1 className="text-5xl font-space-grotesk font-black tracking-tighter bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent pb-2">
            Student Analytics
          </h1>
          <p className="text-muted-foreground font-outfit mt-2 font-semibold flex items-center gap-3">
            <span className="px-3 py-1 rounded-xl bg-violet-500/10 border border-violet-500/20 text-violet-600 text-xs font-black uppercase tracking-widest">
              Class {profile?.class?.toUpperCase() || 'GENERAL'}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-black/20 dark:bg-white/20" />
            Your learning progression
          </p>
        </div>
        <div className="flex gap-4">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button asChild variant="outline" className="border-black/5 dark:border-white/10 bg-black/[0.03] dark:bg-white/5 hover:bg-black/[0.06] dark:hover:bg-white/10 rounded-[1.25rem] px-8 h-14 font-black font-outfit transition-all shadow-sm">
              <Link href="/arena" className="flex items-center gap-3">
                <Sword className="w-5 h-5 text-rose-500" />
                Arena
              </Link>
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button asChild className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white border-0 rounded-[1.25rem] px-8 h-14 font-black font-outfit shadow-xl shadow-violet-500/25">
              <Link href="/study-rooms" className="flex items-center gap-3">
                Join Session
                <Users className="w-5 h-5" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </motion.div>

      {}
      <motion.div 
        variants={staggerContainer}
        className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
      >
        <StatCard 
          title="Battle Mastery"
          description="Arena performance"
          value="12"
          subValue="+3 since yesterday"
          icon={<Trophy className="w-6 h-6 text-amber-500" />}
          trend="up"
        />
        <StatCard 
          title="Study Velocity"
          description="Live rooms activity"
          value="4"
          subValue="2 active right now"
          icon={<Users className="w-6 h-6 text-cyan-500" />}
          trend="up"
        />
        <motion.div variants={fadeInUp} whileHover="hover" animate="rest" initial="rest">
          <motion.div 
            variants={cardHover}
            className="rounded-[2.5rem] p-10 h-full bg-gradient-to-br from-violet-600 to-indigo-700 text-white shadow-2xl shadow-violet-500/30 flex flex-col relative overflow-hidden group border border-white/20"
          >
            <div className="absolute top-0 right-0 p-10 opacity-20 transform translate-x-4 -translate-y-4">
              <Zap className="w-24 h-24" />
            </div>
            <div className="relative z-10 h-full flex flex-col">
              <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-xl flex items-center justify-center mb-8 shadow-inner">
                <Brain className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-space-grotesk font-black mb-3">AI Study Buddy</h3>
              <p className="text-base font-outfit text-violet-100/90 mb-10 font-medium leading-relaxed">
                Stuck on a tricky concept? Your AI-powered tutor is ready to help 24/7.
              </p>
              <div className="mt-auto">
                <Button asChild variant="secondary" className="w-full h-14 rounded-2xl font-black font-outfit bg-white text-violet-700 hover:bg-violet-50 border-0 group/btn shadow-xl shadow-black/10">
                  <Link href="/assistant" className="flex items-center justify-center gap-3">
                    Start Learning
                    <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
      
      {}
      <motion.section variants={fadeInUp}>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-space-grotesk font-black tracking-tight flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <History className="w-6 h-6 text-primary" />
            </div>
            Timeline
          </h2>
          <Button variant="ghost" className="text-primary font-black font-outfit hover:bg-primary/5 rounded-2xl px-6 h-12 uppercase tracking-wider text-xs">
            Full History
          </Button>
        </div>
        
        <Card className="glass-card border-white/60 dark:border-white/5 rounded-[3rem] overflow-hidden shadow-2xl shadow-black/[0.03]">
          <CardContent className="py-24 text-center">
            <div className="w-20 h-20 rounded-[2rem] bg-black/[0.03] dark:bg-white/5 border border-black/5 dark:border-white/10 flex items-center justify-center mx-auto mb-8 text-muted-foreground group">
              <TrendingUp className="w-10 h-10 opacity-20 group-hover:opacity-40 transition-opacity" />
            </div>
            <p className="font-outfit text-lg font-black text-muted-foreground max-w-sm mx-auto mb-10 opacity-70">
              No recent activity found. Join a battle to start your journey!
            </p>
            <Button asChild variant="outline" className="rounded-2xl border-black/10 hover:bg-black/5 font-black h-14 px-10 uppercase tracking-widest text-xs">
              <Link href="/arena">Join First Battle</Link>
            </Button>
          </CardContent>
        </Card>
      </motion.section>
    </motion.div>
  );
}

interface StatCardProps {
  title: string;
  description: string;
  value: string;
  subValue: string;
  icon: React.ReactNode;
  trend: 'up' | 'down';
}

function StatCard({ title, value, subValue, icon }: StatCardProps) {
  return (
    <motion.div 
      variants={fadeInUp} 
      whileHover="hover" 
      initial="rest"
      animate="rest"
      className="transform-gpu"
    >
      <motion.div 
        variants={cardHover}
        className="glass-card p-10 rounded-[2.5rem] border-white/60 dark:border-white/10 hover:border-violet-500/20 transition-[border-color,box-shadow] duration-500 group h-full flex flex-col bg-white/50 dark:bg-white/5 transform-gpu"
      >
        <div className="flex justify-between items-start mb-8">
          <div className="w-16 h-16 rounded-[1.25rem] bg-black/[0.03] dark:bg-white/5 border border-black/5 dark:border-white/10 flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500 shadow-inner bg-white/40 dark:bg-white/5 transform-gpu">
            {icon}
          </div>
          <div className="px-4 py-1.5 rounded-full bg-emerald-500/10 dark:bg-emerald-500/5 text-emerald-600 dark:text-emerald-400 text-[10px] font-black uppercase tracking-[0.2em] border border-emerald-500/20 shadow-sm">
            Live
          </div>
        </div>
        <div className="space-y-2 mt-auto">
          <h3 className="font-space-grotesk font-black text-4xl text-foreground/90 tracking-tighter">
            {value}
          </h3>
          <p className="text-xs font-black font-outfit text-muted-foreground uppercase tracking-[0.2em] opacity-60">
            {title}
          </p>
        </div>
        <div className="mt-8 pt-8 border-t border-black/5 dark:border-white/5">
          <div className="text-xs font-black font-outfit text-muted-foreground flex items-center gap-2.5">
            <div className="w-6 h-6 rounded-lg bg-emerald-500/10 dark:bg-emerald-500/5 flex items-center justify-center">
              <TrendingUp className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            </div>
            {subValue}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

