
'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from './ui/button';
import { useCharacterStore } from '@/stores/use-character-store';
import { ScrollArea } from './ui/scroll-area';

const story = [
    {
        id: 1,
        type: 'narrator',
        text: "You awaken with a gasp. The sterile, metallic tang of the room fills your nostrils. Your head throbs, a dull ache that echoes the void in your memory. A single flickering light illuminates a small, sparse room. This is your new reality.",
    },
    {
        id: 2,
        type: 'narrator',
        text: "The choice you made during your initiation... it feels like a lifetime ago. A disembodied voice crackles through a hidden speaker. 'Subject awake. Vitals are... stable. Welcome back to the world, Walker.' The voice is cold, detached.",
    },
    {
        id: 3,
        type: 'narrator',
        text: "The voice continues, 'We pulled you from the brink. Your little dimensional hop went sideways. You owe us. Big time. There's a situation on Terra Nexus. A simple retrieval job. A chance to start paying your debt.'",
    },
     {
        id: 4,
        type: 'choice',
        text: "How do you respond?",
        options: [
            { text: "Fine. Point me in the right direction.", consequence: { type: 'quest_start', questId: 'q1-retrieval' } },
            { text: "Who are you? And what makes you think I owe you anything?", consequence: { type: 'reputation_change', faction: 'Unknown', change: -10 } },
            { text: "[Remain Silent]", consequence: { type: 'nothing' } },
        ]
    }
];

const initialQuest = { 
    id: 'q1-retrieval', 
    title: 'The Retrieval', 
    status: 'Active', 
    progress: 0, 
    description: 'Retrieve the package from the fallen courier in the ruins of Terra Nexus Sector-G.', 
    moralChoice: 'The contents of the package are unknown. Do you deliver it sealed, or investigate first?',
    outcomes: 'Your employer values discretion, but knowledge is power.'
};


export default function MissionControl() {
    const [currentStep, setCurrentStep] = useState(0);
    const [history, setHistory] = useState<any[]>([]);
    const { addQuest } = useCharacterStore();

    useEffect(() => {
        // Add the first narrator block to history on mount
        if (history.length === 0 && story[0]?.type === 'narrator') {
            setHistory([story[0]]);
            setCurrentStep(1);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleChoice = (option: any) => {
        // Add user choice to history
        const choiceEntry = { id: `choice-${Date.now()}`, type: 'player_choice', text: option.text };
        
        // Handle consequence
        if(option.consequence.type === 'quest_start') {
            addQuest(initialQuest);
        }
        
        // Move to the next story block if it exists
        const nextStep = currentStep < story.length ? story[currentStep] : null;

        if (nextStep) {
            setHistory(prev => [...prev, choiceEntry, nextStep]);
            setCurrentStep(prev => prev + 1);
        } else {
             setHistory(prev => [...prev, choiceEntry, { id: 'end', type: 'narrator', text: 'The line goes dead. You are left alone with your thoughts and your mission.' }]);
        }
    }

    const currentBlock = story[currentStep];

    return (
        <Card className="bg-card/50 border-primary/20 shadow-lg shadow-primary/5 flex flex-col h-[600px]">
            <CardHeader>
                <CardTitle className="font-headline text-2xl text-primary">Mission Control</CardTitle>
                <CardDescription>This is your direct line to the unfolding story.</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow overflow-hidden">
                <ScrollArea className="h-full pr-4">
                     <div className="space-y-4">
                        <AnimatePresence>
                        {history.map((item) => (
                            <motion.div
                                key={item.id}
                                layout
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                {item.type === 'narrator' && (
                                     <p className="text-muted-foreground italic">"{item.text}"</p>
                                )}
                                {item.type === 'player_choice' && (
                                     <p className="text-right font-bold text-accent">-- {item.text}</p>
                                )}
                            </motion.div>
                        ))}
                         </AnimatePresence>
                    </div>
                </ScrollArea>
            </CardContent>
            {currentBlock?.type === 'choice' && (
                <CardFooter className="p-6 pt-4 border-t border-primary/20">
                    <div className="w-full">
                        <p className="text-center mb-4 font-bold">{currentBlock.text}</p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {currentBlock.options.map((option: any, index: number) => (
                                <Button 
                                    key={index} 
                                    variant="outline"
                                    onClick={() => handleChoice(option)}
                                    className="hover:bg-accent hover:text-accent-foreground transition-colors"
                                >
                                    {option.text}
                                </Button>
                            ))}
                        </div>
                    </div>
                </CardFooter>
            )}
        </Card>
    );
}
