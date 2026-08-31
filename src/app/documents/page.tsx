'use client';

import { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layout/dashboard-layout';
import { DocumentList } from '@/components/documents/document-list';
import { Button } from '@/components/ui/button';
import { Upload } from 'lucide-react';
import { formatTimeAgo } from '@/lib/utils';

interface Document {
  _id: string;
  fileName: string;
  fileSize: number;
  pageCount: number;
  createdAt: string;
  updatedAt: string;
}

export default function DocumentsPage() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchDocuments = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/documents');
      const result = await response.json();
      if (response.ok) {
        setDocuments(result.documents.map((doc: any) => ({
          _id: doc._id,
          fileName: doc.fileName,
          fileSize: doc.fileSize,
          pageCount: doc.pageCount,
          createdAt: doc.createdAt,
          updatedAt: doc.updatedAt,
        })));
      }
    } catch (error) {
      console.error('Failed to fetch documents:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Delete document?\n\nThis action cannot be undone.')) return;

    const response = await fetch(`/api/documents/${id}?id=${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      setDocuments(documents.filter(doc => doc._id !== id));
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-neutral-900">My Documents</h1>
          <a href="/dashboard">
            <Button>
              <Upload className="h-4 w-4 mr-2" />
              Upload Document
            </Button>
          </a>
        </div>

        <DocumentList
          documents={documents}
          loading={loading}
          onDelete={handleDelete}
        />
      </div>
    </DashboardLayout>
  );
}