'use client';

import Image from 'next/image';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
  iconOnly?: boolean;
  animated?: boolean;
  textOnly?: boolean;
}

export function Logo({ className, iconOnly = false, animated = true, textOnly = false }: LogoProps) {
  const gradId = "optiq-logo-gradient";
  
  return (
    <div className={cn("flex items-center gap-1.5 group select-none relative", className)}>
      {!textOnly && (
        <div className="relative flex items-center justify-center">
          <div className="relative z-10 w-12 h-12 flex items-center justify-center">
            <Image 
              src="/logo.png" 
              alt="Optiq EPX Logo Icon" 
              width={48} 
              height={48} 
              priority
              className="object-contain"
            />
          </div>
        </div>
      )}

      {!iconOnly && (
        <div className="flex items-center gap-1 relative z-10">
           <svg 
            className="h-[28px] overflow-visible" 
            width="114"
            viewBox="0 0 114 28" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id={gradId} x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#730FEC" />
                <stop offset="100%" stopColor="#9149FF" />
              </linearGradient>
            </defs>

            {animated ? (
              <>
                <text 
                  x="0" 
                  y="22" 
                  className="font-space-grotesk font-black opacity-10 dark:opacity-20" 
                  style={{ fontSize: "24px", letterSpacing: "-0.04em" }} 
                  fill={`url(#${gradId})`}
                >
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
                    duration: 4, 
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
