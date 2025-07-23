
'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from './ui/button';
import { useCharacterStore } from '@/stores/use-character-store';
import { ScrollArea } from './ui/scroll-area';
import { questData } from '@/data/mock-data';

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

export default function MissionControl() {
    const { addQuest, quests } = useCharacterStore();
    const [history, setHistory] = useState<any[]>([]);
    const [storyStep, setStoryStep] = useState(0);

    const advanceStory = useCallback(() => {
        if (storyStep < story.length) {
            setHistory(prev => [...prev, story[storyStep]]);
            setStoryStep(prev => prev + 1);
        }
    }, [storyStep]);

    useEffect(() => {
        // Automatically advance the story if the current block is narration
        const currentBlock = story[storyStep];
        if (currentBlock && currentBlock.type === 'narrator') {
            const timer = setTimeout(() => {
                advanceStory();
            }, 1500); // Add a delay for readability
            return () => clearTimeout(timer);
        }
    }, [storyStep, advanceStory]);
    
    // Start story if no quests are active
    useEffect(() => {
        if (quests.length === 0 && history.length === 0) {
            advanceStory();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [quests]);

    const handleChoice = (option: any) => {
        // Add user choice to history
        const choiceEntry = { id: `choice-${Date.now()}`, type: 'player_choice', text: option.text };
        setHistory(prev => [...prev, choiceEntry]);

        // Handle consequence
        if (option.consequence.type === 'quest_start') {
            const questToAdd = questData.find(q => q.id === option.consequence.questId);
            if(questToAdd) {
                addQuest(questToAdd);
            }
        }
        
        // Add a concluding remark and end this story segment
        const endOfSegment = { id: 'end', type: 'narrator', text: 'The line goes dead. You are left alone with your thoughts and your mission.' };
        setHistory(prev => [...prev, endOfSegment]);
        setStoryStep(story.length); // Mark story as complete
    }

    const currentBlock = story[storyStep];

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
                        {history.map((item, index) => (
                            <motion.div
                                key={`${item.id}-${index}`}
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
