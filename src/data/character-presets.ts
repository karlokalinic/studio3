
export interface CharacterPreset {
  name: string;
  backstory: string;
  age: number;
  gender: string;
  style: string;
  keywords: string[];
}

// These presets are now themed for Fort Umbralis.
// The core character is Elysar, but these provide variety if the player wants to
// imagine different backstories for their 'new prisoner' after a permadeath.
export const characterPresets: CharacterPreset[] = [
  {
    name: 'Elysar Valentis',
    backstory: 'An esteemed scholar from the city of Lumenor, your relentless pursuit of truth led you to uncover corruption at the highest levels of the Empire. For this, you were sentenced to the lightless depths of Fort Umbralis. Your mind is your only weapon.',
    age: 47,
    gender: 'Male',
    style: 'Tattered Scholar\'s Robes',
    keywords: ['scholar', 'intellectual', 'noble', 'truth', 'corruption', 'writer', 'academic', 'thinker'],
  },
  {
    name: 'The Wrongfully Accused Soldier',
    backstory: 'You were a decorated captain in the Imperial Legion, framed for treason by a rival officer. Stripped of your rank and honor, you were cast into Fort Umbralis to be forgotten. Your knowledge of tactics and discipline are your greatest assets.',
    age: 38,
    gender: 'Male',
    style: 'Remnants of a Uniform',
    keywords: ['soldier', 'captain', 'guard', 'framed', 'treason', 'legion', 'veteran'],
  },
  {
    name: 'The Master Forger',
    backstory: 'Your hands could replicate any seal, any signature. You lived a life of luxury creating documents for the underworld until a client betrayed you. Now, your skills at mimicry and deception are your only hope for survival.',
    age: 52,
    gender: 'Female',
    style: 'Inconspicuous Commoner\'s Garb',
    keywords: ['forger', 'artist', 'criminal', 'thief', 'deception', 'liar', 'imposter'],
  },
  {
    name: 'The Heretical Priest',
    backstory: 'You were a priest of the very cult that governs this prison, but you discovered a truth that contradicted their dogma. Branded a heretic, you were cast down among the souls you once condemned. Your insider knowledge is both a blessing and a curse.',
    age: 60,
    gender: 'Male',
    style: 'Defrocked Priest\'s Vestments',
    keywords: ['priest', 'heretic', 'cultist', 'insider', 'dogma', 'religion', 'faith'],
  },
  {
    name: 'The Cursed Alchemist',
    backstory: 'Your experiments in alchemy breached the veil between worlds, resulting in a catastrophic accident that saw you imprisoned. You understand the strange fungi and minerals of this place better than anyone, but your body is wracked by strange afflictions.',
    age: 41,
    gender: 'Non-binary',
    style: 'Stain-Covered Alchemist\'s Apron',
    keywords: ['alchemist', 'potion', 'cursed', 'science', 'experiment', 'mutant'],
  },
];
