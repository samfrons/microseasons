# Render prompts — 72 Microseasons Bioreactor Calendar

Image-generation prompts for gallery-grade, photorealistic renders of the
installation described by the digital twin (`docs/DIGITAL_TWIN.md`,
`buildCalendarTwin`, sheet `MS-CAL-001`) and shown in the reference renders
under `microseasons-cal/`. These are prompts for a text-to-image model, not
specs for the twin itself — use them for marketing stills, pitch decks, and
print-quality mockups.

## 1. Constants block

Paste this into every prompt (or prepend it verbatim) so the wall stays the
same object across a series:

> A wall-mounted grid of 72 small timber-framed photobioreactor panels, 6
> panels wide by 12 panels tall, each about 100 × 100 × 95 mm, one panel per
> Japanese microseason (kō). Frames are light maple or white oak, finished
> satin, with the kō's name laser-engraved on the frame in Japanese
> characters above a smaller English translation — no other text anywhere.
> Each panel has a glass or acrylic culture window showing a living green
> Chlorella algae suspension with soft marbled, cloud-like internal texture;
> the green hue drifts by season — pale yellow-green in spring panels,
> saturated deep green in summer panels, olive-brown green in autumn panels,
> dim teal-green in winter panels — so the whole wall reads as a gradient,
> not four flat blocks. A thin row of small LEDs sits in a strip under each
> window, one dot per day of that kō (four to six dots), warm 2700 K white,
> only the current day's dot brighter. Warm 2700 K edge light glows from
> behind every panel, spilling onto the wall. Thin, clear, translucent
> silicone tubing (about 6 mm) is visible snaking between panels behind or
> beside the wall, joined with small brass fittings and brass screws at the
> frame corners. No text anywhere except the engraved kō names. No
> watermarks, logos, or UI overlays. No people unless a prompt says so.
> Photographic realism, not illustration or render-engine sheen.

## 2. Prompts by shot type

### Hero wall shots

**1. Gallery wall, full elevation**
The full 6×12 wall of maple-framed photobioreactor panels mounted on a
plain white gallery wall, shot straight-on with a 35 mm lens at chest
height, soft diffuse daylight from camera left, the warm LED backlight of
every panel glowing faintly through the algae windows, brass tubing
fittings catching a highlight at the frame edges, a polished concrete
gallery floor below, shallow depth of field falling off slightly at the
top corners.
*Negative / avoid:* no cyan or magenta neon, no sci-fi glow, no fake
readable text beyond kō names, no missing or extra panels (must read as
6 columns × 12 rows), no tubing floating off the wall.
*Aspect ratio:* 16:9 or 3:2.

**2. Living room installation**
The same 72-panel wall mounted above a low wooden credenza in a warm
minimalist living room, evening light, floor lamp glow mixing with the
panels' own backlight, a linen sofa and a potted plant in the foreground
out of focus, shot on a 50 mm lens from seated eye height, wide dynamic
range between window daylight and the panel glow.
*Negative / avoid:* no neon cyan, no sci-fi control panel, no invented
text, no wrong grid count, no visible power cables in view.
*Aspect ratio:* 3:2.

**3. Office / studio wall**
The wall installed behind a standing desk in a bright architecture studio,
midday, large windows camera-right giving hard daylight that competes with
the panels' warm glow, exposed timber beams overhead, a rolled blueprint
and a laptop on the desk for scale, 24 mm lens, slight upward tilt from
desk height.
*Negative / avoid:* no cyan neon, no futuristic HUD text, no wrong panel
count, no floating tubing.
*Aspect ratio:* 16:9.

**4. Dark room, only today lit**
A completely dark room; the 72-panel wall is barely visible except for one
single panel glowing warm amber-green in the exact centre-right of the
grid — today's kō — its LED day-strip lit, the rest of the wall a faint
silhouette from ambient spill only, long exposure look, 50 mm lens, camera
at panel height, deep blacks with no crushed detail loss on the lit panel.
*Negative / avoid:* no other panels lit, no cyan or blue cast, no lens
flare artifacts, no visible text beyond the one engraved name if legible.
*Aspect ratio:* 4:5 (portrait) or 1:1.

### Close-ups

