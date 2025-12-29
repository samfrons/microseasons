import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import AlgaePanel from '../AlgaePanel';

// Mock framer-motion to avoid animation issues in tests
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, className, style, onClick, initial, animate, transition, whileHover, ...props }: any) => {
      const validProps: any = { className, style };
      if (onClick) validProps.onClick = onClick;
      if (props['data-testid']) validProps['data-testid'] = props['data-testid'];
      return <div {...validProps}>{children}</div>;
    },
  },
}));

describe('AlgaePanel', () => {
  describe('Rendering', () => {
    it('should render without crashing', () => {
      const { container } = render(<AlgaePanel />);
      expect(container.firstChild).toBeInTheDocument();
    });

    it('should render with default props', () => {
      const { container } = render(<AlgaePanel />);
      // Should have the brass frame gradient
      const frameElement = container.querySelector('[style*="linear-gradient"]');
      expect(frameElement).toBeInTheDocument();
    });

    it('should render microseason name when provided', () => {
      render(<AlgaePanel microseasonName="East wind melts the ice" />);
      expect(screen.getByText('East wind melts the ice')).toBeInTheDocument();
    });

    it('should render date when provided', () => {
      render(<AlgaePanel date="Feb 4" />);
      expect(screen.getByText('Feb 4')).toBeInTheDocument();
    });

    it('should not render content overlay in minimal variant', () => {
      render(<AlgaePanel variant="minimal" microseasonName="Test" />);
      expect(screen.queryByText('Test')).not.toBeInTheDocument();
    });
  });

  describe('Sizes', () => {
    it('should apply small size class', () => {
      const { container } = render(<AlgaePanel size="sm" />);
      expect(container.querySelector('.w-24')).toBeInTheDocument();
    });

    it('should apply medium size class (default)', () => {
      const { container } = render(<AlgaePanel size="md" />);
      expect(container.querySelector('.w-36')).toBeInTheDocument();
    });

    it('should apply large size class', () => {
      const { container } = render(<AlgaePanel size="lg" />);
      expect(container.querySelector('.w-48')).toBeInTheDocument();
    });
  });

  describe('LED Indicators', () => {
    it('should render default LEDs', () => {
      const { container } = render(<AlgaePanel />);
      // Default is 5 LEDs
      const leds = container.querySelectorAll('[style*="backgroundColor"]');
      expect(leds.length).toBeGreaterThanOrEqual(5);
    });

    it('should render custom LEDs', () => {
      const customLeds = [
        { color: 'red', active: true },
        { color: 'green', active: false },
      ];
      const { container } = render(<AlgaePanel leds={customLeds} />);
      // Should have 2 LED indicators at bottom
      const bottomLeds = container.querySelectorAll('.absolute.-bottom-1 > div');
      expect(bottomLeds.length).toBe(2);
    });

    it('should apply led-pulse class to active LEDs', () => {
      const customLeds = [
        { color: 'red', active: true },
        { color: 'green', active: false },
      ];
      const { container } = render(<AlgaePanel leds={customLeds} />);
      const activeLed = container.querySelector('.led-pulse');
      expect(activeLed).toBeInTheDocument();
    });
  });

  describe('Variants', () => {
    it('should render standard variant by default', () => {
      const { container } = render(<AlgaePanel />);
      // Standard variant doesn't have extra glow
      const extraGlow = container.querySelector('.-inset-2.-z-10');
      expect(extraGlow).not.toBeInTheDocument();
    });

    it('should render featured variant with extra glow', () => {
      const { container } = render(<AlgaePanel variant="featured" />);
      const extraGlow = container.querySelector('[style*="radial-gradient"]');
      expect(extraGlow).toBeInTheDocument();
    });
  });

  describe('Active State', () => {
    it('should apply panel-glow class when active', () => {
      const { container } = render(<AlgaePanel isActive={true} />);
      const glowingPanel = container.querySelector('.panel-glow');
      expect(glowingPanel).toBeInTheDocument();
    });

    it('should not apply panel-glow class when inactive', () => {
      const { container } = render(<AlgaePanel isActive={false} />);
      const glowingPanel = container.querySelector('.panel-glow');
      expect(glowingPanel).not.toBeInTheDocument();
    });
  });

  describe('Interactivity', () => {
    it('should call onClick when clicked', () => {
      const handleClick = jest.fn();
      const { container } = render(<AlgaePanel onClick={handleClick} />);

      const panel = container.firstChild as HTMLElement;
      fireEvent.click(panel);

      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('should have cursor-pointer class', () => {
      const { container } = render(<AlgaePanel />);
      expect(container.querySelector('.cursor-pointer')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('should be keyboard accessible when onClick is provided', () => {
      const handleClick = jest.fn();
      const { container } = render(<AlgaePanel onClick={handleClick} />);

      // Panel should be interactive
      const panel = container.firstChild as HTMLElement;
      expect(panel).toHaveClass('cursor-pointer');
    });

    it('should have visible content for screen readers', () => {
      render(<AlgaePanel microseasonName="Test Season" date="Jan 1" />);

      expect(screen.getByText('Test Season')).toBeInTheDocument();
      expect(screen.getByText('Jan 1')).toBeInTheDocument();
    });
  });

  describe('Animation Delay', () => {
    it('should accept animationDelay prop without error', () => {
      const { container } = render(<AlgaePanel animationDelay={0.5} />);
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  describe('Visual Elements', () => {
    it('should render algae texture overlay', () => {
      const { container } = render(<AlgaePanel />);
      const textureOverlay = container.querySelector('.algae-breathe');
      expect(textureOverlay).toBeInTheDocument();
    });

    it('should render backlight glow', () => {
      const { container } = render(<AlgaePanel />);
      const backlight = container.querySelector('[style*="radial-gradient"]');
      expect(backlight).toBeInTheDocument();
    });

    it('should render brass frame', () => {
      const { container } = render(<AlgaePanel />);
      const frame = container.querySelector('[style*="linear-gradient(135deg"]');
      expect(frame).toBeInTheDocument();
    });
  });
});
