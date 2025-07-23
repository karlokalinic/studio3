
"use client";

import type { CharacterProfile } from "@/types";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertTriangle, Cpu, Dumbbell, Brain, Heart, Shield, HelpCircle, Weight, Footprints, Hourglass, Atom, Coins, Handshake, BrainCircuit, BookOpen, Scale, Eye, Ghost, Anchor, Feather, Recycle, GitCommit, GitBranch, Waves, Zap, ShieldCheck, Sword, BrainCog } from "lucide-react";
import { Button } from "./ui/button";
import React from "react";
import { cn } from "@/lib/utils";

const Node = React.forwardRef<HTMLDivElement, { name: string; icon: React.ElementType; formula?: string; description?: string; isCore?: boolean; isMystery?: boolean; isCurse?: boolean; isAbility?: boolean; children?: React.ReactNode }>(
    ({ name, icon, formula, description, isCore, isMystery, isCurse, isAbility, children }, ref) => {
    const Icon = icon;
    
    let borderColor = 'border-primary/30 hover:shadow-primary/20';
    let iconColor = 'text-primary';
    let hoverBg = 'group-hover:bg-primary';

    if (isCore) {
      borderColor = 'border-accent/50 hover:shadow-accent/20';
      iconColor = 'text-accent';
      hoverBg = 'group-hover:bg-accent';
    } else if (isCurse) {
        borderColor = 'border-destructive/50 hover:shadow-destructive/20';
        iconColor = 'text-destructive';
        hoverBg = 'group-hover:bg-destructive';
    } else if (isAbility) {
        borderColor = 'border-yellow-400/50 hover:shadow-yellow-400/20';
        iconColor = 'text-yellow-400';
        hoverBg = 'group-hover:bg-yellow-400';
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                 <div 
                    ref={ref}
                    className={cn(`group w-28 h-28 bg-black/20 rounded-lg border-2 cursor-pointer shadow-md overflow-hidden relative flex flex-col items-center justify-center`, borderColor)}
                 >
                    <div className={cn(`w-full h-full flex flex-col items-center justify-center p-2 text-center transition-all duration-300 transform group-hover:bg-opacity-20`, hoverBg)}>
                        <Icon className={cn(`w-10 h-10 mb-1 transition-all group-hover:scale-110`, iconColor)} />
                        <p className={`font-bold text-xs absolute bottom-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${isMystery ? 'italic text-muted-foreground' : ''}`}>{name}</p>
                    </div>
                </div>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className={cn("font-headline flex items-center gap-2", iconColor)}><Icon className="w-6 h-6"/> {name}</DialogTitle>
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
                 {!isCurse && (
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
                 )}
            </DialogContent>
        </Dialog>
    )
});
Node.displayName = "Node";


