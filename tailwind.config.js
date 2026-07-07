/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'media',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#FB5EA8',
          light: '#FF8EC2',
          50: '#FFF0F7',
          100: '#FFD6EC',
          200: '#FFADD9',
          300: '#FF85C6',
          400: '#FF8EC2',
          500: '#FB5EA8',
          600: '#E04090',
          700: '#C0287A',
        },
        lavender: {
          DEFAULT: '#CBB8FF',
          50: '#F5F0FF',
          100: '#EAE0FF',
          200: '#D5C1FF',
          300: '#CBB8FF',
          400: '#B89EFF',
          500: '#9F80FF',
        },
        bg: {
          main: '#E4E4FF',
          card: '#FFFFFF',
        },
        border: {
          DEFAULT: '#F2E8F8',
        },
        text: {
          primary: '#222222',
          secondary: '#666666',
        },
      },
      borderRadius: {
        '2xl': '16px',
        '3xl': '24px',
        '4xl': '32px',
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif'],
        outfit: ['Outfit', 'sans-serif'],
        jakarta: ['Plus Jakarta Sans', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
        manrope: ['Manrope', 'sans-serif'],
        urbanist: ['Urbanist', 'sans-serif'],
        sora: ['Sora', 'sans-serif'],
        archivo: ['Archivo', 'sans-serif'],
        'space-grotesk': ['Space Grotesk', 'sans-serif'],
        playfair: ['Playfair Display', 'serif'],
        'dm-serif': ['DM Serif Display', 'serif'],
        cormorant: ['Cormorant Garamond', 'serif'],
        bodoni: ['Bodoni Moda', 'serif'],
        belleza: ['Belleza', 'sans-serif'],
        italiana: ['Italiana', 'serif'],
        marcellus: ['Marcellus', 'serif'],
        tenor: ['Tenor Sans', 'sans-serif'],
        quicksand: ['Quicksand', 'sans-serif'],
        poiret: ['Poiret One', 'cursive'],
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
        'shimmer': 'shimmer 1.5s infinite',
        'bounce-soft': 'bounceSoft 0.6s ease-out',
        'pulse-pink': 'pulsePink 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        bounceSoft: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        pulsePink: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(251, 94, 168, 0.3)' },
          '50%': { boxShadow: '0 0 0 8px rgba(251, 94, 168, 0)' },
        },
      },
      boxShadow: {
        'soft': '0 2px 16px rgba(203, 184, 255, 0.15)',
        'card': '0 4px 24px rgba(203, 184, 255, 0.2)',
        'pink': '0 4px 20px rgba(251, 94, 168, 0.3)',
        'pink-lg': '0 8px 32px rgba(251, 94, 168, 0.4)',
        'glass': '0 8px 32px rgba(203, 184, 255, 0.25)',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
};
