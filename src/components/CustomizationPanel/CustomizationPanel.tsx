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
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className={clsx(
        'rounded-2xl p-8 backdrop-blur-md',
        'border transition-colors duration-300',
        darkMode
          ? 'bg-sumi-900/80 border-sumi-700'
          : 'bg-white/80 border-washi-200'
      )}
    >
      <h2
        className={clsx(
          'text-2xl font-light mb-6 tracking-wide',
          darkMode ? 'text-washi-50' : 'text-sumi-900'
        )}
      >
        Customize
      </h2>

      {/* Material Selection */}
      <section className="mb-8">
        <h3
          className={clsx(
            'text-sm uppercase tracking-widest mb-4 font-medium',
            darkMode ? 'text-washi-300' : 'text-sumi-600'
          )}
        >
          Material
        </h3>
        <div className="grid grid-cols-2 gap-3">
          {materials.map((mat) => (
            <button
              key={mat.value}
              onClick={() => setMaterial(mat.value)}
              className={clsx(
                'p-4 rounded-xl border-2 transition-all duration-300',
                'hover:scale-105 active:scale-95',
                material === mat.value
                  ? darkMode
                    ? 'border-sakura-400 bg-sakura-400/10'
                    : 'border-sumi-700 bg-sumi-50'
                  : darkMode
                  ? 'border-sumi-700 hover:border-sumi-600'
                  : 'border-washi-200 hover:border-washi-300'
              )}
            >
              <div
                className={clsx(
                  'text-left',
                  darkMode ? 'text-washi-100' : 'text-sumi-800'
                )}
              >
                <div className="font-medium mb-1">{mat.label}</div>
                <div
                  className={clsx(
                    'text-xs',
                    darkMode ? 'text-washi-400' : 'text-sumi-500'
                  )}
                >
                  {mat.description}
                </div>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Color Palette */}
      <section className="mb-8">
        <h3
          className={clsx(
            'text-sm uppercase tracking-widest mb-4 font-medium',
            darkMode ? 'text-washi-300' : 'text-sumi-600'
          )}
        >
          Color Palette
        </h3>
        <div className="space-y-3">
          {palettes.map((palette) => (
            <button
              key={palette.value}
              onClick={() => setColorPalette(palette.value)}
              className={clsx(
                'w-full p-3 rounded-xl border-2 transition-all duration-300',
                'hover:scale-102 active:scale-98',
                'flex items-center justify-between',
                colorPalette === palette.value
                  ? darkMode
                    ? 'border-sakura-400 bg-sakura-400/10'
                    : 'border-sumi-700 bg-sumi-50'
                  : darkMode
                  ? 'border-sumi-700 hover:border-sumi-600'
                  : 'border-washi-200 hover:border-washi-300'
              )}
            >
              <span
                className={clsx(
                  'font-medium',
                  darkMode ? 'text-washi-100' : 'text-sumi-800'
                )}
              >
                {palette.label}
              </span>
              <div className="flex gap-2">
                {palette.colors.map((color, i) => (
                  <div
                    key={i}
                    className="w-6 h-6 rounded-full border-2 border-white/50"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Display Mode */}
      <section className="mb-8">
        <h3
          className={clsx(
            'text-sm uppercase tracking-widest mb-4 font-medium',
            darkMode ? 'text-washi-300' : 'text-sumi-600'
          )}
        >
          Display Mode
        </h3>
        <div className="space-y-3">
          {displayModes.map((mode) => (
            <button
              key={mode.value}
              onClick={() => setDisplayMode(mode.value)}
              className={clsx(
                'w-full p-4 rounded-xl border-2 transition-all duration-300',
                'hover:scale-102 active:scale-98 text-left',
                displayMode === mode.value
                  ? darkMode
                    ? 'border-sakura-400 bg-sakura-400/10'
                    : 'border-sumi-700 bg-sumi-50'
                  : darkMode
                  ? 'border-sumi-700 hover:border-sumi-600'
                  : 'border-washi-200 hover:border-washi-300'
              )}
            >
              <div
                className={clsx(
                  'font-medium mb-1',
                  darkMode ? 'text-washi-100' : 'text-sumi-800'
                )}
              >
                {mode.label}
              </div>
              <div
                className={clsx(
                  'text-sm',
                  darkMode ? 'text-washi-400' : 'text-sumi-500'
                )}
              >
                {mode.description}
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Toggle Controls */}
      <section className="space-y-4">
        <ToggleControl
          label="Auto Rotate"
          checked={autoRotate}
          onChange={setAutoRotate}
          darkMode={darkMode}
        />
        <ToggleControl
          label="Dark Mode"
          checked={darkMode}
          onChange={toggleDarkMode}
          darkMode={darkMode}
        />
      </section>
    </motion.div>
  );
}

interface ToggleControlProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  darkMode: boolean;
}

function ToggleControl({ label, checked, onChange, darkMode }: ToggleControlProps) {
  return (
    <button
      onClick={() => onChange(!checked)}
      className={clsx(
        'w-full flex items-center justify-between p-4 rounded-xl',
        'border-2 transition-all duration-300 hover:scale-102',
        darkMode
          ? 'border-sumi-700 hover:border-sumi-600'
          : 'border-washi-200 hover:border-washi-300'
      )}
    >
      <span
        className={clsx(
          'font-medium',
          darkMode ? 'text-washi-100' : 'text-sumi-800'
        )}
      >
        {label}
      </span>
      <div
        className={clsx(
          'relative w-14 h-7 rounded-full transition-colors duration-300',
          checked
            ? 'bg-sakura-500'
            : darkMode
            ? 'bg-sumi-700'
            : 'bg-washi-300'
        )}
      >
        <motion.div
          className="absolute top-1 left-1 w-5 h-5 bg-white rounded-full shadow-md"
          animate={{ x: checked ? 26 : 0 }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        />
      </div>
    </button>
  );
}
