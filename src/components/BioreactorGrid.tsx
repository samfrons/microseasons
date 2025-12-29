'use client';

import { motion } from 'framer-motion';
import { useState, useEffect, useMemo } from 'react';
import AlgaePanel from './AlgaePanel';
import { microseasons } from '@/data/microseasons';

interface BioreactorGridProps {
  rows?: number;
  cols?: number;
  panelSize?: 'sm' | 'md' | 'lg';
  showLabels?: boolean;
  highlightCurrent?: boolean;
  interactive?: boolean;
  variant?: 'wall' | 'floating' | 'product';
  className?: string;
}

// Get current microseason based on date
function getCurrentMicroseasonIndex(): number {
  const now = new Date();
  const month = now.getMonth() + 1;
  const day = now.getDate();

  for (let i = 0; i < microseasons.length; i++) {
    const season = microseasons[i];
    const start = season.startDate;
    const end = season.endDate;

    // Handle year wrap (some seasons span December to January)
    if (start.month > end.month) {
      if (month >= start.month || month <= end.month) {
        if (month === start.month && day >= start.day) return i;
        if (month === end.month && day <= end.day) return i;
        if (month > start.month || month < end.month) return i;
      }
    } else {
      if (month > start.month && month < end.month) return i;
      if (month === start.month && day >= start.day) return i;
      if (month === end.month && day <= end.day) return i;
    }
  }
  return 0;
}

// LED colors for different tracking purposes
const ledColors = [
  'var(--color-led-cyan)',
  'var(--color-led-green)',
  'var(--color-led-amber)',
  'var(--color-led-magenta)',
  'var(--color-led-purple)',
];

export default function BioreactorGrid({
  rows = 6,
  cols = 12,
  panelSize = 'sm',
  showLabels = false,
  highlightCurrent = true,
  interactive = true,
  variant = 'wall',
  className = '',
}: BioreactorGridProps) {
  const [mounted, setMounted] = useState(false);
  const [activePanelIndex, setActivePanelIndex] = useState<number | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const currentSeasonIndex = useMemo(() => getCurrentMicroseasonIndex(), []);
  const totalPanels = rows * cols;

  useEffect(() => {
    setMounted(true);
    if (highlightCurrent) {
      setActivePanelIndex(currentSeasonIndex % totalPanels);
    }
  }, [highlightCurrent, currentSeasonIndex, totalPanels]);

  // Generate panels with microseason data
  const panels = useMemo(() => {
    return Array.from({ length: totalPanels }, (_, index) => {
      const seasonIndex = index % microseasons.length;
      const season = microseasons[seasonIndex];

      // Generate LED states - varies by panel
      const leds = ledColors.map((color, ledIndex) => ({
        color,
        active: Math.random() > 0.6 || (index === activePanelIndex && ledIndex === 0),
        label: ['Habit', 'Observation', 'Mood', 'Activity', 'Custom'][ledIndex],
      }));

      return {
        id: index,
        season,
        leds,
        isActive: index === activePanelIndex,
        isCurrent: index === currentSeasonIndex % totalPanels,
      };
    });
  }, [totalPanels, activePanelIndex, currentSeasonIndex]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.02,
        delayChildren: 0.1,
      },
    },
  };

  const variantStyles = {
    wall: {
      background: 'linear-gradient(180deg, #1a1a1a 0%, #2d2d2d 100%)',
      padding: '2rem',
      boxShadow: 'inset 0 0 100px rgba(0,0,0,0.5)',
    },
    floating: {
      background: 'transparent',
      padding: '1rem',
    },
    product: {
      background: 'linear-gradient(135deg, var(--color-walnut) 0%, #3d2817 100%)',
      padding: '1.5rem',
      boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)',
    },
  };

  return (
    <div className={`relative ${className}`}>
      {/* Wood/Wall background frame */}
      <motion.div
        className="relative overflow-hidden"
        style={variantStyles[variant]}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: mounted ? 1 : 0, scale: mounted ? 1 : 0.95 }}
        transition={{ duration: 0.8 }}
      >
        {/* Ambient backlight glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `
              radial-gradient(ellipse at 30% 30%, var(--color-algae-glow) 0%, transparent 50%),
              radial-gradient(ellipse at 70% 70%, var(--color-algae-glow) 0%, transparent 50%)
            `,
            opacity: 0.3,
          }}
        />

        {/* Grid of panels */}
        <motion.div
          className="grid gap-2 relative z-10"
          style={{
            gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
          }}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {panels.map((panel, index) => (
            <motion.div
              key={panel.id}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              onMouseEnter={() => interactive && setHoveredIndex(index)}
              onMouseLeave={() => interactive && setHoveredIndex(null)}
              onClick={() => interactive && setActivePanelIndex(index)}
            >
              <AlgaePanel
                size={panelSize}
                microseasonName={showLabels ? panel.season.nameEn : undefined}
                date={showLabels ? `${panel.season.startDate.month}/${panel.season.startDate.day}` : undefined}
                leds={panel.leds}
                isActive={panel.isActive || hoveredIndex === index}
                variant={panel.isCurrent ? 'featured' : 'standard'}
                animationDelay={index * 0.02}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Current season indicator */}
        {highlightCurrent && activePanelIndex !== null && (
          <motion.div
            className="absolute bottom-4 left-4 right-4 p-4 bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <div className="flex items-center gap-4">
              <div
                className="w-3 h-3 led-pulse"
                style={{
                  backgroundColor: 'var(--color-led-cyan)',
                  boxShadow: '0 0 10px var(--color-led-cyan)',
                }}
              />
              <div>
                <p className="text-white/60 text-xs uppercase tracking-wider">
                  Current Microseason
                </p>
                <p className="text-white text-lg font-serif">
                  {microseasons[activePanelIndex % microseasons.length].nameEn}
                </p>
                <p className="text-white/40 text-sm">
                  {microseasons[activePanelIndex % microseasons.length].nameJa}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* Reflection/shadow beneath */}
      {variant === 'product' && (
        <div
          className="absolute -bottom-8 left-4 right-4 h-16 blur-xl opacity-30"
          style={{
            background: 'linear-gradient(180deg, var(--color-algae-dark) 0%, transparent 100%)',
          }}
        />
      )}
    </div>
  );
}
