"use client";

import { useState } from 'react';
import { Menu, X, FileText, Home, Settings, LogOut } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from "next-auth/react";
import { cn } from '@/lib/utils';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: Home },
  { name: 'Documents', href: '/documents', icon: FileText },
  { name: 'Settings', href: '/settings', icon: Settings },
];

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      <div className="flex items-center justify-between border-b border-neutral-200 bg-white px-4 py-3 md:hidden">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-600 shadow-sm">
            <FileText className="h-4 w-4 text-white" strokeWidth={2.5} />
          </div>
          <span className="text-sm font-bold text-neutral-900 tracking-tight whitespace-nowrap">AI Document Assistant</span>
        </div>
        <button onClick={() => setOpen(!open)} className="text-neutral-600 p-1">
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>
      {open && (
        <div className="fixed inset-0 z-50 flex flex-col bg-white md:hidden">
          <div className="flex h-[3.75rem] items-center justify-between border-b border-neutral-200 px-4">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-600 shadow-sm">
                <FileText className="h-4 w-4 text-white" strokeWidth={2.5} />
              </div>
              <span className="text-sm font-bold text-neutral-900 tracking-tight whitespace-nowrap">AI Document Assistant</span>
            </div>
            <button onClick={() => setOpen(false)} className="text-neutral-600 p-1">
              <X className="h-6 w-6" />
            </button>
          </div>
          <nav className="flex-1 space-y-1 px-3 py-4">
            {navigation.map((item) => {
              const isActive = pathname === item.href || pathname?.startsWith(item.href + '/');
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    'flex items-center gap-3 rounded-lg px-3 py-2.5 text-base font-semibold transition-colors',
                    isActive ? 'bg-green-50 text-green-700' : 'text-neutral-500 hover:bg-neutral-50 hover:text-neutral-900'
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  {item.name}
                </Link>
              );
            })}
          </nav>
          <div className="border-t border-neutral-200 p-4">
            <button
              onClick={() => {
                setOpen(false);
                signOut({ callbackUrl: '/' });
              }}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-base font-semibold text-neutral-500 hover:bg-neutral-50 hover:text-neutral-900 transition-colors"
            >
              <LogOut className="h-5 w-5" />
              Logout
            </button>
          </div>
        </div>
      )}
    </>
  );
}
