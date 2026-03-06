import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import AdminDashboardClient from './AdminClient';

export default async function AdminDashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const { data: profile } = await supabase
    .from('users_profile')
    .select('role')
    .eq('id', user?.id)
    .single();

  if (profile?.role !== 'admin') {
    redirect('/login');
  }

  const { count: userCount } = await supabase.from('users_profile').select('*', { count: 'exact', head: true });
  const { count: roomCount } = await supabase.from('study_rooms').select('*', { count: 'exact', head: true });
  const { count: battleCount } = await supabase.from('battles').select('*', { count: 'exact', head: true });

  return (
    <AdminDashboardClient 
      userCount={userCount || 0} 
      roomCount={roomCount || 0} 
      battleCount={battleCount || 0} 
    />
  );
}


