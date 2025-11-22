'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { useCalendarStore } from '@/store/useCalendarStore';
import clsx from 'clsx';

type VenueType = 'office' | 'home' | 'cafe' | 'gallery';
type SizeType = 'wall-large' | 'wall-medium' | 'desk' | 'poster';
type LanguageType = 'japanese' | 'english' | 'french' | 'german';

interface VenueRenderProps {
  venue: VenueType;
  size?: SizeType;
  language?: LanguageType;
}

interface SizeRenderProps {
  size: SizeType;
  language?: LanguageType;
}

interface LanguageRenderProps {
  language: LanguageType;
  size?: SizeType;
}

const microseasonTranslations = {
  japanese: {
    season: '雨水',
    romanji: 'USUI',
    microseason: '霞始靆',
    description: 'Mist starts to linger',
  },
  english: {
    season: 'RAINWATER',
    romanji: 'February 19-23',
    microseason: 'Mist Starts to Linger',
    description: 'The first spring mists appear',
  },
  french: {
    season: 'EAU DE PLUIE',
    romanji: '19-23 Février',
    microseason: 'La Brume Commence',
    description: 'Les premières brumes printanières',
  },
  german: {
    season: 'REGENWASSER',
    romanji: '19-23 Februar',
    microseason: 'Nebel Beginnt Zu Verweilen',
    description: 'Die ersten Frühlingsnebel',
  },
};

