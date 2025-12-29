import { create } from 'zustand';
import type { User, Session } from '@supabase/supabase-js';

export interface UserProfile {
  id: string;
  email: string;
  display_name: string | null;
  avatar_url: string | null;
  subscription_tier: 'free' | 'premium';
  generations_count: number;
  created_at: string;
  updated_at: string;
}

interface AuthState {
  // Auth state
  user: User | null;
  session: Session | null;
  profile: UserProfile | null;
  isLoading: boolean;
  isInitialized: boolean;

  // Modal state
  isAuthModalOpen: boolean;
  authModalView: 'login' | 'signup' | 'forgot-password';

  // Actions
  setUser: (user: User | null) => void;
  setSession: (session: Session | null) => void;
  setProfile: (profile: UserProfile | null) => void;
  setIsLoading: (loading: boolean) => void;
  setIsInitialized: (initialized: boolean) => void;
  openAuthModal: (view?: 'login' | 'signup' | 'forgot-password') => void;
  closeAuthModal: () => void;
  setAuthModalView: (view: 'login' | 'signup' | 'forgot-password') => void;
  clear: () => void;

  // Computed
  isAuthenticated: () => boolean;
  canGenerate: () => boolean;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  // Initial state
  user: null,
  session: null,
  profile: null,
  isLoading: true,
  isInitialized: false,
  isAuthModalOpen: false,
  authModalView: 'login',

  // Actions
  setUser: (user) => set({ user }),
  setSession: (session) => set({ session }),
  setProfile: (profile) => set({ profile }),
  setIsLoading: (isLoading) => set({ isLoading }),
  setIsInitialized: (isInitialized) => set({ isInitialized }),

  openAuthModal: (view = 'login') =>
    set({ isAuthModalOpen: true, authModalView: view }),

  closeAuthModal: () => set({ isAuthModalOpen: false }),

  setAuthModalView: (authModalView) => set({ authModalView }),

  clear: () =>
    set({
      user: null,
      session: null,
      profile: null,
      isLoading: false,
    }),

  // Computed helpers
  isAuthenticated: () => !!get().user,

  canGenerate: () => {
    const { profile } = get();
    if (!profile) return false;
    if (profile.subscription_tier === 'premium') return true;
    return profile.generations_count < 1; // Free tier: 1 generation
  },
}));
