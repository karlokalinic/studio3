
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCharacterStore } from '@/stores/use-character-store';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  Shield,
  Zap,
  Drumstick,
  Save,
  Menu,
  CircleDollarSign,
  Settings,
  FolderOpen,
  LogOut,
  Archive,
  BookOpen,
  Lightbulb,
  Home,
  FileText,
  Trophy,
} from 'lucide-react';
import Link from 'next/link';

export default function GameCenter() {
  const { character, resetCharacter } = useCharacterStore();
  const router = useRouter();
  const [formattedCurrency, setFormattedCurrency] = useState<string | null>(
    null
  );

  useEffect(() => {
    // Format currency on the client to avoid hydration mismatch
    if (character?.currency) {
      setFormattedCurrency(character.currency.toLocaleString());
    }
  }, [character?.currency]);

  const handleQuit = () => {
    // For a real game, you might want to ask for confirmation
    router.push('/');
  }

  if (!character) {
    return (
        <div className="bg-card/50 rounded-lg border border-primary/20 p-4 shadow-lg shadow-primary/5 flex flex-col md:flex-row items-center justify-between gap-4">
             <h1 className="text-3xl font-headline text-primary drop-shadow-[0_0_8px_hsl(var(--primary))]">
                Nexus Chronicles
            </h1>
        </div>
    )
  }

  return (
    <div className="bg-card/50 rounded-lg border border-primary/20 p-4 shadow-lg shadow-primary/5 flex flex-col md:flex-row items-center justify-between gap-4">
      <h1 className="text-3xl font-headline text-primary drop-shadow-[0_0_8px_hsl(var(--primary))]">
        Nexus Chronicles
      </h1>

      <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
        <div className="flex items-center" title="Health">
          <Shield className="h-5 w-5 mr-2 text-accent drop-shadow-[0_0_4px_hsl(var(--accent))] transition-all" />
          <Progress
            value={character.health}
            className="w-24 h-2 bg-primary/20"
          />
        </div>
        <div className="flex items-center" title="Energy">
          <Zap className="h-5 w-5 mr-2 text-accent drop-shadow-[0_0_4px_hsl(var(--accent))] transition-all" />
          <Progress value={character.energy} className="w-24 h-2 bg-primary/20" />
        </div>
        <div className="flex items-center" title="Hunger">
          <Drumstick className="h-5 w-5 mr-2 text-accent drop-shadow-[0_0_4px_hsl(var(--accent))] transition-all" />
          <Progress value={character.hunger} className="w-24 h-2 bg-primary/20" />
        </div>

        <div
          className="flex items-center font-bold text-lg text-accent"
          title="Nexus Kristali"
        >
          <CircleDollarSign className="h-5 w-5 mr-2 text-accent drop-shadow-[0_0_4px_hsl(var(--accent))] transition-all" />
          {formattedCurrency || '...'}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          className="border-accent text-accent hover:bg-accent hover:text-accent-foreground transition-all"
        >
          <Save className="mr-2 h-4 w-4" /> Save
        </Button>
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="border-accent text-accent hover:bg-accent hover:text-accent-foreground transition-all"
            >
              <Menu className="mr-2 h-4 w-4" /> Menu
            </Button>
          </SheetTrigger>
          <SheetContent className="bg-card/95 border-primary/20 text-foreground">
            <SheetHeader>
              <SheetTitle className="font-headline text-2xl text-primary">
                Game Menu
              </SheetTitle>
            </SheetHeader>
            <div className="mt-8 flex flex-col gap-4">
              <Button
                variant="ghost"
                className="justify-start text-lg p-6 hover:bg-accent/20 hover:text-accent"
                onClick={handleQuit}
              >
                <Home className="mr-4" /> Main Menu
              </Button>
               <Button
                variant="ghost"
                className="justify-start text-lg p-6 hover:bg-accent/20 hover:text-accent"
                asChild
              >
                 <Link href="/achievements">
                  <Trophy className="mr-4" /> Achievements
                </Link>
              </Button>
               <Button
                variant="ghost"
                className="justify-start text-lg p-6 hover:bg-accent/20 hover:text-accent"
                asChild
              >
                 <Link href="/explore-the-story">
                  <BookOpen className="mr-4" /> Wiki
                </Link>
              </Button>
              <Button
                variant="ghost"
                className="justify-start text-lg p-6 hover:bg-accent/20 hover:text-accent"
                asChild
              >
                 <Link href="/settings">
                  <Settings className="mr-4" /> Settings
                </Link>
              </Button>
              <Button
                variant="ghost"
                className="justify-start text-lg p-6 hover:bg-accent/20 hover:text-accent"
              >
                <FolderOpen className="mr-4" /> Load Game
              </Button>
               <Button
                variant="ghost"
                className="justify-start text-lg p-6 hover:bg-accent/20 hover:text-accent"
                asChild
              >
                <Link href="/admin-archives">
                  <Archive className="mr-4"/> Admin Archives
                </Link>
              </Button>
               <Button
                variant="ghost"
                className="justify-start text-lg p-6 hover:bg-accent/20 hover:text-accent"
                asChild
              >
                <Link href="/dev-insights">
                  <Lightbulb className="mr-4"/> Dev Insights
                </Link>
              </Button>
              <Button
                variant="ghost"
                className="justify-start text-lg p-6 hover:bg-accent/20 hover:text-accent"
                asChild
              >
                <Link href="/project-analysis">
                  <FileText className="mr-4"/> Project Analysis
                </Link>
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}