export const VenueRender = ({ venue, size = 'wall-medium', language = 'japanese' }: VenueRenderProps) => {
  const { darkMode } = useCalendarStore();
  const translation = microseasonTranslations[language];

  const venueSettings = {
    office: {
      bgGradient: 'linear-gradient(to bottom, #f8f9fa 0%, #e9ecef 100%)',
      furnitureColor: '#495057',
      accentColor: '#2c3e50',
      description: 'Modern Office',
      details: 'Conference room with natural light',
    },
    home: {
      bgGradient: 'linear-gradient(to bottom, #fff8f0 0%, #f5e6d3 100%)',
      furnitureColor: '#8d6e63',
      accentColor: '#5d4037',
      description: 'Living Space',
      details: 'Minimal Japanese-inspired interior',
    },
    cafe: {
      bgGradient: 'linear-gradient(to bottom, #faf8f5 0%, #e8e4df 100%)',
      furnitureColor: '#6d4c41',
      accentColor: '#3e2723',
      description: 'Café Interior',
      details: 'Specialty coffee shop ambiance',
    },
    gallery: {
      bgGradient: 'linear-gradient(to bottom, #ffffff 0%, #f8f9fa 100%)',
      furnitureColor: '#212529',
      accentColor: '#000000',
      description: 'Gallery Space',
      details: 'Museum-quality white cube',
    },
  };

  const setting = venueSettings[venue];
  const calendarSize = size === 'wall-large' ? '45%' : size === 'wall-medium' ? '35%' : '25%';

  return (
    <motion.div
      className="relative w-full max-w-5xl mx-auto aspect-[16/10] rounded-3xl overflow-hidden"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
    >
      {/* Venue background */}
      <div
        className="absolute inset-0"
        style={{ background: setting.bgGradient }}
      >
        {/* Architectural grid lines */}
        <svg className="absolute inset-0 w-full h-full opacity-5">
          <defs>
            <pattern id={`grid-${venue}`} width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill={`url(#grid-${venue})`} />
        </svg>

        {/* Ambient lighting */}
        <div
          className="absolute top-0 left-0 right-0 h-2/3 opacity-30"
          style={{
            background: 'radial-gradient(ellipse at 50% 0%, rgba(255,248,220,0.8), transparent)',
          }}
        />

        {/* Floor/horizon line */}
        <div
          className="absolute bottom-0 left-0 right-0 h-1/3 opacity-40"
          style={{
            background: `linear-gradient(to top, ${setting.furnitureColor}20, transparent)`,
          }}
        />

        {/* Calendar on wall */}
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          style={{ width: calendarSize }}
        >
          <motion.div
            className="relative w-full aspect-[4/5] rounded-xl overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, #3e2723 0%, #5d4037 50%, #4e342e 100%)',
              padding: '5%',
              boxShadow: `
                0 30px 80px rgba(0,0,0,0.3),
                0 12px 32px rgba(0,0,0,0.2),
                0 0 0 1px rgba(0,0,0,0.1)
              `,
            }}
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            viewport={{ once: true }}
          >
            {/* Calendar backing */}
            <div
              className="w-full h-full rounded-lg relative"
              style={{
                background: '#faf8f5',
                boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.08)',
              }}
            >
              {/* Calendar grid */}
              <div className="absolute inset-[8%] grid grid-cols-7 gap-[2%]">
                {Array.from({ length: 35 }).map((_, i) => {
                  const isCurrentMicroseason = i >= 10 && i < 15;
                  const day = i < 31 ? i + 1 : '';

                  return (
                    <div
                      key={i}
                      className="rounded-sm"
                      style={{
                        background: isCurrentMicroseason
                          ? 'linear-gradient(135deg, rgba(212,175,55,0.3), rgba(212,175,55,0.15))'
                          : 'white',
                        boxShadow: isCurrentMicroseason
                          ? '0 1px 3px rgba(212,175,55,0.3), inset 0 1px 2px rgba(255,255,255,0.5)'
                          : '0 1px 2px rgba(0,0,0,0.08)',
                      }}
                    >
                      <div className="absolute inset-0 flex items-center justify-center text-[0.5vw] font-medium opacity-60">
                        {day}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Microseason label */}
              <div className="absolute bottom-[8%] left-[8%] right-[8%]">
                <div
                  className="backdrop-blur-md rounded px-[6%] py-[4%]"
                  style={{
                    background: 'rgba(255,255,255,0.95)',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  }}
                >
                  <div className="text-[0.6vw] tracking-wider text-amber-700 font-semibold">
                    {translation.season} • {translation.romanji}
                  </div>
                  <div className="text-[0.7vw] mt-0.5 font-medium text-gray-800">
                    {translation.microseason}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Shadow on floor/wall */}
          <div
            className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-full h-8 blur-2xl opacity-30"
            style={{
              background: 'radial-gradient(ellipse, rgba(0,0,0,0.5), transparent)',
            }}
          />
        </div>

        {/* Venue-specific elements */}
        {venue === 'office' && (
          <>
            {/* Table edge */}
            <div
              className="absolute bottom-0 left-0 right-0 h-16"
              style={{ background: `linear-gradient(to bottom, transparent, ${setting.furnitureColor}90)` }}
            />
            {/* Laptop corner */}
            <div
              className="absolute bottom-8 right-12 w-32 h-24 rounded-t-lg opacity-40"
              style={{ background: setting.furnitureColor }}
            />
          </>
        )}

        {venue === 'home' && (
          <>
            {/* Plant silhouette */}
            <div className="absolute bottom-0 right-16 w-24 h-64 opacity-20">
              <div
                className="w-full h-full rounded-t-full"
                style={{ background: `linear-gradient(to top, ${setting.furnitureColor}, transparent)` }}
              />
            </div>
            {/* Side table */}
            <div
              className="absolute bottom-0 left-12 w-48 h-32 opacity-30 rounded-t-lg"
              style={{ background: setting.furnitureColor }}
            />
          </>
        )}

        {venue === 'cafe' && (
          <>
            {/* Menu board silhouette */}
            <div
              className="absolute top-20 right-16 w-24 h-32 rounded-lg opacity-15"
              style={{ background: setting.accentColor }}
            />
            {/* Counter edge */}
            <div
              className="absolute bottom-0 left-0 w-1/3 h-20 opacity-40"
              style={{ background: setting.furnitureColor }}
            />
          </>
        )}

        {venue === 'gallery' && (
          <>
            {/* Spotlight effect */}
            <div
              className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-1/3 opacity-20"
              style={{
                background: 'radial-gradient(ellipse at top, rgba(255,255,255,1), transparent)',
              }}
            />
            {/* Floor reflection */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-1/4 opacity-5">
              <div
                className="w-full h-full"
                style={{
                  background: `radial-gradient(ellipse at bottom, ${setting.accentColor}, transparent)`,
                }}
              />
            </div>
          </>
        )}
      </div>

      {/* Venue label */}
      <div className="absolute top-6 left-6">
        <div
          className={clsx(
            'backdrop-blur-sm rounded-lg px-4 py-2',
            darkMode ? 'bg-black/40' : 'bg-white/60'
          )}
        >
          <div className={clsx('text-xs font-semibold', darkMode ? 'text-white' : 'text-gray-800')}>
            {setting.description}
          </div>
          <div className={clsx('text-xs opacity-60', darkMode ? 'text-white' : 'text-gray-600')}>
            {setting.details}
          </div>
        </div>
      </div>

      {/* Technical annotation */}
      <div className="absolute bottom-6 right-6">
        <div
          className={clsx(
            'backdrop-blur-sm rounded-lg px-4 py-2 font-mono text-xs',
            darkMode ? 'bg-black/40 text-white' : 'bg-white/60 text-gray-700'
          )}
        >
          <div className="opacity-60">Scale: {size}</div>
          <div className="opacity-60">Language: {language}</div>
        </div>
      </div>
    </motion.div>
  );
};

export const SizeComparisonRender = () => {
  const { darkMode } = useCalendarStore();

  const sizes = [
    {
      id: 'wall-large' as SizeType,
      name: 'Wall Large',
      dimensions: '32" × 26"',
      scale: 1,
      description: 'Statement piece',
    },
    {
      id: 'wall-medium' as SizeType,
      name: 'Wall Medium',
      dimensions: '20" × 16"',
      scale: 0.625,
      description: 'Standard size',
    },
    {
      id: 'desk' as SizeType,
      name: 'Desk',
      dimensions: '12" × 10"',
      scale: 0.375,
      description: 'Compact desktop',
    },
    {
      id: 'poster' as SizeType,
      name: 'Poster',
      dimensions: '18" × 24"',
      scale: 0.7,
      description: 'Vertical format',
    },
  ];

  return (
    <motion.div
      className="relative w-full max-w-6xl mx-auto"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
    >
      {/* Architectural elevation view */}
      <div className={clsx(
        'rounded-3xl p-12',
        darkMode ? 'bg-sumi-800' : 'bg-gradient-to-br from-gray-50 to-gray-100'
      )}>
        {/* Title */}
        <div className="text-center mb-16">
          <h3 className={clsx('text-3xl font-light mb-2', darkMode ? 'text-washi-100' : 'text-gray-900')}>
            Size Specifications
          </h3>
          <p className={clsx('text-sm font-mono', darkMode ? 'text-washi-400' : 'text-gray-600')}>
            ARCHITECTURAL ELEVATION • 1:10 SCALE
          </p>
        </div>

        {/* Size grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {sizes.map((size, index) => (
            <motion.div
              key={size.id}
              className="relative"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
            >
              {/* Dimension lines */}
              <div className="relative mb-6">
                {/* Calendar representation */}
                <div
                  className={clsx(
                    'mx-auto aspect-[4/5] rounded-lg border-2',
                    darkMode ? 'border-amber-500/40 bg-sumi-700' : 'border-amber-600/40 bg-white'
                  )}
                  style={{
                    width: `${size.scale * 200}px`,
                    maxWidth: '100%',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
                  }}
                >
                  {/* Simplified grid */}
                  <div className="p-3 h-full">
                    <div className="grid grid-cols-7 gap-0.5 h-full">
                      {Array.from({ length: 35 }).map((_, i) => (
                        <div
                          key={i}
                          className={clsx(
                            'rounded-sm',
                            darkMode ? 'bg-sumi-600' : 'bg-gray-100'
                          )}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Horizontal dimension line */}
                <div className="absolute -bottom-4 left-0 right-0 flex items-center justify-center">
                  <div className={clsx('h-px flex-1', darkMode ? 'bg-amber-500/40' : 'bg-amber-600/40')} />
                  <div className={clsx('text-xs font-mono mx-2', darkMode ? 'text-amber-400' : 'text-amber-700')}>
                    {size.dimensions.split(' × ')[0]}
                  </div>
                  <div className={clsx('h-px flex-1', darkMode ? 'bg-amber-500/40' : 'bg-amber-600/40')} />
                </div>

                {/* Vertical dimension line */}
                <div className="absolute top-0 -right-8 bottom-0 flex flex-col items-center justify-center">
                  <div className={clsx('w-px flex-1', darkMode ? 'bg-amber-500/40' : 'bg-amber-600/40')} />
                  <div
                    className={clsx('text-xs font-mono my-2 -rotate-90 whitespace-nowrap', darkMode ? 'text-amber-400' : 'text-amber-700')}
                    style={{ transformOrigin: 'center' }}
                  >
                    {size.dimensions.split(' × ')[1]}
                  </div>
                  <div className={clsx('w-px flex-1', darkMode ? 'bg-amber-500/40' : 'bg-amber-600/40')} />
                </div>
              </div>

              {/* Labels */}
              <div className="text-center mt-8">
                <div className={clsx('font-medium text-sm', darkMode ? 'text-washi-100' : 'text-gray-900')}>
                  {size.name}
                </div>
                <div className={clsx('text-xs font-mono mt-1', darkMode ? 'text-washi-400' : 'text-gray-600')}>
                  {size.dimensions}
                </div>
                <div className={clsx('text-xs mt-1', darkMode ? 'text-washi-500' : 'text-gray-500')}>
                  {size.description}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Scale reference */}
        <div className="mt-16 pt-8 border-t border-current opacity-20" />
        <div className="mt-8 text-center">
          <div className={clsx('text-sm', darkMode ? 'text-washi-300' : 'text-gray-600')}>
            All sizes maintain 4:5 aspect ratio • LED backlit • Premium hardwood frame
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export const LanguageVariationsRender = () => {
  const { darkMode } = useCalendarStore();
  const [selectedLanguage, setSelectedLanguage] = useState<LanguageType>('japanese');

  const languages = [
    { id: 'japanese' as LanguageType, name: 'Japanese', nativeName: '日本語' },
    { id: 'english' as LanguageType, name: 'English', nativeName: 'English' },
    { id: 'french' as LanguageType, name: 'French', nativeName: 'Français' },
    { id: 'german' as LanguageType, name: 'German', nativeName: 'Deutsch' },
  ];

  const translation = microseasonTranslations[selectedLanguage];

  return (
    <motion.div
      className="relative w-full max-w-5xl mx-auto"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
    >
      <div className={clsx(
        'rounded-3xl p-12',
        darkMode ? 'bg-sumi-800' : 'bg-gradient-to-br from-gray-50 to-gray-100'
      )}>
        {/* Title */}
        <div className="text-center mb-12">
          <h3 className={clsx('text-3xl font-light mb-2', darkMode ? 'text-washi-100' : 'text-gray-900')}>
            Global Editions
          </h3>
          <p className={clsx('text-sm', darkMode ? 'text-washi-400' : 'text-gray-600')}>
            Microseasons calendar available in multiple languages
          </p>
        </div>

        {/* Language selector */}
        <div className="flex justify-center gap-4 mb-12">
          {languages.map((lang) => (
            <motion.button
              key={lang.id}
              onClick={() => setSelectedLanguage(lang.id)}
              className={clsx(
                'px-6 py-3 rounded-xl transition-all duration-300',
                selectedLanguage === lang.id
                  ? darkMode
                    ? 'bg-amber-500/20 text-amber-300 shadow-lg'
                    : 'bg-amber-100 text-amber-800 shadow-lg'
                  : darkMode
                  ? 'bg-sumi-700/50 text-washi-300 hover:bg-sumi-700'
                  : 'bg-white/50 text-gray-700 hover:bg-white hover:shadow-md'
              )}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="text-sm font-medium">{lang.nativeName}</div>
              <div className="text-xs opacity-60">{lang.name}</div>
              {selectedLanguage === lang.id && (
                <motion.div
                  className="h-0.5 bg-amber-500 rounded-full mt-2"
                  layoutId="languageSelector"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
            </motion.button>
          ))}
        </div>

        {/* Calendar preview */}
        <motion.div
          key={selectedLanguage}
          className="relative w-full max-w-2xl mx-auto aspect-[4/5] rounded-2xl overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(135deg, #3e2723 0%, #5d4037 50%, #4e342e 100%)',
              padding: '24px',
            }}
          >
            <div
              className="w-full h-full rounded-lg relative"
              style={{
                background: '#faf8f5',
                boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.08)',
              }}
            >
              {/* Calendar grid */}
              <div className="absolute inset-6 grid grid-cols-7 gap-1.5">
                {Array.from({ length: 35 }).map((_, i) => {
                  const isCurrentMicroseason = i >= 10 && i < 15;
                  const day = i < 31 ? i + 1 : '';

                  return (
                    <div
                      key={i}
                      className="rounded-md relative"
                      style={{
                        background: isCurrentMicroseason
                          ? 'linear-gradient(135deg, rgba(212,175,55,0.25), rgba(212,175,55,0.12))'
                          : 'white',
                        boxShadow: isCurrentMicroseason
                          ? '0 2px 6px rgba(212,175,55,0.3), inset 0 1px 2px rgba(255,255,255,0.5)'
                          : '0 1px 3px rgba(0,0,0,0.1)',
                      }}
                    >
                      <div className="absolute inset-0 flex items-center justify-center text-sm font-medium opacity-70">
                        {day}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Microseason label with translation */}
              <div className="absolute bottom-6 left-6 right-6">
                <motion.div
                  className="backdrop-blur-md rounded-lg px-6 py-4"
                  style={{
                    background: 'rgba(255,255,255,0.95)',
                    boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  <div className="text-sm tracking-wider text-amber-700 font-semibold">
                    {translation.season} • {translation.romanji}
                  </div>
                  <div className="text-lg mt-2 font-medium text-gray-800">
                    {translation.microseason}
                  </div>
                  <div className="text-sm mt-1 text-gray-600">
                    {translation.description}
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Language features */}
        <div className="mt-12 grid md:grid-cols-2 gap-6">
          <div className={clsx(
            'p-6 rounded-xl',
            darkMode ? 'bg-sumi-700/50' : 'bg-white/60'
          )}>
            <h4 className={clsx('text-sm font-semibold mb-2', darkMode ? 'text-washi-100' : 'text-gray-900')}>
              Localized Content
            </h4>
            <p className={clsx('text-sm', darkMode ? 'text-washi-400' : 'text-gray-600')}>
              All 72 microseasons translated with cultural context and seasonal descriptions
            </p>
          </div>
          <div className={clsx(
            'p-6 rounded-xl',
            darkMode ? 'bg-sumi-700/50' : 'bg-white/60'
          )}>
            <h4 className={clsx('text-sm font-semibold mb-2', darkMode ? 'text-washi-100' : 'text-gray-900')}>
              Typography Optimized
            </h4>
            <p className={clsx('text-sm', darkMode ? 'text-washi-400' : 'text-gray-600')}>
              Custom font selections and spacing for each language to ensure readability
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
