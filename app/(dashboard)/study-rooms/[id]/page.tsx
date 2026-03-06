import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import { StudyRoomActive } from '@/features/study-rooms/components/StudyRoomActive';

export default async function StudyRoomPage({ params }: { params: Promise<{ id: string }> }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const { id } = await params;

  if (!user) {
    redirect('/login');
  }

  
  const { data: profile } = await supabase
    .from('users_profile')
    .select('*')
    .eq('id', user.id)
    .single();

  
  const { data: room } = await supabase
    .from('study_rooms')
    .select('*, users_profile(username)')
    .eq('id', id)
    .single();

  if (!room) {
    redirect('/study-rooms');
  }

  
  if (profile?.role === 'student' && room.class !== profile.class) {
    redirect('/study-rooms'); 
  }

  
  return (
    <div className="animate-in fade-in duration-500 h-[calc(100vh-8rem)]">
      <StudyRoomActive 
        roomId={room.id} 
        topic={room.topic} 
        hostName={room.users_profile?.username || 'Unknown'} 
        userProfile={{ id: profile!.id, username: profile!.username, class: profile!.class, role: profile!.role }}
      />
    </div>
  );
}
