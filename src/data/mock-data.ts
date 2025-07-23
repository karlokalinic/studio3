

import type { PlayerStats, CharacterProfile, InventoryItem, Quest, WorldLocation, Achievement } from '@/types';

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
  inventorySlots: 15,
  health: 100,
  energy: 100,
  hunger: 100,
  currency: 100,
  attributes: {
    strength: { value: 18, description: 'Raw physical power. Affects melee damage and carry capacity.' },
    intelligence: { value: 14, description: 'Cognitive ability, problem-solving, and hacking skills.' },
    spirit: { value: 15, description: 'Mental fortitude and connection to dimensional energies. Affects willpower and magic resistance.' },
    hp: { value: 120, description: 'Health Points. Represents your character\'s life force.' },
  },
  state: {
    fatigue: { value: 25, description: 'Tiredness level. High fatigue negatively impacts physical performance.' },
    fitness: { value: 80, description: 'Overall physical condition. High fitness improves strength and endurance.' },
    focus: { value: 90, description: 'Mental concentration. High focus improves the effectiveness of tasks requiring intelligence.' },
    mentalClarity: { value: 75, description: 'Clarity of thought. High clarity enhances decision-making and cognitive speed.' },
  },
  enhancements: {
    cybernetics: ['NeuralLink V2', 'AdrenalBooster'],
    implants: ['Subdermal Weave'],
  },
  attunement: {
    order: 10,
    chaos: 5,
    balance: 2,
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
  { id: 'item-1', name: 'Plasma Katana', type: 'Weapon', value: 800, description: 'A blade of pure energy. Cuts through almost anything.', icon: 'Sword' },
  { id: 'item-2', name: 'Nano-Medkit', type: 'Consumable', value: 50, description: 'Heals minor wounds instantly.', nutrition: 25, icon: 'HeartPulse' },
  { id: 'item-3', name: 'Aegis Vest', type: 'Armor', value: 1200, description: 'Lightweight vest that can deflect energy projectiles.', icon: 'Shield' },
  { id: 'item-4', name: 'Data Chip', type: 'Quest Item', value: 0, description: 'Encrypted data for the Cy-Gnostics.', icon: 'Bot' },
  { id: 'item-5', name: 'Ancient Map', type: 'Quest Item', value: 0, description: 'A mysterious map fragment.', icon: 'Map' },
  { id: 'item-6', name: 'Slot Expansion Key', type: 'Key', value: 1000, description: 'A rare cybernetic key that can re-route power to unlock an additional inventory slot.', icon: 'Key' },
];

export const questData: Quest[] = [
    { 
        id: 'q1-retrieval', 
        title: 'The Retrieval', 
        status: 'Active', 
        progress: 0, 
        description: 'Retrieve the package from the fallen courier in the ruins of Terra Nexus Sector-G.', 
        moralChoice: 'The contents of the package are unknown. Do you deliver it sealed, or investigate first?',
        outcomes: 'Your employer values discretion, but knowledge is power.'
    }
];

export const worldData: WorldLocation[] = [
  { id: 'loc1', name: 'Neo-Kyoto', faction: 'Solaris Coalition', currencyModifier: 1.2, position: { top: '30%', left: '25%' }, description: 'A gleaming metropolis governed by corporate technocrats. Order and progress are valued above all.' },
  { id: 'loc2', name: 'The Undercity', faction: 'Outcasts', currencyModifier: 0.8, position: { top: '65%', left: '40%' }, description: 'A sprawling, chaotic network of tunnels and settlements beneath Neo-Kyoto. A haven for criminals and the disenfranchised.' },
  { id: 'loc3', name: 'Aethelgard', faction: 'Sky Citadels', currencyModifier: 1.0, position: { top: '50%', left: '70%' }, description: 'A floating city-state built on principles of free trade and individualism. Controlled by powerful merchant guilds.' },
];

