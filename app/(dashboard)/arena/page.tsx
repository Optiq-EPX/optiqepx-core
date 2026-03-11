import { createClient } from '@/utils/supabase/server';
import ArenaClient from './ArenaClient';

export default async function ArenaPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return null;

  const { data: profile } = await supabase
    .from('users')
    .select('class')
    .eq('id', user.id)
    .single();

  const userClass = profile?.class;

  const { data: activeBattles } = await supabase
    .from('battles')
    .select('*, users(username)')
    .eq('status', 'waiting')
    .order('created_at', { ascending: false });

  return <ArenaClient userClass={userClass} activeBattles={activeBattles} />;
}
