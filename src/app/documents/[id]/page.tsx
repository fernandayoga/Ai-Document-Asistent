import { auth } from '@/lib/auth';
import connectDB from '@/lib/mongodb';
import Conversation from '@/models/Conversation';
import Document from '@/models/Document';
import DocumentDetailContent from '@/components/documents/document-detail-content';
import { redirect } from 'next/navigation';

export default async function DocumentDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await auth();

  if (!session?.user?.id) {
    redirect('/login');
  }

  await connectDB();

  const document = await Document.findOne({ _id: id, userId: session.user.id }).lean();

  if (!document) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-neutral-500">Document not found</p>
      </div>
    );
  }

  const conversation = await Conversation.findOne({ documentId: id, userId: session.user.id }).lean();

  const initialMessages = conversation?.messages || [];

  return (
    <DocumentDetailContent
      document={{
        _id: document._id.toString(),
        fileName: document.fileName,
        fileUrl: document.fileUrl,
        fileSize: document.fileSize,
        pageCount: document.pageCount,
        summary: {
          overview: document.summary?.overview || '',
          keyPoints: document.summary?.keyPoints || [],
          mainTopics: document.summary?.mainTopics || [],
        },
        createdAt: document.createdAt.toISOString(),
        updatedAt: document.updatedAt.toISOString(),
      }}
      initialMessages={initialMessages}
    />
  );
}