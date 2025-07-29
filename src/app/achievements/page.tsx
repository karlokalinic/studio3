
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import AchievementsContent from './_components/achievements-content';
import { useCharacterStore } from '@/stores/use-character-store';
import { Suspense, useEffect } from 'react';
import { achievementsData } from '@/data/mock-data';

export default function AchievementsPage() {
    const { character, unlockedAchievements, unlockAchievement } = useCharacterStore();
    const backHref = character ? "/game" : "/";

    useEffect(() => {
        if (character) {
            achievementsData.forEach(ach => {
                if (!unlockedAchievements.includes(ach.id)) {
                    unlockAchievement(ach.id);
                }
            });
        }
    }, [character, unlockAchievement, unlockedAchievements]);


  return (
    <div className="min-h-screen bg-background text-foreground font-body">
      <div className="absolute top-4 left-4 z-10">
        <Button asChild variant="outline" className="border-accent text-accent hover:bg-accent hover:text-accent-foreground transition-all">
          <Link href={backHref}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Link>
        </Button>
      </div>
       <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading Achievements...</div>}>
         <AchievementsContent />
      </Suspense>
    </div>
  );
}
