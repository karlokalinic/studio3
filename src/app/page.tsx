
"use client";

import { useState, useEffect } from 'react';
import type { InventoryItem } from '@/types';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import CharacterProfile from '@/components/character-profile';
import GameCenter from '@/components/game-center';
import Inventory from '@/components/inventory';
import QuestLog from '@/components/quest-log';
import WorldMap from '@/components/world-map';
import StatInternals from '@/components/stat-internals';

import { useCharacterStore } from '@/stores/use-character-store';
import { questData, worldData } from '@/data/mock-data';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Rocket, History, Settings, Gamepad2, Trophy, BookOpen } from 'lucide-react';
import { getCalculatedStats } from '@/lib/character-calculations';
import { useSettings } from '@/context/settings-context';

export default function Home() {
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);
  const router = useRouter();
  const { character, inventory, loadCharacter, hasHydrated } = useCharacterStore();
  const { settings } = useSettings();
  const [characterStats, setCharacterStats] = useState<{
    inventorySlots: number;
  } | null>(null);

  useEffect(() => {
    loadCharacter();
  }, [loadCharacter]);

  useEffect(() => {
    if (hasHydrated && character && settings) {
        if (!localStorage.getItem('tutorialCompleted')) {
          router.push('/tutorial');
        }
        if (inventory.length > 0 && !selectedItem) {
            setSelectedItem(inventory[0]);
        } else if (inventory.length === 0) {
            setSelectedItem(null);
        }
        const stats = getCalculatedStats(character, settings.difficulty);
        setCharacterStats(stats);
    } else if (hasHydrated && !character) {
      setSelectedItem(null);
    }
  }, [character, router, hasHydrated, inventory, selectedItem, settings]);


  const startNewGame = () => {
    // This will be handled by the zustand store resetting
    router.push('/new-game');
  };

  if (!hasHydrated || !settings) {
     return (
        <main className="min-h-screen bg-background p-4 md:p-8 font-body text-foreground flex items-center justify-center">
             <p>Loading Game Data...</p>
        </main>
     )
  }

  if (!character || !characterStats) {
    return (
      <main className="min-h-screen bg-background p-4 md:p-8 font-body text-foreground flex items-center justify-center">
        <Card className="max-w-md w-full text-center bg-card/50 border-primary/20 shadow-lg shadow-primary/5">
          <CardHeader>
            <CardTitle className="font-headline text-3xl text-primary">Welcome to Nexus Chronicles</CardTitle>
            <CardDescription>Your journey across the dimensions awaits.</CardDescription>
          </CardHeader>
          <CardContent>
             <div className="flex flex-col gap-4">
                <Button 
                    onClick={startNewGame}
                    className="w-full bg-accent text-accent-foreground hover:bg-accent/80 transition-all text-lg py-6 font-headline"
                >
                    <Rocket className="mr-2" />
                    New Game
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
                        Lore
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

  return (
    <main className="min-h-screen bg-background p-4 md:p-8 font-body text-foreground">
      <div className="container mx-auto">
        <header className="mb-8">
          <GameCenter />
        </header>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          <div className="xl:col-span-1 space-y-8">
            <CharacterProfile profile={character} />
            <QuestLog quests={questData} />
            <WorldMap locations={worldData} />
          </div>

          <div className="xl:col-span-2 space-y-8">
            <Inventory 
              items={inventory} 
              selectedItem={selectedItem}
              onSelectItem={setSelectedItem}
              maxSlots={characterStats.inventorySlots}
            />
            <StatInternals profile={character} />
          </div>
        </div>
      </div>
    </main>
  );
}
