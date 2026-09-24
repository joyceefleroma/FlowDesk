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
          dark: '#0a0d14',
          card: '#111726',
          cardBorder: 'rgba(255, 255, 255, 0.08)',
          cardBorderHover: 'rgba(99, 102, 241, 0.3)',
          primary: '#6366f1',
          primaryHover: '#4f46e5',
          cyan: '#06b6d4',
          purple: '#8b5cf6',
          emerald: '#10b981',
          rose: '#f43f5e',
          amber: '#f59e0b',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 0 20px -5px rgba(99, 102, 241, 0.3)',
        'glow-cyan': '0 0 20px -5px rgba(6, 182, 212, 0.3)',
        'glow-purple': '0 0 20px -5px rgba(139, 92, 246, 0.3)',
      }
    },
  },
  plugins: [],
}
