'use client';

/**
 * /schematics — the gallery of every sheet in the twin.
 *
 * MS-CAL-001 (the two elevations), MS-CAL-004 (the venue plan), MS-CAL-002
 * (the array P&ID) and MS-CAL-003-nn (one P&ID per panel, mounted one at a
 * time behind a picker — seventy-two sheets at once would be unusable).
 * Each card carries the drawing number, a one-line description, the sheet
 * with its own state + Blueprint/Classic chips and ↓ SVG, and its lint
 * status, so a red sheet is visible on the page that shows it.
 */
import Link from 'next/link';
import { useMemo, useState, type ReactNode } from 'react';
import { CalendarTwinSheet, PidSheet, VenuePlanSheet } from '@/components/DigitalTwin';
import { microseasons } from '@/data/microseasons';
import { BLUEPRINT as B, MONO_FONT } from '@/lib/twin/blueprint';
import { buildCalendarTwin, panelForDate } from '@/lib/twin/build-calendar';
import { formatLint, lintCalendarTwin, lintPid, lintVenuePlan, type LintResult } from '@/lib/twin/lint';
import { arrayPid, buildPanelPid, buildVenuePlan } from '@/lib/twin/sheets';
import type { CalendarPanel } from '@/lib/twin/spec';

const mono: React.CSSProperties = { fontFamily: MONO_FONT, letterSpacing: '.08em' };

const DOC_URL = 'https://github.com/samfrons/microseasons/blob/main/docs/DIGITAL_TWIN.md';

function LintLine({ result }: { result: LintResult }) {
  const bad = result.problems.length > 0;
  return (
    <div style={{ ...mono, fontSize: '.65rem', color: bad ? B.live : B.muted, marginTop: 10 }}>
      LINT · {result.ok ? 'OK' : 'ERRORS'} · {result.errors.length} errors · {result.warnings.length} warnings
      {bad && (
        <pre style={{ whiteSpace: 'pre-wrap', margin: '6px 0 0', color: B.ink, fontFamily: MONO_FONT }}>
          {formatLint(result)}
        </pre>
      )}
    </div>
  );
}

function Card({ drawing, title, blurb, lint, children }: {
  drawing: string; title: string; blurb: string; lint: LintResult; children: ReactNode;
}) {
  return (
    <section
      aria-label={`${drawing} ${title}`}
      style={{ borderTop: `1px solid ${B.border}`, paddingTop: 22 }}
    >
      <p style={{ ...mono, fontSize: '.625rem', textTransform: 'uppercase', color: B.muted, margin: 0 }}>
        {drawing}
      </p>
      <h2 style={{ ...mono, fontSize: '1rem', fontWeight: 600, color: B.hi, margin: '6px 0 4px' }}>{title}</h2>
      <p style={{ fontSize: '.85rem', lineHeight: 1.55, color: B.ink, margin: '0 0 14px', maxWidth: 760 }}>{blurb}</p>
      {children}
      <LintLine result={lint} />
    </section>
  );
}

