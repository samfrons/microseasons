/**
 * Theme System Types
 * Defines the structure for the microseasons theme system
 */

export type ThemeId =
  | 'brutalist'
  | 'organic'
  | 'cyberpunk'
  | 'japanese'
  | 'artdeco'
  | 'glassmorphic';

export interface ThemeColors {
  // Primary backgrounds
  bgPrimary: string;
  bgSecondary: string;
  bgTertiary: string;

  // Text colors
  textPrimary: string;
  textSecondary: string;
  textAccent: string;

  // Accent colors
  accent: string;
  accentHover: string;
  accentActive: string;

  // Border colors
  border: string;
  borderSubtle: string;
  borderAccent: string;

  // Special effects
  glow: string;
  shadow: string;
  overlay: string;

  // Calendar-specific
  calendarPrimary: string;
  calendarSecondary: string;
  calendarAccent: string;
}

export interface ThemeTypography {
  fontFamily: {
    sans: string;
    serif: string;
    mono: string;
    display?: string;
  };
  fontWeights: {
    light: number;
    normal: number;
    medium: number;
    semibold: number;
    bold: number;
  };
}

export interface ThemeEffects {
  blur: {
    sm: string;
    md: string;
    lg: string;
  };
  shadows: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
  borderRadius: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
  transitions: {
    fast: string;
    normal: string;
    slow: string;
  };
}

export interface ThemeMaterials {
  wood: {
    color: string;
    roughness: number;
    metalness: number;
  };
  paper: {
    color: string;
    roughness: number;
    metalness: number;
  };
  metal: {
    color: string;
    roughness: number;
    metalness: number;
  };
  ceramic: {
    color: string;
    roughness: number;
    metalness: number;
  };
}

export interface Theme {
  id: ThemeId;
  name: string;
  description: string;
  colors: {
    light: ThemeColors;
    dark: ThemeColors;
  };
  typography: ThemeTypography;
  effects: ThemeEffects;
  materials: ThemeMaterials;
  customCSS?: string;
}

export interface ThemeConfig {
  themes: Record<ThemeId, Theme>;
  defaultTheme: ThemeId;
}
