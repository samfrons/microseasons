'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

interface LEDIndicator {
  color: string;
  active: boolean;
  label?: string;
}

interface AlgaePanelProps {
  title?: string;
  subtitle?: string;
  microseasonName?: string;
  date?: string;
  leds?: LEDIndicator[];
  size?: 'sm' | 'md' | 'lg';
  variant?: 'standard' | 'featured' | 'minimal';
  animationDelay?: number;
  isActive?: boolean;
  onClick?: () => void;
}

const sizeClasses = {
  sm: 'w-24 h-28',
  md: 'w-36 h-40',
  lg: 'w-48 h-52',
};

const defaultLEDs: LEDIndicator[] = [
  { color: 'var(--color-led-cyan)', active: true },
  { color: 'var(--color-led-green)', active: false },
  { color: 'var(--color-led-amber)', active: false },
  { color: 'var(--color-led-magenta)', active: false },
  { color: 'var(--color-led-purple)', active: false },
];

export default function AlgaePanel({
  title,
  subtitle,
  microseasonName,
  date,
  leds = defaultLEDs,
  size = 'md',
  variant = 'standard',
  animationDelay = 0,
  isActive = false,
  onClick,
}: AlgaePanelProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Generate random algae texture variations
  const algaeGradient = `
    radial-gradient(ellipse at 30% 20%, var(--color-algae-light) 0%, transparent 50%),
    radial-gradient(ellipse at 70% 60%, var(--color-algae-dark) 0%, transparent 40%),
    radial-gradient(ellipse at 50% 80%, var(--color-algae-mid) 0%, transparent 60%),
    linear-gradient(180deg, var(--color-algae-light) 0%, var(--color-algae-mid) 50%, var(--color-algae-dark) 100%)
  `;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : 20 }}
      transition={{ duration: 0.6, delay: animationDelay }}
      onClick={onClick}
      className={`
        relative group cursor-pointer
        ${sizeClasses[size]}
      `}
    >
      {/* Brass/Wood Frame */}
      <div
        className="absolute inset-0 p-1"
        style={{
          background: `linear-gradient(135deg, var(--color-brass-light) 0%, var(--color-brass) 50%, var(--color-brass-dark) 100%)`,
        }}
      >
        {/* Inner frame shadow */}
        <div
          className="absolute inset-1"
          style={{
            boxShadow: 'inset 2px 2px 4px rgba(0,0,0,0.2), inset -1px -1px 2px rgba(255,255,255,0.3)',
          }}
        />
      </div>

      {/* Algae Panel - Living Surface */}
      <div
        className={`
          absolute inset-2 overflow-hidden
          ${isActive ? 'panel-glow' : ''}
        `}
        style={{
          background: algaeGradient,
        }}
      >
        {/* Algae texture overlay */}
        <div
          className="absolute inset-0 algae-breathe"
          style={{
            background: `
              radial-gradient(circle at 25% 35%, rgba(255,255,255,0.15) 0%, transparent 25%),
              radial-gradient(circle at 75% 65%, rgba(0,0,0,0.1) 0%, transparent 30%),
              radial-gradient(circle at 50% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)
            `,
            mixBlendMode: 'overlay',
          }}
        />

        {/* Bubbles/organic elements */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute bg-white/20"
              style={{
                width: Math.random() * 8 + 4,
                height: Math.random() * 8 + 4,
                borderRadius: '50%',
                left: `${Math.random() * 80 + 10}%`,
                top: `${Math.random() * 80 + 10}%`,
              }}
              animate={{
                y: [0, -10, 0],
                opacity: [0.2, 0.4, 0.2],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        {/* Backlight glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at center, var(--color-algae-glow) 0%, transparent 70%)',
            opacity: isActive ? 0.8 : 0.4,
            transition: 'opacity 0.5s ease',
          }}
        />

        {/* Content overlay */}
        {(title || microseasonName) && variant !== 'minimal' && (
          <div className="absolute inset-0 flex flex-col justify-end p-2 bg-gradient-to-t from-black/40 to-transparent">
            {microseasonName && (
              <p className="text-white text-xs font-medium leading-tight line-clamp-2">
                {microseasonName}
              </p>
            )}
            {date && (
              <p className="text-white/70 text-[10px] mt-0.5">
                {date}
              </p>
            )}
          </div>
        )}
      </div>

      {/* LED Indicators Row */}
      <div className="absolute -bottom-1 left-2 right-2 flex justify-center gap-1.5">
        {leds.map((led, index) => (
          <motion.div
            key={index}
            className={`
              w-2 h-2
              ${led.active ? 'led-pulse' : ''}
            `}
            style={{
              backgroundColor: led.active ? led.color : 'rgba(100,100,100,0.3)',
              boxShadow: led.active ? `0 0 8px ${led.color}` : 'none',
              transition: 'all 0.3s ease',
            }}
            whileHover={{ scale: 1.3 }}
          />
        ))}
      </div>

      {/* Hover effect */}
      <motion.div
        className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors duration-300 pointer-events-none"
      />

      {/* Featured variant - extra glow */}
      {variant === 'featured' && (
        <div
          className="absolute -inset-2 -z-10 opacity-50"
          style={{
            background: 'radial-gradient(ellipse at center, var(--color-algae-glow) 0%, transparent 70%)',
            filter: 'blur(10px)',
          }}
        />
      )}
    </motion.div>
  );
}
