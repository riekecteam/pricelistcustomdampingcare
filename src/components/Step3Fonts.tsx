import { useState } from 'react';
import { Check, Bold, CaseSensitive } from 'lucide-react';
import { SectionTitle, Card } from './ui';
import { FONTS, type PriceListData } from '../types';

export function Step3Fonts({ data, update }: { data: PriceListData; update: (p: Partial<PriceListData>) => void }) {
  const [category, setCategory] = useState<'Semua' | 'professional' | 'aesthetic'>('Semua');

  const filtered = FONTS.filter(f => category === 'Semua' || f.category === category);

  const font = FONTS.find(f => f.id === data.selectedFont) || FONTS[0];

  return (
    <div className="animate-slide-up max-w-2xl mx-auto pb-24">
      <SectionTitle step="STEP 3" title="Pilih Font" subtitle="Pilih tipografi yang sesuai dengan brand kamu" />

      {/* Live Preview */}
      <Card className="p-6 mb-4 bg-gradient-to-br from-primary-50 to-lavender-50">
        <div className="text-center py-4" style={{ fontFamily: font.cssFamily }}>
          <p
            style={{
              fontSize: `${data.titleSize}px`,
              letterSpacing: `${data.letterSpacing}px`,
              lineHeight: data.lineHeight,
              fontWeight: data.bold ? 700 : 400,
              textTransform: data.uppercase ? 'uppercase' : 'none',
            }}
            className="text-text-primary mb-2"
          >
            {data.title || 'PRICE LIST'}
          </p>
          <p
            style={{
              fontSize: `${data.contentSize}px`,
              letterSpacing: `${data.letterSpacing}px`,
              lineHeight: data.lineHeight,
              fontWeight: data.bold ? 500 : 400,
            }}
            className="text-text-secondary"
          >
            {data.subtitle || 'Premium Quality'}
          </p>
        </div>
      </Card>

      {/* Settings */}
      <Card className="p-5 mb-4 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">Ukuran Judul: {data.titleSize}px</label>
            <input type="range" min="24" max="80" value={data.titleSize} onChange={e => update({ titleSize: +e.target.value })} className="w-full" />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">Ukuran Isi: {data.contentSize}px</label>
            <input type="range" min="10" max="32" value={data.contentSize} onChange={e => update({ contentSize: +e.target.value })} className="w-full" />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">Letter Spacing: {data.letterSpacing}px</label>
            <input type="range" min="-2" max="10" value={data.letterSpacing} onChange={e => update({ letterSpacing: +e.target.value })} className="w-full" />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">Line Height: {data.lineHeight.toFixed(1)}</label>
            <input type="range" min="1" max="2.5" step="0.1" value={data.lineHeight} onChange={e => update({ lineHeight: +e.target.value })} className="w-full" />
          </div>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => update({ bold: !data.bold })}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl font-medium transition-all duration-200 ${data.bold ? 'bg-primary text-white shadow-pink' : 'bg-lavender-50 text-text-secondary border border-[#F2E8F8]'}`}
          >
            <Bold className="w-4 h-4" /> Bold
          </button>
          <button
            onClick={() => update({ uppercase: !data.uppercase })}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl font-medium transition-all duration-200 ${data.uppercase ? 'bg-primary text-white shadow-pink' : 'bg-lavender-50 text-text-secondary border border-[#F2E8F8]'}`}
          >
            <CaseSensitive className="w-4 h-4" /> Kapital
          </button>
        </div>
      </Card>

      {/* Category Filter */}
      <div className="flex gap-2 mb-4">
        {(['Semua', 'professional', 'aesthetic'] as const).map(cat => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${category === cat ? 'bg-gradient-to-r from-primary to-primary-light text-white shadow-pink' : 'bg-white text-text-secondary border border-[#F2E8F8] hover:border-primary'}`}
          >
            {cat === 'Semua' ? 'Semua' : cat === 'professional' ? 'Professional' : 'Aesthetic'}
          </button>
        ))}
      </div>

      {/* Font Grid */}
      <div className="grid grid-cols-2 gap-3">
        {filtered.map(f => {
          const selected = data.selectedFont === f.id;
          return (
            <button
              key={f.id}
              onClick={() => update({ selectedFont: f.id })}
              className={`relative p-4 rounded-2xl bg-white border-2 transition-all duration-200 hover:scale-[1.02] text-left ${selected ? 'border-primary shadow-pink' : 'border-[#F2E8F8] shadow-soft'}`}
            >
              {selected && (
                <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-primary flex items-center justify-center animate-scale-in">
                  <Check className="w-3 h-3 text-white" strokeWidth={3} />
                </div>
              )}
              <p className="text-lg text-text-primary mb-1" style={{ fontFamily: f.cssFamily }}>PRICE LIST</p>
              <p className="text-xs text-text-secondary" style={{ fontFamily: f.cssFamily }}>{f.name}</p>
              <span className={`inline-block mt-2 text-[10px] px-2 py-0.5 rounded-full ${f.category === 'professional' ? 'bg-blue-50 text-blue-500' : 'bg-pink-50 text-primary'}`}>
                {f.category === 'professional' ? 'Professional' : 'Aesthetic'}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
