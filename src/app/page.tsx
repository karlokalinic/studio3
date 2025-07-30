
"use client";

import { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCharacterStore } from '@/stores/use-character-store';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Settings, Gamepad2, BookOpen, Play, Skull } from 'lucide-react';

const MainMenu = () => {
    const router = useRouter();
    const { character } = useCharacterStore();

    const handleContinue = () => {
        router.push('/game');
    }

    return (
        <main className="min-h-screen bg-background font-body text-foreground flex items-center justify-center p-4">
            <Card className="max-w-md w-full text-center bg-card/50 border-primary/20 shadow-2xl shadow-primary/10 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle className="font-headline text-4xl text-primary drop-shadow-[0_0_10px_hsl(var(--primary))]">
                        Fort Umbralis
                    </CardTitle>
                    <CardDescription className="text-foreground/80">
                        The mind is the only key that can unlock this cage.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col gap-4">
                        {character && (
                             <Button 
                                onClick={handleContinue}
                                className="w-full bg-primary text-primary-foreground hover:bg-primary/80 transition-all text-lg py-6 font-headline"
                            >
                                <Play className="mr-2" />
                                Continue Escape
                            </Button>
                        )}
                        <Button 
                            asChild
                            className={`w-full text-lg py-6 font-headline ${!character ? 'bg-primary text-primary-foreground hover:bg-primary/80 transition-all' : ''}`}
                            variant={character ? 'outline' : 'default'}
                        >
                           <Link href="/new-game">
                             <Skull className="mr-2" />
                             New Prisoner
                           </Link>
                        </Button>
                        <Button 
                            className="w-full"
                            variant="outline"
                            disabled
                        >
                            <Gamepad2 className="mr-2" />
                            Load Game
                        </Button>
                        <Button asChild className="w-full" variant="outline">
                            <Link href="/explore-the-story">
                                <BookOpen className="mr-2" />
                                Read the Chronicle
                            </Link>
                        </Button>
                        <Button asChild className="w-full" variant="outline">
                            <Link href="/settings">
                                <Settings className="mr-2" />
                                Settings
                            </Link>
                        </Button>
                         <Button asChild className="w-full" variant="outline">
                            <Link href="/admin-archives">
                                Admin Archives
                            </Link>
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </main>
    )
}


export default function HomePage() {
    const { hasHydrated, character, setHasHydrated } = useCharacterStore();
    const router = useRouter();

    useEffect(() => {
        // This ensures the store is hydrated from localStorage before rendering
        useCharacterStore.persist.rehydrate();
        setHasHydrated(true);
    }, [setHasHydrated]);

    useEffect(() => {
        if (hasHydrated && character && !localStorage.getItem('tutorialCompleted')) {
            router.push('/tutorial');
        }
    }, [hasHydrated, character, router]);
    

    if (!hasHydrated) {
        return <div className="flex items-center justify-center min-h-screen">Loading...</div>
    }

    return <MainMenu />;
}
