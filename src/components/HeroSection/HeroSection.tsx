'use client';

import { motion } from 'framer-motion';
import { Scene } from '../Calendar3D/Scene';
import { CustomizationPanel } from '../CustomizationPanel/CustomizationPanel';
import { useCalendarStore } from '@/store/useCalendarStore';
import { getCurrentMicroseason } from '@/data/microseasons';
import clsx from 'clsx';

export function HeroSection() {
  const { darkMode } = useCalendarStore();
  const currentMicroseason = getCurrentMicroseason();

  return (
    <section
      className={clsx(
        'min-h-screen relative overflow-hidden transition-colors duration-500',
        darkMode
          ? 'bg-gradient-to-b from-sumi-950 via-sumi-900 to-sumi-800'
          : 'bg-gradient-to-b from-washi-50 via-white to-washi-100'
      )}
    >
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-30">
        <div
          className={clsx(
            'absolute top-20 right-20 w-96 h-96 rounded-full blur-3xl',
            darkMode ? 'bg-sakura-900/30' : 'bg-sakura-200/40'
          )}
        />
        <div
          className={clsx(
            'absolute bottom-20 left-20 w-96 h-96 rounded-full blur-3xl',
            darkMode ? 'bg-sumi-800/30' : 'bg-washi-300/40'
          )}
        />
      </div>

      <div className="container mx-auto px-6 lg:px-12 py-12 relative z-10">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex justify-between items-center mb-12"
        >
          <div>
            <h1
              className={clsx(
                'text-4xl lg:text-5xl font-light tracking-tight mb-2',
                darkMode ? 'text-washi-50' : 'text-sumi-900'
              )}
            >
              Microseasons
            </h1>
            <p
              className={clsx(
                'text-sm tracking-widest uppercase',
                darkMode ? 'text-washi-400' : 'text-sumi-500'
              )}
            >
              七十二候 Calendar
            </p>
          </div>
        </motion.header>

        {/* Main content grid */}
        <div className="grid lg:grid-cols-[1fr,400px] gap-8 lg:gap-12 items-start">
          {/* Left column: 3D Calendar */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div
                className={clsx(
                  'rounded-2xl overflow-hidden border backdrop-blur-sm',
                  darkMode
                    ? 'bg-sumi-900/50 border-sumi-700'
                    : 'bg-white/50 border-washi-200'
                )}
              >
                <div className="aspect-[4/3] lg:aspect-[16/10]">
                  <Scene />
                </div>
              </div>
            </motion.div>

            {/* Current microseason info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className={clsx(
                'rounded-2xl p-8 border backdrop-blur-md',
                darkMode
                  ? 'bg-sumi-900/80 border-sumi-700'
                  : 'bg-white/80 border-washi-200'
              )}
            >
              <div className="flex items-start justify-between mb-6">
                <div>
                  <p
                    className={clsx(
                      'text-xs uppercase tracking-widest mb-3',
                      darkMode ? 'text-washi-400' : 'text-sumi-500'
                    )}
                  >
                    Current Microseason
                  </p>
                  <h2
                    className={clsx(
                      'text-3xl lg:text-4xl font-light mb-2 tracking-wide',
                      darkMode ? 'text-washi-50' : 'text-sumi-900'
                    )}
                  >
                    {currentMicroseason.nameJa}
                  </h2>
                  <p
                    className={clsx(
                      'text-xl',
                      darkMode ? 'text-washi-300' : 'text-sumi-600'
                    )}
                  >
                    {currentMicroseason.nameEn}
                  </p>
                </div>
                <div
                  className={clsx(
                    'px-4 py-2 rounded-full text-xs font-medium',
                    darkMode
                      ? 'bg-sakura-500/20 text-sakura-300'
                      : 'bg-sakura-100 text-sakura-700'
                  )}
                >
                  {currentMicroseason.solarTerm}
                </div>
              </div>

              <p
                className={clsx(
                  'text-lg leading-relaxed',
                  darkMode ? 'text-washi-300' : 'text-sumi-600'
                )}
              >
                {currentMicroseason.description}
              </p>

              {/* Color swatches */}
              <div className="flex gap-3 mt-6">
                {currentMicroseason.colors.map((color, i) => (
                  <div
                    key={i}
                    className="w-12 h-12 rounded-lg shadow-md border-2 border-white/30"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right column: Customization panel */}
          <div className="lg:sticky lg:top-6">
            <CustomizationPanel />
          </div>
        </div>
      </div>
    </section>
  );
}
