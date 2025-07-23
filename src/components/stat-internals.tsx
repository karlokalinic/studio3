
"use client";

import type { CharacterProfile } from "@/types";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertTriangle, Cpu, Dumbbell, Brain, Heart, Shield, HelpCircle, Weight, Footprints, Hourglass, Atom, Coins, Handshake, BrainCircuit, BookOpen, Scale, Eye, Ghost, Anchor, Feather, Recycle, GitCommit, GitBranch, Waves, Zap, ShieldCheck, Sword, BrainCog, Microscope, Dna, Bot, Sprout, Network, Combine, Fingerprint, LucideIcon, FileJson, Server, Binary, GitFork, ShieldQuestion, HeartCrack, Flame } from "lucide-react";
import { Button } from "./ui/button";
import React from "react";
import { cn } from "@/lib/utils";

const Node = React.forwardRef<HTMLDivElement, { name: string; icon: React.ElementType; formula?: string; description?: string; colorClass?: string; children?: React.ReactNode }>(
    ({ name, icon, formula, description, colorClass = 'primary', children }, ref) => {
    const Icon = icon;
    
    const colors: {[key: string]: { border: string, icon: string, text: string }} = {
        primary: { border: 'border-primary/30 hover:border-primary/80 hover:shadow-primary/20', icon: 'text-primary', text: 'text-primary'},
        core: { border: 'border-accent/50 hover:border-accent/80 hover:shadow-accent/20', icon: 'text-accent', text: 'text-accent' },
        curse: { border: 'border-destructive/50 hover:border-destructive/80 hover:shadow-destructive/20', icon: 'text-destructive', text: 'text-destructive' },
        ability: { border: 'border-yellow-400/50 hover:border-yellow-400/80 hover:shadow-yellow-400/20', icon: 'text-yellow-400', text: 'text-yellow-400' },
        order: { border: 'border-cyan-400/50 hover:border-cyan-400/80 hover:shadow-cyan-400/20', icon: 'text-cyan-400', text: 'text-cyan-400' },
        chaos: { border: 'border-fuchsia-500/50 hover:border-fuchsia-500/80 hover:shadow-fuchsia-500/20', icon: 'text-fuchsia-500', text: 'text-fuchsia-500' },
        balance: { border: 'border-lime-500/50 hover:border-lime-500/80 hover:shadow-lime-500/20', icon: 'text-lime-500', text: 'text-lime-500' },
        convergence: { border: 'border-orange-500/50 hover:border-orange-500/80 hover:shadow-orange-500/20', icon: 'text-orange-500', text: 'text-orange-500' },
        mystery: { border: 'border-slate-500/50 hover:border-slate-500/80 hover:shadow-slate-500/20', icon: 'text-slate-500', text: 'text-slate-500' },
    }

    const selectedColor = colors[colorClass] || colors.primary;

    const nodeContent = (
         <div ref={ref} className="relative group flex items-center justify-center">
            <div 
                className={cn(`group w-20 h-20 bg-black/20 rounded-lg border-2 cursor-pointer shadow-md overflow-hidden relative flex flex-col items-center justify-center transition-all duration-300 hover:scale-105`, selectedColor.border)}
            >
                <div className={cn(`w-full h-full flex flex-col items-center justify-center p-2 text-center`)}>
                    <Icon className={cn(`w-8 h-8 mb-1 transition-all group-hover:scale-110`, selectedColor.icon)} />
                </div>
                 <p className={`absolute -bottom-0.5 w-full text-center px-1 font-bold text-[10px] opacity-0 group-hover:opacity-100 transition-opacity duration-300`}>{name}</p>
            </div>
        </div>
    );

    return (
        <Dialog>
            <DialogTrigger asChild>
                {nodeContent}
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className={cn("font-headline flex items-center gap-2 text-2xl", selectedColor.text)}><Icon className="w-8 h-8"/> {name}</DialogTitle>
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
                 {colorClass !== 'curse' && colorClass !== 'mystery' && (
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

const Line = ({ type, gridArea, colorClass = 'bg-primary/20' }: { type: 'horizontal' | 'vertical' | 't-down' | 't-up' | 'cross' | 'corner-br' | 'corner-bl' | 'corner-tr' | 'corner-tl' | 'radial-tr' | 'radial-tl' | 'radial-br' | 'radial-bl' | 'z-ne' | 'z-en' | 'z-sw' | 'z-ws'; gridArea: string, colorClass?: string }) => {
  const baseClasses = colorClass;
  
  if (type === 'horizontal') return <div style={{ gridArea }} className="flex items-center"><div className={`${baseClasses} w-full h-0.5`}></div></div>;
  if (type === 'vertical') return <div style={{ gridArea }} className="flex justify-center"><div className={`${baseClasses} h-full w-0.5`}></div></div>;
  
  const rotationClasses: { [key: string]: string } = {
    'radial-tr': 'bottom-0 left-0 origin-bottom-left -rotate-45', 'radial-tl': 'bottom-0 right-0 origin-bottom-right rotate-45',
    'radial-br': 'top-0 left-0 origin-top-left rotate-45', 'radial-bl': 'top-0 right-0 origin-top-right -rotate-45',
  }

  if (rotationClasses[type]) {
    return <div style={{ gridArea }} className="relative"><div className={`${baseClasses} absolute w-full h-0.5 ${rotationClasses[type]}`}></div></div>;
  }
  
  return (
    <div style={{ gridArea }} className="relative w-full h-full">
      { (type === 't-down' || type === 'cross' || type.startsWith('corner-b')) && <div className={`${baseClasses} absolute top-0 left-1/2 w-0.5 h-1/2 -translate-x-1/2`}></div> }
      { (type === 't-up' || type === 'cross' || type.startsWith('corner-t')) && <div className={`${baseClasses} absolute bottom-0 left-1/2 w-0.5 h-1/2 -translate-x-1/2`}></div> }
      
      { (type.startsWith('t-') || type === 'cross' || type.startsWith('corner')) && <div className={`${baseClasses} absolute top-1/2 left-0 w-full h-0.5 -translate-y-1/2`}></div> }

      { (type === 'corner-br') && <><div className={`${baseClasses} absolute top-1/2 left-1/2 w-1/2 h-0.5 -translate-y-1/2`}></div><div className={`${baseClasses} absolute top-0 left-1/2 w-0.5 h-1/2 -translate-x-1/2`}></div></> }
      { (type === 'corner-bl') && <><div className={`${baseClasses} absolute top-1/2 right-1/2 w-1/2 h-0.5 -translate-y-1/2`}></div><div className={`${baseClasses} absolute top-0 left-1/2 w-0.5 h-1/2 -translate-x-1/2`}></div></> }
      { (type === 'corner-tr') && <><div className={`${baseClasses} absolute bottom-1/2 left-1/2 w-1/2 h-0.5 -translate-y-1/2`}></div><div className={`${baseClasses} absolute bottom-0 left-1/2 w-0.5 h-1/2 -translate-x-1/2`}></div></> }
      { (type === 'corner-tl') && <><div className={`${baseClasses} absolute bottom-1/2 right-1/2 w-1/2 h-0.5 -translate-y-1/2`}></div><div className={`${baseClasses} absolute bottom-0 left-1/2 w-0.5 h-1/2 -translate-x-1/2`}></div></> }

    </div>
  );
};


export default function StatInternals({ profile }: { profile: CharacterProfile }) {
  const gridStyles = {
    gridTemplateColumns: 'repeat(13, 1fr)',
    gridAutoRows: 'minmax(6rem, auto)',
    gap: '0rem',
  };

  return (
    <Card className="bg-transparent border-none shadow-none">
      <CardHeader className="text-center">
        <CardTitle className="font-headline text-3xl text-primary">Stat Internals</CardTitle>
        <CardDescription>The nexus is complex. Hover over nodes for names, click for details. Every enhancement comes with a price.</CardDescription>
      </CardHeader>
      <CardContent className="p-0 overflow-x-auto">
          <div className="grid" style={gridStyles}>
            {/* --- TOP TREE: The Self --- */}

            {/* Row 1: Core Attributes */}
            <div style={{ gridColumn: 4, gridRow: 1 }} className="flex justify-center items-center"><Node name="Intelligence" icon={BrainCircuit} colorClass="core" description="Your mind's processing power, memory, and analytical capability."/></div>
            <div style={{ gridColumn: 7, gridRow: 1 }} className="flex justify-center items-center"><Node name="Strength" icon={Dumbbell} colorClass="core" description="Your body's raw physical power. The foundation for all physical feats." /></div>
            <div style={{ gridColumn: 10, gridRow: 1 }} className="flex justify-center items-center"><Node name="Spirit" icon={Atom} colorClass="core" description="Your connection to the metaphysical and your inner willpower."/></div>
            
            <Line type="horizontal" gridArea="2/4/3/11" />
            <Line type="t-down" gridArea="2/4/3/5" />
            <Line type="t-down" gridArea="2/7/3/8" />
            <Line type="t-down" gridArea="2/10/3/11" />

            {/* Row 3: Primary Derivatives & Curses */}
            <div style={{ gridColumn: 3, gridRow: 3 }} className="flex justify-center items-center"><Node name="Cognitive Power" icon={Brain} description="The raw processing capability of your mind." /></div>
            <div style={{ gridColumn: 4, gridRow: 3 }} className="flex justify-center items-center"><Node name="Analysis Paralysis" icon={AlertTriangle} colorClass="curse" description="Over-analysis can lead to hesitation and second-guessing in critical moments." /></div>
            <div style={{ gridColumn: 6, gridRow: 3 }} className="flex justify-center items-center"><Node name="Physical Fortitude" icon={Shield} description="Your body's resilience and durability." /></div>
            <div style={{ gridColumn: 7, gridRow: 3 }} className="flex justify-center items-center"><Node name="Adrenal Burnout" icon={AlertTriangle} colorClass="curse" description="Pushing your body too hard for too long can lead to sudden crashes and vulnerabilities." /></div>
            <div style={{ gridColumn: 9, gridRow: 3 }} className="flex justify-center items-center"><Node name="Psionic Force" icon={Waves} description="The raw force of your mental and spiritual abilities." /></div>
            <div style={{ gridColumn: 10, gridRow: 3 }} className="flex justify-center items-center"><Node name="Feedback Loop" icon={AlertTriangle} colorClass="curse" description="A powerful psionic backlash can occur if your concentration wavers, causing self-inflicted damage." /></div>

            <Line type="t-down" gridArea="2/4/4/5" />
            <Line type="corner-br" gridArea="3/3/4/4" />
            <Line type="t-down" gridArea="2/7/4/8" />
            <Line type="corner-br" gridArea="3/6/4/7" />
            <Line type="t-down" gridArea="2/10/4/11" />
            <Line type="corner-br" gridArea="3/9/4/10" />
           
            {/* Row 4: Connections */}
            <Line type="vertical" gridArea="4/3/5/4" />
            <Line type="vertical" gridArea="4/6/5/7" />
            <Line type="vertical" gridArea="4/9/5/10" />

            {/* Row 5: Secondary Derivatives */}
            <div style={{ gridColumn: 2, gridRow: 5 }} className="flex justify-center items-center"><Node name="Hacking Speed" icon={Cpu} formula="BaseSpeed / (Eff. Intelligence * 0.1)" description="How quickly you can slice through enemy security systems."/></div>
            <div style={{ gridColumn: 4, gridRow: 5 }} className="flex justify-center items-center"><Node name="Carry Weight" icon={Weight} formula="10 + (Strength * 2)" description="How much you can carry before being encumbered." /></div>
            <div style={{ gridColumn: 6, gridRow: 5 }} className="flex justify-center items-center"><Node name="Barter Bonus" icon={Coins} formula="(Spirit / 10)%" description="Your innate charm and presence allows you to negotiate better prices." /></div>
            <div style={{ gridColumn: 8, gridRow: 5 }} className="flex justify-center items-center"><Node name="Worldview" icon={BookOpen} formula="Determined by Materialism vs Spiritualism" description="Your fundamental belief system about how the universe works." /></div>
            <div style={{ gridColumn: 10, gridRow: 5 }} className="flex justify-center items-center"><Node name="Nexus Resonance" icon={GitCommit} colorClass="mystery" formula="[REDACTED]" description="You feel a strange hum, a vibration that connects you to the fabric of the Nexus itself." /></div>

            <Line type="corner-br" gridArea="4/3/5/4" /><Line type="horizontal" gridArea="5/2/6/3" />
            <Line type="corner-bl" gridArea="4/3/5/4" /><Line type="corner-br" gridArea="4/6/5/7" /><Line type="horizontal" gridArea="5/4/6/5" />
            <Line type="corner-bl" gridArea="4/6/5/7" /><Line type="corner-br" gridArea="4/9/5/10" /><Line type="horizontal" gridArea="5/6/6/7" />
            <Line type="corner-bl" gridArea="4/9/5/10" /><Line type="horizontal" gridArea="5/8/6/9" />
            <Line type="horizontal" gridArea="5/10/6/11" />

            {/* Row 6: Connections to Convergence */}
            <Line type="vertical" gridArea="6/2/7/3" />
            <Line type="vertical" gridArea="6/4/7/5" />
            <Line type="vertical" gridArea="6/6/7/7" />
            <Line type="vertical" gridArea="6/8/7/9" />
            <Line type="vertical" gridArea="6/10/7/11" />
            <Line type="corner-tr" gridArea="6/4/7/3" colorClass="bg-yellow-400/20" />
            <Line type="corner-tr" gridArea="6/6/7/5" colorClass="bg-yellow-400/20" />
            <Line type="corner-tl" gridArea="6/6/7/7" colorClass="bg-yellow-400/20" />
            <Line type="corner-tr" gridArea="6/8/7/7" colorClass="bg-yellow-400/20" />
            <Line type="corner-tl" gridArea="6/8/7/9" colorClass="bg-yellow-400/20" />
            <Line type="corner-tl" gridArea="6/10/7/9" colorClass="bg-yellow-400/20" />

            {/* --- CONVERGENCE ZONE --- */}
            
            {/* Row 7: Hybrid Abilities */}
            <div style={{ gridColumn: 3, gridRow: 7 }} className="flex justify-center items-center"><Node name="Combat Strategist" icon={BrainCog} colorClass="ability" description="STR+INT: Analyze battlefield situations with superhuman speed to exploit enemy weaknesses." /></div>
            <div style={{ gridColumn: 5, gridRow: 7 }} className="flex justify-center items-center"><Node name="Kinetic Fury" icon={Sword} colorClass="ability" description="STR+SPI: Channel spiritual energy into devastating physical attacks." /></div>
            <div style={{ gridColumn: 9, gridRow: 7 }} className="flex justify-center items-center"><Node name="Psionic Bastion" icon={ShieldCheck} colorClass="ability" description="INT+SPI: Weave psionic energy into a protective shield that adapts to incoming threats." /></div>
            <div style={{ gridColumn: 11, gridRow: 7 }} className="flex justify-center items-center"><Node name="Nexus Pulse" icon={Zap} colorClass="ability" description="STR+INT+SPI: Unleash a pulse of raw Nexus energy, disrupting everything around you. Highly unstable." /></div>

            <Line type="vertical" gridArea="8/3/9/4" colorClass="bg-yellow-400/20" />
            <Line type="vertical" gridArea="8/5/9/6" colorClass="bg-yellow-400/20" />
            <Line type="vertical" gridArea="8/9/9/10" colorClass="bg-yellow-400/20" />
            <Line type="vertical" gridArea="8/11/9/12" colorClass="bg-yellow-400/20" />
            <Line type="vertical" gridArea="8/7/9/8" colorClass="bg-orange-500/20" />
            <Line type="radial-bl" gridArea="6/2/7/3" colorClass="bg-yellow-400/20" />
            <Line type="radial-br" gridArea="6/4/7/3" colorClass="bg-yellow-400/20" />
            <Line type="radial-bl" gridArea="6/6/7/5" colorClass="bg-yellow-400/20" />
            <Line type="radial-br" gridArea="6/8/7/5" colorClass="bg-yellow-400/20" />
            <Line type="radial-bl" gridArea="6/8/7/9" colorClass="bg-yellow-400/20" />
            <Line type="radial-br" gridArea="6/10/7/9" colorClass="bg-yellow-400/20" />

            {/* Row 9: Grand Convergence Abilities */}
            <div style={{ gridColumn: 4, gridRow: 9 }} className="flex justify-center items-center"><Node name="Techno-Golem Summon" icon={Bot} colorClass="convergence" description="INT+ORDER: Reconfigure ambient technology and scrap into a loyal, temporary combat automaton." /></div>
            <div style={{ gridColumn: 7, gridRow: 9 }} className="flex justify-center items-center"><Node name="Singularity Breach" icon={Combine} colorClass="convergence" description="SELF+NEXUS: A pinnacle ability. Tear a hole in reality, causing immense damage and unpredictable side effects. The ultimate gamble." /></div>
            <div style={{ gridColumn: 10, gridRow: 9 }} className="flex justify-center items-center"><Node name="World-Tree Symbiosis" icon={Sprout} colorClass="convergence" description="SPI+BALANCE: Become one with the environment, healing allies, entangling foes, and terraforming small areas." /></div>
            
            <Line type="corner-bl" gridArea="8/3/9/4" /><Line type="corner-br" gridArea="8/5/9/4" colorClass="bg-orange-500/20" />
            <Line type="corner-bl" gridArea="8/5/9/7" /><Line type="corner-br" gridArea="8/9/9/7" colorClass="bg-orange-500/20" />
            <Line type="corner-bl" gridArea="8/9/9/10" /><Line type="corner-br" gridArea="8/11/9/10" colorClass="bg-orange-500/20" />
            <Line type="t-down" gridArea="8/7/10/8" colorClass="bg-orange-500/20" />

            {/* Row 10: Connections from Convergence */}
             <Line type="vertical" gridArea="10/4/11/5" colorClass="bg-orange-500/20" />
             <Line type="vertical" gridArea="10/7/11/8" colorClass="bg-orange-500/20" />
             <Line type="vertical" gridArea="10/10/11/11" colorClass="bg-orange-500/20" />
             <Line type="cross" gridArea="10/7/11/8" colorClass="bg-orange-500/20" />


            {/* --- BOTTOM TREE: Nexus Attunement --- */}

             {/* Row 11: Tertiary Nexus Attunements */}
            <div style={{ gridColumn: 2, gridRow: 11 }} className="flex justify-center items-center"><Node name="Protocol-Driven Defense" icon={FileJson} colorClass="order" description="Analyze attack patterns to generate predictive shielding."/></div>
            <div style={{ gridColumn: 4, gridRow: 11 }} className="flex justify-center items-center"><Node name="Controlled-Entropy Strikes" icon={GitFork} colorClass="chaos" description="Attacks have a chance to chain to nearby enemies or apply random status effects."/></div>
            <div style={{ gridColumn: 6, gridRow: 11 }} className="flex justify-center items-center"><Node name="One with the System" icon={Fingerprint} colorClass="balance" description="Become harder to detect by both organic and synthetic beings."/></div>
            <div style={{ gridColumn: 8, gridRow: 11 }} className="flex justify-center items-center"><Node name="Glimpse the Code" icon={Binary} colorClass="mystery" description="Briefly see the underlying 'code' of reality, revealing secrets and weaknesses."/></div>
            <div style={{ gridColumn: 10, gridRow: 11 }} className="flex justify-center items-center"><Node name="Data Phage" icon={HeartCrack} colorClass="curse" description="Your very presence can corrupt unsecured data streams, sometimes with disastrous consequences."/></div>
            
            <Line type="corner-tl" gridArea="10/4/11/3" /><Line type="horizontal" gridArea="11/2/12/3" colorClass="bg-cyan-400/20"/>
            <Line type="corner-tr" gridArea="10/4/11/5" /><Line type="horizontal" gridArea="11/4/12/5" colorClass="bg-fuchsia-500/20"/>
            <Line type="t-up" gridArea="10/7/12/8" /><Line type="horizontal" gridArea="11/6/12/7" colorClass="bg-lime-500/20"/>
            <Line type="corner-tl" gridArea="10/10/11/9" /><Line type="horizontal" gridArea="11/8/12/9" colorClass="bg-slate-500/20" />
            <Line type="corner-tr" gridArea="10/10/11/11" /><Line type="horizontal" gridArea="11/10/12/11" colorClass="bg-destructive/20" />

             {/* Row 12: Connections up to Primary Nexus Attunements */}
             <Line type="vertical" gridArea="12/3/13/4" colorClass="bg-cyan-400/20" />
             <Line type="vertical" gridArea="12/5/13/6" colorClass="bg-fuchsia-500/20" />
             <Line type="vertical" gridArea="12/7/13/8" colorClass="bg-lime-500/20" />

            {/* Row 13: Primary Nexus Attunements & Curses */}
            <div style={{ gridColumn: 3, gridRow: 13 }} className="flex justify-center items-center"><Node name="System Architecture" icon={Server} colorClass="order" description="Deep understanding of systems, networks, and logical structures."/></div>
            <div style={{ gridColumn: 4, gridRow: 13 }} className="flex justify-center items-center"><Node name="Rigidity of Thought" icon={AlertTriangle} colorClass="curse" description="An over-reliance on logic makes it difficult to adapt to truly chaotic, illogical events."/></div>
            <div style={{ gridColumn: 5, gridRow: 13 }} className="flex justify-center items-center"><Node name="Reality Warping" icon={Dna} colorClass="chaos" description="Minor, passive influence over probability and physical laws."/></div>
            <div style={{ gridColumn: 6, gridRow: 13 }} className="flex justify-center items-center"><Node name="Unraveling" icon={AlertTriangle} colorClass="curse" description="Your own physical form is subject to random, minor mutations and destabilizations."/></div>
            <div style={{ gridColumn: 7, gridRow: 13 }} className="flex justify-center items-center"><Node name="Ecological Harmony" icon={Microscope} colorClass="balance" description="An intuitive connection to flora, fauna, and natural systems."/></div>
            <div style={{ gridColumn: 8, gridRow: 13 }} className="flex justify-center items-center"><Node name="Primal Regression" icon={AlertTriangle} colorClass="curse" description="In moments of stress, you may lose higher cognitive functions and act on pure, animalistic instinct."/></div>

            <Line type="t-up" gridArea="12/3/14/4" colorClass="bg-cyan-400/20" />
            <Line type="horizontal" gridArea="13/3/14/4" colorClass="bg-destructive/20" />
            <Line type="t-up" gridArea="12/5/14/6" colorClass="bg-fuchsia-500/20" />
            <Line type="horizontal" gridArea="13/5/14/6" colorClass="bg-destructive/20" />
            <Line type="t-up" gridArea="12/7/14/8" colorClass="bg-lime-500/20" />
            <Line type="horizontal" gridArea="13/7/14/8" colorClass="bg-destructive/20" />

             {/* Row 14: Connections up to Core Nexus Roots */}
            <Line type="vertical" gridArea="14/3/15/4" colorClass="bg-cyan-400/20" />
            <Line type="vertical" gridArea="14/5/15/6" colorClass="bg-fuchsia-500/20" />
            <Line type="vertical" gridArea="14/7/15/8" colorClass="bg-lime-500/20" />

            {/* Row 15: Core Nexus Roots */}
            <div style={{ gridColumn: 4, gridRow: 15 }} className="flex justify-center items-center"><Node name="Path of Order" icon={Network} colorClass="order" description="Embrace logic, technology, and structure. Tame the chaos of the Nexus."/></div>
            <div style={{ gridColumn: 7, gridRow: 15 }} className="flex justify-center items-center"><Node name="Path of Chaos" icon={Flame} colorClass="chaos" description="Embrace freedom, entropy, and raw power. Become an agent of change."/></div>
            <div style={{ gridColumn: 10, gridRow: 15 }} className="flex justify-center items-center"><Node name="Path of Balance" icon={Scale} colorClass="balance" description="Walk the line between creation and destruction. Be the eye of the storm."/></div>

            <Line type="horizontal" gridArea="14/3/15/8" />
            <Line type="t-up" gridArea="14/4/15/5" />
            <Line type="t-up" gridArea="14/7/15/8" />
            <Line type="t-up" gridArea="14/10/15/11" />
            <Line type="corner-tl" gridArea="14/5/15/4" />
            <Line type="corner-tr" gridArea="14/5/15/6" />
            <Line type="corner-tl" gridArea="14/9/15/8" />
            <Line type="corner-tr" gridArea="14/9/15/10" />
          </div>
      </CardContent>
    </Card>
  );
}
