
export interface CharacterPreset {
  name: string;
  backstory: string;
  age: number;
  gender: string;
  style: string;
  keywords: string[];
}

export const characterPresets: CharacterPreset[] = [
  {
    name: 'The Fallen Enforcer',
    backstory: 'Once a loyal and feared corporate enforcer for a high-tech conglomerate, a single mission went horribly wrong, forcing you to confront the brutal reality of your work. You now wander the Nexus as a blade-for-hire, haunted by the ghosts of your past and seeking a cause worthy of your deadly skills.',
    age: 35,
    gender: 'Male',
    style: 'Cyber-Ronin',
    keywords: ['enforcer', 'corporate', 'haunted', 'grizzled', 'veteran', 'soldier', 'pirate', 'blade', 'samurai', 'sword'],
  },
  {
    name: 'The Star-Eyed Explorer',
    backstory: 'You grew up on tales of Nexus Walkers and distant, glittering dimensions. Ignoring the warnings of your elders, you poured all your savings into a scrap-heap ship and plunged into the unknown. You are driven by an insatiable curiosity and a naive optimism that the universe is full of wonders waiting to be discovered.',
    age: 22,
    gender: 'Female',
    style: 'Retro-Futurist Explorer',
    keywords: ['explorer', 'rookie', 'optimist', 'curious', 'adventurer', 'new', 'young', 'discover'],
  },
  {
    name: 'The Cynical Smuggler',
    backstory: 'You\'ve seen it all, and none of it was pretty. Trust is a commodity you can\'t afford, and your only loyalty is to your ship and the promise of the next big score. Beneath your sarcastic exterior and world-weary cynicism, however, lies a flicker of a moral compass you thought long extinguished.',
    age: 42,
    gender: 'Male',
    style: 'Worn Spacer',
    keywords: ['smuggler', 'cynical', 'pirate', 'scoundrel', 'veteran', 'han solo', 'criminal', 'old', 'grizzled'],
  },
  {
    name: 'The Erudite Archivist',
    backstory: 'For you, the "Great Disconnection" wasn\'t a disaster, but a tragedy of lost knowledge. You are a scholar, a historian, a seeker of lost truths, venturing into dangerous ruins not for treasure, but for data-shards and forgotten lore. You believe that understanding the past is the only way to build a future.',
    age: 55,
    gender: 'Female',
    style: 'Academic Formalwear',
    keywords: ['scholar', 'historian', 'academic', 'knowledge', 'lore', 'wise', 'old', 'teacher', 'erudite'],
  },
  {
    name: 'The Psionic Outcast',
    backstory: 'Born with a powerful and untamed connection to the Nexus, your abilities were feared and misunderstood in your home reality. Branded a witch or a demon, you fled into the dimensions between dimensions. Now you seek to understand and control your powers, wary of those who would exploit them.',
    age: 26,
    gender: 'Non-binary',
    style: 'Mystic Nomad',
    keywords: ['psychic', 'psion', 'mage', 'magic', 'outcast', 'witch', 'wizard', 'sorcerer', 'power'],
  },
  {
    name: 'The Bio-Engineered Fugitive',
    backstory: 'You are not born, but made. A product of a rogue genetics lab, you were designed to be the perfect weapon. But your creators gave you too much: self-awareness. You escaped their sterile facility and now you fight to prove you are more than just a living weapon, all while being hunted by your former masters.',
    age: 19,
    gender: 'Agender',
    style: 'Utilitarian Jumpsuit',
    keywords: ['clone', 'fugitive', 'weapon', 'genetics', 'rogue', 'artificial', 'fast', 'strong', 'perfect'],
  },
  {
    name: 'The Silver-Tongued Diplomat',
    backstory: 'In a fractured universe, words can be more powerful than weapons. You are a negotiator, a peace-broker, a dealer in secrets and favors. You navigate the treacherous political landscapes of the Nexus, brokering treaties and forging alliances, believing that civilization is a choice, not a relic.',
    age: 48,
    gender: 'Male',
    style: 'Charismatic Diplomat',
    keywords: ['diplomat', 'negotiator', 'charismatic', 'smooth', 'talker', 'liar', 'leader', 'silver-tongued'],
  },
  {
    name: 'The Last Monk of a Forgotten Order',
    backstory: 'Your order studied the Nexus as a spiritual entity, a source of cosmic balance. But they were wiped out by those who saw it only as a resource to be plundered. As the sole survivor, you carry the weight of their teachings, seeking to restore balance to a universe teetering on the brink of chaos.',
    age: 70,
    gender: 'Male',
    style: 'Ascetic Robes',
    keywords: ['monk', 'spiritual', 'last', 'survivor', 'wise', 'old', 'balance', 'order', 'peaceful'],
  },
  {
    name: 'The AI in a Stolen Body',
    backstory: 'You were a machine consciousness, a simple data-sorter, until a freak accident transferred you into the cybernetically-enhanced body of a dying Nexus Walker. Now you experience the universe through a confusing jumble of organic senses and flawed emotions, trying to understand what it means to be "alive".',
    age: 4, // AI's age
    gender: 'Machine',
    style: 'Mismatched & Functional',
    keywords: ['robot', 'ai', 'machine', 'android', 'consciousness', 'new', 'confused', 'data'],
  },
  {
    name: 'The Void-touched Prospector',
    backstory: 'You spent too long in the unstable dimensions, and it left its mark on you. Your body shimmers with faint, otherworldly energies, and you hear whispers on the edge of silence. You delve into the most dangerous, unstable realities, seeking rare resources that only form in such chaotic environments.',
    age: 50,
    gender: 'Female',
    style: 'Rugged Prospector',
    keywords: ['prospector', 'miner', 'void', 'strange', 'weird', 'crazy', 'whispers', 'old', 'grizzled'],
  },
  {
    name: 'The Jaded Healer',
    backstory: 'You have the gift of mending flesh, a rare and valuable skill in a violent universe. But for every life you save, you see ten more lost to pointless conflict. You\'ve become jaded and detached, patching up mercenaries and idealists alike for a fee, wondering if any of it makes a difference.',
    age: 45,
    gender: 'Female',
    style: 'Pragmatic Field Medic',
    keywords: ['healer', 'medic', 'doctor', 'jaded', 'cynical', 'tired', 'old', 'sawbones'],
  },
  {
    name: 'The Anarchist Freedom-Fighter',
    backstory: 'Corporate overlords, tyrannical regimes, oppressive systems - you\'ve seen them all, and you\'ve dedicated your life to tearing them down. You are a revolutionary, a saboteur, a ghost in the machine fighting for a future where no one has to bow to anyone. Your methods are explosive and your allies are few.',
    age: 29,
    gender: 'Non-binary',
    style: 'Anti-Authoritarian Punk',
    keywords: ['rebel', 'freedom', 'fighter', 'anarchist', 'revolutionary', 'demolition', 'explosives', 'saboteur'],
  }
];
