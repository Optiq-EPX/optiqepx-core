import { createClient } from '@/utils/supabase/server';
import { AiChat } from '@/features/ai/components/AiChat';

export default async function AiAssistantPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const { data: profile } = await supabase
    .from('users')
    .select('class, username')
    .eq('id', user?.id)
    .single();

  return (
    <div className="flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="shrink-0 mb-4">
        <h1 className="text-3xl font-space-grotesk font-extrabold tracking-tight bg-gradient-to-r from-purple-500 to-indigo-500 bg-clip-text text-transparent italic">AI Study Assistant</h1>
        <p className="text-muted-foreground font-outfit mt-1">Your 24/7 personal tutor for Class {profile?.class?.toUpperCase()} material</p>
      </div>
 
      <div className="bg-card/40 backdrop-blur-md border border-white/5 rounded-2xl shadow-xl relative mt-4">
         <AiChat classLevel={profile?.class || '1'} username={profile?.username || 'Student'} />
      </div>
    </div>
  );
}
