# LED Layout & Hardware Specifications
## Microseasons Calendar - LED Digital Twin

---

## Overview

The Microseasons Calendar features a sophisticated LED backlighting system that illuminates the current 5-day microseason period, creating an ambient visual indicator that changes throughout the year.

---

## Hardware Layout

### LED Grid Configuration

```
┌─────────────────────────────────────────────────────────┐
│  MICROSEASONS CALENDAR - LED MATRIX (7×5 Grid)          │
│  Total LEDs: 35                                         │
│  Layout: 7 columns × 5 rows                             │
└─────────────────────────────────────────────────────────┘

     Col 0   Col 1   Col 2   Col 3   Col 4   Col 5   Col 6
   ┌───────┬───────┬───────┬───────┬───────┬───────┬───────┐
R0 │ LED0  │ LED1  │ LED2  │ LED3  │ LED4  │ LED5  │ LED6  │
   ├───────┼───────┼───────┼───────┼───────┼───────┼───────┤
R1 │ LED7  │ LED8  │ LED9  │ LED10 │ LED11 │ LED12 │ LED13 │
   ├───────┼───────┼───────┼───────┼───────┼───────┼───────┤
R2 │ LED14 │ LED15 │ LED16 │ LED17 │ LED18 │ LED19 │ LED20 │
   ├───────┼───────┼───────┼───────┼───────┼───────┼───────┤
R3 │ LED21 │ LED22 │ LED23 │ LED24 │ LED25 │ LED26 │ LED27 │
   ├───────┼───────┼───────┼───────┼───────┼───────┼───────┤
R4 │ LED28 │ LED29 │ LED30 │ LED31 │ LED32 │ LED33 │ LED34 │
   └───────┴───────┴───────┴───────┴───────┴───────┴───────┘

LED Index Formula: row × 7 + col
```

### Physical Specifications

| Component | Specification |
|-----------|--------------|
| **LED Type** | WS2812B (NeoPixel) RGB individually addressable |
| **LED Count** | 35 units |
| **Voltage** | 5V DC |
| **Current (max)** | ~60mA per LED @ full white (2.1A total) |
| **Current (typical)** | ~20mA per LED @ themed colors (700mA total) |
| **Data Protocol** | WS2812B single-wire protocol |
| **LED Spacing** | 2.5" horizontal × 2.8" vertical (center-to-center) |
| **PCB Layout** | Single custom PCB with 35 LED positions |

### LED Mounting

```
EXPLODED VIEW (Side Cross-Section):

┌────────────────┐  ← Decorative Tile (Wood/Metal/Ceramic)
│                │    Dimensions: 2" × 2.5" × 0.25"
└────────────────┘
        ↓
┌────────────────┐  ← Diffuser Layer (Frosted Acrylic)
│  ░░░░░░░░░░░░  │    Thickness: 0.125" (3mm)
└────────────────┘    Frosting: 50% translucent
        ↓
     ╭──╮           ← LED Module (WS2812B)
     │██│             Mounted on PCB
     ╰──╯
        ↓
┌────────────────┐  ← Reflective Backing (White PVC)
│ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓ │    Purpose: Maximize light output
└────────────────┘
        ↓
┌────────────────┐  ← Calendar Frame (Hardwood)
│                │    Depth: 1.5" total
└────────────────┘
```

---

## Electrical Architecture

### Microcontroller & Power

| Component | Part | Purpose |
|-----------|------|---------|
| **MCU** | ESP32-WROOM-32 | WiFi-enabled controller for LED control & web sync |
| **Power Supply** | 5V 3A USB-C | Powers LEDs and MCU |
| **Level Shifter** | 74HCT245 | Converts 3.3V ESP32 signal to 5V for WS2812B |
| **Capacitor** | 1000μF 6.3V | Power supply smoothing |
| **Resistor** | 470Ω | Data line protection |

### Wiring Diagram

