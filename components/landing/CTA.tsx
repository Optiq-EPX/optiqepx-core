'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Users, MessageSquare, Rocket } from 'lucide-react';
import { LandingButton } from '@/components/shared/LandingButton';
import { fadeInUp, staggerContainer } from '@/lib/animations';

export function CTA() {
  return (
    <section className="py-24 sm:py-32 relative overflow-hidden bg-white dark:bg-background">
      
      <div className="absolute inset-0 -z-10 opacity-30 dark:opacity-100">
        <motion.div 
          animate={{ x: [-20, 20, -20], y: [-20, 20, -20], scale: [1, 1.1, 1] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-gradient-to-br from-violet-600/10 via-indigo-600/10 to-cyan-500/5 dark:from-violet-600/20 dark:via-indigo-600/15 dark:to-cyan-500/10 rounded-full blur-[120px]" 
          style={{ willChange: 'transform', backfaceVisibility: 'hidden', contain: 'layout style paint' }}
        />
      </div>

      <div className="container mx-auto max-w-[1040px] px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="relative px-6 py-16 sm:px-12 sm:py-24 md:py-28 rounded-[2.5rem] sm:rounded-[40px] bg-white dark:bg-[#07080F] border border-slate-200 dark:border-white/5 text-slate-900 dark:text-white text-center shadow-xl dark:shadow-2xl overflow-hidden isolate group/card"
        >

          <div className="absolute inset-0 bg-gradient-to-b from-violet-500/5 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-700" />
          

          <div 
            className="absolute inset-0 -z-10 opacity-100 dark:hidden" 
            style={{ 
              backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.15) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.15) 1px, transparent 1px)`, 
              backgroundSize: '48px 48px',
              maskImage: 'radial-gradient(ellipse 50% 50% at 50% 50%, #000 0%, transparent 80%)',
              WebkitMaskImage: 'radial-gradient(ellipse 50% 50% at 50% 50%, #000 0%, transparent 80%)'
            }} 
          />


          <div 
            className="absolute inset-0 -z-10 opacity-100 hidden dark:block" 
            style={{ 
              backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.15) 1px, transparent 1px)`, 
              backgroundSize: '48px 48px',
              maskImage: 'radial-gradient(ellipse 50% 50% at 50% 50%, #000 0%, transparent 80%)',
              WebkitMaskImage: 'radial-gradient(ellipse 50% 50% at 50% 50%, #000 0%, transparent 80%)'
            }} 
          />
          
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] bg-violet-500/10 dark:bg-violet-600/20 blur-[100px] rounded-full pointer-events-none" />

          <div className="relative z-10 flex flex-col items-center">
            

            <motion.div variants={fadeInUp} className="flex flex-col items-center justify-center mb-8 relative">
              <div className="flex items-center justify-center relative">
                <div className="flex -space-x-3 items-center">

                  <div className="w-12 h-12 rounded-full border-[3px] border-white dark:border-[#0A0A0B] bg-gradient-to-br from-[#FF6B6B] to-[#FF8E53] flex items-center justify-center z-10 translate-y-1 shadow-md dark:shadow-lg transition-transform hover:-translate-y-1 hover:z-40">
                    <Users className="w-5 h-5 text-white/80" />
                  </div>

                  <div className="w-12 h-12 rounded-full border-[3px] border-white dark:border-[#0A0A0B] bg-gradient-to-br from-[#00C6FF] to-[#0072FF] flex items-center justify-center z-20 transition-transform hover:-translate-y-2 hover:z-40">
                    <Users className="w-5 h-5 text-white/80" />
                  </div>

                  <div className="w-14 h-14 rounded-full border-[3px] border-white dark:border-[#0A0A0B] bg-gradient-to-br from-[#00F260] to-[#0575E6] flex items-center justify-center z-30 -translate-y-1 transition-transform hover:-translate-y-3 hover:z-40 shadow-[0_0_20px_rgba(0,242,96,0.3)]">
                     <Users className="w-6 h-6 text-white/90" />
                  </div>

                  <div className="w-12 h-12 rounded-full border-[3px] border-white dark:border-[#0A0A0B] bg-gradient-to-br from-[#E100FF] to-[#7F00FF] flex items-center justify-center z-20 transition-transform hover:-translate-y-2 hover:z-40">
                    <Users className="w-5 h-5 text-white/80" />
                  </div>

                  <div className="w-12 h-12 rounded-full border-[3px] border-white dark:border-[#0A0A0B] bg-gradient-to-br from-[#3b2165] to-[#20103b] flex items-center justify-center z-10 translate-y-1 transition-transform hover:-translate-y-1 hover:z-40">
                    <span className="text-xs font-bold font-space-grotesk text-white">+5k</span>
                  </div>
                </div>
              </div>


              <div className="mt-8 mb-2 inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-slate-100 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 shadow-sm dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.05),0_4px_20px_rgba(0,0,0,0.4)] backdrop-blur-md">
                <span className="w-2.5 h-2.5 rounded-full bg-[#00F260] shadow-[0_0_10px_rgba(0,242,96,0.4)] dark:shadow-[0_0_10px_rgba(0,242,96,0.8)] animate-pulse"></span>
                <span className="text-[12px] font-bold text-slate-700 dark:text-slate-300 font-outfit uppercase tracking-[0.25em]">Global Community</span>
              </div>
            </motion.div>

            <motion.h2 
              variants={fadeInUp}
              className="text-4xl sm:text-5xl lg:text-[62px] font-space-grotesk font-bold tracking-[-0.02em] mb-7 leading-[1.1] max-w-[800px] text-slate-900 dark:text-white"
            >
              Don't study <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-indigo-600 dark:from-violet-400 dark:to-indigo-400">alone</span>.<br className="hidden sm:block" /> Join thousands like you.
            </motion.h2>
            
            <motion.p 
              variants={fadeInUp}
              className="text-base sm:text-[18px] text-slate-600 dark:text-slate-400 font-outfit mb-12 max-w-2xl mx-auto leading-[1.6] opacity-95"
            >
              Connect with ambitious learners worldwide. Compete in live arenas, host silent study rooms, and share your victories with a community that pushes you forward.
            </motion.p>
            

            <motion.div 
              variants={fadeInUp}
              className="flex flex-col sm:flex-row items-center gap-4 mb-8 mt-5"
            >
              <LandingButton 
                href="/register" 
                size="lg" 
                icon={Rocket}
                iconPosition="left"
              >
                Create Free Account
              </LandingButton>
              <LandingButton 
                href="#" 
                variant="ghost" 
                size="lg" 
                className="font-outfit font-semibold"
              >
                <div className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 127.14 96.36" fill="currentColor" className="w-[15px] h-[15px] group-hover:text-[#5865F2] transition-colors duration-300">
                    <path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.31,60,73.31,53s5-12.74,11.43-12.74S96,46,95.89,53,91.08,65.69,84.69,65.69Z"/>
                  </svg>
                  Join our Discord
                </div>
              </LandingButton>
            </motion.div>
            
          </div>
        </motion.div>
      </div>
    </section>
  );
}
