/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'sm': { 'min': '0px', 'max': '639px' },
      'md': '639px'
    },
    extend: {
      colors: {
        'purple-c': '#6e57a5',
        'blue-light': '#92daf1',
        'm-bg': '#071F2A',
        'm-text': '#A9AB34',
        'metric': '#1F2937'
      }
    },
  },
  plugins: [],
}

