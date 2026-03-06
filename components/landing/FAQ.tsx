'use client';

import { motion } from 'motion/react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { fadeInUp, staggerContainer } from '@/lib/animations';

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
  return (
    <section id="faq" className="py-24 sm:py-32 bg-white/30 dark:bg-transparent">
      <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <motion.div
           initial="hidden"
           whileInView="visible"
           viewport={{ once: true, margin: "-100px" }}
           variants={staggerContainer}
        >
          {}
          <motion.div variants={fadeInUp} className="text-center max-w-2xl mx-auto mb-16 sm:mb-20">
            <p className="text-sm font-bold font-outfit uppercase tracking-widest text-violet-600 dark:text-violet-400 mb-3">
              Common Questions
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-space-grotesk font-extrabold tracking-tight mb-5">
              Everything you need <br /> <span className="text-gradient">to know</span>
            </h2>
            <p className="text-lg text-muted-foreground font-outfit leading-relaxed">
              Find answers to common questions about OptiqEPX and how to get started.
            </p>
          </motion.div>

          {}
          <motion.div variants={fadeInUp}>
            <Accordion type="single" collapsible className="w-full space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className={`glass-card border-white/10 dark:border-white/10 data-[state=open]:border-violet-500/30 dark:data-[state=open]:border-violet-500/30 rounded-[2rem] px-8 bg-white/40 dark:bg-white/5 shadow-xl shadow-black/[0.02] transition-all duration-300`}
                >
                  <AccordionTrigger className="text-left font-space-grotesk font-bold text-lg py-6 hover:no-underline hover:text-violet-600 dark:hover:text-violet-400 transition-colors [&[data-state=open]]:text-violet-600 dark:[&[data-state=open]]:text-violet-400">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground font-outfit leading-relaxed text-sm pb-8 pr-4">
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
