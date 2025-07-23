
"use client";

import type { CharacterProfile } from "@/types";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertTriangle, Cpu, Dumbbell, Brain, Heart, Shield, HelpCircle, Weight, Footprints, Hourglass, Atom, Coins, Handshake, BrainCircuit, BookOpen, Scale, Eye, Ghost, Anchor, Feather, Recycle, GitCommit, GitBranch, Waves } from "lucide-react";
import { Button } from "./ui/button";

const Node = ({ name, icon, formula, description, isCore, isMystery, children }: { name: string; icon: React.ElementType; formula?: string; description?: string; isCore?: boolean; isMystery?: boolean; children?: React.ReactNode }) => {
    const Icon = icon;
    
    const nodeContent = (
      <div className={`w-full h-full flex flex-col items-center justify-center p-2 text-center transition-all duration-300 transform group-hover:bg-opacity-20 ${isCore ? 'group-hover:bg-accent' : 'group-hover:bg-primary'}`}>
        <Icon className={`w-10 h-10 mb-1 transition-all group-hover:scale-110 ${isCore ? 'text-accent' : 'text-primary'}`} />
        <p className={`font-bold text-sm absolute bottom-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${isMystery ? 'italic text-muted-foreground' : ''}`}>{name}</p>
      </div>
    );
    
    const NodeWrapper = ({ children }: { children: React.ReactNode }) => (
        <div className={`group w-32 h-32 bg-black/20 rounded-lg border-2 ${isCore ? 'border-accent/50 hover:shadow-accent/20' : 'border-primary/30 hover:shadow-primary/20'} cursor-pointer shadow-md overflow-hidden relative flex flex-col items-center justify-center`}>
            {children}
        </div>
    );

    return (
        <Dialog>
            <DialogTrigger asChild>
                <NodeWrapper>{nodeContent}</NodeWrapper>
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
};


const Line = ({ type, gridArea, colorClass = 'bg-primary/20' }: { type: 'horizontal' | 'vertical' | 't-down' | 't-up' | 'cross' | 'corner-br' | 'corner-bl' | 'corner-tr' | 'corner-tl'; gridArea: string, colorClass?: string }) => {
  const baseClasses = colorClass;
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
          <div className={`${baseClasses} absolute top-0 left-1/2 w-0.5 h-full -translate-x-1/2`}></div>
          <div className={`${baseClasses} absolute bottom-1/2 left-0 w-full h-0.5 -translate-y-1/2`}></div>
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
            <div className={`${baseClasses} absolute top-0 right-1/2 w-0.5 h-1/2`}></div>
            <div className={`${baseClasses} absolute top-1/2 left-0 w-full h-0.5`}></div>
        </div>
      )
     case 'corner-bl':
        classes = `relative w-full h-full`;
        return (
            <div style={{ gridArea }} className={classes}>
                <div className={`${baseClasses} absolute top-0 left-1/2 w-0.5 h-1/2`}></div>
                <div className={`${baseClasses} absolute top-1/2 right-0 w-full h-0.5`}></div>
            </div>
        )
    case 'corner-tr':
        classes = `relative w-full h-full`;
        return (
            <div style={{ gridArea }} className={classes}>
                <div className={`${baseClasses} absolute bottom-0 right-1/2 w-0.5 h-1/2`}></div>
                <div className={`${baseClasses} absolute bottom-1/2 left-0 w-full h-0.5`}></div>
            </div>
        )
    case 'corner-tl':
        classes = `relative w-full h-full`;
        return (
            <div style={{ gridArea }} className={classes}>
                <div className={`${baseClasses} absolute bottom-0 left-1/2 w-0.5 h-1/2`}></div>
                <div className={`${baseClasses} absolute bottom-1/2 right-0 w-full h-0.5`}></div>
            </div>
        )
  }

  return <div style={{ gridArea }} className={classes}></div>;
};

