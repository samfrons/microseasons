/**
 * Microseasons Calendar - LED Controller Firmware
 *
 * Controls 35 WS2812B RGB LEDs in 7×5 grid
 * Connects to web app via WebSocket for real-time sync
 *
 * Hardware:
 * - ESP32-WROOM-32
 * - 35× WS2812B LEDs
 * - 74HCT245 Level Shifter
 * - 5V 3A Power Supply
 */

#include <FastLED.h>
#include <WiFi.h>
#include <WebSocketsClient.h>
#include <ArduinoJson.h>

// ============================================================================
// CONFIGURATION - Update these values for your setup
// ============================================================================

// LED Configuration
#define LED_PIN 2
#define NUM_LEDS 35
#define LED_TYPE WS2812B
#define COLOR_ORDER GRB

// WiFi Configuration (update with your network)
const char* WIFI_SSID = "YourNetworkName";
const char* WIFI_PASSWORD = "YourPassword";

// WebSocket Configuration (update with your web app URL)
const char* WS_HOST = "app.microseasons-calendar.com"; // or your local IP
const uint16_t WS_PORT = 443; // Use 80 for non-SSL
const char* WS_PATH = "/ws";
const bool USE_SSL = true; // Set to false for local testing

// Device Configuration
const char* DEVICE_NAME = "Microseasons Calendar";
const char* FIRMWARE_VERSION = "1.0.0";

// ============================================================================
// GLOBAL VARIABLES
// ============================================================================

CRGB leds[NUM_LEDS];
WebSocketsClient webSocket;

// LED State
struct LEDConfig {
  int brightness = 60;
  float speed = 1.0;
  bool active = true;
  String accentColor = "#d4a5a5";
} config;

// Active LED indices
int activeLEDs[NUM_LEDS];
int numActiveLEDs = 0;

// Animation state
float breathingPhase = 0;
unsigned long lastAnimationUpdate = 0;
const int ANIMATION_INTERVAL = 20; // 50 FPS

// Connection state
bool wifiConnected = false;
bool wsConnected = false;
unsigned long lastReconnectAttempt = 0;
const int RECONNECT_INTERVAL = 5000;

// ============================================================================
// SETUP
// ============================================================================

void setup() {
  Serial.begin(115200);
  Serial.println("\n\n========================================");
  Serial.println("Microseasons Calendar - LED Controller");
  Serial.println("========================================");
  Serial.print("Firmware Version: ");
  Serial.println(FIRMWARE_VERSION);
  Serial.println();

  // Initialize LEDs
  initializeLEDs();

  // Show startup animation
  startupAnimation();

  // Connect to WiFi
  connectWiFi();

  // Connect to WebSocket server
  if (wifiConnected) {
    connectWebSocket();
  }

  Serial.println("Setup complete!");
  Serial.println("========================================\n");
}

// ============================================================================
// MAIN LOOP
// ============================================================================

void loop() {
  // Handle WebSocket events
  webSocket.loop();

  // Update LED animations
  if (config.active) {
    updateLEDAnimation();
  }

  // Check WiFi connection
  checkWiFiConnection();

  // Small delay for stability
  delay(1);
}

// ============================================================================
// LED INITIALIZATION
// ============================================================================

void initializeLEDs() {
  Serial.println("Initializing LEDs...");

  FastLED.addLeds<LED_TYPE, LED_PIN, COLOR_ORDER>(leds, NUM_LEDS)
    .setCorrection(TypicalLEDStrip);

  FastLED.setBrightness(config.brightness * 255 / 100);
  FastLED.clear();
  FastLED.show();

  Serial.print("  LED Count: ");
  Serial.println(NUM_LEDS);
  Serial.print("  LED Pin: GPIO");
  Serial.println(LED_PIN);
  Serial.println("  ✓ LEDs initialized");
}

// ============================================================================
// WIFI CONNECTION
// ============================================================================

