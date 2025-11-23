/**
 * LED Controller Logic for Microseasons Calendar
 * Manages 35 WS2812B RGB LEDs in a 7×5 grid
 */

import { Microseason } from '@/data/microseasons'
import { themes } from '@/themes'

// LED Grid Configuration
export const LED_GRID = {
  rows: 5,
  cols: 7,
  total: 35,
} as const

// LED Position Helper
export interface LEDPosition {
  index: number // 0-34
  row: number // 0-4
  col: number // 0-6
  x: number // Pixel position
  y: number // Pixel position
}

// LED State
export interface LEDState {
  index: number
  r: number // 0-255
  g: number // 0-255
  b: number // 0-255
  brightness: number // 0-100
  isActive: boolean
}

// Animation Pattern
export type AnimationPattern = 'breathing' | 'sunrise' | 'rainbow' | 'static' | 'off'

// Control Mode
export type ControlMode = 'automatic' | 'manual' | 'ambient' | 'off'

// LED Configuration
export interface LEDConfig {
  mode: ControlMode
  pattern: AnimationPattern
  brightness: number // 0-100
  accentColor: string // Hex color
  speed: number // Animation speed multiplier (0.5-2.0)
}

/**
 * Converts row/col to LED index
 */
export function getLEDIndex(row: number, col: number): number {
  if (row < 0 || row >= LED_GRID.rows || col < 0 || col >= LED_GRID.cols) {
    throw new Error(`Invalid LED position: row=${row}, col=${col}`)
  }
  return row * LED_GRID.cols + col
}

/**
 * Converts LED index to row/col
 */
export function getLEDPosition(index: number): LEDPosition {
  if (index < 0 || index >= LED_GRID.total) {
    throw new Error(`Invalid LED index: ${index}`)
  }
  const row = Math.floor(index / LED_GRID.cols)
  const col = index % LED_GRID.cols

  // Calculate pixel positions (for digital twin rendering)
  // Spacing: 63.5mm horizontal, 71mm vertical
  // Scale to pixels (assuming 2px per mm for display)
  const x = 76 + col * 127 // 38mm * 2 + col * 63.5mm * 2
  const y = 76 + row * 142 // 38mm * 2 + row * 71mm * 2

  return { index, row, col, x, y }
}

/**
 * Hex color to RGB
 */
export function hexToRGB(hex: string): { r: number; g: number; b: number } {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  if (!result) {
    throw new Error(`Invalid hex color: ${hex}`)
  }
  return {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16),
  }
}

/**
 * RGB to hex color
 */
export function rgbToHex(r: number, g: number, b: number): string {
  return '#' + [r, g, b].map(x => {
    const hex = Math.round(x).toString(16)
    return hex.length === 1 ? '0' + hex : hex
  }).join('')
}

/**
 * Apply brightness to RGB
 */
export function applyBrightness(
  rgb: { r: number; g: number; b: number },
  brightness: number
): { r: number; g: number; b: number } {
  const factor = brightness / 100
  return {
    r: Math.round(rgb.r * factor),
    g: Math.round(rgb.g * factor),
    b: Math.round(rgb.b * factor),
  }
}

/**
 * Get active LEDs for a given date range
 * Maps calendar dates to LED indices in the 35-LED grid
 */
export function getActiveLEDsForDateRange(
  startDate: { month: number; day: number },
  endDate: { month: number; day: number },
  currentDate: Date
): number[] {
  const activeLEDs: number[] = []

  // Get current month and first day of month
  const year = currentDate.getFullYear()
  const month = currentDate.getMonth() + 1
  const firstDay = new Date(year, month - 1, 1)
  const firstDayOfWeek = firstDay.getDay() // 0-6 (Sunday-Saturday)

  // Calculate LED positions for microseason dates
  const start = new Date(year, startDate.month - 1, startDate.day)
  const end = new Date(year, endDate.month - 1, endDate.day)

  // If microseason is in different month, skip
  if (start.getMonth() !== month - 1 && end.getMonth() !== month - 1) {
    return activeLEDs
  }

  // Iterate through each day in the microseason range
  let currentDay = new Date(start)
  while (currentDay <= end) {
    if (currentDay.getMonth() === month - 1) {
      const dayOfMonth = currentDay.getDate()
      const position = dayOfMonth + firstDayOfWeek - 1

      // Convert to LED grid position (row, col)
      const row = Math.floor(position / LED_GRID.cols)
      const col = position % LED_GRID.cols

      if (row < LED_GRID.rows) {
        const ledIndex = getLEDIndex(row, col)
        activeLEDs.push(ledIndex)
      }
    }
    currentDay.setDate(currentDay.getDate() + 1)
  }

  return activeLEDs
}

/**
 * Get current active microseason and LEDs
 */
