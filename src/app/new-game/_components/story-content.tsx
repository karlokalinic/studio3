
'use client';

import Image from 'next/image';
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
import { useState } from 'react';
import { useCharacterStore } from '@/stores/use-character-store';

const factions = [
  {
    name: 'Upper Blocks',
    description: 'Sentenced for political crimes. Your mind is your greatest asset, but you are under constant, unforgiving surveillance.',
    logoUrl: '/faction-solaris.png',
    dataAiHint: 'golden key logo'
  },
  {
    name: 'The Mines',
    description: 'Sentenced to hard labor. Your body will be tested, but the tunnels hold secrets and rare resources for those strong enough to take them.',
    logoUrl: '/faction-abyssal.png',
    dataAiHint: 'pickaxe logo'
  },
  {
    name: 'The Catacombs',
    description: 'Thrown into the forgotten depths for unspeakable crimes. Sanity is a currency here, and the darkness offers power to those who listen.',
    logoUrl: '/faction-sky.png',
    dataAiHint: 'skull logo dark'
  },
  {
    name: 'The Cult of Darkness',
    description: 'You are not a prisoner, but an acolyte. You have willingly entered Fort Umbralis to serve the shadows and seek purification through suffering.',
    logoUrl: '/faction-void.png',
    dataAiHint: 'tentacle eye logo'
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
    const { character, resetCharacter } = useCharacterStore();
    const [showAlert, setShowAlert] = useState(false);

    const handleNewGame = () => {
        resetCharacter();
        router.push(`/character-creation?faction=${encodeURIComponent(faction.name)}`);
    };

    const handleFactionClick = () => {
        if (character) {
            setShowAlert(true);
        } else {
            handleNewGame();
        }
    };
    
    const FactionCard = () => (
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
    );

    return (
        <AlertDialog open={showAlert} onOpenChange={setShowAlert}>
            <AlertDialogTrigger asChild>
                <div onClick={handleFactionClick}>
                    <FactionCard />
                </div>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                <AlertDialogTitle>Start a New Sentence?</AlertDialogTitle>
                <AlertDialogDescription>
                    You already have a prisoner in Fort Umbralis. Starting over will mean their death, and all progress will be lost. The next prisoner will only inherit rumors of what came before. Are you sure?
                </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleNewGame}>Accept Your Fate</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}

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
      <div className="mx-auto max-w-5xl px-6 py-24 sm:py-32 lg:px-8">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <h1 className="font-headline text-4xl font-bold tracking-tight text-primary drop-shadow-[0_0_10px_hsl(var(--primary))] sm:text-6xl">
            Sentence Begins
          </h1>
          <p className="mt-6 text-lg leading-8 text-foreground/80">
            Four centuries ago, the Empire built its darkest prison, a monument to despair called Fort Umbralis. Here, a fanatical sect believed that only through profound darkness could the soul be purified. You are its newest resident.
          </p>
        </motion.div>

        <motion.div
          className="mt-16 space-y-12"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants}>
            <h2 className="text-center font-headline text-3xl font-bold text-primary mb-8">
              Choose your Starting Block
            </h2>
             <p className="text-center text-muted-foreground mb-8">This will determine your origin. If you have an existing prisoner, they will be lost to the darkness.</p>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              {factions.map((faction) => (
                 <FactionLink key={faction.name} faction={faction} />
              ))}
            </div>
          </motion.div>

        </motion.div>
      </div>
    </div>
  );
}
