
"use client";

import type { CharacterProfile, CalculatedStats, Attribute } from "@/types";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { getCalculatedStats } from "@/lib/character-calculations";
import { useEffect, useState } from "react";
import { GitMerge, Info, AlertTriangle, Cpu, Dumbbell, Brain, Heart, Shield } from "lucide-react";

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

const Node = ({ name, icon, formula, description }: { name: string, icon: React.ElementType, formula?: string, description?: string }) => {
    const Icon = icon;
    
    const nodeContent = (
      <div className="w-full h-full flex flex-col items-center justify-center p-2 text-center transition-all duration-300 transform group-hover:scale-105 group-hover:bg-primary/20">
        <Icon className="w-6 h-6 mb-1 text-primary" />
        <p className="text-xs font-bold">{name}</p>
      </div>
    );
    
    if (formula) {
        return (
            <Dialog>
                <DialogTrigger asChild>
                    <div className="group w-24 h-24 bg-black/20 rounded-lg border-2 border-primary/30 cursor-pointer shadow-md hover:shadow-primary/20 overflow-hidden">
                       {nodeContent}
                    </div>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className="font-headline text-primary flex items-center gap-2"><Icon className="w-6 h-6"/> {name} Formula</DialogTitle>
                    </DialogHeader>
                    <div className="mt-4 space-y-4">
                        {description && <p className="text-sm text-muted-foreground">{description}</p>}
                        <div className="text-sm font-mono bg-black/30 p-4 rounded-md text-green-400">
                            <pre><code>{formula}</code></pre>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        )
    }

    return (
        <div className="group w-24 h-24 bg-black/20 rounded-lg border-2 border-primary/30 shadow-md overflow-hidden">
            {nodeContent}
        </div>
    )
};

const ModifierNode = ({ name, value, formula, description, hasWarning }: { name: string, value: string, formula?: string, description?: string, hasWarning?: boolean }) => {
    
    const nodeContent = (
         <div className="relative w-full h-full flex flex-col items-center justify-center p-2 text-center transition-all duration-300 transform group-hover:scale-105 group-hover:bg-purple-500/20">
            <p className="text-xs font-bold text-purple-300">{name}</p>
            <p className="text-lg font-mono text-foreground">{value}</p>
            {hasWarning && (
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <div className="absolute top-1 right-1">
                                <AlertTriangle className="w-4 h-4 text-yellow-400 bg-yellow-900/50 rounded-full p-0.5" />
                            </div>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>A special condition is affecting this calculation!</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            )}
        </div>
    )

    if (formula) {
        return (
             <Dialog>
                <DialogTrigger asChild>
                    <div className="group w-24 h-16 bg-black/20 rounded-md border-2 border-purple-500/30 cursor-pointer shadow-md hover:shadow-purple-500/20 overflow-hidden">
                       {nodeContent}
                    </div>
                </DialogTrigger>
                <DialogContent>
                     <DialogHeader>
                        <DialogTitle className="font-headline text-primary">{name} Formula</DialogTitle>
                    </DialogHeader>
                    <div className="mt-4 space-y-4">
                        {description && <p className="text-sm text-muted-foreground">{description}</p>}
                        <div className="text-sm font-mono bg-black/30 p-4 rounded-md text-green-400">
                            <pre><code>{formula}</code></pre>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        );
    }
    
    return (
        <div className="group w-24 h-16 bg-black/20 rounded-md border-2 border-purple-500/30 shadow-md overflow-hidden">
            {nodeContent}
        </div>
    );
};

const ConnectingLine = ({ className }: { className?: string }) => (
    <div className={`absolute bg-primary/30 ${className}`}></div>
)


