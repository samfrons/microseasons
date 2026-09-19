/**
 * Linters for the two sheet kinds. Every message says what to fix. A
 * shipped sheet returns zero errors AND zero warnings — the tests enforce
 * that for every registered sheet.
 */
import { ENG_BASES, engNumber, findParameter } from './spec';
import type { CalendarTwinSpec, Equipment, PidSpec, Pt, VenuePlanSpec } from './spec';
import { validateEquipmentTag, validateInstrumentTag, parseInstrumentTag } from './tags';

export type Severity = 'error' | 'warning';

export interface LintProblem {
  severity: Severity;
  code: string;
  message: string;
  at?: string;
}

export interface LintResult {
  ok: boolean;
  errors: LintProblem[];
  warnings: LintProblem[];
  problems: LintProblem[];
}

function finish(problems: LintProblem[]): LintResult {
  const errors = problems.filter((p) => p.severity === 'error');
  const warnings = problems.filter((p) => p.severity === 'warning');
  return { ok: errors.length === 0, errors, warnings, problems };
}

export function formatLint(r: LintResult): string {
  if (r.problems.length === 0) return 'clean';
  return r.problems
    .map((p) => `${p.severity.toUpperCase()} ${p.code}${p.at ? ` @ ${p.at}` : ''}: ${p.message}`)
    .join('\n');
}

/* ------------------------------------------------------------------ *
 * Calendar wall
 * ------------------------------------------------------------------ */

const DAYS_IN_MONTH = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

/** Day-of-year on a leap calendar (the microseason table has no year). */
export function dayOfYear(month: number, day: number): number {
  let n = day;
  for (let m = 1; m < month; m++) n += DAYS_IN_MONTH[m - 1];
  return n;
}

export function spanDays(start: { month: number; day: number }, end: { month: number; day: number }): number {
  const a = dayOfYear(start.month, start.day);
  const b = dayOfYear(end.month, end.day);
  return b >= a ? b - a + 1 : 366 - a + b + 1;
}

/**
 * The monolith: two faces of 6 × 6 landscape panels, reading order running
 * through face A then continuing on face B, a serpentine that crosses at
 * the base, an envelope that agrees with the panel size and the plinth, and
 * a parameters layer where every row states its basis.
 */
