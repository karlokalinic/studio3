
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { Zap } from 'lucide-react';
import { useCharacterStore } from '@/stores/use-character-store';

const FlashingScreen = () => {
  const [isFlashing, setIsFlashing] = useState(false);

  const triggerFlash = () => {
    setIsFlashing(true);
    setTimeout(() => setIsFlashing(false), 1000); // Flash for 1 second
  };

  return (
    <>
      <Button onClick={triggerFlash} variant="destructive">
        <Zap className="mr-2" />
        Test Flashing Effect
      </Button>
      {isFlashing && (
        <div className="fixed inset-0 z-[200] bg-white animate-pulse"></div>
      )}
    </>
  );
};

export default function DevCheats() {
  const { toast } = useToast();
  const { setCharacter } = useCharacterStore();

  const handleCheat = (cheatName: string) => {
    setCharacter((prevCharacter) => {
      if (!prevCharacter) return null;

      const newCharacter = { ...prevCharacter };

      switch (cheatName) {
        case 'Max Currency':
          newCharacter.currency = 999999;
          break;
        case 'Max Level':
          newCharacter.level = 99;
          newCharacter.xp = 999999;
          break;
        case 'God Mode':
          newCharacter.health = 100;
          newCharacter.energy = 100;
          newCharacter.hunger = 100;
          newCharacter.attributes.strength.value = 99;
          newCharacter.attributes.intelligence.value = 99;
          newCharacter.attributes.spirit.value = 99;
          break;
        case 'Reset Quests':
          // This would require more complex quest state management
          // For now, we'll just show a toast
          break;
      }
      return newCharacter;
    });

    toast({
      title: 'Cheat Activated',
      description: `${cheatName} has been applied.`,
    });
  };

  return (
    <Card className="bg-card/30 border-destructive/50 shadow-lg shadow-destructive/10 backdrop-blur-sm mt-8">
      <CardHeader>
        <CardTitle className="font-headline text-2xl text-destructive">
          Developer Cheats
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h4 className="font-headline text-lg text-primary/90 mb-2">
            Game State Modifiers
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button onClick={() => handleCheat('Max Currency')}>
              Max Currency
            </Button>
            <Button onClick={() => handleCheat('Max Level')}>Max Level</Button>
            <Button onClick={() => handleCheat('God Mode')}>God Mode</Button>
            <Button onClick={() => handleCheat('Reset Quests')}>
              Reset Quests
            </Button>
          </div>
        </div>
        <Separator />
        <div>
          <h4 className="font-headline text-lg text-primary/90 mb-2">
            Accessibility Testing
          </h4>
          <FlashingScreen />
        </div>
      </CardContent>
    </Card>
  );
}