```
                  USB-C 5V 3A Power Supply
                          │
                          ├─────────┐
                          │         │
                     [1000μF Cap]   │
                          │         │
                    ┌─────┴─────┐   │
                    │   ESP32   │   │
                    │  (3.3V)   │   │
                    └─────┬─────┘   │
                          │         │
                     [Level Shifter]│
                      74HCT245      │
                          │         │
                     [470Ω Resistor]│
                          │         │
                      Data Line     │
                          │         │
         ┌────────────────┼─────────┴──────────┐
         │                │                    │
      ┌──┴──┐          ┌──┴──┐             ┌──┴──┐
      │ LED0│───DI/DO──│ LED1│──── ... ────│ LED34│
      │WS2812│          │WS2812│            │WS2812│
      └─────┘          └─────┘             └──────┘
        │                │                     │
       GND              GND                   GND
```

---

## LED Control Logic

### Microseason Mapping

Each microseason spans approximately 5 days. The calendar displays:
- **Current Week** (7 days)
- **Upcoming Weeks** (28 additional days for 5-week preview)

**LED Illumination Rules:**

1. **Active Microseason Tiles**: LEDs corresponding to current 5-day microseason are illuminated
2. **Animation**: Active LEDs pulse gently (2-second breathing cycle)
3. **Color**: Theme-aware accent color (gold, pink, cyan, etc.)
4. **Brightness**: 30-60% brightness range (ambient, non-glaring)

### Example: Current Microseason = #15 (March 16-20)

```
Calendar Display (March):
┌───────────────────────────────────────────────┐
│  SUN  MON  TUE  WED  THU  FRI  SAT           │
│   10   11   12   13   14   15   16  ← Row 2  │
│   17   18   19   20   21   22   23  ← Row 3  │
└───────────────────────────────────────────────┘

Active LEDs (March 16-20):
LED20 (Col 6, Row 2) = March 16
LED21 (Col 0, Row 3) = March 17
LED22 (Col 1, Row 3) = March 18
LED23 (Col 2, Row 3) = March 19
LED24 (Col 3, Row 3) = March 20

These 5 LEDs pulse in unison with microseason color #15.
```

---

## Color Specifications

### Theme-Based LED Colors

Each theme has a unique accent color for LED illumination:

| Theme | Accent Color | Hex | RGB |
|-------|-------------|-----|-----|
| **Japanese Minimalist** | Dusty Sakura Pink | `#d4a5a5` | rgb(212, 165, 165) |
| **Brutalist** | Concrete Gray | `#808080` | rgb(128, 128, 128) |
| **Organic Nature** | Earth Brown | `#8B7355` | rgb(139, 115, 85) |
| **Cyberpunk Neon** | Electric Cyan | `#00FFFF` | rgb(0, 255, 255) |
| **Art Deco** | Champagne Gold | `#F7E7CE` | rgb(247, 231, 206) |
| **Glassmorphic** | Frosted Blue | `#A5C9E8` | rgb(165, 201, 232) |

### Microseason-Specific Colors

Each of the 72 microseasons has 3 thematic colors. The LED system uses **color[0]** (primary color) when in "Seasonal" color palette mode:

```typescript
// Example: Microseason #1 - "East wind melts the ice"
colors: ["#E8F4F8", "#B8D4E0", "#7BA5B8"]
         ↑ LED color

// Example: Microseason #37 - "Cool winds arrive"
colors: ["#E6F3F0", "#A8D5C8", "#6FB5A0"]
         ↑ LED color
```

---

## Animation Patterns

### 1. Breathing Pattern (Default)

```
Opacity: 100% → 60% → 100%
Duration: 2 seconds per cycle
Easing: Sine wave (smooth in-out)
Loop: Infinite

Brightness Curve:
100% ┤     ╭╮     ╭╮     ╭╮
 80% ┤    ╱  ╲   ╱  ╲   ╱  ╲
 60% ┤   ╱    ╲ ╱    ╲ ╱    ╲
     └───────────────────────
     0s   1s   2s   3s   4s
```

