import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import AnalysisGenerator from "./_components/analysis-generator";
import * as fs from 'fs/promises';
import path from 'path';
import { glob } from 'glob';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";


async function getAllFileContents(): Promise<string | null> {
    try {
        const projectRoot = process.cwd();
        const filePaths = await glob('src/**/*.{ts,tsx,css,md,json}', {
            cwd: projectRoot,
            ignore: ['node_modules/**', '**/dev.ts'],
        });

        const fileContents = await Promise.all(
            filePaths.map(async (filePath) => {
                const absolutePath = path.join(projectRoot, filePath);
                const content = await fs.readFile(absolutePath, 'utf-8');
                return `--- FILE: ${filePath} ---\n\n${content}\n\n`;
            })
        );

        return fileContents.join('');
    } catch (error) {
        console.error("Could not read project files:", error);
        return null;
    }
}


export default async function ProjectAnalysisPage() {
    const allFilesContent = await getAllFileContents();

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
                 {allFilesContent ? (
                    <AnalysisGenerator allFilesContent={allFilesContent} />
                ) : (
                     <Alert variant="destructive" className="max-w-xl">
                        <Terminal className="h-4 w-4" />
                        <AlertTitle>Error Reading Project Files!</AlertTitle>
                        <AlertDescription>
                           Could not load the project source code for analysis. Please check the server logs for more details.
                        </AlertDescription>
                    </Alert>
                )}
            </div>
        </div>
    );
}
