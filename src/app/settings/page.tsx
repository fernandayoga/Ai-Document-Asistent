import DashboardLayout from '@/components/layout/dashboard-layout';
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function SettingsPage() {
  const session = await auth();
  if (!session?.user?.id) {
    redirect('/login');
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold text-neutral-900">Settings</h1>
          <p className="text-neutral-600 mt-1">Manage your account settings</p>
        </div>

        <div className="bg-white rounded-lg border border-neutral-200 p-6">
          <h2 className="text-lg font-medium text-neutral-900 mb-4">Account Information</h2>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-neutral-500">Name</label>
              <p className="text-neutral-900">{session.user?.name || 'N/A'}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-neutral-500">Email</label>
              <p className="text-neutral-900">{session.user?.email || 'N/A'}</p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}