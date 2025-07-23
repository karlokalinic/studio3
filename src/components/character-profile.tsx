
"use client";

import type { CharacterProfile, CalculatedStats, Attribute } from "@/types";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { getCalculatedStats } from "@/lib/character-calculations";
import { useEffect, useState } from "react";
import { Info, ExternalLink } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";

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

  useEffect(() => {
    setCalculatedStats(getCalculatedStats(profile));
  }, [profile]);

  const { attributes, state } = profile;
  
  return (
    <Card className="bg-card/50 border-primary/20 shadow-lg shadow-primary/5">
      <CardHeader>
        <CardTitle className="font-headline text-2xl text-primary">{profile.name}</CardTitle>
        <CardDescription>Lvl {profile.level} ({profile.xp} XP) - {profile.metadata.origin}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h3 className="font-headline text-lg mb-2 text-primary/80">Base Attributes</h3>
           <div className="space-y-2">
            <Stat label="Strength" value={attributes.strength.value} />
            <Stat label="Intelligence" value={attributes.intelligence.value} />
            <Stat label="Spirit" value={attributes.spirit.value} />
          </div>
        </div>
        <Separator />
        <div>
          <h3 className="font-headline text-lg mb-2 text-primary/80">Calculated Stats</h3>
          <div className="space-y-2">
            {calculatedStats ? (
              <>
                <Stat label="Eff. Strength" value={calculatedStats.effectiveStrength} baseValue={profile.attributes.strength.value} description="Your actual physical power in combat and for physical checks, after all modifiers." />
                <Stat label="Eff. Intelligence" value={calculatedStats.effectiveIntelligence} baseValue={profile.attributes.intelligence.value} description="Your actual cognitive power for hacking, analysis, and knowledge checks."/>
                <Stat label="Max HP" value={calculatedStats.maxHP} baseValue={profile.attributes.hp.value} description="Your total health pool."/>
                <Stat label="Crit. Chance" value={calculatedStats.critChance} unit="%" description="The probability of landing a critical hit, influenced by your intelligence and spirit."/>
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
       <CardFooter>
        <Button asChild variant="outline" className="w-full">
          <Link href="/character-sheet" target="_blank">
            <ExternalLink className="mr-2 h-4 w-4" />
            View Full Character Sheet
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
