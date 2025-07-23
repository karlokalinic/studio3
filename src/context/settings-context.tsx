
'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface Settings {
  theme: 'light' | 'dark';
  dyslexiaFont: boolean;
  reduceFlashing: boolean;
}

interface SettingsContextType {
  settings: Settings | null;
  setSetting: <K extends keyof Settings>(key: K, value: Settings[K]) => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

const getInitialSettings = (): Settings => {
    if (typeof window === 'undefined') {
        return {
            theme: 'dark',
            dyslexiaFont: false,
            reduceFlashing: false,
        }
    }
    
    const storedSettings = localStorage.getItem('gameSettings');
    if (storedSettings) {
        try {
            const parsed = JSON.parse(storedSettings);
            return {
                 theme: 'dark',
                 dyslexiaFont: false,
                 reduceFlashing: false,
                 ...parsed
            };
        } catch (e) {
            console.error("Failed to parse settings from localStorage", e);
        }
    }
    return {
        theme: 'dark',
        dyslexiaFont: false,
        reduceFlashing: false,
    };
};


export const SettingsProvider = ({ children }: { children: React.ReactNode }) => {
  const [settings, setSettings] = useState<Settings | null>(null);

  useEffect(() => {
    setSettings(getInitialSettings());
  }, []);

  useEffect(() => {
    if (settings && typeof window !== 'undefined') {
      localStorage.setItem('gameSettings', JSON.stringify(settings));
    }
  }, [settings]);

  const setSetting = <K extends keyof Settings>(key: K, value: Settings[K]) => {
    if(!settings) return;
    setSettings(prevSettings => ({
      ...prevSettings!,
      [key]: value,
    }));
  };

  return (
    <SettingsContext.Provider value={{ settings, setSetting }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};

