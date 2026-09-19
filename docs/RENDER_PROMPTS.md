# Render prompts — 72 Microseasons Bioreactor Calendar

Image-generation prompts for gallery-grade, photorealistic renders of the
installation described by the digital twin (`docs/DIGITAL_TWIN.md`,
`buildCalendarTwin`, sheet `MS-CAL-001`) and shown in the reference renders
under `microseasons-cal/`. These are prompts for a text-to-image model, not
specs for the twin itself — use them for marketing stills, pitch decks, and
print-quality mockups.

The piece is now a **freestanding, double-sided monolith** on a low plinth,
meant to stand in a gallery, lobby, or atrium and be walked around, not a
flat wall-mounted grid.

## 1. Constants block

Paste this into every prompt (or prepend it verbatim) so the piece stays the
same object across a series:

> A freestanding, double-sided timber monolith about 1.3 m wide × 0.8 m tall,
> standing on a low plinth that houses the reservoir and pump, viewable from
> both sides in a gallery, lobby, or atrium. Each face carries a 6-across ×
> 6-down grid of 36 rectangular photobioreactor panels, about 180 × 110 mm
> each (roughly 16:10, landscape), one panel per microseason (kō): the front
> face holds the 36 kō of spring and summer, the back face the 36 kō of
> autumn and winter. Frames are thin pale oak or maple, finished satin, with
> flush glass and no wasted border. Below each panel's window sits a control
> strip: a row of small day LEDs (one dot per day of that kō, four to six
> dots), a single tactile brass day button, and a tiny mode indicator — only
> the current day's dot brighter, warm 2700 K white. Each panel carries one
> short English poem line (four to eight words drawn from the kō's meaning,
> e.g. "east wind loosens the ice") engraved quietly into the frame or
> printed fine on the glass — no Japanese calligraphy, no kanji, no kana, no
> ornamental engraving, no fake glyphs, anywhere. The living culture is
> algae, but the piece reads as a curated palette that shifts across the
> year — cool spring greens, deep summer greens, amber and rust autumn
> tones, cool grey-teal and blue-green winter tones, with occasional warm
> honey and rose panels from different strains, pigments, or filters — never
> neon, never rainbow. Warm 2700 K edge light glows behind every panel. Thin,
> clear, translucent silicone tubing (about 6 mm) is visible only at the
> edges and back of the monolith, joined with small brass fittings — a
> design element, not clutter. The plinth carries a simple physical control
> panel: a mode dial (Today / Season / Night / Ambient), a brightness slider,
> and a "log habit" button, with clean engraved English labels. No
> watermarks, logos, or UI overlays. No people unless a prompt says so.
> Photographic realism, not illustration or render-engine sheen.

## 2. Prompts by shot type

### Hero / venue shots

**1. Gallery venue, front face elevation**
The front face (spring and summer, 36 panels) of the freestanding monolith
shot straight-on with a 35 mm lens at chest height in a plain white gallery,
soft diffuse daylight from camera left, the warm LED backlight glowing
faintly through each window, the curated palette reading as cool spring
greens across the top rows warming into deep summer greens below, brass
fittings catching highlights at the plinth's base, polished concrete floor.
*Negative / avoid:* no kanji, no kana, no ornamental engraving, no fake
glyphs, no neon or rainbow cast, no wrong grid count (6×6 per face), no
tubing floating free of the monolith.
*Aspect ratio:* 3:2.

**2. Three-quarter walk-around, both faces**
A wide three-quarter shot from slightly above eye level, the monolith
positioned so the front face (spring/summer, cool-to-deep greens) is visible
on the near side and the edge of the back face (autumn/winter, amber and
grey-teal tones) is just readable as the visitor's eye follows the piece's
depth, implying a person could walk around it, gallery floor and a soft
sightline to a far wall, 35 mm lens, even daylight.
*Negative / avoid:* no kanji or kana anywhere on either face, no neon, no
missing panels, no visible seam or mounting bracket at the plinth join.
*Aspect ratio:* 3:2.

