
import type { CharacterProfile, CalculatedStats } from '@/types';
import type { Difficulty } from '@/context/settings-context';

function getDifficultyModifier(difficulty: Difficulty): number {
    const valueMap: Record<Difficulty, number> = {
        'Story-Only': 2,
        'Easy': 1,
        'Normal': 0,
        'Hard': -1,
        'Ultimate': -2,
    };
    return valueMap[difficulty] ?? 0;
}

function calculateEffectiveStrength(profile: CharacterProfile, difficulty: Difficulty): number {
  const baseStrength = profile.attributes.strength.value;
  const fatigueModifier = 1 - (profile.state.fatigue.value / 100) * 0.5; // Fatigue can reduce effectiveness by up to 50%.
  
  const effectiveStrength = baseStrength * fatigueModifier;
  return Math.round(Math.max(1, effectiveStrength)) + getDifficultyModifier(difficulty);
}

function calculateEffectiveIntellect(profile: CharacterProfile, difficulty: Difficulty): number {
  const baseIntellect = profile.attributes.intellect.value;
  const focusModifier = (profile.state.focus.value / 100) * 0.25 + 0.85; // Focus provides a 15% penalty to 10% bonus.
  
  const effectiveIntellect = (baseIntellect * focusModifier);
  return Math.round(Math.max(1, effectiveIntellect)) + getDifficultyModifier(difficulty);
}

function calculateEffectiveAdaptation(profile: CharacterProfile, difficulty: Difficulty): number {
    // Adaptation is a raw D6 roll, but difficulty can provide a bonus or penalty.
    return profile.attributes.adaptation.value + getDifficultyModifier(difficulty);
}

function calculateMaxHP(profile: CharacterProfile, effectiveStrength: number): number {
  return 100 + (profile.level * 5) + (effectiveStrength * 5);
}

// Main function to get all calculated stats
export function getCalculatedStats(profile: CharacterProfile, difficulty: Difficulty): CalculatedStats {
  const effectiveStrength = calculateEffectiveStrength(profile, difficulty);
  const effectiveIntellect = calculateEffectiveIntellect(profile, difficulty);
  const effectiveAdaptation = calculateEffectiveAdaptation(profile, difficulty);

  return {
    effectiveStrength,
    effectiveIntellect,
    effectiveAdaptation,
    maxHP: calculateMaxHP(profile, effectiveStrength),
    inventorySlots: profile.inventorySlots,
  };
}
