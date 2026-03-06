'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, useScroll } from 'motion/react';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { Logo } from '@/components/shared/Logo';

const navLinks = [
  { label: 'Features', href: '#features' },
  { label: 'Goals', href: '#goals' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'FAQ', href: '#faq' },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const handleScroll = () => {

      requestAnimationFrame(() => {
        setIsScrolled(window.scrollY > 10);
      });
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
        
        <Link href="/" className="flex items-center group">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Logo className="scale-90 sm:scale-100" />
          </motion.div>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="group relative px-5 py-2.5 text-sm font-semibold font-outfit text-muted-foreground hover:text-foreground transition-colors rounded-xl">
              <span className="relative z-10">{link.label}</span>
              <div className="absolute inset-0 bg-white/60 dark:bg-white/10 rounded-xl opacity-0 scale-95 transition-all duration-200 group-hover:opacity-100 group-hover:scale-100 -z-0" />
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <Button variant="ghost" size="sm" asChild className="font-outfit font-semibold hover:bg-white/10 rounded-xl transition-all">
            <Link href="/login">Log In</Link>
          </Button>
          <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.95 }}>
            <Button size="sm" asChild className="font-outfit font-bold bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white shadow-lg shadow-violet-500/25 border-0 rounded-xl px-6 py-5">
              <Link href="/register">Get Started</Link>
            </Button>
          </motion.div>
        </div>

        <motion.div
          className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-violet-500 to-indigo-600 origin-left"
          style={{ scaleX: scrollYProgress }}
        />

        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="md:hidden p-2.5 rounded-xl hover:bg-accent/50 transition-colors bg-white/5 border border-white/10 relative z-10"
          aria-label="Toggle menu"
        >
          {isMobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
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
                  onClick={() => setIsMobileOpen(false)}
                  className="block px-4 py-3.5 text-base font-bold font-outfit text-muted-foreground hover:text-foreground hover:bg-white/5 rounded-xl transition-all"
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
