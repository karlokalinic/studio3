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
    strength: number;
    intelligence: number;
    spirit: number;
    hp: number;
  };
  metadata: {
    age: number;
    gender: string;
    orientation: string;
    style: string;
    origin: string;
    backstory: string;
  };
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
