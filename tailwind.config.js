/** @type {import('tailwindcss').Config} */
// Lenguaje visual claro inspirado en Apple.
// Formas: botones en pill, tarjetas/tiles 28px (rounded-[28px]), inputs 12px (rounded-xl).
export default {
  content: ['./index.html', './src/**/*.{ts,tsx,js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', '"SF Pro Display"', '"Geist Variable"', 'system-ui', 'sans-serif'],
      },
      colors: {
        canvas: '#ffffff',
        paper: '#f5f5f7',
        ink: {
          DEFAULT: '#1d1d1f',
          // muted 6.2:1 y subtle 4.9:1 sobre blanco (WCAG AA para texto normal)
          muted: '#5c5c61',
          subtle: '#6e6e73',
        },
        line: '#d2d2d7',
        brand: {
          DEFAULT: '#2f5bea',
          hover: '#2449c4',
          light: '#4f7cff',
          soft: '#eef2ff',
        },
        navy: {
          DEFAULT: '#1e3a8a',
          deep: '#0b1a3f',
        },
      },
      maxWidth: { page: '1120px' },
      transitionTimingFunction: {
        out: 'cubic-bezier(0.23, 1, 0.32, 1)',
        'in-out': 'cubic-bezier(0.77, 0, 0.175, 1)',
      },
      keyframes: {
        marquee: { to: { transform: 'translateX(-50%)' } },
        'marquee-reverse': { from: { transform: 'translateX(-50%)' }, to: { transform: 'translateX(0)' } },
        'pulse-trace': {
          '0%': { strokeDashoffset: '6' },
          '70%,100%': { strokeDashoffset: '-100' },
        },
        float: {
          '0%,100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        'float-shadow': {
          '0%,100%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(0.94)', opacity: '0.8' },
        },
        twinkle: {
          '0%,100%': { opacity: '0.2' },
          '50%': { opacity: '1' },
        },
        nudge: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(5px)' },
        },
        drift: {
          '0%,100%': { transform: 'translate3d(0,0,0) scale(1)' },
          '50%': { transform: 'translate3d(8%,-6%,0) scale(1.12)' },
        },
      },
      animation: {
        marquee: 'marquee 45s linear infinite',
        'marquee-reverse': 'marquee-reverse 50s linear infinite',
        drift: 'drift 18s ease-in-out infinite',
        'pulse-trace': 'pulse-trace 5s linear infinite',
        float: 'float 6s cubic-bezier(0.45, 0, 0.55, 1) infinite',
        'float-shadow': 'float-shadow 6s cubic-bezier(0.45, 0, 0.55, 1) infinite',
        twinkle: 'twinkle 2.4s ease-in-out infinite',
        nudge: 'nudge 1.8s cubic-bezier(0.45, 0, 0.55, 1) infinite',
      },
    },
  },
  plugins: [],
}
