const colors = require('tailwindcss/colors')

module.exports = {
  purge: {
    enabled: true,
    content: ['./src/**/*.{html,ts}'],
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
  important: true,
  theme: {
    extend: {
      colors: {
          primary: colors.blue,
          secondary: colors.gray,
          warn: colors.yellow,
          danger: colors.red
      },
  },
  }
  
}
