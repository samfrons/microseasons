'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { vibes, Vibe } from '@/data/vibes';
import { useCalendarStore } from '@/store/useCalendarStore';
import clsx from 'clsx';

interface VibeSelectorProps {
  onVibeSelect: (vibe: Vibe) => void;
}

export const VibeSelector = ({ onVibeSelect }: VibeSelectorProps) => {
  const { darkMode } = useCalendarStore();
  const [selectedVibe, setSelectedVibe] = useState<Vibe | null>(null);
  const [hoveredVibe, setHoveredVibe] = useState<string | null>(null);

  const handleVibeClick = (vibe: Vibe) => {
    setSelectedVibe(vibe);
    onVibeSelect(vibe);
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="text-center mb-8">
        <h3 className={clsx('text-2xl font-light mb-2', darkMode ? 'text-washi-100' : 'text-sumi-900')}>
          Choose Your Vibe
        </h3>
        <p className={clsx('text-sm', darkMode ? 'text-washi-400' : 'text-sumi-600')}>
          Select the tone that resonates with how you want to experience the seasons
        </p>
      </div>

      {/* Vibe Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {vibes.map((vibe, index) => {
          const isSelected = selectedVibe?.id === vibe.id;
          const isHovered = hoveredVibe === vibe.id;

          return (
            <motion.button
              key={vibe.id}
              onClick={() => handleVibeClick(vibe)}
              onMouseEnter={() => setHoveredVibe(vibe.id)}
              onMouseLeave={() => setHoveredVibe(null)}
              className={clsx(
                'group relative p-6 rounded-2xl text-left transition-all duration-300 overflow-hidden',
                isSelected
                  ? 'ring-2 ring-amber-500/50 shadow-lg'
                  : 'ring-1',
                darkMode
                  ? isSelected
                    ? 'bg-sumi-700 ring-amber-500/50'
                    : 'bg-sumi-700/50 ring-washi-800 hover:bg-sumi-700'
                  : isSelected
                  ? 'bg-white ring-amber-500/30 shadow-xl'
                  : 'bg-white ring-sumi-200 hover:ring-sumi-300 hover:shadow-md'
              )}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, duration: 0.3 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Color gradient background */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300"
                style={{
                  background: `linear-gradient(135deg, ${vibe.colorPalette[0]}, ${vibe.colorPalette[1]})`,
                }}
              />

              {/* Content */}
              <div className="relative z-10">
                {/* Emoji and Name */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="text-3xl">{vibe.emoji}</div>
                    <div>
                      <div
                        className={clsx(
                          'font-medium text-base',
                          darkMode ? 'text-washi-100' : 'text-sumi-900'
                        )}
                      >
                        {vibe.name}
                      </div>
                    </div>
                  </div>
                  {isSelected && (
                    <div className="text-amber-500 text-xl">✓</div>
                  )}
                </div>

                {/* Description */}
                <p
                  className={clsx(
                    'text-sm mb-4 leading-relaxed',
                    darkMode ? 'text-washi-300' : 'text-sumi-600'
                  )}
                >
                  {vibe.description}
                </p>

                {/* Keywords */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {vibe.keywords.slice(0, 3).map((keyword, i) => (
                    <span
                      key={i}
                      className={clsx(
                        'text-xs px-2 py-1 rounded-full',
                        darkMode
                          ? 'bg-washi-800/50 text-washi-300'
                          : 'bg-sumi-100 text-sumi-700'
                      )}
                    >
                      {keyword}
                    </span>
                  ))}
                </div>

                {/* Focus Areas (visible on hover or select) */}
                {(isHovered || isSelected) && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-2 pt-4 border-t border-current opacity-10"
                  >
                    <div className={clsx('text-xs font-medium mb-2', darkMode ? 'text-washi-400' : 'text-sumi-600')}>
                      Focus Areas:
                    </div>
                    {Object.entries(vibe.focusAreas)
                      .sort((a, b) => b[1] - a[1])
                      .slice(0, 3)
                      .map(([area, weight]) => (
                        <div key={area} className="flex items-center gap-2">
                          <div className="flex-1 h-1.5 bg-black/10 dark:bg-white/10 rounded-full overflow-hidden">
                            <motion.div
                              className="h-full rounded-full"
                              style={{
                                background: `linear-gradient(90deg, ${vibe.colorPalette[0]}, ${vibe.colorPalette[1]})`,
                              }}
                              initial={{ width: 0 }}
                              animate={{ width: `${weight * 100}%` }}
                              transition={{ duration: 0.6, delay: 0.1 }}
                            />
                          </div>
                          <span className={clsx('text-xs capitalize w-20', darkMode ? 'text-washi-400' : 'text-sumi-600')}>
                            {area}
                          </span>
                        </div>
                      ))}
                  </motion.div>
                )}

                {/* Color palette preview */}
                <div className="flex gap-1 mt-4">
                  {vibe.colorPalette.slice(0, 4).map((color, i) => (
                    <div
                      key={i}
                      className="w-6 h-6 rounded-full ring-1 ring-black/10 dark:ring-white/10"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Selected Vibe Summary */}
      {selectedVibe && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={clsx(
            'p-6 rounded-xl',
            darkMode
              ? 'bg-gradient-to-br from-amber-500/10 to-amber-500/5 border border-amber-500/20'
              : 'bg-gradient-to-br from-amber-50 to-amber-100/50 border border-amber-200'
          )}
          style={{
            backgroundImage: `linear-gradient(135deg, ${selectedVibe.colorPalette[0]}10, ${selectedVibe.colorPalette[1]}10)`,
          }}
        >
          <div className="flex items-center gap-3">
            <div className="text-3xl">{selectedVibe.emoji}</div>
            <div>
              <div className={clsx('font-medium', darkMode ? 'text-washi-100' : 'text-sumi-900')}>
                Selected Vibe: {selectedVibe.name}
              </div>
              <div className={clsx('text-sm', darkMode ? 'text-washi-400' : 'text-sumi-600')}>
                {selectedVibe.toneAdjectives.slice(0, 3).join(' • ')}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};
