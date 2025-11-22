/**
 * Art Deco Luxury Theme
 *
 * Inspired by the opulent glamour of the 1920s-1930s Art Deco movement.
 * Rich golds, deep blacks, jewel tones, geometric patterns, and luxury materials.
 *
 * Design Philosophy:
 * - Great Gatsby era sophistication and excess
 * - Metropolis geometric symmetry
 * - Luxury hotel grandeur (Plaza, Waldorf Astoria)
 * - Chrysler Building architectural elegance
 * - Chevrons, sunbursts, and stepped geometric forms
 * - Metallic shimmer and precious materials
 */

import { Theme } from '@/types/theme';

export const artdecoTheme: Theme = {
  id: 'artdeco',
  name: 'Art Deco Luxury',
  description: '1920s glamour with rich golds, geometric patterns, and opulent sophistication',

  colors: {
    // Light Mode: Champagne Opulence
    light: {
      // Primary backgrounds - Cream, champagne, pearl
      bgPrimary: '#FAF8F3',
      bgSecondary: '#F5F1E8',
      bgTertiary: '#EDE7DB',

      // Text colors - Deep charcoal and rich gold
      textPrimary: '#1A1614',
      textSecondary: '#4A443E',
      textAccent: '#B8860B',

      // Accent colors - Rich gold with bronze tones
      accent: '#D4AF37',
      accentHover: '#C19B2E',
      accentActive: '#B8860B',

      // Border colors - Gold and bronze
      border: '#D4AF37',
      borderSubtle: '#E8D7A0',
      borderAccent: '#B8860B',

      // Special effects - Warm golden glow
      glow: 'rgba(212, 175, 55, 0.4)',
      shadow: 'rgba(26, 22, 20, 0.15)',
      overlay: 'rgba(250, 248, 243, 0.95)',

      // Calendar-specific - Rich jewel tones
      calendarPrimary: '#D4AF37',
      calendarSecondary: '#8B4789',
      calendarAccent: '#C41E3A',
    },

    // Dark Mode: Midnight Luxury
    dark: {
      // Primary backgrounds - Deep blacks with subtle warmth
      bgPrimary: '#0D0C0B',
      bgSecondary: '#1A1614',
      bgTertiary: '#252220',

      // Text colors - Champagne and gold
      textPrimary: '#F5F1E8',
      textSecondary: '#D1C7B8',
      textAccent: '#FFD700',

      // Accent colors - Brilliant gold
      accent: '#FFD700',
      accentHover: '#FFC700',
      accentActive: '#FFB700',

      // Border colors - Luminous gold
      border: '#D4AF37',
      borderSubtle: '#5A4F3A',
      borderAccent: '#FFD700',

      // Special effects - Intense golden glow
      glow: 'rgba(255, 215, 0, 0.5)',
      shadow: 'rgba(0, 0, 0, 0.5)',
      overlay: 'rgba(13, 12, 11, 0.95)',

      // Calendar-specific - Vibrant jewel tones
      calendarPrimary: '#FFD700',
      calendarSecondary: '#9F5F9F',
      calendarAccent: '#DC143C',
    },
  },

  typography: {
    fontFamily: {
      // Elegant serif for body text
      serif: '"Playfair Display", "Cormorant Garamond", "Baskerville", Georgia, serif',

      // Art Deco display font for headlines
      display: '"Poiret One", "Cormorant Unicase", "Cinzel", "Didot", serif',

      // Geometric sans for modern contrast
      sans: '"Montserrat", "Futura", "Avenir Next", -apple-system, sans-serif',

      // Monospace for technical elements
      mono: '"IBM Plex Mono", "Courier Prime", monospace',
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
    blur: {
      sm: '4px',
      md: '8px',
      lg: '16px',
    },
    shadows: {
      // Luxurious multi-layered shadows with golden highlights
      sm: '0 1px 3px rgba(26, 22, 20, 0.12), 0 1px 2px rgba(212, 175, 55, 0.08)',
      md: '0 4px 12px rgba(26, 22, 20, 0.15), 0 2px 6px rgba(212, 175, 55, 0.12), inset 0 1px 0 rgba(255, 215, 0, 0.1)',
      lg: '0 10px 30px rgba(26, 22, 20, 0.2), 0 4px 12px rgba(212, 175, 55, 0.15), inset 0 2px 0 rgba(255, 215, 0, 0.15)',
      xl: '0 20px 60px rgba(26, 22, 20, 0.25), 0 8px 24px rgba(212, 175, 55, 0.2), inset 0 3px 0 rgba(255, 215, 0, 0.2), 0 0 40px rgba(255, 215, 0, 0.15)',
    },
    borderRadius: {
      // Minimal radius for geometric Art Deco aesthetic
      sm: '0px',
      md: '2px',
      lg: '4px',
      xl: '6px',
    },
    transitions: {
      fast: 'all 0.15s cubic-bezier(0.4, 0.0, 0.2, 1)',
      normal: 'all 0.3s cubic-bezier(0.4, 0.0, 0.2, 1)',
      slow: 'all 0.5s cubic-bezier(0.4, 0.0, 0.2, 1)',
    },
  },

  materials: {
    // Polished brass/bronze
    wood: {
      color: '#B8860B',
      roughness: 0.3,
      metalness: 0.6,
    },

    // Luxurious cream marble with gold veining
    paper: {
      color: '#F5F1E8',
      roughness: 0.2,
      metalness: 0.1,
    },

    // Brilliant polished gold
    metal: {
      color: '#FFD700',
      roughness: 0.15,
      metalness: 0.95,
    },

    // Black onyx/obsidian with gold highlights
    ceramic: {
      color: '#1A1614',
      roughness: 0.1,
      metalness: 0.4,
    },
  },

  customCSS: `
    /* Art Deco Luxury Theme Custom Styles */

    /* Golden shimmer effect */
    @keyframes goldShimmer {
      0% {
        background-position: -200% center;
      }
      100% {
        background-position: 200% center;
      }
    }

    /* Sunburst gradient for backgrounds */
    .artdeco-sunburst {
      background: radial-gradient(
        circle at center,
        rgba(255, 215, 0, 0.15) 0%,
        rgba(212, 175, 55, 0.1) 30%,
        rgba(184, 134, 11, 0.05) 60%,
        transparent 100%
      );
    }

    /* Metallic gold gradient */
    .artdeco-gold-gradient {
      background: linear-gradient(
        135deg,
        #FFD700 0%,
        #FFC700 25%,
        #D4AF37 50%,
        #B8860B 75%,
        #8B6914 100%
      );
      background-size: 200% 200%;
      animation: goldShimmer 3s ease-in-out infinite;
    }

    /* Geometric chevron pattern */
    .artdeco-chevron {
      background-image:
        linear-gradient(135deg, rgba(212, 175, 55, 0.1) 25%, transparent 25%),
        linear-gradient(225deg, rgba(212, 175, 55, 0.1) 25%, transparent 25%),
        linear-gradient(45deg, rgba(212, 175, 55, 0.1) 25%, transparent 25%),
        linear-gradient(315deg, rgba(212, 175, 55, 0.1) 25%, transparent 25%);
      background-size: 40px 40px;
      background-position: 0 0, 0 0, 20px 20px, 20px 20px;
    }

    /* Art Deco stepped border */
    .artdeco-border {
      border: 2px solid #D4AF37;
      box-shadow:
        0 0 0 4px var(--bg-primary),
        0 0 0 6px #B8860B,
        0 0 0 8px var(--bg-primary),
        0 0 0 10px #8B6914;
      position: relative;
    }

    .artdeco-border::before {
      content: '';
      position: absolute;
      top: -12px;
      left: -12px;
      right: -12px;
      bottom: -12px;
      background: linear-gradient(
        45deg,
        transparent 30%,
        rgba(255, 215, 0, 0.1) 50%,
        transparent 70%
      );
      pointer-events: none;
    }

    /* Luxury golden text effect */
    .artdeco-golden-text {
      background: linear-gradient(
        135deg,
        #FFD700 0%,
        #FFC700 20%,
        #FFE55C 40%,
        #D4AF37 60%,
        #B8860B 80%,
        #FFD700 100%
      );
      background-size: 200% auto;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      animation: goldShimmer 4s ease-in-out infinite;
      text-shadow: 0 0 20px rgba(255, 215, 0, 0.3);
    }

    /* Geometric sunburst divider */
    .artdeco-sunburst-divider {
      width: 100%;
      height: 2px;
      background: linear-gradient(
        90deg,
        transparent 0%,
        #B8860B 20%,
        #D4AF37 40%,
        #FFD700 50%,
        #D4AF37 60%,
        #B8860B 80%,
        transparent 100%
      );
      position: relative;
    }

    .artdeco-sunburst-divider::after {
      content: '◆';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: #FFD700;
      font-size: 20px;
      background: var(--bg-primary);
      padding: 0 20px;
      text-shadow: 0 0 10px rgba(255, 215, 0, 0.5);
    }

    /* Stepped geometric corners */
    .artdeco-corners {
      position: relative;
    }

    .artdeco-corners::before,
    .artdeco-corners::after {
      content: '';
      position: absolute;
      width: 30px;
      height: 30px;
      border: 2px solid #D4AF37;
    }

    .artdeco-corners::before {
      top: -2px;
      left: -2px;
      border-right: none;
      border-bottom: none;
      background: linear-gradient(135deg, rgba(255, 215, 0, 0.1) 0%, transparent 100%);
    }

    .artdeco-corners::after {
      bottom: -2px;
      right: -2px;
      border-left: none;
      border-top: none;
      background: linear-gradient(315deg, rgba(255, 215, 0, 0.1) 0%, transparent 100%);
    }

    /* Luxury card with geometric borders */
    .artdeco-card {
      background: var(--bg-secondary);
      border: 1px solid var(--border);
      box-shadow:
        0 8px 24px rgba(26, 22, 20, 0.15),
        0 2px 8px rgba(212, 175, 55, 0.1),
        inset 0 1px 0 rgba(255, 215, 0, 0.1);
      position: relative;
      overflow: hidden;
    }

    .artdeco-card::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(
        90deg,
        transparent,
        rgba(255, 215, 0, 0.1),
        transparent
      );
      transition: left 0.5s ease;
    }

    .artdeco-card:hover::before {
      left: 100%;
    }

    /* Metallic finish effect */
    .artdeco-metallic {
      background: linear-gradient(
        180deg,
        #FFD700 0%,
        #D4AF37 50%,
        #B8860B 100%
      );
      box-shadow:
        inset 0 1px 0 rgba(255, 255, 255, 0.5),
        inset 0 -1px 0 rgba(0, 0, 0, 0.3),
        0 4px 8px rgba(212, 175, 55, 0.3);
    }

    /* Art Deco zigzag pattern */
    .artdeco-zigzag {
      background-image:
        linear-gradient(135deg, #D4AF37 25%, transparent 25%),
        linear-gradient(225deg, #D4AF37 25%, transparent 25%),
        linear-gradient(45deg, #B8860B 25%, transparent 25%),
        linear-gradient(315deg, #B8860B 25%, var(--bg-primary) 25%);
      background-size: 20px 20px;
      background-position: 10px 0, 10px 0, 0 0, 0 0;
    }

    /* Jewel-tone accent bars */
    .artdeco-jewel-accent {
      border-left: 4px solid transparent;
      border-image: linear-gradient(
        180deg,
        #C41E3A 0%,
        #8B4789 50%,
        #006B54 100%
      ) 1;
      padding-left: 20px;
    }

    /* Vintage glamour blur */
    .artdeco-glamour-blur {
      backdrop-filter: blur(12px);
      background: rgba(250, 248, 243, 0.8);
      border: 1px solid rgba(212, 175, 55, 0.3);
      box-shadow:
        0 8px 32px rgba(26, 22, 20, 0.1),
        inset 0 1px 0 rgba(255, 215, 0, 0.2);
    }

    /* Dark mode adjustments */
    [data-theme="dark"] .artdeco-glamour-blur {
      background: rgba(13, 12, 11, 0.8);
      border: 1px solid rgba(255, 215, 0, 0.3);
    }

    /* Elegant hover state for interactive elements */
    .artdeco-interactive {
      position: relative;
      transition: all 0.3s cubic-bezier(0.4, 0.0, 0.2, 1);
      cursor: pointer;
    }

    .artdeco-interactive::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 0;
      height: 2px;
      background: linear-gradient(90deg, #FFD700, #D4AF37);
      transition: width 0.3s cubic-bezier(0.4, 0.0, 0.2, 1);
    }

    .artdeco-interactive:hover::after {
      width: 100%;
    }

    .artdeco-interactive:hover {
      transform: translateY(-2px);
      text-shadow: 0 2px 8px rgba(255, 215, 0, 0.3);
    }

    /* Luxury button styling */
    .artdeco-button {
      background: linear-gradient(135deg, #D4AF37 0%, #B8860B 100%);
      border: 2px solid #FFD700;
      color: #1A1614;
      font-weight: 600;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      padding: 12px 32px;
      position: relative;
      overflow: hidden;
      transition: all 0.3s cubic-bezier(0.4, 0.0, 0.2, 1);
    }

    .artdeco-button::before {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      width: 0;
      height: 0;
      border-radius: 50%;
      background: rgba(255, 215, 0, 0.3);
      transform: translate(-50%, -50%);
      transition: width 0.6s, height 0.6s;
    }

    .artdeco-button:hover::before {
      width: 300px;
      height: 300px;
    }

    .artdeco-button:hover {
      box-shadow:
        0 8px 24px rgba(212, 175, 55, 0.4),
        inset 0 1px 0 rgba(255, 255, 255, 0.3);
      transform: translateY(-2px);
    }

    .artdeco-button:active {
      transform: translateY(0);
    }
  `,
};