const Line = ({ type, gridArea, colorClass = 'bg-primary/20' }: { type: 'horizontal' | 'vertical' | 't-down' | 't-up' | 'cross' | 'corner-br' | 'corner-bl' | 'corner-tr' | 'corner-tl' | 'radial-tr' | 'radial-tl'; gridArea: string, colorClass?: string }) => {
  const baseClasses = colorClass;
  const classes = `relative w-full h-full`;
  
  if (type === 'horizontal') {
    return <div style={{ gridArea }} className="flex items-center"><div className={`${baseClasses} w-full h-0.5`}></div></div>;
  }
  if (type === 'vertical') {
    return <div style={{ gridArea }} className="flex justify-center"><div className={`${baseClasses} h-full w-0.5`}></div></div>;
  }
   if (type === 'radial-tr') {
    return <div style={{ gridArea }} className="relative"><div className={`${baseClasses} absolute bottom-0 left-0 w-full h-0.5 origin-bottom-left -rotate-45`}></div></div>;
  }
  if (type === 'radial-tl') {
    return <div style={{ gridArea }} className="relative"><div className={`${baseClasses} absolute bottom-0 right-0 w-full h-0.5 origin-bottom-right rotate-45`}></div></div>;
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
        <CardDescription>The nexus is complex. Hover over nodes for names, click for details. Every enhancement comes with a price.</CardDescription>
      </CardHeader>
      <CardContent className="p-0 sm:p-0">
          <div 
            className="grid"
            style={{
                gridTemplateColumns: 'repeat(9, 1fr)',
                gridAutoRows: 'minmax(8rem, auto)',
                gap: '0rem',
                minHeight: '1500px',
            }}
          >
            {/* Row 1: Core Attributes */}
            <div style={{ gridColumn: 3, gridRow: 1 }} className="flex justify-center items-center"><Node name="Intelligence" icon={BrainCircuit} isCore description="Your mind's processing power, memory, and analytical capability."/></div>
            <div style={{ gridColumn: 5, gridRow: 1 }} className="flex justify-center items-center"><Node name="Strength" icon={Dumbbell} isCore description="Your body's raw physical power. The foundation for all physical feats." /></div>
            <div style={{ gridColumn: 7, gridRow: 1 }} className="flex justify-center items-center"><Node name="Spirit" icon={Atom} isCore description="Your connection to the metaphysical and your inner willpower."/></div>

            {/* Row 2: Connections to Mini-Abilities */}
            <Line type="radial-tr" gridArea="2/2/3/3" colorClass="bg-yellow-400/20" />
            <Line type="vertical" gridArea="2/3/3/4" colorClass="bg-yellow-400/20" />
            <Line type="vertical" gridArea="2/5/3/6" colorClass="bg-yellow-400/20" />
            <Line type="vertical" gridArea="2/7/3/8" colorClass="bg-yellow-400/20" />
            <Line type="radial-tl" gridArea="2/8/3/9" colorClass="bg-yellow-400/20" />
            <Line type="horizontal" gridArea="2/3/3/8" />

            {/* Row 3: Mini Abilities */}
            <div style={{ gridColumn: 2, gridRow: 3 }} className="flex justify-center items-center"><Node name="Kinetic Fury" icon={Sword} isAbility description="STR+SPI: Channel spiritual energy into devastating physical attacks." /></div>
            <div style={{ gridColumn: 4, gridRow: 3 }} className="flex justify-center items-center"><Node name="Psionic Bastion" icon={ShieldCheck} isAbility description="INT+SPI: Weave psionic energy into a protective shield that adapts to incoming threats." /></div>
            <div style={{ gridColumn: 6, gridRow: 3 }} className="flex justify-center items-center"><Node name="Combat Strategist" icon={BrainCog} isAbility description="STR+INT: Analyze battlefield situations with superhuman speed to exploit enemy weaknesses." /></div>
            <div style={{ gridColumn: 8, gridRow: 3 }} className="flex justify-center items-center"><Node name="Nexus Pulse" icon={Zap} isAbility description="STR+INT+SPI: Unleash a pulse of raw Nexus energy, disrupting everything around you. Highly unstable." /></div>

            {/* Row 4: Connections to Primary Derivatives */}
            <Line type="t-up" gridArea="2/2/3/3" />
            <Line type="t-up" gridArea="2/4/3/5" />
            <Line type="t-up" gridArea="2/6/3/7" />
            <Line type="t-up" gridArea="2/8/3/9" />

            <Line type="vertical" gridArea="4 / 3 / 5 / 4" />
            <Line type="vertical" gridArea="4 / 5 / 5 / 6" />
            <Line type="vertical" gridArea="4 / 7 / 5 / 8" />
            <Line type="t-down" gridArea="4 / 1 / 5 / 2" />
            <Line type="t-down" gridArea="4 / 9 / 5 / 10" />
            <Line type="horizontal" gridArea="4/1/5/10" />

            {/* Row 5: Primary Derivatives */}
            <div style={{ gridColumn: 1, gridRow: 5 }} className="flex justify-center items-center"><Node name="Cognitive Style" icon={GitBranch} formula="Ratio of Int to Spi" description="Your dominant mode of processing information." /></div>
            <div style={{ gridColumn: 2, gridRow: 5 }} className="flex justify-center items-center"><Node name="Mental Friction" icon={AlertTriangle} isCurse description="Over-analysis can lead to hesitation and second-guessing in critical moments." /></div>
            <div style={{ gridColumn: 3, gridRow: 5 }} className="flex justify-center items-center"><Node name="Stamina" icon={Hourglass} formula="(Strength * 5) + (Level * 2)" description="Determines how long you can perform strenuous actions." /></div>
            <div style={{ gridColumn: 4, gridRow: 5 }} className="flex justify-center items-center"><Node name="Adrenal Burnout" icon={AlertTriangle} isCurse description="Pushing your body too hard for too long can lead to sudden crashes and vulnerabilities." /></div>
            <div style={{ gridColumn: 5, gridRow: 5 }} className="flex justify-center items-center"><Node name="Carry Weight" icon={Weight} formula="10 + (Strength * 2)" description="How much you can carry before being encumbered." /></div>
            <div style={{ gridColumn: 6, gridRow: 5 }} className="flex justify-center items-center"><Node name="Physical Exhaustion" icon={AlertTriangle} isCurse description="The greater the load, the faster your fatigue accumulates, even when not in combat." /></div>
            <div style={{ gridColumn: 7, gridRow: 5 }} className="flex justify-center items-center"><Node name="Psionic Power" icon={Waves} formula="(Spirit * 1.5) + (Intelligence * 0.5)" description="The raw force of your mental abilities." /></div>
            <div style={{ gridColumn: 8, gridRow: 5 }} className="flex justify-center items-center"><Node name="Feedback Loop" icon={AlertTriangle} isCurse description="A powerful psionic backlash can occur if your concentration wavers, causing self-inflicted damage." /></div>
            
            {/* Row 6: Connections */}
            <Line type="t-up" gridArea="4 / 1 / 5 / 2" />
            <Line type="vertical" gridArea="6 / 1 / 7 / 2" />
            <Line type="vertical" gridArea="6 / 3 / 7 / 4" />
            <Line type="vertical" gridArea="6 / 5 / 7 / 6" />
            <Line type="vertical" gridArea="6 / 7 / 7 / 8" />

            <Line type="horizontal" gridArea="6/2/7/3" />
            <Line type="horizontal" gridArea="6/4/7/5" />
            <Line type="horizontal" gridArea="6/6/7/7" />

            {/* Row 7: Secondary Derivatives */}
             <div style={{ gridColumn: 1, gridRow: 7 }} className="flex justify-center items-center"><Node name="Logic" icon={Scale} formula="Based on high Intelligence" description="Represents analytical, data-driven, and deductive reasoning." /></div>
            <div style={{ gridColumn: 2, gridRow: 7 }} className="flex justify-center items-center"><Node name="Hacking Speed" icon={Cpu} formula="BaseSpeed / (Eff. Intelligence * 0.1)" description="How quickly you can slice through enemy security systems."/></div>
            <div style={{ gridColumn: 3, gridRow: 7 }} className="flex justify-center items-center"><Node name="Barter Bonus" icon={Coins} formula="(Spirit / 10)%" description="Your innate charm and presence allows you to negotiate better prices." /></div>
            <div style={{ gridColumn: 4, gridRow: 7 }} className="flex justify-center items-center"><Node name="Exploitable" icon={AlertTriangle} isCurse description="Your reputation for negotiation can sometimes attract con artists who see you as an easy mark." /></div>
            <div style={{ gridColumn: 5, gridRow: 7 }} className="flex justify-center items-center"><Node name="Intuition" icon={Eye} formula="Based on high Spirit" description="Represents gut feelings, empathy, and reading between the lines." /></div>
            <div style={{ gridColumn: 6, gridRow: 7 }} className="flex justify-center items-center"><Node name="Psionic Residue" icon={Ghost} isMystery description="Powerful mental or emotional events leave a trace. Can it be detected? Can it be used?" /></div>
            <div style={{ gridColumn: 7, gridRow: 7 }} className="flex justify-center items-center"><Node name="Unstable Connection" icon={AlertTriangle} isCurse description="The residue you detect can sometimes 'stick' to you, attracting unwanted dimensional attention." /></div>
            <div style={{ gridColumn: 8, gridRow: 7 }} className="flex justify-center items-center"><Node name="Effective Strength" icon={Dumbbell} formula="(BaseStr * FitnessMod * FatigueMod) + Enhancements" description="Your actual physical power in any given moment." /></div>
            <div style={{ gridColumn: 9, gridRow: 7 }} className="flex justify-center items-center"><Node name="Effective Intelligence" icon={Brain} formula="(BaseInt * ClarityMod * FocusMod) + Enhancements" description="Your actual cognitive power in any given moment." /></div>
            
            {/* Row 8: Connections */}
            <Line type="t-up" gridArea="6 / 2 / 7 / 3" />
            <Line type="vertical" gridArea="8/2/9/3" />
            <Line type="t-up" gridArea="6 / 4 / 7 / 5" />
            <Line type="vertical" gridArea="8/4/9/5" />
            <Line type="t-up" gridArea="6 / 6 / 7 / 7" />
            <Line type="vertical" gridArea="8/6/9/7" />
            <Line type="vertical" gridArea="8/8/9/9" />
            <Line type="vertical" gridArea="8/9/9/10" />

            <Line type="horizontal" gridArea="8/1/9/9" />

            {/* Row 9: Worldview & Mystery Nodes */}
            <div style={{ gridColumn: 1, gridRow: 9 }} className="flex justify-center items-center"><Node name="Materialism" icon={Anchor} formula="Favored by high Strength and Logic" description="A worldview focused on the tangible, physical aspects of reality." /></div>
            <div style={{ gridColumn: 3, gridRow: 9 }} className="flex justify-center items-center"><Node name="Worldview" icon={BookOpen} formula="Determined by Materialism vs Spiritualism" description="Your fundamental belief system about how the universe works." /></div>
            <div style={{ gridColumn: 5, gridRow: 9 }} className="flex justify-center items-center"><Node name="Spiritualism" icon={Feather} formula="Favored by high Spirit and Intuition" description="A worldview focused on the unseen, metaphysical, and dimensional energies." /></div>
            <div style={{ gridColumn: 7, gridRow: 9 }} className="flex justify-center items-center"><Node name="Karmic Trace" icon={Footprints} isMystery formula="[REDACTED]" description="The universe seems to remember your actions, both good and ill." /></div>
            <div style={{ gridColumn: 9, gridRow: 9 }} className="flex justify-center items-center"><Node name="Nexus Resonance" icon={GitCommit} isMystery formula="[REDACTED]" description="You feel a strange hum, a vibration that connects you to the fabric of the Nexus itself." /></div>

            {/* Row 10: Connections */}
            <Line type="t-up" gridArea="8/1/9/2" />
            <Line type="t-up" gridArea="8/3/9/4" />
            <Line type="t-up" gridArea="8/5/9/6" />
            <Line type="t-up" gridArea="8/7/9/8" />
            <Line type="t-up" gridArea="8/9/9/10" />

            <Line type="vertical" gridArea="10/3/11/4" />
            <Line type="vertical" gridArea="10/7/11/8" />
            <Line type="vertical" gridArea="10/9/11/10" />

            {/* Row 11: Deep Mystery */}
            <div style={{ gridColumn: 1, gridRow: 11 }} className="flex justify-center items-center"><Node name="Fate Inversion" icon={Recycle} isMystery formula="[REDACTED]" description="The ability to... change what was written? Is it possible to defy destiny itself?" /></div>
            <div style={{ gridColumn: 2, gridRow: 11 }} className="flex justify-center items-center"><Node name="Paradox" icon={AlertTriangle} isCurse description="Tampering with fate can cause reality to fray, leading to unpredictable and often dangerous side effects." /></div>
            <div style={{ gridColumn: 3, gridRow: 11 }} className="flex justify-center items-center"><Node name="Synaptic Potential" icon={HelpCircle} isMystery description="A measure of untapped neural pathways. What could they be used for?" /></div>
            <div style={{ gridColumn: 5, gridRow: 11 }} className="flex justify-center items-center"><Node name="Temporal Echo" icon={HelpCircle} isMystery description="Sometimes, you feel a faint resonance of choices not made. Deja vu, or something more?" /></div>
            <div style={{ gridColumn: 7, gridRow: 11 }} className="flex justify-center items-center"><Node name="Echo Chamber" icon={HelpCircle} isMystery formula="[REDACTED]" description="Do your own thoughts sound louder lately? Is it just you in there?" /></div>
            <div style={{ gridColumn: 9, gridRow: 11 }} className="flex justify-center items-center"><Node name="[REDACTED]" icon={HelpCircle} isMystery /></div>

            {/* Row 12: Connections */}
            <Line type="t-up" gridArea="10/1/11/2" />
            <Line type="t-up" gridArea="10/5/11/6" />

          </div>
      </CardContent>
    </Card>
  );
}
