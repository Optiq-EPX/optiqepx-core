import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import { DashboardShell } from '@/components/shared/DashboardShell';

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  const { data: profile } = await supabase
    .from('users_profile')
    .select('username, role')
    .eq('id', user.id)
    .single();

  const role = profile?.role || 'student';

  return (
    <DashboardShell profile={profile} role={role}>
      {children}
    </DashboardShell>
  );
}
