/**
 * Generic P&ID renderer: a `PidSpec` in, one SVG out. Draw order is lines
 * → bodies → instruments → furniture so opaque bodies hide the runs behind
 * them. Pure and server-safe (no hooks, no window).
 */
import { WEIGHT } from '@/lib/twin/blueprint';
import { getPidState, type Equipment, type PidSpec, type Pt } from '@/lib/twin/spec';
import { EquipmentGlyph } from './EquipmentGlyph';
import {
  Balloon, Defs, InstrumentBubble, Leader, Legend, LogicBlockBox, PartsList, Poly, SheetFrame,
  TitleBlockBox, Txt,
} from './symbols';
import { usePalette } from './theme';

export interface PidDiagramProps {
  spec: PidSpec;
  state?: string;
  /** callback when an equipment item is activated (click / Enter) */
  onSelect?: (e: Equipment) => void;
  className?: string;
}

export function PidDiagram({ spec, state, onSelect, className }: PidDiagramProps) {
  const p = usePalette();
  const st = getPidState(spec, state);
  const lit = new Set(st.streams);
  const open = new Set(st.valvesOpen ?? []);
  const byId = new Map(spec.equipment.map((e) => [e.id, e]));
  const liveEq = new Set<string>();
  for (const l of spec.lines) if (lit.has(l.stream)) { if (l.from) liveEq.add(l.from); if (l.to) liveEq.add(l.to); }
  const instPos = new Map<string, Pt>(spec.instruments.map((i) => [i.tag, [i.x, i.y]]));
  for (const e of spec.equipment) if (e.tag) instPos.set(e.tag, [e.x, e.y]);
  const { width, height } = spec.sheet;

  const drawEquipment = (e: Equipment) => (
    <EquipmentGlyph key={e.id} e={e} live={liveEq.has(e.id)} open={open.has(e.id)} onSelect={onSelect} />
  );

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

      {/* 1. signals (behind everything) */}
      {(spec.signals ?? []).map((s, i) => {
        const a = instPos.get(s.from);
        const b = instPos.get(s.to);
        if (!a || !b) return null;
        const pts: Pt[] = s.via ? [a, ...s.via, b] : [a, [b[0], a[1]], b];
        return <Poly key={`sig-${i}`} pts={pts} kind="signal" />;
      })}

      {/* 2. process / electrical lines */}
      {spec.lines.map((l) => (
        <g key={l.id}>
          <Poly pts={l.pts} kind={l.kind ?? 'process'} live={lit.has(l.stream)} arrow={l.arrow} />
          {l.endLabel && <Txt x={l.pts[l.pts.length - 1][0] + 4} y={l.pts[l.pts.length - 1][1] - 4} size={6} muted>{l.endLabel}</Txt>}
        </g>
      ))}

      {/* 3. bodies — chambers first so electrodes and membranes sit on top */}
      {spec.equipment.filter((e) => e.kind === 'chamber' || e.kind === 'vessel' || e.kind === 'panelArray').map(drawEquipment)}
      {spec.equipment.filter((e) => e.kind !== 'chamber' && e.kind !== 'vessel' && e.kind !== 'panelArray').map(drawEquipment)}

      {/* 4. instruments */}
      {spec.instruments.map((i) => (
        <g key={i.tag}>
          {i.leaderTo && <Leader from={[i.x, i.y]} to={i.leaderTo} />}
          <InstrumentBubble x={i.x} y={i.y} tag={i.tag} mount={i.mount} tip={i.tip} />
        </g>
      ))}

      {/* 5. callouts */}
      {(spec.callouts ?? []).map((c) => <Balloon key={c.n} x={c.x} y={c.y} n={c.n} to={c.to} />)}

      {/* 6. furniture */}
      {spec.logic && <LogicBlockBox block={spec.logic} activeRule={st.rule} stamp={st.stamp} />}
      {spec.parts && <PartsList x={24} y={height - 114} parts={spec.parts} />}
      <Legend x={524} y={height - 114} />
      <TitleBlockBox x={width - 360} y={height - 108} t={spec.title} />
      {(spec.notes ?? []).flatMap((n) => wrapNote(n, 150)).slice(0, 3).map((n, i) => (
        <Txt key={i} x={24} y={height - 22 + i * 8} size={5.5} muted>{n}</Txt>
      ))}
      <line x1={0} y1={height - 30} x2={width - 362} y2={height - 30} stroke={p.ink} strokeWidth={WEIGHT.fine} opacity={0.4} />
      {byId.size === 0 && <Txt x={width / 2} y={height / 2} anchor="middle">EMPTY SHEET</Txt>}
    </svg>
  );
}

/** Notes wrap at a character budget so they never run under the title block. */
export function wrapNote(text: string, max: number): string[] {
  const out: string[] = [];
  let cur = '';
  for (const w of text.split(' ')) {
    if ((cur + ' ' + w).trim().length > max) { out.push(cur.trim()); cur = w; } else cur = `${cur} ${w}`;
  }
  if (cur.trim()) out.push(cur.trim());
  return out;
}
