'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Loader2, Send, User, Brain, Paperclip, Zap, Sparkles, MessageSquare, Info } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export function AiChat({ classLevel, username }: { classLevel: string, username: string }) {
  const [messages, setMessages] = useState<Message[]>([
    { 
      role: 'assistant', 
      content: `Hello ${username}! I'm Optiq AI, your dedicated learning companion for Class ${classLevel}. I've processed your curriculum and I'm ready to help you master any concept, solve complex problems, or prepare for exams. \n\nWhat's on your mind today?` 
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [mode, setMode] = useState<'concise' | 'detailed' | 'examples' | 'quiz'>('concise');
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

  const handleSend = async (content?: string) => {
    const messageContent = content || input.trim();
    if (!messageContent || isLoading) return;

    if (!content) setInput('');
    
    const userMsg = messageContent;
    const newMessages: Message[] = [...messages, { role: 'user', content: userMsg }];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages, classLevel, mode })
      });
      
      const data = await res.json();
      
      if (data.reply) {
         setMessages(prev => [...prev, { role: 'assistant', content: data.reply }]);
      } else {
         setMessages(prev => [...prev, { role: 'assistant', content: "I encountered an error while processing your request. Please check your configuration." }]);
      }
    } catch(err) {
      setMessages(prev => [...prev, { role: 'assistant', content: "A network error occurred. Please check your connection and try again." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const modes = [
    { id: 'concise', label: 'Concise', icon: Zap },
    { id: 'detailed', label: 'Deep Dive', icon: Brain },
    { id: 'examples', label: 'Step-by-Step', icon: Sparkles },
    { id: 'quiz', label: 'Test Me', icon: MessageSquare },
  ] as const;

  const suggestions = [
    `Explain Quantum Physics for Class ${classLevel}`,
    "How do I balance chemical equations?",
    "Give me a study plan for mathematics",
    "Explain the Socratic method"
  ];

  return (
    <div className="flex flex-col bg-background/50 dark:bg-black/20 relative">
      <div className="sticky top-0 px-8 py-4 border-b border-white/5 bg-white/5 backdrop-blur-xl flex items-center justify-between z-30 rounded-t-2xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-violet-500/20">
            <Brain className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-sm font-space-grotesk font-black text-foreground leading-none">Optiq AI Assistant</h3>
            <div className="flex items-center gap-1.5 mt-1">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] font-black font-outfit text-muted-foreground uppercase tracking-widest">Active Intelligence Unit</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex flex-col items-end">
            <span className="text-[10px] font-black font-outfit text-muted-foreground uppercase tracking-widest opacity-50">Class Context</span>
            <span className="text-xs font-bold font-space-grotesk text-violet-500">Class {classLevel}</span>
          </div>
          <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl border border-white/5 bg-white/5">
            <Info className="w-4 h-4 text-muted-foreground" />
          </Button>
        </div>
      </div>

      <div className="px-4 sm:px-8">
        <div className="max-w-4xl mx-auto py-10 space-y-10">
          <AnimatePresence mode="popLayout">
            {messages.map((msg, idx) => (
              <motion.div 
                key={idx}
                layout
                initial={{ opacity: 0, y: 20, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ type: "spring", damping: 30, stiffness: 200 }}
                className={cn(
                  "flex gap-4 sm:gap-6",
                  msg.role === 'user' ? "flex-row-reverse" : "flex-row"
                )}
              >
                <div className={cn(
                  "shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center shadow-xl",
                  msg.role === 'assistant' 
                    ? "bg-gradient-to-br from-violet-600 to-indigo-600 shadow-violet-500/20" 
                    : "bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/10"
                )}>
                  {msg.role === 'assistant' ? (
                    <Brain className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  ) : (
                    <User className="w-5 h-5 sm:w-6 sm:h-6 text-zinc-500" />
                  )}
                </div>

                <div className={cn(
                  "flex flex-col gap-2 max-w-[85%] sm:max-w-[80%]",
                  msg.role === 'user' ? "items-end" : "items-start"
                )}>
                  <div className={cn(
                    "p-5 sm:p-6 rounded-[1.75rem] font-outfit text-sm sm:text-base leading-relaxed transition-all",
                    msg.role === 'user' 
                      ? "bg-gradient-to-br from-violet-600 to-indigo-600 text-white rounded-tr-sm shadow-xl shadow-violet-500/10" 
                      : "bg-white dark:bg-white/5 border border-zinc-200 dark:border-white/10 rounded-tl-sm text-foreground/90 shadow-sm backdrop-blur-md"
                  )}>
                    <div className="whitespace-pre-wrap font-medium">{msg.content}</div>
                  </div>
                  <span className="text-[9px] font-black font-outfit text-muted-foreground uppercase tracking-[0.25em] px-2 opacity-40">
                    {msg.role === 'assistant' ? 'Optiq Intelligence' : username}
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {isLoading && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex gap-4 sm:gap-6 items-start"
            >
              <div className="shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center shadow-lg">
                <Loader2 className="w-5 h-5 sm:w-6 sm:h-6 text-white animate-spin" />
              </div>
              <div className="bg-white dark:bg-white/5 border border-zinc-200 dark:border-white/10 rounded-[1.75rem] rounded-tl-sm px-6 py-4 flex gap-1.5 items-center shadow-sm backdrop-blur-md">
                <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1.5 }} className="w-2 h-2 bg-violet-500 rounded-full" />
                <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0.2 }} className="w-2 h-2 bg-violet-500 rounded-full" />
                <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0.4 }} className="w-2 h-2 bg-violet-500 rounded-full" />
              </div>
            </motion.div>
          )}
        </div>
      </div>
      
      <div className="p-4 sm:p-8 border-t border-white/5 bg-white/5 backdrop-blur-2xl sticky bottom-0 z-30 rounded-b-2xl">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="flex flex-wrap items-center justify-center gap-2">
            {modes.map((m) => (
              <button
                key={m.id}
                onClick={() => setMode(m.id)}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-xl border font-space-grotesk font-black text-[11px] uppercase tracking-wider transition-all",
                  mode === m.id
                    ? "bg-violet-600 border-violet-500 text-white shadow-lg shadow-violet-500/20"
                    : "bg-white/40 dark:bg-white/5 border-white/40 dark:border-white/10 text-muted-foreground hover:bg-white/60 dark:hover:bg-white/10"
                )}
              >
                <m.icon className={cn("w-3.5 h-3.5", mode === m.id ? "text-white" : "text-violet-500")} />
                {m.label}
              </button>
            ))}
          </div>

          <div className="relative group">
            <div className="relative bg-white dark:bg-black/40 border border-zinc-200 dark:border-white/10 rounded-[2rem] shadow-xl p-2 pl-6 flex items-end gap-3 transition-all group-focus-within:border-violet-500/50">
              <Textarea 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
                placeholder={
                  mode === 'concise' ? "Ask for a quick answer..." :
                  mode === 'detailed' ? "Ask for an in-depth explanation..." :
                  mode === 'examples' ? "Ask for examples and steps..." :
                  "Ask for a quiz on any topic..."
                }
                className="flex-1 min-h-[50px] max-h-[200px] bg-transparent border-0 focus-visible:ring-0 resize-none py-4 text-[15px] font-outfit font-medium placeholder:text-muted-foreground/30"
              />
              
              <div className="flex items-center gap-2 pr-2 pb-2">
                <Button 
                  disabled={isLoading || !input.trim()} 
                  onClick={() => handleSend()}
                  className="h-10 w-10 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white shadow-lg shadow-violet-500/30 border-0 p-0 transition-all disabled:opacity-30"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-between px-6 text-[9px] font-black font-outfit text-muted-foreground uppercase tracking-[0.25em] opacity-40">
            <div className="flex items-center gap-1.5">
              <Sparkles className="w-3 h-3 text-violet-500" />
              <span>Optimized for Student Success</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
