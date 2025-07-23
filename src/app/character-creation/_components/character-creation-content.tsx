
'use client';

import { useState, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCharacterStore } from '@/stores/use-character-store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import StatRoller from './stat-roller';
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


export default function CharacterCreationContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const faction = searchParams.get('faction') || 'Unaligned';

    const createCharacter = useCharacterStore((state) => state.createCharacter);
    const [characterName, setCharacterName] = useState('');
    const [isSaving, setIsSaving] = useState(false);
    
    const [rollerKey, setRollerKey] = useState(Date.now());

    const handleRandomize = useCallback(() => {
        setRollerKey(Date.now());
    }, []);

    const handleSave = (finalStats: { strength: number; intelligence: number; spirit: number; }) => {
        if (characterName.trim() === '') {
            alert('Please enter a name for your character.');
            return;
        }
        setIsSaving(true);
        createCharacter(characterName, faction, finalStats);
        
        setTimeout(() => {
             router.push('/tutorial');
        }, 500);
    };

    return (
        <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-4">
            <Card className="w-full max-w-2xl bg-card/50 border-primary/20">
                <CardHeader>
                    <CardTitle className="font-headline text-3xl text-primary">Create Your Character</CardTitle>
                    <CardDescription>Define your Nexus Walker and start your journey. Your origin is with the <strong className="text-accent">{faction}</strong>.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="character-name" className="text-lg">Character Name</Label>
                        <Input 
                            id="character-name"
                            value={characterName}
                            onChange={(e) => setCharacterName(e.target.value)}
                            placeholder="Enter a name..."
                            className="text-lg"
                        />
                    </div>

                    <StatRoller key={rollerKey} onRandomize={handleRandomize} onConfirm={handleSave} isSaving={isSaving} />

                </CardContent>
                <CardFooter>
                    <p className="text-xs text-muted-foreground text-center w-full">Your attributes are a one-time roll that shapes your core potential.</p>
                </CardFooter>
            </Card>
        </div>
    )
}
