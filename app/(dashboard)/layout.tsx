import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import { DashboardShell } from '@/components/shared/DashboardShell';
import { getHighResAvatar } from '@/lib/utils';

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  const { data: profile } = await supabase
    .from('users_profile')
    .select('username, role, is_profile_completed, avatar_url, level, xp')
    .eq('id', user.id)
    .single();

  const isProfileIncomplete = !profile?.is_profile_completed;
  
  const enrichedProfile = {
    ...profile,
    auth_username: user.user_metadata?.username || user.user_metadata?.full_name || user.email?.split('@')[0],
    email: user.email,
    avatar_url: getHighResAvatar(profile?.avatar_url || user.user_metadata?.avatar_url || user.user_metadata?.picture)
  };

  if (!enrichedProfile.username && enrichedProfile.auth_username) {
    enrichedProfile.username = enrichedProfile.auth_username;
  }

  return (
    <DashboardShell profile={enrichedProfile} role={profile?.role || 'student'} isProfileIncomplete={isProfileIncomplete}>
      {children}
    </DashboardShell>
  );
}
