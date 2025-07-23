
'use client';

import { useEffect, useState } from "react";
import Link from 'next/link';
import { useCharacterStore } from '@/stores/use-character-store';
import { getCalculatedStats } from '@/lib/character-calculations';
import type { CalculatedStats, CharacterProfile } from "@/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft } from "lucide-react";

const Stat = ({ label, value, unit, description }: { label: string; value: string | number; unit?: string; description?: string }) => (
    <div className="flex justify-between items-start text-sm py-2">
        <div>
            <p className="font-bold text-primary/90">{label}</p>
            <p className="text-xs text-muted-foreground">{description}</p>
        </div>
        <p className="font-mono text-lg text-accent whitespace-nowrap pl-4">{value}{unit}</p>
    </div>
);

const FullCharacterSheet = ({ profile, calculatedStats }: { profile: CharacterProfile, calculatedStats: CalculatedStats }) => {
     const { attributes, state } = profile;
    return (
         <Card className="bg-card/50 border-primary/20 shadow-lg shadow-primary/5">
            <CardHeader>
                <CardTitle className="font-headline text-3xl text-primary">{profile.name}</CardTitle>
                <CardDescription>Lvl {profile.level} ({profile.xp} XP) - {profile.metadata.origin}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                 <div>
                    <h3 className="font-headline text-xl mb-2 text-primary/80">Base Attributes</h3>
                    <div className="divide-y divide-primary/10">
                        <Stat label="Strength" value={attributes.strength.value} description={attributes.strength.description} />
                        <Stat label="Intelligence" value={attributes.intelligence.value} description={attributes.intelligence.description} />
                        <Stat label="Spirit" value={attributes.spirit.value} description={attributes.spirit.description} />
                        <Stat label="Base HP" value={attributes.hp.value} description={attributes.hp.description} />
                    </div>
                </div>
                <Separator />
                <div>
                    <h3 className="font-headline text-xl mb-2 text-primary/80">Calculated Stats</h3>
                    <div className="divide-y divide-primary/10">
                        <Stat label="Effective Strength" value={calculatedStats.effectiveStrength} description="Your actual physical power in combat and for physical checks, after all modifiers." />
                        <Stat label="Effective Intelligence" value={calculatedStats.effectiveIntelligence} description="Your actual cognitive power for hacking, analysis, and knowledge checks."/>
                        <Stat label="Max HP" value={calculatedStats.maxHP} description="Your total health pool."/>
                        <Stat label="Critical Hit Chance" value={calculatedStats.critChance} unit="%" description="The probability of landing a critical hit, influenced by your intelligence and spirit."/>
                         <Stat label="Inventory Slots" value={calculatedStats.inventorySlots} description="The number of items you can carry."/>
                    </div>
                </div>
                <Separator />
                <div>
                    <h3 className="font-headline text-xl mb-2 text-primary/80">Dynamic State</h3>
                     <div className="divide-y divide-primary/10">
                        <Stat label="Fatigue" value={state.fatigue.value} unit="%" description={state.fatigue.description}/>
                        <Stat label="Fitness" value={state.fitness.value} unit="%" description={state.fitness.description}/>
                        <Stat label="Focus" value={state.focus.value} unit="%" description={state.focus.description}/>
                        <Stat label="Mental Clarity" value={state.mentalClarity.value} unit="%" description={state.mentalClarity.description}/>
                    </div>
                </div>
                <Separator />
                <div>
                    <h3 className="font-headline text-xl mb-2 text-primary/80">Enhancements</h3>
                    <div className="text-sm text-muted-foreground space-y-2">
                        <p><strong className="font-semibold text-primary/80">Cybernetics:</strong> {profile.enhancements.cybernetics.join(', ') || 'None'}</p>
                        <p><strong className="font-semibold text-primary/80">Implants:</strong> {profile.enhancements.implants.join(', ') || 'None'}</p>
                    </div>
                </div>
                <Separator />
                <div>
                    <h3 className="font-headline text-xl mb-2 text-primary/80">Metadata</h3>
                     <div className="divide-y divide-primary/10">
                        <Stat label="Age" value={profile.metadata.age} />
                        <Stat label="Gender" value={profile.metadata.gender} />
                        <Stat label="Orientation" value={profile.metadata.orientation} />
                        <Stat label="Style" value={profile.metadata.style} />
                    </div>
                </div>
                <Separator />
                <div>
                    <h3 className="font-headline text-xl mb-2 text-primary/80">Backstory</h3>
                    <p className="text-sm text-muted-foreground italic leading-relaxed">
                        "{profile.metadata.backstory}"
                    </p>
                </div>
            </CardContent>
        </Card>
    )
}

export default function CharacterSheetContent() {
    const { character, hasHydrated } = useCharacterStore();
    const [calculatedStats, setCalculatedStats] = useState<CalculatedStats | null>(null);

    useEffect(() => {
        if (character) {
            setCalculatedStats(getCalculatedStats(character));
        }
    }, [character]);


    if (!hasHydrated) {
        return <div className="min-h-screen flex items-center justify-center"><p>Loading...</p></div>
    }

    if (!character || !calculatedStats) {
        return (
             <div className="min-h-screen flex flex-col items-center justify-center text-center">
                <p className="text-2xl font-headline text-destructive mb-4">No Character Data Found</p>
                <p className="text-muted-foreground mb-8">Please start a new game to create a character.</p>
                <Button asChild>
                    <Link href="/">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Return to Main Page
                    </Link>
                </Button>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-background text-foreground font-body p-4 md:p-8">
            <div className="container mx-auto">
                <div className="mb-8">
                    <Button asChild variant="outline">
                        <Link href="/">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Game
                        </Link>
                    </Button>
                </div>
                <FullCharacterSheet profile={character} calculatedStats={calculatedStats} />
            </div>
        </div>
    );
}
