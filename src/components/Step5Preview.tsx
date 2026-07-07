import { useState, useRef, useEffect } from 'react';
import { ZoomIn, ZoomOut, Download, FileText, Edit, RotateCcw, Maximize2 } from 'lucide-react';
import { SectionTitle, Button } from './ui';
import { DESIGN_SIZES, type DesignSize, type PriceListData } from '../types';
import { TemplateRenderer } from './TemplateRenderer';
import { useToast } from '../toast';

export function Step5Preview({ data, update, onEdit, onNew, onReset }: { data: PriceListData; update: (p: Partial<PriceListData>) => void; onEdit: () => void; onNew: () => void; onReset: () => void }) {
  const toast = useToast();
  const [zoom, setZoom] = useState(1);
  const [loading, setLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const size = DESIGN_SIZES.find(s => s.id === data.designSize) || DESIGN_SIZES[0];

  useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => setLoading(false), 400);
    return () => clearTimeout(t);
  }, [data.designSize, data.selectedTemplate]);

  const fitWidth = () => {
    if (!containerRef.current) return;
    const cw = containerRef.current.clientWidth - 32;
    setZoom(cw / size.w);
  };

  useEffect(() => {
    fitWidth();
    const handler = () => fitWidth();
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, [size.w]);

  const downloadPNG = async () => {
    toast('Membuat PNG HD...', 'info');
    try {
      const { exportPNG } = await import('./exporter');
      await exportPNG(data, size.w, size.h, `${data.businessName || 'price-list'}.png`);
      toast('PNG HD berhasil diunduh!');
    } catch (e) {
      toast('Gagal mengunduh PNG', 'error');
    }
  };

  const downloadPDF = async () => {
    toast('Membuat PDF...', 'info');
    try {
      const { exportPDF } = await import('./exporter');
      await exportPDF(data, size.w, size.h, `${data.businessName || 'price-list'}.pdf`);
      toast('PDF berhasil diunduh!');
    } catch (e) {
      toast('Gagal mengunduh PDF', 'error');
    }
  };

  return (
    <div className="animate-slide-up max-w-4xl mx-auto pb-24">
      <SectionTitle step="STEP 5 & 6" title="Preview & Download" subtitle="Cek hasil akhir dan unduh desain kamu" />

      {/* Size Mode Selector */}
      <div className="flex gap-2 mb-4 overflow-x-auto scrollbar-hide">
        {DESIGN_SIZES.map(s => (
          <button
            key={s.id}
            onClick={() => update({ designSize: s.id as DesignSize })}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 ${data.designSize === s.id ? 'bg-gradient-to-r from-primary to-primary-light text-white shadow-pink' : 'bg-white text-text-secondary border border-[#F2E8F8]'}`}
          >
            {s.label}
          </button>
        ))}
      </div>

      {/* Preview Area */}
      <div className="relative bg-white rounded-3xl shadow-card border border-[#F2E8F8] p-4 mb-4 overflow-hidden">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs text-text-secondary bg-lavender-50 px-3 py-1 rounded-full">{size.label} · {size.w}×{size.h}px</span>
          <div className="flex items-center gap-2">
            <button onClick={() => setZoom(z => Math.max(0.2, z - 0.1))} className="p-2 rounded-xl bg-lavender-50 hover:bg-lavender-100 transition-colors">
              <ZoomOut className="w-4 h-4 text-text-secondary" />
            </button>
            <span className="text-xs text-text-secondary w-12 text-center">{Math.round(zoom * 100)}%</span>
            <button onClick={() => setZoom(z => Math.min(2, z + 0.1))} className="p-2 rounded-xl bg-lavender-50 hover:bg-lavender-100 transition-colors">
              <ZoomIn className="w-4 h-4 text-text-secondary" />
            </button>
            <button onClick={fitWidth} className="p-2 rounded-xl bg-lavender-50 hover:bg-lavender-100 transition-colors" title="Fit">
              <Maximize2 className="w-4 h-4 text-text-secondary" />
            </button>
          </div>
        </div>

        <div ref={containerRef} className="overflow-auto scrollbar-soft flex justify-center items-start" style={{ maxHeight: '70vh' }}>
          {loading ? (
            <div className="skeleton rounded-2xl" style={{ width: size.w * zoom, height: size.h * zoom }} />
          ) : (
            <div
              style={{ width: size.w * zoom, height: size.h * zoom, flexShrink: 0 }}
              className="rounded-2xl overflow-hidden shadow-card"
            >
              <div style={{ transform: `scale(${zoom})`, transformOrigin: 'top left', width: size.w, height: size.h }}>
                <TemplateRenderer data={data} template={data.selectedTemplate} width={size.w} height={size.h} />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Download Buttons */}
      <div className="grid grid-cols-2 gap-3 mb-3">
        <Button onClick={downloadPNG} size="lg" className="flex items-center justify-center gap-2">
          <Download className="w-5 h-5" /> Download PNG HD
        </Button>
        <Button onClick={downloadPDF} variant="secondary" size="lg" className="flex items-center justify-center gap-2">
          <FileText className="w-5 h-5" /> Download PDF
        </Button>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <Button onClick={onEdit} variant="outline" size="md" className="flex items-center justify-center gap-2">
          <Edit className="w-4 h-4" /> Edit Lagi
        </Button>
        <Button onClick={() => { onNew(); onReset(); }} variant="ghost" size="md" className="flex items-center justify-center gap-2">
          <RotateCcw className="w-4 h-4" /> Buat Desain Baru
        </Button>
      </div>
    </div>
  );
}
