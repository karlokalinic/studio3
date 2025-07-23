
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
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
    story: 'Survivors built hybrid civilizations, blending salvaged technology with newfound magic. Players are "Nexus Walkers"—individuals able to travel between different realities and dimensions.',
    universe: 'The known universe revolves around the Central Nexus System, with beyond it the Outer Rim, Void Spaces and Unknown Sectors.'
  },
  factions: {
    title: 'Factions and Political Systems',
    list: [
      { name: 'Solaris Coalition', type: 'Technocratic Republic', values: 'Order, progress, security', structure: 'Elected councils, scientific meritocracy', conflicts: 'With Abyssal Depths over resources' },
      { name: 'Abyssal Depths', type: 'Underwater Federation', values: 'Mysticism, tradition, isolation', structure: 'Elder councils, tribal democracy', conflicts: 'Territorial disputes with surface civilizations' },
      { name: 'Sky Citadels', type: 'Aerial City-States', values: 'Freedom, trade, individualism', structure: 'Merchant princes, trade guilds', conflicts: 'Piracy, resource competition' },
      { name: 'Void Walkers', type: 'Interdimensional Nomads', values: 'Exploration, knowledge, transcendence', structure: 'Loose confederation, master-apprentice system', conflicts: 'Hunted by other factions, internal philosophy disputes' },
      { name: 'Neural Collective', type: 'Hive Mind Society', values: 'Unity, efficiency, collective wisdom', structure: 'Distributed consciousness, no traditional leadership', conflicts: 'Ideological opposition with individualistic groups' },
    ]
  },
  progression: {
    title: 'Character Progression',
    description: 'Your character evolves through a complex web of interconnected stats and abilities, divided into two main trees: The Self and Nexus Attunement.',
    self: {
        title: 'The Self (Top-Down Tree)',
        description: 'Represents your character\'s innate physical and mental capabilities. Upgrading these core attributes often comes with a "Cursed" trait, representing a trade-off.',
        attributes: [
            { name: 'Strength', description: 'Raw physical power. Affects melee damage, carry capacity, and physical checks. Its curse, Adrenal Burnout, can cause penalties when fatigued.' },
            { name: 'Intelligence', description: 'Cognitive ability and hacking skills. Affects problem-solving and analysis. Its curse, Analysis Paralysis, can cause hesitation in critical moments.' },
            { name: 'Spirit', description: 'Mental fortitude and connection to dimensional energies. Affects willpower and psionic abilities. Its curse, Feedback Loop, can cause self-inflicted damage on failed checks.' }
        ]
    },
    attunement: {
        title: 'Nexus Attunement (Bottom-Up Tree)',
        description: 'Represents your character\'s alignment with the fundamental forces of the universe.',
        paths: [
            { name: 'Path of Order', description: 'Embrace logic, technology, and structure. Unlocks abilities related to hacking, defense, and system control.' },
            { name: 'Path of Chaos', description: 'Embrace freedom, entropy, and raw power. Unlocks abilities related to reality-warping, random status effects, and unpredictable strikes.' },
            { name: 'Path of Balance', description: 'Walk the line between creation and destruction. Unlocks abilities related to symbiosis, healing, and environmental control.' }
        ]
    },
    convergence: {
        title: 'The Convergence Zone',
        description: 'Where the "Self" and "Nexus Attunement" trees meet. The most powerful abilities are unlocked here by combining attributes from both trees, such as summoning a Techno-Golem (Intelligence + Order) or unleashing a Singularity Breach (Self + Nexus).',
    }
  },
  mechanics: {
      title: 'Gameplay Mechanics',
      description: 'Understanding these core systems is key to survival in the Nexus.',
      list: [
          { name: 'Attribute Checks', description: 'Many actions require an attribute check. The game compares your relevant "Effective" stat (e.g., Effective Strength) against a target number. Your effective stat is calculated from your base attribute, modified by your dynamic state (like fatigue or focus), active curses, and the game\'s difficulty setting.' },
          { name: 'State Management', description: 'Your Health, Energy, and Hunger must be managed. Letting them fall too low will result in penalties. Dynamic states like Fatigue and Focus also directly impact your performance, raising or lowering your effective stats for attribute checks.' },
          { name: 'Inventory & Items', description: 'Your inventory capacity is determined by your Strength. Items are crucial for survival. Consumables can restore health or provide temporary boosts, while Quest Items are needed to advance the story. Keys can be used to unlock more inventory slots.' },
          { name: 'Narrative Choices', description: 'The story unfolds in the Mission Control panel. Your choices directly impact quest progression, faction reputation, and the narrative itself. There is often no single "right" answer.'}
      ]
  }
};

