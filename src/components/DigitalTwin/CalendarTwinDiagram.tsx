/**
 * The two elevations of the monolith: face A (spring + summer) over face B
 * (autumn + winter), 36 timber-framed landscape panels each, a rail under
 * every row, the culture serpentine running down face A, crossing at the
 * base and running down face B, the +/− bus in the vertical rails of both
 * faces, one LED per day under every window. A `CalendarTwinSpec` in, one
 * SVG out. Server-safe.
 */
import { WEIGHT } from '@/lib/twin/blueprint';
import {
  allParameters,
  getCalendarState,
  type CalendarFace,
  type CalendarPanel,
  type CalendarTwinSpec,
  type Pt,
} from '@/lib/twin/spec';
import { Defs, Legend, LogicBlockBox, Poly, SheetFrame, TitleBlockBox, Txt } from './symbols';
import { usePalette, useTwinTheme } from './theme';

export interface CalendarTwinDiagramProps {
  spec: CalendarTwinSpec;
  state?: string;
  onSelect?: (p: CalendarPanel) => void;
  /** panel id drawn with the selection frame */
  selected?: string;
  className?: string;
}

/** The face a panel belongs to (falls back to the first face). */
export function faceFor(spec: CalendarTwinSpec, p: CalendarPanel): CalendarFace {
  return spec.faces.find((f) => f.id === p.face) ?? spec.faces[0];
}

export function panelRect(spec: CalendarTwinSpec, p: CalendarPanel) {
  const { w, h, gap } = spec.panel;
  const [ox, oy] = faceFor(spec, p).origin;
  return { x: ox + p.col * (w + gap), y: oy + p.row * (h + gap), w, h };
}

/** The extent of one face's grid on the sheet, in sheet units. */
export function faceBox(spec: CalendarTwinSpec, f: CalendarFace) {
  const { w, h, gap } = spec.panel;
  const [x, y] = f.origin;
  return { x, y, w: f.cols * (w + gap) - gap, h: f.rows * (h + gap) - gap };
}

/**
 * The boustrophedon tubing path through every panel of every face, as one
 * polyline — including the CROSSOVER, which leaves the last panel of a face
 * on its outer side, drops past the rail and enters the first panel of the
 * next face on the same side (physically: down through the plinth head).
 */
export function culturePath(spec: CalendarTwinSpec): Pt[] {
  const pts: Pt[] = [];
  const sorted = [...spec.panels].sort((a, b) => a.n - b.n);
  let face = sorted[0]?.face;
  for (const p of sorted) {
    const r = panelRect(spec, p);
    const yIn = r.y + r.h * 0.3;
    const inX = p.ports.in === 'left' ? r.x : r.x + r.w;
    const outX = p.ports.out === 'left' ? r.x : r.x + r.w;
    if (pts.length) {
      const last = pts[pts.length - 1];
      if (p.face !== face) {
        /* crossover: down into the corridor between the faces (physically
           the plinth head), along the outside, and up into the next face */
        const prev = spec.faces.find((f) => f.id === face);
        const box = prev ? faceBox(spec, prev) : { y: last[1], h: 0 };
        const corridorY = box.y + box.h + 54;
        const outerX = Math.min(last[0], inX) - 22;
        pts.push([last[0], corridorY], [outerX, corridorY], [outerX, yIn], [inX, yIn]);
        face = p.face;
      } else if (last[1] !== yIn) {
        /* row change: drop down the outer edge to the next row */
        pts.push([last[0], yIn]);
      }
    }
    pts.push([inX, yIn], [outX, yIn]);
  }
  return pts;
}

/** Where the right-hand information column starts. */
const COL = 660;

