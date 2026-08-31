'use client';

import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { signIn } from 'next-auth/react';

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-50">
      <div className="mx-auto max-w-md w-full p-6 space-y-8 bg-white rounded-lg shadow-sm">
        <div>
          <h2 className="text-xl font-semibold text-neutral-900 mb-2">Sign in</h2>
          <p className="text-neutral-600">Log in to your account</p>
        </div>

        <form className="w-full space-y-6" onSubmit={async (e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          const form = e.currentTarget;
          const data = new FormData(form);
          const email = data.get('email') as string;
          const password = data.get('password') as string;

          const result = await signIn('credentials', {
            redirect: false,
            email,
            password,
          });

          if (result?.error) {
            alert(result.error);
            return;
          }

          window.location.href = '/dashboard';
        }}>
          <Input
            type="email"
            name="email"
            placeholder="you@example.com"
            required
          />
          <Input
            type="password"
            name="password"
            placeholder="Password"
            required
          />
          <Button type="submit">Sign in</Button>
        </form>

        <div className="text-center">
          <p className="text-neutral-600">Don't have an account?</p>
          <Link href="/register" className="text-neutral-900 font-medium hover:underline">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}