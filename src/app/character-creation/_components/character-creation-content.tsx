
'use client';

import { useState, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCharacterStore } from '@/stores/use-character-store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import StatRoller from './stat-roller';
import { Textarea } from '@/components/ui/textarea';
import { motion, AnimatePresence } from 'framer-motion';
import { synthesizeCharacter, type CharacterPreset } from '@/lib/character-synthesis';
import { ArrowRight, Sparkles, RefreshCw } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

type CreationStep = 'concept' | 'synthesis' | 'finalize';

const ConceptStep = ({ onNext }: { onNext: (concept: string) => void }) => {
    const [concept, setConcept] = useState('');
    return (
        <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 50 }} className="space-y-4 text-center">
            <Label htmlFor="character-concept" className="text-lg text-primary">Describe Your Character Concept</Label>
            <Textarea
                id="character-concept"
                value={concept}
                onChange={(e) => setConcept(e.target.value)}
                placeholder="e.g., 'a cynical void-smuggler with a heart of gold', 'a disgraced corporate enforcer seeking redemption', 'a brilliant xenobotanist who crash-landed on a forgotten planet'. Leave blank for a random story."
                className="text-lg min-h-[100px] text-center"
            />
            <Button onClick={() => onNext(concept)} className="font-headline text-lg py-6">
                Synthesize Identity <Sparkles className="ml-2" />
            </Button>
        </motion.div>
    );
};

const SynthesisStep = ({ preset, onConfirm, onRetry }: { preset: CharacterPreset, onConfirm: () => void, onRetry: () => void }) => {
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4 text-center">
             <h3 className="font-headline text-xl text-accent">Synthesized Profile</h3>
            <Card className="text-left bg-black/20 p-4 max-h-64 overflow-y-auto">
                <p className="text-sm text-muted-foreground italic leading-relaxed">"{preset.backstory}"</p>
            </Card>
             <div className="grid grid-cols-3 gap-2 text-sm">
                <div className="bg-black/20 p-2 rounded-md"><span className="text-muted-foreground">Age:</span> {preset.age}</div>
                <div className="bg-black/20 p-2 rounded-md"><span className="text-muted-foreground">Gender:</span> {preset.gender}</div>
                <div className="bg-black/20 p-2 rounded-md"><span className="text-muted-foreground">Style:</span> {preset.style}</div>
            </div>
            <div className="flex gap-4">
                 <Button onClick={onRetry} variant="outline" className="w-full">
                    <RefreshCw className="mr-2"/>
                    Retry
                </Button>
                <Button onClick={onConfirm} className="w-full font-headline text-lg">
                    Accept & Continue <ArrowRight className="ml-2"/>
                </Button>
            </div>
        </motion.div>
    );
};


const FinalizeStep = ({ preset, faction, onSave }: { preset: CharacterPreset, faction: string, onSave: (name: string, orientation: string, finalStats: any) => void }) => {
    const [characterName, setCharacterName] = useState(preset.name);
    const [orientation, setOrientation] = useState('Undisclosed');
    const [isSaving, setIsSaving] = useState(false);
    
    const handleSave = (finalStats: { intellect: number; strength: number; adaptation: number; }) => {
        if (characterName.trim() === '') {
            alert('Please enter a name for your character.');
            return;
        }
        setIsSaving(true);
        onSave(characterName, orientation, finalStats);
    };

    return (
         <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            <div className="space-y-2">
                <Label htmlFor="character-name" className="text-lg text-primary">Character Name</Label>
                <Input 
                    id="character-name"
                    value={characterName}
                    onChange={(e) => setCharacterName(e.target.value)}
                    placeholder="Enter your character's name..."
                    className="text-lg text-center"
                />
            </div>
             <div className="space-y-2 text-center">
                <Label className="text-lg text-primary">Character Orientation</Label>
                 <RadioGroup defaultValue="Undisclosed" onValueChange={setOrientation} className="flex justify-center gap-4">
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Heterosexual" id="r1" />
                        <Label htmlFor="r1">Heterosexual</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Homosexual" id="r2" />
                        <Label htmlFor="r2">Homosexual</Label>
                    </div>
                     <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Bisexual" id="r3" />
                        <Label htmlFor="r3">Bisexual</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Undisclosed" id="r4" />
                        <Label htmlFor="r4">Undisclosed</Label>
                    </div>
                </RadioGroup>
            </div>
            <p className="text-sm text-center text-muted-foreground">Based on the archetype: <strong className="text-accent">{preset.name}</strong></p>
            <StatRoller onConfirm={handleSave} isSaving={isSaving} />
        </motion.div>
    )
}


export default function CharacterCreationContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const faction = searchParams.get('faction') || 'Nomad';

    const createCharacter = useCharacterStore((state) => state.createCharacter);
    const [step, setStep] = useState<CreationStep>('concept');
    const [characterPreset, setCharacterPreset] = useState<CharacterPreset | null>(null);
    const [isSynthesizing, setIsSynthesizing] = useState(false);

    const handleConceptSubmit = async (concept: string) => {
        setIsSynthesizing(true);
        // Simulate a slight delay for the "AI" to think
        await new Promise(res => setTimeout(res, 500));
        const preset = synthesizeCharacter(concept);
        setCharacterPreset(preset);
        setStep('synthesis');
        setIsSynthesizing(false);
    };

    const handleConfirmPreset = () => {
        setStep('finalize');
    };

    const handleRetry = () => {
        setStep('concept');
        setCharacterPreset(null);
    }

    const handleSave = (name: string, orientation: string, finalStats: { intellect: number; strength: number; adaptation: number; }) => {
        if (!characterPreset) return;
        createCharacter(name, faction, finalStats, characterPreset, orientation);
        
        setTimeout(() => {
             router.push('/tutorial');
        }, 500);
    };

    return (
        <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-4">
            <Card className="w-full max-w-2xl bg-card/50 border-primary/20">
                <CardHeader>
                    <CardTitle className="font-headline text-3xl text-primary text-center">Create Your Character</CardTitle>
                    <CardDescription className="text-center">Your journey begins as a member of the <strong className="text-accent">{faction}</strong> faction.</CardDescription>
                </CardHeader>
                <CardContent className="min-h-[350px] flex flex-col justify-center">
                    <AnimatePresence mode="wait">
                         {isSynthesizing ? (
                             <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center space-y-4">
                                <p className="text-lg text-accent animate-pulse">Synthesizing identity from memory engrams...</p>
                                <p className="text-muted-foreground">Please stand by.</p>
                            </motion.div>
                         ) : step === 'concept' ? (
                            <ConceptStep key="concept" onNext={handleConceptSubmit} />
                         ) : step === 'synthesis' && characterPreset ? (
                             <SynthesisStep key="synthesis" preset={characterPreset} onConfirm={handleConfirmPreset} onRetry={handleRetry} />
                         ) : step === 'finalize' && characterPreset ? (
                            <FinalizeStep key="finalize" preset={characterPreset} faction={faction} onSave={handleSave} />
                         ) : null}
                    </AnimatePresence>
                </CardContent>
                <CardFooter>
                    <p className="text-xs text-muted-foreground text-center w-full">Your choices and attributes shape your journey across the stars.</p>
                </CardFooter>
            </Card>
        </div>
    )
}
