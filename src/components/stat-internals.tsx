
"use client";

import type { CharacterProfile } from "@/types";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { 
  AlertTriangle, Brain, Dumbbell, Dices, HelpCircle, 
  BookOpen, Hammer, Clover, Zap, Shield, Heart, 
  BrainCircuit, Weight, ShieldCheck, Scale, Anchor,
  Biohazard, FlaskConical, Hourglass, SlidersHorizontal, UserRoundCheck, Link
} from "lucide-react";
import { Node } from "./stat-internals/node";
import { Line } from "./stat-internals/line";


export default function StatInternals({ profile }: { profile: CharacterProfile }) {
  const gridStyles = {
    gridTemplateColumns: 'repeat(7, 1fr)',
    gridAutoRows: 'minmax(6rem, auto)',
    gap: '0rem',
  };

  return (
    <Card className="bg-transparent border-none shadow-none">
      <CardHeader className="text-center">
        <CardTitle className="font-headline text-3xl text-primary">Character Attributes</CardTitle>
        <CardDescription>These are the core abilities of your character. Click any node for details.</CardDescription>
      </CardHeader>
      <CardContent className="p-0 overflow-x-auto flex justify-center">
          <div className="grid" style={gridStyles}>
            {/* Row 1: Core Attributes */}
            <div style={{ gridColumn: 2, gridRow: 1 }} className="flex justify-center items-center">
              <Node name="Intellect" icon={Brain} colorClass="core" description={profile.attributes.intellect.description} formula="Base Stat"/>
            </div>
            <div style={{ gridColumn: 4, gridRow: 1 }} className="flex justify-center items-center">
              <Node name="Strength" icon={Dumbbell} colorClass="core" description={profile.attributes.strength.description} formula="Base Stat"/>
            </div>
            <div style={{ gridColumn: 6, gridRow: 1 }} className="flex justify-center items-center">
              <Node name="Adaptation" icon={Dices} colorClass="core" description={profile.attributes.adaptation.description} formula="Base Stat (D6)"/>
            </div>
            
            {/* Lines from Core to Tier 2 */}
            <Line type="vertical" gridArea="2/2/3/3" />
            <Line type="vertical" gridArea="2/4/3/5" />
            <Line type="vertical" gridArea="2/6/3/7" />
            <Line type="corner-bl" gridArea="2/3/3/4" />
            <Line type="corner-br" gridArea="2/1/3/2" />
            <Line type="corner-bl" gridArea="2/5/3/6" />
            <Line type="corner-br" gridArea="2/3/3/4" />
            <Line type="corner-bl" gridArea="2/7/3/8" />
            <Line type="corner-br" gridArea="2/5/3/6" />

            {/* Row 3: Tier 2 Derived Stats */}
            <div style={{ gridColumn: 1, gridRow: 3 }} className="flex justify-center items-center">
              <Node name="Research" icon={BookOpen} colorClass="primary" description="Ability to decipher ancient languages and symbols." formula="INT * Focus"/>
            </div>
            <div style={{ gridColumn: 3, gridRow: 3 }} className="flex justify-center items-center">
              <Node name="Eff. Intellect" icon={BrainCircuit} colorClass="primary" description="Your actual cognitive power for checks." formula="(INT * Focus) + DifficultyMod"/>
            </div>
            <div style={{ gridColumn: 5, gridRow: 3 }} className="flex justify-center items-center">
              <Node name="Eff. Strength" icon={Weight} colorClass="primary" description="Your actual physical power for checks, after all modifiers." formula="(STR * (1 - Fatigue)) + DifficultyMod"/>
            </div>
            <div style={{ gridColumn: 7, gridRow: 3 }} className="flex justify-center items-center">
              <Node name="Labor" icon={Hammer} colorClass="primary" description="Effectiveness in performing physical tasks like mining or moving rubble." formula="STR * (1 - Fatigue)"/>
            </div>
            
            {/* Lines from Tier 2 to Central Convergence */}
            <Line type="radial-br" gridArea="4/1/5/2" />
            <Line type="vertical" gridArea="4/3/5/4" />
            <Line type="vertical" gridArea="4/5/5/6" />
            <Line type="radial-bl" gridArea="4/7/5/8" />
            
            {/* Row 5: Central Convergence & Tier 3 */}
            <div style={{ gridColumn: 4, gridRow: 5 }} className="flex justify-center items-center">
              <Node name="Max Vitality" icon={Heart} colorClass="convergence" description="Your total health pool, derived from your resilience." formula="100 + (Level * 5) + (EffSTR * 5)"/>
            </div>
            <div style={{ gridColumn: 2, gridRow: 5 }} className="flex justify-center items-center">
              <Node name="Manipulation" icon={UserRoundCheck} colorClass="balance" description="Ability to influence NPCs through dialogue." formula="(INT + LCK) / 2" />
            </div>
            <div style={{ gridColumn: 6, gridRow: 5 }} className="flex justify-center items-center">
              <Node name="Resilience" icon={ShieldCheck} colorClass="balance" description="Resistance to negative status effects and environmental hazards." formula="(STR + ADP) / 2" />
            </div>
            
             {/* Lines between T3 and Convergence */}
            <Line type="horizontal" gridArea="5/3/6/4" />
            <Line type="horizontal" gridArea="5/5/6/6" />

            {/* Lines from Convergence to Curses */}
            <Line type="vertical" gridArea="6/4/7/5" />
            <Line type="corner-tr" gridArea="6/3/7/4" />
            <Line type="corner-tl" gridArea="6/5/7/6" />

            {/* Row 7: Curses */}
            <div style={{ gridColumn: 1, gridRow: 7 }} className="flex justify-center items-center">
              <Node name="Paranoia" icon={AlertTriangle} colorClass="curse" description="The darkness seeps in. High paranoia can cause failed checks or skewed information." formula="[REDACTED]"/>
            </div>
            <div style={{ gridColumn: 3, gridRow: 7 }} className="flex justify-center items-center">
              <Node name="Fatigue" icon={Hourglass} colorClass="curse" description="Exhaustion from lack of rest. Reduces STR effectiveness." formula="Base drain per day, modified by actions."/>
            </div>
            <div style={{ gridColumn: 5, gridRow: 7 }} className="flex justify-center items-center">
              <Node name="Obsession" icon={Link} colorClass="curse" description="Fixation on a single goal, potentially ignoring vital needs." formula="[REDACTED]"/>
            </div>
            <div style={{ gridColumn: 7, gridRow: 7 }} className="flex justify-center items-center">
              <Node name="Addiction" icon={FlaskConical} colorClass="curse" description="Dependence on certain items, causing penalties when not sated." formula="[REDACTED]"/>
            </div>

            {/* Lines connecting curses */}
            <Line type="horizontal" gridArea="7/2/8/3" />
            <Line type="t-up" gridArea="7/4/8/5" />
            <Line type="horizontal" gridArea="7/6/8/7" />

            {/* Row 9: Abilities */}
            <div style={{ gridColumn: 4, gridRow: 9 }} className="flex justify-center items-center">
                <Node name="Last Stand" icon={Zap} colorClass="ability" description="Once per run, ignore a fatal blow and survive with 1 Vitality." />
            </div>
             <Line type="vertical" gridArea="8/4/9/5" />

          </div>
      </CardContent>
    </Card>
  );
}
