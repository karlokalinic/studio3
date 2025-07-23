"use client";

import Image from "next/image";
import type { WorldLocation } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Users, Coins } from "lucide-react";
import { cn } from "@/lib/utils";

interface WorldMapProps {
  locations: WorldLocation[];
}

export default function WorldMap({ locations }: WorldMapProps) {
    const GlowIcon = ({ icon: Icon, className }: { icon: React.ElementType, className?: string }) => (
        <Icon className={cn("h-4 w-4 mr-2 text-accent drop-shadow-[0_0_4px_hsl(var(--accent))]", className)} />
    );
  
  return (
    <Card className="bg-card/50 border-primary/20 shadow-lg shadow-primary/5">
      <CardHeader>
        <CardTitle className="font-headline text-2xl text-primary">World Map</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="relative w-full h-64 md:h-80 bg-black/20 rounded-md overflow-hidden border-2 border-primary/20">
          <Image
            src="https://placehold.co/800x600.png"
            alt="World map"
            layout="fill"
            objectFit="cover"
            className="opacity-20"
            data-ai-hint="fantasy map"
          />
          {locations.map((loc) => (
            <div
              key={loc.id}
              className="absolute group cursor-pointer"
              style={{ top: loc.position.top, left: loc.position.left }}
              title={loc.name}
            >
              <MapPin className="h-6 w-6 text-accent drop-shadow-[0_0_8px_hsl(var(--accent))] group-hover:scale-125 transition-transform" />
            </div>
          ))}
        </div>
        <div>
          <h3 className="font-headline text-lg mb-2 text-primary/80">Regional Info</h3>
          <div className="space-y-3">
            {locations.map((loc) => (
              <div key={loc.id} className="text-sm p-2 bg-black/20 rounded-md">
                <div className="flex items-center font-bold text-foreground">
                    <GlowIcon icon={MapPin} /> {loc.name}
                </div>
                <div className="flex items-center text-muted-foreground ml-6">
                    <GlowIcon icon={Users} className="h-3 w-3" /> Faction: {loc.faction}
                </div>
                 <div className="flex items-center text-muted-foreground ml-6">
                    <GlowIcon icon={Coins} className="h-3 w-3" /> Currency Rate: x{loc.currencyModifier}
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
