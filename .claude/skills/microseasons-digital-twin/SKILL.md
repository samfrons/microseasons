---
name: microseasons-digital-twin
description: >-
  Build or change the digital twin of the 72-microseasons bioreactor
  calendar — the freestanding double-sided monolith of timber-framed
  photobioreactor + microbial-fuel-cell panels (36 per face) on its plinth,
  its venue plan, its parameters layer and its ISA-5.1 process &
  instrumentation diagrams — as declarative specs linted and drawn on the
  blueprint plate, the way MESSAI's `mes-pid-schematic` does it. Use whenever
  the user wants the calendar "as a digital twin", an elevation of either
  face, a venue plan, a parameters table / datasheet, a P&ID / PFD / schematic
  / "blueprint sheet" of the calendar, its hydraulic serpentine or electrical
  bus, a per-panel sheet, a new state (day / night / refresh / trip / viewing /
  service), a new symbol, an SVG export for docs or laser engraving, or the
  `/twin` page; or touches `src/lib/twin/*`, `src/components/DigitalTwin/*`,
  `buildCalendarTwin`, `buildVenuePlan`, `buildPanelPid`, `arrayPid`,
  `lintPid`, `lintCalendarTwin`, `lintVenuePlan`, `EngValue`,
  `CalendarTwinSheet`, `VenuePlanSheet`, `ParametersTable`, `PidSheet`,
  instrument tags like
  `FT-101` / `ET-201` / `XV-103`, or the reference HTML blueprints
  `microseasons_calendar_final.html` / `microseasons_technical_blueprint.html`.
  Trigger even when no file is named — e.g. "make the calendar a digital twin",
  "add a heater to the loop", "light the whole of summer", "the balloons
  overlap", "what tag do I use for the lux sensor", "export sheet 2 as SVG",
  "how much does it weigh", "what clearance does the venue need", "where did
  that number come from".
  Do NOT hand-draw SVG and do NOT edit the HTML sketches in
  `microseasons-cal/`; write a spec, lint it, mount it.
---

# Microseasons digital twin (monolith + P&ID sheets)

**THE FORM (changed 2026): the calendar is NOT a wall hanging.** It is a
**freestanding, double-sided monolith on a plinth** for a venue floor:
seventy-two timber-framed panels, one per kō, **thirty-six per face** —
**face A spring + summer (kō 1–36), face B autumn + winter (kō 37–72)**, 6
columns × 6 rows each. Panels are **landscape rectangles, 180 × 110 × 95 mm**.
Each is a Chlorella photobioreactor window with a microbial fuel cell behind
it and a strip of day-LEDs under it; the culture tubing runs inside the frame
and **crosses from face A to face B at the base**, through the plinth head; the
+/− bus runs in the vertical rails of BOTH faces. The plinth (1400 × 400 × 700
mm) holds V-101, P-101, U-100 and the drip tray. Overall envelope **1300 ×
1580 × 400 mm**, computed by `envelopeOf()` from the panel size, the gaps, the
frame section and the plinth — never typed twice.

It is drawn as **four engineering sheets from data**, on the same Prussian-blue
plate, with the same ISA-5.1 grammar and the same lint-then-mount discipline as
MESSAI's `@messai/pid-schematic` (skill `mes-pid-schematic` in that repo).

| sheet                          | id / builder                          | what it is                                                                     |
| ------------------------------ | ------------------------------------- | ------------------------------------------------------------------------------ |
| **MS-CAL-001** two elevations  | `buildCalendarTwin(microseasons)`     | face A over face B, 6 × 6 each; states light one panel (today), a season, night, or drain it |
| **MS-CAL-002** array P&ID      | `arrayPid` (`sheets/array-pid.ts`)    | reservoir → pump → 72-panel serpentine (both faces) → return; MFC array → boost → LED bus |
| **MS-CAL-003-nn** panel P&ID   | `buildPanelPid(panel)`                | one panel: anode chamber \| Nafion \| photobioreactor + cathode, backlight, day strip |
| **MS-CAL-004** venue plan      | `buildVenuePlan(calendarSpec)`        | footprint + clearance zones on a floor, section A–A through the plinth, DATASHEET |

