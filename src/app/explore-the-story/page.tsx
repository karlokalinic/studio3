
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const lore = {
  core: {
    title: 'Core Lore and Setting',
    timeline: 'Year 2387, 200 years after the "Great Disconnection"—a cataclysm that shattered technological networks and opened portals to other dimensions.',
    story: 'Survivors built hybrid civilizations, blending salvaged technology with newfound magic. Players are "Nexus Walkers"—individuals able to travel between different realities and dimensions.',
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
  quests: {
    title: 'Quest Complexity Example: "The Ambassador\'s Daughter"',
    layers: [
      "Find missing diplomat's daughter.",
      "Discover she joined a religious cult voluntarily.",
      "The cult is actually a resistance movement.",
      "The ambassador is secretly funding an oppressive regime.",
      "The daughter is planning the assassination of her own father.",
      "Player must choose between family, justice, politics, and personal safety."
    ],
    outcomes: "16 different endings based on moral choices. 3 secret paths discoverable through investigation. Long-term consequences affect 4 other major questlines and 2 faction relationships."
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

export default function LorePage() {
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
        <div className="text-center">
            <h1 className="font-headline text-4xl font-bold tracking-tight text-primary drop-shadow-[0_0_10px_hsl(var(--primary))] sm:text-6xl">
            The Lore of Nexus Chronicles
            </h1>
            <p className="mt-6 text-lg leading-8 text-foreground/80">
            A deep dive into the systems and narrative pillars of the universe.
            </p>
        </div>

        <Separator className="my-8" />

        <SectionCard title={lore.core.title}>
            <p className="font-bold text-primary/90">Timeline:</p>
            <p className="mb-4">{lore.core.timeline}</p>
            <p className="font-bold text-primary/90">Core Story:</p>
            <p>{lore.core.story}</p>
        </SectionCard>

        <SectionCard title={lore.factions.title}>
            <div className="space-y-4">
            {lore.factions.list.map(faction => (
                <div key={faction.name} className="p-4 bg-black/20 rounded-lg">
                    <h4 className="font-headline text-lg text-primary">{faction.name} <span className="text-sm font-body font-normal">- {faction.type}</span></h4>
                    <p><strong className="text-primary/80">Values:</strong> {faction.values}</p>
                    <p><strong className="text-primary/80">Structure:</strong> {faction.structure}</p>
                    <p><strong className="text-primary/80">Conflicts:</strong> {faction.conflicts}</p>
                </div>
            ))}
            </div>
        </SectionCard>
        
        <SectionCard title={lore.quests.title}>
            <div className="space-y-4">
                <h4 className="font-headline text-lg text-primary/90 mb-2">Quest Layers:</h4>
                <ol className="list-decimal list-inside space-y-2 pl-4">
                    {lore.quests.layers.map((layer, index) => <li key={index}>{layer}</li>)}
                </ol>
                <Separator className="my-6"/>
                <h4 className="font-headline text-lg text-primary/90 mb-2">Expandability & Outcomes:</h4>
                <p>{lore.quests.outcomes}</p>
                <div className="mt-4 p-4 border-l-4 border-accent bg-accent/10">
                    <p className="font-bold text-accent-foreground">Analysis</p>
                    <p className="text-accent-foreground/80">This quest structure is highly expandable. New "layers" can be inserted to extend the investigation, or branches can be added at each decision point. For example, a choice in Layer 5 could lead to a whole new arc dealing with the fallout of the assassination, or preventing it could trigger a civil war within the resistance movement. The modular design allows for near-infinite narrative depth by connecting outcomes to the global faction and reputation systems.</p>
                </div>
            </div>
        </SectionCard>

      </div>
    </div>
  );
}
