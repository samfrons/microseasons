/**
 * The BLUEPRINT plate the digital twin is drawn on — a Prussian-blue
 * engineering sheet with paper-white monoline ink, a faint drafting grid,
 * three lineweights and ONE warm accent for whatever is LIVE.
 *
 * Ported as behaviour (not files) from MESSAI's `@messai/pid-schematic`
 * plate so the calendar's engineering sheets read like the MESSAI lab's.
 * The hand-drawn cyan-on-navy HTML under `microseasons-cal/*.html` was the
 * reference sketch; it is superseded by these tokens — do not copy its
 * colours (cyan ink, red/blue polarity strokes) back in.
 *
 * The one deliberate difference from MESSAI: the calendar's algae chambers
 * ARE colour data (a living culture shifts through the year), so a chamber
 * may be tinted by season. Lines, labels and symbols stay ink-only.
 */
export const BLUEPRINT = {
  /** plate gradient, top → bottom */
  plateTop: '#16324A',
  plateBottom: '#0F2438',
  /** drafting grid line + border, paper-white at low alpha */
  grid: 'rgba(226,240,248,.05)',
  border: 'rgba(226,240,248,.4)',
  /** the ink every line and label is drawn in */
  ink: '#D7E7F2',
  /** brighter ink for tag text inside bubbles / balloons */
  hi: '#F4FAFE',
  /** dimmer ink for captions and eyebrows */
  muted: '#A9C6D8',
  /** opaque fill for bodies (vessels, cabinets) so lines behind them hide */
  body: 'rgba(7,20,34,.55)',
  /** fill for instrument bubbles + balloons */
  bubble: 'rgba(7,20,34,.7)',
  /** fill for the logic block and the title block */
  panel: 'rgba(7,20,34,.6)',
  /** the LIVE accent: the active stream, the open valve, the lit panel */
  live: '#F6A97F',
  /** the concept stamp (kraft label + oxblood ink) */
  stampPaper: '#E3D5B8',
  stampInk: '#5A1A0C',
  /** the timber frame of a calendar panel, drawn as a warm outline */
  timber: '#C9A66B',
} as const;

/**
 * The visual THEME of a sheet. `blueprint` is the Prussian-blue plate above;
 * `classic` is the traditional printed engineering drawing — white paper,
 * near-black ink, no drafting grid, and a strong blue for whatever is LIVE.
 */
export type TwinTheme = 'blueprint' | 'classic';

/** Every colour a symbol may reach for. Both palettes expose the same keys. */
export interface Palette {
  /** plate gradient, top → bottom */
  plateTop: string;
  plateBottom: string;
  /** drafting grid line (`transparent` = no grid) */
  grid: string;
  /** plate border (the CSS frame around the whole sheet) */
  border: string;
  /** the drawn sheet frame inside the SVG, and how solid it is */
  frame: string;
  frameOpacity: number;
  /** the ink every line and label is drawn in */
  ink: string;
  /** brighter ink for tag text inside bubbles / balloons */
  hi: string;
  /** dimmer ink for captions and eyebrows */
  muted: string;
  /** opaque fill for bodies (vessels, cabinets) so lines behind them hide */
  body: string;
  /** fill for instrument bubbles + balloons */
  bubble: string;
  /** fill for the logic block and the title block */
  panel: string;
  /** border of an unpressed state / theme chip */
  chipBorder: string;
  /** the LIVE accent: the active stream, the open valve, the lit panel */
  live: string;
  /** the concept stamp (kraft label + oxblood ink) */
  stampPaper: string;
  stampInk: string;
  /** the timber frame of a calendar panel, drawn as a warm outline */
  timber: string;
}

/**
 * The CLASSIC plate — a printed engineering drawing, not an inverted
 * blueprint: white paper, no drafting grid, near-black monoline ink, opaque
 * white bodies, and a strong blue (never red, never cyan) for LIVE. `muted`
 * is dark enough that the MIN_TEXT_OPACITY clamp still leaves a 6px label
 * well above 5:1 on white, and `timber` is a warm brown that reads on paper
 * instead of the pale tan that only works on the blue plate.
 */
export const CLASSIC: Palette = {
  plateTop: '#FFFFFF',
  plateBottom: '#FFFFFF',
  /* real printed drawings have no drafting grid */
  grid: 'transparent',
  border: '#111827',
  frame: '#111827',
  frameOpacity: 1,
  ink: '#111827',
  /* on white paper the bright ink IS the ink — one black, printed once */
  hi: '#111827',
  muted: '#374151',
  body: '#FFFFFF',
  bubble: '#FFFFFF',
  panel: '#FFFFFF',
  chipBorder: '#9CA3AF',
  live: '#1D4ED8',
  stampPaper: '#E3D5B8',
  stampInk: '#5A1A0C',
  timber: '#8B6A3E',
};

/** Palette by theme id. `blueprint` is the default everywhere. */
export const PALETTES: Record<TwinTheme, Palette> = {
  blueprint: {
    ...BLUEPRINT,
    frame: BLUEPRINT.ink,
    frameOpacity: 0.5,
    panel: 'rgba(7,20,34,.6)',
    chipBorder: 'rgba(226,240,248,.45)',
  },
  classic: CLASSIC,
};

/**
 * Seasonal tint of a Chlorella culture over the year — the only colour on
 * the plate that is not ink. Values are what the renders in
 * `microseasons-cal/` show: pale spring green → saturated summer green →
 * olive autumn → dim teal winter. Opacity is applied by the renderer.
 */
export const ALGAE_TINT = {
  spring: '#9CCB6A',
  summer: '#2F8F4E',
  autumn: '#7E8F3A',
  winter: '#2E6B6A',
} as const;

/**
 * Three lineweights and nothing else. Hierarchy comes from weight and size,
 * never from fading — annotation opacity is clamped at MIN_TEXT_OPACITY.
 */
export const WEIGHT = {
  /** process piping, vessel outlines, panel frames */
  process: 1.3,
  /** the live process path when a state lights it */
  live: 2.3,
  /** internals, hatching, leaders, tubing behind the wall */
  fine: 0.6,
  /** instrument / electrical signal lines */
  signal: 0.5,
  /** electrical power conductors (bus bars, external circuit) */
  electric: 0.9,
} as const;

/** ISA-5.1 line conventions, mapped to stroke props. */
export const LINE_STYLE = {
  process: { width: WEIGHT.process, dash: undefined },
  signal: { width: WEIGHT.signal, dash: '3 4' },
  electric: { width: WEIGHT.electric, dash: '8 3' },
  gas: { width: WEIGHT.process, dash: '10 4' },
  data: { width: WEIGHT.signal, dash: '1 3' },
} as const;

export type LineKind = keyof typeof LINE_STYLE;

export const MONO_FONT =
  "'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, monospace";

/** Minimum annotation opacity — a 7px label under .78 fails AA on the plate. */
export const MIN_TEXT_OPACITY = 0.78;
