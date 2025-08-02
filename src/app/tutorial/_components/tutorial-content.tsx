

'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useCharacterStore } from '@/stores/use-character-store';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { motion, AnimatePresence } from 'framer-motion';
import { SkipForward, Zap, Shield } from 'lucide-react';
import ActionCheck from './action-check';
import { useSettings, type Difficulty } from '@/context/settings-context';
import DifficultySlider from '@/app/settings/_components/difficulty-slider';

const tutorialScript = [
  {
    type: 'narrator',
    text: "The first thing you notice is the cold. It seeps from the stone floor, through your thin rags, and into your bones. The second is the darkness, absolute and oppressive. A faint, phosphorescent glow from the walls is your only guide.",
  },
  {
    type: 'narrator',
    text: "Before you proceed, you must decide the nature of the path you'll walk. Fort Umbralis is a place of infinite suffering, but your journey can be as forgiving or as brutal as you wish.",
  },
  {
    type: 'difficulty',
    text: "Choose your difficulty. This will affect the challenge you face. This can be changed later in the settings menu, but your first choice echoes in eternity.",
  },
  {
    type: 'narrator',
    text: "Before you stands a heavy, rusted door. It looks like it hasn't been opened in centuries. This is your first test. Your ability to overcome obstacles like this often depends on your character's attributes.",
  },
  {
    type: 'action',
    text: 'Attempt to force the door open.',
    check: 'strength',
    successThreshold: 2,
    isFixedSuccess: true, 
  },
  {
    type: 'narrator',
    text: "With a grunt of effort, you slam your shoulder into the door. The ancient metal groans and gives way! That was a Strength check. Sometimes, fate is on your side. This stat is calculated from your base Strength, but also affected by things like your current fatigue and the difficulty you chose.",
  },
  {
    type: 'narrator',
    text: 'Beyond the door is a dark corridor. At the far end, a single, ancient lever is set into the wall, covered in cryptic symbols. This requires a sharp mind to decipher.',
  },
  {
    type: 'action',
    text: 'Try to decipher the lever\'s mechanism.',
    check: 'intellect',
    successThreshold: 4,
    isFixedSuccess: false, 
  },
  {
    type: 'narrator',
    text: "The symbols swim before your eyes, their logic just out of reach. You pull the lever, and a section of the floor gives way! You tumble into the darkness below. That was an Intellect check, and you failed. Failure is part of the journey. Sometimes, you'll need to find another way, or improve your skills.",
  },
  {
    type: 'narrator',
    text: 'You land in a heap in a lower chamber. The fall has winded you, but you are alive. A ghostly voice echoes in the chamber: "A new soul arrives. The darkness tests all who enter. I can offer you a boon to aid your struggle, but all gifts come with a price."',
  },
    {
    type: 'choice',
    text: "The voice continues, 'I can bolster your body, or fortify your mind. Choose wisely, for this choice is permanent.' Before you, two spectral energies materialize.",
    options: [
      { text: 'Bolster the Body', consequence: { type: 'stat_change', payload: { vitality: 20, sanity: -10 }, message: 'You feel a surge of resilience, but the spiritual intrusion frays your sanity.' } },
      { text: 'Fortify the Mind', consequence: { type: 'stat_change', payload: { vitality: -10, sanity: 20 }, message: 'Your mind feels sharper, a bulwark against the darkness, but your physical form weakens.' } },
    ]
  },
  {
    type: 'narrator',
    text: "The energy fades, leaving you irrevocably changed. Your escape begins now, marked by the choice you just made. Remember that every decision, big or small, can shape your path in Fort Umbralis.",
  },
  {
    type: 'end',
    text: 'Complete Tutorial',
  },
];

const ChoiceConsequence = ({ consequence, onAcknowledged }: { consequence: any, onAcknowledged: () => void }) => {
    return (
        <motion.div
            key="consequence"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="text-center"
        >
            <h3 className="font-headline text-2xl text-accent mb-4">Consequence</h3>
            <p className="text-lg text-muted-foreground mb-2">{consequence.message}</p>
            <div className="flex justify-center gap-4 text-xl font-bold my-4">
                {consequence.payload.vitality !== 0 && (
                    <span className={`flex items-center gap-2 ${consequence.payload.vitality > 0 ? 'text-green-400' : 'text-red-400'}`}>
                        <Shield /> {consequence.payload.vitality > 0 ? '+' : ''}{consequence.payload.vitality} Max Vitality
                    </span>
                )}
                {consequence.payload.sanity !== 0 && (
                     <span className={`flex items-center gap-2 ${consequence.payload.sanity > 0 ? 'text-blue-400' : 'text-red-400'}`}>
                        <Zap /> {consequence.payload.sanity > 0 ? '+' : ''}{consequence.payload.sanity} Max Sanity
                    </span>
                )}
            </div>
            <Button onClick={onAcknowledged} className="mt-6 font-headline">
                Acknowledge and Continue
            </Button>
        </motion.div>
    );
};


