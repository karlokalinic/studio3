
'use client';

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Suspense } from "react";

export default function CharacterSheetLayout({
    children
}: {
    children: React.ReactNode
}) {
    return (
         <div className="min-h-screen bg-background text-foreground font-body">
            <div className="container mx-auto p-4 md:p-8">
                <div className="mb-8">
                    <Button asChild variant="outline">
                        <Link href="/game">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Game
                        </Link>
                    </Button>
                </div>
                <Suspense fallback={<div>Loading...</div>}>
                    {children}
                </Suspense>
            </div>
        </div>
    )
}
