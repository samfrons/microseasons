/**
 * Drawing primitives for the blueprint plate — plain React SVG, no d3, so
 * every sheet renders on the server. Ink comes from the tokens; a symbol
 * never inlines a colour. Add ONE primitive here and ONE case in the
 * renderer when a symbol is missing; never hand-draw a sheet.
 */
import type { ReactNode } from 'react';
import { BLUEPRINT as B, LINE_STYLE, MIN_TEXT_OPACITY, MONO_FONT, WEIGHT, type LineKind } from '@/lib/twin/blueprint';
import type { Pt, TitleBlock, LogicBlock, Part, InstrumentMount } from '@/lib/twin/spec';

/* ------------------------------------------------------------------ text */

export function Txt({
  x, y, children, size = 7, anchor = 'start', bright = false, muted = false, weight = 400, opacity = 1, rotate,
}: {
  x: number; y: number; children: ReactNode; size?: number; anchor?: 'start' | 'middle' | 'end';
  bright?: boolean; muted?: boolean; weight?: number; opacity?: number; rotate?: number;
}) {
  return (
    <text
      x={x}
      y={y}
      fontFamily={MONO_FONT}
      fontSize={size}
      fontWeight={weight}
      textAnchor={anchor}
      fill={bright ? B.hi : muted ? B.muted : B.ink}
      opacity={Math.max(MIN_TEXT_OPACITY, opacity)}
      letterSpacing=".08em"
      transform={rotate ? `rotate(${rotate} ${x} ${y})` : undefined}
    >
      {children}
    </text>
  );
}

/* ----------------------------------------------------------------- lines */

export function Poly({ pts, kind = 'process', live = false, arrow = false, stroke }: {
  pts: Pt[]; kind?: LineKind; live?: boolean; arrow?: boolean; stroke?: string;
}) {
  const st = LINE_STYLE[kind];
  const isSignal = kind === 'signal' || kind === 'data';
  return (
    <polyline
      points={pts.map((p) => p.join(',')).join(' ')}
      fill="none"
      stroke={stroke ?? (live ? B.live : B.ink)}
      strokeWidth={live && !isSignal ? WEIGHT.live : st.width}
      strokeDasharray={st.dash}
      strokeLinejoin="miter"
      strokeLinecap="butt"
      markerEnd={arrow ? (live ? 'url(#tw-arrow-live)' : 'url(#tw-arrow)') : undefined}
    />
  );
}

export function Leader({ from, to }: { from: Pt; to: Pt }) {
  return <line x1={from[0]} y1={from[1]} x2={to[0]} y2={to[1]} stroke={B.ink} strokeWidth={WEIGHT.fine} />;
}

export function Defs() {
  return (
    <defs>
      <marker id="tw-arrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto" markerUnits="userSpaceOnUse">
        <path d="M0,0 L8,4 L0,8 z" fill={B.ink} />
      </marker>
      <marker id="tw-arrow-live" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto" markerUnits="userSpaceOnUse">
        <path d="M0,0 L8,4 L0,8 z" fill={B.live} />
      </marker>
      <pattern id="tw-hatch" width="4" height="4" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
        <line x1="0" y1="0" x2="0" y2="4" stroke={B.ink} strokeWidth="0.6" />
      </pattern>
      <pattern id="tw-mesh" width="3" height="3" patternUnits="userSpaceOnUse">
        <path d="M0 1.5 H3 M1.5 0 V3" stroke={B.ink} strokeWidth="0.35" />
      </pattern>
    </defs>
  );
}

/* --------------------------------------------------------------- bodies */

const body = { fill: B.body, stroke: B.ink, strokeWidth: WEIGHT.process } as const;

export function Chamber({ x, y, w, h, live = false, tint, filled = true }: {
  x: number; y: number; w: number; h: number; live?: boolean; tint?: string; filled?: boolean;
}) {
  return (
    <g>
      <rect x={x - w / 2} y={y - h / 2} width={w} height={h} {...body} stroke={live ? B.live : B.ink} strokeWidth={live ? WEIGHT.live : WEIGHT.process} />
      {tint && filled && (
        <rect x={x - w / 2 + 3} y={y - h / 2 + 3} width={w - 6} height={h - 6} fill={tint} opacity={live ? 0.7 : 0.35} />
      )}
    </g>
  );
}

