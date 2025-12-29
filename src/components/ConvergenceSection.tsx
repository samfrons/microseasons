'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import Image from 'next/image';

const features = [
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="16" cy="16" r="8" />
        <path d="M16 4v4M16 24v4M4 16h4M24 16h4" />
        <circle cx="16" cy="16" r="3" fill="currentColor" />
      </svg>
    ),
    title: 'Microbial Fuel Cells',
    description: 'Bioelectrochemical systems convert organic matter into electricity, powering the LED tracking system through natural processes.',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M8 28c0-6 4-10 8-14 4 4 8 8 8 14" />
        <path d="M12 20c0-3 2-5 4-7 2 2 4 4 4 7" />
        <circle cx="16" cy="8" r="4" />
      </svg>
    ),
    title: 'Living Algae Panels',
    description: 'Each panel contains photosynthetic microorganisms that capture CO₂ while visually responding to seasonal light changes.',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="6" y="6" width="8" height="8" />
        <rect x="18" y="6" width="8" height="8" />
        <rect x="6" y="18" width="8" height="8" />
        <rect x="18" y="18" width="8" height="8" />
        <path d="M14 10h4M10 14v4M22 14v4M14 22h4" />
      </svg>
    ),
    title: 'Modular Architecture',
    description: 'Scalable from single panels to full wall installations. Future-ready for integrated thermal regulation and water treatment.',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M16 4v6M8 8l4 4M24 8l-4 4" />
        <circle cx="16" cy="20" r="8" />
        <path d="M16 16v4h3" />
      </svg>
    ),
    title: 'Climate-Responsive',
    description: 'The power source itself responds to seasonal changes—when algae activity shifts, it reveals ecological patterns in real-time.',
  },
];

export default function ConvergenceSection() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section
      className="py-24 lg:py-32 relative overflow-hidden"
      style={{ backgroundColor: 'var(--color-bgPrimary)' }}
    >
      {/* Subtle background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-0 right-0 w-[600px] h-[600px] opacity-[0.03]"
          style={{
            background: 'radial-gradient(circle, var(--color-algae-mid) 0%, transparent 70%)',
          }}
        />
        <div
          className="absolute bottom-0 left-0 w-[400px] h-[400px] opacity-[0.03]"
          style={{
            background: 'radial-gradient(circle, var(--color-algae-dark) 0%, transparent 70%)',
          }}
        />
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        {/* Section header */}
        <motion.div
          className="max-w-3xl mb-16 lg:mb-24"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div
              className="w-8 h-[2px]"
              style={{ backgroundColor: 'var(--color-algae-mid)' }}
            />
            <span
              className="text-xs font-mono uppercase tracking-[0.2em]"
              style={{ color: 'var(--color-textSecondary)' }}
            >
              The Convergence
            </span>
          </div>

          <h2
            className="text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight mb-6"
            style={{ color: 'var(--color-textPrimary)' }}
          >
            Where Bioelectrochemistry
            <br />
            <span style={{ color: 'var(--color-algae-dark)' }}>
              Meets Daily Ritual
            </span>
          </h2>

          <p
            className="text-lg lg:text-xl font-serif leading-relaxed"
            style={{ color: 'var(--color-textSecondary)' }}
          >
            Beyond creating a beautiful timepiece, this is distributed climate infrastructure.
            Living algae bioreactors capture CO₂ while microbial fuel cells power the system—
            creating cascading ecological benefits through sustained local attention.
          </p>
        </motion.div>

        {/* Main content grid */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image/Diagram side */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative aspect-square max-w-lg mx-auto">
              {/* Technical diagram background */}
              <div
                className="absolute inset-0"
                style={{
                  background: 'linear-gradient(135deg, var(--color-bgSecondary) 0%, var(--color-bgTertiary) 100%)',
                  border: '1px solid var(--color-border)',
                }}
              >
                {/* Grid lines */}
                <svg className="absolute inset-0 w-full h-full opacity-20">
                  <defs>
                    <pattern id="convergence-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#convergence-grid)" style={{ color: 'var(--color-border)' }} />
                </svg>
              </div>

              {/* Product image */}
              <div className="absolute inset-8 overflow-hidden">
                <Image
                  src="/images/bioreactor/bioreactor-wall-warm.png"
                  alt="Bioreactor wall installation with warm lighting"
                  fill
                  className="object-cover"
                />
              </div>

              {/* Technical annotations */}
              <div className="absolute top-4 left-4 flex items-center gap-2">
                <div
                  className="w-2 h-2 led-pulse"
                  style={{ backgroundColor: 'var(--color-led-green)' }}
                />
                <span
                  className="text-[10px] font-mono uppercase tracking-wider"
                  style={{ color: 'var(--color-textSecondary)' }}
                >
                  Active Photosynthesis
                </span>
              </div>

              <div className="absolute bottom-4 right-4">
                <span
                  className="text-[10px] font-mono"
                  style={{ color: 'var(--color-textSecondary)' }}
                >
                  Bioelectrochemical Output: ~0.5V/panel
                </span>
              </div>
            </div>

            {/* Caption */}
            <p
              className="text-center text-sm mt-6 font-serif italic"
              style={{ color: 'var(--color-textSecondary)' }}
            >
              Modular bioreactor installation with integrated microbial fuel cells
            </p>
          </motion.div>

          {/* Features grid */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                className="p-6 border transition-all duration-300 hover:border-[var(--color-algae-mid)]"
                style={{
                  backgroundColor: 'var(--color-bgSecondary)',
                  borderColor: 'var(--color-border)',
                }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
              >
                <div
                  className="mb-4"
                  style={{ color: 'var(--color-algae-dark)' }}
                >
                  {feature.icon}
                </div>
                <h3
                  className="text-lg font-semibold mb-2"
                  style={{ color: 'var(--color-textPrimary)' }}
                >
                  {feature.title}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: 'var(--color-textSecondary)' }}
                >
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Bottom quote */}
        <motion.blockquote
          className="mt-20 lg:mt-28 max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p
            className="text-xl lg:text-2xl font-serif italic leading-relaxed mb-4"
            style={{ color: 'var(--color-textPrimary)' }}
          >
            &quot;Does sustained local attention to environmental shifts
            constitute a form of intervention?&quot;
          </p>
          <footer
            className="text-sm"
            style={{ color: 'var(--color-textSecondary)' }}
          >
            — The calendar becomes both ritual object and climate monitoring instrument
          </footer>
        </motion.blockquote>
      </div>
    </section>
  );
}
