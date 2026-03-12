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
        setIsScrolled(window.scrollY > 0);
      });
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    const hash = href.split('#')[1];
    if (!hash) return;

    const element = document.getElementById(hash);
    if (element) {
      e.preventDefault();
      
      const navHeight = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - navHeight;

      setIsMobileOpen(false);

      setTimeout(() => {
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
        setActiveSection(`#${hash}`);
        
        if (window.location.hash !== `#${hash}`) {
          window.history.pushState(null, '', `#${hash}`);
        }
      }, 10);
    }
  };
  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 py-4"
    >
      <div 
        className={cn(
          "absolute inset-0 transition-all duration-300 pointer-events-none -z-10 border-b",
          (isScrolled || isMobileOpen) 
            ? "bg-white/80 dark:bg-[#020617]/98 backdrop-blur-xl dark:backdrop-blur-3xl border-black/[0.05] dark:border-white/10 shadow-[0_4px_24px_rgba(0,0,0,0.06)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.2)]" 
            : "bg-transparent border-transparent shadow-none"
        )}
      />

      <nav className="container mx-auto max-w-7xl flex items-center justify-between px-4 sm:px-6 lg:px-8">
        
        <Link 
          href="/" 
          className="flex items-center group flex-shrink-0"
          onClick={(e) => {
            if (window.location.pathname === '/') {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
              setIsMobileOpen(false);
            }
          }}
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Logo className="scale-90 sm:scale-100" />
          </motion.div>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = activeSection === `#${link.href.split('#')[1]}`;
            return (
              <Link 
                key={link.href} 
                href={link.href} 
                onClick={(e) => handleNavClick(e, link.href)}
                className="group relative px-2 lg:px-5 py-2.5 text-sm font-bold font-outfit transition-all rounded-xl text-zinc-500 hover:text-foreground line-clamp-1"
              >
                <span className="relative z-10">{link.label}</span>
                <div className={cn(
                  "absolute inset-0 bg-zinc-100 dark:bg-white/5 rounded-xl opacity-0 scale-95 transition-all duration-200 -z-0",
                  !isActive && "group-hover:opacity-100 group-hover:scale-100"
                )} />
              </Link>
            );
          })}
        </div>
        <div className="hidden md:flex items-center gap-2 lg:gap-3 flex-shrink-0">
          <ThemeToggle />
          <Button variant="ghost" size="sm" asChild className="font-outfit font-semibold hover:bg-white/10 rounded-xl transition-all px-2 lg:px-4">
            <Link href="/login">Log In</Link>
          </Button>
          <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.95 }}>
            <Button size="sm" asChild className="font-outfit font-bold bg-[#7623ee] hover:bg-[#7623ee] text-white shadow-lg shadow-violet-500/25 border-0 rounded-xl px-4 lg:px-6 py-5">
              <Link href="/register">Get Started</Link>
            </Button>
          </motion.div>
        </div>
        <div className="flex items-center gap-3 md:hidden relative z-10">
          <ThemeToggle />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="h-10 w-10 rounded-xl transition-all bg-zinc-100 dark:bg-white/10 border border-zinc-200 dark:border-white/10 cursor-pointer flex items-center justify-center shadow-sm"
            aria-label="Toggle menu"
          >
            {isMobileOpen ? (
              <X className="w-5 h-5 text-zinc-900 dark:text-white" />
            ) : (
              <Menu className="w-5 h-5 text-zinc-900 dark:text-white" />
            )}
          </motion.button>
        </div>
      </nav>

      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden overflow-hidden bg-white/95 dark:bg-[#020617]/98 backdrop-blur-3xl border-b border-black/5 dark:border-white/10"
          >
            <div className="px-4 pb-8 pt-4 space-y-2">
              {navLinks.map((link) => (
                <Link 
                  key={link.href} 
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="block px-5 py-4 text-base font-bold font-outfit rounded-xl transition-all text-zinc-500 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-white/5"
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-6 flex items-center gap-3 px-1">
                <Button 
                  variant="outline" 
                  asChild 
                  className="flex-1 font-outfit font-semibold py-6 rounded-2xl border-zinc-200 dark:border-white/10 hover:bg-zinc-100 dark:hover:bg-white/5 transition-all text-[15px]"
                >
                  <Link href="/login" onClick={() => setIsMobileOpen(false)}>Log In</Link>
                </Button>
                <div className="flex-1">
                  <motion.div
                    whileTap={{ scale: 0.98 }}
                    className="w-full"
                  >
                    <Button 
                      asChild 
                      className="w-full font-outfit font-bold py-6 bg-[#7623ee] hover:bg-[#7623ee] text-white border-0 rounded-2xl shadow-lg shadow-violet-500/20 transition-all text-[15px]"
                    >
                      <Link href="/register" onClick={() => setIsMobileOpen(false)}>Get Started</Link>
                    </Button>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isScrolled ? 1 : 0 }}
        className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-violet-600 via-violet-500 to-indigo-600 origin-left z-[60] rounded-r-full pointer-events-none"
        style={{ scaleX: scrollYProgress }}
      />
    </header>
  );
}
