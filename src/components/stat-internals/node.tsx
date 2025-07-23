
"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Coins } from "lucide-react";


interface NodeProps {
    name: string;
    icon: React.ElementType;
    formula?: string;
    description?: string;
    colorClass?: string;
    children?: React.ReactNode;
}

export const Node = React.forwardRef<HTMLDivElement, NodeProps>(
    ({ name, icon, formula, description, colorClass = 'primary', children }, ref) => {
    const Icon = icon;
    
    const colors: {[key: string]: { border: string, icon: string, text: string }} = {
        primary: { border: 'border-primary/30 hover:border-primary/80 hover:shadow-primary/20', icon: 'text-primary', text: 'text-primary'},
        core: { border: 'border-accent/50 hover:border-accent/80 hover:shadow-accent/20', icon: 'text-accent', text: 'text-accent' },
        curse: { border: 'border-destructive/50 hover:border-destructive/80 hover:shadow-destructive/20', icon: 'text-destructive', text: 'text-destructive' },
        ability: { border: 'border-yellow-400/50 hover:border-yellow-400/80 hover:shadow-yellow-400/20', icon: 'text-yellow-400', text: 'text-yellow-400' },
        order: { border: 'border-cyan-400/50 hover:border-cyan-400/80 hover:shadow-cyan-400/20', icon: 'text-cyan-400', text: 'text-cyan-400' },
        chaos: { border: 'border-fuchsia-500/50 hover:border-fuchsia-500/80 hover:shadow-fuchsia-500/20', icon: 'text-fuchsia-500', text: 'text-fuchsia-500' },
        balance: { border: 'border-lime-500/50 hover:border-lime-500/80 hover:shadow-lime-500/20', icon: 'text-lime-500', text: 'text-lime-500' },
        convergence: { border: 'border-orange-500/50 hover:border-orange-500/80 hover:shadow-orange-500/20', icon: 'text-orange-500', text: 'text-orange-500' },
        mystery: { border: 'border-slate-500/50 hover:border-slate-500/80 hover:shadow-slate-500/20', icon: 'text-slate-500', text: 'text-slate-500' },
    }

    const selectedColor = colors[colorClass] || colors.primary;

    return (
        <Dialog>
            <DialogTrigger asChild>
                <div ref={ref} className="relative group flex items-center justify-center">
                    <div 
                        className={cn(`group w-20 h-20 bg-black/20 rounded-lg border-2 cursor-pointer shadow-md overflow-hidden relative flex flex-col items-center justify-center transition-all duration-300 hover:scale-105`, selectedColor.border)}
                    >
                        <div className={cn(`w-full h-full flex flex-col items-center justify-center p-2 text-center`)}>
                            <Icon className={cn(`w-8 h-8 mb-1 transition-all group-hover:scale-110`, selectedColor.icon)} />
                        </div>
                        <p className={`absolute -bottom-0.5 w-full text-center px-1 font-bold text-[10px] opacity-0 group-hover:opacity-100 transition-opacity duration-300`}>{name}</p>
                    </div>
                </div>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className={cn("font-headline flex items-center gap-2 text-2xl", selectedColor.text)}><Icon className="w-8 h-8"/> {name}</DialogTitle>
                </DialogHeader>
                <div className="mt-4 space-y-4">
                    <p className="text-sm text-muted-foreground">{description || "The purpose of this node is currently unknown. Its secrets may be revealed through gameplay."}</p>
                    
                    {formula && (
                      <div className={`text-sm font-mono p-4 rounded-md ${formula.includes('[REDACTED]') ? 'bg-destructive/10 text-destructive' : 'bg-black/30 text-green-400'}`}>
                          <pre><code>{formula}</code></pre>
                      </div>
                    )}
                    
                     {children && <div className="text-xs text-muted-foreground">{children}</div>}
                </div>
                 {colorClass !== 'curse' && colorClass !== 'mystery' && (
                    <div className="mt-4 pt-4 border-t border-border">
                        <h4 className="font-headline text-lg text-primary mb-2">Upgrade</h4>
                        <p className="text-sm text-muted-foreground mb-4">Permanently enhance this attribute.</p>
                        <div className="flex justify-between items-center bg-black/20 p-2 rounded-md">
                            <p className="font-bold">Minor Enhancement</p>
                            <Button size="sm" variant="outline" disabled>
                                <Coins className="mr-2 h-4 w-4" /> 1,500
                            </Button>
                        </div>
                    </div>
                 )}
            </DialogContent>
        </Dialog>
    )
});
Node.displayName = "Node";
