# Microseasons Calendar - LED System

## Overview

The Microseasons Calendar features a sophisticated LED lighting system that brings the 72 Japanese microseasons to life with ambient backlighting. This document provides an overview of the complete LED system architecture, including hardware, firmware, and digital twin components.

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    WEB APPLICATION                          │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │ LED Digital  │  │ LED Control  │  │  WebSocket   │     │
│  │     Twin     │  │    Panel     │  │    Server    │     │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘     │
│         │                  │                  │             │
│         └──────────────────┴──────────────────┘             │
│                            │                                │
└────────────────────────────┼────────────────────────────────┘
                             │ WebSocket (WiFi)
                             │
┌────────────────────────────┼────────────────────────────────┐
│                  PHYSICAL HARDWARE                          │
│  ┌──────────────┐          │          ┌──────────────┐     │
│  │    ESP32     │◄─────────┴─────────►│  35× WS2812B │     │
│  │ Microcontrol │                      │     LEDs     │     │
│  │     ler      │                      │   (7×5 Grid) │     │
│  └──────┬───────┘                      └──────────────┘     │
│         │                                                    │
│         └─► 5V 3A Power Supply                              │
└─────────────────────────────────────────────────────────────┘
```

## Components

### 1. Hardware

**Physical LED System**:
- **35 WS2812B RGB LEDs** arranged in 7×5 grid
- **ESP32-WROOM-32** microcontroller with WiFi
- **74HCT245** logic level shifter (3.3V → 5V)
- **Custom PCB** for LED mounting and power distribution
- **5V 3A power supply** via USB-C
- **Hardwood frame** with diffuser layer and decorative tiles

**Documentation**: [`docs/LED_SPECIFICATIONS.md`](./docs/LED_SPECIFICATIONS.md)

**Build Guide**: [`docs/HARDWARE_IMPLEMENTATION_GUIDE.md`](./docs/HARDWARE_IMPLEMENTATION_GUIDE.md)

### 2. Firmware

**ESP32 Arduino Firmware**:
- WS2812B LED control via FastLED library
- WiFi connectivity and auto-reconnect
- WebSocket client for real-time sync with web app
- Breathing animation engine
- Theme-aware color mapping
- OTA update support

**Location**: [`firmware/`](./firmware/)

**Main Firmware**: [`firmware/microseasons-led-controller/`](./firmware/microseasons-led-controller/)

**Test Firmware**: [`firmware/test/led_test.ino`](./firmware/test/led_test.ino)

**Setup Guide**: [`firmware/README.md`](./firmware/README.md)

### 3. Digital Twin

**Web-Based Simulation**:
- Real-time 35-LED grid visualization
- Mirrors physical hardware state
- Interactive LED control (manual mode)
- 60fps animations (breathing, sunrise, rainbow)
- Theme-aware colors
- WebGL-accelerated rendering

**Components**:
- `src/components/LEDDigitalTwin/LEDDigitalTwin.tsx` - Main visualization
- `src/components/LEDDigitalTwin/LEDControlPanel.tsx` - Control interface
- `src/app/led-twin/page.tsx` - Digital twin showcase page

**Live Demo**: Visit `/led-twin` route in web app

### 4. LED Controller Logic

**TypeScript Module**:
- LED state management
- Microseason-to-LED mapping
- Animation pattern calculations (breathing, sunrise, rainbow)
- Theme color resolution
- Hardware sync message generation

**Location**: [`src/utils/ledController.ts`](./src/utils/ledController.ts)

## Features

### Microseason-Aware Lighting

The system automatically highlights the current 5-day microseason period:

```
Example: Microseason #15 (March 16-20)
Calendar Display (7×5 grid):
┌───────────────────────────────┐
│  SUN MON TUE WED THU FRI SAT  │
│  ... ... ... ... ... ...  16  │ ← LED20
│  17   18  19  20  ... ... ... │ ← LED21-24
└───────────────────────────────┘

Active LEDs: 20, 21, 22, 23, 24 (5 LEDs)
Color: Microseason color #15 or theme accent color
Animation: Breathing pulse (2-second cycle)
```

### Theme Integration

LEDs automatically adapt to the selected theme:

| Theme | Accent Color | LED Behavior |
|-------|-------------|--------------|
| **Japanese Minimalist** | Dusty Sakura Pink `#d4a5a5` | Subtle, warm glow |
| **Brutalist** | Concrete Gray `#808080` | Industrial, muted |
| **Organic Nature** | Earth Brown `#8B7355` | Earthy, warm |
| **Cyberpunk Neon** | Electric Cyan `#00FFFF` | Vibrant, electric |
| **Art Deco** | Champagne Gold `#F7E7CE` | Luxurious, warm |
| **Glassmorphic** | Frosted Blue `#A5C9E8` | Cool, modern |

