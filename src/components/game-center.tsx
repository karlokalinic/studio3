
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCharacterStore } from '@/stores/use-character-store';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  Shield,
  Zap,
  Drumstick,
  Save,
  Menu,
  CircleDollarSign,
  Settings,
  FolderOpen,
  LogOut,
  Archive,
  BookOpen,
} from 'lucide-react';
import Link from 'next/link';

const GlowIcon = ({ icon: Icon }: { icon: React.ElementType }) => (
  <Icon className="h-5 w-5 mr-2 text-accent drop-shadow-[0_0_4px_hsl(var(--accent))] transition-all" />
);

const HowToPlayContent = () => (
  <div className="space-y-4 text-sm text-muted-foreground">
      <div>
        <h3 className="font-headline text-lg text-primary mb-2">Character Attributes</h3>
        <p>Your character has three core attributes: Strength, Intelligence, and Spirit. These base stats determine your effectiveness in various situations. They are modified by your dynamic state (like fatigue) to produce your "effective" stats for any given action.</p>
      </div>
       <div>
        <h3 className="font-headline text-lg text-primary mb-2">Attribute Checks</h3>
        <p>Many actions, like forcing a door (Strength) or hacking a terminal (Intelligence), require an attribute check. The game compares your relevant effective stat against a target number. Success is not guaranteed, and failure can sometimes lead to unexpected outcomes.</p>
      </div>
      <div>
        <h3 className="font-headline text-lg text-primary mb-2">Inventory</h3>
        <p>Your inventory size is determined by your Strength. You can expand it by finding or buying "Slot Expansion Keys". Pay attention to item types: Consumables can be used for effects, while other items might be for quests or provide passive bonuses.</p>
      </div>
      <div>
        <h3 className="font-headline text-lg text-primary mb-2">State Management</h3>
        <p>Your character's health, energy, and hunger will deplete over time and must be managed. Additionally, stats like Fatigue and Focus will change based on your actions, directly impacting your performance.</p>
      </div>
  </div>
);


export default function GameCenter() {
  const { character, resetCharacter } = useCharacterStore();
  const router = useRouter();
  const [formattedCurrency, setFormattedCurrency] = useState<string | null>(
    null
  );

  useEffect(() => {
    // Format currency on the client to avoid hydration mismatch
    if (character?.currency) {
      setFormattedCurrency(character.currency.toLocaleString());
    }
  }, [character?.currency]);

  const handleQuit = () => {
    resetCharacter();
    router.push('/');
  }

  if (!character) {
    return (
        <div className="bg-card/50 rounded-lg border border-primary/20 p-4 shadow-lg shadow-primary/5 flex flex-col md:flex-row items-center justify-between gap-4">
             <h1 className="text-3xl font-headline text-primary drop-shadow-[0_0_8px_hsl(var(--primary))]">
                Nexus Chronicles
            </h1>
        </div>
    )
  }

  return (
    <div className="bg-card/50 rounded-lg border border-primary/20 p-4 shadow-lg shadow-primary/5 flex flex-col md:flex-row items-center justify-between gap-4">
      <h1 className="text-3xl font-headline text-primary drop-shadow-[0_0_8px_hsl(var(--primary))]">
        Nexus Chronicles
      </h1>

      <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
        <div className="flex items-center" title="Health">
          <GlowIcon icon={Shield} />
          <Progress
            value={character.health}
            className="w-24 h-2 bg-primary/20"
          />
        </div>
        <div className="flex items-center" title="Energy">
          <GlowIcon icon={Zap} />
          <Progress value={character.energy} className="w-24 h-2 bg-primary/20" />
        </div>
        <div className="flex items-center" title="Hunger">
          <GlowIcon icon={Drumstick} />
          <Progress value={character.hunger} className="w-24 h-2 bg-primary/20" />
        </div>

        <div
          className="flex items-center font-bold text-lg text-accent"
          title="Nexus Kristali"
        >
          <GlowIcon icon={CircleDollarSign} />
          {formattedCurrency || '...'}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          className="border-accent text-accent hover:bg-accent hover:text-accent-foreground transition-all"
        >
          <Save className="mr-2 h-4 w-4" /> Save
        </Button>
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="border-accent text-accent hover:bg-accent hover:text-accent-foreground transition-all"
            >
              <Menu className="mr-2 h-4 w-4" /> Menu
            </Button>
          </SheetTrigger>
          <SheetContent className="bg-card/95 border-primary/20 text-foreground">
            <SheetHeader>
              <SheetTitle className="font-headline text-2xl text-primary">
                Game Menu
              </SheetTitle>
            </SheetHeader>
            <div className="mt-8 flex flex-col gap-4">
               <Button
                variant="ghost"
                className="justify-start text-lg p-6 hover:bg-accent/20 hover:text-accent"
                asChild
              >
                 <Link href="/explore-the-story">
                  <BookOpen className="mr-4" /> Wiki
                </Link>
              </Button>
              <Button
                variant="ghost"
                className="justify-start text-lg p-6 hover:bg-accent/20 hover:text-accent"
                asChild
              >
                 <Link href="/settings">
                  <Settings className="mr-4" /> Settings
                </Link>
              </Button>
              <Button
                variant="ghost"
                className="justify-start text-lg p-6 hover:bg-accent/20 hover:text-accent"
              >
                <FolderOpen className="mr-4" /> Load Game
              </Button>
               <Button
                variant="ghost"
                className="justify-start text-lg p-6 hover:bg-accent/20 hover:text-accent"
                asChild
              >
                <Link href="/admin-archives">
                  <Archive className="mr-4"/> Admin Archives
                </Link>
              </Button>
              <Button
                variant="ghost"
                className="justify-start text-lg p-6 hover:bg-accent/20 hover:text-accent"
                onClick={handleQuit}
              >
                <LogOut className="mr-4" /> Quit Game
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}