**3. Wide venue shot, people on each side**
A wide atrium or lobby shot, the monolith standing free in the middle of the
space, one visitor reading the front face (spring/summer palette) and
another visitor on the far side reading the back face (autumn/winter
palette), both partly silhouetted against the panels' glow, large windows
giving soft daylight, 24 mm lens, generous negative space around the piece
to emphasize it is freestanding and double-sided.
*Negative / avoid:* no kanji or kana, no people touching or blocking the
control strips, no neon cast, no wrong panel count on either face.
*Aspect ratio:* 16:9.

**4. Dark room, only today lit**
A completely dark gallery; the monolith's front face is barely visible
except one single panel glowing warm amber-green in the centre-right of the
grid — today's kō — its day-LED strip lit and brass day button faintly
catching light, the rest of both faces a faint silhouette from ambient
spill only, long-exposure look, 50 mm lens, deep blacks with no crushed
detail on the lit panel.
*Negative / avoid:* no other panels lit, no cyan or blue cast, no kanji or
kana even where faintly legible, no lens-flare artifacts.
*Aspect ratio:* 4:5.

### Close-ups

**5. Single panel macro — spring poem line**
Extreme close-up of one 180×110 mm panel, its glass carrying the fine
printed line "east wind loosens the ice" with no other text, the window
showing pale cool-green marbled algae lit from behind, four small warm LEDs
in the control strip below with the current day brighter, a single small
brass day button beside them, brass corner screws visible, macro lens at
f/4, shallow focus on the window.
*Negative / avoid:* no kanji, no kana, no ornamental engraving, no fake
glyphs, no readable text beyond the one poem line, no neon color cast.
*Aspect ratio:* 4:5.

**6. Single panel macro — summer poem line**
Extreme close-up of a summer panel, its glass carrying the fine printed
line "silkworms wake to mulberry leaves," the window showing deep saturated
green marbled algae lit from behind, five small warm LEDs in the control
strip with the current day brighter, brass day button and tiny mode
indicator clearly legible, brass corner screws, macro lens at f/4, shallow
focus on the window, other panels softly blurred behind.
*Negative / avoid:* no kanji, no kana, no ornamental engraving, no fake
glyphs, no text beyond the one poem line, no cracked or dirty glass.
*Aspect ratio:* 4:5.

**7. Hand pressing the day button — control strip in use**
A close, slightly low-angle shot of a human hand (no other body visible)
pressing the small tactile brass day button on a panel's control strip, the
pressed day's LED dot glowing brighter warm white, the row of day LEDs and
the tiny mode indicator both sharp and clearly legible beside the thumb,
soft indoor light, other panels softly blurred behind, 85 mm lens at f/2.8,
natural skin tone.
*Negative / avoid:* no glowing fingertip effects, no sci-fi UI, no kanji or
kana, no fake screen text, no extra visible fingers.
*Aspect ratio:* 4:5.

**8. Plinth control panel in use**
A close, eye-level shot of a hand adjusting the plinth's physical control
panel: a mode dial clearly labelled Today / Season / Night / Ambient turned
to "Season," a brightness slider set roughly a third up, and a "log habit"
button beside them, all engraved English labels sharp and legible in warm
raking light, brushed brass and pale oak surfaces, 50 mm lens at f/4, the
monolith's glow softly out of focus above.
*Negative / avoid:* no kanji, no kana, no digital screen, no invented extra
controls, no blurred or unreadable labels.
*Aspect ratio:* 4:5.

**9. Tubing and brass fittings detail**
Macro shot at the back edge of the monolith: clear silicone tubing looping
between two panels, a small brass barbed fitting and hex nut joining two
tube lengths, a drop of condensation on the tubing, warm backlight glowing
through the panel edges behind, shallow focus with the fitting sharp and
panels softly out of focus, 100 mm macro lens.
*Negative / avoid:* no colored or dyed liquid other than the panel's own
green/amber tones, no visible pump or motor, no disconnected tube ends, no
toy-like plastic sheen.
*Aspect ratio:* 1:1.

