'use client';

import { useId } from 'react';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
  iconOnly?: boolean;
}

export function Logo({ className, iconOnly = false }: LogoProps) {
  const gradId = useId();
  return (
    <div className={cn("flex items-center gap-3 group select-none relative", className)}>
      <motion.div
        className="absolute -inset-4 bg-gradient-to-r from-violet-600/0 via-violet-600/10 to-indigo-600/0 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
      />
      <motion.span className="flex flex-col cursor-pointer relative z-10">
        <span className="text-2xl font-space-grotesk font-black tracking-tighter leading-none flex items-center h-[28px] overflow-visible">
          <svg 
            className="h-[44px] -my-[8px] overflow-visible" 
            style={{ width: iconOnly ? "24px" : "118px" }}
            viewBox={iconOnly ? "0 0 24 44" : "0 0 118 44"} 
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id={gradId} x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#7c3aed" />
                <stop offset="100%" stopColor="#4f46e5" />
              </linearGradient>
            </defs>

            <text x="0" y="32" className="font-space-grotesk font-black opacity-20 dark:opacity-30" style={{ fontSize: "28px", letterSpacing: "-0.05em" }} fill={`url(#${gradId})`}>
              {iconOnly ? "O" : "Optiq"}
            </text>
            

            <motion.text
              x="0"
              y="32"
              className="font-space-grotesk font-black"
              style={{ fontSize: "28px", letterSpacing: "-0.05em" }}
              fill={`url(#${gradId})`}
              stroke={`url(#${gradId})`}
              strokeWidth="1"
              strokeDasharray="200"
              animate={{ 
                strokeDashoffset: [200, 0, 0, 0, 200],
                fillOpacity: [0, 0, 1, 1, 0],
                strokeOpacity: [1, 1, 0, 0, 1]
              }}
              transition={{ 
                duration: 5, 
                repeat: Infinity, 
                times: [0, 0.4, 0.5, 0.9, 1],
                ease: "easeInOut" 
              }}
            >
              {iconOnly ? "O" : "Optiq"}
            </motion.text>
            

            {!iconOnly && (
              <text
                x="70"
                y="32"
                className="font-space-grotesk font-black fill-slate-900 dark:fill-white"
                style={{ fontSize: "28px", letterSpacing: "-0.05em" }}
              >
                EPX
              </text>
            )}
          </svg>
        </span>
      </motion.span>
    </div>
  );
}
