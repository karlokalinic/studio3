
import { characterPresets } from '@/data/character-presets';
import type { CharacterPreset } from '@/data/character-presets';

export type { CharacterPreset };

// A simple utility to clean up input text
const cleanInput = (input: string): string[] => {
    return input
        .toLowerCase()
        .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "") // remove punctuation
        .split(/\s+/) // split into words
        .filter(word => word.length > 2); // remove very short words
};

/**
 * The "synthesis" algorithm. It takes a player's text prompt and finds the best
 * matching character preset based on keyword scoring.
 * @param concept - The player's input string describing their character.
 * @returns The character preset that best matches the input concept.
 */
export function synthesizeCharacter(concept: string): CharacterPreset {
    const inputKeywords = cleanInput(concept);

    if (inputKeywords.length === 0) {
        // If input is empty or just noise, return a random preset
        return characterPresets[Math.floor(Math.random() * characterPresets.length)];
    }

    let bestMatch: CharacterPreset = characterPresets[0];
    let highestScore = -1;

    characterPresets.forEach(preset => {
        let currentScore = 0;
        preset.keywords.forEach(keyword => {
            if (inputKeywords.includes(keyword)) {
                currentScore++;
            }
        });

        // A small bonus for matching the primary archetype for stronger association
        if (inputKeywords.includes(preset.keywords[0])) {
            currentScore += 1;
        }

        if (currentScore > highestScore) {
            highestScore = currentScore;
            bestMatch = preset;
        }
    });
    
    // If no keywords matched at all, fall back to a random preset to ensure variety.
    if (highestScore === 0) {
        return characterPresets[Math.floor(Math.random() * characterPresets.length)];
    }

    return bestMatch;
}
