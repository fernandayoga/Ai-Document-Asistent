import { auth } from '@/lib/auth';
import { UploadDropzone } from '@/components/documents/upload-dropzone';
import { DocumentList } from '@/components/documents/document-list';
import DashboardLayout from '@/components/layout/dashboard-layout';
import { redirect } from 'next/navigation';
import connectDB from '@/lib/mongodb';
import Document from '@/models/Document';
import { formatTimeAgo } from '@/lib/utils';

interface RecentDocument {
  _id: string;
  fileName: string;
  fileSize: number;
  pageCount: number;
  createdAt: string;
  updatedAt: string;
}

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user?.id) {
    redirect('/login');
  }

  await connectDB();
  const recentDocs = await Document.find({ userId: session.user.id })
    .select('-extractedText')
    .sort({ updatedAt: -1 })
    .limit(5)
    .lean();

  const recentDocuments: RecentDocument[] = recentDocs.map(doc => ({
    _id: doc._id.toString(),
    fileName: doc.fileName,
    fileSize: doc.fileSize,
    pageCount: doc.pageCount,
    createdAt: doc.createdAt.toISOString(),
    updatedAt: doc.updatedAt.toISOString(),
  }));

  const handleUploadComplete = (documentId: string) => {
    window.location.href = `/documents/${documentId}`;
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-semibold text-neutral-900">Dashboard</h1>
          <p className="text-neutral-600 mt-1">
            Good evening, {session.user?.name || 'User'}. What would you like to understand today?
          </p>
        </div>

        <div className="w-full max-w-3xl">
          <UploadDropzone onUploadComplete={handleUploadComplete} />
        </div>

        {recentDocuments.length > 0 && (
          <div>
            <h2 className="text-lg font-medium text-neutral-900 mb-4">Recent Documents</h2>
            <div className="space-y-3">
              {recentDocuments.map((doc) => (
                <div key={doc._id} className="flex items-center justify-between p-4 bg-white rounded-lg border border-neutral-200">
                  <div>
                    <a href={`/documents/${doc._id}`} className="font-medium text-neutral-900 hover:underline">
                      {doc.fileName}
                    </a>
                    <p className="text-sm text-neutral-500">Updated {formatTimeAgo(doc.updatedAt)}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <a href="/documents" className="text-sm font-medium text-neutral-900 hover:underline">
                View all documents
              </a>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}