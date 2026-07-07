import * as Icons from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { FONTS, type PriceListData } from '../types';

function getIcon(name: string): LucideIcon {
  const C = (Icons as unknown as Record<string, LucideIcon | undefined>)[name];
  return C || Icons.HeartPulse;
}

function getFont(id: string) {
  return (FONTS.find(f => f.id === id) || FONTS[0]).cssFamily;
}

interface Props {
  data: PriceListData;
  template: number;
  width: number;
  height: number;
}

export function TemplateRenderer({ data, template, width, height }: Props) {
  const font = getFont(data.selectedFont);
  const Icon = getIcon(data.selectedIcon);
  const scale = width / 1080;

  const titleStyle: React.CSSProperties = {
    fontFamily: font,
    fontSize: `${data.titleSize * scale}px`,
    letterSpacing: `${data.letterSpacing * scale}px`,
    lineHeight: data.lineHeight,
    fontWeight: data.bold ? 700 : 400,
    textTransform: data.uppercase ? 'uppercase' : 'none',
  };
  const contentStyle: React.CSSProperties = {
    fontFamily: font,
    fontSize: `${data.contentSize * scale}px`,
    letterSpacing: `${data.letterSpacing * scale}px`,
    lineHeight: data.lineHeight,
    fontWeight: data.bold ? 500 : 400,
  };

  const services = data.services.filter(s => s.name || s.price);

  const common = { data, font, Icon, titleStyle, contentStyle, scale, services };

  const renderers = [
    () => <T1Minimal {...common} />,
    () => <T2SoftPink {...common} />,
    () => <T3LuxuryWhite {...common} />,
    () => <T4Glass {...common} />,
    () => <T5ModernCard {...common} />,
    () => <T6Korean {...common} />,
    () => <T7Pinterest {...common} />,
    () => <T8Editorial {...common} />,
    () => <T9Magazine {...common} />,
    () => <T10ElegantBlack {...common} />,
    () => <T11PastelGradient {...common} />,
    () => <T12Bento {...common} />,
    () => <T13PremiumClinic {...common} />,
    () => <T14BeautyStudio {...common} />,
    () => <T15FloralMinimal {...common} />,
    () => <T16LineArt {...common} />,
    () => <T17SoftShadow {...common} />,
    () => <T18Neumorphism {...common} />,
    () => <T19InstagramStyle {...common} />,
    () => <T20PremiumFlyer {...common} />,
  ];

  return (
    <div style={{ width, height, position: 'relative', overflow: 'hidden' }}>
      {renderers[template]?.()}
    </div>
  );
}

interface TProps {
  data: PriceListData;
  font: string;
  Icon: LucideIcon;
  titleStyle: React.CSSProperties;
  contentStyle: React.CSSProperties;
  scale: number;
  services: PriceListData['services'];
}

function Logo({ data, scale, rounded = true }: { data: PriceListData; scale: number; rounded?: boolean }) {
  if (!data.logo) {
    return (
      <div
        style={{ width: 80 * scale, height: 80 * scale }}
        className={`bg-gradient-to-br from-primary to-lavender flex items-center justify-center ${rounded ? 'rounded-2xl' : ''}`}
      >
        <span style={{ fontSize: 32 * scale }} className="text-white font-bold">{(data.businessName || 'D')[0]}</span>
      </div>
    );
  }
  return <img src={data.logo} alt="logo" style={{ width: 80 * scale, height: 80 * scale, objectFit: 'contain' }} className={rounded ? 'rounded-2xl' : ''} />;
}

// T1: Minimal Clean
function T1Minimal({ data, font, Icon, titleStyle, contentStyle, scale, services }: TProps) {
  return (
    <div className="w-full h-full bg-white flex flex-col items-center px-[8%] py-[6%]">
      <Logo data={data} scale={scale} />
      {data.businessName && <p style={{ fontFamily: font, fontSize: 16 * scale }} className="text-text-secondary mt-3">{data.businessName}</p>}
      <Icon className="text-primary mt-4" strokeWidth={1.5} style={{ width: 40 * scale, height: 40 * scale }} />
      <h1 style={titleStyle} className="text-text-primary text-center mt-2">{data.title}</h1>
      {data.subtitle && <p style={contentStyle} className="text-text-secondary text-center mt-1">{data.subtitle}</p>}
      <div className="w-full mt-6 space-y-3">
        {services.map((s) => (
          <div key={s.id} className="flex items-baseline justify-between border-b border-lavender-100 pb-2">
            <div className="flex-1">
              <p style={contentStyle} className="text-text-primary font-semibold">{s.name}</p>
              {s.description && <p style={{ fontFamily: font, fontSize: 12 * scale }} className="text-text-secondary">{s.description}</p>}
            </div>
            <p style={contentStyle} className="text-primary font-bold ml-2">{s.price}</p>
          </div>
        ))}
      </div>
      {data.serviceArea && <p style={{ fontFamily: font, fontSize: 12 * scale }} className="text-text-secondary mt-4">📍 {data.serviceArea}</p>}
      {data.notes && <p style={{ fontFamily: font, fontSize: 10 * scale }} className="text-text-secondary/70 mt-3 text-center">{data.notes}</p>}
    </div>
  );
}

