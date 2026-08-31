import { FileText } from 'lucide-react';
import { formatFileSize, formatTimeAgo } from '@/lib/utils';
import Link from 'next/link';

interface Document {
  _id: string;
  fileName: string;
  fileSize: number;
  pageCount: number;
  createdAt: string;
  updatedAt: string;
}

interface DocumentCardProps {
  document: Document;
  onDelete?: (id: string) => void;
}

export function DocumentCard({ document, onDelete }: DocumentCardProps) {
  return (
    <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-neutral-200 hover:border-neutral-300 transition-colors">
      <div className="flex items-center gap-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-neutral-100">
          <FileText className="h-5 w-5 text-neutral-600" />
        </div>
        <div>
          <Link
            href={`/documents/${document._id}`}
            className="font-medium text-neutral-900 hover:underline"
          >
            {document.fileName}
          </Link>
          <div className="flex items-center gap-2 text-sm text-neutral-500">
            <span>{document.pageCount} pages</span>
            <span>•</span>
            <span>{formatFileSize(document.fileSize)}</span>
            <span>•</span>
            <span>Updated {formatTimeAgo(document.updatedAt)}</span>
          </div>
        </div>
      </div>
      {onDelete && (
        <button
          onClick={() => onDelete(document._id)}
          className="text-sm text-red-600 hover:text-red-700"
        >
          Delete
        </button>
      )}
    </div>
  );
}