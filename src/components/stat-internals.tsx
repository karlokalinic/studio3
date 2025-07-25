
"use client";

import type { CharacterProfile } from "@/types";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { AlertTriangle, Brain, Dumbbell, Dices, HelpCircle } from "lucide-react";
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
            <div style={{ gridColumn: 2, gridRow: 1 }} className="flex justify-center items-center"><Node name="Intellect" icon={Brain} colorClass="core" description={profile.attributes.intellect.description}/></div>
            <div style={{ gridColumn: 4, gridRow: 1 }} className="flex justify-center items-center"><Node name="Strength" icon={Dumbbell} colorClass="core" description={profile.attributes.strength.description} /></div>
            <div style={{ gridColumn: 6, gridRow: 1 }} className="flex justify-center items-center"><Node name="Adaptation" icon={Dices} colorClass="core" description={profile.attributes.adaptation.description}/></div>
            
            <Line type="vertical" gridArea="2/2/3/3" />
            <Line type="vertical" gridArea="2/4/3/5" />
            <Line type="vertical" gridArea="2/6/3/7" />
            
            <div style={{ gridColumn: 2, gridRow: 3 }} className="flex justify-center items-center"><Node name="Research" icon={HelpCircle} colorClass="primary" description="Ability to decipher ancient languages and symbols."/></div>
            <div style={{ gridColumn: 4, gridRow: 3 }} className="flex justify-center items-center"><Node name="Labor" icon={HelpCircle} colorClass="primary" description="Effectiveness in performing physical tasks like mining or moving rubble." /></div>
            <div style={{ gridColumn: 6, gridRow: 3 }} className="flex justify-center items-center"><Node name="Luck" icon={HelpCircle} colorClass="primary" description="The 'Circumstantial Die' roll used in unexpected situations."/></div>

          </div>
      </CardContent>
    </Card>
  );
}
