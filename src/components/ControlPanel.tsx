import { MarqueeLine, MarqueeDirection, MarqueeSpeed, FontSize, TextStyle, PRESET_COLORS, createDefaultLine } from '@/types/marquee';
import { Plus, Trash2, Copy, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

interface ControlPanelProps {
  lines: MarqueeLine[];
  onChange: (lines: MarqueeLine[]) => void;
}

const ControlPanel = ({ lines, onChange }: ControlPanelProps) => {
  const [expandedId, setExpandedId] = useState<string | null>(lines[0]?.id ?? null);

  const updateLine = (id: string, updates: Partial<MarqueeLine>) => {
    onChange(lines.map(l => l.id === id ? { ...l, ...updates } : l));
  };

  const addLine = () => {
    const newLine = createDefaultLine();
    onChange([...lines, newLine]);
    setExpandedId(newLine.id);
  };

  const removeLine = (id: string) => {
    const updated = lines.filter(l => l.id !== id);
    onChange(updated);
    if (expandedId === id) setExpandedId(updated[0]?.id ?? null);
  };

  const duplicateLine = (line: MarqueeLine) => {
    const dup = { ...line, id: crypto.randomUUID() };
    onChange([...lines, dup]);
    setExpandedId(dup.id);
  };

  return (
    <div className="h-full flex flex-col bg-card border-r border-border overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-border flex items-center justify-between shrink-0">
        <h1 className="font-display text-primary text-sm tracking-[0.3em] uppercase neon-glow-cyan">
          Go Marquee
        </h1>
        <button
          onClick={addLine}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-primary/10 border border-primary/30 text-primary text-xs font-mono hover:bg-primary/20 transition-colors"
        >
          <Plus size={14} />
          Add Line
        </button>
      </div>

      {/* Lines */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {lines.map((line, idx) => {
          const isExpanded = expandedId === line.id;
          return (
            <div key={line.id} className="rounded-lg border border-border bg-muted/30 neon-box-glow overflow-hidden">
              {/* Line header */}
              <button
                onClick={() => setExpandedId(isExpanded ? null : line.id)}
                className="w-full flex items-center justify-between p-3 text-left hover:bg-muted/50 transition-colors"
              >
                <span className="text-xs font-mono text-muted-foreground">
                  <span className="text-primary">#{idx + 1}</span>{' '}
                  {line.text.slice(0, 25) || 'Empty line...'}
                </span>
                <div className="flex items-center gap-1">
                  <button
                    onClick={(e) => { e.stopPropagation(); duplicateLine(line); }}
                    className="p-1 rounded hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Copy size={12} />
                  </button>
                  {lines.length > 1 && (
                    <button
                      onClick={(e) => { e.stopPropagation(); removeLine(line.id); }}
                      className="p-1 rounded hover:bg-destructive/20 text-muted-foreground hover:text-destructive transition-colors"
                    >
                      <Trash2 size={12} />
                    </button>
                  )}
                  {isExpanded ? <ChevronUp size={14} className="text-primary" /> : <ChevronDown size={14} className="text-muted-foreground" />}
                </div>
              </button>

              {/* Expanded controls */}
              {isExpanded && (
                <div className="p-3 pt-0 space-y-4 animate-fade-in">
                  {/* Text input */}
                  <div>
                    <label className="block text-[10px] font-mono text-muted-foreground uppercase tracking-wider mb-1.5">Message</label>
                    <textarea
                      value={line.text}
                      onChange={(e) => updateLine(line.id, { text: e.target.value.slice(0, 500) })}
                      placeholder="Type your message..."
                      className="w-full bg-background border border-border rounded-md px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 resize-none font-mono transition-colors"
                      rows={2}
                    />
                    <span className="text-[10px] text-muted-foreground font-mono">{line.text.length}/500</span>
                  </div>

                  {/* Direction & Speed */}
                  <div className="grid grid-cols-2 gap-3">
                    <SelectField
                      label="Direction"
                      value={line.direction}
                      onChange={(v) => updateLine(line.id, { direction: v as MarqueeDirection })}
                      options={[
                        { value: 'left', label: '← Left' },
                        { value: 'right', label: '→ Right' },
                        { value: 'up', label: '↑ Up' },
                        { value: 'down', label: '↓ Down' },
                      ]}
                    />
                    <SelectField
                      label="Speed"
                      value={line.speed}
                      onChange={(v) => updateLine(line.id, { speed: v as MarqueeSpeed })}
                      options={[
                        { value: 'slow', label: '🐢 Slow' },
                        { value: 'normal', label: '🚶 Normal' },
                        { value: 'fast', label: '🐇 Fast' },
                        { value: 'very-fast', label: '🐆 V.Fast' },
                      ]}
                    />
                  </div>

                  {/* Font Size & Style */}
                  <div className="grid grid-cols-2 gap-3">
                    <SelectField
                      label="Size"
                      value={line.fontSize}
                      onChange={(v) => updateLine(line.id, { fontSize: v as FontSize })}
                      options={[
                        { value: 'sm', label: 'Small' },
                        { value: 'md', label: 'Medium' },
                        { value: 'lg', label: 'Large' },
                        { value: 'xl', label: 'X-Large' },
                        { value: '2xl', label: '2X-Large' },
                      ]}
                    />
                    <SelectField
                      label="Style"
                      value={line.textStyle}
                      onChange={(v) => updateLine(line.id, { textStyle: v as TextStyle })}
                      options={[
                        { value: 'normal', label: 'Normal' },
                        { value: 'bold', label: 'Bold' },
                        { value: 'italic', label: 'Italic' },
                        { value: 'neon', label: '✦ Neon' },
                        { value: 'glitch', label: '⚡ Glitch' },
                        { value: 'outline', label: '◇ Outline' },
                      ]}
                    />
                  </div>

                  {/* Color */}
                  <div>
                    <label className="block text-[10px] font-mono text-muted-foreground uppercase tracking-wider mb-1.5">Color</label>
                    <div className="flex items-center gap-2 flex-wrap">
                      {PRESET_COLORS.map(c => (
                        <button
                          key={c}
                          onClick={() => updateLine(line.id, { color: c })}
                          className={`w-7 h-7 rounded-md border-2 transition-all ${line.color === c ? 'border-primary scale-110 shadow-[0_0_8px_var(--neon-cyan)]' : 'border-border hover:border-muted-foreground'}`}
                          style={{ backgroundColor: c }}
                        />
                      ))}
                      <div className="relative">
                        <input
                          type="color"
                          value={line.color}
                          onChange={(e) => updateLine(line.id, { color: e.target.value })}
                          className="w-7 h-7 rounded-md border-2 border-border cursor-pointer bg-transparent"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

function SelectField({ label, value, onChange, options }: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <div>
      <label className="block text-[10px] font-mono text-muted-foreground uppercase tracking-wider mb-1.5">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-background border border-border rounded-md px-2.5 py-1.5 text-xs font-mono text-foreground focus:outline-none focus:border-primary/50 transition-colors appearance-none cursor-pointer"
      >
        {options.map(o => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
    </div>
  );
}

export default ControlPanel;