// T2: Soft Pink
function T2SoftPink({ data, font, Icon, titleStyle, contentStyle, scale, services }: TProps) {
  return (
    <div className="w-full h-full flex flex-col items-center px-[8%] py-[6%]" style={{ background: 'linear-gradient(180deg, #FFF0F7 0%, #FFE4F0 100%)' }}>
      <Logo data={data} scale={scale} />
      <Icon className="text-primary mt-4" strokeWidth={1.5} style={{ width: 44 * scale, height: 44 * scale }} />
      <h1 style={titleStyle} className="text-primary text-center mt-2">{data.title}</h1>
      {data.subtitle && <p style={contentStyle} className="text-text-secondary text-center mt-1">{data.subtitle}</p>}
      {data.businessName && <p style={{ fontFamily: font, fontSize: 14 * scale }} className="text-text-secondary mt-1">{data.businessName}</p>}
      <div className="w-full mt-6 space-y-3">
        {services.map(s => (
          <div key={s.id} className="bg-white/80 rounded-2xl p-3 flex items-center justify-between" style={{ boxShadow: '0 2px 12px rgba(251,94,168,0.1)' }}>
            <div className="flex-1">
              <p style={contentStyle} className="text-text-primary font-semibold">{s.name}</p>
              {s.description && <p style={{ fontFamily: font, fontSize: 12 * scale }} className="text-text-secondary">{s.description}</p>}
            </div>
            <p style={contentStyle} className="text-primary font-bold ml-2">{s.price}</p>
          </div>
        ))}
      </div>
      {data.serviceArea && <p style={{ fontFamily: font, fontSize: 12 * scale }} className="text-text-secondary mt-4">📍 {data.serviceArea}</p>}
      {data.notes && <p style={{ fontFamily: font, fontSize: 10 * scale }} className="text-text-secondary/70 mt-3 text-center">{data.notes}</p>}
    </div>
  );
}

// T3: Luxury White
function T3LuxuryWhite({ data, font, Icon, titleStyle, contentStyle, scale, services }: TProps) {
  return (
    <div className="w-full h-full bg-white flex flex-col items-center px-[10%] py-[8%]" style={{ border: '2px solid #CBB8FF' }}>
      <div className="w-16" style={{ height: 1 * scale, background: '#CBB8FF' }} />
      <Logo data={data} scale={scale} />
      <h1 style={titleStyle} className="text-text-primary text-center mt-3">{data.title}</h1>
      {data.subtitle && <p style={contentStyle} className="text-lavender-500 text-center mt-1 italic">{data.subtitle}</p>}
      <div className="w-16 mt-3" style={{ height: 1 * scale, background: '#CBB8FF' }} />
      <Icon className="text-lavender-500 mt-4" strokeWidth={1} style={{ width: 36 * scale, height: 36 * scale }} />
      <div className="w-full mt-6 space-y-4">
        {services.map(s => (
          <div key={s.id} className="text-center">
            <p style={contentStyle} className="text-text-primary font-semibold">{s.name}</p>
            {s.description && <p style={{ fontFamily: font, fontSize: 12 * scale }} className="text-text-secondary">{s.description}</p>}
            <p style={contentStyle} className="text-lavender-500 font-bold mt-1">{s.price}</p>
            <div className="w-12 mx-auto mt-2" style={{ height: 1, background: '#F2E8F8' }} />
          </div>
        ))}
      </div>
      {data.businessName && <p style={{ fontFamily: font, fontSize: 12 * scale }} className="text-text-secondary mt-4">{data.businessName}</p>}
      {data.notes && <p style={{ fontFamily: font, fontSize: 10 * scale }} className="text-text-secondary/70 mt-3 text-center">{data.notes}</p>}
    </div>
  );
}

