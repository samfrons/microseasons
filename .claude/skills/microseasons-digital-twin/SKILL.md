---
name: microseasons-digital-twin
description: >-
  Build or change the digital twin of the 72-microseasons bioreactor
  calendar — the wall of timber-framed photobioreactor + microbial-fuel-cell
  panels in the renders under `microseasons-cal/`, and its ISA-5.1 process &
  instrumentation diagrams — as declarative specs linted and drawn on the
  blueprint plate, the way MESSAI's `mes-pid-schematic` does it. Use whenever
  the user wants the calendar "as a digital twin", a wall elevation, a P&ID /
  PFD / schematic / "blueprint sheet" of the calendar, its hydraulic serpentine
  or electrical bus, a per-panel sheet, a new state (day / night / refresh /
  trip), a new symbol, an SVG export for docs or laser engraving, or the
  `/twin` page; or touches `src/lib/twin/*`, `src/components/DigitalTwin/*`,
  `buildCalendarTwin`, `buildPanelPid`, `arrayPid`, `lintPid`,
  `lintCalendarTwin`, `CalendarTwinSheet`, `PidSheet`, instrument tags like
  `FT-101` / `ET-201` / `XV-103`, or the reference HTML blueprints
  `microseasons_calendar_final.html` / `microseasons_technical_blueprint.html`.
  Trigger even when no file is named — e.g. "make the calendar a digital twin",
  "add a heater to the loop", "light the whole of summer", "the balloons
  overlap", "what tag do I use for the lux sensor", "export sheet 2 as SVG".
  Do NOT hand-draw SVG and do NOT edit the HTML sketches in
  `microseasons-cal/`; write a spec, lint it, mount it.
---

# Microseasons digital twin (wall + P&ID sheets)

The wall in the renders — six columns by twelve rows of timber-framed
panels, one per kō, each a Chlorella photobioreactor window with a microbial
fuel cell behind it, a strip of day-LEDs under the window, silicone culture
tubing snaking behind the wall and a +/− bus in the vertical rails — drawn as
**three engineering sheets from data**, on the same Prussian-blue plate, with
the same ISA-5.1 grammar and the same lint-then-mount discipline as MESSAI's
`@messai/pid-schematic` (skill `mes-pid-schematic` in that repo).

| sheet                         | id / builder                          | what it is                                                                   |
| ----------------------------- | ------------------------------------- | ---------------------------------------------------------------------------- |
| **MS-CAL-001** wall elevation | `buildCalendarTwin(microseasons)`     | the 6 × 12 wall; states light one panel (today), a season, night, or drain it |
| **MS-CAL-002** array P&ID     | `arrayPid` (`sheets/array-pid.ts`)    | reservoir → pump → 72-panel serpentine → return; MFC array → boost → LED bus  |
| **MS-CAL-003-nn** panel P&ID  | `buildPanelPid(panel)`                | one panel: anode chamber \| Nafion \| photobioreactor + cathode, backlight, day strip |

Everything lives in **`src/lib/twin`** (specs, builders, lint, tokens) and
**`src/components/DigitalTwin`** (renderers, plate, static export). The visual
check is **`/twin`**.

## The one rule

**A sheet is DATA.** You write (or build) a `CalendarTwinSpec` / `PidSpec`,
run `lintCalendarTwin` / `lintPid`, then mount `<CalendarTwinSheet>` /
`<PidSheet>`. You never write `<line>` / `<rect>` by hand for a sheet, never
add d3, and never resurrect the cyan-on-navy HTML sketches in
`microseasons-cal/*.html` — they were the reference for the twin and are
superseded by it. If a symbol is missing, add ONE primitive to
`src/components/DigitalTwin/symbols.tsx`, ONE `EquipmentKind` member in
`src/lib/twin/spec.ts`, and ONE `case` in `PidDiagram.tsx`.

## Two ways in

1. **The wall and the per-panel sheets are BUILT, never written.** The 72
   panels come from `src/data/microseasons.ts` through `buildCalendarTwin`
   (reading order, serpentine ports, day-LED count, seasonal tint, tags
   `R-101…R-172`) and each panel's P&ID from `buildPanelPid(panel)`. A date or
   a name changes in the kō table → every sheet follows. To change what a
   panel sheet shows, change the builder; do not fork one panel.
