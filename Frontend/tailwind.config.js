/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        mainBgColor: 'var(--mainBgColor)',
        secondaryBgColor: 'var(--secondaryBgColor)',
        textColor: 'var(--textColor)',
        contrastColor: 'var(--contrastColor)',
        itemShadow: 'var(--shadow)',
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
}