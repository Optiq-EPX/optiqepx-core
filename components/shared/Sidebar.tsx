import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  Swords, 
  Users, 
  Brain, 
  User,
  ChevronRight,
  LogOut,
  ChevronUp,
  Lock
} from 'lucide-react';
import { signOut } from '@/app/auth-actions';
import { Logo } from '@/components/shared/Logo';
import { cn } from '@/lib/utils';

interface SidebarProps {
  role: string;
  profile: any;
  className?: string;
  isLocked?: boolean;
  isCollapsed?: boolean;
  isOpen?: boolean;
  onClose?: () => void;
}

const getNavItems = (role: string) => {
  const baseItems = [
    { label: 'Dashboard', href: `/${role}`, icon: LayoutDashboard },
    { label: 'Battle Arena', href: '/arena', icon: Swords },
    { label: 'Study Rooms', href: '/study-rooms', icon: Users },
    { label: 'AI Assistant', href: '/assistant', icon: Brain },
    { label: 'Profile', href: '/profile', icon: User },
  ];
  return baseItems;
};

export function Sidebar({ role, profile, className, isLocked = false, isCollapsed = false, isOpen = false, onClose }: SidebarProps) {
  const pathname = usePathname();
  const navItems = getNavItems(role);
  const username = profile?.username || 'User';
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [imgError, setImgError] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };
    
    setImgError(false);

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [profile?.avatar_url]);

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <>
      {/* Mobile Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-[100] lg:hidden"
          />
        )}
      </AnimatePresence>

      <motion.aside 
        onMouseMove={handleMouseMove}
        initial={false}
        animate={{ 
          width: isCollapsed ? 96 : 288,
          padding: isCollapsed ? "8px" : "16px"
        }}
        transition={{ 
          type: "spring", 
          stiffness: 400, 
          damping: 30, 
          mass: 0.5 
        }}
        className={cn(
          "flex flex-col h-[calc(100vh-1.5rem)] lg:h-[calc(100vh-2rem)] rounded-3xl bg-dashboard backdrop-blur-3xl border border-dashboard-border fixed top-3 lg:top-4 left-3 lg:left-4 z-[101] lg:z-30 overflow-hidden group/sidebar outline-none",
          !isOpen && "hidden lg:flex",
          isOpen && "flex",
          className
        )}
      >
      <div className="absolute -top-20 -left-20 w-60 h-60 bg-violet-600/[0.04] rounded-full blur-3xl pointer-events-none" />
      
      <div className="absolute -bottom-16 -right-16 w-48 h-48 bg-indigo-600/[0.03] rounded-full blur-3xl pointer-events-none" />

      <div className="absolute top-0 left-0 w-px h-full bg-gradient-to-b from-transparent via-violet-500/20 to-transparent pointer-events-none" />
      
      <div className={cn(
        "px-4 mb-2 mt-2 relative z-10 transition-all duration-500",
        isCollapsed ? "px-1 flex justify-center" : "px-3"
      )}>
        <Link href="/">
          <Logo iconOnly={isCollapsed} animated={false} />
        </Link>
      </div>

      <div className={cn(
        "h-[1px] bg-white/[0.15] mb-4 mt-2",
        isCollapsed ? "mx-2" : "mx-3"
      )} />

      <nav className={cn(
        "flex-1 space-y-1 relative z-10 mt-4",
        isCollapsed ? "px-2" : "px-3"
      )}>
        {navItems.map((item, index) => {
          const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
          const isDisabled = isLocked && item.href !== '/profile';

          return (
            <Link 
              key={item.href} 
              href={isDisabled ? '#' : item.href} 
              className={cn(
                "block relative transition-all duration-300 group/nav-item",
                isDisabled && "cursor-not-allowed pointer-events-none",
                isActive ? "z-10" : "z-0",
                isCollapsed ? "mx-auto" : ""
              )}
            >
              <div className="relative flex items-center h-full">
                {isActive && (
                  <motion.div
                    layoutId="sidebar-active-bg"
                    className="absolute inset-0 rounded-2xl border-l-[4px] border-[#7c3aed] bg-gradient-to-r from-[#7c3aed]/20 to-transparent"
                    initial={false}
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}

                <motion.div
                  whileHover={isDisabled ? {} : { x: isCollapsed ? 0 : 3 }}
                  whileTap={isDisabled ? {} : { scale: 0.97 }}
                  className={cn(
                    "flex items-center transition-all duration-300 relative z-10 w-full",
                    isCollapsed ? "justify-center p-3" : "justify-between px-5 py-3.5",
                    isActive
                      ? ""
                      : "text-[#4a4a5e] hover:text-[#7e7e96] rounded-2xl",
                    !isActive && !isDisabled && "hover:bg-[#141420]/50"
                  )}
                >
                  <div className={cn(
                    "flex items-center font-space-grotesk",
                    isCollapsed ? "gap-0" : "gap-3.5"
                  )}>
                    <div className="relative">
                      <item.icon 
                        strokeWidth={isActive ? 2.2 : 1.8}
                        className={cn(
                          "transition-all duration-500",
                          isCollapsed ? "w-6 h-6" : "w-[19px] h-[19px]",
                          isActive
                            ? "text-[#9333ea]"
                            : "text-[#3a3a4e] group-hover/nav-item:text-[#7a7a94]",
                          !isActive && !isDisabled && "group-hover/nav-item:scale-105",
                          isDisabled && "scale-90"
                        )} 
                      />
                      {isDisabled && isCollapsed && (
                        <div className="absolute -top-1 -right-1 bg-[#14102a] rounded-full p-0.5 border border-[#4a4a5e]/50">
                          <Lock className="w-2.5 h-2.5 text-[#4a4a5e]" />
                        </div>
                      )}
                    </div>
                    {!isCollapsed && (
                      <motion.span
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.03 }}
                        className={cn(
                          "text-[14.5px] transition-all duration-300 whitespace-nowrap",
                          isActive 
                            ? "font-semibold tracking-wide text-[#b89aff]" 
                            : "font-medium tracking-tight",
                          isDisabled && "text-[#3a3a4e]"
                        )}
                      >
                        {item.label}
                      </motion.span>
                    )}
                  </div>

                  {!isCollapsed && (isActive || isDisabled) && (
                    <motion.div
                      initial={{ opacity: 0, x: -4 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1, type: "spring", stiffness: 400, damping: 25 }}
                      className="mr-1"
                    >
                      {isDisabled ? (
                        <Lock className="w-3.5 h-3.5 text-[#3a3a4e]" strokeWidth={2.5} />
                      ) : (
                        <ChevronRight className="w-3.5 h-3.5 text-[#7c3aed] opacity-40" strokeWidth={3} />
                      )}
                    </motion.div>
                  )}
                </motion.div>
              </div>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto relative z-20 pt-4" ref={menuRef}>
        <div className={cn(
          "h-[1px] bg-white/[0.15] mb-4",
          isCollapsed ? "mx-2" : "mx-3"
        )} />

        <AnimatePresence>
          {isUserMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.95, rotateX: -10 }}
              animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
              exit={{ opacity: 0, y: 8, scale: 0.95, rotateX: -10 }}
              transition={{ 
                type: "spring", 
                stiffness: 400, 
                damping: 28,
                mass: 0.6
              }}
              style={{ transformOrigin: "bottom center", perspective: "1000px" }}
              className={cn(
                "absolute bottom-full left-0 right-0 mb-3 bg-[#0a0a12]/98 backdrop-blur-3xl rounded-[1.75rem] border border-white/[0.08] shadow-[0_15px_40px_rgba(0,0,0,0.6),0_0_20px_rgba(124,58,237,0.03)] p-1.5 z-50 overflow-hidden",
                isCollapsed && "w-56 left-0"
              )}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-violet-500/[0.03] to-transparent pointer-events-none" />
              
              {!isCollapsed && (
                <div className="px-3.5 py-2.5 mb-1 relative z-10">
                  <p className="text-[9px] font-black tracking-[0.25em] text-violet-500/50 uppercase mb-0.5">Account</p>
                  <p className="text-[13px] font-bold text-white/90 truncate font-space-grotesk">{username}</p>
                </div>
              )}

              <div className="space-y-0.5 relative z-10">
                <Link href="/profile" onClick={() => setIsUserMenuOpen(false)}>
                  <div className="flex items-center gap-3 px-3.5 py-2.5 rounded-2xl hover:bg-white/[0.03] active:bg-white/[0.06] transition-all duration-200 group cursor-pointer relative overflow-hidden">
                    <div className="w-7 h-7 rounded-xl bg-violet-500/10 flex items-center justify-center group-hover:bg-violet-500/20 transition-colors">
                      <User className="w-3.5 h-3.5 text-violet-400 group-hover:scale-110 transition-transform" />
                    </div>
                    <span className="text-[13px] font-semibold text-[#a0a0b8] group-hover:text-white transition-colors font-outfit">My Profile</span>
                  </div>
                </Link>

                <div className="h-px bg-white/[0.04] mx-3 my-1" />
                
                <form action={handleSignOut}>
                  <button 
                    type="submit"
                    className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl hover:bg-rose-500/[0.06] active:bg-rose-500/[0.1] transition-all duration-200 group cursor-pointer"
                  >
                    <div className="w-7 h-7 rounded-xl bg-rose-500/10 flex items-center justify-center group-hover:bg-rose-500/20 transition-colors">
                      <LogOut className="w-3.5 h-3.5 text-rose-400 group-hover:-translate-x-0.5 transition-transform" />
                    </div>
                    <span className="text-[13px] font-semibold text-rose-400/90 group-hover:text-rose-400 transition-colors font-outfit">Log out</span>
                  </button>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div 
          onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
          className={cn(
            "group flex items-center rounded-2xl bg-[#0e0e18]/60 border border-[#1a1a2e]/60 hover:border-violet-500/20 hover:bg-[#12121f]/80 transition-all duration-500 cursor-pointer relative overflow-hidden",
            isCollapsed ? "justify-center p-2" : "gap-3.5 p-3 pr-4"
          )}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-violet-500/[0.03] to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 pointer-events-none" />
          
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-white font-semibold text-[13px] shrink-0 overflow-hidden transform group-hover:scale-105 transition-all duration-500 relative z-10 shadow-md shadow-violet-500/15 border border-white/10">
            {profile?.avatar_url && !imgError ? (
              <img 
                src={profile.avatar_url} 
                alt={username} 
                className="w-full h-full object-cover" 
                referrerPolicy="no-referrer"
                onError={() => setImgError(true)}
              />
            ) : (
              username?.charAt(0).toUpperCase() || 'U'
            )}
          </div>
          
          {!isCollapsed && (
            <>
              <div className="flex flex-col min-w-0 flex-1 relative z-10">
                <span className="text-[13.5px] font-semibold font-space-grotesk truncate text-[#c8c8d8] group-hover:text-white transition-colors tracking-tight whitespace-nowrap">{username}</span>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.6)] animate-pulse" />
                  <span className="text-[10px] font-medium tracking-widest text-[#555566] group-hover:text-[#8888a0] truncate uppercase transition-colors whitespace-nowrap">
                    {role} • LVL 1
                  </span>
                </div>
              </div>
              <ChevronUp className={cn(
                "w-3.5 h-3.5 text-[#555566] group-hover:text-[#8888a0] transition-all duration-500",
                isUserMenuOpen && "rotate-180 text-violet-300"
              )} />
            </>
          )}
        </div>
      </div>
    </motion.aside>
    </>
  );
}
