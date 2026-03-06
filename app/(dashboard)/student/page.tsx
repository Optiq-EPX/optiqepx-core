import { createClient } from '@/utils/supabase/server';
import StudentDashboard from './StudentDashboard';

export default async function StudentDashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return null;

  const { data: profile } = await supabase
    .from('users_profile')
    .select('*')
    .eq('id', user.id)
    .single();

  return <StudentDashboard profile={profile} />;
}
