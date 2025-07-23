import type { CharacterProfile, CalculatedStats } from '@/types';

// Formula to calculate effective strength
function calculateEffectiveStrength(profile: CharacterProfile): number {
  const baseStrength = profile.attributes.strength;
  const fitnessModifier = (profile.state.fitness / 100) * 0.2 + 0.9; // 0.9 to 1.1 multiplier
  const fatigueModifier = 1 - (profile.state.fatigue / 100) * 0.5; // Up to 50% reduction

  let enhancementBonus = 0;
  if (profile.enhancements.cybernetics.includes('AdrenalBooster')) {
    enhancementBonus += 5;
  }

  const effectiveStrength = Math.round((baseStrength * fitnessModifier * fatigueModifier) + enhancementBonus);
  return Math.max(1, effectiveStrength); // Strength can't be less than 1
}

// Formula to calculate effective intelligence
function calculateEffectiveIntelligence(profile: CharacterProfile): number {
  const baseIntelligence = profile.attributes.intelligence;
  const clarityModifier = (profile.state.mentalClarity / 100) * 0.3 + 0.8; // 0.8 to 1.1 multiplier
  const focusModifier = (profile.state.focus / 100) * 0.25 + 0.85; // 0.85 to 1.1 multiplier
  
  let enhancementBonus = 0;
  if (profile.enhancements.cybernetics.includes('NeuralLink V2')) {
    enhancementBonus += 5;
  }

  const effectiveIntelligence = Math.round((baseIntelligence * clarityModifier * focusModifier) + enhancementBonus);
  return Math.max(1, effectiveIntelligence);
}

// Formula to calculate max HP
function calculateMaxHP(profile: CharacterProfile): number {
  return profile.attributes.hp + (profile.level * 10) + (profile.attributes.strength * 5);
}

// Formula to calculate critical hit chance
function calculateCritChance(profile: CharacterProfile): number {
  const intelligenceFactor = profile.attributes.intelligence / 100; // up to 1.0
  const spiritFactor = profile.attributes.spirit / 150; // up to 0.66
  return Math.round((intelligenceFactor * 0.1 + spiritFactor * 0.05) * 100); // Percentage
}


// Main function to get all calculated stats
export function getCalculatedStats(profile: CharacterProfile): CalculatedStats {
  return {
    effectiveStrength: calculateEffectiveStrength(profile),
    effectiveIntelligence: calculateEffectiveIntelligence(profile),
    maxHP: calculateMaxHP(profile),
    critChance: calculateCritChance(profile),
  };
}
