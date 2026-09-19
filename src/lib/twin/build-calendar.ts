/**
 * Build the calendar-wall twin from the microseason table. This is the
 * ONLY way a `CalendarTwinSpec` comes into being — 72 hand-written panels
 * would rot the first time a date in `src/data/microseasons.ts` moved.
 *
 * The wall follows the reference drawing `MS-CAL-001` (see
 * `microseasons-cal/microseasons_calendar_final.html`): 6 columns × 12
 * rows, reading order left→right top→bottom starting at Risshun (Feb 4),
 * a horizontal timber rail under every row, culture tubing snaking through
 * the rows behind the wall, and every panel's MFC wired in parallel onto
 * two bus bars in the vertical rails.
 */
import type { Microseason } from '@/data/microseasons';
import { ALGAE_TINT } from './blueprint';
import { spanDays, dayOfYear } from './lint';
import type { CalendarPanel, CalendarState, CalendarTwinSpec, Season, TitleBlock } from './spec';

export const WALL = {
  cols: 6,
  rows: 12,
  /** sheet units per panel */
  panel: { w: 84, h: 50, gap: 8 },
  /** the physical panel it stands for, mm */
  mm: { w: 100, h: 100, d: 95 },
  origin: [30, 46] as [number, number],
  sheet: { width: 1000, height: 760 },
} as const;

const SEASON_OF_SOLAR_TERM: Record<string, Season> = {
  Risshun: 'spring', Usui: 'spring', Keichitsu: 'spring', Shunbun: 'spring', Seimei: 'spring', Kokuu: 'spring',
  Rikka: 'summer', Shōman: 'summer', Bōshu: 'summer', Geshi: 'summer', Shōsho: 'summer', Taisho: 'summer',
  Risshū: 'autumn', Shosho: 'autumn', Hakuro: 'autumn', Shūbun: 'autumn', Kanro: 'autumn', Sōkō: 'autumn',
  Rittō: 'winter', Shōsetsu: 'winter', Taisetsu: 'winter', Tōji: 'winter', Shōkan: 'winter', Daikan: 'winter',
};

export function seasonOf(ms: Microseason): Season {
  const s = SEASON_OF_SOLAR_TERM[ms.solarTerm];
  if (s) return s;
  /* fall back on position: 18 kō per season starting at Risshun */
  const q = Math.floor((ms.id - 1) / 18);
  return (['spring', 'summer', 'autumn', 'winter'] as Season[])[Math.min(q, 3)];
}

