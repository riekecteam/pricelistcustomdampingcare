import type { PriceListData } from '../types';
import { TemplateRenderer } from './TemplateRenderer';

async function renderToCanvas(data: PriceListData, w: number, h: number): Promise<HTMLCanvasElement> {
  const container = document.createElement('div');
  container.style.cssText = `position:fixed;left:-99999px;top:0;width:${w}px;height:${h}px;`;
  document.body.appendChild(container);

  const inner = document.createElement('div');
  inner.style.cssText = `width:${w}px;height:${h}px;`;
  container.appendChild(inner);

  const { createRoot } = await import('react-dom/client');
  const React = await import('react');
  const root = createRoot(inner);
  await new Promise<void>(resolve => {
    root.render(React.createElement(() => {
      React.useEffect(() => { setTimeout(resolve, 200); }, []);
      return React.createElement(TemplateRenderer, { data, template: data.selectedTemplate, width: w, height: h });
    }));
  });

  // Wait for fonts and images
  await document.fonts.ready;
  await new Promise(r => setTimeout(r, 300));

  // Load images as data URLs for canvas
  const imgs = inner.querySelectorAll('img');
  const imgPromises: Promise<void>[] = [];
  imgs.forEach(img => {
    if (img.src && !img.src.startsWith('data:')) {
      imgPromises.push(
        fetch(img.src).then(r => r.blob()).then(b => new Promise<string>(res => {
          const reader = new FileReader();
          reader.onload = () => res(reader.result as string);
          reader.readAsDataURL(b);
        })).then(dataUrl => { img.src = dataUrl; }).catch(() => {})
      );
    }
  });
  await Promise.all(imgPromises);
  await new Promise(r => setTimeout(r, 200));

  const svg2 = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <foreignObject width="100%" height="100%">
    <div xmlns="http://www.w3.org/1999/xhtml" style="width:${w}px;height:${h}px;">${inner.innerHTML}</div>
  </foreignObject>
</svg>`;

  const blob = new Blob([svg2], { type: 'image/svg+xml;charset=utf-8' });
  const url = URL.createObjectURL(blob);

  const img = new Image();
  img.crossOrigin = 'anonymous';

  await new Promise<void>((resolve, reject) => {
    img.onload = () => resolve();
    img.onerror = () => reject(new Error('Image load failed'));
    img.src = url;
  });

  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d')!;
  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, w, h);
  ctx.drawImage(img, 0, 0);

  URL.revokeObjectURL(url);
  root.unmount();
  document.body.removeChild(container);

  return canvas;
}

export async function exportPNG(data: PriceListData, w: number, h: number, filename: string) {
  const canvas = await renderToCanvas(data, w, h);
  const link = document.createElement('a');
  link.download = filename;
  link.href = canvas.toDataURL('image/png');
  link.click();
}

export async function exportPDF(data: PriceListData, w: number, h: number, filename: string) {
  const canvas = await renderToCanvas(data, w, h);
  const imgData = canvas.toDataURL('image/png');

  // Simple PDF using jsPDF-like approach via canvas
  // We'll create a minimal PDF with the image
  const { jsPDF } = await import('jspdf');
  const orientation = w > h ? 'l' : 'p';
  const pdf = new jsPDF({ orientation, unit: 'px', format: [w, h] });
  pdf.addImage(imgData, 'PNG', 0, 0, w, h);
  pdf.save(filename);
}
