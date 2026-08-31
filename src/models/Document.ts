import mongoose from 'mongoose';

interface ISummary {
  overview: string;
  keyPoints: string[];
  mainTopics: string[];
}

interface IDocument {
  userId: mongoose.Schema.Types.ObjectId;
  fileName: string;
  fileUrl: string;
  fileSize: number;
  pageCount: number;
  extractedText: string;
  summary: ISummary;
  createdAt: Date;
  updatedAt: Date;
}

const DocumentSchema = new mongoose.Schema<IDocument>({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  fileName: {
    type: String,
    required: true,
  },
  fileUrl: {
    type: String,
    required: true,
  },
  fileSize: {
    type: Number,
    required: true,
  },
  pageCount: {
    type: Number,
    default: 0,
  },
  extractedText: {
    type: String,
    default: '',
  },
  summary: {
    overview: {
      type: String,
      default: '',
    },
    keyPoints: {
      type: [String],
      default: [],
    },
    mainTopics: {
      type: [String],
      default: [],
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Document || mongoose.model<IDocument>('Document', DocumentSchema);