
"use client";

import type { InventoryItem } from "@/types";
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useCharacterStore } from "@/stores/use-character-store";
import { useToast } from "@/hooks/use-toast";
import { Hand, Trash2, Info, Lock, Sword, HeartPulse, Shield, Bot, Map, Key, HelpCircle, Gem, Sparkles, Coins, Search, Star, Weight, Zap, Hammer, Aperture, FlaskConical, Scissors, Scroll, Bone, Feather, Eye, Anchor, Brick, Cable, CircleDot, Dna, GitBranch, CookingPot, KeyRound, Leaf, Package, Brain, Pickaxe, Pilcrow, Puzzle, Scale, Shell } from "lucide-react";
import { motion, AnimatePresence } from 'framer-motion';
import { Separator } from "./ui/separator";

interface InventoryProps {
  items: InventoryItem[];
  selectedItem: InventoryItem | null;
  onSelectItem: (item: InventoryItem | null) => void;
  maxSlots: number;
}

const iconMap: { [key: string]: React.ElementType } = {
    Sword, HeartPulse, Shield, Bot, Map, Key, Gem, Sparkles, Coins, HelpCircle,
    Hammer, Aperture, FlaskConical, Scissors, Scroll, Bone, Feather, Eye, Anchor,
    Brick, Cable, CircleDot, Dna, GitBranch, CookingPot, KeyRound, Leaf, Package,
    Brain, Pickaxe, Pilcrow, Puzzle, Scale, Shell
};

const ItemAttribute = ({ label, value, icon: Icon }: { label: string; value?: string | number; icon: React.ElementType }) => {
    if (value === undefined) return null;
    return (
        <div className="flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center gap-1.5">
                <Icon className="h-3 w-3" />
                <span>{label}</span>
            </div>
            <span className="font-mono font-bold text-foreground/80">{value}</span>
        </div>
    );
};


const GRID_COLS = 8;
const GRID_ROWS = 5;
const TOTAL_GRID_SLOTS = GRID_COLS * GRID_ROWS;

