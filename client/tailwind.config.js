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
        flow: {
          dark: '#0a0306',
          darker: '#060103',
          card: 'rgba(25, 8, 14, 0.65)',
          cardHover: 'rgba(38, 12, 21, 0.85)',
          cardBorder: 'rgba(255, 255, 255, 0.12)',
          cardBorderHover: 'rgba(239, 68, 68, 0.45)',
          primary: '#ef4444',
          primaryHover: '#dc2626',
          ruby: '#e11d48',
          crimson: '#be123c',
          scarlet: '#ff2a4b',
          rose: '#f43f5e',
          accent: '#ffffff',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        glow: '0 0 25px -3px rgba(239, 68, 68, 0.4)',
        'glow-lg': '0 0 35px -3px rgba(239, 68, 68, 0.55)',
        'glow-white': '0 0 25px -3px rgba(255, 255, 255, 0.25)',
        'glow-ruby': '0 0 25px -3px rgba(225, 29, 72, 0.4)',
        'glass-card': '0 8px 32px 0 rgba(0, 0, 0, 0.45)',
      },
      backdropBlur: {
        xs: '2px',
      }
    },
  },
  plugins: [],
}
