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
  Settings,
  Trophy,
  Activity,
  BookOpen,
  Camera,
  Phone,
  MapPin
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
    { key: 'email', weight: 20 },
    { key: 'username', weight: 20 },
    { key: 'class', weight: 20 },
    { key: 'phone', weight: 20 },
    { key: 'address', weight: 20 }
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
      className="max-w-7xl mx-auto pb-12 px-4 sm:px-6 lg:px-8 relative h-full"
    >

      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-violet-600/10 blur-[120px] rounded-full pointer-events-none" />

      <motion.div variants={fadeInUp} className="relative mt-2 md:mt-4 mb-8">
        <div className="h-40 md:h-64 rounded-[2rem] md:rounded-[2.5rem] w-full overflow-hidden relative glass-card border border-white/5 shadow-md">
          <div className="absolute inset-0 bg-gradient-to-br from-violet-600/20 via-indigo-600/20 to-transparent" />
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay" />
          <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-violet-600/30 blur-[100px] rounded-full" />
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-indigo-600/30 blur-[100px] rounded-full" />
        </div>

        <div className="px-4 sm:px-8 md:px-12 flex flex-col md:flex-row items-center md:items-end gap-6 md:gap-8 -mt-16 md:-mt-24 relative z-10 w-full">
          <div className="relative group">
            <div className="w-32 h-32 md:w-48 md:h-48 rounded-[2rem] bg-zinc-100 dark:bg-zinc-900 border-4 md:border-8 border-[#0d0e17] overflow-hidden relative shadow-md flex-shrink-0 group-hover:scale-105 transition-transform duration-500 cursor-pointer">
              {profile?.avatar_url && !imgError ? (
                <img 
                  src={profile.avatar_url} 
                  alt={profile?.full_name || profile?.username || 'User'} 
                  className="w-full h-full object-cover" 
                  referrerPolicy="no-referrer"
                  onError={() => setImgError(true)}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-violet-500 to-indigo-500 text-white text-5xl md:text-6xl font-bold">
                  {(profile?.full_name || profile?.username || 'U').charAt(0).toUpperCase()}
                </div>
              )}
              
              <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Camera className="w-6 h-6 md:w-8 md:h-8 text-white mb-2" />
                <span className="text-white text-[10px] md:text-xs font-bold font-outfit uppercase tracking-widest text-center px-2">Edit Image</span>
              </div>
            </div>
            {!isIncomplete && (
              <div className="absolute bottom-2 right-2 w-8 h-8 md:w-10 md:h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600 border-2 md:border-4 border-[#ffffff] shadow-md flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-white" />
              </div>
            )}
          </div>

          <div className="flex-1 text-center md:text-left pb-2 flex flex-col md:flex-row md:items-end justify-between w-full gap-6">
            <div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-space-grotesk tracking-tight text-foreground mb-3 flex flex-wrap items-center justify-center md:justify-start gap-3">
                {profile?.full_name || profile?.username || 'Student'}

                {profile?.level && (
                   <span className="px-2 py-0.5 md:px-2.5 md:py-1 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-500 text-xs md:text-sm font-bold tracking-widest uppercase">
                     Lvl {profile.level}
                   </span>
                )}
              </h1>
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-muted-foreground font-outfit text-sm font-semibold">
                <span className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-violet-500/10 text-violet-600 dark:text-violet-400 uppercase tracking-widest text-[10px] md:text-[11px] font-bold shadow-sm">
                  {isIncomplete ? (profile?.role || 'Student') : 'Verified Student'}
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-200 dark:bg-zinc-800" />
                <div className="flex items-center gap-2 text-zinc-500 dark:text-zinc-400">
                  <GraduationCap className="w-4 h-4" />
                  {profile?.class ? `Class ${profile.class.charAt(0).toUpperCase() + profile.class.slice(1)}` : 'Class N/A'}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center md:justify-end gap-3 w-full md:w-auto mt-4 md:mt-0">
              {!isIncomplete && (
                <Link href="/profile/edit" className="flex-1 md:flex-none">
                  <button className="w-full md:w-auto relative px-8 h-12 rounded-full font-bold font-outfit text-sm cursor-pointer flex items-center justify-center gap-2.5 transition-all duration-300 hover:scale-[1.02] bg-[#111218] border border-white/10 text-white shadow-md hover:border-white/20">
                    <Edit3 className="w-4 h-4" />
                    <span>Edit Profile</span>
                  </button>
                </Link>
              )}
              <button className="h-12 w-12 rounded-2xl bg-white/90 dark:bg-white/[0.06] border border-zinc-200 dark:border-white/[0.08] backdrop-blur-xl flex items-center justify-center cursor-pointer transition-all duration-300 hover:border-violet-500/40 dark:hover:border-violet-500/30 hover:shadow-md hover:scale-[1.02] hidden md:flex group">
                <Settings className="w-5 h-5 text-muted-foreground group-hover:text-violet-500 group-hover:rotate-90 transition-all duration-500" />
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {isIncomplete && (
        <motion.div 
          variants={fadeInUp}
          className="p-[2px] mb-8 rounded-[2rem] bg-gradient-to-r from-violet-600/50 via-indigo-500/50 to-violet-600/50 shadow-md"
        >
          <div className="p-6 md:p-8 rounded-[2rem] bg-gradient-to-br from-[#0f101a] via-[#0c0c14] to-[#121425] relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6">

            <div className="absolute inset-0 z-0 opacity-[0.08] pointer-events-none" 
                 style={{ 
                   backgroundImage: `linear-gradient(to right, #4f46e5 1px, transparent 1px), linear-gradient(to bottom, #4f46e5 1px, transparent 1px)`,
                   backgroundSize: '32px 32px',
                   maskImage: 'radial-gradient(circle at center, black 40%, transparent 80%)',
                   WebkitMaskImage: 'radial-gradient(circle at center, black 40%, transparent 80%)'
                 }} />

            <motion.div 
              animate={{ 
                scale: [1, 1.1, 1],
                opacity: [0.2, 0.4, 0.2],
              }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-20 -right-20 w-80 h-80 bg-violet-600/20 blur-[100px] rounded-full pointer-events-none" 
            />

            <div className="flex items-center gap-6 relative z-10">
              <div className="relative w-20 h-20 flex items-center justify-center flex-shrink-0">
                <div className="absolute inset-0 rounded-full border-4 border-white/5 bg-white/[0.02]" />
                <svg className="w-full h-full transform -rotate-90 relative z-10">
                  <circle cx="40" cy="40" r="34" stroke="currentColor" strokeWidth="6" fill="transparent" className="text-zinc-200 dark:text-white/5" />
                  <circle cx="40" cy="40" r="34" stroke="currentColor" strokeWidth="6" fill="transparent" strokeDasharray={213.6} strokeDashoffset={213.6 * (1 - completionPercentage / 100)} className="text-violet-500 drop-shadow-[0_0_8px_rgba(139,92,246,0.5)] transition-all duration-1000 ease-out" strokeLinecap="round" />
                </svg>
                <span className="absolute font-bold font-space-grotesk text-lg text-violet-500 z-20">{completionPercentage}%</span>
              </div>
              <div>
                <h4 className="text-xl font-bold font-space-grotesk tracking-tight mb-1.5 text-white">
                  Complete <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-indigo-400">your profile</span>
                </h4>
                <p className="text-sm font-medium font-outfit text-muted-foreground/70 max-w-md">Unlock all platform features, earn badges, and join global study rooms.</p>
              </div>
            </div>
            <Link href="/profile/edit" className="relative z-10 w-full md:w-auto flex-shrink-0">
              <div className="relative group">
                <button className="relative w-full md:w-auto h-12 px-6 sm:px-8 rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-bold font-outfit text-xs sm:text-sm flex items-center justify-center gap-3 cursor-pointer transition-all duration-300 group-hover:from-violet-500 group-hover:to-indigo-500 overflow-hidden">
                  <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 pointer-events-none" />
                  <span className="relative z-10">Complete Now</span>
                  <CheckCircle2 className="w-4 h-4 relative z-10 group-hover:scale-110 transition-transform duration-300 fill-white/10" />
                </button>
              </div>
            </Link>
          </div>
        </motion.div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">

        <div className="lg:col-span-4 space-y-6 lg:space-y-8">

          <motion.div variants={fadeInUp} className="p-[1px] rounded-[2.5rem] bg-gradient-to-br from-violet-500/30 via-white/5 to-transparent">
            <div className="bg-gradient-to-br from-[#0f101a] via-[#0c0c14] to-[#121425] rounded-[2.5rem] p-8 md:p-10 relative overflow-hidden h-full shadow-md group">

              <motion.div 
                animate={{ 
                  scale: [1, 1.1, 1],
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-20 -right-20 w-64 h-64 bg-violet-600/20 blur-[80px] rounded-full pointer-events-none" 
              />
              <motion.div 
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.1, 0.2, 0.1],
                }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -bottom-20 -left-20 w-64 h-64 bg-indigo-600/10 blur-[80px] rounded-full pointer-events-none" 
              />

              <div className="absolute inset-0 z-0 opacity-[0.04] pointer-events-none" 
                   style={{ 
                     backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`, 
                     backgroundSize: '30px 30px',
                     maskImage: 'radial-gradient(circle at center, black 30%, transparent 70%)',
                     WebkitMaskImage: 'radial-gradient(circle at center, black 30%, transparent 70%)'
                   }} />

              <h3 className="text-[10px] md:text-[11px] font-bold font-outfit uppercase tracking-[0.25em] text-foreground mb-8 md:mb-10 flex items-center gap-3 relative z-10">
                <div className="w-8 h-8 md:w-9 md:h-9 rounded-xl bg-violet-500/10 flex items-center justify-center shadow-inner border border-violet-500/20">
                  <ShieldCheck className="w-4 h-4 md:w-4.5 md:h-4.5 text-violet-500" />
                </div>
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">Account Details</span>
              </h3>

            <div className="space-y-5 md:space-y-6">
              <div className="flex items-center gap-4 md:gap-5 group">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-violet-500/10 flex items-center justify-center text-violet-500 transition-colors shadow-sm">
                  <Mail className="w-4.5 h-4.5 md:w-5 md:h-5" />
                </div>
                <div className="min-w-0">
                  <p className="text-[9px] md:text-[10px] font-bold font-outfit text-muted-foreground uppercase tracking-widest leading-none mb-1 md:mb-1.5 opacity-70">Email Address</p>
                  <p className="text-[13px] md:text-[15px] font-bold font-outfit text-foreground truncate">{profile?.email || 'N/A'}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 md:gap-5 group">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-500 transition-colors shadow-sm">
                  <Globe className="w-4.5 h-4.5 md:w-5 md:h-5" />
                </div>
                <div className="min-w-0">
                  <p className="text-[9px] md:text-[10px] font-bold font-outfit text-muted-foreground uppercase tracking-widest leading-none mb-1 md:mb-1.5 opacity-70">Public Profile</p>
                  <p className="text-[13px] md:text-[15px] font-bold font-outfit text-foreground truncate">opticepx.io/@{profile?.username || 'user'}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 md:gap-5 group">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 transition-colors shadow-sm">
                  <Calendar className="w-4.5 h-4.5 md:w-5 md:h-5" />
                </div>
                <div className="min-w-0">
                  <p className="text-[9px] md:text-[10px] font-bold font-outfit text-muted-foreground uppercase tracking-widest leading-none mb-1 md:mb-1.5 opacity-70">Joined Platform</p>
                  <p className="text-[13px] md:text-[15px] font-bold font-outfit text-foreground truncate">March 2024</p>
                </div>
              </div>
              <div className="flex items-center gap-4 md:gap-5 group">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-500 transition-colors shadow-sm">
                  <Phone className="w-4.5 h-4.5 md:w-5 md:h-5" />
                </div>
                <div className="min-w-0">
                  <p className="text-[9px] md:text-[10px] font-bold font-outfit text-muted-foreground uppercase tracking-widest leading-none mb-1 md:mb-1.5 opacity-70">Phone (BD)</p>
                  <p className="text-[13px] md:text-[15px] font-bold font-outfit text-foreground truncate">{profile?.phone || 'N/A'}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 md:gap-5 group">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-rose-500/10 flex items-center justify-center text-rose-500 transition-colors shadow-sm">
                  <MapPin className="w-4.5 h-4.5 md:w-5 md:h-5" />
                </div>
                <div className="min-w-0">
                  <p className="text-[9px] md:text-[10px] font-bold font-outfit text-muted-foreground uppercase tracking-widest leading-none mb-1 md:mb-1.5 opacity-70">Address</p>
                  <p className="text-[13px] md:text-[15px] font-bold font-outfit text-foreground truncate">{profile?.address || 'N/A'}</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

          <motion.div variants={fadeInUp} className="p-[1px] rounded-[2.5rem] bg-gradient-to-bl from-indigo-500/30 via-white/5 to-transparent">
            <div className="bg-gradient-to-br from-[#0c0c14] via-[#08090f] to-[#14162a] rounded-[2.5rem] p-8 md:p-10 relative overflow-hidden h-full shadow-md group">

              <motion.div 
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.2, 0.4, 0.2],
                }}
                transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-20 -right-20 w-64 h-64 bg-indigo-600/20 blur-[80px] rounded-full pointer-events-none" 
              />
              <motion.div 
                animate={{ 
                  scale: [1, 1.1, 1],
                  opacity: [0.1, 0.2, 0.1],
                }}
                transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                className="absolute -bottom-20 -left-20 w-48 h-48 bg-violet-600/10 blur-[60px] rounded-full pointer-events-none" 
              />

              <div className="flex justify-between items-center mb-10 relative z-10">
                <h3 className="text-[10px] md:text-[11px] font-bold font-outfit uppercase tracking-[0.25em] text-foreground flex items-center gap-3 relative z-10">
                  <div className="w-8 h-8 md:w-9 md:h-9 rounded-xl bg-indigo-500/10 flex items-center justify-center shadow-inner border border-indigo-500/20">
                    <Award className="w-4 h-4 md:w-4.5 md:h-4.5 text-indigo-500" />
                  </div>
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">Top Badges</span>
                </h3>
              </div>

            <div className="grid grid-cols-2 gap-4 relative z-10">
              {[
                { label: 'Alpha Tester', icon: <Zap className="w-5 h-5" />, color: 'violet', desc: 'Early Access' },
                { label: 'Scholar', icon: <BookOpen className="w-5 h-5" />, color: 'blue', desc: 'Top 10%' },
                { label: '10 Day Streak', icon: <Flame className="w-5 h-5" />, color: 'orange', desc: 'On fire!' },
                { label: 'Social Star', icon: <Users className="w-5 h-5" />, color: 'emerald', desc: '20+ connections' }
              ].map((ach, i) => (
                <div key={i} className="flex flex-col items-center justify-center p-3 sm:p-5 rounded-2xl bg-white/[0.03] dark:bg-white/[0.02] border border-white/5 transition-all duration-300 hover:-translate-y-1 cursor-pointer group relative overflow-hidden shadow-sm">
                  <div className={cn("absolute inset-0 transition-opacity duration-500 bg-gradient-to-br", 
                    ach.color === 'violet' ? "from-violet-500/10 to-transparent" :
                    ach.color === 'blue' ? "from-blue-500/10 to-transparent" :
                    ach.color === 'orange' ? "from-orange-500/10 to-transparent" :
                    "from-emerald-500/10 to-transparent"
                  )} />
                  <div className={cn("w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center mb-2 md:mb-3 shadow-inner transition-all group-hover:scale-110 duration-300 relative z-10", `bg-${ach.color}-500/10 text-${ach.color}-500`)}>
                    {ach.icon}
                  </div>
                  <span className="text-[10px] md:text-[11px] font-bold font-space-grotesk text-foreground text-center mb-0.5 relative z-10">{ach.label}</span>
                  <span className="text-[8px] md:text-[9px] font-bold font-outfit text-muted-foreground uppercase tracking-widest text-center relative z-10">{ach.desc}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
        </div>

        <div className="lg:col-span-8 space-y-6 lg:space-y-8">

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { 
                label: 'Global Rank', 
                val: 'Top 15%', 
                sub: '+5% from last month', 
                icon: <Trophy className="w-6 h-6 text-amber-500" />, 
                color: 'amber',
                bgLight: 'from-amber-50 to-amber-100/50',
                bgDark: 'from-amber-500/5 to-amber-500/0',
                borderHover: 'hover:border-amber-500/30'
              },
              { 
                label: 'Experience (XP)', 
                val: profile?.xp || '1,240', 
                sub: `Level ${profile?.level || 1} achieved`, 
                icon: <Zap className="w-6 h-6 text-violet-500" />, 
                color: 'violet',
                bgLight: 'from-violet-50 to-violet-100/50',
                bgDark: 'from-violet-500/5 to-violet-500/0',
                borderHover: 'hover:border-violet-500/30'
              },
              { 
                label: 'Study Sessions', 
                val: '48', 
                sub: '124 hours total', 
                icon: <Activity className="w-6 h-6 text-emerald-500" />, 
                color: 'emerald',
                bgLight: 'from-emerald-50 to-emerald-100/50',
                bgDark: 'from-emerald-500/5 to-emerald-500/0',
                borderHover: 'hover:border-emerald-500/30'
              }
            ].map((stat, i) => (
              <motion.div 
                key={i}
                variants={fadeInUp}
                className={cn(
                  "p-[1px] rounded-3xl transition-all duration-300",
                  stat.color === 'amber' ? "bg-gradient-to-br from-amber-500/30 via-white/5 to-transparent" :
                  stat.color === 'violet' ? "bg-gradient-to-br from-violet-500/30 via-white/5 to-transparent" :
                  "bg-gradient-to-br from-emerald-500/30 via-white/5 to-transparent"
                )}
              >
                <div className={cn(
                  "rounded-3xl p-6 md:p-8 relative overflow-hidden h-full group transition-all duration-500 hover:scale-[1.02] shadow-md",
                  stat.color === 'amber' ? "bg-gradient-to-br from-[#0c0c14] via-[#08090f] to-[#1a160f]" :
                  stat.color === 'violet' ? "bg-gradient-to-br from-[#0c0c14] via-[#08090f] to-[#14162a]" :
                  "bg-gradient-to-br from-[#0c0c14] via-[#08090f] to-[#0f1a16]"
                )}>

                  <motion.div 
                    animate={{ 
                      scale: [1, 1.2, 1],
                      opacity: [0.2, 0.4, 0.2],
                    }}
                    transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }}
                    className={cn(
                      "absolute -top-10 -right-10 w-32 h-32 blur-[40px] rounded-full pointer-events-none",
                      `bg-${stat.color}-500/20`
                    )}
                  />

                  <div className="absolute inset-0 z-0 opacity-[0.04] pointer-events-none" 
                       style={{ 
                         backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`, 
                         backgroundSize: '32px 32px',
                         maskImage: 'radial-gradient(circle at center, black 30%, transparent 70%)',
                         WebkitMaskImage: 'radial-gradient(circle at center, black 30%, transparent 70%)'
                       }} />

                  <div className="flex justify-between items-start mb-6 relative z-10">
                    <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 border shadow-inner", 
                      `bg-${stat.color}-500/10 text-${stat.color}-500 border-${stat.color}-500/20 group-hover:scale-110 group-hover:rotate-6`)}>
                      {stat.icon}
                    </div>
                  </div>

                  <div className="mt-auto relative z-10">
                    <p className="text-[10px] font-bold font-outfit text-muted-foreground uppercase tracking-widest mb-1.5 opacity-70">{stat.label}</p>
                    <h4 className="text-3xl font-bold font-space-grotesk text-foreground tracking-tight mb-2 group-hover:bg-clip-text group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/60 transition-all">{stat.val}</h4>
                    <p className={cn("text-[11px] font-bold font-outfit", `text-${stat.color}-600 dark:text-${stat.color}-400`)}>{stat.sub}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div variants={fadeInUp} className="p-[1px] rounded-[2.5rem] bg-gradient-to-tr from-emerald-500/30 via-white/5 to-violet-500/20">
            <div className="bg-gradient-to-br from-[#0f101a] via-[#0c0c14] to-[#121425] rounded-[2.5rem] overflow-hidden relative shadow-md h-full group">

              <motion.div 
                animate={{ 
                  scale: [1, 1.1, 1],
                  opacity: [0.2, 0.3, 0.2],
                }}
                transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-32 -right-32 w-80 h-80 bg-emerald-500/15 blur-[100px] rounded-full pointer-events-none" 
              />
              <motion.div 
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.1, 0.2, 0.1],
                }}
                transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 3 }}
                className="absolute -bottom-32 -left-32 w-80 h-80 bg-violet-600/10 blur-[100px] rounded-full pointer-events-none" 
              />

              <div className="p-8 md:p-10 pb-6 flex items-center justify-between border-b border-white/[0.03] relative z-10">
                  <h3 className="text-[11px] font-bold font-outfit uppercase tracking-[0.25em] text-foreground flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-emerald-500/10 flex items-center justify-center shadow-inner border border-emerald-500/20">
                      <Activity className="w-4.5 h-4.5 text-emerald-500" />
                    </div>
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">Recent Activity</span>
                  </h3>
                  <Button variant="ghost" className="text-[10px] font-bold text-muted-foreground tracking-widest uppercase hover:text-foreground transition-colors">
                    View All
                  </Button>
              </div>

            <div className="p-8 md:p-10 md:pt-8 bg-zinc-50/50 dark:bg-transparent">
              <div className="space-y-12 relative z-0 before:absolute before:-z-10 before:left-[23px] before:top-4 before:bottom-6 before:w-[2px] before:bg-violet-200 dark:before:bg-[#2e1d5a]">
                {[
                  !isIncomplete && { 
                    title: 'Profile Setup Fully Completed', 
                    date: 'Just now', 
                    icon: <ShieldCheck className="w-5 h-5" />, 
                    color: 'violet', 
                    desc: 'You have unlocked all platform features including Battle Arena and Study Rooms.' 
                  },
                  { 
                    title: 'Joined the Optiq EPX Community', 
                    date: 'Today', 
                    icon: <Users className="w-5 h-5" />, 
                    color: 'emerald', 
                    desc: 'Started your journey as a student on the most advanced learning platform.' 
                  },
                ].filter(Boolean).map((item: any, i) => (
                  <div key={i} className="flex gap-6 md:gap-8 relative group z-10">
                    <div className={cn("w-12 h-12 rounded-full flex items-center justify-center shrink-0 shadow-sm border relative transition-transform duration-300 group-hover:scale-110 bg-background overflow-hidden", 
                      item.color === 'zinc' 
                        ? "border-zinc-500/20 text-zinc-400" 
                        : `border-${item.color}-500/20 text-${item.color}-400`
                    )}>
                      <div className={cn("absolute inset-0", item.color === 'zinc' ? "bg-zinc-500/10" : `bg-${item.color}-500/10`)} />
                      <div className="relative z-10">{item.icon}</div>
                    </div>
                    <div className="pt-2.5">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-2">
                        <h4 className="font-space-grotesk font-bold text-base md:text-lg text-foreground tracking-tight">{item.title}</h4>
                        <span className="text-[10px] font-bold font-outfit text-muted-foreground uppercase tracking-[0.15em] shrink-0">{item.date}</span>
                      </div>
                      <p className="text-[13px] md:text-sm font-medium font-outfit text-muted-foreground leading-relaxed max-w-2xl">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        </div>
      </div>
    </motion.div>
  );
}
