'use client';

import React from 'react';
import Link from 'next/link';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import {
  Shield, Swords, Radio, Brain, LayoutDashboard, Trophy,
  HelpCircle, Users, GraduationCap, Zap, Sparkles, Layers,
  ArrowUpRight, Activity, Terminal
} from 'lucide-react';
import { fadeInUp, staggerContainer } from '@/lib/animations';
import { cn } from '@/lib/utils';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { useState, useEffect } from 'react';

const features = [
  {
    icon: Swords,
    title: 'Study Battle Arena',
    description: 'Challenge classmates to real-time AI-generated quiz battles. Climb the ranks, earn XP, and prove your mastery in a high-stakes competitive environment.',
    color: 'from-violet-500/10 to-violet-600/10',
    iconColor: 'text-violet-600 dark:text-violet-400',
    glowColor: 'rgba(124, 58, 237, 1)',
    span: 'lg:col-span-2',
    badge: 'Trending'
  },
  {
    icon: Brain,
    title: 'AI Study Assistant',
    description: 'Your personalized 24/7 tutor. Our advanced AI adapts its explanations, difficulty, and tone to your exact grade level and learning style.',
    color: 'from-pink-500/10 to-rose-600/10',
    iconColor: 'text-pink-600 dark:text-pink-400',
    glowColor: 'rgba(219, 39, 119, 1)',
    span: 'lg:col-span-2',
    badge: 'Popular'
  },
  {
    icon: Radio,
    title: 'Live Study Rooms',
    description: 'Collaborate in real-time with presence-aware study sessions and periodic pop quizzes.',
    color: 'from-blue-500/10 to-blue-600/10',
    iconColor: 'text-blue-600 dark:text-blue-400',
    glowColor: 'rgba(37, 99, 235, 1)',
  },
  {
    icon: Shield,
    title: 'Secure Authentication',
    description: 'Enterprise-grade security with Google, Discord, and deep data encryption.',
    color: 'from-emerald-500/10 to-emerald-600/10',
    iconColor: 'text-emerald-600 dark:text-emerald-400',
    glowColor: 'rgba(5, 150, 105, 1)',
  },
  {
    icon: LayoutDashboard,
    title: 'Role-Based Portals',
    description: 'Tailored interfaces for students, moderators, and admins with strict data isolation.',
    color: 'from-orange-500/10 to-orange-600/10',
    iconColor: 'text-orange-600 dark:text-orange-400',
    glowColor: 'rgba(217, 119, 6, 1)',
  },
  {
    icon: Trophy,
    title: 'Realtime Rankings',
    description: 'Global and class-specific leaderboards that update instantly as you play.',
    color: 'from-yellow-500/10 to-yellow-600/10',
    iconColor: 'text-yellow-600 dark:text-yellow-400',
    glowColor: 'rgba(202, 138, 4, 1)',
  },
  {
    icon: HelpCircle,
    title: 'Curriculum-Aligned',
    description: 'Quizzes generated directly from your specific board and grade syllabus.',
    color: 'from-sky-500/10 to-sky-600/10',
    iconColor: 'text-sky-600 dark:text-sky-400',
    glowColor: 'rgba(3, 105, 161, 1)',
  },
  {
    icon: Users,
    title: 'Multiplayer Teams',
    description: 'Form alliances with your friends and compete in massive 5v5 team quiz battles.',
    color: 'from-red-500/10 to-red-600/10',
    iconColor: 'text-red-600 dark:text-red-400',
    glowColor: 'rgba(220, 38, 38, 1)',
  },
  {
    icon: GraduationCap,
    title: 'Class Verified',
    description: 'Verified classroom environments ensuring you only compete with your peers.',
    color: 'from-indigo-500/10 to-indigo-600/10',
    iconColor: 'text-indigo-600 dark:text-indigo-400',
    glowColor: 'rgba(79, 70, 229, 1)',
  },
  {
    icon: Zap,
    title: 'Instant Question Gen',
    description: 'Powered by Optiq AI for accurate, varied, and challenging study material.',
    color: 'from-purple-500/10 to-purple-600/10',
    iconColor: 'text-purple-600 dark:text-purple-400',
    glowColor: 'rgba(147, 51, 234, 1)',
  },
];

