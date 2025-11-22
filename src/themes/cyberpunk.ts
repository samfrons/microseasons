/**
 * Cyberpunk Neon Theme
 * Award-worthy futuristic design with vibrant neon colors and glowing accents
 * Inspired by Blade Runner, Ghost in the Shell, and cyberpunk aesthetics
 */

import { Theme } from '@/types/theme';

export const cyberpunkTheme: Theme = {
  id: 'cyberpunk',
  name: 'Cyberpunk Neon',
  description: 'Futuristic neon aesthetic with glowing accents and high-tech design inspired by Blade Runner and cyberpunk culture',

  colors: {
    // Dark mode (primary cyberpunk experience)
    dark: {
      // Primary backgrounds - deep dark with subtle grid patterns
      bgPrimary: '#0a0a0f',
      bgSecondary: '#12121a',
      bgTertiary: '#1a1a28',

      // Text colors - bright neon text
      textPrimary: '#e0f0ff',
      textSecondary: '#00d9ff',
      textAccent: '#ff00ff',

      // Accent colors - electric cyan to magenta
      accent: '#00d9ff',
      accentHover: '#00ffea',
      accentActive: '#ff00ff',

      // Border colors - neon glow borders
      border: '#00d9ff',
      borderSubtle: '#1a4d5c',
      borderAccent: '#ff00ff',

      // Special effects - intense neon glow
      glow: 'rgba(0, 217, 255, 0.8)',
      shadow: 'rgba(255, 0, 255, 0.6)',
      overlay: 'rgba(10, 10, 15, 0.85)',

      // Calendar-specific - vibrant neon palette
      calendarPrimary: '#00d9ff',
      calendarSecondary: '#ff00ff',
      calendarAccent: '#00ff88',
    },

    // Light mode - inverted cyberpunk (neon on bright)
    light: {
      // Primary backgrounds - bright with subtle tech grid
      bgPrimary: '#f0f4ff',
      bgSecondary: '#e0e8ff',
      bgTertiary: '#d0dcf8',

      // Text colors - deep tech colors
      textPrimary: '#0a0a2e',
      textSecondary: '#0088cc',
      textAccent: '#cc00cc',

      // Accent colors - saturated tech colors
      accent: '#0088cc',
      accentHover: '#00a0e8',
      accentActive: '#cc00cc',

      // Border colors - tech blue borders
      border: '#0088cc',
      borderSubtle: '#b0c8e0',
      borderAccent: '#cc00cc',

      // Special effects - subtle glow in light mode
      glow: 'rgba(0, 136, 204, 0.4)',
      shadow: 'rgba(204, 0, 204, 0.3)',
      overlay: 'rgba(240, 244, 255, 0.85)',

      // Calendar-specific - bright tech palette
      calendarPrimary: '#0088cc',
      calendarSecondary: '#cc00cc',
      calendarAccent: '#00cc66',
    },
  },

  typography: {
    fontFamily: {
      // Futuristic, tech-inspired fonts
      sans: '"Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif',
      serif: '"Orbitron", "Exo 2", "Rajdhani", monospace',
      mono: '"JetBrains Mono", "Fira Code", "SF Mono", "Roboto Mono", "Courier New", monospace',
      display: '"Orbitron", "Exo 2", "Rajdhani", "Tomorrow", sans-serif',
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
      // Neon glow shadows with multiple color layers
      sm: '0 0 8px rgba(0, 217, 255, 0.3), 0 0 4px rgba(0, 217, 255, 0.2)',
      md: '0 0 16px rgba(0, 217, 255, 0.4), 0 0 8px rgba(255, 0, 255, 0.2), 0 4px 12px rgba(0, 0, 0, 0.5)',
      lg: '0 0 24px rgba(0, 217, 255, 0.5), 0 0 12px rgba(255, 0, 255, 0.3), 0 8px 24px rgba(0, 0, 0, 0.6)',
      xl: '0 0 40px rgba(0, 217, 255, 0.6), 0 0 20px rgba(255, 0, 255, 0.4), 0 0 10px rgba(0, 255, 136, 0.3), 0 12px 40px rgba(0, 0, 0, 0.7)',
    },
    borderRadius: {
      // Sharp, geometric borders for tech aesthetic
      sm: '2px',
      md: '4px',
      lg: '6px',
      xl: '8px',
    },
    transitions: {
      fast: '0.1s cubic-bezier(0.4, 0, 0.2, 1)',
      normal: '0.2s cubic-bezier(0.4, 0, 0.2, 1)',
      slow: '0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    },
  },

  materials: {
    // Holographic, metallic materials for 3D calendar
    wood: {
      color: '#1a1a2e',
      roughness: 0.2,
      metalness: 0.8,
    },
    paper: {
      // Holographic paper effect
      color: '#00d9ff',
      roughness: 0.3,
      metalness: 0.6,
    },
    metal: {
      // Chrome-like reflective metal
      color: '#88ccff',
      roughness: 0.1,
      metalness: 0.95,
    },
    ceramic: {
      // Glossy neon-infused ceramic
      color: '#ff00ff',
      roughness: 0.15,
      metalness: 0.7,
    },
  },

  customCSS: `
    /* Cyberpunk Neon Theme Custom Styles */

    /* Neon glow animation */
    @keyframes neon-pulse {
      0%, 100% {
        text-shadow:
          0 0 4px rgba(0, 217, 255, 0.8),
          0 0 8px rgba(0, 217, 255, 0.6),
          0 0 12px rgba(0, 217, 255, 0.4),
          0 0 16px rgba(0, 217, 255, 0.2);
        box-shadow:
          0 0 4px rgba(0, 217, 255, 0.6),
          0 0 8px rgba(0, 217, 255, 0.4),
          0 0 12px rgba(0, 217, 255, 0.2);
      }
      50% {
        text-shadow:
          0 0 8px rgba(0, 217, 255, 1),
          0 0 16px rgba(0, 217, 255, 0.8),
          0 0 24px rgba(0, 217, 255, 0.6),
          0 0 32px rgba(0, 217, 255, 0.4);
        box-shadow:
          0 0 8px rgba(0, 217, 255, 0.8),
          0 0 16px rgba(0, 217, 255, 0.6),
          0 0 24px rgba(0, 217, 255, 0.4);
      }
    }

    /* Magenta neon pulse */
    @keyframes neon-pulse-magenta {
      0%, 100% {
        text-shadow:
          0 0 4px rgba(255, 0, 255, 0.8),
          0 0 8px rgba(255, 0, 255, 0.6),
          0 0 12px rgba(255, 0, 255, 0.4);
        box-shadow:
          0 0 4px rgba(255, 0, 255, 0.6),
          0 0 8px rgba(255, 0, 255, 0.4);
      }
      50% {
        text-shadow:
          0 0 8px rgba(255, 0, 255, 1),
          0 0 16px rgba(255, 0, 255, 0.8),
          0 0 24px rgba(255, 0, 255, 0.6);
        box-shadow:
          0 0 8px rgba(255, 0, 255, 0.8),
          0 0 16px rgba(255, 0, 255, 0.6);
      }
    }

    /* Grid background pattern */
    [data-theme="cyberpunk"] body {
      background-image:
        linear-gradient(rgba(0, 217, 255, 0.03) 1px, transparent 1px),
        linear-gradient(90deg, rgba(0, 217, 255, 0.03) 1px, transparent 1px);
      background-size: 50px 50px;
      background-position: 0 0, 0 0;
    }

    /* Neon text glow effect */
    [data-theme="cyberpunk"] h1,
    [data-theme="cyberpunk"] h2,
    [data-theme="cyberpunk"] .neon-text {
      animation: neon-pulse 3s ease-in-out infinite;
    }

    /* Neon border glow for cards and containers */
    [data-theme="cyberpunk"] .card,
    [data-theme="cyberpunk"] .panel,
    [data-theme="cyberpunk"] .container {
      border: 1px solid #00d9ff;
      box-shadow:
        0 0 8px rgba(0, 217, 255, 0.4),
        0 0 16px rgba(0, 217, 255, 0.2),
        inset 0 0 8px rgba(0, 217, 255, 0.1);
      position: relative;
      overflow: hidden;
    }

    /* Holographic gradient overlay */
    [data-theme="cyberpunk"] .card::before,
    [data-theme="cyberpunk"] .panel::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(
        90deg,
        transparent,
        rgba(0, 217, 255, 0.1),
        rgba(255, 0, 255, 0.1),
        transparent
      );
      transition: left 0.5s ease;
    }

    [data-theme="cyberpunk"] .card:hover::before,
    [data-theme="cyberpunk"] .panel:hover::before {
      left: 100%;
    }

    /* Neon button styles */
    [data-theme="cyberpunk"] button,
    [data-theme="cyberpunk"] .btn {
      background: transparent;
      border: 2px solid #00d9ff;
      color: #00d9ff;
      text-transform: uppercase;
      letter-spacing: 2px;
      font-weight: 600;
      padding: 12px 32px;
      transition: all 0.3s ease;
      position: relative;
      overflow: hidden;
      box-shadow:
        0 0 8px rgba(0, 217, 255, 0.3),
        inset 0 0 8px rgba(0, 217, 255, 0.1);
    }

    [data-theme="cyberpunk"] button::before,
    [data-theme="cyberpunk"] .btn::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(
        90deg,
        transparent,
        rgba(0, 217, 255, 0.3),
        transparent
      );
      transition: left 0.3s ease;
    }

    [data-theme="cyberpunk"] button:hover,
    [data-theme="cyberpunk"] .btn:hover {
      background: rgba(0, 217, 255, 0.1);
      border-color: #00ffea;
      box-shadow:
        0 0 16px rgba(0, 217, 255, 0.5),
        0 0 24px rgba(0, 217, 255, 0.3),
        inset 0 0 12px rgba(0, 217, 255, 0.2);
      transform: translateY(-2px);
    }

    [data-theme="cyberpunk"] button:hover::before,
    [data-theme="cyberpunk"] .btn:hover::before {
      left: 100%;
    }

    [data-theme="cyberpunk"] button:active,
    [data-theme="cyberpunk"] .btn:active {
      transform: translateY(0);
      box-shadow:
        0 0 8px rgba(255, 0, 255, 0.5),
        inset 0 0 8px rgba(255, 0, 255, 0.2);
      border-color: #ff00ff;
      color: #ff00ff;
    }

    /* Cyberpunk scrollbar */
    [data-theme="cyberpunk"] ::-webkit-scrollbar {
      width: 10px;
      height: 10px;
    }

    [data-theme="cyberpunk"] ::-webkit-scrollbar-track {
      background: #12121a;
      border-left: 1px solid rgba(0, 217, 255, 0.2);
    }

    [data-theme="cyberpunk"] ::-webkit-scrollbar-thumb {
      background: linear-gradient(180deg, #00d9ff 0%, #ff00ff 100%);
      border-radius: 2px;
      box-shadow:
        0 0 8px rgba(0, 217, 255, 0.4),
        inset 0 0 4px rgba(255, 255, 255, 0.2);
    }

    [data-theme="cyberpunk"] ::-webkit-scrollbar-thumb:hover {
      background: linear-gradient(180deg, #00ffea 0%, #ff00ff 100%);
      box-shadow:
        0 0 12px rgba(0, 217, 255, 0.6),
        inset 0 0 6px rgba(255, 255, 255, 0.3);
    }

    /* Scanline effect overlay */
    [data-theme="cyberpunk"] body::after {
      content: '';
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: repeating-linear-gradient(
        0deg,
        rgba(0, 0, 0, 0.15) 0px,
        rgba(0, 0, 0, 0.15) 1px,
        transparent 1px,
        transparent 2px
      );
      pointer-events: none;
      z-index: 9999;
      opacity: 0.3;
    }

    /* Glitch effect for special elements */
    @keyframes glitch {
      0% {
        transform: translate(0);
      }
      20% {
        transform: translate(-2px, 2px);
      }
      40% {
        transform: translate(-2px, -2px);
      }
      60% {
        transform: translate(2px, 2px);
      }
      80% {
        transform: translate(2px, -2px);
      }
      100% {
        transform: translate(0);
      }
    }

    [data-theme="cyberpunk"] .glitch {
      position: relative;
      animation: glitch 0.3s ease-in-out infinite;
      animation-delay: 2s;
    }

    /* Neon link styles */
    [data-theme="cyberpunk"] a {
      color: #00d9ff;
      text-decoration: none;
      text-shadow: 0 0 4px rgba(0, 217, 255, 0.5);
      transition: all 0.2s ease;
      border-bottom: 1px solid rgba(0, 217, 255, 0.3);
    }

    [data-theme="cyberpunk"] a:hover {
      color: #00ffea;
      text-shadow:
        0 0 8px rgba(0, 217, 255, 0.8),
        0 0 16px rgba(0, 217, 255, 0.4);
      border-bottom-color: #00ffea;
    }

    /* Calendar date number neon effect */
    [data-theme="cyberpunk"] .calendar-date {
      text-shadow:
        0 0 4px rgba(0, 217, 255, 0.6),
        0 0 8px rgba(0, 217, 255, 0.4);
      font-weight: 700;
      color: #00d9ff;
    }

    [data-theme="cyberpunk"] .calendar-date:hover {
      animation: neon-pulse-magenta 0.5s ease-in-out;
    }

    /* Holographic card effect */
    [data-theme="cyberpunk"] .microseason-card {
      background: linear-gradient(
        135deg,
        rgba(0, 217, 255, 0.05) 0%,
        rgba(255, 0, 255, 0.05) 100%
      );
      border: 1px solid rgba(0, 217, 255, 0.3);
      box-shadow:
        0 0 16px rgba(0, 217, 255, 0.2),
        0 0 8px rgba(255, 0, 255, 0.1),
        inset 0 0 16px rgba(0, 217, 255, 0.05);
      backdrop-filter: blur(8px);
      transform-style: preserve-3d;
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }

    [data-theme="cyberpunk"] .microseason-card:hover {
      transform: translateY(-4px) rotateX(2deg);
      box-shadow:
        0 0 24px rgba(0, 217, 255, 0.4),
        0 0 16px rgba(255, 0, 255, 0.2),
        0 8px 32px rgba(0, 0, 0, 0.6),
        inset 0 0 24px rgba(0, 217, 255, 0.1);
      border-color: rgba(0, 255, 234, 0.5);
    }

    /* Tech grid overlay for sections */
    [data-theme="cyberpunk"] section::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-image:
        linear-gradient(rgba(0, 217, 255, 0.02) 1px, transparent 1px),
        linear-gradient(90deg, rgba(0, 217, 255, 0.02) 1px, transparent 1px);
      background-size: 25px 25px;
      pointer-events: none;
      z-index: 0;
    }

    /* Neon accent line animation */
    @keyframes neon-line-scan {
      0% {
        transform: translateY(-100%);
      }
      100% {
        transform: translateY(100vh);
      }
    }

    [data-theme="cyberpunk"] .accent-line {
      position: fixed;
      width: 100%;
      height: 2px;
      background: linear-gradient(
        90deg,
        transparent,
        rgba(0, 217, 255, 0.8),
        rgba(255, 0, 255, 0.8),
        transparent
      );
      box-shadow:
        0 0 8px rgba(0, 217, 255, 0.6),
        0 0 16px rgba(255, 0, 255, 0.4);
      animation: neon-line-scan 8s linear infinite;
      pointer-events: none;
      z-index: 10000;
    }

    /* Input field neon styling */
    [data-theme="cyberpunk"] input,
    [data-theme="cyberpunk"] textarea,
    [data-theme="cyberpunk"] select {
      background: rgba(10, 10, 15, 0.6);
      border: 1px solid rgba(0, 217, 255, 0.3);
      color: #e0f0ff;
      padding: 12px 16px;
      border-radius: 4px;
      transition: all 0.3s ease;
      box-shadow:
        inset 0 0 8px rgba(0, 217, 255, 0.1);
    }

    [data-theme="cyberpunk"] input:focus,
    [data-theme="cyberpunk"] textarea:focus,
    [data-theme="cyberpunk"] select:focus {
      outline: none;
      border-color: #00d9ff;
      box-shadow:
        0 0 12px rgba(0, 217, 255, 0.4),
        inset 0 0 12px rgba(0, 217, 255, 0.15);
    }

    /* Loading spinner cyberpunk style */
    @keyframes cyberpunk-spin {
      0% {
        transform: rotate(0deg);
        box-shadow: 0 0 8px rgba(0, 217, 255, 0.6);
      }
      50% {
        box-shadow: 0 0 16px rgba(255, 0, 255, 0.8);
      }
      100% {
        transform: rotate(360deg);
        box-shadow: 0 0 8px rgba(0, 217, 255, 0.6);
      }
    }

    [data-theme="cyberpunk"] .loading-spinner {
      border: 3px solid rgba(0, 217, 255, 0.2);
      border-top: 3px solid #00d9ff;
      border-radius: 50%;
      animation: cyberpunk-spin 1s linear infinite;
    }

    /* Tag/badge neon styling */
    [data-theme="cyberpunk"] .tag,
    [data-theme="cyberpunk"] .badge {
      background: rgba(0, 217, 255, 0.1);
      border: 1px solid rgba(0, 217, 255, 0.4);
      color: #00d9ff;
      padding: 4px 12px;
      border-radius: 4px;
      font-size: 0.85em;
      font-weight: 600;
      letter-spacing: 0.5px;
      text-transform: uppercase;
      box-shadow:
        0 0 8px rgba(0, 217, 255, 0.2),
        inset 0 0 4px rgba(0, 217, 255, 0.1);
    }

    [data-theme="cyberpunk"] .tag.accent,
    [data-theme="cyberpunk"] .badge.accent {
      background: rgba(255, 0, 255, 0.1);
      border-color: rgba(255, 0, 255, 0.4);
      color: #ff00ff;
      box-shadow:
        0 0 8px rgba(255, 0, 255, 0.2),
        inset 0 0 4px rgba(255, 0, 255, 0.1);
    }
  `,
};
