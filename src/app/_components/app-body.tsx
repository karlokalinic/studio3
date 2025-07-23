
'use client';

import { useSettings } from "@/context/settings-context";
import { cn } from "@/lib/utils";
import { useEffect } from "react";


export default function AppBody({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { settings } = useSettings();

  useEffect(() => {
    if (typeof window !== 'undefined' && settings) {
      const root = window.document.documentElement;
      root.classList.remove('light', 'dark');
      root.classList.add(settings.theme);
    }
  }, [settings?.theme]);

  if (!settings) return null;

  return (
      <body className={cn(
        "font-body antialiased",
        settings.dyslexiaFont && "font-dyslexia"
      )}>
        {children}
      </body>
  );
}
