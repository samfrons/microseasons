/**
 * ISA-5.1 tag tables — the subset a bioreactor calendar needs. Human
 * version: `.claude/skills/microseasons-digital-twin/reference/isa-5.1-bioreactor-calendar.md`.
 * If they disagree, this file wins.
 */

/** First letter — what is measured. */
export const MEASURED_VARIABLE: Record<string, string> = {
  A: 'analysis (pH, DO, OD, lux — say which in the tip)',
  E: 'voltage',
  I: 'current',
  J: 'power',
  F: 'flow',
  L: 'level',
  P: 'pressure',
  T: 'temperature',
  Q: 'totaliser',
  S: 'speed',
  U: 'multivariable',
  X: 'unclassified (on/off valves XV-…)',
  H: 'hand',
  K: 'time / schedule',
};

/** Succeeding letters — what it does. */
export const FUNCTION_LETTER: Record<string, string> = {
  E: 'primary element',
  T: 'transmitter',
  I: 'indicator',
  R: 'recorder',
  C: 'controller',
  S: 'switch',
  A: 'alarm',
  Y: 'relay / compute',
  V: 'valve',
  G: 'glass / gauge',
  H: 'high',
  L: 'low',
};

/** Equipment tag prefixes. */
export const EQUIPMENT_PREFIX: Record<string, string> = {
  R: 'reactor / cell / panel',
  X: 'membrane / separator',
  V: 'vessel / reservoir',
  P: 'pump',
  L: 'load / LED array',
  PS: 'power supply',
  DC: 'DC-DC converter',
  B: 'storage (supercap / battery)',
  SW: 'switch / relay',
  F: 'filter',
  S: 'sampling point',
  U: 'controller cabinet',
  A: 'panel array',
};

export const INSTRUMENT_TAG = /^([A-Z]{2,4})-(\d{3})$/;
export const EQUIPMENT_TAG = /^([A-Z]{1,2})-(\d{3})([A-Z])?$/;

export interface ParsedInstrumentTag {
  letters: string;
  loop: number;
  measured: string;
  functions: string[];
}

export function parseInstrumentTag(tag: string): ParsedInstrumentTag | null {
  const m = INSTRUMENT_TAG.exec(tag);
  if (!m) return null;
  const letters = m[1];
  const first = letters[0];
  if (!MEASURED_VARIABLE[first]) return null;
  const rest = letters.slice(1).split('');
  if (rest.some((l) => !FUNCTION_LETTER[l])) return null;
  return { letters, loop: Number(m[2]), measured: first, functions: rest };
}

export function validateInstrumentTag(tag: string): string | null {
  if (!INSTRUMENT_TAG.test(tag)) return `"${tag}" is not <LETTERS>-<3 digits>`;
  const parsed = parseInstrumentTag(tag);
  if (!parsed) return `"${tag}" uses a letter outside the ISA-5.1 tables`;
  return null;
}

export function describeInstrumentTag(tag: string): string {
  const p = parseInstrumentTag(tag);
  if (!p) return tag;
  const fn = p.functions.map((f) => FUNCTION_LETTER[f]).join(' ');
  return `${MEASURED_VARIABLE[p.measured]} ${fn} · loop ${p.loop}`;
}

export function validateEquipmentTag(tag: string): string | null {
  const m = EQUIPMENT_TAG.exec(tag);
  if (!m) return `"${tag}" is not <PREFIX>-<3 digits>[suffix]`;
  if (!EQUIPMENT_PREFIX[m[1]]) return `"${tag}" prefix ${m[1]} is not in the equipment table`;
  return null;
}
