'use client';

import React from 'react';
import { motion } from 'motion/react';
import { fadeInUp } from '@/lib/animations';
import { cn } from '@/lib/utils';

interface SectionHeaderProps {
  badge: string;
  title: string | React.ReactNode;
  description: string;
  className?: string;
}

export function SectionHeader({
  badge,
  title,
  description,
  className
}: SectionHeaderProps) {
  return (
    <motion.div 
      variants={fadeInUp} 
      className={cn("text-center max-w-3xl mx-auto mb-16 sm:mb-20", className)}
    >
      <p className="text-sm font-bold font-outfit uppercase tracking-widest text-violet-600 dark:text-violet-400 mb-3">
        {badge}
      </p>
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-space-grotesk font-extrabold tracking-tight mb-5 text-slate-900 dark:text-white leading-[1.1]">
        {title}
      </h2>
      <p className="text-lg text-slate-500 dark:text-zinc-400 font-outfit leading-relaxed max-w-2xl mx-auto">
        {description}
      </p>
    </motion.div>
  );
}