// Achievements Data
export const achievementsData: Achievement[] = [
  {
    id: 'achieve-start-journey',
    name: 'A Step into the Nexus',
    description: 'Complete the tutorial and begin your journey.',
    isSpoiler: false,
    reward: { xp: 100 },
    icon: 'Footprints',
    isUnlocked: (char, quests) => localStorage.getItem('tutorialCompleted') === 'true',
  },
  {
    id: 'achieve-first-quest',
    name: 'On the Job',
    description: "Accept your first quest, 'The Retrieval'.",
    isSpoiler: false,
    reward: { xp: 50 },
    icon: 'Briefcase',
    isUnlocked: (char, quests) => quests.some(q => q.id === 'q1-retrieval'),
  },
  // This is a spoiler achievement. The player must complete the first quest to unlock it.
  // In the UI, the name and description will be hidden until it's unlocked.
  {
    id: 'achieve-complete-retrieval',
    name: 'Package Delivered',
    description: "Complete 'The Retrieval' quest.",
    isSpoiler: true,
    reward: { xp: 250, currency: 500 },
    icon: 'PackageCheck',
    isUnlocked: (char, quests) => quests.some(q => q.id === 'q1-retrieval' && q.status === 'Completed'),
  },
  {
    id: 'achieve-reach-level-5',
    name: 'Seasoned Walker',
    description: 'Reach character level 5.',
    isSpoiler: false,
    reward: { xp: 200 },
    icon: 'Star',
    isUnlocked: (char, quests) => char.level >= 5,
  },
  {
    id: 'achieve-reach-level-10',
    name: 'Nexus Veteran',
    description: 'Reach character level 10.',
    isSpoiler: false,
    reward: { xp: 500 },
    icon: 'Badge',
    isUnlocked: (char, quests) => char.level >= 10,
  },
  {
    id: 'achieve-rich',
    name: 'Kristali Kingpin',
    description: 'Amass 10,000 Nexus Kristali.',
    isSpoiler: false,
    reward: { xp: 1000 },
    icon: 'CircleDollarSign',
    isUnlocked: (char, quests) => char.currency >= 10000,
  },
  {
    id: 'achieve-max-strength',
    name: 'Peak Physique',
    description: 'Push your base Strength attribute to 20 or higher.',
    isSpoiler: false,
    reward: { xp: 750 },
    icon: 'Dumbbell',
    isUnlocked: (char, quests) => char.attributes.strength.value >= 20,
  },
  {
    id: 'achieve-max-intelligence',
    name: 'Giga-Brain',
    description: 'Push your base Intelligence attribute to 20 or higher.',
    isSpoiler: false,
    reward: { xp: 750 },
    icon: 'BrainCircuit',
    isUnlocked: (char, quests) => char.attributes.intelligence.value >= 20,
  },
  // This is a spoiler achievement, unlocked by a choice in a future quest.
  // The player must choose to betray their employer.
  {
    id: 'achieve-betrayal',
    name: 'Double-Crosser',
    description: 'Betray your employer during a critical mission.',
    isSpoiler: true,
    reward: { currency: -1000, xp: 500 }, // A penalty and a reward
    icon: 'Swords',
    isUnlocked: (char, quests) => false, // Placeholder for future quest logic
  },
  // This is a secret achievement for finding a hidden area.
  {
    id: 'achieve-secret-area',
    name: '???',
    description: 'You found a place that should not exist.',
    isSpoiler: true,
    reward: { xp: 1000 },
    icon: 'HelpCircle',
    isUnlocked: (char, quests) => false, // Placeholder
  },
  {
    id: 'achieve-inventory-expanded',
    name: 'Hoarder',
    description: 'Unlock your first extra inventory slot.',
    isSpoiler: false,
    reward: { xp: 150 },
    icon: 'Grid',
    isUnlocked: (char, quests) => char.inventorySlots > 3 + Math.floor(char.attributes.strength.value / 5),
  },
];
