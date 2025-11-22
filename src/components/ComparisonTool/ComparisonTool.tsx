'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { germanRegions, type Region } from '@/data/regionalData';
import { vibes, type Vibe } from '@/data/vibes';
import { generateMicroseasons } from '@/utils/microseasonsGenerator';
import { useCalendarStore } from '@/store/useCalendarStore';
import clsx from 'clsx';

export const ComparisonTool = () => {
  const { darkMode } = useCalendarStore();
  const [leftRegion, setLeftRegion] = useState<Region>(germanRegions[0]);
  const [leftVibe, setLeftVibe] = useState<Vibe>(vibes[0]);
  const [rightRegion, setRightRegion] = useState<Region>(germanRegions[1]);
  const [rightVibe, setRightVibe] = useState<Vibe>(vibes[1]);

  const leftMicroseasons = generateMicroseasons(leftRegion, leftVibe);
  const rightMicroseasons = generateMicroseasons(rightRegion, rightVibe);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className={clsx('text-4xl font-light mb-4', darkMode ? 'text-white' : 'text-gray-900')}>
          Compare Combinations
        </h2>
        <p className={clsx('text-lg max-w-2xl mx-auto', darkMode ? 'text-gray-300' : 'text-gray-600')}>
          See how different locations and vibes change your microseasons calendar
        </p>
      </div>

      {/* Comparison Grid */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* Left Side */}
        <ComparisonPanel
          region={leftRegion}
          vibe={leftVibe}
          microseasons={leftMicroseasons}
          onRegionChange={setLeftRegion}
          onVibeChange={setLeftVibe}
          darkMode={darkMode}
          side="left"
        />

        {/* Divider */}
        <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gray-300 dark:via-gray-700 to-transparent" />

        {/* Right Side */}
        <ComparisonPanel
          region={rightRegion}
          vibe={rightVibe}
          microseasons={rightMicroseasons}
          onRegionChange={setRightRegion}
          onVibeChange={setRightVibe}
          darkMode={darkMode}
          side="right"
        />
      </div>

      {/* Differences Summary */}
      <DifferencesSummary
        leftRegion={leftRegion}
        rightRegion={rightRegion}
        leftVibe={leftVibe}
        rightVibe={rightVibe}
        darkMode={darkMode}
      />
    </div>
  );
};

interface ComparisonPanelProps {
  region: Region;
  vibe: Vibe;
  microseasons: any[];
  onRegionChange: (region: Region) => void;
  onVibeChange: (vibe: Vibe) => void;
  darkMode: boolean;
  side: 'left' | 'right';
}

