# Microseasons Calendar Showcase

An exceptional, award-worthy showcase website for a customizable microseasons calendar that beautifully merges the Japanese 72 microseasons (七十二候) with the Western calendar system.

![Microseasons Calendar](/.github/preview.jpg)

## ✨ Features

### Interactive 3D Calendar
- **Real-time 3D rendering** using Three.js and React Three Fiber
- **Mouse-responsive interactions** with smooth orbital controls
- **Auto-rotation** with customizable speed
- **Premium materials** including wood, washi paper, metal, and ceramic finishes

### Sophisticated Customization
- **Material Selection**: Choose from four premium materials, each with unique textures and properties
- **Color Palettes**: Natural, Sakura, Sumi Ink, and Seasonal color schemes
- **Display Modes**:
  - Microseason-primary (emphasizes Japanese microseasons)
  - Western-primary (emphasizes dates)
  - Balanced (equal emphasis)
  - Minimal (clean, simplified)
- **Light/Dark Mode**: Elegant theme switching with smooth transitions

### 🌍 Personalized Microseasons
- **Location-Based Generation**: Select your location from German regions, major world cities, or enter a zip code
- **10 Unique Vibes**: Choose from poetic, vibrant, scientific, culinary, urban, wellness, adventurous, nostalgic, whimsical, or minimalist tones
- **Custom Microseason Calendars**: Generate 72 unique microseasons tailored to your location's climate, culture, and chosen vibe
- **Regional Climate Data**: Accurate temperature ranges, precipitation patterns, and seasonal characteristics
- **Cultural Integration**: Local festivals, natural features, flora, fauna, and culinary traditions
- **Preview System**: See a sample microseason before generating your full custom calendar
- **Includes**:
  - German regions (Bavaria, Berlin, Black Forest, Hamburg)
  - Major world cities (Tokyo, New York, London, Paris, Sydney, Barcelona, Reykjavik, Singapore)
  - Extensible system for adding more locations

### 🎯 LED Tracking System (Everyday Calendar-inspired)
- **Interactive LED Grid**: Click any day to mark it with a colorful LED indicator
- **6 LED Colors**: Green, Blue, Amber, Red, Purple, Pink - each for different categories
- **Quick Categories**: Pre-configured tracking for Exercise, Meditation, Creative Work, Learning, Social, and Important Events
- **Custom Notes**: Add notes to marked days for context
- **Streak Tracking**: Automatic calculation of current and longest streaks
- **Statistics Dashboard**: Total days marked, color breakdowns, and progress percentages
- **Data Persistence**: All LED data saved locally in browser
- **Import/Export**: Backup and restore your tracking data
- **Beautiful Visualizations**: Glowing LED effects with smooth animations

### 📸 Export & Graphics
- **Image Export**: Capture your calendar as high-quality PNG or JPG
  - Adjustable quality settings (10%-100%)
  - Instant download
  - Includes LED tracking data
- **Video Export**: Record animated 3D calendar videos
  - Configurable duration (3-30 seconds)
  - 30fps recording
  - WebM format with VP9 codec
  - Progress indicator during recording
- **Microseason Graphics**: Tasteful, auto-generated visuals for each microseason
  - 6 pattern styles: Waves, Circles, Leaves, Geometric, Abstract, Seasonal
  - Based on microseason themes and imagery
  - Custom color palettes from vibe selection
  - SVG-based for crisp, scalable graphics
- **Export Options**: Fine-tune format, quality, and duration

### 🔧 Laser Cut Manufacturing Files
- **Production-Ready Vector Files**: Generate SVG files for laser cutting your own physical calendar
- **Multiple Layers**: Separate layers for cutting (red), engraving (blue), and scoring (green)
- **Complete File Set**:
  - Main calendar frame with tile slots and mounting holes
  - Individual tile pieces (72 tiles for microseasons)
  - LED diffuser layer (acrylic)
  - Back panel with electronics mounting guides
  - Assembly guide with step-by-step instructions
- **Customizable Options**:
  - 3 sizes: 16", 20", or 24" diagonal
  - 3 wood materials: Walnut, Maple, or Oak
  - Adjustable material thickness (3-12mm)
  - Custom grid layout (default 12×6 for 72 tiles)
  - Optional mounting holes
- **Laser Settings Included**: Recommended power, speed, and settings for cutting and engraving
- **Technical Specifications**: Precise dimensions in millimeters, kerf compensation (0.2mm)
- **Manufacturing Notes**: Material recommendations, test cut guidelines, safety information
- **Preview System**: View all generated files with layer-by-layer breakdown before downloading
- **Batch Download**: Get all files at once or download individually

### Physical Calendar Mockups
- **Photorealistic 3D Renders**: CSS-based mockup renders of the physical calendar concept
- **5 Render Variants**:
  - Hero shot (wall-mounted view)
  - Detail view (close-up of tiles and materials)
  - Lifestyle context (in a minimal interior)
  - Exploded view (layered construction)
  - Hand interaction (human scale reference)
