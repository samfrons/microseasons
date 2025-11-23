'use client';

import { motion } from 'framer-motion';
import { useCalendarStore, MaterialType, ColorPalette, DisplayMode } from '@/store/useCalendarStore';
import clsx from 'clsx';

const materials: { value: MaterialType; label: string; description: string }[] = [
  { value: 'wood', label: 'Wood', description: 'Warm, natural grain' },
  { value: 'paper', label: 'Washi Paper', description: 'Soft, traditional texture' },
  { value: 'metal', label: 'Metal', description: 'Sleek, modern finish' },
  { value: 'ceramic', label: 'Ceramic', description: 'Smooth, elegant surface' },
];

const palettes: { value: ColorPalette; label: string; colors: string[] }[] = [
  { value: 'natural', label: 'Natural', colors: ['#8b6f47', '#78716c', '#a8a29e'] },
  { value: 'sakura', label: 'Sakura', colors: ['#FFB8C8', '#FFC8D8', '#FFD8E8'] },
  { value: 'sumi', label: 'Sumi Ink', colors: ['#212529', '#495057', '#868e96'] },
  { value: 'seasonal', label: 'Seasonal', colors: ['#FFD8E8', '#A8D890', '#F8B878'] },
];

const displayModes: { value: DisplayMode; label: string; description: string }[] = [
  {
    value: 'microseason-primary',
    label: 'Microseason Focus',
    description: 'Emphasize Japanese microseasons',
  },
  {
    value: 'western-primary',
    label: 'Western Focus',
    description: 'Emphasize Western calendar dates',
  },
  {
    value: 'balanced',
    label: 'Balanced',
    description: 'Equal emphasis on both systems',
  },
  {
    value: 'minimal',
    label: 'Minimal',
    description: 'Clean, simplified view',
  },
];

