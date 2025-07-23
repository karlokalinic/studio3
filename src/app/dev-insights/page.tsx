import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import InsightGenerator from "./_components/insight-generator";
import * as fs from 'fs/promises';
import path from 'path';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";

async function getReferenceContent(): Promise<string | null> {
    try {
        // This path is relative to the root of the project where `next dev` is run
        const filePath = path.join(process.cwd(), 'src', 'data', 'reference', 'placeholder.md');
        const content = await fs.readFile(filePath, 'utf-8');
        return content;
    } catch (error) {
        console.error("Could not read reference file:", error);
        return null;
    }
}

export default async function DevInsightsPage() {
    const referenceContent = await getReferenceContent();

    return (
        <div className="min-h-screen bg-background text-foreground font-body p-4 md:p-8">
            <div className="absolute top-4 left-4 z-10">
                <Button asChild variant="outline" className="border-accent text-accent hover:bg-accent hover:text-accent-foreground transition-all">
                <Link href="/">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Game
                </Link>
                </Button>
            </div>
            <div className="flex flex-col items-center justify-center pt-16">
                 {referenceContent ? (
                    <InsightGenerator referenceContent={referenceContent} />
                ) : (
                     <Alert variant="destructive" className="max-w-xl">
                        <Terminal className="h-4 w-4" />
                        <AlertTitle>File Not Found!</AlertTitle>
                        <AlertDescription>
                            Could not load the reference document. Please make sure there is a markdown file inside the <code className="bg-black/20 px-1 py-0.5 rounded-sm">src/data/reference/</code> directory.
                        </AlertDescription>
                    </Alert>
                )}
            </div>
        </div>
    );
}
