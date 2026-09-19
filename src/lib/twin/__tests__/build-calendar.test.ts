import { microseasons } from '@/data/microseasons';
import { algaeTint, buildCalendarTwin, envelopeOf, seasonOf } from '../build-calendar';
import { spanDays } from '../lint';
import { findParameter } from '../spec';

describe('buildCalendarTwin', () => {
  const spec = buildCalendarTwin(microseasons, { today: new Date(2026, 4, 21) });

  it('maps all 72 microseasons once, in reading order', () => {
    expect(spec.panels).toHaveLength(72);
    expect(new Set(spec.panels.map((p) => p.microseasonId)).size).toBe(72);
    expect(spec.panels[0].tag).toBe('R-101');
    expect(spec.panels[71].tag).toBe('R-172');
    /* 6 columns now, so panel #7 opens row 1 of face A */
    expect(spec.panels[6]).toMatchObject({ face: 'A', row: 1, col: 0, ports: { in: 'right', out: 'left' } });
  });

  it('is a freestanding monolith of two faces, 36 panels each', () => {
    expect(spec.form).toBe('freestanding');
    expect(spec.faces.map((f) => f.id)).toEqual(['A', 'B']);
    expect(spec.grid).toEqual({ cols: 6, rows: 6 });
    for (const f of spec.faces) expect(spec.panels.filter((p) => p.face === f.id)).toHaveLength(36);
    expect(spec.faces[0]).toMatchObject({ from: 1, to: 36, seasons: ['spring', 'summer'] });
    expect(spec.faces[1]).toMatchObject({ from: 37, to: 72, seasons: ['autumn', 'winter'] });
  });

  it('splits the year by face: spring + summer on A, autumn + winter on B', () => {
    for (const p of spec.panels) {
      const want = p.season === 'spring' || p.season === 'summer' ? 'A' : 'B';
      expect(p.face).toBe(want);
    }
    /* reading order continues across the crossover: #36 → #37 */
    expect(spec.panels[35]).toMatchObject({ face: 'A', row: 5, col: 5 });
    expect(spec.panels[36]).toMatchObject({ face: 'B', row: 0, col: 0 });
  });

  it('hands the culture over at the base on the same side', () => {
    expect(spec.panels[35].ports.out).toBe(spec.panels[36].ports.in);
    expect(spec.hydraulics.crossover.at).toBe('base');
  });

  it('computes the envelope from the panel, the gaps, the frame and the plinth', () => {
    const { cols, rows } = spec.grid;
    const { mm } = spec.panel;
    expect(spec.panel.mm).toEqual({ w: 180, h: 110, d: 95 });
    expect(mm.w).toBeGreaterThan(mm.h); // landscape
    expect(spec.envelope.wMm).toBe(cols * mm.w + (cols - 1) * spec.frame.gapMm + 2 * spec.frame.sectionMm);
    expect(spec.envelope.hMm).toBe(rows * mm.h + (rows - 1) * spec.frame.gapMm + 2 * spec.frame.sectionMm + spec.plinth.hMm);
    expect(spec.envelope.dMm).toBeGreaterThanOrEqual(2 * mm.d);
    expect(spec.envelope).toEqual(envelopeOf());
  });

  it('carries a parameters layer where every row states its basis', () => {
    const rows = spec.parameters.flatMap((s) => s.rows);
    expect(spec.parameters.map((s) => s.id)).toEqual([
      'geometry', 'hydraulics', 'biology', 'electrochemistry', 'lighting', 'controls', 'environment', 'safety', 'venue',
    ]);
    expect(rows.length).toBeGreaterThan(60);
    for (const r of rows) expect(['design', 'literature', 'vendor', 'assumed', 'measured']).toContain(r.v.basis);
    /* nothing is built, so nothing is measured, and every assumption is noted */
    expect(rows.filter((r) => r.v.basis === 'measured')).toHaveLength(0);
    for (const r of rows.filter((r) => r.v.basis === 'assumed')) expect(r.v.note).toBeTruthy();
  });

  it('keeps the geometry parameters equal to the drawing', () => {
    const v = (id: string) => findParameter(spec.parameters, id)!.v.value;
    expect(v('geom.envelope-w')).toBe(String(spec.envelope.wMm));
    expect(v('geom.plinth-h')).toBe(String(spec.plinth.hMm));
    expect(v('hyd.culture-total')).toBe('28.8'); // 0.4 L × 72
    expect(v('light.backlight-total')).toBe('36'); // 0.5 W × 72
  });

  it('gives every season 18 panels', () => {
    for (const s of ['spring', 'summer', 'autumn', 'winter'] as const) {
      expect(spec.panels.filter((p) => p.season === s)).toHaveLength(18);
    }
    expect(seasonOf(microseasons[0])).toBe('spring');
    expect(seasonOf(microseasons[71])).toBe('winter');
  });

  it('counts one LED per day of the kō', () => {
    const p = spec.panels[0];
    expect(p.days).toBe(spanDays(p.start, p.end));
    expect(p.days).toBe(5);
    expect(spec.panels.every((p) => p.days >= 4 && p.days <= 7)).toBe(true);
  });

  it('lights the panel for the given date in the TODAY state', () => {
    const today = spec.states.find((s) => s.id === 'today')!;
    const lit = spec.panels.find((p) => p.id === today.litPanels[0])!;
    expect(lit.start).toEqual({ month: 5, day: 21 });
    expect(today.litDay).toBe(0);
  });

  it('tints blend through the year and stay hex', () => {
    const tints = spec.panels.map((p) => p.tint);
    expect(tints.every((t) => /^#[0-9a-f]{6}$/.test(t))).toBe(true);
    expect(new Set(tints).size).toBeGreaterThan(30);
    expect(algaeTint(27)).not.toBe(algaeTint(9));
  });
});
