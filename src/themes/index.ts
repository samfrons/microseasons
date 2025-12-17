/**
 * Theme Registry
 * Central export for all available themes
 */

import { ThemeConfig } from '@/types/theme';
import { brutalistTheme } from './brutalist';
import { organicTheme } from './organic';
import { cyberpunkTheme } from './cyberpunk';
import { japaneseTheme } from './japanese';
import { artdecoTheme } from './artdeco';
import { glassmorphicTheme } from './glassmorphic';

export const themeConfig: ThemeConfig = {
  themes: {
    brutalist: brutalistTheme,
    organic: organicTheme,
    cyberpunk: cyberpunkTheme,
    japanese: japaneseTheme,
    artdeco: artdecoTheme,
    glassmorphic: glassmorphicTheme,
  },
  defaultTheme: 'organic', // Organic nature theme as default
};

export * from './brutalist';
export * from './organic';
export * from './cyberpunk';
export * from './japanese';
export * from './artdeco';
export * from './glassmorphic';
