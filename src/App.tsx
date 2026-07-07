import { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, Undo2, Redo2, RotateCcw, Sparkles } from 'lucide-react';
import { useStore } from './store';
import { useToast, ToastProvider } from './toast';
import { Step1Form } from './components/Step1Form';
import { Step2Icons } from './components/Step2Icons';
import { Step3Fonts } from './components/Step3Fonts';
import { Step4Templates } from './components/Step4Templates';
import { Step5Preview } from './components/Step5Preview';

const STEPS = ['Isi Data', 'Ikon', 'Font', 'Template', 'Preview'];

function AppInner() {
  const { data, update, undo, redo, reset, canUndo, canRedo } = useStore();
  const toast = useToast();
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(t);
  }, []);

  const next = () => {
    if (step === 0 && !data.businessName && !data.title) {
      toast('Isi minimal nama usaha atau judul dulu', 'error');
      return;
    }
    setStep(s => Math.min(4, s + 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const prev = () => {
    setStep(s => Math.max(0, s - 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReset = () => {
    if (confirm('Yakin ingin reset semua data?')) {
      reset();
      setStep(0);
      toast('Semua data telah direset', 'info');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-primary to-lavender flex items-center justify-center animate-bounce-soft">
          <Sparkles className="w-8 h-8 text-white" />
        </div>
        <p className="text-text-secondary text-sm animate-pulse">Memuat Price List Generator...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-50 glass-pink border-b border-white/30">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-lavender flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-sm font-bold text-text-primary leading-tight">Price List Generator</h1>
              <p className="text-[10px] text-text-secondary leading-tight">Dampingcare</p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <button onClick={undo} disabled={!canUndo} className="p-2 rounded-xl hover:bg-white/50 transition-colors disabled:opacity-30" title="Undo">
              <Undo2 className="w-4 h-4 text-text-primary" />
            </button>
            <button onClick={redo} disabled={!canRedo} className="p-2 rounded-xl hover:bg-white/50 transition-colors disabled:opacity-30" title="Redo">
              <Redo2 className="w-4 h-4 text-text-primary" />
            </button>
            <button onClick={handleReset} className="p-2 rounded-xl hover:bg-white/50 transition-colors" title="Reset">
              <RotateCcw className="w-4 h-4 text-text-primary" />
            </button>
          </div>
        </div>

        {/* Stepper */}
        <div className="max-w-4xl mx-auto px-4 pb-3">
          <div className="flex items-center gap-1">
            {STEPS.map((label, i) => (
              <div key={i} className="flex-1 flex items-center">
                <button
                  onClick={() => { setStep(i); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="flex-1 flex flex-col items-center gap-1 group"
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-200 ${step === i ? 'bg-gradient-to-br from-primary to-primary-light text-white shadow-pink scale-110' : step > i ? 'bg-primary-100 text-primary' : 'bg-white text-text-secondary border border-[#F2E8F8]'}`}
                  >
                    {step > i ? '✓' : i + 1}
                  </div>
                  <span className={`text-[10px] font-medium ${step === i ? 'text-primary' : 'text-text-secondary'} hidden sm:block`}>{label}</span>
                </button>
                {i < STEPS.length - 1 && (
                  <div className={`h-0.5 flex-1 rounded-full transition-all duration-200 ${step > i ? 'bg-primary' : 'bg-[#F2E8F8]'}`} />
                )}
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="px-4 py-6">
        {step === 0 && <Step1Form data={data} update={update} />}
        {step === 1 && <Step2Icons data={data} update={update} />}
        {step === 2 && <Step3Fonts data={data} update={update} />}
        {step === 3 && <Step4Templates data={data} update={update} />}
        {step === 4 && <Step5Preview data={data} update={update} onEdit={() => setStep(0)} onNew={() => setStep(0)} onReset={handleReset} />}
      </main>

      {/* Bottom Nav */}
      {step < 4 && (
        <div className="fixed bottom-0 left-0 right-0 z-40 glass-pink border-t border-white/30">
          <div className="max-w-2xl mx-auto px-4 py-3 flex gap-3">
            {step > 0 && (
              <button onClick={prev} className="flex-1 py-3 rounded-2xl bg-white text-text-primary font-semibold text-sm border border-[#F2E8F8] flex items-center justify-center gap-2 active:scale-95 transition-all">
                <ArrowLeft className="w-4 h-4" /> Kembali
              </button>
            )}
            <button onClick={next} className="flex-1 py-3 rounded-2xl bg-gradient-to-r from-primary to-primary-light text-white font-semibold text-sm shadow-pink flex items-center justify-center gap-2 active:scale-95 transition-all hover:shadow-pink-lg">
              {step === 0 ? 'Lanjut Pilih Ikon' : step === 1 ? 'Lanjut Pilih Font' : step === 2 ? 'Lanjut Pilih Template' : 'Lanjut ke Preview'} <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function App() {
  return (
    <ToastProvider>
      <AppInner />
    </ToastProvider>
  );
}