const ComparisonPanel = ({
  region,
  vibe,
  microseasons,
  onRegionChange,
  onVibeChange,
  darkMode,
  side,
}: ComparisonPanelProps) => {
  const sampleMicroseasons = microseasons.slice(0, 6);

  return (
    <motion.div
      initial={{ opacity: 0, x: side === 'left' ? -20 : 20 }}
      animate={{ opacity: 1, x: 0 }}
      className={clsx(
        'rounded-2xl p-6 border',
        darkMode ? 'bg-gray-800/50 border-gray-700' : 'bg-white border-gray-200'
      )}
    >
      {/* Region Selector */}
      <div className="mb-6">
        <label className={clsx('block text-sm font-medium mb-2', darkMode ? 'text-gray-300' : 'text-gray-700')}>
          Location
        </label>
        <select
          value={region.id}
          onChange={(e) => {
            const newRegion = germanRegions.find((r: Region) => r.id === e.target.value);
            if (newRegion) onRegionChange(newRegion);
          }}
          className={clsx(
            'w-full px-4 py-2 rounded-lg border transition-colors',
            darkMode
              ? 'bg-gray-900 border-gray-700 text-white'
              : 'bg-white border-gray-300 text-gray-900'
          )}
        >
          {germanRegions.map((r: Region) => (
            <option key={r.id} value={r.id}>
              {r.name}, {r.country}
            </option>
          ))}
        </select>
      </div>

      {/* Vibe Selector */}
      <div className="mb-6">
        <label className={clsx('block text-sm font-medium mb-2', darkMode ? 'text-gray-300' : 'text-gray-700')}>
          Vibe
        </label>
        <select
          value={vibe.id}
          onChange={(e) => {
            const newVibe = vibes.find((v: Vibe) => v.id === e.target.value);
            if (newVibe) onVibeChange(newVibe);
          }}
          className={clsx(
            'w-full px-4 py-2 rounded-lg border transition-colors',
            darkMode
              ? 'bg-gray-900 border-gray-700 text-white'
              : 'bg-white border-gray-300 text-gray-900'
          )}
        >
          {vibes.map((v: Vibe) => (
            <option key={v.id} value={v.id}>
              {v.name}
            </option>
          ))}
        </select>
      </div>

      {/* Color Palette Preview */}
      <div className="mb-6">
        <p className={clsx('text-sm font-medium mb-2', darkMode ? 'text-gray-300' : 'text-gray-700')}>
          Color Palette
        </p>
        <div className="flex gap-2">
          {vibe.colorPalette.map((color: string, i: number) => (
            <div
              key={i}
              className="h-8 flex-1 rounded"
              style={{ backgroundColor: color }}
              title={color}
            />
          ))}
        </div>
      </div>

      {/* Sample Microseasons */}
      <div>
        <p className={clsx('text-sm font-medium mb-3', darkMode ? 'text-gray-300' : 'text-gray-700')}>
          Sample Microseasons
        </p>
        <div className="space-y-2">
          {sampleMicroseasons.map((ms, i) => (
            <div
              key={i}
              className={clsx(
                'p-3 rounded-lg text-sm',
                darkMode ? 'bg-gray-900/50' : 'bg-gray-50'
              )}
            >
              <div className={clsx('font-medium', darkMode ? 'text-white' : 'text-gray-900')}>
                {ms.name}
              </div>
              <div className={clsx('text-xs mt-1', darkMode ? 'text-gray-400' : 'text-gray-600')}>
                {ms.date}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="mt-6 pt-6 border-t border-current opacity-20" />
      <div className="grid grid-cols-2 gap-4 mt-6">
        <div className="text-center">
          <div className={clsx('text-2xl font-light', darkMode ? 'text-emerald-400' : 'text-emerald-600')}>
            {region.climate.temperatureRange.summer[1]}°C
          </div>
          <div className={clsx('text-xs', darkMode ? 'text-gray-500' : 'text-gray-600')}>
            Summer High
          </div>
        </div>
        <div className="text-center">
          <div className={clsx('text-2xl font-light', darkMode ? 'text-blue-400' : 'text-blue-600')}>
            {region.climate.temperatureRange.winter[0]}°C
          </div>
          <div className={clsx('text-xs', darkMode ? 'text-gray-500' : 'text-gray-600')}>
            Winter Low
          </div>
        </div>
      </div>
    </motion.div>
  );
};

interface DifferencesSummaryProps {
  leftRegion: Region;
  rightRegion: Region;
  leftVibe: Vibe;
  rightVibe: Vibe;
  darkMode: boolean;
}

const DifferencesSummary = ({
  leftRegion,
  rightRegion,
  leftVibe,
  rightVibe,
  darkMode,
}: DifferencesSummaryProps) => {
  const leftAvg = (leftRegion.climate.temperatureRange.summer[1] + leftRegion.climate.temperatureRange.winter[0]) / 2;
  const rightAvg = (rightRegion.climate.temperatureRange.summer[1] + rightRegion.climate.temperatureRange.winter[0]) / 2;
  const tempDiff = Math.abs(leftAvg - rightAvg);

  const vibeFocusDiff = Object.keys(leftVibe.focusAreas).map(key => ({
    key,
    diff: Math.abs(
      leftVibe.focusAreas[key as keyof typeof leftVibe.focusAreas] -
      rightVibe.focusAreas[key as keyof typeof rightVibe.focusAreas]
    ),
  })).sort((a, b) => b.diff - a.diff);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={clsx(
        'rounded-2xl p-8 border',
        darkMode ? 'bg-gray-800/30 border-gray-700' : 'bg-gray-50 border-gray-200'
      )}
    >
      <h3 className={clsx('text-2xl font-light mb-6', darkMode ? 'text-white' : 'text-gray-900')}>
        Key Differences
      </h3>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Climate Difference */}
        <div>
          <div className={clsx('text-sm font-medium mb-2', darkMode ? 'text-gray-400' : 'text-gray-600')}>
            Climate Variance
          </div>
          <div className={clsx('text-3xl font-light', darkMode ? 'text-emerald-400' : 'text-emerald-600')}>
            {tempDiff.toFixed(1)}°C
          </div>
          <p className={clsx('text-xs mt-1', darkMode ? 'text-gray-500' : 'text-gray-600')}>
            Average temperature difference
          </p>
        </div>

        {/* Vibe Focus */}
        <div>
          <div className={clsx('text-sm font-medium mb-2', darkMode ? 'text-gray-400' : 'text-gray-600')}>
            Biggest Focus Shift
          </div>
          <div className={clsx('text-lg font-medium capitalize', darkMode ? 'text-purple-400' : 'text-purple-600')}>
            {vibeFocusDiff[0].key}
          </div>
          <p className={clsx('text-xs mt-1', darkMode ? 'text-gray-500' : 'text-gray-600')}>
            {(vibeFocusDiff[0].diff * 100).toFixed(0)}% difference in emphasis
          </p>
        </div>

        {/* Region Similarity */}
        <div>
          <div className={clsx('text-sm font-medium mb-2', darkMode ? 'text-gray-400' : 'text-gray-600')}>
            Region Type
          </div>
          <div className={clsx('text-lg', darkMode ? 'text-blue-400' : 'text-blue-600')}>
            {leftRegion.country === rightRegion.country ? 'Same Country' : 'Different Countries'}
          </div>
          <p className={clsx('text-xs mt-1', darkMode ? 'text-gray-500' : 'text-gray-600')}>
            {leftRegion.country} vs {rightRegion.country}
          </p>
        </div>
      </div>
    </motion.div>
  );
};
