import { createClient } from '@/utils/supabase/server';
import ProfileClient from './ProfileClient';
import { getHighResAvatar } from '@/lib/utils';

export default async function ProfilePage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return null;

  const { data: profile } = await supabase
    .from('users_profile')
    .select('*')
    .eq('id', user.id)
    .single();

  const enrichedProfile = {
    ...profile,
    email: user.email,
    avatar_url: getHighResAvatar(profile?.avatar_url || user.user_metadata?.avatar_url),
    full_name: user.user_metadata?.full_name || profile?.username || 'Student',
  };

  return <ProfileClient profile={enrichedProfile} />;
}
