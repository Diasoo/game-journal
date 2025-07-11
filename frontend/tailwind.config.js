/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        brand: {
          DEFAULT: '#3b82f6', // blue-500
          light: '#60a5fa', // blue-400
          dark: '#2563eb', // blue-600
        },
      }
    },
  },
  plugins: [],
}