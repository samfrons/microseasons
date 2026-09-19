# Digital twin — the bioreactor calendar as engineering sheets

The wall in the renders under `microseasons-cal/` (six columns by twelve rows
of timber-framed photobioreactor panels, one per kō, a microbial fuel cell
behind every culture window, a strip of day-LEDs under it, silicone culture
tubing snaking behind the wall, a +/− bus in the vertical rails) is modelled
as **three ISA-5.1 sheets from one declarative spec**, following the
spec → lint → render pattern of MESSAI's `@messai/pid-schematic`.

| sheet          | drawing         | source                                             |
| -------------- | --------------- | -------------------------------------------------- |
| wall elevation | `MS-CAL-001`    | `buildCalendarTwin(microseasons)`                  |
| array P&ID     | `MS-CAL-002`    | `src/lib/twin/sheets/array-pid.ts`                 |
| panel P&ID     | `MS-CAL-003-nn` | `buildPanelPid(panel)` — one per panel, 72 sheets  |

See them at **`/twin`**. Click a panel on the wall to open its own P&ID.
Each sheet has state chips (today / season / night / refresh; day / night /
refresh / trip; day / night / habit / refresh) that repaint the live path in
amber, and a ↓ SVG button that downloads the drawing as shown.

## Where things live

- `src/lib/twin/` — `spec.ts` (types), `blueprint.ts` (plate tokens),
  `tags.ts` (ISA tables), `lint.ts` (`lintCalendarTwin`, `lintPid`),
  `build-calendar.ts` (the wall from the kō table), `sheets/` (the P&ID
  specs + registry).
- `src/components/DigitalTwin/` — `symbols.tsx` (primitives),
  `PidDiagram.tsx` + `CalendarTwinDiagram.tsx` (pure SVG renderers),
  `TwinSheet.tsx` (plate + chips), `render-static.ts` (SVG strings for docs
  or a laser-engraving step).
- `src/app/twin/page.tsx` — the gallery with a lint readout.
- `.claude/skills/microseasons-digital-twin/` — the agent playbook, ISA-5.1
  cheat sheet and style notes.

## Working on it

```bash
npx jest src/lib/twin        # lint every registered sheet + render contract
npm run type-check
npm run dev                  # http://localhost:3000/twin
```

A shipped sheet lints with **zero errors and zero warnings**; the test suite
fails otherwise. Fix a `crowded` warning by moving the instrument or balloon
in the spec, never by loosening the check.

## Honesty note

Every number on the sheets (50 mL/min, 20 L, 0.5 V per cell, 7–11 W array,
36 W of LEDs, 250 mL per panel) is the **design basis** carried over from the
reference blueprint `MS-CAL-001` in `microseasons-cal/`. Nothing has been
measured; the title block says CONCEPT — NOT FOR CONSTRUCTION for that reason.
