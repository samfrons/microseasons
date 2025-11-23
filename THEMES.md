# Microseasons Theme System

Award-winning, performant theme system with 6 distinct visual aesthetics.

## 🎨 Available Themes

### 1. **Japanese Minimalist** (Default)
- **Aesthetic**: Wabi-sabi, zen gardens, natural elegance
- **Colors**: Washi paper whites, sumi ink blacks, sakura pinks
- **Best For**: Serene, timeless experience aligned with microseasons philosophy

### 2. **Brutalist**
- **Aesthetic**: Raw concrete, industrial minimalism, harsh geometry
- **Colors**: Concrete grays, pure black/white, bold red accents
- **Best For**: Powerful, uncompromising visual statements

### 3. **Organic Nature**
- **Aesthetic**: Earthy, warm, natural textures
- **Colors**: Forest greens, warm browns, terracotta, moss
- **Best For**: Connection to natural world and seasonal changes

### 4. **Cyberpunk Neon**
- **Aesthetic**: Futuristic, high-tech, neon glow
- **Colors**: Electric cyan, hot magenta, deep blacks, neon green
- **Best For**: Bold, modern, electrifying experiences

### 5. **Art Deco Luxury**
- **Aesthetic**: 1920s glamour, geometric opulence
- **Colors**: Gold, black, champagne, jewel tones
- **Best For**: Sophisticated, luxurious presentation

### 6. **Glassmorphic Modern**
- **Aesthetic**: Frosted glass, translucent layers, ultra-modern
- **Colors**: Soft pastels, translucent overlays, purple/blue gradients
- **Best For**: Contemporary, sleek, Apple-inspired design

## 🏗️ Architecture

### Core Files

```
src/
├── types/
│   └── theme.ts              # TypeScript theme interfaces
├── themes/
│   ├── index.ts              # Theme registry
│   ├── brutalist.ts          # Brutalist theme definition
│   ├── organic.ts            # Organic Nature theme
│   ├── cyberpunk.ts          # Cyberpunk Neon theme
│   ├── japanese.ts           # Japanese Minimalist theme
│   ├── artdeco.ts            # Art Deco Luxury theme
│   └── glassmorphic.ts       # Glassmorphic Modern theme
├── hooks/
│   └── useTheme.ts           # Theme switching hook
├── store/
│   └── useCalendarStore.ts   # Zustand store (includes selectedTheme)
└── components/
    ├── ThemeSwitcher/        # Theme picker UI component
    └── ThemeProvider/        # Theme initialization wrapper
```

### Theme Interface

Each theme implements the `Theme` interface:

```typescript
interface Theme {
  id: ThemeId;
  name: string;
  description: string;
  colors: {
    light: ThemeColors;
    dark: ThemeColors;
  };
  typography: ThemeTypography;
  effects: ThemeEffects;
  materials: ThemeMaterials;
  customCSS?: string;
}
```

## 🚀 Performance Features

### 1. **CSS Custom Properties**
Themes use CSS variables for instant switching without re-renders:
```css
:root {
  --color-bgPrimary: #fafaf9;
  --color-textPrimary: #1c1917;
  /* ... */
}
```

### 2. **Local Storage Persistence**
User theme preference saved automatically:
```typescript
localStorage.setItem('microseasons-theme', themeId);
```

### 3. **Zero Layout Shift**
Theme switching doesn't trigger layout recalculation - only color changes.

### 4. **Optimized Renders**
- Uses Zustand for minimal re-renders
- Theme application via useEffect in hook
- CSS-only transitions (no JavaScript animations)

### 5. **Data Attribute Theming**
Each theme sets `data-theme` attribute for CSS scoping:
```html
<html data-theme="cyberpunk">
```

## 🎯 Usage

### Basic Theme Switching

```tsx
import { useTheme } from '@/hooks/useTheme';

function MyComponent() {
  const { currentTheme, switchTheme, colors } = useTheme();

  return (
    <button onClick={() => switchTheme('brutalist')}>
      Switch to Brutalist
    </button>
  );
}
```

### Using Theme Colors

```tsx
// Option 1: CSS Variables
<div style={{ backgroundColor: 'var(--color-bgPrimary)' }}>

// Option 2: Direct from hook
const { colors } = useTheme();
<div style={{ backgroundColor: colors.bgPrimary }}>
```

### Accessing Current Theme

```tsx
const { currentTheme, selectedTheme } = useTheme();

console.log(currentTheme.name);        // "Japanese Minimalist"
console.log(currentTheme.id);          // "japanese"
console.log(selectedTheme);            // "japanese"
```

### Custom CSS per Theme

Each theme can include custom CSS classes:

```tsx
// In theme definition
customCSS: `
  .brutalist-heading {
    text-transform: uppercase;
    font-weight: 900;
  }
`

// In component
<h1 className="brutalist-heading">Title</h1>
```

## 🎨 Creating New Themes

1. **Create theme file**: `src/themes/mytheme.ts`

```typescript
import { Theme } from '@/types/theme';

export const myTheme: Theme = {
  id: 'mytheme',
  name: 'My Theme',
  description: 'Theme description',
  colors: {
    light: { /* ... */ },
    dark: { /* ... */ }
  },
  typography: { /* ... */ },
  effects: { /* ... */ },
  materials: { /* ... */ },
  customCSS: `/* Optional custom styles */`
};
```

2. **Register in index**: Add to `src/themes/index.ts`

```typescript
import { myTheme } from './mytheme';

export const themeConfig: ThemeConfig = {
  themes: {
    // ...
    mytheme: myTheme,
  },
  defaultTheme: 'japanese',
};
```

3. **Update TypeScript**: Add to `ThemeId` type in `src/types/theme.ts`

```typescript
export type ThemeId =
  | 'brutalist'
  | 'organic'
  | 'cyberpunk'
  | 'japanese'
  | 'artdeco'
  | 'glassmorphic'
  | 'mytheme';  // Add here
```

## 🧪 Testing Themes

Each theme should be tested for:

1. **Color Contrast**: WCAG AA compliance (4.5:1 for text)
2. **Dark Mode**: Proper adaptation of all colors
3. **3D Materials**: Materials render correctly in Three.js
4. **Accessibility**: Focus states, selection colors visible
5. **Performance**: No layout shift on theme switch

## 📦 Theme Export Format

Themes can be exported for design tools:

```typescript
const themeExport = {
  colors: currentTheme.colors.light,
  typography: currentTheme.typography,
  effects: currentTheme.effects
};

console.log(JSON.stringify(themeExport, null, 2));
```

## 🎭 Best Practices

1. **Use semantic color names** - `bgPrimary` not `gray100`
2. **Provide both light and dark modes** for all themes
3. **Test with real content** - especially long text and edge cases
4. **Consider accessibility** - maintain contrast ratios
5. **Keep performance in mind** - avoid heavy animations in theme CSS
6. **Document custom CSS classes** - explain when to use them

## 🔧 Troubleshooting

### Theme not applying
- Check `data-theme` attribute on `<html>` element
- Verify CSS variables are set in browser DevTools
- Ensure ThemeProvider wraps your app

### Colors not updating
- Check if using CSS variables vs hardcoded values
- Verify Zustand store has correct theme selected
- Clear localStorage if testing: `localStorage.removeItem('microseasons-theme')`

### Custom CSS not loading
- Ensure `customCSS` is defined in theme
- Check theme is properly exported and registered
- Verify `data-theme` attribute matches theme ID

---

**Built with performance, accessibility, and award-winning design in mind.**