**5. Single panel macro — 蚕起食桑**
Extreme close-up of one timber-framed panel engraved "蚕起食桑" above
"Silkworms start feasting on mulberry leaves," a mulberry-leaf motif
lightly engraved beside the text, the acrylic window showing pale
yellow-green marbled algae lit from behind, four small warm LEDs in a row
underneath with the third one brighter, brass corner screws visible, shot
on a macro lens at f/4, shallow focus centred on the culture window.
*Negative / avoid:* no readable text other than the two given lines, no
neon color cast, no cracked or dirty acrylic, no visible electronics.
*Aspect ratio:* 4:5.

**6. Hand pressing the day button**
A close, slightly low-angle shot of a human hand (no other body visible)
pressing a small brass or pale-wood button set into the lower edge of a
panel frame, the pressed day's LED glowing brighter warm white in response,
soft indoor light, other panels softly blurred behind, 85 mm lens at f/2.8,
natural skin tone, no jewelry.
*Negative / avoid:* no glowing fingertip effects, no sci-fi UI, no extra
visible fingers/hands, no fake screen text.
*Aspect ratio:* 4:5.

**7. Tubing and brass fittings detail**
Macro shot of clear silicone tubing looping between two timber panels,
a small brass barbed fitting and hex nut joining two tube lengths, a drop
of condensation on the tubing, warm backlight glowing through the panel
edges behind, shallow focus with the fitting sharp and the panels
softly out of focus, 100 mm macro lens.
*Negative / avoid:* no colored/dyed liquid other than green, no visible
pump or motor, no floating or disconnected tube ends, no plastic sheen
that reads as toy-like.
*Aspect ratio:* 1:1.

**8. Anode/cathode exploded cutaway**
A clean product-photography cutaway of a single panel's internal chamber,
exploded along its depth axis: a dark graphite-felt anode slab, a thin
translucent Nafion membrane, and a Pt-coated carbon-cloth cathode facing a
pale green algae chamber, each layer suspended with slight gaps and a soft
drop shadow, lit on a neutral grey studio background with one soft
key light, 90 mm lens, labels absent.
*Negative / avoid:* no text labels, no wiring diagram overlay, no neon
colors, no cartoon exploded-view arrows.
*Aspect ratio:* 1:1 or 4:3.

### Seasonal states

**9. Spring wall**
The full 72-panel wall lit in daylight, the top third (spring panels)
showing pale yellow-green marbled algae with faint pink cherry-blossom and
bird engravings visible on a few frames, soft window light from the left,
a small vase of cut branches on a shelf below the wall for scale, 35 mm
lens, bright and airy color grade.
*Negative / avoid:* no cyan neon, no saturated summer green in the spring
band, no invented text, no wrong grid count.
*Aspect ratio:* 3:2.

**10. Winter wall**
The same wall in a cooler, dimmer room, the panels corresponding to the
winter third of the year showing dim teal-green algae, most backlights at
low warm glow, a single pine branch or bare twig resting on the shelf
below for seasonal cue, blue winter daylight from a window mixing with the
panels' warm glow, 35 mm lens.
*Negative / avoid:* no snow inside the room, no cyan cast on the algae
itself, no wrong grid count, no missing engravings.
*Aspect ratio:* 3:2.

**11. Dusk, day-strips on**
The wall at dusk, room light fading to blue through a window, every
panel's day-LED strip now visibly lit at low warm brightness (ambient
night mode), the seasonal green gradient still legible across the grid,
long exposure balancing the fading exterior light against the panels'
glow, 24 mm lens, camera slightly below wall centre.
*Negative / avoid:* no full white panel illumination (LEDs stay small and
warm), no neon color shift, no lens flare halos, no wrong day-count per
strip.
*Aspect ratio:* 16:9.

### Process shots

**12. Reservoir and pump station**
A styled product shot of the support equipment below or beside the wall:
a 20-litre glass or frosted-plastic reservoir of pale green nutrient
medium, a small peristaltic pump with a rotor visibly gripping the
silicone tubing, brass fittings at each connection, mounted on an oak
shelf or plinth, warm accent lighting, 50 mm lens at f/4, the wall
softly visible and blurred in the background.
*Negative / avoid:* no industrial-looking stainless steel tanks, no
visible digital display screens, no cyan liquid, no disconnected tubing.
*Aspect ratio:* 4:3.

**13. Culture refresh, drained windows**
The wall during quarterly maintenance: several panels in one region show
empty, clear acrylic windows with only a faint residue tint instead of
green algae, a technician's gloved hand disconnecting a tube fitting at
the wall's edge, tools laid on a cloth on a nearby table, cool utility
lighting, 35 mm lens, documentary photography feel.
*Negative / avoid:* no dramatic spill or mess, no cracked panels, no
readable warning labels, no sci-fi maintenance suit.
*Aspect ratio:* 3:2.

