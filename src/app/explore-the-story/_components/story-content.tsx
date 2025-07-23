
'use client';

import Image from 'next/image';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const wikiData = {
  lore: {
    title: 'Core Lore and Setting',
    timeline: 'Year 2387, 200 years after the "Great Disconnection"—a cataclysm that shattered technological networks and opened portals to other dimensions.',
    story: 'Survivors built hybrid civilizations, blending salvaged technology with newfound magic. Players are "Nexus Walkers"—individuals able to travel between different realities and dimensions, acting as explorers, mercenaries, and pioneers.',
    universe: 'The known universe revolves around the Central Nexus System, a hub of stabilized realities. Beyond it lies the Outer Rim, a lawless frontier of 12 systems, and the Void Spaces—treacherous, unstable dimensions that connect everything. For the bravest, the Unknown Sectors await, promising untold riches and unimaginable dangers.'
  },
  factions: {
    title: 'Factions and Political Systems',
    list: [
      { name: 'Solaris Coalition', type: 'Technocratic Republic', values: 'Order, progress, security', structure: 'Elected councils, scientific meritocracy', conflicts: 'Engaged in a cold war with the Abyssal Depths over rare energy sources found only in deep-sea trenches. Views the Void Walkers with suspicion.' },
      { name: 'Abyssal Depths', type: 'Underwater Federation', values: 'Mysticism, tradition, isolation', structure: 'Elder councils, tribal democracy', conflicts: 'Fiercely territorial, they guard their underwater resources and ancient knowledge from what they see as the surface-dwellers\' greed.' },
      { name: 'Sky Citadels', type: 'Aerial City-States', values: 'Freedom, trade, individualism', structure: 'Merchant princes, trade guilds', conflicts: 'Plagued by internal piracy and corporate espionage. They maintain a fragile neutrality in the Solaris-Abyssal conflict, trading with both sides.' },
      { name: 'Void Walkers', type: 'Interdimensional Nomads', values: 'Exploration, knowledge, transcendence', structure: 'Loose confederation, master-apprentice system', conflicts: 'Hunted by other factions for their unique knowledge of the Nexus. Suffer from internal schisms over the ethics of reality manipulation.' },
      { name: 'Neural Collective', type: 'Hive Mind Society', values: 'Unity, efficiency, collective wisdom', structure: 'Distributed consciousness, no traditional leadership', conflicts: 'Its expansionist nature is seen as an existential threat by all individualistic societies, leading to frequent, brutal clashes at its borders.' },
    ]
  },
  progression: {
    title: 'Character Progression',
    description: 'Your character evolves through a complex web of interconnected stats and abilities, divided into two main trees: The Self and Nexus Attunement. Your choices in one tree can have profound impacts on the other, especially in the Convergence Zone where the most powerful abilities lie.',
    self: {
        title: 'The Self (Top-Down Tree)',
        description: 'Represents your character\'s innate physical and mental capabilities. These are your core attributes. Upgrading them provides direct power but also comes with a "Cursed" trait, representing a trade-off for pushing human limits.',
        attributes: [
            { name: 'Strength', description: 'Raw physical power. Affects melee damage, carry capacity, and physical checks. Its curse, Adrenal Burnout, causes a 15% penalty to your Effective Strength when your Fatigue is over 70, representing physical exhaustion.' },
            { name: 'Intelligence', description: 'Cognitive ability and hacking skills. Affects problem-solving, analysis, and your chance to land critical hits. Its curse, Analysis Paralysis, can cause hesitation in critical moments, giving you a chance to lose a turn in combat that increases with your Intelligence but is mitigated by Spirit.' },
            { name: 'Spirit', description: 'Mental fortitude and connection to dimensional energies. Affects willpower, psionic abilities, and bartering. Its curse, Feedback Loop, causes self-inflicted damage on failed psionic checks, with the damage scaling with your Spirit stat.' }
        ]
    },
    attunement: {
        title: 'Nexus Attunement (Bottom-Up Tree)',
        description: 'Represents your character\'s alignment with the fundamental forces of the universe. This tree is about how you choose to interact with the strange energies of the Nexus, unlocking powerful, reality-bending abilities.',
        paths: [
            { name: 'Path of Order', description: 'Embrace logic, technology, and structure. This path focuses on system control, hacking, defensive protocols, and predictable, reliable outcomes.' },
            { name: 'Path of Chaos', description: 'Embrace freedom, entropy, and raw power. This path unlocks abilities related to reality-warping, random status effects, and unpredictable, high-damage strikes.' },
            { name: 'Path of Balance', description: 'Walk the line between creation and destruction. This path unlocks abilities related to symbiosis, healing, environmental control, and maintaining equilibrium in combat.' }
        ]
    },
    convergence: {
        title: 'The Convergence Zone',
        description: 'Where the "Self" and "Nexus Attunement" trees meet. The most powerful abilities are unlocked here by combining high-level attributes from both trees, creating powerful synergistic effects. For example, a high Intelligence character who follows the Path of Order might unlock the ability to summon a "Techno-Golem", while a character with high Spirit on the Path of Balance could unlock "World-Tree Symbiosis".',
    }
  },
  mechanics: {
      title: 'Gameplay Mechanics',
      description: 'Understanding these core systems is key to survival in the Nexus.',
      list: [
          { name: 'Attribute Checks', description: 'Many actions require an attribute check. The game compares your relevant "Effective" stat (e.g., Effective Strength) against a target number. Your effective stat is calculated from your base attribute, modified by your dynamic state (like fatigue or focus), active curses, and the game\'s difficulty setting. For example, your Effective Strength is calculated by: `(Base Strength * Fitness Mod * Fatigue Mod * Adrenal Burnout Penalty) + Enhancements + Difficulty Mod`.' },
          { name: 'State Management', description: 'Your Health, Energy, and Hunger must be managed. Letting them fall too low will result in penalties. Dynamic states like Fatigue and Focus also directly impact your performance, raising or lowering your effective stats for attribute checks. High fatigue, for instance, can drastically reduce your strength, while low focus will impair your intelligence-based actions.' },
          { name: 'Inventory & Items', description: 'Your inventory capacity starts at `3 + floor(Strength / 5)` slots. It can be expanded by finding rare "Slot Expansion Keys". Items are crucial for survival. Consumables can restore health or provide temporary boosts, while Quest Items are needed to advance the story.' },
          { name: 'Narrative Choices', description: 'The story unfolds in the Mission Control panel. Your choices directly impact quest progression, faction reputation, and the narrative itself. There is often no single "right" answer, and consequences may not be immediately obvious.'}
      ]
  }
};

