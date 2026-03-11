import { createClient } from '@/utils/supabase/server';
import StudyRoomsClient from './StudyRoomsClient';

export default async function StudyRoomsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return null;

  const { data: profile } = await supabase
    .from('users')
    .select('class')
    .eq('id', user.id)
    .single();

  const userClass = profile?.class;

  const { data: activeRooms } = await supabase
    .from('study_rooms')
    .select('*, users(username)')
    .eq('class', userClass)
    .order('created_at', { ascending: false });

  return <StudyRoomsClient userClass={userClass} activeRooms={activeRooms} />;
}
