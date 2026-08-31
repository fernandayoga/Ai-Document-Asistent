import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Document from '@/models/Document';
import Conversation from '@/models/Conversation';
import { auth } from '@/lib/auth';
import { generateChatResponse, estimateTokenCount, SAFE_DOCUMENT_TOKENS } from '@/services/ai/openrouter';
import { z } from 'zod';

const ChatSchema = z.object({
  message: z.string().min(1).max(2000),
});

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

    const body = await req.json();
    const result = ChatSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json({ error: 'Invalid message' }, { status: 400 });
    }

    await connectDB();

    const document = await Document.findOne({ _id: id, userId: session.user.id });

    if (!document) {
      return NextResponse.json({ error: 'Document not found' }, { status: 404 });
    }

    let conversation = await Conversation.findOne({ documentId: id, userId: session.user.id });

    if (!conversation) {
      conversation = new Conversation({
        userId: session.user.id,
        documentId: id,
        messages: [],
      });
    }

    const documentText = document.extractedText;
    const tokenCount = estimateTokenCount(documentText);

    if (tokenCount > SAFE_DOCUMENT_TOKENS) {
      return NextResponse.json(
        { error: 'This document is too large to analyze directly. Large-document support will be available in a future version.' },
        { status: 400 }
      );
    }

    const conversationHistory = conversation.messages.slice(-10).map((msg: { role: 'user' | 'assistant'; content: string }) => ({
      role: msg.role,
      content: msg.content,
    }));

    const answer = await generateChatResponse(result.data.message, documentText, conversationHistory);

    conversation.messages.push(
      { role: 'user', content: result.data.message, createdAt: new Date() },
      { role: 'assistant', content: answer, createdAt: new Date() }
    );

    await conversation.save();

    return NextResponse.json({ answer, conversation: conversation.messages });
  } catch (error) {
    console.error('Chat error:', error);
    return NextResponse.json({ error: 'Failed to process chat' }, { status: 500 });
  }
}