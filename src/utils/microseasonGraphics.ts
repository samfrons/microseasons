import { Microseason } from '@/data/microseasons';

export interface MicroseasonGraphic {
  id: number;
  svg: string;
  gradient: string;
  pattern: 'waves' | 'circles' | 'leaves' | 'geometric' | 'abstract' | 'seasonal';
  colors: string[];
}

// Generate SVG graphic for a microseason
export function generateMicroseasonGraphic(
  microseason: Microseason,
  size: { width: number; height: number } = { width: 400, height: 300 }
): MicroseasonGraphic {
  const { colors, solarTerm, imagery } = microseason;
  const pattern = selectPattern(solarTerm, imagery);

  const svg = createSVGPattern(pattern, colors, size);
  const gradient = `linear-gradient(135deg, ${colors[0]}, ${colors[1] || colors[0]}, ${colors[2] || colors[0]})`;

  return {
    id: microseason.id,
    svg,
    gradient,
    pattern,
    colors,
  };
}

// Select pattern based on solar term and imagery
function selectPattern(
  solarTerm: string,
  imagery: string[]
): MicroseasonGraphic['pattern'] {
  const term = solarTerm.toLowerCase();
  const imageryStr = imagery.join(' ').toLowerCase();

  if (term.includes('spring') || imageryStr.includes('blossom') || imageryStr.includes('bloom')) {
    return 'leaves';
  } else if (term.includes('summer') || imageryStr.includes('sun') || imageryStr.includes('heat')) {
    return 'waves';
  } else if (term.includes('autumn') || imageryStr.includes('harvest') || imageryStr.includes('fall')) {
    return 'circles';
  } else if (term.includes('winter') || imageryStr.includes('snow') || imageryStr.includes('ice')) {
    return 'geometric';
  } else if (imageryStr.includes('festival') || imageryStr.includes('celebration')) {
    return 'abstract';
  }

  return 'seasonal';
}

// Create SVG pattern based on type
function createSVGPattern(
  pattern: MicroseasonGraphic['pattern'],
  colors: string[],
  size: { width: number; height: number }
): string {
  const { width, height } = size;

  switch (pattern) {
    case 'waves':
      return createWavesPattern(colors, width, height);
    case 'circles':
      return createCirclesPattern(colors, width, height);
    case 'leaves':
      return createLeavesPattern(colors, width, height);
    case 'geometric':
      return createGeometricPattern(colors, width, height);
    case 'abstract':
      return createAbstractPattern(colors, width, height);
    case 'seasonal':
    default:
      return createSeasonalPattern(colors, width, height);
  }
}

function createWavesPattern(colors: string[], width: number, height: number): string {
  const color1 = colors[0] || '#4A90E2';
  const color2 = colors[1] || '#7BB3FF';
  const color3 = colors[2] || '#A8D0FF';

  return `
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="waveGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:${color1};stop-opacity:1" />
          <stop offset="50%" style="stop-color:${color2};stop-opacity:1" />
          <stop offset="100%" style="stop-color:${color3};stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="${width}" height="${height}" fill="url(#waveGrad)" opacity="0.1"/>
      <path d="M0,${height * 0.5} Q${width * 0.25},${height * 0.4} ${width * 0.5},${height * 0.5} T${width},${height * 0.5}"
            stroke="${color1}" stroke-width="3" fill="none" opacity="0.6"/>
      <path d="M0,${height * 0.6} Q${width * 0.25},${height * 0.5} ${width * 0.5},${height * 0.6} T${width},${height * 0.6}"
            stroke="${color2}" stroke-width="2" fill="none" opacity="0.4"/>
      <path d="M0,${height * 0.7} Q${width * 0.25},${height * 0.6} ${width * 0.5},${height * 0.7} T${width},${height * 0.7}"
            stroke="${color3}" stroke-width="2" fill="none" opacity="0.3"/>
    </svg>
  `;
}

function createCirclesPattern(colors: string[], width: number, height: number): string {
  const color1 = colors[0] || '#E29D4A';
  const color2 = colors[1] || '#D4A574';
  const color3 = colors[2] || '#C17C74';

  const circles = [];
  for (let i = 0; i < 15; i++) {
    const cx = Math.random() * width;
    const cy = Math.random() * height;
    const r = Math.random() * 40 + 10;
    const color = [color1, color2, color3][i % 3];
    const opacity = Math.random() * 0.3 + 0.1;

    circles.push(`<circle cx="${cx}" cy="${cy}" r="${r}" fill="${color}" opacity="${opacity}"/>`);
  }

  return `
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="circleGrad">
          <stop offset="0%" style="stop-color:${color1};stop-opacity:0.2" />
          <stop offset="100%" style="stop-color:${color2};stop-opacity:0.05" />
        </radialGradient>
      </defs>
      <rect width="${width}" height="${height}" fill="url(#circleGrad)"/>
      ${circles.join('\n      ')}
    </svg>
  `;
}

