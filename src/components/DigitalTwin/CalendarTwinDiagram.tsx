/**
 * The wall elevation: 72 timber-framed panels in a 6 × 12 grid, a rail
 * under every row, culture tubing snaking behind the wall, the +/− bus in
 * the vertical rails, one LED per day under every window. A `CalendarTwinSpec`
 * in, one SVG out. Server-safe.
 */
import { BLUEPRINT as B, WEIGHT } from '@/lib/twin/blueprint';
import { getCalendarState, type CalendarPanel, type CalendarTwinSpec, type Pt } from '@/lib/twin/spec';
import { Defs, Legend, LogicBlockBox, Poly, SheetFrame, TitleBlockBox, Txt } from './symbols';

export interface CalendarTwinDiagramProps {
  spec: CalendarTwinSpec;
  state?: string;
  onSelect?: (p: CalendarPanel) => void;
  /** panel id drawn with the selection frame */
  selected?: string;
  className?: string;
}

export function panelRect(spec: CalendarTwinSpec, p: CalendarPanel) {
  const { w, h, gap } = spec.panel;
  const [ox, oy] = spec.origin;
  return { x: ox + p.col * (w + gap), y: oy + p.row * (h + gap), w, h };
}

/** The boustrophedon tubing path through every panel, as one polyline. */
export function culturePath(spec: CalendarTwinSpec): Pt[] {
  const pts: Pt[] = [];
  const sorted = [...spec.panels].sort((a, b) => a.n - b.n);
  for (const p of sorted) {
    const r = panelRect(spec, p);
    const yIn = r.y + r.h * 0.3;
    const inX = p.ports.in === 'left' ? r.x : r.x + r.w;
    const outX = p.ports.out === 'left' ? r.x : r.x + r.w;
    if (pts.length) {
      const last = pts[pts.length - 1];
      if (last[1] !== yIn) {
        /* row change: drop down the outer edge to the next row */
        pts.push([last[0], yIn]);
      }
    }
    pts.push([inX, yIn], [outX, yIn]);
  }
  return pts;
}

