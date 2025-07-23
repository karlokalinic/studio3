"use client";

import type { CharacterProfile, CalculatedStats } from "@/types";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getCalculatedStats } from "@/lib/character-calculations";
import { useEffect, useState } from "react";

interface CharacterProfileProps {
  profile: CharacterProfile;
}

const Stat = ({ label, value, unit, baseValue }: { label: string; value: string | number; unit?: string, baseValue?: number }) => (
  <div className="flex justify-between items-center text-sm">
    <span className="text-muted-foreground">{label}</span>
    <span className="font-bold text-accent">
      {value}{unit}
      {baseValue !== undefined && value !== baseValue && (
        <span className="text-xs font-normal text-muted-foreground ml-1">
          ({baseValue > (value as number) ? '-' : '+'}{Math.abs(baseValue - (value as number))})
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
  
  return (
    <Card className="bg-card/50 border-primary/20 shadow-lg shadow-primary/5">
      <CardHeader>
        <CardTitle className="font-headline text-2xl text-primary">{profile.name}</CardTitle>
        <CardDescription>Lvl {profile.level} ({profile.xp} XP) - {profile.metadata.origin}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h3 className="font-headline text-lg mb-2 text-primary/80">Calculated Stats</h3>
          <div className="space-y-2">
            {calculatedStats ? (
              <>
                <Stat label="Eff. Strength" value={calculatedStats.effectiveStrength} baseValue={profile.attributes.strength} />
                <Stat label="Eff. Intelligence" value={calculatedStats.effectiveIntelligence} baseValue={profile.attributes.intelligence} />
                <Stat label="Max HP" value={calculatedStats.maxHP} baseValue={profile.attributes.hp}/>
                <Stat label="Crit. Chance" value={calculatedStats.critChance} unit="%" />
              </>
            ) : <p className="text-muted-foreground">Calculating...</p>}
          </div>
        </div>
        <Separator />
        <div>
          <h3 className="font-headline text-lg mb-2 text-primary/80">State</h3>
          <div className="space-y-2">
            <Stat label="Fatigue" value={profile.state.fatigue} unit="%" />
            <Stat label="Fitness" value={profile.state.fitness} unit="%" />
            <Stat label="Focus" value={profile.state.focus} unit="%" />
            <Stat label="Clarity" value={profile.state.mentalClarity} unit="%" />
          </div>
        </div>
        <Separator />
         <div>
          <h3 className="font-headline text-lg mb-2 text-primary/80">Enhancements</h3>
          <div className="text-sm text-muted-foreground">
            <p><span className="font-bold text-primary/80">Cybernetics:</span> {profile.enhancements.cybernetics.join(', ')}</p>
            <p><span className="font-bold text-primary/80">Implants:</span> {profile.enhancements.implants.join(', ')}</p>
          </div>
        </div>
        <Separator />
        <div>
          <h3 className="font-headline text-lg mb-2 text-primary/80">Backstory</h3>
          <p className="text-sm text-muted-foreground italic">
            "{profile.metadata.backstory}"
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
