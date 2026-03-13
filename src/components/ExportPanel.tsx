import { MarqueeLine, SPEED_MAP, FONT_SIZE_MAP } from '@/types/marquee';
import { useState } from 'react';
import { Copy, Check, X, Code2 } from 'lucide-react';

interface ExportPanelProps {
  lines: MarqueeLine[];
  onClose: () => void;
}

const ExportPanel = ({ lines, onClose }: ExportPanelProps) => {
  const [copied, setCopied] = useState(false);

  const generateHTML = () => {
    const activeLines = lines.filter(l => l.text.trim());
    const styles = activeLines.map(line => {
      const animName = `marquee-${line.direction}`;
      const duration = `${SPEED_MAP[line.speed]}s`;
      const fontSize = FONT_SIZE_MAP[line.fontSize];
      const isNeon = line.textStyle === 'neon';
      const shadow = isNeon ? `text-shadow: 0 0 7px ${line.color}, 0 0 20px ${line.color}80;` : '';
      const weight = line.textStyle === 'bold' ? 'font-weight: 700;' : '';
      const italic = line.textStyle === 'italic' ? 'font-style: italic;' : '';

      return `<div style="overflow:hidden;width:100%;padding:8px 0;">
  <span style="display:inline-block;white-space:nowrap;color:${line.color};font-size:${fontSize};font-family:'Orbitron',sans-serif;animation:${animName} ${duration} linear infinite;${shadow}${weight}${italic}">${line.text}</span>
</div>`;
    }).join('\n');

    return `<style>
@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700&display=swap');
@keyframes marquee-left { 0% { transform: translateX(100%); } 100% { transform: translateX(-100%); } }
@keyframes marquee-right { 0% { transform: translateX(-100%); } 100% { transform: translateX(100%); } }
@keyframes marquee-up { 0% { transform: translateY(100%); } 100% { transform: translateY(-100%); } }
@keyframes marquee-down { 0% { transform: translateY(-100%); } 100% { transform: translateY(100%); } }
</style>
<div style="background:#111;display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:200px;">
${styles}
</div>`;
  };

  const code = generateHTML();

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-2xl mx-4 bg-card border border-border rounded-lg neon-box-glow overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center gap-2 text-primary font-display text-sm tracking-wider">
            <Code2 size={16} />
            Export Embed Code
          </div>
          <button onClick={onClose} className="p-1 rounded hover:bg-muted text-muted-foreground hover:text-foreground transition-colors">
            <X size={16} />
          </button>
        </div>
        <div className="p-4">
          <pre className="bg-background border border-border rounded-md p-4 text-xs font-mono text-foreground overflow-auto max-h-72 whitespace-pre-wrap">
            {code}
          </pre>
        </div>
        <div className="p-4 pt-0 flex justify-end">
          <button
            onClick={handleCopy}
            className="flex items-center gap-2 px-4 py-2 rounded-md bg-primary/10 border border-primary/30 text-primary text-xs font-mono hover:bg-primary/20 transition-colors"
          >
            {copied ? <Check size={14} /> : <Copy size={14} />}
            {copied ? 'Copied!' : 'Copy Code'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExportPanel;
