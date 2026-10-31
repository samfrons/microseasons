/**
 * Sheet 4 — MS-CAL-004, the VENUE PLAN: where the monolith stands and what
 * it needs around it. Three things on one plate:
 *
 *   PLAN      the footprint on a venue floor with the clearance zones —
 *             1500 mm of viewing in front of each face, 900 mm of service
 *             at each end for the plinth doors.
 *   SECTION   A–A through the width: the panel block over the plinth, with
 *             the reservoir V-101, the pump P-101, the controller cabinet
 *             U-100, the drip tray and the face A → face B tubing crossover
 *             that runs through the plinth head.
 *   DATASHEET the twelve numbers a venue actually asks for, each printed
 *             with its BASIS so an assumed figure never reads as measured.
 *
 * Built from the calendar spec — the envelope, the plinth and the datasheet
 * rows are read from it, never retyped, so a change to the form moves this
 * sheet too.
 */
import { findParameter, type CalendarTwinSpec, type DatasheetBlock, type EngValue, type PlanView, type VenuePlanSpec } from '../spec';

/** Pull a parameter by id for the datasheet; a missing one is loud, not silent. */
function ds(spec: CalendarTwinSpec, id: string, label?: string): { label: string; v: EngValue } {
  const row = findParameter(spec.parameters, id);
  if (!row) return { label: label ?? id, v: { value: `MISSING PARAMETER ${id}`, basis: 'assumed', note: 'the calendar spec does not carry this row' } };
  return { label: label ?? row.label, v: row.v };
}

/* ---- plan view geometry: millimetres → sheet units ------------------- */
const PLAN_K = 0.105;
const PLAN_X0 = 42;
const PLAN_Y0 = 66;
const px = (mm: number) => +(PLAN_X0 + mm * PLAN_K).toFixed(2);
const py = (mm: number) => +(PLAN_Y0 + mm * PLAN_K).toFixed(2);
const pd = (mm: number) => +(mm * PLAN_K).toFixed(2);

/* ---- section view geometry ------------------------------------------- */
const SEC_K = 0.18;
const SEC_X0 = 424;
const SEC_Y0 = 90;
const sx = (mm: number) => +(SEC_X0 + mm * SEC_K).toFixed(2);
const sy = (mm: number) => +(SEC_Y0 + mm * SEC_K).toFixed(2);
const sd = (mm: number) => +(mm * SEC_K).toFixed(2);

export const VIEWING_CLEARANCE_MM = 1500;
export const SERVICE_CLEARANCE_MM = 900;

