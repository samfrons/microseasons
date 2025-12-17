/**
 * Theme Hook
 * Applies the organic nature theme directly without switching
 */

import { useEffect } from 'react';
import { useCalendarStore } from '@/store/useCalendarStore';
import { themeConfig } from '@/themes';
import type { Theme } from '@/types/theme';

export function useTheme() {
  const { darkMode } = useCalendarStore();

  // Always use organic theme
  const currentTheme: Theme = themeConfig.themes.organic;

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
  }, [currentTheme, colors]);

  return {
    currentTheme,
    colors,
  };
}
