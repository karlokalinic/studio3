

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
  },
  attunement: {
    // Nexus Attunement values
    order: number; // 0-100
    chaos: number; // 0-100
    balance: number; // 0-100
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
  // Core Effective Stats
  effectiveStrength: number;
  effectiveIntelligence: number;
  effectiveSpirit: number;
  
  // Combat Stats
  maxHP: number;
  critChance: number;
  critDamage: number;
  dodgeChance: number;
  psionicResistance: number;
  
  // Utility Stats
  carryWeight: number;
  hackingSpeed: number; // Lower is better
  barterBonus: number; // Percentage
  
  // Nexus Stats
  nexusResonance: number; // 0-100, affects mystery abilities

  // Curses & Penalties
  adrenalBurnoutPenalty: number; // A modifier, e.g., 0.9 means 10% reduction
  analysisParalysisChance: number; // Percentage chance to lose a turn
  feedbackLoopDamage: number; // Flat damage on psionic failure
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
