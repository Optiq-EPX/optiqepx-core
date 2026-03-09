'use client';

import { useId } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Brain } from 'lucide-react';

interface LogoProps {
  className?: string;
  iconOnly?: boolean;
  animated?: boolean;
  textOnly?: boolean;
}

export function Logo({ className, iconOnly = false, animated = true, textOnly = false }: LogoProps) {
  const gradId = useId();
  
  return (
    <div className={cn("flex items-center gap-2.5 group select-none relative", className)}>
      {!textOnly && (
        <div className="relative flex items-center justify-center">
          <div className="absolute -inset-2 bg-violet-500/20 dark:bg-violet-500/40 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-violet-500/20 relative z-10">
            <Brain className="w-5 h-5" />
          </div>
        </div>
      )}

      {!iconOnly && (
        <div className="flex items-center gap-1 relative z-10">
           <svg 
            className="h-[28px] overflow-visible" 
            width="110"
            viewBox="0 0 110 28" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id={gradId} x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#8b5cf6" />
                <stop offset="100%" stopColor="#6366f1" />
              </linearGradient>
            </defs>

            {animated ? (
              <>
                <text x="0" y="22" className="font-space-grotesk font-black opacity-20 dark:opacity-30" style={{ fontSize: "24px", letterSpacing: "-0.04em" }} fill={`url(#${gradId})`}>
                  Optiq
                </text>
                <motion.text
                  x="0"
                  y="22"
                  className="font-space-grotesk font-black"
                  style={{ fontSize: "24px", letterSpacing: "-0.04em" }}
                  fill={`url(#${gradId})`}
                  stroke={`url(#${gradId})`}
                  strokeWidth="0.5"
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
                  Optiq
                </motion.text>
              </>
            ) : (
              <text 
                x="0" 
                y="22" 
                className="font-space-grotesk font-black" 
                style={{ fontSize: "24px", letterSpacing: "-0.04em" }} 
                fill={`url(#${gradId})`}
              >
                Optiq
              </text>
            )}
            
            <text
              x="62"
              y="22"
              className="font-space-grotesk font-black fill-slate-900 dark:fill-white"
              style={{ fontSize: "24px", letterSpacing: "-0.04em" }}
            >
              EPX
            </text>
          </svg>
        </div>
      )}
    </div>
  );
}
