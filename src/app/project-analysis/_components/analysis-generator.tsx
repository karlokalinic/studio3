'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { analyzeProject, type ProjectAnalysisOutput } from '@/ai/flows/project-analysis-flow';
import { Lightbulb, Download, FileText } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { ScrollArea } from '@/components/ui/scroll-area';

interface AnalysisGeneratorProps {
  allFilesContent: string;
}

const LoadingState = () => (
    <div className="space-y-6 pt-6 border-t border-primary/20">
        <div className="space-y-3">
            <Skeleton className="h-8 w-1/3" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
        </div>
         <div className="space-y-3">
            <Skeleton className="h-8 w-1/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
        </div>
        <div className="space-y-3">
            <Skeleton className="h-8 w-1/2" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-4/5" />
        </div>
    </div>
);

export default function AnalysisGenerator({ allFilesContent }: AnalysisGeneratorProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<ProjectAnalysisOutput | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const output = await analyzeProject({ fileContents: allFilesContent });
      setResult(output);
    } catch (e) {
      console.error(e);
      setError('An error occurred while analyzing the project. This is a complex task and may have timed out. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = () => {
    if (!result) return;
    const blob = new Blob([result.analysisReport], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'nexus-chronicles-analysis.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  return (
    <Card className="w-full max-w-6xl bg-card/50 border-primary/20">
      <CardHeader>
        <div className="flex justify-between items-start">
            <div>
                <CardTitle className="font-headline text-3xl text-primary flex items-center gap-2"><FileText /> Project Analysis</CardTitle>
                <CardDescription>
                Use AI to perform a deep analysis of the entire codebase and generate a comprehensive report.
                </CardDescription>
            </div>
            {result && (
                <Button onClick={handleDownload} variant="outline">
                    <Download className="mr-2"/>
                    Export as .txt
                </Button>
            )}
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <Button onClick={handleGenerate} disabled={isLoading} className="w-full font-headline text-lg py-6">
          <Lightbulb className="mr-2" />
          {isLoading ? 'Analyzing Project... (this may take a minute)' : 'Generate Full Project Analysis'}
        </Button>

        {error && <p className="text-destructive text-center">{error}</p>}
        
        {isLoading && <LoadingState />}

        {result && (
            <ScrollArea className="h-[60vh] w-full border border-primary/20 rounded-md p-4 bg-black/20">
                <div className="prose prose-invert prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: result.analysisReport.replace(/\n/g, '<br />') }}>
                </div>
            </ScrollArea>
        )}
      </CardContent>
    </Card>
  );
}
