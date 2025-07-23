export interface PlayerStats {
  health: number;
  energy: number;
  hunger: number;
  currency: number;
}

export interface CharacterProfile {
  name: string;
  level: number;
  xp: number;
  attributes: {
    // Base attributes
    strength: number;
    intelligence: number;
    spirit: number;
    hp: number;
  };
  state: {
    // Dynamic state values
    fatigue: number; // 0-100
    fitness: number; // 0-100
    focus: number; // 0-100
    mentalClarity: number; // 0-100
  },
  enhancements: {
    cybernetics: string[];
    implants: string[];
  }
  metadata: {
    age: number;
    gender: string;
    orientation: string;
    style: string;
    origin: string;
    backstory: string;
  };
}

export interface CalculatedStats {
  effectiveStrength: number;
  effectiveIntelligence: number;
  maxHP: number;
  critChance: number;
}

export interface InventoryItem {
  id: string;
  name: string;
  type: 'Weapon' | 'Armor' | 'Consumable' | 'Quest Item';
  value: number;
  description: string;
  nutrition?: number;
  icon: React.ElementType;
}

export interface WorldLocation {
  id: string;
  name: string;
  faction: string;
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
}
