
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
 * The "synthesis" algorithm. It takes a faction/origin and finds a
 * matching character preset.
 * @param origin - The character's origin, determined by the psych test.
 * @returns The character preset that best matches the input concept.
 */
export function synthesizeCharacter(origin: string): CharacterPreset {
    const originKeywords = cleanInput(origin);

    const possiblePresets = characterPresets.filter(preset => {
        // Check if any of the preset's keywords match the origin's keywords
        return preset.keywords.some(pk => originKeywords.includes(pk));
    });

    if (possiblePresets.length > 0) {
        // If we found matching presets, return a random one from the filtered list
        return possiblePresets[Math.floor(Math.random() * possiblePresets.length)];
    }

    // If no specific presets match the origin, return a truly random one as a fallback.
    return characterPresets[Math.floor(Math.random() * characterPresets.length)];
}
