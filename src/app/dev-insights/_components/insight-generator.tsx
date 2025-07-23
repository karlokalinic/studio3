'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { summarizeReference, type SummarizeReferenceOutput } from '@/ai/flows/summarize-reference-flow';
import { Lightbulb, CheckSquare } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

interface InsightGeneratorProps {
  referenceContent: string;
}

const LoadingState = () => (
    <div className="space-y-6">
        <div className="space-y-2">
            <Skeleton className="h-6 w-1/4" />
            <Skeleton className="h-20 w-full" />
        </div>
         <div className="space-y-2">
            <Skeleton className="h-6 w-1/4" />
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-2/3" />
        </div>
    </div>
);

export default function InsightGenerator({ referenceContent }: InsightGeneratorProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<SummarizeReferenceOutput | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const output = await summarizeReference({ documentContent: referenceContent });
      setResult(output);
    } catch (e) {
      console.error(e);
      setError('An error occurred while generating insights. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-4xl bg-card/50 border-primary/20">
      <CardHeader>
        <CardTitle className="font-headline text-3xl text-primary">Developer Insights</CardTitle>
        <CardDescription>
          Use AI to analyze your reference document and generate development tips. The content of your file from <code className="bg-black/20 px-1 py-0.5 rounded-sm">src/data/reference/</code> is loaded below.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <Button onClick={handleGenerate} disabled={isLoading} className="w-full font-headline text-lg py-6">
          <Lightbulb className="mr-2" />
          {isLoading ? 'Analyzing Document...' : 'Generate Insights'}
        </Button>

        {error && <p className="text-destructive text-center">{error}</p>}
        
        {isLoading && <LoadingState />}

        {result && (
          <div className="space-y-6 pt-6 border-t border-primary/20">
            <div>
              <h3 className="font-headline text-2xl text-accent mb-2">Summary</h3>
              <p className="text-muted-foreground whitespace-pre-wrap">{result.summary}</p>
            </div>
            <div>
              <h3 className="font-headline text-2xl text-accent mb-4">Development Tips</h3>
              <ul className="space-y-3">
                {result.tips.map((tip, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckSquare className="h-5 w-5 text-green-400 mt-1 flex-shrink-0" />
                    <span className="text-foreground/90">{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
