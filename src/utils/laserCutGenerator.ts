/**
 * Laser Cut Generator
 * Generates SVG files for laser cutting and engraving the physical microseasons calendar
 *
 * Layer conventions:
 * - Red (#FF0000): Cut through (outer edges, holes, slots)
 * - Blue (#0000FF): Engrave (surface etch for text and graphics)
 * - Green (#00FF00): Score (light cuts for fold lines)
 */

export interface LaserCutOptions {
  size: '16' | '20' | '24'; // inches
  material: 'walnut' | 'maple' | 'oak';
  thickness: number; // mm (typically 6mm for wood)
  includeAssemblyGuide: boolean;
  includeMountingHoles: boolean;
  tileGridSize: { rows: number; cols: number }; // e.g., 12x6 for 72 tiles
}

export interface SVGLayer {
  name: string;
  color: string;
  strokeWidth: number;
  paths: string[];
  texts?: Array<{ x: number; y: number; content: string; size: number }>;
}

export interface LaserCutFile {
  filename: string;
  svg: string;
  description: string;
}

const MM_PER_INCH = 25.4;

// Standard kerf compensation (laser beam width)
const KERF = 0.2; // mm

/**
 * Generate complete laser cut files for the calendar
 */
export function generateLaserCutFiles(options: LaserCutOptions): LaserCutFile[] {
  const files: LaserCutFile[] = [];

  // Main calendar frame
  files.push(generateMainFrame(options));

  // Tile pieces (individual modular tiles)
  files.push(generateTilePieces(options));

  // LED diffuser layer
  files.push(generateLEDDiffuser(options));

  // Back panel with electronics mounting
  files.push(generateBackPanel(options));

  // Assembly guide
  if (options.includeAssemblyGuide) {
    files.push(generateAssemblyGuide(options));
  }

  return files;
}

/**
 * Generate the main calendar frame with tile slots
 */
function generateMainFrame(options: LaserCutOptions): LaserCutFile {
  const sizeInches = parseInt(options.size);
  const width = sizeInches * MM_PER_INCH;
  const height = (sizeInches * 0.75) * MM_PER_INCH; // 4:3 aspect ratio

  const { rows, cols } = options.tileGridSize;
  const tileWidth = (width - 80) / cols; // 40mm margin on each side
  const tileHeight = (height - 80) / rows; // 40mm margin top/bottom

  const layers: SVGLayer[] = [];

  // Cut layer - outer frame and tile slots
  const cutPaths: string[] = [];

  // Outer frame with rounded corners
  const cornerRadius = 10;
  cutPaths.push(
    `M ${cornerRadius} 0 ` +
    `L ${width - cornerRadius} 0 ` +
    `Q ${width} 0 ${width} ${cornerRadius} ` +
    `L ${width} ${height - cornerRadius} ` +
    `Q ${width} ${height} ${width - cornerRadius} ${height} ` +
    `L ${cornerRadius} ${height} ` +
    `Q 0 ${height} 0 ${height - cornerRadius} ` +
    `L 0 ${cornerRadius} ` +
    `Q 0 0 ${cornerRadius} 0 Z`
  );

  // Tile slots (slots for tiles to slide in)
  const startX = 40;
  const startY = 40;
  const slotDepth = options.thickness * 0.5; // Half the material thickness
  const slotWidth = tileWidth - 2; // Slight clearance

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const x = startX + col * tileWidth;
      const y = startY + row * tileHeight;

      // Create slot outline
      cutPaths.push(
        `M ${x + 1} ${y + 1} ` +
        `L ${x + slotWidth + 1} ${y + 1} ` +
        `L ${x + slotWidth + 1} ${y + tileHeight - 1} ` +
        `L ${x + 1} ${y + tileHeight - 1} Z`
      );
    }
  }

  // Mounting holes if requested
  if (options.includeMountingHoles) {
    const holeRadius = 3; // 6mm diameter holes for mounting screws
    const holeInset = 20;

    // Four corner mounting holes
    const holes = [
      { x: holeInset, y: holeInset },
      { x: width - holeInset, y: holeInset },
      { x: holeInset, y: height - holeInset },
      { x: width - holeInset, y: height - holeInset },
    ];

    holes.forEach(hole => {
      cutPaths.push(createCirclePath(hole.x, hole.y, holeRadius));
    });
  }

  layers.push({
    name: 'cut',
    color: '#FF0000',
    strokeWidth: 0.1,
    paths: cutPaths,
  });

  // Engrave layer - decorative elements and labels
  const engravePaths: string[] = [];
  const engraveTexts: Array<{ x: number; y: number; content: string; size: number }> = [];

  // Title engraving at top
  engraveTexts.push({
    x: width / 2,
    y: 20,
    content: 'MICROSEASONS',
    size: 8,
  });

  // Material label at bottom
  engraveTexts.push({
    x: width / 2,
    y: height - 10,
    content: options.material.toUpperCase(),
    size: 4,
  });

  // Decorative border pattern
  const borderInset = 5;
  engravePaths.push(
    `M ${borderInset} ${borderInset} ` +
    `L ${width - borderInset} ${borderInset} ` +
    `L ${width - borderInset} ${height - borderInset} ` +
    `L ${borderInset} ${height - borderInset} Z`
  );

  layers.push({
    name: 'engrave',
    color: '#0000FF',
    strokeWidth: 0.1,
    paths: engravePaths,
    texts: engraveTexts,
  });

  const svg = createSVG(width, height, layers);

  return {
    filename: `calendar-frame-${options.size}inch-${options.material}.svg`,
    svg,
    description: 'Main calendar frame with tile slots and mounting holes',
  };
}

