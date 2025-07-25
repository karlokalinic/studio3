
import type { PlayerStats, CharacterProfile, InventoryItem, Quest, WorldLocation, Achievement } from '@/types';

export const playerStats: PlayerStats = {
  vitality: 85,
  stamina: 70,
  sanity: 90,
  kamen: 10,
  mracnik: 1,
  prasinskeKovanice: 0
};

export const characterData: CharacterProfile = {
  name: "Elysar Valentis",
  level: 1,
  xp: 0,
  inventorySlots: 3,
  vitality: 100,
  stamina: 100,
  sanity: 100,
  kamen: 10,
  mracnik: 1,
  prasinskeKovanice: 0,
  attributes: {
    intellect: { value: 3, description: 'Knowledge of ancient languages, symbols, and research.' },
    strength: { value: 1, description: 'Physical power for moving obstacles.' },
    adaptation: { value: 1, description: 'Ability to react to sudden situations (uses a D6 roll).' },
  },
  state: {
    fatigue: { value: 0, description: 'Tiredness level. High fatigue negatively impacts performance.' },
    hunger: {value: 100, description: 'Satiation level.'},
    focus: { value: 100, description: 'Mental concentration. High focus improves the effectiveness of tasks requiring intelligence.' },
    mentalClarity: { value: 100, description: 'Clarity of thought. High clarity enhances decision-making and cognitive speed.' },
  },
  metadata: {
    age: 47,
    gender: "Male",
    origin: "Lumenor",
    backstory: "An esteemed scholar from the city of Lumenor, your relentless pursuit of truth led you to uncover corruption at the highest levels of the Empire. For this, you were sentenced to the lightless depths of Fort Umbralis. Your mind is your only weapon.",
  },
};

export const inventoryData: InventoryItem[] = [
  { id: 'item-1', name: 'Tattered Rags', type: 'Armor', value: 1, description: 'The threadbare uniform of a prisoner.', icon: 'Shield' },
  { id: 'item-2', name: 'Stale Bread', type: 'Consumable', value: 0, description: 'Barely edible, but it\'s something.', nutrition: 5, icon: 'HeartPulse' },
  { id: 'item-3', name: 'Phosphorescent Pebble', type: 'Currency', value: 1, description: 'A small stone that glows faintly. The primary currency among prisoners.', icon: 'Gem' },
];

export const questData: Quest[] = [
    { 
        id: 'q1-escape', 
        title: 'The First Step', 
        status: 'Active', 
        progress: 0, 
        description: 'You are trapped in a cell. Your first goal is to acquire a tool. Without one, the deeper passages are inaccessible.', 
        moralChoice: 'Do you risk stealing from a fellow prisoner, or attempt to bribe a guard with your meager resources?',
        outcomes: 'Your choice will set the tone for your escape and your reputation within the prison.'
    }
];

export const worldData: WorldLocation[] = [
  { id: 'loc1', name: 'Upper Blocks', faction: 'Political Prisoners', currencyModifier: 1.0, position: { top: '30%', left: '25%' }, description: 'Relatively clean, but under constant surveillance. Home to nobles and intellectuals.' },
  { id: 'loc2', name: 'The Mines', faction: 'Laborers', currencyModifier: 1.0, position: { top: '65%', left: '40%' }, description: 'Forced labor happens here. Dangerous, but a source of rare minerals.' },
  { id: 'loc3', name: 'The Catacombs', faction: 'The Forgotten', currencyModifier: 1.0, position: { top: '50%', left: '70%' }, description: 'The deepest, most dangerous level. Rumored to hold ancient secrets and horrors.' },
];

// Achievements Data for Fort Umbralis
export const achievementsData: Achievement[] = [
  {
    id: 'achieve-start-journey',
    name: 'The Wretched',
    description: 'Begin your sentence in Fort Umbralis.',
    isSpoiler: false,
    reward: { xp: 100 },
    icon: 'Footprints',
    isUnlocked: (char, quests) => !!char,
  },
  {
    id: 'achieve-first-quest',
    name: 'A Glimmer of Hope',
    description: "Formulate your first plan to escape.",
    isSpoiler: false,
    reward: { xp: 50 },
    icon: 'Briefcase',
    isUnlocked: (char, quests) => quests.some(q => q.id === 'q1-escape'),
  },
  {
    // A tool is required to progress, a key milestone.
    id: 'achieve-got-tool',
    name: 'The First Tool',
    description: "Acquire your first tool, a symbol of hope.",
    isSpoiler: true,
    reward: { xp: 250, currency: 5 }, // 5 Kamen
    icon: 'PackageCheck',
    isUnlocked: (char, quests) => false, // Placeholder for future logic
  },
  {
    id: 'achieve-reach-level-5',
    name: 'Seasoned Convict',
    description: 'Survive long enough to reach level 5.',
    isSpoiler: false,
    reward: { xp: 200 },
    icon: 'Star',
    isUnlocked: (char, quests) => char.level >= 5,
  },
  {
    id: 'achieve-rich',
    name: 'Stone Baron',
    description: 'Amass 100 Kamen.',
    isSpoiler: false,
    reward: { xp: 1000 },
    icon: 'CircleDollarSign',
    isUnlocked: (char, quests) => char.kamen >= 100,
  },
  {
    id: 'achieve-mracnik-hoarder',
    name: 'Crystal Collector',
    description: 'Hold 10 Mračnik at once.',
    isSpoiler: false,
    reward: { xp: 750 },
    icon: 'Dumbbell',
    isUnlocked: (char, quests) => char.mracnik >= 10,
  },
  {
    // Player finds a way to communicate with another prisoner in a different language
    id: 'achieve-secret-message',
    name: 'Whispers in the Dark',
    description: 'Successfully send or receive a secret message using a non-standard language.',
    isSpoiler: true,
    reward: { xp: 500 },
    icon: 'Languages',
    isUnlocked: (char, quests) => false, 
  },
  {
    id: 'achieve-first-permadeath',
    name: 'And So It Ends...',
    description: 'Die for the first time.',
    isSpoiler: true,
    reward: { xp: 0 },
    icon: 'Skull',
    isUnlocked: (char, quests) => false, 
  },
   {
    id: 'achieve-second-life',
    name: 'A New Face, An Old Grudge',
    description: 'Start a new game after your first death, carrying the whispers of the past.',
    isSpoiler: true,
    reward: { xp: 100 },
    icon: 'History',
    isUnlocked: (char, quests) => false, 
  },
];
