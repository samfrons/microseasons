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
import { neomemphisTheme } from './neomemphis';
import { swissTheme } from './swiss';
import { darkacademiaTheme } from './darkacademia';
import { maximalistTheme } from './maximalist';
import { vaporwaveTheme } from './vaporwave';
import { retrofuturismTheme } from './retrofuturism';

export const themeConfig: ThemeConfig = {
  themes: {
    brutalist: brutalistTheme,
    organic: organicTheme,
    cyberpunk: cyberpunkTheme,
    japanese: japaneseTheme,
    artdeco: artdecoTheme,
    glassmorphic: glassmorphicTheme,
    neomemphis: neomemphisTheme,
    swiss: swissTheme,
    darkacademia: darkacademiaTheme,
    maximalist: maximalistTheme,
    vaporwave: vaporwaveTheme,
    retrofuturism: retrofuturismTheme,
  },
  defaultTheme: 'japanese', // Keep Japanese as default to maintain current aesthetic
};

export * from './brutalist';
export * from './organic';
export * from './cyberpunk';
export * from './japanese';
export * from './artdeco';
export * from './glassmorphic';
export * from './neomemphis';
export * from './swiss';
export * from './darkacademia';
export * from './maximalist';
export * from './vaporwave';
export * from './retrofuturism';
