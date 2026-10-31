/**
 * Sheet 3 — ONE panel of the wall, built per panel so all 72 sheets share a
 * skeleton and none is hand-drawn: a sealed anode chamber (graphite felt
 * anode in acetate anolyte) | Nafion 117 | the photobioreactor chamber
 * (Chlorella culture, Pt/C cathode breathing the O₂ the algae make), the
 * warm-white backlight behind the culture, the day-LED strip under the
 * window, and the culture tubing in from the previous panel and out to the
 * next. Row grid: electrical y = 80, process y = 170, chamber block
 * y 140–260, strip y = 300, signal trunk y = 380.
 */
import type { CalendarPanel } from '../spec';
import type { PidSpec } from '../spec';

function neighbourTag(n: number, delta: number): string {
  const m = ((n - 1 + delta + 72) % 72) + 1;
  return `R-${String(100 + m).padStart(3, '0')}`;
}

export function buildPanelPid(panel: CalendarPanel): PidSpec {
  const t = panel.tag; // R-1nn
  const prev = neighbourTag(panel.n, -1);
  const next = neighbourTag(panel.n, +1);
  const ltr = panel.ports.in === 'left';
  /* the two faces are one loop: 36 → 37 crosses at the base of the monolith */
  const inCross = panel.n === 37 ? ' (CROSSOVER)' : '';
  const outCross = panel.n === 36 ? ' (CROSSOVER)' : '';
  const inX = ltr ? 60 : 640;
  const outX = ltr ? 640 : 60;
  const outY = 350;
  const dayLabels = Array.from({ length: panel.days }, (_, i) => i + 1).join(' ');

  return {
    id: `pid-panel-${panel.id}`,
    subject: `panel:${panel.n}`,
    sheet: { width: 1000, height: 560 },
    caption: `sheet 3 · panel ${t} · face ${panel.face} · #${panel.n} ${panel.nameJa} — ${panel.nameEn} · photobioreactor + MFC`,
    title: {
      org: 'MICROSEASONS — 七十二候',
      title: `Panel ${t} — ${panel.nameEn} — P&ID`,
      drawing: `MS-CAL-003-${String(panel.n).padStart(2, '0')}`,
      rev: 'B',
      sheet: 3,
      of: 4,
      status: 'CONCEPT',
      scale: 'SCALE: SCHEMATIC · PANEL 180 × 110 × 95 mm',
      drawn: 'microseasons-digital-twin · buildPanelPid',
    },
    equipment: [
      { id: 'in', kind: 'source', x: inX, y: 170, label: `CULTURE FROM ${prev}${inCross}` },
      { id: 'out', kind: 'sink', x: ltr ? 650 : outX, y: outY, label: `CULTURE TO ${next}${outCross}` },
      { id: 'anode-ch', kind: 'chamber', tag: `${t}B`, x: 260, y: 200, w: 100, h: 120, label: 'ANODE CHAMBER', tip: 'Sealed anaerobic chamber, acetate anolyte, exoelectrogenic biofilm on graphite felt. Refreshed with the culture every 90 d via S.' },
      { id: 'membrane', kind: 'membrane', tag: `X-${String(100 + panel.n).padStart(3, '0')}`, x: 314, y: 200, w: 8, h: 120, labelSide: 'below', label: 'NAFION 117', tip: 'Proton-exchange membrane, 183 µm. Keeps the culture out of the anolyte.' },
      { id: 'algae-ch', kind: 'chamber', tag: `${t}A`, x: 400, y: 200, w: 150, h: 120, label: 'PHOTOBIOREACTOR', tip: `Chlorella vulgaris suspension, 400 mL, tinted ${panel.tint} for ${panel.season} on face ${panel.face}. O₂ from photosynthesis feeds the cathode.` },
      { id: 'anode', kind: 'electrode', x: 236, y: 205, w: 8, h: 80, polarity: 'anode', tip: 'Graphite felt anode, 20 × 15 cm design.' },
      { id: 'cathode', kind: 'electrode', x: 340, y: 205, w: 8, h: 80, polarity: 'cathode', tip: 'Carbon cloth + Pt/C cathode facing the culture; breathes algal O₂.' },
      { id: 's1', kind: 'sample', x: 210, y: 225, tip: 'Anolyte sample / refresh port.' },
      { id: 'backlight', kind: 'led', tag: `L-${String(100 + panel.n).padStart(3, '0')}`, x: 420, y: 110, w: 60, h: 18, label: 'BACKLIGHT 0.5 W', labelSide: 'right', tip: 'Warm-white SMD backlight behind the culture window; on at night, PWM-dimmed.' },
      { id: 'strip', kind: 'led', tag: `L-${String(200 + panel.n).padStart(3, '0')}`, x: 560, y: 300, w: 60, h: 14, label: `DAY STRIP · ${dayLabels}`, labelSide: 'below', tip: `${panel.days} LEDs, one per day of the kō. Lit by the clock; pressed by hand to log a habit.` },
      { id: 'sw1', kind: 'switch', tag: 'SW-101', x: 600, y: 80, w: 16, labelSide: 'below', tip: 'Backlight relay commanded by UY-100.' },
      { id: 'bus-in', kind: 'source', x: 700, y: 80, label: 'LED BUS 12 V' },
      { id: 'anode-bus', kind: 'sink', x: 120, y: 80, label: 'ANODE BUS (−)' },
      { id: 'cathode-bus', kind: 'sink', x: 520, y: 70, label: 'CATHODE BUS (+)' },
    ],
    lines: [
      { id: 'f1', stream: 'culture', pts: ltr ? [[60, 170], [170, 170], [170, 290], [355, 290], [355, 262]] : [[640, 170], [477, 170]], from: 'in', to: 'algae-ch', arrow: true },
      { id: 'f2', stream: 'culture', pts: ltr ? [[460, 260], [460, outY], [644, outY]] : [[340, 260], [340, outY], [60, outY]], from: 'algae-ch', to: 'out' },
      { id: 'o2', stream: 'oxygen', kind: 'gas', pts: [[440, 230], [352, 230]], from: 'algae-ch', to: 'cathode', arrow: true, endLabel: 'O₂' },
      { id: 'c1', stream: 'circuit', kind: 'electric', pts: [[236, 165], [236, 80], [120, 80]], from: 'anode', to: 'anode-bus' },
      { id: 'c2', stream: 'circuit', kind: 'electric', pts: [[340, 165], [340, 130], [520, 130], [520, 76]], from: 'cathode', to: 'cathode-bus' },
      { id: 'l1', stream: 'light', kind: 'electric', pts: [[694, 80], [608, 80]], from: 'bus-in', to: 'sw1' },
      { id: 'l2', stream: 'light', kind: 'electric', pts: [[592, 80], [580, 80], [580, 50], [420, 50], [420, 101]], from: 'sw1', to: 'backlight' },
      { id: 'l3', stream: 'strip', kind: 'electric', pts: [[694, 80], [690, 80], [690, 330], [560, 330], [560, 307]], from: 'bus-in', to: 'strip' },
    ],
    instruments: [
      { tag: 'ET-201', x: 180, y: 40, leaderTo: [236, 120], tip: 'Panel cell voltage, ~0.5 V design; OCV when the wall contactor is open.' },
      { tag: 'IT-202', x: 300, y: 40, leaderTo: [340, 120], tip: 'Panel current, 0.2–0.3 A design; the array sums 72 of these.' },
      { tag: 'AT-301', x: 600, y: 200, leaderTo: [475, 200], tip: 'Dissolved O₂ in the culture — the cathode limits when this drops after dark.' },
      { tag: 'AT-302', x: 600, y: 250, leaderTo: [475, 250], tip: 'Optical density: the live tint of this panel.' },
      { tag: 'TT-401', x: 160, y: 110, leaderTo: [210, 150], tip: 'Panel temperature; ambient 20–25 °C design.' },
      { tag: 'HS-101', x: 640, y: 270, leaderTo: [590, 300], mount: 'panel', tip: 'Hand switch on the frame: pressing today\'s day-LED logs the habit.' },
      { tag: 'UY-100', x: 860, y: 400, mount: 'dcs', tip: 'Wall controller (sheet 2). Lights the strip by the clock and switches the backlight at night.' },
    ],
    signals: [
      { from: 'ET-201', to: 'UY-100', via: [[180, 22], [960, 22], [960, 380], [860, 380]] },
      { from: 'IT-202', to: 'UY-100', via: [[300, 22], [960, 22], [960, 380], [860, 380]] },
      { from: 'AT-301', to: 'UY-100', via: [[600, 380], [860, 380]] },
      { from: 'AT-302', to: 'UY-100', via: [[600, 380], [860, 380]] },
      { from: 'TT-401', to: 'UY-100', via: [[160, 380], [860, 380]] },
      { from: 'HS-101', to: 'UY-100', via: [[640, 380], [860, 380]] },
      { from: 'UY-100', to: 'SW-101', via: [[860, 380], [980, 380], [980, 60], [600, 60]] },
      { from: 'UY-100', to: `L-${String(200 + panel.n).padStart(3, '0')}`, via: [[860, 380], [560, 380]] },
    ],
    parts: [
      { n: 1, ref: 'anode-ch', name: `Anode chamber ${t}B, graphite felt` },
      { n: 2, ref: 'algae-ch', name: `Photobioreactor ${t}A, 400 mL Chlorella` },
      { n: 3, ref: 'membrane', name: 'Nafion 117 membrane' },
      { n: 4, ref: 'backlight', name: 'Backlight, 0.5 W 2700 K' },
      { n: 5, ref: 'strip', name: `Day strip, ${panel.days} LEDs` },
      { n: 6, ref: 'sw1', name: 'Backlight relay SW-101' },
    ],
    callouts: [
      { n: 1, x: 200, y: 300, to: [215, 258] },
      { n: 2, x: 500, y: 290, to: [475, 258] },
      { n: 3, x: 290, y: 150, to: [313, 178] },
      { n: 4, x: 470, y: 150, to: [450, 116] },
      { n: 5, x: 520, y: 335, to: [535, 308] },
      { n: 6, x: 630, y: 120, to: [608, 92] },
    ],
    logic: {
      x: 700,
      y: 250,
      w: 280,
      h: 110,
      title: `UY-100 · PANEL ${t} — READS CLOCK · HS · AT`,
      rules: [
        { id: 'day', text: 'CLOCK IN KŌ → STRIP LED(OFFSET) ON' },
        { id: 'night', text: 'AT-303 < 20 lx → SW-101 CLOSED · DIM 30 %' },
        { id: 'habit', text: 'HS-101 PRESSED → LATCH TODAY LED · LOG' },
        { id: 'refresh', text: 'AT-302 < 0.3 OD → FLAG REFRESH' },
      ],
    },
    states: [
      {
        id: 'day',
        label: 'Day',
        band: 'photosynthesis',
        description: 'Culture flowing through, algal O₂ to the cathode, panel on the bus; backlight off, today\'s day-LED on.',
        streams: ['culture', 'oxygen', 'circuit', 'strip'],
        valvesOpen: [],
        rule: 'day',
      },
      {
        id: 'night',
        label: 'Night',
        band: 'backlight',
        description: 'Backlight on through SW-101; culture still flowing; O₂ falling as photosynthesis stops.',
        streams: ['culture', 'circuit', 'light', 'strip'],
        valvesOpen: ['sw1'],
        rule: 'night',
      },
      {
        id: 'habit',
        label: 'Habit logged',
        band: 'HS-101',
        description: 'The frame button was pressed: today\'s LED latches full brightness and the log is written.',
        streams: ['culture', 'oxygen', 'circuit', 'strip'],
        valvesOpen: [],
        rule: 'habit',
      },
      {
        id: 'refresh',
        label: 'Refresh due',
        band: 'OD low',
        description: 'Optical density below the floor: culture spent, the wall flags a 90-day refresh.',
        streams: ['culture'],
        valvesOpen: [],
        rule: 'refresh',
        stamp: 'REFRESH DUE — CULTURE SPENT',
      },
    ],
    defaultState: 'day',
    notes: [
      `NOTES · 1. PANEL #${panel.n} = ${panel.nameJa} (${panel.solarTerm}), ${panel.start.month}/${panel.start.day}–${panel.end.month}/${panel.end.day}, ${panel.days} DAYS. 2. ANODE: CH₃COO⁻ + 2H₂O → 2CO₂ + 7H⁺ + 8e⁻; CATHODE: O₂ + 4H⁺ + 4e⁻ → 2H₂O.`,
      '3. E°cell 1.10 V THEORETICAL, 0.4–0.5 V DESIGN; 0.1–0.15 W PER PANEL (DESIGN, NOT MEASURED). 4. CULTURE ENTERS ON THE ' + (ltr ? 'LEFT' : 'RIGHT') + ' PER THE SERPENTINE.',
    ],
  };
}