// T4: Glassmorphism
function T4Glass({ data, font, Icon, titleStyle, contentStyle, scale, services }: TProps) {
  return (
    <div className="w-full h-full flex flex-col items-center px-[8%] py-[6%]" style={{ background: 'linear-gradient(135deg, #CBB8FF 0%, #FF8EC2 50%, #FB5EA8 100%)' }}>
      <div className="w-full h-full flex flex-col items-center p-[5%] rounded-3xl" style={{ background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.3)' }}>
        <Logo data={data} scale={scale} />
        <Icon className="text-white mt-4" strokeWidth={1.5} style={{ width: 40 * scale, height: 40 * scale }} />
        <h1 style={{ ...titleStyle, color: 'white' }} className="text-center mt-2">{data.title}</h1>
        {data.subtitle && <p style={{ ...contentStyle, color: 'rgba(255,255,255,0.9)' }} className="text-center mt-1">{data.subtitle}</p>}
        <div className="w-full mt-6 space-y-3">
          {services.map(s => (
            <div key={s.id} className="rounded-2xl p-3 flex items-center justify-between" style={{ background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.2)' }}>
              <div className="flex-1">
                <p style={{ ...contentStyle, color: 'white' }} className="font-semibold">{s.name}</p>
                {s.description && <p style={{ fontFamily: font, fontSize: 12 * scale, color: 'rgba(255,255,255,0.8)' }}>{s.description}</p>}
              </div>
              <p style={{ ...contentStyle, color: 'white' }} className="font-bold ml-2">{s.price}</p>
            </div>
          ))}
        </div>
        {data.businessName && <p style={{ fontFamily: font, fontSize: 12 * scale, color: 'rgba(255,255,255,0.9)' }} className="mt-4">{data.businessName}</p>}
        {data.notes && <p style={{ fontFamily: font, fontSize: 10 * scale, color: 'rgba(255,255,255,0.7)' }} className="mt-3 text-center">{data.notes}</p>}
      </div>
    </div>
  );
}

// T5: Modern Card
function T5ModernCard({ data, font, Icon, titleStyle, contentStyle, scale, services }: TProps) {
  return (
    <div className="w-full h-full flex flex-col px-[8%] py-[6%]" style={{ background: 'linear-gradient(180deg, #F5F0FF 0%, #FFFFFF 100%)' }}>
      <div className="flex items-center gap-3">
        <Logo data={data} scale={scale} />
        <div>
          <h1 style={titleStyle} className="text-text-primary">{data.title}</h1>
          {data.businessName && <p style={{ fontFamily: font, fontSize: 14 * scale }} className="text-text-secondary">{data.businessName}</p>}
        </div>
      </div>
      {data.subtitle && <p style={contentStyle} className="text-text-secondary mt-3">{data.subtitle}</p>}
      <Icon className="text-primary mt-4" strokeWidth={1.5} style={{ width: 36 * scale, height: 36 * scale }} />
      <div className="mt-5 space-y-3">
        {services.map(s => (
          <div key={s.id} className="bg-white rounded-2xl p-4 flex items-center justify-between" style={{ boxShadow: '0 4px 16px rgba(203,184,255,0.2)' }}>
            <div className="flex-1">
              <p style={contentStyle} className="text-text-primary font-semibold">{s.name}</p>
              {s.description && <p style={{ fontFamily: font, fontSize: 12 * scale }} className="text-text-secondary">{s.description}</p>}
            </div>
            <div className="text-right">
              <p style={contentStyle} className="text-primary font-bold">{s.price}</p>
            </div>
          </div>
        ))}
      </div>
      {data.serviceArea && <p style={{ fontFamily: font, fontSize: 12 * scale }} className="text-text-secondary mt-4">📍 {data.serviceArea}</p>}
      {data.notes && <p style={{ fontFamily: font, fontSize: 10 * scale }} className="text-text-secondary/70 mt-3">{data.notes}</p>}
    </div>
  );
}

// T6: Korean Style
function T6Korean({ data, font, Icon, titleStyle, contentStyle, scale, services }: TProps) {
  return (
    <div className="w-full h-full flex flex-col items-center px-[10%] py-[8%]" style={{ background: '#FAF6FF' }}>
      <div className="flex flex-col items-center">
        <Logo data={data} scale={scale} />
        <div className="my-3 flex items-center gap-2">
          <div style={{ width: 30 * scale, height: 2 * scale, background: '#CBB8FF' }} />
          <Icon className="text-lavender-500" strokeWidth={1.5} style={{ width: 28 * scale, height: 28 * scale }} />
          <div style={{ width: 30 * scale, height: 2 * scale, background: '#CBB8FF' }} />
        </div>
        <h1 style={titleStyle} className="text-text-primary text-center">{data.title}</h1>
        {data.subtitle && <p style={contentStyle} className="text-lavender-500 text-center mt-2">{data.subtitle}</p>}
      </div>
      <div className="w-full mt-8 space-y-5">
        {services.map((s, i) => (
          <div key={s.id} className="flex items-start gap-3">
            <span style={{ fontFamily: font, fontSize: 14 * scale }} className="text-lavender-500 font-bold mt-1">{String(i + 1).padStart(2, '0')}</span>
            <div className="flex-1">
              <div className="flex justify-between items-baseline">
                <p style={contentStyle} className="text-text-primary font-semibold">{s.name}</p>
                <p style={contentStyle} className="text-primary font-bold">{s.price}</p>
              </div>
              {s.description && <p style={{ fontFamily: font, fontSize: 12 * scale }} className="text-text-secondary mt-1">{s.description}</p>}
            </div>
          </div>
        ))}
      </div>
      {data.businessName && <p style={{ fontFamily: font, fontSize: 12 * scale }} className="text-text-secondary mt-6">{data.businessName}</p>}
      {data.notes && <p style={{ fontFamily: font, fontSize: 10 * scale }} className="text-text-secondary/70 mt-3 text-center">{data.notes}</p>}
    </div>
  );
}

// T7: Pinterest Style
function T7Pinterest({ data, font, Icon, titleStyle, contentStyle, scale, services }: TProps) {
  return (
    <div className="w-full h-full flex flex-col px-[8%] py-[6%]" style={{ background: '#FFF7FB' }}>
      <div className="rounded-3xl overflow-hidden" style={{ background: 'linear-gradient(135deg, #FB5EA8 0%, #CBB8FF 100%)' }}>
        <div className="p-[6%] flex flex-col items-center">
          <Logo data={data} scale={scale} />
          <h1 style={{ ...titleStyle, color: 'white' }} className="text-center mt-3">{data.title}</h1>
          {data.subtitle && <p style={{ ...contentStyle, color: 'rgba(255,255,255,0.9)' }} className="text-center mt-1">{data.subtitle}</p>}
        </div>
      </div>
      <Icon className="text-primary mx-auto mt-4" strokeWidth={1.5} style={{ width: 36 * scale, height: 36 * scale }} />
      <div className="mt-4 grid grid-cols-2 gap-3">
        {services.map(s => (
          <div key={s.id} className="bg-white rounded-2xl p-3" style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.06)' }}>
            <p style={contentStyle} className="text-text-primary font-semibold">{s.name}</p>
            {s.description && <p style={{ fontFamily: font, fontSize: 11 * scale }} className="text-text-secondary">{s.description}</p>}
            <p style={contentStyle} className="text-primary font-bold mt-1">{s.price}</p>
          </div>
        ))}
      </div>
      {data.businessName && <p style={{ fontFamily: font, fontSize: 12 * scale }} className="text-text-secondary mt-4 text-center">{data.businessName}</p>}
      {data.notes && <p style={{ fontFamily: font, fontSize: 10 * scale }} className="text-text-secondary/70 mt-2 text-center">{data.notes}</p>}
    </div>
  );
}

// T8: Editorial
function T8Editorial({ data, font, Icon, titleStyle, contentStyle, scale, services }: TProps) {
  return (
    <div className="w-full h-full bg-white flex flex-col px-[10%] py-[8%]">
      <div className="flex justify-between items-start">
        <Logo data={data} scale={scale} />
        <Icon className="text-text-primary" strokeWidth={1} style={{ width: 32 * scale, height: 32 * scale }} />
      </div>
      <div className="mt-8">
        <h1 style={titleStyle} className="text-text-primary">{data.title}</h1>
        <div style={{ width: 60 * scale, height: 3 * scale, background: '#222' }} className="mt-3" />
        {data.subtitle && <p style={contentStyle} className="text-text-secondary mt-3">{data.subtitle}</p>}
      </div>
      <div className="mt-8 space-y-4">
        {services.map(s => (
          <div key={s.id} className="flex items-baseline justify-between">
            <p style={contentStyle} className="text-text-primary font-semibold">{s.name}</p>
            <div className="flex-1 mx-3 border-b border-dashed border-text-secondary/30" />
            <p style={contentStyle} className="text-text-primary font-bold">{s.price}</p>
          </div>
        ))}
      </div>
      {data.businessName && <p style={{ fontFamily: font, fontSize: 12 * scale }} className="text-text-secondary mt-6">{data.businessName}</p>}
      {data.serviceArea && <p style={{ fontFamily: font, fontSize: 11 * scale }} className="text-text-secondary mt-1">{data.serviceArea}</p>}
      {data.notes && <p style={{ fontFamily: font, fontSize: 10 * scale }} className="text-text-secondary/70 mt-3">{data.notes}</p>}
    </div>
  );
}

// T9: Magazine
function T9Magazine({ data, font, Icon, titleStyle, contentStyle, scale, services }: TProps) {
  return (
    <div className="w-full h-full flex flex-col px-[8%] py-[6%]" style={{ background: 'linear-gradient(180deg, #FFFFFF 0%, #F5F0FF 100%)' }}>
      <div className="text-center">
        <p style={{ fontFamily: font, fontSize: 12 * scale }} className="text-primary tracking-widest font-semibold">{data.businessName || 'PRICE LIST'}</p>
        <h1 style={titleStyle} className="text-text-primary mt-2">{data.title}</h1>
        <div className="flex items-center justify-center gap-2 mt-2">
          <div style={{ width: 40 * scale, height: 1, background: '#CBB8FF' }} />
          <Icon className="text-lavender-500" strokeWidth={1.5} style={{ width: 24 * scale, height: 24 * scale }} />
          <div style={{ width: 40 * scale, height: 1, background: '#CBB8FF' }} />
        </div>
        {data.subtitle && <p style={contentStyle} className="text-text-secondary mt-2">{data.subtitle}</p>}
      </div>
      <div className="mt-8 space-y-3">
        {services.map((s, i) => (
          <div key={s.id} className="flex items-center gap-3 py-2" style={{ borderBottom: i < services.length - 1 ? '1px solid #F2E8F8' : 'none' }}>
            <span style={{ fontFamily: font, fontSize: 28 * scale }} className="text-lavender-200 font-bold leading-none">{i + 1}</span>
            <div className="flex-1">
              <p style={contentStyle} className="text-text-primary font-semibold">{s.name}</p>
              {s.description && <p style={{ fontFamily: font, fontSize: 11 * scale }} className="text-text-secondary">{s.description}</p>}
            </div>
            <p style={contentStyle} className="text-primary font-bold">{s.price}</p>
          </div>
        ))}
      </div>
      {data.notes && <p style={{ fontFamily: font, fontSize: 10 * scale }} className="text-text-secondary/70 mt-4 text-center">{data.notes}</p>}
    </div>
  );
}

// T10: Elegant Black
function T10ElegantBlack({ data, font, Icon, titleStyle, contentStyle, scale, services }: TProps) {
  return (
    <div className="w-full h-full flex flex-col items-center px-[10%] py-[8%]" style={{ background: 'linear-gradient(180deg, #1a1a1a 0%, #2d2d2d 100%)' }}>
      <Logo data={data} scale={scale} />
      <Icon className="text-primary mt-4" strokeWidth={1.5} style={{ width: 36 * scale, height: 36 * scale }} />
      <h1 style={{ ...titleStyle, color: 'white' }} className="text-center mt-2">{data.title}</h1>
      {data.subtitle && <p style={{ ...contentStyle, color: '#CBB8FF' }} className="text-center mt-1 italic">{data.subtitle}</p>}
      <div className="w-16 mt-3" style={{ height: 1, background: 'rgba(203,184,255,0.4)' }} />
      <div className="w-full mt-6 space-y-3">
        {services.map(s => (
          <div key={s.id} className="flex items-baseline justify-between border-b pb-2" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
            <div className="flex-1">
              <p style={{ ...contentStyle, color: 'white' }} className="font-semibold">{s.name}</p>
              {s.description && <p style={{ fontFamily: font, fontSize: 12 * scale, color: 'rgba(255,255,255,0.6)' }}>{s.description}</p>}
            </div>
            <p style={{ ...contentStyle, color: '#FF8EC2' }} className="font-bold ml-2">{s.price}</p>
          </div>
        ))}
      </div>
      {data.businessName && <p style={{ fontFamily: font, fontSize: 12 * scale, color: 'rgba(255,255,255,0.7)' }} className="mt-4">{data.businessName}</p>}
      {data.notes && <p style={{ fontFamily: font, fontSize: 10 * scale, color: 'rgba(255,255,255,0.5)' }} className="mt-3 text-center">{data.notes}</p>}
    </div>
  );
}

// T11: Pastel Gradient
function T11PastelGradient({ data, font, Icon, titleStyle, contentStyle, scale, services }: TProps) {
  return (
    <div className="w-full h-full flex flex-col items-center px-[8%] py-[6%]" style={{ background: 'linear-gradient(135deg, #FFE4F0 0%, #EAE0FF 50%, #E4E4FF 100%)' }}>
      <Logo data={data} scale={scale} />
      <Icon className="text-primary mt-4" strokeWidth={1.5} style={{ width: 40 * scale, height: 40 * scale }} />
      <h1 style={titleStyle} className="text-text-primary text-center mt-2">{data.title}</h1>
      {data.subtitle && <p style={contentStyle} className="text-text-secondary text-center mt-1">{data.subtitle}</p>}
      <div className="w-full mt-6 space-y-3">
        {services.map(s => (
          <div key={s.id} className="bg-white/60 rounded-3xl p-4 flex items-center justify-between" style={{ backdropFilter: 'blur(10px)' }}>
            <div className="flex-1">
              <p style={contentStyle} className="text-text-primary font-semibold">{s.name}</p>
              {s.description && <p style={{ fontFamily: font, fontSize: 12 * scale }} className="text-text-secondary">{s.description}</p>}
            </div>
            <p style={contentStyle} className="text-primary font-bold ml-2">{s.price}</p>
          </div>
        ))}
      </div>
      {data.businessName && <p style={{ fontFamily: font, fontSize: 12 * scale }} className="text-text-secondary mt-4">{data.businessName}</p>}
      {data.notes && <p style={{ fontFamily: font, fontSize: 10 * scale }} className="text-text-secondary/70 mt-3 text-center">{data.notes}</p>}
    </div>
  );
}

// T12: Bento Grid
function T12Bento({ data, font, Icon, titleStyle, contentStyle, scale, services }: TProps) {
  return (
    <div className="w-full h-full flex flex-col px-[6%] py-[5%]" style={{ background: '#F5F0FF' }}>
      <div className="grid grid-cols-2 gap-3 mb-3">
        <div className="bg-primary rounded-3xl p-4 col-span-1 flex flex-col justify-center" style={{ minHeight: 120 * scale }}>
          <Logo data={data} scale={scale * 0.8} />
          <h1 style={{ ...titleStyle, fontSize: data.titleSize * scale * 0.7, color: 'white' }} className="mt-2">{data.title}</h1>
        </div>
        <div className="bg-white rounded-3xl p-4 col-span-1 flex flex-col items-center justify-center" style={{ minHeight: 120 * scale }}>
          <Icon className="text-primary" strokeWidth={1.5} style={{ width: 40 * scale, height: 40 * scale }} />
          {data.subtitle && <p style={{ ...contentStyle, fontSize: data.contentSize * scale * 0.8 }} className="text-text-secondary text-center mt-2">{data.subtitle}</p>}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {services.map(s => (
          <div key={s.id} className="bg-white rounded-2xl p-3">
            <p style={contentStyle} className="text-text-primary font-semibold">{s.name}</p>
            {s.description && <p style={{ fontFamily: font, fontSize: 11 * scale }} className="text-text-secondary">{s.description}</p>}
            <p style={contentStyle} className="text-primary font-bold mt-1">{s.price}</p>
          </div>
        ))}
      </div>
      {data.businessName && <p style={{ fontFamily: font, fontSize: 12 * scale }} className="text-text-secondary mt-3 text-center">{data.businessName}</p>}
      {data.notes && <p style={{ fontFamily: font, fontSize: 10 * scale }} className="text-text-secondary/70 mt-2 text-center">{data.notes}</p>}
    </div>
  );
}

// T13: Premium Clinic
function T13PremiumClinic({ data, font, Icon, titleStyle, contentStyle, scale, services }: TProps) {
  return (
    <div className="w-full h-full flex flex-col px-[8%] py-[6%]" style={{ background: 'linear-gradient(180deg, #FFFFFF 0%, #F0FBF4 100%)' }}>
      <div className="flex flex-col items-center">
        <div className="rounded-3xl p-4 flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #4CAF50 0%, #2E7D32 100%)', width: 80 * scale, height: 80 * scale }}>
          {data.logo ? <img src={data.logo} alt="logo" style={{ width: 60 * scale, height: 60 * scale, objectFit: 'contain' }} /> : <Icon className="text-white" strokeWidth={1.5} style={{ width: 40 * scale, height: 40 * scale }} />}
        </div>
        <h1 style={titleStyle} className="text-text-primary text-center mt-3">{data.title}</h1>
        {data.subtitle && <p style={contentStyle} className="text-text-secondary text-center mt-1">{data.subtitle}</p>}
      </div>
      <div className="mt-6 space-y-3">
        {services.map(s => (
          <div key={s.id} className="bg-white rounded-2xl p-3 flex items-center gap-3" style={{ boxShadow: '0 2px 12px rgba(76,175,80,0.1)', borderLeft: '4px solid #4CAF50' }}>
            <div className="flex-1">
              <p style={contentStyle} className="text-text-primary font-semibold">{s.name}</p>
              {s.description && <p style={{ fontFamily: font, fontSize: 12 * scale }} className="text-text-secondary">{s.description}</p>}
            </div>
            <p style={contentStyle} className="text-green-600 font-bold">{s.price}</p>
          </div>
        ))}
      </div>
      {data.businessName && <p style={{ fontFamily: font, fontSize: 12 * scale }} className="text-text-secondary mt-4 text-center">{data.businessName}</p>}
      {data.serviceArea && <p style={{ fontFamily: font, fontSize: 11 * scale }} className="text-text-secondary mt-1 text-center">📍 {data.serviceArea}</p>}
      {data.notes && <p style={{ fontFamily: font, fontSize: 10 * scale }} className="text-text-secondary/70 mt-3 text-center">{data.notes}</p>}
    </div>
  );
}

// T14: Beauty Studio
function T14BeautyStudio({ data, font, Icon, titleStyle, contentStyle, scale, services }: TProps) {
  return (
    <div className="w-full h-full flex flex-col items-center px-[10%] py-[8%]" style={{ background: 'linear-gradient(180deg, #FFF0F7 0%, #FFFFFF 100%)' }}>
      <Logo data={data} scale={scale} />
      <div className="my-3 text-primary text-2xl">✦</div>
      <h1 style={titleStyle} className="text-primary text-center">{data.title}</h1>
      {data.subtitle && <p style={contentStyle} className="text-text-secondary text-center mt-1 italic">{data.subtitle}</p>}
      <Icon className="text-primary mt-3" strokeWidth={1} style={{ width: 32 * scale, height: 32 * scale }} />
      <div className="w-full mt-6 space-y-4">
        {services.map(s => (
          <div key={s.id} className="text-center">
            <p style={contentStyle} className="text-text-primary font-semibold">{s.name}</p>
            {s.description && <p style={{ fontFamily: font, fontSize: 12 * scale }} className="text-text-secondary">{s.description}</p>}
            <p style={contentStyle} className="text-primary font-bold mt-1">{s.price}</p>
          </div>
        ))}
      </div>
      {data.businessName && <p style={{ fontFamily: font, fontSize: 12 * scale }} className="text-text-secondary mt-4">{data.businessName}</p>}
      {data.notes && <p style={{ fontFamily: font, fontSize: 10 * scale }} className="text-text-secondary/70 mt-3 text-center">{data.notes}</p>}
    </div>
  );
}

// T15: Floral Minimal
function T15FloralMinimal({ data, font, Icon, titleStyle, contentStyle, scale, services }: TProps) {
  return (
    <div className="w-full h-full flex flex-col items-center px-[10%] py-[8%]" style={{ background: '#FFFBF7' }}>
      <div className="text-lavender-300 text-3xl">❀</div>
      <Logo data={data} scale={scale} />
      <h1 style={titleStyle} className="text-text-primary text-center mt-3">{data.title}</h1>
      {data.subtitle && <p style={contentStyle} className="text-lavender-500 text-center mt-1">{data.subtitle}</p>}
      <Icon className="text-lavender-400 mt-3" strokeWidth={1} style={{ width: 28 * scale, height: 28 * scale }} />
      <div className="w-full mt-6 space-y-3">
        {services.map(s => (
          <div key={s.id} className="flex items-baseline justify-between">
            <p style={contentStyle} className="text-text-primary">{s.name}</p>
            <p style={contentStyle} className="text-primary font-semibold">{s.price}</p>
          </div>
        ))}
      </div>
      <div className="text-lavender-300 text-3xl mt-4">❀</div>
      {data.businessName && <p style={{ fontFamily: font, fontSize: 12 * scale }} className="text-text-secondary mt-2">{data.businessName}</p>}
      {data.notes && <p style={{ fontFamily: font, fontSize: 10 * scale }} className="text-text-secondary/70 mt-2 text-center">{data.notes}</p>}
    </div>
  );
}

// T16: Line Art
function T16LineArt({ data, font, Icon, titleStyle, contentStyle, scale, services }: TProps) {
  return (
    <div className="w-full h-full bg-white flex flex-col px-[10%] py-[8%]" style={{ border: '1px solid #222' }}>
      <div className="flex justify-between items-center">
        <Logo data={data} scale={scale} />
        <Icon className="text-text-primary" strokeWidth={1} style={{ width: 32 * scale, height: 32 * scale }} />
      </div>
      <h1 style={titleStyle} className="text-text-primary mt-6">{data.title}</h1>
      {data.subtitle && <p style={contentStyle} className="text-text-secondary mt-1">{data.subtitle}</p>}
      <div style={{ width: '100%', height: 1, background: '#222' }} className="mt-4" />
      <div className="mt-4 space-y-3">
        {services.map(s => (
          <div key={s.id}>
            <div className="flex justify-between items-baseline">
              <p style={contentStyle} className="text-text-primary font-semibold">{s.name}</p>
              <p style={contentStyle} className="text-text-primary font-bold">{s.price}</p>
            </div>
            {s.description && <p style={{ fontFamily: font, fontSize: 12 * scale }} className="text-text-secondary">{s.description}</p>}
          </div>
        ))}
      </div>
      <div style={{ width: '100%', height: 1, background: '#222' }} className="mt-4" />
      {data.businessName && <p style={{ fontFamily: font, fontSize: 12 * scale }} className="text-text-secondary mt-3">{data.businessName}</p>}
      {data.serviceArea && <p style={{ fontFamily: font, fontSize: 11 * scale }} className="text-text-secondary">{data.serviceArea}</p>}
      {data.notes && <p style={{ fontFamily: font, fontSize: 10 * scale }} className="text-text-secondary/70 mt-2">{data.notes}</p>}
    </div>
  );
}

// T17: Soft Shadow
function T17SoftShadow({ data, font, Icon, titleStyle, contentStyle, scale, services }: TProps) {
  return (
    <div className="w-full h-full flex flex-col px-[8%] py-[6%]" style={{ background: '#F5F0FF' }}>
      <div className="bg-white rounded-3xl p-5" style={{ boxShadow: '0 8px 32px rgba(203,184,255,0.3)' }}>
        <div className="flex flex-col items-center">
          <Logo data={data} scale={scale} />
          <Icon className="text-primary mt-3" strokeWidth={1.5} style={{ width: 36 * scale, height: 36 * scale }} />
          <h1 style={titleStyle} className="text-text-primary text-center mt-2">{data.title}</h1>
          {data.subtitle && <p style={contentStyle} className="text-text-secondary text-center mt-1">{data.subtitle}</p>}
        </div>
      </div>
      <div className="mt-4 space-y-3">
        {services.map(s => (
          <div key={s.id} className="bg-white rounded-2xl p-3 flex items-center justify-between" style={{ boxShadow: '0 4px 16px rgba(203,184,255,0.2)' }}>
            <div className="flex-1">
              <p style={contentStyle} className="text-text-primary font-semibold">{s.name}</p>
              {s.description && <p style={{ fontFamily: font, fontSize: 12 * scale }} className="text-text-secondary">{s.description}</p>}
            </div>
            <p style={contentStyle} className="text-primary font-bold ml-2">{s.price}</p>
          </div>
        ))}
      </div>
      {data.businessName && <p style={{ fontFamily: font, fontSize: 12 * scale }} className="text-text-secondary mt-4 text-center">{data.businessName}</p>}
      {data.notes && <p style={{ fontFamily: font, fontSize: 10 * scale }} className="text-text-secondary/70 mt-2 text-center">{data.notes}</p>}
    </div>
  );
}

// T18: Neumorphism
function T18Neumorphism({ data, font, Icon, titleStyle, contentStyle, scale, services }: TProps) {
  const neo = { background: '#ECE7F5', boxShadow: `8px 8px 16px rgba(203,184,255,0.4), -8px -8px 16px rgba(255,255,255,0.8)` };
  return (
    <div className="w-full h-full flex flex-col items-center px-[8%] py-[6%]" style={{ background: '#ECE7F5' }}>
      <div className="rounded-3xl p-4" style={neo}>
        <Logo data={data} scale={scale} />
      </div>
      <Icon className="text-primary mt-4" strokeWidth={1.5} style={{ width: 36 * scale, height: 36 * scale }} />
      <h1 style={titleStyle} className="text-text-primary text-center mt-2">{data.title}</h1>
      {data.subtitle && <p style={contentStyle} className="text-text-secondary text-center mt-1">{data.subtitle}</p>}
      <div className="w-full mt-6 space-y-3">
        {services.map(s => (
          <div key={s.id} className="rounded-2xl p-3 flex items-center justify-between" style={neo}>
            <div className="flex-1">
              <p style={contentStyle} className="text-text-primary font-semibold">{s.name}</p>
              {s.description && <p style={{ fontFamily: font, fontSize: 12 * scale }} className="text-text-secondary">{s.description}</p>}
            </div>
            <p style={contentStyle} className="text-primary font-bold ml-2">{s.price}</p>
          </div>
        ))}
      </div>
      {data.businessName && <p style={{ fontFamily: font, fontSize: 12 * scale }} className="text-text-secondary mt-4">{data.businessName}</p>}
      {data.notes && <p style={{ fontFamily: font, fontSize: 10 * scale }} className="text-text-secondary/70 mt-3 text-center">{data.notes}</p>}
    </div>
  );
}

// T19: Instagram Style
function T19InstagramStyle({ data, font, Icon, titleStyle, contentStyle, scale, services }: TProps) {
  return (
    <div className="w-full h-full flex flex-col px-[8%] py-[6%]" style={{ background: 'linear-gradient(135deg, #FB5EA8 0%, #CBB8FF 100%)' }}>
      <div className="bg-white rounded-3xl p-5 h-full flex flex-col">
        <div className="flex items-center gap-3 pb-3 border-b border-lavender-100">
          <Logo data={data} scale={scale} />
          <div>
            <p style={{ fontFamily: font, fontSize: 14 * scale }} className="text-text-primary font-semibold">{data.businessName || 'Your Business'}</p>
            <p style={{ fontFamily: font, fontSize: 11 * scale }} className="text-text-secondary">{data.serviceArea || 'Price List'}</p>
          </div>
        </div>
        <div className="flex flex-col items-center py-4">
          <Icon className="text-primary" strokeWidth={1.5} style={{ width: 36 * scale, height: 36 * scale }} />
          <h1 style={titleStyle} className="text-text-primary text-center mt-2">{data.title}</h1>
          {data.subtitle && <p style={contentStyle} className="text-text-secondary text-center mt-1">{data.subtitle}</p>}
        </div>
        <div className="flex-1 space-y-2">
          {services.map(s => (
            <div key={s.id} className="flex items-center justify-between py-2 border-b border-lavender-50">
              <div className="flex-1">
                <p style={contentStyle} className="text-text-primary font-semibold">{s.name}</p>
                {s.description && <p style={{ fontFamily: font, fontSize: 11 * scale }} className="text-text-secondary">{s.description}</p>}
              </div>
              <p style={contentStyle} className="text-primary font-bold ml-2">{s.price}</p>
            </div>
          ))}
        </div>
        {data.notes && <p style={{ fontFamily: font, fontSize: 10 * scale }} className="text-text-secondary/70 mt-2 text-center">{data.notes}</p>}
      </div>
    </div>
  );
}

// T20: Premium Flyer
function T20PremiumFlyer({ data, font, Icon, titleStyle, contentStyle, scale, services }: TProps) {
  return (
    <div className="w-full h-full flex flex-col" style={{ background: 'linear-gradient(180deg, #1a1a2e 0%, #16213e 100%)' }}>
      <div className="flex-1 flex flex-col items-center justify-center px-[10%]" style={{ background: 'linear-gradient(135deg, #FB5EA8 0%, #CBB8FF 100%)' }}>
        <Logo data={data} scale={scale} />
        <Icon className="text-white mt-4" strokeWidth={1.5} style={{ width: 44 * scale, height: 44 * scale }} />
        <h1 style={{ ...titleStyle, color: 'white' }} className="text-center mt-2">{data.title}</h1>
        {data.subtitle && <p style={{ ...contentStyle, color: 'rgba(255,255,255,0.9)' }} className="text-center mt-1">{data.subtitle}</p>}
      </div>
      <div className="px-[8%] py-[5%]" style={{ background: '#16213e' }}>
        <div className="space-y-3">
          {services.map(s => (
            <div key={s.id} className="flex items-baseline justify-between border-b pb-2" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
              <div className="flex-1">
                <p style={{ ...contentStyle, color: 'white' }} className="font-semibold">{s.name}</p>
                {s.description && <p style={{ fontFamily: font, fontSize: 12 * scale, color: 'rgba(255,255,255,0.6)' }}>{s.description}</p>}
              </div>
              <p style={{ ...contentStyle, color: '#FF8EC2' }} className="font-bold ml-2">{s.price}</p>
            </div>
          ))}
        </div>
        {data.businessName && <p style={{ fontFamily: font, fontSize: 12 * scale, color: 'rgba(255,255,255,0.7)' }} className="mt-4 text-center">{data.businessName}</p>}
        {data.notes && <p style={{ fontFamily: font, fontSize: 10 * scale, color: 'rgba(255,255,255,0.5)' }} className="mt-2 text-center">{data.notes}</p>}
      </div>
    </div>
  );
}
