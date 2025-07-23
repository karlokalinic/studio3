
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';

const factions = [
  {
    name: 'Solaris Coalition',
    description: 'A technocratic republic that values order, progress, and security. Governed by elected councils and scientific meritocracy.',
    logoUrl: '/faction-solaris.png',
    dataAiHint: 'sun symbol futuristic'
  },
  {
    name: 'Abyssal Depths',
    description: 'An underwater federation guided by mysticism, tradition, and isolation. Led by elder councils and a form of tribal democracy.',
    logoUrl: '/faction-abyssal.png',
    dataAiHint: 'kraken logo futuristic'
  },
  {
    name: 'Sky Citadels',
    description: 'A collection of aerial city-states built on freedom, trade, and individualism. Ruled by powerful merchant princes and trade guilds.',
    logoUrl: '/faction-sky.png',
    dataAiHint: 'floating castle logo'
  },
  {
    name: 'Void Walkers',
    description: 'Interdimensional nomads who seek knowledge and transcendence. A loose confederation bound by a master-apprentice system.',
    logoUrl: '/faction-void.png',
    dataAiHint: 'galaxy portal logo'
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
    },
  },
};

const AnimatedCard = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <motion.div variants={itemVariants}>
    <Card
      className={`bg-card/30 border-primary/20 shadow-lg shadow-primary/10 backdrop-blur-sm ${className}`}
    >
      {children}
    </Card>
  </motion.div>
);

const FactionLink = ({ faction }: { faction: typeof factions[0] }) => {
    const router = useRouter();
    const [characterExists, setCharacterExists] = useState(false);

    useEffect(() => {
        if (localStorage.getItem('characterProfile')) {
            setCharacterExists(true);
        }
    }, []);

    const handleNewGame = () => {
        localStorage.removeItem('characterProfile');
        localStorage.removeItem('tutorialCompleted');
        router.push(`/character-creation?faction=${encodeURIComponent(faction.name)}`);
    };

    if (characterExists) {
        return (
            <AlertDialog>
                <AlertDialogTrigger asChild>
                     <Card
                        className="bg-card/50 border-primary/10 transition-all hover:border-accent hover:shadow-accent/20 hover:shadow-2xl h-full cursor-pointer"
                        >
                        <CardHeader className="flex flex-row items-center gap-4">
                            <Image
                            src={`https://placehold.co/64x64.png`}
                            alt={`${faction.name} logo`}
                            width={52}
                            height={52}
                            className="rounded-lg bg-black/30 p-1 border border-primary/20"
                            data-ai-hint={faction.dataAiHint}
                            />
                            <div>
                            <CardTitle className="font-headline text-xl text-accent">
                                {faction.name}
                            </CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">{faction.description}</p>
                        </CardContent>
                    </Card>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                    <AlertDialogTitle>Start a New Game?</AlertDialogTitle>
                    <AlertDialogDescription>
                        You already have a character. Starting a new game will delete your existing character and progress. Are you sure you want to continue?
                    </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleNewGame}>Start New Game</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        )
    }

    return (
        <Link href={`/character-creation?faction=${encodeURIComponent(faction.name)}`}>
            <Card
            className="bg-card/50 border-primary/10 transition-all hover:border-accent hover:shadow-accent/20 hover:shadow-2xl h-full"
            >
            <CardHeader className="flex flex-row items-center gap-4">
                <Image
                src={`https://placehold.co/64x64.png`}
                alt={`${faction.name} logo`}
                width={52}
                height={52}
                className="rounded-lg bg-black/30 p-1 border border-primary/20"
                data-ai-hint={faction.dataAiHint}
                />
                <div>
                <CardTitle className="font-headline text-xl text-accent">
                    {faction.name}
                </CardTitle>
                </div>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground">{faction.description}</p>
            </CardContent>
            </Card>
        </Link>
    );
}

export default function StoryContent() {
  return (
    <div className="relative isolate overflow-hidden min-h-screen">
       <Image
          src="https://placehold.co/1920x1080.png"
          alt="Cosmic background"
          layout="fill"
          objectFit="cover"
          className="-z-10 opacity-20"
          data-ai-hint="nebula stars"
        />
      <div className="mx-auto max-w-5xl px-6 py-24 sm:py-32 lg:px-8">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <h1 className="font-headline text-4xl font-bold tracking-tight text-primary drop-shadow-[0_0_10px_hsl(var(--primary))] sm:text-6xl">
            Nexus Chronicles
          </h1>
          <p className="mt-6 text-lg leading-8 text-foreground/80">
            The year is 2387. Two centuries have passed since the "Great
            Disconnection"—a cataclysm that shattered technological networks and
            tore open portals to other dimensions.
          </p>
        </motion.div>

        <motion.div
          className="mt-16 space-y-12"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <AnimatedCard>
            <CardHeader>
              <CardTitle className="font-headline text-accent text-2xl">
                The Dawn of a New Era
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                In the wake of the collapse, survivors built hybrid civilizations,
                blending salvaged technology with newfound magic. From the ashes,
                a new kind of hero was born: the Nexus Walkers. These rare
                individuals possess the unique ability to traverse the chaotic
                pathways between realities, holding the key to the future of a
                fractured universe. They are explorers, mercenaries, and pioneers
                charting the unknown territories of a cosmos reborn.
              </p>
            </CardContent>
          </AnimatedCard>

          <motion.div variants={itemVariants}>
            <h2 className="text-center font-headline text-3xl font-bold text-primary mb-8">
              Choose your Allegiance
            </h2>
             <p className="text-center text-muted-foreground mb-8">This will begin your journey. If you have an existing character, your progress will be overwritten.</p>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              {factions.map((faction) => (
                 <FactionLink key={faction.name} faction={faction} />
              ))}
            </div>
          </motion.div>

          <AnimatedCard>
            <CardHeader>
              <CardTitle className="font-headline text-accent text-2xl">
                The Galactic Structure
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p>
                The known universe revolves around the{' '}
                <strong className="text-primary/90">Central Nexus System</strong>
                , a hub of bustling activity with planets like the sprawling{' '}
                <strong className="text-primary/90">Terra Nexus</strong>, the
                aquatic world of{' '}
                <strong className="text-primary/90">Aqua Nexus</strong>, and the
                resource-rich <strong className="text-primary/90">Geo Nexus</strong>.
              </p>
              <p>
                Beyond lies the{' '}
                <strong className="text-primary/90">Outer Rim</strong>, a lawless
                frontier of 12 systems, and the{' '}
                <strong className="text-primary/90">Void Spaces</strong>—treacherous,
                unstable dimensions that connect everything. For the bravest of
                Nexus Walkers, the{' '}
                <strong className="text-primary/90">Unknown Sectors</strong>{' '}
                await, promising untold riches and unimaginable dangers.
              </p>
            </CardContent>
          </AnimatedCard>
        </motion.div>
      </div>
    </div>
  );
}
