'use client';

import { motion } from 'motion/react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { 
  Trophy, 
  Users, 
  Brain, 
  ArrowRight, 
  History,
  Sword,
  Zap,
  Calendar,
  Star,
  Target,
  Flame,
  BookOpen
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
      className="space-y-8 pb-10 max-w-7xl mx-auto"
    >
      
      <motion.div 
        variants={fadeInUp}
        className="glass-card rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden flex flex-col md:flex-row justify-between items-center gap-10 shadow-xl shadow-violet-500/5 border-white/80 dark:border-white/10"
      >
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-gradient-to-tr from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl" />

        <div className="space-y-4 relative z-10 w-full md:w-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/60 dark:bg-white/10 border border-white/80 dark:border-white/20 shadow-sm backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[11px] font-black font-space-grotesk uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
              Online • Ready to learn
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl font-space-grotesk font-black tracking-tighter text-foreground leading-[1.1]">
            Hello, <span className="text-gradient drop-shadow-sm">{profile?.username || 'Student'}</span> 👋
          </h1>
          <p className="text-lg font-outfit text-muted-foreground font-medium max-w-xl leading-relaxed">
            You're on a <span className="font-bold text-orange-500 flex items-center inline-flex gap-1"><Flame className="w-4 h-4" /> 5-day streak</span>! Keep up the momentum. 
            Ready to jump into your next challenge?
          </p>
          <div className="pt-4 flex flex-wrap gap-4">
             <Button asChild className="h-14 px-8 rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-black font-outfit text-sm shadow-lg shadow-violet-500/20 group transition-all">
                <Link href="/study-rooms" className="flex items-center gap-2">
                  <Users className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
                  Join a Study Room
                </Link>
             </Button>
             <Button asChild variant="outline" className="h-14 px-8 rounded-2xl border-black/10 dark:border-white/10 bg-white/50 dark:bg-white/5 hover:bg-white dark:hover:bg-white/10 font-black font-outfit text-sm shadow-sm hover:shadow-md transition-all">
                <Link href="/arena" className="flex items-center gap-2">
                  <Sword className="w-5 h-5 text-rose-500" />
                  Enter Arena
                </Link>
             </Button>
          </div>
        </div>

        <div className="relative z-10 hidden lg:block shrink-0">
           <div className="relative w-48 h-48">
             <div className="absolute inset-0 bg-gradient-to-br from-violet-400 to-indigo-500 rounded-3xl rotate-6 opacity-20 blur-xl animate-pulse" />
             <div className="absolute inset-0 bg-gradient-to-br from-violet-500 to-fuchsia-500 rounded-3xl -rotate-6 shadow-2xl flex items-center justify-center pointer-events-none">
                <Brain className="w-24 h-24 text-white opacity-90 drop-shadow-md" />
             </div>
             
             <motion.div 
                animate={{ y: [-5, 5, -5] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-6 -right-6 w-16 h-16 bg-white dark:bg-zinc-800 rounded-2xl shadow-xl flex items-center justify-center border border-black/5 dark:border-white/10"
             >
                <Star className="w-8 h-8 text-amber-500 drop-shadow-sm" />
             </motion.div>
             
             <motion.div 
                animate={{ y: [5, -5, 5] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-4 -left-6 w-14 h-14 bg-white dark:bg-zinc-800 rounded-2xl shadow-xl flex items-center justify-center border border-black/5 dark:border-white/10"
             >
                <Target className="w-6 h-6 text-emerald-500" />
             </motion.div>
           </div>
        </div>
      </motion.div>

      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        <BentoCard 
          className="bg-gradient-to-br from-rose-500/10 to-orange-500/10 border-rose-500/20"
        >
           <div className="flex flex-col h-full justify-between gap-6">
             <div className="flex justify-between items-start">
               <div className="w-14 h-14 rounded-2xl bg-white/60 dark:bg-zinc-900/50 flex items-center justify-center shadow-sm border border-white/50 dark:border-white/10 text-rose-500 group-hover:scale-110 group-hover:rotate-6 transition-transform">
                 <Target className="w-7 h-7" />
               </div>
               <span className="px-3 py-1 rounded-full bg-white/50 dark:bg-black/20 text-[10px] font-black uppercase tracking-widest text-rose-600 dark:text-rose-400 backdrop-blur-md">
                 Goals
               </span>
             </div>
             <div>
               <h3 className="font-space-grotesk font-black text-4xl text-foreground tracking-tighter mb-1">
                 8 <span className="text-xl text-muted-foreground opacity-60">/ 10</span>
               </h3>
               <p className="text-sm font-outfit text-muted-foreground font-semibold">Weekly modules completed</p>
             </div>
             <div className="h-2 w-full bg-black/5 dark:bg-white/10 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `80%` }}
                  className="h-full bg-gradient-to-r from-rose-500 to-orange-500"
                />
             </div>
           </div>
        </BentoCard>

        
        <BentoCard 
          className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border-cyan-500/20"
        >
           <div className="flex flex-col h-full justify-between gap-6">
             <div className="flex justify-between items-start">
               <div className="w-14 h-14 rounded-2xl bg-white/60 dark:bg-zinc-900/50 flex items-center justify-center shadow-sm border border-white/50 dark:border-white/10 text-cyan-500 group-hover:scale-110 group-hover:-rotate-6 transition-transform">
                 <Zap className="w-7 h-7" />
               </div>
               <span className="px-3 py-1 rounded-full bg-white/50 dark:bg-black/20 text-[10px] font-black uppercase tracking-widest text-cyan-600 dark:text-cyan-400 backdrop-blur-md">
                 Focus
               </span>
             </div>
             <div>
               <h3 className="font-space-grotesk font-black text-4xl text-foreground tracking-tighter mb-1">
                 12.5<span className="text-xl">h</span>
               </h3>
               <p className="text-sm font-outfit text-muted-foreground font-semibold">Study hours this week</p>
             </div>
             <p className="text-xs font-black font-outfit text-cyan-600 dark:text-cyan-400 bg-white/50 dark:bg-black/20 px-3 py-2 rounded-xl inline-flex items-center w-fit">
                ↑ 15% from last week
             </p>
           </div>
        </BentoCard>

        
        <BentoCard 
          className="bg-gradient-to-br from-amber-500/10 to-yellow-500/10 border-amber-500/20 lg:col-span-1 md:col-span-2"
        >
           <div className="flex flex-col h-full justify-between gap-6">
             <div className="flex justify-between items-start">
               <div className="w-14 h-14 rounded-2xl bg-white/60 dark:bg-zinc-900/50 flex items-center justify-center shadow-sm border border-white/50 dark:border-white/10 text-amber-500 group-hover:scale-110 group-hover:rotate-12 transition-transform">
                 <Trophy className="w-7 h-7" />
               </div>
               <span className="px-3 py-1 rounded-full bg-white/50 dark:bg-black/20 text-[10px] font-black uppercase tracking-widest text-amber-600 dark:text-amber-400 backdrop-blur-md">
                 Rank
               </span>
             </div>
             <div>
               <h3 className="font-space-grotesk font-black text-3xl text-foreground tracking-tighter mb-1 leading-tight">
                 Gold League
               </h3>
               <p className="text-sm font-outfit text-muted-foreground font-semibold">Top 15% of your class</p>
             </div>
             <Button variant="ghost" className="w-full bg-white/50 dark:bg-black/20 hover:bg-white dark:hover:bg-white/10 text-amber-600 dark:text-amber-400 font-black font-outfit text-xs border border-amber-500/20 uppercase tracking-widest">
               View Leaderboard
             </Button>
           </div>
        </BentoCard>
      </div>

      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        <div className="lg:col-span-2 space-y-6">
           <div className="flex items-center justify-between px-2">
             <h2 className="text-2xl font-space-grotesk font-black flex items-center gap-3">
                <BookOpen className="w-6 h-6 text-violet-500" />
                Continue Learning
             </h2>
             <Button variant="link" className="text-primary font-bold font-outfit">View All</Button>
           </div>

           <div className="grid gap-4">
              <CourseCard 
                title="Advanced UI/UX Principles"
                topic="Design"
                progress={65}
                color="violet"
              />
              <CourseCard 
                title="Algorithms & Data Structures"
                topic="Computer Science"
                progress={30}
                color="blue"
              />
              <CourseCard 
                title="Introduction to Quantum Physics"
                topic="Physics"
                progress={15}
                color="indigo"
              />
           </div>
        </div>

        
        <div className="space-y-6">
           <div className="flex items-center justify-between px-2">
             <h2 className="text-2xl font-space-grotesk font-black flex items-center gap-3">
                <Calendar className="w-6 h-6 text-emerald-500" />
                Up Next
             </h2>
           </div>

           <Card className="glass-card rounded-[2rem] border-white/60 dark:border-white/10 p-2 shadow-sm overflow-hidden bg-white/40 dark:bg-white/5">
              <div className="p-4 space-y-2">
                 <EventItem 
                   title="React Architecture Lab" 
                   time="10:00 AM • Today" 
                   type="Live Session" 
                   icon={<Users className="w-4 h-4" />}
                   color="violet"
                 />
                 <EventItem 
                   title="Weekly Math Assessment" 
                   time="14:30 PM • Today" 
                   type="Exam" 
                   icon={<Target className="w-4 h-4" />}
                   color="rose"
                 />
                 <EventItem 
                   title="AI Mentorship Meet" 
                   time="10:00 AM • Tomorrow" 
                   type="1-on-1" 
                   icon={<Brain className="w-4 h-4" />}
                   color="emerald"
                 />
              </div>
           </Card>

           
           <Card className="rounded-[2rem] bg-gradient-to-br from-indigo-900 to-indigo-950 text-white p-6 relative overflow-hidden group hover:shadow-xl transition-all border-none">
              <div className="absolute top-0 right-0 p-6 opacity-20 transform translate-x-4 -translate-y-4 group-hover:scale-110 transition-transform duration-700">
                 <Brain className="w-32 h-32" />
              </div>
              <div className="relative z-10">
                 <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mb-6 backdrop-blur-md">
                    <SparklesIcon className="w-6 h-6 text-indigo-300" />
                 </div>
                 <h3 className="text-xl font-space-grotesk font-black mb-2">Need a tutor?</h3>
                 <p className="text-indigo-200 text-sm font-outfit mb-6">Optiq AI can help you with your weak areas immediately.</p>
                 <Button className="w-full rounded-xl bg-indigo-500 hover:bg-indigo-400 text-white font-black font-outfit text-xs border-0 group/ai">
                    Ask Optiq AI
                    <ArrowRight className="w-4 h-4 ml-2 group-hover/ai:translate-x-1 transition-transform" />
                 </Button>
              </div>
           </Card>

        </div>
      </div>

    </motion.div>
  );
}

function BentoCard({ children, className }: { children: React.ReactNode, className?: string }) {
  return (
    <motion.div variants={fadeInUp} whileHover="hover" initial="rest" animate="rest" className="h-[220px]">
       <motion.div 
         variants={cardHover}
         className={`h-full p-6 lg:p-8 rounded-[2rem] border backdrop-blur-xl shadow-sm relative overflow-hidden group ${className}`}
       >
         {children}
       </motion.div>
    </motion.div>
  );
}

function CourseCard({ title, topic, progress, color }: any) {
  return (
    <motion.div 
      whileHover={{ y: -2, scale: 1.01 }}
      className="glass-card p-4 sm:p-6 rounded-[2rem] flex flex-col sm:flex-row items-start sm:items-center gap-6 group cursor-pointer border-white/80 dark:border-white/10 hover:shadow-lg transition-all duration-300 bg-white/60 dark:bg-white/5"
    >
      <div className={`w-16 h-16 rounded-[1.5rem] bg-${color}-500/10 flex items-center justify-center shrink-0`}>
         <BookOpen className={`w-7 h-7 text-${color}-600 dark:text-${color}-400 group-hover:rotate-6 group-hover:scale-110 transition-transform`} />
      </div>
      <div className="flex-1 min-w-0 w-full space-y-1">
         <span className={`text-[10px] font-black uppercase tracking-widest text-${color}-600 dark:text-${color}-400`}>{topic}</span>
         <h3 className="font-space-grotesk font-black text-lg text-foreground truncate">{title}</h3>
      </div>
      <div className="w-full sm:w-48 shrink-0 space-y-2 pt-2 sm:pt-0">
         <div className="flex justify-between text-[11px] font-black font-outfit text-muted-foreground uppercase tracking-wider">
           <span>Progress</span>
           <span className="text-foreground">{progress}%</span>
         </div>
         <div className="h-2 w-full bg-black/5 dark:bg-white/10 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              className={`h-full bg-${color}-500 rounded-full`}
            />
         </div>
      </div>
    </motion.div>
  );
}

function EventItem({ title, time, type, icon, color }: any) {
  return (
    <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer group">
       <div className={`mt-0.5 w-10 h-10 rounded-full bg-${color}-500/10 flex items-center justify-center text-${color}-600 dark:text-${color}-400 shrink-0 group-hover:scale-110 transition-transform`}>
          {icon}
       </div>
       <div>
         <h4 className="font-space-grotesk font-black text-sm text-foreground mb-1 group-hover:text-primary transition-colors">{title}</h4>
         <p className="text-xs font-outfit text-muted-foreground font-semibold flex items-center gap-2">
            {time}
            <span className="w-1 h-1 rounded-full bg-border" />
            <span className={`text-${color}-600 dark:text-${color}-400`}>{type}</span>
         </p>
       </div>
    </div>
  );
}

function SparklesIcon(props: any) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
      <path d="M5 3v4M3 5h4M19 3v4M17 5h4M5 17v4M3 19h4M19 17v4M17 19h4"/>
    </svg>
  )
}


