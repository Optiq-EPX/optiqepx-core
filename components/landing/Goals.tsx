'use client';

import { motion } from 'motion/react';
import { Target, Handshake, Lightbulb, TrendingUp, ShieldCheck, Rocket } from 'lucide-react';
import { fadeInUp, staggerContainer, cardHover } from '@/lib/animations';

const goals = [
  {
    icon: Target,
    title: 'Consistent Learning Habits',
    description: 'Build a daily rhythm with timed sessions, streaks, and structured AI quizzes that make studying a habit, not a chore.',
    color: 'from-orange-500/10 to-orange-600/10'
  },
  {
    icon: Handshake,
    title: 'Collaborative Education',
    description: 'Study rooms bring classmates together in real-time, making learning social, supportive, and way more engaging.',
    color: 'from-blue-500/10 to-blue-600/10'
  },
  {
    icon: Lightbulb,
    title: 'Break the Monotony',
    description: 'Gamified battles, surprise pop quizzes, and dynamic AI challenges replace boring study routines with genuine excitement.',
    color: 'from-amber-500/10 to-amber-600/10'
  },
  {
    icon: TrendingUp,
    title: 'AI-Guided Growth',
    description: 'An AI-powered tutor that meets every student at their level — explaining, questioning, and adapting in real-time.',
    color: 'from-violet-500/10 to-violet-600/10'
  },
  {
    icon: ShieldCheck,
    title: 'Healthy Competition',
    description: 'Class-based matchmaking ensures a fair playing field where students push each other to improve — not just win.',
    color: 'from-emerald-500/10 to-emerald-600/10'
  },
  {
    icon: Rocket,
    title: 'Future-Ready Platform',
    description: 'Built on modern, secure, and scalable infrastructure — designed to grow from a single classroom to an entire school district.',
    color: 'from-indigo-500/10 to-indigo-600/10'
  },
];

export function Goals() {
  return (
    <section id="goals" className="py-24 sm:py-32 relative overflow-hidden">
      
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-500/20 to-transparent" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-violet-500/[0.03] via-transparent to-transparent dark:from-violet-500/[0.02]" />

      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-40" />

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          {}
          <motion.div variants={fadeInUp} className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
            <p className="text-sm font-bold font-outfit uppercase tracking-widest text-violet-600 dark:text-violet-400 mb-3">
              Our Mission
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-space-grotesk font-extrabold tracking-tight mb-5">
              Education should feel <span className="text-gradient">alive</span>
            </h2>
            <p className="text-lg text-muted-foreground font-outfit leading-relaxed max-w-2xl mx-auto">
              We believe every student deserves tools that make learning inspiring, social, and deeply personal.
            </p>
          </motion.div>

          {}
          <motion.div 
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
          >
            {goals.map((goal) => (
              <motion.div
                key={goal.title}
                variants={fadeInUp}
                whileHover="hover"
                initial="rest"
                animate="rest"
                className="group h-full"
              >
                <motion.div 
                  variants={cardHover}
                  className="glass-card p-10 rounded-[2.5rem] h-full flex flex-col items-center text-center border-white/5 hover:border-violet-500/20 transition-all duration-500"
                >
                  <div className={`w-16 h-16 rounded-3xl bg-gradient-to-br ${goal.color} flex items-center justify-center mb-8 shadow-inner group-hover:scale-110 transition-transform duration-500`}>
                    <goal.icon className="w-7 h-7 text-violet-600 dark:text-violet-400" />
                  </div>
                  <h3 className="font-space-grotesk font-extrabold text-xl mb-4 group-hover:text-violet-600 transition-colors">
                    {goal.title}
                  </h3>
                  <p className="text-muted-foreground font-outfit leading-relaxed text-sm">
                    {goal.description}
                  </p>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
