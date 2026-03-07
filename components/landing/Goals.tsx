'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'motion/react';
import { Target, Handshake, Lightbulb, TrendingUp, ShieldCheck, Rocket } from 'lucide-react';
import { fadeInUp, staggerContainer } from '@/lib/animations';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { cn } from '@/lib/utils';

const goals = [
  {
    icon: Target,
    title: 'Consistent Learning',
    description: 'Build a daily rhythm with timed sessions, streaks, and AI quizzes that make studying a habit.',
    iconColor: 'text-violet-400',
    bgColor: 'bg-violet-500/10',
    glowHex: '#a78bfa',
    size: 'large',
    className: 'lg:col-span-2 lg:row-span-2 md:col-span-2',
  },
  {
    icon: Handshake,
    title: 'Collaborative Education',
    description: 'Study rooms bring classmates together in real-time, making learning social and supportive.',
    iconColor: 'text-blue-400',
    bgColor: 'bg-blue-500/10',
    glowHex: '#60a5fa',
    size: 'wide',
    className: 'lg:col-span-2 lg:row-span-1 md:col-span-2',
  },
  {
    icon: Lightbulb,
    title: 'Break the Monotony',
    description: 'Gamified battles and dynamic challenges replace boring study routines with genuine excitement.',
    iconColor: 'text-orange-400',
    bgColor: 'bg-orange-500/10',
    glowHex: '#fb923c',
    size: 'small',
    className: 'lg:col-span-1 lg:row-span-1 md:col-span-1',
  },
  {
    icon: TrendingUp,
    title: 'AI-Guided Growth',
    description: 'An AI-powered tutor that meets every student at their level — explaining and adapting in real-time.',
    iconColor: 'text-purple-400',
    bgColor: 'bg-purple-500/10',
    glowHex: '#c084fc',
    size: 'small',
    className: 'lg:col-span-1 lg:row-span-1 md:col-span-1',
  },
  {
    icon: ShieldCheck,
    title: 'Healthy Competition',
    description: 'Matchmaking ensures a fair playing field where students push each other to improve — not just win.',
    iconColor: 'text-emerald-400',
    bgColor: 'bg-emerald-500/10',
    glowHex: '#34d399',
    size: 'wide',
    className: 'lg:col-span-2 lg:row-span-1 md:col-span-1',
  },
  {
    icon: Rocket,
    title: 'Future-Ready Platform',
    description: 'Built on modern, secure infrastructure — designed to grow from a single classroom to a school district.',
    iconColor: 'text-indigo-400',
    bgColor: 'bg-indigo-500/10',
    glowHex: '#818cf8',
    size: 'wide',
    className: 'lg:col-span-2 lg:row-span-1 md:col-span-1',
  },
];

