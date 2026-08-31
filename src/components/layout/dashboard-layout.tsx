import { Sidebar } from './sidebar';
import { MobileNav } from './mobile-nav';
import { Header } from './header';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="flex h-screen bg-neutral-50">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto bg-neutral-50">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
      <MobileNav />
    </div>
  );
}