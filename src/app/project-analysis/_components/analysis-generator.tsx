
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { analyzeProject, type ProjectAnalysisOutput } from '@/ai/flows/project-analysis-flow';
import { Bot, FileText } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { ScrollArea } from '@/components/ui/scroll-area';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface AnalysisGeneratorProps {
  fileContents: string;
}

const LoadingState = () => (
    <div className="space-y-6">
        <div className="space-y-2">
            <Skeleton className="h-6 w-1/4" />
            <Skeleton className="h-40 w-full" />
        </div>
         <div className="space-y-2">
            <Skeleton className="h-6 w-1/4" />
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-2/3" />
        </div>
    </div>
);

export default function AnalysisGenerator({ fileContents }: AnalysisGeneratorProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<ProjectAnalysisOutput | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const output = await analyzeProject({ fileContents: fileContents });
      setResult(output);
    } catch (e) {
      console.error(e);
      setError('An error occurred while generating the analysis. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full bg-card/50 border-primary/20">
      <CardHeader>
        <CardTitle className="font-headline text-3xl text-primary flex items-center gap-2"><Bot /> Project Analysis</CardTitle>
        <CardDescription>
          Use AI to analyze the entire project codebase. The content of all project files has been concatenated and is ready for analysis.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <Button onClick={handleGenerate} disabled={isLoading} className="w-full font-headline text-lg py-6">
          <FileText className="mr-2" />
          {isLoading ? 'Analyzing Project...' : 'Generate Full Analysis'}
        </Button>

        {error && <p className="text-destructive text-center">{error}</p>}
        
        {isLoading && <LoadingState />}

        {result && (
            <ScrollArea className="h-[60vh] w-full rounded-md border border-primary/20 p-4">
                <ReactMarkdown 
                    remarkPlugins={[remarkGfm]}
                    className="prose prose-invert prose-sm md:prose-base max-w-none"
                    components={{
                         h1: ({node, ...props}) => <h1 className="text-primary font-headline" {...props} />,
                         h2: ({node, ...props}) => <h2 className="text-accent font-headline" {...props} />,
                         h3: ({node, ...props}) => <h3 className="text-accent/80 font-headline" {...props} />,
                         code: ({node, ...props}) => <code className="bg-black/50 text-green-400 rounded-sm px-1" {...props} />,
                    }}
                >
                    {result.analysisReport}
                </ReactMarkdown>
            </ScrollArea>
        )}
      </CardContent>
    </Card>
  );
}