export default function SchematicsPage() {
  const twin = useMemo(() => buildCalendarTwin(microseasons, { today: new Date() }), []);
  const today = useMemo(() => panelForDate(twin.panels, new Date())?.panel ?? twin.panels[0], [twin]);
  const venue = useMemo(() => buildVenuePlan(twin), [twin]);
  const [panel, setPanel] = useState<CalendarPanel>(today);
  const panelSheet = useMemo(() => buildPanelPid(panel), [panel]);

  const lint = useMemo(
    () => ({
      twin: lintCalendarTwin(twin),
      venue: lintVenuePlan(venue),
      array: lintPid(arrayPid),
      panel: lintPid(panelSheet),
    }),
    [twin, venue, panelSheet]
  );

  return (
    <div style={{ minHeight: '100vh', background: B.plateBottom, color: B.ink }}>
      <header style={{ borderBottom: `1px solid ${B.border}`, padding: '104px 24px 24px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <p style={{ ...mono, fontSize: '.625rem', textTransform: 'uppercase', color: B.muted, margin: 0 }}>
            microseasons · schematics · MS-CAL-001 / 002 / 003 / 004
          </p>
          <h1 style={{ ...mono, fontSize: '1.4rem', fontWeight: 600, color: B.hi, margin: '6px 0 8px' }}>
            Every sheet in the twin
          </h1>
          <p style={{ maxWidth: 760, fontSize: '.85rem', lineHeight: 1.55, color: B.ink, margin: 0 }}>
            Nothing here is hand-drawn. Each sheet is a declarative spec — panels, equipment,
            instrument tags, lines and states as data — which is linted against ISA-5.1 and the
            geometry of the monolith before it is rendered, so a drawing cannot quietly drift from
            the object it describes. The lint result of every sheet is printed under it, and the
            ↓ SVG button downloads the drawing exactly as it is on screen.
          </p>
          <p style={{ ...mono, fontSize: '.7rem', margin: '12px 0 0', display: 'flex', gap: 16, flexWrap: 'wrap' }}>
            <a href={DOC_URL} target="_blank" rel="noreferrer" style={{ color: B.live, textDecoration: 'underline' }}>
              docs/DIGITAL_TWIN.md ↗
            </a>
            <Link href="/twin" style={{ color: B.live, textDecoration: 'underline' }}>
              the interactive twin →
            </Link>
          </p>
        </div>
      </header>

      <main style={{ maxWidth: 1100, margin: '0 auto', padding: '24px 24px 72px', display: 'grid', gap: 36 }}>
        <Card
          drawing={twin.title.drawing}
          title="Elevations — face A and face B"
          blurb="The freestanding monolith seen from both sides: thirty-six timber-framed photobioreactor panels per face, the culture serpentine, the bus rails and the crossover through the plinth head. The state chips light today's kō, a whole season, the night bus or a drain."
          lint={lint.twin}
        >
          <CalendarTwinSheet spec={twin} initialState="today" onSelectPanel={setPanel} />
        </Card>

        <Card
          drawing={venue.title.drawing}
          title="Venue plan and section"
          blurb="Footprint, viewing and service clearances on a venue floor, a section A–A through the plinth, and the datasheet block — each row carrying the basis of its number."
          lint={lint.venue}
        >
          <VenuePlanSheet spec={venue} />
        </Card>

        <Card
          drawing={arrayPid.title.drawing}
          title="Array P&ID — hydraulics and bus"
          blurb="Reservoir, pump and the seventy-two-panel serpentine across both faces, the return and drain, and the MFC array through the boost converter onto the LED bus, with the instrument loops and the interlocks."
          lint={lint.array}
        >
          <PidSheet spec={arrayPid} />
        </Card>

        <Card
          drawing={panelSheet.title.drawing}
          title={`Panel P&ID — #${panel.n} ${panel.nameEn}`}
          blurb="One panel in detail: the anode chamber, the Nafion membrane, the photobioreactor window and cathode, the backlight and the day-LED strip. Seventy-two of these exist — pick one."
          lint={lint.panel}
        >
          <div
            role="group"
            aria-label="Choose a panel"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
              gap: 4,
              margin: '0 0 16px',
              maxHeight: 220,
              overflowY: 'auto',
              border: `1px solid ${B.border}`,
              padding: 8,
            }}
          >
            {twin.panels.map((p) => {
              const on = p.id === panel.id;
              return (
                <button
                  key={p.id}
                  type="button"
                  aria-pressed={on}
                  onClick={() => setPanel(p)}
                  title={`${p.tag} · ${p.nameEn} · ${p.solarTerm}`}
                  style={{
                    ...mono,
                    fontSize: '.6rem',
                    textAlign: 'left',
                    padding: '5px 7px',
                    cursor: 'pointer',
                    background: on ? B.live : 'transparent',
                    color: on ? B.plateBottom : B.ink,
                    border: `1px solid ${on ? B.live : 'rgba(226,240,248,.25)'}`,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  #{String(p.n).padStart(2, '0')} {p.nameEn}
                </button>
              );
            })}
          </div>
          <PidSheet key={panelSheet.id} spec={panelSheet} />
        </Card>
      </main>
    </div>
  );
}
