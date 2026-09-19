import { microseasons } from '@/data/microseasons';
import { algaeTint, buildCalendarTwin, seasonOf } from '../build-calendar';
import { spanDays } from '../lint';

describe('buildCalendarTwin', () => {
  const spec = buildCalendarTwin(microseasons, { today: new Date(2026, 4, 21) });

  it('maps all 72 microseasons once, in reading order', () => {
    expect(spec.panels).toHaveLength(72);
    expect(new Set(spec.panels.map((p) => p.microseasonId)).size).toBe(72);
    expect(spec.panels[0].tag).toBe('R-101');
    expect(spec.panels[71].tag).toBe('R-172');
    expect(spec.panels[6]).toMatchObject({ row: 1, col: 0, ports: { in: 'right', out: 'left' } });
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
