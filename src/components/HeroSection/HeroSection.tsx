'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import BioreactorGrid from '../BioreactorGrid';
import { getCurrentMicroseason } from '@/data/microseasons';

export function HeroSection() {
  const currentMicroseason = getCurrentMicroseason();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#0a0f0a]">
      {/* Living algae ambient background */}
      <div className="absolute inset-0">
        {/* Deep green gradient base */}
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse at 20% 30%, rgba(56, 142, 60, 0.15) 0%, transparent 50%),
              radial-gradient(ellipse at 80% 70%, rgba(129, 199, 132, 0.1) 0%, transparent 40%),
              radial-gradient(ellipse at 50% 100%, rgba(27, 94, 32, 0.2) 0%, transparent 50%),
              linear-gradient(180deg, #0a0f0a 0%, #0d140d 50%, #0a0f0a 100%)
            `,
          }}
        />
        {/* Subtle organic movement */}
        <motion.div
          className="absolute inset-0 opacity-30"
          animate={{
            background: [
              'radial-gradient(ellipse at 30% 40%, rgba(129, 199, 132, 0.15) 0%, transparent 50%)',
              'radial-gradient(ellipse at 70% 60%, rgba(129, 199, 132, 0.15) 0%, transparent 50%)',
              'radial-gradient(ellipse at 30% 40%, rgba(129, 199, 132, 0.15) 0%, transparent 50%)',
            ],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      {/* Main content */}
      <div className="relative z-10 container mx-auto px-6 lg:px-12 py-12 lg:py-20">
        {/* Header */}
        <motion.header
          className="mb-12 lg:mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : 30 }}
          transition={{ duration: 0.8 }}
        >
          {/* Tagline */}
          <div className="flex items-center gap-3 mb-6">
            <div
              className="w-2 h-2 led-pulse"
              style={{ backgroundColor: 'var(--color-led-cyan)' }}
            />
            <span className="text-xs uppercase tracking-[0.2em] text-white/50 font-mono">
              Living Climate Infrastructure
            </span>
          </div>

          {/* Main title */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold text-white tracking-tight leading-[0.95] mb-6">
            A Living Calendar
            <br />
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: 'linear-gradient(135deg, var(--color-algae-light) 0%, var(--color-algae-mid) 50%, var(--color-algae-dark) 100%)',
              }}
            >
              That Breathes
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg lg:text-xl text-white/60 max-w-2xl leading-relaxed font-serif">
            72 microseasons. Infinite locations. Powered by living algae bioreactors
            and microbial fuel cells—the power source itself responds to seasonal change.
          </p>
        </motion.header>

        {/* Hero Grid Layout */}
        <div className="grid lg:grid-cols-[1fr,400px] gap-8 lg:gap-12 items-start">
          {/* Main Bioreactor Visualization */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: mounted ? 1 : 0, scale: mounted ? 1 : 0.95 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative"
          >
            {/* Product image showcase */}
            <div className="relative aspect-[16/10] mb-6 overflow-hidden">
              <Image
                src="/images/bioreactor/led-grid-colorful.png"
                alt="Living Microseasons Calendar with LED bioreactor panels"
                fill
                className="object-cover"
                priority
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f0a] via-transparent to-transparent opacity-60" />

              {/* Live indicator */}
              <div className="absolute top-4 right-4 flex items-center gap-2 px-3 py-1.5 bg-black/60 backdrop-blur-sm">
                <div
                  className="w-2 h-2 led-pulse"
                  style={{ backgroundColor: 'var(--color-led-green)' }}
                />
                <span className="text-[10px] font-mono text-white/70 uppercase tracking-wider">
                  Live System
                </span>
              </div>
            </div>

            {/* Interactive Grid Preview */}
            <div className="hidden lg:block">
              <BioreactorGrid
                rows={4}
                cols={9}
                panelSize="sm"
                variant="wall"
                highlightCurrent={true}
                interactive={true}
              />
            </div>

            {/* Mobile: Show image instead of grid */}
            <div className="lg:hidden relative aspect-[4/3] overflow-hidden">
              <Image
                src="/images/bioreactor/algae-panels-brass.png"
                alt="Algae bioreactor panels in brass frames"
                fill
                className="object-cover"
              />
            </div>
          </motion.div>

          {/* Current Microseason Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: mounted ? 1 : 0, x: mounted ? 0 : 30 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="lg:sticky lg:top-8 space-y-6"
          >
            {/* Current Season Label */}
            <div className="flex items-center gap-3">
              <div
                className="w-1.5 h-1.5 led-pulse"
                style={{ backgroundColor: 'var(--color-led-cyan)' }}
              />
              <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-white/40">
                Current Microseason
              </span>
            </div>

            {/* Season Card */}
            <div
              className="p-6 lg:p-8 border border-white/10"
              style={{
                background: 'linear-gradient(135deg, rgba(56, 142, 60, 0.1) 0%, rgba(27, 94, 32, 0.2) 100%)',
                backdropFilter: 'blur(10px)',
              }}
            >
              {/* Japanese name */}
              <h2 className="text-3xl lg:text-4xl font-serif text-white mb-2 leading-tight">
                {currentMicroseason.nameJa}
              </h2>

              {/* English name */}
              <p
                className="text-base font-serif italic mb-4"
                style={{ color: 'var(--color-algae-light)' }}
              >
                {currentMicroseason.nameEn}
              </p>

              {/* Description */}
              <p className="text-sm text-white/60 leading-relaxed mb-6">
                {currentMicroseason.description}
              </p>

              {/* Color palette */}
              <div className="space-y-3 mb-6">
                <span className="text-[10px] font-mono uppercase tracking-wider text-white/30">
                  Season Palette
                </span>
                <div className="flex gap-2">
                  {currentMicroseason.colors.map((color, i) => (
                    <div key={i} className="flex-1">
                      <div
                        className="h-12 transition-transform duration-300 hover:scale-105"
                        style={{
                          backgroundColor: color,
                          boxShadow: `0 4px 16px ${color}40`,
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* LED Tracking Preview */}
              <div className="pt-4 border-t border-white/10">
                <span className="text-[10px] font-mono uppercase tracking-wider text-white/30 block mb-3">
                  Today&apos;s Tracking
                </span>
                <div className="flex gap-4">
                  {[
                    { label: 'Habit', color: 'var(--color-led-cyan)', active: true },
                    { label: 'Mood', color: 'var(--color-led-amber)', active: true },
                    { label: 'Observation', color: 'var(--color-led-green)', active: false },
                  ].map((led, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div
                        className={`w-2.5 h-2.5 ${led.active ? 'led-pulse' : ''}`}
                        style={{
                          backgroundColor: led.active ? led.color : 'rgba(255,255,255,0.2)',
                          boxShadow: led.active ? `0 0 8px ${led.color}` : 'none',
                        }}
                      />
                      <span className="text-[10px] text-white/40">{led.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Location teaser */}
            <div className="p-4 border border-white/5 bg-white/5">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-white/30 block mb-1">
                    Your Location
                  </span>
                  <span className="text-sm text-white/80">
                    Generate local microseasons →
                  </span>
                </div>
                <div className="text-white/20">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                    <circle cx="12" cy="9" r="2.5" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Solar term info */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 border border-white/5 bg-white/5">
                <span className="text-[10px] font-mono uppercase tracking-wider text-white/30 block mb-1">
                  Solar Term
                </span>
                <span className="text-sm text-white/80">
                  {currentMicroseason.solarTerm}
                </span>
              </div>
              <div className="p-4 border border-white/5 bg-white/5">
                <span className="text-[10px] font-mono uppercase tracking-wider text-white/30 block mb-1">
                  Duration
                </span>
                <span className="text-sm text-white/80">
                  ~5 days
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom tagline */}
        <motion.div
          className="mt-16 lg:mt-24 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: mounted ? 1 : 0 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          <p className="text-sm text-white/30 max-w-xl mx-auto">
            When does &quot;mist starts to linger&quot; mean in your location?
            <br />
            <span style={{ color: 'var(--color-algae-light)' }}>
              Discover your local microseasons.
            </span>
          </p>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-5 h-8 border border-white/20 flex justify-center pt-2">
          <div className="w-1 h-2 bg-white/40" />
        </div>
      </motion.div>
    </section>
  );
}
