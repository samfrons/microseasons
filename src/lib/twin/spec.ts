/**
 * Declarative specs for the Microseasons calendar digital twin.
 *
 * A sheet is DATA. Two kinds of sheet exist:
 *
 *   1. `CalendarTwinSpec` — the physical piece: a FREESTANDING, DOUBLE-SIDED
 *      monolith on a plinth, 72 timber-framed panels split over two faces
 *      (face A = spring + summer, face B = autumn + winter), 6 × 6 each,
 *      every panel a photobioreactor + microbial fuel cell for one
 *      microseason, with a strip of day LEDs, the serpentine culture tubing
 *      inside the frame (crossing from face A to face B at the base) and the
 *      +/− bus in the vertical rails of both faces. It also carries the
 *      PARAMETERS layer — every number the installation needs, each with a
 *      basis. Built from `src/data/microseasons.ts` by `buildCalendarTwin`,
 *      never by hand.
 *
 *   2. `VenuePlanSpec` — MS-CAL-004: the monolith on a venue floor. Plan
 *      footprint with clearance zones, a section through the plinth, a
 *      dimensions block and the printed DATASHEET. Built by
 *      `buildVenuePlan(calendarSpec)`.
 *
 *   3. `PidSpec` — an ISA-5.1 process & instrumentation diagram (equipment,
 *      lines, instruments, signals, parts list, logic block, states, title
 *      block). The array sheet is hand-authored once; the per-panel sheet
 *      comes from a builder, one per panel.
 *
 * Both are linted (`lint.ts`) and drawn by generic renderers
 * (`src/components/DigitalTwin`). Nothing is drawn by hand.
 *
 * Coordinates are in sheet units (the SVG viewBox).
 */
import type { LineKind } from './blueprint';

export type Pt = [number, number];

export type Season = 'spring' | 'summer' | 'autumn' | 'winter';

/* ------------------------------------------------------------------ *
 * Shared furniture
 * ------------------------------------------------------------------ */

export interface TitleBlock {
  org: string;
  title: string;
  /** e.g. `MS-CAL-001` */
  drawing: string;
  rev: string;
  sheet: number;
  of: number;
  status: 'CONCEPT' | 'PRELIMINARY' | 'ISSUED FOR REVIEW' | 'AS-BUILT';
  /** e.g. "SCALE: SCHEMATIC · DIMS NOMINAL" */
  scale?: string;
  drawn?: string;
  /** two-line stamp; default derives from status */
  stamp?: [string, string];
}

export interface Rule {
  id: string;
  text: string;
}

export interface LogicBlock {
  x: number;
  y: number;
  w: number;
  h: number;
  title: string;
  rules: Rule[];
}


/* ------------------------------------------------------------------ *
 * Engineering values — the PARAMETERS layer
 * ------------------------------------------------------------------ */

/**
 * A number on this project, with the reason you are allowed to believe it.
 * Mirrors MESSAI's `EngValue` (`@messai/pid-schematic`) deliberately: an
 * installation spec that cannot say where a figure came from is a wish
 * list. `basis` is MANDATORY — an assumed number must never look measured.
 */
export type EngBasis = 'design' | 'literature' | 'vendor' | 'assumed' | 'measured';

export const ENG_BASES: EngBasis[] = ['design', 'literature', 'vendor', 'assumed', 'measured'];

export interface EngValue {
  /** the value as written, e.g. "0.5–5", "500", "≤ 1.5" */
  value: string;
  unit?: string;
  basis: EngBasis;
  /** citation, calculation, or the caveat that makes the number honest */
  note?: string;
}

export interface ParameterRow {
  /** stable id, unique across the whole parameter set, e.g. `geom.panel-w` */
  id: string;
  label: string;
  v: EngValue;
}

export interface ParameterSection {
  id: string;
  label: string;
  rows: ParameterRow[];
}

/** Flatten every section to one list — the table and the linter both walk it. */
export function allParameters(sections: ParameterSection[]): (ParameterRow & { section: string })[] {
  return sections.flatMap((s) => s.rows.map((r) => ({ ...r, section: s.id })));
}

/** Look one parameter up by id. Returns undefined rather than throwing. */
export function findParameter(sections: ParameterSection[], id: string): ParameterRow | undefined {
  for (const s of sections) for (const r of s.rows) if (r.id === id) return r;
  return undefined;
}

/** The numeric part of an `EngValue`, for the arithmetic the linter checks. */
export function engNumber(v: EngValue): number | null {
  const m = /-?\d+(?:[.,]\d+)?/.exec(v.value.replace(/\s/g, ''));
  return m ? Number(m[0].replace(',', '.')) : null;
}

/* ------------------------------------------------------------------ *
 * 1. The calendar monolith
 * ------------------------------------------------------------------ */

export type FaceId = 'A' | 'B';

/**
 * One face of the monolith. Face A carries spring + summer (kō 1–36), face B
 * autumn + winter (kō 37–72); reading order runs row-major through A and
 * continues on B, and the culture serpentine crosses from A to B at the base.
 */
