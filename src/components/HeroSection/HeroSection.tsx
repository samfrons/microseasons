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
      className="min-h-screen relative overflow-hidden transition-colors duration-700"
      style={{ backgroundColor: 'var(--color-bgPrimary)' }}
    >
      {/* Elegant organic shapes background */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <div
          className="absolute top-20 right-10 w-[600px] h-[600px] rounded-full blur-3xl"
          style={{ backgroundColor: 'var(--color-accent)' }}
        />
        <div
          className="absolute bottom-40 left-20 w-[400px] h-[400px] rounded-full blur-3xl"
          style={{ backgroundColor: 'var(--color-sage)' }}
        />
      </div>

      <div className="container mx-auto px-6 lg:px-20 py-16 lg:py-24 relative z-10 max-w-[1600px]">
        {/* Header - elegant and airy */}
        <motion.header
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-20 lg:mb-32"
        >
          <div className="max-w-5xl">
            {/* Small handwritten-style label */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-6 flex items-center gap-3"
            >
              <div
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: 'var(--color-accent)' }}
              />
              <span
                className="text-xs font-serif italic tracking-wide"
                style={{ color: 'var(--color-textSecondary)' }}
              >
                A contemporary celebration of
              </span>
            </motion.div>

            {/* Main title - sophisticated mix */}
            <div className="relative mb-8">
              <h1
                className="text-6xl sm:text-7xl lg:text-8xl xl:text-9xl font-bold tracking-tight leading-[0.9] mb-4"
                style={{
                  color: 'var(--color-textPrimary)',
                  letterSpacing: '-0.04em',
                }}
              >
                Microseasons
              </h1>
              {/* Handwritten-style accent */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="absolute -bottom-2 left-0 h-1 rounded-full origin-left"
                style={{
                  backgroundColor: 'var(--color-accent)',
                  width: '180px',
                  opacity: 0.5,
                }}
              />
            </div>

            {/* Japanese subtitle with organic circle */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex items-center gap-4 mb-8"
            >
              <span
                className="text-2xl lg:text-3xl font-serif"
                style={{ color: 'var(--color-textSecondary)' }}
              >
                七十二候
              </span>
              <svg
                width="40"
                height="40"
                viewBox="0 0 40 40"
                className="opacity-40"
                style={{ transform: 'rotate(-5deg)' }}
              >
                <circle
                  cx="20"
                  cy="20"
                  r="18"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeDasharray="2 4"
                  style={{ color: 'var(--color-accent)' }}
                />
              </svg>
            </motion.div>

            {/* Description - elegant typography */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-lg lg:text-xl max-w-2xl leading-relaxed font-serif"
              style={{
                color: 'var(--color-textSecondary)',
                lineHeight: '1.8',
              }}
            >
              An LED-illuminated calendar that brings the ancient Japanese system of 72 microseasons into modern spaces.
              Each season glows with its own carefully curated palette.
            </motion.p>
          </div>
        </motion.header>

        {/* Main content - elegant single column layout */}
        <div className="space-y-20 lg:space-y-32">
          {/* Featured product showcase */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            {/* Gallery-style presentation */}
            <div className="grid lg:grid-cols-[1.2fr,0.8fr] gap-8 lg:gap-16 items-start">
              {/* Calendar display - elegant frame */}
              <div className="relative group">
                {/* Subtle power indicator - refined */}
                <div className="absolute top-6 right-6 z-10 flex items-center gap-2 px-4 py-2.5 backdrop-blur-md border"
                  style={{
                    backgroundColor: 'rgba(250, 248, 245, 0.9)',
                    borderColor: 'var(--color-border)',
                    borderRadius: '100px',
                  }}
                >
                  <div
                    className="w-1.5 h-1.5 rounded-full"
                    style={{
                      backgroundColor: 'var(--color-sage)',
                      boxShadow: '0 0 8px var(--color-sage)',
                      animation: 'glow-pulse 2s ease-in-out infinite',
                    }}
                  />
                  <span className="text-[10px] font-mono tracking-wider"
                    style={{ color: 'var(--color-textSecondary)' }}
                  >
                    LIVE
                  </span>
                </div>

                {/* Main calendar frame - soft shadows and borders */}
                <div
                  className="overflow-hidden transition-all duration-500 hover-lift"
                  style={{
                    backgroundColor: 'var(--color-cream)',
                    borderRadius: '12px',
                    boxShadow: '0 8px 32px var(--color-shadow), 0 2px 8px var(--color-shadow)',
                    border: '1px solid var(--color-border)',
                  }}
                >
                  <div className="aspect-[4/3] lg:aspect-[16/11]">
                    <Scene />
                  </div>
                </div>

                {/* Handwritten-style annotation */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 1.2 }}
                  className="mt-6 flex items-center gap-3"
                >
                  <svg
                    width="60"
                    height="20"
                    viewBox="0 0 60 20"
                    className="opacity-30"
                  >
                    <path
                      d="M2 10 Q15 5, 30 10 T58 10"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeDasharray="2 3"
                      style={{ color: 'var(--color-accent)' }}
                    />
                  </svg>
                  <span
                    className="text-xs font-serif italic"
                    style={{ color: 'var(--color-textSecondary)' }}
                  >
                    Interactive 3D visualization
                  </span>
                </motion.div>
              </div>

              {/* Current microseason info - elegant card */}
              <div className="space-y-6 lg:sticky lg:top-6">
                {/* Season label with organic accent */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                  className="flex items-center gap-3 mb-6"
                >
                  <div
                    className="w-1 h-1 rounded-full"
                    style={{
                      backgroundColor: 'var(--color-accent)',
                      animation: 'glow-pulse 2s ease-in-out infinite',
                    }}
                  />
                  <span
                    className="text-[11px] font-mono uppercase tracking-[0.2em]"
                    style={{ color: 'var(--color-textSecondary)' }}
                  >
                    Current Microseason
                  </span>
                </motion.div>

                {/* Main info card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.9 }}
                  className="p-8 lg:p-10 border transition-all duration-500"
                  style={{
                    backgroundColor: 'var(--color-bgSecondary)',
                    borderColor: 'var(--color-border)',
                    borderRadius: '12px',
                    boxShadow: '0 4px 16px var(--color-shadow)',
                  }}
                >
                  {/* Japanese name - large and elegant */}
                  <h2
                    className="text-4xl lg:text-5xl font-serif mb-3 leading-tight"
                    style={{
                      color: 'var(--color-textPrimary)',
                      letterSpacing: '-0.01em',
                    }}
                  >
                    {currentMicroseason.nameJa}
                  </h2>

                  {/* English translation */}
                  <p
                    className="text-base font-serif italic mb-6"
                    style={{
                      color: 'var(--color-textAccent)',
                      opacity: 0.8,
                    }}
                  >
                    {currentMicroseason.nameEn}
                  </p>

                  {/* Description */}
                  <p
                    className="text-sm leading-relaxed mb-8"
                    style={{
                      color: 'var(--color-textSecondary)',
                      lineHeight: '1.8',
                    }}
                  >
                    {currentMicroseason.description}
                  </p>

                  {/* Color palette - refined display */}
                  <div className="space-y-4 mb-8">
                    <span
                      className="text-[10px] font-mono uppercase tracking-wider opacity-50"
                      style={{ color: 'var(--color-textSecondary)' }}
                    >
                      Season Palette
                    </span>
                    <div className="flex gap-3">
                      {currentMicroseason.colors.map((color, i) => (
                        <div key={i} className="flex-1">
                          <div
                            className="w-full h-16 rounded-lg transition-transform duration-300 hover:scale-105"
                            style={{
                              backgroundColor: color,
                              boxShadow: `0 4px 12px ${color}30`,
                            }}
                          />
                          <span
                            className="text-[9px] font-mono mt-2 block opacity-60"
                            style={{ color: 'var(--color-textSecondary)' }}
                          >
                            {color}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Meta info - subtle grid */}
                  <div
                    className="pt-6 border-t grid grid-cols-2 gap-6"
                    style={{ borderColor: 'var(--color-borderSubtle)' }}
                  >
                    <div>
                      <div
                        className="text-[10px] font-mono uppercase tracking-wider opacity-40 mb-2"
                        style={{ color: 'var(--color-textSecondary)' }}
                      >
                        Solar Term
                      </div>
                      <div
                        className="text-sm"
                        style={{ color: 'var(--color-textPrimary)' }}
                      >
                        {currentMicroseason.solarTerm}
                      </div>
                    </div>
                    <div>
                      <div
                        className="text-[10px] font-mono uppercase tracking-wider opacity-40 mb-2"
                        style={{ color: 'var(--color-textSecondary)' }}
                      >
                        Duration
                      </div>
                      <div
                        className="text-sm"
                        style={{ color: 'var(--color-textPrimary)' }}
                      >
                        ~5 days
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Customization section - refined */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-5xl mx-auto"
          >
            <CustomizationPanel />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
