'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

interface LocationExample {
  city: string;
  country: string;
  microseason: string;
  localMeaning: string;
  elevation?: string;
  climate: string;
  coords: { x: number; y: number };
}

const locations: LocationExample[] = [
  {
    city: 'Stuttgart',
    country: 'Germany',
    microseason: 'Mist lingers',
    localMeaning: 'When elevation changes 340m within city limits, mist settles differently in valleys vs. hilltops',
    elevation: '207-549m',
    climate: 'Temperate oceanic',
    coords: { x: 52, y: 32 },
  },
  {
    city: 'Tokyo',
    country: 'Japan',
    microseason: '霧始降',
    localMeaning: 'Original system—morning mists mark the transition from summer heat to autumn clarity',
    climate: 'Humid subtropical',
    coords: { x: 82, y: 38 },
  },
  {
    city: 'San Francisco',
    country: 'USA',
    microseason: 'Fog embraces the hills',
    localMeaning: 'Marine layer rolls through the Golden Gate, marking microclimate shifts block by block',
    climate: 'Mediterranean',
    coords: { x: 15, y: 40 },
  },
  {
    city: 'Your City',
    country: 'Anywhere',
    microseason: '?',
    localMeaning: 'Generate microseasons specific to your location, elevation, and local ecology',
    climate: 'Your climate',
    coords: { x: 50, y: 60 },
  },
];