Everything lives in **`src/lib/twin`** (specs, builders, lint, tokens) and
**`src/components/DigitalTwin`** (renderers, plate, static export). The visual
check is **`/twin`**, which shows both elevations, the venue plan, the array
P&ID, the selected panel's P&ID, the **parameters table** and the lint readout.

## The one rule

**A sheet is DATA.** You write (or build) a `CalendarTwinSpec` /
`VenuePlanSpec` / `PidSpec`, run `lintCalendarTwin` / `lintVenuePlan` /
`lintPid`, then mount `<CalendarTwinSheet>` / `<VenuePlanSheet>` /
`<PidSheet>`. You never write `<line>` / `<rect>` by hand for a sheet, never
add d3, and never resurrect the cyan-on-navy HTML sketches in
`microseasons-cal/*.html` — they were the reference for the twin and are
superseded by it. If a symbol is missing, add ONE primitive to
`src/components/DigitalTwin/symbols.tsx`, ONE `EquipmentKind` member in
`src/lib/twin/spec.ts`, and ONE `case` in `PidDiagram.tsx`.

## Two ways in

1. **The elevations, the venue plan and the per-panel sheets are BUILT, never
   written.** The 72 panels come from `src/data/microseasons.ts` through
   `buildCalendarTwin` (face split, reading order, serpentine ports, day-LED
   count, seasonal tint, tags `R-101…R-172`, the parameters layer), each
   panel's P&ID from `buildPanelPid(panel)`, and MS-CAL-004 from
   `buildVenuePlan(spec)` — which READS the envelope, the plinth and the
   datasheet rows off the calendar spec rather than retyping them. A date, a
   name or a dimension changes → every sheet follows. To change what a panel
   sheet shows, change the builder; do not fork one panel.
