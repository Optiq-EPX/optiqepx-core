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
import { ClassSelector } from './ClassSelector';

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

const inputClass = "h-12 rounded-2xl border-zinc-400 bg-zinc-50 focus-visible:ring-2 focus-visible:ring-violet-500/20 focus-visible:border-violet-500 font-outfit transition-all placeholder:text-zinc-500 text-zinc-900 text-sm shadow-none";
const labelClass = 'text-[11px] font-black font-space-grotesk uppercase tracking-widest text-zinc-400';

export function RegisterForm() {
  const router = useRouter();
  const supabase = createClient();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
      class: '1',
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
          phone: data.phone,
          class: data.class,
        },
      },
    });
    setIsLoading(false);
    if (signUpError) { toast.error(signUpError.message); return; }
    toast.success('Account created! Redirecting...');
    router.refresh();
  }


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

        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel className={labelClass}>BD / Phone Number</FormLabel>
              <FormControl>
                <div className="relative group flex items-center">
                  <div className="absolute left-0 top-0 bottom-0 w-16 flex justify-center items-center bg-zinc-100/50 border-r border-zinc-200 rounded-l-2xl z-10">
                    <span className="text-zinc-500 font-outfit text-sm font-semibold">+880</span>
                  </div>
                  <Input type="tel" placeholder="1712-345678" className={`pl-20 ${inputClass}`} {...field} />
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

        <FormField
          control={form.control}
          name="class"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel className={labelClass}>Class / Grade Level</FormLabel>
              <FormControl>
                <ClassSelector 
                  value={field.value} 
                  onChange={field.onChange} 
                  error={fieldState.error?.message}
                />
              </FormControl>
              <FormMessage className="font-outfit text-xs" />
            </FormItem>
          )}
        />

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


        <p className="text-[10px] text-center font-outfit text-muted-foreground/40 font-medium pt-2">
          By signing up, you agree to our Terms of Service and Privacy Policy.
        </p>
      </form>
    </Form>
  );
}
