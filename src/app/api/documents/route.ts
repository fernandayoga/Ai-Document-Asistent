import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Document from '@/models/Document';
import { auth } from '@/lib/auth';
import { v2 as cloudinary } from 'cloudinary';
import { Buffer } from 'buffer';
import { z } from 'zod';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const MAX_FILE_SIZE_LIMIT = 10 * 1024 * 1024;

async function uploadToCloudinary(fileBuffer: Buffer, fileName: string) {
  return new Promise<string>((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          resource_type: 'raw',
          public_id: fileName.replace('.pdf', ''),
          folder: 'ai-document-assistant',
        },
        (error, result) => {
          if (error) reject(error);
          resolve(result?.secure_url || '');
        }
      )
      .end(fileBuffer);
  });
}

const UploadSchema = z.object({
  fileName: z.string().min(1),
  fileType: z.string().min(1),
});

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const contentType = req.headers.get('content-type');
    if (!contentType || !contentType.includes('multipart/form-data')) {
      return NextResponse.json({ error: 'Content type must be multipart/form-data' }, { status: 400 });
    }

    const formData = await req.formData();
    const file = formData.get('file') as File | null;
    const fileName = formData.get('fileName') as string | null;
    const fileType = formData.get('fileType') as string | null;

    if (!file || !fileName || !fileType) {
      return NextResponse.json({ error: 'Missing file data' }, { status: 400 });
    }

    const result = UploadSchema.safeParse({ fileName, fileType });
    if (!result.success) {
      return NextResponse.json({ error: 'Invalid file data' }, { status: 400 });
    }

    if (fileType !== 'application/pdf') {
      return NextResponse.json({ error: 'Only PDF files are supported.' }, { status: 400 });
    }

    if (file.size > MAX_FILE_SIZE_LIMIT) {
      return NextResponse.json({ error: 'File size exceeds the maximum allowed limit.' }, { status: 400 });
    }

    const fileBuffer = Buffer.from(await file.arrayBuffer());

    const fileUrl = await uploadToCloudinary(fileBuffer, fileName);

    await connectDB();

    const document = new Document({
      userId: session.user.id,
      fileName,
      fileUrl,
      fileSize: file.size,
      pageCount: 1,
      extractedText: 'Sample text extraction will be implemented later',
    });

    await document.save();

    return NextResponse.json(
      { documentId: document._id, message: 'Document uploaded successfully' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();

    const documents = await Document.find({ userId: session.user.id }).select('-extractedText').sort({ createdAt: -1 });

    return NextResponse.json({ documents });
  } catch (error) {
    console.error('Get documents error:', error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}