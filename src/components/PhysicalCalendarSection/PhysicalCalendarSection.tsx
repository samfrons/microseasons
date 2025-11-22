'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { PhysicalCalendarMockup } from './PhysicalCalendarMockup';
import { LaserCutExport } from '@/components/LaserCutExport';
import { useCalendarStore } from '@/store/useCalendarStore';
import clsx from 'clsx';

type MaterialOption = 'walnut' | 'maple' | 'oak';

export const PhysicalCalendarSection = () => {
  const { darkMode } = useCalendarStore();
  const [selectedMaterial, setSelectedMaterial] = useState<MaterialOption>('walnut');

  const materials = [
    {
      id: 'walnut' as MaterialOption,
      name: 'Walnut',
      description: 'Rich, dark tones',
      gradient: 'linear-gradient(135deg, #3e2723 0%, #5d4037 100%)',
    },
    {
      id: 'maple' as MaterialOption,
      name: 'Maple',
      description: 'Light, natural',
      gradient: 'linear-gradient(135deg, #f5e6d3 0%, #e8d5b7 100%)',
    },
    {
      id: 'oak' as MaterialOption,
      name: 'Oak',
      description: 'Warm, classic',
      gradient: 'linear-gradient(135deg, #8d6e63 0%, #a1887f 100%)',
    },
  ];

  const features = [
    {
      title: 'Modular Tile System',
      description: 'Individual tiles for each day with tactile feedback and LED indicators',
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1v-4zM14 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z" />
        </svg>
      ),
    },
    {
      title: 'Premium Materials',
      description: 'Handcrafted from solid hardwood with brushed metal accents',
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
      ),
    },
    {
      title: 'Backlit Display',
      description: 'Subtle LED backlighting highlights the current microseason',
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
    },
    {
      title: 'Wall-Mounted Design',
      description: 'Elegant 1.5" depth profile for seamless wall integration',
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
    },
  ];

  return (
    <section
      className={clsx(
        'py-32 px-6 transition-colors duration-500',
        darkMode ? 'bg-sumi-800' : 'bg-gradient-to-b from-washi-50 to-sakura-50'
      )}
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-24"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.div
            className={clsx(
              'inline-block px-6 py-2 rounded-full text-sm font-medium mb-6',
              darkMode
                ? 'bg-amber-500/20 text-amber-300'
                : 'bg-amber-100 text-amber-800'
            )}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Physical Edition
          </motion.div>

          <h2
            className={clsx(
              'text-5xl md:text-6xl lg:text-7xl font-light mb-8 tracking-tight',
              darkMode ? 'text-washi-100' : 'text-sumi-900'
            )}
          >
            A Calendar You Can
            <br />
            <span className="font-normal italic">Touch</span>
          </h2>

          <p
            className={clsx(
              'text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed',
              darkMode ? 'text-washi-300' : 'text-sumi-600'
            )}
          >
            Photorealistic 3D concepts for a wall-mounted physical calendar that blends
            <br />
            Vestaboard&apos;s modular elegance with the Everyday Calendar&apos;s tactile satisfaction
          </p>
        </motion.div>

        {/* Hero Render */}
        <motion.div
          className="mb-32"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <PhysicalCalendarMockup variant="hero" material={selectedMaterial} />

          {/* Material Selector */}
          <div className="flex justify-center gap-6 mt-16">
            {materials.map((material) => (
              <motion.button
                key={material.id}
                onClick={() => setSelectedMaterial(material.id)}
                className={clsx(
                  'group relative px-8 py-4 rounded-2xl transition-all duration-300',
                  selectedMaterial === material.id
                    ? darkMode
                      ? 'bg-sumi-700 shadow-xl'
                      : 'bg-white shadow-xl'
                    : darkMode
                    ? 'bg-sumi-700/50 hover:bg-sumi-700'
                    : 'bg-white/50 hover:bg-white hover:shadow-lg'
                )}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <div
                  className="w-16 h-16 rounded-xl mb-3 mx-auto shadow-inner"
                  style={{ background: material.gradient }}
                />
                <div className={clsx('text-sm font-medium', darkMode ? 'text-washi-100' : 'text-sumi-900')}>
                  {material.name}
                </div>
                <div className={clsx('text-xs', darkMode ? 'text-washi-400' : 'text-sumi-500')}>
                  {material.description}
                </div>

                {/* Selection indicator */}
                {selectedMaterial === material.id && (
                  <motion.div
                    className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-12 h-1 bg-amber-500 rounded-full"
                    layoutId="materialSelector"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Detail Views Grid */}
        <div className="grid md:grid-cols-2 gap-16 mb-32">
          {/* Detail Shot */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3
              className={clsx(
                'text-3xl font-light mb-4',
                darkMode ? 'text-washi-100' : 'text-sumi-900'
              )}
            >
              Tactile Interaction
            </h3>
            <p
              className={clsx(
                'text-lg mb-8 leading-relaxed',
                darkMode ? 'text-washi-300' : 'text-sumi-600'
              )}
            >
              Each tile is a satisfying physical element you can touch and interact with.
              LED indicators gently pulse to show the current microseason.
            </p>
            <PhysicalCalendarMockup variant="detail" material={selectedMaterial} />
          </motion.div>

          {/* Hand Interaction */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3
              className={clsx(
                'text-3xl font-light mb-4',
                darkMode ? 'text-washi-100' : 'text-sumi-900'
              )}
            >
              Human Scale
            </h3>
            <p
              className={clsx(
                'text-lg mb-8 leading-relaxed',
                darkMode ? 'text-washi-300' : 'text-sumi-600'
              )}
            >
              Designed at 20" × 16" for perfect visibility and comfortable interaction.
              Each tile is sized for fingertip precision.
            </p>
            <PhysicalCalendarMockup variant="hand" material={selectedMaterial} />
          </motion.div>
        </div>

        {/* Lifestyle Shot */}
        <motion.div
          className="mb-32"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-12">
            <h3
              className={clsx(
                'text-3xl font-light mb-4',
                darkMode ? 'text-washi-100' : 'text-sumi-900'
              )}
            >
              Minimal Interior Presence
            </h3>
            <p
              className={clsx(
                'text-lg max-w-2xl mx-auto',
                darkMode ? 'text-washi-300' : 'text-sumi-600'
              )}
            >
              A beautiful piece of functional art that complements any space with
              Japanese minimalism meets Swiss precision
            </p>
          </div>
          <PhysicalCalendarMockup variant="lifestyle" material={selectedMaterial} />
        </motion.div>

        {/* Exploded View */}
        <motion.div
          className="mb-32"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-12">
            <h3
              className={clsx(
                'text-3xl font-light mb-4',
                darkMode ? 'text-washi-100' : 'text-sumi-900'
              )}
            >
              Layered Construction
            </h3>
            <p
              className={clsx(
                'text-lg max-w-2xl mx-auto',
                darkMode ? 'text-washi-300' : 'text-sumi-600'
              )}
            >
              Premium hardwood frame, individual LED matrix, precision-crafted backing,
              and modular tile system
            </p>
          </div>
          <PhysicalCalendarMockup variant="exploded" material={selectedMaterial} />
        </motion.div>

        {/* Features Grid */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-32"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              className={clsx(
                'p-8 rounded-2xl',
                darkMode
                  ? 'bg-sumi-700/50 hover:bg-sumi-700'
                  : 'bg-white/80 hover:bg-white hover:shadow-lg'
              )}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              whileHover={{ y: -4 }}
            >
              <div className={clsx('mb-4', darkMode ? 'text-amber-400' : 'text-amber-600')}>
                {feature.icon}
              </div>
              <h4 className={clsx('text-lg font-medium mb-2', darkMode ? 'text-washi-100' : 'text-sumi-900')}>
                {feature.title}
              </h4>
              <p className={clsx('text-sm leading-relaxed', darkMode ? 'text-washi-400' : 'text-sumi-600')}>
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Specifications */}
        <motion.div
          className={clsx(
            'rounded-3xl p-12 md:p-16',
            darkMode
              ? 'bg-gradient-to-br from-sumi-700 to-sumi-800'
              : 'bg-gradient-to-br from-white to-sakura-50'
          )}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h3
            className={clsx(
              'text-3xl font-light mb-12 text-center',
              darkMode ? 'text-washi-100' : 'text-sumi-900'
            )}
          >
            Technical Specifications
          </h3>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className={clsx('text-4xl font-light mb-2', darkMode ? 'text-amber-400' : 'text-amber-600')}>
                20" × 16"
              </div>
              <div className={clsx('text-sm', darkMode ? 'text-washi-400' : 'text-sumi-600')}>
                Overall Dimensions
              </div>
            </div>

            <div className="text-center">
              <div className={clsx('text-4xl font-light mb-2', darkMode ? 'text-amber-400' : 'text-amber-600')}>
                1.5"
              </div>
              <div className={clsx('text-sm', darkMode ? 'text-washi-400' : 'text-sumi-600')}>
                Depth Profile
              </div>
            </div>

            <div className="text-center">
              <div className={clsx('text-4xl font-light mb-2', darkMode ? 'text-amber-400' : 'text-amber-600')}>
                35
              </div>
              <div className={clsx('text-sm', darkMode ? 'text-washi-400' : 'text-sumi-600')}>
                Interactive Tiles
              </div>
            </div>
          </div>

          <div className="mt-12 pt-12 border-t border-current opacity-20" />

          <div className="grid md:grid-cols-2 gap-8 mt-12">
            <div>
              <h4 className={clsx('font-medium mb-4', darkMode ? 'text-washi-100' : 'text-sumi-900')}>
                Materials
              </h4>
              <ul className={clsx('space-y-2 text-sm', darkMode ? 'text-washi-300' : 'text-sumi-600')}>
                <li>• Solid hardwood frame (walnut, maple, or oak)</li>
                <li>• Brushed brass or copper accents</li>
                <li>• Premium acrylic backing</li>
                <li>• Individual LED modules per tile</li>
              </ul>
            </div>

            <div>
              <h4 className={clsx('font-medium mb-4', darkMode ? 'text-washi-100' : 'text-sumi-900')}>
                Features
              </h4>
              <ul className={clsx('space-y-2 text-sm', darkMode ? 'text-washi-300' : 'text-sumi-600')}>
                <li>• Tactile tile interaction system</li>
                <li>• Microseason-aware LED backlighting</li>
                <li>• 5-day microseason transitions</li>
                <li>• Wall-mount ready with included hardware</li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Laser Cut Files Section */}
        <motion.div
          className="mt-32"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-12">
            <motion.div
              className={clsx(
                'inline-block px-6 py-2 rounded-full text-sm font-medium mb-6',
                darkMode
                  ? 'bg-emerald-500/20 text-emerald-300'
                  : 'bg-emerald-100 text-emerald-800'
              )}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              Make Your Own
            </motion.div>

            <h3
              className={clsx(
                'text-4xl md:text-5xl font-light mb-6',
                darkMode ? 'text-washi-100' : 'text-sumi-900'
              )}
            >
              Production-Ready Vector Files
            </h3>
            <p
              className={clsx(
                'text-lg max-w-3xl mx-auto leading-relaxed',
                darkMode ? 'text-washi-300' : 'text-sumi-600'
              )}
            >
              Download laser-cut ready SVG files to manufacture your own microseasons calendar.
              All files include separate layers for cutting, engraving, and scoring.
            </p>
          </div>

          <LaserCutExport />
        </motion.div>

        {/* Closing Statement */}
        <motion.div
          className="text-center mt-24"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <p
            className={clsx(
              'text-2xl md:text-3xl font-light italic max-w-3xl mx-auto leading-relaxed',
              darkMode ? 'text-washi-300' : 'text-sumi-700'
            )}
          >
            &ldquo;Where traditional Japanese timekeeping meets
            <br />
            modern tactile interaction&rdquo;
          </p>
        </motion.div>
      </div>
    </section>
  );
};
