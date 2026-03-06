import { RegisterForm } from '@/features/auth/components/RegisterForm';
import Link from 'next/link';
import { Logo } from '@/components/shared/Logo';

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-6 py-12 bg-gradient-to-tr from-background to-secondary/20">
      <div className="w-full max-w-md mx-auto mb-10 flex flex-col items-center">
        <Link href="/" className="mb-2">
          <Logo className="scale-110" />
        </Link>
      </div>

      <RegisterForm />

      <p className="mt-6 text-sm text-center text-muted-foreground font-outfit">
        Already have an account?{' '}
        <Link href="/login" className="font-semibold text-primary hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  );
}
