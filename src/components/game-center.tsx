"use client";

import { useState, useEffect } from "react";
import type { PlayerStats } from "@/types";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Shield, Zap, Drumstick, Save, Menu, CircleDollarSign } from "lucide-react";

interface GameCenterProps {
  stats: PlayerStats;
}

const GlowIcon = ({ icon: Icon }: { icon: React.ElementType }) => (
    <Icon className="h-5 w-5 mr-2 text-accent drop-shadow-[0_0_4px_hsl(var(--accent))] transition-all" />
);

export default function GameCenter({ stats }: GameCenterProps) {
  const [formattedCurrency, setFormattedCurrency] = useState<string | null>(null);

  useEffect(() => {
    setFormattedCurrency(stats.currency.toLocaleString());
  }, [stats.currency]);

  return (
    <div className="bg-card/50 rounded-lg border border-primary/20 p-4 shadow-lg shadow-primary/5 flex flex-col md:flex-row items-center justify-between gap-4">
      <h1 className="text-3xl font-headline text-primary drop-shadow-[0_0_8px_hsl(var(--primary))]">Nexus Chronicles</h1>
      
      <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
        <div className="flex items-center" title="Health">
          <GlowIcon icon={Shield} />
          <Progress value={stats.health} className="w-24 h-2 bg-primary/20" indicatorClassName="bg-accent" />
        </div>
        <div className="flex items-center" title="Energy">
          <GlowIcon icon={Zap} />
          <Progress value={stats.energy} className="w-24 h-2 bg-primary/20" indicatorClassName="bg-accent"/>
        </div>
        <div className="flex items-center" title="Hunger">
          <GlowIcon icon={Drumstick} />
          <Progress value={stats.hunger} className="w-24 h-2 bg-primary/20" indicatorClassName="bg-accent"/>
        </div>

        <div className="flex items-center font-bold text-lg text-accent" title="Nexus Kristali">
            <GlowIcon icon={CircleDollarSign} />
            {formattedCurrency || '...'}
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" className="border-accent text-accent hover:bg-accent hover:text-accent-foreground transition-all">
          <Save className="mr-2 h-4 w-4" /> Save
        </Button>
        <Button variant="outline" size="sm" className="border-accent text-accent hover:bg-accent hover:text-accent-foreground transition-all">
          <Menu className="mr-2 h-4 w-4" /> Menu
        </Button>
      </div>
    </div>
  );
}
