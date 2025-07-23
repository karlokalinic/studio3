

"use client";

import type { CharacterProfile } from "@/types";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { AlertTriangle, Cpu, Dumbbell, Brain, Heart, Shield, HelpCircle, Weight, Footprints, Hourglass, Atom, Coins, Handshake, BrainCircuit, BookOpen, Scale, Eye, Ghost, Anchor, Feather, Recycle, GitCommit, GitBranch, Waves, Zap, ShieldCheck, Sword, BrainCog, Microscope, Dna, Bot, Sprout, Network, Combine, Fingerprint, LucideIcon, FileJson, Server, Binary, GitFork, ShieldQuestion, HeartCrack, Flame } from "lucide-react";
import { Node } from "./stat-internals/node";
import { Line } from "./stat-internals/line";


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
            <div style={{ gridColumn: 4, gridRow: 3 }} className="flex justify-center items-center"><Node name="Analysis Paralysis" icon={AlertTriangle} colorClass="curse" description="Over-analysis can lead to hesitation and second-guessing in critical moments." formula="Chance = (Eff. INT - 15) / 2 - (Spirit / 4)"/></div>
            <div style={{ gridColumn: 6, gridRow: 3 }} className="flex justify-center items-center"><Node name="Physical Fortitude" icon={Shield} description="Your body's resilience and durability." /></div>
            <div style={{ gridColumn: 7, gridRow: 3 }} className="flex justify-center items-center"><Node name="Adrenal Burnout" icon={AlertTriangle} colorClass="curse" description="Pushing your body too hard for too long can lead to sudden crashes and vulnerabilities." formula="15% penalty to STR effectiveness when Fatigue > 70"/></div>
            <div style={{ gridColumn: 9, gridRow: 3 }} className="flex justify-center items-center"><Node name="Psionic Force" icon={Waves} description="The raw force of your mental and spiritual abilities." /></div>
            <div style={{ gridColumn: 10, gridRow: 3 }} className="flex justify-center items-center"><Node name="Feedback Loop" icon={AlertTriangle} colorClass="curse" description="A powerful psionic backlash can occur if your concentration wavers, causing self-inflicted damage." formula="Damage = floor(Spirit / 5) * 2"/></div>

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
            <div style={{ gridColumn: 2, gridRow: 5 }} className="flex justify-center items-center"><Node name="Hacking Speed" icon={Cpu} formula="10 - (log(Eff. INT) * 2) + Difficulty" description="How quickly you can slice through enemy security systems. Lower is better."/></div>
            <div style={{ gridColumn: 4, gridRow: 5 }} className="flex justify-center items-center"><Node name="Carry Weight" icon={Weight} formula="20 + (Eff. STR * 3)" description="How much you can carry before being encumbered." /></div>
            <div style={{ gridColumn: 6, gridRow: 5 }} className="flex justify-center items-center"><Node name="Barter Bonus" icon={Coins} formula="floor(Eff. Spirit / 4)%" description="Your innate charm and presence allows you to negotiate better prices." /></div>
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
