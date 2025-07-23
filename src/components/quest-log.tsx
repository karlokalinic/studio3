
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
  if (quests.length === 0) {
    return (
       <Card className="bg-card/50 border-primary/20 shadow-lg shadow-primary/5">
        <CardHeader>
            <CardTitle className="font-headline text-2xl text-primary">Quest Log</CardTitle>
        </CardHeader>
        <CardContent className="h-96 flex items-center justify-center">
            <p className="text-muted-foreground">No active quests.</p>
        </CardContent>
       </Card>
    )
  }

  return (
    <Card className="bg-card/50 border-primary/20 shadow-lg shadow-primary/5">
      <CardHeader>
        <CardTitle className="font-headline text-2xl text-primary">Quest Log</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-96 w-full pr-4">
            <Accordion type="multiple" defaultValue={[quests[0]?.id]} className="w-full">
            {quests.map((quest) => (
                <AccordionItem value={quest.id} key={quest.id}>
                <AccordionTrigger className="font-headline text-lg hover:no-underline hover:text-accent transition-colors">
                    <div className="flex items-center gap-4 w-full mr-4">
                       <span className={quest.status === 'Completed' ? 'text-green-400' : 'text-accent'}>
                         {quest.status === 'Completed' ? '[COMPLETED]' : '[ACTIVE]'}
                       </span>
                        <span className="flex-1 text-left">{quest.title}</span>
                    </div>
                </AccordionTrigger>
                <AccordionContent className="space-y-4">
                    <p className="text-muted-foreground">{quest.description}</p>
                    
                    <div>
                        <div className="flex justify-between items-center mb-1">
                            <h4 className="font-bold text-primary/80 text-sm">Progress</h4>
                            <span className="text-xs text-accent font-mono">{quest.progress}%</span>
                        </div>
                        <Progress value={quest.progress} className="h-2" />
                    </div>

                    <div>
                        <h4 className="font-bold text-primary/80 text-sm">Moral Choice:</h4>
                        <p className="text-sm italic text-muted-foreground">{quest.moralChoice}</p>
                    </div>
                     <div>
                        <h4 className="font-bold text-primary/80 text-sm">Potential Outcomes:</h4>
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

    