'use client';

import { motion } from 'framer-motion';
import { useLEDStore, LEDColor } from '@/store/useLEDStore';
import { useCalendarStore } from '@/store/useCalendarStore';
import { useState } from 'react';
import clsx from 'clsx';

const LED_COLORS: { color: LEDColor; label: string; bg: string }[] = [
  { color: 'green', label: 'Green', bg: 'bg-green-500' },
  { color: 'blue', label: 'Blue', bg: 'bg-blue-500' },
  { color: 'amber', label: 'Amber', bg: 'bg-amber-500' },
  { color: 'red', label: 'Red', bg: 'bg-red-500' },
  { color: 'purple', label: 'Purple', bg: 'bg-purple-500' },
  { color: 'pink', label: 'Pink', bg: 'bg-pink-500' },
];

export const LEDControls = () => {
  const { darkMode } = useCalendarStore();
  const { activeColor, setActiveColor, categories, getStats, clearAllLEDs, exportData, importData } = useLEDStore();
  const [showStats, setShowStats] = useState(false);
  const [showImportExport, setShowImportExport] = useState(false);

  const stats = getStats();

  const handleExport = () => {
    const data = exportData();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `microseasons-tracking-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const data = event.target?.result as string;
      importData(data);
    };
    reader.readAsText(file);
  };

  return (
    <div className="space-y-6">
      {/* Color Picker */}
      <div>
        <h3 className={clsx('text-lg font-medium mb-4', darkMode ? 'text-washi-100' : 'text-sumi-900')}>
          Active Color
        </h3>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
          {LED_COLORS.map(({ color, label, bg }) => (
            <motion.button
              key={color}
              onClick={() => setActiveColor(color)}
              className={clsx(
                'relative p-4 rounded-xl transition-all duration-200',
                activeColor === color
                  ? 'ring-2 ring-offset-2 scale-105'
                  : 'hover:scale-105',
                darkMode ? 'ring-offset-sumi-900' : 'ring-offset-white',
                bg
              )}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="flex flex-col items-center gap-2">
                <div className={clsx('w-8 h-8 rounded-full', bg, 'shadow-lg')} />
                <span className="text-xs font-medium text-white">{label}</span>
              </div>
              {activeColor === color && (
                <motion.div
                  className="absolute -top-1 -right-1 w-5 h-5 bg-white rounded-full flex items-center justify-center"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                >
                  <span className="text-xs">✓</span>
                </motion.div>
              )}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Categories */}
      <div>
        <h3 className={clsx('text-lg font-medium mb-4', darkMode ? 'text-washi-100' : 'text-sumi-900')}>
          Quick Categories
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {Object.entries(categories).map(([id, category]) => {
            const colorStyle = LED_COLORS.find(c => c.color === category.color);
            return (
              <button
                key={id}
                onClick={() => setActiveColor(category.color)}
                className={clsx(
                  'p-4 rounded-xl text-left transition-all duration-200',
                  'hover:scale-102',
                  activeColor === category.color
                    ? darkMode
                      ? 'bg-sumi-700 ring-2 ring-washi-600'
                      : 'bg-white ring-2 ring-sumi-300 shadow-lg'
                    : darkMode
                    ? 'bg-sumi-700/50 hover:bg-sumi-700'
                    : 'bg-white/50 hover:bg-white hover:shadow-md'
                )}
              >
                <div className="flex items-center gap-3">
                  <div className={clsx('w-4 h-4 rounded-full', colorStyle?.bg)} />
                  <div>
                    <div className={clsx('text-sm font-medium', darkMode ? 'text-washi-100' : 'text-sumi-900')}>
                      {category.name}
                    </div>
                    <div className={clsx('text-xs', darkMode ? 'text-washi-400' : 'text-sumi-500')}>
                      {category.description}
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Stats Toggle */}
      <div>
        <button
          onClick={() => setShowStats(!showStats)}
          className={clsx(
            'w-full p-4 rounded-xl text-left transition-all duration-200',
            darkMode
              ? 'bg-sumi-700 hover:bg-sumi-600'
              : 'bg-white hover:shadow-md'
          )}
        >
          <div className="flex items-center justify-between">
            <span className={clsx('font-medium', darkMode ? 'text-washi-100' : 'text-sumi-900')}>
              📊 Statistics
            </span>
            <span className={clsx('text-sm', darkMode ? 'text-washi-400' : 'text-sumi-600')}>
              {showStats ? '▼' : '▶'}
            </span>
          </div>
        </button>

        {showStats && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className={clsx(
              'mt-4 p-6 rounded-xl',
              darkMode
                ? 'bg-sumi-700/50'
                : 'bg-white/50'
            )}
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="text-center">
                <div className={clsx('text-3xl font-bold', darkMode ? 'text-amber-400' : 'text-amber-600')}>
                  {stats.totalDaysMarked}
                </div>
                <div className={clsx('text-sm', darkMode ? 'text-washi-400' : 'text-sumi-600')}>
                  Days Marked
                </div>
              </div>
              <div className="text-center">
                <div className={clsx('text-3xl font-bold', darkMode ? 'text-green-400' : 'text-green-600')}>
                  {stats.currentStreak}
                </div>
                <div className={clsx('text-sm', darkMode ? 'text-washi-400' : 'text-sumi-600')}>
                  Current Streak
                </div>
              </div>
              <div className="text-center">
                <div className={clsx('text-3xl font-bold', darkMode ? 'text-blue-400' : 'text-blue-600')}>
                  {stats.longestStreak}
                </div>
                <div className={clsx('text-sm', darkMode ? 'text-washi-400' : 'text-sumi-600')}>
                  Longest Streak
                </div>
              </div>
              <div className="text-center">
                <div className={clsx('text-3xl font-bold', darkMode ? 'text-purple-400' : 'text-purple-600')}>
                  {Math.round((stats.totalDaysMarked / 365) * 100)}%
                </div>
                <div className={clsx('text-sm', darkMode ? 'text-washi-400' : 'text-sumi-600')}>
                  Year Complete
                </div>
              </div>
            </div>

            {/* Color breakdown */}
            <div className="space-y-2">
              {LED_COLORS.map(({ color, label, bg }) => {
                const count = stats.colorCounts[color];
                if (count === 0) return null;

                const percentage = (count / stats.totalDaysMarked) * 100;

                return (
                  <div key={color} className="flex items-center gap-3">
                    <div className={clsx('w-4 h-4 rounded-full', bg)} />
                    <div className="flex-1">
                      <div className="flex justify-between text-sm mb-1">
                        <span className={darkMode ? 'text-washi-300' : 'text-sumi-700'}>{label}</span>
                        <span className={darkMode ? 'text-washi-400' : 'text-sumi-600'}>
                          {count} days ({percentage.toFixed(1)}%)
                        </span>
                      </div>
                      <div className={clsx('h-2 rounded-full', darkMode ? 'bg-sumi-800' : 'bg-sumi-200')}>
                        <div
                          className={clsx('h-full rounded-full', bg)}
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </div>

      {/* Import/Export */}
      <div>
        <button
          onClick={() => setShowImportExport(!showImportExport)}
          className={clsx(
            'w-full p-4 rounded-xl text-left transition-all duration-200',
            darkMode
              ? 'bg-sumi-700 hover:bg-sumi-600'
              : 'bg-white hover:shadow-md'
          )}
        >
          <div className="flex items-center justify-between">
            <span className={clsx('font-medium', darkMode ? 'text-washi-100' : 'text-sumi-900')}>
              💾 Backup & Restore
            </span>
            <span className={clsx('text-sm', darkMode ? 'text-washi-400' : 'text-sumi-600')}>
              {showImportExport ? '▼' : '▶'}
            </span>
          </div>
        </button>

        {showImportExport && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className={clsx(
              'mt-4 p-6 rounded-xl space-y-4',
              darkMode ? 'bg-sumi-700/50' : 'bg-white/50'
            )}
          >
            <button
              onClick={handleExport}
              className={clsx(
                'w-full px-4 py-3 rounded-lg font-medium transition-all duration-200',
                darkMode
                  ? 'bg-blue-500/20 text-blue-300 hover:bg-blue-500/30'
                  : 'bg-blue-500 text-white hover:bg-blue-600'
              )}
            >
              Export Data
            </button>

            <div>
              <label
                className={clsx(
                  'block w-full px-4 py-3 rounded-lg font-medium cursor-pointer text-center transition-all duration-200',
                  darkMode
                    ? 'bg-green-500/20 text-green-300 hover:bg-green-500/30'
                    : 'bg-green-500 text-white hover:bg-green-600'
                )}
              >
                Import Data
                <input
                  type="file"
                  accept=".json"
                  onChange={handleImport}
                  className="hidden"
                />
              </label>
            </div>

            <button
              onClick={() => {
                if (confirm('Are you sure you want to clear all LED data? This cannot be undone.')) {
                  clearAllLEDs();
                }
              }}
              className={clsx(
                'w-full px-4 py-3 rounded-lg font-medium transition-all duration-200',
                darkMode
                  ? 'bg-red-500/20 text-red-300 hover:bg-red-500/30'
                  : 'bg-red-500 text-white hover:bg-red-600'
              )}
            >
              Clear All Data
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};
