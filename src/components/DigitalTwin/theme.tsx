/**
 * Theme plumbing for the sheets. A symbol never imports a palette directly —
 * it calls `usePalette()`, which resolves through this context. That's why
 * adding a theme is a two-palette change, not a prop threaded through thirty
 * symbol components.
 *
 * The default (no provider) is the blueprint palette, so a bare
 * `<PidDiagram>` or `<CalendarTwinDiagram>` renders exactly as it did before.
 * Nothing here is client-only, so `react-dom/server` renders it fine.
 */
import { createContext, useContext, type ReactNode } from 'react';
import { PALETTES, type Palette, type TwinTheme } from '@/lib/twin/blueprint';

export interface TwinThemeValue {
  theme: TwinTheme;
  palette: Palette;
}

const DEFAULT_THEME: TwinThemeValue = { theme: 'blueprint', palette: PALETTES.blueprint };

const TwinThemeContext = createContext<TwinThemeValue>(DEFAULT_THEME);

export function TwinThemeProvider({
  theme = 'blueprint',
  children,
}: {
  theme?: TwinTheme;
  children: ReactNode;
}) {
  const value: TwinThemeValue = { theme, palette: PALETTES[theme] ?? PALETTES.blueprint };
  return <TwinThemeContext.Provider value={value}>{children}</TwinThemeContext.Provider>;
}

/** The active palette. Defaults to blueprint when no provider is mounted. */
export function usePalette(): Palette {
  return useContext(TwinThemeContext).palette;
}

/** The active theme id — used to namespace SVG marker / pattern ids per theme. */
export function useTwinTheme(): TwinTheme {
  return useContext(TwinThemeContext).theme;
}

/**
 * Marker and pattern ids are namespaced per theme so two sheets in different
 * themes on one page don't fight over `#tw-arrow`.
 */
export function defId(theme: TwinTheme, name: string): string {
  return `${name}-${theme}`;
}