export function CustomizationPanel() {
  const {
    material,
    colorPalette,
    displayMode,
    darkMode,
    autoRotate,
    setMaterial,
    setColorPalette,
    setDisplayMode,
    toggleDarkMode,
    setAutoRotate,
  } = useCalendarStore();

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="p-8 lg:p-12 border transition-all duration-700"
      style={{
        backgroundColor: 'var(--color-bgSecondary)',
        borderColor: 'var(--color-border)',
        borderRadius: '16px',
        boxShadow: '0 4px 24px var(--color-shadow)',
      }}
    >
      {/* Section header with handwritten accent */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-4">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            className="opacity-40"
            style={{ transform: 'rotate(8deg)' }}
          >
            <circle
              cx="12"
              cy="12"
              r="10"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeDasharray="1 3"
              style={{ color: 'var(--color-accent)' }}
            />
          </svg>
          <h2
            className="text-3xl lg:text-4xl font-serif tracking-tight"
            style={{
              color: 'var(--color-textPrimary)',
              letterSpacing: '-0.01em',
            }}
          >
            Personalize
          </h2>
        </div>
        <p
          className="text-sm font-serif italic"
          style={{ color: 'var(--color-textSecondary)' }}
        >
          Craft your perfect microseasons experience
        </p>
      </div>

      {/* Material Selection */}
      <section className="mb-10">
        <h3
          className="text-xs font-mono uppercase tracking-[0.2em] mb-5 opacity-60"
          style={{ color: 'var(--color-textSecondary)' }}
        >
          Material
        </h3>
        <div className="grid grid-cols-2 gap-3">
          {materials.map((mat) => (
            <button
              key={mat.value}
              onClick={() => setMaterial(mat.value)}
              className="p-4 rounded-lg border transition-all duration-300 text-left group hover-lift"
              style={{
                backgroundColor: material === mat.value ? 'var(--color-blush)' : 'var(--color-bgPrimary)',
                borderColor: material === mat.value ? 'var(--color-accent)' : 'var(--color-border)',
                borderWidth: material === mat.value ? '2px' : '1px',
              }}
            >
              <div className="font-medium mb-1 text-sm" style={{ color: 'var(--color-textPrimary)' }}>
                {mat.label}
              </div>
              <div
                className="text-xs opacity-70"
                style={{ color: 'var(--color-textSecondary)' }}
              >
                {mat.description}
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Color Palette */}
      <section className="mb-10">
        <h3
          className="text-xs font-mono uppercase tracking-[0.2em] mb-5 opacity-60"
          style={{ color: 'var(--color-textSecondary)' }}
        >
          Color Palette
        </h3>
        <div className="space-y-3">
          {palettes.map((palette) => (
            <button
              key={palette.value}
              onClick={() => setColorPalette(palette.value)}
              className="w-full p-4 rounded-lg border transition-all duration-300 flex items-center justify-between hover-lift"
              style={{
                backgroundColor: colorPalette === palette.value ? 'var(--color-blush)' : 'var(--color-bgPrimary)',
                borderColor: colorPalette === palette.value ? 'var(--color-accent)' : 'var(--color-border)',
                borderWidth: colorPalette === palette.value ? '2px' : '1px',
              }}
            >
              <span className="font-medium text-sm" style={{ color: 'var(--color-textPrimary)' }}>
                {palette.label}
              </span>
              <div className="flex gap-2">
                {palette.colors.map((color, i) => (
                  <div
                    key={i}
                    className="w-6 h-6 rounded-full transition-transform duration-300 hover:scale-110"
                    style={{
                      backgroundColor: color,
                      boxShadow: `0 2px 8px ${color}30`,
                    }}
                  />
                ))}
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Display Mode */}
      <section className="mb-10">
        <h3
          className="text-xs font-mono uppercase tracking-[0.2em] mb-5 opacity-60"
          style={{ color: 'var(--color-textSecondary)' }}
        >
          Display Mode
        </h3>
        <div className="space-y-3">
          {displayModes.map((mode) => (
            <button
              key={mode.value}
              onClick={() => setDisplayMode(mode.value)}
              className="w-full p-4 rounded-lg border transition-all duration-300 text-left hover-lift"
              style={{
                backgroundColor: displayMode === mode.value ? 'var(--color-blush)' : 'var(--color-bgPrimary)',
                borderColor: displayMode === mode.value ? 'var(--color-accent)' : 'var(--color-border)',
                borderWidth: displayMode === mode.value ? '2px' : '1px',
              }}
            >
              <div className="font-medium mb-1 text-sm" style={{ color: 'var(--color-textPrimary)' }}>
                {mode.label}
              </div>
              <div
                className="text-xs opacity-70"
                style={{ color: 'var(--color-textSecondary)' }}
              >
                {mode.description}
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Toggle Controls - elegant minimal design */}
      <section className="space-y-3 pt-4 border-t" style={{ borderColor: 'var(--color-borderSubtle)' }}>
        <ToggleControl
          label="Auto Rotate"
          checked={autoRotate}
          onChange={setAutoRotate}
        />
        <ToggleControl
          label="Dark Mode"
          checked={darkMode}
          onChange={toggleDarkMode}
        />
      </section>
    </motion.div>
  );
}

interface ToggleControlProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

function ToggleControl({ label, checked, onChange }: ToggleControlProps) {
  return (
    <button
      onClick={() => onChange(!checked)}
      className="w-full flex items-center justify-between p-4 rounded-lg border transition-all duration-300"
      style={{
        backgroundColor: 'var(--color-bgPrimary)',
        borderColor: 'var(--color-border)',
      }}
    >
      <span className="font-medium text-sm" style={{ color: 'var(--color-textPrimary)' }}>
        {label}
      </span>
      <div
        className="relative w-12 h-6 rounded-full transition-all duration-300"
        style={{
          backgroundColor: checked ? 'var(--color-accent)' : 'var(--color-border)',
        }}
      >
        <motion.div
          className="absolute top-1 left-1 w-4 h-4 rounded-full shadow-sm"
          style={{ backgroundColor: 'var(--color-bgPrimary)' }}
          animate={{ x: checked ? 24 : 0 }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        />
      </div>
    </button>
  );
}