### Seasonal states

**10. Front face, spring into summer**
The full front face lit in daylight, the top half (spring panels) in cool
pale and mid greens with a few honey and rose accent panels, the bottom
half (summer panels) deepening into saturated green, soft window light from
the left, gallery floor for scale, 35 mm lens, bright airy color grade
showing the palette shift row by row rather than a flat block.
*Negative / avoid:* no neon, no rainbow, no kanji or kana, no wrong grid
count, no flat single-hue block across the whole face.
*Aspect ratio:* 3:2.

**11. Back face, autumn into winter**
The back face in a cooler, dimmer room: the upper half (autumn panels) in
amber, rust, and warm honey tones, the lower half (winter panels) shifting
to cool grey-teal and blue-green, most backlights at low warm glow, blue
exterior daylight mixing in from a window, 35 mm lens.
*Negative / avoid:* no snow indoors, no cyan cast on the algae itself, no
kanji or kana, no wrong grid count, no missing poem lines.
*Aspect ratio:* 3:2.

**12. Dusk, both faces glowing**
The monolith at dusk in an atrium, room light fading to blue through tall
windows, every panel's day-LED strip lit at low warm brightness (ambient
night mode) on both the near front face and the visible edge of the back
face, the full curated palette — greens, ambers, grey-teals — still legible
across both, long exposure balancing fading exterior light against the
panels' own glow, 24 mm lens.
*Negative / avoid:* no full white panel illumination, no neon shift, no
lens-flare halos, no kanji or kana.
*Aspect ratio:* 16:9.

### Process shots

**13. Reservoir and pump inside the plinth**
A styled product shot into the open service bay of the low plinth: a
20-litre glass or frosted reservoir of pale nutrient medium, a small
peristaltic pump visibly gripping the silicone tubing, brass fittings at
each connection, set into an oak-lined compartment, warm accent lighting,
50 mm lens at f/4, the monolith's panels softly visible and blurred above.
*Negative / avoid:* no industrial stainless tanks, no digital display
screens, no dyed or neon liquid, no disconnected tubing.
*Aspect ratio:* 4:3.

**14. Culture refresh, drained windows**
The monolith during quarterly maintenance: several panels on one face show
empty, clear windows with only a faint residue tint instead of algae, a
technician's gloved hand disconnecting a tube fitting at the plinth's edge,
tools laid on a cloth on a nearby table, cool utility lighting, 35 mm lens,
documentary feel.
*Negative / avoid:* no dramatic spill or mess, no cracked panels, no
readable warning labels, no kanji or kana, no sci-fi maintenance suit.
*Aspect ratio:* 3:2.

**15. Tubing as a visible design element**
A wide shot from behind the monolith emphasizing the serpentine tubing
route across its back and edges: tubing looping row to row in a
boustrophedon path, brass fittings glinting at each turn, shot from a
slight side angle so the runs read as intentional pattern rather than
clutter, warm backlight from the panels illuminating the tubing
translucently, 24 mm lens.
*Negative / avoid:* no tangled or chaotic tubing, no dyed liquid, no visible
pump-cable clutter, no garden-hose-thick tubing.
*Aspect ratio:* 16:9.

### Art-direction (palette mood)

**16. Light through the culture windows onto the floor**
A moody gallery shot from floor level: warm backlight and the panels'
tinted culture windows cast soft overlapping bands of color onto a
honey-toned wooden floor — greens from the front face, ambers and grey-teals
implied from the back — the panel grid itself mostly out of focus above,
camera low and wide at 24 mm, the wall's curated palette rather than a
rainbow of hues.
*Negative / avoid:* no rainbow of saturated hues, no visible ceiling
rigging, no people, no kanji or kana even out of focus.
*Aspect ratio:* 3:2.

