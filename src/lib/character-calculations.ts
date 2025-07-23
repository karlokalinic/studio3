import type { CharacterProfile, CalculatedStats } from '@/types';

// Formula to calculate effective strength
function calculateEffectiveStrength(profile: CharacterProfile): number {
  const baseStrength = profile.attributes.strength.value;
  const fitnessModifier = (profile.state.fitness.value / 100) * 0.2 + 0.9; // 0.9 to 1.1 multiplier
  const fatigueModifier = 1 - (profile.state.fatigue.value / 100) * 0.5; // Up to 50% reduction

  let enhancementBonus = 0;
  if (profile.enhancements.cybernetics.includes('AdrenalBooster')) {
    enhancementBonus += 5;
  }

  const effectiveStrength = (baseStrength * fitnessModifier * fatigueModifier) + enhancementBonus;
  return Math.round(Math.max(1, effectiveStrength)); // Strength can't be less than 1
}

// Formula to calculate effective intelligence
function calculateEffectiveIntelligence(profile: CharacterProfile): number {
  const baseIntelligence = profile.attributes.intelligence.value;
  const clarityModifier = (profile.state.mentalClarity.value / 100) * 0.3 + 0.8; // 0.8 to 1.1 multiplier
  const focusModifier = (profile.state.focus.value / 100) * 0.25 + 0.85; // 0.85 to 1.1 multiplier
  
  let enhancementBonus = 0;
  if (profile.enhancements.cybernetics.includes('NeuralLink V2')) {
    enhancementBonus += 5;
  }

  const effectiveIntelligence = (baseIntelligence * clarityModifier * focusModifier) + enhancementBonus;
  return Math.round(Math.max(1, effectiveIntelligence));
}

// Formula to calculate max HP
function calculateMaxHP(profile: CharacterProfile): number {
  return profile.attributes.hp.value + (profile.level * 10) + (profile.attributes.strength.value * 5);
}

// Formula to calculate critical hit chance
function calculateCritChance(profile: CharacterProfile): number {
  const intelligenceFactor = calculateEffectiveIntelligence(profile) / 50; 
  const spiritFactor = profile.attributes.spirit.value / 100;
  return Math.round(Math.min(100, (intelligenceFactor * 0.1 + spiritFactor * 0.05) * 100)); // Percentage, capped at 100%
}

// Formula to calculate inventory slots
function calculateInventorySlots(profile: CharacterProfile): number {
    return profile.inventorySlots;
}

// Main function to get all calculated stats
export function getCalculatedStats(profile: CharacterProfile): CalculatedStats {
  return {
    effectiveStrength: calculateEffectiveStrength(profile),
    effectiveIntelligence: calculateEffectiveIntelligence(profile),
    maxHP: calculateMaxHP(profile),
    critChance: calculateCritChance(profile),
    inventorySlots: calculateInventorySlots(profile),
  };
}
