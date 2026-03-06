'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles, Sword, Users, Brain, Zap } from 'lucide-react';
import { fadeInUp, staggerContainer, cardHover } from '@/lib/animations';

export function Hero() {
  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      {}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <motion.div 
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, 5, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-violet-500/10 blur-[120px] rounded-full" 
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, -5, 0],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute top-[20%] -right-[5%] w-[35%] h-[35%] bg-indigo-500/10 blur-[120px] rounded-full" 
        />
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
      </div>

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="text-center max-w-4xl mx-auto"
        >
          {}
          <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-600 dark:text-violet-400 text-sm font-bold font-outfit mb-8 shadow-xl shadow-violet-500/5">
            <div className="flex -space-x-1.5">
              {[1, 2, 3].map((i) => (
                <div key={i} className="w-5 h-5 rounded-full border-2 border-background bg-violet-600 flex items-center justify-center text-[8px] text-white">
                  AI
                </div>
              ))}
            </div>
            <span className="ml-1">Trusted by 5,000+ Students</span>
            <Sparkles className="w-3.5 h-3.5" />
          </motion.div>

          {}
          <motion.h1 
            variants={fadeInUp}
            className="text-5xl sm:text-6xl lg:text-7xl font-space-grotesk font-extrabold tracking-tight mb-8 leading-[1.1]"
          >
            Learn Smarter. <span className="text-gradient">Compete.</span> <br />
            Collaborate. Grow.
          </motion.h1>

          {}
          <motion.p 
            variants={fadeInUp}
            className="text-lg sm:text-xl text-muted-foreground font-outfit mb-12 max-w-2xl mx-auto leading-relaxed"
          >
            The next-generation student platform where AI-powered study battles, live collaboration rooms, and a personal tutor come together to make learning engaging and fun.
          </motion.p>

          {}
          <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button size="lg" asChild className="font-outfit text-base px-8 h-14 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white shadow-2xl shadow-violet-500/30 rounded-2xl gap-2 font-bold group">
                <Link href="/register">
                  Start Learning Free <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </motion.div>
            <Button size="lg" variant="outline" asChild className="font-outfit text-base px-8 h-14 rounded-2xl border-white/10 bg-white/5 backdrop-blur-md hover:bg-white/10 transition-all font-semibold">
              <a href="#features">See How It Works</a>
            </Button>
          </motion.div>

          {}
          <motion.div 
            variants={staggerContainer}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 px-4"
          >
            <HeroFeature 
              icon={<Sword className="w-5 h-5" />} 
              label="Battle Arena" 
              color="from-rose-500/20 to-rose-600/20"
              iconColor="text-rose-600"
            />
            <HeroFeature 
              icon={<Users className="w-5 h-5" />} 
              label="Live Rooms" 
              color="from-cyan-500/20 to-cyan-600/20"
              iconColor="text-cyan-600"
            />
            <HeroFeature 
              icon={<Brain className="w-5 h-5" />} 
              label="AI Tutor" 
              color="from-violet-500/20 to-violet-600/20"
              iconColor="text-violet-600"
            />
            <HeroFeature 
              icon={<Zap className="w-5 h-5" />} 
              label="Realtime" 
              color="from-amber-500/20 to-amber-600/20"
              iconColor="text-amber-600"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function HeroFeature({ icon, label, color, iconColor }: { icon: React.ReactNode; label: string, color: string, iconColor: string }) {
  return (
    <motion.div 
      variants={fadeInUp}
      whileHover="hover"
      initial="rest"
      animate="rest"
      className="group"
    >
      <motion.div 
        variants={cardHover}
        className="glass-card p-4 rounded-2xl flex flex-col items-center gap-3 border-white/10 hover:border-violet-500/30 transition-colors"
      >
        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center ${iconColor} shadow-inner`}>
          {icon}
        </div>
        <span className="text-xs font-bold font-space-grotesk tracking-wider uppercase text-muted-foreground group-hover:text-foreground transition-colors">
          {label}
        </span>
      </motion.div>
    </motion.div>
  );
}
