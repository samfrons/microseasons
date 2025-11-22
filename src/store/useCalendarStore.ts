import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Region } from '@/data/regionalData';
import { Vibe } from '@/data/vibes';
import { Microseason } from '@/data/microseasons';

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

  // Personalization
  selectedRegion: Region | null;
  selectedVibe: Vibe | null;
  customMicroseasons: Microseason[] | null;
  useCustomMicroseasons: boolean;

  // Actions
  setMaterial: (material: MaterialType) => void;
  setColorPalette: (palette: ColorPalette) => void;
  setDisplayMode: (mode: DisplayMode) => void;
  toggleDarkMode: () => void;
  setLocation: (location: string, lat: number, lon: number) => void;
  setAutoRotate: (enabled: boolean) => void;
  setRotationSpeed: (speed: number) => void;
  setSelectedRegion: (region: Region | null) => void;
  setSelectedVibe: (vibe: Vibe | null) => void;
  setCustomMicroseasons: (microseasons: Microseason[] | null) => void;
  setUseCustomMicroseasons: (use: boolean) => void;
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
  selectedRegion: null,
  selectedVibe: null,
  customMicroseasons: null,
  useCustomMicroseasons: false,

  // Actions
  setMaterial: (material) => set({ material }),
  setColorPalette: (colorPalette) => set({ colorPalette }),
  setDisplayMode: (displayMode) => set({ displayMode }),
  toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
  setLocation: (location, latitude, longitude) =>
    set({ location, latitude, longitude }),
  setAutoRotate: (autoRotate) => set({ autoRotate }),
  setRotationSpeed: (rotationSpeed) => set({ rotationSpeed }),
  setSelectedRegion: (selectedRegion) => set({ selectedRegion }),
  setSelectedVibe: (selectedVibe) => set({ selectedVibe }),
  setCustomMicroseasons: (customMicroseasons) => set({ customMicroseasons }),
  setUseCustomMicroseasons: (useCustomMicroseasons) => set({ useCustomMicroseasons }),
}));