**14. Tubing as a visible design element**
A wide shot emphasizing the serpentine tubing route behind and beside the
wall: tubing looping row to row in a boustrophedon path, brass fittings
glinting at each turn, shot from a slight side angle so the tube runs read
as an intentional pattern rather than clutter, warm backlight from the
panels illuminating the tubing translucently, 24 mm lens.
*Negative / avoid:* no tangled or chaotic tubing, no neon-dyed liquid, no
visible pump motor noise-cable clutter, no wrong tube diameter (thin, not
garden-hose thick).
*Aspect ratio:* 16:9.

### Art-direction (acrylic-panel mood)

**15. Light through the culture windows onto the floor**
A moody gallery shot from floor level: light from the wall's warm
backlight and the green-tinted culture windows falls onto a honey-toned
wooden floor, casting soft overlapping bands of warm amber and pale green
light and shadow, the panel grid itself mostly out of focus above, camera
low and wide at 24 mm, echoing the layered colored-acrylic light installation
mood, but with the wall's own warm palette instead of a rainbow of hues.
*Negative / avoid:* no rainbow of saturated hues (stay within the warm
amber-to-green palette), no visible ceiling rigging, no people, no text.
*Aspect ratio:* 3:2.

**16. Layered depth, panels as translucent planes**
A side-on architectural shot at a steep angle down the wall's face, so the
projecting timber frames and glowing green windows stack into overlapping
translucent planes of light and shadow reminiscent of suspended coloured
acrylic sheets, warm rim light separating each row, deep shadow between
rows, 50 mm lens, plain wall or dark room behind for contrast.
*Negative / avoid:* no actual hanging acrylic sheets (this is the timber
panel wall, seen at a raking angle), no cyan/purple hues, no visible
mounting hardware beyond the wood rails.
*Aspect ratio:* 4:5.

## 3. Model-specific tips

- **Midjourney (v6/v7):** append `--ar 16:9` (or the ratio given above),
  `--style raw` to reduce Midjourney's default stylization and keep the
  timber/glass materials photographic, and a modest `--s 150–250` (lower
  stylization) so it doesn't drift toward illustration. Use `--seed <n>`
  and reuse the same seed across a series for wall consistency (see §5).
- **DALL·E / GPT-image:** write the prompt as one plain descriptive
  paragraph, as above; these models follow literal counts reasonably well,
  so keep "6 columns by 12 rows" stated plainly rather than implied. Avoid
  asking for legible small engraved text beyond the two given lines — text
  rendering at macro scale is the least reliable part of the shot.
- **Flux / Stable Diffusion (SDXL or newer):** these benefit from an
  explicit negative prompt field. Suggested negative prompt: `neon, cyan
  glow, sci-fi, cartoon, illustration, watermark, text artifacts, extra
  panels, missing panels, floating tubing, plastic toy look, oversaturated,
  blown highlights`. Keep the main prompt to concrete nouns and lighting
  terms; Flux responds well to camera/lens phrasing ("50mm lens, f/2.8").
- **Gemini / Imagen:** phrase as a single photographic scene description
  with an explicit subject, setting, lighting, and camera position, in that
  order; these models respond well to material call-outs ("light maple
  timber, satin finish," "brass fittings") stated early in the sentence
  rather than appended as tags.

## 4. Consistency kit

To keep the same wall recognizable across a series of renders: reuse the
constants block in §1 verbatim in every prompt rather than paraphrasing it
each time, and change only the shot-specific sentence describing camera,
room, and light. Fix one seed (where the model supports it — Midjourney
`--seed`, or the fixed-seed option in Flux/SD tooling) and reuse it for
every shot in the series so the model's default interpretation of "the
wall" — panel spacing, frame proportions, green tone — stays anchored
across images; vary only the framing words. When precision on layout
matters (panel count, reading order, row/column spacing), reference the
digital-twin wall-elevation sheet `MS-CAL-001` (`buildCalendarTwin`,
`docs/DIGITAL_TWIN.md`) as the layout ground truth and describe it in
words rather than attaching it as an image reference, since these are
photographic prompts, not diagram renders. For any close-up naming a real
kō, pull the Japanese name and English translation straight from
`src/data/microseasons.ts` rather than inventing wording, so the engraved
text stays accurate if the image is used near the product.
