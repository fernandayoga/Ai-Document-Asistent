import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Document from '@/models/Document';
import Conversation from '@/models/Conversation';
import { auth } from '@/lib/auth';

export async function GET(req: NextRequest) {
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

    const conversation = await Conversation.findOne({ documentId: id, userId: session.user.id }).select('messages');

    return NextResponse.json({
      document: {
        _id: document._id,
        fileName: document.fileName,
        fileUrl: document.fileUrl,
        fileSize: document.fileSize,
        pageCount: document.pageCount,
        summary: document.summary,
        createdAt: document.createdAt,
        updatedAt: document.updatedAt,
      },
      conversation: conversation ? conversation.messages : [],
    });
  } catch (error) {
    console.error('Get document error:', error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
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

    const document = await Document.findOneAndDelete({ _id: id, userId: session.user.id });

    if (!document) {
      return NextResponse.json({ error: 'Document not found' }, { status: 404 });
    }

    await Conversation.deleteMany({ documentId: id, userId: session.user.id });

    return NextResponse.json({ message: 'Document deleted successfully' });
  } catch (error) {
    console.error('Delete document error:', error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}