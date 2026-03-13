import { MarqueeLine, createDefaultLine } from '@/types/marquee';

export function encodeLinesToParams(lines: MarqueeLine[]): string {
  const data = lines.map(l => ({
    t: l.text,
    d: l.direction,
    s: l.speed,
    f: l.fontSize,
    ts: l.textStyle,
    c: l.color,
  }));
  return btoa(encodeURIComponent(JSON.stringify(data)));
}

export function decodeParamsToLines(encoded: string): MarqueeLine[] | null {
  try {
    const json = JSON.parse(decodeURIComponent(atob(encoded)));
    if (!Array.isArray(json) || json.length === 0) return null;
    return json.map((item: any) => ({
      id: crypto.randomUUID(),
      text: item.t ?? '',
      direction: item.d ?? 'left',
      speed: item.s ?? 'normal',
      fontSize: item.f ?? 'lg',
      textStyle: item.ts ?? 'neon',
      color: item.c ?? '#00ffff',
    }));
  } catch {
    return null;
  }
}
