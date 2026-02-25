/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        sand: {
          50: '#f6f3eb',
          100: '#ede8dc',
          200: '#dfd7c8',
          300: '#cdc2ae',
        },
        forest: {
          500: '#5b6c59',
          600: '#3f503d',
          700: '#31422f',
          800: '#2a3728',
          900: '#243022',
        },
        fern: {
          100: '#dde8d7',
          200: '#c7d8bc',
          300: '#a8c094',
          500: '#7d9f67',
          600: '#658655',
          700: '#4d6d43',
        },
        clay: {
          200: '#e9c0ab',
          500: '#c47752',
          700: '#99553a',
        },
        honey: {
          500: '#db9d3f',
        },
      },
      fontFamily: {
        serif: ['Cormorant Garamond', 'serif'],
        sans: ['Manrope', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 16px 50px -18px rgba(36, 48, 34, 0.35)',
      },
    },
  },
  plugins: [],
};
