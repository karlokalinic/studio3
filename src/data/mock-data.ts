
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
  inventorySlots: 10,
  vitality: 100,
  stamina: 100,
  sanity: 100,
  currency: 0,
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
    orientation: 'Undisclosed',
    style: 'Worn Scholar Robes',
    origin: "Lumenor",
    backstory: "An esteemed scholar from the city of Lumenor, your relentless pursuit of truth led you to uncover corruption at the highest levels of the Empire. For this, you were sentenced to the lightless depths of Fort Umbralis. Your mind is your only weapon.",
  },
  inventory: [],
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

export const achievementsData: Achievement[] = [
  // --- Progression Achievements ---
  {
    id: 'achieve-start-journey',
    name: 'The Wretched',
    description: 'Begin your sentence in Fort Umbralis.',
    isSpoiler: false,
    reward: { xp: 100 },
    icon: 'Footprints',
    isUnlocked: (char) => !!char,
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
    id: 'achieve-complete-first-quest',
    name: 'The First Step',
    description: "Complete your first quest.",
    isSpoiler: false,
    reward: { xp: 150, currency: 10 },
    icon: 'Milestone',
    isUnlocked: (char, quests) => quests.some(q => q.id === 'q1-escape' && q.status === 'Completed'),
  },
  {
    id: 'achieve-reach-level-5',
    name: 'Seasoned Convict',
    description: 'Survive long enough to reach level 5.',
    isSpoiler: false,
    reward: { xp: 200 },
    icon: 'Star',
    isUnlocked: (char) => char.level >= 5,
  },
  {
    id: 'achieve-reach-level-10',
    name: 'Hardened Survivor',
    description: 'Reach level 10. You are no longer prey.',
    isSpoiler: false,
    reward: { xp: 500 },
    icon: 'Award',
    isUnlocked: (char) => char.level >= 10,
  },

  // --- Collection / Economic Achievements ---
  {
    id: 'achieve-rich',
    name: 'Stone Baron',
    description: 'Amass 500 Kamen.',
    isSpoiler: false,
    reward: { xp: 1000 },
    icon: 'CircleDollarSign',
    isUnlocked: (char) => char.kamen >= 500,
  },
  {
    id: 'achieve-mracnik-hoarder',
    name: 'Crystal Collector',
    description: 'Hold 25 Mračnik at once.',
    isSpoiler: false,
    reward: { xp: 750 },
    icon: 'Dumbbell',
    isUnlocked: (char) => char.mracnik >= 25,
  },
    {
    id: 'achieve-first-coin',
    name: 'Relic of the Past',
    description: 'Find your first Prašinske Kovanice.',
    isSpoiler: true,
    reward: { xp: 100 },
    icon: 'Coins',
    isUnlocked: (char) => char.prasinskeKovanice > 0,
  },
  {
    id: 'achieve-inventory-expanded',
    name: 'Deeper Pockets',
    description: "Unlock an additional inventory slot.",
    isSpoiler: false,
    reward: { xp: 50 },
    icon: 'PackagePlus',
    isUnlocked: (char) => char.inventorySlots > 10, 
  },
  {
    id: 'achieve-inventory-maxed',
    name: 'A Walking Hoard',
    description: "Unlock all 25 inventory slots.",
    isSpoiler: true,
    reward: { xp: 500 },
    icon: 'PackageSearch',
    isUnlocked: (char) => char.inventorySlots >= 25, 
  },
  {
    id: 'achieve-got-tool',
    name: 'The First Tool',
    description: "Acquire your first tool, a symbol of hope.",
    isSpoiler: true,
    reward: { xp: 250, currency: 5 }, // 5 Kamen
    icon: 'PackageCheck',
    isUnlocked: (char) => char.inventory?.some(i => i.type === 'Key') ?? false,
  },
  
  // --- Secret & Lore Achievements ---
  {
    id: 'achieve-secret-message',
    name: 'Whispers in the Dark',
    description: 'Successfully send or receive a secret message using a non-standard language.',
    isSpoiler: true,
    reward: { xp: 500 },
    icon: 'Languages',
    isUnlocked: () => false, // Placeholder for future implementation
  },
  {
    id: 'achieve-read-all-lore',
    name: 'Prison Historian',
    description: 'Read every entry in the Chronicle.',
    isSpoiler: true,
    reward: { xp: 300 },
    icon: 'Library',
    isUnlocked: () => false, // Placeholder
  },
    {
    id: 'achieve-find-secret-room',
    name: 'Archaeologist',
    description: "Discover a hidden room in the Catacombs.",
    isSpoiler: true,
    reward: { xp: 400, currency: 50 },
    icon: 'MapPin',
    isUnlocked: () => false, // Placeholder
  },
  
  // --- Meta & Challenge Achievements ---
  {
    id: 'achieve-first-permadeath',
    name: 'And So It Ends...',
    description: 'Die for the first time.',
    isSpoiler: true,
    reward: { xp: 0 },
    icon: 'Skull',
    isUnlocked: () => false, // Placeholder - needs death state tracking
  },
   {
    id: 'achieve-second-life',
    name: 'A New Face, An Old Grudge',
    description: 'Start a new game after your first death, carrying the whispers of the past.',
    isSpoiler: true,
    reward: { xp: 100 },
    icon: 'History',
    isUnlocked: () => false, // Placeholder - needs cross-run tracking
  },
   {
    id: 'achieve-all-paths',
    name: 'Master of Fates',
    description: 'Start a new game with all four main archetypes (Political, Laborer, Heretic, Zealot).',
    isSpoiler: true,
    reward: { xp: 2000 },
    icon: 'GitFork',
    isUnlocked: () => false, // Placeholder - needs cross-run tracking
  },
  {
    id: 'achieve-perfect-run',
    name: 'Flawless Escape',
    description: 'Escape Fort Umbralis without failing a single attribute check.',
    isSpoiler: true,
    reward: { xp: 5000, currency: 1000},
    icon: 'Trophy',
    isUnlocked: () => false, // Placeholder
  },
    {
    id: 'achieve-pacifist',
    name: 'Ghost of Umbralis',
    description: 'Escape without taking a single life.',
    isSpoiler: true,
    reward: { xp: 3000 },
    icon: 'Feather',
    isUnlocked: () => false, // Placeholder
  },
  
  // --- Faction & Moral Achievements ---
  {
    id: 'achieve-cult-friend',
    name: 'Friend of the Faithful',
    description: 'Achieve a positive reputation with the Cult of Darkness.',
    isSpoiler: false,
    reward: { xp: 250 },
    icon: 'Handshake',
    isUnlocked: () => false, // Placeholder
  },
  {
    id: 'achieve-cult-enemy',
    name: 'Marked for Sacrifice',
    description: 'Become an enemy of the Cult of Darkness.',
    isSpoiler: true,
    reward: { xp: 250 },
    icon: 'Flame',
    isUnlocked: () => false, // Placeholder
  },
    {
    id: 'achieve-ultimate-choice',
    name: 'The Final Choice',
    description: 'Make a decision that determines the fate of Fort Umbralis itself.',
    isSpoiler: true,
    reward: { xp: 1500 },
    icon: 'Swords',
    isUnlocked: () => false, // Placeholder
  },

  // --- Skill & Stat Achievements ---
  {
    id: 'achieve-max-strength',
    name: 'Unstoppable Force',
    description: 'Achieve a base Strength of 10.',
    isSpoiler: false,
    reward: { xp: 400 },
    icon: 'Mountain',
    isUnlocked: (char) => char.attributes.strength.value >= 10,
  },
    {
    id: 'achieve-max-intellect',
    name: 'Omniscient',
    description: 'Achieve a base Intellect of 10.',
    isSpoiler: false,
    reward: { xp: 400 },
    icon: 'BrainCircuit',
    isUnlocked: (char) => char.attributes.intellect.value >= 10,
  },
  {
    id: 'achieve-critical-success',
    name: 'Against All Odds',
    description: 'Pass an attribute check with a probability of 10% or less.',
    isSpoiler: false,
    reward: { xp: 300 },
    icon: 'Clover',
    isUnlocked: () => false, // Placeholder
  },
  {
    id: 'achieve-critical-failure',
    name: 'Worst Case Scenario',
    description: 'Experience a critical failure on an attribute check.',
    isSpoiler: true,
    reward: { xp: 50 },
    icon: 'XCircle',
    isUnlocked: () => false, // Placeholder
  },

  // --- More creative/hidden ones ---
  {
    id: 'achieve-eat-weird-thing',
    name: 'Esoteric Tastes',
    description: 'Consume something... not meant for consumption.',
    isSpoiler: true,
    reward: { xp: 100 },
    icon: 'Beaker',
    isUnlocked: () => false,
  },
  {
    id: 'achieve-talk-to-robot',
    name: 'Man and Machine',
    description: 'Hold a conversation with Unit-801.',
    isSpoiler: true,
    reward: { xp: 150 },
    icon: 'Bot',
    isUnlocked: (char) => char.name.includes("Unit-801"), // Simple check if you ARE the robot
  },
  {
    id: 'achieve-ten-failures',
    name: 'Failure is a Teacher',
    description: 'Fail 10 attribute checks in a single playthrough.',
    isSpoiler: false,
    reward: { xp: 200 },
    icon: 'Repeat',
    isUnlocked: () => false,
  },
  {
    id: 'achieve-survive-year',
    name: 'One Year In',
    description: 'Survive for 365 days inside Fort Umbralis.',
    isSpoiler: true,
    reward: { xp: 1000 },
    icon: 'Calendar',
    isUnlocked: () => false,
  },
  {
    id: 'achieve-all-curses',
    name: 'Embracing the Abyss',
    description: 'Suffer from Paranoia, Fatigue, Obsession, and Addiction all at once.',
    isSpoiler: true,
    reward: { xp: 666 },
    icon: 'Biohazard',
    isUnlocked: () => false,
  },
  {
    id: 'achieve-path-of-order',
    name: 'Agent of Order',
    description: 'Unlock the Path of Order.',
    isSpoiler: false,
    reward: { xp: 300 },
    icon: 'Scale',
    isUnlocked: () => false,
  },
  {
    id: 'achieve-path-of-chaos',
    name: 'Agent of Chaos',
    description: 'Unlock the Path of Chaos.',
    isSpoiler: false,
    reward: { xp: 300 },
    icon: 'Shuffle',
    isUnlocked: () => false,
  },
    {
    id: 'achieve-path-of-balance',
    name: 'Agent of Balance',
    description: 'Unlock the Path of Balance.',
    isSpoiler: false,
    reward: { xp: 300 },
    icon: 'Anchor',
    isUnlocked: () => false,
  },
  {
    id: 'achieve-full-party',
    name: 'We Are Legion',
    description: 'Recruit three followers to your cause.',
    isSpoiler: true,
    reward: { xp: 500 },
    icon: 'Users',
    isUnlocked: () => false,
  },
  {
    id: 'achieve-betrayal',
    name: 'Et Tu, Brute?',
    description: 'Betray a trusted ally for your own gain.',
    isSpoiler: true,
    reward: { xp: 150 },
    icon: 'Swords', // A different kind of sword
    isUnlocked: () => false,
  },
  {
    id: 'achieve-animal-friend',
    name: 'Friend to the Cave Dwellers',
    description: 'Befriend a creature of the deep.',
    isSpoiler: true,
    reward: { xp: 100 },
    icon: 'Rat',
    isUnlocked: () => false,
  },
  {
    id: 'achieve-start-riot',
    name: 'The Spark',
    description: 'Incite a prison riot.',
    isSpoiler: true,
    reward: { xp: 700 },
    icon: 'Flame',
    isUnlocked: () => false,
  },
  {
    id: 'achieve-discover-arkars',
    name: 'Echoes of the Past',
    description: 'Uncover the truth about the Arkar civilization.',
    isSpoiler: true,
    reward: { xp: 600 },
    icon: 'Pyramid',
    isUnlocked: () => false,
  },
  {
    id: 'achieve-uncover-conspiracy',
    name: 'The Grand Deception',
    description: "Expose the conspiracy that landed you in prison.",
    isSpoiler: false,
    reward: { xp: 1000 },
    icon: 'EyeOff',
    isUnlocked: () => false,
  },
  {
    id: 'achieve-craft-masterwork',
    name: 'Master Artisan',
    description: 'Craft a masterwork item.',
    isSpoiler: false,
    reward: { xp: 400 },
    icon: 'Hammer',
    isUnlocked: () => false,
  },
  {
    id: 'achieve-survive-poison',
    name: 'Strong Stomach',
    description: 'Survive being poisoned.',
    isSpoiler: true,
    reward: { xp: 100 },
    icon: 'Syringe',
    isUnlocked: () => false,
  },
  {
    id: 'achieve-no-consumables',
    name: 'Living off the Land',
    description: 'Survive 7 days without using any consumable items.',
    isSpoiler: true,
    reward: { xp: 500 },
    icon: 'Leaf',
    isUnlocked: () => false,
  },
  {
    id: 'achieve-map-catacombs',
    name: 'Cartographer',
    description: 'Fully map the Catacombs.',
    isSpoiler: true,
    reward: { xp: 800 },
    icon: 'Map',
    isUnlocked: () => false,
  },
  {
    id: 'achieve-become-champion',
    name: 'Arena Champion',
    description: "Become the champion of the prison's underground fighting pits.",
    isSpoiler: true,
    reward: { xp: 750 },
    icon: 'GanttChartSquare',
    isUnlocked: () => false,
  },
  {
    id: 'achieve-solve-riddle',
    name: 'Riddle Me This',
    description: 'Solve the Sphinx-like riddle of the Forgotten.',
    isSpoiler: true,
    reward: { xp: 500 },
    icon: 'Puzzle',
    isUnlocked: () => false,
  },
  {
    id: 'achieve-one-hit',
    name: 'Glass Cannon',
    description: 'Defeat a powerful enemy in a single blow.',
    isSpoiler: true,
    reward: { xp: 400 },
    icon: 'Bomb',
    isUnlocked: () => false,
  },
  {
    id: 'achieve-no-damage-fight',
    name: 'Untouchable',
    description: 'Win a combat encounter without taking any damage.',
    isSpoiler: true,
    reward: { xp: 600 },
    icon: 'ShieldCheck',
    isUnlocked: () => false,
  },
  {
    id: 'achieve-find-all-currencies',
    name: 'Master of Coin',
    description: 'Hold Kamen, Mračnik, and Prašinske Kovanice at the same time.',
    isSpoiler: false,
    reward: { xp: 250 },
    icon: 'Wallet',
    isUnlocked: (char) => char.kamen > 0 && char.mracnik > 0 && char.prasinskeKovanice > 0,
  },
  {
    id: 'achieve-final-gameover',
    name: 'The End of the Line',
    description: 'Suffer your third and final death. The story of your prisoners is over.',
    isSpoiler: true,
    reward: { xp: 1000 },
    icon: 'Crown',
    isUnlocked: () => false,
  }
];
