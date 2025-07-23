
"use client";

import Image from "next/image";
import Link from "next/link";
import type { WorldLocation } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Users, Coins, Info, BookOpen } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

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
             <TooltipProvider key={loc.id}>
                <Tooltip delayDuration={150}>
                    <TooltipTrigger asChild>
                        <div
                          className="absolute group cursor-pointer"
                          style={{ top: loc.position.top, left: loc.position.left }}
                          title={loc.name}
                        >
                          <MapPin className="h-6 w-6 text-accent drop-shadow-[0_0_8px_hsl(var(--accent))] group-hover:scale-125 transition-transform" />
                        </div>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p className="font-bold">{loc.name}</p>
                        <p>{loc.description}</p>
                    </TooltipContent>
                </Tooltip>
             </TooltipProvider>
          ))}
        </div>
        <div>
          <h3 className="font-headline text-lg mb-2 text-primary/80">Regional Info</h3>
          <div className="space-y-3">
            {locations.map((loc) => (
              <div key={loc.id} className="text-sm p-3 bg-black/20 rounded-md">
                <div className="flex items-center justify-between font-bold text-foreground">
                    <div className="flex items-center">
                        <GlowIcon icon={MapPin} /> {loc.name}
                    </div>
                     <TooltipProvider>
                        <Tooltip delayDuration={150}>
                            <TooltipTrigger>
                                <Info className="h-4 w-4 text-muted-foreground/70" />
                            </TooltipTrigger>
                            <TooltipContent className="max-w-xs">
                                <p>{loc.description}</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>
                <div className="flex items-center text-muted-foreground mt-1 ml-6">
                    <GlowIcon icon={Users} className="h-3 w-3" /> Faction: {loc.faction}
                </div>
                 <div className="flex items-center text-muted-foreground mt-1 ml-6">
                    <GlowIcon icon={Coins} className="h-3 w-3" /> Currency Rate: x{loc.currencyModifier}
                </div>
              </div>
            ))}
          </div>
        </div>
         <div className="bg-card/50 border-primary/20 shadow-lg shadow-primary/5 p-6 rounded-lg text-center">
              <h3 className="font-headline text-2xl text-primary mb-4">Discover the Universe</h3>
              <p className="text-muted-foreground mb-6">Dive deep into the lore, factions, and history of the Nexus Chronicles.</p>
              <Button asChild className="w-full bg-accent text-accent-foreground hover:bg-accent/80 transition-all text-lg py-6 font-headline">
                <Link href="/explore-the-story">
                    <BookOpen className="mr-2" />
                    Open the Wiki
                </Link>
              </Button>
          </div>
      </CardContent>
    </Card>
  );
}
