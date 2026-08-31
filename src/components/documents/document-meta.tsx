import { Download, File, Trash2 } from 'lucide-react';
import { formatFileSize } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Document {
  _id: string;
  fileName: string;
  fileUrl: string;
  fileSize: number;
  pageCount: number;
  createdAt: string;
  updatedAt: string;
}

interface DocumentMetaProps {
  document: Document;
  onDelete: () => void;
}

export function DocumentMeta({ document, onDelete }: DocumentMetaProps) {
  const handleDownload = () => {
    window.open(document.fileUrl, '_blank');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Document Information</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-neutral-100">
              <File className="h-6 w-6 text-neutral-600" />
            </div>
            <div>
              <h3 className="font-medium text-neutral-900">{document.fileName}</h3>
              <p className="text-sm text-neutral-500">
                {document.pageCount} pages • {formatFileSize(document.fileSize)}
              </p>
            </div>
          </div>

          <div className="flex gap-2 pt-2 border-t border-neutral-200">
            <button
              onClick={handleDownload}
              className="flex items-center gap-2 text-sm font-medium text-neutral-700 hover:text-neutral-900"
            >
              <Download className="h-4 w-4" />
              Download PDF
            </button>
            <button
              onClick={onDelete}
              className="flex items-center gap-2 text-sm font-medium text-red-600 hover:text-red-700"
            >
              <Trash2 className="h-4 w-4" />
              Delete Document
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}