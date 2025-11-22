# Testing Documentation

## Overview

This project uses a comprehensive testing strategy with both unit tests and end-to-end (e2e) tests to ensure code quality and functionality.

## Testing Stack

- **Unit Tests**: Jest + React Testing Library
- **E2E Tests**: Playwright
- **Coverage**: Jest coverage reporting

## Test Scripts

```bash
# Run all unit tests
npm test

# Run tests in watch mode (for development)
npm run test:watch

# Run tests with coverage report
npm run test:coverage

# Run e2e tests (headless)
npm run test:e2e

# Run e2e tests with UI mode (interactive)
npm run test:e2e:ui

# Run e2e tests in headed mode (visible browser)
npm run test:e2e:headed

# Run all tests (unit + e2e)
npm run test:all
```

## Project Structure

```
microseasons/
├── e2e/                                    # E2E tests
│   └── physical-calendar.spec.ts          # Physical calendar e2e tests
├── src/
│   └── components/
│       └── PhysicalCalendarSection/
│           ├── __tests__/                  # Unit tests
│           │   ├── PhysicalCalendarSection.test.tsx
│           │   └── PhysicalCalendarMockup.test.tsx
│           ├── PhysicalCalendarSection.tsx
│           └── PhysicalCalendarMockup.tsx
├── jest.config.js                          # Jest configuration
├── jest.setup.js                           # Jest setup (mocks, etc.)
└── playwright.config.ts                    # Playwright configuration
```

## Unit Tests

### PhysicalCalendarSection Tests

**Location**: `src/components/PhysicalCalendarSection/__tests__/PhysicalCalendarSection.test.tsx`

**Coverage**:
- ✅ Component rendering
- ✅ Material selector functionality (3 materials: walnut, maple, oak)
- ✅ All 5 mockup variants rendering
- ✅ Content sections (Tactile Interaction, Human Scale, etc.)
- ✅ Features grid (4 features)
- ✅ Technical specifications
- ✅ Dark mode support
- ✅ Accessibility (button roles, text content)

**Test Count**: 20+ tests

### PhysicalCalendarMockup Tests

**Location**: `src/components/PhysicalCalendarSection/__tests__/PhysicalCalendarMockup.test.tsx`

**Coverage**:
- ✅ Hero variant (calendar grid with 35 tiles)
- ✅ Detail variant (3×3 grid, highlighted tiles)
- ✅ Lifestyle variant (simplified wall-mounted view)
- ✅ Exploded variant (layer labels and descriptions)
- ✅ Hand variant (3×4 grid, dimension annotations, hand SVG)
- ✅ Material variations (walnut, maple, oak)
- ✅ Invalid variant handling
- ✅ Custom className support
- ✅ Default props

**Test Count**: 29+ tests

## E2E Tests

### Physical Calendar E2E Tests

**Location**: `e2e/physical-calendar.spec.ts`

**Test Suites**:

1. **Section Visibility and Content**
   - Section display
   - Header text
   - Description text
   - All mockup variants visibility

2. **Material Selector**
   - Display of all 3 material options
   - Default selection (walnut)
   - Material switching functionality
   - Hover effects

3. **Features Grid**
   - All 4 feature cards
   - Feature descriptions
   - Feature icons (SVGs)

4. **Technical Specifications**
   - Specification metrics (dimensions, depth, tiles)
   - Labels
   - Materials and features lists

5. **Animations and Interactions**
   - Scroll animations
   - Hover effects on feature cards

6. **Dark Mode Support**
   - Rendering in dark mode
   - Theme toggle

7. **Responsive Design**
   - Desktop (1920×1080)
   - Tablet (768×1024)
   - Mobile (375×667)
   - Material selector layout changes
   - Grid stacking behavior

8. **Accessibility**
   - Heading hierarchy
   - Clickable buttons with proper roles
   - Keyboard navigation

9. **Performance**
   - No layout shifts
   - No console errors
   - Stable positioning

**Test Count**: 30+ e2e tests

