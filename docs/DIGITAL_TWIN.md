# Digital twin — the bioreactor calendar as engineering sheets

The calendar is a **freestanding, double-sided monolith on a plinth**, for a
venue floor: seventy-two timber-framed photobioreactor panels, one per kō,
thirty-six on each face — **face A spring + summer, face B autumn + winter**,
6 columns × 6 rows each. Panels are landscape rectangles, 180 × 110 × 95 mm.
A microbial fuel cell sits behind every culture window, a strip of day-LEDs
under it, silicone culture tubing snakes inside the frame and **crosses from
face A to face B at the base**, through the plinth head, and the +/− bus runs
in the vertical rails of both faces. The plinth holds the reservoir V-101, the
pump P-101, the controller cabinet U-100 and a drip tray. Each panel is
engraved with an English poem line (derived from `nameEn` via `poemLine()`)
top-left and its `#n NAME` bottom — no Japanese text on the object, per the
client brief; `nameJa` still lives in the panel data and its tip/aria-label.

It is modelled as **four ISA-5.1 sheets from one declarative spec**, following
the spec → lint → render pattern of MESSAI's `@messai/pid-schematic`.

| sheet                  | drawing         | source                                             |
| ---------------------- | --------------- | -------------------------------------------------- |
| elevations, faces A & B | `MS-CAL-001`    | `buildCalendarTwin(microseasons)`                  |
| array P&ID             | `MS-CAL-002`    | `src/lib/twin/sheets/array-pid.ts`                 |
| panel P&ID             | `MS-CAL-003-nn` | `buildPanelPid(panel)` — one per panel, 72 sheets  |
| venue plan             | `MS-CAL-004`    | `buildVenuePlan(calendarSpec)`                     |

See them at **`/twin`**. Click a panel on an elevation to open its own P&ID.
Each sheet has state chips (today / season / night / refresh; day / night /
refresh / trip; viewing / service / install) that repaint the live path in
amber, and a ↓ SVG button that downloads the drawing as shown. A
**Blueprint / Classic** chip pair switches the plate — Classic prints the same
sheet as a traditional drawing (white paper, no drafting grid, near-black ink,
a strong blue for the live path) and the download follows the theme on screen.

## The form, in the spec

`CalendarTwinSpec` carries `form: 'freestanding'`, a `faces` array
(`{ id, label, seasons, cols, rows, from, to, origin }`), a flat `panels` list
where every panel names its `face` and its row/col **within that face**, plus
`frame`, `plinth` and a computed `envelope` (1300 × 1580 × 400 mm — six panels
plus five gaps plus two frame sections wide, the panel block plus the plinth
high). Reading order is row-major through face A from Risshun and continues on
face B at kō 37; `panelForDate` is unchanged and still folds Feb 29 into the kō
holding Feb 28.

`lintCalendarTwin` checks the two faces (36 each, one season pair each, no
overlap on the sheet, each inside the sheet with room for its bus rail), the
serpentine per face, the **crossover** (the culture must leave the last panel
of a face on the side it enters the first panel of the next — a straight run
through the plinth head), the envelope arithmetic, and the parameters layer.

## The parameters layer

Everything the installation needs — geometry, hydraulics, biology,
electrochemistry, lighting, controls, environment, safety & maintenance, venue
— lives on `spec.parameters` as sections of rows, each row an `EngValue`:

```ts
{ value: '28.8', unit: 'L', basis: 'design', note: '0.4 L × 72 panels.' }
```

**`basis` is mandatory** and is one of `design | literature | vendor | assumed |
measured`. It is rendered as a visible column (`ParametersTable` on `/twin`) and
printed on MS-CAL-004's DATASHEET block, so an assumed number can never read as
a measured one. Nothing here has been built, so nothing is `measured` — the
linter warns if a row claims it, and warns again if an `assumed` row has no note
saying what it rests on. The linter also checks the geometry rows against the
built spec (panel size, envelope, plinth, flow, voltages) and the totals against
the per-panel figures (`hyd.culture-total` = `hyd.culture-per-panel` × 72,
`light.backlight-total` = per-panel × 72, `hyd.loop-time` = residence × 72).

## Website surfaces

Three places on the site show the twin, all from the same specs:

- **The homepage hero** (`src/components/DigitalTwinHero/`) — the first thing a
  visitor sees is MS-CAL-001 itself, mounted live on its blueprint plate in the
  `today` state with today's kō lit, under a short headline and two calls to
  action (*Open the digital twin* → `/twin`, *Browse the schematics* →
  `/schematics`). The page chrome around the plate uses the site's theme CSS
  variables; the plate keeps its own Blueprint / Classic palette. A quiet
  `SchematicsTeaser` row further down the homepage points at the drawing set.
- **`/twin`** — the interactive gallery: both elevations, the venue plan, the
  array P&ID, the selected panel's P&ID, the full parameters table and the lint
  readout. Click a panel on an elevation to open its own sheet.
- **`/schematics`** (`src/app/schematics/page.tsx`) — the gallery of the whole
  drawing set, one card per sheet: drawing number, title, a one-line
  description, the sheet with its state and theme chips and its ↓ SVG button,
  and `formatLint`'s verdict printed underneath. The seventy-two MS-CAL-003
  panel sheets are not mounted at once — a picker of all 72 kō mounts one
  `PidSheet` at a time.

The navigation links to **Digital Twin** and **Schematics**; on those dark-plate
routes the transparent top bar switches to paper-white ink so it stays legible.

## Where things live

- `src/lib/twin/` — `spec.ts` (types, `EngValue`, `CalendarFace`,
  `VenuePlanSpec`), `blueprint.ts` (plate tokens), `tags.ts` (ISA tables),
  `lint.ts` (`lintCalendarTwin`, `lintVenuePlan`, `lintPid`),
  `build-calendar.ts` (the monolith and its parameters from the kō table),
  `sheets/` (the P&ID specs, the venue plan, the registry).
- `src/components/DigitalTwin/` — `symbols.tsx` (primitives),
  `EquipmentGlyph.tsx` (one piece of equipment, shared by the P&ID and the
  venue section), `PidDiagram.tsx` / `CalendarTwinDiagram.tsx` /
  `VenuePlanDiagram.tsx` (pure SVG renderers), `TwinSheet.tsx` (plate + chips),
  `ParametersTable.tsx`, `render-static.ts` (SVG strings for docs or a
  laser-engraving step).
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
fails otherwise. Fix a `crowded` warning by moving the instrument or balloon in
the spec, never by loosening the check.

## Honesty note

Every number on the sheets is a **design basis** unless its row says otherwise,
and the parameters table says which is which for all of them. Nothing has been
measured; the title block says CONCEPT — NOT FOR CONSTRUCTION for that reason.
