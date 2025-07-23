
'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useCharacterStore } from '@/stores/use-character-store';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { motion, AnimatePresence } from 'framer-motion';
import { SkipForward } from 'lucide-react';
import ActionCheck from './action-check';

const tutorialScript = [
  {
    type: 'narrator',
    text: "The air hums with a strange energy. You feel a disorienting pull, as if reality itself is folding around you. Your memory is a haze, but one thing is clear: you are a Nexus Walker, and you've just arrived in an unknown dimension.",
  },
  {
    type: 'narrator',
    text: "Before you stands a heavy, rusted door. It looks like it hasn't been opened in centuries. This is your first test. Your ability to overcome obstacles like this often depends on your character's attributes.",
  },
  {
    type: 'action',
    text: 'Attempt to force the door open.',
    check: 'strength',
    successThreshold: 10,
    isFixedSuccess: true, // This check will always succeed for the tutorial
  },
  {
    type: 'narrator',
    text: "With a surge of adrenaline, you slam your shoulder into the door. The ancient metal groans and gives way! That was a Strength check. Your 'Effective Strength' was high enough to succeed. This stat is calculated from your base Strength, but also affected by things like your current fitness and fatigue. Always keep an eye on your character's state!",
  },
  {
    type: 'narrator',
    text: 'Beyond the door is a dark corridor. At the far end, a single console flickers with a faint light. As you approach, a holographic challenge appears: a complex cryptographic puzzle. This requires a sharp mind.',
  },
  {
    type: 'action',
    text: 'Try to hack the console.',
    check: 'intelligence',
    successThreshold: 20,
    isFixedSuccess: false, // This check will always fail for the tutorial
  },
  {
    type: 'narrator',
    text: "The symbols swim before your eyes, the logic just out of reach. The console flashes red: 'ACCESS DENIED'. A jolt of psionic feedback rattles your mind. That was an Intelligence check, and you failed. Don't worry, failure is part of the journey. Sometimes, you'll need to find another way, improve your skills, or find equipment to help.",
  },
  {
    type: 'narrator',
    text: 'Suddenly, the console sparks violently and a hidden door slides open nearby, revealing a brightly lit room. It seems your failed attempt triggered a failsafe. A voice echoes from the room: "Interesting... very interesting. Step forward, Walker."',
  },
  {
    type: 'narrator',
    text: 'This concludes your initiation. You have learned the basics of attribute checks. Your real journey is about to begin. The choices you make, the skills you develop, and the paths you walk will shape your destiny in the Nexus.',
  },
  {
    type: 'end',
    text: 'Complete Tutorial',
  },
];

export default function TutorialContent() {
  const router = useRouter();
  const { character, hasHydrated, loadCharacter } = useCharacterStore();
  const [step, setStep] = useState(0);
  const [showText, setShowText] = useState(false);
  const [isChecking, setIsChecking] = useState(false);

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
    }, 300); // Wait for fade-out animation
  }, [step]);
  
  const startActionCheck = () => {
      setShowText(false);
      setTimeout(() => {
          setIsChecking(true);
      }, 300);
  }

  const onCheckComplete = useCallback(() => {
      // First, advance the step logic
      if (step < tutorialScript.length - 1) {
          setStep(prevStep => prevStep + 1);
      }
      
      // Then, transition out of the checking state
      setIsChecking(false);
      
      // Finally, trigger the text fade-in after a short delay for the component to switch
      setTimeout(() => {
          setShowText(true);
      }, 300);
  }, [step]);
  
  const finishTutorial = () => {
      localStorage.setItem('tutorialCompleted', 'true');
      router.push('/');
  }

  const skipTutorial = () => {
    localStorage.setItem('tutorialCompleted', 'true');
    router.push('/');
  }

  if (!character || !hasHydrated) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <p className="text-foreground">Loading Character...</p>
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
          <CardTitle className="font-headline text-3xl text-primary">Initiation Sequence</CardTitle>
          <CardDescription>Your journey begins now, {character.name}.</CardDescription>
        </CardHeader>
        <CardContent className="min-h-[350px] flex flex-col justify-center items-center text-center space-y-6">
            <AnimatePresence mode="wait">
                {isChecking ? (
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
                        {currentStep.type === 'action' && (
                            <div>
                                <p className="text-lg text-foreground/80 mb-4">What do you do?</p>
                                <Button onClick={startActionCheck} className="font-headline text-lg py-6">{currentStep.text}</Button>
                            </div>
                        )}
                        {currentStep.type === 'end' && (
                            <div>
                                <p className="text-lg leading-relaxed text-foreground/80">{currentStep.text}</p>
                                <Button onClick={finishTutorial} className="mt-6 font-headline bg-accent text-accent-foreground hover:bg-accent/80">
                                    Enter the Nexus
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