2. **The array sheet is one hand-authored spec** (`sheets/array-pid.ts`),
   because there is exactly one wall. Copy it for a new one-off sheet (a
   bench rig, a single-row prototype) and register it in `sheets/index.ts` so
   `/twin`, the tests and the exporter pick it up.

## Procedure

1. **Gather the process before drawing.** In prose: every stream (culture,
   make-up, drain, O₂, circuit, LED bus), every purchasable item (reservoir,
   pump, valve, converter, supercap, LED array, relay), every measurement
   (FT flow, LT level, AT pH / OD / DO / lux, TT, ET, IT, JT), and the
   interlocks (what trips, what fails closed). If nothing trips, the sheet
   has one state.
2. **Copy the closest sheet** and keep its ROW GRID (below); change ids,
   tags, labels. App-specific one-offs sit next to the page that mounts them.
3. **Tag per ISA-5.1** — `reference/isa-5.1-bioreactor-calendar.md`. First
   letter = measured variable, the rest = function; one loop number per
   measurement; valves are final control elements (`XV-101`) and take
   `fail: 'FC' | 'FO'` when actuated; equipment uses the prefix table
   (`V-101`, `P-101`, `A-101`, `DC-201`, `B-201`, `L-201`, `PS-201`, `U-100`).
4. **Lint** — zero errors AND zero warnings for a shipped sheet
   (`src/lib/twin/__tests__/lint.test.ts` enforces it for every registered
   sheet). Run `npx jest src/lib/twin`.
5. **Look at it.** `crowded` catches bubbles / balloons on each other; it
   cannot see line routing or a label under a run, so export and look:
   ```ts
   // in a jest file (jsdom needs the TextEncoder polyfill first) or a node script
   import { renderPidToSvg, renderCalendarToSvg } from '@/components/DigitalTwin/render-static';
   ```
   `src/lib/twin/__tests__/render.test.tsx` shows the polyfill. Rasterise with
   Playwright's bundled Chromium if you need a PNG. Fix collisions by moving
   the item in the spec, never by shrinking fonts or loosening the check.
6. **Mount.** `<CalendarTwinSheet spec onSelectPanel />` and
   `<PidSheet spec />` (client: plate + chips + ↓ SVG); `<CalendarTwinDiagram>`
   / `<PidDiagram>` are the pure SVGs (server-safe). Static files:
   `renderCalendarToSvg` / `renderPidToSvg` from `render-static.ts` — that
   entry imports `react-dom/server`, never import it in a client component.

## The row grid (P&ID sheets, 1000 × 560)

| y       | what                                                       |
| ------- | ---------------------------------------------------------- |
| 22      | signal trunk (top) for ET / IT / JT                        |
| 40      | electrical instrument bubbles                              |
| 80      | external circuit / bus row — `kind: 'electric'`            |
| 110–130 | backlight, cathode lead (panel sheet)                      |
| 140–260 | chamber block (h 120), electrodes h 80                     |
| 170     | main process row: feed → pump → valve → array / chamber    |
| 300     | day strip (panel) · 330 return (array)                     |
| 350/370 | culture out (panel) · drain (array)                        |
| 380     | signal trunk (bottom) → `UY-100` at (860, 400)             |
| 250–360 | logic block at x 700–980 (rules ≤ 44 chars)                |
| 446+    | parts list (x 24, two columns), legend (x 524), title block |

Wall sheet is 1000 × 760: wall at origin (30, 46), panel 84 × 50, gap 8; right
column x 610+ holds state readout, tint key, legend, logic, title, notes.
Runs are orthogonal (the linter warns on diagonals). Signals may cross
process lines; process lines should not cross each other — reroute.

## Style rules (durable)

- **Two themes, one drawing.** `blueprint` — plate `#16324A → #0F2438`, ink
  `#D7E7F2`, bright `#F4FAFE`, live `#F6A97F`, timber `#C9A66B`; and
  `classic` — white paper, no drafting grid, ink `#111827`, live `#1D4ED8`,
  timber `#8B6A3E`. Both are `Palette`s in `PALETTES`
  (`src/lib/twin/blueprint.ts`) with identical key sets. **Never inline a
  colour and never read `BLUEPRINT` in a symbol or renderer — call
  `usePalette()`** (`src/components/DigitalTwin/theme.tsx`); that is the whole
  reason a third theme would be a palette, not a prop. `<TwinSheet>` carries
  the Blueprint / Classic chips and wraps the diagram in `TwinThemeProvider`;
  `renderPidToSvg(spec, state, theme)` does the same for static export.
  **No red, no cyan** — the old sketches' cyan ink and red/blue polarity
  strokes are the deprecated path.
