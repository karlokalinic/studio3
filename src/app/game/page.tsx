
'use client';

import { useState, useEffect } from 'react';
import type { InventoryItem } from '@/types';
import { useRouter } from 'next/navigation';
import CharacterProfile from '@/components/character-profile';
import GameCenter from '@/components/game-center';
import Inventory from '@/components/inventory';
import MissionControl from '@/components/mission-control';
import QuestLog from '@/components/quest-log';
import { useCharacterStore } from '@/stores/use-character-store';
import { getCalculatedStats } from '@/lib/character-calculations';
import { useSettings } from '@/context/settings-context';
import { CalculatedStats } from '@/types';

export default function GamePage() {
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);
  const router = useRouter();
  const { character, inventory, quests, hasHydrated } = useCharacterStore();
  const { settings } = useSettings();
  const [characterStats, setCharacterStats] = useState<CalculatedStats | null>(null);

  useEffect(() => {
    if (hasHydrated && !character) {
      // If there's no character, they shouldn't be on the game page.
      router.push('/');
    }
  }, [hasHydrated, character, router]);

  useEffect(() => {
    if (character && settings) {
      if (inventory.length > 0 && !selectedItem) {
        setSelectedItem(inventory[0]);
      } else if (inventory.length === 0) {
        setSelectedItem(null);
      }
      const stats = getCalculatedStats(character, settings.difficulty);
      setCharacterStats(stats);
    }
  }, [character, settings, inventory, selectedItem]);

  if (!hasHydrated || !settings || !character || !characterStats) {
    return (
      <main className="min-h-screen bg-background p-4 md:p-8 font-body text-foreground flex items-center justify-center">
        <p>Loading Game Data...</p>
      </main>
    );
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
