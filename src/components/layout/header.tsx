import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function Header() {
  return (
    <div className="hidden h-16 items-center justify-between border-b border-neutral-200 bg-white px-6 lg:flex">
      <div className="flex items-center gap-4">
        <h1 className="text-2xl font-semibold text-neutral-900">Dashboard</h1>
      </div>
      <div className="flex items-center gap-4">
        <Link href="/documents">
          <Button variant="outline">My Documents</Button>
        </Link>
        <Link href="/dashboard">
          <Button>Upload Document</Button>
        </Link>
      </div>
    </div>
  );
}