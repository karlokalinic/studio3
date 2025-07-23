
"use client";

import type { CharacterProfile } from "@/types";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useCharacterStore } from "@/stores/use-character-store";
import { AlertTriangle, Cpu, Dumbbell, Brain, Heart, Shield } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";


const Node = ({ name, icon, formula, description }: { name: string, icon: React.ElementType, formula?: string, description?: string }) => {
    const Icon = icon;
    
    const nodeContent = (
      <div className="w-full h-full flex flex-col items-center justify-center p-2 text-center transition-all duration-300 transform group-hover:scale-105 group-hover:bg-primary/20">
        <Icon className="w-8 h-8 mb-1 text-primary" />
        <p className="text-sm font-bold">{name}</p>
      </div>
    );
    
    if (formula) {
        return (
            <Dialog>
                <DialogTrigger asChild>
                    <div className="group w-32 h-32 bg-black/20 rounded-lg border-2 border-primary/30 cursor-pointer shadow-md hover:shadow-primary/20 overflow-hidden">
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
        <div className="group w-32 h-32 bg-black/20 rounded-lg border-2 border-primary/30 shadow-md overflow-hidden">
            {nodeContent}
        </div>
    )
};

const ModifierNode = ({ name, value, formula, description, hasWarning }: { name: string, value: string, formula?: string, description?: string, hasWarning?: boolean }) => {
    
    const nodeContent = (
         <div className="relative w-full h-full flex flex-col items-center justify-center p-2 text-center transition-all duration-300 transform group-hover:scale-105 group-hover:bg-purple-500/20">
            <p className="text-sm font-bold text-purple-300">{name}</p>
            <p className="text-xl font-mono text-foreground">{value}</p>
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
                    <div className="group w-32 h-24 bg-black/20 rounded-md border-2 border-purple-500/30 cursor-pointer shadow-md hover:shadow-purple-500/20 overflow-hidden">
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
        <div className="group w-32 h-24 bg-black/20 rounded-md border-2 border-purple-500/30 shadow-md overflow-hidden">
            {nodeContent}
        </div>
    );
};

const ConnectingLine = ({ className }: { className?: string }) => (
    <div className={`absolute bg-primary/30 ${className}`}></div>
)


export default function StatInternals({ profile }: { profile: CharacterProfile }) {
  const { state } = profile;
  const isFatigued = state.fatigue.value > 80;
  
  return (
    <Card className="bg-card/50 border-primary/20 shadow-lg shadow-primary/5">
        <CardHeader>
            <CardTitle className="font-headline text-2xl text-primary">Stat Internals</CardTitle>
            <CardDescription>Click on a node to see the detailed formula.</CardDescription>
        </CardHeader>
        <CardContent>
             <div className="p-4 bg-black/20 rounded-md overflow-x-auto">
                <div className="relative w-full h-[550px] min-w-[800px]">
                    {/* Lines to connect nodes */}
                    <ConnectingLine className="top-[18%] left-0 w-[25%] h-0.5" />
                    <ConnectingLine className="top-1/2 left-0 w-[25%] h-0.5" />
                    <ConnectingLine className="top-[82%] left-0 w-[25%] h-0.5" />
                    
                    <ConnectingLine className="top-[18%] left-[25%] w-[25%] h-0.5" />
                    <ConnectingLine className="top-[82%] left-[25%] w-[25%] h-0.5" />

                    <ConnectingLine className="top-[18%] left-[25%] h-[64%] w-0.5" />

                    <ConnectingLine className="top-1/2 left-[25%] w-0.5 h-[16%]" />
                    <ConnectingLine className="top-1/2 left-[calc(25%+1px)] w-[calc(25%-1px)] h-0.5" />

                    <ConnectingLine className="top-[66%] left-[25%] h-[16%] w-0.5" />

                    <ConnectingLine className="top-1/2 left-[50%] h-[32%] w-0.5" />
                    <ConnectingLine className="top-1/2 left-[50%] w-[25%] h-0.5" />

                    <ConnectingLine className="top-[82%] left-[50%] w-[25%] h-0.5" />

                    {/* Base Attributes Column */}
                    <div className="absolute top-1/2 left-0 -translate-y-1/2 flex flex-col items-center justify-between h-full py-8">
                       <Node name="Base Strength" icon={Dumbbell} />
                       <Node name="Base Intelligence" icon={Brain} />
                       <Node name="Base Spirit" icon={Heart} />
                    </div>
                    
                    {/* Modifiers Column */}
                    <div className="absolute top-1/2 left-1/4 -translate-y-1/2 -translate-x-1/2 flex flex-col items-center justify-between h-[80%]">
                        <ModifierNode name="Fitness" value={`${state.fitness.value}%`} />
                        <ModifierNode name="Fatigue" value={`${state.fatigue.value}%`} hasWarning={isFatigued}/>
                        <ModifierNode name="Mental Clarity" value={`${state.mentalClarity.value}%`} />
                        <ModifierNode name="Focus" value={`${state.focus.value}%`} />
                    </div>
                    
                    {/* Enhancements Column */}
                    <div className="absolute top-[33%] left-[75%] -translate-x-1/2 -translate-y-1/2 flex flex-col gap-2">
                         <ModifierNode name="Cybernetics" value="Active" description="NeuralLink V2, AdrenalBooster"/>
                    </div>
                     <div className="absolute top-[66%] left-[75%] -translate-x-1/2 -translate-y-1/2 flex flex-col gap-2">
                        <ModifierNode name="Implants" value="Active" description="Subdermal Weave" />
                    </div>


                    {/* Calculated Stats Column */}
                    <div className="absolute top-1/2 left-1/2 -translate-y-1/2 flex flex-col items-center justify-between h-full py-8">
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
                        <div className="w-32 h-32 bg-black/50 rounded-lg border-2 border-dashed border-destructive/50 flex flex-col items-center justify-center p-2 text-center opacity-50">
                            <AlertTriangle className="w-8 h-8 mb-1 text-destructive" />
                            <p className="text-sm font-bold text-destructive">Hidden Algorithm</p>
                        </div>
                    </div>

                </div>
            </div>
        </CardContent>
    </Card>
  );
}
