"use client";

import type { CharacterProfile } from "@/types";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface CharacterProfileProps {
  profile: CharacterProfile;
}

const Stat = ({ label, value }: { label: string; value: string | number }) => (
  <div className="flex justify-between items-center text-sm">
    <span className="text-muted-foreground">{label}</span>
    <span className="font-bold text-accent">{value}</span>
  </div>
);

export default function CharacterProfile({ profile }: CharacterProfileProps) {
  return (
    <Card className="bg-card/50 border-primary/20 shadow-lg shadow-primary/5">
      <CardHeader>
        <CardTitle className="font-headline text-2xl text-primary">{profile.name}</CardTitle>
        <CardDescription>Lvl {profile.level} ({profile.xp} XP) - {profile.metadata.origin}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h3 className="font-headline text-lg mb-2 text-primary/80">Attributes</h3>
          <div className="space-y-2">
            <Stat label="Strength" value={profile.attributes.strength} />
            <Stat label="Intelligence" value={profile.attributes.intelligence} />
            <Stat label="Spirit" value={profile.attributes.spirit} />
            <Stat label="HP" value={profile.attributes.hp} />
          </div>
        </div>
        <Separator />
        <div>
          <h3 className="font-headline text-lg mb-2 text-primary/80">Metadata</h3>
          <div className="space-y-2">
            <Stat label="Age" value={profile.metadata.age} />
            <Stat label="Gender" value={profile.metadata.gender} />
            <Stat label="Style" value={profile.metadata.style} />
          </div>
        </div>
        <Separator />
        <div>
          <h3 className="font-headline text-lg mb-2 text-primary/80">Backstory</h3>
          <p className="text-sm text-muted-foreground italic">
            "{profile.metadata.backstory}"
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