### 2. Sunrise Pattern (Microseason Transition)

Triggers when a new microseason begins (every 5 days):

```
Phase 1 (0-2s):  LEDs fade in from 0% → 100%
Phase 2 (2-4s):  Hold at 100%
Phase 3 (4-6s):  Transition to breathing pattern
```

### 3. Idle Pattern (When Unplugged from WiFi)

Slow rainbow cycle through all 72 microseason colors:

```
Duration: 360 seconds (1 color every 5 seconds)
Transition: Smooth crossfade between colors
Loop: Continuous rotation through microseason palette
```

---

## Control Modes

### 1. Automatic Mode (Default)

- **Behavior**: LEDs automatically track current date/microseason
- **Updates**: Every 24 hours at midnight (local time)
- **Sync**: Connects to web app for current microseason data

### 2. Manual Mode

- **Behavior**: User selects which microseason to display (1-72)
- **Updates**: Only changes via web app or physical button
- **Use Case**: Educational demonstrations, exhibitions

### 3. Ambient Mode

- **Behavior**: Gentle ambient lighting without microseason tracking
- **Pattern**: Slow color cycling through seasonal palettes
- **Brightness**: 20% (night-light level)

### 4. Off Mode

- **Behavior**: All LEDs off, MCU in low-power mode
- **Power Draw**: <100mA (ESP32 deep sleep)

---

## Communication Protocol

### Web App ↔ Hardware Sync

The ESP32 connects to the web app via WebSocket for real-time synchronization:

```
Protocol: WebSocket (wss://)
Port: 443 (HTTPS)
Message Format: JSON

Message Types:
1. SYNC_REQUEST    (Hardware → Web App)
2. SYNC_RESPONSE   (Web App → Hardware)
3. MODE_CHANGE     (Web App → Hardware)
4. STATUS_UPDATE   (Hardware → Web App)
```

### Example Messages

```json
// Hardware requests current microseason
{
  "type": "SYNC_REQUEST",
  "deviceId": "microseasons-cal-001",
  "timestamp": 1234567890,
  "timezone": "America/New_York"
}

// Web app responds with current state
{
  "type": "SYNC_RESPONSE",
  "currentMicroseason": {
    "id": 15,
    "nameEn": "Caterpillars become butterflies",
    "colors": ["#FFF9E3", "#E8D5A8", "#D4B86A"],
    "startDate": { "month": 3, "day": 16 },
    "endDate": { "month": 3, "day": 20 }
  },
  "activeLEDs": [20, 21, 22, 23, 24],
  "theme": "japanese",
  "accentColor": "#d4a5a5",
  "mode": "automatic"
}
```

---

## PCB Design Specifications

### Board Dimensions

```
┌─────────────────────────────────────┐
│  PCB: 18" × 13.5" (457mm × 343mm)   │
│  Material: FR4, 1.6mm thickness     │
│  Layers: 2 (Top + Bottom)           │
│  Finish: ENIG (Gold plating)        │
└─────────────────────────────────────┘

LED Positions (mm from top-left):
Row 0: (38, 38), (101, 38), (165, 38), ..., (419, 38)
Row 1: (38, 109), (101, 109), (165, 109), ..., (419, 109)
Row 2: (38, 180), (101, 180), (165, 180), ..., (419, 180)
Row 3: (38, 251), (101, 251), (165, 251), ..., (419, 251)
Row 4: (38, 322), (101, 322), (165, 322), ..., (419, 322)

Spacing: 63.5mm horizontal, 71mm vertical
```

### Connector Pinout

```
J1 (Main Power & Data Connector):
Pin 1: 5V     (Red)
Pin 2: GND    (Black)
Pin 3: DATA   (White/Yellow)
Pin 4: NC     (Not Connected)

J2 (ESP32 Programming Header):
Pin 1: 3.3V
Pin 2: GND
Pin 3: TX
Pin 4: RX
Pin 5: EN
Pin 6: IO0
```

