'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import { Twitter, Github, MessageSquare, Linkedin, ArrowRight, Mail } from 'lucide-react';
import { Logo } from '@/components/shared/Logo';
import { fadeInUp, staggerContainer } from '@/lib/animations';

const footerLinks = {
  Product: [
    { label: 'Battle Arena', href: '/#features' },
    { label: 'Study Rooms', href: '/#features' },
    { label: 'AI Tutor', href: '/#features' },
    { label: 'Pricing', href: '/#pricing' },
  ],
  Company: [
    { label: 'About Us', href: '/#goals' },
    { label: 'Our Mission', href: '/#goals' },
    { label: 'Blog', href: '#' },
    { label: 'Careers', href: '#' },
  ],
  Support: [
    { label: 'FAQ', href: '/#faq' },
    { label: 'Contact', href: '#' },
    { label: 'Help Center', href: '#' },
    { label: 'Status', href: '#' },
  ],
  Legal: [
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Service', href: '#' },
    { label: 'Cookie Policy', href: '#' },
  ],
};

const socials = [
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Github, href: '#', label: 'GitHub' },
  { icon: MessageSquare, href: '#', label: 'Discord' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
];

export function Footer() {
  return (
    <footer className="relative pt-16 pb-6 overflow-hidden bg-white dark:bg-[#070b14]">
      
      {/* Glowing Top Divider */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-500/30 dark:via-violet-500/60 to-transparent" />
      <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-transparent via-violet-500/20 dark:via-violet-500/40 to-transparent blur-sm" />

      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-violet-500/20 dark:bg-violet-500/10 blur-[110px] rounded-full pointer-events-none hidden md:block" style={{ willChange: 'transform', backfaceVisibility: 'hidden', contain: 'layout style paint' }} />
      <div className="absolute bottom-0 left-[-10%] w-[500px] h-[500px] bg-indigo-500/20 dark:bg-indigo-500/10 blur-[110px] rounded-full pointer-events-none hidden md:block" style={{ willChange: 'transform', backfaceVisibility: 'hidden', contain: 'layout style paint' }} />
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.02] mix-blend-overlay pointer-events-none" />

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerContainer}
          className="relative z-10"
        >
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 mb-12">
            <motion.div variants={fadeInUp} className="col-span-2 md:col-span-4 lg:col-span-2">
              <Link 
                href="/" 
                className="mb-5 inline-block"
                onClick={(e) => {
                  if (window.location.pathname === '/') {
                    e.preventDefault();
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }
                }}
              >
                <Logo />
              </Link>
              <p className="text-slate-500 dark:text-slate-400 font-outfit font-medium text-sm leading-relaxed max-w-xs mb-6">
                Empowering the next generation of scholars through competitive AI-assisted learning.
              </p>
              
              <div className="relative group max-w-xs mb-8">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-full blur opacity-0 group-focus-within:opacity-20 transition duration-500" />
                <div className="relative flex items-center bg-white dark:bg-[#0e1016] rounded-full border border-slate-200 dark:border-white/10 p-1.5 shadow-sm transform-gpu transition-[border-color,box-shadow] group-focus-within:border-violet-500/50">
                  <div className="pl-3 pr-2">
                    <Mail className="w-4 h-4 text-slate-400" />
                  </div>
                  <input 
                    type="email" 
                    placeholder="Join our newsletter" 
                    className="flex-1 bg-transparent border-none outline-none text-[13px] font-outfit text-slate-900 dark:text-white placeholder:text-slate-400"
                  />
                  <button className="flex items-center justify-center w-7 h-7 rounded-full bg-violet-600 text-white hover:bg-violet-500 transition-colors transform-gpu will-change-transform active:scale-95">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-3">
                {socials.map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    whileHover={{ y: -4, scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="flex items-center justify-center w-9 h-9 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-500 hover:text-violet-600 hover:bg-violet-50 hover:border-violet-200 dark:text-slate-400 dark:hover:text-violet-400 dark:hover:bg-violet-500/10 dark:hover:border-violet-500/30 transition-colors shadow-sm transform-gpu will-change-transform"
                    aria-label={social.label}
                  >
                    <social.icon className="w-4 h-4" />
                  </motion.a>
                ))}
              </div>
            </motion.div>
            
            {Object.entries(footerLinks).map(([category, links]) => (
              <motion.div variants={fadeInUp} key={category} className="col-span-1 pt-2 lg:pt-5">
                <h4 className="font-outfit font-bold text-xs uppercase tracking-[0.2em] mb-4 text-slate-900 dark:text-white">
                  {category}
                </h4>
                <ul className="space-y-3">
                  {links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-[13px] font-outfit font-medium text-slate-500 hover:text-violet-600 dark:text-slate-400 dark:hover:text-violet-400 transition-colors flex items-center group w-fit relative"
                      >
                        <ArrowRight className="w-3 h-3 absolute left-0 opacity-0 -translate-x-2 transition-all duration-300 transform-gpu group-hover:opacity-100 group-hover:translate-x-0" />
                        <span className="transform-gpu transition-transform duration-300 group-hover:translate-x-5">
                          {link.label}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          <div className="w-full h-px bg-slate-200 dark:bg-white/10 mb-6" />
          
          <motion.div variants={fadeInUp} className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-slate-500 dark:text-slate-400 font-outfit font-medium text-center md:text-left">
              &copy; {new Date().getFullYear()} OptiqEPX Inc. All rights reserved.
            </p>
            <div className="flex items-center flex-wrap justify-center gap-4 sm:gap-6 text-xs font-outfit font-medium text-slate-500 dark:text-slate-400">
              <Link href="#" className="hover:text-violet-600 dark:hover:text-white transition-colors">Privacy Policy</Link>
              <div className="w-[3px] h-[3px] rounded-full bg-slate-300 dark:bg-white/20" />
              <Link href="#" className="hover:text-violet-600 dark:hover:text-white transition-colors">Terms of Service</Link>
              <div className="w-[3px] h-[3px] rounded-full bg-slate-300 dark:bg-white/20" />
              <Link href="#" className="hover:text-violet-600 dark:hover:text-white transition-colors">Cookies</Link>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </footer>
  );
}
