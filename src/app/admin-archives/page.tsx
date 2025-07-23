'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

import LoginGate from './_components/login-gate';
import DevDiary from './_components/dev-diary';

export default function AdminArchivesPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground font-body">
      <div className="absolute top-4 left-4 z-10">
        <Button
          asChild
          variant="outline"
          className="border-accent text-accent hover:bg-accent hover:text-accent-foreground transition-all"
        >
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Game
          </Link>
        </Button>
      </div>
      <div className="container mx-auto px-4 py-16">
        {isAuthenticated ? (
          <DevDiary />
        ) : (
          <LoginGate onAuthenticated={() => setIsAuthenticated(true)} />
        )}
      </div>
    </div>
  );
}
