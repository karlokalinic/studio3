
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
  howToPlay: {
    title: 'How to Play',
    description: "Welcome, Prisoner. This chronicle will guide you through the oppressive darkness of Fort Umbralis. Survival is not guaranteed.",
    steps: [
      { name: '1. Begin Your Sentence', description: "From the Main Menu, select 'New Prisoner'. This will lead you to choose your starting block within the prison, which defines your background and initial situation." },
      { name: '2. Create Your Prisoner', description: "After choosing your starting block, you will define your character's identity. You can describe your prisoner's concept to get a fitting backstory, then determine their core attributes: Intellect, Strength, and Adaptation." },
      { name: '3. The Tutorial', description: "You will play through a brief, narrative-driven tutorial. This sequence introduces you to the grim reality of the prison, basic checks, and making choices with lasting consequences." },
      { name: '4. The Game Screen', description: "After the tutorial, you'll land on the main game screen. This is your dashboard for survival. Here you will find your Character Profile, Inventory, Mission Control, and Quest Log." },
      { name: '5. Mission Control is Your Story', description: "The most important panel is **Mission Control**. This is where your escape attempt unfolds. You will be presented with narrative text and choices. Clicking a choice will advance the plot and shape your character's desperate journey." },
      { name: '6. Check Your Quests', description: "The **Quest Log**, below Mission Control, tracks your active objectives. This is your only guide in the darkness." },
      { name: '7. Permadeath', description: "Be warned: death in Fort Umbralis is permanent. If your character dies, you must start over with a new prisoner. The only thing that carries over is the rumor of what came before. You have three attempts before it's Game Over." }
    ]
  },
  lore: {
    title: 'The World of Fort Umbralis',
    intro: 'Fort Umbralis is a monumental prison complex built four centuries ago, erected upon ancient ruins. It was designed by a fanatical religious sect who believed that only through absolute darkness and suffering could a soul achieve purity.',
    location: 'Situated in the rocky Morke Sjene mountains, the prison is a place of legend and terror. Beneath its foundations lie the ruins of the Arkar civilization, who were said to perform rituals to subterranean deities.',
    economy: "A closed system thrives in the dark. Prisoners trade with 'Kamen' (glowing pebbles), 'Mračnik' (rare crystals), and 'Prašinske kovanice' (ancient Arkar coins). The guards have their own economy based on information ('Sjene') and supplies ('Zalihe').",
    religion: "The prison is dominated by the 'Kult Tame' (Cult of Darkness), whose members believe in purification through suffering. A smaller, heretical sect, the 'Kult Svjetla' (Cult of Light), reveres the bioluminescent fungi as a source of mental balance.",
  },
  survival: {
    title: 'Survival Mechanics',
    description: 'Surviving in Fort Umbralis is a constant struggle.',
    elements: [
      { name: 'Resources', description: 'Food, water, and light are scarce and often controlled by guards or stronger prisoners. Zagađenje from ancient minerals can cause sickness.' },
      { name: 'Mental Health', description: 'Lack of light, food, sleep, or traumatic events can erode your sanity, leading to paranoia, hallucinations, and potentially fatal actions.' },
      { name: 'Movement', description: "Movement is heavily restricted. Prisoners get one 'Pass' per day to move between zones. Additional movement requires bribery, tools, or risky, unobserved dashes." },
    ]
  },
  factions: {
    title: 'Factions & Inhabitants',
    list: [
      { name: 'The Guard Cult', type: 'Fanatical Wardens', values: 'Purity through suffering, absolute order, secrecy.', conflicts: 'Internally corrupt, with members vying for power by trading information. View prisoners as souls to be broken and purified.' },
      { name: 'Political Prisoners (Upper Blocks)', type: 'The Disgraced Elite', values: 'Intellect, manipulation, preserving the old order.', conflicts: 'View other prisoners with disdain but are a valuable source of information and secrets from the outside world.' },
      { name: 'The Laborers (The Mines)', type: 'The Broken and the Strong', values: 'Survival, physical strength, solidarity.', conflicts: 'Constantly battling harsh conditions and brutal guards. They control the flow of raw resources like Kamen and Mračnik.' },
      { name: 'The Forgotten (The Catacombs)', type: 'The Insane and the Desperate', values: '???', conflicts: 'Driven mad by the darkness, ancient rituals, or both. They are unpredictable, dangerous, but may possess knowledge of the prison\'s deepest secrets.' },
    ]
  },
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
          alt="Dark, oppressive fortress"
          fill
          objectFit="cover"
          className="-z-10 opacity-20"
          data-ai-hint="dark fortress medieval"
        />
        <div className="container mx-auto px-4 py-16">
            <div className="text-center pt-16">
                <h1 className="font-headline text-4xl font-bold tracking-tight text-primary drop-shadow-[0_0_10px_hsl(var(--primary))] sm:text-6xl">
                The Chronicle of Umbralis
                </h1>
                <p className="mt-6 text-lg leading-8 text-foreground/80">
                Your comprehensive guide to the eternal prison.
                </p>
            </div>

            <Separator className="my-12" />

            <Accordion type="multiple" defaultValue={['how-to-play']} className="w-full space-y-8">
                <AccordionItem value="how-to-play" className="border-b-0">
                    <AccordionTrigger className="text-3xl font-headline text-primary hover:no-underline pb-4">
                        {wikiData.howToPlay.title}
                    </AccordionTrigger>
                    <AccordionContent className="pt-4 text-foreground/90 space-y-4 text-base">
                       <p className="text-lg text-muted-foreground">{wikiData.howToPlay.description}</p>
                        <div className="space-y-4 pt-4">
                           {wikiData.howToPlay.steps.map(step => (
                            <div key={step.name} className="p-4 bg-black/20 rounded-lg">
                                <h4 className="font-headline text-lg text-primary">{step.name}</h4>
                                <p className="text-foreground/90 mt-2">{step.description}</p>
                            </div>
                           ))}
                        </div>
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem value="lore" className="border-b-0">
                    <AccordionTrigger className="text-3xl font-headline text-primary hover:no-underline pb-4">
                        {wikiData.lore.title}
                    </AccordionTrigger>
                    <AccordionContent className="pt-4 text-foreground/90 space-y-4 text-base">
                        <p><strong className="text-primary/90">Introduction:</strong> {wikiData.lore.intro}</p>
                        <p><strong className="text-primary/90">Location:</strong> {wikiData.lore.location}</p>
                        <p><strong className="text-primary/90">Economy:</strong> {wikiData.lore.economy}</p>
                        <p><strong className="text-primary/90">Religion:</strong> {wikiData.lore.religion}</p>
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
                                <p className="text-foreground/90"><strong className="text-primary/80">Conflicts:</strong> {faction.conflicts}</p>
                            </div>
                        ))}
                    </AccordionContent>
                </AccordionItem>
                
                 <AccordionItem value="survival" className="border-b-0">
                    <AccordionTrigger className="text-3xl font-headline text-primary hover:no-underline pb-4">
                        {wikiData.survival.title}
                    </AccordionTrigger>
                    <AccordionContent className="pt-4 space-y-4">
                        <p className="text-lg text-foreground/90">{wikiData.survival.description}</p>
                        {wikiData.survival.elements.map(mech => (
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
