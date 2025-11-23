# Hardware Implementation Guide
## Building the Microseasons Calendar LED System

---

## Table of Contents

1. [Overview](#overview)
2. [Bill of Materials](#bill-of-materials)
3. [PCB Design](#pcb-design)
4. [Assembly Instructions](#assembly-instructions)
5. [Firmware Development](#firmware-development)
6. [Testing & Calibration](#testing--calibration)
7. [Web App Integration](#web-app-integration)
8. [Troubleshooting](#troubleshooting)

---

## Overview

This guide walks you through building the physical LED system for the Microseasons Calendar. The system consists of:

- **35 WS2812B RGB LEDs** in a 7×5 grid
- **ESP32 microcontroller** for WiFi connectivity and LED control
- **Custom PCB** for LED mounting and power distribution
- **5V 3A power supply** via USB-C
- **WebSocket client** for real-time sync with web app

**Estimated Build Time**: 6-8 hours
**Skill Level**: Intermediate (soldering, basic programming)
**Cost**: ~$85 USD

---

## Bill of Materials

### Electronic Components

| Qty | Component | Part Number | Supplier | Unit Price | Total |
|-----|-----------|-------------|----------|------------|-------|
| 35 | WS2812B RGB LED (5050 package) | WS2812B-V5 | Adafruit/AliExpress | $0.40 | $14.00 |
| 1 | ESP32 Development Board | ESP32-WROOM-32 | Adafruit 3405 | $9.95 | $9.95 |
| 1 | USB-C Power Supply, 5V 3A | - | Amazon | $8.99 | $8.99 |
| 1 | 74HCT245 Logic Level Shifter IC | 74HCT245N | Digi-Key | $0.75 | $0.75 |
| 1 | Electrolytic Capacitor, 1000μF 6.3V | - | Digi-Key | $0.35 | $0.35 |
| 1 | Resistor, 470Ω 1/4W | - | Digi-Key | $0.10 | $0.10 |
| 1 | Custom PCB (see design files) | - | JLCPCB/OSHPark | $15.00 | $15.00 |
| 1 | JST-PH 4-pin connector (male) | - | Adafruit | $0.50 | $0.50 |
| 1 | JST-PH 4-pin connector (female) | - | Adafruit | $0.50 | $0.50 |
| 4 | M3 standoffs, 10mm | - | Amazon | $0.25 | $1.00 |
| 8 | M3 screws, 6mm | - | Amazon | $0.10 | $0.80 |

**Subtotal (Electronics)**: ~$52

### Enclosure & Diffuser Materials

| Qty | Component | Supplier | Unit Price | Total |
|-----|-----------|----------|------------|-------|
| 1 | Hardwood frame (walnut/maple), 20"×16"×1.5" | Local woodshop | $25.00 | $25.00 |
| 1 | Frosted acrylic sheet, 0.125" thick, 18"×14" | TAP Plastics | $12.00 | $12.00 |
| 1 | White PVC backing sheet, 18"×14" | Home Depot | $5.00 | $5.00 |
| 35 | Decorative tiles (wood/metal), 2"×2.5" | Craft store | $0.50 | $17.50 |
| 35 | Small magnets (6mm×2mm) | Amazon | $0.15 | $5.25 |

**Subtotal (Enclosure)**: ~$65

### Tools Required (not included in cost)

- Soldering iron + solder
- Wire strippers
- Multimeter
- Hot glue gun
- Drill + bits
- Saw (for cutting acrylic/wood)
- Computer with USB cable

**Total Project Cost**: ~$117 USD

---

## PCB Design

### Design Files

PCB design files are available in the `/hardware/pcb/` directory:

```
/hardware/pcb/
├── microseasons-led-pcb.kicad_pcb   # KiCad PCB layout
├── microseasons-led-pcb.kicad_sch   # KiCad schematic
├── gerbers/                          # Gerber files for manufacturing
│   ├── F.Cu.gbr
│   ├── B.Cu.gbr
│   ├── F.Mask.gbr
│   ├── Edge.Cuts.gbr
│   └── ...
└── bom.csv                           # Bill of materials
```

### PCB Specifications

```
Dimensions: 457mm × 343mm (18" × 13.5")
Layers: 2 (top + bottom)
Thickness: 1.6mm
Material: FR4
Surface Finish: ENIG (gold plating)
Min Trace Width: 0.3mm
Min Hole Size: 0.5mm
```

### Ordering the PCB

**Recommended Manufacturer**: JLCPCB

1. Visit [jlcpcb.com](https://jlcpcb.com)
2. Upload `gerbers.zip` from `/hardware/pcb/gerbers/`
3. Select:
   - **Quantity**: 5 (minimum)
   - **Thickness**: 1.6mm
   - **Surface Finish**: ENIG
   - **Color**: Black (recommended for light control)
4. Review and order (~$15 for 5 boards, 7-day shipping)

### LED Footprint Layout

LEDs are positioned in a 7×5 grid with the following spacing:

```
Horizontal spacing: 63.5mm (center-to-center)
Vertical spacing: 71mm (center-to-center)
First LED position: (38mm, 38mm) from top-left corner
```

**KiCad Footprint**: Use `LED_SMD:LED_WS2812B_PLCC4_5.0x5.0mm_P3.2mm`

---

## Assembly Instructions

### Step 1: Inspect PCB

1. Receive PCB from manufacturer
2. Inspect for defects (scratches, incomplete traces)
3. Use multimeter to verify continuity between pads
4. Clean with isopropyl alcohol if needed

### Step 2: Solder Surface-Mount Components

**Order of assembly** (smallest to largest):

1. **470Ω resistor** (R1)
   - Position: Near ESP32 header
   - Orientation: Either way (non-polarized)

2. **74HCT245 IC** (U1)
   - Position: Between ESP32 and first LED
   - **IMPORTANT**: Match pin 1 indicator (dot) with PCB marking
   - Use flux for clean joints

3. **1000μF capacitor** (C1)
   - Position: Near power input
   - **POLARITY**: Negative stripe aligns with PCB marking
   - Solder through-hole, bend leads at 90°

### Step 3: Solder WS2812B LEDs

**CRITICAL**: WS2812B LEDs are **polarized** and **heat-sensitive**.

**LED Orientation**:
```
     ┌───────┐
     │ ●   5V│  ← Notched corner (pin 1)
     │       │
     │DIN GND│
     └───────┘
```

**Soldering Tips**:
- Use **temperature-controlled iron** at 300°C (575°F)
- Apply flux to pads before placing LED
- Solder one corner first to tack in place
- Solder remaining 3 pads quickly (< 3 seconds each)
- **Do not overheat** - LEDs will fail if exposed to >350°C

**LED Soldering Order**:
Start with LED0 (top-left) and work row-by-row:

1. LED0 → LED1 → ... → LED6 (Row 0)
2. LED7 → LED8 → ... → LED13 (Row 1)
3. Continue through LED34 (bottom-right)

**Test after every 5 LEDs**: Power on and verify all LEDs light up.

### Step 4: Solder ESP32 Header

1. Insert **female header pins** into ESP32 mounting holes on PCB
2. Place ESP32 board on headers (to keep alignment)
3. Solder pins from bottom of PCB
4. Remove ESP32 (it will be reattached later with screws)

### Step 5: Wire Power and Data Connections

**Main Power Connector (J1)**:

```
Pin 1 (5V)   → Red wire → USB-C breakout (+)
Pin 2 (GND)  → Black wire → USB-C breakout (-)
Pin 3 (DATA) → Yellow wire → ESP32 GPIO 2
```

Solder wires to JST-PH connector, then plug into J1.

### Step 6: Initial Power-On Test

**BEFORE connecting all LEDs**:

1. Set multimeter to DC voltage mode
2. Plug in USB-C power supply
3. Measure voltage at test points:
   - **TP1 (5V)**: Should read ~5.0V
   - **TP2 (3.3V)**: Should read ~3.3V
   - **TP3 (DATA)**: Should read ~5.0V (with level shifter)

4. If any voltage is incorrect, **POWER OFF IMMEDIATELY** and check connections.

### Step 7: Upload Test Firmware

1. Connect ESP32 to computer via USB
2. Open Arduino IDE
3. Load `/firmware/test/led_test.ino`
4. Select **Board**: "ESP32 Dev Module"
5. Select **Port**: (your ESP32 port)
6. Click **Upload**

**Expected Behavior**: All 35 LEDs should light up in rainbow pattern.

If LEDs don't light:
- Check data line connection (GPIO 2 → 74HCT245 → LED0 DIN)
- Verify 5V power at LED pads
- Test individual LED with multimeter (should have ~5V at VCC pin)

---

## Firmware Development

### Setting Up Arduino IDE

1. **Install ESP32 Board Support**:
   - File → Preferences → Additional Board URLs
   - Add: `https://dl.espressif.com/dl/package_esp32_index.json`
   - Tools → Board → Boards Manager → Search "ESP32" → Install

2. **Install Required Libraries**:
   ```
   Sketch → Include Library → Manage Libraries

   Install:
   - FastLED (v3.6.0+)
   - ArduinoJson (v6.21.3+)
   - WebSockets by Links2004 (v2.4.1+)
   ```

### Main Firmware Structure

**File**: `/firmware/microseasons-led-controller/microseasons-led-controller.ino`

```cpp
#include <FastLED.h>
#include <WiFi.h>
#include <WebSocketsClient.h>
#include <ArduinoJson.h>

// Configuration
#define LED_PIN 2
#define NUM_LEDS 35
#define LED_TYPE WS2812B
#define COLOR_ORDER GRB

// WiFi credentials (update with your network)
const char* WIFI_SSID = "YourNetworkName";
const char* WIFI_PASSWORD = "YourPassword";

// WebSocket server (update with your web app URL)
const char* WS_HOST = "app.microseasons-calendar.com";
const uint16_t WS_PORT = 443;
const char* WS_PATH = "/ws";

// LED array
CRGB leds[NUM_LEDS];

// WebSocket client
WebSocketsClient webSocket;

void setup() {
  Serial.begin(115200);

  // Initialize LEDs
  FastLED.addLeds<LED_TYPE, LED_PIN, COLOR_ORDER>(leds, NUM_LEDS)
    .setCorrection(TypicalLEDStrip);
  FastLED.setBrightness(60);

  // Connect to WiFi
  connectWiFi();

  // Connect to WebSocket server
  connectWebSocket();
}

void loop() {
  webSocket.loop();

  // Update LED animations
  updateLEDs();

  FastLED.show();
  delay(20); // ~50 FPS
}

void connectWiFi() {
  Serial.print("Connecting to WiFi");
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println("\nWiFi connected!");
  Serial.print("IP: ");
  Serial.println(WiFi.localIP());
}

void connectWebSocket() {
  webSocket.beginSSL(WS_HOST, WS_PORT, WS_PATH);
  webSocket.onEvent(webSocketEvent);
  webSocket.setReconnectInterval(5000);
}

void webSocketEvent(WStype_t type, uint8_t* payload, size_t length) {
  switch(type) {
    case WStype_CONNECTED:
      Serial.println("WebSocket connected");
      // Request sync
      sendSyncRequest();
      break;

    case WStype_TEXT:
      Serial.printf("Received: %s\n", payload);
      handleSyncResponse((char*)payload);
      break;

    case WStype_DISCONNECTED:
      Serial.println("WebSocket disconnected");
      break;
  }
}

void handleSyncResponse(char* json) {
  StaticJsonDocument<1024> doc;
  deserializeJson(doc, json);

  if (doc["type"] == "SYNC_RESPONSE") {
    JsonArray activeLEDs = doc["activeLEDs"];
    const char* accentColor = doc["accentColor"];
    int brightness = doc["brightness"];

    // Update LED states
    updateLEDsFromSync(activeLEDs, accentColor, brightness);
  }
}

void updateLEDsFromSync(JsonArray activeLEDs, const char* color, int brightness) {
  // Parse hex color to RGB
  CRGB rgb = hexToRGB(color);

  // Clear all LEDs
  fill_solid(leds, NUM_LEDS, CRGB::Black);

  // Set active LEDs
  for (int i = 0; i < activeLEDs.size(); i++) {
    int ledIndex = activeLEDs[i];
    if (ledIndex >= 0 && ledIndex < NUM_LEDS) {
      leds[ledIndex] = rgb;
    }
  }

  FastLED.setBrightness(brightness * 255 / 100);
}

CRGB hexToRGB(const char* hex) {
  // Convert #RRGGBB to CRGB
  long number = strtol(hex + 1, NULL, 16);
  return CRGB(
    (number >> 16) & 0xFF,
    (number >> 8) & 0xFF,
    number & 0xFF
  );
}

void sendSyncRequest() {
  StaticJsonDocument<256> doc;
  doc["type"] = "SYNC_REQUEST";
  doc["deviceId"] = WiFi.macAddress();
  doc["timestamp"] = millis();

  String json;
  serializeJson(doc, json);
  webSocket.sendTXT(json);
}

// Breathing animation
void updateLEDs() {
  static uint32_t lastUpdate = 0;
  static float phase = 0;

  if (millis() - lastUpdate > 20) {
    lastUpdate = millis();
    phase += 0.05;

    // Apply breathing effect to all active LEDs
    float brightness = 0.6 + 0.4 * sin(phase);
    FastLED.setBrightness(brightness * 255);
  }
}
```

### Uploading Firmware

1. Update WiFi credentials in code
2. Update WebSocket server URL
3. Connect ESP32 via USB
4. Select correct board and port
5. Click **Upload**
6. Monitor serial output (115200 baud)

**Expected Serial Output**:
```
Connecting to WiFi....
WiFi connected!
IP: 192.168.1.123
WebSocket connected
Received: {"type":"SYNC_RESPONSE",...}
```

---

## Testing & Calibration

### Test 1: Individual LED Test

**Goal**: Verify each LED is functional and correctly wired.

```cpp
// Upload this test code
void loop() {
  for (int i = 0; i < NUM_LEDS; i++) {
    fill_solid(leds, NUM_LEDS, CRGB::Black);
    leds[i] = CRGB::Red;
    FastLED.show();
    delay(200);

    Serial.print("Testing LED ");
    Serial.println(i);
  }
}
```

**Check**: Each LED lights up sequentially. If any LED is skipped, check soldering.

### Test 2: Color Accuracy

**Goal**: Verify color reproduction.

```cpp
void loop() {
  // Red
  fill_solid(leds, NUM_LEDS, CRGB::Red);
  FastLED.show();
  delay(1000);

  // Green
  fill_solid(leds, NUM_LEDS, CRGB::Green);
  FastLED.show();
  delay(1000);

  // Blue
  fill_solid(leds, NUM_LEDS, CRGB::Blue);
  FastLED.show();
  delay(1000);
}
```

**Check**: Colors should be vivid and accurate. If colors look wrong:
- Check `COLOR_ORDER` setting (try `RGB` instead of `GRB`)
- Verify 5V power supply voltage (should be 4.8-5.2V)

### Test 3: Brightness Levels

**Goal**: Verify brightness control.

```cpp
void loop() {
  fill_solid(leds, NUM_LEDS, CRGB::White);

  for (int brightness = 0; brightness <= 255; brightness += 5) {
    FastLED.setBrightness(brightness);
    FastLED.show();
    delay(50);
  }

  delay(1000);
}
```

**Check**: Smooth fade from off to full brightness.

### Test 4: WebSocket Sync

**Goal**: Verify communication with web app.

1. Start web app on local network
2. Update firmware with web app's IP/URL
3. Upload firmware to ESP32
4. Open web app in browser
5. Navigate to `/led-twin` page
6. Change LED settings in control panel
7. Verify physical LEDs update in real-time

---

## Web App Integration

### WebSocket Server Setup

The web app includes a WebSocket server at `/api/led-sync/route.ts`:

```typescript
// /src/app/api/led-sync/route.ts
import { Server } from 'ws'

export async function GET(request: Request) {
  const wss = new Server({ noServer: true })

  wss.on('connection', (ws) => {
    console.log('LED hardware connected')

    ws.on('message', (message) => {
      const data = JSON.parse(message.toString())

      if (data.type === 'SYNC_REQUEST') {
        // Send current microseason state
        const response = createSyncMessage(...)
        ws.send(JSON.stringify(response))
      }
    })
  })

  return new Response('WebSocket server running', { status: 200 })
}
```

### Device Pairing

1. User visits `/led-twin` page
2. Clicks "Connect Hardware"
3. Enters device MAC address (shown on ESP32 serial monitor)
4. App establishes WebSocket connection
5. Real-time sync begins

---

## Troubleshooting

### Issue: No LEDs light up

**Possible Causes**:
1. No power (check 5V at LED pads)
2. Incorrect wiring (verify DATA line from GPIO 2)
3. Wrong `LED_PIN` in code (should be 2)
4. First LED is dead (bypass and connect to LED1)

**Solution**:
- Check connections with multimeter
- Re-upload firmware with debug serial output
- Test with a single external LED first

### Issue: Some LEDs don't light up

**Possible Causes**:
1. Cold solder joint on that LED
2. LED was overheated during soldering
3. Data line broken between LEDs

**Solution**:
- Reflow solder on affected LED
- Check continuity from DOUT of previous LED to DIN of next LED
- Replace damaged LED

### Issue: Wrong colors

**Possible Causes**:
1. Incorrect `COLOR_ORDER` in code
2. Voltage drop (power supply too weak)

**Solution**:
- Try different color orders: `GRB`, `RGB`, `BGR`
- Use multimeter to check voltage at last LED (should be >4.5V)

### Issue: WiFi won't connect

**Possible Causes**:
1. Wrong SSID/password
2. 5GHz network (ESP32 only supports 2.4GHz)
3. Weak signal

**Solution**:
- Double-check credentials
- Ensure router has 2.4GHz band enabled
- Move calendar closer to router

### Issue: WebSocket disconnects frequently

**Possible Causes**:
1. Firewall blocking connection
2. Power supply instability
3. Network congestion

**Solution**:
- Check firewall settings
- Use higher-quality power supply
- Implement reconnection logic in firmware (already included)

---

## Advanced Features

### OTA (Over-The-Air) Updates

Enable wireless firmware updates without USB cable:

```cpp
#include <ArduinoOTA.h>

void setup() {
  // ... existing setup code ...

  ArduinoOTA.setHostname("microseasons-calendar");
  ArduinoOTA.begin();
}

void loop() {
  ArduinoOTA.handle();
  // ... existing loop code ...
}
```

### Ambient Light Sensor

Add automatic brightness adjustment based on room lighting:

**Parts**: TSL2561 light sensor ($5)

**Wiring**: I2C (SDA→GPIO21, SCL→GPIO22)

**Code**:
```cpp
#include <Adafruit_TSL2561_U.h>

Adafruit_TSL2561_Unified tsl = Adafruit_TSL2561_Unified(TSL2561_ADDR_FLOAT);

void loop() {
  sensors_event_t event;
  tsl.getEvent(&event);

  int autoBrightness = map(event.light, 0, 500, 20, 100);
  FastLED.setBrightness(autoBrightness * 255 / 100);

  // ... rest of code ...
}
```

---

## Resources

- **LED Datasheet**: [WS2812B Specifications](https://cdn-shop.adafruit.com/datasheets/WS2812B.pdf)
- **ESP32 Pinout**: [ESP32 Reference](https://randomnerdtutorials.com/esp32-pinout-reference-gpios/)
- **FastLED Library**: [FastLED Documentation](https://fastled.io/)
- **WebSocket Protocol**: [RFC 6455](https://tools.ietf.org/html/rfc6455)

---

## Support

For hardware support, please open an issue on GitHub:
[github.com/samfrons/microseasons/issues](https://github.com/samfrons/microseasons/issues)

---

**Document Version**: 1.0
**Last Updated**: 2025-11-22
**Author**: Claude (AI Assistant)
**License**: MIT
