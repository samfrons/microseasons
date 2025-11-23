# Development Guide - Microseasons Calendar

This guide will help you reliably run, iterate on, and maintain the Microseasons Calendar website following best practices.

## 📋 Table of Contents

1. [Quick Start](#quick-start)
2. [Development Workflow](#development-workflow)
3. [Best Practices](#best-practices)
4. [Testing Strategy](#testing-strategy)
5. [Code Quality](#code-quality)
6. [Common Tasks](#common-tasks)
7. [Troubleshooting](#troubleshooting)
8. [Performance Optimization](#performance-optimization)

---

## 🚀 Quick Start

### First Time Setup

```bash
# 1. Clone and enter the project
git clone <repository-url>
cd microseasons

# 2. Install dependencies
npm install

# 3. Verify installation
npm run lint          # Check code quality
npm test             # Run unit tests
npm run test:e2e     # Run e2e tests (optional)

# 4. Start development server
npm run dev
```

### Daily Development

```bash
# Start the dev server (runs on http://localhost:3000)
npm run dev

# Run tests in watch mode (in a separate terminal)
npm run test:watch

# Check linting while coding
npm run lint
```

---

## 🔄 Development Workflow

### 1. **Branch Management**

```bash
# Always work on feature branches
git checkout -b feature/your-feature-name

# Keep your branch up to date
git fetch origin
git merge origin/main

# Push your changes
git push -u origin feature/your-feature-name
```

### 2. **Making Changes - The Recommended Flow**

```bash
# STEP 1: Start dev server
npm run dev
# Opens at http://localhost:3000

# STEP 2: In another terminal, run tests in watch mode
npm run test:watch
# Tests will re-run automatically as you code

# STEP 3: Make your changes
# - Edit files in src/
# - Browser auto-refreshes with hot reload
# - Tests re-run automatically

# STEP 4: Check code quality before committing
npm run lint              # Check for linting errors
npm run lint -- --fix     # Auto-fix linting issues
npm test                  # Run all unit tests
npm run test:coverage     # Verify coverage

# STEP 5: Commit your changes
git add .
git commit -m "feat: descriptive commit message"
```

### 3. **Pre-Commit Checklist**

Before every commit, ensure:

- ✅ `npm run lint` passes
- ✅ `npm test` passes (all unit tests green)
- ✅ `npm run dev` loads without errors
- ✅ Browser console has no errors
- ✅ Changes are tested in both light and dark mode
- ✅ Mobile responsive behavior is verified

### 4. **Production Build Testing**

Before creating a PR or deploying:

```bash
# Build for production
npm run build

# Test the production build locally
npm run start
# Verify at http://localhost:3000

# Run full test suite
npm run test:all
```

---

## 🎯 Best Practices

### Component Development

#### ✅ DO:

```typescript
// 1. Always use TypeScript with proper types
interface MyComponentProps {
  title: string;
  count: number;
  onUpdate?: (value: number) => void;
}

export const MyComponent = ({ title, count, onUpdate }: MyComponentProps) => {
  // component logic
};

// 2. Use proper hooks at the top level
const { darkMode } = useCalendarStore();
const [isActive, setIsActive] = useState(false);

// 3. Follow the existing component structure
// - Props interface at top
// - Component definition
// - Event handlers
// - Render logic

// 4. Use semantic HTML
<button onClick={handleClick}>Click me</button>
// NOT: <div onClick={handleClick}>Click me</div>

// 5. Use clsx for conditional classes
<div className={clsx(
  'base-class',
  darkMode ? 'dark-class' : 'light-class',
  isActive && 'active-class'
)} />
```

#### ❌ DON'T:

```typescript
// 1. Don't use 'any' type
const data: any = getData(); // ❌ BAD

// 2. Don't forget error boundaries for client components
'use client'; // ✅ Add this when using hooks

// 3. Don't create unnecessary re-renders
// ❌ BAD:
{items.map((item) => <Item key={Math.random()} item={item} />)}
// ✅ GOOD:
{items.map((item) => <Item key={item.id} item={item} />)}

// 4. Don't mutate state directly
setState(state.push(item)); // ❌ BAD
setState([...state, item]); // ✅ GOOD
```

### File Organization

```
src/components/YourComponent/
├── index.ts                    # Export file
├── YourComponent.tsx          # Main component
├── YourSubComponent.tsx       # Sub-components
├── types.ts                   # TypeScript types (if complex)
├── utils.ts                   # Component-specific utilities
└── __tests__/
    ├── YourComponent.test.tsx
    └── YourSubComponent.test.tsx
```

### Styling Guidelines

```typescript
// 1. Use Tailwind utility classes
<div className="px-6 py-4 rounded-lg bg-white dark:bg-sumi-800" />

// 2. Use custom Tailwind colors from config
// Available: sumi, washi, sakura, amber
<div className="text-sumi-900 dark:text-washi-100" />

// 3. For complex styles, use clsx
<div className={clsx(
  'rounded-lg transition-all duration-300',
  darkMode ? 'bg-sumi-800 text-washi-100' : 'bg-white text-sumi-900',
  isActive && 'shadow-lg'
)} />

// 4. For animations, prefer Framer Motion
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
  viewport={{ once: true }}
>
  Content
</motion.div>
```

### State Management

```typescript
// 1. For global state, use Zustand store (src/store/useCalendarStore.ts)
const { darkMode, toggleDarkMode } = useCalendarStore();

// 2. For local state, use useState
const [isOpen, setIsOpen] = useState(false);

// 3. For derived state, use useMemo
const formattedDate = useMemo(
  () => formatDate(currentDate),
  [currentDate]
);

// 4. For side effects, use useEffect
useEffect(() => {
  document.title = `Microseasons - ${currentSeason}`;
}, [currentSeason]);
```

---

## 🧪 Testing Strategy

### When to Write Tests

**ALWAYS write tests for:**
- ✅ New components (at least basic rendering)
- ✅ User interactions (clicks, form inputs)
- ✅ Conditional rendering logic
- ✅ State changes
- ✅ Integration with global store

**Example Test Structure:**

```typescript
import { render, screen, fireEvent } from '@testing-library/react';
import { MyComponent } from '../MyComponent';

// Mock dependencies
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
}));

describe('MyComponent', () => {
  it('renders correctly', () => {
    render(<MyComponent title="Test" />);
    expect(screen.getByText('Test')).toBeInTheDocument();
  });

  it('handles user interaction', () => {
    const onUpdate = jest.fn();
    render(<MyComponent title="Test" onUpdate={onUpdate} />);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(onUpdate).toHaveBeenCalledTimes(1);
  });

  it('supports dark mode', () => {
    jest.mock('@/store/useCalendarStore', () => ({
      useCalendarStore: () => ({ darkMode: true }),
    }));

    render(<MyComponent title="Test" />);
    // Verify dark mode styling
  });
});
```

### Running Tests

```bash
# During development
npm run test:watch          # Auto-runs on file changes

# Before committing
npm test                    # All unit tests
npm run test:coverage       # With coverage report

# Before PR/deployment
npm run test:all            # Unit + E2E tests
```

### Testing the Architectural Renders

For your new architectural renders section, add tests:

```bash
# Create test file
touch src/components/ArchitecturalRenders/__tests__/ArchitecturalRenders.test.tsx
```

**Recommended test cases:**
- ✅ VenueRender displays all 4 venues
- ✅ Venue selector changes the displayed venue
- ✅ SizeComparisonRender shows all 4 sizes
- ✅ LanguageVariationsRender switches languages
- ✅ Dark mode support
- ✅ Responsive behavior

---

## 🔍 Code Quality

### Linting

```bash
# Check for issues
npm run lint

# Auto-fix issues
npm run lint -- --fix

# Check specific file
npm run lint -- src/components/MyComponent.tsx
```

### Type Checking

```bash
# TypeScript already checks during dev server and build
# To manually check types:
npx tsc --noEmit
```

### Code Review Checklist

Before submitting a PR:

- ✅ Code follows existing patterns
- ✅ No console.log statements left in code
- ✅ No commented-out code blocks
- ✅ Proper TypeScript types (no 'any')
- ✅ Accessibility attributes (aria-labels, roles)
- ✅ Mobile responsive
- ✅ Dark mode support
- ✅ Tests written and passing
- ✅ No linting errors
- ✅ Build succeeds

---

## 📝 Common Tasks

### Adding a New Component

```bash
# 1. Create component directory
mkdir -p src/components/NewComponent

# 2. Create files
touch src/components/NewComponent/NewComponent.tsx
touch src/components/NewComponent/index.ts
touch src/components/NewComponent/__tests__/NewComponent.test.tsx

# 3. Implement component following the pattern:
```

```typescript
// NewComponent.tsx
'use client';

import { motion } from 'framer-motion';
import { useCalendarStore } from '@/store/useCalendarStore';
import clsx from 'clsx';

interface NewComponentProps {
  title: string;
  // ... other props
}

export const NewComponent = ({ title }: NewComponentProps) => {
  const { darkMode } = useCalendarStore();

  return (
    <section
      className={clsx(
        'py-16 px-6',
        darkMode ? 'bg-sumi-900' : 'bg-washi-50'
      )}
    >
      <h2 className={clsx(
        'text-3xl font-light',
        darkMode ? 'text-washi-100' : 'text-sumi-900'
      )}>
        {title}
      </h2>
    </section>
  );
};
```

```typescript
// index.ts
export { NewComponent } from './NewComponent';
```

### Adding Tests for New Component

```typescript
// __tests__/NewComponent.test.tsx
import { render, screen } from '@testing-library/react';
import { NewComponent } from '../NewComponent';

jest.mock('framer-motion', () => ({
  motion: {
    section: ({ children, ...props }: any) => <section {...props}>{children}</section>,
  },
}));

jest.mock('@/store/useCalendarStore', () => ({
  useCalendarStore: () => ({ darkMode: false }),
}));

describe('NewComponent', () => {
  it('renders with title', () => {
    render(<NewComponent title="Test Title" />);
    expect(screen.getByText('Test Title')).toBeInTheDocument();
  });
});
```

### Modifying Existing Components

```bash
# 1. Find the component
ls src/components/ComponentName/

# 2. Read existing tests to understand behavior
cat src/components/ComponentName/__tests__/*.test.tsx

# 3. Make changes
# Edit ComponentName.tsx

# 4. Update tests if behavior changed
# Edit __tests__/ComponentName.test.tsx

# 5. Run tests to verify
npm test -- ComponentName.test.tsx

# 6. Check in browser
npm run dev
```

### Adding E2E Tests

```bash
# 1. Create test file
touch e2e/new-feature.spec.ts

# 2. Write tests following pattern:
```

```typescript
import { test, expect } from '@playwright/test';

test.describe('New Feature', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('should display feature', async ({ page }) => {
    await expect(page.locator('text=Feature Name')).toBeVisible();
  });

  test('should interact correctly', async ({ page }) => {
    await page.click('button:has-text("Click Me")');
    await expect(page.locator('text=Result')).toBeVisible();
  });
});
```

```bash
# 3. Run the test
npm run test:e2e -- new-feature.spec.ts

# 4. Debug with UI mode
npm run test:e2e:ui
```

---

## 🐛 Troubleshooting

### Dev Server Won't Start

```bash
# 1. Clear Next.js cache
rm -rf .next

# 2. Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# 3. Check for port conflicts
lsof -i :3000  # macOS/Linux
# Kill process if needed

# 4. Try different port
PORT=3001 npm run dev
```

### Build Failures

```bash
# 1. Check TypeScript errors
npx tsc --noEmit

# 2. Check for missing dependencies
npm install

# 3. Clear cache and rebuild
rm -rf .next
npm run build

# 4. Check for circular dependencies
npm ls
```

### Tests Failing

```bash
# 1. Clear Jest cache
npm test -- --clearCache

# 2. Run tests individually
npm test -- --testNamePattern="specific test name"

# 3. Check for missing mocks
# Verify jest.setup.js has all necessary mocks

# 4. Update snapshots if UI changed
npm test -- -u
```

### Hot Reload Not Working

```bash
# 1. Restart dev server
# Ctrl+C then npm run dev

# 2. Clear browser cache
# Hard refresh: Cmd+Shift+R (Mac) or Ctrl+Shift+R (Windows)

# 3. Check file watcher limits (Linux)
echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf
sudo sysctl -p
```

---

## ⚡ Performance Optimization

### Component Performance

```typescript
// 1. Use React.memo for expensive components
export const ExpensiveComponent = React.memo(({ data }: Props) => {
  // render logic
});

// 2. Use useMemo for expensive calculations
const processedData = useMemo(
  () => expensiveOperation(rawData),
  [rawData]
);

// 3. Use useCallback for event handlers passed to children
const handleClick = useCallback(() => {
  // handler logic
}, [dependencies]);

// 4. Lazy load heavy components
const Heavy3DComponent = dynamic(
  () => import('./Heavy3DComponent'),
  { ssr: false }
);
```

### Build Optimization

```bash
# Analyze bundle size
npm run build
# Check .next/analyze/

# Tips:
# - Lazy load 3D components (they're heavy!)
# - Use next/image for images
# - Minimize dependencies
# - Tree-shake unused code
```

### Image Optimization

```typescript
// Use Next.js Image component
import Image from 'next/image';

<Image
  src="/images/photo.jpg"
  alt="Description"
  width={800}
  height={600}
  loading="lazy"
  placeholder="blur"
/>
```

---

## 🎨 Development Tips

### Hot Tips for Faster Development

1. **Two Terminal Setup**
   ```bash
   # Terminal 1: Dev server
   npm run dev

   # Terminal 2: Tests in watch mode
   npm run test:watch
   ```

2. **Browser DevTools**
   - Install React DevTools extension
   - Use Components tab to inspect props/state
   - Use Performance tab to check render performance
   - Console → Check for warnings

3. **VS Code Extensions** (Recommended)
   - ESLint
   - Prettier
   - Tailwind CSS IntelliSense
   - TypeScript Error Translator
   - Error Lens

4. **Fast Iteration**
   ```typescript
   // Use Leva for quick 3D parameter tweaking
   import { useControls } from 'leva';

   const { speed, scale } = useControls({
     speed: { value: 1, min: 0, max: 10 },
     scale: { value: 1, min: 0.5, max: 2 },
   });
   ```

### Debugging Techniques

```typescript
// 1. Console debugging (remove before commit!)
console.log('Debug:', { prop1, prop2 });

// 2. React DevTools breakpoints
debugger; // Pauses execution

// 3. Network tab
// - Check API calls
// - Check asset loading
// - Check performance

// 4. Performance profiling
// React DevTools → Profiler tab
// Record interactions, analyze render times
```

---

## 📚 Additional Resources

### Documentation
- [Next.js Docs](https://nextjs.org/docs)
- [React Docs](https://react.dev)
- [TypeScript Docs](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Framer Motion Docs](https://www.framer.com/motion/)
- [React Three Fiber Docs](https://docs.pmnd.rs/react-three-fiber)

### Project-Specific Docs
- [README.md](./README.md) - Project overview
- [TESTING.md](./TESTING.md) - Testing documentation
- [tailwind.config.ts](./tailwind.config.ts) - Custom colors and theme

---

## 🎯 Quick Reference

### Common Commands

```bash
# Development
npm run dev              # Start dev server
npm run build           # Production build
npm run start           # Start production server

# Testing
npm test                # Run unit tests
npm run test:watch      # Watch mode
npm run test:coverage   # With coverage
npm run test:e2e        # E2E tests
npm run test:e2e:ui     # E2E with UI
npm run test:all        # All tests

# Code Quality
npm run lint            # Check linting
npm run lint -- --fix   # Fix linting issues

# Git
git status              # Check changes
git add .               # Stage all
git commit -m "msg"     # Commit
git push                # Push to remote
```

### File Locations

```
src/
├── app/                    # Next.js app router
│   ├── page.tsx           # Home page
│   └── layout.tsx         # Root layout
├── components/            # All components
│   ├── HeroSection/
│   ├── PhysicalCalendarSection/
│   ├── ArchitecturalRenders/  # ← Your new section
│   └── ...
├── data/
│   └── microseasons.ts    # All 72 microseasons
├── store/
│   └── useCalendarStore.ts  # Zustand store
└── utils/
    └── materials.ts       # Material utilities
```

---

**Last Updated**: 2025-11-22
**Maintained by**: Development Team
**Questions?**: Check [README.md](./README.md) or create an issue
