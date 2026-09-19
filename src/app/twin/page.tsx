'use client';

/**
 * /twin — the digital twin gallery: the wall elevation (sheet 1), the
 * array P&ID (sheet 2) and one per-panel P&ID (sheet 3) for whichever
 * panel is selected on the wall. Every sheet is a linted spec drawn by
 * the generic renderers; the lint readout is printed so a red sheet is
 * visible here before it ships.
 */
import { useMemo, useState } from 'react';
import { microseasons } from '@/data/microseasons';
import { CalendarTwinSheet, ParametersTable, PidSheet, VenuePlanSheet } from '@/components/DigitalTwin';
import { BLUEPRINT as B, MONO_FONT } from '@/lib/twin/blueprint';
import { buildCalendarTwin, panelForDate } from '@/lib/twin/build-calendar';
import { formatLint, lintCalendarTwin, lintPid, lintVenuePlan } from '@/lib/twin/lint';
import { arrayPid, buildPanelPid, buildVenuePlan } from '@/lib/twin/sheets';
import type { CalendarPanel } from '@/lib/twin/spec';

const mono: React.CSSProperties = { fontFamily: MONO_FONT, letterSpacing: '.08em' };

export default function TwinPage() {
  const wall = useMemo(() => buildCalendarTwin(microseasons, { today: new Date() }), []);
  const today = useMemo(() => panelForDate(wall.panels, new Date())?.panel ?? wall.panels[0], [wall]);
  const [panel, setPanel] = useState<CalendarPanel>(today);
  const panelSheet = useMemo(() => buildPanelPid(panel), [panel]);
  const venue = useMemo(() => buildVenuePlan(wall), [wall]);
  const lint = useMemo(
    () => [
      { name: wall.title.drawing, r: lintCalendarTwin(wall) },
      { name: venue.title.drawing, r: lintVenuePlan(venue) },
      { name: arrayPid.title.drawing, r: lintPid(arrayPid) },
      { name: panelSheet.title.drawing, r: lintPid(panelSheet) },
    ],
    [wall, venue, panelSheet]
  );

  return (
    <div style={{ minHeight: '100vh', background: B.plateBottom, color: B.ink }}>
      <header style={{ borderBottom: `1px solid ${B.border}`, padding: '28px 24px 20px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <p style={{ ...mono, fontSize: '.625rem', textTransform: 'uppercase', color: B.muted, margin: 0 }}>
            microseasons · digital twin · MS-CAL-001 / 002 / 003 / 004
          </p>
          <h1 style={{ ...mono, fontSize: '1.4rem', fontWeight: 600, color: B.hi, margin: '6px 0 8px' }}>
            72 microseasons bioreactor calendar — engineering sheets
          </h1>
          <p style={{ maxWidth: 760, fontSize: '.85rem', lineHeight: 1.55, color: B.ink, margin: 0 }}>
            A freestanding, double-sided monolith on a plinth: seventy-two timber-framed photobioreactor panels,
            one per kō, thirty-six on face A (spring + summer) and thirty-six on face B (autumn + winter), each with
            a microbial fuel cell behind the culture window and a strip of day LEDs. Drawn as four ISA-5.1 sheets
            from one declarative spec — two elevations, the venue plan, the array P&amp;ID and a sheet per panel —
            with the full parameters layer below. Every number carries its <strong>basis</strong>; nothing has been
            measured. Click a panel on an elevation to open its own P&amp;ID.
          </p>
        </div>
      </header>

      <main style={{ maxWidth: 1100, margin: '0 auto', padding: '24px 24px 64px', display: 'grid', gap: 40 }}>
        <CalendarTwinSheet spec={wall} onSelectPanel={setPanel} />
        <VenuePlanSheet spec={venue} />
        <PidSheet spec={arrayPid} />
        <PidSheet key={panelSheet.id} spec={panelSheet} />
        <ParametersTable sections={wall.parameters} caption="parameters · installation design basis · MS-CAL-001 / 004" />

        <section aria-labelledby="lint" style={{ ...mono, fontSize: '.7rem', color: B.muted }}>
          <h2 id="lint" style={{ fontSize: '.625rem', textTransform: 'uppercase', letterSpacing: '.18em', margin: '0 0 8px' }}>
            Lint readout
          </h2>
          <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'grid', gap: 4 }}>
            {lint.map(({ name, r }) => (
              <li key={name} style={{ color: r.problems.length ? B.live : B.muted }}>
                {name} · {r.ok ? 'OK' : 'ERRORS'} · {r.errors.length} errors · {r.warnings.length} warnings
                {r.problems.length > 0 && <pre style={{ whiteSpace: 'pre-wrap', margin: '4px 0 0', color: B.ink }}>{formatLint(r)}</pre>}
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}
