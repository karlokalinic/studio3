import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import DevCheats from './dev-cheats';

const lore = {
  core: {
    title: 'Core Lore and Setting',
    timeline: 'Year 2387, 200 years after the "Great Disconnection"—a cataclysm that shattered technological networks and opened portals to other dimensions.',
    story: 'Survivors built hybrid civilizations, blending salvaged technology with newfound magic. Players are "Nexus Walkers"—individuals able to travel between different realities and dimensions.',
  },
  attributes: {
    title: 'Complex Attribute System',
    physical: [
      { name: 'Strength', subs: ['Raw Power (lifting)', 'Precise Strength (control)', 'Endurance (long-term)'] },
      { name: 'Agility', subs: ['Reaction Speed', 'Coordination', 'Flexibility', 'Balance'] },
      { name: 'Durability', subs: ['Cardiovascular', 'Muscular', 'Mental', 'Immunological'] },
    ],
    mental: [
        { name: 'Intelligence', subs: ['Logic', 'Creativity', 'Memory', 'Pattern Analysis'] },
        { name: 'Wisdom', subs: ['Intuition', 'Emotional Intelligence', 'Spiritual Awareness'] },
        { name: 'Charisma', subs: ['Leadership', 'Persuasion', 'Intimidation', 'Empathy'] },
    ],
    spiritual: [
        { name: 'Faith', subs: ['Religiosity', 'Philosophical Firmness', 'Moral Compass'] },
        { name: 'Willpower', subs: ['Mental Resistance', 'Concentration', 'Ambition'] },
        { name: 'Insight', subs: ['Cosmic Awareness', 'Foresight', 'Mystical Perception'] },
    ]
  },
  survival: {
    title: 'Survival Systems with Realistic Needs',
    physiological: [
      { name: 'Hydration', details: 'Water quality (polluted/clean/mineral), quantity, regularity' },
      { name: 'Nutrition', details: 'Calories, macronutrients (protein/carbs/fat), micronutrients (vitamins/minerals), freshness' },
      { name: 'Sleep', details: 'Duration, quality, REM cycles, sleep disorders' },
    ],
    psychological: [
      { name: 'Mental Health', details: 'Stress factors, trauma, depression, anxiety' },
      { name: 'Social Needs', details: 'Interaction with NPCs, isolation effects, relationship quality' },
      { name: 'Purpose', details: 'Quest completion satisfaction, moral alignment conflicts' },
    ],
    hygiene: [
      { name: 'Cleanliness', details: 'Skin infection, social penalties' },
      { name: 'Body Temperature', details: 'Hypothermia/Hyperthermia' },
      { name: 'Clothing', details: 'Protection, status, weather appropriate' },
    ]
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

const SubSection: React.FC<{ title: string; children: React.ReactNode }> = ({
  title,
  children,
}) => (
  <div className="mb-4">
    <h4 className="font-headline text-lg text-primary/90 mb-2">{title}</h4>
    <div className="pl-4 border-l-2 border-primary/20 space-y-2">
      {children}
    </div>
  </div>
);

export default function DevDiary() {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="font-headline text-4xl font-bold tracking-tight text-primary drop-shadow-[0_0_10px_hsl(var(--primary))] sm:text-6xl">
          Developer Archives
        </h1>
        <p className="mt-6 text-lg leading-8 text-foreground/80">
          A deep dive into the systems and narrative pillars of Nexus
          Chronicles.
        </p>
      </div>

      <Separator />

      <DevCheats />
      
      <Separator />

      <SectionCard title={lore.core.title}>
        <p className="font-bold">Timeline:</p>
        <p className="text-muted-foreground mb-4">{lore.core.timeline}</p>
        <p className="font-bold">Core Story:</p>
        <p className="text-muted-foreground">{lore.core.story}</p>
      </SectionCard>

      <SectionCard title={lore.attributes.title}>
        <Accordion type="multiple" className="w-full">
          <AccordionItem value="physical">
            <AccordionTrigger className="font-headline text-xl text-primary/90">Physical</AccordionTrigger>
            <AccordionContent className="pt-4">
              {lore.attributes.physical.map(attr => (
                <SubSection key={attr.name} title={attr.name}>
                  <p className="text-muted-foreground">{attr.subs.join(', ')}</p>
                </SubSection>
              ))}
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="mental">
            <AccordionTrigger className="font-headline text-xl text-primary/90">Mental</AccordionTrigger>
            <AccordionContent className="pt-4">
              {lore.attributes.mental.map(attr => (
                <SubSection key={attr.name} title={attr.name}>
                  <p className="text-muted-foreground">{attr.subs.join(', ')}</p>
                </SubSection>
              ))}
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="spiritual">
            <AccordionTrigger className="font-headline text-xl text-primary/90">Spiritual</AccordionTrigger>
            <AccordionContent className="pt-4">
               {lore.attributes.spiritual.map(attr => (
                <SubSection key={attr.name} title={attr.name}>
                  <p className="text-muted-foreground">{attr.subs.join(', ')}</p>
                </SubSection>
              ))}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </SectionCard>

      <SectionCard title={lore.survival.title}>
        <SubSection title="Physiological Needs">
          {lore.survival.physiological.map(need => (
             <p key={need.name} className="text-muted-foreground"><strong>{need.name}:</strong> {need.details}</p>
          ))}
        </SubSection>
         <SubSection title="Psychological Needs">
          {lore.survival.psychological.map(need => (
             <p key={need.name} className="text-muted-foreground"><strong>{need.name}:</strong> {need.details}</p>
          ))}
        </SubSection>
         <SubSection title="Hygiene & Comfort">
          {lore.survival.hygiene.map(need => (
             <p key={need.name} className="text-muted-foreground"><strong>{need.name}:</strong> {need.details}</p>
          ))}
        </SubSection>
      </SectionCard>

      <SectionCard title={lore.factions.title}>
        <div className="space-y-4">
          {lore.factions.list.map(faction => (
            <div key={faction.name} className="p-4 bg-black/20 rounded-lg">
                <h4 className="font-headline text-lg text-primary">{faction.name} <span className="text-sm text-muted-foreground font-body font-normal">- {faction.type}</span></h4>
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
            <ol className="list-decimal list-inside space-y-2 text-muted-foreground pl-4">
                {lore.quests.layers.map((layer, index) => <li key={index}>{layer}</li>)}
            </ol>
            <Separator className="my-6"/>
             <h4 className="font-headline text-lg text-primary/90 mb-2">Expandability & Outcomes:</h4>
             <p className="text-muted-foreground">{lore.quests.outcomes}</p>
             <div className="mt-4 p-4 border-l-4 border-accent bg-accent/10">
                <p className="font-bold text-accent-foreground">Analysis</p>
                <p className="text-accent-foreground/80">This quest structure is highly expandable. New "layers" can be inserted to extend the investigation, or branches can be added at each decision point. For example, a choice in Layer 5 could lead to a whole new arc dealing with the fallout of the assassination, or preventing it could trigger a civil war within the resistance movement. The modular design allows for near-infinite narrative depth by connecting outcomes to the global faction and reputation systems.</p>
             </div>
        </div>
      </SectionCard>

    </div>
  );
}
