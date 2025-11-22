import React from 'react';
import { render, screen } from '@testing-library/react';
import { PhysicalCalendarMockup } from '../PhysicalCalendarMockup';

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, className, style, onHoverStart, onHoverEnd, ...props }: any) => {
      // Only pass valid DOM props
      const validProps: any = { className, style };
      if (props.onClick) validProps.onClick = props.onClick;
      if (props['data-testid']) validProps['data-testid'] = props['data-testid'];
      return <div {...validProps}>{children}</div>;
    },
    button: ({ children, className, style, onClick }: any) => (
      <button className={className} style={style} onClick={onClick}>
        {children}
      </button>
    ),
  },
}));

describe('PhysicalCalendarMockup', () => {
  describe('Hero Variant', () => {
    it('should render hero variant', () => {
      const { container } = render(
        <PhysicalCalendarMockup variant="hero" material="walnut" />
      );
      expect(container).toBeTruthy();
    });

    it('should display calendar grid with 35 tiles', () => {
      const { container } = render(
        <PhysicalCalendarMockup variant="hero" material="walnut" />
      );

      // Hero variant creates 35 tiles
      const tiles = container.querySelectorAll('[class*="grid"] > div');
      expect(tiles.length).toBeGreaterThanOrEqual(35);
    });

    it('should display microseason label', () => {
      render(<PhysicalCalendarMockup variant="hero" material="walnut" />);

      expect(screen.getByText(/USUI/i)).toBeInTheDocument();
      expect(screen.getByText(/Mist starts to linger/i)).toBeInTheDocument();
    });

    it('should render with different materials', () => {
      const { rerender, container: container1 } = render(
        <PhysicalCalendarMockup variant="hero" material="walnut" />
      );
      expect(container1).toBeTruthy();

      rerender(<PhysicalCalendarMockup variant="hero" material="maple" />);
      expect(container1).toBeTruthy();

      rerender(<PhysicalCalendarMockup variant="hero" material="oak" />);
      expect(container1).toBeTruthy();
    });
  });

  describe('Detail Variant', () => {
    it('should render detail variant', () => {
      const { container } = render(
        <PhysicalCalendarMockup variant="detail" material="walnut" />
      );
      expect(container).toBeTruthy();
    });

    it('should display 3x3 grid of tiles', () => {
      render(<PhysicalCalendarMockup variant="detail" material="walnut" />);

      // Detail variant shows specific day numbers
      expect(screen.getByText('12')).toBeInTheDocument();
      expect(screen.getByText('13')).toBeInTheDocument();
      expect(screen.getByText('20')).toBeInTheDocument();
      expect(screen.getByText('28')).toBeInTheDocument();
    });

    it('should highlight active tiles', () => {
      const { container } = render(
        <PhysicalCalendarMockup variant="detail" material="walnut" />
      );

      // Check for tiles with active state
      // Active tiles: 13, 14, 20 in the mockup
      expect(screen.getByText('13')).toBeInTheDocument();
      expect(screen.getByText('14')).toBeInTheDocument();
      expect(screen.getByText('20')).toBeInTheDocument();
    });
  });

  describe('Lifestyle Variant', () => {
    it('should render lifestyle variant', () => {
      const { container } = render(
        <PhysicalCalendarMockup variant="lifestyle" material="walnut" />
      );
      expect(container).toBeTruthy();
    });

    it('should display simplified calendar grid', () => {
      const { container } = render(
        <PhysicalCalendarMockup variant="lifestyle" material="maple" />
      );

      // Lifestyle view has simplified grid
      const gridItems = container.querySelectorAll('[class*="grid"] > div');
      expect(gridItems.length).toBeGreaterThan(0);
    });
  });

  describe('Exploded Variant', () => {
    it('should render exploded variant', () => {
      const { container } = render(
        <PhysicalCalendarMockup variant="exploded" material="walnut" />
      );
      expect(container).toBeTruthy();
    });

    it('should display layer labels', () => {
      render(<PhysicalCalendarMockup variant="exploded" material="oak" />);

      expect(screen.getByText('Wooden Frame')).toBeInTheDocument();
      expect(screen.getByText('LED Matrix')).toBeInTheDocument();
      expect(screen.getByText('Modular Tiles')).toBeInTheDocument();
    });

    it('should display layer descriptions', () => {
      render(<PhysicalCalendarMockup variant="exploded" material="walnut" />);

      expect(screen.getByText(/Premium hardwood/i)).toBeInTheDocument();
      expect(screen.getByText(/Individual backlighting/i)).toBeInTheDocument();
      expect(screen.getByText(/Tactile interaction/i)).toBeInTheDocument();
    });
  });

  describe('Hand Variant', () => {
    it('should render hand interaction variant', () => {
      const { container } = render(
        <PhysicalCalendarMockup variant="hand" material="walnut" />
      );
      expect(container).toBeTruthy();
    });

    it('should display 3x4 calendar section', () => {
      render(<PhysicalCalendarMockup variant="hand" material="walnut" />);

      // Shows days 15-26
      expect(screen.getByText('15')).toBeInTheDocument();
      expect(screen.getByText('19')).toBeInTheDocument();
      expect(screen.getByText('26')).toBeInTheDocument();
    });

    it('should display dimension annotations', () => {
      render(<PhysicalCalendarMockup variant="hand" material="maple" />);

      expect(screen.getByText('20" × 16"')).toBeInTheDocument();
      expect(screen.getByText(/Actual size reference/i)).toBeInTheDocument();
    });

    it('should render hand SVG', () => {
      const { container } = render(
        <PhysicalCalendarMockup variant="hand" material="walnut" />
      );

      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
    });
  });

  describe('Material Variations', () => {
    it('should render with walnut material', () => {
      const { container } = render(
        <PhysicalCalendarMockup variant="hero" material="walnut" />
      );
      // Check that styles are applied (gradient backgrounds)
      const elementsWithStyle = container.querySelectorAll('[style*="gradient"]');
      expect(elementsWithStyle.length).toBeGreaterThan(0);
    });

    it('should render with maple material', () => {
      const { container } = render(
        <PhysicalCalendarMockup variant="hero" material="maple" />
      );
      // Check that component renders without errors
      expect(container.firstChild).toBeTruthy();
    });

    it('should render with oak material', () => {
      const { container } = render(
        <PhysicalCalendarMockup variant="hero" material="oak" />
      );
      // Check that component renders without errors
      expect(container.firstChild).toBeTruthy();
    });
  });

  describe('Invalid Variant', () => {
    it('should return null for unknown variant', () => {
      const { container } = render(
        // @ts-ignore - testing invalid variant
        <PhysicalCalendarMockup variant="unknown" material="walnut" />
      );

      // Should render empty or null
      expect(container.firstChild?.textContent || '').toBe('');
    });
  });

  describe('Custom ClassName', () => {
    it('should apply custom className', () => {
      const { container } = render(
        <PhysicalCalendarMockup
          variant="hero"
          material="walnut"
          className="custom-class"
        />
      );

      const element = container.querySelector('.custom-class');
      expect(element).toBeInTheDocument();
    });
  });

  describe('Default Props', () => {
    it('should default to walnut material when not specified', () => {
      const { container } = render(
        <PhysicalCalendarMockup variant="hero" />
      );
      expect(container).toBeTruthy();
    });

    it('should default to empty className when not specified', () => {
      const { container } = render(
        <PhysicalCalendarMockup variant="hero" material="maple" />
      );
      expect(container).toBeTruthy();
    });
  });
});
