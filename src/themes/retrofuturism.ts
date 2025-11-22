/**
 * Retro Futurism Theme
 *
 * Inspired by the optimistic 1950s-60s vision of the future.
 * Atomic age design, Googie architecture, and Space Age aesthetics.
 *
 * Design Philosophy:
 * - The Jetsons' atomic age optimism
 * - 1950s World's Fair futurism
 * - Googie architecture (coffee shops, diners, space needle)
 * - Raygun Gothic and streamline moderne
 * - Atomic orbits, starbursts, and boomerang shapes
 * - Chrome, bakelite, and vintage pastel plastics
 */

import { Theme } from '@/types/theme';

export const retrofuturismTheme: Theme = {
  id: 'retrofuturism',
  name: 'Retro Futurism',
  description: '1950s atomic age optimism with turquoise, orange, streamline moderne, and space age nostalgia',

  colors: {
    // Light Mode: Atomic Age Optimism
    light: {
      // Primary backgrounds - Cream and pastel tones
      bgPrimary: '#FFF8DC',
      bgSecondary: '#FFFACD',
      bgTertiary: '#FFE4B5',

      // Text colors - Deep charcoal with atomic accents
      textPrimary: '#2C2416',
      textSecondary: '#4A3F2E',
      textAccent: '#FF6B35',

      // Accent colors - Vibrant turquoise and orange
      accent: '#00CED1',
      accentHover: '#40E0D0',
      accentActive: '#5FD3D3',

      // Border colors - Turquoise and chrome
      border: '#00CED1',
      borderSubtle: '#B0E0E6',
      borderAccent: '#FF6B35',

      // Special effects - Atomic glow
      glow: 'rgba(0, 206, 209, 0.5)',
      shadow: 'rgba(44, 36, 22, 0.2)',
      overlay: 'rgba(255, 248, 220, 0.95)',

      // Calendar-specific - Space age palette
      calendarPrimary: '#00CED1',
      calendarSecondary: '#FF6B35',
      calendarAccent: '#FFD700',
    },

    // Dark Mode: Neon Night at the Space Age Diner
    dark: {
      // Primary backgrounds - Deep navy with subtle warmth
      bgPrimary: '#1A1F2E',
      bgSecondary: '#242938',
      bgTertiary: '#2E3544',

      // Text colors - Cream and neon accents
      textPrimary: '#FFF8DC',
      textSecondary: '#E8DCC4',
      textAccent: '#FF8C42',

      // Accent colors - Neon turquoise
      accent: '#40E0D0',
      accentHover: '#7FFFD4',
      accentActive: '#AFEEEE',

      // Border colors - Neon chrome
      border: '#40E0D0',
      borderSubtle: '#4A5568',
      borderAccent: '#FF8C42',

      // Special effects - Neon atomic glow
      glow: 'rgba(64, 224, 208, 0.6)',
      shadow: 'rgba(0, 0, 0, 0.5)',
      overlay: 'rgba(26, 31, 46, 0.95)',

      // Calendar-specific - Neon space age
      calendarPrimary: '#40E0D0',
      calendarSecondary: '#FF8C42',
      calendarAccent: '#FFD700',
    },
  },

  typography: {
    fontFamily: {
      // Geometric sans for streamline aesthetic
      sans: '"Space Grotesk", "Inter", "Helvetica Neue", -apple-system, sans-serif',

      // Retro sci-fi serif
      serif: '"Space Mono", "Courier Prime", "Courier New", monospace',

      // Technical monospace for atomic age precision
      mono: '"Space Mono", "IBM Plex Mono", "SF Mono", monospace',

      // Atomic age display font
      display: '"Orbitron", "Audiowide", "Quantico", "Exo 2", sans-serif',
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
      lg: '12px',
    },
    shadows: {
      // Atomic age shadows with turquoise and orange glow
      sm: '0 2px 4px rgba(0, 206, 209, 0.15), 0 1px 2px rgba(255, 107, 53, 0.1)',
      md: '0 4px 12px rgba(0, 206, 209, 0.2), 0 2px 6px rgba(255, 107, 53, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
      lg: '0 8px 24px rgba(0, 206, 209, 0.25), 0 4px 12px rgba(255, 107, 53, 0.2), inset 0 2px 0 rgba(255, 255, 255, 0.4)',
      xl: '0 16px 48px rgba(0, 206, 209, 0.3), 0 8px 24px rgba(255, 107, 53, 0.25), inset 0 3px 0 rgba(255, 255, 255, 0.5), 0 0 40px rgba(64, 224, 208, 0.2)',
    },
    borderRadius: {
      // Streamline moderne curves and atomic age rounded corners
      sm: '8px',
      md: '16px',
      lg: '24px',
      xl: '32px',
    },
    transitions: {
      fast: 'all 0.15s cubic-bezier(0.4, 0.0, 0.2, 1)',
      normal: 'all 0.3s cubic-bezier(0.4, 0.0, 0.2, 1)',
      slow: 'all 0.6s cubic-bezier(0.4, 0.0, 0.2, 1)',
    },
  },

  materials: {
    // Chrome/polished aluminum
    wood: {
      color: '#C0C0C0',
      roughness: 0.15,
      metalness: 0.9,
    },

    // Vintage cream bakelite
    paper: {
      color: '#FFF8DC',
      roughness: 0.4,
      metalness: 0.2,
    },

    // Shiny chrome finish
    metal: {
      color: '#E8E8E8',
      roughness: 0.1,
      metalness: 0.95,
    },

    // Vintage turquoise plastic/ceramic
    ceramic: {
      color: '#40E0D0',
      roughness: 0.25,
      metalness: 0.3,
    },
  },

  customCSS: `
    /* Retro Futurism Theme Custom Styles */

    /* Atomic orbit animation */
    @keyframes atomic-orbit {
      0% {
        transform: rotate(0deg) translateX(40px) rotate(0deg);
      }
      100% {
        transform: rotate(360deg) translateX(40px) rotate(-360deg);
      }
    }

    /* Starburst pulse animation */
    @keyframes starburst-pulse {
      0%, 100% {
        transform: scale(1) rotate(0deg);
        opacity: 0.8;
      }
      50% {
        transform: scale(1.1) rotate(5deg);
        opacity: 1;
      }
    }

    /* Neon flicker animation */
    @keyframes neon-flicker {
      0%, 100% {
        text-shadow:
          0 0 4px rgba(64, 224, 208, 0.8),
          0 0 8px rgba(64, 224, 208, 0.6),
          0 0 12px rgba(64, 224, 208, 0.4);
      }
      50% {
        text-shadow:
          0 0 8px rgba(64, 224, 208, 1),
          0 0 16px rgba(64, 224, 208, 0.8),
          0 0 24px rgba(64, 224, 208, 0.6);
      }
    }

    /* Streamline shimmer */
    @keyframes streamline-shimmer {
      0% {
        background-position: -200% center;
      }
      100% {
        background-position: 200% center;
      }
    }

    /* Boomerang float */
    @keyframes boomerang-float {
      0%, 100% {
        transform: translateY(0) rotate(-3deg);
      }
      50% {
        transform: translateY(-10px) rotate(3deg);
      }
    }

    /* Atomic starburst background pattern */
    .retrofuturism-starburst {
      background-image:
        radial-gradient(circle at 20% 30%, rgba(64, 224, 208, 0.1) 0%, transparent 50%),
        radial-gradient(circle at 80% 70%, rgba(255, 107, 53, 0.1) 0%, transparent 50%),
        radial-gradient(circle at 50% 50%, rgba(255, 215, 0, 0.05) 0%, transparent 40%);
      position: relative;
    }

    .retrofuturism-starburst::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-image:
        repeating-conic-gradient(
          from 0deg at 50% 50%,
          transparent 0deg,
          rgba(64, 224, 208, 0.03) 10deg,
          transparent 20deg
        );
      pointer-events: none;
    }

    /* Googie architecture curved elements */
    .retrofuturism-googie {
      border-radius: 24px 24px 80px 24px;
      background: linear-gradient(135deg,
        rgba(255, 248, 220, 1) 0%,
        rgba(255, 250, 205, 1) 50%,
        rgba(255, 228, 181, 1) 100%
      );
      border: 3px solid #00CED1;
      box-shadow:
        0 8px 24px rgba(0, 206, 209, 0.2),
        inset 0 2px 0 rgba(255, 255, 255, 0.6),
        inset 0 -2px 0 rgba(0, 206, 209, 0.1);
      position: relative;
      overflow: hidden;
    }

    [data-theme="dark"] .retrofuturism-googie {
      background: linear-gradient(135deg,
        rgba(26, 31, 46, 1) 0%,
        rgba(36, 41, 56, 1) 50%,
        rgba(46, 53, 68, 1) 100%
      );
      box-shadow:
        0 8px 24px rgba(64, 224, 208, 0.3),
        inset 0 2px 0 rgba(64, 224, 208, 0.2),
        0 0 40px rgba(64, 224, 208, 0.15);
    }

    /* Atomic orbital decoration */
    .retrofuturism-orbital {
      position: relative;
    }

    .retrofuturism-orbital::before,
    .retrofuturism-orbital::after {
      content: '';
      position: absolute;
      width: 8px;
      height: 8px;
      background: radial-gradient(circle, #FF6B35 0%, #FF8C42 50%, transparent 100%);
      border-radius: 50%;
      box-shadow: 0 0 12px rgba(255, 107, 53, 0.6);
    }

    .retrofuturism-orbital::before {
      top: 50%;
      left: 50%;
      animation: atomic-orbit 4s linear infinite;
    }

    .retrofuturism-orbital::after {
      top: 50%;
      left: 50%;
      animation: atomic-orbit 6s linear infinite reverse;
      background: radial-gradient(circle, #40E0D0 0%, #7FFFD4 50%, transparent 100%);
      box-shadow: 0 0 12px rgba(64, 224, 208, 0.6);
    }

    /* Chrome gradient effect */
    .retrofuturism-chrome {
      background: linear-gradient(
        135deg,
        #FFFFFF 0%,
        #E8E8E8 20%,
        #C0C0C0 40%,
        #FFFFFF 50%,
        #E8E8E8 60%,
        #D0D0D0 80%,
        #FFFFFF 100%
      );
      background-size: 200% 200%;
      animation: streamline-shimmer 3s ease-in-out infinite;
      box-shadow:
        inset 0 2px 4px rgba(255, 255, 255, 0.8),
        inset 0 -2px 4px rgba(0, 0, 0, 0.2),
        0 4px 12px rgba(0, 206, 209, 0.2);
      border-radius: 16px;
    }

    /* Vintage neon text effect */
    .retrofuturism-neon-text {
      color: #40E0D0;
      font-family: 'Orbitron', 'Audiowide', sans-serif;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.15em;
      animation: neon-flicker 3s ease-in-out infinite;
      text-shadow:
        0 0 4px rgba(64, 224, 208, 0.8),
        0 0 8px rgba(64, 224, 208, 0.6),
        0 0 12px rgba(64, 224, 208, 0.4),
        0 0 16px rgba(64, 224, 208, 0.2);
    }

    /* Boomerang shape decorative element */
    .retrofuturism-boomerang {
      width: 120px;
      height: 40px;
      background: linear-gradient(135deg, #FF6B35 0%, #FF8C42 100%);
      border-radius: 50% 50% 50% 0%;
      transform: rotate(45deg);
      box-shadow:
        0 4px 12px rgba(255, 107, 53, 0.4),
        inset 0 2px 0 rgba(255, 255, 255, 0.3);
      animation: boomerang-float 4s ease-in-out infinite;
    }

    /* Atomic age card design */
    .retrofuturism-card {
      background: var(--bg-secondary);
      border: 3px solid var(--accent);
      border-radius: 24px;
      padding: 32px;
      position: relative;
      overflow: hidden;
      box-shadow:
        0 8px 24px rgba(0, 206, 209, 0.2),
        inset 0 2px 0 rgba(255, 255, 255, 0.5);
      transition: all 0.4s cubic-bezier(0.4, 0.0, 0.2, 1);
    }

    .retrofuturism-card::before {
      content: '';
      position: absolute;
      top: -50%;
      right: -50%;
      width: 100%;
      height: 100%;
      background: radial-gradient(
        circle,
        rgba(64, 224, 208, 0.15) 0%,
        transparent 60%
      );
      pointer-events: none;
    }

    .retrofuturism-card::after {
      content: '';
      position: absolute;
      bottom: -20px;
      left: -20px;
      width: 80px;
      height: 80px;
      background: radial-gradient(
        circle,
        rgba(255, 107, 53, 0.2) 0%,
        transparent 70%
      );
      border-radius: 50%;
      pointer-events: none;
    }

    .retrofuturism-card:hover {
      transform: translateY(-4px) scale(1.02);
      border-color: var(--accent-hover);
      box-shadow:
        0 12px 36px rgba(0, 206, 209, 0.3),
        0 0 40px rgba(64, 224, 208, 0.2),
        inset 0 2px 0 rgba(255, 255, 255, 0.6);
    }

    /* Starburst divider */
    .retrofuturism-starburst-divider {
      position: relative;
      width: 100%;
      height: 60px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 40px 0;
    }

    .retrofuturism-starburst-divider::before {
      content: '';
      position: absolute;
      width: 60px;
      height: 60px;
      background:
        conic-gradient(
          from 0deg,
          transparent 0deg,
          var(--accent) 10deg,
          transparent 20deg,
          transparent 30deg,
          var(--border-accent) 40deg,
          transparent 50deg,
          transparent 60deg,
          var(--accent) 70deg,
          transparent 80deg,
          transparent 90deg,
          var(--border-accent) 100deg,
          transparent 110deg,
          transparent 120deg,
          var(--accent) 130deg,
          transparent 140deg,
          transparent 150deg,
          var(--border-accent) 160deg,
          transparent 170deg,
          transparent 180deg,
          var(--accent) 190deg,
          transparent 200deg,
          transparent 210deg,
          var(--border-accent) 220deg,
          transparent 230deg,
          transparent 240deg,
          var(--accent) 250deg,
          transparent 260deg,
          transparent 270deg,
          var(--border-accent) 280deg,
          transparent 290deg,
          transparent 300deg,
          var(--accent) 310deg,
          transparent 320deg,
          transparent 330deg,
          var(--border-accent) 340deg,
          transparent 350deg
        );
      animation: starburst-pulse 4s ease-in-out infinite;
      z-index: 1;
    }

    .retrofuturism-starburst-divider::after {
      content: '';
      position: absolute;
      width: 20px;
      height: 20px;
      background: radial-gradient(circle, #FFD700 0%, #FFA500 100%);
      border-radius: 50%;
      box-shadow:
        0 0 12px rgba(255, 215, 0, 0.6),
        0 0 24px rgba(255, 215, 0, 0.4);
      z-index: 2;
    }

    /* Space age button */
    .retrofuturism-button {
      background: linear-gradient(135deg, #00CED1 0%, #40E0D0 100%);
      border: 3px solid #FFFFFF;
      border-radius: 24px;
      color: #1A1F2E;
      font-family: 'Orbitron', sans-serif;
      font-weight: 700;
      font-size: 14px;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      padding: 14px 36px;
      position: relative;
      overflow: hidden;
      cursor: pointer;
      transition: all 0.3s cubic-bezier(0.4, 0.0, 0.2, 1);
      box-shadow:
        0 4px 12px rgba(0, 206, 209, 0.3),
        inset 0 2px 0 rgba(255, 255, 255, 0.5),
        inset 0 -2px 0 rgba(0, 0, 0, 0.1);
    }

    .retrofuturism-button::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(
        90deg,
        transparent,
        rgba(255, 255, 255, 0.4),
        transparent
      );
      transition: left 0.5s ease;
    }

    .retrofuturism-button:hover {
      transform: translateY(-2px) scale(1.05);
      background: linear-gradient(135deg, #40E0D0 0%, #7FFFD4 100%);
      box-shadow:
        0 8px 24px rgba(64, 224, 208, 0.4),
        0 0 32px rgba(64, 224, 208, 0.3),
        inset 0 2px 0 rgba(255, 255, 255, 0.7);
      border-color: #FFD700;
    }

    .retrofuturism-button:hover::before {
      left: 100%;
    }

    .retrofuturism-button:active {
      transform: translateY(0) scale(1);
    }

    /* Atomic age badge */
    .retrofuturism-badge {
      display: inline-block;
      background: linear-gradient(135deg, #FF6B35 0%, #FF8C42 100%);
      border: 2px solid #FFFFFF;
      border-radius: 20px;
      color: #FFFFFF;
      font-family: 'Orbitron', sans-serif;
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      padding: 6px 16px;
      box-shadow:
        0 2px 8px rgba(255, 107, 53, 0.3),
        inset 0 1px 0 rgba(255, 255, 255, 0.3);
    }

    /* Vintage plastic finish */
    .retrofuturism-plastic {
      background: linear-gradient(
        135deg,
        rgba(64, 224, 208, 0.2) 0%,
        rgba(64, 224, 208, 0.3) 50%,
        rgba(64, 224, 208, 0.2) 100%
      );
      border-radius: 16px;
      border: 2px solid rgba(64, 224, 208, 0.4);
      backdrop-filter: blur(8px);
      box-shadow:
        inset 0 2px 4px rgba(255, 255, 255, 0.4),
        inset 0 -2px 4px rgba(0, 0, 0, 0.1),
        0 4px 12px rgba(64, 224, 208, 0.2);
    }

    /* Raygun gothic element */
    .retrofuturism-raygun {
      position: relative;
      padding: 24px 32px;
      background: linear-gradient(
        90deg,
        transparent 0%,
        rgba(64, 224, 208, 0.1) 20%,
        rgba(64, 224, 208, 0.1) 80%,
        transparent 100%
      );
      border-left: 4px solid #00CED1;
      border-right: 4px solid #FF6B35;
    }

    .retrofuturism-raygun::before {
      content: '';
      position: absolute;
      left: -4px;
      top: 50%;
      transform: translateY(-50%);
      width: 0;
      height: 0;
      border-style: solid;
      border-width: 12px 0 12px 12px;
      border-color: transparent transparent transparent #00CED1;
    }

    .retrofuturism-raygun::after {
      content: '';
      position: absolute;
      right: -4px;
      top: 50%;
      transform: translateY(-50%);
      width: 0;
      height: 0;
      border-style: solid;
      border-width: 12px 12px 12px 0;
      border-color: transparent #FF6B35 transparent transparent;
    }

    /* Streamline moderne decoration */
    .retrofuturism-streamline {
      position: relative;
      padding-left: 40px;
    }

    .retrofuturism-streamline::before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      width: 4px;
      background: linear-gradient(
        180deg,
        transparent 0%,
        #00CED1 20%,
        #40E0D0 50%,
        #7FFFD4 80%,
        transparent 100%
      );
      border-radius: 4px;
    }

    .retrofuturism-streamline::after {
      content: '';
      position: absolute;
      left: 8px;
      top: 0;
      bottom: 0;
      width: 2px;
      background: linear-gradient(
        180deg,
        transparent 0%,
        rgba(64, 224, 208, 0.5) 30%,
        rgba(64, 224, 208, 0.5) 70%,
        transparent 100%
      );
      border-radius: 2px;
    }

    /* Atomic pattern background */
    .retrofuturism-atomic-pattern {
      background-image:
        radial-gradient(circle at 25% 25%, rgba(64, 224, 208, 0.05) 2%, transparent 2%),
        radial-gradient(circle at 75% 75%, rgba(255, 107, 53, 0.05) 2%, transparent 2%),
        radial-gradient(circle at 25% 75%, rgba(255, 215, 0, 0.05) 2%, transparent 2%),
        radial-gradient(circle at 75% 25%, rgba(64, 224, 208, 0.05) 2%, transparent 2%);
      background-size: 50px 50px;
      background-position: 0 0, 25px 25px, 0 25px, 25px 0;
    }

    /* World's Fair inspired hero section */
    .retrofuturism-hero {
      position: relative;
      padding: 80px 40px;
      background:
        radial-gradient(ellipse at top, rgba(64, 224, 208, 0.15) 0%, transparent 50%),
        radial-gradient(ellipse at bottom, rgba(255, 107, 53, 0.15) 0%, transparent 50%),
        var(--bg-primary);
      overflow: hidden;
    }

    .retrofuturism-hero::before {
      content: '';
      position: absolute;
      top: -50%;
      left: 50%;
      transform: translateX(-50%);
      width: 200%;
      height: 200%;
      background:
        repeating-conic-gradient(
          from 0deg at 50% 50%,
          transparent 0deg,
          rgba(64, 224, 208, 0.02) 10deg,
          transparent 20deg
        );
      animation: starburst-pulse 20s linear infinite;
      pointer-events: none;
    }

    /* Googie corner accents */
    .retrofuturism-googie-corners {
      position: relative;
    }

    .retrofuturism-googie-corners::before,
    .retrofuturism-googie-corners::after {
      content: '';
      position: absolute;
      width: 40px;
      height: 40px;
      border: 3px solid var(--accent);
    }

    .retrofuturism-googie-corners::before {
      top: -3px;
      left: -3px;
      border-right: none;
      border-bottom: none;
      border-radius: 24px 0 0 0;
      background: linear-gradient(135deg, rgba(64, 224, 208, 0.1) 0%, transparent 100%);
    }

    .retrofuturism-googie-corners::after {
      bottom: -3px;
      right: -3px;
      border-left: none;
      border-top: none;
      border-radius: 0 0 24px 0;
      background: linear-gradient(315deg, rgba(255, 107, 53, 0.1) 0%, transparent 100%);
    }

    /* Hover state for interactive elements */
    .retrofuturism-interactive {
      position: relative;
      transition: all 0.3s cubic-bezier(0.4, 0.0, 0.2, 1);
      cursor: pointer;
    }

    .retrofuturism-interactive::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 0;
      height: 3px;
      background: linear-gradient(90deg, #00CED1 0%, #FF6B35 100%);
      border-radius: 3px;
      transition: width 0.3s cubic-bezier(0.4, 0.0, 0.2, 1);
    }

    .retrofuturism-interactive:hover {
      transform: translateY(-2px);
      color: var(--accent-hover);
    }

    .retrofuturism-interactive:hover::after {
      width: 100%;
    }

    /* Dark mode specific adjustments */
    [data-theme="dark"] .retrofuturism-neon-text {
      animation: neon-flicker 2s ease-in-out infinite;
    }

    [data-theme="dark"] .retrofuturism-card {
      box-shadow:
        0 8px 24px rgba(64, 224, 208, 0.3),
        0 0 40px rgba(64, 224, 208, 0.15),
        inset 0 2px 0 rgba(64, 224, 208, 0.2);
    }

    [data-theme="dark"] .retrofuturism-chrome {
      background: linear-gradient(
        135deg,
        #4A5568 0%,
        #2D3748 20%,
        #1A202C 40%,
        #4A5568 50%,
        #2D3748 60%,
        #1A202C 80%,
        #4A5568 100%
      );
      box-shadow:
        inset 0 2px 4px rgba(64, 224, 208, 0.2),
        inset 0 -2px 4px rgba(0, 0, 0, 0.4),
        0 4px 12px rgba(64, 224, 208, 0.3);
    }
  `,
};
