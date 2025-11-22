# Project Status & Quick Reference

**Last Updated**: 2025-11-22
**Branch**: `claude/microseasons-product-renders-01UHDAFcizmiLu62z8Qj41Zg`
**Status**: ✅ Ready for Development

---

## 📊 Current State

### Recent Additions (This Session)

1. **Architectural Product Renders** ✅
   - Location: `src/components/ArchitecturalRenders/`
   - Features:
     - 4 venue concepts (Office, Home, Café, Gallery)
     - 4 size specifications with technical drawings
     - 4 language variations (Japanese, English, French, German)
   - Integrated into main page

2. **Development Documentation** ✅
   - `DEVELOPMENT.md` - Complete development guide
   - `scripts/health-check.sh` - Project health verification
   - `.github/PULL_REQUEST_TEMPLATE.md` - PR checklist
   - New npm scripts: `health-check`, `type-check`

### Project Statistics

```
Components:     13 TSX files
Unit Tests:     2 test files (49+ tests for PhysicalCalendarSection)
E2E Tests:      1 spec file (30+ tests)
Total Lines:    ~15,000+ lines of code
```

---

## 🚀 Quick Start (New Developer)

```bash
# 1. Install dependencies
npm install

# 2. Run health check
npm run health-check

# 3. Start development
npm run dev

# 4. In another terminal, run tests
npm run test:watch
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📝 Essential Commands

### Development
```bash
npm run dev              # Start dev server (localhost:3000)
npm run build           # Build for production
npm run start           # Run production build locally
```

### Testing
```bash
npm test                # Run all unit tests
npm run test:watch      # Run tests in watch mode (recommended)
npm run test:coverage   # Run with coverage report
npm run test:e2e        # Run e2e tests (Playwright)
npm run test:e2e:ui     # Run e2e with interactive UI
npm run test:all        # Run ALL tests (unit + e2e)
```

### Code Quality
```bash
npm run lint            # Check for linting errors
npm run lint -- --fix   # Auto-fix linting issues
npm run type-check      # Check TypeScript types
npm run health-check    # Run complete project health check
```

---

## 🏗️ Project Structure

```
microseasons/
├── src/
│   ├── app/
│   │   ├── page.tsx              # Main page (all sections)
│   │   ├── layout.tsx            # Root layout
│   │   └── globals.css           # Global styles
│   │
│   ├── components/
│   │   ├── HeroSection/          # Landing hero
│   │   ├── MicroseasonsSection/  # 72 microseasons showcase
│   │   ├── Calendar3D/           # 3D calendar viewer
│   │   ├── CustomizationPanel/   # Material/color controls
│   │   ├── PhysicalCalendarSection/  # 3D mockups
│   │   ├── ArchitecturalRenders/ # NEW: Product renders
│   │   └── Footer/
│   │
│   ├── data/
│   │   └── microseasons.ts       # All 72 microseasons data
│   │
│   ├── store/
│   │   └── useCalendarStore.ts   # Global state (Zustand)
│   │
│   └── utils/
│       └── materials.ts          # Material properties
│
├── e2e/
│   └── physical-calendar.spec.ts # E2E tests
│
├── scripts/
│   └── health-check.sh           # Health check utility
│
├── DEVELOPMENT.md                # ← READ THIS FIRST
├── README.md                     # Project overview
└── TESTING.md                    # Testing documentation
```

---

## 🎯 Recommended Workflow

### Daily Development

```bash
# Terminal 1: Dev server
npm run dev

# Terminal 2: Tests in watch mode
npm run test:watch

# Make changes → browser auto-refreshes → tests auto-run
```

### Before Committing

```bash
# 1. Run health check
npm run health-check

# 2. Check linting
npm run lint

# 3. Run all tests
npm test

# 4. If all pass, commit
git add .
git commit -m "feat: your descriptive message"
git push
```

### Before Creating PR

```bash
# Full verification
npm run lint
npm run type-check
npm test
npm run test:e2e
npm run build

# If all pass, create PR
```

---

## 🧪 Testing Philosophy

### What We Test

✅ **Always Test:**
- Component rendering
- User interactions (clicks, inputs)
- State changes
- Dark mode support
- Accessibility

✅ **Unit Tests** (Jest + React Testing Library)
- Fast, isolated tests
- Mock external dependencies
- Located in `__tests__/` folders

✅ **E2E Tests** (Playwright)
- Real browser testing
- Critical user flows
- Cross-browser validation
- Located in `e2e/` folder

### Current Test Coverage

```
PhysicalCalendarSection:
  ✓ 20+ unit tests
  ✓ Material selector (3 materials)
  ✓ 5 mockup variants
  ✓ Features grid
  ✓ Dark mode
  ✓ Accessibility

E2E Coverage:
  ✓ 30+ e2e tests
  ✓ 6 browsers (Chrome, Firefox, Safari, Mobile)
  ✓ 3 viewports (Desktop, Tablet, Mobile)
  ✓ Animations & interactions
```

---

## 🎨 Code Style Guidelines

### TypeScript

```typescript
// ✅ DO: Always define types
interface ComponentProps {
  title: string;
  count: number;
}

