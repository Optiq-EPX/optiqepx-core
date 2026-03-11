'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, useScroll } from 'motion/react';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { Logo } from '@/components/shared/Logo';
import { ThemeToggle } from '@/components/shared/ThemeToggle';
import { cn } from '@/lib/utils';

const navLinks = [
  { label: 'Features', href: '/#features' },
  { label: 'Goals', href: '/#goals' },
  { label: 'Pricing', href: '/#pricing' },
  { label: 'FAQ', href: '/#faq' },
];

export function Navbar() {
  const [activeSection, setActiveSection] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const observerOptions = {
      root: null,
      threshold: 0.5,
      rootMargin: '-80px 0px -40% 0px'
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(`#${entry.target.id}`);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    navLinks.forEach((link) => {
      const id = link.href.split('#')[1];
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleScroll = () => {

      requestAnimationFrame(() => {
        setIsScrolled(window.scrollY > 10);
      });
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('/#') && window.location.pathname === '/') {
      e.preventDefault();
      const id = href.replace('/#', '');
      const element = document.getElementById(id);
      if (element) {
        const offset = 80;
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = element.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }
  };

  return (
    <motion.header
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out py-4"
    >
      
      <div 
        className={`absolute inset-0 transition-all duration-300 pointer-events-none -z-10 ${
          isScrolled 
            ? 'bg-white/70 dark:bg-slate-900/80 backdrop-blur-lg border-b border-black/5 dark:border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.04)]' 
            : 'bg-transparent backdrop-blur-none border-transparent shadow-none'
        }`}
      />

      <nav className="container mx-auto max-w-7xl flex items-center justify-between px-4 sm:px-6 lg:px-8">
        
        <Link 
          href="/" 
          className="flex items-center group flex-shrink-0"
          onClick={(e) => {
            if (window.location.pathname === '/') {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
          }}
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Logo textOnly className="scale-90 sm:scale-100" />
          </motion.div>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href;
            return (
              <Link 
                key={link.href} 
                href={link.href} 
                onClick={(e) => handleNavClick(e, link.href)}
                className={cn(
                  "group relative px-5 py-2.5 text-sm font-bold font-outfit transition-all rounded-xl",
                  isActive ? "text-violet-600 dark:text-violet-400" : "text-zinc-500 hover:text-foreground"
                )}
              >
                <span className="relative z-10">{link.label}</span>
                {isActive && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute inset-0 bg-violet-500/5 dark:bg-violet-500/10 rounded-xl -z-0"
                    transition={{ type: 'spring', bounce: 0.25, duration: 0.5 }}
                  />
                )}
                <div className={cn(
                  "absolute inset-0 bg-zinc-100 dark:bg-white/5 rounded-xl opacity-0 scale-95 transition-all duration-200 -z-0",
                  !isActive && "group-hover:opacity-100 group-hover:scale-100"
                )} />
              </Link>
            );
          })}
        </div>

        <div className="hidden md:flex items-center gap-3 flex-shrink-0">
          <ThemeToggle className="h-10 w-10 rounded-xl transition-all hover:bg-slate-100 dark:hover:bg-white/10 cursor-pointer" />
          <Button variant="ghost" size="sm" asChild className="font-outfit font-semibold hover:bg-white/10 rounded-xl transition-all">
            <Link href="/login">Log In</Link>
          </Button>
          <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.95 }}>
            <Button size="sm" asChild className="font-outfit font-bold bg-[#7623ee] hover:bg-[#7623ee] text-white shadow-lg shadow-violet-500/25 border-0 rounded-xl px-6 py-5">
              <Link href="/register">Get Started</Link>
            </Button>
          </motion.div>
        </div>

        <motion.div
          className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-violet-500 to-indigo-600 origin-left"
          style={{ scaleX: scrollYProgress }}
        />

        <div className="flex items-center gap-2 md:hidden relative z-10">
          <ThemeToggle className="cursor-pointer" />
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="p-2.5 rounded-xl hover:bg-accent/50 transition-colors bg-white/5 border border-white/10 cursor-pointer"
            aria-label="Toggle menu"
          >
            {isMobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden overflow-hidden bg-background/95 backdrop-blur-2xl border-b border-border/50"
          >
            <div className="px-4 pb-8 pt-4 space-y-2">
              {navLinks.map((link) => (
                <Link 
                  key={link.href} 
                  href={link.href}
                  onClick={(e) => {
                    setIsMobileOpen(false);
                    handleNavClick(e, link.href);
                  }}
                  className={cn(
                    "block px-5 py-4 text-base font-bold font-outfit rounded-xl transition-all",
                    activeSection === link.href 
                      ? "bg-violet-500/10 text-violet-600 dark:text-violet-400" 
                      : "text-zinc-500 hover:text-foreground hover:bg-zinc-100 dark:hover:bg-white/5"
                  )}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-4 flex flex-col gap-3 px-4">
                <Button variant="outline" asChild className="w-full font-outfit font-semibold py-6 rounded-xl border-white/10">
                  <Link href="/login">Log In</Link>
                </Button>
                <Button asChild className="w-full font-outfit font-bold py-6 bg-gradient-to-r from-violet-600 to-indigo-600 text-white border-0 rounded-xl">
                  <Link href="/register">Get Started Free</Link>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
