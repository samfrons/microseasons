'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { LEDDigitalTwin, LEDControlPanel } from '@/components/LEDDigitalTwin'
import { LEDConfig } from '@/utils/ledController'
import { microseasons } from '@/data/microseasons'
import { getCurrentMicroseasonLEDs } from '@/utils/ledController'

export default function LEDTwinPage() {
  const [ledConfig, setLedConfig] = useState<LEDConfig>({
    mode: 'automatic',
    pattern: 'breathing',
    brightness: 60,
    accentColor: '#d4a5a5',
    speed: 1.0,
  })

  const [showStats, setShowStats] = useState(true)

  // Get current microseason info
  const { microseason, activeLEDs } = getCurrentMicroseasonLEDs(microseasons)

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Header */}
      <header className="border-b border-gray-700 bg-gray-900 bg-opacity-50 backdrop-blur">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">
                LED Digital Twin
              </h1>
              <p className="text-gray-400">
                Real-time simulation of Microseasons Calendar LED system
              </p>
            </div>
            <a
              href="/"
              className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
            >
              ← Back to Calendar
            </a>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* LED Digital Twin - Left Column (spans 2 cols on large screens) */}
          <div className="lg:col-span-2 space-y-6">
            {/* Twin Visualization */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="bg-gray-800 rounded-lg p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-white">
                    35-LED Matrix Visualization
                  </h2>
                  <button
                    onClick={() => setShowStats(!showStats)}
                    className="px-3 py-1 bg-gray-700 hover:bg-gray-600 text-white text-sm rounded transition-colors"
                  >
                    {showStats ? 'Hide' : 'Show'} Stats
                  </button>
                </div>

                <LEDDigitalTwin
                  config={ledConfig}
                  interactive={ledConfig.mode === 'manual'}
                  showGrid={true}
                  scale={1}
                />
              </div>
            </motion.div>

            {/* Current Microseason Info */}
            {microseason && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="bg-gray-800 rounded-lg p-6"
              >
                <h2 className="text-xl font-semibold text-white mb-4">
                  Current Microseason
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <div className="text-sm text-gray-400 mb-1">Japanese</div>
                    <div className="text-2xl font-bold text-white mb-2">
                      {microseason.nameJa}
                    </div>
                    <div className="text-lg text-gray-300">
                      {microseason.nameEn}
                    </div>
                    <div className="text-sm text-gray-400 mt-3">
                      {microseason.description}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400 mb-2">Period</div>
                    <div className="text-white">
                      {microseason.startDate.month}/{microseason.startDate.day} -{' '}
                      {microseason.endDate.month}/{microseason.endDate.day}
                    </div>
                    <div className="text-sm text-gray-400 mt-4 mb-2">
                      Solar Term
                    </div>
                    <div className="text-white">{microseason.solarTerm}</div>
                    <div className="text-sm text-gray-400 mt-4 mb-2">
                      Theme Colors
                    </div>
                    <div className="flex gap-2">
                      {microseason.colors.map((color, idx) => (
                        <div
                          key={idx}
                          className="w-12 h-12 rounded-lg border-2 border-gray-600"
                          style={{ backgroundColor: color }}
                          title={color}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Technical Specifications */}
            {showStats && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-gray-800 rounded-lg p-6"
              >
                <h2 className="text-xl font-semibold text-white mb-4">
                  Technical Specifications
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-gray-900 rounded-lg p-4">
                    <div className="text-gray-400 text-xs mb-1">LED Type</div>
                    <div className="text-white font-mono">WS2812B</div>
                  </div>
                  <div className="bg-gray-900 rounded-lg p-4">
                    <div className="text-gray-400 text-xs mb-1">Grid Size</div>
                    <div className="text-white font-mono">7 × 5</div>
                  </div>
                  <div className="bg-gray-900 rounded-lg p-4">
                    <div className="text-gray-400 text-xs mb-1">Total LEDs</div>
                    <div className="text-white font-mono">35</div>
                  </div>
                  <div className="bg-gray-900 rounded-lg p-4">
                    <div className="text-gray-400 text-xs mb-1">Voltage</div>
                    <div className="text-white font-mono">5V DC</div>
                  </div>
                  <div className="bg-gray-900 rounded-lg p-4">
                    <div className="text-gray-400 text-xs mb-1">Controller</div>
                    <div className="text-white font-mono text-xs">ESP32</div>
                  </div>
                  <div className="bg-gray-900 rounded-lg p-4">
                    <div className="text-gray-400 text-xs mb-1">Power</div>
                    <div className="text-white font-mono">3A max</div>
                  </div>
                  <div className="bg-gray-900 rounded-lg p-4">
                    <div className="text-gray-400 text-xs mb-1">Protocol</div>
                    <div className="text-white font-mono text-xs">WS2812B</div>
                  </div>
                  <div className="bg-gray-900 rounded-lg p-4">
                    <div className="text-gray-400 text-xs mb-1">WiFi</div>
                    <div className="text-white font-mono text-xs">WebSocket</div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Control Panel - Right Column */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <LEDControlPanel
                config={ledConfig}
                onConfigChange={setLedConfig}
              />
            </motion.div>

            {/* Hardware Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-gray-800 rounded-lg p-6"
            >
              <h3 className="text-lg font-semibold text-white mb-4">
                Hardware Sync
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-sm text-gray-300">
                    Digital twin active
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-gray-500" />
                  <span className="text-sm text-gray-300">
                    No physical device connected
                  </span>
                </div>
              </div>

              <button className="w-full mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors">
                Connect Hardware
              </button>

              <div className="mt-4 pt-4 border-t border-gray-700">
                <div className="text-xs text-gray-400 mb-2">
                  Documentation
                </div>
                <a
                  href="/docs/LED_SPECIFICATIONS.md"
                  className="text-sm text-blue-400 hover:text-blue-300"
                >
                  → LED Specifications
                </a>
              </div>
            </motion.div>

            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-gray-800 rounded-lg p-6"
            >
              <h3 className="text-lg font-semibold text-white mb-4">
                Real-time Stats
              </h3>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-400">Active LEDs</span>
                    <span className="text-white font-mono">
                      {activeLEDs.length}/35
                    </span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full transition-all"
                      style={{
                        width: `${(activeLEDs.length / 35) * 100}%`,
                      }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-400">Brightness</span>
                    <span className="text-white font-mono">
                      {ledConfig.brightness}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-purple-500 h-2 rounded-full transition-all"
                      style={{
                        width: `${ledConfig.brightness}%`,
                      }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-400">Animation Speed</span>
                    <span className="text-white font-mono">
                      {ledConfig.speed.toFixed(1)}x
                    </span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-green-500 h-2 rounded-full transition-all"
                      style={{
                        width: `${((ledConfig.speed - 0.5) / 1.5) * 100}%`,
                      }}
                    />
                  </div>
                </div>

                <div className="pt-3 border-t border-gray-700">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Power Draw (est.)</span>
                    <span className="text-white font-mono">
                      {Math.round(
                        (activeLEDs.length * 60 * ledConfig.brightness) / 100
                      )}
                      mA
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Feature Highlights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <div className="bg-gray-800 rounded-lg p-6">
            <div className="text-3xl mb-3">🔄</div>
            <h3 className="text-lg font-semibold text-white mb-2">
              Real-time Sync
            </h3>
            <p className="text-sm text-gray-400">
              Digital twin mirrors physical hardware state via WebSocket
              connection, updating in real-time with 60fps animations.
            </p>
          </div>

          <div className="bg-gray-800 rounded-lg p-6">
            <div className="text-3xl mb-3">🎨</div>
            <h3 className="text-lg font-semibold text-white mb-2">
              Theme Aware
            </h3>
            <p className="text-sm text-gray-400">
              LEDs automatically adapt to selected theme accent colors and
              respond to microseason color palettes.
            </p>
          </div>

          <div className="bg-gray-800 rounded-lg p-6">
            <div className="text-3xl mb-3">⚡</div>
            <h3 className="text-lg font-semibold text-white mb-2">
              Low Power
            </h3>
            <p className="text-sm text-gray-400">
              Efficient LED control with intelligent brightness management,
              consuming ~300mA typical, 2.1A max.
            </p>
          </div>
        </motion.div>
      </main>
    </div>
  )
}
