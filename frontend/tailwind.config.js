/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#00C853',
          dark: '#00A344',
          light: '#5EE685',
        },
        secondary: {
          DEFAULT: '#00ACC1',
          dark: '#00838F',
          light: '#4DD0E1',
        },
        accent: '#FFD600',
        background: '#F8FAFC',
        // A warm, slightly toasted paper tone — used sparingly for ticket
        // stock, dividers, and texture instead of flat white everywhere.
        kraft: {
          DEFAULT: '#F1EADC',
          dark: '#E4D9C3',
        },
        surface: '#FFFFFF',
        dark: '#0F172A',
        success: '#22C55E',
        danger: '#EF4444',
      },
      fontFamily: {
        // Fraunces: a warm, slightly humanist serif with real character —
        // used only for display type, set with restraint.
        display: ['"Fraunces"', 'ui-serif', 'Georgia', 'serif'],
        body: ['"Inter"', 'sans-serif'],
        // Ticket stamps, timestamps, eyebrow labels, stat figures — the
        // "receipt" register that ties back to the rescue-ticket motif.
        mono: ['"Space Mono"', 'ui-monospace', 'monospace'],
      },
      borderRadius: {
        xl2: '1.25rem',
      },
      boxShadow: {
        soft: '0 8px 30px rgba(15, 23, 42, 0.08)',
        glass: '0 8px 32px rgba(31, 38, 135, 0.15)',
        ticket: '0 18px 40px -12px rgba(15, 23, 42, 0.22)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(var(--tilt, 0deg))' },
          '50%': { transform: 'translateY(-10px) rotate(var(--tilt, 0deg))' },
        },
        stamp: {
          '0%': { opacity: '0', transform: 'scale(2.4) rotate(-18deg)' },
          '60%': { opacity: '1', transform: 'scale(0.92) rotate(-12deg)' },
          '100%': { opacity: '1', transform: 'scale(1) rotate(-12deg)' },
        },
        dash: {
          to: { strokeDashoffset: '0' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        float: 'float 5s ease-in-out infinite',
        stamp: 'stamp 0.6s cubic-bezier(0.2, 0.8, 0.2, 1) forwards',
        dash: 'dash 1.6s ease-out forwards',
        marquee: 'marquee 28s linear infinite',
      },
    },
  },
  plugins: [],
};
