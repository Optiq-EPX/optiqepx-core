'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Loader2, Send, User, Brain, Paperclip, Zap } from 'lucide-react';
import { fadeInUp, staggerContainer, cardHover } from '@/lib/animations';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export function AiChat({ classLevel, username }: { classLevel: string, username: string }) {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: `Hello ${username}! I'm your AI tutor. I specialize in topics across all subjects for Class ${classLevel}. What would you like to learn today?` }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      const scrollContainer = scrollRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTo({
          top: scrollContainer.scrollHeight,
          behavior: 'smooth'
        });
      }
    }
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput('');
    const newMessages: Message[] = [...messages, { role: 'user', content: userMsg }];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages, classLevel })
      });
      
      const data = await res.json();
      
      if (data.reply) {
         setMessages(prev => [...prev, { role: 'assistant', content: data.reply }]);
      } else {
         setMessages(prev => [...prev, { role: 'assistant', content: "I'm having a little trouble connecting to my brain right now. Can we try again?" }]);
      }
    } catch(err) {
      setMessages(prev => [...prev, { role: 'assistant', content: "A network error occurred." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-transparent overflow-hidden">
      {}
      <ScrollArea className="flex-1 px-8 py-10" ref={scrollRef}>
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="flex flex-col gap-10 max-w-4xl mx-auto pb-12"
        >
          <AnimatePresence mode="popLayout">
            {messages.map((msg, idx) => (
              <motion.div 
                key={idx}
                layout
                initial={{ opacity: 0, y: 30, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ type: "spring", damping: 28, stiffness: 220 }}
                className={`flex gap-6 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
              >
                {}
                <motion.div 
                  whileHover={{ scale: 1.15, rotate: 10 }}
                  className={`shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center shadow-2xl transition-all ${
                    msg.role === 'assistant' 
                      ? 'bg-gradient-to-br from-violet-600 to-indigo-600 shadow-violet-500/25' 
                      : 'bg-black/[0.03] dark:bg-white/5 border border-black/5 dark:border-white/10'
                  }`}
                >
                  {msg.role === 'assistant' ? (
                    <Brain className="w-6 h-6 text-white" />
                  ) : (
                    <User className="w-6 h-6 text-muted-foreground" />
                  )}
                </motion.div>
                
                {}
                <div className={`flex flex-col gap-3 max-w-[85%] ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                  <div className={`
                    p-6 rounded-[2rem] font-outfit text-base leading-relaxed shadow-[0_8px_32px_rgba(0,0,0,0.04)]
                    ${msg.role === 'user' 
                      ? 'bg-gradient-to-br from-violet-600 to-indigo-600 text-white rounded-tr-sm shadow-violet-600/20' 
                      : 'glass-card border-white/80 dark:border-white/5 rounded-tl-sm text-foreground/90 bg-white/70 dark:bg-white/5'}
                  `}>
                    <div className="whitespace-pre-wrap font-medium">{msg.content}</div>
                  </div>
                  <span className="text-[10px] font-black font-outfit text-muted-foreground uppercase tracking-[0.2em] px-4 opacity-50 italic">
                    {msg.role === 'assistant' ? 'Intelligence Unit' : 'Active Learner'}
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {isLoading && (
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex gap-6 items-start"
            >
              <div className="shrink-0 w-12 h-12 rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center shadow-xl shadow-violet-500/25">
                <Loader2 className="w-6 h-6 text-white animate-spin" />
              </div>
              <div className="glass-card border-white/80 dark:border-white/5 rounded-[2rem] rounded-tl-sm px-8 py-5 flex gap-2 items-center shadow-xl bg-white/70 dark:bg-white/5">
                <motion.div animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }} transition={{ repeat: Infinity, duration: 1.2 }} className="w-2.5 h-2.5 bg-violet-600 rounded-full" />
                <motion.div animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }} transition={{ repeat: Infinity, duration: 1.2, delay: 0.2 }} className="w-2.5 h-2.5 bg-violet-600 rounded-full" />
                <motion.div animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }} transition={{ repeat: Infinity, duration: 1.2, delay: 0.4 }} className="w-2.5 h-2.5 bg-violet-600 rounded-full" />
              </div>
            </motion.div>
          )}
        </motion.div>
      </ScrollArea>
      
      {}
      <div className="p-8 pb-12">
        <div className="max-w-4xl mx-auto relative group">
          {}
          <div className="absolute -inset-[2px] bg-gradient-to-r from-violet-500/20 via-indigo-500/20 to-violet-500/20 rounded-[2.5rem] blur-md opacity-0 group-focus-within:opacity-100 transition-all duration-700" />
          
          <div className="relative glass-card border-white/80 dark:border-white/10 rounded-[2.5rem] shadow-2xl p-3 pl-8 flex items-end gap-4 transition-all group-focus-within:border-violet-500/40 group-focus-within:shadow-violet-500/5 bg-white/70 dark:bg-white/5">
            <Textarea 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              placeholder="Deep dive into any concept..."
              className="flex-1 min-h-[64px] max-h-[250px] bg-transparent border-0 focus-visible:ring-0 resize-none py-5 text-base font-outfit font-medium placeholder:text-muted-foreground/40"
            />
            
            <div className="flex items-center gap-3 pr-3 pb-3">
              <Button variant="ghost" size="icon" className="h-12 w-12 rounded-2xl text-muted-foreground hover:bg-black/5 dark:hover:bg-white/5 hover:text-foreground transition-all">
                <Paperclip className="w-6 h-6" />
              </Button>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  disabled={isLoading || !input.trim()} 
                  onClick={handleSend}
                  className="h-12 w-12 rounded-[1.25rem] bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white shadow-xl shadow-violet-500/30 border-0 p-0 transition-all disabled:opacity-30 disabled:grayscale"
                >
                  <Send className="w-5 h-5" />
                </Button>
              </motion.div>
            </div>
          </div>
          
          <div className="mt-4 flex items-center justify-between px-8">
            <p className="text-[10px] font-black font-outfit text-muted-foreground uppercase tracking-[0.2em] opacity-30">
              Personalized Learning Engine • v2.0
            </p>
            <div className="flex items-center gap-2 opacity-40">
              <Zap className="w-3.5 h-3.5 text-violet-600" />
              <span className="text-[10px] font-black font-outfit text-muted-foreground uppercase tracking-[0.2em]">
                Ready to tutor
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
