'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { useCalendarStore } from '@/store/useCalendarStore';
import clsx from 'clsx';
import { VenueRender, SizeComparisonRender, LanguageVariationsRender } from './ArchitecturalRenders';

type VenueType = 'office' | 'home' | 'cafe' | 'gallery';

export const ArchitecturalRendersSection = () => {
  const { darkMode } = useCalendarStore();
  const [selectedVenue, setSelectedVenue] = useState<VenueType>('office');

  const venues = [
    {
      id: 'office' as VenueType,
      name: 'Office',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
    },
    {
      id: 'home' as VenueType,
      name: 'Home',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
    },
    {
      id: 'cafe' as VenueType,
      name: 'Café',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
        </svg>
      ),
    },
    {
      id: 'gallery' as VenueType,
      name: 'Gallery',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
    },
  ];

  return (
    <section
      className={clsx(
        'py-32 px-6 transition-colors duration-500',
        darkMode ? 'bg-sumi-900' : 'bg-gradient-to-b from-washi-50 via-white to-sakura-50'
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
                ? 'bg-blue-500/20 text-blue-300'
                : 'bg-blue-100 text-blue-800'
            )}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Architectural Visualizations
          </motion.div>

          <h2
            className={clsx(
              'text-5xl md:text-6xl lg:text-7xl font-light mb-8 tracking-tight',
              darkMode ? 'text-washi-100' : 'text-sumi-900'
            )}
          >
            Designed for
            <br />
            <span className="font-normal italic">Every Space</span>
          </h2>

          <p
            className={clsx(
              'text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed',
              darkMode ? 'text-washi-300' : 'text-sumi-600'
            )}
          >
            Architectural-style product renders showing how the microseasons calendar
            <br />
            integrates seamlessly into diverse environments, sizes, and cultural contexts
          </p>
        </motion.div>

        {/* Venue Variations */}
        <motion.div
          className="mb-32"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-12">
            <h3
              className={clsx(
                'text-4xl font-light mb-4',
                darkMode ? 'text-washi-100' : 'text-sumi-900'
              )}
            >
              Venue Concepts
            </h3>
            <p
              className={clsx(
                'text-lg max-w-2xl mx-auto mb-8',
                darkMode ? 'text-washi-300' : 'text-sumi-600'
              )}
            >
              Architectural elevations showing placement in different environments
            </p>

            {/* Venue selector */}
            <div className="flex justify-center gap-4 flex-wrap">
              {venues.map((venue) => (
                <motion.button
                  key={venue.id}
                  onClick={() => setSelectedVenue(venue.id)}
                  className={clsx(
                    'flex items-center gap-3 px-6 py-3 rounded-xl transition-all duration-300',
                    selectedVenue === venue.id
                      ? darkMode
                        ? 'bg-blue-500/20 text-blue-300 shadow-xl'
                        : 'bg-blue-100 text-blue-800 shadow-xl'
                      : darkMode
                      ? 'bg-sumi-800/50 text-washi-300 hover:bg-sumi-800'
                      : 'bg-white/50 text-gray-700 hover:bg-white hover:shadow-lg'
                  )}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className={clsx(
                    selectedVenue === venue.id
                      ? darkMode ? 'text-blue-300' : 'text-blue-600'
                      : darkMode ? 'text-washi-400' : 'text-gray-600'
                  )}>
                    {venue.icon}
                  </div>
                  <span className="font-medium">{venue.name}</span>
                  {selectedVenue === venue.id && (
                    <motion.div
                      className="ml-2 w-1.5 h-1.5 rounded-full bg-blue-500"
                      layoutId="venueIndicator"
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Venue render */}
          <VenueRender venue={selectedVenue} size="wall-medium" language="japanese" />

          {/* Grid of all venues */}
          <div className="grid md:grid-cols-2 gap-8 mt-16">
            {venues.slice(0, 4).map((venue, index) => (
              <motion.div
                key={venue.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <VenueRender venue={venue.id} size="wall-medium" language="japanese" />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Size Variations */}
        <motion.div
          className="mb-32"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-12">
            <h3
              className={clsx(
                'text-4xl font-light mb-4',
                darkMode ? 'text-washi-100' : 'text-sumi-900'
              )}
            >
              Size Specifications
            </h3>
            <p
              className={clsx(
                'text-lg max-w-2xl mx-auto',
                darkMode ? 'text-washi-300' : 'text-sumi-600'
              )}
            >
              Technical drawings showing dimensional options for every need
            </p>
          </div>

          <SizeComparisonRender />
        </motion.div>

        {/* Language Variations */}
        <motion.div
          className="mb-32"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-12">
            <h3
              className={clsx(
                'text-4xl font-light mb-4',
                darkMode ? 'text-washi-100' : 'text-sumi-900'
              )}
            >
              Global Adaptations
            </h3>
            <p
              className={clsx(
                'text-lg max-w-2xl mx-auto',
                darkMode ? 'text-washi-300' : 'text-sumi-600'
              )}
            >
              Localized editions bringing Japanese timekeeping to cultures worldwide
            </p>
          </div>

          <LanguageVariationsRender />
        </motion.div>

        {/* Technical Details Section */}
        <motion.div
          className={clsx(
            'rounded-3xl p-12 md:p-16',
            darkMode
              ? 'bg-gradient-to-br from-sumi-800 to-sumi-900'
              : 'bg-gradient-to-br from-white to-gray-50'
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
            Design Principles
          </h3>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className={clsx('text-5xl mb-4', darkMode ? 'text-blue-400' : 'text-blue-600')}>
                <svg className="w-16 h-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
              </div>
              <h4 className={clsx('font-medium text-lg mb-2', darkMode ? 'text-washi-100' : 'text-sumi-900')}>
                Spatial Integration
              </h4>
              <p className={clsx('text-sm leading-relaxed', darkMode ? 'text-washi-400' : 'text-sumi-600')}>
                Designed to complement architectural spaces from minimalist homes to contemporary offices
              </p>
            </div>

            <div className="text-center">
              <div className={clsx('text-5xl mb-4', darkMode ? 'text-blue-400' : 'text-blue-600')}>
                <svg className="w-16 h-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </div>
              <h4 className={clsx('font-medium text-lg mb-2', darkMode ? 'text-washi-100' : 'text-sumi-900')}>
                Scalable Design
              </h4>
              <p className={clsx('text-sm leading-relaxed', darkMode ? 'text-washi-400' : 'text-sumi-600')}>
                Modular system scales from intimate desk calendars to commanding wall installations
              </p>
            </div>

            <div className="text-center">
              <div className={clsx('text-5xl mb-4', darkMode ? 'text-blue-400' : 'text-blue-600')}>
                <svg className="w-16 h-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h4 className={clsx('font-medium text-lg mb-2', darkMode ? 'text-washi-100' : 'text-sumi-900')}>
                Cultural Adaptation
              </h4>
              <p className={clsx('text-sm leading-relaxed', darkMode ? 'text-washi-400' : 'text-sumi-600')}>
                Thoughtfully localized for global audiences while honoring Japanese origins
              </p>
            </div>
          </div>
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
            &ldquo;Timeless design that transcends
            <br />
            language, scale, and space&rdquo;
          </p>
        </motion.div>
      </div>
    </section>
  );
};
