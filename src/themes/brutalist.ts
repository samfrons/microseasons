/**
 * Brutalist Theme
 * Raw, unpolished, high-contrast design with industrial concrete aesthetics
 * Award-level minimal brutalism with powerful typography and harsh geometry
 */

import { Theme } from '@/types/theme';

export const brutalistTheme: Theme = {
  id: 'brutalist',
  name: 'Brutalist',
  description: 'Raw concrete minimalism with uncompromising geometric precision and industrial strength',

  colors: {
    // Light Mode - Raw Concrete
    light: {
      // Primary backgrounds - Concrete gradient
      bgPrimary: '#e8e8e8',
      bgSecondary: '#d4d4d4',
      bgTertiary: '#c0c0c0',

      // Text colors - Maximum contrast
      textPrimary: '#000000',
      textSecondary: '#1a1a1a',
      textAccent: '#ff0000',

      // Accent colors - Bold red
      accent: '#ff0000',
      accentHover: '#cc0000',
      accentActive: '#990000',

      // Border colors - Harsh black lines
      border: '#000000',
      borderSubtle: '#2a2a2a',
      borderAccent: '#ff0000',

      // Special effects
      glow: 'rgba(255, 0, 0, 0.6)',
      shadow: 'rgba(0, 0, 0, 0.8)',
      overlay: 'rgba(0, 0, 0, 0.9)',

      // Calendar-specific - Industrial tones
      calendarPrimary: '#a0a0a0',
      calendarSecondary: '#787878',
      calendarAccent: '#ff0000',
    },

    // Dark Mode - Night Construction
    dark: {
      // Primary backgrounds - Dark concrete
      bgPrimary: '#0a0a0a',
      bgSecondary: '#1a1a1a',
      bgTertiary: '#2a2a2a',

      // Text colors - Stark white
      textPrimary: '#ffffff',
      textSecondary: '#e8e8e8',
      textAccent: '#ff0000',

      // Accent colors - Electric red
      accent: '#ff0000',
      accentHover: '#ff3333',
      accentActive: '#ff6666',

      // Border colors - Sharp white/red lines
      border: '#ffffff',
      borderSubtle: '#a0a0a0',
      borderAccent: '#ff0000',

      // Special effects
      glow: 'rgba(255, 0, 0, 0.8)',
      shadow: 'rgba(0, 0, 0, 0.95)',
      overlay: 'rgba(0, 0, 0, 0.95)',

      // Calendar-specific - Industrial metal
      calendarPrimary: '#3a3a3a',
      calendarSecondary: '#505050',
      calendarAccent: '#ff0000',
    },
  },

  typography: {
    fontFamily: {
      // System fonts for raw, utilitarian feel
      sans: 'system-ui, -apple-system, "Segoe UI", "Roboto", "Helvetica Neue", Arial, sans-serif',
      // Monospace for technical brutalism
      serif: '"Courier New", Courier, monospace',
      mono: '"Courier New", "Monaco", "Consolas", monospace',
      // Display font - heavy system sans
      display: 'system-ui, -apple-system, "Segoe UI", "Roboto", "Helvetica Neue", Arial, sans-serif',
    },
    fontWeights: {
      light: 300,
      normal: 500,
      medium: 700,
      semibold: 800,
      bold: 900,
    },
  },

  effects: {
    blur: {
      // Minimal blur - brutalism rejects softness
      sm: '0px',
      md: '0px',
      lg: '2px',
    },
    shadows: {
      // Harsh, strong shadows - architectural presence
      sm: '2px 2px 0px rgba(0, 0, 0, 0.9)',
      md: '4px 4px 0px rgba(0, 0, 0, 0.9)',
      lg: '8px 8px 0px rgba(0, 0, 0, 0.9)',
      xl: '16px 16px 0px rgba(0, 0, 0, 0.9)',
    },
    borderRadius: {
      // Sharp corners - no compromise
      sm: '0px',
      md: '0px',
      lg: '2px',
      xl: '2px',
    },
    transitions: {
      // Snappy, mechanical transitions
      fast: '50ms cubic-bezier(0.4, 0, 1, 1)',
      normal: '100ms cubic-bezier(0.4, 0, 1, 1)',
      slow: '200ms cubic-bezier(0.4, 0, 1, 1)',
    },
  },

  materials: {
    // Raw concrete - rough, unfinished
    wood: {
      color: '#808080',
      roughness: 0.95,
      metalness: 0.0,
    },
    // Unbleached industrial paper
    paper: {
      color: '#c0c0c0',
      roughness: 0.9,
      metalness: 0.0,
    },
    // Industrial steel/rebar
    metal: {
      color: '#404040',
      roughness: 0.6,
      metalness: 0.8,
    },
    // Rough concrete blocks
    ceramic: {
      color: '#989898',
      roughness: 0.95,
      metalness: 0.0,
    },
  },

  customCSS: `
    /* Brutalist Theme Custom Styles */

    /* Heavy typography hierarchy */
    .brutalist-heading {
      font-weight: 900;
      letter-spacing: -0.05em;
      text-transform: uppercase;
      line-height: 0.9;
    }

    /* Harsh geometric borders */
    .brutalist-border {
      border: 3px solid currentColor;
      box-shadow: 4px 4px 0px rgba(0, 0, 0, 0.9);
    }

    /* Industrial grid pattern overlay */
    .brutalist-grid-overlay {
      background-image:
        linear-gradient(rgba(0, 0, 0, 0.03) 1px, transparent 1px),
        linear-gradient(90deg, rgba(0, 0, 0, 0.03) 1px, transparent 1px);
      background-size: 20px 20px;
    }

    /* Concrete texture effect */
    .brutalist-concrete {
      background-image:
        repeating-linear-gradient(
          45deg,
          transparent,
          transparent 2px,
          rgba(0, 0, 0, 0.02) 2px,
          rgba(0, 0, 0, 0.02) 4px
        );
    }

    /* Hard-edged hover states */
    .brutalist-interactive {
      transition: transform 100ms cubic-bezier(0.4, 0, 1, 1),
                  box-shadow 100ms cubic-bezier(0.4, 0, 1, 1);
    }

    .brutalist-interactive:hover {
      transform: translate(-2px, -2px);
      box-shadow: 6px 6px 0px rgba(0, 0, 0, 0.9);
    }

    .brutalist-interactive:active {
      transform: translate(0px, 0px);
      box-shadow: 2px 2px 0px rgba(0, 0, 0, 0.9);
    }

    /* Bold accent blocks */
    .brutalist-accent-block {
      background: #ff0000;
      color: #ffffff;
      padding: 0.5rem 1rem;
      font-weight: 900;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      border: 3px solid #000000;
      box-shadow: 4px 4px 0px rgba(0, 0, 0, 0.9);
    }

    /* Monospace technical details */
    .brutalist-mono {
      font-family: "Courier New", Monaco, monospace;
      font-weight: 700;
      letter-spacing: 0.05em;
    }

    /* Large scale typography */
    .brutalist-hero-text {
      font-size: clamp(3rem, 10vw, 8rem);
      font-weight: 900;
      line-height: 0.85;
      letter-spacing: -0.05em;
      text-transform: uppercase;
    }

    /* Geometric dividers */
    .brutalist-divider {
      height: 3px;
      background: currentColor;
      margin: 2rem 0;
    }

    /* Industrial button style */
    .brutalist-button {
      background: #000000;
      color: #ffffff;
      border: 3px solid #000000;
      padding: 1rem 2rem;
      font-weight: 900;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      box-shadow: 4px 4px 0px rgba(0, 0, 0, 0.9);
      transition: all 100ms cubic-bezier(0.4, 0, 1, 1);
    }

    .brutalist-button:hover {
      background: #ff0000;
      border-color: #000000;
      transform: translate(-2px, -2px);
      box-shadow: 6px 6px 0px rgba(0, 0, 0, 0.9);
    }

    .brutalist-button:active {
      transform: translate(0px, 0px);
      box-shadow: 2px 2px 0px rgba(0, 0, 0, 0.9);
    }

    /* Dark mode adjustments */
    .dark .brutalist-border {
      border-color: #ffffff;
      box-shadow: 4px 4px 0px rgba(255, 255, 255, 0.2);
    }

    .dark .brutalist-grid-overlay {
      background-image:
        linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
    }

    .dark .brutalist-concrete {
      background-image:
        repeating-linear-gradient(
          45deg,
          transparent,
          transparent 2px,
          rgba(255, 255, 255, 0.02) 2px,
          rgba(255, 255, 255, 0.02) 4px
        );
    }

    .dark .brutalist-interactive:hover {
      box-shadow: 6px 6px 0px rgba(255, 255, 255, 0.3);
    }

    .dark .brutalist-interactive:active {
      box-shadow: 2px 2px 0px rgba(255, 255, 255, 0.3);
    }

    .dark .brutalist-accent-block {
      background: #ff0000;
      color: #000000;
      border-color: #ffffff;
      box-shadow: 4px 4px 0px rgba(255, 255, 255, 0.3);
    }

    .dark .brutalist-button {
      background: #ffffff;
      color: #000000;
      border-color: #ffffff;
      box-shadow: 4px 4px 0px rgba(255, 255, 255, 0.3);
    }

    .dark .brutalist-button:hover {
      background: #ff0000;
      color: #ffffff;
      border-color: #ffffff;
      box-shadow: 6px 6px 0px rgba(255, 255, 255, 0.4);
    }

    /* Exposed structure - show the grid */
    .brutalist-structure {
      outline: 1px solid rgba(0, 0, 0, 0.1);
      outline-offset: -1px;
    }

    .dark .brutalist-structure {
      outline: 1px solid rgba(255, 255, 255, 0.1);
    }

    /* Raw, unfinished aesthetic */
    .brutalist-raw {
      position: relative;
    }

    .brutalist-raw::before {
      content: '';
      position: absolute;
      inset: 0;
      background: repeating-linear-gradient(
        0deg,
        transparent,
        transparent 1px,
        rgba(0, 0, 0, 0.015) 1px,
        rgba(0, 0, 0, 0.015) 2px
      );
      pointer-events: none;
    }

    .dark .brutalist-raw::before {
      background: repeating-linear-gradient(
        0deg,
        transparent,
        transparent 1px,
        rgba(255, 255, 255, 0.015) 1px,
        rgba(255, 255, 255, 0.015) 2px
      );
    }

    /* Powerful focus states */
    .brutalist-focus:focus-visible {
      outline: 3px solid #ff0000;
      outline-offset: 3px;
    }

    /* Monumental scale */
    .brutalist-monumental {
      font-size: clamp(2rem, 6vw, 5rem);
      font-weight: 900;
      line-height: 0.9;
      letter-spacing: -0.03em;
    }

    /* Industrial info cards */
    .brutalist-card {
      background: var(--bg-secondary);
      border: 3px solid currentColor;
      padding: 1.5rem;
      box-shadow: 6px 6px 0px rgba(0, 0, 0, 0.9);
    }

    .dark .brutalist-card {
      box-shadow: 6px 6px 0px rgba(255, 255, 255, 0.2);
    }

    /* Harsh geometric shapes */
    .brutalist-triangle {
      clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
    }

    .brutalist-pentagon {
      clip-path: polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%);
    }

    /* Utilitarian labels */
    .brutalist-label {
      font-family: "Courier New", Monaco, monospace;
      font-size: 0.75rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.15em;
      opacity: 0.8;
    }
  `,
};