export function CalendarTwinDiagram({ spec, state, onSelect, selected, className }: CalendarTwinDiagramProps) {
  const pal = usePalette();
  const theme = useTwinTheme();
  const st = getCalendarState(spec, state);
  const lit = new Set(st.litPanels);
  const cultureLive = st.streams.includes('culture');
  const busLive = st.streams.includes('bus');
  const filled = st.cultureFilled !== false;
  const { width, height } = spec.sheet;
  const { w, h, gap } = spec.panel;
  const interactive = Boolean(onSelect);
  /* on white paper a 45% tint washes out — print the culture a little harder */
  const litTintOpacity = theme === 'classic' ? 0.9 : 0.85;
  const idleTintOpacity = theme === 'classic' ? 0.5 : 0.45;
  const params = allParameters(spec.parameters ?? []);
  const basisCount = (b: string) => params.filter((p) => p.v.basis === b).length;

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

      {/* ------------------------------------------------ the two faces */}
      {spec.faces.map((f) => {
        const b = faceBox(spec, f);
        return (
          <g key={f.id} data-face={f.id}>
            <Txt x={b.x} y={b.y - 16} size={7.5} bright weight={600}>{f.label}</Txt>
            <Txt x={b.x + b.w} y={b.y - 16} size={6} anchor="end" muted>
              {`KŌ ${f.from}–${f.to} · ${f.cols} × ${f.rows}`}
            </Txt>
            {/* vertical rails carrying the bus bars */}
            <rect x={b.x - 14} y={b.y - 8} width={8} height={b.h + 16} fill={pal.body} stroke={pal.timber} strokeWidth={WEIGHT.fine} />
            <rect x={b.x + b.w + 6} y={b.y - 8} width={8} height={b.h + 16} fill={pal.body} stroke={pal.timber} strokeWidth={WEIGHT.fine} />
            <Poly pts={[[b.x - 10, b.y - 8], [b.x - 10, b.y + b.h + 8]]} kind="electric" live={busLive} />
            <Poly pts={[[b.x + b.w + 10, b.y - 8], [b.x + b.w + 10, b.y + b.h + 8]]} kind="electric" live={busLive} />
            <Txt x={b.x - 18} y={b.y + b.h / 2} size={6} anchor="middle" rotate={-90} muted>
              {spec.electrical.anodeBus === 'left' ? 'ANODE BUS (−)' : 'CATHODE BUS (+)'}
            </Txt>
            <Txt x={b.x + b.w + 22} y={b.y + b.h / 2} size={6} anchor="middle" rotate={90} muted>
              {spec.electrical.anodeBus === 'left' ? 'CATHODE BUS (+)' : 'ANODE BUS (−)'}
            </Txt>
            {/* horizontal rail under every row */}
            {Array.from({ length: f.rows }, (_, r) => (
              <rect key={r} x={b.x - 6} y={b.y + r * (h + gap) + h + 1} width={b.w + 12} height={3} fill={pal.timber} opacity={0.55} />
            ))}
            {/* dimension line under the face */}
            <Poly pts={[[b.x, b.y + b.h + 16], [b.x + b.w, b.y + b.h + 16]]} kind="signal" />
            <Txt x={b.x + b.w / 2} y={b.y + b.h + 26} size={6} anchor="middle" muted>
              {`FACE ${f.id} · ${f.cols} × ${f.rows} PANELS · ${spec.panel.mm.w} × ${spec.panel.mm.h} mm EACH · ${spec.envelope.wMm} mm WIDE OVER FRAME`}
            </Txt>
          </g>
        );
      })}

      {/* culture tubing inside the frame, both faces + the crossover */}
      <Poly pts={culturePath(spec)} kind="process" live={cultureLive} stroke={cultureLive ? undefined : pal.muted} />
      {spec.faces.length > 1 && (
        <Txt x={44} y={faceBox(spec, spec.faces[0]).y + faceBox(spec, spec.faces[0]).h + 72} size={6} muted>
          {`CROSSOVER ${spec.hydraulics.crossover.at.toUpperCase()} · ${spec.hydraulics.crossover.note}`}
        </Txt>
      )}

      {/* ------------------------------------------------------ panels */}
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
            data-face={p.face}
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
            {isLit && <rect x={r.x - 3} y={r.y - 3} width={r.w + 6} height={r.h + 6} fill={pal.live} opacity={0.22} />}
            {/* frame */}
            <rect x={r.x} y={r.y} width={r.w} height={r.h} fill={pal.body} stroke={isLit ? pal.live : pal.timber} strokeWidth={isLit ? WEIGHT.live : WEIGHT.process} />
            {/* culture window */}
            <rect x={r.x + 6} y={r.y + 5} width={r.w - 12} height={r.h - 22} fill={filled ? p.tint : 'none'} opacity={filled ? (isLit ? litTintOpacity : idleTintOpacity) : 1} stroke={pal.ink} strokeWidth={WEIGHT.fine} strokeDasharray={filled ? undefined : '2 2'} />
            {/* ports */}
            <circle cx={p.ports.in === 'left' ? r.x + 3 : r.x + r.w - 3} cy={r.y + r.h * 0.3} r={1.6} fill={cultureLive ? pal.live : pal.ink} />
            <circle cx={p.ports.out === 'left' ? r.x + 3 : r.x + r.w - 3} cy={r.y + r.h * 0.3} r={1.6} fill="none" stroke={pal.ink} strokeWidth={WEIGHT.fine} />
            {/* electrode leads to the bus rails */}
            <line x1={r.x} y1={r.y + r.h - 12} x2={r.x + 4} y2={r.y + r.h - 12} stroke={pal.ink} strokeWidth={WEIGHT.fine} />
            <line x1={r.x + r.w - 4} y1={r.y + r.h - 12} x2={r.x + r.w} y2={r.y + r.h - 12} stroke={pal.ink} strokeWidth={WEIGHT.fine} />
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
                  fill={today ? pal.hi : on ? pal.live : 'none'}
                  opacity={on && !today && !isLit ? 0.55 : 1}
                  stroke={pal.ink}
                  strokeWidth={0.4}
                />
              );
            })}
            {/* engraving: number + name */}
            <Txt x={r.x + 8} y={r.y + r.h - 3} size={4.6} muted={!isLit} bright={isLit}>{`#${p.n} ${p.nameEn.toUpperCase().slice(0, 18)}`}</Txt>
            <Txt x={r.x + r.w - 6} y={r.y + 11} size={4.6} anchor="end" bright={isLit} opacity={0.9}>{p.nameJa}</Txt>
            {isSel && <rect x={r.x - 1.5} y={r.y - 1.5} width={r.w + 3} height={r.h + 3} fill="none" stroke={pal.hi} strokeWidth={0.8} strokeDasharray="3 2" />}
          </g>
        );
      })}

      {/* -------------------------------------------- information column */}
      <Txt x={COL} y={60} size={6} muted>STATE</Txt>
      <Txt x={COL} y={72} size={8} bright weight={600}>{st.label.toUpperCase()}{st.band ? ` · ${st.band.toUpperCase()}` : ''}</Txt>
      {wrap(st.description, 54).slice(0, 5).map((line, i) => <Txt key={i} x={COL} y={86 + i * 9} size={6}>{line}</Txt>)}

      <Txt x={COL} y={150} size={6} muted>ENVELOPE · FREESTANDING</Txt>
      {[
        `${spec.envelope.wMm} W × ${spec.envelope.hMm} H × ${spec.envelope.dMm} D mm OVERALL`,
        `PLINTH ${spec.plinth.wMm} × ${spec.plinth.dMm} × ${spec.plinth.hMm} mm (V-101 · P-101)`,
        `PANEL ${spec.panel.mm.w} × ${spec.panel.mm.h} × ${spec.panel.mm.d} mm · GAP ${spec.frame.gapMm} mm`,
        `FRAME ${spec.frame.sectionMm} × ${spec.frame.sectionMm} mm · ${spec.faces.length} FACES × ${spec.grid.cols * spec.grid.rows} PANELS`,
      ].map((l, i) => <Txt key={i} x={COL} y={162 + i * 11} size={6}>{l}</Txt>)}

      <Txt x={COL} y={224} size={6} muted>SEASON TINT</Txt>
      {(['spring', 'summer', 'autumn', 'winter'] as const).map((s, i) => {
        const swatch = spec.panels.find((q) => q.season === s && q.col === 2);
        const x = COL + (i % 2) * 160;
        const y = 232 + Math.floor(i / 2) * 16;
        return (
          <g key={s}>
            <rect x={x} y={y} width={20} height={10} fill={swatch?.tint ?? pal.ink} opacity={0.7} stroke={pal.ink} strokeWidth={WEIGHT.fine} />
            <Txt x={x + 26} y={y + 8} size={6}>{`${s.toUpperCase()} · FACE ${swatch?.face ?? '—'}`}</Txt>
          </g>
        );
      })}

      <Legend x={COL} y={284} />

      <Txt x={COL} y={372} size={6} muted>HYDRAULICS</Txt>
      {[
        `${spec.hydraulics.organism.toUpperCase()}`,
        `${spec.hydraulics.medium.toUpperCase()} · ${spec.hydraulics.reservoirL} L RESERVOIR`,
        `${spec.hydraulics.flowMlMin} mL/min · ${spec.hydraulics.tubingIdMm} mm ID SILICONE`,
        `${spec.hydraulics.path.toUpperCase()} · ${spec.panels.length} PANELS IN SERIES`,
        `CROSSOVER AT THE ${spec.hydraulics.crossover.at.toUpperCase()}`,
      ].map((l, i) => <Txt key={i} x={COL} y={384 + i * 11} size={6}>{l}</Txt>)}

      <Txt x={COL} y={452} size={6} muted>PARAMETERS · SEE MS-CAL-004 DATASHEET</Txt>
      {[
        `${params.length} PARAMETERS IN ${spec.parameters.length} SECTIONS`,
        `${basisCount('design')} DESIGN · ${basisCount('literature')} LITERATURE · ${basisCount('vendor')} VENDOR`,
        `${basisCount('assumed')} ASSUMED · ${basisCount('measured')} MEASURED`,
      ].map((l, i) => <Txt key={i} x={COL} y={464 + i * 11} size={6}>{l}</Txt>)}
      <Txt x={COL} y={506} size={5.5} muted>EVERY ROW CARRIES ITS BASIS — NOTHING HERE HAS BEEN MEASURED.</Txt>

      {spec.logic && <LogicBlockBox block={spec.logic} activeRule={st.rule} stamp={st.stamp} />}
      <TitleBlockBox x={COL} y={height - 110} w={width - COL - 40} t={spec.title} />
      {(spec.notes ?? []).map((n, i) => wrap(n, 148).map((line, j) => (
        <Txt key={`${i}-${j}`} x={30} y={height - 210 + (i * 2 + j) * 10} size={5.5} muted>{line}</Txt>
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
