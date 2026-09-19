'use client';

/**
 * The homepage's first section: the live digital twin itself.
 *
 * The two-face elevation (MS-CAL-001) is mounted straight onto the page on
 * its blueprint plate, in its `today` state, so the first thing a visitor
 * sees is the drawing of the real object with today's kō lit. The page
 * chrome around the plate uses the site's theme variables; the plate keeps
 * its own Blueprint / Classic palette (that switch lives on the sheet).
 */
import Link from 'next/link';
import { useMemo } from 'react';
import { CalendarTwinSheet } from '@/components/DigitalTwin';
import { microseasons } from '@/data/microseasons';
import { buildCalendarTwin, panelForDate } from '@/lib/twin/build-calendar';
import { MONO_FONT } from '@/lib/twin/blueprint';

export function DigitalTwinHero() {
  const spec = useMemo(() => buildCalendarTwin(microseasons, { today: new Date() }), []);
  const today = useMemo(() => panelForDate(spec.panels, new Date())?.panel ?? spec.panels[0], [spec]);

  return (
    <section
      className="relative w-full pt-24 pb-14 lg:pt-32 lg:pb-20"
      style={{ backgroundColor: 'var(--color-bgPrimary)', color: 'var(--color-textPrimary)' }}
      aria-labelledby="twin-hero-title"
    >
      <div className="container mx-auto max-w-[1180px] px-5 sm:px-6 lg:px-10">
        {/* Eyebrow */}
        <p
          className="text-[10px] sm:text-[11px] uppercase m-0"
          style={{ fontFamily: MONO_FONT, letterSpacing: '.2em', color: 'var(--color-textSecondary)' }}
        >
          MS-CAL-001 · live digital twin · today · {today.tag} · #{today.n} {today.nameEn}
        </p>

        {/* Headline */}
        <h1
          id="twin-hero-title"
          className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-serif leading-[1.12] tracking-tight text-balance"
          style={{ color: 'var(--color-textPrimary)', maxWidth: '20ch' }}
        >
          A living calendar of the 72 microseasons
        </h1>
        <p
          className="mt-4 text-base sm:text-lg leading-relaxed"
          style={{ color: 'var(--color-textSecondary)', maxWidth: '62ch' }}
        >
          A freestanding photobioreactor + microbial fuel cell installation, drawn as its own
          engineering twin — seventy-two timber-framed algae panels, thirty-six per face, with
          today&apos;s kō lit on the sheet below.
        </p>

        {/* Calls to action */}
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/twin"
            className="inline-flex items-center px-5 py-3 text-xs uppercase transition-colors duration-200"
            style={{
              fontFamily: MONO_FONT,
              letterSpacing: '.14em',
              backgroundColor: 'var(--color-accent)',
              color: 'var(--color-bgPrimary)',
              border: '1px solid var(--color-accent)',
            }}
          >
            Open the digital twin
          </Link>
          <Link
            href="/schematics"
            className="inline-flex items-center px-5 py-3 text-xs uppercase transition-colors duration-200"
            style={{
              fontFamily: MONO_FONT,
              letterSpacing: '.14em',
              color: 'var(--color-textPrimary)',
              border: '1px solid var(--color-border)',
              backgroundColor: 'transparent',
            }}
          >
            Browse the schematics
          </Link>
        </div>

        {/* The sheet itself — full width of the column, scales to it */}
        <div className="mt-8 lg:mt-10 w-full [&>section]:max-w-none">
          <CalendarTwinSheet spec={spec} initialState="today" />
        </div>

        <p
          className="mt-4 text-[11px] leading-relaxed"
          style={{ fontFamily: MONO_FONT, color: 'var(--color-textSecondary)', maxWidth: '70ch' }}
        >
          Every sheet is a declarative spec, linted, then drawn — no hand-drawn SVG. Nothing has
          been built: the title block says CONCEPT — NOT FOR CONSTRUCTION, and every number on the
          drawing carries its basis.
        </p>
      </div>
    </section>
  );
}

export default DigitalTwinHero;