export function Vessel({ x, y, w, h, live = false }: { x: number; y: number; w: number; h: number; live?: boolean }) {
  const r = w / 2;
  const top = y - h / 2 + r * 0.5;
  const bot = y + h / 2 - r * 0.5;
  const d = `M${x - r},${top} A${r},${r * 0.5} 0 0 1 ${x + r},${top} V${bot} A${r},${r * 0.5} 0 0 1 ${x - r},${bot} Z`;
  return (
    <g>
      <path d={d} {...body} stroke={live ? B.live : B.ink} strokeWidth={live ? WEIGHT.live : WEIGHT.process} />
      <line x1={x - r + 4} y1={y + h * 0.15} x2={x + r - 4} y2={y + h * 0.15} stroke={B.ink} strokeWidth={WEIGHT.fine} strokeDasharray="2 2" />
    </g>
  );
}

export function Pump({ x, y, live = false }: { x: number; y: number; live?: boolean }) {
  return (
    <g>
      <circle cx={x} cy={y} r={14} {...body} stroke={live ? B.live : B.ink} />
      {/* peristaltic: three rollers on the rotor */}
      {[0, 120, 240].map((a) => {
        const rad = (a * Math.PI) / 180;
        return <circle key={a} cx={x + Math.cos(rad) * 7} cy={y + Math.sin(rad) * 7} r={2.2} fill="none" stroke={B.ink} strokeWidth={WEIGHT.fine} />;
      })}
      <circle cx={x} cy={y} r={1.5} fill={B.ink} />
    </g>
  );
}

export function Valve({ x, y, open, actuated = false, vertical = false }: { x: number; y: number; open: boolean; actuated?: boolean; vertical?: boolean }) {
  const s = 9;
  const d = vertical
    ? `M${x - s / 2},${y - s} L${x + s / 2},${y - s} L${x - s / 2},${y + s} L${x + s / 2},${y + s} Z`
    : `M${x - s},${y - s / 2} L${x - s},${y + s / 2} L${x + s},${y - s / 2} L${x + s},${y + s / 2} Z`;
  return (
    <g>
      <path d={d} fill={open ? B.body : B.ink} stroke={open ? B.live : B.ink} strokeWidth={open ? WEIGHT.live : WEIGHT.process} />
      {actuated && (
        <g>
          <line x1={x} y1={y} x2={x} y2={y - s - 6} stroke={B.ink} strokeWidth={WEIGHT.fine} />
          <path d={`M${x - 7},${y - s - 6} A7,4 0 0 1 ${x + 7},${y - s - 6} Z`} fill={B.body} stroke={B.ink} strokeWidth={WEIGHT.fine} />
        </g>
      )}
    </g>
  );
}

export function Membrane({ x, y, w, h }: { x: number; y: number; w: number; h: number }) {
  return <rect x={x - w / 2} y={y - h / 2} width={w} height={h} fill="url(#tw-hatch)" stroke={B.ink} strokeWidth={WEIGHT.fine} />;
}

export function Electrode({ x, y, w, h, polarity, live = false }: { x: number; y: number; w: number; h: number; polarity: 'anode' | 'cathode'; live?: boolean }) {
  return (
    <g>
      <rect x={x - w / 2} y={y - h / 2} width={w} height={h} fill={live ? B.live : B.ink} opacity={live ? 1 : 0.9} />
      <Txt x={x} y={y - h / 2 - 3} size={7} anchor="middle" bright>{polarity === 'anode' ? '−' : '+'}</Txt>
    </g>
  );
}

export function Led({ x, y, w, h, on }: { x: number; y: number; w: number; h: number; on: boolean }) {
  const n = Math.max(3, Math.floor(w / 10));
  return (
    <g>
      <rect x={x - w / 2} y={y - h / 2} width={w} height={h} {...body} stroke={on ? B.live : B.ink} />
      {Array.from({ length: n }, (_, i) => {
        const cx = x - w / 2 + (w / n) * (i + 0.5);
        return <rect key={i} x={cx - 2} y={y - 2} width={4} height={4} fill={on ? B.live : 'none'} stroke={B.ink} strokeWidth={WEIGHT.fine} />;
      })}
      {on && [-1, 0, 1].map((k) => (
        <line key={k} x1={x + k * 8} y1={y - h / 2 - 2} x2={x + k * 10} y2={y - h / 2 - 8} stroke={B.live} strokeWidth={WEIGHT.fine} />
      ))}
    </g>
  );
}

export function Load({ x, y, w, live = false }: { x: number; y: number; w: number; live?: boolean }) {
  const n = 6;
  const step = w / n;
  const pts: Pt[] = [[x - w / 2, y]];
  for (let i = 0; i < n; i++) pts.push([x - w / 2 + step * (i + 0.5), y + (i % 2 ? 5 : -5)]);
  pts.push([x + w / 2, y]);
  return <Poly pts={pts} kind="process" live={live} />;
}

