

import type { CharacterProfile, CalculatedStats } from '@/types';
import type { Difficulty } from '@/context/settings-context';

/**
 * Provides a gameplay modifier based on the selected difficulty.
 * Can be inverted for checks where a lower value is better.
 * @param difficulty - The current game difficulty.
 * @param isCheckAgainstLowerValue - Inverts the modifier's effect if true.
 * @returns A numerical modifier.
 */
function getDifficultyModifier(difficulty: Difficulty, isCheckAgainstLowerValue: boolean = false): number {
    const valueMap: Record<Difficulty, number> = {
        'Story-Only': 2,
        'Easy': 1,
        'Normal': 0,
        'Hard': -1,
        'Ultimate': -2,
    };
    const modifier = valueMap[difficulty] ?? 0;
    return isCheckAgainstLowerValue ? -modifier : modifier;
}


// --- CURSE CALCULATIONS ---
// These functions determine the penalties from cursed traits.

/**
 * Adrenal Burnout (Curse of Strength)
 * WHY: High strength characters who push their limits should face consequences.
 * HOW: This applies a penalty multiplier to strength-based actions if fatigue is high.
 * It represents the body starting to fail from constant over-exertion.
 */
function calculateAdrenalBurnout(profile: CharacterProfile): number {
    if (profile.state.fatigue.value > 70) {
        // If fatigue is over 70, apply a 15% penalty to strength effectiveness.
        return 0.85; 
    }
    return 1.0; // No penalty
}

/**
 * Analysis Paralysis (Curse of Intelligence)
 * WHY: Extremely high intelligence can lead to overthinking, causing hesitation.
 * HOW: Calculates a percentage chance to "freeze" or lose a turn in combat/puzzles.
 * The chance increases with intelligence but is mitigated by spirit (willpower).
 */
function calculateAnalysisParalysis(profile: CharacterProfile, effectiveIntelligence: number): number {
    const baseChance = (effectiveIntelligence - 15) / 2; // Chance starts increasing after 15 INT
    const mitigation = profile.attributes.spirit.value / 4;
    const finalChance = Math.max(0, baseChance - mitigation);
    return Math.min(25, finalChance); // Cap the chance at 25%
}

/**
 * Feedback Loop (Curse of Spirit)
 * WHY: Channeling immense psionic power should be risky.
 * HOW: Determines the amount of self-inflicted damage on a failed psionic/spirit check.
 * The damage scales with the character's own spirit, representing a powerful but uncontrolled force.
 */
function calculateFeedbackLoopDamage(profile: CharacterProfile): number {
    // For every 5 points in spirit, the backlash damage increases by 2.
    return Math.floor(profile.attributes.spirit.value / 5) * 2;
}

// --- CORE STAT CALCULATIONS ---

function calculateEffectiveStrength(profile: CharacterProfile, difficulty: Difficulty, adrenalBurnoutPenalty: number): number {
  const baseStrength = profile.attributes.strength.value;
  // WHY: Fitness and Fatigue are key real-time modifiers for physical performance.
  const fitnessModifier = (profile.state.fitness.value / 100) * 0.2 + 0.9; // Fitness provides a 10% penalty to 10% bonus.
  const fatigueModifier = 1 - (profile.state.fatigue.value / 100) * 0.5; // Fatigue can reduce effectiveness by up to 50%.

  let enhancementBonus = 0;
  if (profile.enhancements.cybernetics.includes('AdrenalBooster')) {
    enhancementBonus += 5;
  }
  
  // HOW: Base strength is modified by dynamic state, then enhancements, then the curse penalty, and finally difficulty.
  const effectiveStrength = (baseStrength * fitnessModifier * fatigueModifier * adrenalBurnoutPenalty) + enhancementBonus;
  return Math.round(Math.max(1, effectiveStrength)) + getDifficultyModifier(difficulty);
}

function calculateEffectiveIntelligence(profile: CharacterProfile, difficulty: Difficulty): number {
  const baseIntelligence = profile.attributes.intelligence.value;
  // WHY: Mental tasks are affected by clarity and focus.
  const clarityModifier = (profile.state.mentalClarity.value / 100) * 0.3 + 0.8; // Clarity provides a 20% penalty to 10% bonus.
  const focusModifier = (profile.state.focus.value / 100) * 0.25 + 0.85; // Focus provides a 15% penalty to 10% bonus.
  
  let enhancementBonus = 0;
  if (profile.enhancements.cybernetics.includes('NeuralLink V2')) {
    enhancementBonus += 5;
  }
  
  const effectiveIntelligence = (baseIntelligence * clarityModifier * focusModifier) + enhancementBonus;
  return Math.round(Math.max(1, effectiveIntelligence)) + getDifficultyModifier(difficulty);
}

function calculateEffectiveSpirit(profile: CharacterProfile, difficulty: Difficulty): number {
    const baseSpirit = profile.attributes.spirit.value;
    // WHY: Spirit is more innate, but can be slightly influenced by mental state.
    const clarityModifier = (profile.state.mentalClarity.value / 100) * 0.1 + 0.95; // 5% penalty to 5% bonus.
    
    const effectiveSpirit = baseSpirit * clarityModifier;
    return Math.round(Math.max(1, effectiveSpirit)) + getDifficultyModifier(difficulty);
}


