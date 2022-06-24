/** @type {import('tailwindcss').Config} */
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
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/line-clamp')
  ],
}