const SectionCard: React.FC<{
  title: string;
  description?: string;
  children?: React.ReactNode;
}> = ({ title, description, children }) => (
  <Card className="bg-card/30 border-primary/20 shadow-lg shadow-primary/10 backdrop-blur-sm mb-8">
    <CardHeader>
      <CardTitle className="font-headline text-2xl text-accent">{title}</CardTitle>
      {description && <p className="text-muted-foreground pt-2">{description}</p>}
    </CardHeader>
    {children && <CardContent>{children}</CardContent>}
  </Card>
);


export default function StoryContent() {
  return (
    <div className="relative isolate overflow-hidden min-h-screen">
       <Image
          src="https://placehold.co/1920x1080.png"
          alt="Cosmic background"
          fill
          objectFit="cover"
          className="-z-10 opacity-20"
          data-ai-hint="nebula stars"
        />
        <div className="container mx-auto px-4 py-16">
            <div className="text-center pt-16">
                <h1 className="font-headline text-4xl font-bold tracking-tight text-primary drop-shadow-[0_0_10px_hsl(var(--primary))] sm:text-6xl">
                Nexus Chronicles Wiki
                </h1>
                <p className="mt-6 text-lg leading-8 text-foreground/80">
                Your comprehensive guide to the shattered worlds.
                </p>
            </div>

            <Separator className="my-12" />

            <Accordion type="multiple" defaultValue={['lore']} className="w-full space-y-8">
                <AccordionItem value="lore" className="border-b-0">
                    <AccordionTrigger className="text-3xl font-headline text-primary hover:no-underline pb-4">
                        {wikiData.lore.title}
                    </AccordionTrigger>
                    <AccordionContent className="pt-4 text-foreground/90 space-y-4 text-base">
                        <p><strong className="text-primary/90">Timeline:</strong> {wikiData.lore.timeline}</p>
                        <p><strong className="text-primary/90">Core Story:</strong> {wikiData.lore.story}</p>
                        <p><strong className="text-primary/90">The Universe:</strong> {wikiData.lore.universe}</p>
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem value="factions" className="border-b-0">
                    <AccordionTrigger className="text-3xl font-headline text-primary hover:no-underline pb-4">
                        {wikiData.factions.title}
                    </AccordionTrigger>
                    <AccordionContent className="pt-4 space-y-4">
                        {wikiData.factions.list.map(faction => (
                            <div key={faction.name} className="p-4 bg-black/20 rounded-lg">
                                <h4 className="font-headline text-lg text-primary">{faction.name} <span className="text-sm font-body font-normal text-muted-foreground">- {faction.type}</span></h4>
                                <p className="text-foreground/90 mt-2"><strong className="text-primary/80">Values:</strong> {faction.values}</p>
                                <p className="text-foreground/90"><strong className="text-primary/80">Structure:</strong> {faction.structure}</p>
                                <p className="text-foreground/90"><strong className="text-primary/80">Conflicts:</strong> {faction.conflicts}</p>
                            </div>
                        ))}
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem value="progression" className="border-b-0">
                    <AccordionTrigger className="text-3xl font-headline text-primary hover:no-underline pb-4">
                        {wikiData.progression.title}
                    </AccordionTrigger>
                    <AccordionContent className="pt-4 space-y-6">
                        <p className="text-lg text-foreground/90">{wikiData.progression.description}</p>
                        <SectionCard title={wikiData.progression.self.title} description={wikiData.progression.self.description}>
                            {wikiData.progression.self.attributes.map(attr => (
                                <p key={attr.name} className="text-foreground/90 mb-2">
                                    <strong className="text-primary/90">{attr.name}:</strong> {attr.description}
                                </p>
                            ))}
                        </SectionCard>
                        <SectionCard title={wikiData.progression.attunement.title} description={wikiData.progression.attunement.description}>
                            {wikiData.progression.attunement.paths.map(path => (
                                <p key={path.name} className="text-foreground/90 mb-2">
                                    <strong className="text-primary/90">{path.name}:</strong> {path.description}
                                </p>
                            ))}
                        </SectionCard>
                        <SectionCard title={wikiData.progression.convergence.title} description={wikiData.progression.convergence.description} />
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem value="mechanics" className="border-b-0">
                    <AccordionTrigger className="text-3xl font-headline text-primary hover:no-underline pb-4">
                        {wikiData.mechanics.title}
                    </AccordionTrigger>
                    <AccordionContent className="pt-4 space-y-4">
                        <p className="text-lg text-foreground/90">{wikiData.mechanics.description}</p>
                        {wikiData.mechanics.list.map(mech => (
                            <div key={mech.name} className="p-4 bg-black/20 rounded-lg">
                                <h4 className="font-headline text-lg text-primary">{mech.name}</h4>
                                <p className="text-foreground/90 mt-2">{mech.description}</p>
                            </div>
                        ))}
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    </div>
  );
}
