'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CircleCheckBig, Check, X, ArrowRight, ArrowUpRight } from 'lucide-react';
import { fadeInUp, staggerContainer } from '@/lib/animations';
import { SectionHeader } from '@/components/shared/SectionHeader';

const plans = [
  {
    name: 'Starter',
    subname: 'Ideal for students',
    monthlyPrice: 'Free',
    yearlyPrice: 'Free',
    yearlyTotal: 'Free',
    period: 'forever',
    cta: 'Get Started',
    highlighted: false,
    features: [
      'Access to Study Battle Arena',
      'Join Live Study Rooms',
      'AI Tutor — 20 messages/day',
      'Class-based matchmaking',
    ],
  },
  {
    name: 'Growth Pro',
    subname: 'Perfect for serious learners',
    monthlyPrice: '$9',
    yearlyPrice: '$6',
    yearlyTotal: '$72',
    period: '/month',
    cta: 'Get Started',
    highlighted: true,
    features: [
      'Everything in Starter',
      'Unlimited AI Tutor sessions',
      'Priority battle matchmaking',
      'Advanced performance analytics',
    ],
  },
  {
    name: 'Institution',
    subname: 'Best for schools & orgs',
    monthlyPrice: '$49',
    yearlyPrice: '$34',
    yearlyTotal: '$408',
    period: '/month',
    cta: 'Contact Sales',
    highlighted: false,
    features: [
      'Admin & Moderator access',
      'Bulk student onboarding',
      'Custom AI API key support',
      'Platform analytics dashboard',
    ],
  },
];

const comparisonRows = [
  {
    feature: 'AI Tutor Limits',
    starter: '20 msgs/day',
    pro: 'Unlimited',
    institution: 'Unlimited',
  },
  {
    feature: 'Study Battle Arena',
    starter: true,
    pro: true,
    institution: true,
  },
  {
    feature: 'Priority Matchmaking',
    starter: false,
    pro: true,
    institution: true,
  },
  {
    feature: 'Advanced Analytics',
    starter: false,
    pro: true,
    institution: true,
  },
  {
    feature: 'Admin Dashboard',
    starter: false,
    pro: false,
    institution: true,
  },
  {
    feature: 'Support',
    starter: 'Community',
    pro: 'Priority Email',
    institution: '24/7 Chat',
  },
];

