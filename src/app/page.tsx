
"use client";

import { useState, useEffect } from 'react';
import type { InventoryItem, CharacterProfile } from '@/types';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import CharacterProfile from '@/components/character-profile';
import GameCenter from '@/components/game-center';
import Inventory from '@/components/inventory';
import QuestLog from '@/components/quest-log';
import WorldMap from '@/components/world-map';

import { playerStats, inventoryData, questData, worldData } from '@/data/mock-data';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Rocket, History } from 'lucide-react';

export default function Home() {
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(inventoryData[0] || null);
  const [character, setCharacter] = useState<CharacterProfile | null>(null);
  const router = useRouter();

  useEffect(() => {
    const savedCharacter = localStorage.getItem('characterProfile');
    if (savedCharacter) {
      try {
        const parsedCharacter = JSON.parse(savedCharacter);
        setCharacter(parsedCharacter);
        // If the tutorial hasn't been completed, redirect to it.
        if (!localStorage.getItem('tutorialCompleted')) {
          router.push('/tutorial');
        }
      } catch (e) {
        console.error("Failed to parse character profile from localStorage", e);
        localStorage.removeItem('characterProfile');
      }
    }
  }, [router]);

  const startNewGame = () => {
    // Clear old data for a fresh start
    localStorage.removeItem('characterProfile');
    localStorage.removeItem('tutorialCompleted');
    router.push('/explore-the-story');
  };

  if (!character) {
    return (
      <main className="min-h-screen bg-background p-4 md:p-8 font-body text-foreground flex items-center justify-center">
        <Card className="max-w-md w-full text-center bg-card/50 border-primary/20 shadow-lg shadow-primary/5">
          <CardHeader>
            <CardTitle className="font-headline text-3xl text-primary">Welcome to Nexus Chronicles</CardTitle>
            <CardDescription>Your journey across the dimensions awaits.</CardDescription>
          </CardHeader>
          <CardContent>
             <p className="text-muted-foreground mb-6">Create a new character and begin your adventure, or dive into the lore first.</p>
             <div className="flex flex-col gap-4">
                <Button 
                    onClick={startNewGame}
                    className="w-full bg-accent text-accent-foreground hover:bg-accent/80 transition-all text-lg py-6 font-headline"
                >
                    <Rocket className="mr-2" />
                    Start New Game
                </Button>
                <Button asChild className="w-full" variant="outline">
                    <Link href="/explore-the-story">
                        <History className="mr-2" />
                        Explore the Story
                    </Link>
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
          <GameCenter stats={playerStats} />
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          <div className="lg:col-span-1 xl:col-span-1 space-y-8">
            <CharacterProfile profile={character} />
            <QuestLog quests={questData} />
          </div>

          <div className="lg:col-span-2 xl:col-span-2 space-y-8">
            <Inventory 
              items={inventoryData} 
              selectedItem={selectedItem}
              onSelectItem={setSelectedItem}
            />
          </div>
          
          <div className="lg:col-span-3 xl:col-span-1 space-y-8">
             <div className="bg-card/50 border-primary/20 shadow-lg shadow-primary/5 p-6 rounded-lg text-center">
                  <h3 className="font-headline text-2xl text-primary mb-4">Discover the Universe</h3>
                  <p className="text-muted-foreground mb-6">Dive deep into the lore, factions, and history of the Nexus Chronicles.</p>
                  <Button asChild className="w-full bg-accent text-accent-foreground hover:bg-accent/80 transition-all text-lg py-6 font-headline">
                    <Link href="/explore-the-story">Explore the Story</Link>
                  </Button>
              </div>
            <WorldMap locations={worldData} />
          </div>
        </div>
      </div>
    </main>
  );
}
