'use client';

import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-50">
      <div className="mx-auto max-w-md w-full p-6 space-y-8 bg-white rounded-lg shadow-sm">
        <div>
          <h2 className="text-xl font-semibold text-neutral-900 mb-2">Register</h2>
          <p className="text-neutral-600">Create an account to get started</p>
        </div>

        <form className="w-full space-y-6" onSubmit={async (e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          const form = e.currentTarget;
          const data = new FormData(form);
          const response = await fetch('/api/auth/register', {
            method: 'POST',
            body: JSON.stringify({
              name: data.get('name'),
              email: data.get('email'),
              password: data.get('password'),
              confirmPassword: data.get('confirmPassword'),
            }),
            headers: { 'Content-Type': 'application/json' },
          });
          const result = await response.json();
          if (!response.ok) {
            alert(result.error || 'Registration failed');
            return;
          }
          window.location.href = '/dashboard';
        }}>
          <Input
            type="text"
            name="name"
            placeholder="Full name"
            required
          />
          <Input
            type="email"
            name="email"
            placeholder="you@example.com"
            required
          />
          <Input
            type="password"
            name="password"
            placeholder="Password (min. 8 characters)"
            minLength={8}
            required
          />
          <Input
            type="password"
            name="confirmPassword"
            placeholder="Confirm password"
            minLength={8}
            required
          />
          <Button type="submit" className="w-full">Create Account</Button>
        </form>

        <div className="text-center">
          <p className="text-neutral-600">Already have an account?</p>
          <Link href="/login" className="text-neutral-900 font-medium hover:underline">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}