
'use client';

import { useState, useCallback, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCharacterStore } from '@/stores/use-character-store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import StatRoller from './stat-roller';
import { motion, AnimatePresence } from 'framer-motion';
import { synthesizeCharacter, type CharacterPreset } from '@/lib/character-synthesis';
import { ArrowRight, Sparkles, RefreshCw } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

type CreationStep = 'synthesis' | 'finalize';


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
    const [characterName, setCharacterName] = useState(preset.name);
    const [isSaving, setIsSaving] = useState(false);
    
    const handleSave = (finalStats: { intellect: number; strength: number; adaptation: number; }) => {
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
                    placeholder="Enter your character's name..."
                    className="text-lg text-center"
                />
            </div>
            <p className="text-sm text-center text-muted-foreground">Based on the archetype: <strong className="text-accent">{preset.name}</strong></p>
            <StatRoller onConfirm={handleSave} isSaving={isSaving} />
        </motion.div>
    )
}

const LoadingState = () => (
    <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center space-y-4">
        <p className="text-lg text-accent animate-pulse">Analyzing psych profile...</p>
        <p className="text-muted-foreground">Synthesizing identity from memory engrams. Please stand by.</p>
        <Skeleton className="h-24 w-full" />
        <div className="flex justify-between gap-4">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
        </div>
    </motion.div>
)


export default function CharacterCreationContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const faction = searchParams.get('faction') || 'Nomad';

    const createCharacter = useCharacterStore((state) => state.createCharacter);
    const [step, setStep] = useState<CreationStep>('synthesis');
    const [characterPreset, setCharacterPreset] = useState<CharacterPreset | null>(null);
    const [isSynthesizing, setIsSynthesizing] = useState(true);

    const generateCharacter = useCallback(() => {
        setIsSynthesizing(true);
        // Simulate a slight delay for the "AI" to think
        setTimeout(() => {
            const preset = synthesizeCharacter(faction);
            setCharacterPreset(preset);
            setIsSynthesizing(false);
            setStep('synthesis');
        }, 1500);
    }, [faction]);

    useEffect(() => {
        generateCharacter();
    }, [generateCharacter]);

    const handleConfirmPreset = () => {
        setStep('finalize');
    };

    const handleRetry = () => {
        generateCharacter();
    }

    const handleSave = (name: string, finalStats: { intellect: number; strength: number; adaptation: number; }) => {
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
                    <CardDescription className="text-center">Your psych profile has determined your sentence will begin in the <strong className="text-accent">{faction}</strong>.</CardDescription>
                </CardHeader>
                <CardContent className="min-h-[350px] flex flex-col justify-center">
                    <AnimatePresence mode="wait">
                         {isSynthesizing ? (
                            <LoadingState />
                         ) : step === 'synthesis' && characterPreset ? (
                             <SynthesisStep key="synthesis" preset={characterPreset} onConfirm={handleConfirmPreset} onRetry={handleRetry} />
                         ) : step === 'finalize' && characterPreset ? (
                            <FinalizeStep key="finalize" preset={characterPreset} faction={faction} onSave={handleSave} />
                         ) : null}
                    </AnimatePresence>
                </CardContent>
                <CardFooter>
                    <p className="text-xs text-muted-foreground text-center w-full">Your choices and attributes shape your journey through the darkness.</p>
                </CardFooter>
            </Card>
        </div>
    )
}
