import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { PhysicalCalendarSection } from '../PhysicalCalendarSection';

// Mock framer-motion to avoid animation issues in tests
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, className, style, onClick, ...props }: any) => {
      const validProps: any = { className, style };
      if (onClick) validProps.onClick = onClick;
      if (props['data-testid']) validProps['data-testid'] = props['data-testid'];
      return <div {...validProps}>{children}</div>;
    },
    button: ({ children, className, style, onClick, ...props }: any) => {
      const validProps: any = { className, style, onClick };
      if (props['data-testid']) validProps['data-testid'] = props['data-testid'];
      return <button {...validProps}>{children}</button>;
    },
  },
}));

// Mock the store
jest.mock('@/store/useCalendarStore', () => ({
  useCalendarStore: () => ({
    darkMode: false,
  }),
}));

// Mock the PhysicalCalendarMockup component
jest.mock('../PhysicalCalendarMockup', () => ({
  PhysicalCalendarMockup: ({ variant, material }: any) => (
    <div data-testid={`mockup-${variant}`} data-material={material}>
      Mockup: {variant} - {material}
    </div>
  ),
}));

describe('PhysicalCalendarSection', () => {
  describe('Rendering', () => {
    it('should render the section without crashing', () => {
      render(<PhysicalCalendarSection />);
      expect(screen.getByText(/A Calendar You Can/i)).toBeInTheDocument();
    });

    it('should display the Physical Edition badge', () => {
      render(<PhysicalCalendarSection />);
      expect(screen.getByText('Physical Edition')).toBeInTheDocument();
    });

    it('should display the main heading', () => {
      render(<PhysicalCalendarSection />);
      expect(screen.getByText(/A Calendar You Can/i)).toBeInTheDocument();
      expect(screen.getByText('Touch')).toBeInTheDocument();
    });

    it('should display the description text', () => {
      render(<PhysicalCalendarSection />);
      expect(screen.getByText(/Photorealistic 3D concepts/i)).toBeInTheDocument();
      expect(screen.getByText(/Vestaboard/i)).toBeInTheDocument();
      expect(screen.getByText(/Everyday Calendar/i)).toBeInTheDocument();
    });
  });

  describe('Material Selector', () => {
    it('should render all three material options', () => {
      render(<PhysicalCalendarSection />);

      expect(screen.getByText('Walnut')).toBeInTheDocument();
      expect(screen.getByText('Maple')).toBeInTheDocument();
      expect(screen.getByText('Oak')).toBeInTheDocument();
    });

    it('should show material descriptions', () => {
      render(<PhysicalCalendarSection />);

      expect(screen.getByText('Rich, dark tones')).toBeInTheDocument();
      expect(screen.getByText('Light, natural')).toBeInTheDocument();
      expect(screen.getByText('Warm, classic')).toBeInTheDocument();
    });

    it('should switch materials when clicking buttons', async () => {
      render(<PhysicalCalendarSection />);

      const walnutButton = screen.getByRole('button', { name: /Walnut/i });
      const mapleButton = screen.getByRole('button', { name: /Maple/i });
      const oakButton = screen.getByRole('button', { name: /Oak/i });

      // Initial state should be walnut
      const initialMockup = screen.getByTestId('mockup-hero');
      expect(initialMockup).toHaveAttribute('data-material', 'walnut');

      // Click maple
      fireEvent.click(mapleButton);
      await waitFor(() => {
        const mockup = screen.getByTestId('mockup-hero');
        expect(mockup).toHaveAttribute('data-material', 'maple');
      });

      // Click oak
      fireEvent.click(oakButton);
      await waitFor(() => {
        const mockup = screen.getByTestId('mockup-hero');
        expect(mockup).toHaveAttribute('data-material', 'oak');
      });

      // Click walnut again
      fireEvent.click(walnutButton);
      await waitFor(() => {
        const mockup = screen.getByTestId('mockup-hero');
        expect(mockup).toHaveAttribute('data-material', 'walnut');
      });
    });
  });

  describe('Mockup Variants', () => {
    it('should render all mockup variants', () => {
      render(<PhysicalCalendarSection />);

      expect(screen.getByTestId('mockup-hero')).toBeInTheDocument();
      expect(screen.getByTestId('mockup-detail')).toBeInTheDocument();
      expect(screen.getByTestId('mockup-hand')).toBeInTheDocument();
      expect(screen.getByTestId('mockup-lifestyle')).toBeInTheDocument();
      expect(screen.getByTestId('mockup-exploded')).toBeInTheDocument();
    });

    it('should pass selected material to all mockups', () => {
      render(<PhysicalCalendarSection />);

      const mapleButton = screen.getByRole('button', { name: /Maple/i });
      fireEvent.click(mapleButton);

      const mockups = screen.getAllByText(/Mockup:.*maple/i);
      expect(mockups.length).toBeGreaterThan(0);
    });
  });

  describe('Content Sections', () => {
    it('should display Tactile Interaction section', () => {
      render(<PhysicalCalendarSection />);

      expect(screen.getByText('Tactile Interaction')).toBeInTheDocument();
      expect(screen.getByText(/Each tile is a satisfying physical element/i)).toBeInTheDocument();
    });

    it('should display Human Scale section', () => {
      render(<PhysicalCalendarSection />);

      expect(screen.getByText('Human Scale')).toBeInTheDocument();
      expect(screen.getByText(/Designed at 20" × 16"/i)).toBeInTheDocument();
    });

    it('should display Minimal Interior Presence section', () => {
      render(<PhysicalCalendarSection />);

      expect(screen.getByText('Minimal Interior Presence')).toBeInTheDocument();
      expect(screen.getByText(/A beautiful piece of functional art/i)).toBeInTheDocument();
    });

    it('should display Layered Construction section', () => {
      render(<PhysicalCalendarSection />);

      expect(screen.getByText('Layered Construction')).toBeInTheDocument();
      expect(screen.getByText(/Premium hardwood frame/i)).toBeInTheDocument();
    });
  });

  describe('Features Grid', () => {
    it('should display all four features', () => {
      render(<PhysicalCalendarSection />);

      expect(screen.getByText('Modular Tile System')).toBeInTheDocument();
      expect(screen.getByText('Premium Materials')).toBeInTheDocument();
      expect(screen.getByText('Backlit Display')).toBeInTheDocument();
      expect(screen.getByText('Wall-Mounted Design')).toBeInTheDocument();
    });

    it('should display feature descriptions', () => {
      render(<PhysicalCalendarSection />);

      expect(screen.getByText(/Individual tiles for each day/i)).toBeInTheDocument();
      expect(screen.getByText(/Handcrafted from solid hardwood/i)).toBeInTheDocument();
      expect(screen.getByText(/Subtle LED backlighting/i)).toBeInTheDocument();
      expect(screen.getByText(/Elegant 1.5" depth profile/i)).toBeInTheDocument();
    });

    it('should render SVG icons for each feature', () => {
      const { container } = render(<PhysicalCalendarSection />);

      // Each feature should have an SVG icon
      const svgs = container.querySelectorAll('svg');
      expect(svgs.length).toBeGreaterThanOrEqual(4);
    });
  });

  describe('Technical Specifications', () => {
    it('should display specification heading', () => {
      render(<PhysicalCalendarSection />);

      expect(screen.getByText('Technical Specifications')).toBeInTheDocument();
    });

    it('should display dimension specifications', () => {
      render(<PhysicalCalendarSection />);

      expect(screen.getByText('20" × 16"')).toBeInTheDocument();
      expect(screen.getByText('Overall Dimensions')).toBeInTheDocument();
    });

    it('should display depth specification', () => {
      render(<PhysicalCalendarSection />);

      expect(screen.getByText('1.5"')).toBeInTheDocument();
      expect(screen.getByText('Depth Profile')).toBeInTheDocument();
    });

    it('should display tile count', () => {
      render(<PhysicalCalendarSection />);

      expect(screen.getByText('35')).toBeInTheDocument();
      expect(screen.getByText('Interactive Tiles')).toBeInTheDocument();
    });

    it('should display materials list', () => {
      render(<PhysicalCalendarSection />);

      expect(screen.getByText(/Solid hardwood frame/i)).toBeInTheDocument();
      expect(screen.getByText(/Brushed brass or copper accents/i)).toBeInTheDocument();
      expect(screen.getByText(/Premium acrylic backing/i)).toBeInTheDocument();
      expect(screen.getByText(/Individual LED modules/i)).toBeInTheDocument();
    });

    it('should display features list', () => {
      render(<PhysicalCalendarSection />);

      expect(screen.getByText(/Tactile tile interaction system/i)).toBeInTheDocument();
      expect(screen.getByText(/Microseason-aware LED backlighting/i)).toBeInTheDocument();
      expect(screen.getByText(/5-day microseason transitions/i)).toBeInTheDocument();
      expect(screen.getByText(/Wall-mount ready/i)).toBeInTheDocument();
    });
  });

  describe('Closing Statement', () => {
    it('should display the closing quote', () => {
      render(<PhysicalCalendarSection />);

      expect(screen.getByText(/Where traditional Japanese timekeeping meets/i)).toBeInTheDocument();
      expect(screen.getByText(/modern tactile interaction/i)).toBeInTheDocument();
    });
  });

  describe('Dark Mode', () => {
    it('should render without errors (dark mode tested separately)', () => {
      // Dark mode is controlled by Zustand store which is mocked
      // This test ensures the component renders properly regardless of dark mode state
      render(<PhysicalCalendarSection />);

      // The section should render with appropriate classes
      const section = screen.getByText(/A Calendar You Can/i).closest('section');
      expect(section).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('should have proper button roles for material selector', () => {
      render(<PhysicalCalendarSection />);

      const buttons = screen.getAllByRole('button');
      expect(buttons.length).toBeGreaterThanOrEqual(3);
    });

    it('should have readable text content', () => {
      const { container } = render(<PhysicalCalendarSection />);

      // Check that there's substantial text content
      const textContent = container.textContent || '';
      expect(textContent.length).toBeGreaterThan(500);
    });
  });
});
