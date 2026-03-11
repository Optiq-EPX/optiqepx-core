'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema, type RegisterFormData } from '../validations';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { motion } from 'motion/react';
import { Loader2, User, Mail, Lock, UserPlus } from 'lucide-react';
import { FaGoogle, FaDiscord } from 'react-icons/fa';

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

const inputClass = "h-12 rounded-2xl border-zinc-300 dark:border-white/10 bg-zinc-50 dark:bg-white/5 focus-visible:ring-2 focus-visible:ring-violet-500/20 focus-visible:border-violet-500 font-outfit transition-all placeholder:text-zinc-400 dark:placeholder:text-zinc-600 text-zinc-900 dark:text-white text-sm shadow-none";
const labelClass = 'text-[11px] font-black font-space-grotesk uppercase tracking-widest text-zinc-400 dark:text-zinc-500';

export function RegisterForm() {
  const router = useRouter();
  const supabase = createClient();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  async function onSubmit(data: RegisterFormData) {
    setIsLoading(true);
    const { error: signUpError } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: {
          username: data.username,
        },
      },
    });
    setIsLoading(false);
    if (signUpError) { toast.error(signUpError.message); return; }
    toast.success('Account created! Redirecting...');
    router.refresh();
  }

  const handleSocialLogin = async (provider: 'google' | 'discord') => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${process.env.NODE_ENV === 'production' ? 'https://optiqepx.vercel.app' : location.origin}/auth/callback`,
      },
    });
    if (error) toast.error(error.message);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">

        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel className={labelClass}>Username</FormLabel>
              <FormControl>
                <div className="relative group">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/50 group-focus-within:text-violet-600 transition-colors" />
                  <Input placeholder="student123" className={`pl-11 ${inputClass}`} {...field} />
                </div>
              </FormControl>
              <FormMessage className="font-outfit text-xs" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className={labelClass}>Email Address</FormLabel>
              <FormControl>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/50 group-focus-within:text-violet-600 transition-colors" />
                  <Input type="email" placeholder="student@example.com" className={`pl-11 ${inputClass}`} {...field} />
                </div>
              </FormControl>
              <FormMessage className="font-outfit text-xs" />
            </FormItem>
          )}
        />



        <div className="grid grid-cols-2 gap-3 items-start">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className={labelClass}>Password</FormLabel>
                <FormControl>
                  <div className="relative group">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground/50 group-focus-within:text-violet-600 transition-colors" />
                    <Input type="password" placeholder="••••••••" className={`pl-10 ${inputClass}`} {...field} />
                  </div>
                </FormControl>
                <FormMessage className="font-outfit text-xs" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel className={labelClass}>Confirm</FormLabel>
                <FormControl>
                  <div className="relative group">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground/50 group-focus-within:text-violet-600 transition-colors" />
                    <Input type="password" placeholder="••••••••" className={`pl-10 ${inputClass}`} {...field} />
                  </div>
                </FormControl>
                <FormMessage className="font-outfit text-xs" />
              </FormItem>
            )}
          />
        </div>



        <div className="pt-2">
          <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }}>
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white font-black font-space-grotesk uppercase tracking-wider text-xs shadow-xl shadow-indigo-500/25 border-0 transition-all disabled:opacity-60 disabled:grayscale flex items-center justify-center gap-2.5"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Creating account...
                </>
              ) : (
                <>
                  <UserPlus className="w-4 h-4" />
                  Create Free Account
                </>
              )}
            </Button>
          </motion.div>
        </div>

        <div className="relative flex items-center py-2">
          <div className="flex-grow border-t border-zinc-200 dark:border-white/10"></div>
          <span className="shrink-0 px-4 text-[10px] font-black font-space-grotesk tracking-widest text-zinc-400 dark:text-zinc-500 uppercase">Or Continue With</span>
          <div className="flex-grow border-t border-zinc-200 dark:border-white/10"></div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={() => handleSocialLogin('google')}
            className="h-12 rounded-2xl border-zinc-300 dark:border-white/10 bg-transparent hover:bg-zinc-50 dark:hover:bg-white/5 transition-all w-full flex items-center justify-center gap-2"
          >
            <FaGoogle className="w-4 h-4 text-zinc-900 dark:text-white" />
            <span className="font-outfit font-bold text-sm text-zinc-900 dark:text-white">Google</span>
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => handleSocialLogin('discord')}
            className="h-12 rounded-2xl border-zinc-300 dark:border-white/10 bg-transparent hover:bg-zinc-50 dark:hover:bg-white/5 transition-all w-full flex items-center justify-center gap-2"
          >
            <FaDiscord className="w-5 h-5 text-[#5865F2]" />
            <span className="font-outfit font-bold text-sm text-zinc-900 dark:text-white">Discord</span>
          </Button>
        </div>

        <p className="text-[10px] text-center font-outfit text-muted-foreground/40 font-medium pt-2">
          By signing up, you agree to our Terms of Service and Privacy Policy.
        </p>
      </form>
    </Form>
  );
}
