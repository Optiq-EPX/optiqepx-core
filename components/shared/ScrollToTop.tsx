'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUp } from 'lucide-react';
import { cn } from '@/lib/utils';

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          whileHover={{ scale: 1.1, y: -5 }}
          whileTap={{ scale: 0.9 }}
          onClick={scrollToTop}
          className={cn(
            "fixed bottom-24 right-4 sm:bottom-8 sm:right-8 z-[60] flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-2xl",
            "bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl",
            "border border-black/5 dark:border-white/10 shadow-2xl shadow-violet-500/10",
            "text-violet-600 dark:text-violet-400 transition-colors",
            "hover:bg-violet-600 hover:text-white dark:hover:bg-violet-500/20"
          )}
          aria-label="Scroll to top"
        >
          <ArrowUp className="h-5 w-5 sm:h-6 sm:w-6 stroke-[2.5px]" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
