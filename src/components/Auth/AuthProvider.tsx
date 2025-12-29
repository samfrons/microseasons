'use client';

import { useEffect, createContext, useContext, useState, type ReactNode } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useAuthStore, type UserProfile } from '@/store/useAuthStore';
import type { SupabaseClient, AuthChangeEvent, Session } from '@supabase/supabase-js';

const AuthContext = createContext<SupabaseClient | null>(null);

// Check if Supabase is configured
const isSupabaseConfigured = () => {
  return !!(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
    !process.env.NEXT_PUBLIC_SUPABASE_URL.includes('placeholder')
  );
};

export function useSupabase() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useSupabase must be used within an AuthProvider');
  }
  return context;
}

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [supabase] = useState(() => createClient());
  const {
    setUser,
    setSession,
    setProfile,
    setIsLoading,
    setIsInitialized,
    clear,
  } = useAuthStore();

  useEffect(() => {
    // Skip auth initialization if Supabase isn't configured
    if (!isSupabaseConfigured()) {
      setIsLoading(false);
      setIsInitialized(true);
      return;
    }

    // Get initial session
    const initAuth = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();

        setSession(session);
        setUser(session?.user ?? null);

        if (session?.user) {
          // Fetch user profile
          const { data: profile } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single();

          setProfile(profile as UserProfile | null);
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
      } finally {
        setIsLoading(false);
        setIsInitialized(true);
      }
    };

    initAuth();

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event: AuthChangeEvent, session: Session | null) => {
      setSession(session);
      setUser(session?.user ?? null);

      if (event === 'SIGNED_IN' && session?.user) {
        // Fetch user profile on sign in
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();

        setProfile(profile as UserProfile | null);
      } else if (event === 'SIGNED_OUT') {
        clear();
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [supabase, setUser, setSession, setProfile, setIsLoading, setIsInitialized, clear]);

  return (
    <AuthContext.Provider value={supabase}>{children}</AuthContext.Provider>
  );
}
