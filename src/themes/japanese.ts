/**
 * Japanese Minimalist Theme
 *
 * Inspired by wabi-sabi, ma (negative space), and traditional Japanese aesthetics.
 * This theme embodies the philosophy of "less is more" with refined simplicity,
 * natural materials, and serene color palettes that evoke zen gardens, washi paper,
 * and the subtle beauty of imperfection.
 *
 * Design principles:
 * - Wabi-sabi: Finding beauty in imperfection and transience
 * - Ma: Embracing negative space as a design element
 * - Kanso: Simplicity and elimination of clutter
 * - Shizen: Naturalness and absence of pretense
 * - Yugen: Profound grace and subtle depth
 */

import { Theme } from '@/types/theme';

export const japaneseTheme: Theme = {
  id: 'japanese',
  name: 'Japanese Minimalist',
  description: 'Serene and timeless design inspired by wabi-sabi, zen gardens, and traditional Japanese aesthetics',

  colors: {
    // Light mode: Inspired by washi paper, rice straw, natural wood, and soft daylight
    light: {
      // Primary backgrounds - warm, natural paper tones
      bgPrimary: '#fdfcfb',        // Washi paper white with warmth
      bgSecondary: '#f7f5f2',      // Soft rice paper
      bgTertiary: '#f0ede8',       // Aged paper with subtle beige

      // Text colors - sumi ink variations
      textPrimary: '#2d2a26',      // Rich sumi ink black
      textSecondary: '#5a564f',    // Faded ink gray
      textAccent: '#8b4513',       // Burnt sienna - traditional rust/bronze

      // Accent colors - inspired by sakura and traditional pigments
      accent: '#d4a5a5',           // Dusty sakura pink
      accentHover: '#c89090',      // Deeper sakura
      accentActive: '#b87b7b',     // Rich sakura

      // Border colors - subtle and natural
      border: '#e3dfd8',           // Soft neutral border
      borderSubtle: '#ebe8e3',     // Barely-there border
      borderAccent: '#d4a5a5',     // Sakura accent border

      // Special effects
      glow: 'rgba(212, 165, 165, 0.15)',        // Soft sakura glow
      shadow: 'rgba(45, 42, 38, 0.08)',         // Gentle natural shadow
      overlay: 'rgba(253, 252, 251, 0.85)',     // Paper overlay

      // Calendar-specific - inspired by traditional calendar materials
      calendarPrimary: '#fdfcfb',   // Washi paper
      calendarSecondary: '#e8e3db',  // Aged wood
      calendarAccent: '#c89090',     // Sakura accent
    },

    // Dark mode: Inspired by sumi ink, charcoal, indigo dye (ai), and nighttime zen gardens
    dark: {
      // Primary backgrounds - deep, contemplative tones
      bgPrimary: '#1a1816',        // Deep charcoal, almost black
      bgSecondary: '#242220',      // Slightly lighter charcoal
      bgTertiary: '#2d2a27',       // Warm dark brown-gray

      // Text colors - moonlight and soft illumination
      textPrimary: '#e8e3db',      // Soft paper white
      textSecondary: '#b8b3a8',    // Muted beige-gray
      textAccent: '#d4a5a5',       // Sakura accent for emphasis

      // Accent colors - inspired by indigo dye and moonlit sakura
      accent: '#9b7b7b',           // Muted sakura in darkness
      accentHover: '#b89090',      // Illuminated sakura
      accentActive: '#d4a5a5',     // Bright sakura

      // Border colors - subtle definition in darkness
      border: '#3a3735',           // Subtle dark border
      borderSubtle: '#2d2a27',     // Barely visible
      borderAccent: '#9b7b7b',     // Sakura accent border

      // Special effects
      glow: 'rgba(155, 123, 123, 0.2)',         // Soft sakura glow in darkness
      shadow: 'rgba(0, 0, 0, 0.3)',             // Deeper shadows at night
      overlay: 'rgba(26, 24, 22, 0.85)',        // Dark overlay

      // Calendar-specific - inspired by lacquerware and night materials
      calendarPrimary: '#242220',   // Dark lacquer
      calendarSecondary: '#3a3735',  // Aged dark wood
      calendarAccent: '#b89090',     // Illuminated sakura
    },
  },

  typography: {
    fontFamily: {
      sans: 'var(--font-geist-sans), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Noto Sans JP", sans-serif',
      serif: 'var(--font-eb-garamond), "Noto Serif JP", Georgia, serif',
      mono: 'var(--font-geist-mono), "SF Mono", Monaco, "Cascadia Code", monospace',
      display: 'var(--font-geist-sans), -apple-system, BlinkMacSystemFont, sans-serif',
    },
    fontWeights: {
      light: 300,      // Delicate and airy
      normal: 400,     // Balanced and natural
      medium: 500,     // Gentle emphasis
      semibold: 600,   // Clear hierarchy
      bold: 700,       // Strong presence
    },
  },

  effects: {
    blur: {
      sm: '4px',       // Subtle atmospheric blur
      md: '8px',       // Gentle depth
      lg: '16px',      // Soft focus, like viewing through shoji screen
    },
    shadows: {
      sm: '0 1px 2px rgba(45, 42, 38, 0.06), 0 1px 3px rgba(45, 42, 38, 0.04)',
      md: '0 4px 6px rgba(45, 42, 38, 0.07), 0 2px 4px rgba(45, 42, 38, 0.05)',
      lg: '0 10px 15px rgba(45, 42, 38, 0.08), 0 4px 6px rgba(45, 42, 38, 0.05)',
      xl: '0 20px 25px rgba(45, 42, 38, 0.1), 0 10px 10px rgba(45, 42, 38, 0.04)',
    },
    borderRadius: {
      sm: '2px',       // Minimal, almost imperceptible
      md: '4px',       // Gentle, natural curves
      lg: '8px',       // Soft organic rounds
      xl: '12px',      // Generous curves for larger elements
    },
    transitions: {
      fast: '150ms cubic-bezier(0.4, 0, 0.2, 1)',      // Quick, natural response
      normal: '300ms cubic-bezier(0.4, 0, 0.2, 1)',    // Smooth, contemplative
      slow: '500ms cubic-bezier(0.4, 0, 0.2, 1)',      // Deliberate, meditative
    },
  },

  materials: {
    // Hinoki cypress - traditional Japanese wood
    wood: {
      color: '#e8dcc8',    // Warm blonde wood
      roughness: 0.75,     // Natural, unpolished texture
      metalness: 0.0,      // Pure organic material
    },

    // Washi paper - traditional Japanese paper
    paper: {
      color: '#fdfcfb',    // Pure washi white with warmth
      roughness: 0.85,     // Slightly textured, handmade quality
      metalness: 0.0,      // Matte, non-reflective
    },

    // Aged bronze - traditional temple bells and ornaments
    metal: {
      color: '#8b7355',    // Oxidized bronze with green patina
      roughness: 0.4,      // Polished but aged
      metalness: 0.6,      // Subdued metallic quality
    },

    // Ceramic - inspired by raku pottery and tea ceremony bowls
    ceramic: {
      color: '#d8cfc0',    // Cream ceramic with natural variation
      roughness: 0.65,     // Semi-matte, hand-formed texture
      metalness: 0.0,      // Pure clay material
    },
  },

  customCSS: `
    /* Japanese Minimalist Theme Custom Styles */

    /* Enhanced text rendering for Japanese aesthetics */
    .theme-japanese {
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      text-rendering: optimizeLegibility;
      font-feature-settings: "palt" 1; /* Proportional alternate widths */
      letter-spacing: 0.01em; /* Subtle spacing for breathing room (ma) */
    }

    /* Generous spacing - embodying "ma" (negative space) */
    .theme-japanese .section-spacing {
      padding-block: clamp(4rem, 10vw, 8rem);
    }

    .theme-japanese .element-spacing {
      margin-block: clamp(2rem, 5vw, 4rem);
    }

    /* Refined headings with subtle hierarchy */
    .theme-japanese h1,
    .theme-japanese h2,
    .theme-japanese h3 {
      font-weight: 400; /* Lighter weight for elegance */
      letter-spacing: -0.01em; /* Slight tightening for display text */
      line-height: 1.2;
    }

    /* Wabi-sabi texture overlay - subtle imperfection */
    .theme-japanese .wabi-sabi-texture::before {
      content: '';
      position: absolute;
      inset: 0;
      background-image:
        radial-gradient(circle at 20% 50%, rgba(227, 223, 216, 0.3) 0%, transparent 50%),
        radial-gradient(circle at 80% 50%, rgba(227, 223, 216, 0.2) 0%, transparent 50%);
      opacity: 0.5;
      mix-blend-mode: overlay;
      pointer-events: none;
    }

    .theme-japanese.dark .wabi-sabi-texture::before {
      background-image:
        radial-gradient(circle at 20% 50%, rgba(58, 55, 53, 0.4) 0%, transparent 50%),
        radial-gradient(circle at 80% 50%, rgba(58, 55, 53, 0.3) 0%, transparent 50%);
    }

    /* Paper texture effect for cards and surfaces */
    .theme-japanese .paper-texture {
      background-image:
        url("data:image/svg+xml,%3Csvg width='200' height='200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E");
      background-size: 200px 200px;
    }

    /* Ink wash effect for gradients */
    .theme-japanese .ink-wash {
      background: linear-gradient(
        to bottom,
        rgba(45, 42, 38, 0) 0%,
        rgba(45, 42, 38, 0.02) 25%,
        rgba(45, 42, 38, 0.04) 50%,
        rgba(45, 42, 38, 0.02) 75%,
        rgba(45, 42, 38, 0) 100%
      );
    }

    .theme-japanese.dark .ink-wash {
      background: linear-gradient(
        to bottom,
        rgba(232, 227, 219, 0) 0%,
        rgba(232, 227, 219, 0.02) 25%,
        rgba(232, 227, 219, 0.04) 50%,
        rgba(232, 227, 219, 0.02) 75%,
        rgba(232, 227, 219, 0) 100%
      );
    }

    /* Shoji screen effect - translucent layering */
    .theme-japanese .shoji-screen {
      background: linear-gradient(
        90deg,
        transparent 0%,
        rgba(227, 223, 216, 0.1) 50%,
        transparent 100%
      );
      backdrop-filter: blur(8px);
      -webkit-backdrop-filter: blur(8px);
    }

    .theme-japanese.dark .shoji-screen {
      background: linear-gradient(
        90deg,
        transparent 0%,
        rgba(58, 55, 53, 0.15) 50%,
        transparent 100%
      );
    }

    /* Zen garden ripple animation */
    @keyframes zen-ripple {
      0% {
        transform: scale(1);
        opacity: 0.4;
      }
      50% {
        transform: scale(1.5);
        opacity: 0.2;
      }
      100% {
        transform: scale(2);
        opacity: 0;
      }
    }

    .theme-japanese .zen-ripple {
      animation: zen-ripple 3s cubic-bezier(0.4, 0, 0.2, 1) infinite;
    }

    /* Subtle sakura petal animation */
    @keyframes sakura-fall {
      0% {
        transform: translateY(-10px) rotate(0deg);
        opacity: 0;
      }
      10% {
        opacity: 0.6;
      }
      90% {
        opacity: 0.6;
      }
      100% {
        transform: translateY(100vh) rotate(360deg);
        opacity: 0;
      }
    }

    .theme-japanese .sakura-petal {
      animation: sakura-fall 15s linear infinite;
    }

    /* Brush stroke accent */
    .theme-japanese .brush-stroke {
      position: relative;
    }

    .theme-japanese .brush-stroke::after {
      content: '';
      position: absolute;
      bottom: -4px;
      left: 0;
      right: 0;
      height: 2px;
      background: linear-gradient(
        to right,
        transparent 0%,
        currentColor 20%,
        currentColor 80%,
        transparent 100%
      );
      opacity: 0.3;
    }

    /* Enhanced focus states with Japanese aesthetics */
    .theme-japanese :focus-visible {
      outline: 2px solid rgba(212, 165, 165, 0.5);
      outline-offset: 3px;
      border-radius: 2px;
    }

    /* Smooth transitions embodying "Jo-ha-kyū" (start-speed-end) */
    .theme-japanese * {
      transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    }

    /* Selection color with sakura tint */
    .theme-japanese ::selection {
      background-color: rgba(212, 165, 165, 0.3);
      color: inherit;
    }

    /* Hover states with gentle elevation */
    .theme-japanese .hover-lift {
      transition: transform 300ms cubic-bezier(0.4, 0, 0.2, 1),
                  box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1);
    }

    .theme-japanese .hover-lift:hover {
      transform: translateY(-2px);
      box-shadow: 0 10px 15px rgba(45, 42, 38, 0.08),
                  0 4px 6px rgba(45, 42, 38, 0.05);
    }

    .theme-japanese.dark .hover-lift:hover {
      box-shadow: 0 10px 15px rgba(0, 0, 0, 0.3),
                  0 4px 6px rgba(0, 0, 0, 0.2);
    }

    /* Container with ma (negative space) emphasis */
    .theme-japanese .ma-container {
      padding: clamp(2rem, 5vw, 4rem);
      max-width: 65ch; /* Optimal reading width */
      margin-inline: auto;
    }

    /* Vertical rhythm for harmonious spacing */
    .theme-japanese .vertical-rhythm > * + * {
      margin-top: 1.5em;
    }

    /* Minimalist divider with brush aesthetic */
    .theme-japanese .divider {
      height: 1px;
      background: linear-gradient(
        to right,
        transparent 0%,
        currentColor 50%,
        transparent 100%
      );
      opacity: 0.15;
      border: none;
      margin-block: clamp(2rem, 5vw, 4rem);
    }
  `,
};
