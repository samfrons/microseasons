# ISA-5.1 for the bioreactor calendar — the subset that matters

Source of truth in code: `src/lib/twin/tags.ts` (`MEASURED_VARIABLE`,
`FUNCTION_LETTER`, `EQUIPMENT_PREFIX`). If they disagree, the code wins.

## Instrument tag = `<letters>-<loop>`

First letter — what is measured:

| letter | calendar use                                              |
| ------ | --------------------------------------------------------- |
| A      | analysis: pH, dissolved O₂, optical density, lux (say which in the tip) |
| E      | voltage (panel / array)                                   |
| I      | current                                                   |
| J      | power (bus)                                               |
| F      | flow (culture)                                            |
| L      | level (reservoir)                                         |
| T      | temperature                                               |
| K      | time / schedule (the 90-day refresh timer)                |
| U      | multivariable (the wall controller)                       |
| X      | unclassified — on/off valves `XV-…`                       |
| H      | hand (the frame button `HS-101`)                          |

Succeeding letters — what it does: `T` transmitter · `I` indicator · `C`
controller · `S` switch · `A` alarm · `Y` relay / compute · `V` valve · `H` / `L`
high / low (`LSLL-502` = level switch low-low).

Loop numbers: one loop = one measurement. Number by hundreds per area —
100 feed / culture, 200 electrical, 300 chemistry (pH, OD, DO, lux), 400
thermal, 500 level. `X` / `H` / `K` tags borrow the loop they act on.

## Bubble frames (`mount`)

| mount   | drawn as           | means                                   |
| ------- | ------------------ | --------------------------------------- |
| `field` | plain circle       | on the process (default)                |
| `panel` | circle + solid bar | on the frame, operator-accessible (`HS`) |
| `dcs`   | circle in a square | controller function (`UY-100`, `KY-101`) |

## Equipment tags

| prefix | item                                       |
| ------ | ------------------------------------------ |
| R      | panel as a reactor; `R-1nnA` algae, `R-1nnB` anode chamber |
| X      | membrane                                   |
| V      | vessel / reservoir                         |
| P      | pump                                       |
| A      | the panel array                            |
| L      | LED array / load (`L-1nn` backlight, `L-2nn` day strip, `L-201` bus) |
| DC     | DC-DC converter                            |
| B      | supercap / battery                         |
| PS     | grid supply                                |
| SW     | relay / contactor                          |
| U      | controller cabinet                         |
| F / S  | filter / sampling point                    |

Electrodes and off-sheet flags are untagged; name them in the tip.

## Valves and fail positions

`kind: 'valve'` is the bowtie; open draws hollow with the live stroke, closed
draws filled. `actuated: true` draws the diaphragm and REQUIRES `fail`:

- `FC` — fails closed: feed isolation (`XV-101`), refresh drain (`XV-103`).
- `FO` — fails open: the return to the reservoir (`XV-102`), so a dead
  controller never dead-heads the peristaltic pump.

## Line kinds

`process` (culture, make-up, drain) · `gas` (the O₂ from the algae to the
cathode, dashed long) · `electric` (bus, circuit, dashed) · `signal` (dashed
hairline; may cross process lines).
