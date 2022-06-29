/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'ebony-clay': '#222831',
        'melony-clay': '#2C3540',
        'fiorid': '#465466',
        'raven': '#757C86',
        'sandy-brown': '#F2AA4C'
      }
    },
    screens: {
      'sxs': '350px',
      'xs': '510px',
      ...defaultTheme.screens,
      'sm': '690px',
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
    require('tailwind-scrollbar'),
    require('@tailwindcss/line-clamp')
  ],
}
