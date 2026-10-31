'use client';

/**
 * The PLATE plus the chips: a sheet (Prussian-blue drafting plate, or white
 * printed paper in the `classic` theme), an eyebrow caption, the drawing,
 * and a row of `aria-pressed` buttons — the sheet's states, then the
 * Blueprint / Classic theme pair. Chips repaint the sheet; nothing animates.
 * Every colour comes from the ACTIVE PALETTE, never from `BLUEPRINT`.
 * Styles are inline so the component works on any page without a
 * stylesheet; sharp corners throughout.
 */
import { useId, useRef, useState, type CSSProperties, type ReactNode } from 'react';
import { MONO_FONT, PALETTES, type Palette, type TwinTheme } from '@/lib/twin/blueprint';
import { getCalendarState, getPidState, getVenueState, type CalendarPanel, type CalendarTwinSpec, type Equipment, type PidSpec, type VenuePlanSpec } from '@/lib/twin/spec';
import { CalendarTwinDiagram } from './CalendarTwinDiagram';
import { PidDiagram } from './PidDiagram';
import { VenuePlanDiagram } from './VenuePlanDiagram';
import { TwinThemeProvider } from './theme';

/**
 * Blueprint = gradient + drafting grid + translucent border; classic = white
 * paper, no grid, one thin solid frame (`grid` is `transparent` in that
 * palette, so the two grid layers collapse to nothing).
 */
function plateStyle(p: Palette): CSSProperties {
  const grid =
    p.grid === 'transparent'
      ? ''
      : `repeating-linear-gradient(0deg, ${p.grid} 0 1px, transparent 1px 26px), repeating-linear-gradient(90deg, ${p.grid} 0 1px, transparent 1px 26px), `;
  return {
    background: `${grid}linear-gradient(180deg, ${p.plateTop} 0%, ${p.plateBottom} 100%)`,
    border: `1px solid ${p.border}`,
    padding: 'clamp(10px, 1.4vw, 16px)',
  };
}

function captionStyle(p: Palette): CSSProperties {
  return {
    fontFamily: MONO_FONT,
    fontSize: '.625rem',
    letterSpacing: '.18em',
    textTransform: 'uppercase',
    color: p.muted,
    margin: '0 0 10px',
  };
}

