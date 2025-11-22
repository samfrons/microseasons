'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import { useCalendarStore } from '@/store/useCalendarStore';
import { microseasons } from '@/data/microseasons';
import { MicroseasonDetailModal } from '@/components/MicroseasonDetailModal';
import { getMicroseasonDetailByName, type MicroseasonDetail } from '@/data/microseasonDetails';
import clsx from 'clsx';

export function MicroseasonsSection() {
  const { darkMode } = useCalendarStore();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [selectedMicroseason, setSelectedMicroseason] = useState<MicroseasonDetail | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2], [100, 0]);

  const handleMicroseasonClick = (microseasonName: string) => {
    const detail = getMicroseasonDetailByName(microseasonName);
    if (detail) {
      setSelectedMicroseason(detail);
      setIsModalOpen(true);
    }
  };

  return (
    <section
      ref={sectionRef}
      className={clsx(
        'py-32 transition-colors duration-500',
        darkMode ? 'bg-sumi-900' : 'bg-washi-50'
      )}
    >
      <div className="container mx-auto px-6 lg:px-12">
        <motion.div style={{ opacity, y }} className="max-w-4xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-20">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className={clsx(
                'text-5xl lg:text-6xl font-light mb-6 tracking-tight',
                darkMode ? 'text-washi-50' : 'text-sumi-900'
              )}
            >
              The 72 Microseasons
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className={clsx(
                'text-xl leading-relaxed max-w-2xl mx-auto',
                darkMode ? 'text-washi-300' : 'text-sumi-600'
              )}
            >
              The Japanese calendar divides the year into 72 distinct periods,
              each lasting about five days. These microseasons mark subtle
              shifts in nature—the first frost, cherry blossoms opening,
              crickets singing.
            </motion.p>
          </div>

          {/* Concept explanation */}
          <div className="grid md:grid-cols-2 gap-12 mb-20">
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
          <div className="mt-24">
            <h3
              className={clsx(
                'text-3xl font-light mb-12 text-center',
                darkMode ? 'text-washi-100' : 'text-sumi-800'
              )}
            >
              A Year of Subtle Changes
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {microseasons.slice(0, 8).map((season, index) => (
                <motion.div
                  key={season.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  onClick={() => handleMicroseasonClick(season.nameEn)}
                  className={clsx(
                    'p-6 rounded-xl border backdrop-blur-sm',
                    'transition-all duration-300 cursor-pointer',
                    darkMode
                      ? 'bg-sumi-800/50 border-sumi-700 hover:border-sakura-500'
                      : 'bg-white/50 border-washi-200 hover:border-sumi-400'
                  )}
                  role="button"
                  tabIndex={0}
                  aria-label={`Learn more about ${season.nameEn}`}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleMicroseasonClick(season.nameEn);
                    }
                  }}
                >
                  <div
                    className="w-full h-2 rounded-full mb-4"
                    style={{
                      background: `linear-gradient(90deg, ${season.colors.join(', ')})`,
                    }}
                  />
                  <p
                    className={clsx(
                      'text-sm font-medium mb-2',
                      darkMode ? 'text-washi-100' : 'text-sumi-800'
                    )}
                  >
                    {season.nameJa}
                  </p>
                  <p
                    className={clsx(
                      'text-xs leading-relaxed',
                      darkMode ? 'text-washi-400' : 'text-sumi-500'
                    )}
                  >
                    {season.nameEn}
                  </p>
                  <div className={clsx(
                    'mt-3 text-xs opacity-0 group-hover:opacity-100 transition-opacity',
                    darkMode ? 'text-emerald-400' : 'text-emerald-600'
                  )}>
                    Click to learn more →
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Microseason Detail Modal */}
      <MicroseasonDetailModal
        microseason={selectedMicroseason}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
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
      transition={{ duration: 0.8 }}
      className={clsx(
        'p-8 rounded-2xl border backdrop-blur-sm',
        'transition-all duration-300',
        darkMode
          ? 'bg-sumi-800/50 border-sumi-700'
          : 'bg-white/50 border-washi-200'
      )}
    >
      <h3
        className={clsx(
          'text-xl font-medium mb-4 tracking-wide',
          darkMode ? 'text-washi-100' : 'text-sumi-800'
        )}
      >
        {title}
      </h3>
      <p
        className={clsx(
          'leading-relaxed',
          darkMode ? 'text-washi-300' : 'text-sumi-600'
        )}
      >
        {description}
      </p>
    </motion.div>
  );
}
