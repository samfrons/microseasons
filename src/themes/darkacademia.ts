/**
 * Dark Academia Theme
 *
 * Inspired by the intellectual elegance of old libraries, vintage universities,
 * and classical scholarly traditions. Rich browns, deep greens, burgundy tones,
 * aged paper, leather-bound books, and candlelight warmth.
 *
 * Design Philosophy:
 * - Oxford/Cambridge library grandeur and antiquity
 * - Leather-bound book collections and wood paneling
 * - Candlelit study rooms and vintage manuscripts
 * - Classical literature and timeless scholarship
 * - Warm, intellectual, studious atmosphere
 * - Trinity College Dublin Long Room majesty
 */

import { Theme } from '@/types/theme';

export const darkacademiaTheme: Theme = {
  id: 'darkacademia',
  name: 'Dark Academia',
  description: 'Scholarly elegance with rich browns, aged paper, leather bindings, and candlelight warmth',

  colors: {
    // Light Mode: Daylit Reading Room
    light: {
      // Primary backgrounds - Aged paper, parchment, cream
      bgPrimary: '#F5F1E6',
      bgSecondary: '#EBE4D1',
      bgTertiary: '#E0D5BB',

      // Text colors - Deep ink, charcoal, sepia
      textPrimary: '#2B2520',
      textSecondary: '#4A3F35',
      textAccent: '#704214',

      // Accent colors - Rich burgundy with brown undertones
      accent: '#7C2D12',
      accentHover: '#92400E',
      accentActive: '#A16207',

      // Border colors - Leather brown and sepia
      border: '#9A7B4F',
      borderSubtle: '#C4B5A0',
      borderAccent: '#704214',

      // Special effects - Warm candlelight glow and ink shadows
      glow: 'rgba(124, 45, 18, 0.3)',
      shadow: 'rgba(43, 37, 32, 0.15)',
      overlay: 'rgba(245, 241, 230, 0.95)',

      // Calendar-specific - Scholarly earth tones
      calendarPrimary: '#7C2D12',
      calendarSecondary: '#065F46',
      calendarAccent: '#92400E',
    },

    // Dark Mode: Candlelit Study
    dark: {
      // Primary backgrounds - Rich dark browns, walnut, mahogany
      bgPrimary: '#1C1714',
      bgSecondary: '#2B2520',
      bgTertiary: '#3A322B',

      // Text colors - Warm cream, aged paper, candlelight
      textPrimary: '#F5F1E6',
      textSecondary: '#D4CCBA',
      textAccent: '#E8B88A',

      // Accent colors - Warm burgundy and copper
      accent: '#D97706',
      accentHover: '#F59E0B',
      accentActive: '#FBBF24',

      // Border colors - Warm brass and aged bronze
      border: '#92400E',
      borderSubtle: '#4A3F35',
      borderAccent: '#D97706',

      // Special effects - Candlelight glow and deep shadows
      glow: 'rgba(217, 119, 6, 0.4)',
      shadow: 'rgba(0, 0, 0, 0.5)',
      overlay: 'rgba(28, 23, 20, 0.95)',

      // Calendar-specific - Rich scholarly tones
      calendarPrimary: '#D97706',
      calendarSecondary: '#10B981',
      calendarAccent: '#F59E0B',
    },
  },

  typography: {
    fontFamily: {
      // Classic serif for scholarly body text
      serif: '"EB Garamond", "Baskerville", "Libre Baskerville", "Crimson Text", Georgia, serif',

      // Elegant display for headlines and titles
      display: '"Cormorant Garamond", "Cinzel", "Playfair Display", "Crimson Text", serif',

      // Traditional sans for modern contrast
      sans: '"Source Sans Pro", "Lato", "Inter", -apple-system, sans-serif',

      // Classic monospace for annotations and code
      mono: '"Courier Prime", "IBM Plex Mono", "Inconsolata", monospace',
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
      sm: '3px',
      md: '6px',
      lg: '12px',
    },
    shadows: {
      // Soft, warm shadows reminiscent of candlelight and aged materials
      sm: '0 1px 3px rgba(43, 37, 32, 0.12), 0 1px 2px rgba(124, 45, 18, 0.06)',
      md: '0 4px 12px rgba(43, 37, 32, 0.18), 0 2px 6px rgba(92, 64, 35, 0.12), inset 0 1px 0 rgba(217, 119, 6, 0.08)',
      lg: '0 10px 30px rgba(43, 37, 32, 0.25), 0 4px 12px rgba(92, 64, 35, 0.18), inset 0 2px 0 rgba(217, 119, 6, 0.1)',
      xl: '0 20px 60px rgba(28, 23, 20, 0.35), 0 8px 24px rgba(92, 64, 35, 0.25), inset 0 3px 0 rgba(217, 119, 6, 0.12), 0 0 40px rgba(217, 119, 6, 0.15)',
    },
    borderRadius: {
      // Subtle, classic rounded corners
      sm: '2px',
      md: '4px',
      lg: '6px',
      xl: '8px',
    },
    transitions: {
      fast: 'all 0.15s cubic-bezier(0.4, 0.0, 0.2, 1)',
      normal: 'all 0.35s cubic-bezier(0.4, 0.0, 0.2, 1)',
      slow: 'all 0.6s cubic-bezier(0.4, 0.0, 0.2, 1)',
    },
  },

  materials: {
    // Rich aged walnut wood with deep grain
    wood: {
      color: '#5C4023',
      roughness: 0.7,
      metalness: 0.1,
    },

    // Aged parchment with warm cream tones
    paper: {
      color: '#EBE4D1',
      roughness: 0.8,
      metalness: 0.0,
    },

    // Antique brass hardware with warm patina
    metal: {
      color: '#B8860B',
      roughness: 0.4,
      metalness: 0.7,
    },

    // Rich leather binding with burgundy undertones
    ceramic: {
      color: '#7C2D12',
      roughness: 0.6,
      metalness: 0.2,
    },
  },

  customCSS: `
    /* Dark Academia Theme Custom Styles */

    /* Candlelight flicker animation */
    @keyframes candleFlicker {
      0%, 100% {
        opacity: 1;
        filter: brightness(1);
      }
      25% {
        opacity: 0.95;
        filter: brightness(0.98);
      }
      50% {
        opacity: 0.92;
        filter: brightness(0.96);
      }
      75% {
        opacity: 0.96;
        filter: brightness(0.99);
      }
    }

    /* Vintage page turn animation */
    @keyframes pageTurn {
      0% {
        transform: rotateY(0deg);
      }
      50% {
        transform: rotateY(-10deg);
      }
      100% {
        transform: rotateY(0deg);
      }
    }

    /* Aged paper texture background */
    .darkacademia-paper-texture {
      background-color: var(--bg-primary);
      background-image:
        radial-gradient(circle at 20% 30%, rgba(124, 45, 18, 0.03) 0%, transparent 50%),
        radial-gradient(circle at 80% 70%, rgba(92, 64, 35, 0.04) 0%, transparent 50%),
        repeating-linear-gradient(
          0deg,
          transparent,
          transparent 2px,
          rgba(43, 37, 32, 0.01) 2px,
          rgba(43, 37, 32, 0.01) 4px
        );
      position: relative;
    }

    .darkacademia-paper-texture::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-image: url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence baseFrequency='0.9' numOctaves='4' /%3E%3CfeColorMatrix values='0 0 0 0 0.12 0 0 0 0 0.09 0 0 0 0 0.06 0 0 0 0.03 0' /%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.05' /%3E%3C/svg%3E");
      opacity: 0.4;
      pointer-events: none;
    }

    /* Leather-bound book effect */
    .darkacademia-leather-binding {
      background: linear-gradient(
        135deg,
        #7C2D12 0%,
        #92400E 25%,
        #6B2810 50%,
        #7C2D12 75%,
        #5C1F0D 100%
      );
      background-size: 200% 200%;
      border: 2px solid #5C4023;
      box-shadow:
        inset 0 2px 4px rgba(0, 0, 0, 0.3),
        inset 0 -2px 4px rgba(0, 0, 0, 0.2),
        0 4px 12px rgba(43, 37, 32, 0.4);
      position: relative;
    }

    .darkacademia-leather-binding::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-image:
        repeating-linear-gradient(
          45deg,
          transparent,
          transparent 2px,
          rgba(0, 0, 0, 0.05) 2px,
          rgba(0, 0, 0, 0.05) 4px
        ),
        repeating-linear-gradient(
          -45deg,
          transparent,
          transparent 2px,
          rgba(0, 0, 0, 0.05) 2px,
          rgba(0, 0, 0, 0.05) 4px
        );
      opacity: 0.3;
      pointer-events: none;
    }

    /* Candlelight glow effect */
    .darkacademia-candlelight {
      position: relative;
      animation: candleFlicker 3s ease-in-out infinite;
    }

    .darkacademia-candlelight::before {
      content: '';
      position: absolute;
      top: -20px;
      left: -20px;
      right: -20px;
      bottom: -20px;
      background: radial-gradient(
        ellipse at center,
        rgba(217, 119, 6, 0.15) 0%,
        rgba(245, 158, 11, 0.1) 30%,
        rgba(251, 191, 36, 0.05) 50%,
        transparent 70%
      );
      filter: blur(15px);
      pointer-events: none;
      z-index: -1;
    }

    /* Vintage manuscript border */
    .darkacademia-manuscript-border {
      border: 1px solid var(--border);
      box-shadow:
        0 0 0 3px var(--bg-primary),
        0 0 0 4px var(--border-subtle),
        0 4px 12px rgba(43, 37, 32, 0.2);
      position: relative;
      padding: 24px;
    }

    .darkacademia-manuscript-border::before,
    .darkacademia-manuscript-border::after {
      content: '';
      position: absolute;
      width: 12px;
      height: 12px;
      border: 2px solid var(--border);
    }

    .darkacademia-manuscript-border::before {
      top: 8px;
      left: 8px;
      border-right: none;
      border-bottom: none;
    }

    .darkacademia-manuscript-border::after {
      bottom: 8px;
      right: 8px;
      border-left: none;
      border-top: none;
    }

    /* Wood panel texture */
    .darkacademia-wood-panel {
      background: linear-gradient(
        90deg,
        #5C4023 0%,
        #6B4A28 20%,
        #5C4023 40%,
        #4D3520 60%,
        #5C4023 80%,
        #6B4A28 100%
      );
      background-size: 400px 100%;
      box-shadow:
        inset 0 2px 8px rgba(0, 0, 0, 0.3),
        inset 0 -2px 8px rgba(0, 0, 0, 0.2);
      position: relative;
    }

    .darkacademia-wood-panel::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-image:
        repeating-linear-gradient(
          90deg,
          transparent,
          transparent 40px,
          rgba(0, 0, 0, 0.1) 40px,
          rgba(0, 0, 0, 0.1) 42px
        );
      opacity: 0.5;
      pointer-events: none;
    }

    /* Ink blot accent */
    .darkacademia-ink-blot {
      position: relative;
    }

    .darkacademia-ink-blot::before {
      content: '';
      position: absolute;
      top: -4px;
      left: -4px;
      width: 8px;
      height: 8px;
      background: radial-gradient(
        circle,
        rgba(43, 37, 32, 0.3) 0%,
        rgba(43, 37, 32, 0.1) 50%,
        transparent 70%
      );
      border-radius: 50%;
      filter: blur(1px);
    }

    /* Scholarly card with aged aesthetic */
    .darkacademia-card {
      background: var(--bg-secondary);
      border: 1px solid var(--border-subtle);
      box-shadow:
        0 8px 24px rgba(43, 37, 32, 0.2),
        0 2px 8px rgba(92, 64, 35, 0.15),
        inset 0 1px 0 rgba(217, 119, 6, 0.05);
      position: relative;
      overflow: hidden;
      transition: all 0.35s cubic-bezier(0.4, 0.0, 0.2, 1);
    }

    .darkacademia-card::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background:
        radial-gradient(circle at 30% 20%, rgba(217, 119, 6, 0.03) 0%, transparent 50%),
        radial-gradient(circle at 70% 80%, rgba(124, 45, 18, 0.04) 0%, transparent 50%);
      pointer-events: none;
    }

    .darkacademia-card:hover {
      transform: translateY(-4px);
      box-shadow:
        0 16px 48px rgba(43, 37, 32, 0.25),
        0 4px 16px rgba(92, 64, 35, 0.2),
        inset 0 1px 0 rgba(217, 119, 6, 0.1);
      border-color: var(--border);
    }

    /* Vintage book spine */
    .darkacademia-book-spine {
      background: linear-gradient(
        to right,
        #5C4023 0%,
        #6B4A28 5%,
        #7C2D12 10%,
        #92400E 50%,
        #7C2D12 90%,
        #6B4A28 95%,
        #5C4023 100%
      );
      border-left: 3px solid rgba(0, 0, 0, 0.3);
      border-right: 3px solid rgba(0, 0, 0, 0.2);
      box-shadow:
        inset 0 0 20px rgba(0, 0, 0, 0.2),
        inset 3px 0 5px rgba(0, 0, 0, 0.3),
        inset -3px 0 5px rgba(0, 0, 0, 0.2);
      position: relative;
    }

    .darkacademia-book-spine::after {
      content: '';
      position: absolute;
      top: 10%;
      left: 50%;
      transform: translateX(-50%);
      width: 80%;
      height: 80%;
      border-top: 1px solid rgba(232, 184, 138, 0.3);
      border-bottom: 1px solid rgba(232, 184, 138, 0.3);
    }

    /* Scholarly text effect with ink warmth */
    .darkacademia-scholarly-text {
      color: var(--text-primary);
      text-shadow: 0 1px 2px rgba(43, 37, 32, 0.15);
      font-family: var(--font-serif);
      line-height: 1.75;
      letter-spacing: 0.01em;
    }

    /* Ornamental divider */
    .darkacademia-ornamental-divider {
      width: 100%;
      height: 1px;
      background: linear-gradient(
        90deg,
        transparent 0%,
        var(--border-subtle) 20%,
        var(--border) 40%,
        var(--border-accent) 50%,
        var(--border) 60%,
        var(--border-subtle) 80%,
        transparent 100%
      );
      position: relative;
      margin: 32px 0;
    }

    .darkacademia-ornamental-divider::after {
      content: '❦';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: var(--text-accent);
      font-size: 18px;
      background: var(--bg-primary);
      padding: 0 16px;
    }

    /* Library shelf effect */
    .darkacademia-shelf {
      background: linear-gradient(
        to bottom,
        #6B4A28 0%,
        #5C4023 50%,
        #4D3520 100%
      );
      border-top: 2px solid rgba(184, 134, 11, 0.3);
      border-bottom: 4px solid rgba(0, 0, 0, 0.4);
      box-shadow:
        0 4px 0 rgba(0, 0, 0, 0.2),
        0 8px 12px rgba(0, 0, 0, 0.3),
        inset 0 2px 4px rgba(255, 255, 255, 0.05);
      position: relative;
    }

    /* Brass hardware accent */
    .darkacademia-brass-accent {
      color: #B8860B;
      text-shadow:
        0 1px 0 rgba(184, 134, 11, 0.5),
        0 2px 4px rgba(184, 134, 11, 0.3);
      font-weight: 600;
    }

    /* Wax seal effect */
    .darkacademia-wax-seal {
      width: 40px;
      height: 40px;
      background: radial-gradient(
        circle,
        #92400E 0%,
        #7C2D12 50%,
        #5C1F0D 100%
      );
      border-radius: 50%;
      box-shadow:
        inset 0 2px 4px rgba(0, 0, 0, 0.4),
        0 4px 8px rgba(124, 45, 18, 0.5);
      position: relative;
    }

    .darkacademia-wax-seal::before {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 60%;
      height: 60%;
      background: rgba(0, 0, 0, 0.2);
      border-radius: 50%;
    }

    /* Vintage button with scholarly elegance */
    .darkacademia-button {
      background: linear-gradient(135deg, #7C2D12 0%, #92400E 100%);
      border: 2px solid #5C4023;
      color: #F5F1E6;
      font-family: var(--font-serif);
      font-weight: 600;
      letter-spacing: 0.05em;
      padding: 12px 32px;
      position: relative;
      overflow: hidden;
      transition: all 0.35s cubic-bezier(0.4, 0.0, 0.2, 1);
      box-shadow:
        0 4px 12px rgba(43, 37, 32, 0.3),
        inset 0 1px 0 rgba(232, 184, 138, 0.1);
    }

    .darkacademia-button::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(
        90deg,
        transparent,
        rgba(232, 184, 138, 0.2),
        transparent
      );
      transition: left 0.6s ease;
    }

    .darkacademia-button:hover::before {
      left: 100%;
    }

    .darkacademia-button:hover {
      background: linear-gradient(135deg, #92400E 0%, #A16207 100%);
      box-shadow:
        0 8px 24px rgba(124, 45, 18, 0.4),
        inset 0 1px 0 rgba(232, 184, 138, 0.2);
      transform: translateY(-2px);
      border-color: #B8860B;
    }

    .darkacademia-button:active {
      transform: translateY(0);
      box-shadow:
        0 4px 12px rgba(43, 37, 32, 0.3),
        inset 0 2px 4px rgba(0, 0, 0, 0.2);
    }

    /* Parchment scroll effect */
    .darkacademia-parchment {
      background: linear-gradient(
        to bottom,
        #F5F1E6 0%,
        #EBE4D1 50%,
        #E0D5BB 100%
      );
      border: 1px solid #C4B5A0;
      box-shadow:
        0 4px 12px rgba(43, 37, 32, 0.15),
        inset 0 1px 0 rgba(255, 255, 255, 0.5);
      position: relative;
      padding: 24px;
    }

    .darkacademia-parchment::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-image:
        radial-gradient(circle at 15% 20%, rgba(124, 45, 18, 0.02) 0%, transparent 40%),
        radial-gradient(circle at 85% 80%, rgba(92, 64, 35, 0.03) 0%, transparent 40%);
      pointer-events: none;
    }

    /* Vintage library blur effect */
    .darkacademia-library-blur {
      backdrop-filter: blur(10px);
      background: rgba(245, 241, 230, 0.85);
      border: 1px solid rgba(154, 123, 79, 0.3);
      box-shadow:
        0 8px 32px rgba(43, 37, 32, 0.15),
        inset 0 1px 0 rgba(217, 119, 6, 0.1);
    }

    /* Dark mode adjustments */
    [data-theme="dark"] .darkacademia-library-blur {
      background: rgba(28, 23, 20, 0.85);
      border: 1px solid rgba(146, 64, 14, 0.3);
    }

    [data-theme="dark"] .darkacademia-parchment {
      background: linear-gradient(
        to bottom,
        #3A322B 0%,
        #2B2520 50%,
        #1C1714 100%
      );
      border-color: #4A3F35;
      box-shadow:
        0 4px 12px rgba(0, 0, 0, 0.4),
        inset 0 1px 0 rgba(217, 119, 6, 0.1);
    }

    /* Scholarly hover state for interactive elements */
    .darkacademia-interactive {
      position: relative;
      transition: all 0.35s cubic-bezier(0.4, 0.0, 0.2, 1);
      cursor: pointer;
    }

    .darkacademia-interactive::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 0;
      height: 2px;
      background: linear-gradient(90deg, var(--accent), var(--accent-hover));
      transition: width 0.35s cubic-bezier(0.4, 0.0, 0.2, 1);
    }

    .darkacademia-interactive:hover::after {
      width: 100%;
    }

    .darkacademia-interactive:hover {
      transform: translateY(-2px);
      color: var(--text-accent);
    }

    /* Bookshelf grid pattern */
    .darkacademia-bookshelf-pattern {
      background-image:
        repeating-linear-gradient(
          0deg,
          transparent,
          transparent 120px,
          rgba(92, 64, 35, 0.1) 120px,
          rgba(92, 64, 35, 0.1) 124px
        ),
        repeating-linear-gradient(
          90deg,
          transparent,
          transparent 80px,
          rgba(92, 64, 35, 0.05) 80px,
          rgba(92, 64, 35, 0.05) 82px
        );
    }

    /* Vintage quote block */
    .darkacademia-quote {
      border-left: 4px solid var(--accent);
      padding-left: 24px;
      font-family: var(--font-serif);
      font-style: italic;
      color: var(--text-secondary);
      position: relative;
    }

    .darkacademia-quote::before {
      content: '"';
      position: absolute;
      left: -8px;
      top: -12px;
      font-size: 48px;
      color: var(--border-subtle);
      font-family: Georgia, serif;
      line-height: 1;
      opacity: 0.5;
    }

    /* Study lamp glow */
    .darkacademia-lamp-glow {
      position: relative;
    }

    .darkacademia-lamp-glow::before {
      content: '';
      position: absolute;
      top: -40px;
      left: 50%;
      transform: translateX(-50%);
      width: 200px;
      height: 200px;
      background: radial-gradient(
        ellipse at center top,
        rgba(217, 119, 6, 0.2) 0%,
        rgba(245, 158, 11, 0.12) 30%,
        rgba(251, 191, 36, 0.06) 50%,
        transparent 70%
      );
      filter: blur(20px);
      pointer-events: none;
      animation: candleFlicker 4s ease-in-out infinite;
    }
  `,
};
