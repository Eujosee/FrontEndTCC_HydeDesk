/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/**/*.{html,js}"
  ],
  theme: {
    extend: {
      fontFamily: {
        'Poppins': ['Poppins', 'sans-serif']
      },
      colors: {
        'azul-hyde': '#23AFFF',
        'azul-claro-hyde': '#55CCEF'
      }
    },
  },
  plugins: [],
}