**Browser Coverage**:
- ✅ Chromium (Desktop)
- ✅ Firefox (Desktop)
- ✅ WebKit (Desktop Safari)
- ✅ Mobile Chrome (Pixel 5)
- ✅ Mobile Safari (iPhone 12)
- ✅ iPad Pro

## Running Tests in CI/CD

The test configuration is CI-ready:

```bash
# In CI environment
CI=true npm run test:all
```

CI-specific settings:
- Retries: 2 attempts for flaky tests
- Workers: 1 (sequential execution)
- No server reuse (fresh instance per run)

## Coverage Goals

We aim for:
- **Unit Tests**: >80% coverage
- **E2E Tests**: All critical user flows
- **Responsive**: All major breakpoints (mobile, tablet, desktop)
- **Cross-browser**: All modern browsers

## Writing New Tests

### Unit Test Template

```typescript
import { render, screen, fireEvent } from '@testing-library/react';
import { YourComponent } from '../YourComponent';

// Mock dependencies
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, className, style }: any) => (
      <div className={className} style={style}>{children}</div>
    ),
  },
}));

describe('YourComponent', () => {
  it('should render correctly', () => {
    render(<YourComponent />);
    expect(screen.getByText('Expected Text')).toBeInTheDocument();
  });

  it('should handle user interactions', () => {
    render(<YourComponent />);
    const button = screen.getByRole('button');
    fireEvent.click(button);
    // assertions...
  });
});
```

### E2E Test Template

```typescript
import { test, expect } from '@playwright/test';

test.describe('Feature Name', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('should perform expected behavior', async ({ page }) => {
    await expect(page.locator('text=Expected Text')).toBeVisible();
    // more assertions...
  });
});
```

## Mocking Strategy

### Framer Motion

We mock Framer Motion in unit tests to:
- Avoid animation timing issues
- Simplify component rendering
- Speed up test execution

```typescript
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, className, style }: any) => (
      <div className={className} style={style}>{children}</div>
    ),
  },
}));
```

### Zustand Store

Store mocks provide controlled test data:

```typescript
jest.mock('@/store/useCalendarStore', () => ({
  useCalendarStore: () => ({
    darkMode: false,
    // other store values...
  }),
}));
```

### Browser APIs

We mock browser APIs not available in Jest:
- `IntersectionObserver`
- `window.matchMedia`
- `window.scrollTo`

These are configured in `jest.setup.js`.

## Debugging Tests

### Unit Tests

```bash
# Run specific test file
npm test -- PhysicalCalendarSection.test.tsx

# Run tests matching pattern
npm test -- --testNamePattern="Material Selector"

# Run with verbose output
npm test -- --verbose

# Update snapshots (if using)
npm test -- -u
```

### E2E Tests

```bash
# Run specific test file
npm run test:e2e -- physical-calendar.spec.ts

# Run with UI mode (interactive debugging)
npm run test:e2e:ui

# Run in headed mode (see browser)
npm run test:e2e:headed

# Run specific test by name
npm run test:e2e -- -g "should display the Physical Calendar section"

# Generate test report
npx playwright show-report
```

## Best Practices

### Unit Tests
1. ✅ Test user behavior, not implementation details
2. ✅ Use semantic queries (`getByRole`, `getByText`)
3. ✅ Mock external dependencies
4. ✅ Keep tests isolated and independent
5. ✅ Use descriptive test names

### E2E Tests
1. ✅ Test critical user flows
2. ✅ Wait for elements properly (`waitForLoadState`, `waitForSelector`)
3. ✅ Test across multiple viewports
4. ✅ Verify accessibility
5. ✅ Check for console errors
6. ✅ Ensure no layout shifts

## Continuous Improvement

We continuously improve our test suite by:
- Adding tests for new features
- Increasing coverage for edge cases
- Refactoring flaky tests
- Optimizing test execution time
- Updating to latest testing library versions

## Resources

- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Playwright Documentation](https://playwright.dev/docs/intro)
- [Testing Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)

---

**Last Updated**: 2025-11-22
**Test Suite Version**: 1.0.0
**Total Tests**: 79+ (49 unit + 30+ e2e)
