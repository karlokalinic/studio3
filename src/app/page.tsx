
"use client";

import { useState, useEffect } from 'react';
import type { InventoryItem } from '@/types';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import CharacterProfile from '@/components/character-profile';
import GameCenter from '@/components/game-center';
import Inventory from '@/components/inventory';
import MissionControl from '@/components/mission-control';
import QuestLog from '@/components/quest-log';

import { useCharacterStore } from '@/stores/use-character-store';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Rocket, History, Settings, Gamepad2, Trophy, BookOpen, Play } from 'lucide-react';
import { getCalculatedStats } from '@/lib/character-calculations';
import { useSettings } from '@/context/settings-context';
import { CalculatedStats } from '@/types';
import Image from 'next/image';

const MainMenu = () => {
    const router = useRouter();
    const { character } = useCharacterStore();

    const handleContinue = () => {
        router.push('/game');
    }

    return (
        <main className="min-h-screen bg-background font-body text-foreground flex items-center justify-center p-4">
             <Image
                src="https://placehold.co/1920x1080.png"
                alt="Cosmic background"
                layout="fill"
                objectFit="cover"
                className="-z-10 opacity-20"
                data-ai-hint="nebula stars"
                />
            <Card className="max-w-md w-full text-center bg-card/50 border-primary/20 shadow-2xl shadow-primary/10 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle className="font-headline text-4xl text-primary drop-shadow-[0_0_10px_hsl(var(--primary))]">
                        Nexus Chronicles
                    </CardTitle>
                    <CardDescription className="text-foreground/80">
                        Your journey across the shattered dimensions awaits.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col gap-4">
                        {character && (
                             <Button 
                                onClick={handleContinue}
                                className="w-full bg-accent text-accent-foreground hover:bg-accent/80 transition-all text-lg py-6 font-headline"
                            >
                                <Play className="mr-2" />
                                Continue Chronicle
                            </Button>
                        )}
                        <Button 
                            asChild
                            className={`w-full text-lg py-6 font-headline ${!character ? 'bg-accent text-accent-foreground hover:bg-accent/80 transition-all' : ''}`}
                            variant={character ? 'outline' : 'default'}
                        >
                           <Link href="/new-game">
                             <Rocket className="mr-2" />
                             New Game
                           </Link>
                        </Button>
                        <Button 
                            className="w-full"
                            variant="outline"
                            disabled
                        >
                            <Gamepad2 className="mr-2" />
                            Load Game
                        </Button>
                        <Button asChild className="w-full" variant="outline">
                            <Link href="/explore-the-story">
                                <BookOpen className="mr-2" />
                                Wiki
                            </Link>
                        </Button>
                        <Button asChild className="w-full" variant="outline">
                            <Link href="/settings">
                                <Settings className="mr-2" />
                                Settings
                            </Link>
                        </Button>
                        <Button 
                            className="w-full"
                            variant="outline"
                            disabled
                        >
                            <Trophy className="mr-2" />
                            Achievements
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </main>
    )
}


const GameUI = () => {
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);
  const router = useRouter();
  const { character, inventory, quests, loadCharacter, hasHydrated } = useCharacterStore();
  const { settings } = useSettings();
  const [characterStats, setCharacterStats] = useState<CalculatedStats | null>(null);

   useEffect(() => {
    if (hasHydrated && character && settings) {
        if (inventory.length > 0 && !selectedItem) {
            setSelectedItem(inventory[0]);
        } else if (inventory.length === 0) {
            setSelectedItem(null);
        }
        const stats = getCalculatedStats(character, settings.difficulty);
        setCharacterStats(stats);
    } else if (hasHydrated && !character) {
      setSelectedItem(null);
      router.push('/');
    }
  }, [character, router, hasHydrated, inventory, selectedItem, settings]);


  if (!hasHydrated || !settings) {
     return (
        <main className="min-h-screen bg-background p-4 md:p-8 font-body text-foreground flex items-center justify-center">
             <p>Loading Game Data...</p>
        </main>
     )
  }

  if (!character || !characterStats) {
      return null; // Will be redirected by useEffect
  }

  return (
    <main className="min-h-screen bg-background p-4 md:p-8 font-body text-foreground">
      <div className="container mx-auto">
        <header className="mb-8">
          <GameCenter />
        </header>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          <div className="xl:col-span-1 space-y-8">
            <CharacterProfile profile={character} />
            <Inventory 
              items={inventory} 
              selectedItem={selectedItem}
              onSelectItem={setSelectedItem}
              maxSlots={characterStats.inventorySlots}
            />
          </div>

          <div className="xl:col-span-2 space-y-8">
            <MissionControl />
            <QuestLog quests={quests} />
          </div>
        </div>
      </div>
    </main>
  );
}

export default function HomePage() {
    const { hasHydrated, character, setHasHydrated } = useCharacterStore();
    const router = useRouter();

    useEffect(() => {
        // Manually trigger hydration check from zustand persist middleware
        useCharacterStore.persist.rehydrate();
        setHasHydrated(true);
    }, [setHasHydrated]);

    useEffect(() => {
        if (hasHydrated && character && !localStorage.getItem('tutorialCompleted')) {
            router.push('/tutorial');
        }
    }, [hasHydrated, character, router]);
    
    // This logic is now pushed to a separate component, GameUI, to handle the "in-game" state
    // while this component handles the main menu logic.
    // The decision to show GameUI vs MainMenu would happen in a router or a parent component in a larger app.
    // For this setup, we'll keep it simple and just show the MainMenu. A 'continue' button will lead to the game.

    if (!hasHydrated) {
        return <div className="flex items-center justify-center min-h-screen">Loading...</div>
    }

    return <MainMenu />;
}
