
'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
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
import { useState, useEffect, useCallback } from 'react';
import { useCharacterStore } from '@/stores/use-character-store';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

const psychologicalQuestions = [
    { id: 'q1', prompt: 'Power', optionA: 'Control', optionB: 'Freedom', archetypes: { a: 'zealot', b: 'heretic' } },
    { id: 'q2', prompt: 'Justice', optionA: 'Order', optionB: 'Vengeance', archetypes: { a: 'political', b: 'laborer' } },
    { id: 'q3', prompt: 'Knowledge', optionA: 'Weapon', optionB: 'Sanctuary', archetypes: { a: 'political', b: 'heretic' } },
    { id: 'q4', prompt: 'Survival', optionA: 'The Pack', optionB: 'The Self', archetypes: { a: 'laborer', b: 'political' } },
    { id: 'q5', prompt: 'Suffering', optionA: 'A Test', optionB: 'A Cruelty', archetypes: { a: 'zealot', b: 'laborer' } },
    { id: 'q6', prompt: 'The Past', optionA: 'A Lesson', optionB: 'A Cage', archetypes: { a: 'heretic', b: 'zealot' } },
];

const factionOutcomes: Record<string, { name: string; description: string; }> = {
    political: {
        name: 'Upper Blocks',
        description: 'Your mind is a weapon of logic and manipulation. You see the prison as a chess board. Your sentence is to be watched, your ideas contained. You are a political animal.',
    },
    laborer: {
        name: 'The Mines',
        description: 'You believe in tangible results and the strength of the community. Your sentence is to be broken by hard labor, your body spent in the service of the prison. You are a pragmatist.',
    },
    heretic: {
        name: 'The Catacombs',
        description: 'You value freedom and truth above all, even established order. Your sentence is to be thrown into the forgotten depths, where the insane and desperate dwell. You are an idealist.',
    },
    zealot: {
        name: 'The Cult of Darkness',
        description: "Your unwavering belief in order and sacrifice has not gone unnoticed. You are not seen as a mere prisoner, but as a potential acolyte. Your sentence is an opportunity to prove your faith through suffering.",
    },
     default: {
        name: 'The General Population',
        description: 'Your profile is balanced, adaptable. You are a survivor, belonging to no single creed. This might be your greatest strength, or your most exploitable weakness.'
    }
};

const PsychologicalTest = () => {
    const router = useRouter();
    const { character, resetCharacter } = useCharacterStore();

    const [answers, setAnswers] = useState<Record<string, string>>({});
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [isFinished, setIsFinished] = useState(false);
    const [outcome, setOutcome] = useState<{name: string, description: string} | null>(null);
    const [showExistingCharacterAlert, setShowExistingCharacterAlert] = useState(false);
    const [timeLeft, setTimeLeft] = useState(100);

    const handleAnswer = useCallback((archetype: string) => {
        if (currentQuestionIndex >= psychologicalQuestions.length) return;
        
        const question = psychologicalQuestions[currentQuestionIndex];
        setAnswers(prev => ({ ...prev, [question.id]: archetype }));

        if (currentQuestionIndex < psychologicalQuestions.length - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
            setTimeLeft(100);
        } else {
            calculateOutcome();
            setIsFinished(true);
        }
    }, [currentQuestionIndex]);

     useEffect(() => {
        if (isFinished) return;

        const timer = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 0) {
                   handleAnswer('default'); // Default if time runs out
                   return 100;
                }
                return prev - (100 / 300); // 3 seconds per question
            });
        }, 10);

        return () => clearInterval(timer);
    }, [currentQuestionIndex, isFinished, handleAnswer]);


    const calculateOutcome = () => {
        const counts: Record<string, number> = { political: 0, laborer: 0, heretic: 0, zealot: 0, default: 0 };
        Object.values(answers).forEach(archetype => {
            counts[archetype]++;
        });

        const sortedArchetypes = Object.keys(counts).filter(k => k !== 'default').sort((a, b) => counts[b] - counts[a]);
        const finalArchetype = sortedArchetypes[0] || 'default';
        setOutcome(factionOutcomes[finalArchetype]);
    };

    const startNewGame = () => {
        if (!outcome) return;
        resetCharacter();
        router.push(`/character-creation?faction=${encodeURIComponent(outcome.name)}`);
    }

    const handleBegin = () => {
        if(character) {
            setShowExistingCharacterAlert(true);
        } else {
            startNewGame();
        }
    }
    
    if (isFinished && outcome) {
        return (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center space-y-4">
                <h3 className="font-headline text-2xl text-accent">Psych Profile Complete</h3>
                <p className="text-lg text-muted-foreground">{outcome.description}</p>
                <p className="font-bold text-primary">Your sentence begins in... <span className="text-2xl">{outcome.name}</span>.</p>
                <div className="pt-4">
                    <AlertDialog open={showExistingCharacterAlert} onOpenChange={setShowExistingCharacterAlert}>
                        <AlertDialogTrigger asChild>
                            <Button onClick={handleBegin} className="font-headline text-lg">Accept Your Fate</Button>
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
                            <AlertDialogAction onClick={startNewGame}>Accept Your Fate</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
            </motion.div>
        )
    }

    const question = psychologicalQuestions[currentQuestionIndex];

    return (
        <motion.div 
            key={currentQuestionIndex} 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-6 w-full text-center"
        >
            <p className="text-muted-foreground text-sm">Question {currentQuestionIndex + 1} of {psychologicalQuestions.length}</p>
            <h3 className="text-4xl font-headline text-primary drop-shadow-[0_0_5px_hsl(var(--primary))]">{question.prompt}</h3>
            
            <div className="flex gap-4 justify-center">
                <Button 
                    onClick={() => handleAnswer(question.archetypes.a)}
                    variant="outline"
                    className="font-headline text-xl h-24 w-48 transition-all hover:bg-accent hover:text-accent-foreground hover:scale-105"
                >
                    {question.optionA}
                </Button>
                 <Button 
                    onClick={() => handleAnswer(question.archetypes.b)}
                    variant="outline"
                    className="font-headline text-xl h-24 w-48 transition-all hover:bg-accent hover:text-accent-foreground hover:scale-105"
                >
                    {question.optionB}
                </Button>
            </div>
            <Progress value={timeLeft} className="w-1/2 mx-auto h-1 bg-accent/20 [&>div]:bg-accent" />
        </motion.div>
    )
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
      <div className="mx-auto max-w-3xl px-6 py-24 sm:py-32 lg:px-8">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <h1 className="font-headline text-4xl font-bold tracking-tight text-primary drop-shadow-[0_0_10px_hsl(var(--primary))] sm:text-6xl">
            The Sentencing
          </h1>
          <p className="mt-6 text-lg leading-8 text-foreground/80">
            You stand before the Iron Judge. There is no trial, no jury. Only a psychic inquisition. Your very essence will be weighed, your soul laid bare. Do not think. React. Your fate depends on it.
          </p>
        </motion.div>

        <motion.div
          className="mt-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: {delay: 0.5} }}
        >
            <Card className="bg-card/30 border-primary/20 shadow-lg shadow-primary/10 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle className="font-headline text-center text-2xl text-accent">Psychological Inquisition</CardTitle>
                </CardHeader>
                <CardContent className="min-h-[250px] flex items-center justify-center">
                    <AnimatePresence mode="wait">
                        <PsychologicalTest />
                    </AnimatePresence>
                </CardContent>
            </Card>
        </motion.div>
      </div>
    </div>
  );
}
