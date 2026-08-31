import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Document from '@/models/Document';
import { auth } from '@/lib/auth';
import { generateSummary, estimateTokenCount, SAFE_DOCUMENT_TOKENS } from '@/services/ai/openrouter';

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const url = new URL(req.url);
    const id = url.searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Document ID is required' }, { status: 400 });
    }

    await connectDB();

    const document = await Document.findOne({ _id: id, userId: session.user.id });

    if (!document) {
      return NextResponse.json({ error: 'Document not found' }, { status: 404 });
    }

    if (document.summary.overview && document.summary.overview.length > 0) {
      return NextResponse.json({ summary: document.summary });
    }

    const documentText = document.extractedText;
    const tokenCount = estimateTokenCount(documentText);

    if (tokenCount > SAFE_DOCUMENT_TOKENS) {
      return NextResponse.json(
        { error: 'This document is too large to analyze directly. Large-document support will be available in a future version.' },
        { status: 400 }
      );
    }

    const summary = await generateSummary(documentText);

    document.summary = summary;
    await document.save();

    return NextResponse.json({ summary });
  } catch (error) {
    console.error('Generate summary error:', error);
    return NextResponse.json({ error: 'Failed to generate summary' }, { status: 500 });
  }
}