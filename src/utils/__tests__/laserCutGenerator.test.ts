import { generateLaserCutFiles, type LaserCutOptions } from '../laserCutGenerator';

describe('laserCutGenerator', () => {
  const defaultOptions: LaserCutOptions = {
    size: '20',
    material: 'walnut',
    thickness: 6,
    includeAssemblyGuide: true,
    includeMountingHoles: true,
    tileGridSize: { rows: 12, cols: 6 },
  };

  describe('generateLaserCutFiles', () => {
    it('should generate all required files with assembly guide', () => {
      const files = generateLaserCutFiles(defaultOptions);

      expect(files).toHaveLength(5); // frame, tiles, diffuser, back, assembly
      expect(files[0].filename).toContain('calendar-frame');
      expect(files[1].filename).toContain('calendar-tiles');
      expect(files[2].filename).toContain('led-diffuser');
      expect(files[3].filename).toContain('back-panel');
      expect(files[4].filename).toContain('assembly-guide');
    });

    it('should generate files without assembly guide when disabled', () => {
      const options = { ...defaultOptions, includeAssemblyGuide: false };
      const files = generateLaserCutFiles(options);

      expect(files).toHaveLength(4); // frame, tiles, diffuser, back (no assembly)
      expect(files.some(f => f.filename.includes('assembly-guide'))).toBe(false);
    });

    it('should include material name in frame filename', () => {
      const walnutFiles = generateLaserCutFiles({ ...defaultOptions, material: 'walnut' });
      const mapleFiles = generateLaserCutFiles({ ...defaultOptions, material: 'maple' });
      const oakFiles = generateLaserCutFiles({ ...defaultOptions, material: 'oak' });

      expect(walnutFiles[0].filename).toContain('walnut');
      expect(mapleFiles[0].filename).toContain('maple');
      expect(oakFiles[0].filename).toContain('oak');
    });

    it('should include size in frame filename', () => {
      const size16 = generateLaserCutFiles({ ...defaultOptions, size: '16' });
      const size20 = generateLaserCutFiles({ ...defaultOptions, size: '20' });
      const size24 = generateLaserCutFiles({ ...defaultOptions, size: '24' });

      expect(size16[0].filename).toContain('16inch');
      expect(size20[0].filename).toContain('20inch');
      expect(size24[0].filename).toContain('24inch');
    });

    it('should include grid size in tiles filename', () => {
      const files = generateLaserCutFiles(defaultOptions);

      expect(files[1].filename).toContain('12x6');
    });

    it('should generate valid SVG for all files', () => {
      const files = generateLaserCutFiles(defaultOptions);

      files.forEach(file => {
        expect(file.svg).toContain('<?xml version="1.0"');
        expect(file.svg).toContain('<svg');
        expect(file.svg).toContain('</svg>');
        expect(file.svg).toContain('xmlns="http://www.w3.org/2000/svg"');
      });
    });

    it('should include cut layer (red) in all files', () => {
      const files = generateLaserCutFiles(defaultOptions);

      // All files except assembly guide should have cut layer
      const filesToCheck = defaultOptions.includeAssemblyGuide ? files.slice(0, -1) : files;

      filesToCheck.forEach(file => {
        expect(file.svg).toContain('id="cut"');
        expect(file.svg).toContain('stroke="#FF0000"');
      });
    });

    it('should include engrave layer (blue) in frame and tiles', () => {
      const files = generateLaserCutFiles(defaultOptions);

      // Frame and tiles should have engrave layer
      [files[0], files[1]].forEach(file => {
        expect(file.svg).toContain('id="engrave"');
        expect(file.svg).toContain('stroke="#0000FF"');
      });
    });

    it('should have descriptive descriptions for all files', () => {
      const files = generateLaserCutFiles(defaultOptions);

      files.forEach(file => {
        expect(file.description).toBeTruthy();
        expect(file.description.length).toBeGreaterThan(10);
      });
    });

    it('should calculate correct number of tiles', () => {
      const customGrid = {
        ...defaultOptions,
        tileGridSize: { rows: 10, cols: 5 },
      };
      const files = generateLaserCutFiles(customGrid);

      // The tiles file should mention 50 tiles in description
      expect(files[1].description).toContain('50');
    });

    it('should generate viewBox with correct dimensions for different sizes', () => {
      const size16 = generateLaserCutFiles({ ...defaultOptions, size: '16' });
      const size24 = generateLaserCutFiles({ ...defaultOptions, size: '24' });

      const extractViewBox = (svg: string) => {
        const match = svg.match(/viewBox="([^"]+)"/);
        return match ? match[1] : '';
      };

      const viewBox16 = extractViewBox(size16[0].svg);
      const viewBox24 = extractViewBox(size24[0].svg);

      // Size 24 should have larger dimensions than size 16
      expect(viewBox16).toBeTruthy();
      expect(viewBox24).toBeTruthy();
      expect(viewBox16).not.toBe(viewBox24);
    });
  });

  describe('SVG Structure', () => {
    it('should have proper XML declaration', () => {
      const files = generateLaserCutFiles(defaultOptions);

      files.forEach(file => {
        expect(file.svg.startsWith('<?xml version="1.0" encoding="UTF-8"?>')).toBe(true);
      });
    });

    it('should include title and description in SVG', () => {
      const files = generateLaserCutFiles(defaultOptions);

      files.forEach(file => {
        expect(file.svg).toContain('<title>');
        expect(file.svg).toContain('<desc>');
      });
    });

    it('should use millimeters as units', () => {
      const files = generateLaserCutFiles(defaultOptions);

      files.forEach(file => {
        expect(file.svg).toContain('mm');
      });
    });
  });

  describe('Layer Conventions', () => {
    it('should use correct colors for layers', () => {
      const files = generateLaserCutFiles(defaultOptions);
      const frameFile = files[0];

      // Cut layer should be red
      expect(frameFile.svg).toContain('stroke="#FF0000"');
      // Engrave layer should be blue
      expect(frameFile.svg).toContain('stroke="#0000FF"');
    });

    it('should use thin stroke widths suitable for laser cutting', () => {
      const files = generateLaserCutFiles(defaultOptions);

      files.forEach(file => {
        // Stroke width should be 0.1 or similar very thin value
        expect(file.svg).toContain('stroke-width="0.1"');
      });
    });

    it('should use no fill for cut paths', () => {
      const files = generateLaserCutFiles(defaultOptions);

      files.forEach(file => {
        if (file.svg.includes('id="cut"')) {
          const cutGroup = file.svg.substring(
            file.svg.indexOf('id="cut"'),
            file.svg.indexOf('</g>', file.svg.indexOf('id="cut"'))
          );
          expect(cutGroup).toContain('fill="none"');
        }
      });
    });
  });

  describe('Physical Specifications', () => {
    it('should include mounting holes when enabled', () => {
      const withHoles = generateLaserCutFiles({ ...defaultOptions, includeMountingHoles: true });
      const withoutHoles = generateLaserCutFiles({ ...defaultOptions, includeMountingHoles: false });

      // Frame with mounting holes should have more paths than without
      expect(withHoles[0].svg.length).toBeGreaterThan(withoutHoles[0].svg.length);
    });

    it('should generate correct number of tile pieces', () => {
      const files = generateLaserCutFiles(defaultOptions);
      const tilesFile = files[1];

      // Should have 72 individual tiles for 12x6 grid
      const expectedTiles = defaultOptions.tileGridSize.rows * defaultOptions.tileGridSize.cols;
      expect(tilesFile.description).toContain(expectedTiles.toString());
    });

    it('should include material label in frame', () => {
      const files = generateLaserCutFiles(defaultOptions);
      const frameFile = files[0];

      expect(frameFile.svg.toUpperCase()).toContain(defaultOptions.material.toUpperCase());
    });
  });
});
