
import type { CharacterProfile, CalculatedStats } from '@/types';
import type { Difficulty } from '@/context/settings-context';

function getDifficultyModifier(difficulty: Difficulty, isCheckAgainstLowerValue: boolean = false): number {
    // If the goal is to get a LOWER value, we need to invert the modifier's effect.
    // Story-Only should make it easier (a penalty), Ultimate should make it harder (a bonus).
    const modifierMap = {
        'Story-Only': isCheckAgainstLowerValue ? -2 : 2,
        'Easy': isCheckAgainstLowerValue ? -1 : 1,
        'Normal': 0,
        'Hard': isCheckAgainstLowerValue ? 1 : -1,
        'Ultimate': isCheckAgainstLowerValue ? 2 : -2,
    };
    return modifierMap[difficulty] || 0;
}


// Formula to calculate effective strength
function calculateEffectiveStrength(profile: CharacterProfile, difficulty: Difficulty): number {
  const baseStrength = profile.attributes.strength.value;
  const fitnessModifier = (profile.state.fitness.value / 100) * 0.2 + 0.9; // 0.9 to 1.1 multiplier
  const fatigueModifier = 1 - (profile.state.fatigue.value / 100) * 0.5; // Up to 50% reduction

  let enhancementBonus = 0;
  if (profile.enhancements.cybernetics.includes('AdrenalBooster')) {
    enhancementBonus += 5;
  }

  const effectiveStrength = (baseStrength * fitnessModifier * fatigueModifier) + enhancementBonus;
  const finalValue = Math.round(Math.max(1, effectiveStrength)) + getDifficultyModifier(difficulty);

  return finalValue;
}

// Formula to calculate effective intelligence
function calculateEffectiveIntelligence(profile: CharacterProfile, difficulty: Difficulty): number {
  const baseIntelligence = profile.attributes.intelligence.value;
  const clarityModifier = (profile.state.mentalClarity.value / 100) * 0.3 + 0.8; // 0.8 to 1.1 multiplier
  const focusModifier = (profile.state.focus.value / 100) * 0.25 + 0.85; // 0.85 to 1.1 multiplier
  
  let enhancementBonus = 0;
  if (profile.enhancements.cybernetics.includes('NeuralLink V2')) {
    enhancementBonus += 5;
  }

  const effectiveIntelligence = (baseIntelligence * clarityModifier * focusModifier) + enhancementBonus;
  const finalValue = Math.round(Math.max(1, effectiveIntelligence)) + getDifficultyModifier(difficulty);
  return finalValue;
}

// Formula to calculate max HP
function calculateMaxHP(profile: CharacterProfile): number {
  return profile.attributes.hp.value + (profile.level * 10) + (profile.attributes.strength.value * 5);
}

// Formula to calculate critical hit chance
function calculateCritChance(profile: CharacterProfile, difficulty: Difficulty): number {
  const intelligenceFactor = calculateEffectiveIntelligence(profile, difficulty) / 50; 
  const spiritFactor = profile.attributes.spirit.value / 100;
  // Here, a higher number is better, so the normal modifier applies.
  const difficultyMod = getDifficultyModifier(difficulty) / 10; // Crit chance is sensitive, so smaller modifier.

  const baseCrit = (intelligenceFactor * 0.1 + spiritFactor * 0.05) * 100;
  const finalCrit = Math.round(Math.min(100, baseCrit + difficultyMod));
  
  return finalCrit;
}

// Formula to calculate inventory slots
function calculateInventorySlots(profile: CharacterProfile): number {
    return profile.inventorySlots;
}

// Main function to get all calculated stats
export function getCalculatedStats(profile: CharacterProfile, difficulty: Difficulty): CalculatedStats {
  return {
    effectiveStrength: calculateEffectiveStrength(profile, difficulty),
    effectiveIntelligence: calculateEffectiveIntelligence(profile, difficulty),
    maxHP: calculateMaxHP(profile),
    critChance: calculateCritChance(profile, difficulty),
    inventorySlots: calculateInventorySlots(profile),
  };
}
