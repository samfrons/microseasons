'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

interface MockupProps {
  variant: 'hero' | 'detail' | 'lifestyle' | 'exploded' | 'hand';
  material?: 'walnut' | 'maple' | 'oak';
  className?: string;
}

export const PhysicalCalendarMockup = ({ variant, material = 'walnut', className = '' }: MockupProps) => {
  const [isHovered, setIsHovered] = useState(false);

  // Material color schemes
  const materials = {
    walnut: {
      wood: 'linear-gradient(135deg, #3e2723 0%, #5d4037 50%, #4e342e 100%)',
      woodHighlight: '#6d4c41',
      backing: '#faf8f5',
      accent: '#d4af37',
    },
    maple: {
      wood: 'linear-gradient(135deg, #f5e6d3 0%, #e8d5b7 50%, #d4c4a8 100%)',
      woodHighlight: '#f5f5dc',
      backing: '#ffffff',
      accent: '#c9a961',
    },
    oak: {
      wood: 'linear-gradient(135deg, #8d6e63 0%, #a1887f 50%, #9c7a6f 100%)',
      woodHighlight: '#bcaaa4',
      backing: '#fdfbf7',
      accent: '#b8976a',
    },
  };

  const currentMaterial = materials[material];

  if (variant === 'hero') {
    return (
      <div className={`relative ${className}`}>
        {/* Main calendar frame - 3/4 angle view */}
        <motion.div
          className="relative w-full aspect-[4/5] max-w-2xl mx-auto"
          style={{ perspective: '2000px' }}
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          viewport={{ once: true }}
        >
          {/* Dramatic shadow */}
          <div className="absolute inset-0 transform translate-y-8 blur-3xl opacity-40 bg-gradient-to-br from-gray-900 to-transparent rounded-3xl" />

          {/* Main calendar body */}
          <motion.div
            className="relative w-full h-full rounded-2xl overflow-hidden"
            style={{
              transform: 'rotateX(8deg) rotateY(-15deg) rotateZ(1deg)',
              transformStyle: 'preserve-3d',
              boxShadow: '40px 60px 120px rgba(0,0,0,0.3), 20px 30px 60px rgba(0,0,0,0.2)',
            }}
            animate={{
              transform: isHovered
                ? 'rotateX(5deg) rotateY(-12deg) rotateZ(0deg) scale(1.02)'
                : 'rotateX(8deg) rotateY(-15deg) rotateZ(1deg) scale(1)',
            }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            {/* Wooden frame */}
            <div
              className="absolute inset-0"
              style={{
                background: currentMaterial.wood,
                padding: '24px',
              }}
            >
              {/* Inner backing */}
              <div
                className="w-full h-full rounded-lg relative overflow-hidden"
                style={{
                  background: currentMaterial.backing,
                  boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.1)',
                }}
              >
                {/* Calendar grid */}
                <div className="absolute inset-4 grid grid-cols-7 gap-1">
                  {Array.from({ length: 35 }).map((_, i) => {
                    const isCurrentMicroseason = i >= 10 && i < 15;
                    const day = i < 31 ? i + 1 : '';

                    return (
                      <motion.div
                        key={i}
                        className="relative rounded-md overflow-hidden"
                        style={{
                          background: isCurrentMicroseason
                            ? `linear-gradient(135deg, ${currentMaterial.accent}40, ${currentMaterial.accent}20)`
                            : 'white',
                          boxShadow: isCurrentMicroseason
                            ? `0 2px 8px ${currentMaterial.accent}30, inset 0 1px 2px rgba(255,255,255,0.5)`
                            : '0 1px 3px rgba(0,0,0,0.1), inset 0 1px 2px rgba(255,255,255,0.8)',
                          border: `1px solid ${isCurrentMicroseason ? currentMaterial.accent + '40' : 'rgba(0,0,0,0.05)'}`,
                        }}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.02, duration: 0.3 }}
                        viewport={{ once: true }}
                      >
                        {/* Tile content */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span
                            className="text-xs font-medium"
                            style={{
                              color: isCurrentMicroseason ? currentMaterial.accent : '#333',
                              fontFamily: 'system-ui, -apple-system, sans-serif',
                              letterSpacing: '-0.02em',
                            }}
                          >
                            {day}
                          </span>
                        </div>

                        {/* LED indicator */}
                        {isCurrentMicroseason && (
                          <motion.div
                            className="absolute top-0.5 right-0.5 w-1 h-1 rounded-full"
                            style={{
                              background: currentMaterial.accent,
                              boxShadow: `0 0 4px ${currentMaterial.accent}, 0 0 8px ${currentMaterial.accent}60`,
                            }}
                            animate={{
                              opacity: [1, 0.6, 1],
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              ease: 'easeInOut',
                            }}
                          />
                        )}
                      </motion.div>
                    );
                  })}
                </div>

                {/* Microseason label overlay */}
                <div className="absolute bottom-4 left-4 right-4">
                  <motion.div
                    className="backdrop-blur-md rounded-lg px-4 py-3"
                    style={{
                      background: 'rgba(255,255,255,0.9)',
                      boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
                      border: '1px solid rgba(255,255,255,0.5)',
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.6 }}
                    viewport={{ once: true }}
                  >
                    <div className="text-xs tracking-wider" style={{ color: currentMaterial.accent, fontWeight: 600 }}>
                      雨水 • USUI
                    </div>
                    <div className="text-sm mt-1 font-medium text-gray-800">
                      霞始靆 • Mist starts to linger
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>

            {/* Edge highlights */}
            <div
              className="absolute top-0 left-0 right-0 h-1 opacity-50"
              style={{ background: currentMaterial.woodHighlight }}
            />
          </motion.div>
        </motion.div>
      </div>
    );
  }

  if (variant === 'detail') {
    return (
      <div className={`relative ${className}`}>
        {/* Close-up of tile mechanism */}
        <motion.div
          className="relative w-full max-w-3xl mx-auto aspect-video"
          style={{ perspective: '1500px' }}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {/* 3x3 grid detail view */}
          <div className="relative w-full h-full flex items-center justify-center">
            <div className="grid grid-cols-3 gap-6 p-8">
              {[
                { num: '12', active: false },
                { num: '13', active: true },
                { num: '14', active: true },
                { num: '19', active: false },
                { num: '20', active: true },
                { num: '21', active: false },
                { num: '26', active: false },
                { num: '27', active: false },
                { num: '28', active: false },
              ].map((tile, i) => (
                <motion.div
                  key={i}
                  className="w-24 h-24 rounded-xl relative"
                  style={{
                    background: tile.active
                      ? `linear-gradient(145deg, ${currentMaterial.accent}50, ${currentMaterial.accent}30)`
                      : 'linear-gradient(145deg, #ffffff, #f8f9fa)',
                    boxShadow: tile.active
                      ? `0 8px 24px ${currentMaterial.accent}40, 0 2px 8px rgba(0,0,0,0.1), inset 0 2px 4px rgba(255,255,255,0.6)`
                      : '0 8px 24px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.08), inset 0 2px 4px rgba(255,255,255,0.8)',
                    border: `2px solid ${tile.active ? currentMaterial.accent + '60' : 'rgba(0,0,0,0.06)'}`,
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                  whileHover={{
                    scale: 1.05,
                    y: -4,
                    transition: { duration: 0.2 }
                  }}
                >
                  {/* Number */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span
                      className="text-3xl font-semibold"
                      style={{
                        color: tile.active ? currentMaterial.accent : '#2c3e50',
                        fontFamily: 'Georgia, serif',
                      }}
                    >
                      {tile.num}
                    </span>
                  </div>

                  {/* LED indicator */}
                  {tile.active && (
                    <motion.div
                      className="absolute top-3 right-3 w-2.5 h-2.5 rounded-full"
                      style={{
                        background: currentMaterial.accent,
                        boxShadow: `0 0 8px ${currentMaterial.accent}, 0 0 16px ${currentMaterial.accent}80, 0 0 24px ${currentMaterial.accent}40`,
                      }}
                      animate={{
                        opacity: [1, 0.7, 1],
                        scale: [1, 0.95, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                    />
                  )}

                  {/* Tactile surface texture */}
                  <div
                    className="absolute inset-0 rounded-xl opacity-30"
                    style={{
                      background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.8), transparent 60%)',
                    }}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  if (variant === 'lifestyle') {
    return (
      <div className={`relative ${className}`}>
        {/* Calendar on wall in interior setting */}
        <motion.div
          className="relative w-full max-w-4xl mx-auto aspect-[16/10]"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          {/* Wall background */}
          <div
            className="absolute inset-0 rounded-3xl overflow-hidden"
            style={{
              background: 'linear-gradient(to bottom, #e8e4df 0%, #f5f2ed 100%)',
            }}
          >
            {/* Subtle wall texture */}
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: 'radial-gradient(circle at 20% 50%, transparent 0%, rgba(0,0,0,0.03) 100%)',
              }}
            />

            {/* Ambient light gradient */}
            <div
              className="absolute top-0 left-0 right-0 h-1/2 opacity-40"
              style={{
                background: 'radial-gradient(ellipse at top, rgba(255,248,220,0.6), transparent)',
              }}
            />

            {/* Calendar mounted on wall */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2/5">
              <motion.div
                className="relative w-full aspect-[4/5] rounded-xl overflow-hidden"
                style={{
                  background: currentMaterial.wood,
                  padding: '16px',
                  boxShadow: '0 20px 60px rgba(0,0,0,0.25), 0 8px 24px rgba(0,0,0,0.15)',
                }}
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                viewport={{ once: true }}
              >
                <div
                  className="w-full h-full rounded-lg"
                  style={{
                    background: currentMaterial.backing,
                    boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.08)',
                  }}
                >
                  {/* Simplified calendar grid for lifestyle shot */}
                  <div className="p-3 h-full flex flex-col">
                    <div className="grid grid-cols-7 gap-0.5 flex-1">
                      {Array.from({ length: 35 }).map((_, i) => {
                        const isActive = i >= 10 && i < 15;
                        return (
                          <div
                            key={i}
                            className="rounded-sm"
                            style={{
                              background: isActive
                                ? `${currentMaterial.accent}40`
                                : '#ffffff',
                              boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
                            }}
                          />
                        );
                      })}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Minimalist plant silhouette on right */}
            <div className="absolute bottom-0 right-8 w-24 h-48 opacity-30">
              <div
                className="w-full h-full rounded-t-full"
                style={{
                  background: 'linear-gradient(to top, #2c3e50, transparent)',
                }}
              />
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  if (variant === 'exploded') {
    return (
      <div className={`relative ${className}`}>
        {/* Exploded view showing layers */}
        <motion.div
          className="relative w-full max-w-2xl mx-auto aspect-[4/5]"
          style={{ perspective: '2000px' }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          {/* Layer 1: Back frame */}
          <motion.div
            className="absolute inset-0 rounded-2xl"
            style={{
              background: currentMaterial.wood,
              transformStyle: 'preserve-3d',
            }}
            initial={{ z: 0 }}
            whileInView={{ z: -80 }}
            transition={{ delay: 0.2, duration: 1, ease: 'easeOut' }}
            viewport={{ once: true }}
          >
            <div className="w-full h-full rounded-2xl border-4 border-opacity-30 border-white" />
          </motion.div>

          {/* Layer 2: Electronics/LED grid */}
          <motion.div
            className="absolute inset-12 rounded-lg"
            style={{
              background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
              transformStyle: 'preserve-3d',
              boxShadow: '0 0 40px rgba(212,175,55,0.3)',
            }}
            initial={{ z: 0 }}
            whileInView={{ z: -40 }}
            transition={{ delay: 0.4, duration: 1, ease: 'easeOut' }}
            viewport={{ once: true }}
          >
            {/* Circuit pattern */}
            <div className="absolute inset-0 grid grid-cols-7 gap-2 p-4">
              {Array.from({ length: 35 }).map((_, i) => (
                <div
                  key={i}
                  className="rounded-full"
                  style={{
                    background: `radial-gradient(circle, ${currentMaterial.accent}80, ${currentMaterial.accent}20)`,
                    boxShadow: `0 0 8px ${currentMaterial.accent}60`,
                  }}
                />
              ))}
            </div>
          </motion.div>

          {/* Layer 3: Backing panel */}
          <motion.div
            className="absolute inset-8 rounded-lg"
            style={{
              background: currentMaterial.backing,
              transformStyle: 'preserve-3d',
              boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
            }}
            initial={{ z: 0 }}
            whileInView={{ z: 0 }}
            transition={{ delay: 0.6, duration: 1, ease: 'easeOut' }}
            viewport={{ once: true }}
          />

          {/* Layer 4: Calendar tiles (front) */}
          <motion.div
            className="absolute inset-12 rounded-lg"
            style={{
              transformStyle: 'preserve-3d',
            }}
            initial={{ z: 0 }}
            whileInView={{ z: 40 }}
            transition={{ delay: 0.8, duration: 1, ease: 'easeOut' }}
            viewport={{ once: true }}
          >
            <div className="grid grid-cols-7 gap-1.5">
              {Array.from({ length: 35 }).map((_, i) => (
                <div
                  key={i}
                  className="aspect-square rounded-md"
                  style={{
                    background: 'linear-gradient(145deg, #ffffff, #f0f0f0)',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.15), inset 0 1px 2px rgba(255,255,255,0.8)',
                  }}
                />
              ))}
            </div>
          </motion.div>

          {/* Layer labels */}
          <motion.div
            className="absolute -right-32 top-1/4 text-sm space-y-20"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="text-gray-600">
              <div className="font-semibold">Wooden Frame</div>
              <div className="text-xs opacity-60">Premium hardwood</div>
            </div>
            <div className="text-gray-600">
              <div className="font-semibold">LED Matrix</div>
              <div className="text-xs opacity-60">Individual backlighting</div>
            </div>
            <div className="text-gray-600">
              <div className="font-semibold">Modular Tiles</div>
              <div className="text-xs opacity-60">Tactile interaction</div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    );
  }

  if (variant === 'hand') {
    return (
      <div className={`relative ${className}`}>
        {/* Hand interaction scale reference */}
        <motion.div
          className="relative w-full max-w-3xl mx-auto aspect-[3/2]"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Calendar section */}
            <div className="relative">
              {/* 3x4 section of calendar */}
              <div className="grid grid-cols-3 gap-4 p-6 rounded-2xl" style={{ background: currentMaterial.backing }}>
                {Array.from({ length: 12 }).map((_, i) => {
                  const isInteracting = i === 4;
                  return (
                    <motion.div
                      key={i}
                      className="w-20 h-20 rounded-lg relative"
                      style={{
                        background: isInteracting
                          ? `linear-gradient(145deg, ${currentMaterial.accent}60, ${currentMaterial.accent}40)`
                          : 'linear-gradient(145deg, #ffffff, #f5f5f5)',
                        boxShadow: isInteracting
                          ? `0 4px 16px ${currentMaterial.accent}50, inset 0 -2px 4px rgba(0,0,0,0.1)`
                          : '0 4px 16px rgba(0,0,0,0.08), inset 0 2px 4px rgba(255,255,255,0.8)',
                        border: `1px solid ${isInteracting ? currentMaterial.accent + '80' : 'rgba(0,0,0,0.05)'}`,
                      }}
                      animate={isInteracting ? {
                        scale: [1, 0.95, 1],
                      } : {}}
                      transition={{
                        duration: 0.3,
                        ease: 'easeInOut',
                      }}
                    >
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-xl font-medium" style={{ color: isInteracting ? currentMaterial.accent : '#333' }}>
                          {i + 15}
                        </span>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Stylized hand */}
              <motion.div
                className="absolute"
                style={{
                  top: '40%',
                  left: '43%',
                  transform: 'translate(-50%, -50%)',
                }}
                initial={{ opacity: 0, y: -30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                viewport={{ once: true }}
              >
                {/* Simplified hand silhouette */}
                <svg width="120" height="140" viewBox="0 0 120 140" fill="none">
                  <g opacity="0.7">
                    {/* Palm */}
                    <ellipse cx="60" cy="90" rx="35" ry="45" fill="#f0d9c7" />
                    {/* Index finger */}
                    <ellipse cx="60" cy="45" rx="12" ry="40" fill="#f0d9c7" />
                    {/* Finger shadow/depth */}
                    <ellipse cx="60" cy="50" rx="10" ry="35" fill="#e8c9b5" opacity="0.6" />
                    {/* Touch point indicator */}
                    <circle cx="60" cy="70" r="8" fill={currentMaterial.accent} opacity="0.4" />
                    <circle cx="60" cy="70" r="4" fill={currentMaterial.accent} opacity="0.8" />
                  </g>
                </svg>

                {/* Touch ripple effect */}
                <motion.div
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full"
                  style={{
                    border: `2px solid ${currentMaterial.accent}`,
                    opacity: 0.6,
                  }}
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.6, 0, 0.6],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeOut',
                  }}
                />
              </motion.div>
            </div>
          </div>

          {/* Dimension annotations */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center text-sm text-gray-500">
            <div className="font-medium">20" × 16"</div>
            <div className="text-xs opacity-60">Actual size reference</div>
          </div>
        </motion.div>
      </div>
    );
  }

  return null;
};
