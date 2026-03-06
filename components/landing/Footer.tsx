'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import { Separator } from '@/components/ui/separator';
import { Twitter, Github, MessageSquare, Linkedin } from 'lucide-react';
import { Logo } from '@/components/shared/Logo';
import { fadeInUp, staggerContainer } from '@/lib/animations';

const footerLinks = {
  Product: [
    { label: 'Battle Arena', href: '#features' },
    { label: 'Study Rooms', href: '#features' },
    { label: 'AI Tutor', href: '#features' },
    { label: 'Pricing', href: '#pricing' },
  ],
  Company: [
    { label: 'About Us', href: '#goals' },
    { label: 'Our Mission', href: '#goals' },
    { label: 'Blog', href: '#' },
    { label: 'Careers', href: '#' },
  ],
  Support: [
    { label: 'FAQ', href: '#faq' },
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
    <footer className="relative pt-24 pb-10 bg-white dark:bg-slate-950/20">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border/50 to-transparent" />
      
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid grid-cols-2 md:grid-cols-6 gap-12 mb-20"
        >
          {}
          <motion.div variants={fadeInUp} className="col-span-2">
            <Link href="/" className="mb-8 block">
              <Logo />
            </Link>
            <p className="text-muted-foreground font-outfit font-medium text-base mb-10 leading-relaxed max-w-xs">
              Empowering the next generation of scholars through competitive AI-assisted learning and collaborative study environments.
            </p>
            <div className="flex items-center gap-4 mt-8">
              {socials.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  whileHover={{ y: -4, scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2.5 rounded-xl bg-violet-500/5 hover:bg-violet-500/10 border border-violet-500/10 text-muted-foreground hover:text-violet-600 dark:hover:text-violet-400 transition-all shadow-sm"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {}
          {Object.entries(footerLinks).map(([category, links]) => (
            <motion.div variants={fadeInUp} key={category} className="col-span-1">
              <h4 className="font-space-grotesk font-bold text-sm uppercase tracking-widest mb-6 text-foreground">
                {category}
              </h4>
              <ul className="space-y-4">
                {links.map((link) => (
                  <li key={link.label}>
                    <motion.a
                      href={link.href}
                      whileHover={{ x: 4 }}
                      className="text-sm font-outfit font-medium text-muted-foreground hover:text-violet-600 dark:hover:text-violet-400 transition-colors inline-block"
                    >
                      {link.label}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        <Separator className="opacity-20" />

        {}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-10">
          <p className="text-sm text-muted-foreground font-outfit font-medium">
            &copy; {new Date().getFullYear()} OptiqEPX — AI Core for Students.
          </p>
          <div className="flex items-center gap-8 text-sm font-outfit font-bold text-muted-foreground">
            <Link href="#" className="hover:text-violet-600 transition-colors">Privacy</Link>
            <Link href="#" className="hover:text-violet-600 transition-colors">Terms</Link>
            <Link href="#" className="hover:text-violet-600 transition-colors">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
