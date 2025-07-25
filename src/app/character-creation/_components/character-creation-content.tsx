
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
                placeholder="e.g., 'a grizzled space-pirate haunted by their past', 'a rookie explorer full of optimism', 'a cynical smuggler with a heart of gold'"
                className="text-lg min-h-[100px] text-center"
            />
            <Button onClick={() => onNext(concept)} disabled={!concept.trim()} className="font-headline text-lg py-6">
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


const FinalizeStep = ({ preset, faction, onSave }: { preset: CharacterPreset, faction: string, onSave: (name: string, finalStats: any) => void }) => {
    const [characterName, setCharacterName] = useState('');
    const [isSaving, setIsSaving] = useState(false);
    
    const handleSave = (finalStats: { strength: number; intelligence: number; spirit: number; }) => {
        if (characterName.trim() === '') {
            alert('Please enter a name for your character.');
            return;
        }
        setIsSaving(true);
        onSave(characterName, finalStats);
    };

    return (
         <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            <div className="space-y-2">
                <Label htmlFor="character-name" className="text-lg text-primary">Character Name</Label>
                <Input 
                    id="character-name"
                    value={characterName}
                    onChange={(e) => setCharacterName(e.target.value)}
                    placeholder="Enter the name for your legend..."
                    className="text-lg text-center"
                />
            </div>
            <p className="text-sm text-center text-muted-foreground">Based on your concept: <strong className="text-accent">{preset.name}</strong></p>
            <StatRoller onConfirm={handleSave} isSaving={isSaving} />
        </motion.div>
    )
}


export default function CharacterCreationContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const faction = searchParams.get('faction') || 'Unaligned';

    const createCharacter = useCharacterStore((state) => state.createCharacter);
    const [step, setStep] = useState<CreationStep>('concept');
    const [characterPreset, setCharacterPreset] = useState<CharacterPreset | null>(null);

    const handleConceptSubmit = (concept: string) => {
        const preset = synthesizeCharacter(concept);
        setCharacterPreset(preset);
        setStep('synthesis');
    };

    const handleConfirmPreset = () => {
        setStep('finalize');
    };

    const handleRetry = () => {
        setStep('concept');
        setCharacterPreset(null);
    }

    const handleSave = (name: string, finalStats: { strength: number; intelligence: number; spirit: number; }) => {
        if (!characterPreset) return;
        createCharacter(name, faction, finalStats, characterPreset);
        
        setTimeout(() => {
             router.push('/tutorial');
        }, 500);
    };

    return (
        <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-4">
            <Card className="w-full max-w-2xl bg-card/50 border-primary/20">
                <CardHeader>
                    <CardTitle className="font-headline text-3xl text-primary text-center">Create Your Character</CardTitle>
                    <CardDescription className="text-center">Your origin is with the <strong className="text-accent">{faction}</strong>.</CardDescription>
                </CardHeader>
                <CardContent className="min-h-[350px] flex flex-col justify-center">
                    <AnimatePresence mode="wait">
                        {step === 'concept' && <ConceptStep onNext={handleConceptSubmit} />}
                        {step === 'synthesis' && characterPreset && <SynthesisStep preset={characterPreset} onConfirm={handleConfirmPreset} onRetry={handleRetry} />}
                        {step === 'finalize' && characterPreset && <FinalizeStep preset={characterPreset} faction={faction} onSave={handleSave} />}
                    </AnimatePresence>
                </CardContent>
                <CardFooter>
                    <p className="text-xs text-muted-foreground text-center w-full">Your choices and attributes shape your core potential.</p>
                </CardFooter>
            </Card>
        </div>
    )
}
