import type { PriceListData } from '../types';
import { TemplateRenderer } from './TemplateRenderer';

async function renderToCanvas(data: PriceListData, w: number, h: number): Promise<HTMLCanvasElement> {
  const container = document.createElement('div');
  container.style.cssText = `position:fixed;left:-99999px;top:0;width:${w}px;height:${h}px;overflow:hidden;`;
  document.body.appendChild(container);

  const { createRoot } = await import('react-dom/client');
  const React = await import('react');
  const root = createRoot(container);
  await new Promise<void>(resolve => {
    root.render(
      React.createElement(() => {
        React.useEffect(() => { setTimeout(resolve, 100); }, []);
        return React.createElement(TemplateRenderer, { data, template: data.selectedTemplate, width: w, height: h });
      })
    );
  });

  await document.fonts.ready;
  await new Promise(r => setTimeout(r, 400));

  const html2canvas = (await import('html2canvas')).default;
  const canvas = await html2canvas(container, {
    width: w,
    height: h,
    scale: 2,
    backgroundColor: null,
    useCORS: true,
    allowTaint: true,
    logging: false,
  });

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
  const { jsPDF } = await import('jspdf');
  const orientation = w > h ? 'l' : 'p';
  const pdf = new jsPDF({ orientation, unit: 'px', format: [w, h] });
  pdf.addImage(imgData, 'PNG', 0, 0, w, h);
  pdf.save(filename);
}
