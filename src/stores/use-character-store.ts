
'use client'

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware'
import type { CharacterProfile, InventoryItem } from '@/types';
import { inventoryData } from '@/data/mock-data';

const generateRandomStat = () => Math.floor(Math.random() * 8) + 8; // Random number between 8 and 15
const calculateInitialSlots = (strength: number) => 10 + Math.floor(strength / 2);

interface CharacterState {
    character: CharacterProfile | null;
    inventory: InventoryItem[];
    hasHydrated: boolean;
    setHasHydrated: (hydrated: boolean) => void;
    createCharacter: (name: string, faction: string, stats: { strength: number, intelligence: number, spirit: number }) => void;
    loadCharacter: () => void;
    resetCharacter: () => void;
    removeItem: (itemId: string) => void;
    updateCharacterStats: (updates: Partial<{ health: number; energy: number; hunger: number; currency: number }>) => void;
    unlockInventorySlot: () => void;
}

export const useCharacterStore = create<CharacterState>()(
    persist(
        (set, get) => ({
            character: null,
            inventory: [],
            hasHydrated: false,
            setHasHydrated: (hydrated) => {
                set({ hasHydrated: hydrated });
            },
            createCharacter: (name, faction, stats) => {
                const newCharacter: CharacterProfile = {
                    name: name,
                    level: 1,
                    xp: 0,
                    inventorySlots: calculateInitialSlots(stats.strength),
                    health: 100,
                    energy: 100,
                    hunger: 100,
                    currency: 50,
                    attributes: {
                        strength: { value: stats.strength, description: 'Raw physical power. Affects melee damage and carry capacity.' },
                        intelligence: { value: stats.intelligence, description: 'Cognitive ability, problem-solving, and hacking skills.' },
                        spirit: { value: stats.spirit, description: 'Mental fortitude and connection to dimensional energies. Affects willpower and magic resistance.' },
                        hp: { value: 100, description: 'Health Points. Represents your character\'s life force.' },
                    },
                    state: {
                        fatigue: { value: 0, description: 'Tiredness level. High fatigue negatively impacts physical performance.' },
                        fitness: { value: 100, description: 'Overall physical condition. High fitness improves strength and endurance.' },
                        focus: { value: 100, description: 'Mental concentration. High focus improves the effectiveness of tasks requiring intelligence.' },
                        mentalClarity: { value: 100, description: 'Clarity of thought. High clarity enhances decision-making and cognitive speed.' },
                    },
                    enhancements: {
                        cybernetics: [],
                        implants: [],
                    },
                    metadata: {
                        age: 25,
                        gender: "Not specified",
                        orientation: "Not specified",
                        style: "Adventurer",
                        origin: faction,
                        backstory: `A new face in the Nexus, hailing from the ${faction}, ready to make their mark.`,
                    },
                };
                set({ character: newCharacter, inventory: [...inventoryData].slice(0, 5) }); // Start with a few items from mock data
                localStorage.removeItem('tutorialCompleted'); // Reset tutorial on new character
            },
            loadCharacter: () => {
                // This function is mostly to trigger rehydration from storage
                // The actual loading is handled by the persist middleware
            },
            resetCharacter: () => {
                set({ character: null, inventory: [] });
                 localStorage.removeItem('tutorialCompleted');
            },
            removeItem: (itemId) => {
                set((state) => ({
                    inventory: state.inventory.filter((item) => item.id !== itemId),
                }));
            },
            updateCharacterStats: (updates) => {
                 set((state) => {
                    if (!state.character) return {};

                    const newStats = { ...state.character };
                    if (updates.health) newStats.health = Math.min(100, newStats.health + updates.health);
                    if (updates.energy) newStats.energy = Math.min(100, newStats.energy + updates.energy);
                    if (updates.hunger) newStats.hunger = Math.min(100, newStats.hunger + updates.hunger);
                    if (updates.currency) newStats.currency = newStats.currency + updates.currency;
                    
                    return { character: newStats };
                });
            },
            unlockInventorySlot: () => {
                set((state) => {
                    if (!state.character) return {};
                    if (state.character.inventorySlots < 30) {
                        return {
                            character: {
                                ...state.character,
                                inventorySlots: state.character.inventorySlots + 1,
                            }
                        }
                    }
                    return {};
                });
            }
        }),
        {
            name: 'character-storage',
            storage: createJSONStorage(() => localStorage),
            onRehydrateStorage: () => (state) => {
                state?.setHasHydrated(true)
            },
        }
    )
);
