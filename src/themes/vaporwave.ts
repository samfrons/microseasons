/**
 * Vaporwave Theme
 * Award-worthy digital nostalgia aesthetic with pastel gradients and retro vibes
 * Inspired by 80s/90s aesthetics, early internet, Windows 95, Japanese retro graphics, and mallsoft
 */

import { Theme } from '@/types/theme';

export const vaporwaveTheme: Theme = {
  id: 'vaporwave',
  name: 'Vaporwave Dreams',
  description: 'Digital nostalgia with pastel gradients, VHS aesthetics, and dreamy retro vibes inspired by 80s/90s internet culture',

  colors: {
    // Dark mode (primary vaporwave experience)
    dark: {
      // Primary backgrounds - deep purple with gradient overlays
      bgPrimary: '#1a0b2e',
      bgSecondary: '#2d1b4e',
      bgTertiary: '#3d2b5e',

      // Text colors - soft pastels
      textPrimary: '#f8e7ff',
      textSecondary: '#b794f6',
      textAccent: '#ff6ec7',

      // Accent colors - pastel pink to cyan gradient
      accent: '#ff6ec7',
      accentHover: '#ff9edf',
      accentActive: '#00ffff',

      // Border colors - soft pastel borders
      border: '#b794f6',
      borderSubtle: '#4a3768',
      borderAccent: '#ff6ec7',

      // Special effects - dreamy soft glow
      glow: 'rgba(255, 110, 199, 0.6)',
      shadow: 'rgba(183, 148, 246, 0.5)',
      overlay: 'rgba(26, 11, 46, 0.88)',

      // Calendar-specific - pastel rainbow
      calendarPrimary: '#ff6ec7',
      calendarSecondary: '#00ffff',
      calendarAccent: '#b794f6',
    },

    // Light mode - soft pastel gradient aesthetic
    light: {
      // Primary backgrounds - soft pastel with gradient vibes
      bgPrimary: '#fff0f9',
      bgSecondary: '#ffe6f7',
      bgTertiary: '#ffd6f0',

      // Text colors - deep but soft purples
      textPrimary: '#2d1b4e',
      textSecondary: '#7c3aed',
      textAccent: '#d946a6',

      // Accent colors - vibrant pastels
      accent: '#d946a6',
      accentHover: '#e879c5',
      accentActive: '#00d4d4',

      // Border colors - soft pink borders
      border: '#e879c5',
      borderSubtle: '#ffc4e8',
      borderAccent: '#d946a6',

      // Special effects - subtle dreamy glow
      glow: 'rgba(217, 70, 166, 0.4)',
      shadow: 'rgba(124, 58, 237, 0.3)',
      overlay: 'rgba(255, 240, 249, 0.88)',

      // Calendar-specific - soft pastel palette
      calendarPrimary: '#d946a6',
      calendarSecondary: '#00d4d4',
      calendarAccent: '#a78bfa',
    },
  },

  typography: {
    fontFamily: {
      // Retro computer fonts with Windows 95 vibes
      sans: '"Comic Sans MS", "MS Sans Serif", "Segoe UI", -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
      serif: '"Georgia", "Times New Roman", serif',
      mono: '"Courier New", "Consolas", "Monaco", monospace',
      display: '"Impact", "Arial Black", "Helvetica", sans-serif',
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
      sm: '8px',
      md: '16px',
      lg: '24px',
    },
    shadows: {
      // Soft dreamy glow shadows with pastel colors
      sm: '0 2px 8px rgba(255, 110, 199, 0.2), 0 1px 4px rgba(183, 148, 246, 0.15)',
      md: '0 4px 16px rgba(255, 110, 199, 0.3), 0 2px 8px rgba(0, 255, 255, 0.2), 0 8px 24px rgba(183, 148, 246, 0.15)',
      lg: '0 8px 32px rgba(255, 110, 199, 0.4), 0 4px 16px rgba(0, 255, 255, 0.25), 0 16px 48px rgba(183, 148, 246, 0.2)',
      xl: '0 16px 64px rgba(255, 110, 199, 0.5), 0 8px 32px rgba(0, 255, 255, 0.3), 0 4px 16px rgba(183, 148, 246, 0.25), 0 24px 72px rgba(168, 85, 247, 0.2)',
    },
    borderRadius: {
      // Soft rounded corners for retro aesthetic
      sm: '4px',
      md: '8px',
      lg: '12px',
      xl: '16px',
    },
    transitions: {
      fast: '0.15s cubic-bezier(0.4, 0, 0.6, 1)',
      normal: '0.3s cubic-bezier(0.4, 0, 0.6, 1)',
      slow: '0.6s cubic-bezier(0.4, 0, 0.6, 1)',
    },
  },

  materials: {
    // Holographic, iridescent pastel materials for 3D calendar
    wood: {
      // Pastel pink plastic (retro toy aesthetic)
      color: '#ff9edf',
      roughness: 0.3,
      metalness: 0.4,
    },
    paper: {
      // Holographic iridescent paper
      color: '#b794f6',
      roughness: 0.2,
      metalness: 0.7,
    },
    metal: {
      // Chrome-like reflective surface with pastel tint
      color: '#00ffff',
      roughness: 0.1,
      metalness: 0.9,
    },
    ceramic: {
      // Glossy pastel ceramic
      color: '#ff6ec7',
      roughness: 0.15,
      metalness: 0.5,
    },
  },

  customCSS: `
    /* Vaporwave Theme Custom Styles */

    /* Dreamy gradient background animation */
    @keyframes vaporwave-gradient {
      0% {
        background-position: 0% 50%;
      }
      50% {
        background-position: 100% 50%;
      }
      100% {
        background-position: 0% 50%;
      }
    }

    /* VHS glitch animation */
    @keyframes vhs-glitch {
      0% {
        transform: translate(0);
        filter: hue-rotate(0deg);
      }
      10% {
        transform: translate(-2px, 1px);
      }
      20% {
        transform: translate(2px, -1px);
      }
      30% {
        transform: translate(-1px, 2px);
      }
      40% {
        transform: translate(1px, -2px);
      }
      50% {
        transform: translate(0);
        filter: hue-rotate(10deg);
      }
      60% {
        transform: translate(-1px, 1px);
      }
      70% {
        transform: translate(1px, -1px);
      }
      80% {
        transform: translate(-2px, 2px);
      }
      90% {
        transform: translate(2px, -2px);
      }
      100% {
        transform: translate(0);
        filter: hue-rotate(0deg);
      }
    }

    /* Soft glow pulse animation */
    @keyframes vaporwave-glow {
      0%, 100% {
        text-shadow:
          0 0 8px rgba(255, 110, 199, 0.6),
          0 0 16px rgba(183, 148, 246, 0.4),
          0 0 24px rgba(0, 255, 255, 0.3);
        box-shadow:
          0 0 16px rgba(255, 110, 199, 0.4),
          0 0 32px rgba(183, 148, 246, 0.3),
          0 0 48px rgba(0, 255, 255, 0.2);
      }
      50% {
        text-shadow:
          0 0 16px rgba(255, 110, 199, 0.8),
          0 0 32px rgba(183, 148, 246, 0.6),
          0 0 48px rgba(0, 255, 255, 0.4);
        box-shadow:
          0 0 24px rgba(255, 110, 199, 0.6),
          0 0 48px rgba(183, 148, 246, 0.4),
          0 0 64px rgba(0, 255, 255, 0.3);
      }
    }

    /* Floating animation for dreamy effect */
    @keyframes vaporwave-float {
      0%, 100% {
        transform: translateY(0px);
      }
      50% {
        transform: translateY(-10px);
      }
    }

    /* Chromatic aberration effect */
    @keyframes chromatic-aberration {
      0% {
        text-shadow:
          -2px 0 0 rgba(255, 0, 255, 0.5),
          2px 0 0 rgba(0, 255, 255, 0.5);
      }
      50% {
        text-shadow:
          -3px 0 0 rgba(255, 0, 255, 0.6),
          3px 0 0 rgba(0, 255, 255, 0.6);
      }
      100% {
        text-shadow:
          -2px 0 0 rgba(255, 0, 255, 0.5),
          2px 0 0 rgba(0, 255, 255, 0.5);
      }
    }

    /* Main body gradient background */
    [data-theme="vaporwave"] body {
      background: linear-gradient(
        135deg,
        #1a0b2e 0%,
        #2d1b4e 25%,
        #3d2b5e 50%,
        #2d1b4e 75%,
        #1a0b2e 100%
      );
      background-size: 400% 400%;
      animation: vaporwave-gradient 15s ease infinite;
    }

    [data-theme="vaporwave"][data-color-mode="light"] body {
      background: linear-gradient(
        135deg,
        #fff0f9 0%,
        #ffe6f7 25%,
        #ffd6f0 50%,
        #ffe6f7 75%,
        #fff0f9 100%
      );
      background-size: 400% 400%;
      animation: vaporwave-gradient 15s ease infinite;
    }

    /* VHS scan lines overlay */
    [data-theme="vaporwave"] body::before {
      content: '';
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: repeating-linear-gradient(
        0deg,
        rgba(0, 0, 0, 0.1) 0px,
        rgba(0, 0, 0, 0.1) 1px,
        transparent 1px,
        transparent 3px
      );
      pointer-events: none;
      z-index: 9998;
      opacity: 0.4;
      animation: vhs-scanline 8s linear infinite;
    }

    @keyframes vhs-scanline {
      0% {
        transform: translateY(0);
      }
      100% {
        transform: translateY(10px);
      }
    }

    /* Grid pattern overlay (retro computer aesthetic) */
    [data-theme="vaporwave"] body::after {
      content: '';
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-image:
        linear-gradient(rgba(255, 110, 199, 0.03) 1px, transparent 1px),
        linear-gradient(90deg, rgba(183, 148, 246, 0.03) 1px, transparent 1px);
      background-size: 80px 80px;
      pointer-events: none;
      z-index: 0;
    }

    /* Dreamy heading styles with soft glow */
    [data-theme="vaporwave"] h1,
    [data-theme="vaporwave"] h2,
    [data-theme="vaporwave"] .vaporwave-text {
      background: linear-gradient(
        135deg,
        #ff6ec7 0%,
        #b794f6 50%,
        #00ffff 100%
      );
      background-size: 200% 200%;
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
      animation: vaporwave-gradient 8s ease infinite, vaporwave-glow 4s ease-in-out infinite;
      filter: drop-shadow(0 0 8px rgba(255, 110, 199, 0.4));
    }

    /* Pastel card styles with holographic effect */
    [data-theme="vaporwave"] .card,
    [data-theme="vaporwave"] .panel,
    [data-theme="vaporwave"] .container {
      background: linear-gradient(
        135deg,
        rgba(255, 110, 199, 0.08) 0%,
        rgba(183, 148, 246, 0.08) 50%,
        rgba(0, 255, 255, 0.08) 100%
      );
      border: 2px solid rgba(255, 110, 199, 0.3);
      backdrop-filter: blur(16px);
      box-shadow:
        0 8px 32px rgba(255, 110, 199, 0.2),
        0 4px 16px rgba(183, 148, 246, 0.15),
        inset 0 0 32px rgba(255, 110, 199, 0.05);
      position: relative;
      overflow: hidden;
      transition: all 0.4s cubic-bezier(0.4, 0, 0.6, 1);
    }

    /* Holographic shimmer effect */
    [data-theme="vaporwave"] .card::before,
    [data-theme="vaporwave"] .panel::before {
      content: '';
      position: absolute;
      top: -50%;
      left: -50%;
      width: 200%;
      height: 200%;
      background: linear-gradient(
        45deg,
        transparent 30%,
        rgba(255, 110, 199, 0.1) 40%,
        rgba(0, 255, 255, 0.1) 50%,
        rgba(183, 148, 246, 0.1) 60%,
        transparent 70%
      );
      animation: holographic-shimmer 6s linear infinite;
      pointer-events: none;
    }

    @keyframes holographic-shimmer {
      0% {
        transform: rotate(0deg) translate(-50%, -50%);
      }
      100% {
        transform: rotate(360deg) translate(-50%, -50%);
      }
    }

    [data-theme="vaporwave"] .card:hover,
    [data-theme="vaporwave"] .panel:hover {
      transform: translateY(-8px);
      box-shadow:
        0 16px 48px rgba(255, 110, 199, 0.3),
        0 8px 24px rgba(183, 148, 246, 0.25),
        0 4px 12px rgba(0, 255, 255, 0.2),
        inset 0 0 48px rgba(255, 110, 199, 0.08);
      border-color: rgba(255, 110, 199, 0.5);
    }

    /* Retro Windows 95 button style */
    [data-theme="vaporwave"] button,
    [data-theme="vaporwave"] .btn {
      background: linear-gradient(
        180deg,
        rgba(255, 110, 199, 0.2) 0%,
        rgba(183, 148, 246, 0.15) 100%
      );
      border: 2px solid #ff6ec7;
      color: #ff6ec7;
      text-transform: uppercase;
      letter-spacing: 2px;
      font-weight: 600;
      padding: 12px 32px;
      transition: all 0.3s ease;
      position: relative;
      overflow: hidden;
      box-shadow:
        0 4px 16px rgba(255, 110, 199, 0.3),
        inset 0 0 16px rgba(255, 110, 199, 0.1);
      backdrop-filter: blur(8px);
    }

    [data-theme="vaporwave"] button::before,
    [data-theme="vaporwave"] .btn::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(
        90deg,
        transparent,
        rgba(255, 110, 199, 0.3),
        rgba(0, 255, 255, 0.2),
        transparent
      );
      transition: left 0.5s ease;
    }

    [data-theme="vaporwave"] button:hover,
    [data-theme="vaporwave"] .btn:hover {
      background: linear-gradient(
        180deg,
        rgba(255, 110, 199, 0.3) 0%,
        rgba(183, 148, 246, 0.25) 100%
      );
      border-color: #ff9edf;
      box-shadow:
        0 8px 32px rgba(255, 110, 199, 0.5),
        0 4px 16px rgba(0, 255, 255, 0.3),
        inset 0 0 24px rgba(255, 110, 199, 0.15);
      transform: translateY(-2px);
      animation: vaporwave-float 2s ease-in-out infinite;
    }

    [data-theme="vaporwave"] button:hover::before,
    [data-theme="vaporwave"] .btn:hover::before {
      left: 100%;
    }

    [data-theme="vaporwave"] button:active,
    [data-theme="vaporwave"] .btn:active {
      transform: translateY(0);
      box-shadow:
        0 4px 16px rgba(183, 148, 246, 0.4),
        inset 0 0 16px rgba(183, 148, 246, 0.2);
      border-color: #b794f6;
    }

    /* Vaporwave gradient scrollbar */
    [data-theme="vaporwave"] ::-webkit-scrollbar {
      width: 12px;
      height: 12px;
    }

    [data-theme="vaporwave"] ::-webkit-scrollbar-track {
      background: rgba(26, 11, 46, 0.6);
      border-left: 1px solid rgba(255, 110, 199, 0.2);
    }

    [data-theme="vaporwave"] ::-webkit-scrollbar-thumb {
      background: linear-gradient(
        180deg,
        #ff6ec7 0%,
        #b794f6 50%,
        #00ffff 100%
      );
      border-radius: 6px;
      box-shadow:
        0 0 8px rgba(255, 110, 199, 0.4),
        inset 0 0 4px rgba(255, 255, 255, 0.2);
    }

    [data-theme="vaporwave"] ::-webkit-scrollbar-thumb:hover {
      background: linear-gradient(
        180deg,
        #ff9edf 0%,
        #c4a7f7 50%,
        #00ffff 100%
      );
      box-shadow:
        0 0 16px rgba(255, 110, 199, 0.6),
        0 0 8px rgba(0, 255, 255, 0.4),
        inset 0 0 6px rgba(255, 255, 255, 0.3);
    }

    /* Dreamy link styles */
    [data-theme="vaporwave"] a {
      color: #ff6ec7;
      text-decoration: none;
      text-shadow: 0 0 8px rgba(255, 110, 199, 0.5);
      transition: all 0.3s ease;
      border-bottom: 1px solid rgba(255, 110, 199, 0.3);
      position: relative;
    }

    [data-theme="vaporwave"] a:hover {
      color: #00ffff;
      text-shadow:
        0 0 16px rgba(0, 255, 255, 0.8),
        0 0 8px rgba(255, 110, 199, 0.4);
      border-bottom-color: #00ffff;
    }

    /* Calendar date with dreamy glow */
    [data-theme="vaporwave"] .calendar-date {
      background: linear-gradient(
        135deg,
        #ff6ec7 0%,
        #b794f6 100%
      );
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
      font-weight: 700;
      filter: drop-shadow(0 0 4px rgba(255, 110, 199, 0.5));
      transition: all 0.3s ease;
    }

    [data-theme="vaporwave"] .calendar-date:hover {
      filter: drop-shadow(0 0 12px rgba(255, 110, 199, 0.8));
      animation: vaporwave-float 1s ease-in-out infinite;
    }

    /* Microseason card with holographic effect */
    [data-theme="vaporwave"] .microseason-card {
      background: linear-gradient(
        135deg,
        rgba(255, 110, 199, 0.1) 0%,
        rgba(183, 148, 246, 0.08) 50%,
        rgba(0, 255, 255, 0.06) 100%
      );
      border: 2px solid rgba(255, 110, 199, 0.25);
      box-shadow:
        0 8px 32px rgba(255, 110, 199, 0.2),
        0 4px 16px rgba(183, 148, 246, 0.15),
        inset 0 0 32px rgba(255, 110, 199, 0.05);
      backdrop-filter: blur(16px);
      transform-style: preserve-3d;
      transition: transform 0.4s ease, box-shadow 0.4s ease;
      position: relative;
      overflow: hidden;
    }

    [data-theme="vaporwave"] .microseason-card::after {
      content: '';
      position: absolute;
      top: -50%;
      right: -50%;
      width: 200%;
      height: 200%;
      background: radial-gradient(
        circle,
        rgba(0, 255, 255, 0.1) 0%,
        transparent 50%
      );
      animation: vaporwave-pulse 4s ease-in-out infinite;
      pointer-events: none;
    }

    @keyframes vaporwave-pulse {
      0%, 100% {
        opacity: 0.3;
        transform: scale(1);
      }
      50% {
        opacity: 0.6;
        transform: scale(1.1);
      }
    }

    [data-theme="vaporwave"] .microseason-card:hover {
      transform: translateY(-8px) rotateX(2deg) rotateY(2deg);
      box-shadow:
        0 16px 48px rgba(255, 110, 199, 0.35),
        0 8px 24px rgba(183, 148, 246, 0.25),
        0 4px 12px rgba(0, 255, 255, 0.2),
        inset 0 0 48px rgba(255, 110, 199, 0.1);
      border-color: rgba(0, 255, 255, 0.4);
    }

    /* VHS noise overlay (subtle) */
    @keyframes vhs-noise {
      0% {
        opacity: 0.05;
      }
      50% {
        opacity: 0.08;
      }
      100% {
        opacity: 0.05;
      }
    }

    [data-theme="vaporwave"] section::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-image:
        repeating-linear-gradient(
          0deg,
          rgba(255, 110, 199, 0.02) 0px,
          rgba(183, 148, 246, 0.02) 1px,
          transparent 2px,
          transparent 4px
        );
      pointer-events: none;
      z-index: 0;
      animation: vhs-noise 2s ease-in-out infinite;
    }

    /* Input fields with pastel glow */
    [data-theme="vaporwave"] input,
    [data-theme="vaporwave"] textarea,
    [data-theme="vaporwave"] select {
      background: rgba(26, 11, 46, 0.5);
      border: 2px solid rgba(255, 110, 199, 0.3);
      color: #f8e7ff;
      padding: 12px 16px;
      border-radius: 8px;
      transition: all 0.3s ease;
      backdrop-filter: blur(8px);
      box-shadow:
        inset 0 0 16px rgba(255, 110, 199, 0.08);
    }

    [data-theme="vaporwave"] input:focus,
    [data-theme="vaporwave"] textarea:focus,
    [data-theme="vaporwave"] select:focus {
      outline: none;
      border-color: #ff6ec7;
      box-shadow:
        0 0 16px rgba(255, 110, 199, 0.4),
        0 0 8px rgba(0, 255, 255, 0.3),
        inset 0 0 24px rgba(255, 110, 199, 0.12);
    }

    /* Loading spinner vaporwave style */
    @keyframes vaporwave-spin {
      0% {
        transform: rotate(0deg);
        box-shadow: 0 0 8px rgba(255, 110, 199, 0.5);
      }
      33% {
        box-shadow: 0 0 16px rgba(183, 148, 246, 0.6);
      }
      66% {
        box-shadow: 0 0 16px rgba(0, 255, 255, 0.6);
      }
      100% {
        transform: rotate(360deg);
        box-shadow: 0 0 8px rgba(255, 110, 199, 0.5);
      }
    }

    [data-theme="vaporwave"] .loading-spinner {
      border: 3px solid rgba(255, 110, 199, 0.2);
      border-top: 3px solid #ff6ec7;
      border-right: 3px solid #b794f6;
      border-bottom: 3px solid #00ffff;
      border-radius: 50%;
      animation: vaporwave-spin 1.5s linear infinite;
    }

    /* Tag/badge pastel styling */
    [data-theme="vaporwave"] .tag,
    [data-theme="vaporwave"] .badge {
      background: linear-gradient(
        135deg,
        rgba(255, 110, 199, 0.15) 0%,
        rgba(183, 148, 246, 0.15) 100%
      );
      border: 1px solid rgba(255, 110, 199, 0.4);
      color: #ff6ec7;
      padding: 6px 14px;
      border-radius: 12px;
      font-size: 0.85em;
      font-weight: 600;
      letter-spacing: 0.5px;
      text-transform: uppercase;
      backdrop-filter: blur(8px);
      box-shadow:
        0 4px 12px rgba(255, 110, 199, 0.2),
        inset 0 0 8px rgba(255, 110, 199, 0.1);
      transition: all 0.3s ease;
    }

    [data-theme="vaporwave"] .tag:hover,
    [data-theme="vaporwave"] .badge:hover {
      transform: translateY(-2px);
      box-shadow:
        0 8px 24px rgba(255, 110, 199, 0.35),
        inset 0 0 12px rgba(255, 110, 199, 0.15);
    }

    [data-theme="vaporwave"] .tag.accent,
    [data-theme="vaporwave"] .badge.accent {
      background: linear-gradient(
        135deg,
        rgba(0, 255, 255, 0.15) 0%,
        rgba(183, 148, 246, 0.15) 100%
      );
      border-color: rgba(0, 255, 255, 0.4);
      color: #00ffff;
      box-shadow:
        0 4px 12px rgba(0, 255, 255, 0.2),
        inset 0 0 8px rgba(0, 255, 255, 0.1);
    }

    /* Glitch effect for special elements */
    @keyframes vaporwave-glitch {
      0% {
        transform: translate(0);
        text-shadow:
          -2px 0 0 rgba(255, 0, 255, 0.5),
          2px 0 0 rgba(0, 255, 255, 0.5);
      }
      20% {
        transform: translate(-1px, 1px);
        text-shadow:
          -3px 0 0 rgba(255, 0, 255, 0.6),
          3px 0 0 rgba(0, 255, 255, 0.6);
      }
      40% {
        transform: translate(1px, -1px);
        text-shadow:
          -2px 0 0 rgba(255, 0, 255, 0.5),
          2px 0 0 rgba(0, 255, 255, 0.5);
      }
      60% {
        transform: translate(-1px, -1px);
        text-shadow:
          -3px 0 0 rgba(255, 0, 255, 0.6),
          3px 0 0 rgba(0, 255, 255, 0.6);
      }
      80% {
        transform: translate(1px, 1px);
        text-shadow:
          -2px 0 0 rgba(255, 0, 255, 0.5),
          2px 0 0 rgba(0, 255, 255, 0.5);
      }
      100% {
        transform: translate(0);
        text-shadow:
          -2px 0 0 rgba(255, 0, 255, 0.5),
          2px 0 0 rgba(0, 255, 255, 0.5);
      }
    }

    [data-theme="vaporwave"] .glitch {
      position: relative;
      animation: vaporwave-glitch 0.4s ease-in-out infinite;
      animation-play-state: paused;
    }

    [data-theme="vaporwave"] .glitch:hover {
      animation-play-state: running;
    }

    /* Retro sun gradient (optional decorative element) */
    [data-theme="vaporwave"] .retro-sun {
      background: radial-gradient(
        circle,
        #ff6ec7 0%,
        #ff9edf 30%,
        #b794f6 60%,
        #00ffff 100%
      );
      box-shadow:
        0 0 32px rgba(255, 110, 199, 0.6),
        0 0 64px rgba(183, 148, 246, 0.4),
        0 0 96px rgba(0, 255, 255, 0.3);
      animation: vaporwave-pulse 4s ease-in-out infinite;
    }

    /* Dreamy text selection */
    [data-theme="vaporwave"] ::selection {
      background: rgba(255, 110, 199, 0.4);
      color: #ffffff;
      text-shadow: 0 0 8px rgba(255, 110, 199, 0.6);
    }

    [data-theme="vaporwave"] ::-moz-selection {
      background: rgba(255, 110, 199, 0.4);
      color: #ffffff;
      text-shadow: 0 0 8px rgba(255, 110, 199, 0.6);
    }
  `,
};