export default function Inventory({ items, selectedItem, onSelectItem, maxSlots }: InventoryProps) {
  const { character, removeItem, updateCharacterStats, unlockInventorySlot, spendKey, setInventory, addItems } = useCharacterStore();
  const { toast } = useToast();
  const [isInspecting, setIsInspecting] = useState(false);
  const [unlocking, setUnlocking] = useState(false);
  const [shaking, setShaking] = useState(false);

  const handleUseItem = () => {
    if (!selectedItem) return;

    if (selectedItem.type === 'Consumable') {
        if(selectedItem.effect) {
             const effect = selectedItem.effect;
             updateCharacterStats({ 
                vitality: effect.vitality,
                sanity: effect.sanity,
                stamina: effect.stamina,
              });
            toast({
                title: 'Item Used',
                description: `${selectedItem.name} consumed.`,
            });
        }
        removeItem(selectedItem.id);
        onSelectItem(items.length > 1 ? items.filter(i => i.id !== selectedItem.id)[0] : null);
    } else {
        toast({
            title: 'Cannot Use Item',
            description: `You can't "use" a ${selectedItem.type.toLowerCase()} from your inventory.`,
            variant: 'destructive'
        })
    }
  }

  const handleDropItem = () => {
    if (!selectedItem) return;
    removeItem(selectedItem.id);
    toast({
        title: 'Item Dropped',
        description: `${selectedItem.name} has been removed from your inventory.`,
    });
    onSelectItem(items.length > 1 ? items.filter(i => i.id !== selectedItem.id)[0] : null);
    setIsInspecting(false);
  }
  
  const handleEmptyInventory = () => {
    setInventory([]);
    onSelectItem(null);
    toast({
        title: 'Inventory Emptied',
        description: 'All items have been discarded.'
    });
  }

  const handleUnlockSlot = (index: number) => {
    if (!unlocking || index >= maxSlots) return;
    if (character && character.ancientKeys > 0) {
        spendKey();
        unlockInventorySlot();
        setUnlocking(false);
        toast({
            title: 'Slot Unlocked!',
            description: 'You have expanded your inventory.'
        });
    }
  }

  const handleCombine = (targetItem: InventoryItem) => {
    if (!selectedItem) return;
    
    // Specific combination logic
    const isAzureAndVerdant = (selectedItem.id === 'item-azure-elixir' && targetItem.id === 'item-verdant-draught') || (selectedItem.id === 'item-verdant-draught' && targetItem.id === 'item-azure-elixir');

    if (isAzureAndVerdant) {
        removeItem(selectedItem.id);
        removeItem(targetItem.id);
        addItems([{
            id: 'item-crimson-concoction',
            name: 'Crimson Concoction',
            type: 'Consumable',
            description: 'A potent, swirling mixture of red. Restores vitality and stamina, but who knows the long-term effects?',
            value: 100,
            icon: 'FlaskConical',
            rank: 'Rare',
            effect: { vitality: 50, stamina: 50, sanity: -5 },
            lore: 'The result of forbidden alchemy. It pulses with a life of its own.',
            position: targetItem.position,
            size: [1, 1]
        }]);
        toast({ title: "Combination Successful!", description: "You've created a Crimson Concoction." });
    } else {
        setShaking(true);
        setTimeout(() => setShaking(false), 500);
        toast({ title: "Combination Failed", description: "These items do not react with each other.", variant: "destructive" });
    }
    onSelectItem(null);
  }
  
  const handleSelectItem = (item: InventoryItem | null) => {
    if (unlocking) return;

    if(selectedItem && item && selectedItem.id !== item.id) {
        handleCombine(item);
        return;
    }

    if (selectedItem && !item) { // Dropping item on empty slot
        const newInventory = items.map(i => i.id === selectedItem.id ? { ...i, position: { x:0, y:0 } /* This needs logic to find the actual slot coords */ } : i);
       // Drag-and-drop logic would go here. For now, we simplify.
       onSelectItem(null); // Deselect
       return;
    }

    setIsInspecting(false);
    onSelectItem(item);
  }

  const canBeUsed = selectedItem?.type === 'Consumable';
  const canBeInspected = selectedItem && !canBeUsed;
  
  const itemDetails = (
    <>
        <CardHeader className="p-0 mb-4">
          <CardTitle className="font-headline text-2xl text-accent">{selectedItem?.name}</CardTitle>
          <CardDescription>
            {selectedItem?.type} - Rank: {selectedItem?.rank || 'N/A'}
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0 flex-grow">
          <p className="text-muted-foreground">{selectedItem?.description}</p>
           {isInspecting && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 space-y-4"
              >
                  <Separator />
                  <div className="space-y-1.5">
                    <ItemAttribute label="Attack" value={selectedItem?.attack} icon={Sword} />
                    <ItemAttribute label="Defense" value={selectedItem?.defense} icon={Shield} />
                    <ItemAttribute label="Durability" value={selectedItem?.durability} icon={Zap} />
                    <ItemAttribute label="Weight" value={selectedItem?.weight} icon={Weight} />
                    <ItemAttribute label="Rank" value={selectedItem?.rank} icon={Star} />
                  </div>
                  <Separator />
                  {selectedItem?.lore && (
                      <div>
                          <h4 className="font-bold text-xs uppercase text-primary/80 mb-1">Lore</h4>
                          <p className="text-sm italic text-muted-foreground">"{selectedItem.lore}"</p>
                      </div>
                  )}
              </motion.div>
           )}
        </CardContent>
        <CardFooter className="p-0 mt-4 flex flex-col gap-2">
            <div className="w-full flex gap-2">
                {canBeUsed ? (
                    <Button className="w-full" onClick={handleUseItem}>
                        <Hand className="mr-2 h-4 w-4" /> Use
                    </Button>
                ) : (
                     <Button className="w-full" onClick={() => setIsInspecting(prev => !prev)} disabled={!selectedItem}>
                        <Search className="mr-2 h-4 w-4" /> {isInspecting ? 'Hide' : 'Inspect'}
                    </Button>
                )}
                 <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button variant="destructive" className="w-full" disabled={!selectedItem}>
                            <Trash2 className="mr-2 h-4 w-4" /> Drop
                        </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This will permanently remove the item from your inventory. This action cannot be undone.
                        </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDropItem}>Drop Item</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>
             <div className="w-full flex gap-2 pt-2">
                <Button variant="outline" className="w-full" onClick={() => setUnlocking(true)} disabled={!character || character.ancientKeys <= 0}>
                    <KeyRound className="mr-2" /> Unlock Slot 
                    <span className="text-muted-foreground ml-2">({character?.ancientKeys || 0})</span>
                </Button>

                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button variant="destructive" className="w-full" disabled={items.length === 0}>
                             <Trash2 className="mr-2 h-4 w-4" /> Empty
                        </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                        <AlertDialogTitle>Empty entire inventory?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This will PERMANENTLY remove all items from your inventory. This action cannot be undone.
                        </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleEmptyInventory}>Yes, Empty It</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
             </div>
        </CardFooter>
    </>
  );

  return (
    <Card className={cn("bg-card/50 border-primary/20 shadow-lg shadow-primary/5 flex flex-col md:flex-row", shaking && 'animate-shake')}>
      <div className="p-4 border-b md:border-b-0 md:border-r border-primary/10">
        <CardHeader className="p-2">
            <CardTitle className="font-headline text-2xl text-primary">Inventory</CardTitle>
            <CardDescription>{items.length} / {maxSlots} Slots Used</CardDescription>
        </CardHeader>
        <CardContent className="p-2">
            <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${GRID_COLS}, 1fr)`}}>
            {Array.from({ length: TOTAL_GRID_SLOTS }).map((_, index) => {
                const itemAtPos = items.find(item => {
                    const itemIndex = item.position.y * GRID_COLS + item.position.x;
                    // Check if index is within the item's occupied space
                    for (let y = 0; y < item.size[1]; y++) {
                        for (let x = 0; x < item.size[0]; x++) {
                            if ((item.position.y + y) * GRID_COLS + (item.position.x + x) === index) {
                                return true;
                            }
                        }
                    }
                    return false;
                });
                const mainItemAtPos = items.find(i => i.position.y * GRID_COLS + i.position.x === index);

                const isUnlocked = index < maxSlots;
                const isSelected = itemAtPos && selectedItem?.id === itemAtPos.id;

                if (mainItemAtPos && isUnlocked) {
                    const IconComponent = iconMap[mainItemAtPos.icon] || HelpCircle;
                    return (
                        <motion.div
                            key={mainItemAtPos.id}
                            onClick={() => handleSelectItem(mainItemAtPos)}
                            style={{
                                gridColumn: `span ${mainItemAtPos.size[0]}`,
                                gridRow: `span ${mainItemAtPos.size[1]}`,
                            }}
                            className={cn(
                                "bg-black/20 rounded-md flex items-center justify-center cursor-pointer border-2 hover:border-accent transition-all duration-300 relative",
                                isSelected ? "border-accent bg-accent/10" : "border-primary/20",
                                unlocking && "opacity-50 blur-sm"
                            )}
                            title={mainItemAtPos.name}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                        <IconComponent className={cn(
                            "h-8 w-8 text-primary/70 transition-all duration-300",
                            isSelected && "text-accent drop-shadow-[0_0_8px_hsl(var(--accent))]"
                        )} />
                        </motion.div>
                    );
                }

                // Placeholder for multi-tile items
                if (itemAtPos && isUnlocked) {
                    return null;
                }

                if (isUnlocked) {
                    return (
                        <div key={`empty-${index}`} 
                            className={cn(
                                "aspect-square bg-black/20 rounded-md border-2 border-primary/20 opacity-50",
                                unlocking && "opacity-50 blur-sm"
                            )}
                            onClick={() => handleSelectItem(null)}
                        ></div>
                    )
                }

                return (
                    <div 
                        key={`locked-${index}`} 
                        className={cn(
                            "aspect-square bg-black/40 rounded-md border-2 border-destructive/20 flex items-center justify-center",
                            unlocking && "cursor-pointer hover:bg-accent/20 hover:border-accent"
                        )} 
                        title="Locked Slot"
                        onClick={() => handleUnlockSlot(index)}
                    >
                        <Lock className="h-6 w-6 text-destructive/50"/>
                    </div>
                )
            })}
            </div>
        </CardContent>
      </div>
      
      <div className="w-full md:w-2/3 p-6 flex flex-col min-h-[300px]">
        <AnimatePresence mode="wait">
        {selectedItem ? (
          <motion.div 
            key={selectedItem.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col flex-grow"
          >
            {itemDetails}
          </motion.div>
        ) : (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-grow flex flex-col items-center justify-center text-center p-4"
          >
            <AnimatePresence>
            {unlocking && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="space-y-2 mb-4"
                >
                    <h3 className="font-headline text-accent text-lg">Unlock Mode</h3>
                    <p className="text-muted-foreground">Select a locked slot to unlock it.</p>
                    <Button variant="ghost" onClick={() => setUnlocking(false)}>Cancel</Button>
                </motion.div>
            )}
            </AnimatePresence>
            <p className="text-muted-foreground">Select an item to see details</p>
          </motion.div>
        )}
        </AnimatePresence>
      </div>
    </Card>
  );
}