export interface CalendarFace {
  id: FaceId;
  label: string;
  /** the seasons this face carries, in reading order */
  seasons: Season[];
  cols: number;
  rows: number;
  /** panel numbers on this face, inclusive */
  from: number;
  to: number;
  /** where this face's top-left panel sits on the sheet */
  origin: Pt;
}

export interface CalendarPanel {
  /** `p01` … `p72` */
  id: string;
  /** 1-based panel number, reading order: face A row-major, then face B */
  n: number;
  /** which face of the monolith this panel is on */
  face: FaceId;
  /** equipment tag for the panel as a reactor, `R-101` … `R-172` */
  tag: string;
  microseasonId: number;
  nameEn: string;
  nameJa: string;
  /** quiet lowercase 4–8 word line derived from `nameEn`, engraved top-left; `nameJa` stays data-only */
  poem: string;
  solarTerm: string;
  season: Season;
  /** 0-based grid position WITHIN ITS FACE */
  row: number;
  col: number;
  /** calendar span of the microseason */
  start: { month: number; day: number };
  end: { month: number; day: number };
  /** number of days in the span — the number of day-LEDs on the strip */
  days: number;
  /** culture tint for the algae chamber (hex) */
  tint: string;
  /** which side the culture enters and leaves — the serpentine decides */
  ports: { in: 'left' | 'right'; out: 'left' | 'right' };
  /** hover / focus explanation; also the aria-label */
  tip?: string;
}

export interface CalendarState {
  id: string;
  label: string;
  /** short condition text shown on the chip, e.g. "FEB 4" */
  band?: string;
  description: string;
  /** panel ids lit (timber glow + chamber at full tint) */
  litPanels: string[];
  /** 0-based day-LED index lit on the lit panels (today's offset) */
  litDay?: number;
  /** false = culture drained (chambers draw empty) */
  cultureFilled?: boolean;
  /** true = day-LED strips draw on for every panel (ambient/night) */
  stripsOn?: boolean;
  /** streams lit on the wall: 'culture' (tubing), 'bus' (electrical) */
  streams: ('culture' | 'bus')[];
  /** rule id highlighted in the logic block */
  rule?: string;
  /** printed in the stamp slot of the logic block */
  stamp?: string;
}

export interface CalendarTwinSpec {
  id: string;
  /** the product changed in 2026: no longer a wall hanging, a monolith */
  form: 'freestanding';
  sheet: { width: number; height: number };
  title: TitleBlock;
  caption?: string;
  /** the grid of ONE face; `faces.length × cols × rows` = every panel */
  grid: { cols: number; rows: number };
  /** the two faces of the monolith, in reading order */
  faces: CalendarFace[];
  /** panel footprint in sheet units + the physical size it stands for (landscape) */
  panel: { w: number; h: number; gap: number; mm: { w: number; h: number; d: number } };
  /** timber frame: the section of a rail and the physical gap between panels */
  frame: { sectionMm: number; gapMm: number };
  /** the plinth the monolith stands on (and which holds V-101 / P-101) */
  plinth: { wMm: number; dMm: number; hMm: number };
  /** overall envelope, computed from panel + gap + frame + plinth */
  envelope: { wMm: number; hMm: number; dMm: number };
  panels: CalendarPanel[];
  hydraulics: {
    /** 'boustrophedon' = left→right on even rows, right→left on odd rows */
    path: 'boustrophedon';
    /** how the serpentine gets from face A to face B */
    crossover: { at: 'base' | 'head'; note: string };
    flowMlMin: number;
    reservoirL: number;
    tubingIdMm: number;
    organism: string;
    medium: string;
  };
  electrical: {
    topology: 'parallel';
    cellVoltageV: number;
    busVoltageV: number;
    ledWattsPerPanel: number;
    /** timber rails carry the +/− bus; which side is which */
    anodeBus: 'left' | 'right';
  };
  /** every number the installation needs, each with a basis */
  parameters: ParameterSection[];
  logic?: LogicBlock;
  states: CalendarState[];
  defaultState?: string;
  notes?: string[];
}

/* ------------------------------------------------------------------ *
 * 2. The P&ID
 * ------------------------------------------------------------------ */

export type EquipmentKind =
  | 'chamber' // a reactor chamber (rect body)
  | 'vessel' // tank / reservoir with domed heads
  | 'pump' // circle + rotor triangle (peristaltic by default here)
  | 'valve' // bowtie on a line; `actuated` adds the diaphragm
  | 'membrane' // separator: hatched bar between chambers
  | 'electrode' // anode / cathode plate inside a chamber
  | 'led' // the LED array / day-strip (a light load): box with rays
  | 'load' // resistor / load bank (zigzag)
  | 'powerSupply' // grid DC supply (box with +/−)
  | 'converter' // DC-DC boost / MPPT stage
  | 'storage' // supercapacitor / battery
  | 'switch' // contactor / relay
  | 'panelArray' // the 72-panel wall as one block (rect with mini grid)
  | 'filter' // in-line filter capsule
  | 'sample' // sampling point (small circle + S)
  | 'cabinet' // controller / ESP32 cabinet
  | 'sink' // off-sheet arrow OUT
  | 'source'; // off-sheet arrow IN

