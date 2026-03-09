'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { ChevronRight, LayoutDashboard, Layout } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export function Breadcrumbs() {
  const pathname = usePathname();
  const paths = pathname.split('/').filter(p => p);
  
  return (
    <nav className="flex items-center gap-1.5 h-12 px-2 rounded-2xl bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/[0.05] shadow-sm backdrop-blur-md">
      <Link 
        href="/" 
        className="flex items-center justify-center w-8 h-8 rounded-xl bg-white/80 dark:bg-white/5 border border-black/5 dark:border-white/5 hover:bg-violet-50 dark:hover:bg-violet-500/10 text-muted-foreground/60 hover:text-violet-600 dark:hover:text-violet-400 shadow-sm transition-all group cursor-pointer"
      >
        <LayoutDashboard className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
      </Link>

      {paths.map((path, index) => {
        const href = `/${paths.slice(0, index + 1).join('/')}`;
        const isLast = index === paths.length - 1;
        const label = path
          .split('-')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');

        return (
          <div key={path} className="flex items-center gap-1.5 h-full">
            <ChevronRight className="w-3.5 h-3.5 text-zinc-400 dark:text-zinc-600 opacity-40" />
            
            <Link
              href={href}
              className={cn(
                "px-3 py-1.5 rounded-xl transition-all duration-300 font-space-grotesk text-[10px] uppercase tracking-[0.15em] relative group cursor-pointer shadow-sm border",
                isLast 
                  ? "text-violet-600 dark:text-violet-300 font-black bg-white/80 dark:bg-white/5 border-black/5 dark:border-white/10" 
                  : "text-muted-foreground/60 hover:text-violet-600 dark:hover:text-violet-400 bg-white/40 dark:bg-white/0 border-transparent hover:bg-violet-50 dark:hover:bg-violet-500/10 hover:border-black/5 dark:hover:border-white/5"
              )}
            >
              <motion.div
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05, type: "spring", stiffness: 300, damping: 25 }}
                className="flex items-center gap-2 relative z-10"
              >
                {index === 0 && <Layout className="w-3 h-3 text-violet-500" />}
                <span>{label}</span>
              </motion.div>
              
              {isLast && (
                <motion.div 
                  layoutId="breadcrumb-glow"
                  className="absolute inset-0 rounded-xl bg-violet-500/[0.03] shadow-[0_0_15px_rgba(139,92,246,0.1)]"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </Link>
          </div>
        );
      })}
    </nav>
  );
}
