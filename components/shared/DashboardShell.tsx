'use client';

import { motion, AnimatePresence } from 'motion/react';
import { Sidebar } from '@/components/shared/Sidebar';
import { Menu, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';

import { Logo } from '@/components/shared/Logo';
import { ThemeToggle } from '@/components/shared/ThemeToggle';

export function DashboardShell({ 
  children, 
  profile, 
  role 
}: { 
  children: React.ReactNode, 
  profile: any, 
  role: string 
}) {
  return (
    <div className="min-h-screen bg-background flex p-4 gap-4 overflow-hidden selection:bg-violet-100 selection:text-violet-900">
      
      <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden bg-[radial-gradient(circle_at_top_right,rgba(139,92,246,0.02),transparent_40%),radial-gradient(circle_at_bottom_left,rgba(99,102,241,0.02),transparent_40%)]">
        <div className="absolute top-[-10%] left-[10%] w-[50vw] h-[50vw] bg-violet-400/5 dark:bg-violet-600/5 blur-[80px] rounded-full transform-gpu will-change-transform" />
        <div className="absolute bottom-[-10%] right-[10%] w-[45vw] h-[45vw] bg-indigo-400/5 dark:bg-indigo-600/5 blur-[80px] rounded-full transform-gpu will-change-transform" />
      </div>

      
      <Sidebar role={role} username={profile?.username || 'User'} />

      <div className="flex-1 flex flex-col min-w-0 h-[calc(100vh-2rem)]">
        
        <header className="h-24 flex items-center justify-between px-8 lg:px-12 mb-4 glass-card rounded-[2.5rem] border-white/80 dark:border-white/10 shrink-0 shadow-[0_8px_32px_-12px_rgba(0,0,0,0.04)] bg-white/70 dark:bg-slate-900/80 transform-gpu">
          <div className="flex items-center gap-6 lg:hidden">
            <Button variant="ghost" size="icon" className="rounded-2xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 hover:bg-black/10 transition-colors">
              <Menu className="w-6 h-6 text-foreground/80" />
            </Button>
            <Logo iconOnly className="scale-90" />
          </div>

          <div className="hidden lg:flex items-center gap-4">
            <div className="px-5 py-2.5 rounded-2xl bg-white/50 dark:bg-white/5 border border-black/5 dark:border-white/10 text-[10px] font-black font-outfit text-muted-foreground uppercase tracking-[0.2em] flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.2)]" />
              Infrastructure: Optimal
            </div>
          </div>

          <div className="flex items-center gap-5">
             <ThemeToggle />
             <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button variant="ghost" size="icon" className="h-12 w-12 rounded-2xl text-muted-foreground hover:bg-black/5 dark:hover:bg-white/5 hover:text-foreground transition-all">
                   <Bell className="w-6 h-6" />
                </Button>
             </motion.div>
             <div className="h-10 w-px bg-black/5 dark:bg-white/10 mx-2 hidden sm:block" />
             <div className="flex items-center gap-4 pl-2 group cursor-pointer">
                <div className="flex flex-col text-right hidden lg:flex">
                  <span className="text-sm font-black font-outfit text-foreground/90">{profile?.username}</span>
                  <span className="text-[10px] font-black font-outfit text-primary uppercase mt-1 tracking-widest">{role}</span>
                </div>
                <div className="w-12 h-12 rounded-[1.25rem] bg-gradient-to-br from-violet-600 to-indigo-600 shadow-lg shadow-violet-500/10 flex items-center justify-center text-white font-black text-base transition-transform group-hover:scale-105 border border-white/20 transform-gpu">
                  {profile?.username?.charAt(0).toUpperCase()}
                </div>
             </div>
          </div>
        </header>

        
        <main className="flex-1 overflow-y-auto custom-scrollbar rounded-[2.5rem] bg-white/40 dark:bg-white/[0.02] border border-white/80 dark:border-white/5 backdrop-blur-xl p-8 lg:p-12 shadow-[0_12px_40px_-16px_rgba(0,0,0,0.04)] dark:shadow-2xl transform-gpu">

           <AnimatePresence mode="wait">
             <motion.div
               key={role} 
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               exit={{ opacity: 0, y: -10 }}
               transition={{ duration: 0.3, ease: 'easeOut' }}
               className="will-change-transform"
             >
               {children}
             </motion.div>
           </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
