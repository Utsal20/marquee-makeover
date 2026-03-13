import { useState } from 'react';
import { MarqueeLine, createDefaultLine } from '@/types/marquee';
import ControlPanel from '@/components/ControlPanel';
import MarqueePreview from '@/components/MarqueePreview';
import ExportPanel from '@/components/ExportPanel';
import { Code2, Maximize2, Minimize2, Settings2, X } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const Index = () => {
  const [lines, setLines] = useState<MarqueeLine[]>([createDefaultLine()]);
  const [showExport, setShowExport] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const isMobile = useIsMobile();

  return (
    <div className="h-screen w-screen flex overflow-hidden bg-background">
      {/* Desktop Control Panel - Left */}
      {!fullscreen && !isMobile && (
        <div className="w-[380px] shrink-0 h-full">
          <ControlPanel lines={lines} onChange={setLines} />
        </div>
      )}

      {/* Mobile Drawer Overlay */}
      {isMobile && drawerOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div
            className="absolute inset-0 bg-background/60 backdrop-blur-sm"
            onClick={() => setDrawerOpen(false)}
          />
          <div className="relative z-10 w-[85vw] max-w-[380px] h-full animate-slide-in-left">
            <ControlPanel lines={lines} onChange={setLines} />
            <button
              onClick={() => setDrawerOpen(false)}
              className="absolute top-3 right-3 p-1.5 rounded-md bg-muted text-muted-foreground hover:text-foreground transition-colors z-20"
            >
              <X size={16} />
            </button>
          </div>
        </div>
      )}

      {/* Preview - Right */}
      <div className="flex-1 flex flex-col h-full relative">
        {/* Toolbar */}
        <div className="flex items-center justify-between px-4 py-2 border-b border-border bg-card/50 backdrop-blur-sm shrink-0">
          <div className="flex items-center gap-2">
            {isMobile && !fullscreen && (
              <button
                onClick={() => setDrawerOpen(true)}
                className="p-1.5 rounded-md border border-primary/30 text-primary hover:bg-primary/10 transition-colors"
              >
                <Settings2 size={16} />
              </button>
            )}
            <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">
              Live Preview
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowExport(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-accent/10 border border-accent/30 text-accent text-xs font-mono hover:bg-accent/20 transition-colors"
            >
              <Code2 size={13} />
              <span className="hidden sm:inline">Export</span>
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
