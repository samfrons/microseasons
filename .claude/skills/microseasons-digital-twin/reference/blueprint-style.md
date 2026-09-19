# The plate — style notes (Blueprint · Classic)

Ported as behaviour from MESSAI's `libs/shared/pid-schematic` plate (itself
ported from the Aftermine pilot sheets). Tokens: `src/lib/twin/blueprint.ts`.

## What makes it read as a drawing, not a diagram

1. **A ground the ink was designed for.** Prussian blue `#16324A → #0F2438`
   with a 26-unit drafting grid at 5 % white. Never put the sheet on cream.
2. **Monoline, three weights.** Process 1.3 · fine 0.6 · signal 0.5; the live
   path goes to 2.3. Weight is hierarchy.
3. **Hierarchy by size, not fade.** Labels 4.6–8.5 px mono, uppercase, `.08em`
   tracking; opacity clamped at .78.
4. **One accent, one meaning.** `#F6A97F` = LIVE (the routed stream, the open
   valve, the lit panel, the governing rule, the trip stamp). No red, no cyan.
5. **The calendar's one colour exception.** Algae windows are tinted by season
   (`ALGAE_TINT`) at .35 opacity, .85 when the panel is lit — the culture's
   colour is the calendar's data. Timber frames are `#C9A66B` outline only.
6. **Furniture makes it a sheet.** Frame, parts list with balloons, legend,
   title block, kraft-and-oxblood CONCEPT stamp in the title block.
7. **State, not animation.** Chips repaint the sheet; nothing moves.
8. **Opaque bodies.** Chambers, vessels, bubbles fill `rgba(7,20,34,.55–.7)`
   so runs behind them vanish — lines first, bodies after.

## The Classic plate

The same drawing, printed. `TwinTheme = 'blueprint' | 'classic'`; both
palettes live in `PALETTES` (`src/lib/twin/blueprint.ts`) and expose exactly
the same keys, so nothing branches on the theme except the values.

| token      | blueprint             | classic                        |
| ---------- | --------------------- | ------------------------------ |
| plate      | `#16324A → #0F2438`   | `#FFFFFF` (flat white paper)   |
| grid       | white @ 5 %           | `transparent` — no drafting grid |
| ink / hi   | `#D7E7F2` / `#F4FAFE` | `#111827` / `#111827` (one black, printed once) |
| muted      | `#A9C6D8`             | `#374151`                      |
| body/bubble/panel | `rgba(7,20,34,.55–.7)` | `#FFFFFF` (opaque paper)  |
| frame      | ink @ .5              | `#111827` @ 1                  |
| **live**   | `#F6A97F` amber       | `#1D4ED8` strong blue — never red, never cyan |
| timber     | `#C9A66B`             | `#8B6A3E` (warm brown that reads on white) |

`ALGAE_TINT` is identical in both — the culture's colour is calendar data,
not ink — but the window prints a little harder on paper (.5 idle / .9 lit
vs .45 / .85 on the blue plate).

**Never inline a colour and never import `BLUEPRINT` in a renderer**: call
`usePalette()` from `src/components/DigitalTwin/theme.tsx`. `<TwinSheet>`
wraps the diagram in `TwinThemeProvider` and offers the Blueprint / Classic
chips; `renderPidToSvg` / `renderCalendarToSvg` take a third `theme`
argument and paint the matching paper as the background rect. Marker and
pattern ids carry a theme suffix (`tw-arrow-classic`) so two sheets in
different themes on one page don't fight.

## Don'ts

- No `border-radius`, no drop shadows, no gradients on symbols.
- No d3 / canvas — plain React SVG so it renders on the server.
- No colour by stream (a PFD habit) — streams are told apart by routing and
  labels; only LIVE gets colour.
- No `B.xxx` / `BLUEPRINT.` reads in a symbol or renderer — `usePalette()` only.
- No copying `microseasons-cal/*.html` markup back in. Those sketches used cyan
  ink, green flow lines and red/blue polarity; the twin uses ink + one accent.
