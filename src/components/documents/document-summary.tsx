import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChevronRight } from 'lucide-react';

interface Summary {
  overview: string;
  keyPoints: string[];
  mainTopics: string[];
}

interface DocumentSummaryProps {
  summary: Summary | null;
  loading?: boolean;
}

export function DocumentSummary({ summary, loading }: DocumentSummaryProps) {
  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>AI Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-neutral-500">Analyzing document...</p>
        </CardContent>
      </Card>
    );
  }

  if (!summary || !summary.overview) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>AI Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-neutral-500">Summary will be generated after processing.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>AI Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="text-sm font-medium text-neutral-500 mb-2">Overview</h3>
          <p className="text-neutral-700">{summary.overview}</p>
        </div>

        <div>
          <h3 className="text-sm font-medium text-neutral-500 mb-2">Key Points</h3>
          <ul className="space-y-2">
            {summary.keyPoints.map((point, i) => (
              <li key={i} className="flex text-neutral-700">
                <ChevronRight className="h-4 w-4 mr-2 text-neutral-400 flex-shrink-0" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-medium text-neutral-500 mb-2">Main Topics</h3>
          <div className="flex flex-wrap gap-2">
            {summary.mainTopics.map((topic, i) => (
              <span key={i} className="px-3 py-1 text-sm bg-neutral-100 text-neutral-700 rounded-md">
                {topic}
              </span>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}