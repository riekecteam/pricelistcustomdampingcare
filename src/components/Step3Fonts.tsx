import { useState } from 'react';
import { Check, Bold, CaseSensitive } from 'lucide-react';
import { SectionTitle, Card } from './ui';
import { FONTS, type PriceListData } from '../types';

export function Step3Fonts({ data, update }: { data: PriceListData; update: (p: Partial<PriceListData>) => void }) {
  const [category, setCategory] = useState<'Semua' | 'professional' | 'aesthetic'>('Semua');

  const filtered = FONTS.filter(f => category === 'Semua' || f.category === category);

function SizeControl({ label, value, min, max, step = 1, unit, onChange }: { label: string; value: number; min: number; max: number; step?: number; unit: string; onChange: (v: number) => void }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <label className="text-sm font-medium text-text-primary">{label}</label>
        <div className="flex items-center gap-1.5">
          <input
            type="number"
            value={value}
            min={min}
            max={max}
            step={step}
            onChange={e => {
              const v = +e.target.value;
              if (!isNaN(v)) onChange(Math.min(max, Math.max(min, v)));
            }}
            className="w-16 px-2 py-1 rounded-lg bg-lavender-50 border border-[#F2E8F8] text-sm font-semibold text-primary text-center focus:outline-none focus:border-primary"
          />
          <span className="text-xs text-text-secondary font-medium w-6">{unit}</span>
        </div>
      </div>
      <input type="range" min={min} max={max} step={step} value={value} onChange={e => onChange(+e.target.value)} className="w-full" />
      <div className="flex justify-between mt-1">
        <span className="text-[10px] text-text-secondary/60">{min}{unit}</span>
        <span className="text-[10px] text-text-secondary/60">{max}{unit}</span>
      </div>
    </div>
  );
}

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
              color: data.titleColor,
            }}
            className="mb-2"
          >
            {data.title || 'PRICE LIST'}
          </p>
          <p
            style={{
              fontSize: `${data.contentSize}px`,
              letterSpacing: `${data.letterSpacing}px`,
              lineHeight: data.lineHeight,
              fontWeight: data.bold ? 500 : 400,
              color: data.contentColor,
            }}
          >
            {data.subtitle || 'Premium Quality'}
          </p>
        </div>
      </Card>

      {/* Settings */}
      <Card className="p-5 mb-4 space-y-5">
        <div className="space-y-4">
          <SizeControl label="Ukuran Judul" value={data.titleSize} min={20} max={100} unit="px" onChange={v => update({ titleSize: v })} />
          <SizeControl label="Ukuran Isi Layanan" value={data.contentSize} min={10} max={40} unit="px" onChange={v => update({ contentSize: v })} />
          <SizeControl label="Ukuran Harga" value={data.priceSize} min={12} max={48} unit="px" onChange={v => update({ priceSize: v })} />
          <SizeControl label="Letter Spacing" value={data.letterSpacing} min={-2} max={10} unit="px" onChange={v => update({ letterSpacing: v })} />
          <SizeControl label="Line Height" value={data.lineHeight} min={1} max={2.5} step={0.1} unit="" onChange={v => update({ lineHeight: v })} />
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

      {/* Color Pickers */}
      <Card className="p-5 mb-4">
        <label className="block text-sm font-medium text-text-primary mb-3">Warna Font</label>
        <div className="grid grid-cols-3 gap-3">
          <div>
            <label className="block text-xs text-text-secondary mb-2">Judul</label>
            <div className="flex items-center gap-2">
              <input type="color" value={data.titleColor} onChange={e => update({ titleColor: e.target.value })} className="w-10 h-10 rounded-xl border border-[#F2E8F8] cursor-pointer" />
              <span className="text-xs font-mono text-text-secondary">{data.titleColor}</span>
            </div>
          </div>
          <div>
            <label className="block text-xs text-text-secondary mb-2">Isi</label>
            <div className="flex items-center gap-2">
              <input type="color" value={data.contentColor} onChange={e => update({ contentColor: e.target.value })} className="w-10 h-10 rounded-xl border border-[#F2E8F8] cursor-pointer" />
              <span className="text-xs font-mono text-text-secondary">{data.contentColor}</span>
            </div>
          </div>
          <div>
            <label className="block text-xs text-text-secondary mb-2">Harga</label>
            <div className="flex items-center gap-2">
              <input type="color" value={data.priceColor} onChange={e => update({ priceColor: e.target.value })} className="w-10 h-10 rounded-xl border border-[#F2E8F8] cursor-pointer" />
              <span className="text-xs font-mono text-text-secondary">{data.priceColor}</span>
            </div>
          </div>
        </div>
        <div className="flex gap-2 mt-3">
          {['#222222', '#FB5EA8', '#CBB8FF', '#4CAF50', '#FFFFFF', '#1a1a1a'].map(c => (
            <button key={c} onClick={() => update({ titleColor: c, contentColor: c === '#FFFFFF' ? '#666666' : c })} className="w-8 h-8 rounded-full border-2 border-white shadow-soft" style={{ background: c }} />
          ))}
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
