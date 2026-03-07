'use client';

import { useRef, useState, useEffect } from 'react';

import { motion } from 'motion/react';
import { Zap, Swords, Users, Brain, Trophy, Star, TrendingUp, Rocket, PlayCircle } from 'lucide-react';
import { fadeInUp, staggerContainer } from '@/lib/animations';
import { Logo } from '@/components/shared/Logo';
import { LandingButton } from '@/components/shared/LandingButton';

export function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center overflow-hidden bg-white dark:bg-background">

      <div className="absolute inset-0 pointer-events-none overflow-hidden">

        <div
          className="absolute inset-0 opacity-[0.035] dark:opacity-[0.06] z-[1]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          }}
        />

        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="heroGrid" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#7c3aed" strokeWidth="1" strokeOpacity="0.4" />
            </pattern>
            
            <linearGradient id="gridFadeVertical" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="white" stopOpacity="1" />
              <stop offset="40%" stopColor="white" stopOpacity="0.6" />
              <stop offset="70%" stopColor="white" stopOpacity="0.1" />
              <stop offset="100%" stopColor="white" stopOpacity="0" />
            </linearGradient>
            
            <radialGradient id="gridFadeRadial" cx="50%" cy="30%" r="60%" fx="50%" fy="30%">
              <stop offset="0%" stopColor="white" stopOpacity="1" />
              <stop offset="60%" stopColor="white" stopOpacity="0.5" />
              <stop offset="100%" stopColor="white" stopOpacity="0" />
            </radialGradient>
            <mask id="gridMask">
              <rect width="100%" height="100%" fill="url(#gridFadeVertical)" />
              <rect width="100%" height="100%" fill="url(#gridFadeRadial)" style={{ mixBlendMode: 'multiply' }} />
            </mask>
          </defs>
          <rect width="100%" height="100%" fill="url(#heroGrid)" mask="url(#gridMask)" />
        </svg>

        <motion.div
          animate={{
            x: [0, 30, 0],
            y: [0, -15, 0],
            scale: [1, 1.05, 1],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          style={{
            position: 'absolute',
            top: '-10%',
            left: '-5%',
            width: '55%',
            height: '70%',
            background: 'radial-gradient(ellipse at top left, rgba(167,139,250,0.35) 0%, rgba(139,92,246,0.12) 40%, transparent 65%)',
            filter: 'blur(80px)',
            willChange: 'transform',
            backfaceVisibility: 'hidden',
            contain: 'layout style paint',
          }}
        />
        <motion.div
          animate={{
            x: [0, -20, 0],
            y: [0, 20, 0],
            scale: [1, 1.08, 1],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 3 }}
          style={{
            position: 'absolute',
            top: '0%',
            right: '-8%',
            width: '45%',
            height: '65%',
            background: 'radial-gradient(ellipse at top right, rgba(124,58,237,0.28) 0%, rgba(99,102,241,0.1) 40%, transparent 60%)',
            filter: 'blur(80px)',
            willChange: 'transform',
            backfaceVisibility: 'hidden',
            contain: 'layout style paint',
          }}
        />

        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-violet-400/30 to-transparent" />
      </div>

      <div className="relative z-10 w-full container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pt-28 sm:pt-28 lg:pt-36 flex flex-col items-center text-center">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="flex flex-col items-center"
        >

          <motion.div
            variants={fadeInUp}
            className="inline-flex items-center gap-2 sm:gap-4 px-3 sm:px-6 py-2 sm:py-3 rounded-2xl bg-white/80 dark:bg-violet-950/20 border border-violet-300 dark:border-violet-500/30 mb-10 backdrop-blur-md shadow-[0_2px_20px_rgba(124,58,237,0.08)]"
          >
            <div className="flex -space-x-2 shrink-0">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="w-6 h-6 sm:w-8 sm:h-8 rounded-full border border-white dark:border-slate-950 bg-violet-600 flex items-center justify-center text-[7px] sm:text-[9px] text-white font-bold"
                >
                  AI
                </div>
              ))}
            </div>
            <span className="text-[11px] sm:text-base font-bold font-outfit text-violet-700 dark:text-violet-300 whitespace-nowrap">
              Trusted by 5,000+ Students
            </span>
            <Zap className="w-3 h-3 sm:w-4 sm:h-4 text-violet-600 dark:text-violet-400 shrink-0" />
          </motion.div>

          <motion.h1
            variants={fadeInUp}
            className="text-3xl sm:text-6xl lg:text-7xl xl:text-[80px] font-space-grotesk font-black tracking-[-0.03em] leading-[1.2] sm:leading-[1.15] lg:leading-[1.08] text-slate-900 dark:text-foreground mb-6 max-w-4xl"
          >
            Embrace <br className="lg:hidden" /> 
            <span className="whitespace-nowrap lg:whitespace-normal">Intelligence with</span> <br className="lg:hidden" />
            <span className="relative inline-block pb-3 sm:pb-0 mt-2 sm:mt-0">
              <span className="text-gradient">Optimized Potential</span>
              <motion.svg
                className="absolute -bottom-1 sm:-bottom-4 left-0 w-full h-[18px] sm:h-[28px]"
                viewBox="0 0 200 36"
                fill="none"
                preserveAspectRatio="none"
              >
                <defs>
                  <linearGradient id="underlineGrad1" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#7c3aed" />
                    <stop offset="50%" stopColor="#8b5cf6" />
                    <stop offset="100%" stopColor="#6366f1" />
                  </linearGradient>
                </defs>
                <motion.path
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1.2, delay: 1, ease: [0.22, 1, 0.36, 1] }}
                  d="M0,18 Q25,4 50,18 T100,18 T150,18 T200,18"
                  stroke="url(#underlineGrad1)"
                  strokeWidth="5"
                  strokeLinecap="round"
                />
              </motion.svg>
            </span>
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            className="text-base sm:text-xl text-slate-500 dark:text-muted-foreground font-outfit max-w-2xl mx-auto leading-relaxed mb-10 px-4 sm:px-0"
          >
            Get access to AI-powered study battles and enjoy the seamless learning that{' '}
            <span className="text-slate-700 dark:text-foreground font-semibold">
              supports your growth in one platform.
            </span>
          </motion.p>

          <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row items-center gap-4 mb-8">
            <LandingButton 
              href="/register" 
              size="lg" 
              icon={Rocket}
              iconPosition="left"
            >
              Start for Free
            </LandingButton>
            <LandingButton 
              href="#features" 
              variant="ghost" 
              size="lg" 
              icon={PlayCircle}
              iconPosition="left"
              className="font-outfit font-semibold"
            >
              See How It Works
            </LandingButton>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            className="flex items-center gap-6 sm:gap-10 mb-16"
          >
            {[
              { value: '50K+', label: 'Questions' },
              { value: '12K+', label: 'Battles Played' },
              { value: '4.9', label: 'Rating' },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col items-center">
                <span className="text-xl sm:text-2xl font-space-grotesk font-black text-slate-800 dark:text-white">{stat.value}</span>
                <span className="text-[11px] sm:text-xs font-outfit text-slate-400 tracking-wide uppercase">{stat.label}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export function HeroMockup() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const w = containerRef.current.clientWidth;
        setScale(Math.min(1, w / 1000));
      }
    };
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section className="relative pt-12 pb-16 sm:pt-20 sm:pb-24 bg-white dark:bg-background overflow-visible">
      <div className="container mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          
          <div ref={containerRef} className="w-full relative mx-auto" style={{ height: `${690 * scale}px` }}>
            <div
              className="absolute top-0 left-0 origin-top-left rounded-[22px] p-[1.5px] w-[1000px] h-[690px] drop-shadow-2xl"
              style={{
                background: 'linear-gradient(135deg, rgba(124,58,237,0.9) 0%, rgba(139,92,246,0.5) 40%, rgba(99,102,241,0.9) 70%, rgba(167,139,250,0.7) 100%)',
                boxShadow: '0 0 60px 16px rgba(124,58,237,0.45), 0 0 120px 40px rgba(99,102,241,0.2)',
                transform: `scale(${scale})`,
              }}
            >
              
              <div className="rounded-[20px] overflow-hidden bg-white dark:bg-slate-950 flex flex-col h-full w-full pointer-events-none select-none">

              <div className="flex items-center gap-2 px-4 py-3 bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-amber-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                </div>
                <div className="flex-1 mx-4">
                  <div className="bg-slate-200 dark:bg-slate-800 rounded-md h-6 w-48 mx-auto flex items-center justify-center">
                    <span className="text-[10px] text-slate-500 font-outfit">optiqepx.app/dashboard</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-1 overflow-hidden">

                <div className="flex flex-col justify-between w-52 bg-slate-50 dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 p-4 shrink-0">
                  <div>
                    <div className="mb-6 px-2 scale-75 origin-left pointer-events-none">
                      <Logo />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      {[
                        { icon: <Brain className="w-4 h-4" />, label: 'AI Tutor', active: false },
                        { icon: <Swords className="w-4 h-4" />, label: 'Battle Arena', active: true },
                        { icon: <Users className="w-4 h-4" />, label: 'Study Rooms', active: false },
                        { icon: <Trophy className="w-4 h-4" />, label: 'Leaderboard', active: false },
                        { icon: <TrendingUp className="w-4 h-4" />, label: 'Progress', active: false },
                      ].map((item) => (
                        <div
                          key={item.label}
                          className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-outfit font-medium transition-colors ${
                            item.active ? 'bg-violet-600 text-white' : 'text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-800'
                          }`}
                        >
                          {item.icon}
                          {item.label}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 p-4 rounded-2xl bg-violet-100/50 dark:bg-violet-900/20 border border-violet-200/50 dark:border-violet-800/30 text-center">
                    <p className="text-[10px] font-black text-violet-600 dark:text-violet-400 uppercase tracking-widest mb-1.5">Go Pro</p>
                    <p className="text-[11px] text-slate-600 dark:text-slate-400 mb-3 leading-tight font-outfit">Unlock infinite AI study battles.</p>
                    <div className="w-full py-2 bg-violet-600 text-white text-[11px] font-bold rounded-xl cursor-default pb-2">
                      Upgrade Now
                    </div>
                  </div>
                </div>

                <div className="flex-1 p-6 overflow-hidden bg-white dark:bg-slate-950">
                  <div className="flex items-center justify-between mb-5">
                    <div>
                      <p className="text-xs text-slate-400 font-outfit">Hello, Alex 👋</p>
                      <h3 className="font-space-grotesk font-bold text-slate-800 dark:text-white text-lg">What can I help you learn today?</h3>
                    </div>
                    <div className="flex items-center gap-2 bg-violet-50 dark:bg-violet-950/30 border border-violet-200 dark:border-violet-800 rounded-xl px-3 py-1.5">
                      <Star className="w-3.5 h-3.5 text-violet-600 fill-violet-600" />
                      <span className="text-xs font-bold text-violet-700 dark:text-violet-300 font-space-grotesk">2,340 XP</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-4 gap-3 mb-6 shrink-0">
                    {[
                      { label: 'Total XP', value: '24,500', icon: <Star className="w-3.5 h-3.5 text-amber-500" />, bg: 'bg-amber-50 dark:bg-amber-950/20 border-amber-100 dark:border-amber-800/30' },
                      { label: 'Battles Won', value: '142', icon: <Trophy className="w-3.5 h-3.5 text-violet-500" />, bg: 'bg-violet-50 dark:bg-violet-950/20 border-violet-100 dark:border-violet-800/30' },
                      { label: 'Current Streak', value: '14 Days', icon: <Zap className="w-3.5 h-3.5 text-rose-500" />, bg: 'bg-rose-50 dark:bg-rose-950/20 border-rose-100 dark:border-rose-800/30' },
                      { label: 'Win Rate', value: '68%', icon: <TrendingUp className="w-3.5 h-3.5 text-cyan-500" />, bg: 'bg-cyan-50 dark:bg-cyan-950/20 border-cyan-100 dark:border-cyan-800/30' },
                    ].map((stat) => (
                      <div key={stat.label} className={`p-4 rounded-2xl border ${stat.bg}`}>
                        <div className="flex items-center gap-2 mb-2">
                          {stat.icon}
                          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">{stat.label}</span>
                        </div>
                        <p className="text-xl font-black font-space-grotesk text-slate-800 dark:text-white">{stat.value}</p>
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-3 gap-4 shrink-0">
                    
                    <div className="col-span-2 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-950">
                      <div className="flex justify-between items-center mb-6">
                        <span className="text-[12px] font-bold text-slate-800 dark:text-slate-200">Learning Progress</span>
                        <span className="text-[10px] uppercase tracking-widest text-violet-600 font-bold bg-violet-50 dark:bg-violet-900/30 px-2 py-1 rounded">THIS MONTH</span>
                      </div>
                      <div className="relative h-32 w-full mt-2">
                        
                        <svg viewBox="0 0 400 100" className="w-full h-full overflow-visible">
                          <defs>
                            <linearGradient id="lineGrad" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.3" />
                              <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
                            </linearGradient>
                          </defs>
                          
                          <line x1="0" y1="25" x2="400" y2="25" stroke="currentColor" strokeDasharray="4 4" className="text-slate-100 dark:text-slate-800/50" strokeWidth="1.5" />
                          <line x1="0" y1="75" x2="400" y2="75" stroke="currentColor" strokeDasharray="4 4" className="text-slate-100 dark:text-slate-800/50" strokeWidth="1.5" />

                          <path d="M0,80 C50,60 100,90 150,40 C200,-10 250,60 300,30 C350,0 400,20 400,20 L400,100 L0,100 Z" fill="url(#lineGrad)" />
                          
                          <path d="M0,80 C50,60 100,90 150,40 C200,-10 250,60 300,30 C350,0 400,20 400,20" fill="none" stroke="#7c3aed" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />

                          <circle cx="150" cy="40" r="4" fill="#fff" stroke="#7c3aed" strokeWidth="2.5" />
                          <circle cx="300" cy="30" r="4" fill="#fff" stroke="#7c3aed" strokeWidth="2.5" />
                        </svg>

                        <div className="absolute top-1 right-[20%] bg-slate-800 dark:bg-white text-white dark:text-slate-900 text-[10px] font-bold px-2 py-1 rounded shadow-lg transform -translate-y-1/2">
                          +450 XP
                        </div>
                      </div>
                    </div>

                    <div className="p-5 rounded-2xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-950 flex flex-col justify-between">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-[12px] font-bold text-slate-800 dark:text-slate-200">Accuracy</span>
                      </div>
                      
                      <div className="flex-1 flex items-center justify-center relative mt-2">
                        <svg viewBox="0 0 100 100" className="w-24 h-24 transform -rotate-90">
                          
                          <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="12" className="text-slate-100 dark:text-slate-800/50" />
                          
                          <circle cx="50" cy="50" r="40" fill="none" stroke="#7c3aed" strokeWidth="12" strokeDasharray="251.2" strokeDashoffset="62.8" strokeLinecap="round" />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <span className="text-xl font-black font-space-grotesk text-slate-800 dark:text-white">75%</span>
                        </div>
                      </div>

                      <div className="flex justify-center gap-4 mt-4">
                        <div className="flex items-center gap-1.5">
                          <div className="w-2 h-2 rounded-full bg-violet-600" />
                          <span className="text-[10px] text-slate-500 font-medium">Correct</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <div className="w-2 h-2 rounded-full bg-slate-100 dark:bg-slate-800" />
                          <span className="text-[10px] text-slate-500 font-medium">Missed</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 rounded-2xl border border-slate-100 dark:border-slate-800 overflow-hidden bg-white dark:bg-slate-950">
                    <div className="flex items-center justify-between px-5 py-3.5 bg-slate-50/80 dark:bg-slate-900/50 border-b border-slate-100 dark:border-slate-800">
                      <span className="text-[10px] font-black font-space-grotesk tracking-widest uppercase text-slate-400">Class Leaderboard</span>
                      <span className="text-[10px] font-bold text-violet-600">This Week</span>
                    </div>
                    {[
                      { rank: 1, name: 'You (Alex)', xp: '2,340', highlight: true },
                      { rank: 2, name: 'Rafi Ahmed', xp: '2,190', highlight: false },
                      { rank: 3, name: 'Priya S.', xp: '1,980', highlight: false },
                    ].map((row) => (
                      <div key={row.rank} className={`flex items-center gap-4 px-5 py-3 border-b last:border-0 border-slate-50 dark:border-slate-800/40 ${row.highlight ? 'bg-violet-50/50 dark:bg-violet-900/10' : ''}`}>
                        <span className={`text-[12px] font-black font-space-grotesk w-4 ${row.highlight ? 'text-violet-600' : 'text-slate-400'}`}>#{row.rank}</span>
                        <div className="w-6 h-6 rounded-full bg-slate-200 dark:bg-slate-800 flex-shrink-0" />
                        <span className="text-[13px] font-outfit font-medium text-slate-700 dark:text-slate-200 flex-1">{row.name}</span>
                        <span className={`text-[12px] font-bold font-space-grotesk ${row.highlight ? 'text-violet-700 dark:text-violet-400' : 'text-slate-500'}`}>{row.xp} XP</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
