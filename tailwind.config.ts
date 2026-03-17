import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: '#FF7A1A',
        steel: '#4682B4',
        dark: '#000000',
        surface: '#060606',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        heading: ['"Space Grotesk"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      borderRadius: {
        custom: '8px',
      },
      animation: {
        'subtle-drift': 'subtle-drift 6s ease-in-out infinite',
        'fade-in-up': 'fade-in-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'dash-flow': 'dash-flow 2s linear infinite',
        'glow-pulse': 'glow-pulse 3s ease-in-out infinite',

        'micro-pulse': 'micro-pulse 0.6s ease-in-out',
        'shimmer': 'shimmer 2s linear infinite',
        'spotlight': 'spotlight 2s ease .75s 1 forwards',
      },
      keyframes: {
        'subtle-drift': {
          '0%, 100%': { transform: 'translateY(0) translateX(0)' },
          '50%': { transform: 'translateY(-10px) translateX(5px)' },
        },
        'fade-in-up': {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'dash-flow': {
          to: { strokeDashoffset: '-24' },
        },
        'glow-pulse': {
          '0%, 100%': { boxShadow: '0 0 30px rgba(255, 122, 26, 0.15)' },
          '50%': { boxShadow: '0 0 50px rgba(255, 122, 26, 0.25)' },
        },

        'micro-pulse': {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.04)' },
        },
        'shimmer': {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
        'spotlight': {
          '0%': { opacity: '0', transform: 'translate(-72%, -62%) scale(0.5)' },
          '100%': { opacity: '1', transform: 'translate(-50%, -40%) scale(1)' },
        },
      },
    },
  },
  plugins: [],
}
export default config
