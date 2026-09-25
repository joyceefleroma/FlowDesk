/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          red: '#EF4444',
          darkRed: '#991B1B',
          lightRed: '#F87171',
          crimson: '#DC2626',
          amber: '#F59E0B',
          yellow: '#FBBF24',
          gold: '#F59E0B',
          lightYellow: '#FEF08A',
        },
        flow: {
          dark: '#080507',
          darker: '#040203',
          card: 'rgba(22, 12, 10, 0.65)',
          cardHover: 'rgba(35, 18, 14, 0.85)',
          cardBorder: 'rgba(255, 255, 255, 0.12)',
          cardBorderHover: 'rgba(245, 158, 11, 0.45)',
          primary: '#EF4444',
          accent: '#FBBF24',
          white: '#FFFFFF',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        glow: '0 0 25px -3px rgba(239, 68, 68, 0.45)',
        'glow-red': '0 0 30px -4px rgba(239, 68, 68, 0.5)',
        'glow-yellow': '0 0 30px -4px rgba(245, 158, 11, 0.5)',
        'glow-gold': '0 0 35px -3px rgba(251, 191, 36, 0.55)',
        'glow-white': '0 0 25px -3px rgba(255, 255, 255, 0.3)',
        'glass-card': '0 8px 32px 0 rgba(0, 0, 0, 0.5)',
      },
      backdropBlur: {
        xs: '2px',
      }
    },
  },
  plugins: [],
}

