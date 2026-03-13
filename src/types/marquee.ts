export type MarqueeDirection = 'left' | 'right' | 'up' | 'down';
export type MarqueeSpeed = 'slow' | 'normal' | 'fast' | 'very-fast';
export type TextStyle = 'normal' | 'bold' | 'italic' | 'neon' | 'glitch' | 'outline';
export type FontSize = 'sm' | 'md' | 'lg' | 'xl' | '2xl';

export interface MarqueeLine {
  id: string;
  text: string;
  direction: MarqueeDirection;
  speed: MarqueeSpeed;
  fontSize: FontSize;
  textStyle: TextStyle;
  color: string;
}

export const SPEED_MAP: Record<MarqueeSpeed, number> = {
  slow: 20,
  normal: 8,
  fast: 4,
  'very-fast': 2,
};

export const FONT_SIZE_MAP: Record<FontSize, string> = {
  sm: '1rem',
  md: '1.5rem',
  lg: '2.5rem',
  xl: '4rem',
  '2xl': '6rem',
};

export const PRESET_COLORS = [
  '#00ffff', // cyan
  '#ff00aa', // magenta
  '#aa00ff', // purple
  '#00ff66', // green
  '#ffcc00', // yellow
  '#ff6600', // orange
  '#ffffff', // white
  '#ff0000', // red
];

export function createDefaultLine(): MarqueeLine {
  return {
    id: crypto.randomUUID(),
    text: '',
    direction: 'left',
    speed: 'normal',
    fontSize: 'lg',
    textStyle: 'neon',
    color: '#00ffff',
  };
}
