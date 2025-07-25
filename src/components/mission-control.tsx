
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
        text: "You awaken with a start, not from a gentle slumber, but from a cold, dreamless void. The air is thick with the smell of damp stone and despair. Your head throbs. This is not your study in Lumenor. This is a cage.",
    },
    {
        id: 2,
        type: 'narrator',
        text: "A grating sound echoes from the hallway. A guard, his face obscured by a grotesque iron mask, slides a wooden bowl through a slot in your cell door. 'Nourishment,' he grunts, his voice devoid of any warmth. 'The faithful provide.'",
    },
    {
        id: 3,
        type: 'narrator',
        text: "He lingers for a moment. 'The High Priest himself decreed your sentence. To be forgotten in the dark, where your heretical truths can't poison the Empire. Your first task is simple: survive the night.'",
    },
     {
        id: 4,
        type: 'choice',
        text: "How do you respond to the guard?",
        options: [
            { text: "[Say Nothing]. Stare back in defiance.", consequence: { type: 'reputation_change', faction: 'Cult of Darkness', change: -5, message: "The guard scoffs at your silence. 'Another proud one. The darkness will break you soon enough.' He turns and walks away, his heavy boots echoing down the corridor." } },
            { text: "'What is this place? Where am I?'", consequence: { type: 'nothing', message: "He laughs, a harsh, grating sound. 'This is your tomb. This is Fort Umbralis. The only name you need to know.' He slams the slot shut." } },
            { text: "'The High Priest is a corrupt traitor. His lies will be exposed.'", consequence: { type: 'quest_start', questId: 'q1-escape', message: "The guard stiffens. 'Careful, scholar. Words are weapons here, but they cut both ways.' He seems to consider you for a moment. 'Your first quest has been noted in your chronicle. Perhaps you'll need more than words to see it through.'" } },
        ]
    }
];

const escapeQuestStory = {
    id: 'q1-escape',
    title: 'The First Step',
    description: "You have a goal: escape. The first step is to acquire a tool. Without one, the deeper passages are inaccessible.",
    choices: [
        { text: "Examine the cracks in your cell wall for loose stones.", consequence: { type: 'progress', questId: 'q1-escape', progress: 5, message: "Hours of careful work yield a handful of 'Kamen', the glowing pebbles used as currency. A start." }},
        { text: "Attempt to listen to the guards' patrol patterns.", consequence: { type: 'progress', questId: 'q1-escape', progress: 10, message: "You discern a pattern, a brief window where the western corridor is unobserved. A potential opportunity." } },
        { text: "Try to communicate with the adjacent cell.", consequence: { type: 'progress', questId: 'q1-escape', progress: 15, message: "A raspy voice whispers back in a dialect you barely recognize - Tremorik. They speak of a corrupt guard named Valerius." } },
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

    useEffect(() => {
        if (scrollAreaRef.current) {
            const viewport = scrollAreaRef.current.querySelector('div[data-radix-scroll-area-viewport]');
            if (viewport) {
                viewport.scrollTop = viewport.scrollHeight;
            }
        }
    }, [history]);

    useEffect(() => {
        const activeEscapeQuest = quests.find(q => q.id === 'q1-escape' && q.status === 'Active');
        if (activeEscapeQuest) {
            setCurrentStory(escapeQuestStory);
        } else if (quests.length === 0 && !hasStartedIntro.current) {
            setCurrentStory({ id: 'intro', choices: introStory.find(s => s.type === 'choice')?.options || [] });
            if (storyStep === 0) {
              advanceIntroStory();
            }
        }
    }, [quests, advanceIntroStory, storyStep]);

    useEffect(() => {
        const currentBlock = introStory[storyStep];
        if (quests.length === 0 && currentBlock && currentBlock.type === 'narrator') {
            const timer = setTimeout(() => {
                advanceIntroStory();
            }, 2500); 
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
                 const endOfSegment = { id: 'end-intro', type: 'narrator', text: 'The silence of the cell returns, but now it is filled with purpose.' };
                 setTimeout(() => setHistory(prev => [...prev, endOfSegment]), 1500);
            }

            if (consequence.type === 'progress') {
                updateQuestProgress(consequence.questId, consequence.progress);
            }

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
    } else if (currentStory?.id === 'q1-escape') {
        choiceBlock = currentStory;
    }


    return (
        <Card className="bg-card/50 border-primary/20 shadow-lg shadow-primary/5 flex flex-col h-[700px] md:h-[600px]">
            <CardHeader>
                <CardTitle className="font-headline text-2xl text-primary">
                     {currentStory?.title || "The Chronicle"}
                </CardTitle>
                <CardDescription>
                     {currentStory?.description || "Your story unfolds here. Choices have consequences."}
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
                                     <p className="text-right font-bold text-primary">-- {item.text}</p>
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
                        <p className="text-center mb-4 font-bold">{choiceBlock.text || "What is your next move?"}</p>
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
