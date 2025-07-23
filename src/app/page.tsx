
"use client";

import { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCharacterStore } from '@/stores/use-character-store';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Rocket, Settings, Gamepad2, BookOpen, Play } from 'lucide-react';
import { useSettings } from '@/context/settings-context';
import Image from 'next/image';

const MainMenu = () => {
    const router = useRouter();
    const { character } = useCharacterStore();

    const handleContinue = () => {
        router.push('/game');
    }

    return (
        <main className="min-h-screen bg-background font-body text-foreground flex items-center justify-center p-4">
             <Image
                src="https://placehold.co/1920x1080.png"
                alt="Cosmic background"
                fill
                objectFit="cover"
                className="-z-10 opacity-20"
                data-ai-hint="nebula stars"
                />
            <Card className="max-w-md w-full text-center bg-card/50 border-primary/20 shadow-2xl shadow-primary/10 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle className="font-headline text-4xl text-primary drop-shadow-[0_0_10px_hsl(var(--primary))]">
                        Nexus Chronicles
                    </CardTitle>
                    <CardDescription className="text-foreground/80">
                        Your journey across the shattered dimensions awaits.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col gap-4">
                        {character && (
                             <Button 
                                onClick={handleContinue}
                                className="w-full bg-accent text-accent-foreground hover:bg-accent/80 transition-all text-lg py-6 font-headline"
                            >
                                <Play className="mr-2" />
                                Continue Chronicle
                            </Button>
                        )}
                        <Button 
                            asChild
                            className={`w-full text-lg py-6 font-headline ${!character ? 'bg-accent text-accent-foreground hover:bg-accent/80 transition-all' : ''}`}
                            variant={character ? 'outline' : 'default'}
                        >
                           <Link href="/new-game">
                             <Rocket className="mr-2" />
                             New Game
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
                                Explore The Story
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
        // Manually trigger hydration check from zustand persist middleware
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
