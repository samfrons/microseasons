'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { useCalendarStore } from '@/store/useCalendarStore';
import { LocationSelector } from './LocationSelector';
import { VibeSelector } from './VibeSelector';
import { Region } from '@/data/regionalData';
import { Vibe } from '@/data/vibes';
import { generateMicroseasons, generatePreviewMicroseason } from '@/utils/microseasonsGenerator';
import clsx from 'clsx';

export const PersonalizationSection = () => {
  const {
    darkMode,
    setSelectedRegion,
    setSelectedVibe,
    setCustomMicroseasons,
    setUseCustomMicroseasons,
  } = useCalendarStore();

  const [step, setStep] = useState<'location' | 'vibe' | 'preview'>('location');
  const [region, setRegion] = useState<Region | null>(null);
  const [vibe, setVibe] = useState<Vibe | null>(null);
  const [preview, setPreview] = useState<ReturnType<typeof generatePreviewMicroseason> | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleRegionSelect = (selectedRegion: Region) => {
    setRegion(selectedRegion);
    setSelectedRegion(selectedRegion);
  };

  const handleVibeSelect = (selectedVibe: Vibe) => {
    setVibe(selectedVibe);
    setSelectedVibe(selectedVibe);

    // Generate preview if we have both region and vibe
    if (region) {
      const previewMicroseason = generatePreviewMicroseason(region, selectedVibe);
      setPreview(previewMicroseason);
    }
  };

  const handleGenerate = async () => {
    if (!region || !vibe) return;

    setIsGenerating(true);

    // Simulate generation time for better UX
    await new Promise(resolve => setTimeout(resolve, 1500));

    const microseasons = generateMicroseasons(region, vibe);
    setCustomMicroseasons(microseasons);
    setUseCustomMicroseasons(true);
    setIsGenerating(false);

    // Scroll to top to show the updated calendar
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const canProceedToVibe = region !== null;
  const canGenerate = region !== null && vibe !== null;

  return (
    <section
      className={clsx(
        'py-32 px-6 transition-colors duration-500',
        darkMode ? 'bg-sumi-900' : 'bg-gradient-to-b from-sakura-50 to-washi-50'
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
              darkMode
                ? 'bg-amber-500/20 text-amber-300'
                : 'bg-amber-100 text-amber-800'
            )}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Personalize Your Calendar
          </motion.div>

          <h2
            className={clsx(
              'text-5xl md:text-6xl lg:text-7xl font-light mb-8 tracking-tight',
              darkMode ? 'text-washi-100' : 'text-sumi-900'
            )}
          >
            Your Seasons,
            <br />
            <span className="font-normal italic">Your Story</span>
          </h2>

          <p
            className={clsx(
              'text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed',
              darkMode ? 'text-washi-300' : 'text-sumi-600'
            )}
          >
            Create a unique microseasons calendar based on your location&apos;s climate and your personal vibe
          </p>
        </motion.div>

        {/* Step Indicator */}
        <div className="flex items-center justify-center gap-4 mb-16">
          {['location', 'vibe', 'preview'].map((s, index) => (
            <div key={s} className="flex items-center">
              <button
                onClick={() => {
                  if (s === 'location' || (s === 'vibe' && canProceedToVibe) || (s === 'preview' && canGenerate)) {
                    setStep(s as typeof step);
                  }
                }}
                disabled={s === 'vibe' && !canProceedToVibe}
                className={clsx(
                  'flex items-center justify-center w-10 h-10 rounded-full text-sm font-medium transition-all duration-300',
                  step === s
                    ? darkMode
                      ? 'bg-amber-500/30 text-amber-300 ring-2 ring-amber-500/50'
                      : 'bg-amber-500 text-white ring-2 ring-amber-500/30'
                    : (s === 'vibe' && canProceedToVibe) || (s === 'preview' && canGenerate)
                    ? darkMode
                      ? 'bg-sumi-700 text-washi-400 hover:bg-sumi-600'
                      : 'bg-washi-200 text-sumi-700 hover:bg-washi-300'
                    : darkMode
                    ? 'bg-sumi-800/50 text-washi-600'
                    : 'bg-washi-100 text-sumi-400'
                )}
              >
                {index + 1}
              </button>
              {index < 2 && (
                <div
                  className={clsx(
                    'w-12 h-0.5 mx-2',
                    darkMode ? 'bg-sumi-700' : 'bg-washi-200'
                  )}
                />
              )}
            </div>
          ))}
        </div>

        {/* Step Content */}
        <div className="min-h-[600px]">
          {/* Step 1: Location */}
          {step === 'location' && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.5 }}
            >
              <h3 className={clsx('text-3xl font-light mb-8 text-center', darkMode ? 'text-washi-100' : 'text-sumi-900')}>
                Where Are You?
              </h3>
              <LocationSelector onRegionSelect={handleRegionSelect} />

              {canProceedToVibe && (
                <div className="flex justify-center mt-12">
                  <motion.button
                    onClick={() => setStep('vibe')}
                    className={clsx(
                      'px-8 py-4 rounded-full text-base font-medium transition-all duration-300 shadow-lg',
                      darkMode
                        ? 'bg-amber-500/20 text-amber-300 hover:bg-amber-500/30'
                        : 'bg-amber-500 text-white hover:bg-amber-600'
                    )}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Continue to Vibe Selection →
                  </motion.button>
                </div>
              )}
            </motion.div>
          )}

          {/* Step 2: Vibe */}
          {step === 'vibe' && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.5 }}
            >
              <VibeSelector onVibeSelect={handleVibeSelect} />

              <div className="flex justify-center gap-4 mt-12">
                <motion.button
                  onClick={() => setStep('location')}
                  className={clsx(
                    'px-6 py-3 rounded-full text-sm font-medium transition-all duration-300',
                    darkMode
                      ? 'bg-sumi-700/50 text-washi-400 hover:bg-sumi-700'
                      : 'bg-washi-200 text-sumi-700 hover:bg-washi-300'
                  )}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  ← Back
                </motion.button>

                {canGenerate && (
                  <motion.button
                    onClick={() => setStep('preview')}
                    className={clsx(
                      'px-8 py-4 rounded-full text-base font-medium transition-all duration-300 shadow-lg',
                      darkMode
                        ? 'bg-amber-500/20 text-amber-300 hover:bg-amber-500/30'
                        : 'bg-amber-500 text-white hover:bg-amber-600'
                    )}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Preview & Generate →
                  </motion.button>
                )}
              </div>
            </motion.div>
          )}

          {/* Step 3: Preview & Generate */}
          {step === 'preview' && region && vibe && preview && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.5 }}
            >
              <h3 className={clsx('text-3xl font-light mb-8 text-center', darkMode ? 'text-washi-100' : 'text-sumi-900')}>
                Preview Your Calendar
              </h3>

              {/* Summary Cards */}
              <div className="grid md:grid-cols-2 gap-6 mb-12">
                {/* Location Summary */}
                <div
                  className={clsx(
                    'p-6 rounded-2xl',
                    darkMode
                      ? 'bg-sumi-700/50 border border-washi-800'
                      : 'bg-white border border-sumi-200'
                  )}
                >
                  <div className="text-2xl mb-3">📍</div>
                  <div className={clsx('text-lg font-medium mb-2', darkMode ? 'text-washi-100' : 'text-sumi-900')}>
                    {region.name}, {region.country}
                  </div>
                  <div className={clsx('text-sm mb-4', darkMode ? 'text-washi-400' : 'text-sumi-600')}>
                    {region.culture.naturalFeatures.slice(0, 2).join(' • ')}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className={clsx('text-xs px-2 py-1 rounded-full', darkMode ? 'bg-blue-500/20 text-blue-300' : 'bg-blue-100 text-blue-700')}>
                      {region.climate.snowfall ? '❄️ Snow' : '☀️ No Snow'}
                    </span>
                    <span className={clsx('text-xs px-2 py-1 rounded-full', darkMode ? 'bg-green-500/20 text-green-300' : 'bg-green-100 text-green-700')}>
                      {region.climate.humidity} humidity
                    </span>
                  </div>
                </div>

                {/* Vibe Summary */}
                <div
                  className={clsx(
                    'p-6 rounded-2xl',
                    darkMode
                      ? 'bg-sumi-700/50 border border-washi-800'
                      : 'bg-white border border-sumi-200'
                  )}
                  style={{
                    backgroundImage: `linear-gradient(135deg, ${vibe.colorPalette[0]}10, ${vibe.colorPalette[1]}10)`,
                  }}
                >
                  <div className="text-2xl mb-3">{vibe.emoji}</div>
                  <div className={clsx('text-lg font-medium mb-2', darkMode ? 'text-washi-100' : 'text-sumi-900')}>
                    {vibe.name}
                  </div>
                  <div className={clsx('text-sm mb-4', darkMode ? 'text-washi-400' : 'text-sumi-600')}>
                    {vibe.description}
                  </div>
                  <div className="flex gap-1">
                    {vibe.colorPalette.slice(0, 4).map((color, i) => (
                      <div
                        key={i}
                        className="w-8 h-8 rounded-full ring-1 ring-black/10 dark:ring-white/10"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Preview Microseason */}
              <div
                className={clsx(
                  'p-8 rounded-2xl mb-12',
                  darkMode
                    ? 'bg-gradient-to-br from-sumi-700 to-sumi-800 border border-washi-800'
                    : 'bg-gradient-to-br from-white to-sakura-50 border border-sumi-200 shadow-xl'
                )}
              >
                <div className={clsx('text-sm font-medium mb-2', darkMode ? 'text-amber-400' : 'text-amber-600')}>
                  Current Microseason Preview
                </div>
                <div className={clsx('text-3xl font-light mb-4', darkMode ? 'text-washi-100' : 'text-sumi-900')}>
                  {preview.nameEn}
                </div>
                <div className={clsx('text-base mb-6 leading-relaxed', darkMode ? 'text-washi-300' : 'text-sumi-600')}>
                  {preview.description}
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {preview.imagery.map((item, i) => (
                    <span
                      key={i}
                      className={clsx(
                        'text-sm px-3 py-1.5 rounded-full',
                        darkMode
                          ? 'bg-washi-800/50 text-washi-300'
                          : 'bg-sumi-100 text-sumi-700'
                      )}
                    >
                      {item}
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  {preview.colors.map((color, i) => (
                    <div
                      key={i}
                      className="w-12 h-12 rounded-lg ring-1 ring-black/10 dark:ring-white/10"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>

              {/* Generate Button */}
              <div className="flex justify-center gap-4">
                <motion.button
                  onClick={() => setStep('vibe')}
                  className={clsx(
                    'px-6 py-3 rounded-full text-sm font-medium transition-all duration-300',
                    darkMode
                      ? 'bg-sumi-700/50 text-washi-400 hover:bg-sumi-700'
                      : 'bg-washi-200 text-sumi-700 hover:bg-washi-300'
                  )}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  ← Back
                </motion.button>

                <motion.button
                  onClick={handleGenerate}
                  disabled={isGenerating}
                  className={clsx(
                    'px-12 py-4 rounded-full text-lg font-medium transition-all duration-300 shadow-xl relative overflow-hidden',
                    isGenerating
                      ? darkMode
                        ? 'bg-sumi-700 text-washi-500'
                        : 'bg-washi-300 text-sumi-500'
                      : darkMode
                      ? 'bg-amber-500/30 text-amber-200 hover:bg-amber-500/40'
                      : 'bg-amber-500 text-white hover:bg-amber-600'
                  )}
                  whileHover={!isGenerating ? { scale: 1.05 } : {}}
                  whileTap={!isGenerating ? { scale: 0.95 } : {}}
                >
                  {isGenerating ? (
                    <span className="flex items-center gap-3">
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                          fill="none"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      Generating Your Calendar...
                    </span>
                  ) : (
                    'Generate My Calendar ✨'
                  )}
                </motion.button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};