function createLeavesPattern(colors: string[], width: number, height: number): string {
  const color1 = colors[0] || '#8BC34A';
  const color2 = colors[1] || '#AED581';
  const color3 = colors[2] || '#C5E1A5';

  const leaves = [];
  for (let i = 0; i < 20; i++) {
    const x = Math.random() * width;
    const y = Math.random() * height;
    const rotation = Math.random() * 360;
    const color = [color1, color2, color3][i % 3];
    const scale = Math.random() * 0.5 + 0.5;

    leaves.push(`
      <g transform="translate(${x}, ${y}) rotate(${rotation}) scale(${scale})">
        <path d="M0,0 Q10,-15 15,-5 Q10,0 0,0 Q-5,-10 0,0" fill="${color}" opacity="0.4"/>
      </g>
    `);
  }

  return `
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="${width}" height="${height}" fill="${color3}" opacity="0.05"/>
      ${leaves.join('\n      ')}
    </svg>
  `;
}

function createGeometricPattern(colors: string[], width: number, height: number): string {
  const color1 = colors[0] || '#5C6BC0';
  const color2 = colors[1] || '#7986CB';
  const color3 = colors[2] || '#9FA8DA';

  const gridSize = 40;
  const cols = Math.ceil(width / gridSize);
  const rows = Math.ceil(height / gridSize);

  const shapes = [];
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const x = col * gridSize;
      const y = row * gridSize;
      const color = [color1, color2, color3][(row + col) % 3];
      const opacity = ((row + col) % 3) * 0.1 + 0.1;

      shapes.push(`
        <rect x="${x}" y="${y}" width="${gridSize * 0.8}" height="${gridSize * 0.8}"
              fill="${color}" opacity="${opacity}" rx="4"/>
      `);
    }
  }

  return `
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="${width}" height="${height}" fill="${color3}" opacity="0.05"/>
      ${shapes.join('\n      ')}
    </svg>
  `;
}

function createAbstractPattern(colors: string[], width: number, height: number): string {
  const color1 = colors[0] || '#FF6B6B';
  const color2 = colors[1] || '#4ECDC4';
  const color3 = colors[2] || '#45B7D1';

  const paths = [];
  for (let i = 0; i < 8; i++) {
    const x1 = Math.random() * width;
    const y1 = Math.random() * height;
    const x2 = Math.random() * width;
    const y2 = Math.random() * height;
    const cx = (x1 + x2) / 2 + (Math.random() - 0.5) * width * 0.3;
    const cy = (y1 + y2) / 2 + (Math.random() - 0.5) * height * 0.3;
    const color = [color1, color2, color3][i % 3];

    paths.push(`
      <path d="M${x1},${y1} Q${cx},${cy} ${x2},${y2}"
            stroke="${color}" stroke-width="${Math.random() * 4 + 2}"
            fill="none" opacity="0.3" stroke-linecap="round"/>
    `);
  }

  return `
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="abstractGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:${color1};stop-opacity:0.1" />
          <stop offset="50%" style="stop-color:${color2};stop-opacity:0.1" />
          <stop offset="100%" style="stop-color:${color3};stop-opacity:0.1" />
        </linearGradient>
      </defs>
      <rect width="${width}" height="${height}" fill="url(#abstractGrad)"/>
      ${paths.join('\n      ')}
    </svg>
  `;
}

function createSeasonalPattern(colors: string[], width: number, height: number): string {
  const color1 = colors[0] || '#9C27B0';
  const color2 = colors[1] || '#BA68C8';
  const color3 = colors[2] || '#CE93D8';

  return `
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="seasonalGrad" cx="50%" cy="50%">
          <stop offset="0%" style="stop-color:${color1};stop-opacity:0.3" />
          <stop offset="50%" style="stop-color:${color2};stop-opacity:0.2" />
          <stop offset="100%" style="stop-color:${color3};stop-opacity:0.1" />
        </radialGradient>
      </defs>
      <rect width="${width}" height="${height}" fill="url(#seasonalGrad)"/>
      <circle cx="${width * 0.5}" cy="${height * 0.5}" r="${Math.min(width, height) * 0.3}"
              fill="none" stroke="${color1}" stroke-width="2" opacity="0.4"/>
      <circle cx="${width * 0.5}" cy="${height * 0.5}" r="${Math.min(width, height) * 0.2}"
              fill="none" stroke="${color2}" stroke-width="2" opacity="0.3"/>
      <circle cx="${width * 0.5}" cy="${height * 0.5}" r="${Math.min(width, height) * 0.1}"
              fill="${color3}" opacity="0.5"/>
    </svg>
  `;
}

// Convert SVG string to data URL
export function svgToDataUrl(svg: string): string {
  return `data:image/svg+xml;base64,${btoa(svg)}`;
}

// Generate all graphics for a set of microseasons
export function generateAllMicroseasonGraphics(
  microseasons: Microseason[]
): MicroseasonGraphic[] {
  return microseasons.map(ms => generateMicroseasonGraphic(ms));
}
