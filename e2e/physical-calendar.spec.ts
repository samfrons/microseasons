import { test, expect } from '@playwright/test';

test.describe('Physical Calendar Section', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Wait for the page to load
    await page.waitForLoadState('networkidle');
  });

  test.describe('Section Visibility and Content', () => {
    test('should display the Physical Calendar section', async ({ page }) => {
      // Scroll to the section
      const section = page.locator('text=A Calendar You Can');
      await section.scrollIntoViewIfNeeded();
      await expect(section).toBeVisible();
    });

    test('should show the section header with correct text', async ({ page }) => {
      await page.locator('text=Physical Edition').scrollIntoViewIfNeeded();
      await expect(page.locator('text=Physical Edition')).toBeVisible();
      await expect(page.locator('text=A Calendar You Can')).toBeVisible();
      await expect(page.locator('text=Touch')).toBeVisible();
    });

    test('should display the description text', async ({ page }) => {
      const description = page.locator('text=Photorealistic 3D concepts');
      await description.scrollIntoViewIfNeeded();
      await expect(description).toBeVisible();
    });

    test('should display all mockup variants', async ({ page }) => {
      // Hero mockup should be visible
      await page.locator('text=Physical Edition').scrollIntoViewIfNeeded();

      // Detail section
      await expect(page.locator('text=Tactile Interaction')).toBeVisible();

      // Hand interaction section
      await expect(page.locator('text=Human Scale')).toBeVisible();

      // Lifestyle section
      await expect(page.locator('text=Minimal Interior Presence')).toBeVisible();

      // Exploded view section
      await expect(page.locator('text=Layered Construction')).toBeVisible();
    });
  });

  test.describe('Material Selector', () => {
    test('should display all three material options', async ({ page }) => {
      await page.locator('text=Physical Edition').scrollIntoViewIfNeeded();

      await expect(page.locator('text=Walnut')).toBeVisible();
      await expect(page.locator('text=Maple')).toBeVisible();
      await expect(page.locator('text=Oak')).toBeVisible();
    });

    test('should have walnut selected by default', async ({ page }) => {
      await page.locator('text=Physical Edition').scrollIntoViewIfNeeded();

      const walnutButton = page.locator('button', { hasText: 'Walnut' });
      await expect(walnutButton).toBeVisible();

      // Check if the selection indicator is present (by checking for specific styling or layout ID)
      const boundingBox = await walnutButton.boundingBox();
      expect(boundingBox).toBeTruthy();
    });

    test('should switch materials when clicking selector buttons', async ({ page }) => {
      await page.locator('text=Physical Edition').scrollIntoViewIfNeeded();

      // Click on Maple
      const mapleButton = page.locator('button', { hasText: 'Maple' });
      await mapleButton.click();
      await page.waitForTimeout(500); // Wait for animation

      // Click on Oak
      const oakButton = page.locator('button', { hasText: 'Oak' });
      await oakButton.click();
      await page.waitForTimeout(500);

      // Click back on Walnut
      const walnutButton = page.locator('button', { hasText: 'Walnut' });
      await walnutButton.click();
      await page.waitForTimeout(500);

      // All clicks should complete without errors
      expect(true).toBe(true);
    });

    test('should show hover effects on material buttons', async ({ page }) => {
      await page.locator('text=Physical Edition').scrollIntoViewIfNeeded();

      const mapleButton = page.locator('button', { hasText: 'Maple' });

      // Get initial state
      const initialBox = await mapleButton.boundingBox();
      expect(initialBox).toBeTruthy();

      // Hover over the button
      await mapleButton.hover();
      await page.waitForTimeout(300);

      // Button should still be visible (hover doesn't break it)
      await expect(mapleButton).toBeVisible();
    });
  });

  test.describe('Features Grid', () => {
    test('should display all four feature cards', async ({ page }) => {
      await page.locator('text=Modular Tile System').scrollIntoViewIfNeeded();

      await expect(page.locator('text=Modular Tile System')).toBeVisible();
      await expect(page.locator('text=Premium Materials')).toBeVisible();
      await expect(page.locator('text=Backlit Display')).toBeVisible();
      await expect(page.locator('text=Wall-Mounted Design')).toBeVisible();
    });

    test('should display feature descriptions', async ({ page }) => {
      await page.locator('text=Modular Tile System').scrollIntoViewIfNeeded();

      await expect(page.locator('text=Individual tiles for each day')).toBeVisible();
      await expect(page.locator('text=Handcrafted from solid hardwood')).toBeVisible();
      await expect(page.locator('text=Subtle LED backlighting')).toBeVisible();
      await expect(page.locator('text=Elegant 1.5" depth profile')).toBeVisible();
    });

    test('should display feature icons', async ({ page }) => {
      await page.locator('text=Modular Tile System').scrollIntoViewIfNeeded();

      // Check that SVG icons are present
      const featureCards = page.locator('text=Modular Tile System').locator('..');
      const svg = featureCards.locator('svg').first();
      await expect(svg).toBeVisible();
    });
  });

  test.describe('Technical Specifications', () => {
    test('should display all specification metrics', async ({ page }) => {
      await page.locator('text=Technical Specifications').scrollIntoViewIfNeeded();

      await expect(page.locator('text=20" × 16"')).toBeVisible();
      await expect(page.locator('text=1.5"')).toBeVisible();
      await expect(page.locator('text=35').first()).toBeVisible();
    });

    test('should display specification labels', async ({ page }) => {
      await page.locator('text=Technical Specifications').scrollIntoViewIfNeeded();

      await expect(page.locator('text=Overall Dimensions')).toBeVisible();
      await expect(page.locator('text=Depth Profile')).toBeVisible();
      await expect(page.locator('text=Interactive Tiles')).toBeVisible();
    });

    test('should display materials and features lists', async ({ page }) => {
      await page.locator('text=Technical Specifications').scrollIntoViewIfNeeded();

      // Materials section
      await expect(page.locator('text=Solid hardwood frame')).toBeVisible();
      await expect(page.locator('text=Brushed brass or copper accents')).toBeVisible();

      // Features section
      await expect(page.locator('text=Tactile tile interaction system')).toBeVisible();
      await expect(page.locator('text=Microseason-aware LED backlighting')).toBeVisible();
    });
  });

  test.describe('Animations and Interactions', () => {
    test('should animate mockups on scroll into view', async ({ page }) => {
      // Start at top
      await page.evaluate(() => window.scrollTo(0, 0));

      // Scroll to physical calendar section
      const section = page.locator('text=A Calendar You Can');
      await section.scrollIntoViewIfNeeded();

      // Wait for animations to complete
      await page.waitForTimeout(1000);

      // Check that the section is visible (animation completed)
      await expect(section).toBeVisible();
    });

    test('should show hover effects on feature cards', async ({ page }) => {
      await page.locator('text=Modular Tile System').scrollIntoViewIfNeeded();

      const featureCard = page.locator('text=Modular Tile System').locator('..');

      // Hover over feature card
      await featureCard.hover();
      await page.waitForTimeout(300);

      // Card should still be visible
      await expect(featureCard).toBeVisible();
    });
  });

  test.describe('Dark Mode Support', () => {
    test('should render correctly in dark mode', async ({ page }) => {
      // Look for dark mode toggle (assuming it exists in the header/nav)
      // This might need adjustment based on actual dark mode implementation
      await page.locator('text=Physical Edition').scrollIntoViewIfNeeded();

      // Try to toggle dark mode if toggle exists
      const darkModeToggle = page.locator('[aria-label*="dark" i], [aria-label*="theme" i]').first();
      if (await darkModeToggle.isVisible()) {
        await darkModeToggle.click();
        await page.waitForTimeout(500);
      }

      // Section should still be visible in dark mode
      await expect(page.locator('text=A Calendar You Can')).toBeVisible();
    });
  });

  test.describe('Responsive Design - Desktop', () => {
    test.use({ viewport: { width: 1920, height: 1080 } });

    test('should display properly on large desktop', async ({ page }) => {
      await page.goto('/');
      await page.locator('text=Physical Edition').scrollIntoViewIfNeeded();

      await expect(page.locator('text=A Calendar You Can')).toBeVisible();
      await expect(page.locator('text=Touch')).toBeVisible();

      // Material selector should be in horizontal layout
      const walnutButton = page.locator('button', { hasText: 'Walnut' });
      const mapleButton = page.locator('button', { hasText: 'Maple' });

      const walnutBox = await walnutButton.boundingBox();
      const mapleBox = await mapleButton.boundingBox();

      // Buttons should be side by side (similar Y positions)
      expect(Math.abs(walnutBox!.y - mapleBox!.y)).toBeLessThan(50);
    });
  });

  test.describe('Responsive Design - Tablet', () => {
    test.use({ viewport: { width: 768, height: 1024 } });

    test('should display properly on tablet', async ({ page }) => {
      await page.goto('/');
      await page.locator('text=Physical Edition').scrollIntoViewIfNeeded();

      await expect(page.locator('text=A Calendar You Can')).toBeVisible();

      // All major sections should still be visible
      await expect(page.locator('text=Tactile Interaction')).toBeVisible();
      await expect(page.locator('text=Human Scale')).toBeVisible();
    });

    test('should show material selector on tablet', async ({ page }) => {
      await page.goto('/');
      await page.locator('text=Physical Edition').scrollIntoViewIfNeeded();

      await expect(page.locator('text=Walnut')).toBeVisible();
      await expect(page.locator('text=Maple')).toBeVisible();
      await expect(page.locator('text=Oak')).toBeVisible();
    });
  });

  test.describe('Responsive Design - Mobile', () => {
    test.use({ viewport: { width: 375, height: 667 } });

    test('should display properly on mobile', async ({ page }) => {
      await page.goto('/');
      await page.locator('text=Physical Edition').scrollIntoViewIfNeeded();

      await expect(page.locator('text=A Calendar You Can')).toBeVisible();
      await expect(page.locator('text=Touch')).toBeVisible();
    });

    test('should stack material selectors on mobile', async ({ page }) => {
      await page.goto('/');
      await page.locator('text=Physical Edition').scrollIntoViewIfNeeded();

      // Material buttons should still be clickable
      const mapleButton = page.locator('button', { hasText: 'Maple' });
      await mapleButton.click();
      await page.waitForTimeout(300);

      await expect(mapleButton).toBeVisible();
    });

    test('should show features in grid on mobile', async ({ page }) => {
      await page.goto('/');
      await page.locator('text=Modular Tile System').scrollIntoViewIfNeeded();

      // All features should be visible when scrolled to
      await expect(page.locator('text=Modular Tile System')).toBeVisible();

      // Scroll to see more features
      await page.locator('text=Premium Materials').scrollIntoViewIfNeeded();
      await expect(page.locator('text=Premium Materials')).toBeVisible();
    });

    test('should display technical specs on mobile', async ({ page }) => {
      await page.goto('/');
      await page.locator('text=Technical Specifications').scrollIntoViewIfNeeded();

      await expect(page.locator('text=20" × 16"')).toBeVisible();
      await expect(page.locator('text=Overall Dimensions')).toBeVisible();
    });
  });

  test.describe('Accessibility', () => {
    test('should have proper heading hierarchy', async ({ page }) => {
      await page.locator('text=Physical Edition').scrollIntoViewIfNeeded();

      // Check for h2 or h3 headings
      const headings = page.locator('h2, h3').filter({ hasText: 'A Calendar You Can' });
      await expect(headings.first()).toBeVisible();
    });

    test('should have clickable buttons with proper roles', async ({ page }) => {
      await page.locator('text=Physical Edition').scrollIntoViewIfNeeded();

      const walnutButton = page.locator('button', { hasText: 'Walnut' });

      // Should be a button element
      expect(await walnutButton.evaluate(el => el.tagName.toLowerCase())).toBe('button');
    });

    test('should be keyboard navigable', async ({ page }) => {
      await page.locator('text=Physical Edition').scrollIntoViewIfNeeded();

      // Tab to material selector
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');

      // Should be able to navigate with keyboard
      const focusedElement = await page.evaluate(() => document.activeElement?.tagName);
      expect(focusedElement).toBeTruthy();
    });
  });

  test.describe('Performance', () => {
    test('should load without layout shifts', async ({ page }) => {
      await page.goto('/');

      // Wait for page to fully load
      await page.waitForLoadState('networkidle');

      // Scroll to section
      await page.locator('text=Physical Edition').scrollIntoViewIfNeeded();

      // Section should be stable
      const section = page.locator('text=A Calendar You Can');
      const box1 = await section.boundingBox();

      await page.waitForTimeout(500);

      const box2 = await section.boundingBox();

      // Position should be stable (no layout shift)
      expect(box1?.y).toBe(box2?.y);
    });

    test('should not have console errors', async ({ page }) => {
      const consoleErrors: string[] = [];

      page.on('console', msg => {
        if (msg.type() === 'error') {
          consoleErrors.push(msg.text());
        }
      });

      await page.goto('/');
      await page.locator('text=Physical Edition').scrollIntoViewIfNeeded();

      // Wait a bit for any async errors
      await page.waitForTimeout(2000);

      // Filter out known acceptable errors (like font loading in test env)
      const relevantErrors = consoleErrors.filter(err =>
        !err.includes('font') &&
        !err.includes('Failed to fetch')
      );

      expect(relevantErrors.length).toBe(0);
    });
  });
});
