'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { fadeInUp, fadeInDown, staggerContainer } from '@/lib/animations';
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

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      initial="hidden"
      animate="visible"
      variants={fadeInDown}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'glass-morphism py-3 shadow-lg shadow-black/5'
          : 'bg-transparent py-5'
      }`}
    >
      <nav className="container mx-auto max-w-7xl flex items-center justify-between px-4 sm:px-6 lg:px-8">
        {}
        <Link href="/" className="flex items-center group">
          <Logo className="scale-90 sm:scale-100" />
        </Link>

        {}
        <motion.div 
          variants={staggerContainer}
          className="hidden md:flex items-center gap-1 bg-white/5 dark:bg-white/10 p-1.5 rounded-2xl backdrop-blur-sm border border-white/10"
        >
          {navLinks.map((link) => (
            <motion.a
              key={link.href}
              href={link.href}
              variants={fadeInDown}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 text-sm font-semibold font-outfit text-muted-foreground hover:text-foreground transition-all rounded-xl hover:bg-white/10"
            >
              {link.label}
            </motion.a>
          ))}
        </motion.div>

        {}
        <div className="hidden md:flex items-center gap-3">
          <Button variant="ghost" size="sm" asChild className="font-outfit font-semibold hover:bg-white/10 rounded-xl transition-all">
            <Link href="/login">Log In</Link>
          </Button>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button size="sm" asChild className="font-outfit font-bold bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white shadow-lg shadow-violet-500/25 border-0 rounded-xl px-6">
              <Link href="/register">Get Started</Link>
            </Button>
          </motion.div>
        </div>

        {}
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="md:hidden p-2.5 rounded-xl hover:bg-accent/50 transition-colors bg-white/5 border border-white/10"
          aria-label="Toggle menu"
        >
          {isMobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      {}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="md:hidden overflow-hidden"
          >
            <div className="px-4 pb-8 pt-4 bg-background/95 backdrop-blur-2xl border-b border-border/50 space-y-2">
              {navLinks.map((link) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  onClick={() => setIsMobileOpen(false)}
                  className="block px-4 py-3.5 text-base font-bold font-outfit text-muted-foreground hover:text-foreground hover:bg-white/5 rounded-xl transition-all"
                >
                  {link.label}
                </motion.a>
              ))}
              <div className="pt-4 flex flex-col gap-3">
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
