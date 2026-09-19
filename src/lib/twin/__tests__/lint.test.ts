import { microseasons } from '@/data/microseasons';
import { buildCalendarTwin, panelForDate } from '../build-calendar';
import { formatLint, lintCalendarTwin, lintPid, lintVenuePlan } from '../lint';
import { CALENDAR_TWIN, PID_SHEETS, VENUE_PLAN, arrayPid, buildVenuePlan } from '../sheets';
import type { CalendarTwinSpec, PidSpec, VenuePlanSpec } from '../spec';

describe('registered sheets lint clean', () => {
  it('calendar elevations: zero errors, zero warnings', () => {
    const r = lintCalendarTwin(CALENDAR_TWIN);
    expect(formatLint(r)).toBe('clean');
  });

  it('venue plan MS-CAL-004: zero errors, zero warnings', () => {
    const r = lintVenuePlan(VENUE_PLAN);
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

describe('lintCalendarTwin catches form mistakes', () => {
  const build = (): CalendarTwinSpec => buildCalendarTwin(microseasons);

  it('a face that is not 36 panels', () => {
    const s = build();
    s.faces[0].to = 30;
    const codes = lintCalendarTwin(s).errors.map((e) => e.code);
    expect(codes).toContain('face-span');
  });

  it('a panel on the face that does not carry its season', () => {
    const s = build();
    s.panels[0].season = 'winter';
    expect(lintCalendarTwin(s).errors.map((e) => e.code)).toContain('face-season');
  });

  it('a broken crossover — the culture would have to jump sides', () => {
    const s = build();
    s.panels[36].ports = { in: 'right', out: 'left' };
    const codes = lintCalendarTwin(s).errors.map((e) => e.code);
    expect(codes).toContain('crossover');
  });

  it('two faces drawn on top of each other', () => {
    const s = build();
    s.faces[1].origin = [...s.faces[0].origin] as [number, number];
    expect(lintCalendarTwin(s).errors.map((e) => e.code)).toContain('faces-overlap');
  });

  it('a face hanging off the sheet', () => {
    const s = build();
    s.faces[1].origin = [46, 3000];
    expect(lintCalendarTwin(s).errors.map((e) => e.code)).toContain('face-overruns-sheet');
  });

  it('an envelope that does not follow from the panel size', () => {
    const s = build();
    s.envelope.wMm = 999;
    expect(lintCalendarTwin(s).errors.map((e) => e.code)).toContain('envelope-w');
  });

  it('an envelope too shallow for two faces back to back', () => {
    const s = build();
    s.envelope.dMm = 100;
    expect(lintCalendarTwin(s).errors.map((e) => e.code)).toContain('envelope-d');
  });

  it('a wall-hung form', () => {
    const s = build();
    (s as { form: string }).form = 'wall';
    expect(lintCalendarTwin(s).errors.map((e) => e.code)).toContain('form');
  });
});

describe('lintCalendarTwin polices the parameters layer', () => {
  const build = (): CalendarTwinSpec => buildCalendarTwin(microseasons);

  it('a parameter with no basis', () => {
    const s = build();
    delete (s.parameters[0].rows[1].v as { basis?: string }).basis;
    expect(lintCalendarTwin(s).errors.map((e) => e.code)).toContain('no-basis');
  });

  it('a basis outside the five', () => {
    const s = build();
    (s.parameters[0].rows[1].v as { basis: string }).basis = 'vibes';
    expect(lintCalendarTwin(s).errors.map((e) => e.code)).toContain('bad-basis');
  });

  it('a number that claims to have been measured', () => {
    const s = build();
    (s.parameters[0].rows[1].v as { basis: string }).basis = 'measured';
    expect(lintCalendarTwin(s).warnings.map((w) => w.code)).toContain('measured-claim');
  });

  it('an assumption with nothing behind it', () => {
    const s = build();
    s.parameters[0].rows.push({ id: 'geom.guess', label: 'Guess', v: { value: '3', basis: 'assumed' } });
    expect(lintCalendarTwin(s).warnings.map((w) => w.code)).toContain('assumed-no-note');
  });

  it('a geometry parameter that drifts from the drawing', () => {
    const s = build();
    s.parameters[0].rows.find((r) => r.id === 'geom.envelope-w')!.v.value = '1234';
    expect(lintCalendarTwin(s).errors.map((e) => e.code)).toContain('parameter-disagrees');
  });

  it('a total that is not the per-panel figure times 72', () => {
    const s = build();
    s.parameters[1].rows.find((r) => r.id === 'hyd.culture-total')!.v.value = '20';
    const bad = lintCalendarTwin(s).errors.find((e) => e.code === 'parameter-total')!;
    expect(bad.message).toContain('28.8');
  });

  it('a missing parameter the sheet promises', () => {
    const s = build();
    s.parameters[0].rows = s.parameters[0].rows.filter((r) => r.id !== 'geom.panel-w');
    expect(lintCalendarTwin(s).errors.map((e) => e.code)).toContain('missing-parameter');
  });

  it('no parameters at all', () => {
    const s = build();
    s.parameters = [];
    expect(lintCalendarTwin(s).errors.map((e) => e.code)).toContain('no-parameters');
  });
});

describe('lintVenuePlan catches plan mistakes', () => {
  const clone = (): VenuePlanSpec => buildVenuePlan(CALENDAR_TWIN);

  it('a shape that leaves its view', () => {
    const s = clone();
    s.views[0].shapes[0].x = 900;
    expect(lintVenuePlan(s).errors.map((e) => e.code)).toContain('shape-outside-view');
  });

  it('two views on top of each other', () => {
    const s = clone();
    s.views[1].x = s.views[0].x;
    s.views[1].y = s.views[0].y;
    expect(lintVenuePlan(s).errors.map((e) => e.code)).toContain('views-overlap');
  });

  it('a datasheet row with no basis', () => {
    const s = clone();
    delete (s.datasheet.rows[0].v as { basis?: string }).basis;
    expect(lintVenuePlan(s).errors.map((e) => e.code)).toContain('no-basis');
  });

  it('a state lighting nothing on the sheet', () => {
    const s = clone();
    s.states[0].streams.push('steam');
    expect(lintVenuePlan(s).errors.map((e) => e.code)).toContain('state-unknown-stream');
  });

  it('a dimension that says nothing', () => {
    const s = clone();
    s.views[0].dims![0].text = '';
    expect(lintVenuePlan(s).errors.map((e) => e.code)).toContain('dim-no-text');
  });
});

describe('lintCalendarTwin catches panel mistakes', () => {
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