export default function TutorialContent() {
  const router = useRouter();
  const { character, hasHydrated, loadCharacter, setCharacter } = useCharacterStore();
  const { settings, setSetting } = useSettings();
  const [step, setStep] = useState(0);
  const [showText, setShowText] = useState(false);
  const [isChecking, setIsChecking] = useState(false);
  const [difficultyFeedback, setDifficultyFeedback] = useState('');
  const [consequence, setConsequence] = useState<any | null>(null);


  useEffect(() => {
    if (!hasHydrated) {
        loadCharacter();
    }
  }, [hasHydrated, loadCharacter]);

  useEffect(() => {
    if (hasHydrated && !character) {
      router.push('/');
    } else if (character) {
      setShowText(true);
    }
  }, [router, character, hasHydrated]);

  const handleNext = useCallback(() => {
    setShowText(false);
    setTimeout(() => {
        if (step < tutorialScript.length - 1) {
            setStep(step + 1);
            setShowText(true);
        }
    }, 300);
  }, [step]);
  
  const startActionCheck = () => {
      setShowText(false);
      setTimeout(() => {
          setIsChecking(true);
      }, 300);
  }

  const onCheckComplete = useCallback(() => {
      setIsChecking(false);
      setTimeout(() => {
        handleNext();
      }, 300);
  }, [handleNext]);

  const handleChoice = (consequenceData: any) => {
    if (consequenceData.type === 'stat_change') {
       setCharacter(char => {
          if (!char) return null;
          return {
            ...char,
            vitality: char.vitality + (consequenceData.payload.vitality || 0),
            sanity: char.sanity + (consequenceData.payload.sanity || 0)
          }
       })
    }
    setConsequence(consequenceData);
    setShowText(false);
  };
  
  const finishTutorial = () => {
      localStorage.setItem('tutorialCompleted', 'true');
      router.push('/game');
  }

  const skipTutorial = () => {
    localStorage.setItem('tutorialCompleted', 'true');
    router.push('/game');
  }

  const handleDifficultyChange = (value: Difficulty) => {
    setSetting('difficulty', value);
    switch(value) {
        case 'Story-Only':
            setDifficultyFeedback("You seek only the narrative. The guards will overlook your transgressions, this time.");
            break;
        case 'Ultimate':
            setDifficultyFeedback("You embrace the true nature of this place. The darkness will show no mercy.");
            break;
        default:
            setDifficultyFeedback('');
    }
  }

  if (!character || !hasHydrated || !settings) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <p className="text-foreground">Loading Prisoner Data...</p>
      </div>
    );
  }
  
  const currentStep = tutorialScript[step];

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center p-4 font-body">
        <div className="absolute top-4 right-4">
            <Button variant="ghost" onClick={skipTutorial}>
                <SkipForward className="mr-2" /> Skip Tutorial
            </Button>
        </div>

      <Card className="w-full max-w-3xl bg-card/50 border-primary/20 shadow-xl shadow-primary/10">
        <CardHeader>
          <CardTitle className="font-headline text-3xl text-primary">Initiation</CardTitle>
          <CardDescription>Your sentence begins now, {character.name}.</CardDescription>
        </CardHeader>
        <CardContent className="min-h-[350px] flex flex-col justify-center items-center text-center space-y-6">
            <AnimatePresence mode="wait">
                {consequence ? (
                    <ChoiceConsequence consequence={consequence} onAcknowledged={() => { setConsequence(null); handleNext(); }} />
                ) : isChecking ? (
                    <motion.div
                        key="action-check"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <ActionCheck 
                            check={currentStep.type === 'action' ? currentStep.check : 'strength'}
                            successThreshold={currentStep.type === 'action' ? currentStep.successThreshold : 0}
                            isFixedSuccess={currentStep.type === 'action' ? currentStep.isFixedSuccess : undefined}
                            onComplete={onCheckComplete}
                        />
                    </motion.div>
                ) : (
                    <motion.div
                        key={step}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.5 }}
                        className="w-full"
                    >
                        {currentStep.type === 'narrator' && (
                            <div>
                                <p className="text-lg leading-relaxed text-foreground/80">{currentStep.text}</p>
                                <Button onClick={handleNext} className="mt-6 font-headline">Continue</Button>
                            </div>
                        )}
                         {currentStep.type === 'difficulty' && (
                            <div className="space-y-4">
                                <p className="text-lg leading-relaxed text-foreground/80">{currentStep.text}</p>
                                <DifficultySlider value={settings.difficulty} onValueChange={handleDifficultyChange} />
                                {difficultyFeedback && <p className="text-sm italic text-accent mt-4">{difficultyFeedback}</p>}
                                <Button onClick={handleNext} className="mt-6 font-headline">Confirm Difficulty</Button>
                            </div>
                        )}
                        {currentStep.type === 'action' && (
                            <div>
                                <p className="text-lg text-foreground/80 mb-4">What do you do?</p>
                                <Button onClick={startActionCheck} className="font-headline text-lg py-6">{currentStep.text}</Button>
                            </div>
                        )}
                        {currentStep.type === 'choice' && (
                           <div>
                                <p className="text-lg leading-relaxed text-foreground/80 mb-6">{currentStep.text}</p>
                                <div className="flex flex-col md:flex-row gap-4 justify-center">
                                {currentStep.options.map((option, index) => (
                                    <Button key={index} onClick={() => handleChoice(option.consequence)} variant="outline" className="font-headline text-lg py-6 flex-1">
                                    {option.text}
                                    </Button>
                                ))}
                                </div>
                            </div>
                        )}
                        {currentStep.type === 'end' && (
                            <div>
                                <p className="text-lg leading-relaxed text-foreground/80">{currentStep.text}</p>
                                <Button onClick={finishTutorial} className="mt-6 font-headline bg-primary text-primary-foreground hover:bg-primary/80">
                                    Begin the Escape
                                </Button>
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </CardContent>
      </Card>
    </div>
  );
}