export function PowerSupply({ x, y, w, h, live = false }: { x: number; y: number; w: number; h: number; live?: boolean }) {
  return (
    <g>
      <rect x={x - w / 2} y={y - h / 2} width={w} height={h} {...body} stroke={live ? B.live : B.ink} />
      <Txt x={x - 8} y={y + 3} size={8} anchor="middle" bright>+</Txt>
      <Txt x={x + 8} y={y + 3} size={8} anchor="middle" bright>−</Txt>
    </g>
  );
}

export function Converter({ x, y, w, h, live = false }: { x: number; y: number; w: number; h: number; live?: boolean }) {
  return (
    <g>
      <rect x={x - w / 2} y={y - h / 2} width={w} height={h} {...body} stroke={live ? B.live : B.ink} />
      <line x1={x - w / 2} y1={y + h / 2} x2={x + w / 2} y2={y - h / 2} stroke={B.ink} strokeWidth={WEIGHT.fine} />
      <Txt x={x - w / 4} y={y - 2} size={6} anchor="middle">DC</Txt>
      <Txt x={x + w / 4} y={y + h / 2 - 3} size={6} anchor="middle">DC</Txt>
    </g>
  );
}

export function Storage({ x, y, w, live = false }: { x: number; y: number; w: number; live?: boolean }) {
  const c = live ? B.live : B.ink;
  return (
    <g>
      <line x1={x - w / 2} y1={y - 3} x2={x + w / 2} y2={y - 3} stroke={c} strokeWidth={WEIGHT.process} />
      <line x1={x - w / 2} y1={y + 3} x2={x + w / 2} y2={y + 3} stroke={c} strokeWidth={WEIGHT.process} />
      <line x1={x} y1={y - 3} x2={x} y2={y - 8} stroke={B.ink} strokeWidth={WEIGHT.electric} />
      <line x1={x} y1={y + 3} x2={x} y2={y + 8} stroke={B.ink} strokeWidth={WEIGHT.electric} />
    </g>
  );
}

export function Switch({ x, y, w, closed, vertical = false }: { x: number; y: number; w: number; closed: boolean; vertical?: boolean }) {
  const h = w / 2;
  const a: Pt = vertical ? [x, y - h] : [x - h, y];
  const b: Pt = vertical ? [x, y + h] : [x + h, y];
  const blade: Pt = closed ? b : vertical ? [x + h * 0.9, y + h * 0.4] : [x + h * 0.4, y - h * 0.9];
  return (
    <g>
      <circle cx={a[0]} cy={a[1]} r={1.6} fill={B.ink} />
      <circle cx={b[0]} cy={b[1]} r={1.6} fill={B.ink} />
      <line x1={a[0]} y1={a[1]} x2={blade[0]} y2={blade[1]} stroke={closed ? B.live : B.ink} strokeWidth={WEIGHT.process} />
    </g>
  );
}

export function PanelArray({ x, y, w, h, cols = 6, rows = 12, live = false }: { x: number; y: number; w: number; h: number; cols?: number; rows?: number; live?: boolean }) {
  const cw = (w - 12) / cols;
  const ch = (h - 12) / rows;
  return (
    <g>
      <rect x={x - w / 2} y={y - h / 2} width={w} height={h} {...body} stroke={live ? B.live : B.ink} strokeWidth={live ? WEIGHT.live : WEIGHT.process} />
      {Array.from({ length: rows }, (_, r) =>
        Array.from({ length: cols }, (_, c) => (
          <rect key={`${r}-${c}`} x={x - w / 2 + 6 + c * cw + 1} y={y - h / 2 + 6 + r * ch + 1} width={cw - 2} height={ch - 2} fill="none" stroke={B.ink} strokeWidth={WEIGHT.fine} opacity={0.8} />
        ))
      )}
    </g>
  );
}

export function Filter({ x, y, w, h }: { x: number; y: number; w: number; h: number }) {
  return (
    <g>
      <rect x={x - w / 2} y={y - h / 2} width={w} height={h} {...body} />
      <rect x={x - w / 2 + 3} y={y - h / 2 + 3} width={w - 6} height={h - 6} fill="url(#tw-mesh)" />
    </g>
  );
}

export function SamplePoint({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <circle cx={x} cy={y} r={5} {...body} />
      <Txt x={x} y={y + 2.5} size={6} anchor="middle" bright>S</Txt>
    </g>
  );
}

