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
      className="relative py-32 lg:py-48 transition-colors duration-700"
      style={{ backgroundColor: 'var(--color-bgSecondary)' }}
    >
      <div className="container mx-auto px-6 lg:px-20 max-w-[1600px]">
        <motion.div style={{ opacity, y }} className="max-w-6xl mx-auto">
          {/* Section header - elegant and spacious */}
          <div className="text-center mb-24 lg:mb-32">
            {/* Handwritten label */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-3 mb-8"
            >
              <svg width="30" height="12" viewBox="0 0 30 12" className="opacity-40">
                <path
                  d="M2 6 Q10 2, 18 6 T28 6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  style={{ color: 'var(--color-accent)' }}
                />
              </svg>
              <span
                className="text-xs font-serif italic tracking-wide"
                style={{ color: 'var(--color-textSecondary)' }}
              >
                The ancient art of time
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-5xl lg:text-7xl xl:text-8xl font-bold mb-8 leading-tight"
              style={{
                color: 'var(--color-textPrimary)',
                letterSpacing: '-0.04em',
                lineHeight: '1'
              }}
            >
              72 Microseasons,
              <br />
              <span className="font-serif italic" style={{ color: 'var(--color-accent)', fontWeight: 400 }}>
                one luminous year
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg lg:text-xl max-w-3xl mx-auto font-serif leading-relaxed"
              style={{
                color: 'var(--color-textSecondary)',
                lineHeight: '1.8'
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

          {/* Seasonal grid preview - elegant gallery */}
          <div className="mt-32">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h3
                className="text-4xl lg:text-5xl font-serif mb-4 tracking-tight"
                style={{
                  color: 'var(--color-textPrimary)',
                  letterSpacing: '-0.02em'
                }}
              >
                A Year of Subtle Changes
              </h3>
              <p
                className="text-sm font-serif italic opacity-60"
                style={{ color: 'var(--color-textSecondary)' }}
              >
                Featured microseasons
              </p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-5 lg:gap-6">
              {microseasons.slice(0, 8).map((season, index) => (
                <motion.div
                  key={season.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ y: -8 }}
                  className="group cursor-pointer"
                >
                  <div
                    className="p-6 lg:p-8 border transition-all duration-500 hover-lift"
                    style={{
                      backgroundColor: 'var(--color-bgPrimary)',
                      borderRadius: '12px',
                      borderColor: 'var(--color-border)',
                      boxShadow: '0 2px 12px var(--color-shadow)',
                    }}
                  >
                    {/* Color palette bar - soft and elegant */}
                    <div className="flex gap-1.5 mb-6">
                      {season.colors.map((color, i) => (
                        <div
                          key={i}
                          className="flex-1 h-3 rounded-full transition-all duration-300"
                          style={{
                            backgroundColor: color,
                            boxShadow: `0 2px 8px ${color}20`,
                            transform: 'scale(1)',
                          }}
                        />
                      ))}
                    </div>

                    <p
                      className="text-lg font-serif mb-2 leading-tight"
                      style={{
                        color: 'var(--color-textPrimary)',
                        letterSpacing: '-0.01em'
                      }}
                    >
                      {season.nameJa}
                    </p>

                    <p
                      className="text-xs font-serif italic opacity-60"
                      style={{ color: 'var(--color-textSecondary)' }}
                    >
                      {season.nameEn}
                    </p>
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
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="p-8 lg:p-10 border relative group hover-lift"
      style={{
        backgroundColor: 'var(--color-bgPrimary)',
        borderRadius: '12px',
        borderColor: 'var(--color-border)',
        boxShadow: '0 2px 12px var(--color-shadow)',
      }}
    >
      {/* Subtle organic accent */}
      <div
        className="absolute top-6 right-6 w-8 h-8 rounded-full opacity-10 transition-opacity duration-300 group-hover:opacity-20"
        style={{
          backgroundColor: 'var(--color-accent)',
        }}
      />

      <h3
        className="text-2xl lg:text-3xl font-serif mb-4 relative z-10"
        style={{
          color: 'var(--color-textPrimary)',
          letterSpacing: '-0.01em'
        }}
      >
        {title}
      </h3>
      <p
        className="leading-relaxed text-sm lg:text-base opacity-80 relative z-10"
        style={{
          color: 'var(--color-textSecondary)',
          lineHeight: '1.8'
        }}
      >
        {description}
      </p>
    </motion.div>
  );
}
