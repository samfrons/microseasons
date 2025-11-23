'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ControlMode, AnimationPattern } from '@/utils/ledController'

interface LEDControlPanelProps {
  config: {
    mode: ControlMode
    pattern: AnimationPattern
    brightness: number
    speed: number
  }
  onConfigChange: (config: any) => void
  className?: string
}

export function LEDControlPanel({
  config,
  onConfigChange,
  className = '',
}: LEDControlPanelProps) {
  const [expanded, setExpanded] = useState(true)

  const modes: { value: ControlMode; label: string; description: string }[] = [
    {
      value: 'automatic',
      label: 'Automatic',
      description: 'Track current microseason',
    },
    {
      value: 'manual',
      label: 'Manual',
      description: 'Manual LED control',
    },
    {
      value: 'ambient',
      label: 'Ambient',
      description: 'Gentle ambient lighting',
    },
    {
      value: 'off',
      label: 'Off',
      description: 'All LEDs off',
    },
  ]

  const patterns: { value: AnimationPattern; label: string; icon: string }[] = [
    { value: 'breathing', label: 'Breathing', icon: '〰️' },
    { value: 'sunrise', label: 'Sunrise', icon: '🌅' },
    { value: 'rainbow', label: 'Rainbow', icon: '🌈' },
    { value: 'static', label: 'Static', icon: '⬤' },
    { value: 'off', label: 'Off', icon: '⭘' },
  ]

  return (
    <div className={`bg-gray-800 rounded-lg overflow-hidden ${className}`}>
      {/* Header */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-750 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="text-2xl">💡</div>
          <div>
            <h3 className="text-lg font-semibold text-white">LED Controls</h3>
            <p className="text-sm text-gray-400">
              Manage LED lighting & animations
            </p>
          </div>
        </div>
        <motion.div
          animate={{ rotate: expanded ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="text-gray-400"
        >
          ▼
        </motion.div>
      </button>

      {/* Controls */}
      <motion.div
        initial={false}
        animate={{
          height: expanded ? 'auto' : 0,
          opacity: expanded ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <div className="px-6 pb-6 space-y-6">
          {/* Mode Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-3">
              Control Mode
            </label>
            <div className="grid grid-cols-2 gap-2">
              {modes.map(mode => (
                <button
                  key={mode.value}
                  onClick={() =>
                    onConfigChange({ ...config, mode: mode.value })
                  }
                  className={`p-3 rounded-lg border-2 transition-all ${
                    config.mode === mode.value
                      ? 'border-blue-500 bg-blue-500 bg-opacity-10'
                      : 'border-gray-600 hover:border-gray-500'
                  }`}
                >
                  <div className="font-semibold text-white text-sm">
                    {mode.label}
                  </div>
                  <div className="text-xs text-gray-400 mt-1">
                    {mode.description}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Pattern Selection */}
          {config.mode !== 'off' && (
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-3">
                Animation Pattern
              </label>
              <div className="grid grid-cols-5 gap-2">
                {patterns.map(pattern => (
                  <button
                    key={pattern.value}
                    onClick={() =>
                      onConfigChange({ ...config, pattern: pattern.value })
                    }
                    className={`p-3 rounded-lg border-2 transition-all ${
                      config.pattern === pattern.value
                        ? 'border-purple-500 bg-purple-500 bg-opacity-10'
                        : 'border-gray-600 hover:border-gray-500'
                    }`}
                    title={pattern.label}
                  >
                    <div className="text-2xl mb-1">{pattern.icon}</div>
                    <div className="text-xs text-white">{pattern.label}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Brightness Slider */}
          {config.mode !== 'off' && (
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="text-sm font-medium text-gray-300">
                  Brightness
                </label>
                <span className="text-sm text-white font-mono">
                  {config.brightness}%
                </span>
              </div>
              <input
                type="range"
                min="10"
                max="100"
                step="5"
                value={config.brightness}
                onChange={e =>
                  onConfigChange({
                    ...config,
                    brightness: parseInt(e.target.value),
                  })
                }
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
                style={{
                  background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${config.brightness}%, #374151 ${config.brightness}%, #374151 100%)`,
                }}
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>Dim</span>
                <span>Bright</span>
              </div>
            </div>
          )}

          {/* Speed Slider */}
          {config.mode !== 'off' && config.pattern !== 'static' && (
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="text-sm font-medium text-gray-300">
                  Animation Speed
                </label>
                <span className="text-sm text-white font-mono">
                  {config.speed.toFixed(1)}x
                </span>
              </div>
              <input
                type="range"
                min="0.5"
                max="2"
                step="0.1"
                value={config.speed}
                onChange={e =>
                  onConfigChange({
                    ...config,
                    speed: parseFloat(e.target.value),
                  })
                }
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-purple-500"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>Slow</span>
                <span>Fast</span>
              </div>
            </div>
          )}

          {/* Quick Actions */}
          <div className="pt-4 border-t border-gray-700">
            <label className="block text-sm font-medium text-gray-300 mb-3">
              Quick Actions
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() =>
                  onConfigChange({
                    mode: 'automatic',
                    pattern: 'breathing',
                    brightness: 60,
                    speed: 1.0,
                  })
                }
                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg text-sm transition-colors"
              >
                Reset to Default
              </button>
              <button
                onClick={() =>
                  onConfigChange({
                    ...config,
                    mode: config.mode === 'off' ? 'automatic' : 'off',
                  })
                }
                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg text-sm transition-colors"
              >
                {config.mode === 'off' ? 'Turn On' : 'Turn Off'}
              </button>
            </div>
          </div>

          {/* Status Info */}
          <div className="pt-4 border-t border-gray-700">
            <div className="flex items-center gap-2 text-xs text-gray-400">
              <div
                className={`w-2 h-2 rounded-full ${
                  config.mode !== 'off' ? 'bg-green-500' : 'bg-gray-500'
                }`}
              />
              <span>
                {config.mode !== 'off'
                  ? `Active - ${config.mode} mode`
                  : 'LEDs are off'}
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
