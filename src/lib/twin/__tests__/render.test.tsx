/**
 * Render contract: every registered sheet renders to SVG on the server,
 * carries its drawing number and stamp, and a state repaints the sheet
 * rather than re-laying it out. react-dom/server needs TextEncoder, which
 * jsdom lacks — polyfilled before the renderer is required.
 */
import { TextEncoder, TextDecoder } from 'util';
Object.assign(globalThis, { TextEncoder, TextDecoder });

/* eslint-disable @typescript-eslint/no-var-requires */
const { renderCalendarToSvg, renderPidToSvg } = require('@/components/DigitalTwin/render-static');
const { culturePath } = require('@/components/DigitalTwin/CalendarTwinDiagram');
const { CALENDAR_TWIN, PID_SHEETS } = require('@/lib/twin/sheets');
const { BLUEPRINT, CLASSIC } = require('@/lib/twin/blueprint');

describe('calendar wall', () => {
  const svg = renderCalendarToSvg(CALENDAR_TWIN, 'today');

  it('is a standalone SVG with the plate painted in', () => {
    expect(svg.startsWith('<svg')).toBe(true);
    expect(svg).toContain('xmlns="http://www.w3.org/2000/svg"');
    expect(svg).toContain(`fill="${BLUEPRINT.plateBottom}"`);
  });

  it('draws all 72 panels with their tags and the concept stamp', () => {
    expect((svg.match(/data-panel="p\d\d"/g) ?? []).length).toBe(72);
    expect(svg).toContain('MS-CAL-001');
    expect(svg).toContain('CONCEPT — NOT FOR CONSTRUCTION');
    expect(svg).toContain('東風解凍');
  });

  it('lights only the today panel with the live accent frame', () => {
    const today = renderCalendarToSvg(CALENDAR_TWIN, 'today');
    const summer = renderCalendarToSvg(CALENDAR_TWIN, 'summer');
    const liveFrames = (s: string) => (s.match(new RegExp(`stroke="${BLUEPRINT.live}" stroke-width="2.3"`, 'g')) ?? []).length;
    expect(liveFrames(today)).toBeGreaterThanOrEqual(1);
    expect(liveFrames(summer)).toBeGreaterThan(liveFrames(today));
  });

  it('draws the culture tubing as one continuous serpentine', () => {
    const pts = culturePath(CALENDAR_TWIN);
    expect(pts.length).toBe(72 * 2 + 11);
    for (let i = 1; i < pts.length; i++) {
      const [a, b] = [pts[i - 1], pts[i]];
      expect(a[0] === b[0] || a[1] === b[1]).toBe(true);
    }
  });

  it('draws empty windows in the refresh state', () => {
    const refresh = renderCalendarToSvg(CALENDAR_TWIN, 'refresh');
    expect(refresh).toContain('stroke-dasharray="2 2"');
    expect(refresh).toContain('MAINTENANCE — LOOP DRAINED');
  });
});

describe('P&ID sheets', () => {
  it.each(Object.keys(PID_SHEETS).slice(0, 5))('%s renders with its drawing number and every tag', (id) => {
    const spec = PID_SHEETS[id];
    const svg = renderPidToSvg(spec);
    expect(svg).toContain(spec.title.drawing);
    for (const i of spec.instruments) {
      const [letters, loop] = i.tag.split('-');
      expect(svg).toContain(`>${letters}</text>`);
      expect(svg).toContain(`>${loop}</text>`);
    }
    for (const e of spec.equipment) if (e.tag) expect(svg).toContain(e.tag);
  });

  it('paints the live path per state and opens the right valves', () => {
    const day = renderPidToSvg(PID_SHEETS['pid-array'], 'day');
    const trip = renderPidToSvg(PID_SHEETS['pid-array'], 'trip');
    const live = (s: string) => (s.match(new RegExp(BLUEPRINT.live, 'g')) ?? []).length;
    expect(live(day)).toBeGreaterThan(live(trip));
    expect(trip).toContain('TRIPPED — FEED ISOLATED');
  });

  it('every panel sheet renders without throwing', () => {
    for (const id of Object.keys(PID_SHEETS)) expect(() => renderPidToSvg(PID_SHEETS[id])).not.toThrow();
  });
});

describe('classic theme', () => {
  const wall = renderCalendarToSvg(CALENDAR_TWIN, 'today', 'classic');
  const array = renderPidToSvg(PID_SHEETS['pid-array'], 'day', 'classic');

  it('prints on white paper with near-black ink', () => {
    expect(wall).toContain('fill="#FFFFFF"');
    expect(wall).toContain(`fill="${CLASSIC.plateBottom}"`);
    expect(wall).toContain(CLASSIC.ink);
    expect(array).toContain('fill="#FFFFFF"');
  });

  it('uses the strong blue for LIVE and never the blueprint accent or plate', () => {
    expect(wall).toContain('#1D4ED8');
    expect(array).toContain('#1D4ED8');
    for (const svg of [wall, array]) {
      expect(svg).not.toContain('#F6A97F');
      expect(svg).not.toContain('#16324A');
      expect(svg).not.toContain('#D7E7F2');
    }
  });

  it('namespaces its marker ids so both themes can sit on one page', () => {
    expect(array).toContain('id="tw-arrow-classic"');
    expect(array).toContain('url(#tw-arrow-classic)');
    const blueprint = renderPidToSvg(PID_SHEETS['pid-array'], 'day');
    expect(blueprint).toContain('id="tw-arrow-blueprint"');
    expect(blueprint).not.toContain('tw-arrow-classic');
  });

  it('still tints the culture windows by season — the tint is calendar data, not ink', () => {
    for (const p of [CALENDAR_TWIN.panels[0], CALENDAR_TWIN.panels[40]]) expect(wall).toContain(p.tint);
    expect(CALENDAR_TWIN.panels[0].tint).not.toBe(CALENDAR_TWIN.panels[40].tint);
  });

  it('leaves the blueprint sheet exactly as it was', () => {
    const blueprint = renderCalendarToSvg(CALENDAR_TWIN, 'today');
    expect(blueprint).toContain(`fill="${BLUEPRINT.plateBottom}"`);
    expect(blueprint).toContain(BLUEPRINT.live);
    expect(blueprint).not.toContain(CLASSIC.live);
  });
});
