'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import { LoginForm } from '@/features/auth/components/LoginForm';
import { Logo } from '@/components/shared/Logo';
import { Trophy, Brain, Users, ArrowLeft, ShieldCheck, ArrowRight } from 'lucide-react';

const features = [
  { icon: Trophy, label: 'Battle Arena', desc: 'AI-powered real-time study duels' },
  { icon: Brain, label: 'AI Tutor', desc: 'Personalized 24/7 learning support' },
  { icon: Users, label: 'Live Study Rooms', desc: 'Collaborate with your class' },
];

export default function LoginPage() {
  return (
    <div className="h-screen flex bg-[#09090b] overflow-hidden">

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
        className="hidden lg:flex lg:w-[52%] relative flex-col justify-between px-12 py-10 overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a0533] via-[#0f0a2e] to-[#090720]" />

        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -left-20 w-[500px] h-[500px] bg-violet-600/20 rounded-full blur-[120px]" />
          <div className="absolute top-1/2 right-0 w-[350px] h-[400px] bg-indigo-500/15 rounded-full blur-[100px]" />
          <div className="absolute bottom-0 left-1/4 w-[400px] h-[250px] bg-violet-900/30 rounded-full blur-[80px]" />
          <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(circle, rgba(160,120,255,1) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
          {[
            { w: 70, h: 70, top: '10%', left: '72%', rot: 20, dur: 7 },
            { w: 45, h: 45, top: '45%', left: '8%', rot: -15, dur: 9 },
            { w: 55, h: 55, top: '72%', left: '78%', rot: 35, dur: 11 },
          ].map(({ w, h, top, left, rot, dur }, i) => (
            <motion.div
              key={i}
              animate={{ y: [0, -12, 0], rotate: [rot, rot + 6, rot], opacity: [0.1, 0.2, 0.1] }}
              transition={{ duration: dur, repeat: Infinity, delay: i * 1.5, ease: 'easeInOut' }}
              className="absolute rounded-2xl border border-violet-400/20 bg-violet-500/5"
              style={{ width: w, height: h, top, left }}
            />
          ))}
        </div>

        <div className="relative z-10 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/12 bg-white/8 backdrop-blur-sm text-white/60 hover:text-white hover:bg-white/14 hover:border-white/20 hover:shadow-lg transition-all duration-200 text-sm font-outfit font-semibold group"
          >
            <ArrowLeft className="w-3.5 h-3.5 transition-transform duration-200 group-hover:-translate-x-0.5" />
            Back to home
          </Link>
          <Logo className="[&_span]:text-white [&_p]:text-white/50" />
        </div>

        <div className="relative z-10 space-y-6">
          <div className="space-y-4">
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.6 }}
              className="text-5xl xl:text-6xl font-space-grotesk font-black leading-[1.05] text-white"
            >
              Where students
              <br />
              <span className="bg-gradient-to-r from-violet-300 via-fuchsia-300 to-indigo-300 bg-clip-text text-transparent">
                come to win.
              </span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="text-white/40 font-outfit text-base leading-relaxed max-w-[360px]"
            >
              AI-powered battles, live collaboration, and a personal tutor — all in one platform.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.5 }}
            className="space-y-3"
          >
            {features.map(({ icon: Icon, label, desc }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + i * 0.08 }}
                className="flex items-center gap-3 group"
              >
                <div className="w-9 h-9 rounded-[12px] bg-white/8 border border-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-white/12 transition-all">
                  <Icon className="w-4 h-4 text-violet-300" />
                </div>
                <div>
                  <p className="text-white/85 font-space-grotesk font-bold text-sm">{label}</p>
                  <p className="text-white/30 font-outfit text-xs">{desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <div className="relative z-10 border-t border-white/8 pt-5">
          <div className="flex items-center gap-3">
            <div className="flex -space-x-2">
              {['A', 'B', 'C', 'D'].map((l, i) => (
                <div key={l} className="w-7 h-7 rounded-full border-2 border-[#1a0533] flex items-center justify-center text-white text-[9px] font-black"
                  style={{ background: `hsl(${260 + i * 18}, 75%, ${55 + i * 5}%)` }}>
                  {l}
                </div>
              ))}
            </div>
            <p className="text-white/50 font-outfit text-xs">
              <span className="text-white font-bold">5,000+</span> students learning now
            </p>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="flex-1 flex flex-col items-center justify-center px-8 lg:px-12 relative bg-white overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-[280px] h-[280px] bg-violet-100/60 rounded-full blur-[90px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[220px] h-[220px] bg-indigo-100/50 rounded-full blur-[70px] pointer-events-none" />

        <div className="w-full max-w-[340px] relative z-10">
          <div className="lg:hidden mb-8 flex justify-center">
            <Link href="/"><Logo /></Link>
          </div>

          <div className="mb-7">
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-50 border border-violet-200 text-violet-600 text-[10px] font-black uppercase tracking-[0.15em] font-outfit mb-4"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              Secure Sign In
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.28 }}
              className="text-3xl font-space-grotesk font-black text-zinc-900 tracking-tight mb-1.5"
            >
              Welcome back
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.36 }}
              className="text-zinc-400 font-outfit text-sm"
            >
              Sign in to continue your learning journey.
            </motion.p>
          </div>

          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.44 }}>
            <LoginForm />
          </motion.div>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.65 }}
            className="mt-6 text-sm text-center text-zinc-400 font-outfit font-medium"
          >
            No account?{' '}
            <Link href="/register" className="inline-flex items-center gap-1 font-space-grotesk font-black text-violet-600 hover:text-violet-700 group transition-colors">
              Sign up free
            </Link>
          </motion.p>

        </div>
      </motion.div>
    </div>
  );
}
