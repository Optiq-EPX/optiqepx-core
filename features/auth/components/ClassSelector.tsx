'use client';

import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  GraduationCap, 
  ChevronDown, 
  Book, 
  BookOpen, 
  School,
  Check
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface ClassSelectorProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

const CLASSES = [
  { id: '1', label: 'Class 1', type: 'Primary', icon: Book },
  { id: '2', label: 'Class 2', type: 'Primary', icon: Book },
  { id: '3', label: 'Class 3', type: 'Primary', icon: Book },
  { id: '4', label: 'Class 4', type: 'Primary', icon: Book },
  { id: '5', label: 'Class 5', type: 'Primary', icon: Book },
  { id: '6', label: 'Class 6', type: 'Secondary', icon: BookOpen },
  { id: '7', label: 'Class 7', type: 'Secondary', icon: BookOpen },
  { id: '8', label: 'Class 8', type: 'Secondary', icon: BookOpen },
  { id: '9', label: 'Class 9', type: 'Secondary', icon: BookOpen },
  { id: '10', label: 'Class 10', type: 'Secondary', icon: BookOpen },
  { id: 'intermediate', label: 'Intermediate', type: 'Higher Education', icon: School },
  { id: 'university', label: 'University', type: 'Higher Education', icon: GraduationCap },
];

const CATEGORIES = ['Primary', 'Secondary', 'Higher Education'];

export function ClassSelector({ value, onChange, error }: ClassSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [direction, setDirection] = useState<'up' | 'down'>('down');
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedClass = CLASSES.find(c => c.id === value);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useLayoutEffect(() => {
    if (isOpen && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const dropdownHeight = 400; // Estimated max height including padding
      const spaceBelow = windowHeight - rect.bottom;
      
      if (spaceBelow < dropdownHeight && rect.top > dropdownHeight) {
        setDirection('up');
      } else {
        setDirection('down');
      }
    }
  }, [isOpen]);

  return (
    <div className="relative w-full" ref={containerRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "w-full h-12 px-4 rounded-2xl border transition-all duration-200 flex items-center justify-between group",
          isOpen 
            ? "bg-background border-violet-500 ring-4 ring-violet-500/10 shadow-sm" 
            : "bg-zinc-50 dark:bg-white/5 border-zinc-300 dark:border-white/10 hover:border-zinc-400 dark:hover:border-white/20",
          error && "border-red-500 bg-red-50/30 dark:bg-red-950/20"
        )}
      >
        <div className="flex items-center gap-3">
          <div className={cn(
            "w-8 h-8 rounded-xl flex items-center justify-center transition-colors",
            isOpen 
              ? "bg-violet-100 dark:bg-violet-500/20 text-violet-600 dark:text-violet-400" 
              : "bg-zinc-100 dark:bg-white/5 text-zinc-500 dark:text-zinc-600"
          )}>
            {selectedClass ? (
              <selectedClass.icon className="w-4.5 h-4.5" />
            ) : (
              <GraduationCap className="w-4.5 h-4.5" />
            )}
          </div>
          <div className="flex flex-col items-start translate-y-[1px]">
            <span className={cn(
              "text-[10px] font-black font-space-grotesk uppercase tracking-widest leading-none",
              isOpen ? "text-violet-500" : "text-zinc-400 dark:text-zinc-500"
            )}>
              {selectedClass ? selectedClass.type : 'Education Level'}
            </span>
            <span className={cn(
              "text-sm font-outfit font-semibold",
              selectedClass ? "text-zinc-900 dark:text-white" : "text-zinc-400 dark:text-zinc-600"
            )}>
              {selectedClass ? selectedClass.label : 'Select your class'}
            </span>
          </div>
        </div>
        <ChevronDown className={cn(
          "w-4 h-4 text-zinc-400 transition-transform duration-300",
          isOpen && "rotate-180 text-violet-500"
        )} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: direction === 'down' ? 10 : -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: direction === 'down' ? 10 : -10, scale: 0.95 }}
            transition={{ type: "spring", duration: 0.35, bounce: 0.2 }}
            className={cn(
              "absolute z-50 left-0 right-0 p-1.5 bg-background dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-white/10 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.1)] overflow-hidden",
              direction === 'down' ? "top-full mt-2" : "bottom-full mb-2"
            )}
          >
            <div className="p-0.5">
              {CATEGORIES.map((category) => (
                <div key={category} className="mb-2 last:mb-0">
                  <div className="flex items-center gap-2 px-2 mb-1">
                    <span className="text-[9px] font-black font-space-grotesk uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-500 whitespace-nowrap">
                      {category}
                    </span>
                    <div className="h-px w-full bg-zinc-100 dark:bg-white/5" />
                  </div>
                  
                  <div className={cn("grid gap-1 px-1", category === 'Higher Education' ? 'grid-cols-2' : 'grid-cols-3')}>
                    {CLASSES.filter(c => c.type === category).map((cls) => {
                      const isSelected = value === cls.id;
                      const Icon = cls.icon;
                      
                      return (
                        <button
                          key={cls.id}
                          type="button"
                          onClick={() => {
                            onChange(cls.id);
                            setIsOpen(false);
                          }}
                          className={cn(
                            "group flex items-center justify-between p-1.5 rounded-lg transition-colors border",
                            isSelected 
                              ? "bg-violet-600 border-violet-600 shadow-sm shadow-violet-200/20" 
                              : "bg-background dark:bg-zinc-900 border-transparent hover:bg-zinc-50 dark:hover:bg-white/5 hover:border-zinc-200 dark:hover:border-white/10"
                          )}
                        >
                          <div className="flex items-center gap-2">
                            <div className={cn(
                              "w-6 h-6 rounded-md flex items-center justify-center transition-colors",
                              isSelected 
                                ? "bg-white/20 text-white" 
                                : "bg-zinc-100 dark:bg-white/5 text-zinc-500 dark:text-zinc-600 group-hover:bg-white dark:group-hover:bg-violet-500 group-hover:text-violet-600 dark:group-hover:text-white"
                            )}>
                              <Icon className="w-3 h-3" />
                            </div>
                            <span className={cn(
                              "text-xs font-outfit font-bold transition-colors",
                              isSelected ? "text-white" : "text-zinc-700 dark:text-zinc-400 group-hover:text-violet-700 dark:group-hover:text-violet-300"
                            )}>
                              {cls.label}
                            </span>
                          </div>
                          {isSelected && (
                            <div className="w-3.5 h-3.5 rounded-full bg-white flex items-center justify-center animate-in zoom-in shadow-xs ml-1 flex-shrink-0">
                              <Check className="w-2 h-2 text-violet-600 stroke-[4px]" />
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
