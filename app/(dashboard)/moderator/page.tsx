import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import ModeratorDashboardClient from './ModeratorClient';

export default async function ModeratorDashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const { data: profile } = await supabase
    .from('users_profile')
    .select('username, role')
    .eq('id', user?.id)
    .single();

  if (profile?.role !== 'moderator' && profile?.role !== 'admin') {
    redirect('/login');
  }

  const { count: roomCount } = await supabase.from('study_rooms').select('*', { count: 'exact', head: true });
  const { count: battleCount } = await supabase.from('battles').select('*', { count: 'exact', head: true }).eq('status', 'active');

  return (
    <ModeratorDashboardClient 
      roomCount={roomCount || 0} 
      battleCount={battleCount || 0} 
      username={profile?.username || ''}
    />
  );
}
