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
import { CalendarTwinSheet, PidSheet } from '@/components/DigitalTwin';
import { BLUEPRINT as B, MONO_FONT } from '@/lib/twin/blueprint';
import { buildCalendarTwin, panelForDate } from '@/lib/twin/build-calendar';
import { formatLint, lintCalendarTwin, lintPid } from '@/lib/twin/lint';
import { arrayPid, buildPanelPid } from '@/lib/twin/sheets';
import type { CalendarPanel } from '@/lib/twin/spec';

const mono: React.CSSProperties = { fontFamily: MONO_FONT, letterSpacing: '.08em' };

export default function TwinPage() {
  const wall = useMemo(() => buildCalendarTwin(microseasons, { today: new Date() }), []);
  const today = useMemo(() => panelForDate(wall.panels, new Date())?.panel ?? wall.panels[0], [wall]);
  const [panel, setPanel] = useState<CalendarPanel>(today);
  const panelSheet = useMemo(() => buildPanelPid(panel), [panel]);
  const lint = useMemo(
    () => [
      { name: wall.title.drawing, r: lintCalendarTwin(wall) },
      { name: arrayPid.title.drawing, r: lintPid(arrayPid) },
      { name: panelSheet.title.drawing, r: lintPid(panelSheet) },
    ],
    [wall, panelSheet]
  );

  return (
    <div style={{ minHeight: '100vh', background: B.plateBottom, color: B.ink }}>
      <header style={{ borderBottom: `1px solid ${B.border}`, padding: '28px 24px 20px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <p style={{ ...mono, fontSize: '.625rem', textTransform: 'uppercase', color: B.muted, margin: 0 }}>
            microseasons · digital twin · MS-CAL-001 / 002 / 003
          </p>
          <h1 style={{ ...mono, fontSize: '1.4rem', fontWeight: 600, color: B.hi, margin: '6px 0 8px' }}>
            72 microseasons bioreactor calendar — engineering sheets
          </h1>
          <p style={{ maxWidth: 760, fontSize: '.85rem', lineHeight: 1.55, color: B.ink, margin: 0 }}>
            The wall in the renders under <code style={mono}>microseasons-cal/</code> — six columns by twelve rows of
            timber-framed photobioreactor panels, one per kō, each with a microbial fuel cell behind the culture
            window and a strip of day LEDs — drawn as three ISA-5.1 sheets from one declarative spec. Every
            number is a design basis from the reference blueprint, not a measurement. Click a panel on the wall to
            open its own P&amp;ID below.
          </p>
        </div>
      </header>

      <main style={{ maxWidth: 1100, margin: '0 auto', padding: '24px 24px 64px', display: 'grid', gap: 40 }}>
        <CalendarTwinSheet spec={wall} onSelectPanel={setPanel} />
        <PidSheet spec={arrayPid} />
        <PidSheet key={panelSheet.id} spec={panelSheet} />

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
