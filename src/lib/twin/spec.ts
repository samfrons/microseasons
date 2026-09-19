/**
 * Declarative specs for the Microseasons calendar digital twin.
 *
 * A sheet is DATA. Two kinds of sheet exist:
 *
 *   1. `CalendarTwinSpec` — the physical wall: 72 timber-framed panels in a
 *      6 × 12 grid, each one a photobioreactor + microbial fuel cell for one
 *      microseason, with a strip of day LEDs, the serpentine culture tubing
 *      behind the wall and the parallel electrical buses. Built from
 *      `src/data/microseasons.ts` by `buildCalendarTwin`, never by hand.
 *
 *   2. `PidSpec` — an ISA-5.1 process & instrumentation diagram (equipment,
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
 * 1. The calendar wall
 * ------------------------------------------------------------------ */

export interface CalendarPanel {
  /** `p01` … `p72` */
  id: string;
  /** 1-based panel number, reading order (row-major, left → right) */
  n: number;
  /** equipment tag for the panel as a reactor, `R-101` … `R-172` */
  tag: string;
  microseasonId: number;
  nameEn: string;
  nameJa: string;
  solarTerm: string;
  season: Season;
  /** 0-based grid position */
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
  sheet: { width: number; height: number };
  title: TitleBlock;
  caption?: string;
  grid: { cols: number; rows: number };
  /** panel footprint in sheet units + the physical size it stands for */
  panel: { w: number; h: number; gap: number; mm: { w: number; h: number; d: number } };
  /** where the wall's top-left corner sits on the sheet */
  origin: Pt;
  panels: CalendarPanel[];
  hydraulics: {
    /** 'boustrophedon' = left→right on even rows, right→left on odd rows */
    path: 'boustrophedon';
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
