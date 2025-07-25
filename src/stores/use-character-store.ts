

'use client'

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware'
import type { CharacterProfile, InventoryItem, Quest, Achievement } from '@/types';
import { inventoryData as startingInventory, achievementsData } from '@/data/mock-data';
import type { CharacterPreset } from '@/lib/character-synthesis';

const calculateInitialSlots = (strength: number) => 3 + Math.floor(strength / 5);

interface CharacterState {
    character: CharacterProfile | null;
    inventory: InventoryItem[];
    quests: Quest[];
    unlockedAchievements: string[];
    hasHydrated: boolean;
    setHasHydrated: (hydrated: boolean) => void;
    createCharacter: (name: string, faction: string, stats: { strength: number, intelligence: number, spirit: number }, preset: CharacterPreset) => void;
    loadCharacter: () => void;
    resetCharacter: () => void;
    removeItem: (itemId: string) => void;
    updateCharacterStats: (updates: Partial<{ health: number; energy: number; hunger: number; currency: number, xp: number }>) => void;
    unlockInventorySlot: () => void;
    setCharacter: (setter: (char: CharacterProfile | null) => CharacterProfile | null) => void;
    addQuest: (quest: Quest) => void;
    updateQuestProgress: (questId: string, progress: number) => void;
    setInventory: (items: InventoryItem[]) => void;
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
                    attunement: {
                        order: 0,
                        chaos: 0,
                        balance: 0,
                    },
                    metadata: {
                        age: preset.age,
                        gender: preset.gender,
                        orientation: "Not specified",
                        style: preset.style,
                        origin: faction,
                        backstory: preset.backstory,
                    },
                };
                set({ character: newCharacter, inventory: [], quests: [], unlockedAchievements: [] });
                localStorage.removeItem('tutorialCompleted'); // Reset tutorial on new character
            },
            loadCharacter: () => {
                // This function is mostly to trigger rehydration from storage
                // The actual loading is handled by the persist middleware
            },
            resetCharacter: () => {
                set({ character: null, inventory: [], quests: [], unlockedAchievements: [] });
                 localStorage.removeItem('tutorialCompleted');
                 if (typeof window !== 'undefined') {
                    localStorage.removeItem('character-storage');
                 }
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
                    if (updates.health !== undefined) newStats.health = Math.min(100, newStats.health + updates.health);
                    if (updates.energy !== undefined) newStats.energy = Math.min(100, newStats.energy + updates.energy);
                    if (updates.hunger !== undefined) newStats.hunger = Math.min(100, newStats.hunger + updates.hunger);
                    if (updates.currency !== undefined) newStats.currency = newStats.currency + updates.currency;
                    if (updates.xp !== undefined) newStats.xp = newStats.xp + updates.xp;
                    
                    return { character: newStats };
                });
            },
            unlockInventorySlot: () => {
                set((state) => {
                    if (!state.character) return {};
                    if (state.character.inventorySlots < 25) {
                         const char = { ...state.character };
                         char.inventorySlots += 1;
                         // Manually trigger achievement check
                         get().unlockAchievement('achieve-inventory-expanded');
                         return { character: char };
                    }
                    return {};
                });
            },
            setCharacter: (setter) => {
                set((state) => ({ character: setter(state.character) }));
            },
            addQuest: (quest) => {
                set((state) => {
                    // Prevent adding duplicate quests
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
                         get().unlockAchievement('achieve-complete-retrieval');
                    }
                    return { quests: newQuests };
                });
            },
            setInventory: (items) => {
                set({ inventory: items });
            },
            unlockAchievement: (achievementId) => {
                const { character, quests, unlockedAchievements, updateCharacterStats } = get();
                if (!character || unlockedAchievements.includes(achievementId)) {
                    return;
                }
                
                const achievement = achievementsData.find(a => a.id === achievementId);
                if (achievement && achievement.isUnlocked(character, quests)) {
                    set(state => ({ unlockedAchievements: [...state.unlockedAchievements, achievementId] }));
                    if (achievement.reward.xp || achievement.reward.currency) {
                       updateCharacterStats({
                           xp: achievement.reward.xp || 0,
                           currency: achievement.reward.currency || 0
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
                    if (state.character && !state.character.attunement) {
                        state.character.attunement = { order: 0, chaos: 0, balance: 0 };
                    }
                    state.setHasHydrated(true);
                }
            },
        }
    )
);
