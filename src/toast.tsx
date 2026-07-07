import { createContext, useCallback, useContext, useState, type ReactNode } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

type ToastType = 'success' | 'error' | 'info';
interface Toast { id: number; message: string; type: ToastType; }

const ToastContext = createContext<(message: string, type?: ToastType) => void>(() => {});
export const useToast = () => useContext(ToastContext);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const show = useCallback((message: string, type: ToastType = 'success') => {
    const id = Date.now() + Math.random();
    setToasts(t => [...t, { id, message, type }]);
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 3000);
  }, []);

  const remove = (id: number) => setToasts(t => t.filter(x => x.id !== id));

  return (
    <ToastContext.Provider value={show}>
      {children}
      <div className="fixed top-4 right-4 z-[100] flex flex-col gap-2 max-w-[calc(100vw-2rem)]">
        {toasts.map(t => (
          <div
            key={t.id}
            className="glass animate-slide-down flex items-center gap-3 px-4 py-3 rounded-2xl shadow-card max-w-sm"
          >
            {t.type === 'success' && <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />}
            {t.type === 'error' && <AlertCircle className="w-5 h-5 text-red-500 shrink-0" />}
            {t.type === 'info' && <Info className="w-5 h-5 text-primary shrink-0" />}
            <p className="text-sm font-medium text-text-primary flex-1">{t.message}</p>
            <button onClick={() => remove(t.id)} className="text-text-secondary hover:text-text-primary">
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
