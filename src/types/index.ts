

export interface PlayerStats {
  health: number;
  energy: number;
  hunger: number;
  currency: number;
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
  health: number;
  energy: number;
  hunger: number;
  currency: number;
  attributes: {
    // Base attributes
    strength: Attribute;
    intelligence: Attribute;
    spirit: Attribute;
    hp: Attribute;
  };
  state: {
    // Dynamic state values
    fatigue: Attribute; 
    fitness: Attribute; 
    focus: Attribute; 
    mentalClarity: Attribute;
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
  inventorySlots: number;
}

export interface InventoryItem {
  id: string;
  name: string;
  type: 'Weapon' | 'Armor' | 'Consumable' | 'Quest Item' | 'Key';
  value: number;
  description: string;
  nutrition?: number;
  icon: React.ElementType;
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