// ❌ DON'T: Use 'any'
const data: any = getData();
```

### Components

```typescript
// ✅ DO: Follow this structure
'use client';

import { motion } from 'framer-motion';
import { useCalendarStore } from '@/store/useCalendarStore';
import clsx from 'clsx';

interface Props {
  // types here
}

export const MyComponent = ({ prop }: Props) => {
  const { darkMode } = useCalendarStore();

  return (
    <section className={clsx(
      'py-16',
      darkMode ? 'bg-sumi-900' : 'bg-washi-50'
    )}>
      {/* content */}
    </section>
  );
};
```

### Styling

```typescript
// ✅ DO: Use Tailwind utilities
<div className="px-6 py-4 rounded-lg" />

// ✅ DO: Use custom colors from config
<div className="text-sumi-900 dark:text-washi-100" />

// ✅ DO: Use clsx for conditionals
<div className={clsx(
  'base-class',
  condition && 'conditional-class'
)} />
```

---

## 🐛 Common Issues & Solutions

### 1. Dev Server Won't Start

```bash
rm -rf .next node_modules package-lock.json
npm install
npm run dev
```

### 2. Tests Failing

```bash
npm test -- --clearCache
npm test
```

### 3. TypeScript Errors

```bash
npx tsc --noEmit
# Fix reported errors
```

### 4. Hot Reload Not Working

```bash
# Restart dev server
# Hard refresh browser: Cmd+Shift+R (Mac) or Ctrl+Shift+R (Win)
```

---

## 📚 Key Documentation

| Document | Purpose |
|----------|---------|
| [DEVELOPMENT.md](./DEVELOPMENT.md) | **Complete development guide** |
| [README.md](./README.md) | Project overview & features |
| [TESTING.md](./TESTING.md) | Testing documentation |
| [tailwind.config.ts](./tailwind.config.ts) | Custom colors & theme |

---

## ✅ Best Practices Checklist

### Component Development
- [ ] Use TypeScript with proper types
- [ ] Add 'use client' for client components
- [ ] Support dark mode (use `darkMode` from store)
- [ ] Write unit tests
- [ ] Use semantic HTML
- [ ] Add accessibility attributes
- [ ] Test on mobile

### Code Quality
- [ ] No `console.log` statements
- [ ] No `any` types
- [ ] No commented-out code
- [ ] Linting passes
- [ ] TypeScript compiles
- [ ] Tests pass

### Performance
- [ ] Use React.memo for expensive components
- [ ] Use useMemo for expensive calculations
- [ ] Lazy load heavy components
- [ ] Optimize images (use next/image)

---

## 🔧 Tools & Extensions

### Recommended VS Code Extensions
- ESLint
- Prettier
- Tailwind CSS IntelliSense
- TypeScript Error Translator
- Error Lens
- GitLens

### Browser Extensions
- React Developer Tools
- Redux DevTools (for Zustand)

---

## 📊 Next Steps (Recommended)

### Add Tests for New Components

The architectural renders section needs tests:

```bash
# Create test file
mkdir -p src/components/ArchitecturalRenders/__tests__
touch src/components/ArchitecturalRenders/__tests__/ArchitecturalRenders.test.tsx

# Test these features:
# ✓ VenueRender displays all 4 venues
# ✓ Venue selector changes venue
# ✓ SizeComparisonRender shows all sizes
# ✓ LanguageVariationsRender switches languages
# ✓ Dark mode support
```

### Add E2E Tests

```bash
# Create e2e test
touch e2e/architectural-renders.spec.ts

# Test these flows:
# ✓ Section visibility
# ✓ Venue interaction
# ✓ Language switching
# ✓ Responsive behavior
```

### Performance Optimization

```bash
# Analyze bundle size
npm run build
# Check output for large chunks

# Consider:
# - Lazy loading ArchitecturalRenders section
# - Code splitting
# - Image optimization
```

---

## 🎯 Quick Health Check

Run this before any commit or PR:

```bash
npm run health-check
```

This checks:
- ✓ Node.js version
- ✓ Dependencies installed
- ✓ TypeScript errors
- ✓ Linting issues
- ✓ Common problems (console.log, debugger, .only)
- ✓ Git status
- ✓ Project statistics

---

## 📞 Getting Help

1. **Check Documentation**: Read DEVELOPMENT.md
2. **Run Health Check**: `npm run health-check`
3. **Check Tests**: `npm run test:all`
4. **Verify Build**: `npm run build`
5. **Create Issue**: If stuck, create a GitHub issue

---

## 🎉 Project Highlights

### What Makes This Project Great

✨ **Architecture**
- Next.js 14 with App Router
- TypeScript for type safety
- Zustand for state management
- Comprehensive testing (Jest + Playwright)

✨ **Design**
- Swiss modern meets Japanese minimalism
- Full dark mode support
- Sophisticated animations (Framer Motion)
- 3D rendering (Three.js)
- Fully responsive

✨ **Quality**
- 79+ tests (unit + e2e)
- ESLint + TypeScript strict mode
- Comprehensive documentation
- Health check automation
- PR templates

---

**Ready to start developing? Run:**

```bash
npm run dev
```

**Questions? Check [DEVELOPMENT.md](./DEVELOPMENT.md) for the complete guide!**