export function lintCalendarTwin(spec: CalendarTwinSpec): LintResult {
  const problems: LintProblem[] = [];
  const err = (code: string, message: string, at?: string) =>
    problems.push({ severity: 'error', code, message, at });
  const warn = (code: string, message: string, at?: string) =>
    problems.push({ severity: 'warning', code, message, at });

  const { cols, rows } = spec.grid;
  const perFace = cols * rows;
  const faces = spec.faces ?? [];
  if (spec.form !== 'freestanding')
    err('form', `the calendar is a freestanding monolith; form reads "${String(spec.form)}"`);
  if (faces.length !== 2) err('face-count', `a double-sided monolith has 2 faces; ${faces.length} declared`);
  const want = perFace * faces.length;
  if (spec.panels.length !== want)
    err('panel-count', `${faces.length} faces of ${cols}×${rows} = ${want} panels but ${spec.panels.length} were given`);
  if (want !== 72) warn('not-72', `a microseasons calendar has 72 panels; this one has ${want}`);

  const faceById = new Map(faces.map((f) => [f.id, f]));
  const seenFaceIds = new Set<string>();
  for (const f of faces) {
    if (seenFaceIds.has(f.id)) err('dup-face', `face ${f.id} declared twice`, f.id);
    seenFaceIds.add(f.id);
    if (f.cols !== cols || f.rows !== rows)
      err('face-grid', `face ${f.id} is ${f.cols}×${f.rows} but the sheet grid is ${cols}×${rows}`, f.id);
    if (f.to - f.from + 1 !== perFace)
      err('face-span', `face ${f.id} claims panels ${f.from}–${f.to}; a ${cols}×${rows} face holds ${perFace}`, f.id);
    const on = spec.panels.filter((p) => p.face === f.id);
    if (on.length !== perFace) err('face-panel-count', `face ${f.id} carries ${on.length} panels, not ${perFace}`, f.id);
    for (const p of on) {
      if (p.n < f.from || p.n > f.to)
        err('face-range', `panel #${p.n} sits on face ${f.id} which carries ${f.from}–${f.to}`, p.id);
      if (!f.seasons.includes(p.season))
        err('face-season', `panel ${p.id} is ${p.season} but face ${f.id} carries ${f.seasons.join(' + ')}`, p.id);
    }
    /* the face must hold its own grid on the sheet */
    const [ox, oy] = f.origin;
    const fw = cols * (spec.panel.w + spec.panel.gap);
    const fh = rows * (spec.panel.h + spec.panel.gap);
    if (ox < 16 || oy < 0 || ox + fw > spec.sheet.width || oy + fh > spec.sheet.height)
      err('face-overruns-sheet', `face ${f.id} spans (${ox}, ${oy})–(${ox + fw}, ${oy + fh}) on a ${spec.sheet.width}×${spec.sheet.height} sheet (the bus rail needs 16 units to the left)`, f.id);
  }
  /* the two faces must not sit on top of each other */
  for (let i = 1; i < faces.length; i++) {
    const a = faces[i - 1];
    const b = faces[i];
    const ah = rows * (spec.panel.h + spec.panel.gap);
    if (b.origin[1] < a.origin[1] + ah)
      err('faces-overlap', `face ${b.id} starts at y ${b.origin[1]}, inside face ${a.id} which ends at ${a.origin[1] + ah}`, b.id);
  }
  /* every season on exactly one face */
  const seasonFace = new Map<string, string>();
  for (const f of faces)
    for (const s of f.seasons) {
      const owner = seasonFace.get(s);
      if (owner && owner !== f.id) err('season-split', `${s} appears on face ${owner} and face ${f.id}`, f.id);
      seasonFace.set(s, f.id);
    }
  for (const s of ['spring', 'summer', 'autumn', 'winter'])
    if (faces.length && !seasonFace.has(s)) err('season-missing', `no face carries ${s}`);

  const ids = new Set<string>();
  const tags = new Set<string>();
  const ms = new Set<number>();
  const cells = new Set<string>();
  for (const p of spec.panels) {
    if (ids.has(p.id)) err('dup-id', `panel id ${p.id} used twice`, p.id);
    ids.add(p.id);
    if (tags.has(p.tag)) err('dup-tag', `tag ${p.tag} used twice`, p.id);
    tags.add(p.tag);
    const bad = validateEquipmentTag(p.tag);
    if (bad) err('bad-tag', bad, p.id);
    if (!p.tag.startsWith('R-')) err('panel-not-reactor', `panel ${p.id} tag must be R-xxx (it is a reactor)`, p.id);
    if (ms.has(p.microseasonId)) err('dup-microseason', `microseason ${p.microseasonId} mapped twice`, p.id);
    ms.add(p.microseasonId);
    if (!faceById.has(p.face)) err('unknown-face', `panel ${p.id} is on face ${p.face}, which the sheet does not declare`, p.id);
    if (p.row < 0 || p.row >= rows || p.col < 0 || p.col >= cols)
      err('off-grid', `panel ${p.id} at row ${p.row} col ${p.col} is outside ${cols}×${rows}`, p.id);
    const cell = `${p.face},${p.row},${p.col}`;
    if (cells.has(cell)) err('cell-collision', `two panels at face ${p.face} row ${p.row} col ${p.col}`, p.id);
    cells.add(cell);
    const f = faceById.get(p.face);
    const onFace = f ? p.n - f.from : (p.n - 1) % perFace;
    const expectRow = Math.floor(onFace / cols);
    const expectCol = onFace % cols;
    if (p.row !== expectRow || p.col !== expectCol)
      err('reading-order', `panel #${p.n} must sit at face ${p.face} row ${expectRow} col ${expectCol} (row-major within its face)`, p.id);
    const d = spanDays(p.start, p.end);
    if (d !== p.days) err('day-count', `panel ${p.id} spans ${d} days but declares ${p.days} LEDs`, p.id);
    if (p.days < 4 || p.days > 7) warn('odd-span', `panel ${p.id} spans ${p.days} days; a kō is 4–7`, p.id);
    if (!/^#[0-9a-f]{6}$/i.test(p.tint)) err('bad-tint', `panel ${p.id} tint ${p.tint} is not a hex colour`, p.id);
    /* serpentine continuity: even rows of a face flow left→right, odd rows right→left */
    const ltr = p.row % 2 === 0;
    const wantIn = ltr ? 'left' : 'right';
    const wantOut = ltr ? 'right' : 'left';
    if (p.ports.in !== wantIn || p.ports.out !== wantOut)
      err('serpentine', `panel ${p.id} on face ${p.face} row ${p.row} must flow ${wantIn}→${wantOut}`, p.id);
  }

  /* the crossover: the last panel of one face hands the culture to the
     first panel of the next on the SAME side, or the run has a kink the
     plinth cannot take */
  const byN = new Map(spec.panels.map((p) => [p.n, p]));
  for (let i = 1; i < faces.length; i++) {
    const last = byN.get(faces[i - 1].to);
    const first = byN.get(faces[i].from);
    if (!last || !first) {
      err('crossover-missing', `no panel at the ${faces[i - 1].id}→${faces[i].id} crossover (#${faces[i - 1].to} → #${faces[i].from})`);
      continue;
    }
    if (last.ports.out !== first.ports.in)
      err('crossover', `culture leaves ${last.id} on the ${last.ports.out} and enters ${first.id} on the ${first.ports.in}; the crossover runs straight through the plinth head`, first.id);
  }
  if (spec.hydraulics.crossover?.at !== 'base' && spec.hydraulics.crossover?.at !== 'head')
    err('crossover-where', 'hydraulics.crossover.at must say where the serpentine crosses faces');

  /* envelope arithmetic */
  const { mm } = spec.panel;
  const wantW = cols * mm.w + (cols - 1) * spec.frame.gapMm + 2 * spec.frame.sectionMm;
  const wantBlockH = rows * mm.h + (rows - 1) * spec.frame.gapMm + 2 * spec.frame.sectionMm;
  if (spec.envelope.wMm !== wantW)
    err('envelope-w', `envelope width ${spec.envelope.wMm} mm ≠ ${cols} × ${mm.w} + ${cols - 1} × ${spec.frame.gapMm} + 2 × ${spec.frame.sectionMm} = ${wantW} mm`);
  if (spec.envelope.hMm !== wantBlockH + spec.plinth.hMm)
    err('envelope-h', `envelope height ${spec.envelope.hMm} mm ≠ panel block ${wantBlockH} + plinth ${spec.plinth.hMm} = ${wantBlockH + spec.plinth.hMm} mm`);
  if (spec.envelope.dMm < 2 * mm.d)
    err('envelope-d', `envelope depth ${spec.envelope.dMm} mm cannot hold two faces of ${mm.d} mm panels back to back`);
  if (spec.plinth.wMm < spec.envelope.wMm)
    warn('plinth-narrow', `plinth ${spec.plinth.wMm} mm is narrower than the panel block ${spec.envelope.wMm} mm; the piece overhangs its base`);
  if (mm.w <= mm.h) warn('not-landscape', `panels are ${mm.w} × ${mm.h} mm; the form calls for landscape rectangles`);

  if (spec.states.length === 0) err('no-states', 'a sheet needs at least one state');
  const stateIds = new Set<string>();
  for (const s of spec.states) {
    if (stateIds.has(s.id)) err('dup-state', `state ${s.id} defined twice`, s.id);
    stateIds.add(s.id);
    for (const pid of s.litPanels)
      if (!ids.has(pid)) err('state-unknown-panel', `state ${s.id} lights unknown panel ${pid}`, s.id);
    if (s.rule && !spec.logic?.rules.some((r) => r.id === s.rule))
      err('state-unknown-rule', `state ${s.id} highlights rule ${s.rule} which the logic block lacks`, s.id);
    if (s.litDay !== undefined && s.litDay < 0) err('bad-lit-day', `state ${s.id} litDay must be ≥ 0`, s.id);
  }
  if (spec.defaultState && !stateIds.has(spec.defaultState))
    err('bad-default-state', `defaultState ${spec.defaultState} is not a state`);
  for (const r of spec.logic?.rules ?? [])
    if (r.text.length > 44) warn('rule-long', `rule ${r.id} is ${r.text.length} chars; keep ≤ 44 so it fits the block`, r.id);
  lintParameters(spec, problems);
  lintTitle(spec.title, problems);
  return finish(problems);
}

/**
 * The parameters layer. Two things matter: EVERY row states a basis (an
 * assumed number must never read as measured), and the geometry rows agree
 * with the spec they claim to describe — a datasheet that drifts from the
 * drawing is worse than no datasheet.
 */
export function lintParameters(spec: CalendarTwinSpec, problems: LintProblem[]): void {
  const err = (code: string, message: string, at?: string) =>
    problems.push({ severity: 'error', code, message, at });
  const warn = (code: string, message: string, at?: string) =>
    problems.push({ severity: 'warning', code, message, at });

  const sections = spec.parameters ?? [];
  if (sections.length === 0) {
    err('no-parameters', 'the installation spec needs a parameters section');
    return;
  }
  const seenSections = new Set<string>();
  const seen = new Set<string>();
  for (const s of sections) {
    if (seenSections.has(s.id)) err('dup-parameter-section', `parameter section ${s.id} declared twice`, s.id);
    seenSections.add(s.id);
    if (s.rows.length === 0) warn('empty-parameter-section', `section ${s.id} has no rows`, s.id);
    for (const r of s.rows) {
      if (seen.has(r.id)) err('dup-parameter', `parameter ${r.id} defined twice`, r.id);
      seen.add(r.id);
      if (!r.v || !r.v.basis) err('no-basis', `parameter ${r.id} has no basis; every number says where it came from`, r.id);
      else if (!ENG_BASES.includes(r.v.basis)) err('bad-basis', `parameter ${r.id} has basis "${r.v.basis}"; use one of ${ENG_BASES.join(' / ')}`, r.id);
      else if (r.v.basis === 'measured') warn('measured-claim', `parameter ${r.id} claims a MEASURED basis; nothing has been built`, r.id);
      else if (r.v.basis === 'assumed' && !r.v.note) warn('assumed-no-note', `assumed parameter ${r.id} needs a note saying what it rests on`, r.id);
      if (!r.v || String(r.v.value).trim() === '') err('empty-parameter', `parameter ${r.id} has no value`, r.id);
      if (!r.label) err('unlabelled-parameter', `parameter ${r.id} has no label`, r.id);
      if (!r.id.includes('.')) warn('parameter-id-shape', `parameter ${r.id} should read <section>.<name>`, r.id);
    }
  }

  /* the geometry rows must agree with the built spec */
  const num = (id: string): number | null => {
    const row = findParameter(sections, id);
    if (!row) {
      err('missing-parameter', `the sheet needs parameter ${id}`, id);
      return null;
    }
    return engNumber(row.v);
  };
  const agree = (id: string, expect: number, what: string) => {
    const got = num(id);
    if (got === null) return;
    if (Math.abs(got - expect) > Math.max(0.01, Math.abs(expect) * 0.005))
      err('parameter-disagrees', `${id} says ${got} but ${what} is ${expect}`, id);
  };
  agree('geom.panel-w', spec.panel.mm.w, 'the panel width on the drawing');
  agree('geom.panel-h', spec.panel.mm.h, 'the panel height on the drawing');
  agree('geom.panel-d', spec.panel.mm.d, 'the panel depth on the drawing');
  agree('geom.panel-count', spec.panels.length, 'the number of panels built');
  agree('geom.gap', spec.frame.gapMm, 'the gap in the spec');
  agree('geom.frame-section', spec.frame.sectionMm, 'the frame section in the spec');
  agree('geom.envelope-w', spec.envelope.wMm, 'the computed envelope width');
  agree('geom.envelope-h', spec.envelope.hMm, 'the computed envelope height');
  agree('geom.envelope-d', spec.envelope.dMm, 'the computed envelope depth');
  agree('geom.plinth-w', spec.plinth.wMm, 'the plinth width');
  agree('geom.plinth-d', spec.plinth.dMm, 'the plinth depth');
  agree('geom.plinth-h', spec.plinth.hMm, 'the plinth height');
  agree('hyd.flow', spec.hydraulics.flowMlMin, 'the design flow');
  agree('hyd.reservoir', spec.hydraulics.reservoirL, 'the reservoir on the drawing');
  agree('hyd.tubing-id', spec.hydraulics.tubingIdMm, 'the tubing bore on the drawing');
  agree('ec.cell-voltage', spec.electrical.cellVoltageV, 'the cell voltage on the drawing');
  agree('ec.bus-voltage', spec.electrical.busVoltageV, 'the bus voltage on the drawing');
  agree('light.backlight-per-panel', spec.electrical.ledWattsPerPanel, 'the backlight on the drawing');

  /* and the totals must be the per-panel figure times the panel count */
  const perPanel = num('hyd.culture-per-panel');
  const total = num('hyd.culture-total');
  if (perPanel !== null && total !== null && Math.abs(total - perPanel * spec.panels.length) > 0.01)
    err('parameter-total', `hyd.culture-total is ${total} L but ${perPanel} L × ${spec.panels.length} panels = ${+(perPanel * spec.panels.length).toFixed(2)} L`, 'hyd.culture-total');
  const ledPer = num('light.backlight-per-panel');
  const ledTotal = num('light.backlight-total');
  if (ledPer !== null && ledTotal !== null && Math.abs(ledTotal - ledPer * spec.panels.length) > 0.05)
    err('parameter-total', `light.backlight-total is ${ledTotal} W but ${ledPer} W × ${spec.panels.length} panels = ${+(ledPer * spec.panels.length).toFixed(1)} W`, 'light.backlight-total');
  const residence = num('hyd.residence');
  const loop = num('hyd.loop-time');
  if (residence !== null && loop !== null && Math.abs(loop - (residence * spec.panels.length) / 60) > 0.1)
    err('parameter-total', `hyd.loop-time is ${loop} h but ${residence} min × ${spec.panels.length} panels = ${+((residence * spec.panels.length) / 60).toFixed(1)} h`, 'hyd.loop-time');
}

/* ------------------------------------------------------------------ *
 * P&ID
 * ------------------------------------------------------------------ */

const UNTAGGED_OK = new Set<Equipment['kind']>(['source', 'sink', 'electrode', 'sample']);
/** measured-variable letters that own a loop number (one loop = one measurement) */
const LOOP_OWNERS = new Set(['A', 'E', 'I', 'J', 'F', 'L', 'P', 'T', 'Q', 'S']);

function lintTitle(t: PidSpec['title'], problems: LintProblem[]) {
  if (!t.drawing) problems.push({ severity: 'error', code: 'title-no-drawing', message: 'title block needs a drawing number' });
  if (t.sheet > t.of) problems.push({ severity: 'error', code: 'title-sheet', message: `sheet ${t.sheet} of ${t.of} is impossible` });
  if (t.status === 'AS-BUILT')
    problems.push({ severity: 'warning', code: 'as-built', message: 'nothing has been built — keep the CONCEPT stamp' });
}

const BUBBLE_R = 12;
const BALLOON_R = 8;

function tooClose(a: Pt, b: Pt, min: number) {
  return Math.hypot(a[0] - b[0], a[1] - b[1]) < min;
}

export function lintPid(spec: PidSpec): LintResult {
  const problems: LintProblem[] = [];
  const err = (code: string, message: string, at?: string) =>
    problems.push({ severity: 'error', code, message, at });
  const warn = (code: string, message: string, at?: string) =>
    problems.push({ severity: 'warning', code, message, at });

  const { width, height } = spec.sheet;
  const inSheet = (p: Pt) => p[0] >= 0 && p[0] <= width && p[1] >= 0 && p[1] <= height;

  const ids = new Set<string>();
  const tags = new Set<string>();
  for (const e of spec.equipment) {
    if (ids.has(e.id)) err('dup-id', `equipment id ${e.id} used twice`, e.id);
    ids.add(e.id);
    if (!inSheet([e.x, e.y])) err('off-sheet', `${e.id} at (${e.x}, ${e.y}) is outside the sheet`, e.id);
    if (e.tag) {
      if (tags.has(e.tag)) err('dup-tag', `tag ${e.tag} used twice`, e.id);
      tags.add(e.tag);
      if (e.kind === 'valve') {
        /* a valve is a final control element: it takes an ISA loop tag (XV-101, FV-104) */
        const bad = validateInstrumentTag(e.tag);
        if (bad) err('bad-tag', bad, e.id);
      } else {
        const bad = validateEquipmentTag(e.tag);
        if (bad) err('bad-tag', bad, e.id);
      }
      if (e.kind === 'valve' && !/^[A-Z]+V-\d{3}$/.test(e.tag))
        err('valve-tag', `valve ${e.id} takes an ISA tag ending in V (XV-101); ${e.tag} reads as a vessel`, e.id);
      if (e.kind !== 'valve' && /^[A-Z]V-\d{3}$/.test(e.tag))
        err('vessel-tag-on-valve-letters', `${e.tag} is a valve tag but ${e.id} is a ${e.kind}`, e.id);
    } else if (!UNTAGGED_OK.has(e.kind)) {
      err('untagged', `${e.kind} ${e.id} is purchasable and needs a tag`, e.id);
    }
    if (e.kind === 'valve' && e.actuated && !e.fail)
      err('valve-no-fail', `actuated valve ${e.tag ?? e.id} must state FC or FO`, e.id);
    if (e.kind === 'electrode' && !e.polarity) err('electrode-no-polarity', `electrode ${e.id} needs anode/cathode`, e.id);
  }

  const streams = new Set<string>();
  for (const l of spec.lines) {
    streams.add(l.stream);
    if (l.pts.length < 2) err('line-short', `line ${l.id} needs ≥ 2 points`, l.id);
    for (const p of l.pts) if (!inSheet(p)) err('off-sheet', `line ${l.id} leaves the sheet at (${p[0]}, ${p[1]})`, l.id);
    for (let i = 1; i < l.pts.length; i++) {
      const [a, b] = [l.pts[i - 1], l.pts[i]];
      if (a[0] !== b[0] && a[1] !== b[1]) warn('diagonal', `line ${l.id} has a diagonal segment; route orthogonally`, l.id);
    }
    if (l.from && !ids.has(l.from)) err('line-from-unknown', `line ${l.id} from unknown equipment ${l.from}`, l.id);
    if (l.to && !ids.has(l.to)) err('line-to-unknown', `line ${l.id} to unknown equipment ${l.to}`, l.id);
    if (!l.from && !l.to) warn('unconnected', `line ${l.id} names neither from nor to; continuity cannot be checked`, l.id);
  }

  const instTags = new Set<string>();
  const loops = new Map<number, string>();
  const bubbles: Pt[] = [];
  for (const i of spec.instruments) {
    const bad = validateInstrumentTag(i.tag);
    if (bad) err('bad-instrument-tag', bad, i.tag);
    if (instTags.has(i.tag)) err('dup-instrument', `instrument ${i.tag} used twice`, i.tag);
    instTags.add(i.tag);
    if (!inSheet([i.x, i.y])) err('off-sheet', `${i.tag} is outside the sheet`, i.tag);
    const parsed = parseInstrumentTag(i.tag);
    if (parsed && LOOP_OWNERS.has(parsed.measured)) {
      const owner = loops.get(parsed.loop);
      if (owner && owner !== i.tag)
        err('loop-shared', `${i.tag} and ${owner} share loop ${parsed.loop}; one loop is one measurement`, i.tag);
      loops.set(parsed.loop, i.tag);
    }
    const isController = i.mount === 'dcs' || (parsed && /[CY]/.test(parsed.letters.slice(1)));
    if (!i.leaderTo && !isController)
      warn('instrument-no-leader', `${i.tag} has no leader to the process; controllers are exempt`, i.tag);
    for (const b of bubbles)
      if (tooClose(b, [i.x, i.y], BUBBLE_R * 2 + 4)) warn('crowded', `${i.tag} overlaps another bubble; move it`, i.tag);
    bubbles.push([i.x, i.y]);
  }

  for (const s of spec.signals ?? []) {
    const known = (t: string) => instTags.has(t) || tags.has(t);
    if (!known(s.from)) err('signal-from-unknown', `signal from unknown tag ${s.from}`, s.from);
    if (!known(s.to)) err('signal-to-unknown', `signal to unknown tag ${s.to}`, s.to);
  }

  const partNs = new Set<number>();
  for (const p of spec.parts ?? []) {
    if (partNs.has(p.n)) err('dup-part', `part ${p.n} listed twice`);
    partNs.add(p.n);
    if (!ids.has(p.ref)) err('part-unknown-ref', `part ${p.n} refers to unknown equipment ${p.ref}`);
  }
  for (const c of spec.callouts ?? []) {
    if (!partNs.has(c.n)) err('callout-no-part', `callout ${c.n} has no parts-list row`);
    for (const b of bubbles)
      if (tooClose(b, [c.x, c.y], BUBBLE_R + BALLOON_R + 2)) warn('crowded', `balloon ${c.n} lands on an instrument bubble`, `#${c.n}`);
    if (!inSheet([c.x, c.y])) err('off-sheet', `callout ${c.n} is outside the sheet`);
  }

  for (const r of spec.logic?.rules ?? [])
    if (r.text.length > 44) warn('rule-long', `rule ${r.id} is ${r.text.length} chars; keep ≤ 44 so it fits the block`, r.id);

  if (spec.states.length === 0) err('no-states', 'a sheet needs at least one state');
  const stateIds = new Set<string>();
  const valveIds = new Set(spec.equipment.filter((e) => e.kind === 'valve' || e.kind === 'switch').map((e) => e.id));
  for (const s of spec.states) {
    if (stateIds.has(s.id)) err('dup-state', `state ${s.id} defined twice`, s.id);
    stateIds.add(s.id);
    for (const st of s.streams) if (!streams.has(st)) err('state-unknown-stream', `state ${s.id} lights stream ${st} which no line carries`, s.id);
    for (const v of s.valvesOpen ?? []) if (!valveIds.has(v)) err('state-unknown-valve', `state ${s.id} opens ${v}, not a valve/switch`, s.id);
    if (s.rule && !spec.logic?.rules.some((r) => r.id === s.rule)) err('state-unknown-rule', `state ${s.id} highlights unknown rule ${s.rule}`, s.id);
  }
  if (spec.defaultState && !stateIds.has(spec.defaultState)) err('bad-default-state', `defaultState ${spec.defaultState} is not a state`);
  lintTitle(spec.title, problems);
  return finish(problems);
}

/* ------------------------------------------------------------------ *
 * Venue plan (MS-CAL-004)
 * ------------------------------------------------------------------ */

/**
 * A plan sheet lints like any other: everything inside the sheet, every
 * view inside its frame, every shape inside its view, dimensions that say
 * something, and a datasheet where every row has a basis.
 */
export function lintVenuePlan(spec: VenuePlanSpec): LintResult {
  const problems: LintProblem[] = [];
  const err = (code: string, message: string, at?: string) =>
    problems.push({ severity: 'error', code, message, at });
  const warn = (code: string, message: string, at?: string) =>
    problems.push({ severity: 'warning', code, message, at });

  const { width, height } = spec.sheet;
  const inSheet = (p: Pt) => p[0] >= 0 && p[0] <= width && p[1] >= 0 && p[1] <= height;
  if (spec.views.length === 0) err('no-views', 'a plan sheet needs at least one view');

  const viewIds = new Set<string>();
  const streams = new Set<string>();
  for (const v of spec.views) {
    if (viewIds.has(v.id)) err('dup-view', `view ${v.id} declared twice`, v.id);
    viewIds.add(v.id);
    if (v.x < 0 || v.y < 0 || v.x + v.w > width || v.y + v.h > height)
      err('view-off-sheet', `view ${v.id} spans (${v.x}, ${v.y})–(${v.x + v.w}, ${v.y + v.h}) on a ${width}×${height} sheet`, v.id);
    if (!(v.unitsPerMm > 0)) err('view-scale', `view ${v.id} needs a positive unitsPerMm so a dimension can be checked`, v.id);
    const shapeIds = new Set<string>();
    for (const sh of v.shapes) {
      if (shapeIds.has(sh.id)) err('dup-shape', `shape ${sh.id} used twice in view ${v.id}`, sh.id);
      shapeIds.add(sh.id);
      if (sh.w <= 0 || sh.h <= 0) err('shape-empty', `shape ${sh.id} has no area`, sh.id);
      if (sh.x < v.x - 0.5 || sh.y < v.y - 0.5 || sh.x + sh.w > v.x + v.w + 0.5 || sh.y + sh.h > v.y + v.h + 0.5)
        err('shape-outside-view', `shape ${sh.id} leaves view ${v.id}; grow the view or move the shape`, sh.id);
      if (sh.stream) streams.add(sh.stream);
    }
    for (const d of v.dims ?? []) {
      if (!d.text.trim()) err('dim-no-text', `dimension ${d.id} in view ${v.id} says nothing`, d.id);
      if (!inSheet(d.from) || !inSheet(d.to)) err('dim-off-sheet', `dimension ${d.id} leaves the sheet`, d.id);
      if (d.from[0] !== d.to[0] && d.from[1] !== d.to[1])
        warn('dim-diagonal', `dimension ${d.id} is diagonal; dimension along one axis`, d.id);
    }
    for (const n of v.notes ?? []) if (!inSheet([n.x, n.y])) err('note-off-sheet', `note ${n.id} is outside the sheet`, n.id);
    for (const e of v.equipment ?? []) {
      if (!inSheet([e.x, e.y])) err('off-sheet', `${e.id} is outside the sheet`, e.id);
      if (e.tag) {
        const bad = e.kind === 'valve' ? validateInstrumentTag(e.tag) : validateEquipmentTag(e.tag);
        if (bad) err('bad-tag', bad, e.id);
      }
    }
    for (const l of v.lines ?? []) {
      streams.add(l.stream);
      if (l.pts.length < 2) err('line-short', `line ${l.id} needs ≥ 2 points`, l.id);
      for (const q of l.pts) if (!inSheet(q)) err('off-sheet', `line ${l.id} leaves the sheet`, l.id);
    }
    for (const i of v.instruments ?? []) {
      const bad = validateInstrumentTag(i.tag);
      if (bad) err('bad-instrument-tag', bad, i.tag);
      if (!inSheet([i.x, i.y])) err('off-sheet', `${i.tag} is outside the sheet`, i.tag);
    }
  }

  /* views must not sit on top of each other */
  for (let i = 0; i < spec.views.length; i++)
    for (let j = i + 1; j < spec.views.length; j++) {
      const a = spec.views[i];
      const b = spec.views[j];
      const overlap = a.x < b.x + b.w && b.x < a.x + a.w && a.y < b.y + b.h && b.y < a.y + a.h;
      if (overlap) err('views-overlap', `views ${a.id} and ${b.id} overlap; move one`, b.id);
    }

  if (!spec.datasheet || spec.datasheet.rows.length === 0) err('no-datasheet', 'MS-CAL-004 prints the key parameters; the datasheet is empty');
  else {
    if (spec.datasheet.rows.length > 14)
      warn('datasheet-long', `${spec.datasheet.rows.length} datasheet rows will not fit the block; keep it to ~12`);
    for (const r of spec.datasheet.rows) {
      if (!r.v?.basis) err('no-basis', `datasheet row "${r.label}" has no basis`, r.label);
      else if (!ENG_BASES.includes(r.v.basis)) err('bad-basis', `datasheet row "${r.label}" has basis "${r.v.basis}"`, r.label);
      else if (r.v.basis === 'measured') warn('measured-claim', `datasheet row "${r.label}" claims a MEASURED basis; nothing has been built`, r.label);
      if (!String(r.v?.value ?? '').trim()) err('empty-parameter', `datasheet row "${r.label}" has no value`, r.label);
    }
  }

  if (spec.states.length === 0) err('no-states', 'a sheet needs at least one state');
  const stateIds = new Set<string>();
  for (const s of spec.states) {
    if (stateIds.has(s.id)) err('dup-state', `state ${s.id} defined twice`, s.id);
    stateIds.add(s.id);
    for (const st of s.streams)
      if (!streams.has(st)) err('state-unknown-stream', `state ${s.id} lights stream ${st} which nothing on the sheet carries`, s.id);
    if (s.rule && !spec.logic?.rules.some((r) => r.id === s.rule)) err('state-unknown-rule', `state ${s.id} highlights unknown rule ${s.rule}`, s.id);
  }
  if (spec.defaultState && !stateIds.has(spec.defaultState)) err('bad-default-state', `defaultState ${spec.defaultState} is not a state`);
  for (const r of spec.logic?.rules ?? [])
    if (r.text.length > 44) warn('rule-long', `rule ${r.id} is ${r.text.length} chars; keep ≤ 44 so it fits the block`, r.id);
  lintTitle(spec.title, problems);
  return finish(problems);
}
