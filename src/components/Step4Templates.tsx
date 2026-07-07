import { useState } from 'react';
import { Check } from 'lucide-react';
import { SectionTitle } from './ui';
import { TEMPLATES, DESIGN_SIZES, type PriceListData } from '../types';
import { TemplateRenderer } from './TemplateRenderer';

export function Step4Templates({ data, update }: { data: PriceListData; update: (p: Partial<PriceListData>) => void }) {
  const [loading, setLoading] = useState(true);
  const size = DESIGN_SIZES.find(s => s.id === data.designSize) || DESIGN_SIZES[0];
  const previewW = 160;

  setTimeout(() => setLoading(false), 300);

  return (
    <div className="animate-slide-up max-w-4xl mx-auto pb-24">
      <SectionTitle step="STEP 4" title="Pilih Template" subtitle="20 template aesthetic siap pakai, ganti kapan saja" />

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {TEMPLATES.map((name, i) => {
          const selected = data.selectedTemplate === i;
          return (
            <button
              key={i}
              onClick={() => update({ selectedTemplate: i })}
              className={`relative rounded-2xl overflow-hidden border-2 transition-all duration-200 hover:scale-[1.02] ${selected ? 'border-primary shadow-pink-lg' : 'border-[#F2E8F8] shadow-soft'}`}
            >
              {selected && (
                <div className="absolute top-2 right-2 z-10 w-6 h-6 rounded-full bg-primary flex items-center justify-center animate-scale-in">
                  <Check className="w-4 h-4 text-white" strokeWidth={3} />
                </div>
              )}
              <div className="bg-white" style={{ width: '100%', aspectRatio: `${size.w}/${size.h}` }}>
                {loading ? (
                  <div className="w-full h-full skeleton" />
                ) : (
                  <div style={{ transform: `scale(${previewW / size.w})`, transformOrigin: 'top left', width: size.w, height: size.h }}>
                    <TemplateRenderer data={data} template={i} width={size.w} height={size.h} />
                  </div>
                )}
              </div>
              <div className="px-3 py-2 bg-white">
                <p className={`text-xs font-semibold ${selected ? 'text-primary' : 'text-text-primary'}`}>{i + 1}. {name}</p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
