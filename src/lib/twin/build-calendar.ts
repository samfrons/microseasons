/**
 * Build the calendar twin from the microseason table. This is the ONLY way
 * a `CalendarTwinSpec` comes into being — 72 hand-written panels would rot
 * the first time a date in `src/data/microseasons.ts` moved.
 *
 * FORM (changed 2026): the calendar is no longer a wall hanging. It is a
 * FREESTANDING, DOUBLE-SIDED monolith on a plinth, for a venue floor:
 *
 *   face A — spring + summer, kō 1–36, 6 columns × 6 rows
 *   face B — autumn + winter, kō 37–72, 6 columns × 6 rows
 *
 * Panels are landscape rectangles (180 × 110 × 95 mm). Reading order runs
 * row-major through face A from Risshun and CONTINUES on face B at kō 37.
 * The culture serpentine boustrophedons down face A, CROSSES TO FACE B AT
 * THE BASE (the last panel of face A leaves on the left, the tubing runs
 * through the plinth head and enters face B row 0 on the left), then
 * boustrophedons down face B and returns to V-101 in the plinth. The +/−
 * bus runs in the vertical rails of BOTH faces, the two faces landing on
 * the same pair of bars at the plinth.
 */
import type { Microseason } from '@/data/microseasons';
import { ALGAE_TINT } from './blueprint';
import { spanDays, dayOfYear } from './lint';
import type {
  CalendarFace,
  CalendarPanel,
  CalendarState,
  CalendarTwinSpec,
  EngValue,
  FaceId,
  ParameterSection,
  Season,
  TitleBlock,
} from './spec';

/**
 * The monolith, in sheet units and in millimetres. `MONOLITH` replaces the
 * old `WALL` constant; `WALL` is kept as an alias so nothing that only
 * wanted the panel size breaks.
 */
export const MONOLITH = {
  /** per FACE */
  cols: 6,
  rows: 6,
  faces: 2,
  /** sheet units per panel (landscape, 180:110 ≈ 1.64) */
  panel: { w: 88, h: 54, gap: 8 },
  /** the physical panel it stands for, mm */
  mm: { w: 180, h: 110, d: 95 },
  /** timber frame section and the physical gap between panels, mm */
  frame: { sectionMm: 60, gapMm: 20 },
  /** plinth, mm (w × d × h) — holds V-101, P-101, the drip tray */
  plinth: { wMm: 1400, dMm: 400, hMm: 700 },
  /** depth of the service cavity between the two faces, mm */
  cavityMm: 110,
  /** where each face's grid sits on the sheet */
  origins: { A: [46, 60] as [number, number], B: [46, 560] as [number, number] },
  sheet: { width: 1000, height: 1200 },
} as const;

/** @deprecated the piece is freestanding; use `MONOLITH`. */
export const WALL = MONOLITH;

/** Overall envelope in mm, from the panel size, the gaps, the frame and the plinth. */
export function envelopeOf(m: typeof MONOLITH = MONOLITH): { wMm: number; hMm: number; dMm: number } {
  const w = m.cols * m.mm.w + (m.cols - 1) * m.frame.gapMm + 2 * m.frame.sectionMm;
  const blockH = m.rows * m.mm.h + (m.rows - 1) * m.frame.gapMm + 2 * m.frame.sectionMm;
  const stackD = 2 * m.mm.d + m.cavityMm;
  return { wMm: w, hMm: blockH + m.plinth.hMm, dMm: Math.max(stackD, m.plinth.dMm) };
}

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

/** Which face panel `n` (1-based) is on, and its 0-based index within it. */
export function faceOf(n: number, perFace = MONOLITH.cols * MONOLITH.rows): { face: FaceId; index: number } {
  const f = Math.floor((n - 1) / perFace);
  return { face: (f === 0 ? 'A' : 'B') as FaceId, index: (n - 1) % perFace };
}