function FeatureCard({ feature, isMobile }: { feature: typeof features[0], isMobile: boolean }) {
  const mouseX = useMotionValue(400);
  const mouseY = useMotionValue(0);
  const rafRef = React.useRef<number | null>(null);
  
  const springX = useSpring(mouseX, { damping: 35, stiffness: 500 });
  const springY = useSpring(mouseY, { damping: 35, stiffness: 500 });

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    if (isMobile || rafRef.current) return;
    rafRef.current = requestAnimationFrame(() => {
      const { left, top } = currentTarget.getBoundingClientRect();
      mouseX.set(clientX - left);
      mouseY.set(clientY - top);
      rafRef.current = null;
    });
  }

  function handleMouseLeave() {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    mouseX.set(400);
    mouseY.set(0);
  }

  const spotlightBackground = useTransform(
    [springX, springY],
    ([x, y]) => `radial-gradient(400px circle at ${x}px ${y}px, ${feature.glowColor.replace('1)', 'var(--glow-opacity))')}, transparent 80%)`
  );

  const borderBackground = useTransform(
    [springX, springY],
    ([x, y]) => `radial-gradient(250px circle at ${x}px ${y}px, ${feature.glowColor.replace('1)', 'var(--border-opacity))')}, transparent 80%)`
  );

  return (
    <motion.div
      variants={fadeInUp}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "group relative p-[1px] overflow-hidden rounded-[2rem] bg-black/10 dark:bg-white/[0.08] transition-all duration-500 cursor-pointer [--glow-opacity:0.1] dark:[--glow-opacity:0.2] [--border-opacity:0.8] dark:[--border-opacity:1] transform-gpu will-change-transform",
        feature.span || ""
      )}
    >
      {!isMobile && (
        <motion.div
          className="pointer-events-none absolute -inset-px transition duration-300 z-10"
          style={{ background: borderBackground }}
        />
      )}

      <div className={cn(
        "relative h-full w-full rounded-[calc(2rem-1px)] bg-white dark:bg-[#070b18] p-7 flex flex-col z-20 overflow-hidden [--grid-opacity:0.15] dark:[--grid-opacity:0.1] transform-gpu will-change-transform",
        !isMobile && "backdrop-blur-2xl"
      )}>
        <div 
          className={cn(
            "absolute inset-0 bg-[size:20px_20px] [mask-image:radial-gradient(circle_at_center,black_20%,transparent_60%)] transition-opacity duration-700",
            isMobile ? "opacity-100" : "opacity-0 group-hover:opacity-100"
          )}
          style={{
            backgroundImage: `linear-gradient(to right, ${feature.glowColor.replace('1)', '0.15)')} 1px, transparent 1px), linear-gradient(to bottom, ${feature.glowColor.replace('1)', '0.15)')} 1px, transparent 1px)`
          } as any}
        />
        
        {!isMobile && (
          <motion.div
            className="pointer-events-none absolute inset-0 transition duration-300"
            style={{ background: spotlightBackground }}
          />
        )}

        {!isMobile && <div className="absolute top-0 left-0 w-full h-[400%] bg-gradient-to-b from-transparent via-black/[0.01] dark:via-white/[0.03] to-transparent -translate-y-full group-hover:animate-scan pointer-events-none" />}

        <div className="relative z-30 flex flex-col h-full">
          <div className="flex justify-between items-start mb-8">
            <div className="relative">
               <div className={cn(
                 "absolute -inset-2 bg-gradient-to-br rounded-xl blur-lg",
                 feature.color
               )} />
               <div className={cn(
                 "relative flex items-center justify-center w-14 h-14 rounded-2xl bg-white dark:bg-[#0a0f1d] border border-black/12 dark:border-white/10 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 shadow-xl dark:shadow-2xl dark:shadow-indigo-500/20",
               )}>
                 <feature.icon className={cn("w-6 h-6 transform transition-transform group-hover:scale-110", feature.iconColor)} />
               </div>
            </div>

            <div className="flex items-center gap-2">
              {feature.badge && (
                <div className="relative group/badge">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-violet-500 to-indigo-500 rounded-full blur opacity-0 group-hover/badge:opacity-20 transition-opacity" />
                  <span className="relative px-3 py-1 rounded-full text-[10px] font-black font-space-grotesk uppercase tracking-widest bg-slate-100 dark:bg-[#0a0f1d] text-slate-900 dark:text-white border border-black/5 dark:border-white/10 shadow-sm">
                    {feature.badge}
                  </span>
                </div>
              )}
              <div className="w-8 h-8 rounded-full bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 flex items-center justify-center transition-all">
                <ArrowUpRight className="w-4 h-4 text-slate-400 dark:text-white/50 group-hover:text-slate-900 dark:group-hover:text-white transition-colors" />
              </div>
            </div>
          </div>

          <div className="space-y-4 mb-6">
            <h3 className="font-space-grotesk font-black text-2xl tracking-tight text-slate-900 dark:text-white transition-colors">
              {feature.title}
            </h3>
            
            <p className="text-[15px] text-slate-600 dark:text-zinc-400 font-outfit leading-relaxed font-medium">
              {feature.description}
            </p>
          </div>

          <div className="mt-auto pt-4 flex items-center justify-between font-outfit transition-colors duration-500">
            <div className="flex items-center gap-4">
               <div className="flex -space-x-2">
                  {[Activity, Brain, Zap].map((Icon, i) => (
                    <div key={i} className="w-6 h-6 rounded-full border border-black/12 dark:border-white/10 bg-white dark:bg-[#0a0f1d] flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-sm" style={{ transitionDelay: `${i * 40}ms` }}>
                      <Icon className={cn("w-2.5 h-2.5 opacity-30 dark:opacity-40 group-hover:opacity-100 transition-opacity", feature.iconColor)} />
                    </div>
                  ))}
               </div>
               <div className="flex flex-col">
                 <div className="flex items-center gap-1.5">
                    <div className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[9px] font-black font-space-grotesk uppercase tracking-widest text-emerald-600 dark:text-emerald-500">
                      Active
                    </span>
                 </div>
                 <span className="text-[10px] font-bold text-slate-400 dark:text-white/20 whitespace-nowrap">
                   RT-0.02ms
                 </span>
               </div>
            </div>
            <Terminal className="w-3.5 h-3.5 text-slate-200 dark:text-white/5 group-hover:text-emerald-500/40 transition-colors" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function Features() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <section id="features" className="py-24 sm:py-32 relative overflow-hidden bg-white dark:bg-[#020617] contain-paint">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-500/10 dark:via-violet-500/20 to-transparent" />
      {!isMobile && (
        <>
          <div className="absolute top-[20%] left-[-10%] w-[600px] h-[600px] bg-violet-500/[0.02] dark:bg-violet-500/[0.05] blur-[140px] rounded-full pointer-events-none" />
          <div className="absolute bottom-[20%] right-[-10%] w-[600px] h-[600px] bg-indigo-500/[0.02] dark:bg-indigo-500/[0.05] blur-[140px] rounded-full pointer-events-none" />
          <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#0000000a_1px,transparent_1px),linear-gradient(to_bottom,#0000000a_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(circle_at_center,#000_30%,transparent_90%)] opacity-30 dark:opacity-50" />
        </>
      )}
      
      <div className="absolute top-[10%] left-1/2 -translate-x-1/2 w-full max-w-4xl h-[400px] pointer-events-none -z-10">
        {!isMobile && (
          <>
            <div className="absolute top-0 left-[10%] w-32 h-32 bg-violet-500/10 blur-3xl animate-pulse" />
            <div className="absolute bottom-0 right-[10%] w-32 h-32 bg-indigo-500/10 blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          </>
        )}
      </div>
      
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="relative"
        >
          <SectionHeader 
            badge="Premium Ecosystem"
            title="Explore Smarter "
            highlight="Tools"
            description="A high-precision ecosystem designed to make your study sessions more effective, engaging, and personal."
          />

          <motion.div 
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {features.map((feature, idx) => (
              <FeatureCard key={feature.title} feature={feature} isMobile={isMobile} />
            ))}
          </motion.div>

          <motion.div 
            variants={fadeInUp}
            className="mt-12 relative group/cta overflow-hidden rounded-[2rem] bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/[0.08] transform-gpu will-change-transform"
          >
            {!isMobile && (
              <div className="absolute inset-0 bg-gradient-to-br from-violet-500/20 via-transparent to-indigo-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
            )}

            <div className="absolute top-[1px] inset-x-8 h-[2px] bg-gradient-to-r from-transparent via-violet-500 to-transparent blur-[3px] opacity-20 dark:opacity-30 z-50 pointer-events-none" />
            <div className="absolute top-0 inset-x-12 h-px bg-gradient-to-r from-transparent via-violet-400/40 to-transparent z-50 pointer-events-none" />
            
            <div className="relative p-7 sm:p-10 rounded-[calc(2rem-1px)] bg-white dark:bg-[#020617] transform-gpu">
              <div className="absolute inset-0  pointer-events-none" />

              {!isMobile && (
                <>
                  <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[500px] h-[500px] bg-violet-600/5 dark:bg-violet-600/10 blur-[120px] rounded-full pointer-events-none transition-all duration-1000 group-hover:bg-violet-600/15" />
                  <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-[500px] h-[500px] bg-indigo-600/5 dark:bg-indigo-600/10 blur-[120px] rounded-full pointer-events-none transition-all duration-1000 group-hover:bg-indigo-600/15" />
                  
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,#8882_1px,transparent_1px),linear-gradient(to_bottom,#8882_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_100%_50%_at_center,black,transparent)] opacity-40 dark:opacity-50 pointer-events-none transition-opacity group-hover:opacity-60" />
                </>
              )}
              
              <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
                <div className="max-w-lg text-center lg:text-left">
                  <h3 className="text-2xl sm:text-3xl font-space-grotesk font-black text-slate-900 dark:text-white mb-3 tracking-tight leading-[1.1]">
                    Ready to transform your <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-500 to-indigo-500">learning experience?</span>
                  </h3>
                  <p className="text-slate-500 dark:text-zinc-400 font-outfit text-sm sm:text-base leading-relaxed font-medium max-w-md mx-auto lg:mx-0">
                    Join thousands of scholars mastering their subjects with Optiq AI. Start your journey today.
                  </p>
                </div>

                <div className="relative shrink-0">
                  <div className="absolute -inset-4 bg-violet-500/20 blur-2xl opacity-0 group-hover/cta:opacity-100 transition-opacity duration-700 pointer-events-none" />
                  <Link href="/register">
                    <motion.button
                      whileHover={{ scale: 1.02, y: -1 }}
                      whileTap={{ scale: 0.98 }}
                      className="relative flex cursor-pointer items-center gap-2 px-6 h-10 bg-violet-600 text-white rounded-lg font-outfit font-semibold text-sm transition-all group/btn overflow-hidden whitespace-nowrap shadow-lg shadow-violet-500/20"
                    >
                      <span className="relative z-10">Get started free</span>
                      <ArrowUpRight className="w-4 h-4 relative z-10 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                    </motion.button>
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
