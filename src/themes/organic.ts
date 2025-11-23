/**
 * Organic Nature Theme
 *
 * An award-worthy theme inspired by forests, moss, wood, and natural materials.
 * Features earthy tones, organic shapes, and warm, inviting aesthetics that
 * connect the user to nature through thoughtful design and natural textures.
 *
 * Design Philosophy:
 * - Warm, earthy color palettes reminiscent of forests and natural landscapes
 * - Soft, flowing curves and organic shapes that mimic nature
 * - Natural textures and materials (wood, clay, moss, stone)
 * - Gentle lighting that feels like dappled sunlight through leaves
 * - Typography that feels handcrafted yet refined
 */

import { Theme } from '@/types/theme';

export const organicTheme: Theme = {
  id: 'organic',
  name: 'Organic Nature',
  description: 'Warm, earthy tones inspired by forests, moss, and natural materials. Feel connected to nature.',

  colors: {
    // Light mode - Inspired by a sun-dappled forest floor
    light: {
      // Primary backgrounds - warm, natural tones
      bgPrimary: '#FAF8F4',        // Warm off-white, like sun-bleached linen
      bgSecondary: '#F1EDE5',      // Soft sand/clay
      bgTertiary: '#E8E2D5',       // Deeper natural beige

      // Text colors - earthy and readable
      textPrimary: '#3A3226',      // Deep bark brown
      textSecondary: '#5C5245',    // Warm earth brown
      textAccent: '#4A6741',       // Forest green

      // Accent colors - vibrant natural green
      accent: '#6B8E5F',           // Moss green
      accentHover: '#5A7851',      // Deeper moss
      accentActive: '#4A6741',     // Dark forest green

      // Border colors - subtle natural divisions
      border: '#D4C9B5',           // Warm sand
      borderSubtle: '#E3DCCC',     // Light sand
      borderAccent: '#6B8E5F',     // Moss green

      // Special effects
      glow: 'rgba(107, 142, 95, 0.15)',      // Soft moss glow
      shadow: 'rgba(58, 50, 38, 0.08)',      // Gentle natural shadow
      overlay: 'rgba(250, 248, 244, 0.92)',  // Warm translucent overlay

      // Calendar-specific colors
      calendarPrimary: '#8B7355',    // Warm walnut wood
      calendarSecondary: '#E8E2D5',  // Natural paper
      calendarAccent: '#6B8E5F',     // Living green
    },

    // Dark mode - Inspired by a moonlit forest
    dark: {
      // Primary backgrounds - deep, rich earth tones
      bgPrimary: '#1C1A16',        // Deep forest floor/rich soil
      bgSecondary: '#2A2620',      // Dark bark
      bgTertiary: '#35302A',       // Shadowed earth

      // Text colors - warm and natural
      textPrimary: '#E8DCC8',      // Warm cream, like moonlight
      textSecondary: '#C4B5A0',    // Soft natural beige
      textAccent: '#A8C4A0',       // Pale moss green

      // Accent colors - luminous natural green
      accent: '#8DB87E',           // Vibrant moss
      accentHover: '#A3C794',      // Lighter living green
      accentActive: '#B8D6AA',     // Fresh spring green

      // Border colors - subtle depth
      border: '#3F3930',           // Deep earth
      borderSubtle: '#2F2B25',     // Shadow
      borderAccent: '#8DB87E',     // Luminous moss

      // Special effects
      glow: 'rgba(141, 184, 126, 0.18)',     // Ethereal moss glow
      shadow: 'rgba(12, 10, 8, 0.35)',       // Deep forest shadow
      overlay: 'rgba(28, 26, 22, 0.94)',     // Rich dark overlay

      // Calendar-specific colors
      calendarPrimary: '#4A3F30',    // Dark walnut
      calendarSecondary: '#35302A',  // Aged wood
      calendarAccent: '#8DB87E',     // Living moss
    },
  },

  typography: {
    fontFamily: {
      // Warm, organic serif for headings - feels handcrafted yet elegant
      sans: '"Inter", "Helvetica Neue", sans-serif',
      serif: '"Crimson Pro", "Crimson Text", "Georgia", serif',
      mono: '"JetBrains Mono", "Fira Code", monospace',
      display: '"Playfair Display", "Crimson Pro", serif',
    },
    fontWeights: {
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
  },

  effects: {
    // Soft, gentle blur effects like morning mist
    blur: {
      sm: '4px',
      md: '12px',
      lg: '24px',
    },

    // Organic, natural shadows with warmth
    shadows: {
      sm: '0 2px 8px rgba(58, 50, 38, 0.06), 0 1px 3px rgba(58, 50, 38, 0.04)',
      md: '0 4px 16px rgba(58, 50, 38, 0.08), 0 2px 8px rgba(58, 50, 38, 0.04)',
      lg: '0 8px 32px rgba(58, 50, 38, 0.12), 0 4px 16px rgba(58, 50, 38, 0.06)',
      xl: '0 16px 48px rgba(58, 50, 38, 0.16), 0 8px 24px rgba(58, 50, 38, 0.08)',
    },

    // Soft, flowing curves - organic and natural
    borderRadius: {
      sm: '6px',
      md: '12px',
      lg: '20px',
      xl: '32px',
    },

    // Smooth, natural transitions
    transitions: {
      fast: '150ms cubic-bezier(0.4, 0, 0.2, 1)',
      normal: '300ms cubic-bezier(0.4, 0, 0.2, 1)',
      slow: '500ms cubic-bezier(0.4, 0, 0.2, 1)',
    },
  },

  materials: {
    // Warm walnut wood with visible grain
    wood: {
      color: '#8B7355',
      roughness: 0.65,     // Visible grain texture
      metalness: 0.05,     // Minimal sheen
    },

    // Handmade washi paper with organic texture
    paper: {
      color: '#E8E2D5',
      roughness: 0.85,     // Soft, textured surface
      metalness: 0.0,      // Completely matte
    },

    // Aged copper with natural patina
    metal: {
      color: '#B87C5A',    // Warm copper tone
      roughness: 0.45,     // Slightly weathered
      metalness: 0.65,     // Natural metallic quality
    },

    // Handcrafted clay ceramic with earthy glaze
    ceramic: {
      color: '#9C8770',    // Terracotta clay
      roughness: 0.35,     // Semi-glazed surface
      metalness: 0.08,     // Subtle sheen from glaze
    },
  },

  customCSS: `
    /* Organic Nature Theme - Custom Styles */

    /* Root variables for easy access */
    :root[data-theme="organic"] {
      --organic-moss: #6B8E5F;
      --organic-forest: #4A6741;
      --organic-earth: #8B7355;
      --organic-clay: #9C8770;
      --organic-warmth: rgba(139, 115, 85, 0.08);
    }

    /* Organic gradient backgrounds */
    [data-theme="organic"] .organic-gradient {
      background: linear-gradient(
        135deg,
        #FAF8F4 0%,
        #F1EDE5 50%,
        #E8E2D5 100%
      );
    }

    [data-theme="organic"][data-mode="dark"] .organic-gradient {
      background: linear-gradient(
        135deg,
        #1C1A16 0%,
        #2A2620 50%,
        #35302A 100%
      );
    }

    /* Natural texture overlay */
    [data-theme="organic"] .organic-texture::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-image:
        radial-gradient(circle at 20% 50%, rgba(107, 142, 95, 0.03) 0%, transparent 50%),
        radial-gradient(circle at 80% 80%, rgba(139, 115, 85, 0.03) 0%, transparent 50%);
      pointer-events: none;
      opacity: 0.6;
    }

    /* Organic glow effect for interactive elements */
    [data-theme="organic"] .organic-glow {
      box-shadow:
        0 0 20px rgba(107, 142, 95, 0.1),
        0 0 40px rgba(107, 142, 95, 0.05),
        0 4px 16px rgba(58, 50, 38, 0.08);
      transition: box-shadow 400ms cubic-bezier(0.4, 0, 0.2, 1);
    }

    [data-theme="organic"] .organic-glow:hover {
      box-shadow:
        0 0 30px rgba(107, 142, 95, 0.15),
        0 0 60px rgba(107, 142, 95, 0.08),
        0 8px 24px rgba(58, 50, 38, 0.12);
    }

    [data-theme="organic"][data-mode="dark"] .organic-glow {
      box-shadow:
        0 0 25px rgba(141, 184, 126, 0.12),
        0 0 50px rgba(141, 184, 126, 0.06),
        0 4px 16px rgba(12, 10, 8, 0.35);
    }

    [data-theme="organic"][data-mode="dark"] .organic-glow:hover {
      box-shadow:
        0 0 35px rgba(141, 184, 126, 0.18),
        0 0 70px rgba(141, 184, 126, 0.1),
        0 8px 24px rgba(12, 10, 8, 0.45);
    }

    /* Organic border with gradient */
    [data-theme="organic"] .organic-border {
      border: 1.5px solid transparent;
      background:
        linear-gradient(var(--bg-primary), var(--bg-primary)) padding-box,
        linear-gradient(135deg, #6B8E5F, #8B7355) border-box;
      border-radius: 12px;
    }

    /* Wood grain effect for calendar */
    [data-theme="organic"] .wood-grain {
      background-image:
        repeating-linear-gradient(
          90deg,
          rgba(139, 115, 85, 0.03) 0px,
          rgba(139, 115, 85, 0.03) 2px,
          transparent 2px,
          transparent 4px
        ),
        repeating-linear-gradient(
          0deg,
          rgba(74, 103, 65, 0.02) 0px,
          rgba(74, 103, 65, 0.02) 1px,
          transparent 1px,
          transparent 3px
        );
    }

    /* Organic pulse animation for living elements */
    @keyframes organicPulse {
      0%, 100% {
        opacity: 1;
        transform: scale(1);
      }
      50% {
        opacity: 0.85;
        transform: scale(1.02);
      }
    }

    [data-theme="organic"] .organic-pulse {
      animation: organicPulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
    }

    /* Natural paper texture */
    [data-theme="organic"] .paper-texture {
      background-color: var(--bg-secondary);
      background-image:
        repeating-linear-gradient(
          45deg,
          transparent,
          transparent 2px,
          rgba(58, 50, 38, 0.01) 2px,
          rgba(58, 50, 38, 0.01) 4px
        );
      box-shadow: inset 0 1px 3px rgba(58, 50, 38, 0.04);
    }

    /* Organic leaf accent */
    [data-theme="organic"] .leaf-accent::after {
      content: '🌿';
      opacity: 0.15;
      font-size: 2rem;
      position: absolute;
      right: -10px;
      top: -10px;
      pointer-events: none;
      filter: grayscale(1) opacity(0.3);
    }

    /* Smooth organic transitions */
    [data-theme="organic"] * {
      transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    }

    /* Focus states with organic glow */
    [data-theme="organic"] *:focus-visible {
      outline: 2px solid var(--organic-moss);
      outline-offset: 3px;
      border-radius: 8px;
    }

    /* Selection styling */
    [data-theme="organic"]::selection {
      background-color: rgba(107, 142, 95, 0.25);
      color: inherit;
    }

    [data-theme="organic"][data-mode="dark"]::selection {
      background-color: rgba(141, 184, 126, 0.3);
      color: inherit;
    }

    /* Organic button styling */
    [data-theme="organic"] .organic-button {
      background: linear-gradient(135deg, #6B8E5F 0%, #5A7851 100%);
      color: #FAF8F4;
      padding: 0.75rem 1.5rem;
      border-radius: 12px;
      border: none;
      font-weight: 500;
      cursor: pointer;
      transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);
      box-shadow:
        0 4px 16px rgba(107, 142, 95, 0.2),
        0 2px 8px rgba(58, 50, 38, 0.08);
    }

    [data-theme="organic"] .organic-button:hover {
      transform: translateY(-2px);
      box-shadow:
        0 6px 24px rgba(107, 142, 95, 0.25),
        0 3px 12px rgba(58, 50, 38, 0.12);
    }

    [data-theme="organic"] .organic-button:active {
      transform: translateY(0);
      box-shadow:
        0 2px 8px rgba(107, 142, 95, 0.2),
        0 1px 4px rgba(58, 50, 38, 0.08);
    }

    /* Organic card styling */
    [data-theme="organic"] .organic-card {
      background: var(--bg-secondary);
      border-radius: 20px;
      padding: 2rem;
      box-shadow:
        0 8px 32px rgba(58, 50, 38, 0.08),
        0 4px 16px rgba(58, 50, 38, 0.04);
      border: 1px solid var(--border-subtle);
      transition: all 400ms cubic-bezier(0.4, 0, 0.2, 1);
    }

    [data-theme="organic"] .organic-card:hover {
      transform: translateY(-4px);
      box-shadow:
        0 12px 48px rgba(58, 50, 38, 0.12),
        0 6px 24px rgba(58, 50, 38, 0.06),
        0 0 0 1px rgba(107, 142, 95, 0.1);
    }

    /* Organic scrollbar */
    [data-theme="organic"] ::-webkit-scrollbar {
      width: 12px;
      height: 12px;
    }

    [data-theme="organic"] ::-webkit-scrollbar-track {
      background: var(--bg-secondary);
      border-radius: 6px;
    }

    [data-theme="organic"] ::-webkit-scrollbar-thumb {
      background: linear-gradient(135deg, #6B8E5F, #8B7355);
      border-radius: 6px;
      border: 2px solid var(--bg-secondary);
    }

    [data-theme="organic"] ::-webkit-scrollbar-thumb:hover {
      background: linear-gradient(135deg, #5A7851, #7A6345);
    }

    /* Organic loading animation */
    @keyframes organicGrow {
      0% {
        transform: scale(0.8) rotate(0deg);
        opacity: 0.5;
      }
      50% {
        transform: scale(1.1) rotate(180deg);
        opacity: 1;
      }
      100% {
        transform: scale(0.8) rotate(360deg);
        opacity: 0.5;
      }
    }

    [data-theme="organic"] .organic-loading {
      animation: organicGrow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
    }

    /* Dappled light effect */
    [data-theme="organic"] .dappled-light {
      position: relative;
      overflow: hidden;
    }

    [data-theme="organic"] .dappled-light::before {
      content: '';
      position: absolute;
      top: -50%;
      left: -50%;
      width: 200%;
      height: 200%;
      background:
        radial-gradient(circle at 30% 40%, rgba(107, 142, 95, 0.08) 0%, transparent 30%),
        radial-gradient(circle at 70% 60%, rgba(139, 115, 85, 0.06) 0%, transparent 35%),
        radial-gradient(circle at 50% 20%, rgba(107, 142, 95, 0.05) 0%, transparent 25%);
      animation: dappledMove 20s ease-in-out infinite;
      pointer-events: none;
    }

    @keyframes dappledMove {
      0%, 100% {
        transform: translate(0, 0);
      }
      50% {
        transform: translate(5%, 5%);
      }
    }

    /* Organic form inputs */
    [data-theme="organic"] input,
    [data-theme="organic"] textarea,
    [data-theme="organic"] select {
      background: var(--bg-primary);
      border: 1.5px solid var(--border);
      border-radius: 12px;
      padding: 0.75rem 1rem;
      color: var(--text-primary);
      transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);
    }

    [data-theme="organic"] input:focus,
    [data-theme="organic"] textarea:focus,
    [data-theme="organic"] select:focus {
      border-color: var(--organic-moss);
      outline: none;
      box-shadow: 0 0 0 3px rgba(107, 142, 95, 0.1);
    }

    /* Organic tooltip */
    [data-theme="organic"] .organic-tooltip {
      background: var(--bg-tertiary);
      color: var(--text-primary);
      padding: 0.5rem 1rem;
      border-radius: 8px;
      font-size: 0.875rem;
      box-shadow:
        0 4px 16px rgba(58, 50, 38, 0.12),
        0 2px 8px rgba(58, 50, 38, 0.08);
      border: 1px solid var(--border-subtle);
    }
  `,
};
