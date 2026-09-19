/**
 * Server / script entry: render a sheet to a standalone SVG string (docs,
 * a PNG step, a laser-engraving file). Imports react-dom/server — keep it
 * out of client components.
 *
 * The `theme` argument picks the palette AND paints the matching paper as
 * the background rect, so the file is self-contained: a classic sheet is
 * black ink on a white rect, a blueprint sheet paper-white ink on navy.
 */
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { PALETTES, type TwinTheme } from '@/lib/twin/blueprint';
import type { CalendarTwinSpec, PidSpec } from '@/lib/twin/spec';
import { CalendarTwinDiagram } from './CalendarTwinDiagram';
import { PidDiagram } from './PidDiagram';
import { TwinThemeProvider } from './theme';

function withPlate(body: string, w: number, h: number, theme: TwinTheme): string {
  const paper = (PALETTES[theme] ?? PALETTES.blueprint).plateBottom;
  return body.replace(
    /^<svg([^>]*)>/,
    `<svg$1 xmlns="http://www.w3.org/2000/svg"><rect width="${w}" height="${h}" fill="${paper}"/>`
  );
}

export function renderPidToSvg(spec: PidSpec, state?: string, theme: TwinTheme = 'blueprint'): string {
  const body = renderToStaticMarkup(
    createElement(TwinThemeProvider, { theme, children: createElement(PidDiagram, { spec, state }) })
  );
  return withPlate(body, spec.sheet.width, spec.sheet.height, theme);
}

export function renderCalendarToSvg(spec: CalendarTwinSpec, state?: string, theme: TwinTheme = 'blueprint'): string {
  const body = renderToStaticMarkup(
    createElement(TwinThemeProvider, { theme, children: createElement(CalendarTwinDiagram, { spec, state }) })
  );
  return withPlate(body, spec.sheet.width, spec.sheet.height, theme);
}
