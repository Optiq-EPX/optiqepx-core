'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import { RegisterForm } from '@/features/auth/components/RegisterForm';
import { Logo } from '@/components/shared/Logo';
import { ArrowLeft, ShieldCheck, CheckCircle2, Star, UserPlus, ArrowRight, GraduationCap, Activity } from 'lucide-react';

const perks = [
  'Free forever — no credit card needed',
  'AI quiz battles & live study rooms',
  'Personal AI tutor, 24/7',
];

export default function RegisterPage() {
  return (
    <div className="h-[100dvh] flex bg-white overflow-hidden">

      {/* LEFT FORM */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="flex-1 flex flex-col relative bg-white overflow-y-auto order-2 lg:order-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      >
        <div className="absolute top-0 left-0 w-[280px] h-[280px] bg-indigo-100/60 rounded-full blur-[90px] pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[220px] h-[220px] bg-violet-100/50 rounded-full blur-[70px] pointer-events-none" />

        <div className="w-full max-w-[360px] relative z-10 m-auto py-12 px-8 lg:px-0 flex-shrink-0">
          <div className="lg:hidden mb-7 flex justify-center">
            <Link href="/"><Logo /></Link>
          </div>

          <div className="mb-6">
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-600 text-[10px] font-black uppercase tracking-[0.15em] font-outfit mb-4"
            >
              <UserPlus className="w-3.5 h-3.5" />
              Free Forever
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.28 }}
              className="text-3xl font-space-grotesk font-black text-zinc-900 tracking-tight mb-1.5"
            >
              Create account
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.36 }}
              className="text-zinc-400 font-outfit text-sm"
            >
              Join 5,000+ students already leveling up.
            </motion.p>
          </div>

          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.44 }}>
            <RegisterForm />
          </motion.div>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.65 }}
            className="mt-5 text-sm text-center text-zinc-400 font-outfit font-medium"
          >
            Already have an account?{' '}
            <Link href="/login" className="inline-flex items-center gap-1 font-space-grotesk font-black text-violet-600 hover:text-violet-700 group transition-colors">
              Sign in
            </Link>
          </motion.p>
        </div>
      </motion.div>

      {/* RIGHT HERO */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
        className="hidden lg:flex lg:w-[48%] relative flex-col justify-between px-12 py-10 overflow-hidden order-1 lg:order-2"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a2e] via-[#0d1540] to-[#0a1a30]" />

        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-20 right-0 w-[450px] h-[450px] bg-indigo-600/20 rounded-full blur-[120px]" />
          <div className="absolute top-1/3 -left-20 w-[300px] h-[350px] bg-violet-500/15 rounded-full blur-[100px]" />
          <div className="absolute bottom-0 right-1/4 w-[280px] h-[250px] bg-indigo-900/40 rounded-full blur-[80px]" />
          <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(circle, rgba(120,140,255,1) 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
          {[
            { w: 65, h: 65, top: '8%', right: '10%', rot: -20, dur: 8 },
            { w: 45, h: 45, top: '55%', right: '6%', rot: 15, dur: 10 },
            { w: 50, h: 50, top: '78%', right: '55%', rot: -28, dur: 7 },
          ].map(({ w, h, top, right, rot, dur }, i) => (
            <motion.div
              key={i}
              animate={{ y: [0, -10, 0], rotate: [rot, rot - 6, rot], opacity: [0.1, 0.2, 0.1] }}
              transition={{ duration: dur, repeat: Infinity, delay: i * 1.6, ease: 'easeInOut' }}
              className="absolute rounded-2xl border border-indigo-400/20 bg-indigo-500/5"
              style={{ width: w, height: h, top, right }}
            />
          ))}
        </div>

        {/* Top */}
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

        {/* Center */}
        <div className="relative z-10 space-y-6">
          <div className="space-y-4">
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.6 }}
              className="text-5xl xl:text-6xl font-space-grotesk font-black leading-[1.05] text-white"
            >
              Your classroom.
              <br />
              <span className="bg-gradient-to-r from-indigo-300 via-cyan-300 to-violet-300 bg-clip-text text-transparent">
                Supercharged.
              </span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="text-white/40 font-outfit text-base leading-relaxed max-w-[360px]"
            >
              Set up in 30 seconds. Match with classmates. Get smarter every day.
            </motion.p>
          </div>

          {/* Perks */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55 }}
            className="space-y-2.5"
          >
            {perks.map((perk, i) => (
              <motion.div key={perk} initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 + i * 0.08 }}
                className="flex items-center gap-3"
              >
                <div className="w-5 h-5 rounded-full bg-indigo-500/20 border border-indigo-400/30 flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="w-3 h-3 text-indigo-300" />
                </div>
                <p className="text-white/55 font-outfit text-sm">{perk}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Bottom Metrics Section */}
        <div className="relative z-10 flex flex-col gap-4">
          {/* Security card */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85 }}
            className="rounded-2xl border border-emerald-500/20 bg-black/20 backdrop-blur-md p-4 flex items-center gap-4 relative overflow-hidden group shadow-2xl"
          >
            {/* Background grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#10b98110_1px,transparent_1px),linear-gradient(to_bottom,#10b98110_1px,transparent_1px)] bg-[size:16px_16px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_10%,transparent_100%)] pointer-events-none" />
            
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/0 via-emerald-500/10 to-emerald-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 pointer-events-none" />
            
            <div className="w-11 h-11 rounded-xl bg-gradient-to-b from-emerald-400/20 to-emerald-600/10 border border-emerald-500/30 flex items-center justify-center flex-shrink-0 relative z-10 before:absolute before:inset-1 before:rounded-lg before:border before:border-emerald-500/20 before:bg-emerald-500/10">
              <ShieldCheck className="w-5 h-5 text-emerald-400 relative z-10 drop-shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
            </div>
            
            <div className="relative z-10 flex-1">
              <div className="flex items-center gap-2 mb-0.5">
                <p className="text-white font-space-grotesk font-black text-[15px] tracking-wide">Enterprise Auth</p>
                <div className="px-1.5 py-0.5 rounded text-[8px] font-black font-outfit uppercase tracking-widest bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Secured
                </div>
              </div>
              <p className="text-emerald-100/50 font-outfit text-[11px] uppercase tracking-[0.15em] font-semibold">256-bit AES Encryption</p>
            </div>
            
            <div className="ml-auto flex flex-col items-center gap-1.5 relative z-10 border-l border-emerald-500/20 pl-4">
              <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.8)] animate-pulse" />
              <span className="text-emerald-400/70 text-[8px] font-black uppercase tracking-widest leading-none">Live</span>
            </div>
          </motion.div>

          {/* Live Network Metrics */}
          <motion.div 
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.95 }}
            className="rounded-2xl border border-indigo-500/20 bg-black/20 backdrop-blur-md p-5 relative overflow-hidden group shadow-2xl"
          >
            {/* Background grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#6366f115_1px,transparent_1px),linear-gradient(to_bottom,#6366f115_1px,transparent_1px)] bg-[size:16px_16px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_10%,transparent_100%)] pointer-events-none" />
            
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/0 via-indigo-500/10 to-indigo-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 pointer-events-none" />
            
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl group-hover:bg-indigo-500/20 transition-colors duration-500 pointer-events-none" />
            
            <div className="flex items-center justify-between mb-5 relative z-10">
              <div className="flex items-center gap-2.5">
                <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)] animate-pulse" />
                <span className="text-white/60 font-outfit text-xs font-black tracking-[0.2em] uppercase">System Status</span>
              </div>
              <Activity className="w-4 h-4 text-white/30" />
            </div>

            <div className="grid grid-cols-2 gap-4 relative z-10">
              <div className="flex flex-col border-r border-indigo-500/20">
                <p className="text-white/40 text-[10px] font-outfit uppercase tracking-wider font-black mb-1">Active Students</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-space-grotesk font-black text-white">4,209</span>
                  <span className="text-emerald-400 text-xs font-black font-space-grotesk tracking-wide">+12%</span>
                </div>
              </div>
              <div className="flex flex-col pl-2">
                <p className="text-white/40 text-[10px] font-outfit uppercase tracking-wider font-black mb-1">Live Battles</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-space-grotesk font-black text-white">184</span>
                  <span className="text-emerald-400 text-xs font-black font-space-grotesk tracking-wide">+5%</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