function hexToRgb(hex: string): [number, number, number] {
  const n = parseInt(hex.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}
function rgbToHex([r, g, b]: [number, number, number]): string {
  return '#' + [r, g, b].map((v) => Math.round(v).toString(16).padStart(2, '0')).join('');
}

/**
 * Culture tint for panel `n` of 72: a continuous blend between the four
 * seasonal anchors, so the wall reads as the gradient in the renders rather
 * than four flat blocks. Anchors sit at the middle of each season.
 */
export function algaeTint(n: number, total = 72): string {
  const anchors: [number, string][] = [
    [-0.125, ALGAE_TINT.winter],
    [0.125, ALGAE_TINT.spring],
    [0.375, ALGAE_TINT.summer],
    [0.625, ALGAE_TINT.autumn],
    [0.875, ALGAE_TINT.winter],
    [1.125, ALGAE_TINT.spring],
  ];
  const t = (n - 0.5) / total;
  for (let i = 1; i < anchors.length; i++) {
    const [t0, c0] = anchors[i - 1];
    const [t1, c1] = anchors[i];
    if (t >= t0 && t <= t1) {
      const k = (t - t0) / (t1 - t0);
      const a = hexToRgb(c0);
      const b = hexToRgb(c1);
      return rgbToHex([a[0] + (b[0] - a[0]) * k, a[1] + (b[1] - a[1]) * k, a[2] + (b[2] - a[2]) * k]);
    }
  }
  return ALGAE_TINT.spring;
}

export function panelTag(n: number): string {
  return `R-${String(100 + n).padStart(3, '0')}`;
}

export function toPanel(ms: Microseason, index: number, cols = WALL.cols): CalendarPanel {
  const n = index + 1;
  const row = Math.floor(index / cols);
  const col = index % cols;
  const ltr = row % 2 === 0;
  const season = seasonOf(ms);
  return {
    id: `p${String(n).padStart(2, '0')}`,
    n,
    tag: panelTag(n),
    microseasonId: ms.id,
    nameEn: ms.nameEn,
    nameJa: ms.nameJa,
    solarTerm: ms.solarTerm,
    season,
    row,
    col,
    start: ms.startDate,
    end: ms.endDate,
    days: spanDays(ms.startDate, ms.endDate),
    tint: algaeTint(n),
    ports: { in: ltr ? 'left' : 'right', out: ltr ? 'right' : 'left' },
    tip: `${panelTag(n)} · #${n} ${ms.nameJa} — ${ms.nameEn} (${ms.solarTerm}, ${ms.startDate.month}/${ms.startDate.day}–${ms.endDate.month}/${ms.endDate.day}). ${ms.description}.`,
  };
}

/** Which panel holds a date (leap-safe, year-agnostic), and the day offset within it. */
export function panelForDate(panels: CalendarPanel[], date: Date): { panel: CalendarPanel; dayIndex: number } | null {
  const m = date.getMonth() + 1;
  const d = date.getDate();
  /* the kō table is drawn on a 365-day year; Feb 29 folds into the kō that
     holds Feb 28 (the table has no leap kō, and the LED strip has no sixth day) */
  const doy = m === 2 && d === 29 ? dayOfYear(2, 28) : dayOfYear(m, d);
  for (const p of panels) {
    const a = dayOfYear(p.start.month, p.start.day);
    const b = dayOfYear(p.end.month, p.end.day);
    if (b >= a) {
      if (doy >= a && doy <= b) return { panel: p, dayIndex: doy - a };
    } else if (doy >= a || doy <= b) {
      return { panel: p, dayIndex: doy >= a ? doy - a : 366 - a + doy };
    }
  }
  return null;
}

export interface BuildCalendarOptions {
  /** the date the TODAY state lights; defaults to now */
  today?: Date;
  title?: Partial<TitleBlock>;
}

export function buildCalendarTwin(microseasons: Microseason[], opts: BuildCalendarOptions = {}): CalendarTwinSpec {
  const panels = microseasons.map((ms, i) => toPanel(ms, i));
  const today = opts.today ?? new Date();
  const hit = panelForDate(panels, today);
  const bySeason = (s: Season) => panels.filter((p) => p.season === s).map((p) => p.id);

  const states: CalendarState[] = [
    {
      id: 'today',
      label: 'Today',
      band: hit ? `${hit.panel.start.month}/${hit.panel.start.day}` : '—',
      description: hit
        ? `${hit.panel.tag} lit for ${hit.panel.nameEn}; day LED ${hit.dayIndex + 1} of ${hit.panel.days} on. Culture circulating, MFC array on the bus.`
        : 'No panel matches the date.',
      litPanels: hit ? [hit.panel.id] : [],
      litDay: hit?.dayIndex,
      cultureFilled: true,
      streams: ['culture', 'bus'],
      rule: 'today',
    },
    ...(['spring', 'summer', 'autumn', 'winter'] as Season[]).map<CalendarState>((s) => ({
      id: s,
      label: s[0].toUpperCase() + s.slice(1),
      band: '18 kō',
      description: `The eighteen ${s} panels lit together — the seasonal tint band of the culture.`,
      litPanels: bySeason(s),
      cultureFilled: true,
      streams: ['culture'],
      rule: 'season',
    })),
    {
      id: 'night',
      label: 'Night',
      band: 'LEDs on',
      description: 'Ambient mode after dark: every day-strip on at low duty from the supercap + grid supplement; culture still circulating.',
      litPanels: [],
      stripsOn: true,
      cultureFilled: true,
      streams: ['culture', 'bus'],
      rule: 'night',
    },
    {
      id: 'refresh',
      label: 'Culture refresh',
      band: '90 d',
      description: 'Quarterly maintenance: pump off, culture drained through XV-103, chambers empty until BG-11 make-up refills the loop.',
      litPanels: [],
      cultureFilled: false,
      streams: [],
      rule: 'refresh',
      stamp: 'MAINTENANCE — LOOP DRAINED',
    },
  ];

  return {
    id: 'twin-calendar-wall',
    sheet: { ...WALL.sheet },
    title: {
      org: 'MICROSEASONS — 七十二候',
      title: '72 microseasons bioreactor calendar — wall elevation (digital twin)',
      drawing: 'MS-CAL-001',
      rev: 'B',
      sheet: 1,
      of: 3,
      status: 'CONCEPT',
      scale: 'SCALE 1:12 · 600 × 1200 × 95 mm',
      drawn: 'microseasons-digital-twin',
      ...opts.title,
    },
    caption: 'sheet 1 · wall elevation · 6 × 12 panels · one kō per panel · culture serpentine + parallel MFC bus',
    grid: { cols: WALL.cols, rows: WALL.rows },
    panel: { ...WALL.panel, mm: { ...WALL.mm } },
    origin: [...WALL.origin] as [number, number],
    panels,
    hydraulics: {
      path: 'boustrophedon',
      flowMlMin: 50,
      reservoirL: 20,
      tubingIdMm: 6,
      organism: 'Chlorella vulgaris (UTEX 265)',
      medium: 'modified BG-11',
    },
    electrical: {
      topology: 'parallel',
      cellVoltageV: 0.5,
      busVoltageV: 12,
      ledWattsPerPanel: 0.5,
      anodeBus: 'left',
    },
    logic: {
      x: 610,
      y: 300,
      w: 370,
      h: 122,
      title: 'UY-100 · WALL MODE — READS CLOCK · LUX · LT · LSLL',
      rules: [
        { id: 'today', text: 'CLOCK → LIGHT PANEL(kō) · DAY LED = OFFSET' },
        { id: 'season', text: 'SEASON VIEW → LIGHT 18 PANELS OF THE TERM' },
        { id: 'night', text: 'AT-303 LUX < 20 → STRIPS ON · B-201 → L-201' },
        { id: 'refresh', text: 'KY-101 90 d → P-101 OFF · XV-103 OPEN' },
      ],
    },
    states,
    defaultState: 'today',
    notes: [
      'NOTES · 1. ONE PANEL = ONE KŌ (~5 d); READING ORDER STARTS AT RISSHUN (FEB 4). 2. CULTURE FLOWS IN SERIES, LEFT→RIGHT ON EVEN ROWS.',
      '3. ALL 72 MFCs IN PARALLEL: SAME V (~0.5 V), CURRENTS SUM. 4. TINT = CULTURE COLOUR BY SEASON, NOMINAL. 5. LED STRIP = ONE LED PER DAY OF THE KŌ.',
    ],
  };
}
