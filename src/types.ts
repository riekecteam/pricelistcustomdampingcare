export type DesignSize = 'feed' | 'story' | 'square' | 'a4';

export interface Service {
  id: string;
  name: string;
  price: string;
  description: string;
}

export interface PriceListData {
  logo: string | null;
  logoName: string;
  businessName: string;
  title: string;
  subtitle: string;
  serviceArea: string;
  services: Service[];
  notes: string;
  designSize: DesignSize;
  selectedIcon: string;
  selectedFont: string;
  selectedTemplate: number;
  titleSize: number;
  contentSize: number;
  priceSize: number;
  logoSize: number;
  letterSpacing: number;
  lineHeight: number;
  bold: boolean;
  uppercase: boolean;
  titleColor: string;
  contentColor: string;
  priceColor: string;
  instagram: string;
  whatsapp: string;
  tiktok: string;
  phone: string;
  email: string;
  website: string;
}

export const DEFAULT_DATA: PriceListData = {
  logo: null,
  logoName: '',
  businessName: '',
  title: 'PRICE LIST',
  subtitle: 'Premium Quality Service',
  serviceArea: '',
  services: [
    { id: '1', name: '', price: '', description: '' },
  ],
  notes: '',
  designSize: 'feed',
  selectedIcon: 'HeartPulse',
  selectedFont: 'poppins',
  selectedTemplate: 0,
  titleSize: 48,
  contentSize: 18,
  priceSize: 20,
  logoSize: 80,
  letterSpacing: 0,
  lineHeight: 1.5,
  bold: true,
  uppercase: true,
  titleColor: '#222222',
  contentColor: '#666666',
  priceColor: '#FB5EA8',
  instagram: '',
  whatsapp: '',
  tiktok: '',
  phone: '',
  email: '',
  website: '',
};

export const DESIGN_SIZES: { id: DesignSize; label: string; ratio: string; w: number; h: number }[] = [
  { id: 'feed', label: 'Instagram Feed', ratio: '4:5', w: 1080, h: 1350 },
  { id: 'story', label: 'Instagram Story', ratio: '9:16', w: 1080, h: 1920 },
  { id: 'square', label: 'Square', ratio: '1:1', w: 1080, h: 1080 },
  { id: 'a4', label: 'A4 Portrait', ratio: 'A4', w: 794, h: 1123 },
];

export interface FontOption {
  id: string;
  name: string;
  category: 'professional' | 'aesthetic';
  cssFamily: string;
}

export const FONTS: FontOption[] = [
  { id: 'poppins', name: 'Poppins', category: 'professional', cssFamily: "'Poppins', sans-serif" },
  { id: 'montserrat', name: 'Montserrat', category: 'professional', cssFamily: "'Montserrat', sans-serif" },
  { id: 'outfit', name: 'Outfit', category: 'professional', cssFamily: "'Outfit', sans-serif" },
  { id: 'jakarta', name: 'Plus Jakarta Sans', category: 'professional', cssFamily: "'Plus Jakarta Sans', sans-serif" },
  { id: 'inter', name: 'Inter', category: 'professional', cssFamily: "'Inter', sans-serif" },
  { id: 'manrope', name: 'Manrope', category: 'professional', cssFamily: "'Manrope', sans-serif" },
  { id: 'urbanist', name: 'Urbanist', category: 'professional', cssFamily: "'Urbanist', sans-serif" },
  { id: 'sora', name: 'Sora', category: 'professional', cssFamily: "'Sora', sans-serif" },
  { id: 'archivo', name: 'Archivo', category: 'professional', cssFamily: "'Archivo', sans-serif" },
  { id: 'space-grotesk', name: 'Space Grotesk', category: 'professional', cssFamily: "'Space Grotesk', sans-serif" },
  { id: 'playfair', name: 'Playfair Display', category: 'aesthetic', cssFamily: "'Playfair Display', serif" },
  { id: 'dm-serif', name: 'DM Serif Display', category: 'aesthetic', cssFamily: "'DM Serif Display', serif" },
  { id: 'cormorant', name: 'Cormorant Garamond', category: 'aesthetic', cssFamily: "'Cormorant Garamond', serif" },
  { id: 'bodoni', name: 'Bodoni Moda', category: 'aesthetic', cssFamily: "'Bodoni Moda', serif" },
  { id: 'belleza', name: 'Belleza', category: 'aesthetic', cssFamily: "'Belleza', sans-serif" },
  { id: 'italiana', name: 'Italiana', category: 'aesthetic', cssFamily: "'Italiana', serif" },
  { id: 'marcellus', name: 'Marcellus', category: 'aesthetic', cssFamily: "'Marcellus', serif" },
  { id: 'tenor', name: 'Tenor Sans', category: 'aesthetic', cssFamily: "'Tenor Sans', sans-serif" },
  { id: 'quicksand', name: 'Quicksand', category: 'aesthetic', cssFamily: "'Quicksand', sans-serif" },
  { id: 'poiret', name: 'Poiret One', category: 'aesthetic', cssFamily: "'Poiret One', cursive" },
];

