/**
 * Generic venue-plan renderer: a `VenuePlanSpec` in, one SVG out. A plan
 * sheet is data like every other sheet here — rectangles with a meaning
 * (built fabric, clearance zone, thing above the cut, cut material),
 * dimension strings, leader notes, and the SAME P&ID equipment symbols for
 * whatever lives inside the plinth. Pure and server-safe.
 */
import { MONO_FONT, WEIGHT } from '@/lib/twin/blueprint';
import { getVenueState, type DatasheetBlock, type PlanDim, type PlanShape, type PlanView, type VenuePlanSpec } from '@/lib/twin/spec';
import { EquipmentGlyph } from './EquipmentGlyph';
import { Defs, InstrumentBubble, Leader, LogicBlockBox, Poly, SheetFrame, TitleBlockBox, Txt } from './symbols';
import { usePalette } from './theme';

export interface VenuePlanDiagramProps {
  spec: VenuePlanSpec;
  state?: string;
  className?: string;
}

/** A rectangle that means something: fabric, clearance, ghost or cut. */
function Shape({ s, live }: { s: PlanShape; live: boolean }) {
  const p = usePalette();
  const cx = s.x + s.w / 2;
  const stroke = live ? p.live : p.ink;
  const common = { x: s.x, y: s.y, width: s.w, height: s.h };
  const labelY = s.kind === 'zone' ? s.y + 14 : s.y + s.h / 2 + 1;
  return (
    <g data-shape={s.id}>
      {s.tip && <title>{`${s.label ?? s.id} — ${s.tip}`}</title>}
      {s.kind === 'solid' && <rect {...common} fill={p.body} stroke={stroke} strokeWidth={live ? WEIGHT.live : WEIGHT.process} />}
      {s.kind === 'hatch' && <rect {...common} fill={p.body} stroke={stroke} strokeWidth={WEIGHT.process} />}
      {s.kind === 'zone' && (
        <g>
          {live && <rect {...common} fill={p.live} opacity={0.12} />}
          <rect {...common} fill="none" stroke={stroke} strokeWidth={WEIGHT.fine} strokeDasharray="6 4" />
        </g>
      )}
      {s.kind === 'ghost' && <rect {...common} fill="none" stroke={stroke} strokeWidth={WEIGHT.fine} strokeDasharray="3 3" />}
      {s.label && <Txt x={cx} y={labelY} size={6} anchor="middle" bright={live}>{s.label.toUpperCase()}</Txt>}
      {s.sub && <Txt x={cx} y={labelY + 9} size={5.5} anchor="middle" muted>{s.sub.toUpperCase()}</Txt>}
    </g>
  );
}

/** A dimension: witness ticks at both ends, the figure on the line. */
function Dim({ d }: { d: PlanDim }) {
  const p = usePalette();
  const [x1, y1] = d.from;
  const [x2, y2] = d.to;
  const vertical = x1 === x2;
  const t = 3;
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2;
  return (
    <g data-dim={d.id}>
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={p.ink} strokeWidth={WEIGHT.signal} />
      {vertical ? (
        <g>
          <line x1={x1 - t} y1={y1} x2={x1 + t} y2={y1} stroke={p.ink} strokeWidth={WEIGHT.signal} />
          <line x1={x2 - t} y1={y2} x2={x2 + t} y2={y2} stroke={p.ink} strokeWidth={WEIGHT.signal} />
          <text x={mx - 4} y={my} fontFamily={MONO_FONT} fontSize={6} textAnchor="middle" fill={p.ink} letterSpacing=".08em" transform={`rotate(-90 ${mx - 4} ${my})`}>{d.text}</text>
        </g>
      ) : (
        <g>
          <line x1={x1} y1={y1 - t} x2={x1} y2={y1 + t} stroke={p.ink} strokeWidth={WEIGHT.signal} />
          <line x1={x2} y1={y2 - t} x2={x2} y2={y2 + t} stroke={p.ink} strokeWidth={WEIGHT.signal} />
          <Txt x={mx} y={my - 3} size={6} anchor="middle">{d.text}</Txt>
        </g>
      )}
    </g>
  );
}

function View({ v, lit }: { v: PlanView; lit: Set<string> }) {
  const p = usePalette();
  return (
    <g data-view={v.id}>
      <Txt x={v.x} y={v.y - 8} size={6.5} bright weight={600}>{v.label}</Txt>
      <rect x={v.x} y={v.y} width={v.w} height={v.h} fill="none" stroke={p.ink} strokeWidth={WEIGHT.fine} opacity={0.45} />
      {v.shapes.map((s) => <Shape key={s.id} s={s} live={Boolean(s.stream && lit.has(s.stream))} />)}
      {(v.lines ?? []).map((l) => (
        <g key={l.id}>
          <Poly pts={l.pts} kind={l.kind ?? 'process'} live={lit.has(l.stream)} arrow={l.arrow} />
          {l.endLabel && <Txt x={l.pts[l.pts.length - 1][0] + 4} y={l.pts[l.pts.length - 1][1] - 4} size={5.5} muted>{l.endLabel}</Txt>}
        </g>
      ))}
      {(v.equipment ?? []).map((e) => <EquipmentGlyph key={e.id} e={e} live={false} />)}
      {(v.instruments ?? []).map((i) => (
        <g key={i.tag}>
          {i.leaderTo && <Leader from={[i.x, i.y]} to={i.leaderTo} />}
          <InstrumentBubble x={i.x} y={i.y} tag={i.tag} mount={i.mount} tip={i.tip} />
        </g>
      ))}
      {(v.dims ?? []).map((d) => <Dim key={d.id} d={d} />)}
      {(v.notes ?? []).map((n) => (
        <g key={n.id}>
          {n.to && <Leader from={[n.x, n.y - 2]} to={n.to} />}
          <Txt x={n.x} y={n.y} size={5.5} anchor={n.anchor ?? 'start'} muted>{n.text.toUpperCase()}</Txt>
        </g>
      ))}
    </g>
  );
}

