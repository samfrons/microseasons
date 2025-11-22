import { create } from 'zustand';

export type MaterialType = 'wood' | 'paper' | 'metal' | 'ceramic';
export type ColorPalette = 'natural' | 'sakura' | 'sumi' | 'seasonal';
export type DisplayMode = 'microseason-primary' | 'western-primary' | 'balanced' | 'minimal';

export interface CalendarState {
  // Visual customization
  material: MaterialType;
  colorPalette: ColorPalette;
  displayMode: DisplayMode;
  darkMode: boolean;

  // Location (for future location-specific features)
  location: string;
  latitude: number;
  longitude: number;

  // 3D interaction
  autoRotate: boolean;
  rotationSpeed: number;

  // Actions
  setMaterial: (material: MaterialType) => void;
  setColorPalette: (palette: ColorPalette) => void;
  setDisplayMode: (mode: DisplayMode) => void;
  toggleDarkMode: () => void;
  setLocation: (location: string, lat: number, lon: number) => void;
  setAutoRotate: (enabled: boolean) => void;
  setRotationSpeed: (speed: number) => void;
}

export const useCalendarStore = create<CalendarState>((set) => ({
  // Initial state
  material: 'wood',
  colorPalette: 'natural',
  displayMode: 'balanced',
  darkMode: false,
  location: 'Tokyo, Japan',
  latitude: 35.6762,
  longitude: 139.6503,
  autoRotate: true,
  rotationSpeed: 0.5,

  // Actions
  setMaterial: (material) => set({ material }),
  setColorPalette: (colorPalette) => set({ colorPalette }),
  setDisplayMode: (displayMode) => set({ displayMode }),
  toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
  setLocation: (location, latitude, longitude) =>
    set({ location, latitude, longitude }),
  setAutoRotate: (autoRotate) => set({ autoRotate }),
  setRotationSpeed: (rotationSpeed) => set({ rotationSpeed }),
}));
