
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
import { useState } from 'react';
import { useCharacterStore } from '@/stores/use-character-store';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

const sentencingQuestions = [
  {
    id: 'q1',
    text: "An Imperial Inquisitor accuses you of heresy, presenting your own writings as evidence. 'This is treason against the faith,' he snarls. How do you respond?",
    answers: [
      { text: "'My work is not treason. It is the pursuit of truth, something your dogma has long forgotten.'", archetype: 'political' },
      { text: "'This is a misunderstanding. I am a loyal servant of the Empire and the faith.'", archetype: 'laborer' },
      { text: "'The 'truth' you serve is a lie. The darkness whispers a far greater truth than your High Priest could ever comprehend.'", archetype: 'heretic' },
    ],
  },
  {
    id: 'q2',
    text: "During a public riot, a guard captain orders you to fire upon unarmed civilians to restore order. What is your action?",
    answers: [
      { text: 'Refuse the order and report the captain, citing Imperial law and protocol.', archetype: 'political' },
      { text: 'Follow the order, believing that maintaining order, no matter the cost, is your highest duty.', archetype: 'zealot' },
      { text: 'Fire into the air, creating chaos to allow civilians to escape while appearing to follow orders.', archetype: 'heretic' },
    ],
  },
  {
    id: 'q3',
    text: "You discover a starving family has been stealing food from your community's winter stores. What do you do?",
    answers: [
      { text: 'Organize a system of rationing and appeal to the community leaders for a more just distribution.', archetype: 'political' },
      { text: 'Give them a portion of your own rations secretly, risking your own well-being for their survival.', archetype: 'laborer' },
      { text: 'Expose them to the community. The law is the law, and survival depends on everyone following the rules.', archetype: 'zealot' },
    ],
  }
];

const factionOutcomes: Record<string, { name: string; description: string; }> = {
    political: {
        name: 'Upper Blocks',
        description: 'Your sharp mind and sharper tongue have earned you a place among the disgraced elite. Your sentence is to be watched, your ideas contained. You are a political prisoner.',
    },
    laborer: {
        name: 'The Mines',
        description: 'Your misplaced loyalty or quiet compassion was seen as weakness. Your sentence is to be broken by hard labor, your body spent in the service of the prison. You are a common laborer.',
    },
    heretic: {
        name: 'The Catacombs',
        description: 'Your actions defy easy categorization. You are unpredictable, a chaotic element. Your sentence is to be thrown into the forgotten depths, where the insane and desperate dwell. You are a heretic.',
    },
    zealot: {
        name: 'The Cult of Darkness',
        description: "Your unwavering belief in order and sacrifice has not gone unnoticed. You are not seen as a mere prisoner, but as a potential acolyte. Your sentence is an opportunity to prove your faith through suffering.",
    },
};

const SentencingQuestionnaire = () => {
    const router = useRouter();
    const { character, resetCharacter } = useCharacterStore();

    const [answers, setAnswers] = useState<Record<string, string>>({});
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [isFinished, setIsFinished] = useState(false);
    const [outcome, setOutcome] = useState<{name: string, description: string} | null>(null);
    const [showExistingCharacterAlert, setShowExistingCharacterAlert] = useState(false);

    const handleAnswer = (questionId: string, archetype: string) => {
        setAnswers(prev => ({ ...prev, [questionId]: archetype }));
    };

    const handleNext = () => {
        if (currentQuestion < sentencingQuestions.length - 1) {
            setCurrentQuestion(prev => prev + 1);
        } else {
            calculateOutcome();
            setIsFinished(true);
        }
    };

    const calculateOutcome = () => {
        const counts: Record<string, number> = {
            political: 0,
            laborer: 0,
            heretic: 0,
            zealot: 0
        };
        Object.values(answers).forEach(archetype => {
            counts[archetype]++;
        });

        const sortedArchetypes = Object.keys(counts).sort((a, b) => counts[b] - counts[a]);
        const finalArchetype = sortedArchetypes[0];
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
                <h3 className="font-headline text-2xl text-accent">Your Sentence is Passed</h3>
                <p className="text-lg text-muted-foreground">{outcome.description}</p>
                <p className="font-bold text-primary">Your journey begins in... <span className="text-2xl">{outcome.name}</span>.</p>
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

    const question = sentencingQuestions[currentQuestion];

    return (
        <motion.div key={currentQuestion} initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50}} className="space-y-6">
            <p className="text-muted-foreground text-center">Question {currentQuestion + 1} of {sentencingQuestions.length}</p>
            <Card className="bg-black/20 border-primary/10">
                <CardContent className="p-6">
                    <p className="text-lg text-center text-primary">{question.text}</p>
                </CardContent>
            </Card>
            <RadioGroup onValueChange={(value) => handleAnswer(question.id, value)}>
                <div className="space-y-3">
                    {question.answers.map((answer, index) => (
                        <div key={index} className="flex items-center space-x-3 p-4 bg-black/20 rounded-md border border-transparent has-[[data-state=checked]]:border-accent">
                             <RadioGroupItem value={answer.archetype} id={`q${currentQuestion}-a${index}`} />
                             <Label htmlFor={`q${currentQuestion}-a${index}`} className="flex-1 text-base cursor-pointer">{answer.text}</Label>
                        </div>
                    ))}
                </div>
            </RadioGroup>
            <div className="text-center pt-4">
                <Button onClick={handleNext} disabled={!answers[question.id]} className="font-headline">
                    {currentQuestion < sentencingQuestions.length - 1 ? 'Next Question' : 'See Your Judgment'}
                </Button>
            </div>
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
            Sentence Begins
          </h1>
          <p className="mt-6 text-lg leading-8 text-foreground/80">
            Four centuries ago, the Empire built its darkest prison, a monument to despair called Fort Umbralis. Here, a fanatical sect believed that only through profound darkness could the soul be purified. You are its newest resident.
          </p>
        </motion.div>

        <motion.div
          className="mt-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: {delay: 0.5} }}
        >
            <Card className="bg-card/30 border-primary/20 shadow-lg shadow-primary/10 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle className="font-headline text-center text-2xl text-accent">The Sentencing Hearing</CardTitle>
                    <CardDescription className="text-center">Your fate is not yours to choose. It is a reflection of your soul. Answer truthfully.</CardDescription>
                </CardHeader>
                <CardContent>
                    <AnimatePresence mode="wait">
                        <SentencingQuestionnaire />
                    </AnimatePresence>
                </CardContent>
            </Card>
        </motion.div>
      </div>
    </div>
  );
}
