'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { useCalendarStore } from '@/store/useCalendarStore';
import { microseasons } from '@/data/microseasons';
import clsx from 'clsx';

export function MicroseasonsSection() {
  const { darkMode } = useCalendarStore();
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2], [100, 0]);

  return (
    <section
      ref={sectionRef}
      className="relative py-40 lg:py-48 transition-colors duration-500"
      style={{ backgroundColor: 'var(--color-bgPrimary)' }}
    >
      <div className="container mx-auto px-8 lg:px-16">
        <motion.div style={{ opacity, y }} className="max-w-4xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 mb-6">
              <div
                className="w-1 h-1 rounded-full animate-pulse"
                style={{
                  backgroundColor: 'var(--color-accent)',
                  boxShadow: `0 0 10px var(--color-accent)`
                }}
              />
              <span
                className="text-xs font-mono uppercase tracking-wider opacity-60"
                style={{ color: 'var(--color-textSecondary)' }}
              >
                SYSTEM OVERVIEW
              </span>
            </div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-5xl lg:text-7xl font-bold mb-6"
              style={{
                color: 'var(--color-textPrimary)',
                letterSpacing: '-0.03em',
                lineHeight: '1.1'
              }}
            >
              72 Microseasons,
              <br />
              <span style={{ color: 'var(--color-accent)' }}>72 LED States</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-base lg:text-lg max-w-2xl mx-auto opacity-70 font-serif italic"
              style={{
                color: 'var(--color-textSecondary)',
                lineHeight: '1.7'
              }}
            >
              The Japanese calendar divides the year into 72 distinct periods,
              each lasting about five days. These microseasons mark subtle
              shifts in nature—the first frost, cherry blossoms opening,
              crickets singing.
            </motion.p>
          </div>

          {/* Concept explanation */}
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12 mb-32">
            <ConceptCard
              title="East Meets West"
              description="Our calendar beautifully overlays the ancient Japanese 72 microseasons with the familiar Western calendar system, creating a unique hybrid that honors both traditions."
              darkMode={darkMode}
            />
            <ConceptCard
              title="Location Specific"
              description="While rooted in Japanese tradition, microseasons can be adapted to any location, reflecting the unique environmental rhythms of different regions around the world."
              darkMode={darkMode}
            />
            <ConceptCard
              title="Mindful Living"
              description="By marking subtle environmental changes, microseasons encourage a deeper awareness of natural cycles and seasonal transitions in our daily lives."
              darkMode={darkMode}
            />
            <ConceptCard
              title="Customizable Design"
              description="Choose from premium materials, elegant color palettes, and display modes to create a calendar that perfectly matches your aesthetic and space."
              darkMode={darkMode}
            />
          </div>

          {/* Seasonal grid preview */}
          <div className="mt-32">
            <h3
              className="text-3xl lg:text-4xl font-extralight mb-16 text-center tracking-tight opacity-90"
              style={{
                color: 'var(--color-textPrimary)',
                letterSpacing: '-0.015em'
              }}
            >
              A Year of Subtle Changes
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
              {microseasons.slice(0, 8).map((season, index) => (
                <motion.div
                  key={season.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  whileHover={{ y: -4 }}
                  className="p-6 cursor-pointer border-2 group relative overflow-hidden"
                  style={{
                    backgroundColor: 'var(--color-bgPrimary)',
                    borderRadius: '2px',
                    borderColor: 'var(--color-border)',
                    transition: 'all 0.3s'
                  }}
                >
                  {/* LED Light Bar */}
                  <div
                    className="w-full h-2 mb-5 relative overflow-hidden"
                    style={{
                      background: `linear-gradient(90deg, ${season.colors.join(', ')})`,
                      borderRadius: '2px',
                      boxShadow: `0 0 10px ${season.colors[0]}40`
                    }}
                  >
                    <div
                      className="absolute inset-0 opacity-50 group-hover:opacity-100 transition-opacity"
                      style={{
                        background: `linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)`,
                        animation: 'shimmer 2s infinite'
                      }}
                    />
                  </div>

                  <div className="flex items-start justify-between mb-3">
                    <p
                      className="text-base font-bold"
                      style={{
                        color: 'var(--color-textPrimary)',
                        letterSpacing: '-0.01em'
                      }}
                    >
                      {season.nameJa}
                    </p>
                    <div
                      className="w-1.5 h-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{
                        backgroundColor: season.colors[0],
                        boxShadow: `0 0 8px ${season.colors[0]}`
                      }}
                    />
                  </div>

                  <p
                    className="text-xs opacity-60 font-serif italic mb-3"
                    style={{ color: 'var(--color-textSecondary)' }}
                  >
                    {season.nameEn}
                  </p>

                  {/* Tech detail */}
                  <div
                    className="text-[9px] font-mono opacity-30"
                    style={{ color: 'var(--color-textSecondary)' }}
                  >
                    LED_{String(index + 1).padStart(2, '0')}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

interface ConceptCardProps {
  title: string;
  description: string;
  darkMode: boolean;
}

function ConceptCard({ title, description, darkMode }: ConceptCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="p-8 border-2 relative overflow-hidden group"
      style={{
        backgroundColor: 'var(--color-bgPrimary)',
        borderRadius: '2px',
        borderColor: 'var(--color-border)',
      }}
    >
      {/* LED Accent Line */}
      <div
        className="absolute top-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `linear-gradient(90deg, transparent, var(--color-accent), transparent)`,
          boxShadow: `0 0 10px var(--color-accent)`
        }}
      />

      <h3
        className="text-2xl font-bold mb-4"
        style={{
          color: 'var(--color-textPrimary)',
          letterSpacing: '-0.02em'
        }}
      >
        {title}
      </h3>
      <p
        className="leading-relaxed opacity-70 text-sm"
        style={{
          color: 'var(--color-textSecondary)',
          lineHeight: '1.7'
        }}
      >
        {description}
      </p>

      {/* Tech corner detail */}
      <div
        className="absolute bottom-4 right-4 w-6 h-6 border-r-2 border-b-2 opacity-20"
        style={{ borderColor: 'var(--color-accent)' }}
      />
    </motion.div>
  );
}
