import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, MessageSquare, Clock, Library, ChevronRight, Sparkles, CheckCircle2 } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-neutral-50">
      <header className="border-b border-neutral-200/60 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-semibold text-neutral-900">AI Document Assistant</span>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/login" className="text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors">
                Sign in
              </Link>
              <Link href="/register">
                <Button className="bg-green-600 hover:bg-green-700">Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="relative py-20 sm:py-28 lg:py-36 overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
          
          <div className="absolute top-20 right-0 w-96 h-96 bg-green-500/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-green-600/5 rounded-full blur-3xl"></div>

          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-50 border border-green-200 mb-6">
                  <Sparkles className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-medium text-green-700">AI-Powered Document Understanding</span>
                </div>
                
                <h1 className="text-5xl font-bold tracking-tight text-neutral-900 sm:text-6xl lg:text-7xl">
                  Understand your documents <span className="text-green-600">faster</span>.
                </h1>
                
                <p className="mt-6 text-lg text-neutral-600 leading-relaxed">
                  Upload a PDF, get a clear summary, and ask questions about what matters.
                </p>
                
                <div className="mt-10 flex items-center gap-4">
                  <Link href="/register">
                    <Button size="lg" className="bg-green-600 hover:bg-green-700 h-12 px-6">
                      Upload your first document
                    </Button>
                  </Link>
                </div>

                <div className="mt-8 flex items-center gap-6">
                  <div className="flex -space-x-2">
                    <div className="w-10 h-10 rounded-full bg-neutral-200 border-2 border-white"></div>
                    <div className="w-10 h-10 rounded-full bg-neutral-300 border-2 border-white"></div>
                    <div className="w-10 h-10 rounded-full bg-neutral-400 border-2 border-white"></div>
                    <div className="w-10 h-10 rounded-full bg-neutral-500 border-2 border-white"></div>
                  </div>
                  <div>
                    <div className="flex gap-0.5 mb-1">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-4 h-4 text-green-600 fill-current" viewBox="0 0 20 20">
                          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                        </svg>
                      ))}
                    </div>
                    <p className="text-sm text-neutral-600">Join 1,000+ users already saving hours every week.</p>
                  </div>
                </div>
              </div>

              <div className="relative lg:h-[600px]">
                <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-neutral-100 rounded-2xl"></div>
                
                <div className="relative p-6 space-y-4">
                  <div className="bg-white rounded-xl shadow-lg border border-neutral-200 overflow-hidden">
                    <div className="p-4 border-b border-neutral-200 flex items-center gap-3">
                      <FileText className="w-5 h-5 text-green-600" />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-neutral-900">Research Paper.pdf</p>
                        <p className="text-xs text-neutral-500">24 pages • 2.4 MB</p>
                      </div>
                    </div>
                    
                    <div className="p-6 bg-neutral-50">
                      <div className="mb-4">
                        <h3 className="text-sm font-semibold text-neutral-900 mb-2">Summary</h3>
                        <p className="text-sm text-neutral-600 leading-relaxed">
                          This research explores the impact of artificial intelligence on modern document analysis and knowledge extraction. The study presents a new approach that improves accuracy and efficiency in analyzing large-form documents.
                        </p>
                        <button className="text-sm text-green-600 font-medium mt-2 hover:underline">Show more</button>
                      </div>

                      <div className="mb-4">
                        <h3 className="text-sm font-semibold text-neutral-900 mb-3">Key Points</h3>
                        <div className="space-y-2">
                          {[
                            'AI-led hybrid document analysis',
                            'Improved method visualization baseline',
                            'Better results on long documents',
                          ].map((point, i) => (
                            <div key={i} className="flex items-start gap-2">
                              <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                              <span className="text-sm text-neutral-700">{point}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h3 className="text-sm font-semibold text-neutral-900 mb-2">Main Topics</h3>
                        <div className="flex flex-wrap gap-2">
                          {['Machine Learning', 'NLP', 'Document Analysis'].map((topic, i) => (
                            <span key={i} className="px-3 py-1 text-xs font-medium bg-white border border-neutral-200 text-neutral-700 rounded-full">
                              {topic}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl shadow-lg border border-neutral-200 p-4">
                    <div className="flex items-start gap-3">
                      <MessageSquare className="w-5 h-5 text-green-600 mt-1" />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-neutral-900 mb-2">Ask about this document</p>
                        <div className="bg-neutral-50 rounded-lg p-3 mb-3">
                          <p className="text-sm text-neutral-600">What is the main objective of this research?</p>
                        </div>
                        <div className="bg-green-50 rounded-lg p-3 border-l-4 border-green-600">
                          <p className="text-sm text-neutral-700">The main objective is to develop and evaluate a new AI-based approach for understanding and extracting...</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-white border-y border-neutral-200">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
                How it works
              </h2>
              <p className="mt-4 text-lg text-neutral-600">
                Three simple steps to understanding any document
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {[
                {
                  step: '1',
                  title: 'Upload',
                  description: 'Drag and drop your PDF or click to select a file',
                  icon: FileText,
                },
                {
                  step: '2',
                  title: 'Understand',
                  description: 'Get an AI-generated summary with key points and main topics',
                  icon: Sparkles,
                },
                {
                  step: '3',
                  title: 'Ask',
                  description: 'Chat with your document to find specific information',
                  icon: MessageSquare,
                },
              ].map((item, i) => (
                <div key={i} className="relative">
                  {i < 2 && (
                    <div className="hidden md:block absolute top-12 left-full w-full h-0.5 bg-gradient-to-r from-green-200 to-transparent -ml-4"></div>
                  )}
                  <div className="relative bg-neutral-50 rounded-2xl p-8 border border-neutral-200 hover:border-green-200 transition-colors">
                    <div className="mb-6 flex items-center justify-center w-14 h-14 rounded-xl bg-green-100 text-green-700 font-bold text-xl">
                      {item.step}
                    </div>
                    <h3 className="text-xl font-semibold text-neutral-900 mb-3">{item.title}</h3>
                    <p className="text-neutral-600">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-neutral-50 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,#22c55e08,transparent_50%)]"></div>
          
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">Features</h2>
              <p className="mt-4 text-lg text-neutral-600">Everything you need to work with documents efficiently</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: FileText,
                  title: 'Smart Summary',
                  description: 'Get concise summaries and key points instantly.',
                },
                {
                  icon: MessageSquare,
                  title: 'Ask Anything',
                  description: 'Chat with your documents and find answers fast.',
                },
                {
                  icon: Clock,
                  title: 'Save Time',
                  description: 'Stop reading everything. Focus on what matters.',
                },
                {
                  icon: Library,
                  title: 'Your Library',
                  description: 'Organize and access all your documents in one place.',
                },
              ].map((feature, i) => (
                <Card key={i} className="border-neutral-200 hover:border-green-200 transition-all hover:shadow-md bg-white">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center mb-4">
                      <feature.icon className="w-6 h-6 text-green-600" />
                    </div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                    <CardDescription className="text-neutral-600">{feature.description}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItMnptMC0ydjItMnptLTItMnYyLTJ6bS0yLTJ2Mi0yem0tMi0ydjItMnptLTItMnYyLTJ6bS0yLTJ2Mi0yem0tMi0ydjItMnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-40"></div>
          
          <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              Ready to understand your documents?
            </h2>
            <p className="mt-6 text-lg text-neutral-300 max-w-2xl mx-auto">
              Upload your first PDF and start asking questions in seconds. No credit card required.
            </p>
            <div className="mt-10 flex items-center justify-center gap-4">
              <Link href="/register">
                <Button size="lg" variant="secondary" className="bg-white text-neutral-900 hover:bg-neutral-100 h-12 px-8">
                  Get Started Free
                  <ChevronRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-neutral-200 bg-white py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <span className="text-sm font-semibold text-neutral-900">AI Document Assistant</span>
            </div>
            <p className="text-sm text-neutral-500">Professional document understanding</p>
          </div>
        </div>
      </footer>
    </div>
  );
}