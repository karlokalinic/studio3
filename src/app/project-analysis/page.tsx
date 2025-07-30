'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCharacterStore } from '@/stores/use-character-store';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  Save,
  Menu,
  CircleDollarSign,
  Settings,
  FolderOpen,
  Archive,
  BookOpen,
  Lightbulb,
  Home,
  FileText,
  Trophy,
  Gem,
  Coins,
  Sparkles
} from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent } from './ui/tooltip';
import { useToast } from '@/hooks/use-toast';

const ResourceBar = ({ name, iconPath, level, value, color }: { name: string, iconPath: string, level: number, value: string, color: string }) => {
    return (
        <div className="w-full md:w-48">
            <div className="flex items-center justify-between mb-1">
                <div className={cn("flex items-center text-sm font-bold", color)}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mr-1.5"
                    >
                        <path d={iconPath} />
                    </svg>
                    <span>{name}</span>
                </div>
                <span className="text-xs text-muted-foreground">{value}</span>
            </div>
            <div className="h-2 w-full bg-primary/10 rounded-full">
                <div 
                    className={cn("h-full rounded-full transition-all duration-500", color.replace('text-', 'bg-'))}
                    style={{ width: `${level}%`}}
                ></div>
            </div>
        </div>
    )
}

export default function GameCenter() {
  const { character } = useCharacterStore();
  const router = useRouter();
  const { toast } = useToast();

  const handleSave = () => {
    // Zustand's persist middleware saves automatically.
    // This button provides explicit user feedback.
    toast({
      title: "Game Saved",
      description: "Your progress has been saved to the browser's local storage.",
    });
  };

  const handleQuit = () => {
    router.push('/');
  }

  const getStatus = (level: number, type: 'vitality' | 'stamina' | 'sanity') => {
      if (level > 80) return { value: 'Stable', color: 'text-green-400' };
      if (level > 50) return { value: 'Fraying', color: 'text-yellow-400' };
      if (level > 20) return { value: 'Waning', color: 'text-orange-400' };
      return { value: 'Critical', color: 'text-red-500' };
  }

  if (!character) {
    return (
        <div className="bg-card/50 rounded-lg border border-primary/20 p-4 shadow-lg shadow-primary/5 flex flex-col md:flex-row items-center justify-between gap-4">
             <h1 className="text-3xl font-headline text-primary drop-shadow-[0_0_8px_hsl(var(--primary))]">
                Fort Umbralis
            </h1>
        </div>
    )
  }

  const vitalityStatus = getStatus(character.vitality, 'vitality');
  const staminaStatus = getStatus(character.stamina, 'stamina');
  const sanityStatus = getStatus(character.sanity, 'sanity');

  return (
    <div className="bg-card/50 rounded-lg border border-primary/20 p-4 shadow-lg shadow-primary/5 flex flex-col md:flex-row items-center justify-between gap-6">
      <h1 className="text-3xl font-headline text-primary drop-shadow-[0_0_8px_hsl(var(--primary))]">
        Fort Umbralis
      </h1>

      <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-4">
          <ResourceBar name="Vitality" iconPath="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" level={character.vitality} value={vitalityStatus.value} color={vitalityStatus.color} />
          <ResourceBar name="Stamina" iconPath="m13 2-3 14h3l-3 6h6l3-14h-3l3-6h-6Z" level={character.stamina} value={staminaStatus.value} color={staminaStatus.color} />
          <ResourceBar name="Sanity" iconPath="M12 2a5 5 0 0 0-5 5c0 1.6.83 3 2 3.82V12h6v-1.18c1.17-.82 2-2.22 2-3.82a5 5 0 0 0-5-5Z" level={character.sanity} value={sanityStatus.value} color={sanityStatus.color} />
      </div>

      <div className="flex items-center gap-2 shrink-0">
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <div className="flex items-center font-bold text-lg text-gray-400 cursor-help">
                        <Gem className="h-4 w-4 mr-2" /> {character.kamen}
                    </div>
                </TooltipTrigger>
                <TooltipContent>Kamen</TooltipContent>
            </Tooltip>
            <Tooltip>
                <TooltipTrigger asChild>
                    <div className="flex items-center font-bold text-lg text-purple-400 cursor-help">
                        <Sparkles className="h-4 w-4 mr-2" /> {character.mracnik}
                    </div>
                </TooltipTrigger>
                <TooltipContent>Mračnik</TooltipContent>
            </Tooltip>
             <Tooltip>
                <TooltipTrigger asChild>
                    <div className="flex items-center font-bold text-lg text-yellow-400 cursor-help">
                        <Coins className="h-4 w-4 mr-2" /> {character.prasinskeKovanice}
                    </div>
                </TooltipTrigger>
                <TooltipContent>Prašinske Kovanice</TooltipContent>
            </Tooltip>
        </TooltipProvider>

        <Button
          variant="outline"
          size="sm"
          className="border-accent text-accent hover:bg-accent hover:text-accent-foreground transition-all ml-4"
          onClick={handleSave}
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
                  <BookOpen className="mr-4" /> Chronicle
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
                disabled
              >
                <FolderOpen className="mr-4" /> Load Game
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}