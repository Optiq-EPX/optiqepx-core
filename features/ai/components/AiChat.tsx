'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import NextImage from 'next/image';
import { Loader2, Send, User, Brain, Paperclip, Zap, Sparkles, MessageSquare, Info, Copy, Check, Pencil, Square, BookOpen, FlaskConical, GitCompare, Baby, ChevronUp, X, RefreshCcw, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { MarkdownRenderer } from '@/components/shared/MarkdownRenderer';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setMessages as setGlobalMessages, addMessage, updateLastMessage } from '@/features/ai/store/aiSlice';
import type { Message } from '@/features/ai/store/aiSlice';

export function AiChat({ classLevel, username: propUsername, userAvatar: propUserAvatar }: { classLevel: string, username: string, userAvatar?: string | null }) {
  const messages = useAppSelector((state) => state.ai.messages);
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();

  const username = user?.username || propUsername;
  const userAvatar = user?.avatar_url || propUserAvatar;

  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem(`optiq_chat_${username}`, JSON.stringify(messages));
    }
  }, [messages, username]);

  useEffect(() => {
    if (messages.length === 0) {
      const saved = localStorage.getItem(`optiq_chat_${username}`);
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (parsed && parsed.length > 0) {
            dispatch(setGlobalMessages(parsed));
            return;
          }
        } catch (e) {
          console.error("Failed to parse chat history", e);
        }
      }

      dispatch(setGlobalMessages([
        { 
          role: 'assistant', 
          content: `Hello ${username}! I'm Optiq AI, your dedicated learning companion for Class ${classLevel}. I've processed your curriculum and I'm ready to help you master any concept, solve complex problems, or prepare for exams. \n\nWhat's on your mind today?` 
        }
      ]));
    }
  }, [dispatch, username, classLevel, messages.length]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [abortController, setAbortController] = useState<AbortController | null>(null);
  const [mode, setMode] = useState<'concise' | 'detailed' | 'examples' | 'quiz' | 'summarize'>('concise');
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [modeOpen, setModeOpen] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const modeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modeRef.current && !modeRef.current.contains(e.target as Node)) {
        setModeOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleCopy = (content: string, index: number) => {
    navigator.clipboard.writeText(content);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleEdit = (content: string, index: number) => {
    setInput(content);
    setEditingIndex(index);
  };

  const handleCancelEdit = () => {
    setInput('');
    setEditingIndex(null);
  };

  const handleNewChat = () => {
    localStorage.removeItem(`optiq_chat_${username}`);
    dispatch(setGlobalMessages([
      { 
        role: 'assistant', 
        content: `Hello ${username}! I'm Optiq AI, your dedicated learning companion for Class ${classLevel}. I've processed your curriculum and I'm ready to help you master any concept, solve complex problems, or prepare for exams. \n\nWhat's on your mind today?` 
      }
    ]));
    setInput('');
    setEditingIndex(null);
  };

  const handleStop = () => {
    if (abortController) {
      abortController.abort();
      setAbortController(null);
      setIsLoading(false);
    }
  };

  const handleRegenerate = (index: number) => {
    const userPrompt = messages[index - 1].content;
    const previousMessages = messages.slice(0, index - 1);
    
    dispatch(setGlobalMessages(previousMessages)); 
    handleSend(userPrompt); 
  };

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages.length]);

  const handleSend = async (content?: string) => {
    const messageContent = content || input.trim();
    if (!messageContent || isLoading) return;

    const baseMessages = editingIndex !== null ? messages.slice(0, editingIndex) : messages;

    if (!content) setInput('');
    setEditingIndex(null);
    
    const userMsg = messageContent;
    const newMessages: Message[] = [...baseMessages, { role: 'user', content: userMsg }];
    dispatch(setGlobalMessages(newMessages));
    setIsLoading(true);

    const controller = new AbortController();
    setAbortController(controller);

    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages, classLevel, mode }),
        signal: controller.signal
      });

      if (!res.ok) {
        throw new Error('Failed to connect to AI server');
      }

      dispatch(setGlobalMessages([...newMessages, { role: 'assistant', content: '' }]));

      const reader = res.body?.getReader();
      const decoder = new TextDecoder();
      let fullContent = '';

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value, { stream: true });
          fullContent += chunk;

          dispatch(updateLastMessage(fullContent));
        }
      }
    } catch(err: any) {
      if (err.name === 'AbortError') {
        console.log('Fetch aborted');
      } else {
        dispatch(setGlobalMessages([...newMessages, { role: 'assistant', content: "An error occurred. Please check your connection and try again." }]));
      }
    } finally {
      setIsLoading(false);
      setAbortController(null);
    }
  };

  const modes = [
    { id: 'concise', label: 'Concise', icon: Zap, desc: 'Quick answers' },
    { id: 'detailed', label: 'Deep Dive', icon: Brain, desc: 'In-depth explanations' },
    { id: 'examples', label: 'Step-by-Step', icon: Sparkles, desc: 'Guided walkthrough' },
    { id: 'quiz', label: 'Test Me', icon: MessageSquare, desc: 'Practice questions' },
    { id: 'summarize', label: 'Summarize', icon: BookOpen, desc: 'Key points only' },
  ] as const;

  const getLocalizedSuggestions = () => {
    const level = parseInt(classLevel);
    
    if (level <= 5) {
      return [
        "Tell me about the National Memorial of Bangladesh",
        `Math help for Class ${classLevel}: Fractional numbers`,
        "Summarize the story of the Language Movement (1952)",
         "BGS: Names of the 8 divisions of Bangladesh",
        "Explain how the water cycle works simply"
      ];
    } else if (level <= 8) {
      return [
        "Simplify algebraic expressions for me",
        "Explain the causes of the 1971 Liberation War",
        "Science: How does a plant cell differ from animal cell?",
        "ICT: What are the main components of a computer?",
        "BGS: Explain the importance of the Sundarbans"
      ];
    } else {
      return [
        "Physics: Explain Archimedes' Principle in Bangla context",
        "Chemistry: The Periodic Table and its trends",
        "Describe the significance of the 7th March Speech",
        "Biology: Explain the structure of DNA briefly",
        "ICT: What is HTML and why is it used?"
      ];
    }
  };

  const suggestions = getLocalizedSuggestions();

  return (
    <div className="relative w-full flex-1 flex flex-col min-w-0">
      {/* Mobile Top Toolbar */}
      <div className="sm:hidden sticky top-[-4px] z-[40] flex items-center justify-between px-4 py-3 bg-black/20 backdrop-blur-xl border-b border-white/[0.08] mb-6 -mx-1">
        <div className="flex items-center gap-2">
           <Button
            variant="ghost"
            onClick={handleNewChat}
            className="h-9 w-9 shrink-0 flex items-center justify-center p-0 rounded-xl bg-white/[0.08] border border-white/[0.1] text-zinc-400"
          >
            <Plus className="w-4 h-4" />
          </Button>
          <div className="h-4 w-[1px] bg-white/[0.1] mx-1" />
          <div className="flex flex-col">
            <span className="text-[10px] font-space-grotesk font-bold uppercase tracking-widest text-violet-400 opacity-60">Mode</span>
            <span className="text-xs font-outfit font-bold text-white uppercase tracking-wider">
              {modes.find(m => m.id === mode)?.label}
            </span>
          </div>
        </div>

        <div className="relative" ref={modeRef}>
          <Button
            variant="ghost"
            onClick={() => setModeOpen(!modeOpen)}
            className="h-9 px-4 rounded-xl bg-violet-500/10 border border-violet-500/20 text-violet-400 text-xs font-bold uppercase tracking-wider flex items-center gap-2"
          >
            <Zap className="w-3.5 h-3.5" />
            Switch
          </Button>

          <AnimatePresence>
            {modeOpen && (
              <motion.div 
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                className="absolute top-full right-0 mt-2 w-60 bg-zinc-950 border border-white/[0.08] rounded-2xl shadow-2xl z-50 origin-top-right overflow-hidden"
              >
                <div className="px-4 py-2 border-b border-white/[0.06] bg-white/[0.02]">
                  <span className="text-[9px] font-space-grotesk font-black uppercase tracking-[0.2em] text-muted-foreground/40">Select Mode</span>
                </div>
                {modes.map((m, i) => (
                  <button
                    key={m.id}
                    onClick={() => { setMode(m.id); setModeOpen(false); }}
                    className={cn(
                      "flex items-center gap-3 w-full px-4 py-3 text-left transition-all",
                      mode === m.id ? "bg-violet-500/10 text-violet-400" : "text-zinc-500 hover:bg-white/[0.04]"
                    )}
                  >
                    <m.icon className="w-4 h-4" />
                    <span className="text-xs font-bold uppercase tracking-wide">{m.label}</span>
                    {mode === m.id && <Check className="ml-auto w-3.5 h-3.5" />}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="w-full max-w-4xl mx-auto pb-6 space-y-10 px-3 sm:px-4 min-w-0">
          <AnimatePresence mode="popLayout">
            {messages.map((msg, idx) => (
              <motion.div 
                key={idx}
                layout
                initial={{ opacity: 0, y: 20, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ type: "spring", damping: 30, stiffness: 200 }}
                className={cn(
                  "flex gap-2 sm:gap-6 group w-full max-w-full min-w-0",
                  msg.role === 'user' ? "flex-col items-end sm:flex-row-reverse sm:items-start" : "flex-col sm:flex-row"
                )}
              >
                <motion.div 
                  className={cn(
                  "shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center shadow-xl relative overflow-hidden",
                  msg.role === 'assistant' 
                    ? "bg-gradient-to-br from-violet-600 to-indigo-600 shadow-violet-500/20" 
                    : "bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/10"
                )}>

                  {msg.role === 'assistant' ? (
                    <Brain className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  ) : userAvatar ? (
                    <>
                      <img
                        src={userAvatar}
                        alt={username}
                        className="w-full h-full object-cover rounded-2xl"
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = 'none';
                          (e.target as HTMLImageElement).nextElementSibling?.classList.remove('hidden');
                        }}
                      />
                      <div className="hidden absolute inset-0 flex items-center justify-center bg-gradient-to-br from-violet-500 to-indigo-500 rounded-2xl text-white font-black text-sm sm:text-lg">
                        {username?.charAt(0).toUpperCase() || 'U'}
                      </div>
                    </>
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-violet-500 to-indigo-500 rounded-2xl text-white font-black text-sm sm:text-lg">
                      {username?.charAt(0).toUpperCase() || 'U'}
                    </div>
                  )}
                </motion.div>

                <div className={cn(
                  "flex flex-col gap-2 flex-1 min-w-0 w-full max-w-full sm:max-w-[85%]",
                  msg.role === 'user' ? "items-end" : "items-start"
                )}>
                  <motion.div 
                    initial={false}
                    transition={{ type: "spring", damping: 30, stiffness: 200 }}
                    className={cn(
                      "px-4 py-2 sm:px-5 sm:py-2.5 rounded-[1.75rem]",
                      "font-outfit leading-relaxed transition-all stable-bubble min-h-[44px] min-w-0 max-w-full break-words overflow-hidden relative",
                      msg.role === 'user' 
                        ? "bg-gradient-to-br from-violet-600 to-indigo-600 dark:bg-none dark:bg-white text-white dark:text-zinc-900 rounded-tr-sm shadow-xl shadow-violet-500/10 dark:shadow-white/5 font-medium text-[13px] sm:text-[15px]" 
                        : "bg-white dark:bg-white/5 border border-zinc-200 dark:border-white/10 rounded-tl-sm text-foreground/90 shadow-sm backdrop-blur-md text-[14px] sm:text-[17px]"
                    )}
                  >

                    {msg.role === 'assistant' ? (
                      <MarkdownRenderer content={msg.content} className="ai-markdown-content" isGenerating={isLoading && idx === messages.length - 1} />
                    ) : (
                      <div className="whitespace-pre-wrap font-medium">{msg.content}</div>
                    )}
                  </motion.div>
                  <div className={cn(
                    "flex items-center gap-2 mt-1 opacity-0 group-hover:opacity-100 transition-opacity",
                    msg.role === 'user' ? "flex-row-reverse" : "flex-row"
                  )}>
                    <div className="flex items-center gap-1">
                      {msg.role === 'user' && (
                        <button 
                          onClick={() => handleEdit(msg.content, idx)}
                          className="p-1.5 rounded-md text-zinc-400 hover:text-violet-500 hover:bg-violet-500/10 transition-colors cursor-pointer"
                          title="Edit prompt & restart from here"
                        >
                          <Pencil className="w-3.5 h-3.5" />
                        </button>
                      )}
                      {msg.role === 'assistant' && idx > 0 && !isLoading && (
                        <button 
                          onClick={() => handleRegenerate(idx)}
                          className="p-1.5 rounded-md text-zinc-400 hover:text-violet-500 hover:bg-violet-500/10 transition-colors cursor-pointer"
                          title="Regenerate response"
                        >
                          <RefreshCcw className="w-3.5 h-3.5" />
                        </button>
                      )}
                      <button 
                        onClick={() => handleCopy(msg.content, idx)}
                        className="p-1.5 rounded-md text-zinc-400 hover:text-violet-500 hover:bg-violet-500/10 transition-colors cursor-pointer"
                        title="Copy content"
                      >
                        {copiedIndex === idx ? (
                          <Check className="w-3.5 h-3.5 text-emerald-500" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {messages.length === 1 && !isLoading && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap gap-2 ml-14 sm:ml-18"
            >
              {suggestions.map((s, i) => (
                <button
                  key={i}
                  onClick={() => handleSend(s)}
                  className="px-4 py-2 rounded-xl bg-white dark:bg-white/5 border border-zinc-200 dark:border-white/10 text-xs font-outfit font-bold text-muted-foreground hover:bg-violet-500/10 hover:border-violet-500/50 hover:text-violet-500 transition-all cursor-pointer shadow-sm"
                >
                  {s}
                </button>
              ))}
            </motion.div>
          )}

          {isLoading && (!messages.length || messages[messages.length - 1].role !== 'assistant' || !messages[messages.length - 1].content) && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col sm:flex-row gap-2 sm:gap-6 items-start w-full"
            >
              <div className="shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center shadow-lg">
                <Brain className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <div className="bg-white dark:bg-white/5 border border-zinc-200 dark:border-white/10 rounded-[1.75rem] rounded-tl-sm px-6 py-4 flex gap-1.5 items-center shadow-sm backdrop-blur-md">
                <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1.5 }} className="w-2 h-2 bg-violet-500 rounded-full" />
                <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0.2 }} className="w-2 h-2 bg-violet-500 rounded-full" />
                <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0.4 }} className="w-2 h-2 bg-violet-500 rounded-full" />
              </div>
            </motion.div>
          )}
        <div ref={bottomRef} />
      </div>

      {/* Spacer pushes input to bottom when content is short */}
      <div className="flex-1" />
      
      <div className="sticky bottom-0 z-50 px-2 sm:px-4 pt-2 pb-4 bg-gradient-to-t from-dashboard from-70% to-transparent">
          <div className="relative w-full max-w-4xl mx-auto rounded-2xl shadow-[0_8px_40px_-10px_rgba(0,0,0,0.8)] bg-black/40 backdrop-blur-xl border border-white/10">
            <div className="relative flex items-end gap-1.5 sm:gap-3 w-full p-1.5 sm:p-2">
              
              <div className="hidden sm:flex shrink-0 gap-1 sm:gap-2">
                <Button
                  variant="ghost"
                  onClick={handleNewChat}
                  className="max-[540px]:h-9 max-[540px]:w-9 h-10 w-10 sm:h-[52px] sm:w-[52px] shrink-0 flex items-center justify-center p-0 rounded-xl sm:rounded-2xl bg-white/[0.08] backdrop-blur-sm border border-white/[0.12] hover:border-violet-500/30 text-zinc-400 hover:text-violet-400 transition-all shadow-sm cursor-pointer"
                  title="New Chat"
                >
                  <span className="sr-only">New Chat</span>
                  <Plus className="max-[540px]:w-3.5 max-[540px]:h-3.5 w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
                </Button>

                <div className="relative shrink-0" ref={modeRef}>
                    <button
                    onClick={() => setModeOpen(!modeOpen)}
                    className="max-[540px]:h-9 max-[540px]:w-9 h-10 w-10 sm:h-[52px] sm:w-[52px] lg:w-auto flex items-center justify-center lg:justify-start gap-2 px-0 lg:px-5 rounded-xl sm:rounded-2xl bg-white/[0.08] backdrop-blur-sm border border-white/[0.12] hover:border-violet-500/30 text-violet-400 font-space-grotesk font-bold text-[11px] uppercase tracking-wider cursor-pointer whitespace-nowrap transition-all shadow-[0_2px_20px_-4px_rgba(139,92,246,0.15)]"
                    title={modes.find(m => m.id === mode)?.label}
                  >
                    {(() => { 
                      const active = modes.find(m => m.id === mode); 
                      if (!active) return null;
                      const Icon = active.icon;
                      return <Icon className="max-[540px]:w-3 max-[540px]:h-3 w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />;
                    })()}
                    <span className="hidden lg:inline">{modes.find(m => m.id === mode)?.label}</span>
                  </button>

                  <AnimatePresence>
                    {modeOpen && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="absolute bottom-full left-0 mb-3 w-60 bg-zinc-950 border border-white/[0.08] rounded-2xl shadow-[0_8px_40px_-8px_rgba(0,0,0,0.7)] overflow-hidden z-50 origin-bottom-left"
                      >
                      <div className="px-4 py-2.5 border-b border-white/[0.06]">
                        <span className="text-[10px] font-space-grotesk font-bold uppercase tracking-widest text-muted-foreground/50">Response Mode</span>
                      </div>
                      {modes.map((m, i) => (
                        <button
                          key={m.id}
                          onClick={() => { setMode(m.id); setModeOpen(false); }}
                          className={cn(
                            "flex items-center gap-3 w-full px-4 py-3 text-left font-outfit text-sm cursor-pointer transition-all",
                            mode === m.id
                              ? "bg-violet-500/10 text-violet-400"
                              : "text-zinc-400 hover:bg-white/[0.04] hover:text-zinc-200",
                            i < modes.length - 1 && "border-b border-white/[0.04]"
                          )}
                        >
                          <div className={cn(
                            "w-8 h-8 rounded-xl flex items-center justify-center shrink-0",
                            mode === m.id ? "bg-violet-500/15" : "bg-white/[0.04]"
                          )}>
                            <m.icon className={cn("w-4 h-4", mode === m.id ? "text-violet-400" : "text-zinc-500")} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="font-semibold text-[13px]">{m.label}</div>
                            <div className="text-[11px] text-zinc-500">{m.desc}</div>
                          </div>
                          {mode === m.id && <Check className="ml-auto w-4 h-4 text-violet-400 shrink-0" />}
                        </button>
                      ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              <div className={cn(
                "flex-1 relative rounded-xl sm:rounded-2xl bg-white/[0.03] border border-white/[0.08] shadow-[inset_0_2px_4px_rgba(0,0,0,0.3)] transition-all flex overflow-hidden group/input",
                "focus-within:border-violet-500/40 focus-within:shadow-[0_0_20px_rgba(139,92,246,0.1)]"
              )}>
                <div className="absolute inset-0 bg-gradient-to-r from-violet-500/0 via-violet-500/5 to-violet-500/0 opacity-0 group-focus-within/input:opacity-100 transition-opacity blur-xl pointer-events-none" />
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
                    mode === 'examples' ? "Ask for a step-by-step walkthrough..." :
                    mode === 'quiz' ? "Enter a topic to get quizzed on..." :
                    mode === 'summarize' ? "Paste or describe what to summarize..." :
                    mode === 'formula' ? "Which formula or equation do you need help with?" :
                    mode === 'compare' ? "Name two concepts to compare..." :
                    "Ask anything, I'll explain it super simply..."
                  }
                  className="w-full min-h-9 sm:min-h-[52px] max-h-[200px] bg-transparent border-0 focus-visible:ring-0 rounded-xl sm:rounded-2xl resize-none px-3.5 py-2.5 sm:px-5 sm:py-4 text-[12px] sm:text-[15px] font-outfit font-medium text-zinc-200 placeholder:text-zinc-600 relative z-10"
                />
              </div>
              
              <div className="shrink-0 flex items-center gap-1 sm:gap-2">
                {editingIndex !== null && !isLoading && (
                  <Button 
                    variant="ghost"
                    onClick={handleCancelEdit}
                    className="max-[540px]:h-9 max-[540px]:w-9 h-9 w-9 sm:h-[52px] sm:w-[52px] rounded-xl sm:rounded-2xl bg-white/[0.08] backdrop-blur-sm border border-white/[0.12] hover:bg-white/[0.1] text-zinc-400 p-0 transition-all cursor-pointer flex items-center justify-center group/cancel"
                    title="Cancel editing"
                  >
                    <X className="max-[540px]:w-3 max-[540px]:h-3 w-3.5 h-3.5 sm:w-5 sm:h-5 group-hover/cancel:scale-110 transition-transform" />
                  </Button>
                )}
                {isLoading ? (
                  <Button 
                    variant="ghost"
                    onClick={handleStop}
                    className="max-[540px]:h-9 max-[540px]:w-9 h-10 w-10 sm:h-[52px] sm:w-[52px] rounded-xl sm:rounded-2xl bg-white/[0.08] backdrop-blur-sm border border-white/[0.12] hover:border-red-500/30 hover:bg-red-500/10 text-red-500/70 shadow-xl p-0 transition-all cursor-pointer flex items-center justify-center group/stop"
                  >
                    <Square className="max-[540px]:w-3 max-[540px]:h-3 w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current text-red-500/70 group-hover/stop:scale-110 group-hover/stop:text-red-500 transition-all" />
                  </Button>
                ) : (
                  <Button 
                    variant="ghost"
                    disabled={!input.trim()} 
                    onClick={() => handleSend()}
                    className={cn(
                      "max-[540px]:h-9 max-[540px]:w-9 h-10 w-10 sm:h-[52px] sm:w-[52px] rounded-xl sm:rounded-2xl bg-white/[0.08] backdrop-blur-sm border border-white/[0.12] hover:border-violet-500/40 hover:bg-violet-500/15 text-violet-400 shadow-[0_2px_20px_-4px_rgba(139,92,246,0.15)] p-0 transition-all cursor-pointer flex items-center justify-center disabled:opacity-30 disabled:cursor-default group/send",
                      input.trim() && "border-violet-500/20"
                    )}
                  >
                    <Send className={cn(
                      "max-[540px]:w-3.5 max-[540px]:h-3.5 w-4 h-4 sm:w-[18px] sm:h-[18px] transition-all", 
                      input.trim() ? "opacity-100 scale-110" : "opacity-20 scale-100",
                      "group-hover/send:translate-x-0.5 group-hover/send:-translate-y-0.5"
                    )} />
                  </Button>
                )}
              </div>
            </div>
          </div>

          <div className="mt-2.5 flex items-center justify-center gap-1.5 text-[10px] sm:text-[11px] font-medium text-zinc-500/60 transition-opacity animate-in fade-in slide-in-from-bottom-1 duration-700">
            <Info className="w-3 h-3 sm:w-3.5 sm:h-3.5 opacity-50" />
            <span className="font-outfit tracking-tight">Optiq AI can make mistakes. Check important information.</span>
          </div>
        </div>
      </div>
  );
}
