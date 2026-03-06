'use client';

import { motion } from 'motion/react';
import {
  Shield, Swords, Radio, Brain, LayoutDashboard, Trophy,
  Settings, HelpCircle, Users, GraduationCap, Lock, Zap
} from 'lucide-react';
import { fadeInUp, staggerContainer, cardHover } from '@/lib/animations';

const features = [
  {
    icon: Shield,
    title: 'Secure Authentication',
    description: 'Email, Google & Facebook login with our secure auth system. Your data stays protected.',
    color: 'from-emerald-500/10 to-emerald-600/10 dark:from-emerald-500/20 dark:to-emerald-600/20',
    iconColor: 'text-emerald-600 dark:text-emerald-400',
  },
  {
    icon: Swords,
    title: 'Study Battle Arena',
    description: 'Challenge classmates to real-time AI-generated quiz battles and climb the ranks.',
    color: 'from-violet-500/10 to-violet-600/10 dark:from-violet-500/20 dark:to-violet-600/20',
    iconColor: 'text-violet-600 dark:text-violet-400',
  },
  {
    icon: Radio,
    title: 'Live Study Rooms',
    description: 'Join collaborative study sessions with real-time presence and periodic pop quizzes.',
    color: 'from-blue-500/10 to-blue-600/10 dark:from-blue-500/20 dark:to-blue-600/20',
    iconColor: 'text-blue-600 dark:text-blue-400',
  },
  {
    icon: Brain,
    title: 'AI Study Assistant',
    description: 'A personal AI-powered tutor that adapts explanations to your exact grade level.',
    color: 'from-purple-500/10 to-purple-600/10 dark:from-purple-500/20 dark:to-purple-600/20',
    iconColor: 'text-purple-600 dark:text-purple-400',
  },
  {
    icon: LayoutDashboard,
    title: 'Role-Based Dashboards',
    description: 'Personalized portals for students, moderators, and admins with strict data isolation.',
    color: 'from-amber-500/10 to-amber-600/10 dark:from-amber-500/20 dark:to-amber-600/20',
    iconColor: 'text-amber-600 dark:text-amber-400',
  },
  {
    icon: Trophy,
    title: 'Realtime Leaderboard',
    description: 'Track your wins, climb the rankings, and see how you compare within your class.',
    color: 'from-yellow-500/10 to-yellow-600/10 dark:from-yellow-500/20 dark:to-yellow-600/20',
    iconColor: 'text-yellow-600 dark:text-yellow-400',
  },
  {
    icon: Settings,
    title: 'Admin Controls',
    description: 'Full platform management — user roles, API keys, room oversight, and more.',
    color: 'from-slate-500/10 to-slate-600/10 dark:from-slate-500/20 dark:to-slate-600/20',
    iconColor: 'text-slate-600 dark:text-slate-400',
  },
  {
    icon: HelpCircle,
    title: 'Topic-Wise Quizzes',
    description: 'AI generates curriculum-aligned questions based on chosen topics and grade.',
    color: 'from-cyan-500/10 to-cyan-600/10 dark:from-cyan-500/20 dark:to-cyan-600/20',
    iconColor: 'text-cyan-600 dark:text-cyan-400',
  },
  {
    icon: Users,
    title: 'Team Battles',
    description: 'Form teams within your class and compete together in multiplayer quiz rounds.',
    color: 'from-rose-500/10 to-rose-600/10 dark:from-rose-500/20 dark:to-rose-600/20',
    iconColor: 'text-rose-600 dark:text-rose-400',
  },
  {
    icon: GraduationCap,
    title: 'Same-Class Collaboration',
    description: 'Only students in the same class can join the same rooms and battles — fair play always.',
    color: 'from-indigo-500/10 to-indigo-600/10 dark:from-indigo-500/20 dark:to-indigo-600/20',
    iconColor: 'text-indigo-600 dark:text-indigo-400',
  },
  {
    icon: Zap,
    title: 'AI-Generated Questions',
    description: 'Powered by advanced AI to instantly create age-appropriate, engaging quiz content.',
    color: 'from-fuchsia-500/10 to-fuchsia-600/10 dark:from-fuchsia-500/20 dark:to-fuchsia-600/20',
    iconColor: 'text-fuchsia-600 dark:text-fuchsia-400',
  },
  {
    icon: Lock,
    title: 'Secure & Scalable',
    description: 'Built with row-level security, role isolation, and production-grade infra.',
    color: 'from-teal-500/10 to-teal-600/10 dark:from-teal-500/20 dark:to-teal-600/20',
    iconColor: 'text-teal-600 dark:text-teal-400',
  },
];

export function Features() {
  return (
    <section id="features" className="py-24 sm:py-32 relative overflow-hidden bg-background">
      
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-500/10 to-transparent" />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30" />
      
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="relative"
        >
          {}
          <motion.div variants={fadeInUp} className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
            <p className="text-sm font-bold font-outfit uppercase tracking-widest text-violet-600 dark:text-violet-400 mb-3">
              Everything you need
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-space-grotesk font-extrabold tracking-tight mb-5">
              A complete learning <span className="text-gradient">ecosystem</span>
            </h2>
            <p className="text-lg text-muted-foreground font-outfit leading-relaxed max-w-2xl mx-auto">
              From AI-powered tutoring to competitive quiz battles — every tool a student needs to excel, all in one beautifully connected platform.
            </p>
          </motion.div>

          {}
          <motion.div 
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
          >
            {features.map((feature) => (
              <motion.div
                key={feature.title}
                variants={fadeInUp}
                whileHover="hover"
                initial="rest"
                animate="rest"
                className="group"
              >
                <motion.div 
                  variants={cardHover}
                  className="glass-card p-7 rounded-3xl h-full border-white/5 hover:border-violet-500/20 transition-colors"
                >
                  <div className={`flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br ${feature.color} mb-5 shadow-inner`}>
                    <feature.icon className={`w-5 h-5 ${feature.iconColor}`} />
                  </div>
                  <h3 className="font-space-grotesk font-bold text-lg mb-3 leading-tight transition-colors group-hover:text-primary">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted-foreground font-outfit leading-relaxed">
                    {feature.description}
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
