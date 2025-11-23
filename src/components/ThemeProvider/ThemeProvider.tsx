'use client';

import { useEffect } from 'react';
import { useTheme } from '@/hooks/useTheme';

/**
 * Theme Provider Component
 * Initializes and manages theme system
 */
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { currentTheme } = useTheme();

  useEffect(() => {
    // Theme application is handled by the useTheme hook
    // This component ensures the hook is called at the app level
  }, [currentTheme]);

  return <>{children}</>;
}
