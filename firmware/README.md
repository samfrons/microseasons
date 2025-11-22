# Microseasons Calendar - Firmware

This directory contains Arduino firmware for the ESP32-based LED controller.

## Directory Structure

```
/firmware
├── README.md                           # This file
├── microseasons-led-controller/        # Main production firmware
│   └── microseasons-led-controller.ino # Full-featured WebSocket sync
└── test/                               # Test firmware
    └── led_test.ino                    # Simple LED testing (no WiFi)
```

## Quick Start

### 1. Install Arduino IDE

Download and install Arduino IDE from [arduino.cc](https://www.arduino.cc/en/software)

### 2. Install ESP32 Board Support

1. Open Arduino IDE
2. Go to **File → Preferences**
3. Add to **Additional Board Manager URLs**:
   ```
   https://dl.espressif.com/dl/package_esp32_index.json
   ```
4. Go to **Tools → Board → Boards Manager**
5. Search for "ESP32"
6. Install **esp32 by Espressif Systems**

### 3. Install Required Libraries

Go to **Sketch → Include Library → Manage Libraries**

Install the following:

| Library | Version | Purpose |
|---------|---------|---------|
| **FastLED** | 3.6.0+ | WS2812B LED control |
| **ArduinoJson** | 6.21.3+ | JSON parsing |
| **WebSockets** by Links2004 | 2.4.1+ | WebSocket client |

### 4. Hardware Setup

Connect your ESP32 to the LED strip:

```
ESP32 GPIO 2 → 74HCT245 Level Shifter → LED Strip DIN
ESP32 GND   → Power Supply GND
LED Strip   → 5V 3A Power Supply
```

**IMPORTANT**:
- ESP32 runs at 3.3V, WS2812B requires 5V data signal (use level shifter!)
- Never power LEDs directly from ESP32 (use external 5V power supply)

## Firmware Options

### Option 1: Test Firmware (Recommended for first-time setup)

**Use this to verify your LED hardware is working correctly.**

**File**: `test/led_test.ino`

**Features**:
- ✓ No WiFi required
- ✓ No configuration needed
- ✓ Tests all 35 LEDs individually
- ✓ Tests colors, brightness, animations

**Upload Instructions**:
1. Open `test/led_test.ino` in Arduino IDE
2. Select **Board**: "ESP32 Dev Module"
3. Select **Port**: (your ESP32 port)
4. Click **Upload** (→)
5. Open **Serial Monitor** (Ctrl+Shift+M) at 115200 baud

**Expected Behavior**:
- LEDs light up one by one (red)
- All LEDs test different colors
- Brightness fades up and down
- Rainbow pattern cycles
- Tests repeat continuously

### Option 2: Production Firmware (Full features)

**Use this for actual deployment with web app sync.**

**File**: `microseasons-led-controller/microseasons-led-controller.ino`

**Features**:
- ✓ WiFi connectivity
- ✓ WebSocket sync with web app
- ✓ Real-time microseason tracking
- ✓ Breathing animation
- ✓ Theme-aware colors
- ✓ OTA updates ready

**Setup Instructions**:

1. **Edit Configuration** (lines 27-36):
   ```cpp
   // Update these values:
   const char* WIFI_SSID = "YourNetworkName";
   const char* WIFI_PASSWORD = "YourPassword";
   const char* WS_HOST = "app.microseasons-calendar.com";
   const uint16_t WS_PORT = 443;
   const bool USE_SSL = true;
   ```

2. **For Local Testing** (same WiFi network):
   ```cpp
   const char* WS_HOST = "192.168.1.123"; // Your computer's IP
   const uint16_t WS_PORT = 3000; // Next.js dev server
   const bool USE_SSL = false;
   ```

3. **Upload Firmware**:
   - Open `microseasons-led-controller/microseasons-led-controller.ino`
   - Select **Board**: "ESP32 Dev Module"
   - Select **Port**: (your ESP32 port)
   - Click **Upload** (→)
   - Open **Serial Monitor** at 115200 baud

4. **Verify Connection**:
   ```
   ========================================
   Microseasons Calendar - LED Controller
   ========================================
   Firmware Version: 1.0.0

   Initializing LEDs...
     LED Count: 35
     LED Pin: GPIO2
     ✓ LEDs initialized

   Connecting to WiFi: YourNetworkName
   .....
     ✓ WiFi connected!
     IP Address: 192.168.1.234
     MAC Address: AA:BB:CC:DD:EE:FF

   Connecting to WebSocket: app.microseasons-calendar.com:443
     WebSocket client started

   [WS] Connected!
   [WS] Sending: {"type":"SYNC_REQUEST",...}
   [WS] Received: {"type":"SYNC_RESPONSE",...}
   [SYNC] Active LEDs: 5/35

   Setup complete!
   ========================================
   ```

## Configuration

### WiFi Settings

Update in `microseasons-led-controller.ino`:

```cpp
const char* WIFI_SSID = "YourNetworkName";
const char* WIFI_PASSWORD = "YourPassword";
```

**Troubleshooting**:
- ESP32 only supports **2.4GHz WiFi** (not 5GHz)
- Check SSID spelling (case-sensitive!)
- Ensure router allows new device connections

### WebSocket Settings

**For Production** (web app hosted online):
```cpp
const char* WS_HOST = "app.microseasons-calendar.com";
const uint16_t WS_PORT = 443;
const bool USE_SSL = true;
```

**For Local Development** (Next.js dev server):
```cpp
const char* WS_HOST = "192.168.1.100"; // Your computer's local IP
const uint16_t WS_PORT = 3000;
const bool USE_SSL = false;
```

**Finding Your Local IP**:
- **macOS/Linux**: Run `ifconfig` or `ip addr`
- **Windows**: Run `ipconfig`
- Look for `192.168.x.x` or `10.0.x.x`

### LED Settings

```cpp
#define LED_PIN 2        // GPIO pin connected to LED data line
#define NUM_LEDS 35      // Total number of LEDs (7×5 grid)
#define LED_TYPE WS2812B // LED chip type
#define COLOR_ORDER GRB  // Try RGB, GRB, or BGR if colors are wrong
```

## Testing

### Serial Monitor Output

Open **Serial Monitor** (Tools → Serial Monitor) at **115200 baud** to see:

- Startup messages
- WiFi connection status
- WebSocket messages
- LED updates
- Error messages

### LED Behavior

**Test Firmware**:
- Individual LED test (red, one at a time)
- Color test (all LEDs, cycling through colors)
- Brightness test (fade up/down)
- Rainbow pattern

**Production Firmware**:
- Startup animation (rainbow wave)
- WiFi connecting (blue blink)
- WiFi success (green pulse × 3)
- WiFi error (red pulse × 3)
- Normal operation (breathing microseason LEDs)

## Troubleshooting

### No LEDs Light Up

**Check**:
1. Power supply connected? (5V 3A)
2. LED data wire connected to GPIO 2?
3. Level shifter installed? (3.3V → 5V)
4. Correct `LED_PIN` in code?

**Test**:
- Upload `test/led_test.ino`
- Check Serial Monitor for errors
- Measure voltage at LED strip (should be 5V)

### Wrong Colors

**Try Different Color Orders**:
```cpp
#define COLOR_ORDER GRB  // Try: RGB, GRB, BGR
```

Upload and test until colors look correct.

### WiFi Won't Connect

**Check**:
1. SSID and password correct? (case-sensitive!)
2. 2.4GHz network? (ESP32 doesn't support 5GHz)
3. Router allows new devices?
4. Strong signal? (move closer to router)

**Debug**:
```cpp
Serial.print("WiFi Status: ");
Serial.println(WiFi.status());
// 3 = WL_CONNECTED
// 4 = WL_CONNECT_FAILED
// 6 = WL_DISCONNECTED
```

### WebSocket Won't Connect

**Check**:
1. Web app running?
2. Correct IP/hostname?
3. Correct port number?
4. Firewall blocking connection?
5. Using SSL when it should be non-SSL? (or vice versa)

**For Local Testing**:
- Set `USE_SSL = false`
- Use computer's local IP (e.g., `192.168.1.100`)
- Use port `3000` (Next.js default)

## Advanced Configuration

### Change Animation Speed

In production firmware:
```cpp
config.speed = 1.0; // Default: 1.0, Range: 0.5 - 2.0
```

### Change Default Brightness

```cpp
config.brightness = 60; // Default: 60%, Range: 0 - 100
```

### Enable OTA Updates

Add to `setup()`:
```cpp
#include <ArduinoOTA.h>

void setup() {
  // ... existing code ...

  ArduinoOTA.setHostname("microseasons-calendar");
  ArduinoOTA.setPassword("your-password"); // Optional
  ArduinoOTA.begin();
}

void loop() {
  ArduinoOTA.handle();
  // ... existing code ...
}
```

Now you can update firmware wirelessly!

## Board Configuration

Recommended settings in Arduino IDE:

```
Board: "ESP32 Dev Module"
Upload Speed: 921600
CPU Frequency: 240MHz (WiFi/BT)
Flash Frequency: 80MHz
Flash Mode: QIO
Flash Size: 4MB (32Mb)
Partition Scheme: Default 4MB with spiffs
Core Debug Level: None
PSRAM: Disabled
```

## Power Consumption

| Scenario | Current Draw |
|----------|-------------|
| All LEDs off | ~80mA (WiFi on) |
| 5 LEDs @ 30% brightness | ~300mA |
| 5 LEDs @ 60% brightness | ~600mA |
| All 35 LEDs @ 100% white | ~2.1A |

**Recommended Power Supply**: 5V 3A (15W)

## Getting MAC Address

Your device MAC address is shown in Serial Monitor on startup:
```
MAC Address: AA:BB:CC:DD:EE:FF
```

Use this when pairing with the web app.

## Support

For firmware issues, please:
1. Check Serial Monitor output
2. Verify hardware connections
3. Try test firmware first
4. Open an issue on GitHub with Serial Monitor logs

## License

MIT License - See main repository for details.