export function getCurrentMicroseasonLEDs(
  microseasons: Microseason[],
  currentDate: Date = new Date()
): {
  microseason: Microseason | null
  activeLEDs: number[]
} {
  const month = currentDate.getMonth() + 1
  const day = currentDate.getDate()

  // Find current microseason
  const currentMicroseason = microseasons.find(ms => {
    const startMonth = ms.startDate.month
    const startDay = ms.startDate.day
    const endMonth = ms.endDate.month
    const endDay = ms.endDate.day

    // Handle year-wrap (e.g., Dec 31 - Jan 4)
    if (endMonth < startMonth) {
      return (
        (month === startMonth && day >= startDay) ||
        (month === endMonth && day <= endDay) ||
        (month > startMonth || month < endMonth)
      )
    }

    // Normal case
    return (
      (month === startMonth && day >= startDay && (month < endMonth || day <= endDay)) ||
      (month > startMonth && month < endMonth) ||
      (month === endMonth && day <= endDay)
    )
  })

  if (!currentMicroseason) {
    return { microseason: null, activeLEDs: [] }
  }

  const activeLEDs = getActiveLEDsForDateRange(
    currentMicroseason.startDate,
    currentMicroseason.endDate,
    currentDate
  )

  return { microseason: currentMicroseason, activeLEDs }
}

/**
 * Initialize LED states
 */
export function initializeLEDStates(config: LEDConfig): LEDState[] {
  const states: LEDState[] = []

  for (let i = 0; i < LED_GRID.total; i++) {
    states.push({
      index: i,
      r: 0,
      g: 0,
      b: 0,
      brightness: config.brightness,
      isActive: false,
    })
  }

  return states
}

/**
 * Update LED states for current microseason
 */
export function updateLEDStates(
  states: LEDState[],
  activeLEDs: number[],
  accentColor: string,
  brightness: number
): LEDState[] {
  const rgb = hexToRGB(accentColor)
  const adjustedRGB = applyBrightness(rgb, brightness)

  return states.map(state => {
    const isActive = activeLEDs.includes(state.index)
    return {
      ...state,
      r: isActive ? adjustedRGB.r : 0,
      g: isActive ? adjustedRGB.g : 0,
      b: isActive ? adjustedRGB.b : 0,
      brightness: isActive ? brightness : 0,
      isActive,
    }
  })
}

/**
 * Calculate breathing animation value
 * Returns brightness multiplier (0.6 - 1.0)
 */
export function getBreathingValue(timestamp: number, speed: number = 1.0): number {
  const cycleDuration = 2000 / speed // 2 seconds default
  const phase = (timestamp % cycleDuration) / cycleDuration

  // Sine wave: 0.6 to 1.0
  return 0.6 + 0.4 * (Math.sin(phase * Math.PI * 2 - Math.PI / 2) + 1) / 2
}

/**
 * Calculate sunrise animation value
 * Returns brightness multiplier (0.0 - 1.0)
 * Duration: 6 seconds
 */
export function getSunriseValue(timestamp: number, startTime: number): number {
  const elapsed = timestamp - startTime
  const duration = 6000 // 6 seconds

  if (elapsed < 0) return 0
  if (elapsed >= duration) return 1

  // Phase 1 (0-2s): Fade in
  if (elapsed < 2000) {
    return elapsed / 2000
  }

  // Phase 2 (2-4s): Hold
  if (elapsed < 4000) {
    return 1.0
  }

  // Phase 3 (4-6s): Transition to breathing
  const breathingPhase = (elapsed - 4000) / 2000
  return 1.0 - 0.2 * breathingPhase // Fade to 0.8, then breathing takes over
}

/**
 * Calculate rainbow animation color
 * Cycles through all 72 microseason colors
 */
export function getRainbowColor(
  timestamp: number,
  microseasons: Microseason[],
  speed: number = 1.0
): string {
  const cycleDuration = 360000 / speed // 360 seconds default (5s per color)
  const phase = (timestamp % cycleDuration) / cycleDuration
  const colorIndex = Math.floor(phase * 72)

  return microseasons[colorIndex]?.colors[0] || '#FFFFFF'
}

/**
 * Get theme accent color
 */
export function getThemeAccentColor(themeId: string): string {
  const theme = themes[themeId as keyof typeof themes]
  return theme?.colors.light.accent || '#d4a5a5'
}

/**
 * LED Controller Class
 */
export class LEDController {
  private states: LEDState[]
  private config: LEDConfig
  private animationStartTime: number = 0
  private lastUpdateTime: number = 0

  constructor(config: LEDConfig) {
    this.config = config
    this.states = initializeLEDStates(config)
  }

  /**
   * Update configuration
   */
  setConfig(config: Partial<LEDConfig>): void {
    this.config = { ...this.config, ...config }
  }

  /**
   * Get current LED states
   */
  getStates(): LEDState[] {
    return [...this.states]
  }

