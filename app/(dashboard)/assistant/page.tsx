import { createClient } from '@/utils/supabase/server';
import { AiChat } from '@/features/ai/components/AiChat';
import { Brain } from 'lucide-react';

export default async function AiAssistantPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const { data: profile } = await supabase
    .from('users')
    .select('class, username')
    .eq('id', user?.id)
    .single();

  return (
    <div className="flex flex-col min-h-[calc(100vh-96px)] lg:min-h-[calc(100vh-130px)] animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8 pb-8 border-b border-black/[0.05] dark:border-white/[0.05]">
        <div className="flex items-center gap-5">
          <div className="w-14 h-14 rounded-2xl bg-violet-500/10 dark:bg-violet-500/5 border border-violet-500/20 flex items-center justify-center text-violet-500 shadow-inner bg-white/50 dark:bg-white/5">
            <Brain className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-4xl md:text-5xl font-space-grotesk font-black tracking-tighter bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
              AI Assistant
            </h1>
            <p className="text-muted-foreground font-outfit mt-1 font-semibold flex items-center gap-3">
              <span className="px-3 py-1 rounded-xl bg-violet-500/10 border border-violet-500/20 text-violet-600 text-xs font-black uppercase tracking-widest text-[10px]">
                Class {profile?.class?.toUpperCase() || 'GENERAL'}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-black/20 dark:bg-white/20" />
              <span className="text-sm opacity-70">Your 24/7 personal tutor for Optiq EPX material</span>
            </p>
          </div>
        </div>
      </div>
 
      <div className="relative flex-1 flex flex-col w-full">
         <AiChat classLevel={profile?.class || '1'} username={profile?.username || 'Student'} />
      </div>
    </div>
  );
}