export interface IconOption {
  name: string;
  category: string;
  label: string;
}

export const ICONS: IconOption[] = [
  { name: 'Baby', category: 'Usia', label: 'Bayi' },
  { name: 'Child', category: 'Usia', label: 'Balita' },
  { name: 'Kids', category: 'Usia', label: 'Anak' },
  { name: 'UserRound', category: 'Usia', label: 'Remaja' },
  { name: 'User', category: 'Usia', label: 'Dewasa' },
  { name: 'Accessibility', category: 'Usia', label: 'Lansia' },
  { name: 'Wheelchair', category: 'Pasien', label: 'Wheelchair' },
  { name: 'BedDouble', category: 'Pasien', label: 'Hospital Bed' },
  { name: 'UserCircle', category: 'Pasien', label: 'User' },
  { name: 'HeartPulse', category: 'Pasien', label: 'Heart Pulse' },
  { name: 'ShieldCheck', category: 'Pasien', label: 'Shield Check' },
  { name: 'Activity', category: 'Pasien', label: 'Activity' },
  { name: 'Hospital', category: 'Rumah Sakit', label: 'Hospital' },
  { name: 'Ambulance', category: 'Rumah Sakit', label: 'Ambulance' },
  { name: 'Stethoscope', category: 'Rumah Sakit', label: 'Stethoscope' },
  { name: 'Kit', category: 'Rumah Sakit', label: 'First Aid Kit' },
  { name: 'Pill', category: 'Rumah Sakit', label: 'Pill' },
  { name: 'ClipboardPlus', category: 'Rumah Sakit', label: 'Clipboard Medical' },
  { name: 'HeartHandshake', category: 'Caregiver', label: 'Hand Heart' },
  { name: 'HandHeart', category: 'Caregiver', label: 'Helping Hand' },
  { name: 'UserCheck', category: 'Caregiver', label: 'User Check' },
  { name: 'Users', category: 'Caregiver', label: 'Users' },
  { name: 'Handshake', category: 'Caregiver', label: 'Handshake' },
  { name: 'UserPlus', category: 'Caregiver', label: 'User Heart' },
  { name: 'Car', category: 'Layanan', label: 'Car' },
  { name: 'Home', category: 'Layanan', label: 'Home' },
  { name: 'CalendarCheck', category: 'Layanan', label: 'Calendar Check' },
  { name: 'Clock', category: 'Layanan', label: 'Clock' },
  { name: 'Phone', category: 'Layanan', label: 'Phone' },
  { name: 'MapPin', category: 'Layanan', label: 'Map Pin' },
];

export const ICON_CATEGORIES = ['Semua', 'Usia', 'Pasien', 'Caregiver', 'Rumah Sakit', 'Layanan'];

export const TEMPLATES = [
  'Minimal Clean', 'Soft Pink', 'Luxury White', 'Glassmorphism', 'Modern Card',
  'Korean Style', 'Pinterest Style', 'Editorial', 'Magazine', 'Elegant Black',
  'Pastel Gradient', 'Bento Grid', 'Premium Clinic', 'Beauty Studio', 'Floral Minimal',
  'Line Art', 'Soft Shadow', 'Neumorphism', 'Instagram Style', 'Premium Flyer',
];
