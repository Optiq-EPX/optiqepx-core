'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';
import { Loader2, User, GraduationCap, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { fadeInUp, staggerContainer } from '@/lib/animations';

const profileSchema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters').max(20),
  class: z.string().min(1, "Please select your class"),
});

type ProfileFormData = z.infer<typeof profileSchema>;

const inputClass = "h-14 rounded-2xl border-zinc-200 dark:border-white/10 bg-white dark:bg-white/5 focus-visible:ring-2 focus-visible:ring-violet-500/20 focus-visible:border-violet-500 font-outfit transition-all placeholder:text-zinc-400 dark:placeholder:text-zinc-600 text-zinc-900 dark:text-white text-base shadow-sm";
const labelClass = 'text-[11px] font-black font-space-grotesk uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mb-2 block';

export function ProfileForm({ 
  initialData, 
  onComplete,
  hideHeader = false
}: { 
  initialData: any, 
  onComplete?: () => void,
  hideHeader?: boolean
}) {
  const router = useRouter();
  const supabase = createClient();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      username: initialData?.username || '',
      class: (initialData?.class as any) || undefined,
    },
  });

  async function onSubmit(data: ProfileFormData) {
    setIsLoading(true);
    const { error } = await supabase
      .from('users_profile')
      .update({
        username: data.username,
        class: data.class,
        is_profile_completed: true,
        updated_at: new Date().toISOString()
      })
      .eq('id', initialData.id);

    setIsLoading(false);
    
    if (error) {
       if (error.code === '23505') {
         toast.error('Username already taken. Please choose another.');
       } else {
         toast.error('Failed to update profile. Please try again.');
       }
       return;
    }

    toast.success('Profile updated successfully!');
    
    if (onComplete) {
      onComplete();
    }
    
    router.refresh();
    
    if (!initialData?.is_profile_completed) {
      router.push('/student');
    } else if (!onComplete) {
      router.push('/profile');
    }
  }

  return (
    <motion.div 
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="w-full"
    >
      {!hideHeader && (
        <div className="text-center mb-10">
          <motion.div 
            variants={fadeInUp}
            className="w-20 h-20 rounded-[2rem] bg-violet-500/10 border border-violet-500/20 flex items-center justify-center mx-auto mb-6 shadow-inner"
          >
            <User className="w-10 h-10 text-violet-600" />
          </motion.div>
          <motion.h1 
            variants={fadeInUp}
            className="text-4xl font-space-grotesk font-black tracking-tighter mb-3 bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent"
          >
            Complete Your Profile
          </motion.h1>
          <motion.p 
            variants={fadeInUp}
            className="text-muted-foreground font-outfit font-medium text-lg"
          >
            Just a few more details to unlock all features of Optiq EPX.
          </motion.p>
        </div>
      )}

      <motion.div variants={fadeInUp} className={cn("glass-card p-8 md:p-10 rounded-[2.5rem] border-white/60 dark:border-white/10", !onComplete && "shadow-2xl")}>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={labelClass}>Unique Username</FormLabel>
                  <FormControl>
                    <div className="relative group">
                      <User className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground/50 group-focus-within:text-violet-600 transition-colors" />
                      <Input placeholder="johndoe" className={`pl-14 ${inputClass}`} {...field} />
                    </div>
                  </FormControl>
                  <FormMessage className="font-outfit text-xs" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="class"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={labelClass}>Current Academic Class</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className={`pl-14 relative ${inputClass}`}>
                        <GraduationCap className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground/50 group-focus-within:text-violet-600 transition-colors" />
                        <SelectValue placeholder="Select your class" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="rounded-2xl border-white/10 glass-card bg-white dark:bg-zinc-900 border shadow-2xl">
                      {['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'].map(num => (
                        <SelectItem key={num} value={num} className="font-outfit font-bold rounded-xl py-3 cursor-pointer">Class {num}</SelectItem>
                      ))}
                      <SelectItem value="intermediate" className="font-outfit font-bold rounded-xl py-3 cursor-pointer">Intermediate / HSC</SelectItem>
                      <SelectItem value="university" className="font-outfit font-bold rounded-xl py-3 cursor-pointer">University / Graduation</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage className="font-outfit text-xs" />
                </FormItem>
              )}
            />

            <div className="pt-4">
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-16 rounded-[1.5rem] bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white font-black font-space-grotesk uppercase tracking-[0.15em] text-sm shadow-2xl shadow-violet-500/30 border-0 transition-all disabled:opacity-60 flex items-center justify-center gap-3"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Saving changes...
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-5 h-5" />
                      {onComplete ? 'Save Changes' : 'Unlock Dashboard'}
                    </>
                  )}
                </Button>
              </motion.div>
              {onComplete && (
                <Button 
                  type="button" 
                  variant="ghost" 
                  onClick={onComplete}
                  className="w-full mt-4 font-bold text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground"
                >
                  Cancel
                </Button>
              )}
            </div>
          </form>
        </Form>

        {!onComplete && (
          <div className="mt-10 p-6 rounded-2xl bg-violet-500/5 dark:bg-violet-500/10 border border-violet-500/10">
            <p className="text-[11px] font-black font-outfit text-violet-600 dark:text-violet-400 uppercase tracking-widest text-center leading-relaxed">
              Locked Features: Battle Arena, Global Study Rooms, AI Tutor, and Personal Analytics
            </p>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
