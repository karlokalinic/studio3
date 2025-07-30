
'use client'

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware'
import type { CharacterProfile, InventoryItem, Quest, Achievement } from '@/types';
import { achievementsData, inventoryData } from '@/data/mock-data';
import type { CharacterPreset } from '@/lib/character-synthesis';

interface CharacterState {
    character: CharacterProfile | null;
    inventory: InventoryItem[];
    quests: Quest[];
    unlockedAchievements: string[];
    hasHydrated: boolean;
    setHasHydrated: (hydrated: boolean) => void;
    createCharacter: (name: string, faction: string, stats: { intellect: number, strength: number, adaptation: number }, preset: CharacterPreset) => void;
    loadCharacter: () => void;
    resetCharacter: () => void;
    removeItem: (itemId: string) => void;
    addItems: (items: InventoryItem[]) => void;
    setInventory: (items: InventoryItem[]) => void;
    updateCharacterStats: (updates: Partial<{ vitality: number; stamina: number; sanity: number; currency: number; kamen: number; mracnik: number; prasinskeKovanice: number, xp: number; ancientKeys: number }>) => void;
    unlockInventorySlot: () => void;
    spendKey: () => void;
    setCharacter: (setter: (char: CharacterProfile | null) => CharacterProfile | null) => void;
    addQuest: (quest: Quest) => void;
    updateQuestProgress: (questId: string, progress: number) => void;
    unlockAchievement: (achievementId: string) => void;
}

