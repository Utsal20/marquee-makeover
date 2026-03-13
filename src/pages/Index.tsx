import { useState } from 'react';
import { MarqueeLine, createDefaultLine } from '@/types/marquee';
import ControlPanel from '@/components/ControlPanel';
import MarqueePreview from '@/components/MarqueePreview';
import ExportPanel from '@/components/ExportPanel';
import { Code2, Maximize2, Minimize2 } from 'lucide-react';

const Index = () => {
  const [lines, setLines] = useState<MarqueeLine[]>([createDefaultLine()]);
  const [showExport, setShowExport] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);

  return (
    <div className="h-screen w-screen flex overflow-hidden bg-background">
      {/* Control Panel - Left */}
      {!fullscreen && (
        <div className="w-[380px] shrink-0 h-full">
          <ControlPanel lines={lines} onChange={setLines} />
        </div>
      )}

      {/* Preview - Right */}
      <div className="flex-1 flex flex-col h-full relative">
        {/* Toolbar */}
        <div className="flex items-center justify-between px-4 py-2 border-b border-border bg-card/50 backdrop-blur-sm shrink-0">
          <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">
            Live Preview
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowExport(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-accent/10 border border-accent/30 text-accent text-xs font-mono hover:bg-accent/20 transition-colors"
            >
              <Code2 size={13} />
              Export
            </button>
            <button
              onClick={() => setFullscreen(f => !f)}
              className="p-1.5 rounded-md border border-border text-muted-foreground hover:text-foreground hover:border-primary/30 transition-colors"
            >
              {fullscreen ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
            </button>
          </div>
        </div>

        {/* Preview Area */}
        <div className="flex-1 relative">
          <MarqueePreview lines={lines} />
        </div>
      </div>

      {/* Export Modal */}
      {showExport && <ExportPanel lines={lines} onClose={() => setShowExport(false)} />}
    </div>
  );
};

export default Index;
