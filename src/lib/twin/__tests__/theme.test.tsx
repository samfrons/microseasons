/**
 * Theme contract: `usePalette()` resolves to blueprint with no provider (so
 * every pre-theme call site keeps its colours), to the named palette under
 * one, and both palettes expose the SAME key set — a symbol that reads
 * `p.timber` must not find `undefined` in classic.
 */
import { TextEncoder, TextDecoder } from 'util';
Object.assign(globalThis, { TextEncoder, TextDecoder });

/* eslint-disable @typescript-eslint/no-var-requires */
const React = require('react');
const { renderToStaticMarkup } = require('react-dom/server');
const { PALETTES, BLUEPRINT, CLASSIC } = require('@/lib/twin/blueprint');
const { TwinThemeProvider, usePalette, useTwinTheme, defId } = require('@/components/DigitalTwin/theme');

function Probe() {
  const p = usePalette();
  const theme = useTwinTheme();
  return React.createElement('i', null, `${theme}|${p.ink}|${p.live}|${p.timber}`);
}

describe('twin theme context', () => {
  it('defaults to blueprint with no provider', () => {
    const out = renderToStaticMarkup(React.createElement(Probe));
    expect(out).toContain(`blueprint|${BLUEPRINT.ink}|${BLUEPRINT.live}|${BLUEPRINT.timber}`);
  });

  it('serves the classic palette under a provider', () => {
    const out = renderToStaticMarkup(
      React.createElement(TwinThemeProvider, { theme: 'classic', children: React.createElement(Probe) })
    );
    expect(out).toContain(`classic|${CLASSIC.ink}|${CLASSIC.live}|${CLASSIC.timber}`);
  });

  it('falls back to blueprint for an unknown theme id', () => {
    const out = renderToStaticMarkup(
      React.createElement(TwinThemeProvider, { theme: 'nope', children: React.createElement(Probe) })
    );
    expect(out).toContain(BLUEPRINT.ink);
  });

  it('exposes identical key sets in both palettes, all non-empty strings', () => {
    const a = Object.keys(PALETTES.blueprint).sort();
    const b = Object.keys(PALETTES.classic).sort();
    expect(b).toEqual(a);
    for (const k of a) {
      const v = (PALETTES.classic as Record<string, unknown>)[k];
      expect(typeof v === 'string' ? v.length > 0 : typeof v === 'number').toBe(true);
    }
  });

  it('classic is white paper, no grid, a strong blue live accent — never red or cyan', () => {
    expect(PALETTES.classic.plateTop).toBe('#FFFFFF');
    expect(PALETTES.classic.grid).toBe('transparent');
    expect(PALETTES.classic.live).toBe('#1D4ED8');
  });

  it('namespaces def ids per theme', () => {
    expect(defId('classic', 'tw-arrow')).toBe('tw-arrow-classic');
    expect(defId('blueprint', 'tw-hatch')).toBe('tw-hatch-blueprint');
  });
});
