import { useRef, useState } from 'react';
import { Upload, Plus, Trash2, GripVertical, X, Image as ImageIcon, FileText } from 'lucide-react';
import { Input, TextArea, SectionTitle, Card } from './ui';
import { DESIGN_SIZES, type DesignSize, type PriceListData, type Service } from '../types';
import { useToast } from '../toast';

export function Step1Form({ data, update }: { data: PriceListData; update: (p: Partial<PriceListData>) => void }) {
  const toast = useToast();
  const fileRef = useRef<HTMLInputElement>(null);
  const [dragId, setDragId] = useState<string | null>(null);
  const [dragOverId, setDragOverId] = useState<string | null>(null);

  const handleLogo = (file: File) => {
    if (!file.type.match(/image\/(png|jpg|jpeg|webp)/)) {
      toast('Format file harus PNG, JPG, atau WEBP', 'error');
      return;
    }
    const reader = new FileReader();
    reader.onload = e => {
      update({ logo: e.target?.result as string, logoName: file.name });
      toast('Logo berhasil diunggah');
    };
    reader.readAsDataURL(file);
  };

  const addService = () => {
    const newSvc: Service = { id: Date.now().toString(), name: '', price: '', description: '' };
    update({ services: [...data.services, newSvc] });
  };

  const updateService = (id: string, patch: Partial<Service>) => {
    update({ services: data.services.map(s => (s.id === id ? { ...s, ...patch } : s)) });
  };

  const removeService = (id: string) => {
    if (data.services.length <= 1) {
      toast('Minimal harus ada 1 layanan', 'error');
      return;
    }
    update({ services: data.services.filter(s => s.id !== id) });
  };

  const onDragStart = (id: string) => setDragId(id);
  const onDragOver = (e: React.DragEvent, id: string) => {
    e.preventDefault();
    setDragOverId(id);
  };
  const onDrop = (id: string) => {
    if (!dragId || dragId === id) return;
    const items = [...data.services];
    const from = items.findIndex(s => s.id === dragId);
    const to = items.findIndex(s => s.id === id);
    const [moved] = items.splice(from, 1);
    items.splice(to, 0, moved);
    update({ services: items });
    setDragId(null);
    setDragOverId(null);
  };

  return (
    <div className="animate-slide-up max-w-2xl mx-auto pb-24">
      <SectionTitle step="STEP 1" title="Isi Price List" subtitle="Lengkapi data usaha dan daftar layanan kamu" />

      {/* Logo Upload */}
      <Card className="p-5 mb-4">
        <label className="block text-sm font-medium text-text-primary mb-2">Upload Logo</label>
        <input
          ref={fileRef}
          type="file"
          accept="image/png,image/jpeg,image/jpg,image/webp"
          className="hidden"
          onChange={e => e.target.files?.[0] && handleLogo(e.target.files[0])}
        />
        {data.logo ? (
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-2xl bg-lavender-50 border border-[#F2E8F8] flex items-center justify-center overflow-hidden shrink-0">
              <img src={data.logo} alt="logo" className="w-full h-full object-contain" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-text-primary truncate">{data.logoName || 'Logo'}</p>
              <p className="text-xs text-text-secondary">Logo siap digunakan</p>
            </div>
            <button
              onClick={() => update({ logo: null, logoName: '' })}
              className="p-2 rounded-xl text-red-400 hover:bg-red-50 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        ) : (
          <button
            onClick={() => fileRef.current?.click()}
            className="w-full py-8 rounded-2xl border-2 border-dashed border-lavender-200 hover:border-primary hover:bg-primary-50/30 transition-all duration-200 flex flex-col items-center gap-2"
          >
            <div className="w-12 h-12 rounded-2xl bg-lavender-100 flex items-center justify-center">
              <Upload className="w-6 h-6 text-primary" />
            </div>
            <p className="text-sm font-medium text-text-primary">Klik untuk upload logo</p>
            <p className="text-xs text-text-secondary">PNG, JPG, atau WEBP</p>
          </button>
        )}
      </Card>

      {/* Business Info */}
      <Card className="p-5 mb-4 space-y-4">
        <Input label="Nama Usaha" value={data.businessName} onChange={v => update({ businessName: v })} placeholder="Dampingcare" />
        <Input label="Judul Price List" value={data.title} onChange={v => update({ title: v })} placeholder="PRICE LIST" />
        <Input label="Subjudul (opsional)" value={data.subtitle} onChange={v => update({ subtitle: v })} placeholder="Premium Quality Service" />
        <Input label="Area Layanan (opsional)" value={data.serviceArea} onChange={v => update({ serviceArea: v })} placeholder="Jakarta, Bandung, Surabaya" />
      </Card>

      {/* Services */}
      <Card className="p-5 mb-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-primary" />
            <h3 className="font-semibold text-text-primary">Daftar Layanan</h3>
          </div>
          <span className="text-xs text-text-secondary bg-lavender-50 px-2 py-1 rounded-full">{data.services.length} layanan</span>
        </div>

        <div className="space-y-3">
          {data.services.map((svc, i) => (
            <div
              key={svc.id}
              draggable
              onDragStart={() => onDragStart(svc.id)}
              onDragOver={e => onDragOver(e, svc.id)}
              onDrop={() => onDrop(svc.id)}
              onDragEnd={() => { setDragId(null); setDragOverId(null); }}
              className={`p-4 rounded-2xl bg-lavender-50 border border-[#F2E8F8] transition-all duration-200 ${dragId === svc.id ? 'dragging' : ''} ${dragOverId === svc.id ? 'drag-over' : ''}`}
            >
              <div className="flex items-start gap-2">
                <div className="cursor-grab active:cursor-grabbing pt-2 text-text-secondary/40 hover:text-primary">
                  <GripVertical className="w-5 h-5" />
                </div>
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-primary bg-primary-50 w-6 h-6 rounded-full flex items-center justify-center shrink-0">{i + 1}</span>
                    <input
                      value={svc.name}
                      onChange={e => updateService(svc.id, { name: e.target.value })}
                      placeholder="Nama layanan"
                      className="flex-1 px-3 py-2 rounded-xl bg-white border border-[#F2E8F8] text-sm font-medium focus:outline-none focus:border-primary transition-colors"
                    />
                    <input
                      value={svc.price}
                      onChange={e => updateService(svc.id, { price: e.target.value })}
                      placeholder="Harga"
                      className="w-28 px-3 py-2 rounded-xl bg-white border border-[#F2E8F8] text-sm font-semibold text-primary focus:outline-none focus:border-primary transition-colors"
                    />
                    <button onClick={() => removeService(svc.id)} className="p-2 rounded-xl text-red-400 hover:bg-red-50 transition-colors shrink-0">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <input
                    value={svc.description}
                    onChange={e => updateService(svc.id, { description: e.target.value })}
                    placeholder="Deskripsi (opsional)"
                    className="w-full px-3 py-2 rounded-xl bg-white border border-[#F2E8F8] text-xs text-text-secondary focus:outline-none focus:border-primary transition-colors"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={addService}
          className="w-full mt-3 py-3 rounded-2xl border-2 border-dashed border-lavender-200 text-primary hover:bg-primary-50/30 hover:border-primary transition-all duration-200 flex items-center justify-center gap-2 font-medium text-sm"
        >
          <Plus className="w-4 h-4" /> Tambah Layanan
        </button>
      </Card>

      {/* Notes */}
      <Card className="p-5 mb-4">
        <TextArea label="Catatan / Disclaimer (opsional)" value={data.notes} onChange={v => update({ notes: v })} placeholder="Harga dapat berubah sewaktu-waktu. Hubungi kami untuk informasi lebih lanjut." />
      </Card>

      {/* Design Size */}
      <Card className="p-5 mb-4">
        <label className="block text-sm font-medium text-text-primary mb-3">Pilih Ukuran Desain</label>
        <div className="grid grid-cols-2 gap-3">
          {DESIGN_SIZES.map(s => (
            <button
              key={s.id}
              onClick={() => update({ designSize: s.id as DesignSize })}
              className={`p-4 rounded-2xl border-2 transition-all duration-200 text-left ${data.designSize === s.id ? 'border-primary bg-primary-50 shadow-pink' : 'border-[#F2E8F8] bg-lavender-50 hover:border-lavender-300'}`}
            >
              <div className={`w-8 h-8 rounded-lg mb-2 ${data.designSize === s.id ? 'bg-primary' : 'bg-lavender-200'} flex items-center justify-center`}>
                <ImageIcon className={`w-4 h-4 ${data.designSize === s.id ? 'text-white' : 'text-primary'}`} />
              </div>
              <p className="text-sm font-semibold text-text-primary">{s.label}</p>
              <p className="text-xs text-text-secondary">{s.ratio}</p>
            </button>
          ))}
        </div>
      </Card>
    </div>
  );
}
