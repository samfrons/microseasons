# The blueprint plate — style notes

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

## Don'ts

- No `border-radius`, no drop shadows, no gradients on symbols.
- No d3 / canvas — plain React SVG so it renders on the server.
- No colour by stream (a PFD habit) — streams are told apart by routing and
  labels; only LIVE gets colour.
- No copying `microseasons-cal/*.html` markup back in. Those sketches used cyan
  ink, green flow lines and red/blue polarity; the twin uses ink + one accent.
