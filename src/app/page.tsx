"use client";

import { useState } from 'react';
import type { InventoryItem } from '@/types';

import CharacterProfile from '@/components/character-profile';
import GameCenter from '@/components/game-center';
import Inventory from '@/components/inventory';
import QuestLog from '@/components/quest-log';
import WorldMap from '@/components/world-map';

import { characterData, playerStats, inventoryData, questData, worldData } from '@/data/mock-data';

export default function Home() {
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(inventoryData[0] || null);

  return (
    <main className="min-h-screen bg-background p-4 md:p-8 font-body text-foreground">
      <div className="container mx-auto">
        <header className="mb-8">
          <GameCenter stats={playerStats} />
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          <div className="lg:col-span-1 xl:col-span-1 space-y-8">
            <CharacterProfile profile={characterData} />
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
            <WorldMap locations={worldData} />
          </div>
        </div>
      </div>
    </main>
  );
}