export function Pricing() {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <section id="pricing" className="py-24 sm:py-32 relative overflow-hidden bg-white dark:bg-[#03040B]">
      

      <div className="absolute top-0 left-[-10%] w-[500px] h-[500px] bg-violet-600/10 dark:bg-violet-600/20 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] bg-purple-600/10 dark:bg-purple-600/20 blur-[150px] rounded-full pointer-events-none transform -skew-y-12" />

      <div className="container mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8 relative z-10">
        

        <div className="flex flex-col items-center text-center mb-16">
          <SectionHeader 
            badge="Simple Plan, No Hidden Costs"
            title="Find Your "
            highlight="Perfect Plan"
            description="Select the perfect plan with transparent pricing and no unexpected fees."
            className="!mb-8 sm:!mb-10"
          />


          <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ delay: 0.2 }} className="flex items-center p-1.5 bg-slate-100 dark:bg-[#0c0d14] border border-slate-200 dark:border-white/10 rounded-full font-outfit text-sm relative z-10">
            <button
              onClick={() => setIsYearly(false)}
              className={`relative px-6 py-2.5 rounded-full transition-colors duration-300 cursor-pointer ${
                !isYearly 
                  ? 'text-slate-900 dark:text-white' 
                  : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
              }`}
            >
              {!isYearly && (
                <motion.div
                  layoutId="pricing-tab-indicator"
                  className="absolute inset-0 bg-white dark:bg-white/10 rounded-full shadow-sm -z-10"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              Monthly
            </button>
            <button
              onClick={() => setIsYearly(true)}
              className={`relative flex items-center gap-2 px-6 py-2.5 rounded-full transition-colors duration-300 cursor-pointer ${
                isYearly 
                  ? 'text-slate-900 dark:text-white' 
                  : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
              }`}
            >
              {isYearly && (
                <motion.div
                  layoutId="pricing-tab-indicator"
                  className="absolute inset-0 bg-white dark:bg-white/10 rounded-full shadow-sm -z-10"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              Yearly
              <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full transition-colors duration-300 ${isYearly ? 'bg-violet-100 text-violet-700 dark:bg-white dark:text-slate-900' : 'bg-slate-200 text-slate-500 dark:bg-white/10 dark:text-slate-400'}`}>
                Save 30%
              </span>
            </button>
          </motion.div>
        </div>


        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto items-stretch mb-32 pt-8"
        >
          {plans.map((plan) => (
            <motion.div
              key={plan.name}
              variants={fadeInUp}
              className={`relative flex flex-col p-8 lg:p-10 rounded-[2rem] transition-all duration-300 bg-white dark:bg-[#0B0C12] shadow-xl ${
                plan.highlighted
                  ? 'border border-violet-500/50 shadow-[0_0_30px_rgba(124,58,237,0.15)] dark:shadow-[0_0_40px_rgba(124,58,237,0.2)] transform md:-translate-y-4'
                  : 'border border-slate-300 dark:border-white/10'
              }`}
            >
              {plan.highlighted && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-1.5 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-full text-[11px] font-bold text-white uppercase tracking-wider shadow-lg border border-white/20 z-20">
                  Most Popular
                </div>
              )}
              {plan.highlighted && (
                <div className="absolute inset-0 bg-gradient-to-b from-violet-500/5 to-transparent rounded-[2rem] pointer-events-none" />
              )}

              <div className="mb-6 relative z-10">
                <h3 className="font-space-grotesk font-semibold text-xl mb-1 text-slate-900 dark:text-slate-200">
                  {plan.name}
                </h3>
                <p className="text-sm font-outfit text-slate-500 dark:text-slate-400">
                  {plan.subname}
                </p>
              </div>

              <div className="mb-2 flex flex-col relative z-10">
                <div className="flex items-end gap-2">
                  <span className="text-5xl lg:text-6xl font-space-grotesk font-bold tracking-tight text-slate-900 dark:text-white">
                    {isYearly ? plan.yearlyPrice : plan.monthlyPrice}
                  </span>
                  {plan.monthlyPrice !== 'Free' && (
                    <span className="text-sm mb-2 font-outfit text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-white/5 px-2 py-1 rounded-full">
                      {plan.period}
                    </span>
                  )}
                </div>
                <div className="h-6 mt-1 ml-1 overflow-visible">
                  <AnimatePresence mode="wait">
                    {isYearly && plan.monthlyPrice !== 'Free' && (
                      <motion.div
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 0 }}
                        transition={{ duration: 0.2 }}
                        className="text-[13px] font-medium font-outfit text-slate-500 dark:text-slate-400"
                      >
                        Total {plan.yearlyTotal} billed yearly
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              <button
                className={`w-full py-3.5 rounded-xl flex items-center justify-center gap-1.5 font-outfit font-bold transition-all duration-300 mb-10 text-[15px] relative z-10 cursor-pointer ${
                  plan.highlighted
                    ? 'bg-violet-600 hover:bg-violet-700 text-white shadow-md shadow-violet-500/20'
                    : 'bg-transparent border border-slate-400 dark:border-white/20 text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-white/5 dark:hover:border-white/40'
                }`}
              >
                {plan.cta}
                <ArrowUpRight className="w-4 h-4" strokeWidth={2.5} />
              </button>

              <ul className="space-y-4 flex-1 relative z-10">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-4 text-sm font-outfit">
                    <CircleCheckBig className={`w-[18px] h-[18px] shrink-0 mt-1 ${plan.highlighted ? 'text-violet-600 dark:text-violet-500' : 'text-slate-700 dark:text-slate-300'}`} />
                    <span className="text-slate-700 dark:text-slate-300">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>


        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerContainer}
          className="max-w-5xl mx-auto"
        >
          <SectionHeader 
            badge="Simple Pricing"
            title="Compare "
            highlight="Plans"
            description="Choose the plan that fits you best with our easy-to-navigate comparison tool."
            className="!mb-12 sm:!mb-16"
          />

          <motion.div variants={fadeInUp} className="overflow-x-auto pb-12 mt-8">
            <div className="min-w-[800px] bg-white dark:bg-[#0B0C12] rounded-3xl border border-slate-200 dark:border-white/10 shadow-sm overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-white/[0.02]">
                    <th className="py-8 px-8 font-outfit w-1/4 align-top">
                      <span className="block text-[11px] font-bold tracking-wider text-slate-500 dark:text-slate-400 uppercase mb-1.5">Choose</span>
                      <span className="text-2xl font-space-grotesk font-bold text-slate-900 dark:text-white">Best Plan</span>
                    </th>
                    {plans.map((plan) => (
                      <th key={plan.name} className="py-8 px-6 font-outfit align-top text-center w-1/4">
                        <span className={`block text-[17px] font-semibold mb-3 ${plan.highlighted ? 'text-violet-600 dark:text-violet-400' : 'text-slate-800 dark:text-slate-200'}`}>{plan.name}</span>
                        <div className="flex items-center justify-center gap-1.5">
                          <span className="text-4xl text-slate-900 dark:text-white font-space-grotesk font-bold tracking-tight">{isYearly ? plan.yearlyPrice : plan.monthlyPrice}</span>
                          {plan.monthlyPrice !== 'Free' && (
                            <span className="text-[11px] font-medium text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 px-2.5 py-1 rounded-md">{plan.period}</span>
                          )}
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-white/5 text-sm">
                  {comparisonRows.map((row, index) => (
                    <tr key={row.feature} className={`group hover:bg-slate-50/80 dark:hover:bg-white/[0.02] transition-colors ${index % 2 === 0 ? 'bg-white dark:bg-transparent' : 'bg-slate-50/30 dark:bg-white/[0.01]'}`}>
                      <td className="py-5 px-8 font-outfit text-[15px] font-medium text-slate-700 dark:text-slate-300">
                        {row.feature}
                      </td>
                      {[row.starter, row.pro, row.institution].map((val, idx) => (
                        <td key={idx} className="py-5 px-6 text-center">
                          {typeof val === 'boolean' ? (
                            val ? (
                              <Check className="w-[20px] h-[20px] mx-auto text-blue-500" strokeWidth={2.5} />
                            ) : (
                              <X className="w-[22px] h-[22px] mx-auto text-slate-300 dark:text-slate-600" strokeWidth={2} />
                            )
                          ) : (
                            <span className="font-outfit text-base text-slate-600 dark:text-slate-400">{val}</span>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>

        </motion.div>

      </div>
    </section>
  );
}
