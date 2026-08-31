"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, FileText, Settings, LogOut } from 'lucide-react';
import { signOut } from "next-auth/react";
import { cn } from '@/lib/utils';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: Home },
  { name: 'Documents', href: '/documents', icon: FileText },
  { name: 'Settings', href: '/settings', icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="hidden md:flex h-full w-64 shrink-0 flex-col border-r border-neutral-200 bg-white shadow-[4px_0_32px_rgba(0,0,0,0.08)] z-10 relative">
      <div className="flex h-16 items-center gap-2.5 border-b border-neutral-200 px-6">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-600 shadow-sm">
          <FileText className="h-4 w-4 text-white" strokeWidth={2.5} />
        </div>
        <span className="text-sm font-bold text-neutral-900 tracking-tight whitespace-nowrap">AI Document Assistant</span>
      </div>
      <nav className="flex-1 space-y-1 px-3 py-4">
        {navigation.map((item) => {
          const isActive = pathname === item.href || pathname?.startsWith(item.href + '/');
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold transition-colors',
                isActive
                  ? 'bg-green-50 text-green-700'
                  : 'text-neutral-500 hover:bg-neutral-50 hover:text-neutral-900'
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
          onClick={() => signOut({ callbackUrl: '/' })}
          className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900"
        >
          <LogOut className="h-5 w-5" />
          Logout
        </button>
      </div>
    </div>
  );
}
