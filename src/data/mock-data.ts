
import type { PlayerStats, CharacterProfile, InventoryItem, Quest, WorldLocation, Achievement } from '@/types';

export const playerStats: PlayerStats = {
  vitality: 85,
  stamina: 70,
  sanity: 90,
  kamen: 10,
  mracnik: 1,
  prasinskeKovanice: 0,
  ancientKeys: 1,
};

export const inventoryData: InventoryItem[] = [
  // Weapons
  { id: 'item-rusty-shiv', name: 'Rusty Shiv', type: 'Weapon', value: 2, description: 'A sharpened piece of metal. Better than nothing.', icon: 'Sword', attack: 2, durability: 15, weight: 1, rank: 'Common', position: {x: 0, y: 0}, size: [1, 1] },
  // Armor
  { id: 'item-tattered-rags', name: 'Tattered Rags', type: 'Armor', value: 1, description: 'The threadbare uniform of a prisoner.', icon: 'Shield', defense: 1, durability: 20, weight: 2, rank: 'Common', lore: 'Smells of despair.', position: {x: 1, y: 0}, size: [1, 1] },
  // Potions (Combinable)
  { id: 'item-azure-elixir', name: 'Azure Elixir', type: 'Consumable', value: 25, description: 'A shimmering blue liquid. Cool to the touch.', icon: 'FlaskConical', effect: { sanity: 20 }, rank: 'Uncommon', position: {x: 2, y: 0}, size: [1, 1] },
  { id: 'item-verdant-draught', name: 'Verdant Draught', type: 'Consumable', value: 25, description: 'A thick green liquid. Smells of moss and earth.', icon: 'FlaskConical', effect: { stamina: 20 }, rank: 'Uncommon', position: {x: 3, y: 0}, size: [1, 1] },
  // Tools
  { id: 'item-lockpick-set', name: 'Makeshift Lockpick', type: 'Tool', value: 50, description: 'A bent piece of wire and a small tension wrench.', icon: 'Key', weight: 0.5, rank: 'Uncommon', lore: 'A symbol of hope.', position: {x: 4, y: 0}, size: [1, 1] },
  // Currencies
  { id: 'item-kamen-pile', name: 'Kamen', type: 'Currency', value: 10, description: 'Glowing pebbles used as currency.', icon: 'Gem', weight: 1, position: {x: 5, y: 0}, size: [1, 1] },
  
  // Small Objects
  { id: 'item-chipped-mug', name: 'Chipped Mug', type: 'Junk', value: 0, description: 'A ceramic mug with a piece missing.', icon: 'CookingPot', weight: 1, position: {x: 0, y: 1}, size: [1, 1] },
  { id: 'item-pet-rock', name: 'Pet Rock', type: 'Junk', value: 1, description: 'Someone drew a face on this rock. His name is Horace.', icon: 'Shell', weight: 1.5, lore: 'Horace has seen things.', position: {x: 1, y: 1}, size: [1, 1] },
  { id: 'item-single-boot', name: 'Single Boot', type: 'Junk', value: 0, description: 'A sturdy leather boot. Where is its partner?', icon: 'Aperture', weight: 2, position: {x: 2, y: 1}, size: [1, 1] },
  { id: 'item-mummified-rat', name: 'Mummified Rat', type: 'Junk', value: 1, description: 'A dessicated rat. Surprisingly light.', icon: 'Bone', weight: 0.2, position: {x: 3, y: 1}, size: [1, 1] },
  { id: 'item-arcane-dust', name: 'Arcane Dust', type: 'Material', value: 15, description: 'A pinch of shimmering dust.', icon: 'CircleDot', weight: 0.1, position: {x: 4, y: 1}, size: [1, 1] },
  { id: 'item-cultist-missive', name: 'Cultist Missive', type: 'Quest Item', value: 0, description: 'A sealed letter with a wax emblem of a kraken.', icon: 'Scroll', weight: 0.1, position: {x: 5, y: 1}, size: [1, 1] },

  // More Items
  { id: 'item-splintered-shield', name: 'Splintered Shield', type: 'Armor', value: 5, description: 'A wooden shield, barely holding together.', icon: 'Shield', defense: 2, durability: 10, weight: 5, rank: 'Common', position: {x: 0, y: 2}, size: [1, 1] },
  { id: 'item-moldy-bread', name: 'Moldy Bread', type: 'Consumable', value: 1, description: 'It might be edible. Or it might be poison.', icon: 'HeartPulse', effect: { vitality: 5, sanity: -5 }, rank: 'Common', position: {x: 1, y: 2}, size: [1, 1] },
  { id: 'item-tangled-rope', name: 'Tangled Rope', type: 'Tool', value: 3, description: 'A length of rope, full of knots.', icon: 'Cable', weight: 3, position: {x: 2, y: 2}, size: [1, 1] },
  { id: 'item-sharpening-stone', name: 'Sharpening Stone', type: 'Tool', value: 20, description: 'Can improve a weapon\'s edge.', icon: 'Hammer', weight: 2, rank: 'Uncommon', position: {x: 3, y: 2}, size: [1, 1] },
  { id: 'item-odd-puzzle-box', name: 'Odd Puzzle Box', type: 'Junk', value: 50, description: 'A small wooden box with no visible opening.', icon: 'Puzzle', weight: 1, lore: 'It hums when you aren\'t looking at it.', position: {x: 4, y: 2}, size: [1, 1] },
  { id: 'item-heretic-symbol', name: 'Heretic\'s Symbol', type: 'Quest Item', value: 0, description: 'A crudely carved symbol of a stylized eye.', icon: 'Eye', weight: 0.1, position: {x: 5, y: 2}, size: [1, 1] },
  
  { id: 'item-shimmering-leaf', name: 'Shimmering Leaf', type: 'Material', value: 30, description: 'A leaf from a cave-dwelling plant that glows with its own light.', icon: 'Leaf', weight: 0.1, rank: 'Uncommon', position: {x: 0, y: 3}, size: [1, 1] },
  { id: 'item-weighted-die', name: 'Weighted Die', type: 'Junk', value: 5, description: 'It always seems to land on six.', icon: 'Scale', weight: 0.1, lore: 'Luck is a matter of preparation.', position: {x: 1, y: 3}, size: [1, 1] },
  { id: 'item-spider-silk', name: 'Spider Silk', type: 'Material', value: 20, description: 'Incredibly strong and light.', icon: 'GitBranch', weight: 0.1, rank: 'Uncommon', position: {x: 2, y: 3}, size: [1, 1] },
  { id: 'item-suturing-kit', name: 'Suturing Kit', type: 'Tool', value: 40, description: 'A needle and thread for closing deep wounds.', icon: 'Scissors', weight: 0.5, rank: 'Uncommon', position: {x: 3, y: 3}, size: [1, 1] },
  { id: 'item-crow-feather', name: 'Crow Feather', type: 'Junk', value: 1, description: 'A single, black feather. It feels unnaturally cold.', icon: 'Feather', weight: 0.1, lore: 'A messenger from the world above.', position: {x: 4, y: 3}, size: [1, 1] },
  { id: 'item-guard-key', name: 'Guard\'s Key', type: 'Key', value: 0, description: 'A heavy iron key.', icon: 'KeyRound', weight: 0.5, position: {x: 5, y: 3}, size: [1, 1] },

  // BIG OBJECTS
  { id: 'item-heavy-plank', name: 'Heavy Plank', type: 'Big Object', value: 5, description: 'A long, sturdy wooden plank. Could be used to bridge a gap.', icon: 'ToyBrick', weight: 20, rank: 'Common', position: {x: 0, y: 4}, size: [2, 1] },
  { id: 'item-unstable-golem-core', name: 'Unstable Golem Core', type: 'Big Object', value: 500, description: 'A pulsating core of arcane energy and technology.', icon: 'Bot', weight: 10, rank: 'Epic', lore: 'It seems to be watching you.', position: {x: 2, y: 4}, size: [1, 2] },
];

export const characterData: CharacterProfile = {
  name: "Elysar Valentis",
  level: 1,
  xp: 0,
  inventorySlots: 29,
  vitality: 100,
  stamina: 100,
  sanity: 100,
  currency: 0,
  kamen: 10,
  mracnik: 1,
  prasinskeKovanice: 0,
  ancientKeys: 1,
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
  inventory: inventoryData,
};

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
    isUnlocked: (char, quests) => quests?.some(q => q.id === 'q1-escape') ?? false,
  },
  {
    id: 'achieve-complete-first-quest',
    name: 'The First Step',
    description: "Complete your first quest.",
    isSpoiler: false,
    reward: { xp: 150, currency: 10 },
    icon: 'Milestone',
    isUnlocked: (char, quests) => quests?.some(q => q.id === 'q1-escape' && q.status === 'Completed') ?? false,
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
    isUnlocked: (char) => char.inventorySlots > 2, 
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