void connectWiFi() {
  Serial.print("Connecting to WiFi: ");
  Serial.println(WIFI_SSID);

  WiFi.mode(WIFI_STA);
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);

  int attempts = 0;
  while (WiFi.status() != WL_CONNECTED && attempts < 20) {
    delay(500);
    Serial.print(".");
    attempts++;

    // Show connecting animation
    fill_solid(leds, NUM_LEDS, CRGB::Blue);
    FastLED.setBrightness(50);
    FastLED.show();
    delay(500);
    FastLED.clear();
    FastLED.show();
  }

  if (WiFi.status() == WL_CONNECTED) {
    wifiConnected = true;
    Serial.println("\n  ✓ WiFi connected!");
    Serial.print("  IP Address: ");
    Serial.println(WiFi.localIP());
    Serial.print("  MAC Address: ");
    Serial.println(WiFi.macAddress());

    // Show success animation
    wifiSuccessAnimation();
  } else {
    wifiConnected = false;
    Serial.println("\n  ✗ WiFi connection failed");
    Serial.println("  Running in offline mode");

    // Show error animation
    wifiErrorAnimation();
  }
}

void checkWiFiConnection() {
  if (WiFi.status() != WL_CONNECTED && wifiConnected) {
    wifiConnected = false;
    wsConnected = false;
    Serial.println("WiFi disconnected! Attempting to reconnect...");
  }

  if (!wifiConnected && (millis() - lastReconnectAttempt > RECONNECT_INTERVAL)) {
    lastReconnectAttempt = millis();
    connectWiFi();

    if (wifiConnected) {
      connectWebSocket();
    }
  }
}

// ============================================================================
// WEBSOCKET CONNECTION
// ============================================================================

void connectWebSocket() {
  Serial.print("Connecting to WebSocket: ");
  Serial.print(WS_HOST);
  Serial.print(":");
  Serial.println(WS_PORT);

  if (USE_SSL) {
    webSocket.beginSSL(WS_HOST, WS_PORT, WS_PATH);
  } else {
    webSocket.begin(WS_HOST, WS_PORT, WS_PATH);
  }

  webSocket.onEvent(webSocketEvent);
  webSocket.setReconnectInterval(RECONNECT_INTERVAL);

  Serial.println("  WebSocket client started");
}

void webSocketEvent(WStype_t type, uint8_t* payload, size_t length) {
  switch(type) {
    case WStype_DISCONNECTED:
      wsConnected = false;
      Serial.println("[WS] Disconnected");
      break;

    case WStype_CONNECTED:
      wsConnected = true;
      Serial.println("[WS] Connected!");
      sendSyncRequest();
      break;

    case WStype_TEXT:
      Serial.printf("[WS] Received: %s\n", payload);
      handleMessage((char*)payload);
      break;

    case WStype_ERROR:
      Serial.println("[WS] Error occurred");
      break;
  }
}

// ============================================================================
// MESSAGE HANDLING
// ============================================================================

void sendSyncRequest() {
  StaticJsonDocument<512> doc;

  doc["type"] = "SYNC_REQUEST";
  doc["deviceId"] = WiFi.macAddress();
  doc["deviceName"] = DEVICE_NAME;
  doc["firmwareVersion"] = FIRMWARE_VERSION;
  doc["timestamp"] = millis();

  String json;
  serializeJson(doc, json);

  Serial.print("[WS] Sending: ");
  Serial.println(json);

  webSocket.sendTXT(json);
}

void handleMessage(char* payload) {
  StaticJsonDocument<2048> doc;
  DeserializationError error = deserializeJson(doc, payload);

  if (error) {
    Serial.print("[WS] JSON parse error: ");
    Serial.println(error.c_str());
    return;
  }

  const char* type = doc["type"];

  if (strcmp(type, "SYNC_RESPONSE") == 0) {
    handleSyncResponse(doc);
  } else if (strcmp(type, "CONFIG_UPDATE") == 0) {
    handleConfigUpdate(doc);
  } else {
    Serial.print("[WS] Unknown message type: ");
    Serial.println(type);
  }
}

