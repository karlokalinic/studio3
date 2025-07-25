
export interface CharacterPreset {
  name: string;
  backstory: string;
  age: number;
  gender: string;
  style: string;
  keywords: string[];
}

// Keywords should match archetypes from the psych test: 'political', 'laborer', 'heretic', 'zealot'
export const characterPresets: CharacterPreset[] = [
  {
    name: 'Kaelen Varr',
    backstory: 'A former Imperial Legate, your unwavering enforcement of the law was seen as dogma. After you refused to pardon a well-connected noble for treason, you were framed for heresy by your own superiors. You believe order, at any cost, is what separates civilization from savagery. Now, you must survive a system you once upheld.',
    age: 38,
    gender: 'Male',
    style: 'Worn, but pristine Imperial armor',
    keywords: ['zealot', 'blocks', 'soldier', 'enforcer'],
  },
  {
    name: 'Dr. Aris Thorne',
    backstory: 'A brilliant alchemist, you were accused of heresy after your research into forbidden life-extending elixirs angered the Cult of Darkness. You see the world as a series of equations to be solved and believe truth can only be found by pushing boundaries, no matter how dangerous. You see the prison as just a larger, more complex laboratory.',
    age: 45,
    gender: 'Non-binary',
    style: 'Bio-luminescent-stained robes',
    keywords: ['heretic', 'catacombs', 'scientist', 'researcher'],
  },
  {
    name: 'Zara "The Whisper" Kylara',
    backstory: 'You were a master spy for a powerful merchant guild, until you uncovered a conspiracy involving the Imperial court and the prison itself. You were betrayed and left for dead here. Your only currency is secrets, and your only loyalty is to yourself. You plan to use the prison\'s own shadowy networks against it.',
    age: 29,
    gender: 'Female',
    style: 'Chameleon Cloak',
    keywords: ['political', 'blocks', 'spy', 'rogue'],
  },
  {
    name: 'Grak, The Quarryman',
    backstory: 'You led a miners\' revolt against unsafe conditions demanded by an Imperial overseer. The revolt was crushed, and you were made an example of. You believe in solidarity and protecting the person next to you. Your strength is not just in your arms, but in your unshakeable loyalty to your people.',
    age: 41,
    gender: 'Male',
    style: 'Tattered worker\'s clothes',
    keywords: ['laborer', 'mines', 'rebel', 'strong'],
  },
  {
    name: 'Brother Malachi',
    backstory: 'A former priest of the Cult of Darkness, you began to question the High Priest\'s bloody interpretation of the faith. You preached a forgotten doctrine of redemption through introspection, not just suffering. For this, you were branded a heretic by your own order and cast into the darkness you once worshipped.',
    age: 55,
    gender: 'Male',
    style: 'Tattered Mystic Robes',
    keywords: ['heretic', 'catacombs', 'cultist', 'prophet'],
  },
  {
    name: 'Subject 734, "Echo"',
    backstory: 'You have no name, only a designation. You are an escapee from a secret Imperial project to weaponize psychic children. The experiments left your mind fractured, but powerful. You trust no one and view all authority as a cage to be dismantled.',
    age: 22,
    gender: 'Male',
    style: 'Standard-issue grey jumpsuit',
    keywords: ['heretic', 'catacombs', 'psychic', 'escapee'],
  },
   {
    name: 'Lyra, The Guild Artisan',
    backstory: 'As a skilled forger, you were coerced by a political faction into creating documents that incriminated a rival. When the plot was exposed, you were the one who took the fall. You are a pragmatist who understands that everyone has a price, and every system has a weakness to be exploited.',
    age: 26,
    gender: 'Female',
    style: 'Well-worn leather apron',
    keywords: ['political', 'blocks', 'artisan', 'forger'],
  },
  {
    name: 'Unit-801, The Last Sentinel',
    backstory: 'You are an ancient automaton, a relic of the Arkar civilization that built this place. Your programming dictates that you must protect the "Heart of the Mountain" from the Cultists who defile it. You were captured and have been dormant for centuries, your chrome chassis mistaken for a statue. Now, you have been awakened.',
    age: 978,
    gender: 'N/A',
    style: 'Polished chrome chassis',
    keywords: ['zealot', 'mines', 'robot', 'automaton', 'ancient'],
  },
   {
    name: 'The Fallen Noble',
    backstory: 'Your family was a rising power in the Imperium until your rivals orchestrated a scandal that led to your house\'s ruin. Stripped of your titles and wealth, you were cast into prison on trumped-up charges. You are determined to restore your family\'s honor, and you see the other prisoners as pawns in your quest for revenge and redemption.',
    age: 24,
    gender: 'Male',
    style: 'Faded, but high-quality formal wear',
    keywords: ['political', 'blocks', 'aristocrat', 'exile'],
  },
  {
    name: 'The People\'s Tribune',
    backstory: 'You were an outspoken advocate for the rights of the lower classes in the Imperial capital. Your fiery speeches against the exploitation of workers in the state-run mines earned you powerful enemies. You were charged with sedition and sent to the very mines you fought to reform. Your voice is your weapon, and you intend to start a fire that will burn the system down.',
    age: 33,
    gender: 'Female',
    style: 'Simple, practical clothes, worn with defiance',
    keywords: ['laborer', 'mines', 'rebel', 'leader'],
  },
];
