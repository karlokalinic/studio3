

'use client';

import { useCharacterStore } from '@/stores/use-character-store';
import StatInternals from '@/components/stat-internals';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function StatInternalsContent() {
  const { character, hasHydrated } = useCharacterStore();

  if (!hasHydrated) {
    return <div className="min-h-screen flex items-center justify-center"><p>Loading...</p></div>;
  }

  if (!character) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center">
        <p className="text-2xl font-headline text-destructive mb-4">No Character Data Found</p>
        <p className="text-muted-foreground mb-8">Please start a new game to create a character.</p>
        <Button asChild>
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Return to Main Page
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground font-body p-4 md:p-8">
      <div className="container mx-auto">
        <div className="mb-8">
          <Button asChild variant="outline">
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Game
            </Link>
          </Button>
        </div>
        <StatInternals profile={character} />
      </div>
    </div>
  );
}
