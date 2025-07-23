
"use client";

import type { CharacterProfile } from "@/types";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertTriangle, Cpu, Dumbbell, Brain, Heart, Shield, HelpCircle, Weight, Footprints, Hourglass, Atom, Coins, Handshake, BrainCircuit, BookOpen, Scale, Eye, Ghost, Anchor, Feather, Recycle, GitCommit, GitBranch, Waves } from "lucide-react";
import { Button } from "./ui/button";
import React from "react";

const Node = React.forwardRef<HTMLDivElement, { name: string; icon: React.ElementType; formula?: string; description?: string; isCore?: boolean; isMystery?: boolean; children?: React.ReactNode }>(
    ({ name, icon, formula, description, isCore, isMystery, children }, ref) => {
    const Icon = icon;
    
    return (
        <Dialog>
            <DialogTrigger asChild>
                 <div 
                    ref={ref}
                    className={`group w-32 h-32 bg-black/20 rounded-lg border-2 ${isCore ? 'border-accent/50 hover:shadow-accent/20' : 'border-primary/30 hover:shadow-primary/20'} cursor-pointer shadow-md overflow-hidden relative flex flex-col items-center justify-center`}
                 >
                    <div className={`w-full h-full flex flex-col items-center justify-center p-2 text-center transition-all duration-300 transform group-hover:bg-opacity-20 ${isCore ? 'group-hover:bg-accent' : 'group-hover:bg-primary'}`}>
                        <Icon className={`w-10 h-10 mb-1 transition-all group-hover:scale-110 ${isCore ? 'text-accent' : 'text-primary'}`} />
                        <p className={`font-bold text-sm absolute bottom-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${isMystery ? 'italic text-muted-foreground' : ''}`}>{name}</p>
                    </div>
                </div>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="font-headline text-primary flex items-center gap-2"><Icon className="w-6 h-6"/> {name}</DialogTitle>
                </DialogHeader>
                <div className="mt-4 space-y-4">
                    <p className="text-sm text-muted-foreground">{description || "The purpose of this node is currently unknown. Its secrets may be revealed through gameplay."}</p>
                    
                    {formula && (
                      <div className={`text-sm font-mono p-4 rounded-md ${formula.includes('[REDACTED]') ? 'bg-destructive/10 text-destructive' : 'bg-black/30 text-green-400'}`}>
                          <pre><code>{formula}</code></pre>
                      </div>
                    )}
                    
                     {children && <div className="text-xs text-muted-foreground">{children}</div>}
                </div>
                 <div className="mt-4 pt-4 border-t border-border">
                    <h4 className="font-headline text-lg text-primary mb-2">Upgrade</h4>
                    <p className="text-sm text-muted-foreground mb-4">Permanently enhance this attribute.</p>
                    <div className="flex justify-between items-center bg-black/20 p-2 rounded-md">
                        <p className="font-bold">Minor Enhancement</p>
                        <Button size="sm" variant="outline" disabled>
                            <Coins className="mr-2 h-4 w-4" /> 1,500
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
});
Node.displayName = "Node";


const Line = ({ type, gridArea, colorClass = 'bg-primary/20' }: { type: 'horizontal' | 'vertical' | 't-down' | 't-up' | 'cross' | 'corner-br' | 'corner-bl' | 'corner-tr' | 'corner-tl'; gridArea: string, colorClass?: string }) => {
  const baseClasses = colorClass;
  const classes = `relative w-full h-full`;
  
  if (type === 'horizontal') {
    return <div style={{ gridArea }} className="flex items-center"><div className={`${baseClasses} w-full h-0.5`}></div></div>;
  }
  if (type === 'vertical') {
    return <div style={{ gridArea }} className="flex justify-center"><div className={`${baseClasses} h-full w-0.5`}></div></div>;
  }
  
  return (
    <div style={{ gridArea }} className={classes}>
      { (type === 't-down' || type === 'cross' || type === 'vertical') && <div className={`${baseClasses} absolute top-0 left-1/2 w-0.5 h-1/2 -translate-x-1/2`}></div> }
      { (type === 't-up' || type === 'cross' || type === 'vertical') && <div className={`${baseClasses} absolute bottom-0 left-1/2 w-0.5 h-1/2 -translate-x-1/2`}></div> }
      { (type === 't-down' || type === 't-up' || type === 'cross' || type === 'horizontal') && <div className={`${baseClasses} absolute top-1/2 left-0 w-full h-0.5 -translate-y-1/2`}></div> }
      
      { (type === 'corner-br') && <><div className={`${baseClasses} absolute top-0 left-1/2 w-0.5 h-1/2 -translate-x-1/2`}></div><div className={`${baseClasses} absolute top-1/2 left-1/2 w-1/2 h-0.5 -translate-y-1/2`}></div></> }
      { (type === 'corner-bl') && <><div className={`${baseClasses} absolute top-0 left-1/2 w-0.5 h-1/2 -translate-x-1/2`}></div><div className={`${baseClasses} absolute top-1/2 right-1/2 w-1/2 h-0.5 -translate-y-1/2`}></div></> }
      { (type === 'corner-tr') && <><div className={`${baseClasses} absolute bottom-0 left-1/2 w-0.5 h-1/2 -translate-x-1/2`}></div><div className={`${baseClasses} absolute bottom-1/2 left-1/2 w-1/2 h-0.5 -translate-y-1/2`}></div></> }
      { (type === 'corner-tl') && <><div className={`${baseClasses} absolute bottom-0 left-1/2 w-0.5 h-1/2 -translate-x-1/2`}></div><div className={`${baseClasses} absolute bottom-1/2 right-1/2 w-1/2 h-0.5 -translate-y-1/2`}></div></> }
    </div>
  );
};


export default function StatInternals({ profile }: { profile: CharacterProfile }) {

  return (
    <Card className="bg-card/50 border-primary/20 shadow-lg shadow-primary/5">
      <CardHeader>
        <CardTitle className="font-headline text-2xl text-primary">Stat Internals</CardTitle>
        <CardDescription>The nexus is complex. Click on nodes for details. Some systems are known, others are yet to be understood.</CardDescription>
      </CardHeader>
      <CardContent className="p-0 sm:p-0">
          <div 
            className="grid"
            style={{
                gridTemplateColumns: 'repeat(7, 1fr)',
                gridAutoRows: 'minmax(8rem, auto)',
                gap: '0.5rem',
                minHeight: '1500px',
            }}
          >
            {/* Row 1: Core Attributes */}
            <div style={{ gridColumn: 2, gridRow: 1 }} className="flex justify-center items-center"><Node name="Intelligence" icon={BrainCircuit} isCore description="Your mind's processing power, memory, and analytical capability."/></div>
            <div style={{ gridColumn: 4, gridRow: 1 }} className="flex justify-center items-center"><Node name="Strength" icon={Dumbbell} isCore description="Your body's raw physical power. The foundation for all physical feats." /></div>
            <div style={{ gridColumn: 6, gridRow: 1 }} className="flex justify-center items-center"><Node name="Spirit" icon={Atom} isCore description="Your connection to the metaphysical and your inner willpower."/></div>

            {/* Row 2: Connections */}
            <Line type="vertical" gridArea="2 / 2 / 3 / 3" />
            <Line type="vertical" gridArea="2 / 4 / 3 / 5" />
            <Line type="vertical" gridArea="2 / 6 / 3 / 7" />
            <Line type="horizontal" gridArea="2 / 2 / 3 / 7" />

            {/* Row 3: Primary Derivatives */}
            <div style={{ gridColumn: 1, gridRow: 3 }} className="flex justify-center items-center"><Node name="Cognitive Style" icon={GitBranch} formula="Ratio of Int to Spi" description="Your dominant mode of processing information. Influences dialogue options and problem-solving approaches." /></div>
            <div style={{ gridColumn: 3, gridRow: 3 }} className="flex justify-center items-center"><Node name="Stamina" icon={Hourglass} formula="(Strength * 5) + (Level * 2)" description="Determines how long you can perform strenuous actions." /></div>
            <div style={{ gridColumn: 5, gridRow: 3 }} className="flex justify-center items-center"><Node name="Carry Weight" icon={Weight} formula="10 + (Strength * 2)" description="How much you can carry before being encumbered." /></div>
            <div style={{ gridColumn: 7, gridRow: 3 }} className="flex justify-center items-center"><Node name="Psionic Power" icon={Waves} formula="(Spirit * 1.5) + (Intelligence * 0.5)" description="The raw force of your mental and dimensional abilities." /></div>
            
            {/* Row 4: Connections */}
            <Line type="t-up" gridArea="2 / 1 / 3 / 2" />
            <Line type="t-up" gridArea="2 / 3 / 3 / 4" />
            <Line type="t-up" gridArea="2 / 5 / 3 / 6" />
            <Line type="t-up" gridArea="2 / 7 / 3 / 8" />
            
            <Line type="vertical" gridArea="4 / 1 / 5 / 2" />
            <Line type="vertical" gridArea="4 / 7 / 5 / 8" />
            <Line type="t-down" gridArea="4 / 3 / 5 / 4" />
            <Line type="t-down" gridArea="4 / 5 / 5 / 6" />
            
            <Line type="corner-br" gridArea="4 / 1 / 5 / 2" />
            <Line type="corner-bl" gridArea="4 / 7 / 5 / 8" />
            <Line type="horizontal" gridArea="4 / 2 / 5 / 3" />
            <Line type="horizontal" gridArea="4 / 6 / 5 / 7" />

            {/* Row 5: Secondary Derivatives */}
            <div style={{ gridColumn: 1, gridRow: 5 }} className="flex justify-center items-center"><Node name="Logic" icon={Scale} formula="Based on high Intelligence" description="Represents analytical, data-driven, and deductive reasoning. Unlocks specific dialogue and interaction options." /></div>
            <div style={{ gridColumn: 2, gridRow: 5 }} className="flex justify-center items-center"><Node name="Effective Strength" icon={Dumbbell} formula="(BaseStr * FitnessMod * FatigueMod) + Enhancements" description="Your actual physical power in any given moment, after all situational modifiers are applied." /></div>
            <div style={{ gridColumn: 3, gridRow: 5 }} className="flex justify-center items-center"><Node name="Effective Intelligence" icon={Brain} formula="(BaseInt * ClarityMod * FocusMod) + Enhancements" description="Your actual cognitive power in any given moment, after all situational modifiers are applied." /></div>
            <div style={{ gridColumn: 4, gridRow: 5 }} className="flex justify-center items-center"><Node name="Hacking Speed" icon={Cpu} formula="BaseSpeed / (Eff. Intelligence * 0.1)" description="How quickly you can slice through enemy security systems and access protected data."/></div>
            <div style={{ gridColumn: 5, gridRow: 5 }} className="flex justify-center items-center"><Node name="Barter Bonus" icon={Coins} formula="(Spirit / 10)%" description="Your innate charm and presence allows you to negotiate better prices with merchants." /></div>
            <div style={{ gridColumn: 6, gridRow: 5 }} className="flex justify-center items-center"><Node name="Intuition" icon={Eye} formula="Based on high Spirit" description="Represents gut feelings, empathy, and reading between the lines. Unlocks specific dialogue and interaction options." /></div>
            <div style={{ gridColumn: 7, gridRow: 5 }} className="flex justify-center items-center"><Node name="Psionic Residue" icon={Ghost} isMystery description="Powerful mental or emotional events leave a trace. Can it be detected? Can it be used?" /></div>

            {/* Row 6: Connections */}
            <Line type="corner-tr" gridArea="4 / 1 / 5 / 2" />
            <Line type="corner-tl" gridArea="4 / 7 / 5 / 8" />
            <Line type="t-up" gridArea="4 / 3 / 5 / 4" />
            <Line type="t-up" gridArea="4 / 5 / 5 / 6" />

            <Line type="vertical" gridArea="6/1/7/2" />
            <Line type="vertical" gridArea="6/6/7/7" />
            <Line type="vertical" gridArea="6/4/7/5" />
            <Line type="vertical" gridArea="6/7/7/8" />
            <Line type="horizontal" gridArea="6/1/7/7" />

            {/* Row 7: Worldview Nodes */}
            <div style={{ gridColumn: 2, gridRow: 7 }} className="flex justify-center items-center"><Node name="Materialism" icon={Anchor} formula="Favored by high Strength and Logic" description="A worldview focused on the tangible, physical aspects of reality. 'What you see is what you get.'" /></div>
            <div style={{ gridColumn: 4, gridRow: 7 }} className="flex justify-center items-center"><Node name="Worldview" icon={BookOpen} formula="Determined by Materialism vs Spiritualism" description="Your fundamental belief system about how the universe works. This has major story implications." /></div>
            <div style={{ gridColumn: 6, gridRow: 7 }} className="flex justify-center items-center"><Node name="Spiritualism" icon={Feather} formula="Favored by high Spirit and Intuition" description="A worldview focused on the unseen, metaphysical, and dimensional energies. 'There is more than meets the eye.'" /></div>
            
            {/* Row 8: Connections */}
            <Line type="t-up" gridArea="6 / 2 / 7 / 3" />
            <Line type="t-up" gridArea="6 / 4 / 7 / 5" />
            <Line type="t-up" gridArea="6 / 6 / 7 / 7" />
            <Line type="vertical" gridArea="8/4/9/5" />
            <Line type="vertical" gridArea="8/7/9/8" />
            
             <Line type="corner-br" gridArea="8/4/9/5" />
             <Line type="corner-bl" gridArea="8/7/9/8" />
             <Line type="horizontal" gridArea="8/5/9/7" />

            {/* Row 9: Mystery & Advanced Nodes */}
            <div style={{ gridColumn: 2, gridRow: 9 }} className="flex justify-center items-center"><Node name="Fate Inversion" icon={Recycle} isMystery formula="[REDACTED]" description="The ability to... change what was written? Is it possible to defy destiny itself?" /></div>
            <div style={{ gridColumn: 4, gridRow: 9 }} className="flex justify-center items-center"><Node name="Karmic Trace" icon={Footprints} isMystery formula="[REDACTED]" description="The universe seems to remember your actions, both good and ill. This invisible weight might have consequences." /></div>
            <div style={{ gridColumn: 6, gridRow: 9 }} className="flex justify-center items-center"><Node name="Nexus Resonance" icon={GitCommit} isMystery formula="[REDACTED]" description="You feel a strange hum, a vibration that connects you to the fabric of the Nexus itself." /></div>
            
            {/* Row 10: Connections */}
            <Line type="t-up" gridArea="8/2/9/3" />
            <Line type="t-up" gridArea="8/6/9/7" />
            
            <Line type="vertical" gridArea="10/2/11/3" />
            <Line type="vertical" gridArea="10/4/11/5" />
            <Line type="vertical" gridArea="10/6/11/7" />

            {/* Row 11: Deep Mystery Nodes */}
            <div style={{ gridColumn: 1, gridRow: 11 }} className="flex justify-center items-center"><Node name="Synaptic Potential" icon={HelpCircle} isMystery description="A measure of untapped neural pathways. What could they be used for?" /></div>
            <div style={{ gridColumn: 3, gridRow: 11 }} className="flex justify-center items-center"><Node name="Temporal Echo" icon={HelpCircle} isMystery description="Sometimes, you feel a faint resonance of choices not made. Deja vu, or something more?" /></div>
            <div style={{ gridColumn: 5, gridRow: 11 }} className="flex justify-center items-center"><Node name="Echo Chamber" icon={HelpCircle} isMystery formula="[REDACTED]" description="Do your own thoughts sound louder lately? Is it just you in there?" /></div>
            <div style={{ gridColumn: 7, gridRow: 11 }} className="flex justify-center items-center"><Node name="[REDACTED]" icon={HelpCircle} isMystery /></div>
            
            {/* Row 12: Connections */}
            <Line type="t-up" gridArea="10 / 1 / 11 / 2" />
            <Line type="t-up" gridArea="10 / 3 / 11 / 4" />
            <Line type="t-up" gridArea="10 / 5 / 11 / 6" />
            <Line type="t-up" gridArea="10 / 7 / 11 / 8" />
          </div>
      </CardContent>
    </Card>
  );
}