**17. Layered depth, panels as translucent planes**
A side-on architectural shot at a steep angle down one face of the
monolith, so the projecting timber frames and glowing windows stack into
overlapping translucent planes of light and shadow, the curated palette —
never a single flat green — reading distinctly row by row, warm rim light
separating each row, deep shadow between rows, 50 mm lens, dark room behind
for contrast.
*Negative / avoid:* no actual hanging acrylic sheets, no cyan or purple
hues, no visible mounting hardware beyond the wood rails, no kanji or kana.
*Aspect ratio:* 4:5.

**18. Anode/cathode exploded cutaway**
A clean product-photography cutaway of a single panel's internal chamber,
exploded along its depth axis: a dark graphite-felt anode slab, a thin
translucent membrane, and a Pt-coated carbon-cloth cathode facing an algae
chamber in one of the piece's curated hues (not only green), each layer
suspended with slight gaps and a soft drop shadow, neutral grey studio
background, one soft key light, 90 mm lens, no labels.
*Negative / avoid:* no text labels, no kanji or kana, no wiring-diagram
overlay, no neon colors, no cartoon exploded-view arrows.
*Aspect ratio:* 1:1 or 4:3.

## 3. Model-specific tips

- **Midjourney (v6/v7):** append `--ar 16:9` (or the ratio given above),
  `--style raw` to reduce Midjourney's default stylization and keep the
  timber/glass materials photographic, and a modest `--s 150–250` (lower
  stylization) so it doesn't drift toward illustration. Use `--seed <n>`
  and reuse the same seed across a series for monolith consistency (see
  §4). If the model over-renders text as kanji-like marks, add `no kanji,
  no kana, no calligraphy` to the prompt body, not just the negative field.
- **DALL·E / GPT-image:** write the prompt as one plain descriptive
  paragraph, as above; these models follow literal counts reasonably well,
  so keep "6 across by 6 down per face" stated plainly rather than implied.
  Avoid asking for legible small engraved text beyond the single poem line
  per panel — text rendering at macro scale is the least reliable part of
  the shot, and these models default to Japanese-looking glyphs unless
  explicitly told "English only, no kanji, no kana."
- **Flux / Stable Diffusion (SDXL or newer):** these benefit from an
  explicit negative prompt field. Suggested negative prompt: `neon, cyan
  glow, rainbow, sci-fi, cartoon, illustration, watermark, kanji, kana,
  japanese calligraphy, fake glyphs, text artifacts, extra panels, missing
  panels, floating tubing, plastic toy look, oversaturated, blown
  highlights`. Keep the main prompt to concrete nouns and lighting terms;
  Flux responds well to camera/lens phrasing ("50 mm lens, f/2.8").
- **Gemini / Imagen:** phrase as a single photographic scene description
  with an explicit subject, setting, lighting, and camera position, in that
  order; these models respond well to material call-outs ("thin pale oak
  frame, satin finish," "brass fittings") stated early in the sentence
  rather than appended as tags, and to an explicit "English text only, no
  Japanese script" clause when a poem line is legible in frame.

## 4. Consistency kit

To keep the same monolith recognizable across a series of renders: reuse
the constants block in §1 verbatim in every prompt rather than paraphrasing
it each time, and change only the shot-specific sentence describing camera,
room, and light. Fix one seed (where the model supports it — Midjourney
`--seed`, or the fixed-seed option in Flux/SD tooling) and reuse it for
every shot in the series so the model's default interpretation of "the
monolith" — panel proportions (180×110 mm, 16:10), 6×6 grid per face, frame
thickness, palette anchors — stays consistent across images; vary only the
framing words. When precision on layout matters (panel count per face,
front/back season split, row/column spacing), reference the digital-twin
wall-elevation sheet `MS-CAL-001` (`buildCalendarTwin`,
`docs/DIGITAL_TWIN.md`) as the layout ground truth and describe it in words
rather than attaching it as an image reference, since these are
photographic prompts, not diagram renders. For any close-up naming a real
kō, pull the microseason's `nameEn` and its imagery from
`src/data/microseasons.ts` and turn it into a short (four-to-eight word)
English poem line rather than inventing wording or reaching for kanji, so
the printed or engraved text stays accurate and script-free if the image is
used near the product.
