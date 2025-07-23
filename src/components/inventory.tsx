"use client";

import type { InventoryItem } from "@/types";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Hand, Trash2 } from "lucide-react";

interface InventoryProps {
  items: InventoryItem[];
  selectedItem: InventoryItem | null;
  onSelectItem: (item: InventoryItem) => void;
}

export default function Inventory({ items, selectedItem, onSelectItem }: InventoryProps) {

  const GlowIcon = ({ icon: Icon, isSelected }: { icon: React.ElementType, isSelected: boolean }) => (
    <Icon 
      className={cn(
        "h-8 w-8 text-primary/70 transition-all duration-300",
        isSelected && "text-accent drop-shadow-[0_0_8px_hsl(var(--accent))]"
      )}
    />
  );

  return (
    <Card className="bg-card/50 border-primary/20 shadow-lg shadow-primary/5 h-full flex flex-col md:flex-row">
      <div className="md:w-1/2 p-4 border-b md:border-b-0 md:border-r border-primary/10">
        <CardHeader className="p-2">
            <CardTitle className="font-headline text-2xl text-primary">Inventory</CardTitle>
        </CardHeader>
        <CardContent className="p-2">
            <div className="grid grid-cols-6 gap-4">
            {items.map((item) => (
                <div
                key={item.id}
                onClick={() => onSelectItem(item)}
                className={cn(
                    "w-full aspect-square bg-black/20 rounded-md flex items-center justify-center cursor-pointer border-2 border-transparent hover:border-accent transition-all duration-300",
                    selectedItem?.id === item.id ? "border-accent bg-accent/10" : "border-primary/20"
                )}
                title={item.name}
                >
                <GlowIcon icon={item.icon} isSelected={selectedItem?.id === item.id} />
                </div>
            ))}
            {Array.from({ length: 30 - items.length }).map((_, i) => (
                 <div key={`empty-${i}`} className="w-full aspect-square bg-black/20 rounded-md border-2 border-primary/20 opacity-50"></div>
            ))}
            </div>
        </CardContent>
      </div>
      
      <div className="md:w-1/2 p-6 flex flex-col">
        {selectedItem ? (
          <>
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
            </CardContent>
            <CardFooter className="p-0 mt-4 flex gap-2">
              <Button className="w-full bg-accent text-background hover:bg-accent/80 transition-all">
                <Hand className="mr-2 h-4 w-4" /> Use
              </Button>
              <Button variant="destructive" className="w-full">
                <Trash2 className="mr-2 h-4 w-4" /> Drop
              </Button>
            </CardFooter>
          </>
        ) : (
          <div className="flex-grow flex items-center justify-center">
            <p className="text-muted-foreground">Select an item to see details</p>
          </div>
        )}
      </div>
    </Card>
  );
}