export function toPanel(
  ms: Microseason,
  index: number,
  cols = MONOLITH.cols,
  perFace = MONOLITH.cols * MONOLITH.rows
): CalendarPanel {
  const n = index + 1;
  const { face, index: onFace } = faceOf(n, perFace);
  const row = Math.floor(onFace / cols);
  const col = onFace % cols;
  const ltr = row % 2 === 0;
  const season = seasonOf(ms);
  return {
    id: `p${String(n).padStart(2, '0')}`,
    n,
    face,
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
    tip: `${panelTag(n)} · FACE ${face} · #${n} ${ms.nameJa} — ${ms.nameEn} (${ms.solarTerm}, ${ms.startDate.month}/${ms.startDate.day}–${ms.endDate.month}/${ms.endDate.day}). ${ms.description}.`,
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

/* ------------------------------------------------------------------ *
 * The parameters layer
 * ------------------------------------------------------------------ */

const D = (value: string, unit?: string, note?: string): EngValue => ({ value, unit, basis: 'design', note });
const A = (value: string, unit?: string, note?: string): EngValue => ({ value, unit, basis: 'assumed', note });
const L = (value: string, unit?: string, note?: string): EngValue => ({ value, unit, basis: 'literature', note });
const VEN = (value: string, unit?: string, note?: string): EngValue => ({ value, unit, basis: 'vendor', note });

/** Culture volume held in ONE panel's photobioreactor chamber, litres. */
export const CULTURE_L_PER_PANEL = 0.4;
/** Warm-white backlight behind one culture window, watts. */
export const BACKLIGHT_W_PER_PANEL = 0.5;

/**
 * Every number the installation needs, grouped, each with a BASIS. Design
 * figures are carried from MS-CAL-001 / MS-CAL-002; anything not derivable
 * from those sheets is marked `assumed` with the reason. Nothing here has
 * been measured — no row may claim `measured` until something is built.
 */
export function buildParameters(opts: {
  panels: number;
  mm: { w: number; h: number; d: number };
  frame: { sectionMm: number; gapMm: number };
  plinth: { wMm: number; dMm: number; hMm: number };
  envelope: { wMm: number; hMm: number; dMm: number };
  cavityMm: number;
  cols: number;
  rows: number;
  faces: number;
  flowMlMin: number;
  reservoirL: number;
  tubingIdMm: number;
  organism: string;
  medium: string;
  cellVoltageV: number;
  busVoltageV: number;
}): ParameterSection[] {
  const cultureTotalL = +(CULTURE_L_PER_PANEL * opts.panels).toFixed(2);
  const backlightTotalW = +(BACKLIGHT_W_PER_PANEL * opts.panels).toFixed(1);
  const residenceMin = +((CULTURE_L_PER_PANEL * 1000) / opts.flowMlMin).toFixed(1);
  const loopH = +((residenceMin * opts.panels) / 60).toFixed(1);
  const footprintM2 = +((opts.plinth.wMm / 1000) * (opts.plinth.dMm / 1000)).toFixed(2);

  return [
    {
      id: 'geometry',
      label: 'Geometry',
      rows: [
        { id: 'geom.form', label: 'Form', v: D('freestanding double-sided monolith on a plinth', undefined, 'Two faces, 36 panels each; viewed from both sides.') },
        { id: 'geom.panel-w', label: 'Panel width', v: D(String(opts.mm.w), 'mm') },
        { id: 'geom.panel-h', label: 'Panel height', v: D(String(opts.mm.h), 'mm') },
        { id: 'geom.panel-d', label: 'Panel depth', v: D(String(opts.mm.d), 'mm', 'Anode chamber + membrane + photobioreactor + backlight.') },
        { id: 'geom.panel-count', label: 'Panels', v: D(`${opts.panels} (${opts.faces} × ${opts.cols} × ${opts.rows})`, 'off', 'One per kō; face A spring + summer, face B autumn + winter.') },
        { id: 'geom.gap', label: 'Gap between panels', v: D(String(opts.frame.gapMm), 'mm') },
        { id: 'geom.frame-section', label: 'Timber frame section', v: D(`${opts.frame.sectionMm} × ${opts.frame.sectionMm}`, 'mm', 'Oak rails; the vertical rails carry the +/− bus.') },
        { id: 'geom.cavity', label: 'Service cavity between faces', v: D(String(opts.cavityMm), 'mm', 'Tubing, wiring loom and the face-to-face crossover run in here.') },
        { id: 'geom.envelope-w', label: 'Envelope width', v: D(String(opts.envelope.wMm), 'mm', `${opts.cols} × ${opts.mm.w} + ${opts.cols - 1} × ${opts.frame.gapMm} + 2 × ${opts.frame.sectionMm}.`) },
        { id: 'geom.envelope-h', label: 'Envelope height', v: D(String(opts.envelope.hMm), 'mm', 'Panel block + plinth.') },
        { id: 'geom.envelope-d', label: 'Envelope depth', v: D(String(opts.envelope.dMm), 'mm', 'Plinth governs; the panel stack is 2 × 95 + 110 = 300 mm.') },
        { id: 'geom.plinth-w', label: 'Plinth width', v: D(String(opts.plinth.wMm), 'mm') },
        { id: 'geom.plinth-d', label: 'Plinth depth', v: D(String(opts.plinth.dMm), 'mm') },
        { id: 'geom.plinth-h', label: 'Plinth height', v: D(String(opts.plinth.hMm), 'mm', 'Puts the first row of panels at standing eye level.') },
        { id: 'geom.mass', label: 'Mass, filled', v: A('≈ 440', 'kg', 'Panels ≈ 3.6 kg each filled, + frame ≈ 60 kg, + plinth, reservoir and tray ≈ 120 kg. Not weighed.') },
      ],
    },
    {
      id: 'hydraulics',
      label: 'Hydraulics',
      rows: [
        { id: 'hyd.culture-per-panel', label: 'Culture volume per panel', v: D(String(CULTURE_L_PER_PANEL), 'L', 'Photobioreactor chamber only; the anolyte is a separate 0.25 L charge.') },
        { id: 'hyd.culture-total', label: 'Culture volume, all panels', v: D(String(cultureTotalL), 'L', `${CULTURE_L_PER_PANEL} L × ${opts.panels} panels.`) },
        { id: 'hyd.reservoir', label: 'Reservoir V-101', v: D(String(opts.reservoirL), 'L', 'In the plinth, under the drip tray line.') },
        { id: 'hyd.flow', label: 'Culture flow, P-101', v: D(String(opts.flowMlMin), 'mL/min', 'Peristaltic, single loop in series through both faces.') },
        { id: 'hyd.tubing-id', label: 'Tubing bore', v: D(String(opts.tubingIdMm), 'mm', 'Platinum-cured silicone, food grade.') },
        { id: 'hyd.residence', label: 'Residence time per panel', v: D(String(residenceMin), 'min', `${CULTURE_L_PER_PANEL * 1000} mL ÷ ${opts.flowMlMin} mL/min.`) },
        { id: 'hyd.loop-time', label: 'Loop time, 72 panels', v: D(String(loopH), 'h', `${residenceMin} min × ${opts.panels} panels.`) },
        { id: 'hyd.crossover', label: 'Face A → face B crossover', v: D('at the base, through the plinth head', undefined, 'Panel 36 leaves left; the run drops into the plinth and rises into panel 37 on face B, left.') },
        { id: 'hyd.refresh', label: 'Culture refresh interval', v: D('90', 'd', 'Drained through XV-103, refilled with BG-11 through XV-104.') },
        { id: 'hyd.head', label: 'Static head, plinth to top row', v: A('≈ 1.5', 'm', 'From the envelope height; pump duty not yet selected against a curve.') },
      ],
    },
    {
      id: 'biology',
      label: 'Biology',
      rows: [
        { id: 'bio.organism', label: 'Organism', v: D(opts.organism, undefined, 'Single species; no axenic claim — the loop is not sterile.') },
        { id: 'bio.medium', label: 'Medium', v: D(opts.medium) },
        { id: 'bio.density', label: 'Cell density', v: L('1–3 × 10⁷', 'cells/mL', 'Typical working range for Chlorella in flat-panel PBRs.') },
        { id: 'bio.od', label: 'OD₆₈₀ window', v: D('0.4–0.9', 'AU', 'Below 0.4 the panel reads pale, above 0.9 the back of the chamber self-shades.') },
        { id: 'bio.ph', label: 'pH window', v: D('7.0–7.5', undefined, 'AT-301 on the reservoir; a trip at < 6.5.') },
        { id: 'bio.temp', label: 'Culture temperature', v: D('20–25', '°C', 'TT-401; no heater or chiller on this design.') },
        { id: 'bio.light', label: 'Light on the culture', v: D('2 000–8 000', 'lx', 'Venue ambient plus the backlight.') },
        { id: 'bio.ppfd', label: 'Photon flux', v: L('40–160', 'µmol·m⁻²·s⁻¹', 'The same window expressed as PPFD; saturation for Chlorella sits near the top of it.') },
        { id: 'bio.anolyte', label: 'Anolyte', v: D('20 mM acetate in phosphate buffer', undefined, 'Feeds the exoelectrogenic biofilm in the sealed anode chamber.') },
      ],
    },
    {
      id: 'electrochemistry',
      label: 'Electrochemistry',
      rows: [
        { id: 'ec.anode', label: 'Anode', v: D('graphite felt, 200 × 100 mm', undefined, 'One per panel.') },
        { id: 'ec.anode-area', label: 'Anode projected area', v: D('0.020', 'm²', '200 × 100 mm.') },
        { id: 'ec.cathode', label: 'Cathode', v: D('carbon cloth + 0.5 mg/cm² Pt/C', undefined, 'Faces the culture and breathes algal O₂.') },
        { id: 'ec.cathode-area', label: 'Cathode projected area', v: D('0.020', 'm²') },
        { id: 'ec.membrane', label: 'Membrane', v: VEN('Nafion 117, 183 µm', undefined, 'Catalogue thickness; area 0.018 m² per panel.') },
        { id: 'ec.cell-voltage', label: 'Cell voltage', v: D(String(opts.cellVoltageV), 'V', 'At the design operating point, not OCV.') },
        { id: 'ec.cell-current', label: 'Current per cell', v: D('0.25–0.39', 'A', 'Array current ÷ 72.') },
        { id: 'ec.cell-power', label: 'Power per cell', v: D('0.10–0.15', 'W') },
        { id: 'ec.array-power', label: 'Array power', v: D('7–11', 'W', '72 cells; the spread is the day/night and OD range.') },
        { id: 'ec.topology', label: 'Topology', v: D('72 cells in parallel', undefined, 'Same voltage, currents sum; one pair of bus bars per face.') },
        { id: 'ec.converter', label: 'Converter efficiency, DC-201', v: VEN('85', '%', 'Boost / MPPT stage, catalogue figure at this input.') },
        { id: 'ec.bus-voltage', label: 'Bus voltage', v: D(String(opts.busVoltageV), 'V', 'SELV.') },
        { id: 'ec.supercap', label: 'Supercapacitor B-201', v: A('2 × 350 F at 2.7 V', undefined, 'Sized to carry the night strips for an hour; not yet verified against the night profile.') },
      ],
    },
    {
      id: 'lighting',
      label: 'Lighting',
      rows: [
        { id: 'light.backlight-per-panel', label: 'Backlight per panel', v: D(String(BACKLIGHT_W_PER_PANEL), 'W') },
        { id: 'light.backlight-total', label: 'Backlight, all panels', v: D(String(backlightTotalW), 'W', `${BACKLIGHT_W_PER_PANEL} W × ${opts.panels}.`) },
        { id: 'light.cct', label: 'Colour temperature', v: D('2700', 'K', 'Warm white behind the culture; the tint the visitor reads is the culture, not the LED.') },
        { id: 'light.cri', label: 'Colour rendering', v: VEN('≥ 90', 'CRI', 'Catalogue minimum for the chosen SMD.') },
        { id: 'light.day-leds', label: 'Day LEDs per panel', v: D('4–7', 'off', 'One per day of the kō.') },
        { id: 'light.day-leds-total', label: 'Day LEDs, all panels', v: D('365', 'off', 'The kō table is a 365-day year; Feb 29 folds into the kō holding Feb 28.') },
        { id: 'light.day-led-load', label: 'Day-strip load', v: A('≈ 7.3', 'W', '365 LEDs at ~0.02 W; the strips are rarely all on.') },
        { id: 'light.pwm', label: 'PWM dim range', v: D('5–100', '%', 'Below 5 % the warm white goes green on the culture.') },
      ],
    },
    {
      id: 'controls',
      label: 'Controls',
      rows: [
        { id: 'ctl.modes', label: 'Modes', v: D('Today · Season · Night · Ambient', undefined, 'UY-100 in the cabinet; Today is the default.') },
        { id: 'ctl.brightness', label: 'Settable brightness', v: D('10–100', '%', 'Venue staff, front panel.') },
        { id: 'ctl.habit', label: 'Habit log', v: D('press a day LED to mark the day', undefined, 'The press is the only visitor input; it latches until midnight.') },
        { id: 'ctl.clock', label: 'Kō clock', v: D('timezone + location, settable', undefined, 'Decides which panel is Today; no network time assumed.') },
        { id: 'ctl.controller', label: 'Controller', v: VEN('ESP32 cabinet U-100', undefined, 'With level shifter and relays; hosts UY-100 and KY-101.') },
        { id: 'ctl.io', label: 'Field signals', v: D('FT-101 · LT-501 · LSLL-502 · AT-301/302/303 · TT-401 · ET-201 · IT-202 · JT-203', undefined, 'The trunk on MS-CAL-002.') },
      ],
    },
    {
      id: 'environment',
      label: 'Environment',
      rows: [
        { id: 'env.temp', label: 'Ambient temperature', v: D('18–26', '°C', 'Outside this the culture window moves off the design tint.') },
        { id: 'env.rh', label: 'Ambient humidity', v: A('30–60', '% RH', 'Gallery-typical; condensation on the glass has not been modelled.') },
        { id: 'env.lux', label: 'Venue lux at the piece', v: A('≤ 800', 'lx', 'Assumed gallery lighting; AT-303 measures it and switches the night mode below 20 lx.') },
        { id: 'env.noise', label: 'Pump noise', v: A('≤ 35', 'dB(A) at 1 m', 'Peristaltic head inside the closed plinth; not measured.') },
        { id: 'env.orientation', label: 'Orientation', v: A('away from direct sun', undefined, 'Direct sun on one face would bleach that half of the year.') },
      ],
    },
    {
      id: 'safety',
      label: 'Safety & maintenance',
      rows: [
        { id: 'safe.leak', label: 'Leak / level detection', v: D('LSLL-502 in the plinth', undefined, 'Hard-wired pump trip, independent of UY-100.') },
        { id: 'safe.tray', label: 'Drip tray', v: D('1380 × 380 × 60', 'mm', 'Full plinth footprint; holds more than the reservoir charge.') },
        { id: 'safe.refresh', label: 'Culture refresh', v: D('every 90 d', undefined, 'Drain, rinse, recharge; ~2 h with two people.') },
        { id: 'safe.class', label: 'Electrical class', v: D('SELV, 12 V DC', undefined, 'Grid supply PS-201 is the only mains item and sits in the plinth.') },
        { id: 'safe.access', label: 'Service access', v: D('plinth door, both ends', undefined, 'Reservoir and pump reachable without moving the piece.') },
        { id: 'safe.biosafety', label: 'Biological class', v: L('BSL-1', undefined, 'Chlorella vulgaris and a non-pathogenic anode consortium.') },
      ],
    },
    {
      id: 'venue',
      label: 'Venue',
      rows: [
        { id: 'venue.footprint', label: 'Footprint', v: D(`${(opts.plinth.wMm / 1000).toFixed(2)} × ${(opts.plinth.dMm / 1000).toFixed(2)}`, 'm', `The plinth is the only thing touching the floor: ${footprintM2} m².`) },
        { id: 'venue.viewing', label: 'Viewing clearance, each face', v: D('1500', 'mm', 'A visitor reads a whole face from here.') },
        { id: 'venue.service', label: 'Service clearance, each end', v: D('900', 'mm', 'Plinth door swing plus a person.') },
        { id: 'venue.floor', label: 'Floor loading', v: A('≈ 7.7', 'kN/m²', 'Mass estimate ÷ footprint; confirm against the venue floor before install.') },
        { id: 'venue.power', label: 'Power draw', v: D('≤ 60', 'W', 'Backlights, day strips, pump and controller; the MFC array returns 7–11 W of it.') },
        { id: 'venue.supply', label: 'Supply', v: D('1 × 230 V 13 A socket', undefined, 'Single feed into the plinth.') },
        { id: 'venue.install', label: 'Install', v: A('2 people, half a day', undefined, 'Plinth, then panel block, then charge the loop.') },
      ],
    },
  ];
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

  const env = envelopeOf();
  const perFace = MONOLITH.cols * MONOLITH.rows;
  const faces: CalendarFace[] = [
    {
      id: 'A',
      label: 'FACE A · SPRING + SUMMER',
      seasons: ['spring', 'summer'],
      cols: MONOLITH.cols,
      rows: MONOLITH.rows,
      from: 1,
      to: perFace,
      origin: [...MONOLITH.origins.A] as [number, number],
    },
    {
      id: 'B',
      label: 'FACE B · AUTUMN + WINTER',
      seasons: ['autumn', 'winter'],
      cols: MONOLITH.cols,
      rows: MONOLITH.rows,
      from: perFace + 1,
      to: perFace * 2,
      origin: [...MONOLITH.origins.B] as [number, number],
    },
  ];

  return {
    id: 'twin-calendar-monolith',
    form: 'freestanding',
    sheet: { ...MONOLITH.sheet },
    title: {
      org: 'MICROSEASONS — 七十二候',
      title: '72 microseasons calendar — elevations A & B',
      drawing: 'MS-CAL-001',
      rev: 'C',
      sheet: 1,
      of: 4,
      status: 'CONCEPT',
      scale: `SCALE 1:8 · ENVELOPE ${env.wMm} × ${env.hMm} × ${env.dMm} mm`,
      drawn: 'microseasons-digital-twin',
      ...opts.title,
    },
    caption: 'sheet 1 · freestanding monolith · two elevations · face a 6 × 6 spring+summer · face b 6 × 6 autumn+winter · serpentine crosses at the base',
    grid: { cols: MONOLITH.cols, rows: MONOLITH.rows },
    faces,
    panel: { w: MONOLITH.panel.w, h: MONOLITH.panel.h, gap: MONOLITH.panel.gap, mm: { ...MONOLITH.mm } },
    frame: { ...MONOLITH.frame },
    plinth: { ...MONOLITH.plinth },
    envelope: env,
    panels,
    hydraulics: {
      path: 'boustrophedon',
      crossover: {
        at: 'base',
        note: 'PANEL 36 OUT (LEFT) → PLINTH HEAD → PANEL 37 IN (LEFT) ON FACE B',
      },
      flowMlMin: 50,
      reservoirL: 30,
      tubingIdMm: 6,
      organism: 'Chlorella vulgaris (UTEX 265)',
      medium: 'modified BG-11',
    },
    electrical: {
      topology: 'parallel',
      cellVoltageV: 0.5,
      busVoltageV: 12,
      ledWattsPerPanel: BACKLIGHT_W_PER_PANEL,
      anodeBus: 'left',
    },
    parameters: buildParameters({
      panels: panels.length,
      mm: { ...MONOLITH.mm },
      frame: { ...MONOLITH.frame },
      plinth: { ...MONOLITH.plinth },
      envelope: env,
      cavityMm: MONOLITH.cavityMm,
      cols: MONOLITH.cols,
      rows: MONOLITH.rows,
      faces: faces.length,
      flowMlMin: 50,
      reservoirL: 30,
      tubingIdMm: 6,
      organism: 'Chlorella vulgaris (UTEX 265)',
      medium: 'modified BG-11',
      cellVoltageV: 0.5,
      busVoltageV: 12,
    }),
    logic: {
      x: 660,
      y: 600,
      w: 320,
      h: 122,
      title: 'UY-100 · MODE — READS CLOCK · LUX · LT · LSLL',
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
      'NOTES · 1. FREESTANDING DOUBLE-SIDED MONOLITH ON A PLINTH; FACE A = SPRING + SUMMER (KŌ 1–36), FACE B = AUTUMN + WINTER (KŌ 37–72). READING ORDER STARTS AT RISSHUN (FEB 4).',
      '2. CULTURE FLOWS IN SERIES, LEFT→RIGHT ON EVEN ROWS OF EACH FACE, AND CROSSES FROM FACE A TO FACE B AT THE BASE THROUGH THE PLINTH HEAD. 3. ALL 72 MFCs IN PARALLEL: SAME V (~0.5 V), CURRENTS SUM.',
      '4. TINT = CULTURE COLOUR BY SEASON, NOMINAL. 5. LED STRIP = ONE LED PER DAY OF THE KŌ. 6. EVERY NUMBER IS A DESIGN BASIS — SEE THE PARAMETERS TABLE AND MS-CAL-004 FOR THE BASIS OF EACH.',
    ],
  };
}
