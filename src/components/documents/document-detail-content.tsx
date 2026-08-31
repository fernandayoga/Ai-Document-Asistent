'use client';

import { useState } from 'react';
import { DocumentSummary } from '@/components/documents/document-summary';
import { DocumentMeta } from '@/components/documents/document-meta';
import { ChatPanel } from '@/components/chat/chat-panel';
import DashboardLayout from '@/components/layout/dashboard-layout';
import { Loader2 } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  createdAt: string;
}

interface Document {
  _id: string;
  fileName: string;
  fileUrl: string;
  fileSize: number;
  pageCount: number;
  summary: {
    overview: string;
    keyPoints: string[];
    mainTopics: string[];
  };
  createdAt: string;
  updatedAt: string;
}

export default function DocumentDetailContent({
  document,
  initialMessages,
}: {
  document: Document;
  initialMessages: Message[];
}) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);

  const handleDelete = async () => {
    if (!confirm('Delete document?\n\nThis action cannot be undone.')) return;

    const response = await fetch(`/api/documents/${document._id}?id=${document._id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      window.location.href = '/documents';
    } else {
      const result = await response.json();
      alert(result.error || 'Delete failed');
    }
  };

  const handleNewMessage = (message: Message) => {
    setMessages((prev) => [...prev, message]);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold text-neutral-900">{document.fileName}</h1>
          <p className="text-neutral-500 mt-1">{document.pageCount} pages</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 space-y-6">
            <DocumentMeta document={document} onDelete={handleDelete} />
            {document.summary.overview ? (
              <DocumentSummary summary={document.summary} />
            ) : (
              <div className="bg-white rounded-lg border border-neutral-200 p-6">
                <h3 className="text-lg font-medium text-neutral-900 mb-4">AI Summary</h3>
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin text-neutral-400" />
                </div>
              </div>
            )}
          </div>

          <div className="lg:col-span-2 h-[600px] bg-white rounded-lg border border-neutral-200">
            <ChatPanel
              documentId={document._id}
              messages={messages}
              onNewMessage={handleNewMessage}
            />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}