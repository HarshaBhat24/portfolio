/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        terminal: {
          bg:     '#050508',
          surface:'#0A0A12',
          elevated:'#111120',
          border:  '#18182A',
          'border-hi': '#252540',
        },
        amber: {
          50:  '#FFFDF5',
          100: '#FFF8E0',
          200: '#FFEEA0',
          300: '#FFD84D',
          400: '#F5A623',
          500: '#E08800',
          600: '#B86A00',
          700: '#8C4E00',
          800: '#5E3200',
          900: '#361C00',
        },
        neon: {
          pink:  '#FF2D78',
          teal:  '#00D4AA',
          lime:  '#A8FF3E',
        },
        ink: {
          50:  '#F8F4EC',
          100: '#EDE6D4',
          200: '#D4C9A8',
          300: '#A89880',
          400: '#7A6C58',
          500: '#4E4238',
          600: '#2A2018',
        },
      },
      fontFamily: {
        mono: ['var(--font-mono)', 'JetBrains Mono', 'Fira Code', 'monospace'],
        sans: ['var(--font-sans)', 'Space Grotesk', 'Inter', 'sans-serif'],
      },
      animation: {
        'cursor-blink':   'cursorBlink 1s step-end infinite',
        'float':          'float 6s ease-in-out infinite',
        'glow-pulse':     'glowPulse 3s ease-in-out infinite',
        'slide-in-left':  'slideInLeft 0.5s ease-out',
        'fade-up':        'fadeUp 0.6s ease-out',
      },
      keyframes: {
        cursorBlink: {
          '0%, 100%': { opacity: '1' },
          '50%':      { opacity: '0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-10px)' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 8px rgba(245,166,35,0.25)' },
          '50%':      { boxShadow: '0 0 24px rgba(245,166,35,0.55), 0 0 48px rgba(245,166,35,0.15)' },
        },
        slideInLeft: {
          '0%':   { transform: 'translateX(-16px)', opacity: '0' },
          '100%': { transform: 'translateX(0)',     opacity: '1' },
        },
        fadeUp: {
          '0%':   { transform: 'translateY(16px)', opacity: '0' },
          '100%': { transform: 'translateY(0)',    opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