export function Cabinet({ x, y, w, h }: { x: number; y: number; w: number; h: number }) {
  return (
    <g>
      <rect x={x - w / 2} y={y - h / 2} width={w} height={h} {...body} />
      <rect x={x - w / 2 + 4} y={y - h / 2 + 4} width={w - 8} height={h - 8} fill="none" stroke={B.ink} strokeWidth={WEIGHT.fine} strokeDasharray="2 2" />
    </g>
  );
}

/** Off-sheet chevron: a source ENDS at x, a sink STARTS at x. */
export function OffSheet({ x, y, kind, label, live = false }: { x: number; y: number; kind: 'source' | 'sink'; label?: string; live?: boolean }) {
  const L = 34;
  const d = kind === 'source'
    ? `M${x - L},${y - 6} H${x - 8} L${x},${y} L${x - 8},${y + 6} H${x - L} Z`
    : `M${x},${y - 6} H${x + L - 8} L${x + L},${y} L${x + L - 8},${y + 6} H${x} Z`;
  const tx = kind === 'source' ? x - L : x + L;
  return (
    <g>
      <path d={d} fill={B.body} stroke={live ? B.live : B.ink} strokeWidth={WEIGHT.fine} />
      {label && <Txt x={tx} y={y - 9} size={6} anchor={kind === 'source' ? 'start' : 'end'} muted>{label}</Txt>}
    </g>
  );
}

/* ----------------------------------------------------------- instruments */

export function InstrumentBubble({ x, y, tag, mount = 'field', tip }: { x: number; y: number; tag: string; mount?: InstrumentMount; tip?: string }) {
  const r = 12;
  const [letters, loop] = tag.split('-');
  return (
    <g aria-label={tip ?? tag}>
      {tip && <title>{`${tag} — ${tip}`}</title>}
      {mount === 'dcs' && <rect x={x - r - 2} y={y - r - 2} width={2 * r + 4} height={2 * r + 4} fill={B.bubble} stroke={B.ink} strokeWidth={WEIGHT.fine} />}
      <circle cx={x} cy={y} r={r} fill={B.bubble} stroke={B.ink} strokeWidth={WEIGHT.process} />
      {mount === 'panel' && <line x1={x - r} y1={y} x2={x + r} y2={y} stroke={B.ink} strokeWidth={WEIGHT.process} />}
      <line x1={x - r} y1={y} x2={x + r} y2={y} stroke={B.ink} strokeWidth={WEIGHT.fine} />
      <Txt x={x} y={y - 2.5} size={letters.length > 3 ? 5.5 : 6.5} anchor="middle" bright weight={600}>{letters}</Txt>
      <Txt x={x} y={y + 8} size={6} anchor="middle" bright>{loop}</Txt>
    </g>
  );
}

export function Balloon({ x, y, n, to }: { x: number; y: number; n: number; to: Pt }) {
  return (
    <g>
      <Leader from={[x, y]} to={to} />
      <circle cx={x} cy={y} r={8} fill={B.bubble} stroke={B.ink} strokeWidth={WEIGHT.fine} />
      <Txt x={x} y={y + 2.5} size={6.5} anchor="middle" bright weight={600}>{n}</Txt>
    </g>
  );
}

/* ------------------------------------------------------------- furniture */

export function Stamp({ x, y, lines }: { x: number; y: number; lines: [string, string] }) {
  return (
    <g transform={`rotate(-4 ${x} ${y})`}>
      <rect x={x - 96} y={y - 13} width={192} height={26} fill={B.stampPaper} stroke={B.stampInk} strokeWidth={1.2} />
      <text x={x} y={y - 2} fontFamily={MONO_FONT} fontSize={7} fontWeight={700} textAnchor="middle" fill={B.stampInk} letterSpacing=".12em">{lines[0]}</text>
      <text x={x} y={y + 8} fontFamily={MONO_FONT} fontSize={6} textAnchor="middle" fill={B.stampInk} letterSpacing=".1em">{lines[1]}</text>
    </g>
  );
}