### Animation Patterns

**1. Breathing (Default)**:
- Smooth sine wave pulsing
- Brightness: 60% → 100% → 60%
- Duration: 2 seconds per cycle
- Perfect for ambient, non-distracting lighting

**2. Sunrise**:
- Triggered when microseason changes (every 5 days)
- Fade in: 0% → 100% (2 seconds)
- Hold: 100% (2 seconds)
- Transition to breathing (2 seconds)

**3. Rainbow**:
- Cycles through all 72 microseason colors
- 5 seconds per color (360 seconds total)
- Smooth crossfade transitions
- Great for demonstrations

**4. Static**:
- Constant brightness, no animation
- Minimal power consumption
- Perfect for photography

**5. Off**:
- All LEDs off
- ESP32 enters low-power mode (~10mA)

### Control Modes

**Automatic Mode** (Default):
- LEDs track current date/microseason
- Updates daily at midnight
- Syncs with web app for configuration

**Manual Mode**:
- User selects specific LEDs to illuminate
- Click LEDs in digital twin to toggle
- Great for testing and demonstrations

**Ambient Mode**:
- Gentle rainbow cycling
- 20% brightness (night-light level)
- No microseason tracking

**Off Mode**:
- All LEDs off
- Low power consumption

## Getting Started

### Web App (Digital Twin)

1. **Start the web app**:
   ```bash
   npm run dev
   ```

2. **Visit the digital twin**:
   ```
   http://localhost:3000/led-twin
   ```

3. **Explore features**:
   - Watch LEDs animate in real-time
   - Change control mode, pattern, brightness
   - See current microseason info
   - Toggle interactive mode for manual control

### Physical Hardware

1. **Build the hardware**:
   - Follow [`docs/HARDWARE_IMPLEMENTATION_GUIDE.md`](./docs/HARDWARE_IMPLEMENTATION_GUIDE.md)
   - Order PCB and components
   - Assemble LED grid
   - Install in calendar frame

2. **Upload firmware**:
   - Follow [`firmware/README.md`](./firmware/README.md)
   - Test with `led_test.ino` first
   - Configure WiFi settings
   - Upload production firmware

3. **Connect to web app**:
   - Visit `/led-twin` page
   - Click "Connect Hardware"
   - Enter device MAC address
   - LEDs sync automatically

## File Structure

```
/microseasons
├── docs/
│   ├── LED_SPECIFICATIONS.md              # Complete hardware specs
│   └── HARDWARE_IMPLEMENTATION_GUIDE.md   # Step-by-step build guide
├── firmware/
│   ├── README.md                          # Firmware setup instructions
│   ├── microseasons-led-controller/       # Production firmware
│   │   └── microseasons-led-controller.ino
│   └── test/
│       └── led_test.ino                   # Simple LED test (no WiFi)
├── src/
│   ├── app/
│   │   └── led-twin/
│   │       └── page.tsx                   # Digital twin showcase page
│   ├── components/
│   │   └── LEDDigitalTwin/
│   │       ├── LEDDigitalTwin.tsx         # LED visualization component
│   │       ├── LEDControlPanel.tsx        # Control panel UI
│   │       └── index.ts
│   └── utils/
│       └── ledController.ts               # LED logic & state management
└── LED_SYSTEM_README.md                   # This file
```

## API Reference

### LED Controller Class

```typescript
import { LEDController, LEDConfig } from '@/utils/ledController'

// Create controller
const config: LEDConfig = {
  mode: 'automatic',
  pattern: 'breathing',
  brightness: 60,
  accentColor: '#d4a5a5',
  speed: 1.0,
}
const controller = new LEDController(config)

// Update for current microseason
controller.updateForMicroseason(microseasons)

// Animate (call in requestAnimationFrame)
const animatedStates = controller.animate(timestamp, microseasons)

// Change configuration
controller.setConfig({ brightness: 80 })

// Manual LED control
controller.setManualLEDs([0, 1, 2], '#FF0000')

// Export for hardware sync
const syncData = controller.exportForHardware()
```