export interface Equipment {
  id: string;
  /** equipment tag, e.g. `V-101`; omitted for sources / sinks / electrodes */
  tag?: string;
  kind: EquipmentKind;
  x: number;
  y: number;
  w?: number;
  h?: number;
  label?: string;
  labelSide?: 'below' | 'above' | 'left' | 'right';
  /** valve-only: draws an actuator; `fail` prints FC / FO after the tag */
  actuated?: boolean;
  fail?: 'FC' | 'FO';
  vertical?: boolean;
  polarity?: 'anode' | 'cathode';
  tip?: string;
}

export interface Line {
  id: string;
  /** stream bucket; states light streams */
  stream: string;
  kind?: LineKind;
  /** polyline points; orthogonal runs are the P&ID convention */
  pts: Pt[];
  from?: string;
  to?: string;
  arrow?: boolean;
  endLabel?: string;
}

export type InstrumentMount = 'field' | 'panel' | 'dcs';

export interface Instrument {
  /** ISA-5.1 tag, e.g. `FT-101` */
  tag: string;
  x: number;
  y: number;
  leaderTo?: Pt;
  mount?: InstrumentMount;
  tip?: string;
}

export interface Signal {
  from: string;
  to: string;
  via?: Pt[];
}

export interface Part {
  n: number;
  ref: string;
  name: string;
}

export interface Callout {
  n: number;
  x: number;
  y: number;
  to: Pt;
}

export interface SheetState {
  id: string;
  label: string;
  band?: string;
  description: string;
  streams: string[];
  valvesOpen?: string[];
  rule?: string;
  stamp?: string;
}

export interface PidSpec {
  id: string;
  /** what this is a sheet for: `array` or `panel:<n>` */
  subject: string;
  sheet: { width: number; height: number };
  title: TitleBlock;
  caption?: string;
  equipment: Equipment[];
  lines: Line[];
  instruments: Instrument[];
  signals?: Signal[];
  parts?: Part[];
  callouts?: Callout[];
  logic?: LogicBlock;
  states: SheetState[];
  defaultState?: string;
  notes?: string[];
}

export function getPidState(spec: PidSpec, id?: string): SheetState {
  const want = id ?? spec.defaultState ?? spec.states[0]?.id;
  return (spec.states.find((s) => s.id === want) ?? spec.states[0])!;
}

export function getCalendarState(spec: CalendarTwinSpec, id?: string): CalendarState {
  const want = id ?? spec.defaultState ?? spec.states[0]?.id;
  return (spec.states.find((s) => s.id === want) ?? spec.states[0])!;
}

/* ------------------------------------------------------------------ *
 * 3. The venue plan (MS-CAL-004)
 * ------------------------------------------------------------------ */

/**
 * A plan / section sheet is data too: rectangles with a meaning, dimension
 * strings, leader notes, and the P&ID equipment that lives inside the
 * plinth drawn with the SAME symbols as the other sheets. Coordinates are
 * sheet units; `mm` on a view records the scale the shapes were laid out at
 * so a dimension can be checked against the envelope.
 */
export type PlanShapeKind =
  | 'solid' // built fabric: the monolith, the plinth, a tank
  | 'zone' // a clearance / keep-out area, dashed
  | 'ghost' // something above or behind the cut, thin dashed
  | 'hatch'; // a cut through solid material

export interface PlanShape {
  id: string;
  kind: PlanShapeKind;
  x: number;
  y: number;
  w: number;
  h: number;
  label?: string;
  sub?: string;
  /** stream bucket, so a state can light it (e.g. 'service', 'viewing') */
  stream?: string;
  tip?: string;
}

export interface PlanDim {
  id: string;
  from: Pt;
  to: Pt;
  text: string;
  /** push the dimension line off the measured edge by this much */
  offset?: number;
}

export interface PlanNote {
  id: string;
  x: number;
  y: number;
  text: string;
  anchor?: 'start' | 'middle' | 'end';
  to?: Pt;
}

export interface PlanView {
  id: string;
  label: string;
  /** frame of the view on the sheet */
  x: number;
  y: number;
  w: number;
  h: number;
  /** sheet units per millimetre — the scale the shapes were laid out at */
  unitsPerMm: number;
  shapes: PlanShape[];
  dims?: PlanDim[];
  notes?: PlanNote[];
  /** P&ID equipment drawn inside this view (plinth internals) */
  equipment?: Equipment[];
  lines?: Line[];
  instruments?: Instrument[];
}

export interface DatasheetBlock {
  title: string;
  rows: { label: string; v: EngValue }[];
}

export interface VenuePlanSpec {
  id: string;
  subject: string;
  sheet: { width: number; height: number };
  title: TitleBlock;
  caption?: string;
  views: PlanView[];
  /** the printed key parameters, ~12 rows, each with its basis */
  datasheet: DatasheetBlock;
  states: SheetState[];
  defaultState?: string;
  logic?: LogicBlock;
  notes?: string[];
}

export function getVenueState(spec: VenuePlanSpec, id?: string): SheetState {
  const want = id ?? spec.defaultState ?? spec.states[0]?.id;
  return (spec.states.find((s) => s.id === want) ?? spec.states[0])!;
}
