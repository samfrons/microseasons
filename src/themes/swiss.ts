/**
 * Swiss Modernist Theme
 * International Typographic Style with mathematical precision and grid-based rationalism
 *
 * Inspired by Josef Müller-Brockmann, Armin Hofmann, and the Swiss Design movement.
 * This theme embodies the principles of objective communication through precise
 * grid systems, mathematical spacing, and timeless Helvetica typography.
 *
 * Design principles:
 * - Grid-based layouts with mathematical precision
 * - Asymmetric compositions with perfect alignment
 * - Extreme clarity and readability
 * - Limited color palette: black, white, red
 * - Helvetica-centric typography
 * - Objective, functional, timeless design
 * - Rationalist approach to visual communication
 */

import { Theme } from '@/types/theme';

export const swissTheme: Theme = {
  id: 'swiss',
  name: 'Swiss Modernist',
  description: 'International Typographic Style with mathematical precision, grid systems, and Helvetica typography',

  colors: {
    // Light mode - Classic Swiss Design: white backgrounds, black typography, red accents
    light: {
      // Primary backgrounds - pure white for maximum clarity
      bgPrimary: '#ffffff',
      bgSecondary: '#f8f8f8',
      bgTertiary: '#f0f0f0',

      // Text colors - absolute black for maximum readability
      textPrimary: '#000000',
      textSecondary: '#333333',
      textAccent: '#ff0000',

      // Accent colors - Swiss red (inspired by Swiss flag and design posters)
      accent: '#ff0000',
      accentHover: '#e60000',
      accentActive: '#cc0000',

      // Border colors - precise, hairline rules
      border: '#000000',
      borderSubtle: '#cccccc',
      borderAccent: '#ff0000',

      // Special effects - minimal, functional
      glow: 'rgba(255, 0, 0, 0.2)',
      shadow: 'rgba(0, 0, 0, 0.1)',
      overlay: 'rgba(255, 255, 255, 0.95)',

      // Calendar-specific - pure, functional
      calendarPrimary: '#ffffff',
      calendarSecondary: '#f0f0f0',
      calendarAccent: '#ff0000',
    },

    // Dark mode - Inverted Swiss Design: black backgrounds, white typography, red accents
    dark: {
      // Primary backgrounds - pure black for contrast
      bgPrimary: '#000000',
      bgSecondary: '#0a0a0a',
      bgTertiary: '#141414',

      // Text colors - pure white for clarity
      textPrimary: '#ffffff',
      textSecondary: '#cccccc',
      textAccent: '#ff0000',

      // Accent colors - Swiss red (maintained in dark mode)
      accent: '#ff0000',
      accentHover: '#ff3333',
      accentActive: '#ff6666',

      // Border colors - precise white rules
      border: '#ffffff',
      borderSubtle: '#333333',
      borderAccent: '#ff0000',

      // Special effects - minimal, functional
      glow: 'rgba(255, 0, 0, 0.3)',
      shadow: 'rgba(0, 0, 0, 0.5)',
      overlay: 'rgba(0, 0, 0, 0.95)',

      // Calendar-specific - inverted purity
      calendarPrimary: '#000000',
      calendarSecondary: '#1a1a1a',
      calendarAccent: '#ff0000',
    },
  },

  typography: {
    fontFamily: {
      // Helvetica-centric stack - the hallmark of Swiss design
      sans: '"Helvetica Neue", Helvetica, Arial, "Liberation Sans", "Nimbus Sans L", sans-serif',
      // Clean geometric serif as fallback
      serif: '"Helvetica Neue", Helvetica, Arial, sans-serif',
      // Monospace for technical precision
      mono: '"Courier New", Courier, "Nimbus Mono L", monospace',
      // Display is also Helvetica - consistency is key
      display: '"Helvetica Neue", Helvetica, Arial, sans-serif',
    },
    fontWeights: {
      light: 300,      // Helvetica Light
      normal: 400,     // Helvetica Regular
      medium: 500,     // Helvetica Medium
      semibold: 600,   // Helvetica Bold (mapped)
      bold: 700,       // Helvetica Bold
    },
  },

  effects: {
    blur: {
      // Minimal blur - Swiss design favors clarity
      sm: '0px',
      md: '2px',
      lg: '4px',
    },
    shadows: {
      // Subtle, functional shadows - never decorative
      sm: '0 1px 2px rgba(0, 0, 0, 0.08)',
      md: '0 2px 4px rgba(0, 0, 0, 0.1)',
      lg: '0 4px 8px rgba(0, 0, 0, 0.12)',
      xl: '0 8px 16px rgba(0, 0, 0, 0.15)',
    },
    borderRadius: {
      // Minimal radius - Swiss design favors right angles
      sm: '0px',
      md: '2px',
      lg: '4px',
      xl: '4px',
    },
    transitions: {
      // Precise, functional transitions
      fast: '100ms cubic-bezier(0.4, 0, 0.2, 1)',
      normal: '200ms cubic-bezier(0.4, 0, 0.2, 1)',
      slow: '300ms cubic-bezier(0.4, 0, 0.2, 1)',
    },
  },

  materials: {
    // Clean white paper - offset printing aesthetic
    wood: {
      color: '#ffffff',
      roughness: 0.3,
      metalness: 0.0,
    },
    // Matte white paper stock
    paper: {
      color: '#fafafa',
      roughness: 0.4,
      metalness: 0.0,
    },
    // Brushed aluminum - modern, functional
    metal: {
      color: '#e0e0e0',
      roughness: 0.2,
      metalness: 0.9,
    },
    // Matte ceramic white
    ceramic: {
      color: '#f5f5f5',
      roughness: 0.25,
      metalness: 0.0,
    },
  },

  customCSS: `
    /* Swiss Modernist Theme Custom Styles */

    /* Mathematical grid system - 8px base unit */
    .swiss-grid-8 {
      --grid-unit: 8px;
      --grid-2: calc(var(--grid-unit) * 2);
      --grid-3: calc(var(--grid-unit) * 3);
      --grid-4: calc(var(--grid-unit) * 4);
      --grid-6: calc(var(--grid-unit) * 6);
      --grid-8: calc(var(--grid-unit) * 8);
      --grid-12: calc(var(--grid-unit) * 12);
      --grid-16: calc(var(--grid-unit) * 16);
    }

    /* Helvetica typography with Swiss hierarchy */
    .swiss-heading {
      font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
      font-weight: 700;
      letter-spacing: -0.02em;
      line-height: 1.1;
      margin: 0;
    }

    .swiss-heading-xl {
      font-size: clamp(3rem, 8vw, 7rem);
      font-weight: 700;
      line-height: 0.95;
      letter-spacing: -0.03em;
    }

    .swiss-heading-lg {
      font-size: clamp(2rem, 5vw, 4.5rem);
      font-weight: 700;
      line-height: 1;
      letter-spacing: -0.025em;
    }

    .swiss-heading-md {
      font-size: clamp(1.5rem, 3vw, 3rem);
      font-weight: 500;
      line-height: 1.1;
      letter-spacing: -0.01em;
    }

    /* Body text with optimal readability */
    .swiss-body {
      font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
      font-size: clamp(1rem, 2vw, 1.125rem);
      font-weight: 400;
      line-height: 1.6;
      letter-spacing: 0.01em;
      max-width: 65ch;
    }

    /* Swiss grid overlay - visible grid for perfect alignment */
    .swiss-grid-overlay {
      position: relative;
    }

    .swiss-grid-overlay::before {
      content: '';
      position: absolute;
      inset: 0;
      background-image:
        repeating-linear-gradient(
          0deg,
          transparent,
          transparent calc(8px - 1px),
          rgba(255, 0, 0, 0.05) calc(8px - 1px),
          rgba(255, 0, 0, 0.05) 8px
        ),
        repeating-linear-gradient(
          90deg,
          transparent,
          transparent calc(8px - 1px),
          rgba(255, 0, 0, 0.05) calc(8px - 1px),
          rgba(255, 0, 0, 0.05) 8px
        );
      pointer-events: none;
      opacity: 0;
      transition: opacity 300ms;
    }

    .swiss-grid-overlay:hover::before,
    .swiss-grid-overlay.show-grid::before {
      opacity: 1;
    }

    /* Precise alignment system */
    .swiss-align-left {
      text-align: left;
      margin-right: auto;
    }

    .swiss-align-center {
      text-align: center;
      margin-inline: auto;
    }

    .swiss-align-right {
      text-align: right;
      margin-left: auto;
    }

    /* Hairline rules - precise dividers */
    .swiss-rule {
      height: 1px;
      background: currentColor;
      border: none;
      margin: 0;
    }

    .swiss-rule-thick {
      height: 2px;
      background: currentColor;
      border: none;
      margin: 0;
    }

    .swiss-rule-red {
      background: #ff0000;
    }

    /* Swiss color blocks - geometric color fields */
    .swiss-red-block {
      background: #ff0000;
      color: #ffffff;
      padding: var(--grid-4, 32px);
    }

    .swiss-black-block {
      background: #000000;
      color: #ffffff;
      padding: var(--grid-4, 32px);
    }

    .swiss-white-block {
      background: #ffffff;
      color: #000000;
      padding: var(--grid-4, 32px);
      border: 1px solid #000000;
    }

    /* Asymmetric grid layouts - Swiss modernist composition */
    .swiss-layout-asymmetric {
      display: grid;
      grid-template-columns: repeat(12, 1fr);
      gap: var(--grid-3, 24px);
    }

    .swiss-layout-asymmetric > .swiss-col-7 {
      grid-column: span 7;
    }

    .swiss-layout-asymmetric > .swiss-col-5 {
      grid-column: span 5;
    }

    .swiss-layout-asymmetric > .swiss-col-8 {
      grid-column: span 8;
    }

    .swiss-layout-asymmetric > .swiss-col-4 {
      grid-column: span 4;
    }

    /* Mathematical spacing system */
    .swiss-spacing-1 { margin: var(--grid-unit, 8px); }
    .swiss-spacing-2 { margin: var(--grid-2, 16px); }
    .swiss-spacing-3 { margin: var(--grid-3, 24px); }
    .swiss-spacing-4 { margin: var(--grid-4, 32px); }
    .swiss-spacing-6 { margin: var(--grid-6, 48px); }
    .swiss-spacing-8 { margin: var(--grid-8, 64px); }

    .swiss-gap-1 { gap: var(--grid-unit, 8px); }
    .swiss-gap-2 { gap: var(--grid-2, 16px); }
    .swiss-gap-3 { gap: var(--grid-3, 24px); }
    .swiss-gap-4 { gap: var(--grid-4, 32px); }

    /* Swiss poster style - large typography with red accent */
    .swiss-poster {
      position: relative;
      padding: var(--grid-8, 64px);
      background: #ffffff;
      color: #000000;
    }

    .swiss-poster-title {
      font-size: clamp(4rem, 12vw, 10rem);
      font-weight: 700;
      line-height: 0.9;
      letter-spacing: -0.04em;
      margin: 0;
    }

    .swiss-poster-accent {
      color: #ff0000;
      display: block;
    }

    /* Precise borders - Swiss attention to detail */
    .swiss-border {
      border: 1px solid currentColor;
    }

    .swiss-border-thick {
      border: 2px solid currentColor;
    }

    .swiss-border-top {
      border-top: 1px solid currentColor;
    }

    .swiss-border-bottom {
      border-bottom: 1px solid currentColor;
    }

    .swiss-border-left {
      border-left: 1px solid currentColor;
    }

    .swiss-border-right {
      border-right: 1px solid currentColor;
    }

    /* Geometric shapes - pure forms */
    .swiss-square {
      aspect-ratio: 1;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .swiss-circle {
      aspect-ratio: 1;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    /* Swiss button - functional, precise */
    .swiss-button {
      font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
      font-size: 1rem;
      font-weight: 500;
      letter-spacing: 0.02em;
      text-transform: uppercase;
      padding: var(--grid-2, 16px) var(--grid-4, 32px);
      border: 2px solid #000000;
      background: #ffffff;
      color: #000000;
      cursor: pointer;
      transition: all 200ms cubic-bezier(0.4, 0, 0.2, 1);
    }

    .swiss-button:hover {
      background: #000000;
      color: #ffffff;
    }

    .swiss-button:active {
      background: #ff0000;
      border-color: #ff0000;
      color: #ffffff;
    }

    .swiss-button-primary {
      background: #ff0000;
      border-color: #ff0000;
      color: #ffffff;
    }

    .swiss-button-primary:hover {
      background: #cc0000;
      border-color: #cc0000;
    }

    .swiss-button-primary:active {
      background: #990000;
      border-color: #990000;
    }

    /* Dark mode adjustments */
    .dark .swiss-poster {
      background: #000000;
      color: #ffffff;
    }

    .dark .swiss-white-block {
      background: #000000;
      color: #ffffff;
      border-color: #ffffff;
    }

    .dark .swiss-button {
      background: #000000;
      border-color: #ffffff;
      color: #ffffff;
    }

    .dark .swiss-button:hover {
      background: #ffffff;
      color: #000000;
    }

    .dark .swiss-button:active {
      background: #ff0000;
      border-color: #ff0000;
      color: #ffffff;
    }

    /* Perfect alignment helpers */
    .swiss-align-baseline {
      display: flex;
      align-items: baseline;
    }

    .swiss-align-center-vertical {
      display: flex;
      align-items: center;
    }

    .swiss-justify-between {
      display: flex;
      justify-content: space-between;
    }

    /* Modular scale typography - Swiss hierarchy */
    .swiss-scale-1 { font-size: 0.75rem; line-height: 1.5; }
    .swiss-scale-2 { font-size: 0.875rem; line-height: 1.5; }
    .swiss-scale-3 { font-size: 1rem; line-height: 1.6; }
    .swiss-scale-4 { font-size: 1.125rem; line-height: 1.6; }
    .swiss-scale-5 { font-size: 1.25rem; line-height: 1.5; }
    .swiss-scale-6 { font-size: 1.5rem; line-height: 1.4; }
    .swiss-scale-7 { font-size: 2rem; line-height: 1.3; }
    .swiss-scale-8 { font-size: 2.5rem; line-height: 1.2; }
    .swiss-scale-9 { font-size: 3rem; line-height: 1.1; }

    /* Information hierarchy - Swiss approach to content */
    .swiss-label {
      font-size: 0.75rem;
      font-weight: 500;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      color: currentColor;
      opacity: 0.7;
    }

    .swiss-caption {
      font-size: 0.875rem;
      line-height: 1.5;
      color: currentColor;
      opacity: 0.8;
    }

    /* Grid container - 12-column Swiss grid */
    .swiss-grid-12 {
      display: grid;
      grid-template-columns: repeat(12, 1fr);
      gap: var(--grid-3, 24px);
      margin: 0 auto;
      max-width: 1440px;
      padding: 0 var(--grid-4, 32px);
    }

    /* Flush alignment - text to grid edge */
    .swiss-flush {
      margin-left: calc(var(--grid-unit, 8px) * -1);
    }

    /* Mathematical proportions - golden ratio elements */
    .swiss-ratio-golden {
      aspect-ratio: 1.618;
    }

    .swiss-ratio-square {
      aspect-ratio: 1;
    }

    .swiss-ratio-a4 {
      aspect-ratio: 1 / 1.414;
    }

    /* Precision focus states */
    .swiss-focus:focus-visible {
      outline: 2px solid #ff0000;
      outline-offset: 2px;
    }

    /* Vertical rhythm - Swiss text spacing */
    .swiss-rhythm > * + * {
      margin-top: 1.5em;
    }

    .swiss-rhythm-tight > * + * {
      margin-top: 1em;
    }

    .swiss-rhythm-loose > * + * {
      margin-top: 2em;
    }

    /* Swiss card - minimal, functional container */
    .swiss-card {
      background: var(--bg-primary);
      border: 1px solid currentColor;
      padding: var(--grid-4, 32px);
      transition: box-shadow 200ms cubic-bezier(0.4, 0, 0.2, 1);
    }

    .swiss-card:hover {
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.12);
    }

    /* Objective photography frame */
    .swiss-photo-frame {
      border: 1px solid #000000;
      padding: var(--grid-2, 16px);
      background: #ffffff;
    }

    .dark .swiss-photo-frame {
      border-color: #ffffff;
      background: #000000;
    }

    /* Swiss number styling - tabular figures */
    .swiss-numbers {
      font-feature-settings: "tnum" 1, "lnum" 1;
      font-variant-numeric: tabular-nums lining-nums;
    }

    /* Functional navigation - Swiss approach */
    .swiss-nav {
      display: flex;
      gap: var(--grid-4, 32px);
      align-items: center;
      font-size: 0.875rem;
      font-weight: 500;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .swiss-nav-link {
      color: currentColor;
      text-decoration: none;
      padding-bottom: 2px;
      border-bottom: 2px solid transparent;
      transition: border-color 200ms;
    }

    .swiss-nav-link:hover {
      border-bottom-color: #ff0000;
    }

    .swiss-nav-link.active {
      border-bottom-color: currentColor;
    }

    /* Asymmetric composition helper */
    .swiss-asymmetric {
      display: flex;
      justify-content: flex-start;
      align-items: flex-start;
      gap: var(--grid-4, 32px);
    }

    .swiss-asymmetric > :first-child {
      flex: 2;
    }

    .swiss-asymmetric > :last-child {
      flex: 1;
    }

    /* Swiss selection color */
    ::selection {
      background: #ff0000;
      color: #ffffff;
    }

    /* Precise measurements - Swiss attention to detail */
    .swiss-measure {
      max-width: 65ch;
    }

    .swiss-measure-narrow {
      max-width: 45ch;
    }

    .swiss-measure-wide {
      max-width: 80ch;
    }
  `,
};
