"use client";

import type { CharacterProfile, CalculatedStats } from "@/types";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { getCalculatedStats } from "@/lib/character-calculations";
import { useEffect, useState } from "react";
import { GitCommitHorizontal, GitMerge, GitPullRequest } from "lucide-react";

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
          ({baseValue > (value as number) ? '' : '+'}{Math.round(((value as number) - baseValue) * 10) / 10})
        </span>
      )}
    </span>
  </div>
);

const Node = ({ name, type, className }: { name: string, type: 'base' | 'modifier' | 'calculated', className?: string }) => {
    const baseClasses = "px-3 py-1 rounded-md text-xs font-semibold";
    const typeClasses = {
        base: "bg-blue-900/50 text-blue-300 border border-blue-700",
        modifier: "bg-purple-900/50 text-purple-300 border border-purple-700",
        calculated: "bg-green-900/50 text-green-300 border border-green-700",
    };
    return <div className={`${baseClasses} ${typeClasses[type]} ${className}`}>{name}</div>
}

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
        <Separator />
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="stats-internals">
            <AccordionTrigger className="font-headline text-lg hover:no-underline hover:text-accent transition-colors">
                Stat Internals
            </AccordionTrigger>
            <AccordionContent className="space-y-6 pt-4">
                <div>
                    <h4 className="font-bold text-primary/80 mb-2">Formulas</h4>
                    <div className="space-y-2 text-xs font-mono bg-black/20 p-3 rounded-md">
                        <p><span className="text-green-400">Eff. Strength</span> = (BaseStr * (Fitness * 0.2 + 0.9) * (1 - Fatigue * 0.5)) + AdrenalBooster</p>
                        <p><span className="text-green-400">Eff. Intelligence</span> = (BaseInt * (Clarity * 0.3 + 0.8) * (Focus * 0.25 + 0.85)) + NeuralLink</p>
                    </div>
                </div>

                <div>
                    <h4 className="font-bold text-primary/80 mb-2">Dependency Graph</h4>
                    <div className="p-3 bg-black/20 rounded-md space-y-4">
                        {/* Strength Calculation */}
                        <div className="flex items-center gap-2">
                           <div className="flex flex-col gap-1.5 items-end">
                             <Node name="Strength" type="base" />
                             <Node name="Fitness" type="modifier" />
                             <Node name="Fatigue" type="modifier" />
                           </div>
                           <GitMerge size={32} className="text-primary/50 shrink-0" />
                           <Node name="Effective Strength" type="calculated" />
                        </div>

                         {/* Intelligence Calculation */}
                         <div className="flex items-center gap-2">
                           <div className="flex flex-col gap-1.5 items-end">
                             <Node name="Intelligence" type="base" />
                             <Node name="Mental Clarity" type="modifier" />
                             <Node name="Focus" type="modifier" />
                           </div>
                           <GitMerge size={32} className="text-primary/50 shrink-0" />
                           <Node name="Effective Intelligence" type="calculated" />
                        </div>
                    </div>
                </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
}