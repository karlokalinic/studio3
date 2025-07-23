
'use client';

import { Slider } from '@/components/ui/slider';
import { type Difficulty, useSettings } from '@/context/settings-context';

const difficultyLevels: { name: Difficulty; value: number; description: string; color: string }[] = [
    { name: 'Story-Only', value: 0, description: 'Player always wins attribute checks. Focus on the narrative.', color: 'text-green-400' },
    { name: 'Easy', value: 1, description: 'A relaxed experience. Player gets a +1 bonus to checks.', color: 'text-green-300' },
    { name: 'Normal', value: 2, description: 'A balanced challenge. No modifiers.', color: 'text-primary' },
    { name: 'Hard', value: 3, description: 'A tough journey. Player gets a -1 penalty to checks.', color: 'text-yellow-400' },
    { name: 'Ultimate', value: 4, description: 'A brutal, unforgiving world. Player gets a -2 penalty to checks.', color: 'text-red-500' },
];

interface DifficultySliderProps {
    value: Difficulty;
    onValueChange: (value: Difficulty) => void;
}

export default function DifficultySlider({ value, onValueChange }: DifficultySliderProps) {
  const selectedDifficulty = difficultyLevels.find(d => d.name === value) || difficultyLevels[2];
  const selectedIndex = difficultyLevels.findIndex(d => d.name === value);

  const handleSliderChange = (values: number[]) => {
    const index = values[0];
    onValueChange(difficultyLevels[index].name);
  };
  
  const sliderBg = `linear-gradient(to right, #16a34a, #facc15, #dc2626)`;

  return (
    <div className="space-y-6">
        <div className="flex justify-between text-sm font-headline">
            <span className="text-green-400">STORY-ONLY</span>
            <span className={`font-bold ${selectedDifficulty.color}`}>{selectedDifficulty.name.toUpperCase()}</span>
            <span className="text-red-500">ULTIMATE</span>
        </div>
      <Slider
        value={[selectedIndex]}
        onValueChange={handleSliderChange}
        min={0}
        max={difficultyLevels.length - 1}
        step={1}
        style={{ '--slider-bg': sliderBg } as React.CSSProperties}
        className="[&>span:first-of-type]:bg-[var(--slider-bg)]"
      />
      <div className="text-center p-4 bg-black/20 rounded-md">
        <p className="text-muted-foreground">{selectedDifficulty.description}</p>
      </div>
    </div>
  );
}