2. **The array sheet is one hand-authored spec** (`sheets/array-pid.ts`),
   because there is exactly one monolith. Copy it for a new one-off sheet (a
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
4. **Give every number a BASIS.** Anything the installation needs — a
   dimension, a volume, a voltage, a clearance, a noise figure — belongs in
   `spec.parameters` as an `EngValue`
   `{ value, unit?, basis, note? }` with `basis` one of
   `design | literature | vendor | assumed | measured`. **The basis is
   mandatory and the linter enforces it.** Carry `design` from MS-CAL-001 /
   MS-CAL-002; mark anything you reasoned to yourself `assumed` **with a note
   saying what it rests on** (the linter warns without one); never write
   `measured` — nothing has been built, and the linter warns if you claim it.
   Geometry rows are cross-checked against the drawing, and totals against the
   per-panel figures (culture volume = per-panel × 72, backlight = per-panel ×
   72, loop time = residence × 72), so a datasheet cannot drift from the sheet.
   The table renders on `/twin` (`ParametersTable`) and the key ~12 rows print
   on MS-CAL-004.

5. **Lint** — zero errors AND zero warnings for a shipped sheet
   (`src/lib/twin/__tests__/lint.test.ts` enforces it for every registered
   sheet). Run `npx jest src/lib/twin`.
6. **Look at it.** `crowded` catches bubbles / balloons on each other; it
   cannot see line routing or a label under a run, so export and look:
   ```ts
   // in a jest file (jsdom needs the TextEncoder polyfill first) or a node script
   import { renderPidToSvg, renderCalendarToSvg, renderVenueToSvg } from '@/components/DigitalTwin/render-static';
   ```
   `src/lib/twin/__tests__/render.test.tsx` shows the polyfill. Rasterise with
   Playwright's bundled Chromium if you need a PNG. Fix collisions by moving
   the item in the spec, never by shrinking fonts or loosening the check.
7. **Mount.** `<CalendarTwinSheet spec onSelectPanel />`,
   `<VenuePlanSheet spec />` and `<PidSheet spec />` (client: plate + chips +
   ↓ SVG), plus `<ParametersTable sections />`; `<CalendarTwinDiagram>` /
   `<VenuePlanDiagram>` / `<PidDiagram>` are the pure SVGs (server-safe).
   Static files: `renderCalendarToSvg` / `renderVenueToSvg` /
   `renderPidToSvg` from `render-static.ts` — that entry imports
   `react-dom/server`, never import it in a client component.

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

Elevation sheet is 1000 × 1200: **face A at (46, 60), face B at (46, 560)**,
panel 88 × 54, gap 8 (`MONOLITH` in `build-calendar.ts`); the crossover runs
in the corridor at face A's bottom + 54; the right column x 660+ holds state
readout, envelope, tint key, legend, hydraulics, parameters summary, logic and
title. Venue sheet is 1000 × 700: plan view at (30, 56) 360 × 380, section at
(410, 56) 280 × 380, datasheet at (30, 470), title block bottom right.
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
  "CONCEPT — NOT FOR CONSTRUCTION". **Every number carries a basis** (see
  step 4); nothing is `measured`, and the notes say so.

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
- **Row and col are WITHIN A FACE.** Panel #37 is face B row 0 col 0, not row
  6. `faceOf(n)` does the split; `panelRect` looks the face origin up. A panel
  with a row ≥ 6 is a bug, and the linter says `off-grid`.
- **The crossover is a straight run.** The last panel of a face must leave on
  the side the first panel of the next face is entered from, or the tubing
  would have to cross the plinth diagonally — `lintCalendarTwin` errors
  `crossover`. With 6 columns, face A row 5 is odd (out left) and face B row 0
  is even (in left), so it works out; change the grid and re-check it.
- **Don't retype a dimension.** The envelope comes from `envelopeOf()`, the
  datasheet from `findParameter(spec.parameters, id)`. A number typed twice
  will disagree with itself, and the parameter linter will catch you.
- **The LED twin at `/led-twin` is a different product** (a 7 × 5 monthly
  WS2812B grid, `src/utils/ledController.ts`). The bioreactor wall has one
  strip of 4–7 day-LEDs per panel. Don't merge the two grids.
- **jsdom has no TextEncoder**; `react-dom/server` needs it. Polyfill from
  `util` before requiring the static renderer (see `render.test.tsx`).

## Files

- `src/lib/twin/spec.ts` — `CalendarTwinSpec`, `CalendarFace`, `VenuePlanSpec`,
  `PidSpec`, `EquipmentKind`, `EngValue` / `ParameterSection` / `ENG_BASES`.
- `src/lib/twin/lint.ts` — `lintCalendarTwin`, `lintVenuePlan`, `lintPid`,
  `lintParameters`, `formatLint`.
- `src/lib/twin/tags.ts` — ISA letter tables, `validateInstrumentTag`.
- `src/lib/twin/blueprint.ts` — `BLUEPRINT`, `CLASSIC`, `PALETTES`,
  `TwinTheme`, `ALGAE_TINT`, weights.
- `src/lib/twin/build-calendar.ts` — `MONOLITH`, `envelopeOf`, `faceOf`,
  `buildCalendarTwin`, `buildParameters`, `panelForDate`, `algaeTint`.
- `src/lib/twin/sheets/array-pid.ts` — MS-CAL-002; `panel-pid.ts` —
  `buildPanelPid`; `venue-plan.ts` — `buildVenuePlan` (MS-CAL-004);
  `index.ts` — `CALENDAR_TWIN`, `VENUE_PLAN`, `PID_SHEETS` registry.
- `src/components/DigitalTwin/theme.tsx` — `TwinThemeProvider`, `usePalette`,
  `useTwinTheme`, `defId` (per-theme marker / pattern ids).
- `src/components/DigitalTwin/symbols.tsx` — primitives;
  `EquipmentGlyph.tsx` — one equipment item, shared by the P&ID and the venue
  section; `PidDiagram.tsx`, `CalendarTwinDiagram.tsx`, `VenuePlanDiagram.tsx`
  — renderers; `TwinSheet.tsx` — plate + chips (`CalendarTwinSheet`,
  `PidSheet`, `VenuePlanSheet`); `ParametersTable.tsx` — the parameters table;
  `render-static.ts` — SVG strings (`renderCalendarToSvg`, `renderVenueToSvg`,
  `renderPidToSvg`).
- `src/app/twin/page.tsx` — the gallery + lint readout.
- `reference/isa-5.1-bioreactor-calendar.md`, `reference/blueprint-style.md`.
- Reference imagery (read, never edit): `microseasons-cal/*.png`,
  `microseasons-cal/reference/*.png`, `microseasons-cal/*.html`.