export const useCharacterStore = create<CharacterState>()(
    persist(
        (set, get) => ({
            character: null,
            inventory: [],
            quests: [],
            unlockedAchievements: [],
            hasHydrated: false,
            setHasHydrated: (hydrated) => {
                set({ hasHydrated: hydrated });
            },
            createCharacter: (name, faction, stats, preset) => {
                const startingInventory = inventoryData.slice(0, 38);
                const newCharacter: CharacterProfile = {
                    name: name || preset.name,
                    level: 1,
                    xp: 0,
                    inventorySlots: 39,
                    vitality: 100,
                    stamina: 100,
                    sanity: 100,
                    currency: 0,
                    kamen: 0,
                    mracnik: 0,
                    prasinskeKovanice: 0,
                    ancientKeys: 1,
                    attributes: {
                        intellect: { value: stats.intellect, description: 'Knowledge of ancient languages, symbols, and research.' },
                        strength: { value: stats.strength, description: 'Physical power for moving obstacles.' },
                        adaptation: { value: stats.adaptation, description: 'Ability to react to sudden situations (uses a D6 roll).' },
                    },
                    state: {
                        fatigue: { value: 0, description: 'Tiredness level. High fatigue negatively impacts performance.' },
                        hunger: { value: 100, description: 'Satiation level.'},
                        focus: { value: 100, description: 'Mental concentration. High focus improves the effectiveness of tasks requiring intelligence.' },
                        mentalClarity: { value: 100, description: 'Clarity of thought. High clarity enhances decision-making and cognitive speed.' },
                    },
                    metadata: {
                        age: preset.age,
                        gender: preset.gender,
                        orientation: "Undisclosed",
                        style: preset.style,
                        origin: faction,
                        backstory: preset.backstory,
                    },
                    inventory: startingInventory,
                };
                set({ 
                    character: newCharacter, 
                    inventory: startingInventory, 
                    quests: [], 
                    unlockedAchievements: [] 
                });
                
                get().unlockAchievement('achieve-start-journey');

                localStorage.removeItem('tutorialCompleted');
            },
            loadCharacter: () => {
                // This function is mostly to trigger rehydration from storage
            },
            resetCharacter: () => {
                set({ character: null, inventory: [], quests: [], unlockedAchievements: [] });
                 localStorage.removeItem('tutorialCompleted');
                 if (typeof window !== 'undefined') {
                    localStorage.removeItem('character-storage');
                 }
            },
            addItems: (items) => {
                set((state) => ({
                    inventory: [...state.inventory, ...items],
                }));
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
                    if (updates.vitality !== undefined) newStats.vitality = Math.min(100, newStats.vitality + updates.vitality);
                    if (updates.stamina !== undefined) newStats.stamina = Math.min(100, newStats.stamina + updates.stamina);
                    if (updates.sanity !== undefined) newStats.sanity = Math.min(100, newStats.sanity + updates.sanity);
                    if (updates.kamen !== undefined) newStats.kamen += updates.kamen;
                    if (updates.mracnik !== undefined) newStats.mracnik += updates.mracnik;
                    if (updates.prasinskeKovanice !== undefined) newStats.prasinskeKovanice += updates.prasinskeKovanice;
                    if (updates.xp !== undefined) newStats.xp += updates.xp;
                    if (updates.currency !== undefined) newStats.currency += updates.currency;
                    if (updates.ancientKeys !== undefined) newStats.ancientKeys += updates.ancientKeys;
                    
                    return { character: newStats };
                });
            },
            unlockInventorySlot: () => {
                set((state) => {
                    if (!state.character) return {};
                    if (state.character.inventorySlots < 40) {
                         const char = { ...state.character };
                         char.inventorySlots += 1;
                         get().unlockAchievement('achieve-inventory-expanded');
                         return { character: char };
                    }
                    return {};
                });
            },
            spendKey: () => {
                set(state => {
                    if (!state.character || state.character.ancientKeys <= 0) return {};
                    const newCharacter = { ...state.character, ancientKeys: state.character.ancientKeys - 1 };
                    return { character: newCharacter };
                })
            },
            setCharacter: (setter) => {
                set((state) => ({ character: setter(state.character) }));
            },
            addQuest: (quest) => {
                set((state) => {
                    if (state.quests.some(q => q.id === quest.id)) {
                        return {};
                    }
                    get().unlockAchievement('achieve-first-quest');
                    return { quests: [...state.quests, quest] };
                });
            },
            updateQuestProgress: (questId, progress) => {
                set((state) => {
                    let questCompleted = false;
                    const newQuests = state.quests.map((q) => {
                        if (q.id === questId) {
                            const newProgress = Math.min(100, q.progress + progress);
                            if (newProgress >= 100 && q.status !== 'Completed') {
                                questCompleted = true;
                            }
                            return {
                                ...q,
                                progress: newProgress,
                                status: newProgress >= 100 ? 'Completed' : 'Active',
                            };
                        }
                        return q;
                    });
                    if (questCompleted) {
                         get().unlockAchievement('achieve-complete-first-quest');
                    }
                    return { quests: newQuests };
                });
            },
            setInventory: (items) => {
                set((state) => {
                    if (state.character) {
                        const newCharacter = { ...state.character, inventory: items };
                        return { inventory: items, character: newCharacter };
                    }
                    return { inventory: items };
                });
            },
            unlockAchievement: (achievementId) => {
                const { character, quests, unlockedAchievements, updateCharacterStats, inventory } = get();
                if (!character || unlockedAchievements.includes(achievementId)) {
                    return;
                }
                
                const achievement = achievementsData.find(a => a.id === achievementId);
                const charWithInventory = {
                    ...character,
                    inventory: inventory,
                };

                if (achievement && achievement.isUnlocked(charWithInventory, quests)) {
                    set(state => ({ unlockedAchievements: [...state.unlockedAchievements, achievementId] }));
                    if (achievement.reward.xp || achievement.reward.currency) {
                       updateCharacterStats({
                           xp: achievement.reward.xp || 0,
                           kamen: achievement.reward.currency || 0
                       });
                    }
                }
            },
        }),
        {
            name: 'character-storage',
            storage: createJSONStorage(() => localStorage),
            onRehydrateStorage: () => (state) => {
                if (state) {
                    state.setHasHydrated(true);
                }
            },
        }
    )
);
