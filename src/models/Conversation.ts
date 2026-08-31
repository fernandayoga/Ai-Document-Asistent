import mongoose from 'mongoose';

interface IMessage {
  role: 'user' | 'assistant';
  content: string;
  createdAt: Date;
}

interface IConversation {
  userId: mongoose.Schema.Types.ObjectId;
  documentId: mongoose.Schema.Types.ObjectId;
  messages: IMessage[];
  createdAt: Date;
  updatedAt: Date;
}

const ConversationSchema = new mongoose.Schema<IConversation>({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  documentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Document',
    required: true,
  },
  messages: [
    {
      role: {
        type: String,
        enum: ['user', 'assistant'],
        required: true,
      },
      content: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Conversation || mongoose.model<IConversation>('Conversation', ConversationSchema);