
"use client";

import type { CharacterProfile } from "@/types";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertTriangle, Cpu, Dumbbell, Brain, Heart, Shield, HelpCircle, Weight, Footprints, Hourglass, Atom, Coins, Handshake, BrainCircuit } from "lucide-react";

const Node = ({ name, icon, formula, description, isCore, isMystery, children }: { name: string; icon: React.ElementType; formula?: string; description?: string; isCore?: boolean; isMystery?: boolean; children?: React.ReactNode }) => {
    const Icon = icon;
    
    const nodeContent = (
      <div className={`w-full h-full flex flex-col items-center justify-center p-2 text-center transition-all duration-300 transform group-hover:scale-105 ${isCore ? 'group-hover:bg-accent/20' : 'group-hover:bg-primary/20'}`}>
        <Icon className={`w-8 h-8 mb-1 ${isCore ? 'text-accent' : 'text-primary'}`} />
        <p className={`font-bold text-sm ${isMystery ? 'italic text-muted-foreground' : ''}`}>{name}</p>
      </div>
    );
    
    const NodeWrapper = ({ children }: { children: React.ReactNode }) => (
        <div className={`group w-36 h-36 bg-black/20 rounded-lg border-2 ${isCore ? 'border-accent/50 hover:shadow-accent/20' : 'border-primary/30 hover:shadow-primary/20'} cursor-pointer shadow-md overflow-hidden relative flex flex-col items-center justify-center`}>
            {children}
        </div>
    );

    if (formula) {
        return (
            <Dialog>
                <DialogTrigger asChild>
                    <NodeWrapper>{nodeContent}</NodeWrapper>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className="font-headline text-primary flex items-center gap-2"><Icon className="w-6 h-6"/> {name} Formula</DialogTitle>
                    </DialogHeader>
                    <div className="mt-4 space-y-4">
                        {description && <p className="text-sm text-muted-foreground">{description}</p>}
                        <div className={`text-sm font-mono p-4 rounded-md ${formula.includes('[REDACTED]') ? 'bg-destructive/10 text-destructive' : 'bg-black/30 text-green-400'}`}>
                            <pre><code>{formula}</code></pre>
                        </div>
                         {children && <div className="text-xs text-muted-foreground">{children}</div>}
                    </div>
                </DialogContent>
            </Dialog>
        )
    }

    return (
        <NodeWrapper>{nodeContent}</NodeWrapper>
    )
};

const ModifierNode = ({ name, value, hasWarning }: { name: string, value: string, hasWarning?: boolean }) => {
    return (
        <div className="group w-32 h-24 bg-black/20 rounded-md border-2 border-purple-500/30 shadow-md overflow-hidden relative flex flex-col items-center justify-center p-2 text-center transition-all duration-300 transform group-hover:scale-105 group-hover:bg-purple-500/20">
            <p className="text-sm font-bold text-purple-300">{name}</p>
            <p className="text-xl font-mono text-foreground">{value}</p>
             {hasWarning && (
                <div className="absolute top-1 right-1">
                    <AlertTriangle className="w-4 h-4 text-yellow-400 bg-yellow-900/50 rounded-full p-0.5" />
                </div>
            )}
        </div>
    );
}

