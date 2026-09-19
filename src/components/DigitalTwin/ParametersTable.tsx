/**
 * The PARAMETERS table: every number the installation needs, grouped by
 * section, each printed with its BASIS. Same mono, sharp-cornered plate
 * language as the sheets, and the same rule — an assumed number must never
 * read as a measured one, so the basis is a visible column, not a footnote.
 *
 * It is a plain table (not an SVG sheet) because this is reference data a
 * person reads and copies, not a drawing. Colours come from a palette, so
 * it sits on either plate.
 */
import { MONO_FONT, PALETTES, type Palette, type TwinTheme } from '@/lib/twin/blueprint';
import { allParameters, type EngBasis, type ParameterSection } from '@/lib/twin/spec';

export interface ParametersTableProps {
  sections: ParameterSection[];
  theme?: TwinTheme;
  caption?: string;
}

/** How loudly a basis reads: an assumption is marked, a design figure is plain. */
function basisStyle(p: Palette, b: EngBasis): React.CSSProperties {
  const strong = b === 'assumed' || b === 'measured';
  return {
    fontSize: '.5625rem',
    letterSpacing: '.14em',
    padding: '1px 5px',
    border: `1px solid ${strong ? p.live : p.chipBorder}`,
    color: strong ? p.live : p.muted,
    whiteSpace: 'nowrap',
  };
}

export function ParametersTable({ sections, theme = 'blueprint', caption }: ParametersTableProps) {
  const p = PALETTES[theme] ?? PALETTES.blueprint;
  const rows = allParameters(sections);
  const count = (b: EngBasis) => rows.filter((r) => r.v.basis === b).length;
  const mono: React.CSSProperties = { fontFamily: MONO_FONT, letterSpacing: '.08em' };
  const th: React.CSSProperties = {
    ...mono,
    fontSize: '.5625rem',
    textTransform: 'uppercase',
    letterSpacing: '.18em',
    color: p.muted,
    textAlign: 'left',
    fontWeight: 400,
    padding: '0 8px 6px 0',
    borderBottom: `1px solid ${p.chipBorder}`,
  };
  const td: React.CSSProperties = { ...mono, fontSize: '.6875rem', color: p.ink, padding: '5px 8px 5px 0', verticalAlign: 'top' };

  return (
    <section
      aria-label="Installation parameters"
      style={{
        background: `linear-gradient(180deg, ${p.plateTop} 0%, ${p.plateBottom} 100%)`,
        border: `1px solid ${p.border}`,
        padding: 'clamp(10px, 1.4vw, 16px)',
      }}
    >
      <p style={{ ...mono, fontSize: '.625rem', letterSpacing: '.18em', textTransform: 'uppercase', color: p.muted, margin: '0 0 4px' }}>
        {caption ?? 'parameters · installation design basis'}
      </p>
      <p style={{ ...mono, fontSize: '.625rem', color: p.muted, margin: '0 0 14px' }}>
        {rows.length} parameters · {count('design')} design · {count('literature')} literature · {count('vendor')} vendor ·{' '}
        <span style={{ color: p.live }}>{count('assumed')} assumed</span> · {count('measured')} measured — nothing has been built, so
        nothing is measured.
      </p>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ ...th, width: '34%' }}>Parameter</th>
            <th style={{ ...th, width: '30%' }}>Value</th>
            <th style={{ ...th, width: '10%' }}>Unit</th>
            <th style={{ ...th, width: '12%' }}>Basis</th>
            <th style={{ ...th, width: '14%' }}>Note</th>
          </tr>
        </thead>
        {sections.map((s) => (
          <tbody key={s.id}>
            <tr>
              <th
                colSpan={5}
                scope="colgroup"
                style={{ ...mono, fontSize: '.625rem', textTransform: 'uppercase', letterSpacing: '.18em', color: p.hi, textAlign: 'left', fontWeight: 600, padding: '14px 0 4px', borderBottom: `1px solid ${p.chipBorder}` }}
              >
                {s.label}
              </th>
            </tr>
            {s.rows.map((r) => (
              <tr key={r.id}>
                <td style={{ ...td, color: p.muted }}>{r.label}</td>
                <td style={{ ...td, color: p.hi }}>{r.v.value}</td>
                <td style={td}>{r.v.unit ?? '—'}</td>
                <td style={td}>
                  <span style={basisStyle(p, r.v.basis)}>{r.v.basis.toUpperCase()}</span>
                </td>
                <td style={{ ...td, fontSize: '.625rem', color: p.muted }}>{r.v.note ?? ''}</td>
              </tr>
            ))}
          </tbody>
        ))}
      </table>
    </section>
  );
}
