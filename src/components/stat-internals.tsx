
"use client";

import type { CharacterProfile } from "@/types";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { 
  AlertTriangle, Brain, Dumbbell, Dices, HelpCircle, 
  BookOpen, Hammer, Clover, Zap, Shield, Heart, 
  BrainCircuit, Weight, ShieldCheck, Scale, Anchor,
  Biohazard, FlaskConical, Hourglass, SlidersHorizontal, UserRoundCheck, Link, Recycle, ShieldHalf, Rabbit,
  Swords, Atom, Sun, Moon, Sparkles, BookCopy, Goal, Shuffle, Eye
} from "lucide-react";
import { Node } from "./stat-internals/node";
import { Line } from "./stat-internals/line";


export default function StatInternals({ profile }: { profile: CharacterProfile }) {
  const gridStyles = {
    gridTemplateColumns: 'repeat(9, 1fr)',
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
            <div style={{ gridColumn: '2', gridRow: 1 }} className="flex justify-center items-center">
              <Node name="Intellect" icon={Brain} colorClass="core" description="High intellect boosts research but can lead to 'Analysis Paralysis', a -1 penalty to all Adaptation checks." formula="Base Stat"/>
            </div>
            <div style={{ gridColumn: '5', gridRow: 1 }} className="flex justify-center items-center">
              <Node name="Strength" icon={Dumbbell} colorClass="core" description="High strength allows for moving heavy objects but causes you to consume food and water 25% faster." formula="Base Stat"/>
            </div>
            <div style={{ gridColumn: '8', gridRow: 1 }} className="flex justify-center items-center">
              <Node name="Adaptation" icon={Dices} colorClass="core" description="High adaptation improves your chances in unforeseen circumstances, but makes you more susceptible to manipulation, reducing dialogue checks by 1." formula="Base Stat (D6)"/>
            </div>
            
            {/* Lines from Core to Tier 2 */}
            <Line type="vertical" gridArea="2/2/3/3" />
            <Line type="corner-br" gridArea="2/1/3/2" />
            <Line type="corner-bl" gridArea="2/3/3/4" />

            <Line type="vertical" gridArea="2/5/3/6" />
            <Line type="corner-br" gridArea="2/3/3/4" />
            <Line type="corner-bl" gridArea="2/7/3/8" />

            <Line type="vertical" gridArea="2/8/3/9" />
            <Line type="corner-br" gridArea="2/7/3/8" />
            <Line type="corner-bl" gridArea="2/9/3/10" />

            {/* Row 3: Tier 2 Derived Stats */}
            <div style={{ gridColumn: '1', gridRow: 3 }} className="flex justify-center items-center">
              <Node name="Research" icon={BookOpen} colorClass="primary" description="Ability to decipher lore. Success reveals secrets, but failure can increase Paranoia." formula="INT * Focus"/>
            </div>
             <div style={{ gridColumn: '3', gridRow: 3 }} className="flex justify-center items-center">
              <Node name="Eff. Intellect" icon={BrainCircuit} colorClass="primary" description="Your actual cognitive power for checks. High focus improves it, but critical failure on a check can cause mental clarity to drop." formula="(INT * Focus) + DifficultyMod"/>
            </div>
            <div style={{ gridColumn: '5', gridRow: 3 }} className="flex justify-center items-center">
              <Node name="Eff. Strength" icon={Weight} colorClass="primary" description="Your actual physical power for checks. High vitality boosts it, but using it adds to your fatigue." formula="(STR * (1 - Fatigue)) + DifficultyMod"/>
            </div>
            <div style={{ gridColumn: '7', gridRow: 3 }} className="flex justify-center items-center">
              <Node name="Eff. Adaptation" icon={Clover} colorClass="primary" description="Your luck in dire situations. High values can turn failure into success, but a critical fail on an Adaptation check can result in losing an item." formula="(ADP + (Sanity/100)) + DiffMod" />
            </div>
            <div style={{ gridColumn: '9', gridRow: 3 }} className="flex justify-center items-center">
              <Node name="Labor" icon={Hammer} colorClass="primary" description="Effectiveness in physical tasks. Gets jobs done faster, but always increases fatigue and hunger." formula="STR * (1 - Fatigue)"/>
            </div>
            
            {/* Lines to Tier 3 */}
            <Line type="radial-br" gridArea="4/1/5/2" />
            <Line type="vertical" gridArea="4/3/5/4" />
            <Line type="vertical" gridArea="4/5/5/6" />
            <Line type="vertical" gridArea="4/7/5/8" />
            <Line type="radial-bl" gridArea="4/9/5/10" />

            {/* Row 5: Tier 3 (Specializations) */}
            <div style={{ gridColumn: '2', gridRow: 5 }} className="flex justify-center items-center">
                <Node name="Path of Order" icon={Scale} colorClass="order" description="Commit to logic and predictability. Boosts Intellect-based skills but halves the effectiveness of Adaptation." />
            </div>
             <div style={{ gridColumn: '4', gridRow: 5 }} className="flex justify-center items-center">
                <Node name="Path of Balance" icon={Anchor} colorClass="balance" description="Walk the middle path. You receive fewer extreme outcomes, both good and bad, on all checks." />
            </div>
             <div style={{ gridColumn: '6', gridRow: 5 }} className="flex justify-center items-center">
                <Node name="Path of Chaos" icon={Shuffle} colorClass="chaos" description="Embrace randomness. All your checks have a wider range of outcomes, but you lose the ability to see success probabilities." />
            </div>
            <div style={{ gridColumn: '8', gridRow: 5 }} className="flex justify-center items-center">
                <Node name="Path of Mystery" icon={Eye} colorClass="mystery" description="Seek the unknown. Unlocks unique dialogue options related to the occult but attracts unwanted attention from supernatural entities." />
            </div>
            
            {/* Lines from T3 to Curses */}
            <Line type="vertical" gridArea="6/2/7/3" />
            <Line type="vertical" gridArea="6/8/7/9" />
            <Line type="corner-tr" gridArea="6/3/7/4" />
            <Line type="corner-br" gridArea="6/3/7/4" />
            <Line type="corner-tl" gridArea="6/7/7/8" />
            <Line type="corner-bl" gridArea="6/7/7/8" />
            

            {/* Row 7: Curses */}
            <div style={{ gridColumn: '2', gridRow: 7 }} className="flex justify-center items-center">
              <Node name="Paranoia" icon={AlertTriangle} colorClass="curse" description="The darkness seeps in. You are less likely to be surprised, but you may see threats that aren't there, causing you to waste resources." formula="[REDACTED]"/>
            </div>
            <div style={{ gridColumn: '4', gridRow: 7 }} className="flex justify-center items-center">
              <Node name="Fatigue" icon={Hourglass} colorClass="curse" description="Exhaustion from lack of rest. Reduces Strength effectiveness but unlocks unique 'fever dream' dialogues that may contain cryptic clues." formula="Base drain per day, modified by actions."/>
            </div>
            <div style={{ gridColumn: '6', gridRow: 7 }} className="flex justify-center items-center">
              <Node name="Obsession" icon={Link} colorClass="curse" description="Fixation on a goal grants a bonus to related checks, but a penalty to all others, making you less flexible." formula="[REDACTED]"/>
            </div>
            <div style={{ gridColumn: '8', gridRow: 7 }} className="flex justify-center items-center">
              <Node name="Addiction" icon={FlaskConical} colorClass="curse" description="Dependence on items provides a bonus when sated, but severe penalties to all stats when not." formula="[REDACTED]"/>
            </div>

            {/* Lines from Curses to Convergence */}
            <Line type="radial-br" gridArea="8/2/9/3" />
            <Line type="radial-bl" gridArea="8/4/9/5" />
            <Line type="radial-br" gridArea="8/6/9/7" />
            <Line type="radial-bl" gridArea="8/8/9/9" />
            
            {/* Row 9: Convergence & Abilities */}
             <div style={{ gridColumn: '1', gridRow: 9 }} className="flex justify-center items-center">
                <Node name="Last Stand" icon={Zap} colorClass="ability" description="Once per run, ignore a fatal blow and survive with 1 Vitality. Afterwards, all stats are halved for the next 24 hours." />
            </div>
            <div style={{ gridColumn: '3', gridRow: 9 }} className="flex justify-center items-center">
                <Node name="Equilibrium" icon={Sun} colorClass="convergence" description="Negates the negative effects of all adjacent 'Curse' nodes, but also nullifies their positive secondary effects (e.g., fever dreams)." />
            </div>
             <div style={{ gridColumn: '5', gridRow: 9 }} className="flex justify-center items-center">
                <Node name="Scrounge" icon={Recycle} colorClass="ability" description="Convert 2 junk items into 1 random useful resource. Has a 10% chance to attract unwanted attention." />
            </div>
            <div style={{ gridColumn: '7', gridRow: 9 }} className="flex justify-center items-center">
                 <Node name="Apotheosis" icon={Moon} colorClass="convergence" description="Removes the negative side-effects of all skills in this ROW, but you can no longer gain XP." />
            </div>
             <div style={{ gridColumn: '9', gridRow: 9 }} className="flex justify-center items-center">
                <Node name="Gambler's Hunch" icon={Rabbit} colorClass="ability" description="Once per run, re-roll a failed Adaptation check. If the re-roll also fails, it becomes a critical failure." />
            </div>
            
             {/* Lines from Convergence to Final Tier */}
            <Line type="t-down" gridArea="9/1/10/2" />
            <Line type="vertical" gridArea="10/3/11/4" />
            <Line type="vertical" gridArea="10/7/11/8" />
            <Line type="t-down" gridArea="9/9/10/10" />
            <Line type="horizontal" gridArea="9/2/10/3" />
            <Line type="horizontal" gridArea="9/4/10/5" />
            <Line type="horizontal" gridArea="9/6/10/7" />
            <Line type="horizontal" gridArea="9/8/10/9" />


            {/* Row 11: Final Tier */}
             <div style={{ gridColumn: '2', gridRow: 11 }} className="flex justify-center items-center">
                <Node name="Master Plan" icon={Goal} colorClass="ability" description="If you have 3+ quest items, you can sacrifice them to gain a +5 bonus on your next story-critical check, but this will alert powerful enemies to your presence." />
            </div>
             <div style={{ gridColumn: '4', gridRow: 11 }} className="flex justify-center items-center">
                <Node name="Singularity" icon={Atom} colorClass="convergence" description="Purifies all choices in this COLUMN, removing all negative effects. However, you can no longer equip any armor." />
            </div>
             <div style={{ gridColumn: '6', gridRow: 11 }} className="flex justify-center items-center">
                <Node name="Perfect Union" icon={Sparkles} colorClass="convergence" description="If you have one of each Path node (Order, Chaos, Balance, Mystery), all base attributes get a +1 bonus, but you can no longer use consumable items." />
            </div>
             <div style={{ gridColumn: '8', gridRow: 11 }} className="flex justify-center items-center">
                <Node name="One with the Shadows" icon={ShieldHalf} colorClass="ability" description="Become harder to detect by guards, but your maximum Vitality is permanently reduced by 25%." />
            </div>
          </div>
      </CardContent>
    </Card>
  );
}