void handleSyncResponse(JsonDocument& doc) {
  Serial.println("[SYNC] Received sync response");

  // Update active LEDs
  JsonArray activeLEDsArray = doc["activeLEDs"];
  numActiveLEDs = 0;
  for (int i = 0; i < activeLEDsArray.size() && i < NUM_LEDS; i++) {
    activeLEDs[numActiveLEDs++] = activeLEDsArray[i];
  }

  // Update configuration
  if (doc.containsKey("brightness")) {
    config.brightness = doc["brightness"];
    FastLED.setBrightness(config.brightness * 255 / 100);
  }

  if (doc.containsKey("accentColor")) {
    config.accentColor = String((const char*)doc["accentColor"]);
  }

  if (doc.containsKey("speed")) {
    config.speed = doc["speed"];
  }

  // Update LEDs
  updateLEDsFromConfig();

  Serial.print("[SYNC] Active LEDs: ");
  Serial.print(numActiveLEDs);
  Serial.print("/");
  Serial.println(NUM_LEDS);
}

void handleConfigUpdate(JsonDocument& doc) {
  Serial.println("[CONFIG] Received configuration update");

  if (doc.containsKey("brightness")) {
    config.brightness = doc["brightness"];
    FastLED.setBrightness(config.brightness * 255 / 100);
    Serial.print("  Brightness: ");
    Serial.println(config.brightness);
  }

  if (doc.containsKey("accentColor")) {
    config.accentColor = String((const char*)doc["accentColor"]);
    Serial.print("  Color: ");
    Serial.println(config.accentColor);
  }

  if (doc.containsKey("speed")) {
    config.speed = doc["speed"];
    Serial.print("  Speed: ");
    Serial.println(config.speed);
  }

  updateLEDsFromConfig();
}

// ============================================================================
// LED UPDATES
// ============================================================================

void updateLEDsFromConfig() {
  // Parse accent color
  CRGB color = hexToRGB(config.accentColor.c_str());

  // Clear all LEDs
  fill_solid(leds, NUM_LEDS, CRGB::Black);

  // Set active LEDs
  for (int i = 0; i < numActiveLEDs; i++) {
    int ledIndex = activeLEDs[i];
    if (ledIndex >= 0 && ledIndex < NUM_LEDS) {
      leds[ledIndex] = color;
    }
  }

  FastLED.show();
}

void updateLEDAnimation() {
  unsigned long currentTime = millis();

  if (currentTime - lastAnimationUpdate < ANIMATION_INTERVAL) {
    return;
  }

  lastAnimationUpdate = currentTime;

  // Breathing animation
  breathingPhase += 0.05 * config.speed;
  if (breathingPhase > TWO_PI) {
    breathingPhase -= TWO_PI;
  }

  float breathingValue = 0.6 + 0.4 * sin(breathingPhase);
  int brightness = config.brightness * breathingValue;

  FastLED.setBrightness(brightness * 255 / 100);
  FastLED.show();
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

CRGB hexToRGB(const char* hex) {
  // Handle both "#RRGGBB" and "RRGGBB" formats
  const char* colorStr = (hex[0] == '#') ? hex + 1 : hex;

  long number = strtol(colorStr, NULL, 16);

  return CRGB(
    (number >> 16) & 0xFF,  // R
    (number >> 8) & 0xFF,   // G
    number & 0xFF           // B
  );
}

// ============================================================================
// ANIMATIONS
// ============================================================================

void startupAnimation() {
  Serial.println("Playing startup animation...");

  // Rainbow wave
  for (int hue = 0; hue < 256; hue += 4) {
    fill_rainbow(leds, NUM_LEDS, hue, 7);
    FastLED.setBrightness(100);
    FastLED.show();
    delay(10);
  }

  // Fade out
  for (int brightness = 100; brightness >= 0; brightness -= 5) {
    FastLED.setBrightness(brightness);
    FastLED.show();
    delay(20);
  }

  FastLED.clear();
  FastLED.show();
}

void wifiSuccessAnimation() {
  // Green pulse
  fill_solid(leds, NUM_LEDS, CRGB::Green);

  for (int i = 0; i < 3; i++) {
    FastLED.setBrightness(150);
    FastLED.show();
    delay(200);
    FastLED.setBrightness(50);
    FastLED.show();
    delay(200);
  }

  FastLED.clear();
  FastLED.show();
}

void wifiErrorAnimation() {
  // Red pulse
  fill_solid(leds, NUM_LEDS, CRGB::Red);

  for (int i = 0; i < 3; i++) {
    FastLED.setBrightness(150);
    FastLED.show();
    delay(200);
    FastLED.setBrightness(50);
    FastLED.show();
    delay(200);
  }

  FastLED.clear();
  FastLED.show();
}
