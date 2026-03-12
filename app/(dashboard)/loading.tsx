'use client';

import { motion } from 'framer-motion';
import { Brain } from 'lucide-react';

export default function Loading() {
  return (
    <div className="flex h-[calc(100vh-8rem)] w-full items-center justify-center">
      <div className="relative">
        
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute inset-0 bg-violet-500/20 blur-2xl rounded-full"
        />
        
        <motion.div
          animate={{
            scale: [0.95, 1.05, 0.95],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="relative z-10 w-16 h-16 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl flex items-center justify-center shadow-2xl"
        >
          <Brain className="w-8 h-8 text-violet-500" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="absolute top-20 left-1/2 -translate-x-1/2 whitespace-nowrap"
        >
          <span className="text-xs font-space-grotesk font-black uppercase tracking-[0.3em] text-violet-500/50">
            Syncing Neural Link...
          </span>
        </motion.div>
      </div>
    </div>
  );
}
