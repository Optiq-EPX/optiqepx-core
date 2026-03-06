'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';
import { fadeInUp, staggerContainer } from '@/lib/animations';

export function CTA() {
  return (
    <section className="py-24 sm:py-32 relative overflow-hidden">
      {}
      <div className="absolute inset-0 -z-10">
        <motion.div 
          animate={{ 
            x: [-20, 20, -20],
            y: [-20, 20, -20],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-gradient-to-br from-violet-600/20 via-indigo-600/15 to-cyan-500/10 rounded-full blur-[120px]" 
        />
      </div>

      <div className="container mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="relative p-12 sm:p-20 rounded-[3rem] bg-gradient-to-br from-violet-700 via-indigo-700 to-violet-800 text-white text-center shadow-[0_30px_60px_-15px_rgba(124,58,237,0.4)] overflow-hidden"
        >
          {}
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10 bg-center" />
          <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent" />
          
          <div className="relative z-10">
            <motion.div 
              variants={fadeInUp}
              whileHover={{ rotate: 12, scale: 1.1 }}
              className="flex items-center justify-center w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 mx-auto mb-8 shadow-inner"
            >
              <Sparkles className="w-8 h-8 text-white" />
            </motion.div>
            
            <motion.h2 
              variants={fadeInUp}
              className="text-4xl sm:text-5xl lg:text-6xl font-space-grotesk font-black tracking-tight mb-6 leading-tight"
            >
              Ready to transform <br /> how you study?
            </motion.h2>
            
            <motion.p 
              variants={fadeInUp}
              className="text-xl text-violet-100/90 font-outfit mb-12 max-w-xl mx-auto leading-relaxed"
            >
              Join 5,000+ students who are already dominating their subjects with AI-powered battles and collaborative rooms.
            </motion.p>
            
            <motion.div 
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-5 justify-center"
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button size="lg" asChild className="font-outfit text-base px-10 h-16 bg-white text-violet-700 hover:bg-violet-50 shadow-2xl shadow-black/20 rounded-[1.25rem] gap-3 font-black uppercase tracking-wider">
                  <Link href="/register">
                    Get Started Free <ArrowRight className="w-5 h-5" />
                  </Link>
                </Button>
              </motion.div>
              <Button size="lg" variant="outline" asChild className="font-outfit text-base px-10 h-16 rounded-[1.25rem] border-white/20 text-white hover:bg-white/10 bg-transparent font-bold backdrop-blur-sm">
                <a href="#features">Explore Features</a>
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
