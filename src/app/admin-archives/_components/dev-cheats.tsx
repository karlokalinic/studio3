
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { Zap } from 'lucide-react';

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

  const handleCheat = (cheatName: string) => {
    toast({
      title: 'Cheat Activated',
      description: `${cheatName} has been applied.`,
    });
    // In a real scenario, this would dispatch an action to update game state.
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
