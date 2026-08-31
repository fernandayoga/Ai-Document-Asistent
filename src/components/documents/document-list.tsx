'use client';

import { DocumentCard } from './document-card';
import { Loader2 } from 'lucide-react';

interface Document {
  _id: string;
  fileName: string;
  fileSize: number;
  pageCount: number;
  createdAt: string;
  updatedAt: string;
}

interface DocumentListProps {
  documents: Document[];
  loading?: boolean;
  onDelete?: (id: string) => void;
}

export function DocumentList({ documents, loading, onDelete }: DocumentListProps) {
  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-neutral-400" />
      </div>
    );
  }

  if (documents.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <p className="text-lg font-medium text-neutral-900">Your document library is empty.</p>
        <p className="mt-2 text-sm text-neutral-500">
          Upload your first PDF to start exploring your documents with AI.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {documents.map((doc) => (
        <DocumentCard key={doc._id} document={doc} onDelete={onDelete} />
      ))}
    </div>
  );
}