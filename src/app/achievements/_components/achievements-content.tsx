
'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useCharacterStore } from '@/stores/use-character-store';
import { achievementsData } from '@/data/mock-data';
import * as LucideIcons from 'lucide-react';
import { cn } from '@/lib/utils';
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';
import { motion } from 'framer-motion';

type IconName = keyof typeof LucideIcons;

const AchievementCard = ({
  achievement,
  isUnlocked,
}: {
  achievement: typeof achievementsData[0];
  isUnlocked: boolean;
}) => {
  const IconComponent = LucideIcons[achievement.icon as IconName] || LucideIcons.HelpCircle;
  const isSecretAndLocked = achievement.isSpoiler && !isUnlocked;

  return (
     <TooltipProvider>
        <Tooltip delayDuration={150}>
            <TooltipTrigger asChild>
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className={cn(
                        "relative border-2 p-4 rounded-lg flex flex-col items-center justify-center aspect-square text-center transition-all duration-300",
                        isUnlocked ? "border-accent bg-accent/10 shadow-lg shadow-accent/10" : "border-primary/20 bg-black/20"
                    )}
                >
                    <IconComponent className={cn("h-12 w-12 mb-2", isUnlocked ? "text-accent" : "text-primary/40")} />
                    <h3 className={cn("font-headline text-lg", isUnlocked ? "text-primary" : "text-muted-foreground")}>
                        {isSecretAndLocked ? '???' : achievement.name}
                    </h3>
                    {isUnlocked && (
                         <div className="absolute top-2 right-2 text-yellow-400">
                            <LucideIcons.CheckCircle className="h-6 w-6" />
                        </div>
                    )}
                </motion.div>
            </TooltipTrigger>
            <TooltipContent className="max-w-xs">
                <p className="font-bold text-lg">{isSecretAndLocked ? 'Undiscovered Achievement' : achievement.name}</p>
                <p className="text-muted-foreground">{isSecretAndLocked ? 'Keep playing to unlock this secret.' : achievement.description}</p>
                 {(isUnlocked || !achievement.isSpoiler) && (
                    <div className="mt-2 pt-2 border-t border-border">
                        <p className="font-bold text-accent">Rewards:</p>
                        <ul className="list-disc list-inside text-sm">
                            {achievement.reward.xp && <li>{achievement.reward.xp} XP</li>}
                            {achievement.reward.currency && <li>{achievement.reward.currency} Kamen</li>}
                        </ul>
                    </div>
                )}
            </TooltipContent>
        </Tooltip>
    </TooltipProvider>
  );
};

export default function AchievementsContent() {
  const { unlockedAchievements, character } = useCharacterStore();

  if (!character) {
      return (
        <div className="flex items-center justify-center min-h-screen">
            <p>Begin your sentence to view achievements.</p>
        </div>
      );
  }

  const unlockedCount = unlockedAchievements.length;
  const totalCount = achievementsData.length;

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="font-headline text-4xl font-bold tracking-tight text-primary drop-shadow-[0_0_10px_hsl(var(--primary))] sm:text-6xl">
          Achievements
        </h1>
        <p className="mt-6 text-lg leading-8 text-foreground/80">
          A chronicle of your deeds in the darkness.
        </p>
         <p className="mt-2 font-bold text-xl text-accent">
            {unlockedCount} / {totalCount} Unlocked
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {achievementsData.map((achievement) => (
          <AchievementCard
            key={achievement.id}
            achievement={achievement}
            isUnlocked={unlockedAchievements.includes(achievement.id)}
          />
        ))}
      </div>
    </div>
  );
}