const Line = ({ type, gridArea }: { type: 'horizontal' | 'vertical' | 't-down' | 't-up' | 'cross' | 'corner-br' | 'corner-bl' | 'corner-tr' | 'corner-tl'; gridArea: string }) => {
  const baseClasses = 'bg-primary/20';
  let classes = '';

  switch (type) {
    case 'horizontal':
      classes = `${baseClasses} w-full h-0.5 my-auto`;
      break;
    case 'vertical':
      classes = `${baseClasses} h-full w-0.5 mx-auto`;
      break;
    case 't-down':
      classes = `relative w-full h-full`;
      return (
        <div style={{ gridArea }} className={classes}>
          <div className={`${baseClasses} absolute top-1/2 left-0 w-full h-0.5 -translate-y-1/2`}></div>
          <div className={`${baseClasses} absolute top-1/2 left-1/2 h-1/2 w-0.5 -translate-x-1/2`}></div>
        </div>
      );
     case 't-up':
      classes = `relative w-full h-full`;
      return (
        <div style={{ gridArea }} className={classes}>
          <div className={`${baseClasses} absolute top-1/2 left-0 w-full h-0.5 -translate-y-1/2`}></div>
          <div className={`${baseClasses} absolute bottom-1/2 left-1/2 h-1/2 w-0.5 -translate-x-1/2`}></div>
        </div>
      );
      case 'cross':
      classes = `relative w-full h-full`;
      return (
        <div style={{ gridArea }} className={classes}>
          <div className={`${baseClasses} absolute top-1/2 left-0 w-full h-0.5 -translate-y-1/2`}></div>
          <div className={`${baseClasses} absolute top-0 left-1/2 w-0.5 h-full -translate-x-1/2`}></div>
        </div>
      );
     case 'corner-br':
      classes = `relative w-full h-full`;
      return (
        <div style={{ gridArea }} className={classes}>
            <div className={`${baseClasses} absolute top-1/2 right-0 w-1/2 h-0.5`}></div>
            <div className={`${baseClasses} absolute top-1/2 left-1/2 w-0.5 h-1/2`}></div>
        </div>
      )
     case 'corner-bl':
        classes = `relative w-full h-full`;
        return (
            <div style={{ gridArea }} className={classes}>
                <div className={`${baseClasses} absolute top-1/2 left-0 w-1/2 h-0.5`}></div>
                <div className={`${baseClasses} absolute top-1/2 right-1/2 w-0.5 h-1/2`}></div>
            </div>
        )
    case 'corner-tr':
        classes = `relative w-full h-full`;
        return (
            <div style={{ gridArea }} className={classes}>
                <div className={`${baseClasses} absolute top-1/2 right-0 w-1/2 h-0.5`}></div>
                <div className={`${baseClasses} absolute bottom-1/2 left-1/2 w-0.5 h-1/2`}></div>
            </div>
        )
    case 'corner-tl':
        classes = `relative w-full h-full`;
        return (
            <div style={{ gridArea }} className={classes}>
                <div className={`${baseClasses} absolute top-1/2 left-0 w-1/2 h-0.5`}></div>
                <div className={`${baseClasses} absolute bottom-1/2 right-1/2 w-0.5 h-1/2`}></div>
            </div>
        )
  }

  return <div style={{ gridArea }} className={classes}></div>;
};

const NodePlaceholder = ({ gridArea }: { gridArea: string }) => <div style={{ gridArea }}></div>;