/**
 * Generate individual tile pieces
 */
function generateTilePieces(options: LaserCutOptions): LaserCutFile {
  const sizeInches = parseInt(options.size);
  const frameWidth = sizeInches * MM_PER_INCH;
  const frameHeight = (sizeInches * 0.75) * MM_PER_INCH;

  const { rows, cols } = options.tileGridSize;
  const tileWidth = (frameWidth - 80) / cols - 2; // Account for margins and clearance
  const tileHeight = (frameHeight - 80) / rows - 2;

  // Create a sheet with multiple tiles laid out for efficient cutting
  const tilesPerRow = 4;
  const spacing = 5; // mm spacing between tiles
  const sheetWidth = (tileWidth + spacing) * tilesPerRow;
  const sheetHeight = (tileHeight + spacing) * Math.ceil((rows * cols) / tilesPerRow);

  const layers: SVGLayer[] = [];
  const cutPaths: string[] = [];
  const engravePaths: string[] = [];

  let tileIndex = 0;
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const sheetRow = Math.floor(tileIndex / tilesPerRow);
      const sheetCol = tileIndex % tilesPerRow;

      const x = sheetCol * (tileWidth + spacing);
      const y = sheetRow * (tileHeight + spacing);

      // Tile outline with small tab for handling
      const tabWidth = 2;
      const tabHeight = 1;
      cutPaths.push(
        `M ${x} ${y + tabHeight} ` +
        `L ${x} ${y} ` +
        `L ${x + tabWidth} ${y} ` +
        `L ${x + tabWidth} ${y + tabHeight} ` +
        `M ${x + tabWidth} ${y + tabHeight} ` +
        `L ${x + tileWidth} ${y + tabHeight} ` +
        `L ${x + tileWidth} ${y + tileHeight} ` +
        `L ${x} ${y + tileHeight} Z`
      );

      // LED hole in center of each tile
      const ledRadius = 2.5; // 5mm LED
      cutPaths.push(
        createCirclePath(
          x + tileWidth / 2,
          y + tileHeight / 2,
          ledRadius
        )
      );

      // Tile number engraving (for assembly reference)
      engravePaths.push(
        createTextPath(
          x + 2,
          y + 2,
          `${row * cols + col + 1}`,
          2
        )
      );

      tileIndex++;
    }
  }

  layers.push({
    name: 'cut',
    color: '#FF0000',
    strokeWidth: 0.1,
    paths: cutPaths,
  });

  layers.push({
    name: 'engrave',
    color: '#0000FF',
    strokeWidth: 0.1,
    paths: engravePaths,
  });

  const svg = createSVG(sheetWidth, sheetHeight, layers);

  return {
    filename: `calendar-tiles-${rows}x${cols}-${options.material}.svg`,
    svg,
    description: `${rows * cols} individual tiles with LED holes`,
  };
}

/**
 * Generate LED diffuser layer (acrylic or translucent material)
 */
