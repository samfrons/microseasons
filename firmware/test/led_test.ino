/**
 * Microseasons Calendar - LED Test Firmware
 *
 * Simple test program to verify all 35 LEDs are working correctly
 * No WiFi or WebSocket required - just plug in and test!
 */

#include <FastLED.h>

// LED Configuration
#define LED_PIN 2
#define NUM_LEDS 35
#define LED_TYPE WS2812B
#define COLOR_ORDER GRB

CRGB leds[NUM_LEDS];

void setup() {
  Serial.begin(115200);
  Serial.println("\n========================================");
  Serial.println("Microseasons Calendar - LED Test");
  Serial.println("========================================\n");

  // Initialize LEDs
  FastLED.addLeds<LED_TYPE, LED_PIN, COLOR_ORDER>(leds, NUM_LEDS)
    .setCorrection(TypicalLEDStrip);

  FastLED.setBrightness(100);
  FastLED.clear();
  FastLED.show();

  Serial.println("LEDs initialized!");
  Serial.println("Starting tests...\n");

  delay(1000);
}

void loop() {
  // Test 1: Individual LED Test
  Serial.println("Test 1: Individual LED Test (Red)");
  individualLEDTest(CRGB::Red, 200);

  delay(1000);

  // Test 2: Color Test
  Serial.println("Test 2: Color Test (All LEDs)");
  colorTest();

  delay(1000);

  // Test 3: Brightness Test
  Serial.println("Test 3: Brightness Test");
  brightnessTest();

  delay(1000);

  // Test 4: Rainbow Test
  Serial.println("Test 4: Rainbow Pattern");
  rainbowTest();

  delay(2000);

  Serial.println("\n========================================");
  Serial.println("All tests complete! Restarting...");
  Serial.println("========================================\n");

  delay(2000);
}

// Test 1: Light up each LED individually
void individualLEDTest(CRGB color, int delayMs) {
  for (int i = 0; i < NUM_LEDS; i++) {
    FastLED.clear();
    leds[i] = color;
    FastLED.show();

    Serial.print("  LED ");
    Serial.print(i);
    Serial.print(" (Row ");
    Serial.print(i / 7);
    Serial.print(", Col ");
    Serial.print(i % 7);
    Serial.println(")");

    delay(delayMs);
  }

  FastLED.clear();
  FastLED.show();
}

// Test 2: Test different colors on all LEDs
void colorTest() {
  struct {
    CRGB color;
    const char* name;
  } colors[] = {
    {CRGB::Red, "Red"},
    {CRGB::Green, "Green"},
    {CRGB::Blue, "Blue"},
    {CRGB::White, "White"},
    {CRGB::Yellow, "Yellow"},
    {CRGB::Cyan, "Cyan"},
    {CRGB::Magenta, "Magenta"}
  };

  for (int i = 0; i < 7; i++) {
    Serial.print("  Color: ");
    Serial.println(colors[i].name);

    fill_solid(leds, NUM_LEDS, colors[i].color);
    FastLED.show();
    delay(1000);
  }

  FastLED.clear();
  FastLED.show();
}

// Test 3: Test brightness levels
void brightnessTest() {
  fill_solid(leds, NUM_LEDS, CRGB::White);

  Serial.println("  Fading up...");
  for (int brightness = 0; brightness <= 255; brightness += 5) {
    FastLED.setBrightness(brightness);
    FastLED.show();
    delay(20);
  }

  delay(500);

  Serial.println("  Fading down...");
  for (int brightness = 255; brightness >= 0; brightness -= 5) {
    FastLED.setBrightness(brightness);
    FastLED.show();
    delay(20);
  }

  FastLED.setBrightness(100); // Reset to default
  FastLED.clear();
  FastLED.show();
}

// Test 4: Rainbow pattern
void rainbowTest() {
  for (int cycle = 0; cycle < 3; cycle++) {
    for (int hue = 0; hue < 256; hue += 2) {
      fill_rainbow(leds, NUM_LEDS, hue, 7);
      FastLED.show();
      delay(10);
    }
  }

  FastLED.clear();
  FastLED.show();
}
