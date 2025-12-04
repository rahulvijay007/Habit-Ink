/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        'pastel-mint': '#B8E6D5',
        'pastel-lavender': '#D4C5F9',
        'pastel-cream': '#FFF8E7',
        'pastel-peach': '#FFDAC1',
        'pastel-blue': '#C9E4F2',
        'ink-dark': '#2C3E50',
        'ink-medium': '#5D6D7E',
      },
      fontFamily: {
        'handwriting': ['Caveat', 'cursive'],
        'clean': ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
