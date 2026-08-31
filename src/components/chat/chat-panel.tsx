'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  createdAt: string;
}

interface ChatPanelProps {
  documentId: string;
  messages: Message[];
  onNewMessage: (message: Message) => void;
}

export function ChatPanel({ documentId, messages, onNewMessage }: ChatPanelProps) {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async () => {
    if (!input.trim() || loading) return;

    const userMessage: Message = {
      role: 'user',
      content: input,
      createdAt: new Date().toISOString(),
    };

    onNewMessage(userMessage);
    setInput('');
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/documents/${documentId}/chat?id=${documentId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to get response');
      }

      const assistantMessage: Message = {
        role: 'assistant',
        content: result.answer,
        createdAt: new Date().toISOString(),
      };

      onNewMessage(assistantMessage);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="border-b border-neutral-200 p-4">
        <h2 className="text-lg font-semibold text-neutral-900">Ask about this document</h2>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="text-center text-neutral-500 mt-8">
            <p className="text-sm">Ask a question about this document to get started.</p>
          </div>
        ) : (
          messages.map((msg, i) => (
            <div key={i} className="space-y-2">
              <div className={cn(
                'max-w-[80%] rounded-lg px-4 py-2',
                msg.role === 'user'
                  ? 'ml-auto bg-neutral-900 text-neutral-50'
                  : 'bg-neutral-100 text-neutral-900'
              )}>
                <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
              </div>
            </div>
          ))
        )}
        {loading && (
          <div className="flex items-start space-x-2">
            <div className="max-w-[80%] rounded-lg bg-neutral-100 px-4 py-2">
              <div className="flex items-center space-x-2">
                <Loader2 className="h-4 w-4 animate-spin text-neutral-400" />
                <span className="text-sm text-neutral-500">AI is thinking...</span>
              </div>
            </div>
          </div>
        )}
        {error && (
          <div className="text-sm text-red-600 bg-red-50 p-3 rounded-md">
            {error}
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="border-t border-neutral-200 p-4">
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask a question..."
            disabled={loading || !input.trim()}
          />
          <button
            onClick={handleSubmit}
            disabled={loading || !input.trim()}
            className={cn(
              'flex h-10 w-10 items-center justify-center rounded-md bg-neutral-900 text-neutral-50 hover:bg-neutral-800',
              (loading || !input.trim()) && 'opacity-50 cursor-not-allowed'
            )}
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
          </button>
        </div>
      </div>
    </div>
  );
}