const chipRow: CSSProperties = { display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center', margin: '10px 0 0' };

function chip(p: Palette, pressed: boolean): CSSProperties {
  return {
    fontFamily: MONO_FONT,
    fontSize: '.625rem',
    letterSpacing: '.12em',
    textTransform: 'uppercase',
    padding: '6px 10px',
    background: pressed ? p.live : 'transparent',
    color: pressed ? p.plateBottom : p.ink,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: pressed ? p.live : p.chipBorder,
    cursor: 'pointer',
  };
}

function detailStyle(p: Palette): CSSProperties {
  return {
    fontFamily: MONO_FONT,
    fontSize: '.7rem',
    lineHeight: 1.5,
    color: p.ink,
    borderTop: `1px solid ${p.chipBorder}`,
    marginTop: 10,
    paddingTop: 8,
  };
}

const THEME_OPTIONS: { id: TwinTheme; label: string }[] = [
  { id: 'blueprint', label: 'Blueprint' },
  { id: 'classic', label: 'Classic' },
];

/** Segmented Blueprint / Classic control. Same chip language as the states. */
function ThemeChips({ p, theme, onChange }: { p: Palette; theme: TwinTheme; onChange: (t: TwinTheme) => void }) {
  return (
    <div style={{ display: 'flex', gap: 0 }} role="group" aria-label="Sheet theme">
      {THEME_OPTIONS.map((o) => {
        const pressed = o.id === theme;
        return (
          <button
            key={o.id}
            type="button"
            aria-pressed={pressed}
            onClick={() => onChange(o.id)}
            style={{ ...chip(p, pressed), marginLeft: o.id === 'blueprint' ? 0 : -1, fontWeight: pressed ? 600 : 400 }}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}

function download(name: string, body: string) {
  if (typeof document === 'undefined' || typeof Blob === 'undefined') return;
  const url = URL.createObjectURL(new Blob([body], { type: 'image/svg+xml' }));
  const a = document.createElement('a');
  a.href = url;
  a.download = name;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function svgOf(root: HTMLElement | null, w: number, h: number, paper: string): string | null {
  const svg = root?.querySelector('svg');
  if (!svg) return null;
  const clone = svg.cloneNode(true) as SVGSVGElement;
  clone.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
  clone.removeAttribute('width');
  const bg = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
  bg.setAttribute('width', String(w));
  bg.setAttribute('height', String(h));
  bg.setAttribute('fill', paper);
  clone.insertBefore(bg, clone.firstChild);
  return new XMLSerializer().serializeToString(clone);
}

function Shell({ label, captionText, states, state, setState, theme, setTheme, drawing, sheet, children, extra }: {
  label: string; captionText?: string; states: { id: string; label: string; band?: string; description: string }[];
  state: string; setState: (id: string) => void; theme: TwinTheme; setTheme: (t: TwinTheme) => void;
  drawing: string; sheet: { width: number; height: number };
  children: ReactNode; extra?: ReactNode;
}) {
  const id = useId();
  const root = useRef<HTMLDivElement>(null);
  const cur = states.find((s) => s.id === state) ?? states[0];
  const p = PALETTES[theme] ?? PALETTES.blueprint;
  return (
    <section aria-labelledby={`${id}-cap`} style={{ maxWidth: 1100 }}>
      <div ref={root} style={plateStyle(p)} data-theme={theme}>
        {captionText && <p id={`${id}-cap`} style={captionStyle(p)}>{captionText}</p>}
        <TwinThemeProvider theme={theme}>{children}</TwinThemeProvider>
        <div style={chipRow} role="group" aria-label={`${label} state`}>
          {states.map((s) => (
            <button key={s.id} type="button" aria-pressed={s.id === state} style={chip(p, s.id === state)} onClick={() => setState(s.id)} title={s.description}>
              {s.label}{s.band ? ` · ${s.band}` : ''}
            </button>
          ))}
          <div style={{ marginLeft: 'auto', display: 'flex', gap: 8, alignItems: 'center' }}>
            <ThemeChips p={p} theme={theme} onChange={setTheme} />
            <button
              type="button"
              style={chip(p, false)}
              title="Download the drawing as it is on screen (this theme, this state)"
              onClick={() => { const b = svgOf(root.current, sheet.width, sheet.height, p.plateBottom); if (b) download(`${drawing}.svg`, b); }}
            >
              ↓ SVG
            </button>
          </div>
        </div>
        <p style={{ ...detailStyle(p), borderTop: 'none', marginTop: 6, paddingTop: 0, color: p.muted }} aria-live="polite">{cur?.description}</p>
        {extra}
      </div>
    </section>
  );
}

export function CalendarTwinSheet({ spec, initialState, theme: initialTheme = 'blueprint', onSelectPanel }: { spec: CalendarTwinSpec; initialState?: string; theme?: TwinTheme; onSelectPanel?: (p: CalendarPanel) => void }) {
  const [state, setState] = useState(initialState ?? getCalendarState(spec).id);
  const [theme, setTheme] = useState<TwinTheme>(initialTheme);
  const [sel, setSel] = useState<CalendarPanel | null>(null);
  const p = PALETTES[theme] ?? PALETTES.blueprint;
  const choose = (panel: CalendarPanel) => { setSel(panel); onSelectPanel?.(panel); };
  return (
    <Shell
      label="Wall"
      captionText={`${spec.title.drawing} · rev ${spec.title.rev} · sheet ${spec.title.sheet} of ${spec.title.of}`}
      states={spec.states}
      state={state}
      setState={setState}
      theme={theme}
      setTheme={setTheme}
      drawing={spec.title.drawing}
      sheet={spec.sheet}
      extra={sel && (
        <div style={detailStyle(p)}>
          <strong style={{ color: p.hi }}>{sel.tag} · #{sel.n} {sel.nameJa} — {sel.nameEn}</strong>
          <br />
          {sel.solarTerm} · {sel.season} · {sel.start.month}/{sel.start.day}–{sel.end.month}/{sel.end.day} · {sel.days} day-LEDs · culture in from the {sel.ports.in} · tint {sel.tint}
        </div>
      )}
    >
      <CalendarTwinDiagram spec={spec} state={state} onSelect={choose} selected={sel?.id} />
    </Shell>
  );
}

export function PidSheet({ spec, initialState, theme: initialTheme = 'blueprint' }: { spec: PidSpec; initialState?: string; theme?: TwinTheme }) {
  const [state, setState] = useState(initialState ?? getPidState(spec).id);
  const [theme, setTheme] = useState<TwinTheme>(initialTheme);
  const [sel, setSel] = useState<Equipment | null>(null);
  const p = PALETTES[theme] ?? PALETTES.blueprint;
  return (
    <Shell
      label={spec.title.drawing}
      captionText={`${spec.title.drawing} · rev ${spec.title.rev} · sheet ${spec.title.sheet} of ${spec.title.of}`}
      states={spec.states}
      state={state}
      setState={setState}
      theme={theme}
      setTheme={setTheme}
      drawing={spec.title.drawing}
      sheet={spec.sheet}
      extra={sel && (
        <div style={detailStyle(p)}>
          <strong style={{ color: p.hi }}>{sel.tag ?? sel.label ?? sel.id}</strong>{sel.label && sel.tag ? ` · ${sel.label}` : ''}
          <br />
          {sel.tip ?? 'No datasheet note on this item.'}
        </div>
      )}
    >
      <PidDiagram spec={spec} state={state} onSelect={setSel} />
    </Shell>
  );
}

/** MS-CAL-004 on the plate: the venue plan, its states and the theme pair. */
export function VenuePlanSheet({ spec, initialState, theme: initialTheme = 'blueprint' }: { spec: VenuePlanSpec; initialState?: string; theme?: TwinTheme }) {
  const [state, setState] = useState(initialState ?? getVenueState(spec).id);
  const [theme, setTheme] = useState<TwinTheme>(initialTheme);
  return (
    <Shell
      label={spec.title.drawing}
      captionText={`${spec.title.drawing} · rev ${spec.title.rev} · sheet ${spec.title.sheet} of ${spec.title.of}`}
      states={spec.states}
      state={state}
      setState={setState}
      theme={theme}
      setTheme={setTheme}
      drawing={spec.title.drawing}
      sheet={spec.sheet}
    >
      <VenuePlanDiagram spec={spec} state={state} />
    </Shell>
  );
}
