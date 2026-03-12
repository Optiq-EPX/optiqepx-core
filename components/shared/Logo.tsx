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
    <div className={cn("flex items-center gap-2.5 group select-none relative", className)}>
      {!textOnly && (
        <div className="relative flex items-center justify-center">
          {/* Subtle Glow behind clean icon */}
          <div className="absolute -inset-4 bg-blue-500/10 dark:bg-blue-500/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          
          <div className="relative z-10 w-10 h-10 flex items-center justify-center">
            <Image 
              src="/logo.png" 
              alt="Optiq EPX Logo Icon" 
              width={40} 
              height={40} 
              className="object-contain group-hover:scale-105 transition-transform duration-500"
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
                <stop offset="0%" stopColor="#3b82f6" /> {/* Blue 500 */}
                <stop offset="50%" stopColor="#6366f1" /> {/* Indigo 500 */}
                <stop offset="100%" stopColor="#8b5cf6" /> {/* Violet 500 */}
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
