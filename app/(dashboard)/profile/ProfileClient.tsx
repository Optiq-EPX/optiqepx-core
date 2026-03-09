'use client';

import { useState, useEffect } from 'react';

import { motion } from 'framer-motion';
import { 
  Calendar, 
  Link as LinkIcon, 
  Mail, 
  GraduationCap, 
  Award, 
  Users, 
  Flame, 
  Zap,
  Edit3,
  Globe,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Settings
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { fadeInUp, staggerContainer } from '@/lib/animations';
import Link from 'next/link';

export default function ProfileClient({ profile }: { profile: any }) {
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    setImgError(false);
  }, [profile?.avatar_url]);

  const fields = [
    { key: 'username', weight: 35 },
    { key: 'class', weight: 35 },
    { key: 'is_profile_completed', weight: 30 }
  ];
  
  const completionPercentage = fields.reduce((acc, field) => {
    if (profile?.[field.key]) return acc + field.weight;
    return acc;
  }, 0);

  const isIncomplete = completionPercentage < 100;

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
      className="max-w-7xl mx-auto pb-8 px-4"
    >
      
      <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mt-4 mb-8">
        <div className="relative group">
          <div className="w-40 h-40 md:w-48 md:h-48 rounded-3xl bg-zinc-100 dark:bg-zinc-800 border-[6px] border-white dark:border-zinc-900 overflow-hidden shadow-2xl relative">
            {profile?.avatar_url && !imgError ? (
              <img 
                src={profile.avatar_url} 
                alt={profile?.username} 
                className="w-full h-full object-cover" 
                onError={() => setImgError(true)}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-violet-500 to-indigo-500 text-white text-6xl font-black">
                {profile?.username?.charAt(0).toUpperCase()}
              </div>
            )}
          </div>
          <div className="absolute bottom-5 right-5 w-8 h-8 rounded-full bg-emerald-500 border-4 border-white dark:border-zinc-900 shadow-xl" />
        </div>

        <div className="flex-1 flex flex-col justify-center">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-6">
            <div className="text-center md:text-left">
              <h1 className="text-5xl md:text-6xl font-black font-space-grotesk tracking-tighter text-foreground mb-3 flex items-center justify-center md:justify-start gap-4">
                {profile?.username || 'Student'}
                {!isIncomplete && (
                  <div className="p-1 rounded-full bg-blue-500/10 border border-blue-500/20">
                    <CheckCircle2 className="w-6 h-6 text-blue-500 fill-blue-500/10" />
                  </div>
                )}
              </h1>
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-muted-foreground font-outfit text-sm font-semibold">
                <span className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-violet-500/10 text-violet-600 dark:text-violet-400 border border-violet-500/20 uppercase tracking-widest text-[10px] font-black">
                  {profile?.role || 'Student'}
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-200 dark:bg-zinc-800" />
                <div className="flex items-center gap-2">
                  <GraduationCap className="w-5 h-5" />
                  Class {profile?.class || 'N/A'}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center gap-4">
              <Link href="/profile/edit">
                <Button 
                  className="bg-violet-600 hover:bg-violet-700 text-white rounded-2xl px-8 h-12 font-black font-outfit text-[10px] uppercase tracking-widest shadow-xl shadow-violet-500/20 gap-3"
                >
                  <Edit3 className="w-4 h-4" />
                  {isIncomplete ? 'Complete Profile' : 'Edit Profile'}
                </Button>
              </Link>
              <Button variant="outline" className="h-12 w-12 rounded-2xl border-zinc-200 dark:border-zinc-800 p-0 hover:bg-zinc-100 dark:hover:bg-zinc-800">
                <Settings className="w-5 h-5" />
              </Button>
            </div>
          </div>

          
          {isIncomplete && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 rounded-3xl bg-amber-500/5 dark:bg-amber-500/10 border border-amber-500/20 relative overflow-hidden"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 relative z-10">
                <div className="flex items-center gap-6">
                  <div className="relative w-20 h-20 flex items-center justify-center">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle cx="40" cy="40" r="34" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-zinc-200 dark:text-zinc-800" />
                      <circle cx="40" cy="40" r="34" stroke="currentColor" strokeWidth="8" fill="transparent" strokeDasharray={213.6} strokeDashoffset={213.6 * (1 - completionPercentage / 100)} className="text-amber-500 transition-all duration-1000 ease-out" />
                    </svg>
                    <span className="absolute font-black font-space-grotesk text-xl text-amber-600 dark:text-amber-400">{completionPercentage}%</span>
                  </div>
                  <div>
                    <h4 className="text-lg font-black font-space-grotesk text-foreground mb-1">Your profile is nearly ready!</h4>
                    <p className="text-sm font-medium font-outfit text-muted-foreground">Complete your profile to unlock full platform features and badges.</p>
                  </div>
                </div>
                <Link href="/profile/edit">
                  <Button variant="ghost" className="text-amber-600 dark:text-amber-400 font-black text-xs uppercase tracking-widest hover:bg-amber-500/10 h-12 gap-2">
                    Complete Now
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-3xl -z-10" />
            </motion.div>
          )}
        </div>
      </div>

      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        <div className="lg:col-span-4 space-y-10">
          <motion.div variants={fadeInUp} className="glass-card rounded-[3rem] p-10">
            <h3 className="text-xs font-black font-space-grotesk uppercase tracking-[0.25em] text-foreground mb-8 flex items-center gap-2.5">
              <ShieldCheck className="w-5 h-5 text-violet-500" />
              Quick Info
            </h3>
            <div className="space-y-6">
              <div className="space-y-5 pt-2">
                <div className="flex items-center gap-5 group">
                  <div className="w-12 h-12 rounded-2xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-muted-foreground group-hover:bg-violet-500/10 group-hover:text-violet-600 transition-all shadow-sm">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black font-outfit text-muted-foreground uppercase tracking-widest opacity-60 leading-none mb-1.5">Primary Email</p>
                    <p className="text-base font-bold font-outfit text-foreground">{profile?.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-5 group">
                  <div className="w-12 h-12 rounded-2xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-muted-foreground group-hover:bg-violet-500/10 group-hover:text-violet-600 transition-all shadow-sm">
                    <Globe className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black font-outfit text-muted-foreground uppercase tracking-widest opacity-60 leading-none mb-1.5">Public View</p>
                    <p className="text-base font-bold font-outfit text-foreground truncate">opticepx.io/@{profile?.username}</p>
                  </div>
                </div>
                <div className="flex items-center gap-5 group">
                  <div className="w-12 h-12 rounded-2xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-muted-foreground group-hover:bg-violet-500/10 group-hover:text-violet-600 transition-all shadow-sm">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black font-outfit text-muted-foreground uppercase tracking-widest opacity-60 leading-none mb-1.5">Member Since</p>
                    <p className="text-base font-bold font-outfit text-foreground">March 2024</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div variants={fadeInUp} className="glass-card rounded-[3rem] p-10">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-xs font-black font-space-grotesk uppercase tracking-[0.25em] text-foreground flex items-center gap-2.5">
                <Award className="w-5 h-5 text-violet-500" />
                Achievements
              </h3>
              <Button variant="ghost" size="sm" className="text-[10px] font-black text-violet-600 dark:text-violet-400 tracking-widest uppercase h-8 hover:bg-violet-500/10">All badges</Button>
            </div>
            <div className="grid grid-cols-2 gap-5">
              {[
                { label: 'Battle Master', icon: <Zap className="w-6 h-6" />, color: 'violet' },
                { label: 'Top Scorer', icon: <Award className="w-6 h-6" />, color: 'indigo' },
                { label: 'Early Bird', icon: <Flame className="w-6 h-6" />, color: 'emerald' },
                { label: 'Networker', icon: <Users className="w-6 h-6" />, color: 'amber' }
              ].map((ach, i) => (
                <div key={i} className="flex flex-col items-center p-6 rounded-3xl bg-zinc-50 dark:bg-white/[0.03] border border-zinc-100 dark:border-white/5 transition-all hover:scale-105 cursor-pointer shadow-sm">
                  <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center mb-4 shadow-inner", `bg-${ach.color}-500/10 text-${ach.color}-600 dark:text-${ach.color}-400`)}>
                    {ach.icon}
                  </div>
                  <span className="text-[10px] font-black font-outfit text-foreground/80 text-center uppercase tracking-widest">{ach.label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        
        <div className="lg:col-span-8 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { label: 'Current Streak', val: '12 Days', sub: '+3 from last week', icon: <Flame className="w-7 h-7" />, color: 'rose' },
              { label: 'Total Points', val: '4,820', sub: 'Top 5% overall', icon: <Award className="w-7 h-7" />, color: 'amber' },
              { label: 'Active XP', val: 'Level 24', sub: '340 XP to level up', icon: <Zap className="w-7 h-7" />, color: 'violet' }
            ].map((stat, i) => (
              <motion.div 
                key={i}
                variants={fadeInUp}
                className="glass-card rounded-3xl p-6 border hover:border-violet-500/30 transition-all group overflow-hidden relative"
              >
                <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center mb-6 relative z-10 shadow-inner group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-500", `bg-${stat.color}-500/10 text-${stat.color}-600 dark:text-${stat.color}-400 border border-${stat.color}-500/20`)}>
                  {stat.icon}
                </div>
                <div className="relative z-10">
                  <p className="text-[10px] font-black font-outfit text-muted-foreground uppercase tracking-widest mb-1.5">{stat.label}</p>
                  <h4 className="text-4xl font-black font-space-grotesk text-foreground tracking-tighter mb-2">{stat.val}</h4>
                  <p className={cn("text-[10px] font-bold font-outfit", `text-${stat.color}-600/80`)}>{stat.sub}</p>
                </div>
                <div className={cn("absolute -bottom-8 -right-8 w-32 h-32 blur-3xl opacity-20", `bg-${stat.color}-500`)} />
              </motion.div>
            ))}
          </div>

          <motion.div variants={fadeInUp} className="glass-card rounded-[3rem] overflow-hidden">
            <div className="p-10 pb-0 flex items-center justify-between">
               <h3 className="text-xl font-black font-space-grotesk tracking-tight text-foreground flex items-center gap-3.5">
                 <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-600">
                    <Activity className="w-5 h-5" />
                 </div>
                 Academic Footprint
               </h3>
               <div className="flex gap-3">
                  <span className="px-5 py-2 rounded-2xl bg-zinc-100 dark:bg-zinc-800 text-[10px] font-black uppercase tracking-widest text-muted-foreground transition-colors cursor-pointer hover:bg-zinc-200">History</span>
                  <span className="px-5 py-2 rounded-2xl bg-violet-500/10 text-[10px] font-black uppercase tracking-widest text-violet-600 border border-violet-500/20 shadow-sm animate-pulse">Live</span>
               </div>
            </div>
            
            <div className="p-12 space-y-16 relative before:absolute before:left-[3.45rem] before:top-24 before:bottom-24 before:w-[2px] before:bg-gradient-to-b before:from-violet-500/40 before:via-indigo-500/20 before:to-transparent">
              {[
                { title: 'Advanced Calculus Mastery', date: '2 hours ago', icon: <CheckCircle2 className="w-6 h-6" />, color: 'emerald', desc: 'Smashed the final module with a 98% accuracy rate. Earned the "Math Wizard" title.' },
                { title: 'Entered Physics Arena', date: 'Yesterday', icon: <Zap className="w-6 h-6" />, color: 'violet', desc: 'Participated in the "Quantum Mechanics" global battle. Current rank: Platinum III.' },
                { title: 'Project Contribution', date: '3 days ago', icon: <LinkIcon className="w-6 h-6" />, color: 'indigo', desc: 'Uploaded your latest project to the Study Vault. 12 students found this helpful.' }
              ].map((item, i) => (
                <div key={i} className="flex gap-10 relative group">
                  <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 z-10 shadow-xl transition-all group-hover:scale-110", `bg-${item.color}-500 text-white shadow-${item.color}-500/20`)}>
                    {item.icon}
                  </div>
                  <div className="pt-2">
                    <div className="flex items-center gap-4 mb-3">
                       <h4 className="font-space-grotesk font-black text-xl text-foreground tracking-tight group-hover:text-primary transition-colors">{item.title}</h4>
                       <span className="text-[10px] font-black font-outfit text-muted-foreground/40 uppercase tracking-[0.2em]">{item.date}</span>
                    </div>
                    <p className="text-base font-medium font-outfit text-muted-foreground leading-relaxed max-w-2xl">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
              
              <div className="pt-4">
                <Button variant="ghost" className="w-full h-16 rounded-3xl border-2 border-dashed border-zinc-200 dark:border-zinc-800 text-muted-foreground hover:bg-zinc-50 dark:hover:bg-zinc-800/50 hover:border-violet-500/50 transition-all font-black font-outfit uppercase tracking-[0.25em] text-[11px] gap-3">
                   Access full profile timeline
                   <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

function Activity(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
    </svg>
  )
}
