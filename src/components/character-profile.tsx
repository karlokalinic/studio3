
"use client";

import type { CharacterProfile, CalculatedStats } from "@/types";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { getCalculatedStats } from "@/lib/character-calculations";
import { useEffect, useState } from "react";
import { Info, UserRound, BookCopy, Brain, Dumbbell, Dices } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";
import { useSettings } from "@/context/settings-context";

interface CharacterProfileProps {
  profile: CharacterProfile;
}

const Stat = ({ label, value, unit, baseValue, description }: { label: string; value: string | number; unit?: string; baseValue?: number; description?: string }) => (
  <div className="flex justify-between items-center text-sm">
    <div className="flex items-center gap-1.5">
      <span className="text-muted-foreground">{label}</span>
      {description && (
        <TooltipProvider>
            <Tooltip delayDuration={150}>
                <TooltipTrigger>
                    <Info className="h-3 w-3 text-muted-foreground/70" />
                </TooltipTrigger>
                <TooltipContent className="max-w-xs">
                    <p>{description}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
      )}
    </div>
    <span className="font-bold text-accent">
      {value}{unit}
      {baseValue !== undefined && value !== baseValue && (
        <span className="text-xs font-normal text-muted-foreground ml-1">
          ({baseValue > (value as number) ? '' : '+'}{Math.round(((value as number) - baseValue) * 10) / 10})
        </span>
      )}
    </span>
  </div>
);


export default function CharacterProfile({ profile }: CharacterProfileProps) {
  const [calculatedStats, setCalculatedStats] = useState<CalculatedStats | null>(null);
  const { settings } = useSettings();

  useEffect(() => {
    if (settings) {
      setCalculatedStats(getCalculatedStats(profile, settings.difficulty));
    }
  }, [profile, settings]);

  const { attributes, state } = profile;
  
  return (
    <Card className="bg-card/50 border-primary/20 shadow-lg shadow-primary/5">
      <CardHeader>
        <div className="flex items-center justify-between">
            <CardTitle className="font-headline text-2xl text-primary">{profile.name}</CardTitle>
            <div className="flex items-center gap-1">
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button asChild variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-accent">
                                <Link href="/character-sheet/stat-internals">
                                    <BookCopy className="h-5 w-5" />
                                </Link>
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>View Stat Internals</p>
                        </TooltipContent>
                    </Tooltip>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button asChild variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-accent">
                                <Link href="/character-sheet">
                                    <UserRound className="h-5 w-5" />
                                </Link>
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>View Full Profile</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>
        </div>
        <CardDescription>Lvl {profile.level} ({profile.xp} XP) - {profile.metadata.origin}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h3 className="font-headline text-lg mb-2 text-primary/80">Base Attributes</h3>
           <div className="space-y-2">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-muted-foreground text-sm"><Brain className="h-4 w-4 text-primary" /> Intellect</div>
                <span className="font-bold text-lg text-primary">{attributes.intellect.value}</span>
            </div>
             <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-muted-foreground text-sm"><Dumbbell className="h-4 w-4 text-primary" /> Strength</div>
                <span className="font-bold text-lg text-primary">{attributes.strength.value}</span>
            </div>
             <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-muted-foreground text-sm"><Dices className="h-4 w-4 text-primary" /> Adaptation</div>
                <span className="font-bold text-lg text-primary">{attributes.adaptation.value}</span>
            </div>
          </div>
        </div>
        <Separator />
        <div>
          <h3 className="font-headline text-lg mb-2 text-primary/80">Calculated Stats</h3>
          <div className="space-y-2">
            {calculatedStats ? (
              <>
                <Stat label="Eff. Strength" value={calculatedStats.effectiveStrength} baseValue={profile.attributes.strength.value} description="Your actual physical power for checks, after all modifiers." />
                <Stat label="Eff. Intellect" value={calculatedStats.effectiveIntellect} baseValue={profile.attributes.intellect.value} description="Your actual cognitive power for checks."/>
                <Stat label="Max Vitality" value={calculatedStats.maxHP} baseValue={100} description="Your total health pool."/>
              </>
            ) : <p className="text-muted-foreground">Calculating...</p>}
          </div>
        </div>
        <Separator />
        <div>
          <h3 className="font-headline text-lg mb-2 text-primary/80">State</h3>
          <div className="space-y-2">
            <Stat label="Fatigue" value={state.fatigue.value} unit="%" description={state.fatigue.description}/>
            <Stat label="Focus" value={state.focus.value} unit="%" description={state.focus.description}/>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
