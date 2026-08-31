'use client';

import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, File, X, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';

export function UploadDropzone() {
  const router = useRouter();
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
        router.push(`/documents/${result.documentId}`);
      }, 500);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed');
      setUploading(false);
      setProgress(0);
      setStatus('');
    }
  }, [router]);

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
          'group relative flex flex-col items-center justify-center rounded-xl border-2 border-dashed p-16 transition-all duration-300',
          isDragActive ? 'border-green-500 bg-green-50/50 scale-[0.99]' : 'border-neutral-200 bg-neutral-50/30 hover:border-green-400 hover:bg-green-50/40',
          !uploading && 'cursor-pointer',
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
            <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center mb-6 shadow-sm transition-all duration-300 group-hover:scale-110 group-hover:bg-green-200">
              <Upload className="h-8 w-8 text-green-600 transition-transform duration-300 group-hover:-translate-y-1" />
            </div>
            <p className="text-xl font-bold text-neutral-900 transition-colors group-hover:text-green-700">
              {isDragActive ? 'Drop your PDF here' : 'Drag and drop your PDF here'}
            </p>
            <p className="mt-2 text-sm font-medium text-green-600 transition-colors group-hover:text-green-700 underline-offset-2 group-hover:underline">or click to browse</p>
            <p className="mt-6 text-xs text-neutral-400">Maximum file size: 10MB</p>
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