'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import Image from 'next/image';

interface Observation {
  id: number;
  location: string;
  observation: string;
  tags: string[];
  date: string;
  user: string;
  microseason?: string;
}

const sampleObservations: Observation[] = [
  {
    id: 1,
    location: 'Stuttgart, Germany',
    observation: 'First snowdrops emerging in Killesberg Park. Two weeks earlier than last year.',
    tags: ['bloom', 'early', 'climate-shift'],
    date: 'Feb 12, 2025',
    user: 'M.K.',
    microseason: 'East wind melts the ice',
  },
  {
    id: 2,
    location: 'Tokyo, Japan',
    observation: 'Ume (plum) blossoms opening at Yushima Tenjin shrine.',
    tags: ['bloom', 'traditional'],
    date: 'Feb 10, 2025',
    user: 'T.S.',
    microseason: '黄鶯睍睆',
  },
  {
    id: 3,
    location: 'Berlin, Germany',
    observation: 'Starlings beginning to murmur at dusk near Tempelhof.',
    tags: ['migration', 'birds'],
    date: 'Feb 8, 2025',
    user: 'A.R.',
    microseason: 'Fish emerge from ice',
  },
  {
    id: 4,
    location: 'San Francisco, USA',
    observation: 'Morning fog returning after a dry January. Redwoods dripping again.',
    tags: ['weather', 'ecosystem'],
    date: 'Feb 5, 2025',
    user: 'J.L.',
    microseason: 'Rain moistens the soil',
  },
];

const questions = [
  'Are certain flowers blooming earlier each year?',
  'Are bird migrations shifting?',
  'What local rhythms are breaking?',
  'When does your local "first frost" arrive now vs. 10 years ago?',
];

export default function CommunityObservationsSection() {
  const [mounted, setMounted] = useState(false);
  const [activeQuestion, setActiveQuestion] = useState(0);

  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => {
      setActiveQuestion((prev) => (prev + 1) % questions.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      className="py-24 lg:py-32 relative overflow-hidden"
      style={{ backgroundColor: 'var(--color-bgSecondary)' }}
    >
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
            <div
              className="w-8 h-[2px]"
              style={{ backgroundColor: 'var(--color-accent)' }}
            />
            <span
              className="text-xs font-mono uppercase tracking-[0.2em]"
              style={{ color: 'var(--color-textSecondary)' }}
            >
              Community Observations
            </span>
          </div>

          <h2
            className="text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight mb-6"
            style={{ color: 'var(--color-textPrimary)' }}
          >
            Phenological
            <br />
            <span style={{ color: 'var(--color-accent)' }}>Intelligence</span>
          </h2>

          {/* Rotating questions */}
          <div className="h-16 overflow-hidden">
            <motion.p
              key={activeQuestion}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-xl lg:text-2xl font-serif italic"
              style={{ color: 'var(--color-textSecondary)' }}
            >
              {questions[activeQuestion]}
            </motion.p>
          </div>
        </motion.div>

        {/* Main content */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Observations feed */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center justify-between mb-6">
              <span
                className="text-sm font-mono"
                style={{ color: 'var(--color-textSecondary)' }}
              >
                Recent Observations
              </span>
              <span
                className="text-xs"
                style={{ color: 'var(--color-textSecondary)' }}
              >
                {sampleObservations.length} this week
              </span>
            </div>

            {sampleObservations.map((obs, index) => (
              <motion.div
                key={obs.id}
                className="p-5 border transition-all duration-300 hover:border-[var(--color-accent)]"
                style={{
                  backgroundColor: 'var(--color-bgPrimary)',
                  borderColor: 'var(--color-border)',
                }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-6 h-6 flex items-center justify-center text-[10px] font-mono"
                      style={{
                        backgroundColor: 'var(--color-bgTertiary)',
                        color: 'var(--color-textSecondary)',
                      }}
                    >
                      {obs.user}
                    </div>
                    <span
                      className="text-xs"
                      style={{ color: 'var(--color-textSecondary)' }}
                    >
                      {obs.location}
                    </span>
                  </div>
                  <span
                    className="text-[10px]"
                    style={{ color: 'var(--color-textSecondary)' }}
                  >
                    {obs.date}
                  </span>
                </div>

                <p
                  className="text-sm leading-relaxed mb-3"
                  style={{ color: 'var(--color-textPrimary)' }}
                >
                  {obs.observation}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex gap-2">
                    {obs.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 text-[10px] font-mono"
                        style={{
                          backgroundColor: 'var(--color-bgTertiary)',
                          color: 'var(--color-textSecondary)',
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  {obs.microseason && (
                    <span
                      className="text-[10px] font-serif italic"
                      style={{ color: 'var(--color-accent)' }}
                    >
                      {obs.microseason}
                    </span>
                  )}
                </div>
              </motion.div>
            ))}

            {/* CTA */}
            <div
              className="p-5 border-2 border-dashed text-center"
              style={{ borderColor: 'var(--color-border)' }}
            >
              <p
                className="text-sm mb-3"
                style={{ color: 'var(--color-textSecondary)' }}
              >
                Share what you&apos;re noticing in your environment
              </p>
              <button
                className="px-6 py-2.5 text-sm font-mono uppercase tracking-wider transition-all"
                style={{
                  backgroundColor: 'var(--color-accent)',
                  color: 'white',
                }}
              >
                Add Observation
              </button>
            </div>
          </motion.div>

          {/* Info side */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Description */}
            <div
              className="p-8 border"
              style={{
                backgroundColor: 'var(--color-bgPrimary)',
                borderColor: 'var(--color-border)',
              }}
            >
              <h3
                className="text-xl font-bold mb-4"
                style={{ color: 'var(--color-textPrimary)' }}
              >
                Collective Climate Awareness
              </h3>
              <p
                className="text-sm leading-relaxed mb-6"
                style={{ color: 'var(--color-textSecondary)' }}
              >
                By developing location-specific microseasons through community observation
                and tracking when these shifts actually occur, the calendar reveals ecological
                patterns and disruptions in real-time.
              </p>
              <p
                className="text-sm leading-relaxed"
                style={{ color: 'var(--color-textSecondary)' }}
              >
                Each observation contributes to a growing understanding of how local
                environments are changing. Together, we document the emergence of new patterns
                and the breaking of old rhythms.
              </p>
            </div>

            {/* How it works */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { step: '01', label: 'Observe', desc: 'Notice changes in your local environment' },
                { step: '02', label: 'Record', desc: 'Log your observation with location' },
                { step: '03', label: 'Connect', desc: 'See patterns across the community' },
              ].map((item) => (
                <div key={item.step} className="text-center">
                  <span
                    className="text-3xl font-bold"
                    style={{ color: 'var(--color-accent)' }}
                  >
                    {item.step}
                  </span>
                  <h4
                    className="text-sm font-semibold mt-2 mb-1"
                    style={{ color: 'var(--color-textPrimary)' }}
                  >
                    {item.label}
                  </h4>
                  <p
                    className="text-xs"
                    style={{ color: 'var(--color-textSecondary)' }}
                  >
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Image */}
            <div className="relative aspect-[16/9] overflow-hidden">
              <Image
                src="/images/bioreactor/full-grid-seasonal.png"
                alt="Full seasonal grid showing all 72 microseasons"
                fill
                className="object-cover"
              />
              <div
                className="absolute inset-0"
                style={{
                  background: 'linear-gradient(180deg, transparent 0%, var(--color-bgSecondary) 100%)',
                  opacity: 0.6,
                }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
