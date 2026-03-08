'use client';

import React from 'react';
import { motion } from 'motion/react';
import { fadeInUp } from '@/lib/animations';
import { cn } from '@/lib/utils';

interface SectionHeaderProps {
  badge: string;
  title: string;
  highlight?: string;
  titleBr?: boolean;
  description: string;
  className?: string;
}

const ease = [0.16, 1, 0.3, 1] as const;

const badgeVariants = {
  hidden: { opacity: 0, y: 12, filter: 'blur(4px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.8, ease }
  }
};

const titleVariants = {
  hidden: { opacity: 0, y: 16, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.8, ease, delay: 0.1 }
  }
};

const descVariants = {
  hidden: { opacity: 0, y: 12, filter: 'blur(4px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.8, ease, delay: 0.2 }
  }
};

export function SectionHeader({
  badge,
  title,
  highlight,
  titleBr,
  description,
  className
}: SectionHeaderProps) {
  return (
    <motion.div 
      variants={fadeInUp} 
      className={cn("text-center max-w-3xl mx-auto mb-16 sm:mb-20 flex flex-col items-center", className)}
    >
      <motion.div variants={badgeVariants} className="mb-6 transform-gpu">
        <span className="relative inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full text-[11px] font-medium font-outfit uppercase tracking-[0.2em] text-slate-600 dark:text-slate-300 bg-slate-100/50 dark:bg-white/[0.02] border border-slate-200/50 dark:border-white/[0.08] backdrop-blur-md shadow-sm">
          <span className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-white/70 dark:via-white/20 to-transparent" />
          <span className="absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-violet-500/30 dark:via-violet-400/20 to-transparent" />
          
          <div className="w-1.5 h-1.5 rounded-sm rotate-45 bg-gradient-to-br from-violet-500 to-indigo-500 shadow-[0_0_8px_rgba(139,92,246,0.6)]" />
          <span className="relative bg-gradient-to-b from-slate-900 to-slate-600 dark:from-white dark:to-slate-400 bg-clip-text text-transparent pb-[1px]">
            {badge}
          </span>
        </span>
      </motion.div>

      <motion.h2
        variants={titleVariants}
        className="text-2xl sm:text-3xl lg:text-4xl font-space-grotesk font-bold tracking-tight mb-6 text-balance leading-[1.05] transform-gpu"
      >
        <span className="bg-clip-text text-transparent bg-gradient-to-b from-slate-900 via-slate-800 to-slate-500 dark:from-white dark:via-slate-200 dark:to-slate-400 leading-[1.05]">
          {title}
        </span>
        {titleBr && <br className="hidden sm:block" />}
        {highlight && (
          <span className="relative inline-block pb-3 sm:pb-0 mt-2 sm:mt-0 whitespace-nowrap">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-indigo-600 dark:from-violet-400 dark:to-indigo-400 leading-[1.05]">
              {highlight}
            </span>
            <motion.svg
              className="absolute -bottom-1 sm:-bottom-4 left-0 w-full h-[18px] sm:h-[28px]"
              viewBox="0 0 200 36"
              fill="none"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id={`underlineGrad-${title.replace(/\s+/g, '')}`} x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#7c3aed" />
                  <stop offset="50%" stopColor="#8b5cf6" />
                  <stop offset="100%" stopColor="#6366f1" />
                </linearGradient>
              </defs>
              <motion.path
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                d="M0,18 Q25,12 50,18 T100,18 T150,18 T200,18"
                stroke={`url(#underlineGrad-${title.replace(/\s+/g, '')})`}
                strokeWidth="5"
                strokeLinecap="round"
              />
            </motion.svg>
          </span>
        )}
      </motion.h2>

      <motion.p
        variants={descVariants}
        className="text-base sm:text-lg text-slate-500 dark:text-zinc-400 font-outfit font-light leading-relaxed max-w-2xl text-balance transform-gpu mt-2"
      >
        {description}
      </motion.p>
    </motion.div>
  );
}
