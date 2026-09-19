'use client';

/**
 * A quiet row of three cards pointing at /schematics — the drawing numbers
 * and what each sheet is, in the site's chrome (not on the plate), so the
 * homepage stays light and the sheets themselves stay on their own page.
 */
import Link from 'next/link';
import { MONO_FONT } from '@/lib/twin/blueprint';

const SHEETS = [
  { drawing: 'MS-CAL-001', title: 'Elevations', blurb: 'Both faces, 36 panels each, the culture serpentine and the crossover.' },
  { drawing: 'MS-CAL-002', title: 'Array P&ID', blurb: 'Reservoir, pump, the 72-panel loop, the MFC bus and its interlocks.' },
  { drawing: 'MS-CAL-004', title: 'Venue plan', blurb: 'Footprint, clearances, section A–A through the plinth, datasheet.' },
];

export function SchematicsTeaser() {
  return (
    <section
      className="w-full py-16 lg:py-20"
      style={{ backgroundColor: 'var(--color-bgSecondary)', color: 'var(--color-textPrimary)' }}
      aria-labelledby="schematics-teaser-title"
    >
      <div className="container mx-auto max-w-[1180px] px-5 sm:px-6 lg:px-10">
        <p
          className="text-[10px] sm:text-[11px] uppercase m-0"
          style={{ fontFamily: MONO_FONT, letterSpacing: '.2em', color: 'var(--color-textSecondary)' }}
        >
          Drawing set
        </p>
        <h2
          id="schematics-teaser-title"
          className="mt-3 text-2xl sm:text-3xl font-serif tracking-tight"
          style={{ color: 'var(--color-textPrimary)' }}
        >
          The schematics
        </h2>
        <p className="mt-3 text-base leading-relaxed" style={{ color: 'var(--color-textSecondary)', maxWidth: '62ch' }}>
          Four ISA-5.1 sheets built from one spec — plus a process &amp; instrumentation diagram for
          every one of the seventy-two panels. Linted before they are drawn, downloadable as SVG.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SHEETS.map((s) => (
            <Link
              key={s.drawing}
              href="/schematics"
              className="block p-5 transition-colors duration-200"
              style={{
                border: '1px solid var(--color-border)',
                backgroundColor: 'var(--color-bgPrimary)',
                color: 'var(--color-textPrimary)',
              }}
            >
              <span
                className="block text-[10px] uppercase"
                style={{ fontFamily: MONO_FONT, letterSpacing: '.18em', color: 'var(--color-accent)' }}
              >
                {s.drawing}
              </span>
              <span className="mt-2 block text-lg font-serif">{s.title}</span>
              <span className="mt-2 block text-sm leading-relaxed" style={{ color: 'var(--color-textSecondary)' }}>
                {s.blurb}
              </span>
            </Link>
          ))}
        </div>

        <Link
          href="/schematics"
          className="mt-6 inline-flex items-center px-5 py-3 text-xs uppercase"
          style={{
            fontFamily: MONO_FONT,
            letterSpacing: '.14em',
            color: 'var(--color-textPrimary)',
            border: '1px solid var(--color-border)',
          }}
        >
          Browse all sheets
        </Link>
      </div>
    </section>
  );
}