// --- SECONDARY & HYBRID STATS ---

function calculateMaxHP(profile: CharacterProfile, effectiveStrength: number): number {
  // WHY: Health is a combination of base vitality (HP attribute), level progression, and physical fortitude (Strength).
  return profile.attributes.hp.value + (profile.level * 10) + (effectiveStrength * 2);
}

function calculateCritChance(profile: CharacterProfile, effInt: number, effSpi: number): number {
  // WHY: Critical hits are about finding weaknesses (Intelligence) and having the will to exploit them (Spirit).
  const intelligenceFactor = effInt / 50; 
  const spiritFactor = effSpi / 100;

  const baseCrit = (intelligenceFactor * 0.1 + spiritFactor * 0.05) * 100;
  return Math.round(Math.min(100, Math.max(0, baseCrit)));
}

function calculateCritDamage(profile: CharacterProfile, effStr: number, effInt: number): number {
    // WHY: Crit damage is about raw power (Strength) and precision (Intelligence).
    // HOW: Base crit damage is 150%. Strength adds raw power, intelligence adds precision.
    const strengthBonus = effStr / 10; // Every 10 strength adds 1% damage.
    const intelligenceBonus = effInt / 20; // Every 20 intelligence adds 1% damage.
    return Math.round(150 + strengthBonus + intelligenceBonus);
}

function calculateDodgeChance(profile: CharacterProfile, effInt: number): number {
    // WHY: Dodging is about recognizing threats (Intelligence) and being physically able to react (Fitness).
    const intelligenceFactor = effInt / 4;
    const fitnessFactor = profile.state.fitness.value / 5;
    return Math.min(50, Math.round(intelligenceFactor + fitnessFactor)); // Cap at 50%
}

function calculatePsionicResistance(profile: CharacterProfile, effSpi: number): number {
    // WHY: Resisting mental attacks is a function of pure willpower (Spirit).
    // HOW: Provides a damage reduction percentage against psionic/magic attacks.
    return Math.min(80, Math.round(effSpi * 0.75)); // Cap at 80%
}

function calculateCarryWeight(effStr: number): number {
    // WHY: Simple formula based on how strong you are.
    return 20 + (effStr * 3);
}

function calculateHackingSpeed(effInt: number, difficulty: Difficulty): number {
    // WHY: Hacking speed should decrease as intelligence increases.
    // HOW: We establish a base time and reduce it with intelligence. Difficulty makes it harder (takes longer).
    const baseTime = 10; // Base seconds
    const intelligenceReduction = Math.log(effInt) * 2;
    // Here, a lower value is better, so the difficulty mod is inverted.
    const difficultyPenalty = getDifficultyModifier(difficulty, true); 
    return Math.max(1, baseTime - intelligenceReduction + difficultyPenalty); // Minimum 1 second.
}

function calculateBarterBonus(effSpi: number): number {
    // WHY: Your force of personality and charm (Spirit) should influence prices.
    return Math.round(effSpi / 4); // Every 4 spirit gives 1% better prices.
}

function calculateInventorySlots(profile: CharacterProfile): number {
    return profile.inventorySlots;
}


// Main function to get all calculated stats
export function getCalculatedStats(profile: CharacterProfile, difficulty: Difficulty): CalculatedStats {
  // First, calculate curses as they may influence effective stats
  const adrenalBurnoutPenalty = calculateAdrenalBurnout(profile);
  
  // Then, calculate core effective stats
  const effectiveStrength = calculateEffectiveStrength(profile, difficulty, adrenalBurnoutPenalty);
  const effectiveIntelligence = calculateEffectiveIntelligence(profile, difficulty);
  const effectiveSpirit = calculateEffectiveSpirit(profile, difficulty);

  // Now, calculate all dependent stats
  const analysisParalysisChance = calculateAnalysisParalysis(profile, effectiveIntelligence);
  const feedbackLoopDamage = calculateFeedbackLoopDamage(profile);

  return {
    effectiveStrength,
    effectiveIntelligence,
    effectiveSpirit,
    adrenalBurnoutPenalty,
    analysisParalysisChance,
    feedbackLoopDamage,
    maxHP: calculateMaxHP(profile, effectiveStrength),
    critChance: calculateCritChance(profile, effectiveIntelligence, effectiveSpirit),
    critDamage: calculateCritDamage(profile, effectiveStrength, effectiveIntelligence),
    dodgeChance: calculateDodgeChance(profile, effectiveIntelligence),
    psionicResistance: calculatePsionicResistance(profile, effectiveSpirit),
    carryWeight: calculateCarryWeight(effectiveStrength),
    hackingSpeed: calculateHackingSpeed(effectiveIntelligence, difficulty),
    barterBonus: calculateBarterBonus(effectiveSpirit),
    inventorySlots: calculateInventorySlots(profile),

    // These are placeholders for more complex systems to be built
    nexusResonance: (profile.attunement.order + profile.attunement.chaos + profile.attunement.balance) / 3,
  };
}
