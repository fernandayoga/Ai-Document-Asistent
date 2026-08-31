"use client";

import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from "next-auth/react";
import { cn } from '@/lib/utils';

const navigation = [
  { name: 'Dashboard', href: '/dashboard' },
  { name: 'Documents', href: '/documents' },
  { name: 'Settings', href: '/settings' },
];

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      <div className="flex items-center justify-between border-b border-neutral-200 bg-white px-4 py-3 lg:hidden">
        <span className="text-lg font-semibold text-neutral-900">AI Document Assistant</span>
        <button onClick={() => setOpen(!open)} className="text-neutral-600">
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>
      {open && (
        <div className="fixed inset-0 z-50 bg-white lg:hidden">
          <div className="flex h-16 items-center justify-between border-b border-neutral-200 px-4">
            <span className="text-lg font-semibold text-neutral-900">AI Document Assistant</span>
            <button onClick={() => setOpen(false)} className="text-neutral-600">
              <X className="h-6 w-6" />
            </button>
          </div>
          <nav className="space-y-1 px-3 py-4">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    'block rounded-md px-3 py-2 text-base font-medium',
                    isActive ? 'bg-neutral-100 text-neutral-900' : 'text-neutral-600 hover:bg-neutral-50'
                  )}
                >
                  {item.name}
                </Link>
              );
            })}
            <button
              onClick={() => {
                setOpen(false);
                signOut({ callbackUrl: '/' });
              }}
              className="block w-full rounded-md px-3 py-2 text-left text-base font-medium text-neutral-600 hover:bg-neutral-50"
            >
              Logout
            </button>
          </nav>
        </div>
      )}
    </>
  );
}
