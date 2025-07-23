import type { PlayerStats, CharacterProfile, InventoryItem, Quest, WorldLocation } from '@/types';
import { Sword, HeartPulse, Shield, Bot, Map, ChevronsRight, LocateFixed } from 'lucide-react';

export const playerStats: PlayerStats = {
  health: 85,
  energy: 70,
  hunger: 90,
  currency: 1337,
};

export const characterData: CharacterProfile = {
  name: "Kaelen",
  level: 12,
  xp: 4500,
  attributes: {
    strength: 18,
    intelligence: 14,
    spirit: 15,
    hp: 120,
  },
  metadata: {
    age: 28,
    gender: "Non-binary",
    orientation: "Pansexual",
    style: "Cyber-punk Ronin",
    origin: "Neo-Kyoto Sector 7",
    backstory: "A former corporate enforcer seeking redemption in the shattered worlds.",
  },
};

export const inventoryData: InventoryItem[] = [
  { id: 'item-1', name: 'Plasma Katana', type: 'Weapon', value: 800, description: 'A blade of pure energy. Cuts through almost anything.', icon: Sword },
  { id: 'item-2', name: 'Nano-Medkit', type: 'Consumable', value: 50, description: 'Heals minor wounds instantly.', nutrition: 25, icon: HeartPulse },
  { id: 'item-3', name: 'Aegis Vest', type: 'Armor', value: 1200, description: 'Lightweight vest that can deflect energy projectiles.', icon: Shield },
  { id: 'item-4', name: 'Data Chip', type: 'Quest Item', value: 0, description: 'Encrypted data for the Cy-Gnostics.', icon: Bot },
  { id: 'item-5', name: 'Ancient Map', type: 'Quest Item', value: 0, description: 'A mysterious map fragment.', icon: Map },
];

export const questData: Quest[] = [
  { id: 'q1', title: 'The Ghost in the Machine', status: 'Active', description: 'The Cy-Gnostics want you to deliver a data chip to their contact in the Undercity. The trip is perilous.', moralChoice: 'Hand over the data chip as is, or decrypt it first to see what secrets it holds?', outcomes: 'Betraying the Cy-Gnostics could be profitable, but they have long memories.'},
  { id: 'q2', title: 'Echoes of the Past', status: 'Active', description: 'A mysterious signal is broadcasting from the ruins of Old-Terra. Investigate its source.', moralChoice: 'The signal could be a trap or a cry for help. Proceed with caution or aggression?', outcomes: 'What you find might change your understanding of the world.'},
];

export const worldData: WorldLocation[] = [
  { id: 'loc1', name: 'Neo-Kyoto', faction: 'The Corporation', currencyModifier: 1.2, position: { top: '30%', left: '25%' }},
  { id: 'loc2', name: 'The Undercity', faction: 'Outcasts', currencyModifier: 0.8, position: { top: '65%', left: '40%' }},
  { id: 'loc3', name: 'Aethelgard', faction: 'The Nexus Guard', currencyModifier: 1.0, position: { top: '50%', left: '70%' }},
];
