
'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from './ui/button';
import { useCharacterStore } from '@/stores/use-character-store';
import { ScrollArea } from './ui/scroll-area';
import { questData, type Quest } from '@/data/mock-data';

const introStory = [
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
            { text: "Fine. Point me in the right direction.", consequence: { type: 'quest_start', questId: 'q1-retrieval', message: "The voice says, 'Good. The less we have to talk, the better. Your mission data is being uploaded now. Don't screw this up.'" } },
            { text: "Who are you? And what makes you think I owe you anything?", consequence: { type: 'reputation_change', faction: 'Unknown', change: -10, message: "A moment of silence. 'The questions you should be asking are about how you're going to survive the next 24 hours without our help. Now, about that job...'" } },
            { text: "[Remain Silent]", consequence: { type: 'nothing', message: "The silence hangs in the air before the voice sighs. 'Playing the strong, silent type? Fine. Wastes my time. A job has been added to your log. Get it done.'" } },
        ]
    }
];

const retrievalQuestStory = {
    id: 'q1-retrieval',
    title: 'Retrieval on Terra Nexus',
    description: "You have a job to do. The package is somewhere in Sector-G. Time is ticking.",
    choices: [
        { text: "Travel to the ruins of Sector-G", consequence: { type: 'progress', questId: 'q1-retrieval', progress: 25, message: "The journey to Terra Nexus is a blur of hyperspace and flickering ship lights. You arrive at the desolate ruins of Sector-G, a graveyard of rusted metal and shattered dreams." }},
        { text: "Check local bounty boards for information", consequence: { type: 'progress', questId: 'q1-retrieval', progress: 5, message: "You find a dusty terminal. Most bounties are for petty thieves, but one catches your eye: 'Inquiry - Fallen Courier - Sector-G - Reward'. Someone else is interested." } },
        { text: "Ask around at the local cantina", consequence: { type: 'progress', questId: 'q1-retrieval', progress: 10, message: "A grizzled spacer scoffs at your questions. 'Sector-G? That's suicide, kid. Courier didn't stand a chance.' He points you in the general direction, for a price." } },
    ]
}

