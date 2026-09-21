/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#16213A',
        'ink-2': '#0F1729',
        gold: '#C89B3C',
        'gold-soft': '#DFC183',
        clay: '#A6472A',
        ivory: '#F5EFE1',
        'ivory-2': '#EDE4CF',
        sage: '#5B6B45',
        'text-dark': '#201A14',
      },
      fontFamily: {
        display: ['Fraunces', 'serif'],
        body: ['"Work Sans"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
