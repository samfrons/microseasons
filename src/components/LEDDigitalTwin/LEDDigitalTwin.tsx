'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { microseasons } from '@/data/microseasons'
import {
  LEDController,
  LEDState,
  LEDConfig,
  LED_GRID,
  getLEDPosition,
  getThemeAccentColor,
} from '@/utils/ledController'
import { useCalendarStore } from '@/store/useCalendarStore'

interface LEDDigitalTwinProps {
  config?: Partial<LEDConfig>
  interactive?: boolean
  showGrid?: boolean
  scale?: number
  className?: string
}

export function LEDDigitalTwin({
  config: externalConfig,
  interactive = false,
  showGrid = true,
  scale = 1,
  className = '',
}: LEDDigitalTwinProps) {
  const { selectedTheme, colorPalette } = useCalendarStore()
  const [ledStates, setLedStates] = useState<LEDState[]>([])
  const [hoveredLED, setHoveredLED] = useState<number | null>(null)
  const controllerRef = useRef<LEDController | null>(null)
  const animationFrameRef = useRef<number>()

  // Initialize LED controller
  useEffect(() => {
    const accentColor = getThemeAccentColor(selectedTheme)

    const defaultConfig: LEDConfig = {
      mode: 'automatic',
      pattern: 'breathing',
      brightness: 60,
      accentColor,
      speed: 1.0,
    }

    const config = { ...defaultConfig, ...externalConfig }
    controllerRef.current = new LEDController(config)

    // Update for current microseason
    controllerRef.current.updateForMicroseason(microseasons)
    setLedStates(controllerRef.current.getStates())

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [selectedTheme, externalConfig])

  // Animation loop
  useEffect(() => {
    if (!controllerRef.current) return

    const animate = (timestamp: number) => {
      if (!controllerRef.current) return

      const animatedStates = controllerRef.current.animate(timestamp, microseasons)
      setLedStates(animatedStates)

      animationFrameRef.current = requestAnimationFrame(animate)
    }

    animationFrameRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [])

  // Update when theme changes
  useEffect(() => {
    if (!controllerRef.current) return

    const accentColor = getThemeAccentColor(selectedTheme)
    controllerRef.current.setConfig({ accentColor })
    controllerRef.current.updateForMicroseason(microseasons)
  }, [selectedTheme])

  const handleLEDClick = (index: number) => {
    if (!interactive || !controllerRef.current) return

    // Toggle LED
    const currentState = ledStates[index]
    const accentColor = getThemeAccentColor(selectedTheme)

    if (currentState.isActive) {
      // Turn off this LED
      const activeLEDs = ledStates
        .filter((s, i) => s.isActive && i !== index)
        .map(s => s.index)
      controllerRef.current.setManualLEDs(activeLEDs, accentColor)
    } else {
      // Turn on this LED
      const activeLEDs = ledStates
        .filter(s => s.isActive)
        .map(s => s.index)
      activeLEDs.push(index)
      controllerRef.current.setManualLEDs(activeLEDs, accentColor)
    }
  }

  return (
    <div className={`relative ${className}`}>
      {/* LED Grid Container */}
      <div
        className="relative bg-gray-900 rounded-lg p-8"
        style={{
          width: `${520 * scale}px`,
          height: `${400 * scale}px`,
        }}
      >
        {/* Grid Background */}
        {showGrid && (
          <div className="absolute inset-0 pointer-events-none opacity-20">
            <svg width="100%" height="100%">
              {/* Vertical lines */}
              {Array.from({ length: LED_GRID.cols + 1 }).map((_, i) => {
                const x = 38 + i * 63.5
                return (
                  <line
                    key={`v-${i}`}
                    x1={x * scale}
                    y1={0}
                    x2={x * scale}
                    y2="100%"
                    stroke="rgba(255,255,255,0.1)"
                    strokeWidth="1"
                  />
                )
              })}
              {/* Horizontal lines */}
              {Array.from({ length: LED_GRID.rows + 1 }).map((_, i) => {
                const y = 38 + i * 71
                return (
                  <line
                    key={`h-${i}`}
                    x1={0}
                    y1={y * scale}
                    x2="100%"
                    y2={y * scale}
                    stroke="rgba(255,255,255,0.1)"
                    strokeWidth="1"
                  />
                )
              })}
            </svg>
          </div>
        )}

        {/* LEDs */}
        <AnimatePresence>
          {ledStates.map(state => {
            const position = getLEDPosition(state.index)
            const isHovered = hoveredLED === state.index

            return (
              <motion.div
                key={state.index}
                className={`absolute ${interactive ? 'cursor-pointer' : ''}`}
                style={{
                  left: `${position.x * scale}px`,
                  top: `${position.y * scale}px`,
                  transform: 'translate(-50%, -50%)',
                }}
                onMouseEnter={() => interactive && setHoveredLED(state.index)}
                onMouseLeave={() => interactive && setHoveredLED(null)}
                onClick={() => handleLEDClick(state.index)}
                whileHover={interactive ? { scale: 1.2 } : {}}
                transition={{ duration: 0.2 }}
              >
                {/* LED Glow Effect */}
                {state.isActive && (
                  <motion.div
                    className="absolute inset-0 rounded-full blur-xl"
                    style={{
                      width: `${24 * scale}px`,
                      height: `${24 * scale}px`,
                      background: `rgb(${state.r}, ${state.g}, ${state.b})`,
                      opacity: 0.6,
                    }}
                    animate={{
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  />
                )}

                {/* LED Body */}
                <div
                  className="relative rounded-full border-2"
                  style={{
                    width: `${12 * scale}px`,
                    height: `${12 * scale}px`,
                    background: state.isActive
                      ? `rgb(${state.r}, ${state.g}, ${state.b})`
                      : 'rgba(255, 255, 255, 0.1)',
                    borderColor: state.isActive
                      ? `rgb(${Math.min(state.r + 40, 255)}, ${Math.min(state.g + 40, 255)}, ${Math.min(state.b + 40, 255)})`
                      : 'rgba(255, 255, 255, 0.2)',
                    boxShadow: state.isActive
                      ? `0 0 ${8 * scale}px rgb(${state.r}, ${state.g}, ${state.b}),
                         0 0 ${16 * scale}px rgba(${state.r}, ${state.g}, ${state.b}, 0.6)`
                      : 'none',
                  }}
                />

                {/* LED Index Label (on hover) */}
                {isHovered && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="absolute top-full mt-2 px-2 py-1 bg-black bg-opacity-75 text-white text-xs rounded whitespace-nowrap"
                    style={{ fontSize: `${10 * scale}px` }}
                  >
                    LED {state.index}
                    <br />
                    Row {position.row}, Col {position.col}
                    {state.isActive && (
                      <>
                        <br />
                        RGB({state.r}, {state.g}, {state.b})
                      </>
                    )}
                  </motion.div>
                )}
              </motion.div>
            )
          })}
        </AnimatePresence>

        {/* Corner Labels */}
        <div className="absolute top-2 left-2 text-white text-xs opacity-50">
          LED 0
        </div>
        <div className="absolute top-2 right-2 text-white text-xs opacity-50">
          LED 6
        </div>
        <div className="absolute bottom-2 left-2 text-white text-xs opacity-50">
          LED 28
        </div>
        <div className="absolute bottom-2 right-2 text-white text-xs opacity-50">
          LED 34
        </div>
      </div>

      {/* Info Panel */}
      <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
        <div className="bg-gray-800 rounded p-3">
          <div className="text-gray-400 text-xs mb-1">Active LEDs</div>
          <div className="text-white font-mono text-lg">
            {ledStates.filter(s => s.isActive).length} / {LED_GRID.total}
          </div>
        </div>
        <div className="bg-gray-800 rounded p-3">
          <div className="text-gray-400 text-xs mb-1">Current Brightness</div>
          <div className="text-white font-mono text-lg">
            {controllerRef.current?.getStates()[0]?.brightness || 0}%
          </div>
        </div>
      </div>
    </div>
  )
}
