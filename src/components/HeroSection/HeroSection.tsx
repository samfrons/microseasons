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
      className="min-h-screen relative overflow-hidden transition-colors duration-500"
      style={{ backgroundColor: 'var(--color-bgPrimary)' }}
    >
      {/* Subtle gradient background - barely visible */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute top-0 right-0 w-[800px] h-[800px] rounded-full blur-[120px]"
          style={{ backgroundColor: 'var(--color-accent)' }}
        />
      </div>

      <div className="container mx-auto px-8 lg:px-16 py-20 relative z-10">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex justify-between items-start mb-16"
        >
          <div>
            <div className="flex items-baseline gap-4 mb-2">
              <h1
                className="text-6xl lg:text-8xl font-bold tracking-tight"
                style={{
                  color: 'var(--color-textPrimary)',
                  letterSpacing: '-0.03em',
                  lineHeight: '0.9'
                }}
              >
                Microseasons
              </h1>
              <div
                className="w-3 h-3 rounded-full animate-pulse"
                style={{
                  backgroundColor: 'var(--color-accent)',
                  boxShadow: `0 0 20px var(--color-accent), 0 0 40px var(--color-accent)`
                }}
              />
            </div>
            <p
              className="text-sm tracking-wide opacity-60 font-serif italic mb-4"
              style={{ color: 'var(--color-textSecondary)' }}
            >
              An LED-powered journey through Japanese microseasons
            </p>
            <div className="flex gap-3 items-center">
              <span
                className="text-xs px-3 py-1.5 border font-mono"
                style={{
                  borderColor: 'var(--color-border)',
                  color: 'var(--color-textSecondary)',
                  borderRadius: '2px'
                }}
              >
                七十二候
              </span>
              <span
                className="text-xs px-3 py-1.5 font-mono"
                style={{
                  backgroundColor: 'var(--color-accent)',
                  color: '#1a1816',
                  borderRadius: '2px'
                }}
              >
                LED EDITION
              </span>
            </div>
          </div>
        </motion.header>

        {/* Main content grid - generous spacing */}
        <div className="grid lg:grid-cols-[1.2fr,0.8fr] gap-12 lg:gap-20 items-start">
          {/* Left column: 3D Calendar */}
          <div className="space-y-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.4, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="relative">
                {/* LED Power Indicator */}
                <div className="absolute top-4 right-4 z-10 flex items-center gap-2 px-3 py-2 bg-black/80 backdrop-blur-sm border border-white/10">
                  <div
                    className="w-1.5 h-1.5 rounded-full animate-pulse"
                    style={{
                      backgroundColor: '#00ff00',
                      boxShadow: '0 0 10px #00ff00'
                    }}
                  />
                  <span className="text-[9px] font-mono text-white/80">
                    POWER ON
                  </span>
                </div>

                <div
                  className="overflow-hidden border-2"
                  style={{
                    backgroundColor: 'var(--color-bgSecondary)',
                    borderRadius: '2px',
                    borderColor: 'var(--color-border)',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
                  }}
                >
                  <div className="aspect-[4/3] lg:aspect-[16/10]">
                    <Scene />
                  </div>
                </div>

                {/* Tech Specs Below */}
                <div className="mt-4 flex gap-4 text-[10px] font-mono opacity-50">
                  <span style={{ color: 'var(--color-textSecondary)' }}>
                    RGB LED × 72
                  </span>
                  <span style={{ color: 'var(--color-textSecondary)' }}>
                    3D RENDERED
                  </span>
                  <span style={{ color: 'var(--color-textSecondary)' }}>
                    REAL-TIME SYNC
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Technical Specifications - LED Focus */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="p-8 border-2"
              style={{
                backgroundColor: 'var(--color-bgPrimary)',
                borderColor: 'var(--color-accent)',
                borderRadius: '2px',
                boxShadow: `0 0 40px rgba(212, 184, 150, 0.1)`
              }}
            >
              {/* LED Indicator */}
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="w-2 h-2 rounded-full animate-pulse"
                  style={{
                    backgroundColor: 'var(--color-accent)',
                    boxShadow: `0 0 10px var(--color-accent)`
                  }}
                />
                <span
                  className="text-xs font-mono uppercase tracking-wider"
                  style={{ color: 'var(--color-accent)' }}
                >
                  NOW DISPLAYING
                </span>
              </div>

              <h2
                className="text-3xl lg:text-4xl font-bold mb-2"
                style={{
                  color: 'var(--color-textPrimary)',
                  letterSpacing: '-0.02em'
                }}
              >
                {currentMicroseason.nameJa}
              </h2>
              <p
                className="text-base font-serif italic mb-6 opacity-70"
                style={{ color: 'var(--color-textSecondary)' }}
              >
                {currentMicroseason.nameEn}
              </p>

              <p
                className="text-sm leading-relaxed mb-6 opacity-80"
                style={{
                  color: 'var(--color-textSecondary)',
                  lineHeight: '1.7'
                }}
              >
                {currentMicroseason.description}
              </p>

              {/* LED Color Display */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span
                    className="text-xs font-mono opacity-50"
                    style={{ color: 'var(--color-textSecondary)' }}
                  >
                    LED COLORS:
                  </span>
                </div>
                <div className="flex gap-2">
                  {currentMicroseason.colors.map((color, i) => (
                    <div key={i} className="flex flex-col gap-2">
                      <div
                        className="w-14 h-14 relative"
                        style={{
                          backgroundColor: color,
                          borderRadius: '2px',
                          boxShadow: `0 0 20px ${color}40, inset 0 0 20px ${color}20`
                        }}
                      >
                        <div
                          className="absolute inset-0 animate-pulse"
                          style={{
                            background: `radial-gradient(circle, ${color}40 0%, transparent 70%)`,
                            borderRadius: '2px'
                          }}
                        />
                      </div>
                      <span
                        className="text-[9px] font-mono opacity-50"
                        style={{ color: 'var(--color-textSecondary)' }}
                      >
                        {color.toUpperCase()}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technical Specs */}
              <div
                className="mt-6 pt-6 border-t grid grid-cols-2 gap-4"
                style={{ borderColor: 'var(--color-border)' }}
              >
                <div>
                  <div
                    className="text-[10px] font-mono uppercase tracking-wider opacity-40 mb-1"
                    style={{ color: 'var(--color-textSecondary)' }}
                  >
                    SOLAR TERM
                  </div>
                  <div
                    className="text-sm font-mono"
                    style={{ color: 'var(--color-textPrimary)' }}
                  >
                    {currentMicroseason.solarTerm}
                  </div>
                </div>
                <div>
                  <div
                    className="text-[10px] font-mono uppercase tracking-wider opacity-40 mb-1"
                    style={{ color: 'var(--color-textSecondary)' }}
                  >
                    DURATION
                  </div>
                  <div
                    className="text-sm font-mono"
                    style={{ color: 'var(--color-textPrimary)' }}
                  >
                    ~5 DAYS
                  </div>
                </div>
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
