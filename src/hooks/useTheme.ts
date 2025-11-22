/**
 * Theme Hook
 * Provides theme switching functionality with persistence
 */

import { useEffect } from 'react';
import { useCalendarStore } from '@/store/useCalendarStore';
import { themeConfig } from '@/themes';
import type { ThemeId, Theme } from '@/types/theme';

const THEME_STORAGE_KEY = 'microseasons-theme';

export function useTheme() {
  const { darkMode, selectedTheme, setSelectedTheme } = useCalendarStore();

  // Get current theme object
  const currentTheme: Theme = themeConfig.themes[selectedTheme || themeConfig.defaultTheme];

  // Get theme colors based on dark mode
  const colors = darkMode ? currentTheme.colors.dark : currentTheme.colors.light;

  // Apply theme to document
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const root = document.documentElement;

    // Apply CSS custom properties
    Object.entries(colors).forEach(([key, value]) => {
      root.style.setProperty(`--color-${key}`, value);
    });

    // Apply typography
    if (currentTheme.typography.fontFamily.display) {
      root.style.setProperty('--font-display', currentTheme.typography.fontFamily.display);
    }

    // Apply theme class for CSS-based styling
    root.setAttribute('data-theme', currentTheme.id);

    // Persist theme selection
    localStorage.setItem(THEME_STORAGE_KEY, currentTheme.id);
  }, [currentTheme, colors]);

  // Load persisted theme on mount
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY) as ThemeId | null;
    if (savedTheme && themeConfig.themes[savedTheme] && savedTheme !== selectedTheme) {
      setSelectedTheme(savedTheme);
    }
  }, []);

  const switchTheme = (themeId: ThemeId) => {
    setSelectedTheme(themeId);
  };

  return {
    currentTheme,
    colors,
    switchTheme,
    availableThemes: Object.values(themeConfig.themes),
    selectedTheme: currentTheme.id,
  };
}