export default function StatInternals({ profile }: { profile: CharacterProfile }) {
  const { state } = profile;
  const isFatigued = state.fatigue.value > 80;

  return (
    <Card className="bg-card/50 border-primary/20 shadow-lg shadow-primary/5">
      <CardHeader>
        <CardTitle className="font-headline text-2xl text-primary">Stat Internals</CardTitle>
        <CardDescription>The nexus is complex. Some systems are known, others are yet to be understood. Click nodes for details.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="p-4 bg-black/20 rounded-md overflow-x-auto">
          <div 
            className="grid min-w-[1200px]"
            style={{
                gridTemplateColumns: 'repeat(7, 1fr)',
                gridTemplateRows: 'repeat(6, 1fr)',
                gridTemplateAreas: `
                    "coreStr . coreInt . coreSpi . mystery1"
                    "line1A line1B line1C line1D line1E line1F line1G"
                    "nodeP1 nodeP2 nodeP3 . nodeP4 nodeP5 nodeP6"
                    "line2A line2B line2C line2D line2E line2F line2G"
                    "nodeC1 . nodeC2 . nodeC3 . nodeC4"
                    ". line3A . line3B . line3C ."
                `,
                gap: '0.5rem',
                height: '900px',
            }}
          >
            {/* Core Nodes */}
            <div style={{ gridArea: 'coreStr' }} className="flex justify-center items-center"><Node name="Strength" icon={Dumbbell} isCore /></div>
            <div style={{ gridArea: 'coreInt' }} className="flex justify-center items-center"><Node name="Intelligence" icon={BrainCircuit} isCore /></div>
            <div style={{ gridArea: 'coreSpi' }} className="flex justify-center items-center"><Node name="Spirit" icon={Atom} isCore /></div>
            <div style={{ gridArea: 'mystery1' }} className="flex justify-center items-center"><Node name="???" icon={HelpCircle} isMystery formula="[REDACTED]" description="Its purpose is unknown." /></div>

            {/* Primary Derivative Nodes */}
            <div style={{ gridArea: 'nodeP1' }} className="flex justify-center items-center"><Node name="Stamina" icon={Hourglass} formula="(Strength * 5) + (Level * 2)" description="Determines how long you can perform strenuous actions." /></div>
            <div style={{ gridArea: 'nodeP2' }} className="flex justify-center items-center"><Node name="Carry Weight" icon={Weight} formula="10 + (Strength * 2)" description="How much you can carry before being encumbered." /></div>
            <div style={{ gridArea: 'nodeP3' }} className="flex justify-center items-center"><Node name="Hacking Speed" icon={Cpu} formula="BaseSpeed / (Intelligence * 0.1)" description="How quickly you can slice through enemy security." /></div>
            <div style={{ gridArea: 'nodeP4' }} className="flex justify-center items-center"><Node name="Psionic Power" icon={Heart} formula="(Spirit * 1.5) + (Intelligence * 0.5)" description="The raw force of your mental and dimensional abilities." /></div>
            <div style={{ gridArea: 'nodeP5' }} className="flex justify-center items-center"><Node name="Barter Bonus" icon={Coins} formula="(Spirit / 10)%" description="Your innate charm and presence allows you to negotiate better prices." /></div>
            <div style={{ gridArea: 'nodeP6' }} className="flex justify-center items-center"><Node name="Karmic Trace" icon={HelpCircle} isMystery formula="[REDACTED]" description="The universe seems to remember your actions..." /></div>
            
            {/* Calculated Nodes */}
            <div style={{ gridArea: 'nodeC1' }} className="flex justify-center items-center"><Node name="Effective Strength" icon={Dumbbell} formula="(BaseStr * FitnessMod * FatigueMod) + Enhancements" description="Your actual physical power after all modifiers." /></div>
            <div style={{ gridArea: 'nodeC2' }} className="flex justify-center items-center"><Node name="Effective Intelligence" icon={Brain} formula="(BaseInt * ClarityMod * FocusMod) + Enhancements" description="Your actual cognitive power after all modifiers." /></div>
            <div style={{ gridArea: 'nodeC3' }} className="flex justify-center items-center"><Node name="Dodge Chance" icon={Footprints} formula="5 + (Eff. Agility / 4)%" description="Your ability to avoid incoming attacks. What's Agility?"/></div>
            <div style={{ gridArea: 'nodeC4' }} className="flex justify-center items-center"><Node name="Nexus Resonance" icon={HelpCircle} isMystery formula="[REDACTED]" description="You feel a strange hum..." /></div>

             {/* Dynamic State Modifiers (Not in grid, but for context) */}
            <ModifierNode name="Fatigue" value={`${state.fatigue.value}%`} hasWarning={isFatigued}/>
            {/* ... other modifier nodes could be displayed elsewhere ... */}


            {/* Connecting Lines */}
            {/* Row 1 */}
            <Line type="vertical" gridArea="line1A" />
            <Line type="t-down" gridArea="line1B" />
            <Line type="vertical" gridArea="line1C" />
            <Line type="t-down" gridArea="line1D" />
            <Line type="vertical" gridArea="line1E" />
            <Line type="t-down" gridArea="line1F" />
            <Line type="vertical" gridArea="line1G" />

            {/* Row 2 */}
            <Line type="corner-br" gridArea="line2A" />
            <Line type="horizontal" gridArea="line2B" />
            <Line type="t-up" gridArea="line2C" />
            <Line type="horizontal" gridArea="line2D" />
            <Line type="cross" gridArea="line2E" />
             <Line type="horizontal" gridArea="line2F" />
            <Line type="corner-bl" gridArea="line2G" />
            
             {/* Row 3 */}
            <Line type="vertical" gridArea="line3A" />
            <Line type="vertical" gridArea="line3B" />
            <Line type="vertical" gridArea="line3C" />


          </div>
        </div>
      </CardContent>
    </Card>
  );
}

    