function generateLEDDiffuser(options: LaserCutOptions): LaserCutFile {
  const sizeInches = parseInt(options.size);
  const width = sizeInches * MM_PER_INCH;
  const height = (sizeInches * 0.75) * MM_PER_INCH;

  const layers: SVGLayer[] = [];
  const cutPaths: string[] = [];

  // Same outer dimensions as main frame
  const cornerRadius = 10;
  cutPaths.push(
    `M ${cornerRadius} 0 ` +
    `L ${width - cornerRadius} 0 ` +
    `Q ${width} 0 ${width} ${cornerRadius} ` +
    `L ${width} ${height - cornerRadius} ` +
    `Q ${width} ${height} ${width - cornerRadius} ${height} ` +
    `L ${cornerRadius} ${height} ` +
    `Q 0 ${height} 0 ${height - cornerRadius} ` +
    `L 0 ${cornerRadius} ` +
    `Q 0 0 ${cornerRadius} 0 Z`
  );

  // LED holes matching tile positions
  const { rows, cols } = options.tileGridSize;
  const tileWidth = (width - 80) / cols;
  const tileHeight = (height - 80) / rows;
  const startX = 40;
  const startY = 40;

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const x = startX + col * tileWidth + tileWidth / 2;
      const y = startY + row * tileHeight + tileHeight / 2;

      // Slightly larger holes for LED positioning
      cutPaths.push(createCirclePath(x, y, 3));
    }
  }

  layers.push({
    name: 'cut',
    color: '#FF0000',
    strokeWidth: 0.1,
    paths: cutPaths,
  });

  const svg = createSVG(width, height, layers);

  return {
    filename: `led-diffuser-${options.size}inch.svg`,
    svg,
    description: 'Acrylic diffuser layer with LED holes (use 3mm clear/frosted acrylic)',
  };
}

/**
 * Generate back panel with electronics mounting
 */
function generateBackPanel(options: LaserCutOptions): LaserCutFile {
  const sizeInches = parseInt(options.size);
  const width = sizeInches * MM_PER_INCH;
  const height = (sizeInches * 0.75) * MM_PER_INCH;

  const layers: SVGLayer[] = [];
  const cutPaths: string[] = [];
  const engravePaths: string[] = [];

  // Outer frame
  const cornerRadius = 10;
  cutPaths.push(
    `M ${cornerRadius} 0 ` +
    `L ${width - cornerRadius} 0 ` +
    `Q ${width} 0 ${width} ${cornerRadius} ` +
    `L ${width} ${height - cornerRadius} ` +
    `Q ${width} ${height} ${width - cornerRadius} ${height} ` +
    `L ${cornerRadius} ${height} ` +
    `Q 0 ${height} 0 ${height - cornerRadius} ` +
    `L 0 ${cornerRadius} ` +
    `Q 0 0 ${cornerRadius} 0 Z`
  );

  // Cable management slot at bottom
  const slotWidth = 40;
  const slotHeight = 10;
  cutPaths.push(
    `M ${width / 2 - slotWidth / 2} ${height - 20} ` +
    `L ${width / 2 + slotWidth / 2} ${height - 20} ` +
    `L ${width / 2 + slotWidth / 2} ${height - 20 + slotHeight} ` +
    `L ${width / 2 - slotWidth / 2} ${height - 20 + slotHeight} Z`
  );

  // LED strip mounting guides (engraved)
  const { rows, cols } = options.tileGridSize;
  const tileWidth = (width - 80) / cols;
  const tileHeight = (height - 80) / rows;
  const startX = 40;
  const startY = 40;

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const x = startX + col * tileWidth + tileWidth / 2;
      const y = startY + row * tileHeight + tileHeight / 2;

      // Small cross mark for LED positioning
      engravePaths.push(
        `M ${x - 2} ${y} L ${x + 2} ${y} M ${x} ${y - 2} L ${x} ${y + 2}`
      );
    }
  }

  // Mounting hole guides (engraved circles)
  const holeInset = 20;
  const holes = [
    { x: holeInset, y: holeInset },
    { x: width - holeInset, y: holeInset },
    { x: holeInset, y: height - holeInset },
    { x: width - holeInset, y: height - holeInset },
  ];

  holes.forEach(hole => {
    engravePaths.push(createCirclePath(hole.x, hole.y, 3));
  });

  layers.push({
    name: 'cut',
    color: '#FF0000',
    strokeWidth: 0.1,
    paths: cutPaths,
  });

  layers.push({
    name: 'engrave',
    color: '#0000FF',
    strokeWidth: 0.1,
    paths: engravePaths,
  });

  const svg = createSVG(width, height, layers);

  return {
    filename: `back-panel-${options.size}inch-${options.material}.svg`,
    svg,
    description: 'Back panel with cable management and LED mounting guides',
  };
}

/**
 * Generate assembly guide
 */
