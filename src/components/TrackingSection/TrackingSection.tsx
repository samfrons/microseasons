'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { useCalendarStore } from '@/store/useCalendarStore';
import { LEDGrid } from '@/components/LEDCalendar/LEDGrid';
import { LEDControls } from '@/components/LEDCalendar/LEDControls';
import { ExportControls } from '@/components/ExportControls/ExportControls';
import { generateMicroseasonGraphic, svgToDataUrl } from '@/utils/microseasonGraphics';
import { microseasons } from '@/data/microseasons';
import clsx from 'clsx';

export const TrackingSection = () => {
  const { darkMode, customMicroseasons, useCustomMicroseasons } = useCalendarStore();
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [view, setView] = useState<'calendar' | 'microseasons' | 'export'>('calendar');

  // Use custom microseasons if available, otherwise use default
  const activeMicroseasons = useCustomMicroseasons && customMicroseasons
    ? customMicroseasons
    : microseasons;

  // Get current microseason
  const getCurrentMicroseason = () => {
    const now = new Date();
    const month = now.getMonth() + 1;
    const day = now.getDate();

    return activeMicroseasons.find(ms => {
      const startMatch = ms.startDate.month === month && day >= ms.startDate.day;
      const endMatch = ms.endDate.month === month && day <= ms.endDate.day;
      const spanMatch = ms.startDate.month < month && month < ms.endDate.month;

      return (startMatch && endMatch) || spanMatch;
    }) || activeMicroseasons[0];
  };

  const currentMicroseason = getCurrentMicroseason();
  const microseasonGraphic = generateMicroseasonGraphic(currentMicroseason);

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  return (
    <section
      className={clsx(
        'py-32 px-6 transition-colors duration-500',
        darkMode ? 'bg-gradient-to-b from-sumi-900 to-sumi-800' : 'bg-gradient-to-b from-washi-50 to-sakura-50'
      )}
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.div
            className={clsx(
              'inline-block px-6 py-2 rounded-full text-sm font-medium mb-6',
              darkMode ? 'bg-green-500/20 text-green-300' : 'bg-green-100 text-green-800'
            )}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Track & Export
          </motion.div>

          <h2
            className={clsx(
              'text-5xl md:text-6xl lg:text-7xl font-light mb-8 tracking-tight',
              darkMode ? 'text-washi-100' : 'text-sumi-900'
            )}
          >
            Your Seasonal
            <br />
            <span className="font-normal italic">Journey</span>
          </h2>

          <p
            className={clsx(
              'text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed',
              darkMode ? 'text-washi-300' : 'text-sumi-600'
            )}
          >
            Track habits, events, and tasks with beautiful LED indicators.
            <br />
            Export your calendar as stunning images or animated videos.
          </p>
        </motion.div>

        {/* Current Microseason Banner */}
        <motion.div
          className={clsx(
            'relative overflow-hidden rounded-3xl p-8 md:p-12 mb-16',
            darkMode
              ? 'bg-gradient-to-br from-sumi-700 to-sumi-800 border border-washi-800'
              : 'bg-gradient-to-br from-white to-sakura-50 border border-sumi-200 shadow-xl'
          )}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {/* Background Graphic */}
          <div
            className="absolute inset-0 opacity-20"
            dangerouslySetInnerHTML={{ __html: microseasonGraphic.svg }}
          />

          {/* Content */}
          <div className="relative z-10">
            <div className={clsx('text-sm font-medium mb-3', darkMode ? 'text-amber-400' : 'text-amber-600')}>
              Current Microseason
            </div>
            <div className={clsx('text-4xl md:text-5xl font-light mb-4', darkMode ? 'text-washi-100' : 'text-sumi-900')}>
              {currentMicroseason.nameEn}
            </div>
            <div className={clsx('text-lg mb-6 leading-relaxed max-w-2xl', darkMode ? 'text-washi-300' : 'text-sumi-600')}>
              {currentMicroseason.description}
            </div>
            <div className="flex gap-2">
              {microseasonGraphic.colors.map((color, i) => (
                <div
                  key={i}
                  className="w-12 h-12 rounded-lg ring-1 ring-black/10 dark:ring-white/10"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>
        </motion.div>

        {/* View Toggle */}
        <div className="flex justify-center gap-4 mb-12">
          {[
            { id: 'calendar', label: 'LED Calendar', icon: '📅' },
            { id: 'microseasons', label: 'Microseasons', icon: '🌸' },
            { id: 'export', label: 'Export', icon: '📤' },
          ].map(({ id, label, icon }) => (
            <button
              key={id}
              onClick={() => setView(id as typeof view)}
              className={clsx(
                'px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2',
                view === id
                  ? darkMode
                    ? 'bg-amber-500/30 text-amber-300 ring-2 ring-amber-500/50'
                    : 'bg-amber-500 text-white ring-2 ring-amber-500/30 shadow-lg'
                  : darkMode
                  ? 'bg-sumi-700 text-washi-400 hover:bg-sumi-600'
                  : 'bg-white text-sumi-700 hover:bg-washi-100 hover:shadow-md'
              )}
            >
              <span>{icon}</span>
              <span>{label}</span>
            </button>
          ))}
        </div>

        {/* Content Views */}
        <div className="min-h-[600px]">
          {/* Calendar View */}
          {view === 'calendar' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="grid lg:grid-cols-[2fr_1fr] gap-8"
            >
              {/* LED Calendar */}
              <div
                className={clsx(
                  'p-8 rounded-2xl',
                  darkMode
                    ? 'bg-sumi-700/50 border border-washi-800'
                    : 'bg-white border border-sumi-200 shadow-lg'
                )}
              >
                {/* Month/Year Selector */}
                <div className="flex items-center justify-between mb-8">
                  <button
                    onClick={() => {
                      if (selectedMonth === 1) {
                        setSelectedMonth(12);
                        setSelectedYear(selectedYear - 1);
                      } else {
                        setSelectedMonth(selectedMonth - 1);
                      }
                    }}
                    className={clsx(
                      'px-4 py-2 rounded-lg transition-all',
                      darkMode
                        ? 'bg-sumi-600 text-washi-300 hover:bg-sumi-500'
                        : 'bg-washi-100 text-sumi-700 hover:bg-washi-200'
                    )}
                  >
                    ←
                  </button>

                  <div className="text-center">
                    <div className={clsx('text-2xl font-light', darkMode ? 'text-washi-100' : 'text-sumi-900')}>
                      {months[selectedMonth - 1]} {selectedYear}
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      if (selectedMonth === 12) {
                        setSelectedMonth(1);
                        setSelectedYear(selectedYear + 1);
                      } else {
                        setSelectedMonth(selectedMonth + 1);
                      }
                    }}
                    className={clsx(
                      'px-4 py-2 rounded-lg transition-all',
                      darkMode
                        ? 'bg-sumi-600 text-washi-300 hover:bg-sumi-500'
                        : 'bg-washi-100 text-sumi-700 hover:bg-washi-200'
                    )}
                  >
                    →
                  </button>
                </div>

                {/* LED Grid */}
                <LEDGrid year={selectedYear} month={selectedMonth} />

                {/* Instructions */}
                <div className={clsx('mt-8 p-4 rounded-lg', darkMode ? 'bg-sumi-600/50' : 'bg-washi-50')}>
                  <p className={clsx('text-sm', darkMode ? 'text-washi-300' : 'text-sumi-600')}>
                    💡 <strong>Tip:</strong> Click any day to toggle an LED marker. Select a color on the right to change the active color.
                  </p>
                </div>
              </div>

              {/* Controls */}
              <div className="space-y-6">
                <LEDControls />
              </div>
            </motion.div>
          )}

          {/* Microseasons View */}
          {view === 'microseasons' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {activeMicroseasons.slice(0, 12).map((ms, index) => {
                  const graphic = generateMicroseasonGraphic(ms);

                  return (
                    <motion.div
                      key={ms.id}
                      className={clsx(
                        'p-6 rounded-2xl relative overflow-hidden',
                        darkMode
                          ? 'bg-sumi-700/50 border border-washi-800'
                          : 'bg-white border border-sumi-200 shadow-lg hover:shadow-xl'
                      )}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05, duration: 0.4 }}
                      viewport={{ once: true }}
                      whileHover={{ scale: 1.02 }}
                    >
                      {/* Background Graphic */}
                      <div
                        className="absolute inset-0 opacity-10"
                        dangerouslySetInnerHTML={{ __html: graphic.svg }}
                      />

                      {/* Content */}
                      <div className="relative z-10">
                        <div className={clsx('text-sm font-medium mb-2', darkMode ? 'text-amber-400' : 'text-amber-600')}>
                          {ms.solarTerm}
                        </div>
                        <div className={clsx('text-xl font-light mb-3', darkMode ? 'text-washi-100' : 'text-sumi-900')}>
                          {ms.nameEn}
                        </div>
                        <div className={clsx('text-sm mb-4 leading-relaxed', darkMode ? 'text-washi-300' : 'text-sumi-600')}>
                          {ms.description}
                        </div>
                        <div className="flex gap-2">
                          {graphic.colors.map((color, i) => (
                            <div
                              key={i}
                              className="w-8 h-8 rounded-full ring-1 ring-black/10 dark:ring-white/10"
                              style={{ backgroundColor: color }}
                            />
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              <div className="text-center mt-12">
                <p className={clsx('text-sm', darkMode ? 'text-washi-400' : 'text-sumi-500')}>
                  Showing 12 of {activeMicroseasons.length} microseasons
                </p>
              </div>
            </motion.div>
          )}

          {/* Export View */}
          {view === 'export' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <div className="max-w-2xl mx-auto">
                <div
                  className={clsx(
                    'p-8 rounded-2xl',
                    darkMode
                      ? 'bg-sumi-700/50 border border-washi-800'
                      : 'bg-white border border-sumi-200 shadow-lg'
                  )}
                >
                  <h3 className={clsx('text-2xl font-light mb-6', darkMode ? 'text-washi-100' : 'text-sumi-900')}>
                    Export Your Calendar
                  </h3>

                  <ExportControls />

                  {/* Info */}
                  <div className={clsx('mt-8 p-4 rounded-lg', darkMode ? 'bg-sumi-600/50' : 'bg-washi-50')}>
                    <p className={clsx('text-sm mb-2', darkMode ? 'text-washi-300' : 'text-sumi-600')}>
                      📌 <strong>Note:</strong> Video export requires a visible 3D calendar.
                      Navigate to the main calendar view above for video recording.
                    </p>
                    <p className={clsx('text-sm', darkMode ? 'text-washi-400' : 'text-sumi-500')}>
                      Image exports will capture the current calendar state with your LED tracking data.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};
