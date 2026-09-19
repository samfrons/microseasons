/**
 * Linters for the two sheet kinds. Every message says what to fix. A
 * shipped sheet returns zero errors AND zero warnings — the tests enforce
 * that for every registered sheet.
 */
import type { CalendarTwinSpec, Equipment, PidSpec, Pt } from './spec';
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

export function lintCalendarTwin(spec: CalendarTwinSpec): LintResult {
  const problems: LintProblem[] = [];
  const err = (code: string, message: string, at?: string) =>
    problems.push({ severity: 'error', code, message, at });
  const warn = (code: string, message: string, at?: string) =>
    problems.push({ severity: 'warning', code, message, at });

  const { cols, rows } = spec.grid;
  const want = cols * rows;
  if (spec.panels.length !== want)
    err('panel-count', `grid is ${cols}×${rows} = ${want} panels but ${spec.panels.length} were given`);
  if (want !== 72) warn('not-72', `a microseasons wall has 72 panels; this grid has ${want}`);

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
    if (p.row < 0 || p.row >= rows || p.col < 0 || p.col >= cols)
      err('off-grid', `panel ${p.id} at row ${p.row} col ${p.col} is outside ${cols}×${rows}`, p.id);
    const cell = `${p.row},${p.col}`;
    if (cells.has(cell)) err('cell-collision', `two panels at row ${p.row} col ${p.col}`, p.id);
    cells.add(cell);
    const expectRow = Math.floor((p.n - 1) / cols);
    const expectCol = (p.n - 1) % cols;
    if (p.row !== expectRow || p.col !== expectCol)
      err('reading-order', `panel #${p.n} must sit at row ${expectRow} col ${expectCol} (row-major)`, p.id);
    const d = spanDays(p.start, p.end);
    if (d !== p.days) err('day-count', `panel ${p.id} spans ${d} days but declares ${p.days} LEDs`, p.id);
    if (p.days < 4 || p.days > 7) warn('odd-span', `panel ${p.id} spans ${p.days} days; a kō is 4–7`, p.id);
    if (!/^#[0-9a-f]{6}$/i.test(p.tint)) err('bad-tint', `panel ${p.id} tint ${p.tint} is not a hex colour`, p.id);
    /* serpentine continuity: even rows flow left→right, odd rows right→left */
    const ltr = p.row % 2 === 0;
    const wantIn = ltr ? 'left' : 'right';
    const wantOut = ltr ? 'right' : 'left';
    if (p.ports.in !== wantIn || p.ports.out !== wantOut)
      err('serpentine', `panel ${p.id} on row ${p.row} must flow ${wantIn}→${wantOut}`, p.id);
  }
  /* the sheet must hold the wall */
  const [ox, oy] = spec.origin;
  const wallW = cols * (spec.panel.w + spec.panel.gap);
  const wallH = rows * (spec.panel.h + spec.panel.gap);
  if (ox + wallW > spec.sheet.width || oy + wallH > spec.sheet.height)
    err('wall-overruns-sheet', `wall ends at (${ox + wallW}, ${oy + wallH}) but sheet is ${spec.sheet.width}×${spec.sheet.height}`);

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
  lintTitle(spec.title, problems);
  return finish(problems);
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
