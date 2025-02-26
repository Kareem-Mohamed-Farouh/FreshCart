/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}", "./node_modules/flowbite/**/*.js"], // add this line
  theme: {
    extend: {},
    container: { center: true },
  },
  plugins: [require('flowbite/plugin')],// add this line
  darkMode: 'selector'

}

