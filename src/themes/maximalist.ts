/**
 * Maximalist Baroque Theme
 *
 * Inspired by Baroque architecture, Victorian maximalism, and modern maximalist design.
 * More is more: deep jewel tones, gold accents, rich textures, layered patterns, ornate details.
 *
 * Design Philosophy:
 * - Versailles Palace opulence and grandeur
 * - Baroque architecture: ornate, curved, theatrical
 * - Victorian maximalism: layered, patterned, rich
 * - Modern maximalist interiors: bold color clashes, pattern mixing
 * - Rococo flourishes and ornamental complexity
 * - Operatic drama and theatrical staging
 * - Not minimal - embrace decoration, pattern, complexity
 * - Awwward-level contemporary maximalist aesthetic
 */

import { Theme } from '@/types/theme';

export const maximalistTheme: Theme = {
  id: 'maximalist',
  name: 'Maximalist Baroque',
  description: 'Opulent Baroque grandeur with jewel tones, gold accents, and theatrical ornamentation',

  colors: {
    // Light Mode: Jeweled Opulence
    light: {
      // Primary backgrounds - Rich creams with warmth
      bgPrimary: '#FFF8F0',
      bgSecondary: '#FFF0E5',
      bgTertiary: '#FFE8D9',

      // Text colors - Deep burgundy and bronze
      textPrimary: '#3D1F1F',
      textSecondary: '#6B3636',
      textAccent: '#B8860B',

      // Accent colors - Rich ruby red with gold
      accent: '#8B0000',
      accentHover: '#A52A2A',
      accentActive: '#6B0000',

      // Border colors - Ornate gold and bronze
      border: '#DAA520',
      borderSubtle: '#F4E4C1',
      borderAccent: '#B8860B',

      // Special effects - Ruby and gold glow
      glow: 'rgba(139, 0, 0, 0.4)',
      shadow: 'rgba(61, 31, 31, 0.25)',
      overlay: 'rgba(255, 248, 240, 0.95)',

      // Calendar-specific - Rich jewel palette
      calendarPrimary: '#8B0000',
      calendarSecondary: '#4B0082',
      calendarAccent: '#006B3D',
    },

    // Dark Mode: Midnight Opulence
    dark: {
      // Primary backgrounds - Deep burgundy blacks
      bgPrimary: '#1A0E0E',
      bgSecondary: '#2D1414',
      bgTertiary: '#3D1F1F',

      // Text colors - Gold and cream
      textPrimary: '#FFE8D9',
      textSecondary: '#F4D4BA',
      textAccent: '#FFD700',

      // Accent colors - Brilliant ruby and gold
      accent: '#DC143C',
      accentHover: '#FF1744',
      accentActive: '#B71C1C',

      // Border colors - Luminous gold with ruby hints
      border: '#DAA520',
      borderSubtle: '#6B4423',
      borderAccent: '#FFD700',

      // Special effects - Rich ruby glow
      glow: 'rgba(220, 20, 60, 0.6)',
      shadow: 'rgba(0, 0, 0, 0.6)',
      overlay: 'rgba(26, 14, 14, 0.95)',

      // Calendar-specific - Vibrant jewel tones
      calendarPrimary: '#DC143C',
      calendarSecondary: '#9370DB',
      calendarAccent: '#00C853',
    },
  },

  typography: {
    fontFamily: {
      // Ornate serif for body text
      serif: '"Libre Baskerville", "Crimson Text", "EB Garamond", Georgia, serif',

      // Baroque display font for headlines
      display: '"Cinzel Decorative", "Cormorant Unicase", "Playfair Display", "Bodoni Moda", serif',

      // Elegant sans for contrast
      sans: '"Raleway", "Lato", "Josefin Sans", -apple-system, sans-serif',

      // Decorative monospace
      mono: '"Courier Prime", "IBM Plex Mono", "Source Code Pro", monospace',
    },
    fontWeights: {
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 900, // Extra bold for maximalist impact
    },
  },

  effects: {
    blur: {
      sm: '6px',
      md: '12px',
      lg: '24px',
    },
    shadows: {
      // Rich, layered, theatrical shadows with multiple colors
      sm: '0 2px 4px rgba(61, 31, 31, 0.15), 0 1px 2px rgba(139, 0, 0, 0.1), 0 0 8px rgba(218, 165, 32, 0.08)',
      md: '0 6px 16px rgba(61, 31, 31, 0.2), 0 3px 8px rgba(139, 0, 0, 0.15), 0 0 16px rgba(218, 165, 32, 0.12), inset 0 1px 0 rgba(255, 215, 0, 0.15)',
      lg: '0 12px 32px rgba(61, 31, 31, 0.25), 0 6px 16px rgba(139, 0, 0, 0.2), 0 0 24px rgba(218, 165, 32, 0.15), inset 0 2px 0 rgba(255, 215, 0, 0.2), 0 4px 8px rgba(75, 0, 130, 0.1)',
      xl: '0 24px 64px rgba(61, 31, 31, 0.3), 0 12px 32px rgba(139, 0, 0, 0.25), 0 0 48px rgba(218, 165, 32, 0.2), inset 0 3px 0 rgba(255, 215, 0, 0.25), 0 8px 16px rgba(75, 0, 130, 0.15), 0 0 80px rgba(220, 20, 60, 0.1)',
    },
    borderRadius: {
      // Ornate curves and flourishes
      sm: '8px',
      md: '16px',
      lg: '24px',
      xl: '32px',
    },
    transitions: {
      fast: 'all 0.2s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      normal: 'all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      slow: 'all 0.7s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    },
  },

  materials: {
    // Rich mahogany with gold inlay
    wood: {
      color: '#5C2E2E',
      roughness: 0.25,
      metalness: 0.5,
    },

    // Cream parchment with gold leaf
    paper: {
      color: '#FFF8F0',
      roughness: 0.3,
      metalness: 0.15,
    },

    // Ornate polished gold with rose gold hints
    metal: {
      color: '#FFD700',
      roughness: 0.1,
      metalness: 0.98,
    },

    // Deep ruby ceramic with gold lustre
    ceramic: {
      color: '#8B0000',
      roughness: 0.15,
      metalness: 0.45,
    },
  },

  customCSS: `
    /* Maximalist Baroque Theme Custom Styles */

    /* Ornate gold shimmer with color shifts */
    @keyframes baroqueShimmer {
      0% {
        background-position: -200% center;
        filter: hue-rotate(0deg);
      }
      50% {
        filter: hue-rotate(10deg);
      }
      100% {
        background-position: 200% center;
        filter: hue-rotate(0deg);
      }
    }

    /* Theatrical pulse effect */
    @keyframes dramaticPulse {
      0%, 100% {
        transform: scale(1);
        filter: brightness(1);
      }
      50% {
        transform: scale(1.02);
        filter: brightness(1.1);
      }
    }

    /* Flourish rotation */
    @keyframes flourishRotate {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }

    /* Rich damask pattern background */
    .maximalist-damask {
      background-color: var(--bg-primary);
      background-image:
        radial-gradient(circle at 20% 50%, rgba(139, 0, 0, 0.08) 0%, transparent 50%),
        radial-gradient(circle at 80% 80%, rgba(75, 0, 130, 0.06) 0%, transparent 50%),
        radial-gradient(circle at 40% 20%, rgba(218, 165, 32, 0.05) 0%, transparent 50%),
        repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(218, 165, 32, 0.03) 35px, rgba(218, 165, 32, 0.03) 70px),
        repeating-linear-gradient(-45deg, transparent, transparent 35px, rgba(139, 0, 0, 0.03) 35px, rgba(139, 0, 0, 0.03) 70px);
    }

    /* Ornate jewel gradient */
    .maximalist-jewel-gradient {
      background: linear-gradient(
        135deg,
        #8B0000 0%,
        #A52A2A 15%,
        #B8860B 30%,
        #FFD700 45%,
        #4B0082 60%,
        #9370DB 75%,
        #DC143C 90%,
        #8B0000 100%
      );
      background-size: 300% 300%;
      animation: baroqueShimmer 6s ease-in-out infinite;
    }

    /* Theatrical spotlight effect */
    .maximalist-spotlight {
      background: radial-gradient(
        ellipse at center,
        rgba(255, 215, 0, 0.2) 0%,
        rgba(218, 165, 32, 0.15) 20%,
        rgba(139, 0, 0, 0.1) 40%,
        rgba(75, 0, 130, 0.05) 60%,
        transparent 80%
      );
      animation: dramaticPulse 4s ease-in-out infinite;
    }

    /* Ornate layered border */
    .maximalist-ornate-border {
      border: 3px solid #DAA520;
      box-shadow:
        0 0 0 1px #8B0000,
        0 0 0 6px var(--bg-primary),
        0 0 0 9px #B8860B,
        0 0 0 10px var(--bg-primary),
        0 0 0 14px #4B0082,
        0 0 0 15px var(--bg-primary),
        0 0 0 18px #FFD700,
        0 0 20px rgba(218, 165, 32, 0.4),
        0 0 40px rgba(139, 0, 0, 0.3),
        inset 0 0 20px rgba(255, 215, 0, 0.15);
      border-radius: 16px;
      position: relative;
    }

    /* Baroque flourish corners */
    .maximalist-flourish::before,
    .maximalist-flourish::after {
      content: '❦';
      position: absolute;
      font-size: 32px;
      color: #DAA520;
      text-shadow:
        0 0 10px rgba(255, 215, 0, 0.6),
        0 0 20px rgba(139, 0, 0, 0.4),
        2px 2px 4px rgba(0, 0, 0, 0.3);
      animation: flourishRotate 20s linear infinite;
    }

    .maximalist-flourish::before {
      top: -16px;
      left: -16px;
    }

    .maximalist-flourish::after {
      bottom: -16px;
      right: -16px;
      animation-direction: reverse;
    }

    /* Rich textured gold gradient */
    .maximalist-gold-texture {
      background: linear-gradient(
        145deg,
        #FFD700 0%,
        #FFC700 10%,
        #FFE55C 20%,
        #DAA520 30%,
        #B8860B 40%,
        #8B6914 50%,
        #B8860B 60%,
        #DAA520 70%,
        #FFE55C 80%,
        #FFC700 90%,
        #FFD700 100%
      );
      background-size: 200% 200%;
      animation: baroqueShimmer 5s ease-in-out infinite;
      box-shadow:
        inset 0 2px 4px rgba(255, 255, 255, 0.4),
        inset 0 -2px 4px rgba(0, 0, 0, 0.3),
        0 4px 12px rgba(218, 165, 32, 0.4);
    }

    /* Opulent text effect with multiple colors */
    .maximalist-opulent-text {
      background: linear-gradient(
        135deg,
        #FFD700 0%,
        #FFC700 10%,
        #DC143C 25%,
        #9370DB 40%,
        #00C853 55%,
        #4B0082 70%,
        #B8860B 85%,
        #FFD700 100%
      );
      background-size: 300% auto;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      animation: baroqueShimmer 8s ease-in-out infinite;
      text-shadow:
        0 0 30px rgba(255, 215, 0, 0.4),
        0 0 60px rgba(220, 20, 60, 0.3);
      filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
    }

    /* Victorian wallpaper pattern */
    .maximalist-wallpaper {
      background-color: var(--bg-secondary);
      background-image:
        radial-gradient(circle at 0% 0%, rgba(139, 0, 0, 0.1) 0%, transparent 50%),
        radial-gradient(circle at 100% 100%, rgba(75, 0, 130, 0.1) 0%, transparent 50%),
        radial-gradient(circle at 50% 50%, rgba(218, 165, 32, 0.05) 0%, transparent 50%),
        repeating-radial-gradient(circle at 50% 50%, transparent 0px, transparent 20px, rgba(218, 165, 32, 0.04) 20px, rgba(218, 165, 32, 0.04) 40px),
        linear-gradient(45deg, transparent 30%, rgba(139, 0, 0, 0.03) 30%, rgba(139, 0, 0, 0.03) 70%, transparent 70%),
        linear-gradient(-45deg, transparent 30%, rgba(75, 0, 130, 0.03) 30%, rgba(75, 0, 130, 0.03) 70%, transparent 70%);
      background-size: 100% 100%, 100% 100%, 100% 100%, 80px 80px, 60px 60px, 60px 60px;
    }

    /* Theatrical curtain effect */
    .maximalist-curtain {
      background: linear-gradient(
        90deg,
        #8B0000 0%,
        #A52A2A 5%,
        #8B0000 10%,
        #6B0000 15%,
        #8B0000 20%,
        #A52A2A 25%,
        #8B0000 30%,
        #6B0000 35%,
        #8B0000 40%,
        #A52A2A 45%,
        #8B0000 50%,
        #A52A2A 55%,
        #8B0000 60%,
        #6B0000 65%,
        #8B0000 70%,
        #A52A2A 75%,
        #8B0000 80%,
        #6B0000 85%,
        #8B0000 90%,
        #A52A2A 95%,
        #8B0000 100%
      );
      box-shadow:
        inset 0 10px 20px rgba(0, 0, 0, 0.3),
        inset 0 -10px 20px rgba(0, 0, 0, 0.3),
        0 0 40px rgba(139, 0, 0, 0.4);
    }

    /* Ornamental divider with jewels */
    .maximalist-jewel-divider {
      width: 100%;
      height: 3px;
      background: linear-gradient(
        90deg,
        transparent 0%,
        #8B0000 10%,
        #B8860B 20%,
        #FFD700 30%,
        #4B0082 40%,
        #FFD700 50%,
        #4B0082 60%,
        #FFD700 70%,
        #B8860B 80%,
        #8B0000 90%,
        transparent 100%
      );
      position: relative;
      box-shadow: 0 0 10px rgba(255, 215, 0, 0.5);
    }

    .maximalist-jewel-divider::before,
    .maximalist-jewel-divider::after {
      content: '◆';
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      font-size: 24px;
      text-shadow:
        0 0 15px rgba(255, 215, 0, 0.8),
        0 0 30px rgba(139, 0, 0, 0.6);
    }

    .maximalist-jewel-divider::before {
      left: 20%;
      color: #DC143C;
    }

    .maximalist-jewel-divider::after {
      right: 20%;
      color: #9370DB;
    }

    /* Baroque card with multiple layers */
    .maximalist-baroque-card {
      background: var(--bg-secondary);
      border: 2px solid var(--border);
      border-radius: 16px;
      box-shadow:
        0 0 0 4px var(--bg-primary),
        0 0 0 6px #8B0000,
        0 0 0 8px var(--bg-primary),
        0 0 0 10px #4B0082,
        0 12px 36px rgba(61, 31, 31, 0.2),
        0 4px 12px rgba(139, 0, 0, 0.15),
        0 0 24px rgba(218, 165, 32, 0.1),
        inset 0 2px 0 rgba(255, 215, 0, 0.15),
        inset 0 -2px 0 rgba(139, 0, 0, 0.1);
      position: relative;
      overflow: hidden;
    }

    .maximalist-baroque-card::before {
      content: '';
      position: absolute;
      top: -50%;
      left: -50%;
      width: 200%;
      height: 200%;
      background: radial-gradient(
        circle,
        rgba(255, 215, 0, 0.15) 0%,
        rgba(220, 20, 60, 0.1) 25%,
        rgba(147, 112, 219, 0.08) 50%,
        transparent 75%
      );
      animation: flourishRotate 30s linear infinite;
      pointer-events: none;
    }

    /* Maximalist pattern overlay */
    .maximalist-pattern-overlay {
      position: relative;
    }

    .maximalist-pattern-overlay::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-image:
        repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(218, 165, 32, 0.03) 10px, rgba(218, 165, 32, 0.03) 20px),
        repeating-linear-gradient(-45deg, transparent, transparent 10px, rgba(139, 0, 0, 0.03) 10px, rgba(139, 0, 0, 0.03) 20px),
        repeating-linear-gradient(90deg, transparent, transparent 5px, rgba(75, 0, 130, 0.02) 5px, rgba(75, 0, 130, 0.02) 10px);
      pointer-events: none;
      opacity: 0.6;
    }

    /* Opulent button with multiple effects */
    .maximalist-button {
      background: linear-gradient(145deg, #8B0000 0%, #DC143C 50%, #8B0000 100%);
      border: 3px solid #DAA520;
      box-shadow:
        0 0 0 1px #FFD700,
        0 0 0 5px var(--bg-primary),
        0 0 0 7px #4B0082,
        0 8px 24px rgba(139, 0, 0, 0.4),
        0 0 20px rgba(218, 165, 32, 0.3),
        inset 0 2px 0 rgba(255, 215, 0, 0.3),
        inset 0 -2px 0 rgba(0, 0, 0, 0.3);
      color: #FFE8D9;
      font-weight: 700;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
      padding: 16px 40px;
      border-radius: 12px;
      position: relative;
      overflow: hidden;
      transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
    }

    .maximalist-button::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(
        90deg,
        transparent,
        rgba(255, 215, 0, 0.3),
        transparent
      );
      transition: left 0.6s ease;
    }

    .maximalist-button::after {
      content: '✦';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) scale(0);
      font-size: 100px;
      color: rgba(255, 215, 0, 0.2);
      transition: transform 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
    }

    .maximalist-button:hover {
      transform: translateY(-4px) scale(1.05);
      box-shadow:
        0 0 0 1px #FFD700,
        0 0 0 5px var(--bg-primary),
        0 0 0 7px #9370DB,
        0 16px 48px rgba(139, 0, 0, 0.5),
        0 0 40px rgba(218, 165, 32, 0.5),
        0 0 60px rgba(220, 20, 60, 0.3),
        inset 0 2px 0 rgba(255, 215, 0, 0.4),
        inset 0 -2px 0 rgba(0, 0, 0, 0.4);
    }

    .maximalist-button:hover::before {
      left: 100%;
    }

    .maximalist-button:hover::after {
      transform: translate(-50%, -50%) scale(1);
    }

    .maximalist-button:active {
      transform: translateY(-2px) scale(1.02);
    }

    /* Theatrical glow effect */
    .maximalist-theatrical-glow {
      animation: dramaticPulse 3s ease-in-out infinite;
      box-shadow:
        0 0 20px rgba(255, 215, 0, 0.4),
        0 0 40px rgba(139, 0, 0, 0.3),
        0 0 60px rgba(147, 112, 219, 0.2),
        inset 0 0 20px rgba(255, 215, 0, 0.1);
    }

    /* Ornate frame effect */
    .maximalist-frame {
      border: 4px solid #DAA520;
      border-image: linear-gradient(
        45deg,
        #FFD700 0%,
        #DC143C 25%,
        #9370DB 50%,
        #00C853 75%,
        #FFD700 100%
      ) 1;
      padding: 24px;
      position: relative;
    }

    .maximalist-frame::before,
    .maximalist-frame::after {
      content: '';
      position: absolute;
      background: linear-gradient(135deg, #FFD700, #DC143C);
      box-shadow: 0 0 15px rgba(255, 215, 0, 0.6);
    }

    .maximalist-frame::before {
      top: -8px;
      left: -8px;
      width: 16px;
      height: 16px;
      border-radius: 50%;
    }

    .maximalist-frame::after {
      bottom: -8px;
      right: -8px;
      width: 16px;
      height: 16px;
      border-radius: 50%;
    }

    /* Rich velvet texture simulation */
    .maximalist-velvet {
      background: linear-gradient(
        180deg,
        #6B0000 0%,
        #8B0000 30%,
        #A52A2A 50%,
        #8B0000 70%,
        #6B0000 100%
      );
      box-shadow:
        inset 0 4px 8px rgba(0, 0, 0, 0.4),
        inset 0 -4px 8px rgba(255, 0, 0, 0.2),
        0 4px 16px rgba(139, 0, 0, 0.3);
      position: relative;
    }

    .maximalist-velvet::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background:
        repeating-linear-gradient(
          0deg,
          transparent,
          transparent 2px,
          rgba(0, 0, 0, 0.1) 2px,
          rgba(0, 0, 0, 0.1) 4px
        );
      opacity: 0.3;
    }

    /* Baroque scroll ornament */
    .maximalist-scroll {
      position: relative;
      padding: 32px 48px;
    }

    .maximalist-scroll::before,
    .maximalist-scroll::after {
      content: '❧';
      position: absolute;
      font-size: 48px;
      color: #DAA520;
      text-shadow:
        0 0 20px rgba(255, 215, 0, 0.8),
        2px 2px 4px rgba(0, 0, 0, 0.4);
    }

    .maximalist-scroll::before {
      top: -24px;
      left: 50%;
      transform: translateX(-50%) rotate(0deg);
    }

    .maximalist-scroll::after {
      bottom: -24px;
      left: 50%;
      transform: translateX(-50%) rotate(180deg);
    }

    /* Jeweled border accent */
    .maximalist-jeweled {
      border-top: 4px solid transparent;
      border-bottom: 4px solid transparent;
      border-image: linear-gradient(
        90deg,
        #8B0000 0%,
        #B8860B 12.5%,
        #FFD700 25%,
        #4B0082 37.5%,
        #9370DB 50%,
        #4B0082 62.5%,
        #FFD700 75%,
        #B8860B 87.5%,
        #8B0000 100%
      ) 1;
      padding: 24px 0;
      box-shadow:
        0 4px 0 0 rgba(218, 165, 32, 0.3),
        0 -4px 0 0 rgba(218, 165, 32, 0.3);
    }

    /* Opulent interactive hover */
    .maximalist-interactive {
      position: relative;
      transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
      cursor: pointer;
    }

    .maximalist-interactive::before {
      content: '';
      position: absolute;
      inset: -4px;
      border-radius: inherit;
      padding: 2px;
      background: linear-gradient(
        135deg,
        #FFD700,
        #DC143C,
        #9370DB,
        #00C853,
        #FFD700
      );
      -webkit-mask:
        linear-gradient(#fff 0 0) content-box,
        linear-gradient(#fff 0 0);
      mask:
        linear-gradient(#fff 0 0) content-box,
        linear-gradient(#fff 0 0);
      -webkit-mask-composite: xor;
      mask-composite: exclude;
      opacity: 0;
      transition: opacity 0.4s ease;
    }

    .maximalist-interactive:hover {
      transform: translateY(-4px) scale(1.02);
      box-shadow:
        0 12px 36px rgba(139, 0, 0, 0.3),
        0 0 40px rgba(218, 165, 32, 0.3),
        0 0 60px rgba(147, 112, 219, 0.2);
    }

    .maximalist-interactive:hover::before {
      opacity: 1;
    }

    /* Dark mode adjustments */
    [data-theme="dark"] .maximalist-damask {
      background-color: var(--bg-primary);
      background-image:
        radial-gradient(circle at 20% 50%, rgba(220, 20, 60, 0.12) 0%, transparent 50%),
        radial-gradient(circle at 80% 80%, rgba(147, 112, 219, 0.1) 0%, transparent 50%),
        radial-gradient(circle at 40% 20%, rgba(255, 215, 0, 0.08) 0%, transparent 50%),
        repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(218, 165, 32, 0.05) 35px, rgba(218, 165, 32, 0.05) 70px),
        repeating-linear-gradient(-45deg, transparent, transparent 35px, rgba(220, 20, 60, 0.05) 35px, rgba(220, 20, 60, 0.05) 70px);
    }

    [data-theme="dark"] .maximalist-wallpaper {
      background-color: var(--bg-secondary);
      background-image:
        radial-gradient(circle at 0% 0%, rgba(220, 20, 60, 0.15) 0%, transparent 50%),
        radial-gradient(circle at 100% 100%, rgba(147, 112, 219, 0.12) 0%, transparent 50%),
        radial-gradient(circle at 50% 50%, rgba(255, 215, 0, 0.08) 0%, transparent 50%),
        repeating-radial-gradient(circle at 50% 50%, transparent 0px, transparent 20px, rgba(218, 165, 32, 0.06) 20px, rgba(218, 165, 32, 0.06) 40px),
        linear-gradient(45deg, transparent 30%, rgba(220, 20, 60, 0.05) 30%, rgba(220, 20, 60, 0.05) 70%, transparent 70%),
        linear-gradient(-45deg, transparent 30%, rgba(147, 112, 219, 0.05) 30%, rgba(147, 112, 219, 0.05) 70%, transparent 70%);
      background-size: 100% 100%, 100% 100%, 100% 100%, 80px 80px, 60px 60px, 60px 60px;
    }
  `,
};
