
'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useCharacterStore } from '@/stores/use-character-store';
import { getCalculatedStats } from '@/lib/character-calculations';

interface ActionCheckProps {
  check: 'strength' | 'intelligence';
  successThreshold: number;
  isFixedSuccess?: boolean;
  onComplete: (success: boolean) => void;
}

const cardVariants = {
  hidden: {
    opacity: 0,
    rotateY: 180,
    scale: 0.8,
  },
  visible: {
    opacity: 1,
    rotateY: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: 'backInOut',
    },
  },
};

const resultVariants = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delay: 0.5,
      duration: 0.5,
    },
  },
};

export default function ActionCheck({ check, successThreshold, isFixedSuccess, onComplete }: ActionCheckProps) {
  const { character } = useCharacterStore();
  const [checkValue, setCheckValue] = useState(0);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    if (character) {
      const stats = getCalculatedStats(character);
      const val = check === 'strength' ? stats.effectiveStrength : stats.effectiveIntelligence;
      setCheckValue(val);

      const timer = setTimeout(() => setIsRevealed(true), 100); // Start flip animation
      return () => clearTimeout(timer);
    }
  }, [character, check]);
  
  const success = isFixedSuccess === true ? true : isFixedSuccess === false ? false : checkValue >= successThreshold;

  useEffect(() => {
    if (isRevealed) {
      const timer = setTimeout(() => onComplete(success), 2500); // Wait for result display
      return () => clearTimeout(timer);
    }
  }, [isRevealed, onComplete, success]);

  return (
    <div className="w-full flex justify-center items-center p-4" style={{ perspective: '1000px' }}>
      <motion.div
        className="w-64 h-80 rounded-xl shadow-2xl relative"
        variants={cardVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Card Back */}
        <div className="absolute w-full h-full bg-primary rounded-xl flex items-center justify-center backface-hidden">
           <div className="w-48 h-72 border-4 border-primary-foreground/50 rounded-lg flex flex-col items-center justify-center p-4">
              <p className="font-headline text-primary-foreground text-2xl">ATTRIBUTE CHECK</p>
              <p className="text-primary-foreground/80 text-center mt-4">Revealing your potential...</p>
           </div>
        </div>

        {/* Card Front */}
        <div className="absolute w-full h-full bg-card rounded-xl flex flex-col items-center justify-center p-6 backface-hidden" style={{transform: 'rotateY(0deg)'}}>
            <h3 className="font-headline text-xl text-primary capitalize">{check} Check</h3>
            <p className="text-sm text-muted-foreground">Target: {successThreshold}</p>
            <div className="my-6">
                <p className="text-7xl font-bold text-accent">{checkValue}</p>
            </div>
            <motion.div
                variants={resultVariants}
                initial="hidden"
                animate={isRevealed ? 'visible' : 'hidden'}
            >
                {success ? (
                    <p className="text-2xl font-bold text-green-500">SUCCESS</p>
                ) : (
                    <p className="text-2xl font-bold text-red-500">FAILURE</p>
                )}
            </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
