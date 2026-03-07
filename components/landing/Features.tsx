'use client';

import React from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import {
  Shield, Swords, Radio, Brain, LayoutDashboard, Trophy,
  HelpCircle, Users, GraduationCap, Zap, Sparkles, Layers,
  ArrowUpRight, Activity, Terminal
} from 'lucide-react';
import { fadeInUp, staggerContainer } from '@/lib/animations';
import { cn } from '@/lib/utils';
import { SectionHeader } from '@/components/shared/SectionHeader';

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
    description: 'Enterprise-grade security with Google, Facebook, and deep data encryption.',
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
    description: 'Powered by GPT-4o for accurate, varied, and challenging study material.',
    color: 'from-purple-500/10 to-purple-600/10',
    iconColor: 'text-purple-600 dark:text-purple-400',
    glowColor: 'rgba(147, 51, 234, 1)',
  },
];

function FeatureCard({ feature }: { feature: typeof features[0] }) {
  const mouseX = useMotionValue(400);
  const mouseY = useMotionValue(0);
  const rafRef = React.useRef<number | null>(null);
  
  const springX = useSpring(mouseX, { damping: 35, stiffness: 500 });
  const springY = useSpring(mouseY, { damping: 35, stiffness: 500 });

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    if (rafRef.current) return;
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
        "group relative p-[1px] overflow-hidden rounded-[2rem] bg-black/10 dark:bg-white/[0.08] transition-all duration-500 cursor-pointer [--glow-opacity:0.1] dark:[--glow-opacity:0.2] [--border-opacity:0.8] dark:[--border-opacity:1]",
        feature.span || ""
      )}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px transition duration-300 z-10"
        style={{ background: borderBackground }}
      />

      <div className="relative h-full w-full rounded-[calc(2rem-1px)] bg-white dark:bg-[#070b18] backdrop-blur-2xl p-7 flex flex-col z-20 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000015_1px,transparent_1px),linear-gradient(to_bottom,#00000015_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-[size:16px_16px] [mask-image:radial-gradient(circle_at_center,#000_25%,transparent_60%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        
        <motion.div
          className="pointer-events-none absolute inset-0 transition duration-300"
          style={{ background: spotlightBackground }}
        />

        <div className="absolute top-0 left-0 w-full h-[400%] bg-gradient-to-b from-transparent via-black/[0.01] dark:via-white/[0.03] to-transparent -translate-y-full group-hover:animate-scan pointer-events-none" />

        <div className="relative z-30 flex flex-col h-full">
          <div className="flex justify-between items-start mb-8">
            <div className="relative">
               <div className={cn(
                 "absolute -inset-2 bg-gradient-to-br rounded-xl blur-lg opacity-0 group-hover:opacity-20 dark:group-hover:opacity-40 transition-opacity duration-500",
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
  return (
    <section id="features" className="py-24 sm:py-32 relative overflow-hidden bg-white dark:bg-[#020617]">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-500/10 dark:via-violet-500/20 to-transparent" />
      <div className="absolute top-[20%] left-[-10%] w-[600px] h-[600px] bg-violet-500/[0.02] dark:bg-violet-500/[0.05] blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-10%] w-[600px] h-[600px] bg-indigo-500/[0.02] dark:bg-indigo-500/[0.05] blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#0000000a_1px,transparent_1px),linear-gradient(to_bottom,#0000000a_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(circle_at_center,#000_30%,transparent_90%)] opacity-30 dark:opacity-50" />
      
      <div className="absolute top-[10%] left-1/2 -translate-x-1/2 w-full max-w-4xl h-[400px] pointer-events-none -z-10">
        <div className="absolute top-0 left-[10%] w-32 h-32 bg-violet-500/10 blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-[10%] w-32 h-32 bg-indigo-500/10 blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
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
            title={<>Smarter tools for the <span className="text-gradient">modern scholar.</span></>}
            description="A high-precision ecosystem designed to make your study sessions more effective, engaging, and personal."
          />

          <motion.div 
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {features.map((feature, idx) => (
              <FeatureCard key={feature.title} feature={feature} />
            ))}
          </motion.div>

          <motion.div 
            variants={fadeInUp}
            className="mt-16 relative"
          >
            <div className="relative p-7 sm:p-10 rounded-[2.5rem] bg-[#f8fafc] dark:bg-[#070b18] border border-black/12 dark:border-white/10 overflow-hidden shadow-2xl shadow-black/5 dark:shadow-none">
              <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[600px] h-[600px] bg-violet-600/10 dark:bg-violet-600/20 blur-[120px] rounded-full" />
              <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-[600px] h-[600px] bg-indigo-600/10 dark:bg-indigo-600/20 blur-[120px] rounded-full" />
              
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#0000000a_1px,transparent_1px),linear-gradient(to_bottom,#0000000a_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#ffffff15_1px,transparent_1px),linear-gradient(to_bottom,#ffffff15_1px,transparent_1px)] bg-[size:20px_20px] [mask-image:radial-gradient(ellipse_80%_70%_at_center,white_20%,transparent_85%)] pointer-events-none" />
              <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.02] dark:opacity-[0.03] pointer-events-none" />
              
              <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10 text-center lg:text-left">
                <div className="max-w-xl">
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-space-grotesk font-black text-slate-900 dark:text-white mb-3 tracking-tighter leading-tight">
                    Ready to transform your <span className="text-violet-500">learning experience?</span>
                  </h3>
                  <p className="text-slate-500 dark:text-zinc-400 font-outfit text-sm sm:text-base leading-relaxed font-medium">
                    Join thousands of scholars who are already mastering their subjects with OptiqEPX. Start your journey for free today.
                  </p>
                </div>

                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="relative flex items-center gap-3 px-7 h-12 bg-violet-600 hover:bg-violet-500 text-white rounded-xl font-space-grotesk font-black text-[12px] uppercase tracking-[0.2em] transition-all group/btn overflow-hidden whitespace-nowrap shadow-xl shadow-violet-500/20"
                >
                  <span>Get Started Free</span>
                  <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center transition-all group-hover/btn:translate-x-1 group-hover/btn:bg-white/20">
                    <Layers className="w-4 h-4" />
                  </div>
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
