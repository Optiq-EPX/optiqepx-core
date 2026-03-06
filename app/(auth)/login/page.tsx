import { LoginForm } from '@/features/auth/components/LoginForm';
import Link from 'next/link';
import { Logo } from '@/components/shared/Logo';

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-6 bg-gradient-to-br from-background to-secondary/20">
      <div className="w-full max-w-md mx-auto mb-10 flex flex-col items-center">
        <Link href="/" className="mb-2">
          <Logo className="scale-110" />
        </Link>
      </div>

      <LoginForm />

      <p className="mt-6 text-sm text-center text-muted-foreground font-outfit">
        Don't have an account?{' '}
        <Link href="/register" className="font-semibold text-primary hover:underline">
          Sign up
        </Link>
      </p>
    </div>
  );
}
