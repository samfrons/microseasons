/**
 * ONE piece of equipment, drawn from its `Equipment` record: the body for
 * its `kind`, the tag, the label. Lifted out of `PidDiagram` so the venue
 * plan (MS-CAL-004) draws the reservoir and pump inside the plinth with
 * exactly the same symbols as the P&ID — a second set would drift.
 *
 * Pure and server-safe; every colour comes from `usePalette()` inside the
 * primitives.
 */
import type { ReactNode } from 'react';
import type { Equipment } from '@/lib/twin/spec';
import {
  Cabinet, Chamber, Converter, Electrode, Filter, Led, Load, Membrane, OffSheet, PanelArray,
  PowerSupply, Pump, SamplePoint, Storage, Switch, Txt, Valve, Vessel,
} from './symbols';

export function labelPos(e: Equipment): { x: number; y: number; anchor: 'start' | 'middle' | 'end' } {
  const w = e.w ?? 28;
  const h = e.h ?? 28;
  switch (e.labelSide) {
    case 'above': return { x: e.x, y: e.y - h / 2 - 6, anchor: 'middle' };
    case 'left': return { x: e.x - w / 2 - 6, y: e.y + 2.5, anchor: 'end' };
    case 'right': return { x: e.x + w / 2 + 6, y: e.y + 2.5, anchor: 'start' };
    default: return { x: e.x, y: e.y + h / 2 + 10, anchor: 'middle' };
  }
}

export interface EquipmentGlyphProps {
  e: Equipment;
  /** the item sits on a live stream in this state */
  live?: boolean;
  /** valves / switches drawn open (closed) */
  open?: boolean;
  onSelect?: (e: Equipment) => void;
}

export function EquipmentGlyph({ e, live = false, open = false, onSelect }: EquipmentGlyphProps) {
  const w = e.w ?? 28;
  const h = e.h ?? 28;
  const lp = labelPos(e);
  const tagLine = e.tag ? (e.kind === 'valve' && e.fail ? `${e.tag} ${e.fail}` : e.tag) : null;
  let body: ReactNode = null;
  switch (e.kind) {
    case 'chamber': body = <Chamber x={e.x} y={e.y} w={w} h={h} live={live} />; break;
    case 'vessel': body = <Vessel x={e.x} y={e.y} w={w} h={h} live={live} />; break;
    case 'pump': body = <Pump x={e.x} y={e.y} live={live} />; break;
    case 'valve': body = <Valve x={e.x} y={e.y} open={open} actuated={e.actuated} vertical={e.vertical} />; break;
    case 'membrane': body = <Membrane x={e.x} y={e.y} w={w} h={h} />; break;
    case 'electrode': body = <Electrode x={e.x} y={e.y} w={w} h={h} polarity={e.polarity ?? 'anode'} live={live} />; break;
    case 'led': body = <Led x={e.x} y={e.y} w={w} h={h} on={live} />; break;
    case 'load': body = <Load x={e.x} y={e.y} w={w} live={live} />; break;
    case 'powerSupply': body = <PowerSupply x={e.x} y={e.y} w={w} h={h} live={live} />; break;
    case 'converter': body = <Converter x={e.x} y={e.y} w={w} h={h} live={live} />; break;
    case 'storage': body = <Storage x={e.x} y={e.y} w={w} live={live} />; break;
    case 'switch': body = <Switch x={e.x} y={e.y} w={w} closed={open} vertical={e.vertical} />; break;
    case 'panelArray': body = <PanelArray x={e.x} y={e.y} w={w} h={h} live={live} />; break;
    case 'filter': body = <Filter x={e.x} y={e.y} w={w} h={h} />; break;
    case 'sample': body = <SamplePoint x={e.x} y={e.y} />; break;
    case 'cabinet': body = <Cabinet x={e.x} y={e.y} w={w} h={h} />; break;
    case 'source':
    case 'sink': body = <OffSheet x={e.x} y={e.y} kind={e.kind} label={e.label} live={live} />; break;
  }
  const interactive = Boolean(onSelect);
  const aria = e.tip ? `${e.tag ?? e.label ?? e.id} — ${e.tip}` : e.tag ?? e.label ?? e.id;
  return (
    <g
      data-equipment={e.id}
      role={interactive ? 'button' : undefined}
      tabIndex={interactive ? 0 : undefined}
      aria-label={aria}
      style={interactive ? { cursor: 'pointer' } : undefined}
      onClick={interactive ? () => onSelect?.(e) : undefined}
      onKeyDown={interactive ? (ev) => { if (ev.key === 'Enter' || ev.key === ' ') { ev.preventDefault(); onSelect?.(e); } } : undefined}
    >
      {e.tip && <title>{aria}</title>}
      {body}
      {e.kind !== 'source' && e.kind !== 'sink' && (
        <g>
          {/* 'above' stacks upward so the label never falls back into the body */}
          {tagLine && <Txt x={lp.x} y={e.labelSide === 'above' && e.label ? lp.y - 8 : lp.y} size={6.5} anchor={lp.anchor} bright weight={600}>{tagLine}</Txt>}
          {e.label && <Txt x={lp.x} y={e.labelSide === 'above' ? lp.y : lp.y + (tagLine ? 8 : 0)} size={6} anchor={lp.anchor} muted>{e.label}</Txt>}
        </g>
      )}
    </g>
  );
}
