'use client';

import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, File, X, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface UploadDropzoneProps {
  onUploadComplete: (documentId: string) => void;
}

export function UploadDropzone({ onUploadComplete }: UploadDropzoneProps) {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    setUploading(true);
    setError(null);
    setProgress(10);
    setStatus('Uploading...');

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('fileName', file.name);
      formData.append('fileType', file.type);

      setProgress(30);
      setStatus('Processing document...');

      const response = await fetch('/api/documents', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Upload failed');
      }

      setProgress(80);
      setStatus('Generating summary...');

      const summaryResponse = await fetch(`/api/documents/${result.documentId}/summary?id=${result.documentId}`, {
        method: 'POST',
      });

      if (!summaryResponse.ok) {
        const summaryError = await summaryResponse.json();
        console.warn('Summary generation failed:', summaryError.error);
      }

      setProgress(100);
      setStatus('Complete');

      setTimeout(() => {
        onUploadComplete(result.documentId);
      }, 500);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed');
      setUploading(false);
      setProgress(0);
      setStatus('');
    }
  }, [onUploadComplete]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
    },
    maxFiles: 1,
    maxSize: 10 * 1024 * 1024,
    disabled: uploading,
  });

  return (
    <div className="w-full">
      <div
        {...getRootProps()}
        className={cn(
          'relative flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-12 transition-colors',
          isDragActive ? 'border-green-500 bg-green-50' : 'border-neutral-300 bg-white hover:border-neutral-400',
          uploading && 'opacity-50 cursor-not-allowed'
        )}
      >
        <input {...getInputProps()} />
        {uploading ? (
          <div className="flex flex-col items-center">
            <Loader2 className="h-12 w-12 animate-spin text-neutral-400" />
            <p className="mt-4 text-sm font-medium text-neutral-900">{status}</p>
            <div className="mt-4 w-full max-w-xs bg-neutral-200 rounded-full h-2">
              <div
                className="bg-green-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <Upload className="h-12 w-12 text-neutral-400" />
            <p className="mt-4 text-base font-medium text-neutral-900">
              {isDragActive ? 'Drop your PDF here' : 'Drag and drop your PDF'}
            </p>
            <p className="mt-2 text-sm text-neutral-500">or click to browse</p>
            <p className="mt-4 text-xs text-neutral-400">Maximum file size: 10MB</p>
          </div>
        )}
      </div>

      {error && (
        <div className="mt-4 flex items-center gap-2 rounded-md bg-red-50 p-4 text-sm text-red-600">
          <X className="h-4 w-4" />
          {error}
        </div>
      )}
    </div>
  );
}