  /**
   * Update LED states based on current microseason
   */
  updateForMicroseason(
    microseasons: Microseason[],
    currentDate: Date = new Date()
  ): void {
    const { microseason, activeLEDs } = getCurrentMicroseasonLEDs(microseasons, currentDate)

    if (!microseason) {
      // No active microseason, turn off all LEDs
      this.states = this.states.map(state => ({
        ...state,
        r: 0,
        g: 0,
        b: 0,
        brightness: 0,
        isActive: false,
      }))
      return
    }

    // Determine accent color based on config
    let accentColor = this.config.accentColor

    // Update LED states
    this.states = updateLEDStates(
      this.states,
      activeLEDs,
      accentColor,
      this.config.brightness
    )
  }

  /**
   * Animate LED states
   * Call this in animation loop (requestAnimationFrame)
   */
  animate(timestamp: number, microseasons?: Microseason[]): LEDState[] {
    const { pattern, speed } = this.config

    // Initialize animation start time
    if (this.animationStartTime === 0) {
      this.animationStartTime = timestamp
    }

    // Apply animation pattern
    switch (pattern) {
      case 'breathing': {
        const breathingValue = getBreathingValue(timestamp, speed)
        return this.states.map(state => {
          if (!state.isActive) return state

          const rgb = { r: state.r, g: state.g, b: state.b }
          const animated = applyBrightness(rgb, breathingValue * 100)

          return {
            ...state,
            r: animated.r,
            g: animated.g,
            b: animated.b,
          }
        })
      }

      case 'sunrise': {
        const sunriseValue = getSunriseValue(timestamp, this.animationStartTime)
        return this.states.map(state => {
          if (!state.isActive) return state

          const rgb = { r: state.r, g: state.g, b: state.b }
          const animated = applyBrightness(rgb, sunriseValue * 100)

          return {
            ...state,
            r: animated.r,
            g: animated.g,
            b: animated.b,
          }
        })
      }

      case 'rainbow': {
        if (!microseasons) return this.states

        const rainbowColor = getRainbowColor(timestamp, microseasons, speed)
        const rgb = hexToRGB(rainbowColor)
        const adjusted = applyBrightness(rgb, this.config.brightness)

        return this.states.map(state => ({
          ...state,
          r: adjusted.r,
          g: adjusted.g,
          b: adjusted.b,
          isActive: true,
        }))
      }

      case 'static':
      case 'off':
      default:
        return this.states
    }
  }

  /**
   * Trigger sunrise animation (e.g., when microseason changes)
   */
  triggerSunrise(): void {
    this.config.pattern = 'sunrise'
    this.animationStartTime = performance.now()

    // After 6 seconds, switch to breathing
    setTimeout(() => {
      this.config.pattern = 'breathing'
      this.animationStartTime = performance.now()
    }, 6000)
  }

  /**
   * Set manual LED states
   */
  setManualLEDs(ledIndices: number[], color: string): void {
    const rgb = hexToRGB(color)
    const adjusted = applyBrightness(rgb, this.config.brightness)

    this.states = this.states.map(state => {
      const isActive = ledIndices.includes(state.index)
      return {
        ...state,
        r: isActive ? adjusted.r : 0,
        g: isActive ? adjusted.g : 0,
        b: isActive ? adjusted.b : 0,
        brightness: isActive ? this.config.brightness : 0,
        isActive,
      }
    })
  }

  /**
   * Turn off all LEDs
   */
  turnOff(): void {
    this.states = this.states.map(state => ({
      ...state,
      r: 0,
      g: 0,
      b: 0,
      brightness: 0,
      isActive: false,
    }))
  }

  /**
   * Export LED states for hardware sync
   */
  exportForHardware(): {
    leds: Array<{ r: number; g: number; b: number }>
    config: LEDConfig
  } {
    return {
      leds: this.states.map(state => ({
        r: state.r,
        g: state.g,
        b: state.b,
      })),
      config: this.config,
    }
  }
}

/**
 * Create WebSocket sync message for hardware
 */
export function createSyncMessage(
  microseasons: Microseason[],
  currentDate: Date,
  config: LEDConfig
): any {
  const { microseason, activeLEDs } = getCurrentMicroseasonLEDs(microseasons, currentDate)

  return {
    type: 'SYNC_RESPONSE',
    currentMicroseason: microseason ? {
      id: microseason.id,
      nameEn: microseason.nameEn,
      nameJa: microseason.nameJa,
      colors: microseason.colors,
      startDate: microseason.startDate,
      endDate: microseason.endDate,
    } : null,
    activeLEDs,
    theme: config.accentColor,
    accentColor: config.accentColor,
    mode: config.mode,
    pattern: config.pattern,
    brightness: config.brightness,
    timestamp: Date.now(),
  }
}