export default function LocationSpecificSection() {
  const [mounted, setMounted] = useState(false);
  const [activeLocation, setActiveLocation] = useState(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="py-24 lg:py-32 relative overflow-hidden bg-[#0d1a0d]">
      {/* Background map pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <pattern id="map-dots" width="4" height="4" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="0.5" fill="var(--color-algae-mid)" />
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#map-dots)" />
        </svg>
      </div>

      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/4 left-1/4 w-96 h-96 opacity-20"
          style={{
            background: 'radial-gradient(circle, var(--color-algae-mid) 0%, transparent 70%)',
            filter: 'blur(60px)',
          }}
        />
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        {/* Section header */}
        <motion.div
          className="max-w-3xl mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-2 h-2 led-pulse" style={{ backgroundColor: 'var(--color-led-cyan)' }} />
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-white/50">
              Location-Specific
            </span>
          </div>

          <h2 className="text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight text-white mb-6">
            What Does
            <br />
            <span style={{ color: 'var(--color-algae-light)' }}>
              &quot;Mist Starts to Linger&quot;
            </span>
            <br />
            Mean in Your City?
          </h2>

          <p className="text-lg text-white/60 font-serif leading-relaxed">
            The Japanese 72 microseasons were developed for a specific climate and geography.
            By adapting them to local conditions—elevation, flora, fauna, and community observation—
            we create living calendars that reveal <em>your</em> ecological patterns.
          </p>
        </motion.div>

        {/* Interactive map area */}
        <div className="grid lg:grid-cols-[1fr,400px] gap-8 lg:gap-12">
          {/* Map visualization */}
          <motion.div
            className="relative aspect-[16/9] lg:aspect-[4/3]"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            {/* World map outline (simplified) */}
            <div
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(135deg, rgba(56, 142, 60, 0.1) 0%, rgba(27, 94, 32, 0.05) 100%)',
                border: '1px solid rgba(129, 199, 132, 0.2)',
              }}
            >
              {/* Grid overlay */}
              <svg className="absolute inset-0 w-full h-full opacity-30">
                <defs>
                  <pattern id="loc-grid" width="10%" height="10%" patternUnits="objectBoundingBox">
                    <path d="M 100 0 L 0 0 0 100" fill="none" stroke="var(--color-algae-mid)" strokeWidth="0.5" opacity="0.3" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#loc-grid)" />
              </svg>

              {/* Location pins */}
              {locations.map((loc, index) => (
                <motion.button
                  key={loc.city}
                  className={`absolute transform -translate-x-1/2 -translate-y-1/2 z-10 group`}
                  style={{ left: `${loc.coords.x}%`, top: `${loc.coords.y}%` }}
                  onClick={() => setActiveLocation(index)}
                  whileHover={{ scale: 1.2 }}
                  animate={{
                    scale: activeLocation === index ? 1.3 : 1,
                  }}
                >
                  <div
                    className={`w-4 h-4 ${activeLocation === index ? 'led-pulse' : ''}`}
                    style={{
                      backgroundColor: activeLocation === index ? 'var(--color-led-cyan)' : 'var(--color-algae-mid)',
                      boxShadow: activeLocation === index
                        ? '0 0 20px var(--color-led-cyan), 0 0 40px var(--color-led-cyan)'
                        : '0 0 10px var(--color-algae-mid)',
                    }}
                  />
                  <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] text-white/60 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                    {loc.city}
                  </span>
                </motion.button>
              ))}

              {/* Connection lines */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                {locations.map((loc, index) => (
                  index < locations.length - 1 && (
                    <motion.line
                      key={`line-${index}`}
                      x1={`${loc.coords.x}%`}
                      y1={`${loc.coords.y}%`}
                      x2={`${locations[index + 1].coords.x}%`}
                      y2={`${locations[index + 1].coords.y}%`}
                      stroke="var(--color-algae-mid)"
                      strokeWidth="1"
                      strokeDasharray="4 4"
                      opacity="0.3"
                    />
                  )
                ))}
              </svg>
            </div>
          </motion.div>

          {/* Location details card */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {/* Location selector pills */}
            <div className="flex flex-wrap gap-2">
              {locations.map((loc, index) => (
                <button
                  key={loc.city}
                  onClick={() => setActiveLocation(index)}
                  className={`px-3 py-1.5 text-xs font-mono uppercase tracking-wider transition-all ${
                    activeLocation === index
                      ? 'bg-[var(--color-algae-mid)] text-white'
                      : 'bg-white/5 text-white/50 hover:bg-white/10'
                  }`}
                >
                  {loc.city}
                </button>
              ))}
            </div>

            {/* Active location card */}
            <motion.div
              key={activeLocation}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="p-6 border border-white/10"
              style={{
                background: 'linear-gradient(135deg, rgba(56, 142, 60, 0.15) 0%, rgba(27, 94, 32, 0.1) 100%)',
              }}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-white">
                    {locations[activeLocation].city}
                  </h3>
                  <p className="text-sm text-white/50">
                    {locations[activeLocation].country}
                  </p>
                </div>
                {locations[activeLocation].elevation && (
                  <div className="text-right">
                    <span className="text-[10px] font-mono uppercase text-white/30 block">Elevation</span>
                    <span className="text-sm text-white/70">{locations[activeLocation].elevation}</span>
                  </div>
                )}
              </div>

              <div className="mb-4">
                <span className="text-[10px] font-mono uppercase text-white/30 block mb-1">
                  Local Microseason
                </span>
                <p className="text-lg font-serif" style={{ color: 'var(--color-algae-light)' }}>
                  &quot;{locations[activeLocation].microseason}&quot;
                </p>
              </div>

              <p className="text-sm text-white/60 leading-relaxed mb-4">
                {locations[activeLocation].localMeaning}
              </p>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <span className="text-xs text-white/40">
                  Climate: {locations[activeLocation].climate}
                </span>
                {locations[activeLocation].city === 'Your City' && (
                  <button
                    className="px-4 py-2 text-xs font-mono uppercase tracking-wider transition-all"
                    style={{
                      backgroundColor: 'var(--color-algae-mid)',
                      color: 'white',
                    }}
                  >
                    Generate Yours →
                  </button>
                )}
              </div>
            </motion.div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              <div className="p-4 bg-white/5 border border-white/5 text-center">
                <span className="text-2xl font-bold text-white">72</span>
                <span className="text-[10px] font-mono uppercase text-white/40 block mt-1">Microseasons</span>
              </div>
              <div className="p-4 bg-white/5 border border-white/5 text-center">
                <span className="text-2xl font-bold" style={{ color: 'var(--color-algae-light)' }}>∞</span>
                <span className="text-[10px] font-mono uppercase text-white/40 block mt-1">Locations</span>
              </div>
              <div className="p-4 bg-white/5 border border-white/5 text-center">
                <span className="text-2xl font-bold text-white">~5</span>
                <span className="text-[10px] font-mono uppercase text-white/40 block mt-1">Days Each</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