function generateAssemblyGuide(options: LaserCutOptions): LaserCutFile {
  const width = 400;
  const height = 600;

  const layers: SVGLayer[] = [];
  const engravePaths: string[] = [];
  const engraveTexts: Array<{ x: number; y: number; content: string; size: number }> = [];

  // Title
  engraveTexts.push({
    x: width / 2,
    y: 30,
    content: 'MICROSEASONS CALENDAR - ASSEMBLY GUIDE',
    size: 8,
  });

  // Instructions
  const instructions = [
    '1. PREPARE MATERIALS',
    '   - Main frame (wood)',
    '   - 72 tiles (wood)',
    '   - LED diffuser (acrylic)',
    '   - Back panel (wood)',
    '   - LED strip or individual LEDs',
    '',
    '2. INSTALL LEDS',
    '   - Mount LEDs to back panel using guides',
    '   - Connect to power supply',
    '   - Test all LEDs',
    '',
    '3. ASSEMBLE LAYERS',
    '   - Attach back panel to main frame',
    '   - Install LED diffuser layer',
    '   - Insert tiles into slots',
    '',
    '4. MOUNT TO WALL',
    '   - Use mounting holes at corners',
    `   - Recommended: ${options.size}" from floor`,
    '   - Ensure level installation',
    '',
    '5. CONNECT POWER',
    '   - Route cable through back slot',
    '   - Connect to controller',
    '',
    `SIZE: ${options.size}" diagonal`,
    `MATERIAL: ${options.material}`,
    `GRID: ${options.tileGridSize.rows}x${options.tileGridSize.cols} tiles`,
  ];

  instructions.forEach((line, index) => {
    engraveTexts.push({
      x: 50,
      y: 60 + index * 12,
      content: line,
      size: line.startsWith(' ') ? 4 : 5,
    });
  });

  // Simple exploded view diagram
  const diagramY = 450;
  const layerSpacing = 30;

  // Layer rectangles
  ['Back Panel', 'LED Layer', 'Diffuser', 'Frame', 'Tiles'].forEach((label, index) => {
    const y = diagramY + index * layerSpacing;
    const rectWidth = 100;
    const rectHeight = 15;
    const x = width / 2 - rectWidth / 2;

    engravePaths.push(
      `M ${x} ${y} L ${x + rectWidth} ${y} L ${x + rectWidth} ${y + rectHeight} L ${x} ${y + rectHeight} Z`
    );

    engraveTexts.push({
      x: x + rectWidth + 20,
      y: y + 10,
      content: label,
      size: 4,
    });
  });

  layers.push({
    name: 'engrave',
    color: '#0000FF',
    strokeWidth: 0.1,
    paths: engravePaths,
    texts: engraveTexts,
  });

  const svg = createSVG(width, height, layers);

  return {
    filename: `assembly-guide-${options.size}inch.svg`,
    svg,
    description: 'Assembly instructions and parts diagram',
  };
}

/**
 * Create SVG document from layers
 */
function createSVG(width: number, height: number, layers: SVGLayer[]): string {
  let svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${width}mm" height="${height}mm" viewBox="0 0 ${width} ${height}"
     xmlns="http://www.w3.org/2000/svg" version="1.1">
  <title>Microseasons Calendar - Laser Cut File</title>
  <desc>Generated laser cutting file. Red=Cut, Blue=Engrave, Green=Score</desc>

`;

  layers.forEach(layer => {
    svg += `  <g id="${layer.name}" stroke="${layer.color}" stroke-width="${layer.strokeWidth}" fill="none">\n`;

    layer.paths.forEach(path => {
      svg += `    <path d="${path}" />\n`;
    });

    if (layer.texts) {
      layer.texts.forEach(text => {
        svg += `    <text x="${text.x}" y="${text.y}" font-size="${text.size}" text-anchor="middle" fill="${layer.color}" stroke="none">${text.content}</text>\n`;
      });
    }

    svg += `  </g>\n`;
  });

  svg += `</svg>`;

  return svg;
}

/**
 * Helper: Create circle path
 */
function createCirclePath(cx: number, cy: number, r: number): string {
  return `M ${cx - r} ${cy} A ${r} ${r} 0 1 0 ${cx + r} ${cy} A ${r} ${r} 0 1 0 ${cx - r} ${cy}`;
}

/**
 * Helper: Create text path (for engraving)
 */
function createTextPath(x: number, y: number, text: string, size: number): string {
  // This is a simplified version - in production you'd convert text to paths
  // For now, we'll use the text element in the SVG
  return `M ${x} ${y}`;
}

/**
 * Download a laser cut file
 */
export function downloadLaserCutFile(file: LaserCutFile): void {
  const blob = new Blob([file.svg], { type: 'image/svg+xml' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = file.filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Download all laser cut files as a ZIP
 */
export async function downloadAllLaserCutFiles(files: LaserCutFile[]): Promise<void> {
  // For now, download individually
  // In production, you'd use JSZip to create a proper ZIP file
  for (const file of files) {
    downloadLaserCutFile(file);
    // Small delay between downloads to avoid browser blocking
    await new Promise(resolve => setTimeout(resolve, 500));
  }
}
