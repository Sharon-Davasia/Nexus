import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface User {
    id: string;
    email: string;
    name: string;
    credits: number;
    subscriptionTier: 'free' | 'pro' | 'enterprise';
    avatar?: string;
    createdAt: Date;
    preferences: {
        theme: 'dark' | 'light';
        editorTheme: string;
        enableVoiceInput: boolean;
        enableCollaboration: boolean;
    };
}

interface UserState {
    user: User | null;
    isLoading: boolean;
    error: string | null;

    // Actions
    setUser: (user: User) => void;
    updateUser: (updates: Partial<User>) => void;
    updatePreferences: (preferences: Partial<User['preferences']>) => void;
    deductCredits: (amount: number) => void;
    clearUser: () => void;
}

export const useUserStore = create<UserState>()(
    persist(
        (set) => ({
            user: null,
            isLoading: false,
            error: null,

            setUser: (user) => set({ user, error: null }),

            updateUser: (updates) => set((state) => ({
                user: state.user ? { ...state.user, ...updates } : null,
            })),

            updatePreferences: (preferences) => set((state) => ({
                user: state.user
                    ? { ...state.user, preferences: { ...state.user.preferences, ...preferences } }
                    : null,
            })),

            deductCredits: (amount) => set((state) => ({
                user: state.user
                    ? { ...state.user, credits: Math.max(0, state.user.credits - amount) }
                    : null,
            })),

            clearUser: () => set({ user: null, error: null }),
        }),
        {
            name: 'nexus-user',
        }
    )
);
