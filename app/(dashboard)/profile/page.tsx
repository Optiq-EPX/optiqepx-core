import { createClient } from '@/utils/supabase/server';
import ProfileClient from './ProfileClient';
import { getHighResAvatar } from '@/lib/utils';

export default async function ProfilePage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return null;

  const { data: profile } = await supabase
    .from('users')
    .select('*')
    .eq('id', user.id)
    .single();

  const enrichedProfile = {
    ...profile,
    email: user.email,
    avatar_url: getHighResAvatar(profile?.avatar_url || user.user_metadata?.avatar_url),
    full_name: user.user_metadata?.full_name || profile?.username || 'Student',
    auth_username: user.user_metadata?.username || user.user_metadata?.full_name || user.email?.split('@')[0],
    username: profile?.username || user.user_metadata?.username || '',
    class: profile?.class || user.user_metadata?.class || '',
    phone: profile?.phone || '',
    address: profile?.address || '',
    is_profile_completed: profile?.is_profile_completed || false,
  };

  return <ProfileClient profile={enrichedProfile} />;
}
