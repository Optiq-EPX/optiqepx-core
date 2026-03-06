'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import { Button } from '@/components/ui/button';
import { Check, Zap } from 'lucide-react';
import { fadeInUp, staggerContainer, cardHover } from '@/lib/animations';

const plans = [
  {
    name: 'Student Starter',
    price: 'Free',
    period: 'forever',
    description: 'Everything you need to start learning smarter.',
    cta: 'Get Started Free',
    highlighted: false,
    features: [
      'Access to Study Battle Arena',
      'Join Live Study Rooms',
      'AI Tutor — 20 messages/day',
      'Personal student dashboard',
      'Class-based matchmaking',
      'Realtime leaderboards',
    ],
  },
  {
    name: 'Growth Pro',
    price: '$9',
    period: '/month',
    description: 'For serious learners who want unlimited access.',
    cta: 'Upgrade to Pro',
    highlighted: true,
    features: [
      'Everything in Starter',
      'Unlimited AI Tutor sessions',
      'Priority battle matchmaking',
      'Advanced performance analytics',
      'Custom study room themes',
      'Ad-free experience',
      'Early access to new features',
    ],
  },
  {
    name: 'Institution',
    price: '$49',
    period: '/month',
    description: 'Full platform control for schools and organizations.',
    cta: 'Contact Sales',
    highlighted: false,
    features: [
      'Everything in Growth Pro',
      'Admin & Moderator access',
      'Bulk student onboarding',
      'Custom AI API key support',
      'Platform analytics dashboard',
      'Role & permission management',
      'Priority email support',
      'Custom branding (coming soon)',
    ],
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="py-24 sm:py-32 relative overflow-hidden">
      {}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-violet-500/[0.02] to-transparent" />
      <div className="absolute top-[10%] left-[5%] w-[300px] h-[300px] bg-violet-500/5 blur-[100px] rounded-full" />
      <div className="absolute bottom-[10%] right-[5%] w-[300px] h-[300px] bg-indigo-500/5 blur-[100px] rounded-full" />

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          {}
          <motion.div variants={fadeInUp} className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
            <p className="text-sm font-bold font-outfit uppercase tracking-widest text-gradient mb-3">
              Simple Pricing
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-space-grotesk font-extrabold tracking-tight mb-5">
              Plans that <span className="text-gradient">grow</span> with you
            </h2>
            <p className="text-lg text-muted-foreground font-outfit leading-relaxed max-w-2xl mx-auto">
              Start for free. Upgrade when you&apos;re ready. No surprises.
            </p>
          </motion.div>

          {}
          <motion.div 
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto items-center"
          >
            {plans.map((plan) => (
              <motion.div
                key={plan.name}
                variants={fadeInUp}
                whileHover="hover"
                initial="rest"
                animate="rest"
                className="relative h-full"
              >
                <motion.div
                  variants={cardHover}
                  className={`relative flex flex-col p-10 rounded-[2.5rem] border h-full transition-all duration-500 backdrop-blur-md overflow-hidden ${
                    plan.highlighted
                      ? 'bg-gradient-to-br from-violet-600 to-indigo-700 text-white border-violet-500 shadow-2xl shadow-violet-500/40'
                      : 'glass-card border-white/5 dark:border-white/10 hover:border-violet-500/20 shadow-xl'
                  }`}
                >
                  {plan.highlighted && (
                    <>
                      <div className="absolute top-0 right-0 p-8 opacity-20 transform translate-x-4 -translate-y-4">
                        <Zap className="w-24 h-24" />
                      </div>
                      <div className="absolute top-6 right-8 px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider border border-white/10">
                        Most Popular
                      </div>
                    </>
                  )}

                  <div className="mb-8 relative z-10">
                    <h3 className={`font-space-grotesk font-extrabold text-2xl mb-2 ${plan.highlighted ? 'text-white' : ''}`}>
                      {plan.name}
                    </h3>
                    <p className={`text-sm font-outfit font-medium ${plan.highlighted ? 'text-violet-100/80' : 'text-muted-foreground'}`}>
                      {plan.description}
                    </p>
                  </div>

                  <div className="mb-10 relative z-10 flex items-baseline">
                    <span className={`text-5xl font-space-grotesk font-black ${plan.highlighted ? 'text-white' : ''}`}>
                      {plan.price}
                    </span>
                    <span className={`text-sm font-outfit font-bold ml-2 ${plan.highlighted ? 'text-violet-200' : 'text-muted-foreground'}`}>
                      {plan.period}
                    </span>
                  </div>

                  <ul className="space-y-4 mb-10 flex-1 relative z-10">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-4 text-sm font-outfit font-medium">
                        <div className={`mt-1 flex-shrink-0 w-4 h-4 rounded-full flex items-center justify-center ${plan.highlighted ? 'bg-white/20' : 'bg-violet-500/10'}`}>
                          <Check className={`w-2.5 h-2.5 ${plan.highlighted ? 'text-white' : 'text-violet-600'}`} />
                        </div>
                        <span className={plan.highlighted ? 'text-violet-50' : 'text-muted-foreground'}>
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="relative z-10 mt-auto">
                    <Button
                      asChild
                      size="lg"
                      className={`w-full font-outfit font-black rounded-2xl h-14 py-4 transition-all uppercase tracking-wider text-xs ${
                        plan.highlighted
                          ? 'bg-white text-violet-700 hover:bg-violet-50 shadow-xl'
                          : 'bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white shadow-xl shadow-violet-500/10 border-0'
                      }`}
                    >
                      <Link href="/register">{plan.cta}</Link>
                    </Button>
                  </motion.div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
