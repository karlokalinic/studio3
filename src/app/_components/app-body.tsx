
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

      document.body.classList.toggle('font-dyslexia', settings.dyslexiaFont);
    }
  }, [settings?.theme, settings?.dyslexiaFont]);

  if (!settings) return <body><div className="flex items-center justify-center min-h-screen">Loading settings...</div></body>;

  return (
      <body className={cn(
        "font-body antialiased"
      )}>
        {children}
      </body>
  );
}
