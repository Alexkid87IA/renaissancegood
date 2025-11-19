/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'laptop': '1280px',
      'xl': '1440px',
      '2xl': '1536px',
    },
    extend: {
      colors: {
        beige: '#fafaf8',
        'dark-text': '#1a1a1a',
        bronze: '#8b7355',
        'dark-bg': '#1a1a1a',
      },
      fontFamily: {
        serif: ['Playfair Display', 'Cormorant Garamond', 'serif'],
        sans: ['DM Sans', 'Inter', 'sans-serif'],
        display: ['Playfair Display', 'serif'],
      },
      letterSpacing: {
        'luxury': '0.15em',
        'ultra-wide': '0.25em',
        'extra-wide': '0.3em',
      },
      fontSize: {
        'display-xl': ['7rem', { lineHeight: '1', letterSpacing: '-0.02em' }],
        'display-lg': ['5.5rem', { lineHeight: '1.1', letterSpacing: '-0.01em' }],
        'display-md': ['4rem', { lineHeight: '1.1', letterSpacing: '0' }],
      },
    },
  },
  plugins: [],
};
