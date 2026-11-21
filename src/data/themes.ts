import type { ThemeId } from '../types';

export interface ThemeDefinition {
  id: ThemeId;
  name: string;
  bgMain: string;
  accentHex: string;
  swatches: {
    topLeft: string;
    topRight: string;
    bottom: [string, string, string];
  };
}

export const THEMES: ThemeDefinition[] = [
  {
    id: 'emerald',
    name: 'Emerald',
    bgMain: '#090a0f',
    accentHex: '#10b981',
    swatches: {
      topLeft: '#182433',
      topRight: '#10b981',
      bottom: ['#0d4a3a', '#143d4d', '#3b2f16'],
    },
  },
  {
    id: 'zedlime',
    name: 'ZedLime',
    bgMain: '#0e0c16',
    accentHex: '#c8f64b',
    swatches: {
      topLeft: '#311b6e',
      topRight: '#c8f64b',
      bottom: ['#11403a', '#4c1d3d', '#172e52'],
    },
  },
  {
    id: 'accent',
    name: 'Accent',
    bgMain: '#0c0d17',
    accentHex: '#dfd8ff',
    swatches: {
      topLeft: '#4328b8',
      topRight: '#dfd8ff',
      bottom: ['#4a4818', '#124a32', '#592145'],
    },
  },
  {
    id: 'pastel',
    name: 'Pastel',
    bgMain: '#101018',
    accentHex: '#a5e1c3',
    swatches: {
      topLeft: '#36337a',
      topRight: '#dcd6ff',
      bottom: ['#d4d094', '#a5e1c3', '#f3b8ce'],
    },
  },
];

export const applyThemeToDocument = (themeId: ThemeId) => {
  const def = THEMES.find((t) => t.id === themeId) ?? THEMES[0];
  document.documentElement.setAttribute('data-theme', def.id);
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) {
    meta.setAttribute('content', def.bgMain);
  }
};
