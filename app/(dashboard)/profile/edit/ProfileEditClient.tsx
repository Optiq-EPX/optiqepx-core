'use client';

import { ProfileForm } from '../ProfileForm';
import { motion } from 'motion/react';
import { UserCog } from 'lucide-react';

export default function ProfileEditClient({ profile }: { profile: any }) {
  return (
    <div className="w-full flex items-center justify-center bg-background dark:bg-[#09090b] min-h-[calc(100vh-2rem)] md:min-h-[calc(100vh-6rem)] rounded-[2rem] md:rounded-[3rem] border border-white/5 shadow-2xl relative">

      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-violet-600/10 dark:bg-violet-600/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-indigo-500/10 dark:bg-indigo-500/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, rgba(160,120,255,1) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

      <motion.div
        initial={{ opacity: 0, scale: 0.98, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="w-full max-w-[600px] px-6 py-12 relative z-10"
      >
        <div className="mb-8">
          <div className="space-y-3">
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-violet-500/10 border border-violet-500/20 text-violet-600 dark:text-violet-400 text-[10px] font-black uppercase tracking-[0.15em] font-outfit"
            >
              <UserCog className="w-3.5 h-3.5" />
              Settings
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-4xl md:text-5xl font-space-grotesk font-black text-foreground tracking-tight"
            >
              {profile?.is_profile_completed ? 'Edit Profile' : 'Complete Profile'}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-zinc-500 dark:text-zinc-400 font-outfit text-base"
            >
              Customize your identity before entering the battle arena and study rooms.
            </motion.p>
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 16 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 0.4 }} 
          className="w-full"
        >
          <div className="bg-white/50 dark:bg-black/20 backdrop-blur-xl border border-zinc-200 dark:border-white/5 rounded-[2.5rem] p-8 md:p-10 shadow-xl">
             <ProfileForm initialData={profile} hideHeader={true} onComplete={undefined} />
          </div>
        </motion.div>
      </motion.div>

    </div>
  );
}
