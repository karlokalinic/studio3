
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
    name: 'Kaelan Varr',
    backstory: 'A former corporate enforcer for OmniCorp, your hands are stained with the neon-lit sins of a metropolis that chews up ideals and spits out chrome. You were betrayed by your superiors after a "problematic" mission and dumped in the outer rims. Now, you hunt bounties, haunted by the ghosts of your past, your cybernetic eye a constant reminder of the life you left behind.',
    age: 38,
    gender: 'Male',
    style: 'Worn Armored Trench Coat',
    keywords: ['soldier', 'enforcer', 'bounty hunter', 'cyberpunk', 'veteran', 'betrayed'],
  },
  {
    name: 'Dr. Aris Thorne',
    backstory: 'A brilliant xenobotanist, you were part of a deep-space exploration team when your research vessel, The Odyssey, crash-landed on a forgotten jungle planet. The sole survivor, you have spent years adapting to the hostile flora and fauna, using your scientific knowledge not just to survive, but to master the ecosystem. Your goal is to find a way off this rock, but a part of you has grown to love the savage beauty of your new home.',
    age: 45,
    gender: 'Non-binary',
    style: 'Bio-luminescent Lab Coat',
    keywords: ['scientist', 'botanist', 'explorer', 'survivor', 'researcher', 'academic'],
  },
  {
    name: 'Zara "The Whisper" Kylara',
    backstory: 'You were a master thief and information broker in the shadowy underbelly of Neo-Alexandria, known for your ability to extract secrets no one else could. Your network of spies was unparalleled until you stole a data-slate from the wrong person—a shadowy figure known only as "The Architect." Now you\'re on the run, your own network turned against you, with only your wits and a few stolen gadgets to your name.',
    age: 29,
    gender: 'Female',
    style: 'Chameleon Cloak',
    keywords: ['thief', 'spy', 'rogue', 'information broker', 'hacker', 'criminal'],
  },
  {
    name: 'The Oracle of Cygnus X-1',
    backstory: 'Once a revered mystic in a reclusive, space-faring cult, you communed with what you believed to be a cosmic deity dwelling within a black hole. But the "deity" was a parasitic, psychic entity that shattered your mind. Cast out as a mad prophet, you now wander the star-lanes, your fragmented visions both a curse and a source of incredible, unpredictable power.',
    age: 72,
    gender: 'Female',
    style: 'Tattered Mystic Robes',
    keywords: ['mystic', 'psychic', 'prophet', 'cultist', 'oracle', 'heretic'],
  },
  {
    name: 'Subject 734, "Echo"',
    backstory: 'You have no name, only a designation. You are an escapee from a secret psionic amplification project. Your memories are a jumble of sterile labs, painful experiments, and the echoing thoughts of your captors. You are immensely powerful but have little control over your abilities, which flare up under stress. You seek not just freedom, but your own identity.',
    age: 22,
    gender: 'Male',
    style: 'Standard-issue grey jumpsuit',
    keywords: ['psychic', 'experiment', 'escapee', 'amnesiac', 'powerful', 'unstable'],
  },
  {
    name: 'Jax, The Void Smuggler',
    backstory: 'You own a small, heavily-modified freighter, "The Rusty Nebula," and a reputation for taking on jobs no one else will touch. You\'ve smuggled everything from rare alien artifacts to political refugees. You maintain a cynical exterior, but you adhere to a strict personal code. Your latest job went south, leaving you indebted to a dangerous crime syndicate.',
    age: 34,
    gender: 'Male',
    style: 'Grease-stained Captain\'s Jacket',
    keywords: ['smuggler', 'pilot', 'captain', 'criminal', 'rogue', 'scoundrel'],
  },
   {
    name: 'Lyra, The Starchaser',
    backstory: 'Born on a generation ship that never reached its destination, you grew up gazing at star charts and dreaming of worlds you could never visit. You became the ship\'s best pilot, navigating through asteroid fields and cosmic storms. Now, driven by a desperate hope, you\'ve "borrowed" a scout ship to find a habitable planet for your people, a lonely explorer against an infinite void.',
    age: 26,
    gender: 'Female',
    style: 'Well-worn flight suit',
    keywords: ['explorer', 'pilot', 'dreamer', 'navigator', 'optimist', 'adventurer'],
  },
  {
    name: 'Unit-801, The Last Automaton',
    backstory: 'You are the last functioning automaton from a long-dead civilization. Your core programming dictates that you must find the "Celestial Forge" to create a new generation of your kind. You have wandered the galaxy for centuries, a lonely relic of a bygone era, carrying the memories and knowledge of your creators. You struggle to understand the chaotic, emotional species that now dominate the galaxy.',
    age: 978,
    gender: 'N/A',
    style: 'Polished chrome chassis',
    keywords: ['robot', 'android', 'automaton', 'ancient', 'lonely', 'logical'],
  },
   {
    name: 'The Fallen Noble',
    backstory: 'Your family was a rising power in the Galactic Imperium until your rivals orchestrated a scandal that led to your house\'s ruin. Stripped of your titles and wealth, you now live in exile in the grimy lower levels of a city-planet. You are determined to restore your family\'s honor, either by navigating the treacherous political landscape or by seeking revenge.',
    age: 24,
    gender: 'Male',
    style: 'Faded, but high-quality formal wear',
    keywords: ['noble', 'exile', 'revenge', 'political', 'aristocrat', 'fallen'],
  },
  {
    name: 'The Gene-Artist',
    backstory: 'In the bio-bazaars of Xylos, you were celebrated for your ability to sculpt flesh and splice genes to create living works of art. Your controversial methods, however, drew the ire of bio-purist factions who see your work as an abomination. After they destroyed your studio, you now sell your unique skills on the black market, creating bespoke creatures and modifications for wealthy, and often dangerous, clients.',
    age: 51,
    gender: 'Non-binary',
    style: 'An extravagant, ever-changing outfit of living fibers',
    keywords: ['artist', 'geneticist', 'scientist', 'creator', 'bio-hacker', 'controversial'],
  },
  {
    name: 'The Archivist of a Lost Library',
    backstory: 'You were the sworn protector of the Great Library of Polaris, a repository of knowledge from a million worlds. When the library was destroyed in a stellar cataclysm, you escaped with a single data-crystal containing a fragment of its contents. Now you are hunted by those who would use that knowledge for their own ends, and you seek a safe haven to begin the impossible task of rebuilding.',
    age: 153,
    gender: 'Female',
    style: 'Simple, practical robes with many hidden pockets',
    keywords: ['librarian', 'scholar', 'historian', 'protector', 'knowledge', 'ancient'],
  },
   {
    name: 'The Cynical Peacekeeper',
    backstory: 'You served as a peacekeeper in the brutal Corporate Wars, trying to protect civilians caught in the crossfire. You saw too much, and your idealism turned to hardened cynicism. Disgusted with all sides, you left the service and now work as a freelance bodyguard, offering your skills to the highest bidder but secretly trying to protect the innocent when you can.',
    age: 41,
    gender: 'Male',
    style: 'Ballistic Weave Vest over casual clothes',
    keywords: ['peacekeeper', 'guard', 'bodyguard', 'cynic', 'soldier', 'idealist'],
  },
];
