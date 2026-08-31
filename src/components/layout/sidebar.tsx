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
    <div className="flex h-full w-64 flex-col border-r border-neutral-200 bg-white">
      <div className="flex h-16 items-center border-b border-neutral-200 px-6">
        <span className="text-lg font-semibold text-neutral-900">AI Document Assistant</span>
      </div>
      <nav className="flex-1 space-y-1 px-3 py-4">
        {navigation.map((item) => {
          const isActive = pathname === item.href || pathname?.startsWith(item.href + '/');
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-neutral-100 text-neutral-900'
                  : 'text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900'
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
