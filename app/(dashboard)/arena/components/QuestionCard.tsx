'use client';

import { motion, AnimatePresence } from 'motion/react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, X } from 'lucide-react';

export default function QuestionCard({ question, onAnswer, hasAnswered, selectedOption }: any) {
  return (
    <motion.div
      key={question.id}
      initial={{ opacity: 0, scale: 0.95, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: -30 }}
      className="glass-card p-12 rounded-[3.5rem] border-white/60 dark:border-white/10 shadow-2xl space-y-12 relative overflow-hidden bg-white/50 dark:bg-white/5"
    >
      <div className="absolute top-0 right-0 p-12 opacity-[0.03] transform translate-x-4 -translate-y-4 font-space-grotesk font-black text-[12rem]">
        {question.order_index + 1}
      </div>

      <div className="relative z-10 space-y-6">
          <Badge className="bg-rose-500/10 text-rose-600 border-0 font-black px-4 py-1.5 rounded-xl uppercase tracking-widest text-[10px]">Challenge Quest</Badge>
          <h2 className="text-3xl md:text-5xl font-space-grotesk font-black leading-tight tracking-tight">
            {question.question}
          </h2>
      </div>

      <div className="grid sm:grid-cols-2 gap-5 relative z-10">
        {question.options.map((option: string, index: number) => {
          const isCorrect = option === question.correct_answer;
          const isSelected = selectedOption === option;
          
          let stateStyles = "border-black/5 dark:border-white/10 hover:border-black/20 dark:hover:border-white/20 hover:bg-black/[0.02] dark:hover:bg-white/[0.05]";
          if (hasAnswered) {
            if (isCorrect) stateStyles = "bg-green-500/10 border-green-500/30 text-green-600 shadow-[0_0_20px_rgba(34,197,94,0.1)] scale-[1.02]";
            else if (isSelected) stateStyles = "bg-rose-500/10 border-rose-500/30 text-rose-600 grayscale-[0.5]";
            else stateStyles = "opacity-40 grayscale pointer-events-none";
          }

          return (
            <motion.button
              key={index}
              disabled={hasAnswered}
              whileHover={!hasAnswered ? { scale: 1.02, y: -4 } : {}}
              whileTap={!hasAnswered ? { scale: 0.98 } : {}}
              onClick={() => onAnswer(option)}
              className={`p-8 rounded-[2.5rem] text-left transition-all duration-300 border-2 font-black font-outfit text-lg flex justify-between items-center group/opt ${stateStyles}`}
            >
              <div className="flex gap-5 items-center">
                  <span className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs transition-colors ${isSelected ? 'bg-rose-500 text-white' : isCorrect && hasAnswered ? 'bg-green-500 text-white' : 'bg-black/5 dark:bg-white/10 group-hover/opt:bg-rose-500/10 group-hover/opt:text-rose-600'}`}>
                      {String.fromCharCode(65 + index)}
                  </span>
                  {option}
              </div>
              
              <AnimatePresence>
                  {hasAnswered && (isCorrect || isSelected) && (
                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${isCorrect ? 'bg-green-500' : 'bg-rose-500'}`}
                      >
                        {isCorrect ? <Check className="w-5 h-5 text-white" /> : <X className="w-5 h-5 text-white" />}
                      </motion.div>
                  )}
              </AnimatePresence>
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
}
