import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import { ProfileForm } from '../ProfileForm';

export default async function ProfileEditPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  const { data: profile } = await supabase
    .from('users_profile')
    .select('*')
    .eq('id', user.id)
    .single();

  return (
    <div className="max-w-4xl mx-auto py-12 px-6">
      <div className="mb-12">
        <h1 className="text-4xl font-black font-space-grotesk tracking-tighter text-foreground mb-2">
          Complete Your Identity
        </h1>
        <p className="text-muted-foreground font-outfit text-lg">
          Fill in the details below to unlock the full OptiqEPX experience.
        </p>
      </div>

      <div className="glass-card rounded-[3rem] p-12 shadow-2xl overflow-hidden relative">
        <div className="absolute top-0 right-0 p-32 bg-violet-500/5 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-0 left-0 p-32 bg-indigo-500/5 rounded-full blur-3xl -z-10" />
        
        <ProfileForm initialData={profile} hideHeader={true} />
      </div>
    </div>
  );
}
