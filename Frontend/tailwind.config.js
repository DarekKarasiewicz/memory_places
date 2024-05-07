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
        thirdBgColor: 'var(--thirdBgColor)',
        textColor: 'var(--textColor)',
        contrastColor: 'var(--contrastColor)',
      },
      boxShadow: {
        itemShadow: 'var(--itemShadow)',
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
}