---

## Firmware Architecture

### ESP32 Firmware Modules

```
/firmware
├── main.cpp                 # Entry point, setup/loop
├── led_controller.cpp       # WS2812B control via FastLED
├── microseason_tracker.cpp  # Date/microseason logic
├── wifi_manager.cpp         # WiFi + WebSocket client
├── animation_engine.cpp     # Breathing, sunrise, ambient patterns
├── config.h                 # User settings (WiFi SSID, timezone, etc.)
└── theme_colors.h           # Theme accent color definitions
```

### Libraries Required

```
platform = espressif32
framework = arduino
lib_deps =
    fastled/FastLED @ ^3.6.0
    bblanchon/ArduinoJson @ ^6.21.3
    links2004/WebSockets @ ^2.4.1
    adafruit/RTClib @ ^2.1.1
```

---

## Power Budget

| State | Current Draw | Duration | Energy |
|-------|-------------|----------|--------|
| **Active (5 LEDs @ 30%)** | ~300mA | 24hr | 7.2Wh |
| **Active (5 LEDs @ 60%)** | ~600mA | 24hr | 14.4Wh |
| **Idle (WiFi connected)** | ~80mA | 24hr | 1.9Wh |
| **Deep Sleep** | ~10mA | 24hr | 0.24Wh |

**Recommended Power Supply**: 5V 3A (15W) with overcurrent protection

---

## Assembly Instructions

### Physical Installation

1. **Mount PCB** to calendar back panel using 4× M3 standoffs (10mm height)
2. **Connect ESP32** via JST connector to main PCB
3. **Install diffuser layer** over each LED (frosted acrylic squares)
4. **Attach decorative tiles** with magnets for easy removal/customization
5. **Connect power supply** via USB-C port on side of frame
6. **Test LEDs** before final assembly (run test pattern firmware)

### Initial Setup

1. **Power on** calendar
2. **Connect to WiFi**:
   - Calendar creates AP: `Microseasons-Setup`
   - Connect and navigate to `http://192.168.4.1`
   - Enter WiFi credentials and timezone
3. **Sync with web app**:
   - Visit app.microseasons-calendar.com
   - Click "Pair Device"
   - Enter device ID from calendar display
4. **Verify operation**:
   - Check current microseason LEDs illuminate
   - Confirm breathing animation
   - Test theme changes from web app

---

## Maintenance

### LED Lifetime

- **Expected**: 50,000 hours (5.7 years continuous use)
- **Typical Use**: 20 years @ 30% brightness, 8hr/day
- **Degradation**: <30% brightness loss over lifetime

### Firmware Updates

Updates delivered via web app OTA (Over-The-Air):

1. Web app notifies of new firmware
2. User approves update
3. ESP32 downloads firmware via HTTPS
4. Calendar reboots with new firmware
5. LEDs flash green to confirm success

---

## Safety & Compliance

- **UL/CE Certified** power supply required
- **Low voltage** (5V DC) - safe for residential use
- **No UV emissions** - safe for artwork/photographs nearby
- **Fire safety**: FR4 PCB material, fused power supply
- **EMI compliance**: Shielded data lines, proper grounding

---

## Digital Twin Architecture

The digital twin is a web-based simulation that mirrors the physical LED hardware state in real-time.

### Features

- **Real-time LED state** - matches physical hardware
- **Interactive control** - click tiles to toggle LEDs
- **Theme preview** - visualize all 6 themes
- **Animation testing** - test patterns before deploying to hardware
- **WebGL rendering** - smooth 60fps animations

### Implementation

See `/src/components/LEDDigitalTwin/` for React component implementation.

---

**Document Version**: 1.0
**Last Updated**: 2025-11-22
**Author**: Claude (AI Assistant)
**License**: MIT