export default function MissionControl() {
    const { addQuest, quests, updateQuestProgress } = useCharacterStore();
    const [history, setHistory] = useState<any[]>([]);
    const [storyStep, setStoryStep] = useState(0);
    const [currentStory, setCurrentStory] = useState<any>(null);
    const hasStartedIntro = useRef(false);

    const scrollAreaRef = useRef<HTMLDivElement>(null);

    const advanceIntroStory = useCallback(() => {
        if (storyStep < introStory.length) {
            setHistory(prev => [...prev, introStory[storyStep]]);
            setStoryStep(prev => prev + 1);
        }
    }, [storyStep]);

     // Auto-scroll to bottom of history
    useEffect(() => {
        if (scrollAreaRef.current) {
            const viewport = scrollAreaRef.current.querySelector('div[data-radix-scroll-area-viewport]');
            if (viewport) {
                viewport.scrollTop = viewport.scrollHeight;
            }
        }
    }, [history]);

    // Decide which story to show
    useEffect(() => {
        const activeRetrievalQuest = quests.find(q => q.id === 'q1-retrieval' && q.status === 'Active');
        if (activeRetrievalQuest) {
            setCurrentStory(retrievalQuestStory);
        } else if (quests.length === 0 && !hasStartedIntro.current) {
            setCurrentStory({ id: 'intro', choices: introStory.find(s => s.type === 'choice')?.options || [] });
            if (storyStep === 0) {
              advanceIntroStory();
            }
        }
    }, [quests, advanceIntroStory, storyStep]);

    // Automatically advance the intro story if the current block is narration
    useEffect(() => {
        const currentBlock = introStory[storyStep];
        if (quests.length === 0 && currentBlock && currentBlock.type === 'narrator') {
            const timer = setTimeout(() => {
                advanceIntroStory();
            }, 2500); // Add a delay for readability
            return () => clearTimeout(timer);
        }
    }, [storyStep, advanceIntroStory, quests]);

    const handleChoice = (option: any) => {
        const choiceEntry = { id: `choice-${Date.now()}`, type: 'player_choice', text: option.text };
        setHistory(prev => [...prev, choiceEntry]);
        
        const { consequence } = option;

        setTimeout(() => {
            const consequenceMessage = { id: `consequence-${Date.now()}`, type: 'narrator', text: consequence.message };
            setHistory(prev => [...prev, consequenceMessage]);

            if (consequence.type === 'quest_start') {
                const questToAdd = questData.find(q => q.id === consequence.questId);
                if(questToAdd && !quests.some(q => q.id === consequence.questId)) {
                    addQuest(questToAdd);
                }
                 const endOfSegment = { id: 'end-intro', type: 'narrator', text: 'The line goes dead. You are left alone with your thoughts and your mission.' };
                 setTimeout(() => setHistory(prev => [...prev, endOfSegment]), 1500);
            }

            if (consequence.type === 'progress') {
                updateQuestProgress(consequence.questId, consequence.progress);
            }

            // For non-quest-starting choices in the intro, we need to re-present the options
            if (currentStory?.id === 'intro' && consequence.type !== 'quest_start') {
                 const finalChoiceBlock = introStory.find(s => s.type === 'choice');
                 if (finalChoiceBlock) {
                    const rePresentChoice = { id: `re-present-${Date.now()}`, type: 're-present-choice', ...finalChoiceBlock };
                    setTimeout(() => setHistory(prev => [...prev, rePresentChoice]), 1500);
                 }
            }

        }, 500);
    }

    const currentBlock = introStory[storyStep];
    const isIntroActive = quests.length === 0 && storyStep < introStory.length && currentStory?.id === 'intro';
    const lastHistoryItem = history[history.length - 1];

    let choiceBlock: any = null;
    if (isIntroActive && currentBlock?.type === 'choice') {
        choiceBlock = currentBlock;
    } else if (lastHistoryItem?.type === 're-present-choice') {
        choiceBlock = lastHistoryItem;
    } else if (currentStory?.id === 'q1-retrieval') {
        choiceBlock = currentStory;
    }


    return (
        <Card className="bg-card/50 border-primary/20 shadow-lg shadow-primary/5 flex flex-col h-[700px] md:h-[600px]">
            <CardHeader>
                <CardTitle className="font-headline text-2xl text-primary">
                     {currentStory?.title || "Mission Control"}
                </CardTitle>
                <CardDescription>
                     {currentStory?.description || "This is your direct line to the unfolding story."}
                </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow overflow-hidden">
                <ScrollArea className="h-full pr-4" ref={scrollAreaRef}>
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
                                {(item.type === 'narrator') && (
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
            {choiceBlock ? (
                <CardFooter className="p-6 pt-4 border-t border-primary/20">
                    <motion.div 
                        key={choiceBlock.id || 'quest-choices'}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="w-full"
                    >
                        <p className="text-center mb-4 font-bold">{choiceBlock.text || "What's your next move?"}</p>
                        <div className="flex flex-col gap-2">
                            {choiceBlock.options ? choiceBlock.options.map((option: any, index: number) => (
                                <Button 
                                    key={index} 
                                    variant="outline"
                                    onClick={() => handleChoice(option)}
                                    className="hover:bg-accent hover:text-accent-foreground transition-colors justify-start text-left h-auto py-3"
                                >
                                    {option.text}
                                </Button>
                            )) : choiceBlock.choices.map((option: any, index: number) => (
                                 <Button 
                                    key={index} 
                                    variant="outline"
                                    onClick={() => handleChoice(option)}
                                    className="hover:bg-accent hover:text-accent-foreground transition-colors justify-start text-left h-auto py-3"
                                >
                                    {option.text}
                                </Button>
                            ))}
                        </div>
                    </motion.div>
                </CardFooter>
            ) : null}
        </Card>
    );
}
