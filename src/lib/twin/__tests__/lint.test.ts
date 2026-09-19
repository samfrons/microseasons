import { microseasons } from '@/data/microseasons';
import { buildCalendarTwin, panelForDate } from '../build-calendar';
import { formatLint, lintCalendarTwin, lintPid } from '../lint';
import { CALENDAR_TWIN, PID_SHEETS, arrayPid } from '../sheets';
import type { PidSpec } from '../spec';

describe('registered sheets lint clean', () => {
  it('calendar wall: zero errors, zero warnings', () => {
    const r = lintCalendarTwin(CALENDAR_TWIN);
    expect(formatLint(r)).toBe('clean');
  });

  it.each(Object.keys(PID_SHEETS))('%s: zero errors, zero warnings', (id) => {
    const r = lintPid(PID_SHEETS[id]);
    expect(formatLint(r)).toBe('clean');
  });
});

describe('lintPid catches the classic mistakes', () => {
  const clone = (): PidSpec => JSON.parse(JSON.stringify(arrayPid));

  it('a valve with a vessel tag', () => {
    const s = clone();
    s.equipment.find((e) => e.id === 'xv101')!.tag = 'V-105';
    expect(lintPid(s).errors.map((e) => e.code)).toContain('valve-tag');
  });

  it('two instruments on one loop', () => {
    const s = clone();
    s.instruments.push({ tag: 'PT-101', x: 40, y: 40, leaderTo: [40, 60] });
    expect(lintPid(s).errors.map((e) => e.code)).toContain('loop-shared');
  });

  it('a letter outside ISA-5.1', () => {
    const s = clone();
    s.instruments.push({ tag: 'ZT-901', x: 40, y: 40, leaderTo: [40, 60] });
    expect(lintPid(s).errors.map((e) => e.code)).toContain('bad-instrument-tag');
  });

  it('a state lighting a stream no line carries', () => {
    const s = clone();
    s.states[0].streams.push('steam');
    expect(lintPid(s).errors.map((e) => e.code)).toContain('state-unknown-stream');
  });

  it('an actuated valve with no fail position', () => {
    const s = clone();
    delete s.equipment.find((e) => e.id === 'xv101')!.fail;
    expect(lintPid(s).errors.map((e) => e.code)).toContain('valve-no-fail');
  });

  it('crowded bubbles warn', () => {
    const s = clone();
    s.instruments.push({ tag: 'PT-901', x: 282, y: 112, leaderTo: [282, 170] });
    expect(lintPid(s).warnings.map((w) => w.code)).toContain('crowded');
  });
});

describe('lintCalendarTwin catches wall mistakes', () => {
  it('a duplicated microseason', () => {
    const s = buildCalendarTwin(microseasons);
    s.panels[1].microseasonId = s.panels[0].microseasonId;
    expect(lintCalendarTwin(s).errors.map((e) => e.code)).toContain('dup-microseason');
  });

  it('a broken serpentine', () => {
    const s = buildCalendarTwin(microseasons);
    s.panels[7].ports = { in: 'left', out: 'right' };
    expect(lintCalendarTwin(s).errors.map((e) => e.code)).toContain('serpentine');
  });

  it('a wrong LED count', () => {
    const s = buildCalendarTwin(microseasons);
    s.panels[3].days = 9;
    expect(lintCalendarTwin(s).errors.map((e) => e.code)).toContain('day-count');
  });
});

describe('panelForDate', () => {
  const { panels } = CALENDAR_TWIN;
  it('Feb 4 is Risshun, panel 1, day 0', () => {
    const hit = panelForDate(panels, new Date(2026, 1, 4))!;
    expect(hit.panel.n).toBe(1);
    expect(hit.dayIndex).toBe(0);
  });
  it('Jan 1 lands in the year-wrapping winter and is not lost', () => {
    const hit = panelForDate(panels, new Date(2026, 0, 1));
    expect(hit).not.toBeNull();
    expect(hit!.panel.season).toBe('winter');
  });
  it('every day of a leap year lands on exactly one panel', () => {
    for (let d = 0; d < 366; d++) {
      const date = new Date(2024, 0, 1 + d);
      expect(panelForDate(panels, date)).not.toBeNull();
    }
  });
});
