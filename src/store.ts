import { useCallback, useEffect, useRef, useState } from 'react';
import { DEFAULT_DATA, type PriceListData } from './types';

const STORAGE_KEY = 'pricelist-draft-v1';
const HISTORY_LIMIT = 30;

function loadDraft(): PriceListData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return { ...DEFAULT_DATA, ...parsed };
    }
  } catch {}
  return DEFAULT_DATA;
}

export function useStore() {
  const [data, setData] = useState<PriceListData>(loadDraft);
  const historyRef = useRef<PriceListData[]>([]);
  const futureRef = useRef<PriceListData[]>([]);
  const skipHistoryRef = useRef(false);
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);

  // Autosave
  useEffect(() => {
    const t = setTimeout(() => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      } catch {}
    }, 400);
    return () => clearTimeout(t);
  }, [data]);

  const update = useCallback((patch: Partial<PriceListData> | ((prev: PriceListData) => Partial<PriceListData>)) => {
    setData(prev => {
      if (!skipHistoryRef.current) {
        historyRef.current = [...historyRef.current, prev].slice(-HISTORY_LIMIT);
        futureRef.current = [];
      }
      skipHistoryRef.current = false;
      const p = typeof patch === 'function' ? patch(prev) : patch;
      return { ...prev, ...p };
    });
  }, []);

  useEffect(() => {
    setCanUndo(historyRef.current.length > 0);
    setCanRedo(futureRef.current.length > 0);
  }, [data]);

  const undo = useCallback(() => {
    setData(prev => {
      if (historyRef.current.length === 0) return prev;
      const past = historyRef.current.pop()!;
      futureRef.current = [prev, ...futureRef.current].slice(0, HISTORY_LIMIT);
      skipHistoryRef.current = true;
      return past;
    });
  }, []);

  const redo = useCallback(() => {
    setData(prev => {
      if (futureRef.current.length === 0) return prev;
      const next = futureRef.current.shift()!;
      historyRef.current = [...historyRef.current, prev].slice(-HISTORY_LIMIT);
      skipHistoryRef.current = true;
      return next;
    });
  }, []);

  const reset = useCallback(() => {
    setData(prev => {
      historyRef.current = [...historyRef.current, prev].slice(-HISTORY_LIMIT);
      futureRef.current = [];
      return { ...DEFAULT_DATA, services: [{ id: '1', name: '', price: '', description: '' }] };
    });
  }, []);

  return { data, update, undo, redo, reset, canUndo, canRedo };
}
