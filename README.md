# AI Document Assistant

Professional document analysis tool dengan AI-powered summarization dan interactive chat.

## 🎯 Features

- 📄 **PDF Upload** - Drag & drop PDF documents
- 🤖 **AI Summary** - Automatic document summarization dengan structured output
- 💬 **Document Chat** - Bertanya tentang isi dokumen secara interaktif
- 📚 **Document Library** - Kelola semua dokumen dalam satu tempat
- 🔐 **Secure Authentication** - User registration & login dengan NextAuth.js
- 📱 **Responsive Design** - Bekerja sempurna di desktop, tablet, dan mobile

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- MongoDB Atlas account
- OpenRouter API key
- Cloudinary account

### Installation

1. Clone dan masuk ke direktori project:
```bash
cd ai-document-assistant
```

2. Install dependencies:
```bash
npm install
```

3. Setup environment variables:
```bash
cp .env.example .env.local
```

Edit `.env.local` dan isi dengan credentials yang valid.

4. Jalankan development server:
```bash
npm run dev
```

5. Buka browser di `http://localhost:3000`

## 🔧 Environment Variables

Lihat `.env.example` untuk daftar lengkap environment variables yang diperlukan:

- `MONGODB_URI` - MongoDB connection string
- `NEXTAUTH_SECRET` - Secret untuk NextAuth.js
- `OPENROUTER_API_KEY` - API key dari OpenRouter
- `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET` - Cloudinary credentials

## 📦 Tech Stack

- **Frontend:** Next.js 16, React, TypeScript, Tailwind CSS
- **Backend:** Next.js App Router, MongoDB, Mongoose
- **Authentication:** NextAuth.js v5
- **AI:** OpenRouter API
- **Storage:** Cloudinary
- **UI Components:** shadcn/ui, Radix UI

## 🏗️ Project Structure

```
src/
├── app/                 # Next.js App Router pages
├── components/          # React components
├── lib/                 # Utilities & configurations
├── models/              # Mongoose models
├── services/            # Business logic (AI, etc)
└── types/               # TypeScript type definitions
```

## 📝 Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production (use webpack)
npm run build:webpack # Build dengan webpack explicitly
npm run start        # Start production server
npm run lint         # Run ESLint
```

## 🔐 Security

- Password hashing dengan bcryptjs
- JWT-based session management
- Server-side API key handling
- Input validation dengan Zod
- User data isolation per account

## 📄 License

Private project - All rights reserved

## 🙏 Credits

Built with modern web technologies dan best practices sesuai dengan PRD requirements.