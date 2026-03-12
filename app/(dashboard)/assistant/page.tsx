import { createClient } from '@/utils/supabase/server';
import { AiChat } from '@/features/ai/components/AiChat';
import { Brain } from 'lucide-react';

export default async function AiAssistantPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const { data: profile } = await supabase
    .from('users')
    .select('class, username, avatar_url')
    .eq('id', user?.id)
    .single();

  return (
    <div className="flex-1 flex flex-col min-w-0 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 sm:gap-6 mb-6 sm:mb-8 pb-6 sm:pb-8 border-b border-black/[0.05] dark:border-white/[0.05]">
        <div className="flex flex-row items-center sm:items-start gap-4 sm:gap-5 w-full">
          <div className="shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-violet-500/10 dark:bg-violet-500/5 border border-violet-500/20 flex items-center justify-center text-violet-500 shadow-inner bg-white/50 dark:bg-white/5">
            <Brain className="w-6 h-6 sm:w-8 sm:h-8" />
          </div>
          <div className="min-w-0">
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-space-grotesk font-black tracking-tighter text-zinc-900 dark:text-white truncate">
              AI Assistant
            </h1>
            <p className="text-muted-foreground font-outfit mt-1.5 font-semibold flex flex-wrap items-center gap-2 sm:gap-3 leading-snug">
              <span className="shrink-0 px-2.5 py-1 sm:px-3 sm:py-1 rounded-[10px] sm:rounded-xl bg-violet-500/10 border border-violet-500/20 text-violet-600 font-black uppercase tracking-widest text-[9px] sm:text-[10px]">
                Class {profile?.class?.toUpperCase() || 'GENERAL'}
              </span>
              <span className="hidden sm:block shrink-0 w-1.5 h-1.5 rounded-full bg-black/20 dark:bg-white/20" />
              <span className="text-[11px] sm:text-sm opacity-70 w-full sm:w-auto mt-0.5 sm:mt-0">Your 24/7 personal tutor for Optiq EPX material</span>
            </p>
          </div>
        </div>
      </div>
 
      <AiChat 
        classLevel={profile?.class || '1'} 
        username={profile?.username || 'Student'} 
        userAvatar={profile?.avatar_url}
      />
    </div>
  );
}