function GoalCard({ goal, isHovered, index, setHoveredIndex }: { goal: typeof goals[0], isHovered: boolean, index: number, setHoveredIndex: (idx: number | null) => void }) {
  const isLarge = goal.size === 'large';
  const isWide = goal.size === 'wide';

  return (
    <motion.div
      variants={fadeInUp}
      className={cn("relative h-full w-full", goal.className)}
      onMouseEnter={() => setHoveredIndex(index)}
    >
      {isHovered && (
        <motion.span
          className="absolute -inset-3 block rounded-[2rem] -z-10 bg-slate-200/50 dark:bg-white/[0.04]"
          layoutId="goalHoverBackground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            type: 'spring',
            stiffness: 300,
            damping: 40,
            opacity: { duration: 0.2 },
          }}
        />
      )}

      <article
        className={cn(
          "group relative flex h-full w-full overflow-hidden rounded-3xl border border-slate-200/60 dark:border-white/[0.05] bg-white/40 dark:bg-[#090a0d] backdrop-blur-3xl transition-all duration-500 shadow-sm",
          isWide ? "flex-col sm:flex-row items-center sm:text-left text-center px-8 py-8" : "flex-col items-center text-center px-8 py-10",
          isLarge && "justify-center"
        )}
      >
        {isLarge && (
          <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#80808014_1px,transparent_1px),linear-gradient(to_bottom,#80808014_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_at_top_right,#000_20%,transparent_70%)] pointer-events-none transition-opacity duration-700 group-hover:opacity-50 opacity-20" />
        )}

        <div className="absolute inset-0 z-0 -translate-x-full bg-gradient-to-r from-transparent via-white/[0.08] dark:via-white/[0.04] to-transparent skew-x-12 group-hover:animate-shimmer pointer-events-none" />

        <div
          className="absolute inset-x-0 top-0 h-[2px] rounded-full opacity-60 group-hover:opacity-100 transition-opacity duration-700 z-10"
          style={{ background: `linear-gradient(to right, transparent 5%, ${goal.glowHex} 50%, transparent 95%)` }}
        />
        <div
          className="absolute inset-x-[10%] -top-1 h-4 rounded-full blur-md opacity-20 group-hover:opacity-50 transition-opacity duration-700 pointer-events-none"
          style={{ background: goal.glowHex }}
        />

        <div
          className="absolute inset-x-0 top-0 h-32 z-0 pointer-events-none opacity-[0.15] group-hover:opacity-[0.25] transition-opacity duration-700"
          style={{
            backgroundImage: `linear-gradient(to right, ${goal.glowHex}cc 1px, transparent 1px), linear-gradient(to bottom, ${goal.glowHex}cc 1px, transparent 1px)`,
            backgroundSize: '20px 20px',
            maskImage: 'linear-gradient(to bottom, black 0%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, black 0%, transparent 100%)',
          }}
        />

        <div className={cn("relative z-10 flex w-full", isWide ? "flex-col sm:flex-row items-center gap-6" : "flex-col items-center")}>
          <div 
            className={cn(
              "flex items-center justify-center shrink-0 rounded-full ring-1 ring-inset ring-slate-900/5 dark:ring-white/10 transition-transform duration-500 ease-out group-hover:scale-110 shadow-sm",
              goal.bgColor,
              isLarge ? "w-20 h-20 mb-8" : isWide ? "w-16 h-16 mb-4 sm:mb-0" : "w-14 h-14 mb-6"
            )}
          >
            <goal.icon className={cn("transition-transform duration-500 group-hover:-translate-y-1", goal.iconColor, isLarge ? "w-8 h-8" : "w-6 h-6")} />
          </div>
          
          <div className={cn("flex flex-col transition-transform duration-500", isWide ? "sm:items-start group-hover:translate-x-1" : "items-center group-hover:-translate-y-1")}>
            <h3 className={cn("font-space-grotesk font-bold tracking-tight text-slate-900 dark:text-slate-100", isLarge ? "text-3xl mb-4" : "text-xl mb-3")}>
              {goal.title}
            </h3>
            
            <p className={cn("text-slate-600 dark:text-slate-400 font-outfit leading-relaxed", isLarge ? "text-lg max-w-sm text-balance" : "text-[0.95rem]")}>
              {goal.description}
            </p>
          </div>
        </div>
      </article>
    </motion.div>
  );
}

export function Goals() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="goals" className="py-24 sm:py-32 relative overflow-hidden">
      
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-500/20 to-transparent" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-violet-500/[0.03] via-transparent to-transparent dark:from-violet-500/[0.02]" />

      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-40" />

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerContainer}
        >
          <SectionHeader 
            badge="Our Mission"
            title={<>Education should feel <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-indigo-600 dark:from-violet-400 dark:to-indigo-400">alive</span></>}
            description="We believe every student deserves tools that make learning inspiring, social, and deeply personal."
          />

          <LayoutGroup>
            <AnimatePresence>
              <motion.div 
                variants={staggerContainer}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10"
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {goals.map((goal, index) => (
                  <GoalCard 
                    key={goal.title} 
                    goal={goal} 
                    index={index}
                    isHovered={hoveredIndex === index}
                    setHoveredIndex={setHoveredIndex}
                  />
                ))}
              </motion.div>
            </AnimatePresence>
          </LayoutGroup>
        </motion.div>
      </div>
    </section>
  );
}