export function TitleBlockBox({ x, y, w = 336, t }: { x: number; y: number; w?: number; t: TitleBlock }) {
  const h = 96;
  const stamp: [string, string] = t.stamp ?? (t.status === 'CONCEPT' ? ['CONCEPT — NOT FOR CONSTRUCTION', 'digital twin · design basis only'] : [t.status, '']);
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} fill={B.panel} stroke={B.ink} strokeWidth={WEIGHT.process} />
      <line x1={x} y1={y + 30} x2={x + w} y2={y + 30} stroke={B.ink} strokeWidth={WEIGHT.fine} />
      <line x1={x + w - 130} y1={y + 30} x2={x + w - 130} y2={y + h} stroke={B.ink} strokeWidth={WEIGHT.fine} />
      <Txt x={x + 8} y={y + 12} size={6} muted>{t.org.toUpperCase()}</Txt>
      <Txt x={x + 8} y={y + 24} size={7.5} bright weight={600}>{t.title.toUpperCase().slice(0, Math.floor((w - 16) / 5.6))}</Txt>
      <Txt x={x + 8} y={y + 44} size={6} muted>DRAWING</Txt>
      <Txt x={x + 8} y={y + 55} size={8} bright weight={600}>{t.drawing}</Txt>
      <Txt x={x + 8} y={y + 70} size={6} muted>REV {t.rev} · SHEET {t.sheet} OF {t.of}</Txt>
      <Txt x={x + 8} y={y + 82} size={6} muted>{t.scale ?? 'SCALE: SCHEMATIC'}</Txt>
      <Txt x={x + 8} y={y + 92} size={6} muted>DRAWN: {(t.drawn ?? '—').toUpperCase()}</Txt>
      <Stamp x={x + w - 65} y={y + 63} lines={stamp} />
    </g>
  );
}

export function PartsList({ x, y, parts, cols = 2 }: { x: number; y: number; parts: Part[]; cols?: number }) {
  const per = Math.ceil(parts.length / cols);
  return (
    <g>
      <Txt x={x} y={y} size={6} muted>PARTS LIST</Txt>
      {parts.map((p, i) => {
        const c = Math.floor(i / per);
        const r = i % per;
        return (
          <g key={p.n}>
            <circle cx={x + c * 240 + 6} cy={y + 12 + r * 11 - 2} r={5} fill={B.bubble} stroke={B.ink} strokeWidth={WEIGHT.fine} />
            <Txt x={x + c * 240 + 6} y={y + 12 + r * 11} size={5.5} anchor="middle" bright>{p.n}</Txt>
            <Txt x={x + c * 240 + 16} y={y + 12 + r * 11} size={6}>{p.name.toUpperCase()}</Txt>
          </g>
        );
      })}
    </g>
  );
}

export function LogicBlockBox({ block, activeRule, stamp }: { block: LogicBlock; activeRule?: string; stamp?: string }) {
  const { x, y, w, h, title, rules } = block;
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} fill={B.panel} stroke={B.ink} strokeWidth={WEIGHT.process} />
      <Txt x={x + 8} y={y + 13} size={6.5} bright weight={600}>{title}</Txt>
      <line x1={x} y1={y + 19} x2={x + w} y2={y + 19} stroke={B.ink} strokeWidth={WEIGHT.fine} />
      {rules.map((r, i) => {
        const live = r.id === activeRule;
        const ry = y + 31 + i * 13;
        return (
          <g key={r.id}>
            {live && <rect x={x + 3} y={ry - 9} width={w - 6} height={12} fill={B.live} opacity={0.18} />}
            <rect x={x + 8} y={ry - 6} width={5} height={5} fill={live ? B.live : 'none'} stroke={B.ink} strokeWidth={WEIGHT.fine} />
            <Txt x={x + 18} y={ry} size={6.5} bright={live}>{r.text}</Txt>
          </g>
        );
      })}
      {stamp && <Txt x={x + w - 8} y={y + h - 6} size={6.5} anchor="end" weight={700} bright>{stamp}</Txt>}
    </g>
  );
}

export function Legend({ x, y }: { x: number; y: number }) {
  const rows: { kind: LineKind; label: string }[] = [
    { kind: 'process', label: 'PROCESS / CULTURE' },
    { kind: 'gas', label: 'GAS (O₂)' },
    { kind: 'electric', label: 'ELECTRICAL' },
    { kind: 'signal', label: 'SIGNAL' },
  ];
  return (
    <g>
      <Txt x={x} y={y} size={6} muted>LEGEND</Txt>
      {rows.map((r, i) => (
        <g key={r.kind}>
          <Poly pts={[[x, y + 10 + i * 11], [x + 26, y + 10 + i * 11]]} kind={r.kind} />
          <Txt x={x + 32} y={y + 12 + i * 11} size={6}>{r.label}</Txt>
        </g>
      ))}
      <Poly pts={[[x, y + 10 + rows.length * 11], [x + 26, y + 10 + rows.length * 11]]} kind="process" live />
      <Txt x={x + 32} y={y + 12 + rows.length * 11} size={6}>LIVE IN THIS STATE</Txt>
    </g>
  );
}

export function SheetFrame({ w, h }: { w: number; h: number }) {
  return <rect x={0.5} y={0.5} width={w - 1} height={h - 1} fill="none" stroke={B.ink} strokeWidth={WEIGHT.fine} opacity={0.5} />;
}
