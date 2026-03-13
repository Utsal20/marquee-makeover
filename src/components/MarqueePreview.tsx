import { MarqueeLine, SPEED_MAP, FONT_SIZE_MAP } from '@/types/marquee';

interface MarqueePreviewProps {
  lines: MarqueeLine[];
}

const MarqueePreview = ({ lines }: MarqueePreviewProps) => {
  const activeLines = lines.filter(l => l.text.trim());

  return (
    <div className="relative h-full w-full overflow-hidden bg-background cyber-grid scanlines flex flex-col items-center justify-center">
      {activeLines.length === 0 && (
        <div className="text-muted-foreground font-display text-lg tracking-widest uppercase opacity-40 animate-fade-in">
          [ Awaiting Input... ]
        </div>
      )}
      {activeLines.map((line) => {
        const isHorizontal = line.direction === 'left' || line.direction === 'right';
        const animName = `marquee-${line.direction}`;
        const duration = `${SPEED_MAP[line.speed]}s`;
        const fontSize = FONT_SIZE_MAP[line.fontSize];

        const textStyle: React.CSSProperties = {
          color: line.color,
          fontSize,
          fontWeight: line.textStyle === 'bold' ? 700 : 400,
          fontStyle: line.textStyle === 'italic' ? 'italic' : 'normal',
          whiteSpace: 'nowrap',
          animation: `${animName} ${duration} linear infinite`,
          textShadow: line.textStyle === 'neon'
            ? `0 0 7px ${line.color}, 0 0 20px ${line.color}80, 0 0 40px ${line.color}50`
            : line.textStyle === 'outline'
            ? `0 0 2px ${line.color}, -1px -1px 0 ${line.color}, 1px -1px 0 ${line.color}, -1px 1px 0 ${line.color}, 1px 1px 0 ${line.color}`
            : undefined,
          WebkitTextStroke: line.textStyle === 'outline' ? `1px ${line.color}` : undefined,
        };

        if (line.textStyle === 'outline') {
          textStyle.color = 'transparent';
        }

        if (line.textStyle === 'glitch') {
          textStyle.animation += `, flicker 3s linear infinite`;
        }

        return (
          <div
            key={line.id}
            className={`${isHorizontal ? 'w-full' : 'h-full'} flex ${isHorizontal ? 'flex-row' : 'flex-col'} items-center overflow-hidden py-2`}
          >
            <span
              className="font-display tracking-wider"
              style={textStyle}
            >
              {line.text}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default MarqueePreview;
