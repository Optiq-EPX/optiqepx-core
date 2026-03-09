'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Sidebar } from '@/components/shared/Sidebar';
import { Menu, Bell, PanelLeft, PanelRight, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { Logo } from '@/components/shared/Logo';
import { ThemeToggle } from '@/components/shared/ThemeToggle';
import { Breadcrumbs } from '@/components/shared/Breadcrumbs';

export function DashboardShell({ 
  children, 
  profile, 
  role,
  isProfileIncomplete = false
}: { 
  children: React.ReactNode, 
  profile: any, 
  role: string,
  isProfileIncomplete?: boolean
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    setImgError(false);
  }, [profile?.avatar_url]);

  useEffect(() => {
    setMounted(true);
    if (isProfileIncomplete && pathname !== '/profile') {
      router.push('/profile');
    }
  }, [isProfileIncomplete, pathname, router]);

  return (
    <div 
      className="min-h-screen bg-zinc-50 dark:bg-black flex p-4 lg:p-4 gap-4 selection:bg-violet-100 selection:text-violet-900 font-outfit relative overflow-x-hidden"
    >
      
      <Sidebar 
        role={role} 
        profile={profile} 
        isLocked={isProfileIncomplete} 
        isCollapsed={isSidebarCollapsed}
      />

      <motion.div 
        initial={false}
        animate={{ 
          paddingLeft: isSidebarCollapsed ? "112px" : "304px" 
        }}
        transition={{ 
          type: "spring", 
          stiffness: 300, 
          damping: 35, 
          mass: 0.8 
        }}
        className="flex-1 flex flex-col min-w-0"
      >
        
        <div className="h-24 flex-shrink-0" />

        <motion.header 
          initial={false}
          animate={{ 
            left: isSidebarCollapsed ? "128px" : "320px" 
          }}
          transition={{ 
            type: "spring", 
            stiffness: 300, 
            damping: 35, 
            mass: 0.8 
          }}
          className="h-20 flex items-center justify-between px-8 lg:px-10 mb-6 bg-dashboard backdrop-blur-3xl rounded-3xl border border-dashboard-border shadow-sm group fixed top-4 right-4 z-40"
        >
          <div className="flex items-center gap-6">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="hidden lg:block">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                className="h-12 w-12 rounded-2xl text-muted-foreground bg-white/80 dark:bg-white/5 shadow-sm hover:bg-violet-50 dark:hover:bg-violet-500/10 hover:text-violet-600 dark:hover:text-violet-300 transition-all border border-black/5 dark:border-white/5 cursor-pointer"
              >
                {isSidebarCollapsed ? <PanelRight className="w-5 h-5" /> : <PanelLeft className="w-5 h-5" />}
              </Button>
            </motion.div>
            
            <div className="lg:hidden flex items-center gap-4">
              <Button variant="ghost" size="icon" className="rounded-2xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 hover:bg-black/10 transition-colors">
                <Menu className="w-6 h-6 text-foreground/80" />
              </Button>
              <Logo iconOnly animated={false} className="scale-90" />
            </div>

            <div className="hidden sm:block h-6 w-px bg-black/10 dark:bg-white/10 mx-2" />
            <Breadcrumbs />
          </div>

          <div className="flex items-center gap-4">
              <div className="hidden xl:flex items-center gap-3 px-4 py-2 rounded-2xl bg-white/80 dark:bg-white/5 border border-black/5 dark:border-white/5 shadow-sm group hover:border-amber-500/30 transition-all duration-300 cursor-pointer">
                <div className="w-8 h-8 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-500">
                  <Zap className="w-4 h-4 fill-amber-500/20 group-hover:scale-110 transition-transform" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-black font-space-grotesk text-amber-500/60 uppercase tracking-widest leading-none mb-0.5">Global Rank</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-black font-space-grotesk text-foreground">LVL {profile?.level || 1}</span>
                    <div className="w-1.5 h-1.5 rounded-full bg-zinc-700" />
                    <span className="text-xs font-bold font-outfit text-muted-foreground">{profile?.xp || 0} XP</span>
                  </div>
                </div>
              </div>

              <ThemeToggle className="h-12 w-12 rounded-2xl text-muted-foreground bg-white/80 dark:bg-white/5 shadow-sm hover:bg-violet-50 dark:hover:bg-violet-500/10 hover:text-violet-600 dark:hover:text-violet-300 transition-all border border-black/5 dark:border-white/5 cursor-pointer" />
             
             <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button variant="ghost" size="icon" className="h-12 w-12 rounded-2xl text-muted-foreground bg-white/80 dark:bg-white/5 shadow-sm hover:bg-violet-50 dark:hover:bg-violet-500/10 hover:text-violet-600 dark:hover:text-violet-300 transition-all border border-black/5 dark:border-white/5 cursor-pointer">
                   <Bell className="w-5 h-5" />
                </Button>
             </motion.div>
             
             <div className="flex items-center gap-3 pl-4 border-l border-black/10 dark:border-white/10 group cursor-pointer">
                <div className="flex flex-col text-right hidden lg:flex">
                  <span className="text-sm font-black font-space-grotesk text-foreground leading-none">{profile?.username || 'User'}</span>
                  <span className="text-[10px] font-bold font-outfit text-violet-600 dark:text-violet-400 opacity-80 uppercase mt-1">
                    {role}
                  </span>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-500 shadow-md shadow-violet-500/20 flex items-center justify-center text-white font-black text-sm border-2 border-white/20 transform-gpu group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500 overflow-hidden">
                  {profile?.avatar_url && !imgError ? (
                    <img 
                      src={profile.avatar_url} 
                      alt={profile.username} 
                      className="w-full h-full object-cover" 
                      referrerPolicy="no-referrer"
                      onError={() => setImgError(true)}
                    />
                  ) : (
                    profile?.username?.charAt(0).toUpperCase() || 'U'
                  )}
                </div>
             </div>
          </div>
        </motion.header>

        <main className="flex-1 rounded-3xl bg-dashboard border border-dashboard-border backdrop-blur-xl p-4 lg:p-6 shadow-sm relative z-10 w-full mb-8">
           <AnimatePresence mode="wait">
             <motion.div
               key={role} 
               initial={{ opacity: 0, scale: 0.98, y: 15 }}
               animate={{ opacity: 1, scale: 1, y: 0 }}
               exit={{ opacity: 0, scale: 0.98, y: -15 }}
               transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
               className="will-change-transform flex flex-col min-h-full"
             >
               {children}
             </motion.div>
           </AnimatePresence>
        </main>
      </motion.div>
    </div>
  );
}
