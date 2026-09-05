import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    extend: {
      screens: {
        xs: '400px',
      },
      colors: {
        white: '#FFFFFF',
        cream: '#F7F5F3',
        ink: '#141414',
        'ink-soft': '#4A4A4A',
        muted: '#8A8681',
        line: 'rgba(20,20,20,0.10)',
        'line-soft': 'rgba(20,20,20,0.06)',
        red: '#E10600',
        'red-hi': '#FF4D42',
        'red-lo': '#A80500',
        // legacy aliases kept so older component classes still resolve
        black: '#141414',
        'deep-black': '#F7F5F3',
        card: '#FFFFFF',
        'card-alt': '#F7F5F3',
        'primary-red': '#E10600',
        'bright-red': '#FF4D42',
      },
      fontFamily: {
        display: ['var(--font-manrope)', 'sans-serif'],
        body: ['var(--font-inter)', 'sans-serif'],
        mono: ['var(--font-jbmono)', 'monospace'],
      },
      borderColor: {
        card: 'rgba(20,20,20,0.10)',
        'card-hover': 'rgba(225,6,0,0.35)',
      },
      keyframes: {
        pulseDot: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.35', transform: 'scale(0.85)' },
        },
        riseIn: {
          '0%': { opacity: '0', transform: 'translateY(14px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        ringPulse: {
          '0%': { transform: 'scale(1)', opacity: '0.55' },
          '100%': { transform: 'scale(1.9)', opacity: '0' },
        },
        floatBob: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-4px)' },
        },
        popIn: {
          '0%': { opacity: '0', transform: 'scale(0.4) translateY(20px)' },
          '60%': { opacity: '1', transform: 'scale(1.08) translateY(-2px)' },
          '100%': { opacity: '1', transform: 'scale(1) translateY(0)' },
        },
      },
      animation: {
        'pulse-dot': 'pulseDot 1.6s ease-in-out infinite',
        'rise-in': 'riseIn 0.6s ease-out both',
        'ring-pulse': 'ringPulse 2.2s cubic-bezier(0.2,0.6,0.4,1) infinite',
        'float-bob': 'floatBob 3s ease-in-out infinite',
        'pop-in': 'popIn 0.6s cubic-bezier(0.2,0.8,0.3,1.2) both',
      },
      backgroundImage: {
        'hero-glow':
          'radial-gradient(60% 80% at 15% 0%, rgba(225,6,0,0.07) 0%, transparent 60%), radial-gradient(35% 40% at 85% 20%, rgba(225,6,0,0.05) 0%, transparent 70%)',
      },
    },
  },
  plugins: [],
}
export default config
