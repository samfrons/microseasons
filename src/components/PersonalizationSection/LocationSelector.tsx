'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { allRegions, findRegionByZipCode, Region } from '@/data/regionalData';
import { useCalendarStore } from '@/store/useCalendarStore';
import clsx from 'clsx';

interface LocationSelectorProps {
  onRegionSelect: (region: Region) => void;
}

export const LocationSelector = ({ onRegionSelect }: LocationSelectorProps) => {
  const { darkMode } = useCalendarStore();
  const [zipCode, setZipCode] = useState('');
  const [selectedRegion, setSelectedRegion] = useState<Region | null>(null);
  const [view, setView] = useState<'regions' | 'zipcode'>('regions');

  const handleZipCodeSearch = () => {
    const region = findRegionByZipCode(zipCode);
    if (region) {
      setSelectedRegion(region);
      onRegionSelect(region);
    }
  };

  const handleRegionClick = (region: Region) => {
    setSelectedRegion(region);
    onRegionSelect(region);
  };

  // Group regions by country
  const regionsByCountry = allRegions.reduce((acc, region) => {
    if (!acc[region.country]) {
      acc[region.country] = [];
    }
    acc[region.country].push(region);
    return acc;
  }, {} as Record<string, Region[]>);

  return (
    <div className="space-y-6">
      {/* View Toggle */}
      <div className="flex gap-3 justify-center">
        <button
          onClick={() => setView('regions')}
          className={clsx(
            'px-6 py-2 rounded-full text-sm font-medium transition-all duration-300',
            view === 'regions'
              ? darkMode
                ? 'bg-amber-500/20 text-amber-300 ring-2 ring-amber-500/50'
                : 'bg-amber-100 text-amber-800 ring-2 ring-amber-500/30'
              : darkMode
              ? 'bg-sumi-700/50 text-washi-400 hover:bg-sumi-700'
              : 'bg-washi-100/50 text-sumi-600 hover:bg-washi-100'
          )}
        >
          Browse Regions
        </button>
        <button
          onClick={() => setView('zipcode')}
          className={clsx(
            'px-6 py-2 rounded-full text-sm font-medium transition-all duration-300',
            view === 'zipcode'
              ? darkMode
                ? 'bg-amber-500/20 text-amber-300 ring-2 ring-amber-500/50'
                : 'bg-amber-100 text-amber-800 ring-2 ring-amber-500/30'
              : darkMode
              ? 'bg-sumi-700/50 text-washi-400 hover:bg-sumi-700'
              : 'bg-washi-100/50 text-sumi-600 hover:bg-washi-100'
          )}
        >
          Enter Zip Code
        </button>
      </div>

      {/* Zip Code Search */}
      {view === 'zipcode' && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md mx-auto"
        >
          <div className="flex gap-3">
            <input
              type="text"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
              placeholder="Enter zip code..."
              className={clsx(
                'flex-1 px-4 py-3 rounded-lg text-sm transition-all duration-300',
                darkMode
                  ? 'bg-sumi-700 text-washi-100 placeholder-washi-500 border border-washi-800 focus:border-amber-500/50 focus:ring-2 focus:ring-amber-500/20'
                  : 'bg-white text-sumi-900 placeholder-sumi-400 border border-sumi-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20'
              )}
              onKeyPress={(e) => e.key === 'Enter' && handleZipCodeSearch()}
            />
            <button
              onClick={handleZipCodeSearch}
              className={clsx(
                'px-6 py-3 rounded-lg text-sm font-medium transition-all duration-300',
                darkMode
                  ? 'bg-amber-500/20 text-amber-300 hover:bg-amber-500/30'
                  : 'bg-amber-500 text-white hover:bg-amber-600'
              )}
            >
              Search
            </button>
          </div>
        </motion.div>
      )}

      {/* Region Browser */}
      {view === 'regions' && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          {Object.entries(regionsByCountry).map(([country, regions]) => (
            <div key={country}>
              <h3
                className={clsx(
                  'text-lg font-medium mb-4',
                  darkMode ? 'text-washi-200' : 'text-sumi-800'
                )}
              >
                {country}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {regions.map((region) => (
                  <motion.button
                    key={region.id}
                    onClick={() => handleRegionClick(region)}
                    className={clsx(
                      'p-6 rounded-xl text-left transition-all duration-300',
                      selectedRegion?.id === region.id
                        ? darkMode
                          ? 'bg-amber-500/20 ring-2 ring-amber-500/50'
                          : 'bg-amber-50 ring-2 ring-amber-500/30'
                        : darkMode
                        ? 'bg-sumi-700/50 hover:bg-sumi-700 hover:ring-1 hover:ring-washi-800'
                        : 'bg-white hover:bg-washi-50 hover:ring-1 hover:ring-sumi-200'
                    )}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div
                          className={clsx(
                            'text-base font-medium mb-1',
                            darkMode ? 'text-washi-100' : 'text-sumi-900'
                          )}
                        >
                          {region.name}
                        </div>
                        <div
                          className={clsx(
                            'text-xs',
                            darkMode ? 'text-washi-400' : 'text-sumi-500'
                          )}
                        >
                          {region.timezone.split('/')[1].replace('_', ' ')}
                        </div>
                      </div>
                      {selectedRegion?.id === region.id && (
                        <div className="text-amber-500 text-lg">✓</div>
                      )}
                    </div>

                    {/* Climate preview */}
                    <div className="flex flex-wrap gap-2 mb-3">
                      {region.climate.snowfall && (
                        <span
                          className={clsx(
                            'text-xs px-2 py-1 rounded-full',
                            darkMode
                              ? 'bg-blue-500/20 text-blue-300'
                              : 'bg-blue-100 text-blue-700'
                          )}
                        >
                          ❄️ Snow
                        </span>
                      )}
                      <span
                        className={clsx(
                          'text-xs px-2 py-1 rounded-full',
                          darkMode
                            ? 'bg-green-500/20 text-green-300'
                            : 'bg-green-100 text-green-700'
                        )}
                      >
                        🌡️ {region.climate.temperatureRange.summer[0]}°C – {region.climate.temperatureRange.summer[1]}°C
                      </span>
                    </div>

                    {/* Natural features preview */}
                    <div
                      className={clsx(
                        'text-xs',
                        darkMode ? 'text-washi-400' : 'text-sumi-500'
                      )}
                    >
                      {region.culture.naturalFeatures.slice(0, 2).join(' • ')}
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>
          ))}
        </motion.div>
      )}

      {/* Selected Region Summary */}
      {selectedRegion && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={clsx(
            'p-6 rounded-xl',
            darkMode
              ? 'bg-gradient-to-br from-amber-500/10 to-amber-500/5 border border-amber-500/20'
              : 'bg-gradient-to-br from-amber-50 to-amber-100/50 border border-amber-200'
          )}
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="text-2xl">📍</div>
            <div>
              <div className={clsx('font-medium', darkMode ? 'text-washi-100' : 'text-sumi-900')}>
                Selected: {selectedRegion.name}, {selectedRegion.country}
              </div>
              <div className={clsx('text-sm', darkMode ? 'text-washi-400' : 'text-sumi-600')}>
                {selectedRegion.culture.naturalFeatures[0]} • {selectedRegion.climate.humidity} humidity
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};