const SectionCard: React.FC<{
  title: string;
  description?: string;
  children: React.ReactNode;
}> = ({ title, description, children }) => (
  <Card className="bg-card/30 border-primary/20 shadow-lg shadow-primary/10 backdrop-blur-sm mb-8">
    <CardHeader>
      <CardTitle className="font-headline text-2xl text-accent">{title}</CardTitle>
      {description && <CardDescription>{description}</CardDescription>}
    </CardHeader>
    <CardContent>{children}</CardContent>
  </Card>
);

export default function WikiPage() {
  return (
    <div className="min-h-screen bg-background text-foreground font-body">
      <div className="absolute top-4 left-4 z-10">
        <Button asChild variant="outline" className="border-accent text-accent hover:bg-accent hover:text-accent-foreground transition-all">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Main Menu
          </Link>
        </Button>
      </div>
      <div className="container mx-auto px-4 py-16">
        <div className="text-center pt-16">
            <h1 className="font-headline text-4xl font-bold tracking-tight text-primary drop-shadow-[0_0_10px_hsl(var(--primary))] sm:text-6xl">
            Nexus Chronicles Wiki
            </h1>
            <p className="mt-6 text-lg leading-8 text-foreground/80">
            Your comprehensive guide to the shattered worlds.
            </p>
        </div>

        <Separator className="my-8" />

        <Accordion type="multiple" defaultValue={['lore']} className="w-full space-y-8">
            <AccordionItem value="lore">
                <AccordionTrigger className="text-3xl font-headline text-primary hover:no-underline">
                    {wikiData.lore.title}
                </AccordionTrigger>
                <AccordionContent className="pt-4 text-foreground/90 space-y-4">
                    <p><strong className="text-primary/90">Timeline:</strong> {wikiData.lore.timeline}</p>
                    <p><strong className="text-primary/90">Core Story:</strong> {wikiData.lore.story}</p>
                    <p><strong className="text-primary/90">The Universe:</strong> {wikiData.lore.universe}</p>
                </AccordionContent>
            </AccordionItem>

            <AccordionItem value="factions">
                <AccordionTrigger className="text-3xl font-headline text-primary hover:no-underline">
                    {wikiData.factions.title}
                </AccordionTrigger>
                <AccordionContent className="pt-4 space-y-4">
                     {wikiData.factions.list.map(faction => (
                        <div key={faction.name} className="p-4 bg-black/20 rounded-lg">
                            <h4 className="font-headline text-lg text-primary">{faction.name} <span className="text-sm font-body font-normal">- {faction.type}</span></h4>
                            <p className="text-foreground/90"><strong className="text-primary/80">Values:</strong> {faction.values}</p>
                            <p className="text-foreground/90"><strong className="text-primary/80">Structure:</strong> {faction.structure}</p>
                            <p className="text-foreground/90"><strong className="text-primary/80">Conflicts:</strong> {faction.conflicts}</p>
                        </div>
                    ))}
                </AccordionContent>
            </AccordionItem>

             <AccordionItem value="progression">
                <AccordionTrigger className="text-3xl font-headline text-primary hover:no-underline">
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

             <AccordionItem value="mechanics">
                <AccordionTrigger className="text-3xl font-headline text-primary hover:no-underline">
                    {wikiData.mechanics.title}
                </AccordionTrigger>
                <AccordionContent className="pt-4 space-y-4">
                    <p className="text-lg text-foreground/90">{wikiData.mechanics.description}</p>
                    {wikiData.mechanics.list.map(mech => (
                        <div key={mech.name} className="p-4 bg-black/20 rounded-lg">
                            <h4 className="font-headline text-lg text-primary">{mech.name}</h4>
                            <p className="text-foreground/90">{mech.description}</p>
                        </div>
                    ))}
                </AccordionContent>
            </AccordionItem>

        </Accordion>

      </div>
    </div>
  );
}
