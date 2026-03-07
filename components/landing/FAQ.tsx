'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { fadeInUp, staggerContainer } from '@/lib/animations';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { cn } from '@/lib/utils';
import { MessageCircleQuestion } from 'lucide-react';

const faqs = [
  {
    question: 'Who is OptiqEPX built for?',
    answer: 'OptiqEPX is designed for students of all levels — from grade 1 through university. It also supports moderators and administrators who oversee the learning environment.',
  },
  {
    question: 'How do Study Battles work?',
    answer: 'A student creates or joins a battle lobby by selecting a topic. Our AI instantly generates a set of classroom-appropriate quiz questions. All participants answer in real-time, earning points for correct responses. The leaderboard updates live as the battle progresses.',
  },
  {
    question: 'What happens in a Live Study Room?',
    answer: 'Study rooms are real-time group sessions where classmates study together. The platform tracks active participants via live presence indicators and periodically triggers surprise AI-generated pop quizzes to keep everyone engaged and learning.',
  },
  {
    question: 'How does the AI Study Assistant help?',
    answer: 'The AI Tutor is powered by our advanced intelligence engine and adapts its language and complexity to match the student\'s exact class level. It uses the Socratic method — guiding students to discover answers rather than simply providing them.',
  },
  {
    question: 'Can teachers or instructors manage content?',
    answer: 'The current MVP supports Admin and Moderator roles. Admins have full platform control, while Moderators can monitor rooms and battles. An Instructor role is planned for a future release to allow curriculum management and custom quiz creation.',
  },
  {
    question: 'How do admin controls work?',
    answer: 'Admins have access to a dedicated console showing platform-wide statistics, user management tools, role elevation controls, and API key configuration for the AI engine. Moderators get a limited operational view for day-to-day oversight.',
  },
  {
    question: 'Is the platform free to use?',
    answer: 'Yes! The Student Starter plan is completely free and includes access to study rooms, battles, AI chat, and your personal dashboard. Premium plans unlock advanced features like unlimited AI sessions and priority support.',
  },
  {
    question: 'How do I create an account?',
    answer: 'Simply click "Get Started Free" and register with your email address, or sign up instantly using your Google or Facebook account. You\'ll choose your class level during signup so the platform can personalize your experience from the start.',
  },
];

export function FAQ() {
  const midPoint = Math.ceil(faqs.length / 2);
  const leftColumnFaqs = faqs.slice(0, midPoint);
  const rightColumnFaqs = faqs.slice(midPoint);

  return (
    <section id="faq" className="py-24 sm:py-32 relative overflow-hidden bg-white dark:bg-[#020617]">
      {/* Background Decorators */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-500/10 dark:via-violet-500/20 to-transparent" />
      <div className="absolute top-[20%] right-[-10%] w-[600px] h-[600px] bg-violet-500/[0.02] dark:bg-violet-500/[0.05] blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[20%] left-[-10%] w-[600px] h-[600px] bg-indigo-500/[0.02] dark:bg-indigo-500/[0.05] blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#0000000a_1px,transparent_1px),linear-gradient(to_bottom,#0000000a_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30 dark:opacity-50" />

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
           initial="hidden"
           whileInView="visible"
           viewport={{ once: true, margin: "-50px" }}
           variants={staggerContainer}
        >
          <SectionHeader 
            badge="Common Questions"
            title={<>Everything you need <br /> <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-indigo-600 dark:from-violet-400 dark:to-indigo-400">to know</span></>}
            description="Find answers to common questions about OptiqEPX and how to get started."
          />

          <motion.div variants={fadeInUp} className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 mt-12 items-start">
            <Accordion type="single" collapsible className="w-full space-y-4">
              {leftColumnFaqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-left-${index}`}
                  className="group relative overflow-hidden rounded-[2rem] border !border-b border-slate-200/60 dark:border-white/[0.05] bg-white/40 dark:bg-[#0e1016] backdrop-blur-3xl px-6 py-2 shadow-sm transition-all duration-500 data-[state=open]:shadow-md dark:data-[state=open]:bg-[#090a0d] data-[state=open]:border-violet-500/30 dark:data-[state=open]:border-violet-500/30 hover:border-violet-500/20 dark:hover:border-violet-500/20"
                >
                  <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-violet-500/0 to-transparent group-data-[state=open]:via-violet-500/50 transition-all duration-700" />
                  <div className="absolute inset-y-0 -left-px w-px bg-gradient-to-b from-transparent via-violet-500/0 to-transparent group-data-[state=open]:via-violet-500/50 transition-all duration-700 opacity-50" />

                  <AccordionTrigger className="text-left font-space-grotesk font-bold text-base sm:text-lg py-5 hover:no-underline hover:text-violet-600 dark:hover:text-violet-400 transition-colors [&[data-state=open]]:text-violet-600 dark:[&[data-state=open]]:text-violet-400 text-slate-900 dark:text-slate-100 pr-2">
                    <span className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-white/5 flex items-center justify-center shrink-0 border border-slate-200/50 dark:border-white/5 group-data-[state=open]:bg-violet-500/10 group-data-[state=open]:border-violet-500/20 transition-colors duration-300">
                        <MessageCircleQuestion className="w-4 h-4 text-slate-500 dark:text-slate-400 group-data-[state=open]:text-violet-600 dark:group-data-[state=open]:text-violet-400" />
                      </div>
                      {faq.question}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="text-slate-600 dark:text-slate-400 font-outfit leading-relaxed text-[0.95rem] pb-6 pl-11 pr-4">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            <Accordion type="single" collapsible className="w-full space-y-4">
              {rightColumnFaqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-right-${index}`}
                  className="group relative overflow-hidden rounded-[2rem] border !border-b border-slate-200/60 dark:border-white/[0.05] bg-white/40 dark:bg-[#0e1016] backdrop-blur-3xl px-6 py-2 shadow-sm transition-all duration-500 data-[state=open]:shadow-md dark:data-[state=open]:bg-[#090a0d] data-[state=open]:border-violet-500/30 dark:data-[state=open]:border-violet-500/30 hover:border-violet-500/20 dark:hover:border-violet-500/20"
                >
                  <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-violet-500/0 to-transparent group-data-[state=open]:via-violet-500/50 transition-all duration-700" />
                  <div className="absolute inset-y-0 -left-px w-px bg-gradient-to-b from-transparent via-violet-500/0 to-transparent group-data-[state=open]:via-violet-500/50 transition-all duration-700 opacity-50" />

                  <AccordionTrigger className="text-left font-space-grotesk font-bold text-base sm:text-lg py-5 hover:no-underline hover:text-violet-600 dark:hover:text-violet-400 transition-colors [&[data-state=open]]:text-violet-600 dark:[&[data-state=open]]:text-violet-400 text-slate-900 dark:text-slate-100 pr-2">
                    <span className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-white/5 flex items-center justify-center shrink-0 border border-slate-200/50 dark:border-white/5 group-data-[state=open]:bg-violet-500/10 group-data-[state=open]:border-violet-500/20 transition-colors duration-300">
                        <MessageCircleQuestion className="w-4 h-4 text-slate-500 dark:text-slate-400 group-data-[state=open]:text-violet-600 dark:group-data-[state=open]:text-violet-400" />
                      </div>
                      {faq.question}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="text-slate-600 dark:text-slate-400 font-outfit leading-relaxed text-[0.95rem] pb-6 pl-11 pr-4">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
