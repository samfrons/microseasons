/**
 * Neo-Memphis Theme
 * Bold geometric shapes, playful 80s/90s postmodern design aesthetic
 * Inspired by Memphis Design Group, Ettore Sottsass, and 80s graphic design
 * Features bright saturated colors, squiggly lines, zigzags, and abstract patterns
 */

import { Theme } from '@/types/theme';

export const neomemphisTheme: Theme = {
  id: 'neomemphis',
  name: 'Neo-Memphis',
  description: 'Playful postmodern design with bold geometric shapes, bright saturated colors, and energetic 80s Memphis aesthetics',

  colors: {
    // Light Mode - Bright & Bold Memphis
    light: {
      // Primary backgrounds - Bright white with colorful accents
      bgPrimary: '#ffffff',
      bgSecondary: '#fff5f0',
      bgTertiary: '#fff0f5',

      // Text colors - Bold black with playful accents
      textPrimary: '#000000',
      textSecondary: '#2a2a2a',
      textAccent: '#ff006e',

      // Accent colors - Hot pink to coral gradient
      accent: '#ff006e',
      accentHover: '#ff1a7f',
      accentActive: '#e6005e',

      // Border colors - Bold primary colors
      border: '#000000',
      borderSubtle: '#ffbe0b',
      borderAccent: '#00d9ff',

      // Special effects
      glow: 'rgba(255, 0, 110, 0.4)',
      shadow: 'rgba(0, 0, 0, 0.2)',
      overlay: 'rgba(255, 255, 255, 0.95)',

      // Calendar-specific - Vibrant Memphis palette
      calendarPrimary: '#ff006e',
      calendarSecondary: '#ffbe0b',
      calendarAccent: '#00d9ff',
    },

    // Dark Mode - Neon Memphis Night
    dark: {
      // Primary backgrounds - Deep dark with color pops
      bgPrimary: '#1a1a2e',
      bgSecondary: '#16213e',
      bgTertiary: '#0f3460',

      // Text colors - Bright white with neon accents
      textPrimary: '#ffffff',
      textSecondary: '#f0f0f0',
      textAccent: '#ff006e',

      // Accent colors - Neon pink energy
      accent: '#ff006e',
      accentHover: '#ff3388',
      accentActive: '#ff66a3',

      // Border colors - Bright neon borders
      border: '#ffbe0b',
      borderSubtle: '#00d9ff',
      borderAccent: '#ff006e',

      // Special effects
      glow: 'rgba(255, 0, 110, 0.6)',
      shadow: 'rgba(255, 190, 11, 0.3)',
      overlay: 'rgba(26, 26, 46, 0.95)',

      // Calendar-specific - Neon Memphis palette
      calendarPrimary: '#ff006e',
      calendarSecondary: '#00d9ff',
      calendarAccent: '#ffbe0b',
    },
  },

  typography: {
    fontFamily: {
      // Bold, geometric, playful fonts
      sans: '"Outfit", "Poppins", "Inter", -apple-system, BlinkMacSystemFont, sans-serif',
      serif: '"Playfair Display", "DM Serif Display", Georgia, serif',
      mono: '"Space Mono", "Fira Code", "Courier New", monospace',
      display: '"Bebas Neue", "Anton", "Archivo Black", "Impact", sans-serif',
    },
    fontWeights: {
      light: 300,
      normal: 400,
      medium: 600,
      semibold: 700,
      bold: 900,
    },
  },

  effects: {
    blur: {
      sm: '2px',
      md: '4px',
      lg: '8px',
    },
    shadows: {
      // Bold, offset Memphis-style shadows with color
      sm: '4px 4px 0px #ffbe0b',
      md: '6px 6px 0px #ff006e, 12px 12px 0px #00d9ff',
      lg: '8px 8px 0px #ffbe0b, 16px 16px 0px #ff006e, 24px 24px 0px #00d9ff',
      xl: '12px 12px 0px #ffbe0b, 24px 24px 0px #ff006e, 36px 36px 0px #00d9ff, 48px 48px 0px #8338ec',
    },
    borderRadius: {
      // Playful, varied radii - some sharp, some rounded
      sm: '12px',
      md: '20px',
      lg: '30px',
      xl: '50px',
    },
    transitions: {
      // Bouncy, energetic transitions
      fast: '0.15s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      normal: '0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      slow: '0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    },
  },

  materials: {
    // Colorful, plastic-like materials for 3D calendar
    wood: {
      // Bright yellow plastic
      color: '#ffbe0b',
      roughness: 0.3,
      metalness: 0.1,
    },
    paper: {
      // Hot pink glossy plastic
      color: '#ff006e',
      roughness: 0.2,
      metalness: 0.0,
    },
    metal: {
      // Cyan chrome-like finish
      color: '#00d9ff',
      roughness: 0.15,
      metalness: 0.9,
    },
    ceramic: {
      // Coral glossy ceramic
      color: '#fb5607',
      roughness: 0.25,
      metalness: 0.2,
    },
  },

  customCSS: `
    /* Neo-Memphis Theme Custom Styles */

    /* Memphis squiggle pattern animations */
    @keyframes memphis-float {
      0%, 100% {
        transform: translate(0, 0) rotate(0deg);
      }
      25% {
        transform: translate(10px, -10px) rotate(5deg);
      }
      50% {
        transform: translate(-5px, -20px) rotate(-5deg);
      }
      75% {
        transform: translate(-10px, -10px) rotate(3deg);
      }
    }

    @keyframes memphis-bounce {
      0%, 100% {
        transform: translateY(0) scale(1);
      }
      50% {
        transform: translateY(-20px) scale(1.05);
      }
    }

    @keyframes memphis-wiggle {
      0%, 100% {
        transform: rotate(0deg);
      }
      25% {
        transform: rotate(5deg);
      }
      75% {
        transform: rotate(-5deg);
      }
    }

    @keyframes memphis-pulse {
      0%, 100% {
        transform: scale(1);
      }
      50% {
        transform: scale(1.05);
      }
    }

    /* Memphis squiggle background pattern */
    .memphis-squiggle-bg {
      background-color: #ffffff;
      background-image:
        url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M10 10 Q 25 5, 40 10 T 70 10' stroke='%23ff006e' stroke-width='3' fill='none'/%3E%3Cpath d='M20 40 Q 35 35, 50 40 T 80 40' stroke='%2300d9ff' stroke-width='3' fill='none'/%3E%3Cpath d='M15 70 Q 30 65, 45 70 T 75 70' stroke='%23ffbe0b' stroke-width='3' fill='none'/%3E%3Ccircle cx='80' cy='20' r='8' fill='%23ff006e'/%3E%3Ccircle cx='90' cy='80' r='6' fill='%2300d9ff'/%3E%3Crect x='5' y='85' width='15' height='15' fill='%23ffbe0b' transform='rotate(45 12.5 92.5)'/%3E%3C/svg%3E");
      background-size: 200px 200px;
      background-repeat: repeat;
    }

    .dark .memphis-squiggle-bg {
      background-color: #1a1a2e;
      background-image:
        url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M10 10 Q 25 5, 40 10 T 70 10' stroke='%23ff006e' stroke-width='3' fill='none' opacity='0.6'/%3E%3Cpath d='M20 40 Q 35 35, 50 40 T 80 40' stroke='%2300d9ff' stroke-width='3' fill='none' opacity='0.6'/%3E%3Cpath d='M15 70 Q 30 65, 45 70 T 75 70' stroke='%23ffbe0b' stroke-width='3' fill='none' opacity='0.6'/%3E%3Ccircle cx='80' cy='20' r='8' fill='%23ff006e' opacity='0.5'/%3E%3Ccircle cx='90' cy='80' r='6' fill='%2300d9ff' opacity='0.5'/%3E%3Crect x='5' y='85' width='15' height='15' fill='%23ffbe0b' opacity='0.5' transform='rotate(45 12.5 92.5)'/%3E%3C/svg%3E");
    }

    /* Memphis geometric shapes overlay */
    .memphis-shapes {
      position: relative;
      overflow: hidden;
    }

    .memphis-shapes::before,
    .memphis-shapes::after {
      content: '';
      position: absolute;
      pointer-events: none;
      z-index: 0;
    }

    .memphis-shapes::before {
      top: -50px;
      right: -50px;
      width: 200px;
      height: 200px;
      background: #ff006e;
      border-radius: 50%;
      opacity: 0.15;
      animation: memphis-float 8s ease-in-out infinite;
    }

    .memphis-shapes::after {
      bottom: -30px;
      left: -30px;
      width: 150px;
      height: 150px;
      background: #00d9ff;
      clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
      opacity: 0.15;
      animation: memphis-float 10s ease-in-out infinite reverse;
    }

    /* Bold Memphis typography */
    .memphis-heading {
      font-weight: 900;
      text-transform: uppercase;
      letter-spacing: -0.02em;
      line-height: 0.9;
      background: linear-gradient(135deg, #ff006e 0%, #ffbe0b 50%, #00d9ff 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      position: relative;
      display: inline-block;
    }

    .memphis-heading::after {
      content: attr(data-text);
      position: absolute;
      left: 4px;
      top: 4px;
      z-index: -1;
      color: #ffbe0b;
      -webkit-text-fill-color: #ffbe0b;
      opacity: 0.3;
    }

    /* Memphis card style with bold borders and shadows */
    .memphis-card {
      background: linear-gradient(135deg, #ffffff 0%, #fff5f0 100%);
      border: 4px solid #000000;
      border-radius: 20px;
      padding: 2rem;
      position: relative;
      box-shadow: 8px 8px 0px #ffbe0b, 16px 16px 0px #ff006e;
      transition: transform 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55),
                  box-shadow 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
    }

    .memphis-card:hover {
      transform: translate(-4px, -4px);
      box-shadow: 12px 12px 0px #ffbe0b, 24px 24px 0px #ff006e, 36px 36px 0px #00d9ff;
    }

    .dark .memphis-card {
      background: linear-gradient(135deg, #16213e 0%, #0f3460 100%);
      border-color: #ffbe0b;
      box-shadow: 8px 8px 0px #ff006e, 16px 16px 0px #00d9ff;
    }

    .dark .memphis-card:hover {
      box-shadow: 12px 12px 0px #ff006e, 24px 24px 0px #00d9ff, 36px 36px 0px #ffbe0b;
    }

    /* Playful Memphis button */
    .memphis-button {
      background: linear-gradient(135deg, #ff006e 0%, #fb5607 100%);
      color: #ffffff;
      border: 4px solid #000000;
      border-radius: 50px;
      padding: 1rem 2.5rem;
      font-weight: 900;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      box-shadow: 6px 6px 0px #ffbe0b;
      transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
      position: relative;
      overflow: hidden;
      cursor: pointer;
    }

    .memphis-button::before {
      content: '';
      position: absolute;
      top: -50%;
      left: -50%;
      width: 200%;
      height: 200%;
      background: radial-gradient(circle, rgba(255, 255, 255, 0.3) 0%, transparent 70%);
      transform: scale(0);
      transition: transform 0.5s ease;
    }

    .memphis-button:hover {
      transform: translate(-3px, -3px) scale(1.05);
      box-shadow: 9px 9px 0px #ffbe0b, 18px 18px 0px #00d9ff;
    }

    .memphis-button:hover::before {
      transform: scale(1);
    }

    .memphis-button:active {
      transform: translate(2px, 2px);
      box-shadow: 2px 2px 0px #ffbe0b;
    }

    .dark .memphis-button {
      border-color: #ffbe0b;
      box-shadow: 6px 6px 0px #00d9ff;
    }

    .dark .memphis-button:hover {
      box-shadow: 9px 9px 0px #00d9ff, 18px 18px 0px #ffbe0b;
    }

    /* Memphis zigzag border */
    .memphis-zigzag {
      position: relative;
      padding: 2rem;
    }

    .memphis-zigzag::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 10px;
      background: linear-gradient(135deg, #ff006e 25%, transparent 25%),
                  linear-gradient(225deg, #ff006e 25%, transparent 25%),
                  linear-gradient(315deg, #ffbe0b 25%, transparent 25%),
                  linear-gradient(45deg, #ffbe0b 25%, transparent 25%);
      background-size: 20px 20px;
      background-position: 0 0, 10px 0, 10px 0, 0 0;
    }

    .memphis-zigzag::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 10px;
      background: linear-gradient(135deg, #00d9ff 25%, transparent 25%),
                  linear-gradient(225deg, #00d9ff 25%, transparent 25%),
                  linear-gradient(315deg, #8338ec 25%, transparent 25%),
                  linear-gradient(45deg, #8338ec 25%, transparent 25%);
      background-size: 20px 20px;
      background-position: 0 0, 10px 0, 10px 0, 0 0;
    }

    /* Memphis geometric badge */
    .memphis-badge {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      background: #ff006e;
      color: #ffffff;
      border: 3px solid #000000;
      border-radius: 50%;
      width: 60px;
      height: 60px;
      font-weight: 900;
      font-size: 1.2rem;
      box-shadow: 4px 4px 0px #ffbe0b, 8px 8px 0px #00d9ff;
      animation: memphis-bounce 2s ease-in-out infinite;
    }

    .dark .memphis-badge {
      border-color: #ffbe0b;
    }

    /* Memphis dotted pattern */
    .memphis-dots {
      background-image: radial-gradient(circle, #ff006e 2px, transparent 2px),
                        radial-gradient(circle, #00d9ff 2px, transparent 2px),
                        radial-gradient(circle, #ffbe0b 2px, transparent 2px);
      background-size: 40px 40px, 50px 50px, 60px 60px;
      background-position: 0 0, 20px 20px, 40px 40px;
      opacity: 0.2;
    }

    /* Memphis striped pattern */
    .memphis-stripes {
      background: repeating-linear-gradient(
        45deg,
        transparent,
        transparent 10px,
        rgba(255, 0, 110, 0.1) 10px,
        rgba(255, 0, 110, 0.1) 20px,
        transparent 20px,
        transparent 30px,
        rgba(0, 217, 255, 0.1) 30px,
        rgba(0, 217, 255, 0.1) 40px
      );
    }

    /* Memphis accent divider */
    .memphis-divider {
      height: 8px;
      background: linear-gradient(90deg,
        #ff006e 0%, #ff006e 25%,
        #ffbe0b 25%, #ffbe0b 50%,
        #00d9ff 50%, #00d9ff 75%,
        #8338ec 75%, #8338ec 100%
      );
      border-radius: 4px;
      margin: 2rem 0;
      position: relative;
    }

    .memphis-divider::before {
      content: '';
      position: absolute;
      top: -4px;
      left: 20%;
      width: 20px;
      height: 20px;
      background: #ff006e;
      border-radius: 50%;
      border: 3px solid #000000;
    }

    .memphis-divider::after {
      content: '';
      position: absolute;
      top: -4px;
      right: 20%;
      width: 20px;
      height: 20px;
      background: #00d9ff;
      transform: rotate(45deg);
      border: 3px solid #000000;
    }

    .dark .memphis-divider::before,
    .dark .memphis-divider::after {
      border-color: #ffbe0b;
    }

    /* Memphis playful link hover */
    .memphis-link {
      color: #ff006e;
      text-decoration: none;
      font-weight: 700;
      position: relative;
      transition: color 0.3s ease;
    }

    .memphis-link::after {
      content: '';
      position: absolute;
      bottom: -2px;
      left: 0;
      width: 100%;
      height: 3px;
      background: linear-gradient(90deg, #ff006e 0%, #ffbe0b 50%, #00d9ff 100%);
      transform: scaleX(0);
      transform-origin: right;
      transition: transform 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
    }

    .memphis-link:hover::after {
      transform: scaleX(1);
      transform-origin: left;
    }

    .memphis-link:hover {
      color: #00d9ff;
    }

    /* Memphis floating shapes decoration */
    .memphis-float-shapes {
      position: fixed;
      pointer-events: none;
      z-index: -1;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      overflow: hidden;
    }

    .memphis-shape {
      position: absolute;
      opacity: 0.1;
    }

    .memphis-shape-1 {
      top: 10%;
      left: 10%;
      width: 100px;
      height: 100px;
      background: #ff006e;
      border-radius: 50%;
      animation: memphis-float 10s ease-in-out infinite;
    }

    .memphis-shape-2 {
      top: 20%;
      right: 15%;
      width: 80px;
      height: 80px;
      background: #ffbe0b;
      clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
      animation: memphis-float 8s ease-in-out infinite reverse;
    }

    .memphis-shape-3 {
      bottom: 20%;
      left: 20%;
      width: 90px;
      height: 90px;
      background: #00d9ff;
      transform: rotate(45deg);
      animation: memphis-wiggle 4s ease-in-out infinite;
    }

    .memphis-shape-4 {
      bottom: 30%;
      right: 25%;
      width: 70px;
      height: 70px;
      background: #8338ec;
      clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
      animation: memphis-pulse 3s ease-in-out infinite;
    }

    /* Memphis text highlight */
    .memphis-highlight {
      background: linear-gradient(120deg, #ffbe0b 0%, #ffbe0b 100%);
      background-repeat: no-repeat;
      background-size: 100% 40%;
      background-position: 0 80%;
      padding: 0 0.2em;
      transition: background-size 0.3s ease;
    }

    .memphis-highlight:hover {
      background-size: 100% 100%;
    }

    .dark .memphis-highlight {
      background: linear-gradient(120deg, rgba(255, 190, 11, 0.4) 0%, rgba(255, 190, 11, 0.4) 100%);
      background-repeat: no-repeat;
      background-size: 100% 40%;
      background-position: 0 80%;
    }

    /* Memphis calendar date style */
    .memphis-calendar-date {
      font-weight: 900;
      font-size: 2rem;
      color: #ff006e;
      text-shadow: 3px 3px 0px #ffbe0b, 6px 6px 0px #00d9ff;
      transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
    }

    .memphis-calendar-date:hover {
      transform: scale(1.1) rotate(-5deg);
      text-shadow: 4px 4px 0px #ffbe0b, 8px 8px 0px #00d9ff, 12px 12px 0px #8338ec;
    }

    /* Memphis focus state */
    .memphis-focus:focus-visible {
      outline: 4px solid #ff006e;
      outline-offset: 4px;
      border-radius: 8px;
    }

    /* Memphis gradient text */
    .memphis-gradient-text {
      background: linear-gradient(135deg, #ff006e 0%, #ffbe0b 25%, #00d9ff 50%, #8338ec 75%, #ff006e 100%);
      background-size: 200% 200%;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      animation: memphis-gradient-shift 5s ease infinite;
    }

    @keyframes memphis-gradient-shift {
      0%, 100% {
        background-position: 0% 50%;
      }
      50% {
        background-position: 100% 50%;
      }
    }

    /* Memphis bordered section */
    .memphis-section {
      border: 5px solid #000000;
      border-radius: 30px;
      padding: 3rem;
      position: relative;
      background: #ffffff;
      box-shadow: 10px 10px 0px #ffbe0b;
    }

    .dark .memphis-section {
      background: #16213e;
      border-color: #ffbe0b;
      box-shadow: 10px 10px 0px #ff006e;
    }

    /* Memphis corner decorations */
    .memphis-corners {
      position: relative;
    }

    .memphis-corners::before {
      content: '';
      position: absolute;
      top: -10px;
      left: -10px;
      width: 30px;
      height: 30px;
      background: #ff006e;
      border-radius: 50%;
      border: 3px solid #000000;
    }

    .memphis-corners::after {
      content: '';
      position: absolute;
      bottom: -10px;
      right: -10px;
      width: 30px;
      height: 30px;
      background: #00d9ff;
      transform: rotate(45deg);
      border: 3px solid #000000;
    }

    .dark .memphis-corners::before,
    .dark .memphis-corners::after {
      border-color: #ffbe0b;
    }

    /* Memphis tag/label style */
    .memphis-tag {
      display: inline-block;
      background: #ff006e;
      color: #ffffff;
      padding: 0.5rem 1.5rem;
      border: 3px solid #000000;
      border-radius: 20px;
      font-weight: 900;
      text-transform: uppercase;
      font-size: 0.85rem;
      letter-spacing: 0.05em;
      box-shadow: 4px 4px 0px #ffbe0b;
      transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
    }

    .memphis-tag:hover {
      transform: translate(-2px, -2px) rotate(-3deg);
      box-shadow: 6px 6px 0px #ffbe0b, 12px 12px 0px #00d9ff;
    }

    .dark .memphis-tag {
      border-color: #ffbe0b;
      box-shadow: 4px 4px 0px #00d9ff;
    }

    .dark .memphis-tag:hover {
      box-shadow: 6px 6px 0px #00d9ff, 12px 12px 0px #ffbe0b;
    }

    /* Memphis hero section */
    .memphis-hero {
      font-size: clamp(3rem, 10vw, 8rem);
      font-weight: 900;
      line-height: 0.9;
      letter-spacing: -0.03em;
      text-transform: uppercase;
      background: linear-gradient(135deg, #ff006e 0%, #ffbe0b 30%, #00d9ff 60%, #8338ec 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      position: relative;
      animation: memphis-bounce 3s ease-in-out infinite;
    }

    /* Memphis input field */
    .memphis-input {
      background: #ffffff;
      border: 4px solid #000000;
      border-radius: 15px;
      padding: 1rem 1.5rem;
      font-weight: 600;
      color: #000000;
      transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
      box-shadow: 4px 4px 0px #ffbe0b;
    }

    .memphis-input:focus {
      outline: none;
      border-color: #ff006e;
      box-shadow: 4px 4px 0px #ffbe0b, 8px 8px 0px #00d9ff;
      transform: translate(-2px, -2px);
    }

    .dark .memphis-input {
      background: #16213e;
      color: #ffffff;
      border-color: #ffbe0b;
      box-shadow: 4px 4px 0px #ff006e;
    }

    .dark .memphis-input:focus {
      border-color: #00d9ff;
      box-shadow: 4px 4px 0px #ff006e, 8px 8px 0px #ffbe0b;
    }

    /* Memphis tooltip */
    .memphis-tooltip {
      position: relative;
      display: inline-block;
    }

    .memphis-tooltip::after {
      content: attr(data-tooltip);
      position: absolute;
      bottom: 100%;
      left: 50%;
      transform: translateX(-50%) translateY(-10px);
      background: #000000;
      color: #ffffff;
      padding: 0.5rem 1rem;
      border-radius: 10px;
      font-size: 0.85rem;
      font-weight: 700;
      white-space: nowrap;
      opacity: 0;
      pointer-events: none;
      transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
      border: 3px solid #ffbe0b;
      box-shadow: 4px 4px 0px #ff006e;
    }

    .memphis-tooltip:hover::after {
      opacity: 1;
      transform: translateX(-50%) translateY(-5px);
    }

    .dark .memphis-tooltip::after {
      background: #ffffff;
      color: #000000;
      border-color: #00d9ff;
      box-shadow: 4px 4px 0px #ffbe0b;
    }
  `,
};