export function buildVenuePlan(spec: CalendarTwinSpec): VenuePlanSpec {
  const plinth = spec.plinth;
  const env = spec.envelope;
  /* the plan is laid out on the whole clearance envelope, origin top-left */
  const planW = plinth.wMm + 2 * SERVICE_CLEARANCE_MM;
  const planH = plinth.dMm + 2 * VIEWING_CLEARANCE_MM;
  const mx0 = SERVICE_CLEARANCE_MM; // monolith left edge, mm
  const mx1 = mx0 + plinth.wMm;
  const my0 = VIEWING_CLEARANCE_MM; // monolith front edge, mm
  const my1 = my0 + plinth.dMm;
  /* the panel block is narrower than the plinth and sits centred on it */
  const blockInsetW = (plinth.wMm - env.wMm) / 2;
  const blockInsetD = (plinth.dMm - 300) / 2;

  const plan: PlanView = {
    id: 'plan',
    label: 'PLAN · VENUE FLOOR · CLEARANCE ZONES',
    x: 30,
    y: 56,
    w: 360,
    h: 380,
    unitsPerMm: PLAN_K,
    shapes: [
      {
        id: 'viewing-a', kind: 'zone', stream: 'viewing',
        x: px(mx0), y: py(0), w: pd(plinth.wMm), h: pd(VIEWING_CLEARANCE_MM),
        label: 'VIEWING · FACE A', sub: `${VIEWING_CLEARANCE_MM} mm`,
        tip: 'Spring + summer read from here. Keep clear of seating and cases.',
      },
      {
        id: 'viewing-b', kind: 'zone', stream: 'viewing',
        x: px(mx0), y: py(my1), w: pd(plinth.wMm), h: pd(VIEWING_CLEARANCE_MM),
        label: 'VIEWING · FACE B', sub: `${VIEWING_CLEARANCE_MM} mm`,
        tip: 'Autumn + winter read from here. The piece is double-sided; it cannot go against a wall.',
      },
      {
        id: 'service-l', kind: 'zone', stream: 'service',
        x: px(0), y: py(my0), w: pd(SERVICE_CLEARANCE_MM), h: pd(plinth.dMm),
        label: 'SERVICE', sub: `${SERVICE_CLEARANCE_MM} mm · RESERVOIR END`,
        tip: 'Plinth door swing plus a person: reservoir end.',
      },
      {
        id: 'service-r', kind: 'zone', stream: 'service',
        x: px(mx1), y: py(my0), w: pd(SERVICE_CLEARANCE_MM), h: pd(plinth.dMm),
        label: 'SERVICE', sub: `${SERVICE_CLEARANCE_MM} mm · PUMP END`,
        tip: 'Plinth door swing plus a person: pump and cabinet end.',
      },
      {
        id: 'plinth-plan', kind: 'solid',
        x: px(mx0), y: py(my0), w: pd(plinth.wMm), h: pd(plinth.dMm),
        tip: `Plinth footprint ${plinth.wMm} × ${plinth.dMm} mm — the only thing touching the floor.`,
      },
      {
        id: 'block-plan', kind: 'ghost',
        x: px(mx0 + blockInsetW), y: py(my0 + blockInsetD), w: pd(env.wMm), h: pd(300),
        label: `PANEL BLOCK ${env.wMm} × 300`,
        tip: 'The panel block over the plinth: two faces of 95 mm panels with a 110 mm service cavity between them.',
      },
    ],
    dims: [
      { id: 'd-width', from: [px(mx0), py(my0) - 10], to: [px(mx1), py(my0) - 10], text: `${plinth.wMm}` },
      { id: 'd-depth', from: [384, py(my0)], to: [384, py(my1)], text: `${plinth.dMm}` },
      { id: 'd-view-a', from: [300, py(0)], to: [300, py(my0)], text: `${VIEWING_CLEARANCE_MM}` },
      { id: 'd-view-b', from: [300, py(my1)], to: [300, py(planH)], text: `${VIEWING_CLEARANCE_MM}` },
      { id: 'd-serv-l', from: [px(0), py(my1) + 10], to: [px(mx0), py(my1) + 10], text: `${SERVICE_CLEARANCE_MM}` },
      { id: 'd-serv-r', from: [px(mx1), py(my1) + 10], to: [px(planW), py(my1) + 10], text: `${SERVICE_CLEARANCE_MM}` },
    ],
    notes: [
      { id: 'n-plinth', x: 46, y: 306, text: `PLINTH ${plinth.wMm} × ${plinth.dMm} mm` },
      { id: 'n-plinth2', x: 46, y: 316, text: 'V-101 · P-101 · U-100 INSIDE' },
      { id: 'n-floor', x: 46, y: 332, text: `FLOOR ${(plinth.wMm / 1000).toFixed(2)} × ${(plinth.dMm / 1000).toFixed(2)} m` },
      { id: 'n-total', x: 46, y: 342, text: `TOTAL ZONE ${(planW / 1000).toFixed(1)} × ${(planH / 1000).toFixed(1)} m` },
    ],
  };

  const section: PlanView = {
    id: 'section',
    label: 'SECTION A–A · THROUGH WIDTH · PLINTH INTERNALS',
    x: 410,
    y: 56,
    w: 280,
    h: 380,
    unitsPerMm: SEC_K,
    shapes: [
      {
        id: 'block-sec', kind: 'hatch',
        x: sx(blockInsetW), y: sy(0), w: sd(env.wMm), h: sd(env.hMm - plinth.hMm),
        label: `PANEL BLOCK · ${spec.grid.cols * spec.grid.rows} PER FACE`,
        sub: `${env.wMm} × ${env.hMm - plinth.hMm} mm`,
        tip: 'Cut through the panel block: six rows of six on each face, the service cavity between them.',
      },
      {
        id: 'plinth-sec', kind: 'solid',
        x: sx(0), y: sy(env.hMm - plinth.hMm), w: sd(plinth.wMm), h: sd(plinth.hMm),
        tip: `Plinth, ${plinth.hMm} mm high: reservoir, pump, controller and drip tray, doors at both ends.`,
      },
      {
        id: 'tray-sec', kind: 'ghost', stream: 'service',
        x: sx(10), y: sy(env.hMm - 70), w: sd(1380), h: sd(60),
        label: 'DRIP TRAY 1380 × 380 × 60',
        tip: 'Holds more than the reservoir charge; LSLL-502 sits in it.',
      },
    ],
    equipment: [
      { id: 'v101-sec', kind: 'vessel', tag: 'V-101', x: 470, y: 305, w: 50, h: 68, label: `RESERVOIR ${spec.hydraulics.reservoirL} L`, tip: `Nutrient reservoir, ${spec.hydraulics.reservoirL} L of ${spec.hydraulics.medium}, inside the plinth over the tray.` },
      { id: 'p101-sec', kind: 'pump', tag: 'P-101', x: 555, y: 315, label: 'PERISTALTIC', tip: `Culture pump, ${spec.hydraulics.flowMlMin} mL/min design; the only moving part and the only noise source.` },
      { id: 'u100-sec', kind: 'cabinet', tag: 'U-100', x: 626, y: 296, w: 44, h: 28, label: 'ESP32', tip: 'Controller cabinet: ESP32, relays, the 12 V supply PS-201.' },
    ],
    lines: [
      { id: 'sec-feed', stream: 'culture', pts: [[495, 315], [541, 315]], from: 'v101-sec', to: 'p101-sec' },
      { id: 'sec-riser', stream: 'culture', pts: [[569, 315], [590, 315], [590, 250]], from: 'p101-sec', to: 'v101-sec', arrow: true, endLabel: 'TO FACE A' },
      { id: 'sec-crossover', stream: 'crossover', pts: [[sx(blockInsetW) + 4, 250], [sx(blockInsetW) + 4, 350], [655, 350], [655, 250]], from: 'v101-sec', to: 'v101-sec', endLabel: 'A → B' },
    ],
    instruments: [
      { tag: 'LSLL-502', x: 450, y: 400, leaderTo: [450, sy(env.hMm - 40)], tip: 'Level switch low-low in the drip tray: a leak trips P-101 whatever the controller thinks.' },
    ],
    dims: [
      { id: 's-height', from: [686, sy(0)], to: [686, sy(env.hMm)], text: `${env.hMm}` },
      { id: 's-plinth-h', from: [416, sy(env.hMm - plinth.hMm)], to: [416, sy(env.hMm)], text: `${plinth.hMm}` },
      { id: 's-width', from: [sx(blockInsetW), sy(0) - 8], to: [sx(blockInsetW + env.wMm), sy(0) - 8], text: `${env.wMm}` },
    ],
    notes: [
      { id: 's-n1', x: 414, y: 424, text: 'A–A LOOKS AT FACE B; FACE A IS BEHIND THE CUT' },
      { id: 's-n2', x: 414, y: 432, text: 'CROSSOVER RUNS IN THE PLINTH HEAD, BOTH RAILS' },
    ],
  };

  const datasheet: DatasheetBlock = {
    title: 'DATASHEET · KEY PARAMETERS · BASIS PRINTED WITH EVERY NUMBER',
    rows: [
      ds(spec, 'geom.envelope-w', 'Envelope W'),
      ds(spec, 'geom.envelope-h', 'Envelope H'),
      ds(spec, 'geom.envelope-d', 'Envelope D'),
      ds(spec, 'geom.mass', 'Mass, filled'),
      ds(spec, 'venue.footprint', 'Footprint'),
      ds(spec, 'venue.floor', 'Floor loading'),
      ds(spec, 'hyd.culture-total', 'Culture volume'),
      ds(spec, 'hyd.loop-time', 'Loop time'),
      ds(spec, 'ec.array-power', 'MFC array power'),
      ds(spec, 'light.backlight-total', 'Backlight load'),
      ds(spec, 'venue.power', 'Power draw'),
      ds(spec, 'hyd.refresh', 'Culture refresh'),
    ],
  };

  return {
    id: 'venue-plan',
    subject: 'venue',
    sheet: { width: 1000, height: 700 },
    caption: 'sheet 4 · venue plan · footprint, clearances, plinth section and the printed datasheet',
    title: {
      org: 'MICROSEASONS — 七十二候',
      title: 'Freestanding calendar — venue plan, plinth section & datasheet',
      drawing: 'MS-CAL-004',
      rev: 'A',
      sheet: 4,
      of: 4,
      status: 'CONCEPT',
      scale: `PLAN 1:${Math.round(1 / PLAN_K)} · SECTION 1:${Math.round(1 / SEC_K)} · DIMS mm`,
      drawn: 'microseasons-digital-twin · buildVenuePlan',
    },
    views: [plan, section],
    datasheet,
    states: [
      {
        id: 'viewing',
        label: 'Viewing',
        band: '1500 mm',
        description: 'Public hours: both viewing zones clear, culture circulating through face A, over the crossover and down face B.',
        streams: ['viewing', 'culture', 'crossover'],
      },
      {
        id: 'service',
        label: 'Service',
        band: '900 mm',
        description: 'Plinth doors open at both ends: reservoir, pump and drip tray reachable without moving the piece.',
        streams: ['service', 'culture'],
        stamp: 'SERVICE — DOORS OPEN',
      },
      {
        id: 'install',
        label: 'Install',
        band: 'dry',
        description: 'Delivery and set-out: plinth placed and levelled, panel block landed, loop still empty.',
        streams: [],
        stamp: 'INSTALL — LOOP EMPTY',
      },
    ],
    defaultState: 'viewing',
    notes: [
      `NOTES · 1. THE PIECE IS DOUBLE-SIDED AND FREESTANDING — IT CANNOT GO AGAINST A WALL. 2. CLEARANCES ARE ${VIEWING_CLEARANCE_MM} mm VIEWING EACH FACE AND ${SERVICE_CLEARANCE_MM} mm SERVICE EACH END.`,
      '3. THE PLINTH IS THE ONLY THING TOUCHING THE FLOOR; LEVEL IT BEFORE THE PANEL BLOCK LANDS. 4. ONE 230 V SOCKET; EVERYTHING ABOVE THE PLINTH IS SELV 12 V.',
      '5. EVERY NUMBER ON THIS SHEET CARRIES ITS BASIS. NOTHING HAS BEEN MEASURED — THE STAMP SAYS CONCEPT FOR THAT REASON.',
    ],
  };
}
