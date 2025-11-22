'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { useTheme } from '@/hooks/useTheme';
import type { ThemeId } from '@/types/theme';
import clsx from 'clsx';

/**
 * Theme Switcher Component
 * Performant theme picker with visual previews
 */

const themeIcons: Record<ThemeId, string> = {
  brutalist: '▓',
  organic: '🌿',
  cyberpunk: '⚡',
  japanese: '🌸',
  artdeco: '◆',
  glassmorphic: '◇',
};

const themeDescriptions: Record<ThemeId, string> = {
  brutalist: 'Raw concrete & bold typography',
  organic: 'Warm earth tones & natural textures',
  cyberpunk: 'Neon glow & futuristic aesthetic',
  japanese: 'Minimal elegance & subtle beauty',
  artdeco: 'Geometric luxury & golden glamour',
  glassmorphic: 'Frosted glass & modern depth',
};

export function ThemeSwitcher() {
  const { currentTheme, switchTheme, availableThemes, selectedTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const handleThemeChange = (themeId: ThemeId) => {
    switchTheme(themeId);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      {/* Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className={clsx(
          'flex items-center gap-2 px-4 py-2 rounded-xl',
          'bg-washi-100 dark:bg-sumi-800',
          'border border-washi-200 dark:border-sumi-700',
          'text-sumi-900 dark:text-washi-50',
          'hover:bg-washi-200 dark:hover:bg-sumi-700',
          'transition-all duration-300',
          'focus:outline-none focus:ring-2 focus:ring-sakura-400'
        )}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        aria-label="Theme switcher"
        aria-expanded={isOpen}
      >
        <span className="text-lg" aria-hidden="true">
          {themeIcons[selectedTheme]}
        </span>
        <span className="text-sm font-medium hidden sm:inline">
          {currentTheme.name}
        </span>
        <motion.svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          className="ml-1"
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <path
            d="M2 4L6 8L10 4"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </motion.svg>
      </motion.button>

      {/* Theme Picker Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            {/* Dropdown Menu */}
            <motion.div
              className={clsx(
                'absolute right-0 mt-2 z-50',
                'w-80 sm:w-96',
                'bg-washi-50 dark:bg-sumi-900',
                'border border-washi-200 dark:border-sumi-700',
                'rounded-2xl shadow-2xl',
                'backdrop-blur-md',
                'overflow-hidden'
              )}
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="p-4">
                <h3 className="text-sm font-semibold text-sumi-900 dark:text-washi-50 mb-3">
                  Choose Theme
                </h3>

                <div className="grid grid-cols-1 gap-2">
                  {availableThemes.map((theme) => {
                    const isSelected = theme.id === selectedTheme;

                    return (
                      <motion.button
                        key={theme.id}
                        onClick={() => handleThemeChange(theme.id)}
                        className={clsx(
                          'group relative w-full text-left',
                          'px-4 py-3 rounded-xl',
                          'transition-all duration-200',
                          'focus:outline-none focus:ring-2 focus:ring-sakura-400',
                          isSelected
                            ? 'bg-sakura-100 dark:bg-sakura-900/30 border-2 border-sakura-400'
                            : 'bg-washi-100 dark:bg-sumi-800 border-2 border-transparent hover:border-washi-300 dark:hover:border-sumi-600'
                        )}
                        whileHover={{ scale: 1.02, x: 4 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="flex items-center gap-3">
                          {/* Theme Icon */}
                          <div
                            className={clsx(
                              'flex items-center justify-center',
                              'w-10 h-10 rounded-lg',
                              'text-xl',
                              'transition-all duration-200',
                              isSelected
                                ? 'bg-sakura-200 dark:bg-sakura-800'
                                : 'bg-washi-200 dark:bg-sumi-700 group-hover:bg-washi-300 dark:group-hover:bg-sumi-600'
                            )}
                          >
                            {themeIcons[theme.id]}
                          </div>

                          {/* Theme Info */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <span
                                className={clsx(
                                  'font-semibold text-sm',
                                  isSelected
                                    ? 'text-sakura-700 dark:text-sakura-300'
                                    : 'text-sumi-900 dark:text-washi-50'
                                )}
                              >
                                {theme.name}
                              </span>
                              {isSelected && (
                                <motion.svg
                                  width="16"
                                  height="16"
                                  viewBox="0 0 16 16"
                                  className="text-sakura-600 dark:text-sakura-400"
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                                >
                                  <path
                                    d="M13.5 4.5L6 12L2.5 8.5"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </motion.svg>
                              )}
                            </div>
                            <p
                              className={clsx(
                                'text-xs mt-0.5',
                                isSelected
                                  ? 'text-sakura-600 dark:text-sakura-400'
                                  : 'text-sumi-600 dark:text-washi-400'
                              )}
                            >
                              {themeDescriptions[theme.id]}
                            </p>
                          </div>
                        </div>

                        {/* Hover indicator */}
                        <motion.div
                          className={clsx(
                            'absolute left-0 top-0 bottom-0 w-1 rounded-r-full',
                            'bg-sakura-500'
                          )}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: isSelected ? 1 : 0 }}
                          transition={{ duration: 0.2 }}
                        />
                      </motion.button>
                    );
                  })}
                </div>
              </div>

              {/* Footer */}
              <div className="px-4 py-3 bg-washi-100 dark:bg-sumi-800 border-t border-washi-200 dark:border-sumi-700">
                <p className="text-xs text-sumi-600 dark:text-washi-400 text-center">
                  Theme preference is saved locally
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
