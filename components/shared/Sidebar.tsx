'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'motion/react';
import { 
  LayoutDashboard, 
  Swords, 
  Users, 
  Brain, 
  Settings, 
  ChevronRight,
  LogOut
} from 'lucide-react';
import { signOut } from '@/app/auth-actions';
import { Logo } from '@/components/shared/Logo';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface SidebarProps {
  role: string;
  username: string;
  className?: string;
}

const getNavItems = (role: string) => {
  const baseItems = [
    { label: 'Dashboard', href: `/${role}`, icon: LayoutDashboard },
    { label: 'Battle Arena', href: '/arena', icon: Swords },
    { label: 'Study Rooms', href: '/study-rooms', icon: Users },
    { label: 'AI Assistant', href: '/assistant', icon: Brain },
  ];

  if (role === 'admin' || role === 'moderator') {

  }

  return baseItems;
};

export function Sidebar({ role, username, className }: SidebarProps) {
  const pathname = usePathname();
  const navItems = getNavItems(role);

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <aside className={cn(
      "hidden lg:flex flex-col w-72 h-[calc(100vh-2rem)] sticky top-4 left-4 rounded-[2.5rem] glass-card border-white/40 dark:border-white/5 shadow-2xl p-6 transition-all duration-500",
      className
    )}>
      {}
      <div className="px-2 mb-10">
        <Link href="/">
          <Logo />
        </Link>
      </div>

      {}
      <nav className="flex-1 space-y-2.5 relative">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));

          return (
            <Link key={item.href} href={item.href} className="block relative">
              <div className="relative group">
                {isActive && (
                  <motion.div
                    layoutId="sidebar-active-glow"
                    className="absolute inset-0 bg-gradient-to-r from-violet-600/10 to-transparent dark:from-violet-500/20 rounded-[1.25rem] border-l-4 border-violet-600"
                    initial={false}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}

                <motion.div
                  whileHover={{ x: isActive ? 0 : 4 }}
                  whileTap={{ scale: 0.98 }}
                  className={cn(
                    "flex items-center justify-between px-5 py-4 rounded-[1.25rem] transition-all duration-300 transform-gpu relative z-10",
                    isActive
                      ? "text-violet-700 dark:text-violet-400 font-black"
                      : "text-muted-foreground hover:text-foreground/80"
                  )}
                >
                  <div className="flex items-center gap-4 font-outfit font-bold text-sm tracking-tight">
                    <item.icon className={cn(
                      "w-5 h-5 transition-all duration-500",
                      isActive
                        ? "text-violet-600 scale-110 rotate-0"
                        : "text-muted-foreground/60 group-hover:text-primary group-hover:rotate-12"
                    )} />
                    {item.label}
                  </div>

                  {isActive ? (
                    <motion.div
                      layoutId="active-indicator-dot"
                      className="w-1.5 h-1.5 rounded-full bg-violet-600 shadow-[0_0_8px_rgba(139,92,246,0.6)]"
                    />
                  ) : (
                    <ChevronRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-40 group-hover:translate-x-0 transition-all duration-300" />
                  )}
                </motion.div>
              </div>
            </Link>
          );
        })}
      </nav>

      {}
      <div className="mt-auto pt-6 border-t border-black/5 dark:border-white/5">
        <div className="flex items-center gap-4 px-2 mb-6 group cursor-pointer">
          <div className="w-12 h-12 rounded-2xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-600 font-black text-sm uppercase transition-colors group-hover:bg-violet-500/20 transform-gpu">
            {username?.charAt(0) || 'U'}
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-sm font-black font-outfit truncate text-foreground/90">{username}</span>
            <span className="text-[10px] font-black font-outfit text-muted-foreground uppercase tracking-widest opacity-60">
              {role} Account
            </span>
          </div>
        </div>
        <form action={handleSignOut}>
          <Button type="submit" variant="ghost" className="w-full justify-start gap-4 rounded-2xl hover:bg-rose-500/10 hover:text-rose-600 text-muted-foreground py-7 transition-[background-color,color,transform] transform-gpu">
            <LogOut className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
            <span className="font-bold text-sm font-outfit uppercase tracking-wider">Sign Out</span>
          </Button>
        </form>
      </div>
    </aside>
  );
}
