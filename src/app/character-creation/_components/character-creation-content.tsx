
'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import type { CharacterProfile } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Dices, Save } from 'lucide-react';

const generateRandomStat = () => Math.floor(Math.random() * 8) + 8; // Random number between 8 and 15

const createNewCharacter = (name: string, faction: string): CharacterProfile => {
    return {
        name: name,
        level: 1,
        xp: 0,
        attributes: {
            strength: { value: generateRandomStat(), description: 'Raw physical power. Affects melee damage and carry capacity.' },
            intelligence: { value: generateRandomStat(), description: 'Cognitive ability, problem-solving, and hacking skills.' },
            spirit: { value: generateRandomStat(), description: 'Mental fortitude and connection to dimensional energies. Affects willpower and magic resistance.' },
            hp: { value: 100, description: 'Health Points. Represents your character\'s life force.' },
        },
        state: {
            fatigue: { value: 0, description: 'Tiredness level. High fatigue negatively impacts physical performance.' },
            fitness: { value: 100, description: 'Overall physical condition. High fitness improves strength and endurance.' },
            focus: { value: 100, description: 'Mental concentration. High focus improves the effectiveness of tasks requiring intelligence.' },
            mentalClarity: { value: 100, description: 'Clarity of thought. High clarity enhances decision-making and cognitive speed.' },
        },
        enhancements: {
            cybernetics: [],
            implants: [],
        },
        metadata: {
            age: 25,
            gender: "Not specified",
            orientation: "Not specified",
            style: "Adventurer",
            origin: faction,
            backstory: `A new face in the Nexus, hailing from the ${faction}, ready to make their mark.`,
        },
    }
}


export default function CharacterCreationContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const faction = searchParams.get('faction') || 'Unaligned';

    const [characterName, setCharacterName] = useState('');
    const [character, setCharacter] = useState<CharacterProfile | null>(null);

    useEffect(() => {
        // Clear any previous tutorial state when creating a new character
        localStorage.removeItem('tutorialCompleted');
        setCharacter(createNewCharacter(characterName, faction));
    }, [characterName, faction]);

    const randomizeStats = () => {
        if(character) {
            setCharacter({
                ...character,
                attributes: {
                    ...character.attributes,
                    strength: { ...character.attributes.strength, value: generateRandomStat() },
                    intelligence: { ...character.attributes.intelligence, value: generateRandomStat() },
                    spirit: { ...character.attributes.spirit, value: generateRandomStat() },
                }
            });
        }
    };

    const saveCharacter = () => {
        if (character && character.name) {
            localStorage.setItem('characterProfile', JSON.stringify(character));
            router.push('/tutorial'); // Start the tutorial after character creation
        } else {
            alert('Please enter a name for your character.');
        }
    };

    if (!character) return <div>Loading...</div>;

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

                    <div>
                        <h3 className="font-headline text-xl text-primary/90 mb-2">Attributes</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-black/20 rounded-lg">
                            <div className="text-center">
                                <Label className="text-sm text-muted-foreground">Strength</Label>
                                <p className="text-4xl font-bold text-accent">{character.attributes.strength.value}</p>
                            </div>
                            <div className="text-center">
                                <Label className="text-sm text-muted-foreground">Intelligence</Label>
                                <p className="text-4xl font-bold text-accent">{character.attributes.intelligence.value}</p>
                            </div>
                            <div className="text-center">
                                <Label className="text-sm text-muted-foreground">Spirit</Label>
                                <p className="text-4xl font-bold text-accent">{character.attributes.spirit.value}</p>
                            </div>
                        </div>
                    </div>
                     <Button onClick={randomizeStats} variant="outline" className="w-full">
                        <Dices className="mr-2" />
                        Randomize Stats
                    </Button>
                </CardContent>
                <CardFooter>
                    <Button onClick={saveCharacter} className="w-full text-lg font-headline py-6">
                        <Save className="mr-2" />
                        Confirm and Begin
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}
