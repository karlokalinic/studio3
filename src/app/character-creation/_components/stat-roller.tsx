
'use client'

import { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Dices, Save } from 'lucide-react';
import { motion } from 'framer-motion';

const generateRandomStat = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

interface StatRollerProps {
    onConfirm: (stats: { intellect: number; strength: number; adaptation: number; }) => void;
    isSaving: boolean;
}

const StatDisplay = ({ label, value }: { label: string; value: number }) => {
    return (
        <div className="text-center p-4 bg-black/20 rounded-lg">
            <Label className="text-sm text-muted-foreground">{label}</Label>
            <motion.p
                key={value}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl font-bold text-accent"
            >
                {value}
            </motion.p>
        </div>
    );
};


export default function StatRoller({ onConfirm, isSaving }: StatRollerProps) {
    const [stats, setStats] = useState({ intellect: 3, strength: 1, adaptation: 1 });
    const [isRolling, setIsRolling] = useState(false);
    const [remainingRerolls, setRemainingRerolls] = useState(3);

    const performRollAnimation = useCallback((onComplete?: () => void) => {
        setIsRolling(true);
        let counter = 0;
        const interval = setInterval(() => {
            setStats({
                intellect: generateRandomStat(1, 5),
                strength: generateRandomStat(1, 3),
                adaptation: generateRandomStat(1, 6),
            });
            counter++;
            if (counter >= 15) { // Roll for ~1.5 seconds
                clearInterval(interval);
                setIsRolling(false);
                if (onComplete) onComplete();
            }
        }, 100);
    }, []);

    const handleReroll = useCallback(() => {
        if (isRolling || remainingRerolls <= 0) return;
        
        setRemainingRerolls(prev => prev - 1);
        performRollAnimation();
    }, [isRolling, remainingRerolls, performRollAnimation]);

    // Initial roll on mount
    useEffect(() => {
        performRollAnimation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="space-y-4">
            <div>
                <h3 className="font-headline text-xl text-primary/90 mb-2 text-center">Determine Core Attributes</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <StatDisplay label="Intellect" value={stats.intellect} />
                    <StatDisplay label="Strength" value={stats.strength} />
                    <StatDisplay label="Adaptation (D6)" value={stats.adaptation} />
                </div>
            </div>
            
            <div className="flex flex-col gap-4 pt-4">
                <div className="w-full flex flex-col">
                     <Button onClick={() => onConfirm(stats)} className="w-full text-lg font-headline py-6" disabled={isRolling || isSaving}>
                        <Save className="mr-2" />
                        {isSaving ? 'Saving...' : 'Confirm and Begin Sentence'}
                    </Button>
                </div>
                <div className="w-full flex flex-col">
                    <Button onClick={handleReroll} variant="outline" className="w-full" disabled={isRolling || isSaving || remainingRerolls <= 0}>
                        <Dices className="mr-2" />
                        {isRolling ? 'Rolling...' : `Re-roll (${remainingRerolls} left)`}
                    </Button>
                </div>
            </div>
        </div>
    )
}
