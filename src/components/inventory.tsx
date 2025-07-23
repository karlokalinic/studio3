
"use client";

import type { InventoryItem } from "@/types";
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
import { Hand, Trash2, Info, Lock } from "lucide-react";
import { motion, AnimatePresence } from 'framer-motion';

interface InventoryProps {
  items: InventoryItem[];
  selectedItem: InventoryItem | null;
  onSelectItem: (item: InventoryItem | null) => void;
  maxSlots: number;
}

const TOTAL_GRID_SLOTS = 25; // 5x5 grid

export default function Inventory({ items, selectedItem, onSelectItem, maxSlots }: InventoryProps) {
  const { removeItem, updateCharacterStats, unlockInventorySlot } = useCharacterStore();
  const { toast } = useToast();

  const handleUseItem = () => {
    if (!selectedItem) return;

    if (selectedItem.type === 'Consumable') {
        if(selectedItem.nutrition) {
            updateCharacterStats({ health: selectedItem.nutrition });
            toast({
                title: 'Item Used',
                description: `${selectedItem.name} consumed. You recovered ${selectedItem.nutrition} health.`,
            });
        }
        removeItem(selectedItem.id);
        onSelectItem(items.length > 1 ? items.filter(i => i.id !== selectedItem.id)[0] : null);
    } else if (selectedItem.type === 'Key') {
        if (maxSlots < TOTAL_GRID_SLOTS) {
            unlockInventorySlot();
            toast({
                title: 'Inventory Expanded',
                description: 'You have unlocked a new inventory slot.',
            });
            removeItem(selectedItem.id);
            onSelectItem(items.length > 1 ? items.filter(i => i.id !== selectedItem.id)[0] : null);
        } else {
             toast({
                title: 'Maximum Slots Reached',
                description: 'Your inventory is already fully expanded.',
                variant: 'destructive'
            });
        }
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
  }
  
  const canBeUsed = selectedItem && (selectedItem.type === 'Consumable' || (selectedItem.type === 'Key' && maxSlots < TOTAL_GRID_SLOTS));

  return (
    <Card className="bg-card/50 border-primary/20 shadow-lg shadow-primary/5 flex flex-col md:flex-row">
      <div className="md:w-1/2 p-4 border-b md:border-b-0 md:border-r border-primary/10">
        <CardHeader className="p-2">
            <CardTitle className="font-headline text-2xl text-primary">Inventory</CardTitle>
            <CardDescription>{items.length} / {maxSlots} Slots Used</CardDescription>
        </CardHeader>
        <CardContent className="p-2">
            <div className="grid grid-cols-5 gap-2">
            {Array.from({ length: TOTAL_GRID_SLOTS }).map((_, index) => {
              const item = items[index];
              const isUnlocked = index < maxSlots;
              const isSelected = item && selectedItem?.id === item.id;
              
              if (item && isUnlocked) {
                 const IconComponent = item.icon;
                 return (
                    <motion.div
                      key={item.id}
                      onClick={() => onSelectItem(item)}
                      className={cn(
                          "w-full aspect-square bg-black/20 rounded-md flex items-center justify-center cursor-pointer border-2 hover:border-accent transition-all duration-300",
                          isSelected ? "border-accent bg-accent/10" : "border-primary/20"
                      )}
                      title={item.name}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      >
                       <IconComponent className={cn(
                          "h-8 w-8 text-primary/70 transition-all duration-300",
                          isSelected && "text-accent drop-shadow-[0_0_8px_hsl(var(--accent))]"
                      )} />
                    </motion.div>
                 );
              }
              
              if (isUnlocked) {
                  return (
                    <div key={`empty-${index}`} className="w-full aspect-square bg-black/20 rounded-md border-2 border-primary/20 opacity-50"></div>
                  )
              }
              
              return (
                 <div key={`locked-${index}`} className="w-full aspect-square bg-black/40 rounded-md border-2 border-destructive/20 flex items-center justify-center" title="Locked Slot">
                    <Lock className="h-6 w-6 text-destructive/50"/>
                 </div>
              )
            })}
            </div>
        </CardContent>
      </div>
      
      <div className="md:w-1/2 p-6 flex flex-col min-h-[300px]">
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
            <CardHeader className="p-0 mb-4">
              <CardTitle className="font-headline text-2xl text-accent">{selectedItem.name}</CardTitle>
              <CardDescription>
                {selectedItem.type} - Value: {selectedItem.value} Kristali
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0 flex-grow">
              <p className="text-muted-foreground">{selectedItem.description}</p>
              {selectedItem.nutrition && (
                <p className="text-sm text-accent mt-2">Nutrition: +{selectedItem.nutrition}</p>
              )}
               {!canBeUsed && selectedItem.type !== 'Consumable' && selectedItem.type !== 'Key' && (
                <div className="mt-4 p-3 bg-black/20 rounded-md text-xs text-muted-foreground flex items-center gap-2">
                    <Info className="h-4 w-4 shrink-0"/>
                    <span>This item cannot be "used" directly. It may be a quest item or equipment that provides passive bonuses.</span>
                </div>
              )}
            </CardContent>
            <CardFooter className="p-0 mt-4 flex gap-2">
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button className="w-full bg-accent text-background hover:bg-accent/80 transition-all" disabled={!canBeUsed}>
                        <Hand className="mr-2 h-4 w-4" /> Use
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        Using this item will consume it permanently. This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={handleUseItem}>Proceed</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive" className="w-full">
                        <Trash2 className="mr-2 h-4 w-4" /> Drop
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
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
            </CardFooter>
          </motion.div>
        ) : (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-grow flex items-center justify-center"
          >
            <p className="text-muted-foreground">Select an item to see details</p>
          </motion.div>
        )}
        </AnimatePresence>
      </div>
    </Card>
  );
}
