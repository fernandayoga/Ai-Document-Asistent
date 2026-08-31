import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import connectDB from '@/lib/mongodb';

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session?.user?.id) {
    redirect('/login');
  }

  await connectDB();

  return <>{children}</>;
}