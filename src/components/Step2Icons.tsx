import { useState } from 'react';
import * as Icons from 'lucide-react';
import { Search, Check } from 'lucide-react';
import { SectionTitle, Card } from './ui';
import { ICONS, ICON_CATEGORIES, type PriceListData } from '../types';

export function Step2Icons({ data, update }: { data: PriceListData; update: (p: Partial<PriceListData>) => void }) {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('Semua');

  const filtered = ICONS.filter(icon => {
    const matchCat = category === 'Semua' || icon.category === category;
    const matchSearch = !search || icon.label.toLowerCase().includes(search.toLowerCase()) || icon.name.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="animate-slide-up max-w-2xl mx-auto pb-24">
      <SectionTitle step="STEP 2" title="Pilih Ikon" subtitle="Pilih ikon yang sesuai dengan layanan kamu" />

      {/* Search */}
      <div className="relative mb-4">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary" />
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Cari ikon..."
          className="w-full pl-12 pr-4 py-3 rounded-2xl bg-white border border-[#F2E8F8] text-text-primary placeholder:text-text-secondary/50 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200 shadow-soft"
        />
      </div>

      {/* Category Filter */}
      <div className="flex gap-2 mb-4 overflow-x-auto scrollbar-hide pb-1">
        {ICON_CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 ${category === cat ? 'bg-gradient-to-r from-primary to-primary-light text-white shadow-pink' : 'bg-white text-text-secondary border border-[#F2E8F8] hover:border-primary'}`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Icon Grid */}
      <Card className="p-4">
        {filtered.length === 0 ? (
          <div className="py-12 text-center text-text-secondary">
            <p className="text-sm">Ikon tidak ditemukan</p>
          </div>
        ) : (
          <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-8 gap-3">
            {filtered.map(icon => {
              const IconComp = (Icons as unknown as Record<string, React.ComponentType<{ className?: string; strokeWidth?: number }> | undefined>)[icon.name];
              const selected = data.selectedIcon === icon.name;
              return (
                <button
                  key={icon.name}
                  onClick={() => update({ selectedIcon: icon.name })}
                  className={`relative aspect-square rounded-2xl bg-white border-2 flex flex-col items-center justify-center gap-1 transition-all duration-200 hover:scale-105 ${selected ? 'border-primary bg-primary-50 shadow-pink' : 'border-[#F2E8F8] shadow-soft'}`}
                >
                  {selected && (
                    <div className="absolute top-1 right-1 w-5 h-5 rounded-full bg-primary flex items-center justify-center animate-scale-in">
                      <Check className="w-3 h-3 text-white" strokeWidth={3} />
                    </div>
                  )}
                  {IconComp ? (
                    <IconComp className={`w-6 h-6 ${selected ? 'text-primary' : 'text-text-secondary'}`} strokeWidth={1.8} />
                  ) : (
                    <div className="w-6 h-6 rounded bg-lavender-100" />
                  )}
                  <span className={`text-[9px] leading-tight text-center px-1 ${selected ? 'text-primary font-semibold' : 'text-text-secondary'}`}>{icon.label}</span>
                </button>
              );
            })}
          </div>
        )}
      </Card>
    </div>
  );
}