/** The printed datasheet: value · unit · BASIS, in two columns. */
function Datasheet({ x, y, w, block }: { x: number; y: number; w: number; block: DatasheetBlock }) {
  const p = usePalette();
  const per = Math.ceil(block.rows.length / 2);
  const colW = w / 2;
  return (
    <g data-datasheet="1">
      <Txt x={x} y={y} size={6} muted>{block.title.toUpperCase()}</Txt>
      <line x1={x} y1={y + 5} x2={x + w} y2={y + 5} stroke={p.ink} strokeWidth={WEIGHT.fine} opacity={0.5} />
      {block.rows.map((r, i) => {
        const c = Math.floor(i / per);
        const rr = i % per;
        const rx = x + c * colW;
        const ry = y + 18 + rr * 13;
        const value = `${r.v.value}${r.v.unit ? ` ${r.v.unit}` : ''}`;
        return (
          <g key={`${r.label}-${i}`}>
            <Txt x={rx} y={ry} size={6} muted>{r.label.toUpperCase()}</Txt>
            <Txt x={rx + colW - 62} y={ry} size={6} anchor="end" bright weight={600}>{value.toUpperCase().slice(0, 30)}</Txt>
            <rect x={rx + colW - 58} y={ry - 7} width={52} height={9} fill="none" stroke={p.ink} strokeWidth={WEIGHT.fine} opacity={0.6} />
            <Txt x={rx + colW - 32} y={ry} size={5.5} anchor="middle">{r.v.basis.toUpperCase()}</Txt>
          </g>
        );
      })}
    </g>
  );
}

export function VenuePlanDiagram({ spec, state, className }: VenuePlanDiagramProps) {
  const p = usePalette();
  const st = getVenueState(spec, state);
  const lit = new Set(st.streams);
  const { width, height } = spec.sheet;
  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      width="100%"
      role="img"
      aria-label={`${spec.title.drawing} — ${spec.title.title}. State ${st.label}: ${st.description}`}
      className={className}
      style={{ display: 'block', fontFamily: 'inherit' }}
    >
      <Defs />
      <SheetFrame w={width} h={height} />
      {spec.caption && <Txt x={12} y={12} size={6} muted>{spec.caption.toUpperCase()}</Txt>}

      {/* the state readout sits in the column right of the two views */}
      <Txt x={710} y={64} size={6} muted>STATE</Txt>
      <Txt x={710} y={76} size={8} bright weight={600}>{st.label.toUpperCase()}{st.band ? ` · ${st.band.toUpperCase()}` : ''}</Txt>
      {wrapText(st.description, 42).slice(0, 6).map((l, i) => <Txt key={i} x={710} y={92 + i * 9} size={6}>{l}</Txt>)}
      {st.stamp && <Txt x={710} y={158} size={6.5} weight={700} bright>{st.stamp}</Txt>}
      <Txt x={710} y={186} size={6} muted>CLEARANCE SCHEDULE</Txt>
      {spec.views[0]?.shapes.filter((s) => s.kind === 'zone').map((s, i) => (
        <Txt key={s.id} x={710} y={198 + i * 11} size={6}>{`${(s.label ?? s.id).toUpperCase()} · ${(s.sub ?? '').toUpperCase()}`}</Txt>
      ))}

      {spec.views.map((v) => <View key={v.id} v={v} lit={lit} />)}

      <Datasheet x={30} y={470} w={600} block={spec.datasheet} />
      {spec.logic && <LogicBlockBox block={spec.logic} activeRule={st.rule} stamp={st.stamp} />}
      <TitleBlockBox x={width - 340} y={height - 106} w={300} t={spec.title} />
      {(spec.notes ?? []).flatMap((n) => wrapText(n, 148)).slice(0, 4).map((n, i) => (
        <Txt key={i} x={30} y={height - 62 + i * 9} size={5.5} muted>{n}</Txt>
      ))}
      <line x1={0} y1={height - 74} x2={width - 346} y2={height - 74} stroke={p.ink} strokeWidth={WEIGHT.fine} opacity={0.4} />
    </svg>
  );
}

function wrapText(text: string, max: number): string[] {
  const out: string[] = [];
  let cur = '';
  for (const w of text.split(' ')) {
    if ((cur + ' ' + w).trim().length > max) { out.push(cur.trim()); cur = w; } else cur = `${cur} ${w}`;
  }
  if (cur.trim()) out.push(cur.trim());
  return out;
}