### WebSocket Sync Protocol

**Client → Server** (ESP32 → Web App):
```json
{
  "type": "SYNC_REQUEST",
  "deviceId": "AA:BB:CC:DD:EE:FF",
  "deviceName": "Microseasons Calendar",
  "firmwareVersion": "1.0.0",
  "timestamp": 1234567890
}
```

**Server → Client** (Web App → ESP32):
```json
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
  "accentColor": "#d4a5a5",
  "brightness": 60,
  "mode": "automatic",
  "pattern": "breathing"
}
```

## Technical Specifications

### LED Grid

| Spec | Value |
|------|-------|
| Grid Size | 7 columns × 5 rows |
| Total LEDs | 35 |
| LED Type | WS2812B (5050 RGB) |
| LED Spacing | 63.5mm horizontal, 71mm vertical |
| Data Protocol | WS2812B single-wire |

### Power

| State | Current | Power |
|-------|---------|-------|
| Idle | 80mA | 0.4W |
| Typical (5 LEDs @ 60%) | 600mA | 3W |
| Maximum (35 LEDs @ 100%) | 2.1A | 10.5W |

**Power Supply**: 5V 3A (15W) USB-C

### Performance

| Metric | Value |
|--------|-------|
| Animation FPS | 60fps (web), 50fps (hardware) |
| WebSocket Latency | <50ms (local network) |
| LED Update Rate | 20ms (50 updates/sec) |
| WiFi Reconnect | <5 seconds |

## Cost Breakdown

### Hardware Components

| Item | Cost |
|------|------|
| Electronic components (LEDs, ESP32, etc.) | ~$52 |
| Enclosure & materials | ~$65 |
| **Total** | **~$117** |

### Development Time

| Task | Time |
|------|------|
| PCB design | 4-6 hours |
| Firmware development | 6-8 hours |
| Assembly & testing | 6-8 hours |
| **Total** | **16-22 hours** |

## Future Enhancements

### Planned Features

- [ ] **Mobile app** for remote control (iOS/Android)
- [ ] **Ambient light sensor** for automatic brightness
- [ ] **Sound-reactive mode** using microphone
- [ ] **Multiple calendar sync** (control multiple units)
- [ ] **Custom animation designer** in web app
- [ ] **Seasonal transitions** (smooth color shifts)
- [ ] **OTA firmware updates** via web app
- [ ] **Historical playback** (view past microseasons)

### Hardware Variants

- **Mini version**: 3×5 grid (15 LEDs) for smaller spaces
- **Mega version**: 14×10 grid (140 LEDs) for 4× resolution
- **Wall-mounted**: Integrated power, no external cables
- **Desk version**: Angled stand for desktop use

## Troubleshooting

### Digital Twin Issues

**LEDs not animating**:
- Check browser console for errors
- Ensure `requestAnimationFrame` is supported
- Try disabling browser extensions

**Colors look wrong**:
- Verify theme is correctly applied
- Check `accentColor` in LED config
- Try different color palette in settings

### Hardware Issues

**No LEDs light up**:
- Check power supply (5V 3A)
- Verify data line connection (GPIO 2)
- Test with `led_test.ino` firmware
- Check level shifter installation

**WiFi won't connect**:
- ESP32 only supports 2.4GHz (not 5GHz)
- Double-check SSID/password (case-sensitive)
- Move closer to router
- Check router allows new devices

**WebSocket disconnects**:
- Verify web app is running
- Check firewall settings
- Use local IP for testing
- Ensure stable WiFi signal

## Contributing

We welcome contributions to the LED system! Areas for contribution:

- **Firmware**: New animation patterns, performance optimization
- **Digital Twin**: Enhanced visualizations, new features
- **Hardware**: PCB improvements, alternative designs
- **Documentation**: Tutorials, troubleshooting guides

Please open an issue or pull request on GitHub.

## License

MIT License - See main repository for details.

## Support

For LED system support:
- **Documentation**: See `/docs` directory
- **Firmware Help**: See `/firmware/README.md`
- **Issues**: [GitHub Issues](https://github.com/samfrons/microseasons/issues)
- **Discussions**: [GitHub Discussions](https://github.com/samfrons/microseasons/discussions)

---

**Last Updated**: 2025-11-22
**Version**: 1.0
**Author**: Claude (AI Assistant)
