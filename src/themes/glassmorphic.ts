/**
 * Glassmorphic Modern Theme
 * Award-worthy design inspired by iOS, macOS Big Sur, and modern design systems
 * Features: Frosted glass, translucent layers, soft gradients, depth through blur
 */

import type { Theme } from '@/types/theme';

export const glassmorphicTheme: Theme = {
  id: 'glassmorphic',
  name: 'Glassmorphic Modern',
  description: 'Ultra-modern glassmorphism with frosted glass, soft gradients, and layered transparency. Inspired by iOS and Apple Big Sur aesthetics.',

  colors: {
    // Light Mode - Soft, airy, translucent
    light: {
      // Primary backgrounds - Subtle gradients with translucency
      bgPrimary: 'rgba(250, 250, 255, 0.72)',
      bgSecondary: 'rgba(255, 255, 255, 0.45)',
      bgTertiary: 'rgba(245, 247, 255, 0.65)',

      // Text colors - Soft but readable
      textPrimary: 'rgba(28, 28, 35, 0.92)',
      textSecondary: 'rgba(60, 60, 67, 0.72)',
      textAccent: 'rgba(88, 86, 214, 0.95)',

      // Accent colors - Vibrant but harmonious
      accent: 'rgba(120, 115, 255, 0.88)',
      accentHover: 'rgba(100, 95, 235, 0.95)',
      accentActive: 'rgba(88, 83, 220, 1)',

      // Border colors - Subtle glass edges
      border: 'rgba(200, 205, 230, 0.35)',
      borderSubtle: 'rgba(220, 225, 245, 0.22)',
      borderAccent: 'rgba(120, 115, 255, 0.45)',

      // Special effects
      glow: 'rgba(120, 115, 255, 0.25)',
      shadow: 'rgba(100, 100, 140, 0.12)',
      overlay: 'rgba(255, 255, 255, 0.35)',

      // Calendar-specific - Soft, translucent colors
      calendarPrimary: 'rgba(165, 180, 252, 0.55)',
      calendarSecondary: 'rgba(196, 181, 253, 0.48)',
      calendarAccent: 'rgba(251, 207, 232, 0.52)',
    },

    // Dark Mode - Deep, luminous, sophisticated
    dark: {
      // Primary backgrounds - Deep translucent layers
      bgPrimary: 'rgba(18, 18, 24, 0.78)',
      bgSecondary: 'rgba(28, 28, 35, 0.55)',
      bgTertiary: 'rgba(38, 38, 48, 0.68)',

      // Text colors - Bright but not harsh
      textPrimary: 'rgba(255, 255, 255, 0.92)',
      textSecondary: 'rgba(235, 235, 245, 0.68)',
      textAccent: 'rgba(165, 180, 252, 0.95)',

      // Accent colors - Luminous and vibrant
      accent: 'rgba(165, 180, 252, 0.88)',
      accentHover: 'rgba(145, 160, 235, 0.95)',
      accentActive: 'rgba(129, 140, 248, 1)',

      // Border colors - Subtle luminous edges
      border: 'rgba(99, 102, 241, 0.25)',
      borderSubtle: 'rgba(139, 142, 255, 0.15)',
      borderAccent: 'rgba(165, 180, 252, 0.55)',

      // Special effects - Glowing, atmospheric
      glow: 'rgba(165, 180, 252, 0.35)',
      shadow: 'rgba(0, 0, 0, 0.35)',
      overlay: 'rgba(30, 30, 40, 0.45)',

      // Calendar-specific - Luminous translucent colors
      calendarPrimary: 'rgba(165, 180, 252, 0.45)',
      calendarSecondary: 'rgba(196, 181, 253, 0.42)',
      calendarAccent: 'rgba(244, 114, 182, 0.48)',
    },
  },

  typography: {
    fontFamily: {
      // Modern system fonts with fallbacks
      sans: '-apple-system, BlinkMacSystemFont, "Segoe UI", "SF Pro Display", "Inter", system-ui, sans-serif',
      serif: 'ui-serif, "SF Pro Display", Georgia, Cambria, "Times New Roman", Times, serif',
      mono: 'ui-monospace, "SF Mono", "Cascadia Code", Consolas, "Courier New", monospace',
      display: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Inter", system-ui, sans-serif',
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
    // Heavy blur for glassmorphic effect
    blur: {
      sm: '12px',
      md: '24px',
      lg: '40px',
    },

    // Soft, layered shadows
    shadows: {
      sm: '0 2px 8px rgba(100, 100, 140, 0.08), 0 1px 2px rgba(100, 100, 140, 0.04)',
      md: '0 8px 24px rgba(100, 100, 140, 0.12), 0 2px 8px rgba(100, 100, 140, 0.08)',
      lg: '0 16px 48px rgba(100, 100, 140, 0.15), 0 4px 16px rgba(100, 100, 140, 0.1)',
      xl: '0 24px 64px rgba(100, 100, 140, 0.2), 0 8px 24px rgba(100, 100, 140, 0.15)',
    },

    // Smooth, rounded corners
    borderRadius: {
      sm: '12px',
      md: '18px',
      lg: '24px',
      xl: '32px',
    },

    // Fluid transitions
    transitions: {
      fast: 'all 0.15s cubic-bezier(0.4, 0, 0.2, 1)',
      normal: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      slow: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
    },
  },

  materials: {
    // Frosted glass material
    wood: {
      color: '#e8ebf5',
      roughness: 0.15,
      metalness: 0.05,
    },

    // Translucent paper-like material
    paper: {
      color: '#f5f7ff',
      roughness: 0.25,
      metalness: 0,
    },

    // Polished glass/metal hybrid
    metal: {
      color: '#c8d0f0',
      roughness: 0.08,
      metalness: 0.35,
    },

    // Smooth frosted ceramic
    ceramic: {
      color: '#dde2f8',
      roughness: 0.12,
      metalness: 0.15,
    },
  },

  // Custom CSS for glassmorphic effects
  customCSS: `
/* Glassmorphic Theme Custom Styles */

[data-theme="glassmorphic"] {
  /* Background gradients */
  --glass-gradient-light: linear-gradient(135deg,
    rgba(250, 250, 255, 0.85) 0%,
    rgba(245, 247, 255, 0.75) 50%,
    rgba(240, 245, 255, 0.8) 100%
  );

  --glass-gradient-dark: linear-gradient(135deg,
    rgba(18, 18, 24, 0.85) 0%,
    rgba(28, 28, 35, 0.75) 50%,
    rgba(38, 38, 48, 0.8) 100%
  );

  /* Mesh gradients for depth */
  --mesh-gradient-light: radial-gradient(at 20% 30%, rgba(165, 180, 252, 0.15) 0px, transparent 50%),
    radial-gradient(at 80% 70%, rgba(196, 181, 253, 0.12) 0px, transparent 50%),
    radial-gradient(at 50% 50%, rgba(251, 207, 232, 0.1) 0px, transparent 50%);

  --mesh-gradient-dark: radial-gradient(at 20% 30%, rgba(99, 102, 241, 0.2) 0px, transparent 50%),
    radial-gradient(at 80% 70%, rgba(139, 92, 246, 0.15) 0px, transparent 50%),
    radial-gradient(at 50% 50%, rgba(236, 72, 153, 0.12) 0px, transparent 50%);
}

/* Glass card base styles */
[data-theme="glassmorphic"] .glass-card {
  background: rgba(255, 255, 255, 0.45);
  backdrop-filter: blur(24px) saturate(180%);
  -webkit-backdrop-filter: blur(24px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.35);
  box-shadow:
    0 8px 32px rgba(100, 100, 140, 0.08),
    0 2px 8px rgba(100, 100, 140, 0.04),
    inset 0 1px 1px rgba(255, 255, 255, 0.6);
  border-radius: 18px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

[data-theme="glassmorphic"].dark .glass-card {
  background: rgba(28, 28, 35, 0.55);
  backdrop-filter: blur(24px) saturate(180%);
  -webkit-backdrop-filter: blur(24px) saturate(180%);
  border: 1px solid rgba(99, 102, 241, 0.25);
  box-shadow:
    0 8px 32px rgba(0, 0, 0, 0.3),
    0 2px 8px rgba(0, 0, 0, 0.2),
    inset 0 1px 1px rgba(165, 180, 252, 0.15);
}

/* Hover effects */
[data-theme="glassmorphic"] .glass-card:hover {
  background: rgba(255, 255, 255, 0.55);
  border-color: rgba(120, 115, 255, 0.45);
  box-shadow:
    0 12px 40px rgba(100, 100, 140, 0.12),
    0 4px 16px rgba(100, 100, 140, 0.08),
    inset 0 1px 1px rgba(255, 255, 255, 0.7),
    0 0 0 1px rgba(120, 115, 255, 0.15);
  transform: translateY(-2px);
}

[data-theme="glassmorphic"].dark .glass-card:hover {
  background: rgba(38, 38, 48, 0.65);
  border-color: rgba(165, 180, 252, 0.45);
  box-shadow:
    0 12px 40px rgba(0, 0, 0, 0.4),
    0 4px 16px rgba(0, 0, 0, 0.3),
    inset 0 1px 1px rgba(165, 180, 252, 0.25),
    0 0 0 1px rgba(165, 180, 252, 0.2);
  transform: translateY(-2px);
}

/* Button glassmorphic styles */
[data-theme="glassmorphic"] button,
[data-theme="glassmorphic"] .btn {
  background: rgba(255, 255, 255, 0.35);
  backdrop-filter: blur(12px) saturate(180%);
  -webkit-backdrop-filter: blur(12px) saturate(180%);
  border: 1px solid rgba(200, 205, 230, 0.35);
  box-shadow:
    0 4px 16px rgba(100, 100, 140, 0.06),
    inset 0 1px 1px rgba(255, 255, 255, 0.5);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

[data-theme="glassmorphic"].dark button,
[data-theme="glassmorphic"].dark .btn {
  background: rgba(28, 28, 35, 0.45);
  backdrop-filter: blur(12px) saturate(180%);
  -webkit-backdrop-filter: blur(12px) saturate(180%);
  border: 1px solid rgba(99, 102, 241, 0.2);
  box-shadow:
    0 4px 16px rgba(0, 0, 0, 0.2),
    inset 0 1px 1px rgba(165, 180, 252, 0.1);
}

/* Accent buttons */
[data-theme="glassmorphic"] .btn-accent,
[data-theme="glassmorphic"] button.accent {
  background: linear-gradient(135deg,
    rgba(120, 115, 255, 0.88) 0%,
    rgba(165, 180, 252, 0.78) 100%
  );
  border-color: rgba(120, 115, 255, 0.45);
  color: rgba(255, 255, 255, 0.98);
  box-shadow:
    0 8px 24px rgba(120, 115, 255, 0.25),
    0 2px 8px rgba(120, 115, 255, 0.15),
    inset 0 1px 1px rgba(255, 255, 255, 0.3);
}

[data-theme="glassmorphic"].dark .btn-accent,
[data-theme="glassmorphic"].dark button.accent {
  background: linear-gradient(135deg,
    rgba(165, 180, 252, 0.88) 0%,
    rgba(139, 92, 246, 0.78) 100%
  );
  border-color: rgba(165, 180, 252, 0.55);
  color: rgba(18, 18, 24, 0.98);
  box-shadow:
    0 8px 24px rgba(165, 180, 252, 0.35),
    0 2px 8px rgba(165, 180, 252, 0.2),
    inset 0 1px 1px rgba(255, 255, 255, 0.2);
}

/* Input fields */
[data-theme="glassmorphic"] input,
[data-theme="glassmorphic"] textarea,
[data-theme="glassmorphic"] select {
  background: rgba(255, 255, 255, 0.35);
  backdrop-filter: blur(12px) saturate(180%);
  -webkit-backdrop-filter: blur(12px) saturate(180%);
  border: 1px solid rgba(200, 205, 230, 0.35);
  box-shadow: inset 0 2px 4px rgba(100, 100, 140, 0.04);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

[data-theme="glassmorphic"].dark input,
[data-theme="glassmorphic"].dark textarea,
[data-theme="glassmorphic"].dark select {
  background: rgba(28, 28, 35, 0.45);
  backdrop-filter: blur(12px) saturate(180%);
  -webkit-backdrop-filter: blur(12px) saturate(180%);
  border: 1px solid rgba(99, 102, 241, 0.2);
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.2);
}

[data-theme="glassmorphic"] input:focus,
[data-theme="glassmorphic"] textarea:focus,
[data-theme="glassmorphic"] select:focus {
  background: rgba(255, 255, 255, 0.45);
  border-color: rgba(120, 115, 255, 0.45);
  box-shadow:
    inset 0 2px 4px rgba(100, 100, 140, 0.04),
    0 0 0 3px rgba(120, 115, 255, 0.15);
}

[data-theme="glassmorphic"].dark input:focus,
[data-theme="glassmorphic"].dark textarea:focus,
[data-theme="glassmorphic"].dark select:focus {
  background: rgba(38, 38, 48, 0.55);
  border-color: rgba(165, 180, 252, 0.55);
  box-shadow:
    inset 0 2px 4px rgba(0, 0, 0, 0.2),
    0 0 0 3px rgba(165, 180, 252, 0.2);
}

/* Scrollbar styling */
[data-theme="glassmorphic"] ::-webkit-scrollbar-thumb {
  background: rgba(120, 115, 255, 0.35);
  backdrop-filter: blur(8px);
  border-radius: 12px;
  border: 2px solid rgba(255, 255, 255, 0.1);
}

[data-theme="glassmorphic"].dark ::-webkit-scrollbar-thumb {
  background: rgba(165, 180, 252, 0.35);
  backdrop-filter: blur(8px);
  border-radius: 12px;
  border: 2px solid rgba(28, 28, 35, 0.3);
}

[data-theme="glassmorphic"] ::-webkit-scrollbar-thumb:hover {
  background: rgba(120, 115, 255, 0.5);
}

[data-theme="glassmorphic"].dark ::-webkit-scrollbar-thumb:hover {
  background: rgba(165, 180, 252, 0.5);
}

/* Overlay/Modal backgrounds */
[data-theme="glassmorphic"] .overlay,
[data-theme="glassmorphic"] .modal-backdrop {
  background: rgba(250, 250, 255, 0.45);
  backdrop-filter: blur(40px) saturate(180%);
  -webkit-backdrop-filter: blur(40px) saturate(180%);
}

[data-theme="glassmorphic"].dark .overlay,
[data-theme="glassmorphic"].dark .modal-backdrop {
  background: rgba(18, 18, 24, 0.65);
  backdrop-filter: blur(40px) saturate(180%);
  -webkit-backdrop-filter: blur(40px) saturate(180%);
}

/* Dividers */
[data-theme="glassmorphic"] hr,
[data-theme="glassmorphic"] .divider {
  border-color: rgba(200, 205, 230, 0.25);
  box-shadow: 0 1px 0 rgba(255, 255, 255, 0.3);
}

[data-theme="glassmorphic"].dark hr,
[data-theme="glassmorphic"].dark .divider {
  border-color: rgba(99, 102, 241, 0.2);
  box-shadow: 0 1px 0 rgba(165, 180, 252, 0.08);
}

/* Selection */
[data-theme="glassmorphic"] ::selection {
  background: rgba(120, 115, 255, 0.25);
  color: rgba(28, 28, 35, 0.98);
}

[data-theme="glassmorphic"].dark ::selection {
  background: rgba(165, 180, 252, 0.35);
  color: rgba(255, 255, 255, 0.98);
}

/* Glow effects for accents */
[data-theme="glassmorphic"] .glow {
  box-shadow:
    0 0 20px rgba(120, 115, 255, 0.3),
    0 0 40px rgba(120, 115, 255, 0.15);
}

[data-theme="glassmorphic"].dark .glow {
  box-shadow:
    0 0 20px rgba(165, 180, 252, 0.4),
    0 0 40px rgba(165, 180, 252, 0.2);
}

/* Frosted navigation/header */
[data-theme="glassmorphic"] nav,
[data-theme="glassmorphic"] header {
  background: rgba(255, 255, 255, 0.65);
  backdrop-filter: blur(24px) saturate(180%);
  -webkit-backdrop-filter: blur(24px) saturate(180%);
  border-bottom: 1px solid rgba(200, 205, 230, 0.35);
  box-shadow:
    0 4px 16px rgba(100, 100, 140, 0.04),
    inset 0 -1px 0 rgba(255, 255, 255, 0.5);
}

[data-theme="glassmorphic"].dark nav,
[data-theme="glassmorphic"].dark header {
  background: rgba(18, 18, 24, 0.75);
  backdrop-filter: blur(24px) saturate(180%);
  -webkit-backdrop-filter: blur(24px) saturate(180%);
  border-bottom: 1px solid rgba(99, 102, 241, 0.25);
  box-shadow:
    0 4px 16px rgba(0, 0, 0, 0.2),
    inset 0 -1px 0 rgba(165, 180, 252, 0.1);
}

/* Card grid depth */
[data-theme="glassmorphic"] .card-grid > * {
  position: relative;
  z-index: 1;
}

[data-theme="glassmorphic"] .card-grid > *::before {
  content: '';
  position: absolute;
  inset: -1px;
  background: linear-gradient(135deg,
    rgba(255, 255, 255, 0.8) 0%,
    rgba(255, 255, 255, 0.4) 100%
  );
  border-radius: inherit;
  z-index: -1;
  opacity: 0;
  transition: opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

[data-theme="glassmorphic"].dark .card-grid > *::before {
  background: linear-gradient(135deg,
    rgba(165, 180, 252, 0.15) 0%,
    rgba(99, 102, 241, 0.08) 100%
  );
}

[data-theme="glassmorphic"] .card-grid > *:hover::before {
  opacity: 1;
}

/* Animated gradient backgrounds */
@keyframes glass-shimmer {
  0%, 100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}

[data-theme="glassmorphic"] .shimmer {
  background-size: 200% 200%;
  animation: glass-shimmer 8s ease-in-out infinite;
}

/* Ultra-smooth animations */
[data-theme="glassmorphic"] * {
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

/* Depth layering */
[data-theme="glassmorphic"] .layer-1 { z-index: 1; }
[data-theme="glassmorphic"] .layer-2 { z-index: 2; }
[data-theme="glassmorphic"] .layer-3 { z-index: 3; }

/* 3D perspective enhancements */
[data-theme="glassmorphic"] .perspective-container {
  perspective: 2000px;
  perspective-origin: center;
}

/* Loading states */
[data-theme="glassmorphic"] .loading,
[data-theme="glassmorphic"] .skeleton {
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0.25) 25%,
    rgba(255, 255, 255, 0.45) 50%,
    rgba(255, 255, 255, 0.25) 75%
  );
  background-size: 200% 100%;
  animation: loading-shimmer 2s ease-in-out infinite;
}

[data-theme="glassmorphic"].dark .loading,
[data-theme="glassmorphic"].dark .skeleton {
  background: linear-gradient(
    90deg,
    rgba(28, 28, 35, 0.45) 25%,
    rgba(38, 38, 48, 0.65) 50%,
    rgba(28, 28, 35, 0.45) 75%
  );
  background-size: 200% 100%;
  animation: loading-shimmer 2s ease-in-out infinite;
}

@keyframes loading-shimmer {
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
}

/* Premium feel - reduce motion for accessibility */
@media (prefers-reduced-motion: reduce) {
  [data-theme="glassmorphic"] *,
  [data-theme="glassmorphic"] .shimmer {
    animation: none !important;
    transition: none !important;
  }
}
`,
};