- The ONE exception to ink-only: an algae window is tinted by season
  (`ALGAE_TINT`, blended per panel by `algaeTint(n)`), because the culture's
  colour is calendar data. Lines, labels and symbols stay ink.
- Three lineweights only (`WEIGHT`); hierarchy by weight and size, never by
  fading (opacity clamped ≥ .78).
- Sharp corners, mono type, uppercase drawing text with `.08em` tracking.
- Chips are `<button aria-pressed>`; state repaints, nothing animates.
- Title block always tells the truth: `status: 'CONCEPT'` stamps
  "CONCEPT — NOT FOR CONSTRUCTION". Every number on a sheet is a **design
  basis from MS-CAL-001**, not a measurement — say so in the notes.

## Gotchas

- **Valve tag vs vessel tag.** `kind: 'valve'` takes an ISA tag ending in V
  (`XV-104`); `V-104` is a reservoir and the linter says so.
- **One loop = one measurement.** `LT-501` + `LSLL-502`, `ET-201` + `IT-202`.
  `X` / `H` / `K` tags borrow loops freely.
- **Controllers have no leader.** `UY-100` / `KY-101` with `mount: 'dcs'` read
  the trunk; the `instrument-no-leader` warning skips them.
- **`from` / `to` are the continuity check** and decide which equipment
  glows live — name them on every process line.
- **Chamber `x` is its centre.** A 150-wide chamber at x 400 spans 325–475;
  a leader to (550, y) ends in air. Compute edges before placing leaders.
- **`labelSide: 'above'` stacks upward** (label, then tag above it) — use it
  for anything whose 'below' slot is a line.
- **Feb 29.** The kō table is a 365-day year; `panelForDate` folds leap day
  into the kō holding Feb 28. Don't add a 73rd panel.
- **The LED twin at `/led-twin` is a different product** (a 7 × 5 monthly
  WS2812B grid, `src/utils/ledController.ts`). The bioreactor wall has one
  strip of 4–7 day-LEDs per panel. Don't merge the two grids.
- **jsdom has no TextEncoder**; `react-dom/server` needs it. Polyfill from
  `util` before requiring the static renderer (see `render.test.tsx`).

## Files

- `src/lib/twin/spec.ts` — `CalendarTwinSpec`, `PidSpec`, `EquipmentKind`.
- `src/lib/twin/lint.ts` — `lintCalendarTwin`, `lintPid`, `formatLint`.
- `src/lib/twin/tags.ts` — ISA letter tables, `validateInstrumentTag`.
- `src/lib/twin/blueprint.ts` — `BLUEPRINT`, `CLASSIC`, `PALETTES`,
  `TwinTheme`, `ALGAE_TINT`, weights.
- `src/lib/twin/build-calendar.ts` — `buildCalendarTwin`, `panelForDate`, `algaeTint`.
- `src/lib/twin/sheets/array-pid.ts` — MS-CAL-002; `panel-pid.ts` — `buildPanelPid`;
  `index.ts` — `CALENDAR_TWIN`, `PID_SHEETS` registry.
- `src/components/DigitalTwin/theme.tsx` — `TwinThemeProvider`, `usePalette`,
  `useTwinTheme`, `defId` (per-theme marker / pattern ids).
- `src/components/DigitalTwin/symbols.tsx` — primitives; `PidDiagram.tsx`,
  `CalendarTwinDiagram.tsx` — renderers; `TwinSheet.tsx` — plate + chips;
  `render-static.ts` — SVG strings.
- `src/app/twin/page.tsx` — the gallery + lint readout.
- `reference/isa-5.1-bioreactor-calendar.md`, `reference/blueprint-style.md`.
- Reference imagery (read, never edit): `microseasons-cal/*.png`,
  `microseasons-cal/reference/*.png`, `microseasons-cal/*.html`.
