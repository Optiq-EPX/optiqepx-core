'use client';

import { motion } from 'motion/react';
import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
  iconOnly?: boolean;
}

export function Logo({ className, iconOnly = false }: LogoProps) {
  return (
    <div className={cn("flex items-center gap-3 group select-none", className)}>

      <motion.div 
        whileHover={{ rotate: 180, scale: 1.1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className="relative flex items-center justify-center w-11 h-11"
      >

        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-600 blur-lg opacity-20 group-hover:opacity-40 transition-opacity" />
        

        <div className="relative w-full h-full rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-600 shadow-xl shadow-violet-500/20 flex items-center justify-center border border-white/20 overflow-hidden transform-gpu">

          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.4),transparent)]" />
          
          <svg 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="3.5" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className="w-6 h-6 text-white relative z-10"
          >

            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
          </svg>
          

          <motion.div 
            animate={{ 
              x: [-100, 100],
            }}
            transition={{ 
              duration: 3, 
              repeat: Infinity, 
              ease: "linear",
              repeatDelay: 2
            }}
            className="absolute top-0 bottom-0 w-8 bg-white/20 skew-x-[35deg] blur-sm transform-gpu"
          />
        </div>
      </motion.div>


      {!iconOnly && (
        <span className="flex flex-col">
          <span className="text-2xl font-space-grotesk font-black tracking-tighter leading-none">
            <span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">Optiq</span>
            <span className="text-foreground dark:text-white">EPX</span>
          </span>
        </span>
      )}
    </div>
  );
}