export default function CharacterProfile({ profile }: CharacterProfileProps) {
  const [calculatedStats, setCalculatedStats] = useState<CalculatedStats | null>(null);

  useEffect(() => {
    setCalculatedStats(getCalculatedStats(profile));
  }, [profile]);

  const { attributes, state } = profile;
  const isFatigued = state.fatigue.value > 80;
  
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
            <Stat label="Strength" value={attributes.strength.value} description={attributes.strength.description} />
            <Stat label="Intelligence" value={attributes.intelligence.value} description={attributes.intelligence.description} />
            <Stat label="Spirit" value={attributes.spirit.value} description={attributes.spirit.description} />
            <Stat label="Base HP" value={attributes.hp.value} description={attributes.hp.description} />
          </div>
        </div>
        <Separator />
        <div>
          <h3 className="font-headline text-lg mb-2 text-primary/80">Calculated Stats</h3>
          <div className="space-y-2">
            {calculatedStats ? (
              <>
                <Stat label="Eff. Strength" value={calculatedStats.effectiveStrength} baseValue={profile.attributes.strength.value} />
                <Stat label="Eff. Intelligence" value={calculatedStats.effectiveIntelligence} baseValue={profile.attributes.intelligence.value} />
                <Stat label="Max HP" value={calculatedStats.maxHP} baseValue={profile.attributes.hp.value}/>
                <Stat label="Crit. Chance" value={calculatedStats.critChance} unit="%" />
              </>
            ) : <p className="text-muted-foreground">Calculating...</p>}
          </div>
        </div>
        <Separator />
        <div>
          <h3 className="font-headline text-lg mb-2 text-primary/80">State</h3>
          <div className="space-y-2">
            <Stat label="Fatigue" value={state.fatigue.value} unit="%" description={state.fatigue.description}/>
            <Stat label="Fitness" value={state.fitness.value} unit="%" description={state.fitness.description}/>
            <Stat label="Focus" value={state.focus.value} unit="%" description={state.focus.description}/>
            <Stat label="Clarity" value={state.mentalClarity.value} unit="%" description={state.mentalClarity.description}/>
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
                <p className="text-xs text-muted-foreground">Click on a primary attribute node to see the detailed formula.</p>
                <div className="p-4 bg-black/20 rounded-md">
                    <div className="relative w-full h-[400px]">
                        {/* Lines */}
                        <ConnectingLine className="top-1/2 left-0 w-1/4 h-0.5" />
                        <ConnectingLine className="top-1/4 left-[22%] w-[3%] h-0.5" />
                        <ConnectingLine className="top-1/2 left-[22%] w-[3%] h-0.5" />
                        <ConnectingLine className="top-3/4 left-[22%] w-[3%] h-0.5" />
                        <ConnectingLine className="top-1/4 left-1/4 h-1/2 w-0.5" />
                        <ConnectingLine className="top-1/2 left-1/4 w-1/4 h-0.5" />
                        <ConnectingLine className="top-1/2 left-1/2 h-[28%] w-0.5" />
                        <ConnectingLine className="top-1/2 left-1/2 w-[28%] h-0.5" />
                        <ConnectingLine className="top-[calc(50%+112px)] left-[calc(50%+112px)] h-[30px] w-0.5 -translate-y-full" />
                        <ConnectingLine className="top-1/2 left-1/2 w-0.5 h-[calc(28%-30px)] translate-y-[30px]" />


                        {/* Base Attributes Column */}
                        <div className="absolute top-1/2 left-0 -translate-y-1/2 flex flex-col items-center justify-around h-full">
                           <Node name="Base Strength" icon={Dumbbell} />
                           <Node name="Base Intelligence" icon={Brain} />
                           <Node name="Base Spirit" icon={Heart} />
                        </div>
                        
                        {/* Modifiers Column */}
                        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 -translate-x-1/2 flex flex-col items-center justify-around h-[80%]">
                            <ModifierNode name="Fitness" value={`${state.fitness.value}%`} />
                            <ModifierNode name="Fatigue" value={`${state.fatigue.value}%`} hasWarning={isFatigued}/>
                            <ModifierNode name="Mental Clarity" value={`${state.mentalClarity.value}%`} />
                            <ModifierNode name="Focus" value={`${state.focus.value}%`} />
                        </div>

                         {/* Enhancements Column */}
                        <div className="absolute top-[calc(50%+112px)] left-[calc(50%+112px)] -translate-x-1/2 -translate-y-full flex flex-col gap-2">
                             <ModifierNode name="Cybernetics" value="Active" description="NeuralLink V2, AdrenalBooster"/>
                             <ModifierNode name="Implants" value="Active" description="Subdermal Weave" />
                        </div>

                        {/* Calculated Stats Column */}
                        <div className="absolute top-1/2 left-1/2 -translate-y-1/2 flex flex-col items-center justify-around h-full">
                           <Node name="Effective Strength" icon={Dumbbell} 
                                 formula="= (BaseStr * FitnessMod * FatigueMod) + Enhancements" 
                                 description="Your actual physical power in combat and for physical checks, after all modifiers." />
                           <Node name="Effective Intelligence" icon={Brain} 
                                 formula="= (BaseInt * ClarityMod * FocusMod) + Enhancements"
                                 description="Your actual cognitive power for hacking, analysis, and knowledge checks."
                           />
                           <Node name="Max HP" icon={Shield} 
                                formula="= BaseHP + (Level * 10) + (Strength * 5)"
                                description="Your total health pool."
                           />
                           <Node name="Crit Chance" icon={Cpu}
                                 formula="= (Eff. Int / 50 * 0.1) + (Spirit / 100 * 0.05)"
                                 description="The probability of landing a critical hit, influenced by your intelligence and spirit."
                            />
                        </div>
                        
                        {/* Hidden Algorithm */}
                        <div className="absolute top-1/2 left-full -translate-x-full -translate-y-1/2">
                            <div className="w-24 h-24 bg-black/50 rounded-lg border-2 border-dashed border-destructive/50 flex flex-col items-center justify-center p-2 text-center opacity-50">
                                <AlertTriangle className="w-6 h-6 mb-1 text-destructive" />
                                <p className="text-xs font-bold text-destructive">Hidden Algorithm</p>
                            </div>
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

  