- **Material Visualization**: See how walnut, maple, or oak looks in the design
- **Vestaboard-Inspired**: Modular tile system with premium materials
- **Everyday Calendar DNA**: Tactile interaction with LED tracking

### Design Excellence
- **Swiss Modern meets Japanese Minimalism** aesthetic
- **Generous white space** and precise mathematical grid
- **Sophisticated animations** using Framer Motion
- **Smooth scroll effects** with parallax
- **Premium typography** with careful hierarchy
- **Fully responsive** design for all device sizes

### The 72 Microseasons
The calendar showcases all 72 traditional Japanese microseasons (kō), each lasting approximately five days and marking subtle environmental changes throughout the year. These ancient observations of nature are beautifully overlaid with the familiar Western calendar system.

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm, yarn, or pnpm

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd microseasons
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Building for Production

```bash
npm run build
npm run start
```

### Running Tests

```bash
# Run unit tests
npm test

# Run e2e tests
npm run test:e2e

# Run all tests
npm run test:all

# Run tests with coverage
npm run test:coverage
```

For detailed testing documentation, see [TESTING.md](./TESTING.md).

## 🏗️ Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **3D Rendering**: Three.js, React Three Fiber, Drei
- **Animation**: Framer Motion
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Utilities**: clsx, date-fns

## 📁 Project Structure

```
microseasons/
├── src/
│   ├── app/                 # Next.js app directory
│   │   ├── globals.css      # Global styles
│   │   ├── layout.tsx       # Root layout
│   │   ├── page.tsx         # Home page
│   │   └── loading.tsx      # Loading state
│   ├── components/          # React components
│   │   ├── Calendar3D/      # 3D calendar component
│   │   ├── CustomizationPanel/
│   │   ├── HeroSection/
│   │   ├── MicroseasonsSection/
│   │   └── Footer/
│   ├── data/
│   │   └── microseasons.ts  # All 72 microseasons data
│   ├── store/
│   │   └── useCalendarStore.ts  # Zustand state management
│   └── utils/
│       └── materials.ts     # Material properties and utilities
├── public/
│   └── fonts/              # Custom fonts directory
├── tailwind.config.ts      # Tailwind configuration
├── tsconfig.json           # TypeScript configuration
└── next.config.js          # Next.js configuration
```

## 🎨 Design Philosophy

### Visual Language
The design combines **Swiss modern precision** with **Japanese minimalist aesthetics**:

- Clean, mathematical grid system
- Generous negative space (ma - 間)
- Precise typography with careful hierarchy
- Subtle, sophisticated micro-interactions
- Premium materials and textures
- Harmonious color palettes inspired by Japanese aesthetics

### Color Palettes

**Natural**: Warm earth tones and natural materials
**Sakura**: Soft pink cherry blossom hues
**Sumi**: Traditional Japanese ink gradients
**Seasonal**: Dynamic colors that reflect each microseason

### Materials

Each material has been carefully crafted with realistic properties:
- **Wood**: Warm grain with subtle roughness
- **Washi Paper**: Soft, traditional Japanese paper texture
- **Metal**: Sleek, modern metallic finish
- **Ceramic**: Smooth, elegant glazed surface

## 🌸 The 72 Microseasons

The Japanese calendar traditionally divides the year into:
- **24 solar terms** (sekki - 節気)
- **72 microseasons** (kō - 候), each lasting ~5 days

Each microseason marks a subtle shift in nature:
- "East wind melts the ice" (February 4-8)
- "First cherry blossoms" (March 26-30)
- "Fireflies emerge" (June 11-15)
- "First frost" (October 23-27)

This calendar beautifully overlays these ancient observations with the Western calendar system, creating a unique hybrid that honors both traditions.

## 🔧 Customization

### Adding Custom Microseasons
Edit `src/data/microseasons.ts` to add location-specific microseasons:

```typescript
{
  id: 73,
  nameJa: "Your Japanese Name",
  nameEn: "Your English Translation",
  description: "Your description",
  startDate: { month: 1, day: 1 },
  endDate: { month: 1, day: 5 },
  solarTerm: "Solar Term",
  imagery: ["keyword1", "keyword2"],
  colors: ["#HEX1", "#HEX2", "#HEX3"]
}
```

### Modifying Materials
Edit `src/utils/materials.ts` to adjust material properties or add new materials.

### Customizing Colors
Update `tailwind.config.ts` to modify the color palette.

## 🎯 Performance

- **Optimized 3D rendering** with React Three Fiber
- **Lazy loading** for smooth page loads
- **Responsive images** and assets
- **Efficient animations** with GPU acceleration
- **Code splitting** for optimal bundle size

## 📱 Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

Note: WebGL support required for 3D features.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- Japanese 72 microseasons traditional calendar system
- Inspired by award-winning design studios: Studio Dumbar, Instrument, XXIX
- Three.js and React Three Fiber communities
- Next.js and Vercel teams

## 📞 Contact

For questions or feedback, please open an issue on GitHub.

---

**Crafted with attention to detail and respect for both Japanese and Western calendar traditions.**
