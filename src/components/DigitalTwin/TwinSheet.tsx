'use client';

/**
 * The PLATE plus the state chips: a Prussian-blue sheet with a faint
 * drafting grid, an eyebrow caption, the drawing, and a row of
 * `aria-pressed` buttons that switch the sheet's state. Chips repaint the
 * sheet; nothing animates. Styles are inline so the component works on any
 * page without a stylesheet; sharp corners throughout.
 */
import { useId, useRef, useState, type CSSProperties, type ReactNode } from 'react';
import { BLUEPRINT as B, MONO_FONT } from '@/lib/twin/blueprint';
import { getCalendarState, getPidState, type CalendarPanel, type CalendarTwinSpec, type Equipment, type PidSpec } from '@/lib/twin/spec';
import { CalendarTwinDiagram } from './CalendarTwinDiagram';
import { PidDiagram } from './PidDiagram';

const plate: CSSProperties = {
  background: `repeating-linear-gradient(0deg, ${B.grid} 0 1px, transparent 1px 26px), repeating-linear-gradient(90deg, ${B.grid} 0 1px, transparent 1px 26px), linear-gradient(180deg, ${B.plateTop} 0%, ${B.plateBottom} 100%)`,
  border: `1px solid ${B.border}`,
  padding: 'clamp(10px, 1.4vw, 16px)',
};

const caption: CSSProperties = {
  fontFamily: MONO_FONT,
  fontSize: '.625rem',
  letterSpacing: '.18em',
  textTransform: 'uppercase',
  color: B.muted,
  margin: '0 0 10px',
};

const chipRow: CSSProperties = { display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center', margin: '10px 0 0' };

function chip(pressed: boolean): CSSProperties {
  return {
    fontFamily: MONO_FONT,
    fontSize: '.625rem',
    letterSpacing: '.12em',
    textTransform: 'uppercase',
    padding: '6px 10px',
    background: pressed ? B.live : 'transparent',
    color: pressed ? B.plateBottom : B.ink,
    border: `1px solid ${pressed ? B.live : 'rgba(226,240,248,.45)'}`,
    cursor: 'pointer',
  };
}

const detail: CSSProperties = {
  fontFamily: MONO_FONT,
  fontSize: '.7rem',
  lineHeight: 1.5,
  color: B.ink,
  borderTop: `1px solid rgba(226,240,248,.25)`,
  marginTop: 10,
  paddingTop: 8,
};

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

function svgOf(root: HTMLElement | null, w: number, h: number): string | null {
  const svg = root?.querySelector('svg');
  if (!svg) return null;
  const clone = svg.cloneNode(true) as SVGSVGElement;
  clone.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
  clone.removeAttribute('width');
  const bg = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
  bg.setAttribute('width', String(w));
  bg.setAttribute('height', String(h));
  bg.setAttribute('fill', B.plateBottom);
  clone.insertBefore(bg, clone.firstChild);
  return new XMLSerializer().serializeToString(clone);
}

function Shell({ label, captionText, states, state, setState, drawing, sheet, children, extra }: {
  label: string; captionText?: string; states: { id: string; label: string; band?: string; description: string }[];
  state: string; setState: (id: string) => void; drawing: string; sheet: { width: number; height: number };
  children: ReactNode; extra?: ReactNode;
}) {
  const id = useId();
  const root = useRef<HTMLDivElement>(null);
  const cur = states.find((s) => s.id === state) ?? states[0];
  return (
    <section aria-labelledby={`${id}-cap`} style={{ maxWidth: 1100 }}>
      <div ref={root} style={plate}>
        {captionText && <p id={`${id}-cap`} style={caption}>{captionText}</p>}
        {children}
        <div style={chipRow} role="group" aria-label={`${label} state`}>
          {states.map((s) => (
            <button key={s.id} type="button" aria-pressed={s.id === state} style={chip(s.id === state)} onClick={() => setState(s.id)} title={s.description}>
              {s.label}{s.band ? ` · ${s.band}` : ''}
            </button>
          ))}
          <button
            type="button"
            style={{ ...chip(false), marginLeft: 'auto' }}
            title="Download the drawing as it is on screen (this state)"
            onClick={() => { const b = svgOf(root.current, sheet.width, sheet.height); if (b) download(`${drawing}.svg`, b); }}
          >
            ↓ SVG
          </button>
        </div>
        <p style={{ ...detail, borderTop: 'none', marginTop: 6, paddingTop: 0, color: B.muted }} aria-live="polite">{cur?.description}</p>
        {extra}
      </div>
    </section>
  );
}

export function CalendarTwinSheet({ spec, initialState, onSelectPanel }: { spec: CalendarTwinSpec; initialState?: string; onSelectPanel?: (p: CalendarPanel) => void }) {
  const [state, setState] = useState(initialState ?? getCalendarState(spec).id);
  const [sel, setSel] = useState<CalendarPanel | null>(null);
  const choose = (p: CalendarPanel) => { setSel(p); onSelectPanel?.(p); };
  return (
    <Shell
      label="Wall"
      captionText={`${spec.title.drawing} · rev ${spec.title.rev} · sheet ${spec.title.sheet} of ${spec.title.of}`}
      states={spec.states}
      state={state}
      setState={setState}
      drawing={spec.title.drawing}
      sheet={spec.sheet}
      extra={sel && (
        <div style={detail}>
          <strong style={{ color: B.hi }}>{sel.tag} · #{sel.n} {sel.nameJa} — {sel.nameEn}</strong>
          <br />
          {sel.solarTerm} · {sel.season} · {sel.start.month}/{sel.start.day}–{sel.end.month}/{sel.end.day} · {sel.days} day-LEDs · culture in from the {sel.ports.in} · tint {sel.tint}
        </div>
      )}
    >
      <CalendarTwinDiagram spec={spec} state={state} onSelect={choose} selected={sel?.id} />
    </Shell>
  );
}

export function PidSheet({ spec, initialState }: { spec: PidSpec; initialState?: string }) {
  const [state, setState] = useState(initialState ?? getPidState(spec).id);
  const [sel, setSel] = useState<Equipment | null>(null);
  return (
    <Shell
      label={spec.title.drawing}
      captionText={`${spec.title.drawing} · rev ${spec.title.rev} · sheet ${spec.title.sheet} of ${spec.title.of}`}
      states={spec.states}
      state={state}
      setState={setState}
      drawing={spec.title.drawing}
      sheet={spec.sheet}
      extra={sel && (
        <div style={detail}>
          <strong style={{ color: B.hi }}>{sel.tag ?? sel.label ?? sel.id}</strong>{sel.label && sel.tag ? ` · ${sel.label}` : ''}
          <br />
          {sel.tip ?? 'No datasheet note on this item.'}
        </div>
      )}
    >
      <PidDiagram spec={spec} state={state} onSelect={setSel} />
    </Shell>
  );
}
