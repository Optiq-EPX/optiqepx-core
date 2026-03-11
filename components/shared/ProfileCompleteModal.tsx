'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Sparkles, Zap, ArrowRight, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

const XP_REWARD = 50;

export function ProfileCompleteModal({ 
  isOpen, 
  onClose,
  username
}: { 
  isOpen: boolean, 
  onClose: () => void,
  username?: string
}) {
  const [countedXp, setCountedXp] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    let current = 0;
    const interval = setInterval(() => {
      current += 2;
      if (current >= XP_REWARD) {
        current = XP_REWARD;
        clearInterval(interval);
      }
      setCountedXp(current);
    }, 30);
    return () => clearInterval(interval);
  }, [isOpen]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[200]"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            className="fixed inset-0 flex items-center justify-center z-[201] p-4 pointer-events-none"
          >
            <div className="relative w-full max-w-md pointer-events-auto">
              <button 
                onClick={onClose}
                className="absolute -top-3 -right-3 z-10 w-8 h-8 rounded-full bg-zinc-800 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-700 transition-all cursor-pointer shadow-lg"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-b from-zinc-900 to-black border border-white/10 shadow-2xl shadow-violet-500/10">
                
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-violet-500/30 rounded-full blur-[100px] pointer-events-none" />
                <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-indigo-500/20 rounded-full blur-[80px] pointer-events-none" />
                
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  {[...Array(6)].map((_, i) => (
                    <motion.div
                      key={i}
                      animate={{
                        y: [-20, -60, -20],
                        x: [0, (i % 2 === 0 ? 15 : -15), 0],
                        opacity: [0.3, 0.8, 0.3],
                      }}
                      transition={{
                        duration: 3 + i * 0.5,
                        repeat: Infinity,
                        delay: i * 0.3,
                      }}
                      className="absolute w-1.5 h-1.5 rounded-full bg-violet-400"
                      style={{
                        left: `${15 + i * 15}%`,
                        top: `${40 + (i % 3) * 20}%`,
                      }}
                    />
                  ))}
                </div>

                <div className="relative z-10 px-8 pt-12 pb-8 flex flex-col items-center text-center">
                  <motion.div
                    initial={{ scale: 0, rotate: -20 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.2 }}
                    className="relative mb-8"
                  >
                    <div className="absolute inset-0 bg-emerald-500/40 blur-[40px] rounded-full animate-pulse" />
                    <div className="absolute -inset-4 bg-green-400/20 blur-[20px] rounded-full transition-all duration-1000" />
                    
                    <motion.div
                      animate={{ rotate: 360, scale: [1, 1.05, 1] }}
                      transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                      className="absolute -inset-6 border border-emerald-500/10 rounded-[2.5rem]"
                    />
                    <motion.div
                      animate={{ rotate: -360, scale: [1, 1.1, 1] }}
                      transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
                      className="absolute -inset-3 border border-emerald-500/20 border-dashed rounded-[2rem]"
                    />

                    <div className="relative w-24 h-24 rounded-[2rem] bg-gradient-to-br from-emerald-400 via-emerald-500 to-green-600 flex items-center justify-center shadow-[0_0_50px_rgba(16,185,129,0.4)] border border-white/20 overflow-hidden group">
                      <div className="absolute top-0 left-0 w-full h-1/2 bg-white/20 skew-y-[-15deg] -translate-y-4 pointer-events-none" />
                      
                      <motion.div
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                      >
                        <CheckCircle2 className="w-12 h-12 text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.2)]" strokeWidth={2.5} />
                      </motion.div>

                      <div className="absolute inset-0 pointer-events-none">
                        {[...Array(3)].map((_, i) => (
                          <motion.div
                            key={i}
                            animate={{
                              scale: [0, 1, 0],
                              opacity: [0, 1, 0],
                              x: [0, (i - 1) * 20, 0],
                              y: [0, (i - 1) * -20, 0]
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              delay: i * 0.5
                            }}
                            className="absolute w-1 h-1 bg-white rounded-full"
                            style={{
                              left: `${40 + i * 10}%`,
                              top: `${40 + i * 10}%`,
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  </motion.div>

                  <motion.h2
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-3xl font-space-grotesk font-black text-white tracking-tight mb-2"
                  >
                    Profile Complete! 🎉
                  </motion.h2>

                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-zinc-400 font-outfit text-sm mb-8 max-w-xs leading-relaxed"
                  >
                    Welcome aboard, <span className="text-white font-bold">{username || 'Champion'}</span>! 
                    Your identity is locked in. All features are now unlocked.
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 }}
                    className="w-full p-5 rounded-2xl bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20 mb-6"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center">
                          <Zap className="w-5 h-5 text-amber-400 fill-amber-400/20" />
                        </div>
                        <div className="text-left">
                          <p className="text-[10px] font-black uppercase tracking-widest text-amber-500/70 font-space-grotesk">XP Earned</p>
                          <p className="text-xs font-outfit text-zinc-400">Profile completion bonus</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-3xl font-space-grotesk font-black text-amber-400">+{countedXp}</span>
                        <p className="text-[10px] font-black uppercase tracking-widest text-amber-500/50 font-space-grotesk">XP</p>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="w-full space-y-2 mb-8"
                  >
                    {[
                      'Study Rooms & Collaboration',
                      'Arena Battles & Challenges',
                      'AI-Powered Assistant',
                    ].map((feature, i) => (
                      <motion.div
                        key={feature}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.7 + i * 0.1 }}
                        className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-white/5 border border-white/5"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-violet-400 shrink-0" />
                        <span className="text-xs font-outfit font-bold text-zinc-300">{feature}</span>
                        <span className="ml-auto text-[9px] font-black uppercase tracking-widest text-emerald-400 font-space-grotesk">Unlocked</span>
                      </motion.div>
                    ))}
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9 }}
                    className="w-full"
                  >
                    <Button
                      onClick={onClose}
                      className="w-full h-14 rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-black font-space-grotesk uppercase tracking-widest text-sm shadow-xl shadow-violet-500/20 border-0 transition-all cursor-pointer group"
                    >
                      Start Exploring
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
}