export function CalendarTwinDiagram({ spec, state, onSelect, selected, className }: CalendarTwinDiagramProps) {
  const st = getCalendarState(spec, state);
  const lit = new Set(st.litPanels);
  const cultureLive = st.streams.includes('culture');
  const busLive = st.streams.includes('bus');
  const filled = st.cultureFilled !== false;
  const { width, height } = spec.sheet;
  const { cols, rows } = spec.grid;
  const { w, h, gap } = spec.panel;
  const [ox, oy] = spec.origin;
  const wallW = cols * (w + gap) - gap;
  const wallH = rows * (h + gap) - gap;
  const interactive = Boolean(onSelect);

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      width="100%"
      role="img"
      aria-label={`${spec.title.drawing} — ${spec.title.title}. State ${st.label}: ${st.description}`}
      className={className}
      style={{ display: 'block' }}
    >
      <Defs />
      <SheetFrame w={width} h={height} />
      {spec.caption && <Txt x={12} y={12} size={6} muted>{spec.caption.toUpperCase()}</Txt>}

      {/* vertical rails carrying the bus bars */}
      <rect x={ox - 14} y={oy - 8} width={8} height={wallH + 16} fill={B.body} stroke={B.timber} strokeWidth={WEIGHT.fine} />
      <rect x={ox + wallW + 6} y={oy - 8} width={8} height={wallH + 16} fill={B.body} stroke={B.timber} strokeWidth={WEIGHT.fine} />
      <Poly pts={[[ox - 10, oy - 8], [ox - 10, oy + wallH + 8]]} kind="electric" live={busLive} />
      <Poly pts={[[ox + wallW + 10, oy - 8], [ox + wallW + 10, oy + wallH + 8]]} kind="electric" live={busLive} />
      <Txt x={ox - 18} y={oy + wallH / 2} size={6} anchor="middle" rotate={-90} muted>{spec.electrical.anodeBus === 'left' ? 'ANODE BUS (−)' : 'CATHODE BUS (+)'}</Txt>
      <Txt x={ox + wallW + 22} y={oy + wallH / 2} size={6} anchor="middle" rotate={90} muted>{spec.electrical.anodeBus === 'left' ? 'CATHODE BUS (+)' : 'ANODE BUS (−)'}</Txt>

      {/* horizontal rail under every row */}
      {Array.from({ length: rows }, (_, r) => (
        <rect key={r} x={ox - 6} y={oy + r * (h + gap) + h + 1} width={wallW + 12} height={3} fill={B.timber} opacity={0.55} />
      ))}

      {/* culture tubing behind the wall */}
      <Poly pts={culturePath(spec)} kind="process" live={cultureLive} stroke={cultureLive ? undefined : B.muted} />

      {/* the panels */}
      {spec.panels.map((p) => {
        const r = panelRect(spec, p);
        const isLit = lit.has(p.id);
        const isSel = selected === p.id;
        const stripOn = isLit || Boolean(st.stripsOn);
        const ledW = Math.min(8, (r.w - 16) / p.days - 2);
        const ledStep = (r.w - 16) / p.days;
        const aria = p.tip ?? `${p.tag} ${p.nameEn}`;
        return (
          <g
            key={p.id}
            data-panel={p.id}
            role={interactive ? 'button' : undefined}
            tabIndex={interactive ? 0 : undefined}
            aria-label={aria}
            aria-pressed={interactive ? isSel : undefined}
            style={interactive ? { cursor: 'pointer' } : undefined}
            onClick={interactive ? () => onSelect?.(p) : undefined}
            onKeyDown={interactive ? (ev) => { if (ev.key === 'Enter' || ev.key === ' ') { ev.preventDefault(); onSelect?.(p); } } : undefined}
          >
            <title>{aria}</title>
            {/* timber glow behind a lit panel */}
            {isLit && <rect x={r.x - 3} y={r.y - 3} width={r.w + 6} height={r.h + 6} fill={B.live} opacity={0.22} />}
            {/* frame */}
            <rect x={r.x} y={r.y} width={r.w} height={r.h} fill={B.body} stroke={isLit ? B.live : B.timber} strokeWidth={isLit ? WEIGHT.live : WEIGHT.process} />
            {/* culture window */}
            <rect x={r.x + 6} y={r.y + 5} width={r.w - 12} height={r.h - 22} fill={filled ? p.tint : 'none'} opacity={filled ? (isLit ? 0.85 : 0.45) : 1} stroke={B.ink} strokeWidth={WEIGHT.fine} strokeDasharray={filled ? undefined : '2 2'} />
            {/* ports */}
            <circle cx={p.ports.in === 'left' ? r.x + 3 : r.x + r.w - 3} cy={r.y + r.h * 0.3} r={1.6} fill={cultureLive ? B.live : B.ink} />
            <circle cx={p.ports.out === 'left' ? r.x + 3 : r.x + r.w - 3} cy={r.y + r.h * 0.3} r={1.6} fill="none" stroke={B.ink} strokeWidth={WEIGHT.fine} />
            {/* electrode leads to the bus rails */}
            <line x1={r.x} y1={r.y + r.h - 12} x2={r.x + 4} y2={r.y + r.h - 12} stroke={B.ink} strokeWidth={WEIGHT.fine} />
            <line x1={r.x + r.w - 4} y1={r.y + r.h - 12} x2={r.x + r.w} y2={r.y + r.h - 12} stroke={B.ink} strokeWidth={WEIGHT.fine} />
            {/* day-LED strip */}
            {Array.from({ length: p.days }, (_, d) => {
              const on = stripOn && (st.litDay === undefined || !isLit || d <= st.litDay);
              const today = isLit && st.litDay === d;
              return (
                <rect
                  key={d}
                  x={r.x + 8 + d * ledStep + (ledStep - ledW) / 2}
                  y={r.y + r.h - 12}
                  width={ledW}
                  height={4}
                  fill={today ? B.hi : on ? B.live : 'none'}
                  opacity={on && !today && !isLit ? 0.55 : 1}
                  stroke={B.ink}
                  strokeWidth={0.4}
                />
              );
            })}
            {/* engraving: number + name */}
            <Txt x={r.x + 8} y={r.y + r.h - 3} size={4.6} muted={!isLit} bright={isLit}>{`#${p.n} ${p.nameEn.toUpperCase().slice(0, 22)}`}</Txt>
            <Txt x={r.x + r.w - 6} y={r.y + 11} size={4.6} anchor="end" bright={isLit} opacity={0.9}>{p.nameJa}</Txt>
            {isSel && <rect x={r.x - 1.5} y={r.y - 1.5} width={r.w + 3} height={r.h + 3} fill="none" stroke={B.hi} strokeWidth={0.8} strokeDasharray="3 2" />}
          </g>
        );
      })}

      {/* dimension line under the wall */}
      <Poly pts={[[ox, oy + wallH + 14], [ox + wallW, oy + wallH + 14]]} kind="signal" />
      <Txt x={ox + wallW / 2} y={oy + wallH + 24} size={6} anchor="middle" muted>
        {`${cols} × ${rows} PANELS · ${spec.panel.mm.w * cols} × ${spec.panel.mm.h * rows} mm · SERIES CULTURE ${spec.hydraulics.flowMlMin} mL/min · ${spec.electrical.topology.toUpperCase()} MFC ${spec.electrical.cellVoltageV} V → ${spec.electrical.busVoltageV} V`}
      </Txt>

      {/* right column: state readout, legend, logic, title */}
      <Txt x={610} y={60} size={6} muted>STATE</Txt>
      <Txt x={610} y={72} size={8} bright weight={600}>{st.label.toUpperCase()}{st.band ? ` · ${st.band.toUpperCase()}` : ''}</Txt>
      {wrap(st.description, 58).map((line, i) => <Txt key={i} x={610} y={86 + i * 9} size={6}>{line}</Txt>)}
      <Txt x={610} y={140} size={6} muted>SEASON TINT</Txt>
      {(['spring', 'summer', 'autumn', 'winter'] as const).map((s, i) => {
        const p = spec.panels.find((q) => q.season === s && q.col === 2);
        return (
          <g key={s}>
            <rect x={610 + i * 90} y={148} width={20} height={10} fill={p?.tint ?? B.ink} opacity={0.7} stroke={B.ink} strokeWidth={WEIGHT.fine} />
            <Txt x={636 + i * 90} y={156} size={6}>{s.toUpperCase()}</Txt>
          </g>
        );
      })}
      <Legend x={610} y={190} />
      <Txt x={790} y={190} size={6} muted>HYDRAULICS</Txt>
      {[
        `${spec.hydraulics.organism.toUpperCase()}`,
        `${spec.hydraulics.medium.toUpperCase()} · ${spec.hydraulics.reservoirL} L RESERVOIR`,
        `${spec.hydraulics.flowMlMin} mL/min · ${spec.hydraulics.tubingIdMm} mm ID SILICONE`,
        `${spec.hydraulics.path.toUpperCase()} THROUGH ${spec.panels.length} PANELS`,
      ].map((l, i) => <Txt key={i} x={790} y={202 + i * 11} size={6}>{l}</Txt>)}
      {spec.logic && <LogicBlockBox block={spec.logic} activeRule={st.rule} stamp={st.stamp} />}
      <TitleBlockBox x={width - 380} y={height - 300} w={360} t={spec.title} />
      {(spec.notes ?? []).map((n, i) => wrap(n, 92).map((line, j) => (
        <Txt key={`${i}-${j}`} x={610} y={height - 180 + (i * 3 + j) * 9} size={5.5} muted>{line}</Txt>
      )))}
    </svg>
  );
}

function wrap(text: string, max: number): string[] {
  const words = text.split(' ');
  const out: string[] = [];
  let cur = '';
  for (const w of words) {
    if ((cur + ' ' + w).trim().length > max) { out.push(cur.trim()); cur = w; } else cur = `${cur} ${w}`;
  }
  if (cur.trim()) out.push(cur.trim());
  return out;
}
