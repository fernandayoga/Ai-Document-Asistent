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

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50/30 rounded-2xl p-8 border border-green-100 relative overflow-hidden shadow-md shadow-green-900/5">
          <div className="relative z-10">
            <h1 className="text-3xl font-bold text-neutral-900 flex items-center gap-2">
              Good evening, {session.user?.name?.split(' ')[0] || 'User'}! <span className="text-4xl">👋</span>
            </h1>
            <p className="text-neutral-600 mt-3 text-lg">
              Upload a document or ask a question to get started.
            </p>
          </div>
          
          {/* Decorative background circles */}
          <div className="absolute -top-12 -right-12 w-48 h-48 bg-green-200/40 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute top-12 right-24 w-32 h-32 bg-emerald-200/40 rounded-full blur-2xl pointer-events-none"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Upload Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg shadow-black/5 border border-neutral-200 p-6 transition-all duration-300 hover:shadow-xl hover:shadow-black/10 hover:-translate-y-1">
              <UploadDropzone />
              <div className="mt-4 flex items-center justify-center text-sm text-neutral-500">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                Your documents are secure and private.
              </div>
            </div>
          </div>

          {/* Recent Documents Section */}
          <div className="lg:col-span-1 flex flex-col">
            <div className="bg-white rounded-2xl shadow-lg shadow-black/5 border border-neutral-200 p-6 flex-1 transition-all duration-300 hover:shadow-xl hover:shadow-black/10 hover:-translate-y-1">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-neutral-900">Recent Documents</h2>
                <a href="/documents" className="text-sm font-semibold text-green-600 hover:text-green-700">
                  View all
                </a>
              </div>
              
              {recentDocuments.length > 0 ? (
                <div className="space-y-4">
                  {recentDocuments.map((doc) => (
                    <div key={doc._id} className="flex items-start gap-4 group">
                      <div className="flex-shrink-0 mt-0.5">
                        <div className="w-10 h-12 bg-red-50 rounded flex items-center justify-center text-red-500 font-bold text-[11px] border border-red-100 shadow-sm transition-transform group-hover:scale-105">
                          PDF
                        </div>
                      </div>
                      <div className="flex-1 min-w-0 border-b border-neutral-100 pb-4 group-last:border-0 group-last:pb-0">
                        <a href={`/documents/${doc._id}`} className="font-semibold text-neutral-900 hover:text-green-600 truncate block transition-colors">
                          {doc.fileName}
                        </a>
                        <p className="text-xs text-neutral-500 mt-1">
                          {doc.pageCount || 1} pages • {formatTimeAgo(doc.updatedAt)}
                        </p>
                      </div>
                      <div className="text-neutral-400 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"></path></svg>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-48 text-center p-6 border-2 border-dashed border-neutral-100 rounded-xl bg-neutral-50/50">
                   <p className="text-sm font-medium text-neutral-600">No recent documents</p>
                   <p className="text-xs text-neutral-400 mt-1">Upload a PDF to see it here</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}