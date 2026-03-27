import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: 'rgb(var(--color-navy-rgb) / <alpha-value>)',
        teal: 'rgb(var(--color-teal-rgb) / <alpha-value>)',
        'teal-light': 'rgb(var(--color-teal-light-rgb) / <alpha-value>)',
        gold: 'rgb(var(--color-gold-rgb) / <alpha-value>)',
        cream: 'rgb(var(--color-cream-rgb) / <alpha-value>)',
        white: 'rgb(var(--color-white-rgb) / <alpha-value>)',
        charcoal: 'rgb(var(--color-charcoal-rgb) / <alpha-value>)',
        muted: 'rgb(var(--color-muted-rgb) / <alpha-value>)',
        footer: 'rgb(var(--color-footer-rgb) / <alpha-value>)',
        whatsapp: 'rgb(var(--color-whatsapp-rgb) / <alpha-value>)'
      },
      fontFamily: {
        heading: ['var(--font-heading)', 'serif'],
        body: ['var(--font-body)', 'sans-serif']
      },
      animation: {
        'ping-slow': 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite'
      }
    }
  },
  plugins: []
};

export default config;