export default function StatInternals({ profile }: { profile: CharacterProfile }) {

  return (
    <Card className="bg-card/50 border-primary/20 shadow-lg shadow-primary/5">
      <CardHeader>
        <CardTitle className="font-headline text-2xl text-primary">Stat Internals</CardTitle>
        <CardDescription>The nexus is complex. Click on nodes for details. Some systems are known, others are yet to be understood.</CardDescription>
      </CardHeader>
      <CardContent className="p-0">
          <div 
            className="grid"
            style={{
                gridTemplateColumns: 'repeat(7, 1fr)',
                gridTemplateRows: 'repeat(10, 1fr)',
                gridTemplateAreas: `
                    ". . coreInt . coreStr . coreSpi"
                    ". lineA lineB lineC lineD lineE ."
                    "nodeP1 . nodeP2 . nodeP3 . nodeP4"
                    "lineF lineG lineH lineI lineJ lineK lineL"
                    "nodeC1 nodeC2 nodeC3 nodeC4 nodeC5 nodeC6 nodeC7"
                    "lineM lineN lineO lineP lineQ lineR lineS"
                    "nodeW1 . nodeW2 . nodeW3 . nodeW4"
                    "lineT . lineU . lineV . lineW"
                    "nodeM1 nodeM2 nodeM3 nodeM4 nodeM5 nodeM6 nodeM7"
                    ". lineX . lineY . lineZ ."
                `,
                gap: '0.5rem',
                minHeight: '1500px',
            }}
          >
            {/* Core Nodes */}
            <div style={{ gridArea: 'coreStr' }} className="flex justify-center items-center"><Node name="Strength" icon={Dumbbell} isCore description="Your body's raw physical power. The foundation for all physical feats." /></div>
            <div style={{ gridArea: 'coreInt' }} className="flex justify-center items-center"><Node name="Intelligence" icon={BrainCircuit} isCore description="Your mind's processing power, memory, and analytical capability."/></div>
            <div style={{ gridArea: 'coreSpi' }} className="flex justify-center items-center"><Node name="Spirit" icon={Atom} isCore description="Your connection to the metaphysical and your inner willpower."/></div>

            {/* Connecting Lines Row 1 */}
            <Line type="corner-br" gridArea="lineA" />
            <Line type="cross" gridArea="lineB" />
            <Line type="t-down" gridArea="lineC" />
            <Line type="cross" gridArea="lineD" />
            <Line type="corner-bl" gridArea="lineE" />

            {/* Primary Derivatives */}
            <div style={{ gridArea: 'nodeP1' }} className="flex justify-center items-center"><Node name="Stamina" icon={Hourglass} formula="(Strength * 5) + (Level * 2)" description="Determines how long you can perform strenuous actions." /></div>
            <div style={{ gridArea: 'nodeP2' }} className="flex justify-center items-center"><Node name="Cognitive Style" icon={GitBranch} formula="Ratio of Int to Spi" description="Your dominant mode of processing information. Influences dialogue options and problem-solving approaches." /></div>
            <div style={{ gridArea: 'nodeP3' }} className="flex justify-center items-center"><Node name="Carry Weight" icon={Weight} formula="10 + (Strength * 2)" description="How much you can carry before being encumbered." /></div>
            <div style={{ gridArea: 'nodeP4' }} className="flex justify-center items-center"><Node name="Psionic Power" icon={Waves} formula="(Spirit * 1.5) + (Intelligence * 0.5)" description="The raw force of your mental and dimensional abilities." /></div>

            {/* Connecting Lines Row 2 */}
            <Line type="vertical" gridArea="lineF" />
            <Line type="corner-br" gridArea="lineG" />
            <Line type="corner-bl" gridArea="lineH" />
            <Line type="vertical" gridArea="lineI" />
            <Line type="corner-br" gridArea="lineJ" />
            <Line type="corner-bl" gridArea="lineK" />
            <Line type="vertical" gridArea="lineL" />
            
            {/* Secondary Derivatives */}
            <div style={{ gridArea: 'nodeC1' }} className="flex justify-center items-center"><Node name="Effective Strength" icon={Dumbbell} formula="(BaseStr * FitnessMod * FatigueMod) + Enhancements" description="Your actual physical power in any given moment, after all situational modifiers are applied." /></div>
            <div style={{ gridArea: 'nodeC2' }} className="flex justify-center items-center"><Node name="Logic" icon={Scale} formula="Based on high Intelligence" description="Represents analytical, data-driven, and deductive reasoning. Unlocks specific dialogue and interaction options." /></div>
            <div style={{ gridArea: 'nodeC3' }} className="flex justify-center items-center"><Node name="Intuition" icon={Eye} formula="Based on high Spirit" description="Represents gut feelings, empathy, and reading between the lines. Unlocks specific dialogue and interaction options." /></div>
            <div style={{ gridArea: 'nodeC4' }} className="flex justify-center items-center"><Node name="Effective Intelligence" icon={Brain} formula="(BaseInt * ClarityMod * FocusMod) + Enhancements" description="Your actual cognitive power in any given moment, after all situational modifiers are applied." /></div>
            <div style={{ gridArea: 'nodeC5' }} className="flex justify-center items-center"><Node name="Hacking Speed" icon={Cpu} formula="BaseSpeed / (Eff. Intelligence * 0.1)" description="How quickly you can slice through enemy security systems and access protected data."/></div>
            <div style={{ gridArea: 'nodeC6' }} className="flex justify-center items-center"><Node name="Barter Bonus" icon={Coins} formula="(Spirit / 10)%" description="Your innate charm and presence allows you to negotiate better prices with merchants." /></div>
            <div style={{ gridArea: 'nodeC7' }} className="flex justify-center items-center"><Node name="Psionic Residue" icon={Ghost} isMystery description="Powerful mental or emotional events leave a trace. Can it be detected? Can it be used?" /></div>

            {/* Connecting Lines Row 3 */}
            <Line type="corner-br" gridArea="lineM" />
            <Line type="t-up" gridArea="lineN" />
            <Line type="t-up" gridArea="lineO" />
            <Line type="cross" gridArea="lineP" />
            <Line type="t-up" gridArea="lineQ" />
            <Line type="t-up" gridArea="lineR" />
            <Line type="corner-bl" gridArea="lineS" />

            {/* Worldview Nodes */}
            <div style={{ gridArea: 'nodeW1' }} className="flex justify-center items-center"><Node name="Materialism" icon={Anchor} formula="Favored by high Strength and Logic" description="A worldview focused on the tangible, physical aspects of reality. 'What you see is what you get.'" /></div>
            <div style={{ gridArea: 'nodeW2' }} className="flex justify-center items-center"><Node name="Worldview" icon={BookOpen} formula="Determined by Materialism vs Spiritualism" description="Your fundamental belief system about how the universe works. This has major story implications." /></div>
            <div style={{ gridArea: 'nodeW3' }} className="flex justify-center items-center"><Node name="Spiritualism" icon={Feather} formula="Favored by high Spirit and Intuition" description="A worldview focused on the unseen, metaphysical, and dimensional energies. 'There is more than meets the eye.'" /></div>
            <div style={{ gridArea: 'nodeW4' }} className="flex justify-center items-center"><Node name="Fate Inversion" icon={Recycle} isMystery formula="[REDACTED]" description="The ability to... change what was written? Is it possible to defy destiny itself?" /></div>
            
            {/* Connecting Lines Row 4 */}
            <Line type="corner-br" gridArea="lineT" />
            <Line type="t-down" gridArea="lineU" />
            <Line type="corner-bl" gridArea="lineV" />
            <Line type="vertical" gridArea="lineW" />

             {/* Mystery Nodes */}
            <div style={{ gridArea: 'nodeM1' }} className="flex justify-center items-center"><Node name="Synaptic Potential" icon={HelpCircle} isMystery description="A measure of untapped neural pathways. What could they be used for?" /></div>
            <div style={{ gridArea: 'nodeM2' }} className="flex justify-center items-center"><Node name="Temporal Echo" icon={HelpCircle} isMystery description="Sometimes, you feel a faint resonance of choices not made. Deja vu, or something more?" /></div>
            <div style={{ gridArea: 'nodeM3' }} className="flex justify-center items-center"><Node name="Karmic Trace" icon={Footprints} isMystery formula="[REDACTED]" description="The universe seems to remember your actions, both good and ill. This invisible weight might have consequences." /></div>
            <div style={{ gridArea: 'nodeM4' }} className="flex justify-center items-center"><Node name="Nexus Resonance" icon={GitCommit} isMystery formula="[REDACTED]" description="You feel a strange hum, a vibration that connects you to the fabric of the Nexus itself." /></div>
            <div style={{ gridArea: 'nodeM5' }} className="flex justify-center items-center"><Node name="Echo Chamber" icon={HelpCircle} isMystery formula="[REDACTED]" description="Do your own thoughts sound louder lately? Is it just you in there?" /></div>
            <div style={{ gridArea: 'nodeM6' }} className="flex justify-center items-center"><Node name="[REDACTED]" icon={HelpCircle} isMystery /></div>
            <div style={{ gridArea: 'nodeM7' }} className="flex justify-center items-center"><Node name="[REDACTED]" icon={HelpCircle} isMystery /></div>

             {/* Connecting Lines Row 5 */}
            <Line type="vertical" gridArea="lineX" />
            <Line type="vertical" gridArea="lineY" />
            <Line type="vertical" gridArea="lineZ" />
          </div>
      </CardContent>
    </Card>
  );
}
