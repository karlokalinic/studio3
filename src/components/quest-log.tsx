
"use client";

import type { Quest } from "@/types";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";

interface QuestLogProps {
  quests: Quest[];
}

export default function QuestLog({ quests }: QuestLogProps) {
  return (
    <Card className="bg-card/50 border-primary/20 shadow-lg shadow-primary/5">
      <CardHeader>
        <CardTitle className="font-headline text-2xl text-primary">Quest Log</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-96 w-full">
            <Accordion type="multiple" className="w-full">
            {quests.map((quest) => (
                <AccordionItem value={quest.id} key={quest.id}>
                <AccordionTrigger className="font-headline text-lg hover:no-underline hover:text-accent transition-colors">
                    <div className="flex items-center gap-4 w-full">
                       <span className="text-accent text-sm font-mono">[{quest.status === 'Completed' ? 'x' : ' '}]</span>
                        <span className="flex-1 text-left">{quest.title}</span>
                        <span className="text-sm text-muted-foreground font-mono">{quest.progress}%</span>
                    </div>
                </AccordionTrigger>
                <AccordionContent className="space-y-3">
                    <p className="text-muted-foreground">{quest.description}</p>
                    <div>
                        <h4 className="font-bold text-primary/80">Moral Choice:</h4>
                        <p className="text-sm italic text-muted-foreground">{quest.moralChoice}</p>
                    </div>
                     <div>
                        <h4 className="font-bold text-primary/80">Potential Outcomes:</h4>
                        <p className="text-sm italic text-muted-foreground">{quest.outcomes}</p>
                    </div>
                </AccordionContent>
                </AccordionItem>
            ))}
            </Accordion>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
