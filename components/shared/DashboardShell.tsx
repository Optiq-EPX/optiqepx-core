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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth < 1024) {
        setIsSidebarCollapsed(true);
      } else {
        setIsMobileMenuOpen(false);
      }
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    setImgError(false);
  }, [profile?.avatar_url]);

  useEffect(() => {
    setMounted(true);
    if (isProfileIncomplete && pathname !== '/profile' && pathname !== '/profile/edit') {
      router.push('/profile');
    }
  }, [isProfileIncomplete, pathname, router]);

  const desktopPadding = isSidebarCollapsed ? "112px" : "304px";
  const desktopHeaderLeft = isSidebarCollapsed ? "128px" : "320px";

  return (
    <div 
      className="min-h-screen bg-zinc-50 dark:bg-black flex p-3 lg:p-4 gap-4 selection:bg-violet-100 selection:text-violet-900 font-outfit relative overflow-x-hidden"
    >
      
      <Sidebar 
        role={role} 
        profile={profile} 
        isLocked={isProfileIncomplete} 
        isCollapsed={isMobile ? false : isSidebarCollapsed}
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />

      <motion.div 
        initial={false}
        animate={{ 
          paddingLeft: isMobile ? "0px" : desktopPadding 
        }}
        transition={{ 
          type: "spring", 
          stiffness: 300, 
          damping: 35, 
          mass: 0.8 
        }}
        className="flex-1 flex flex-col min-w-0"
      >
        
        <div className="h-20 lg:h-24 flex-shrink-0" />

        <motion.header 
          initial={false}
          animate={{ 
            left: isMobile ? "12px" : desktopHeaderLeft,
            height: isMobile ? "64px" : "80px"
          }}
          transition={{ 
            type: "spring", 
            stiffness: 300, 
            damping: 35, 
            mass: 0.8 
          }}
          className="flex items-center justify-between px-3 lg:px-10 mb-6 bg-dashboard/80 backdrop-blur-3xl rounded-3xl border border-dashboard-border shadow-sm group fixed top-3 lg:top-4 right-3 lg:right-4 z-40"
        >
          <div className="flex items-center gap-2 lg:gap-6">
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
            
            <div className="lg:hidden flex items-center">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setIsMobileMenuOpen(true)}
                className="h-10 w-10 rounded-xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 hover:bg-black/10 transition-colors"
              >
                <Menu className="w-5 h-5 text-foreground/80" />
              </Button>
            </div>

            <div className="hidden sm:block lg:hidden h-6 w-px bg-black/10 dark:bg-white/10 mx-1" />
            <div className="max-w-[150px] sm:max-w-none truncate">
              <Breadcrumbs iconOnly={isMobile} />
            </div>
          </div>

          <div className="flex items-center gap-2 lg:gap-4">
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

              <div className="flex items-center gap-2">
                <ThemeToggle className="h-9 w-9 lg:h-12 lg:w-12 rounded-xl lg:rounded-2xl text-muted-foreground bg-white/80 dark:bg-white/5 shadow-sm hover:bg-violet-50 dark:hover:bg-violet-500/10 hover:text-violet-600 dark:hover:text-violet-300 transition-all border border-black/5 dark:border-white/5 cursor-pointer" />
              
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button variant="ghost" size="icon" className="h-9 w-9 lg:h-12 lg:w-12 rounded-xl lg:rounded-2xl text-muted-foreground bg-white/80 dark:bg-white/5 shadow-sm hover:bg-violet-50 dark:hover:bg-violet-500/10 hover:text-violet-600 dark:hover:text-violet-300 transition-all border border-black/5 dark:border-white/5 cursor-pointer">
                    <Bell className="w-4.5 h-4.5 lg:w-5 lg:h-5" />
                  </Button>
                </motion.div>
              </div>
              
              <div className="flex items-center gap-2 lg:gap-3 pl-2 lg:pl-4 border-l border-black/10 dark:border-white/10 group cursor-pointer">
                <div className="flex flex-col text-right hidden lg:flex">
                  <span className="text-sm font-black font-space-grotesk text-foreground leading-none">{profile?.username || 'User'}</span>
                  <span className="text-[10px] font-bold font-outfit text-violet-600 dark:text-violet-400 opacity-80 uppercase mt-1">
                    {role}
                  </span>
                </div>
                <div className="w-9 h-9 lg:w-12 lg:h-12 rounded-xl lg:rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-500 shadow-md shadow-violet-500/20 flex items-center justify-center text-white font-black text-xs lg:text-sm border-2 border-white/20 transform-gpu group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500 overflow-hidden shrink-0">
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

        <main className="flex-1 rounded-3xl bg-dashboard border border-dashboard-border backdrop-blur-xl p-3 sm:p-4 lg:p-6 shadow-sm relative z-10 w-full mb-6 lg:mb-8">
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
