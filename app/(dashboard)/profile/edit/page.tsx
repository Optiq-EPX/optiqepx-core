import { createClient } from '@/utils/supabase/server';
import ProfileEditClient from './ProfileEditClient';
import { redirect } from 'next/navigation';

export default async function ProfileEditPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  const { data: profile } = await supabase
    .from('users')
    .select('*')
    .eq('id', user.id)
    .single();

  const enrichedProfile = {
    ...profile,
    id: user.id, 
    auth_username: user.user_metadata?.username || user.user_metadata?.full_name || user.email?.split('@')[0],
  };

  return <ProfileEditClient profile={enrichedProfile} />;
}
