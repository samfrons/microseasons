/**
 * Server / script entry: render a sheet to a standalone SVG string (docs,
 * a PNG step, a laser-engraving file). Imports react-dom/server — keep it
 * out of client components.
 */
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { BLUEPRINT } from '@/lib/twin/blueprint';
import type { CalendarTwinSpec, PidSpec } from '@/lib/twin/spec';
import { CalendarTwinDiagram } from './CalendarTwinDiagram';
import { PidDiagram } from './PidDiagram';

function withPlate(body: string, w: number, h: number): string {
  return body.replace(
    /^<svg([^>]*)>/,
    `<svg$1 xmlns="http://www.w3.org/2000/svg"><rect width="${w}" height="${h}" fill="${BLUEPRINT.plateBottom}"/>`
  );
}

export function renderPidToSvg(spec: PidSpec, state?: string): string {
  return withPlate(renderToStaticMarkup(createElement(PidDiagram, { spec, state })), spec.sheet.width, spec.sheet.height);
}

export function renderCalendarToSvg(spec: CalendarTwinSpec, state?: string): string {
  return withPlate(renderToStaticMarkup(createElement(CalendarTwinDiagram, { spec, state })), spec.sheet.width, spec.sheet.height);
}
