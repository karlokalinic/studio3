
export interface PlayerStats {
  vitality: number;
  stamina: number;
  sanity: number;
  kamen: number;
  mracnik: number;
  prasinskeKovanice: number;
}

export interface Attribute {
  value: number;
  description: string;
}

export interface CharacterProfile {
  name: string;
  level: number;
  xp: number;
  inventorySlots: number;
  vitality: number;
  stamina: number;
  sanity: number;
  kamen: number;
  mracnik: number;
  prasinskeKovanice: number;
  currency: number;
  attributes: {
    intellect: Attribute;
    strength: Attribute;
    adaptation: Attribute;
  };
  state: {
    fatigue: Attribute; 
    hunger: Attribute; 
    focus: Attribute; 
    mentalClarity: Attribute;
  },
  metadata: {
    age: number;
    gender: string;
    orientation: string;
    style: string;
    origin: string;
    backstory: string;
  };
  inventory: InventoryItem[];
}

export interface CalculatedStats {
  effectiveStrength: number;
  effectiveIntellect: number;
  effectiveAdaptation: number;
  maxHP: number;
  inventorySlots: number;
}

export interface InventoryItem {
  id: string;
  name: string;
  type: 'Weapon' | 'Armor' | 'Consumable' | 'Quest Item' | 'Key' | 'Currency';
  value: number;
  description: string;
  nutrition?: number;
  icon: string;
}

export interface WorldLocation {
  id: string;
  name: string;
  faction: string;
  description: string;
  currencyModifier: number;
  position: { top: string; left: string };
}

export interface Quest {
  id:string;
  title: string;
  description: string;
  moralChoice: string;
  outcomes: string;
  status: 'Active' | 'Completed';
  progress: number;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  isSpoiler: boolean;
  reward: {
    xp?: number;
    currency?: number; // Represents 'Kamen'
  };
  icon: string;
  isUnlocked: (character: CharacterProfile, quests: Quest[]) => boolean;
}
