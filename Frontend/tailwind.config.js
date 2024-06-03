/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: {
    content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
    options: {
      safelist: [
        'text-base-xs', 'text-base-sm', 'text-base-base', 'text-base-lg', 'text-base-xl',
        'text-base-2xl', 'text-base-3xl', 'text-base-4xl', 'text-big-xs', 'text-big-sm',
        'text-big-base', 'text-big-lg', 'text-big-xl', 'text-big-2xl', 'text-big-3xl',
        'text-big-4xl'
      ],
    },
  },
  theme: {
    extend: {
      fontSize: {
        'base-xs': ['0.75rem', { lineHeight: '1rem' }],
        'base-sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base-base': ['1rem', { lineHeight: '1.5rem' }],
        'base-lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'base-xl': ['1.25rem', { lineHeight: '1.75rem' }],
        'base-2xl': ['1.5rem', { lineHeight: '2rem' }],
        'base-3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        'base-4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        'big-xs': ['0.875rem', { lineHeight: '1.25rem' }],
        'big-sm': ['1rem', { lineHeight: '1.5rem' }],
        'big-base': ['1.125rem', { lineHeight: '1.75rem' }],
        'big-lg': ['1.25rem', { lineHeight: '1.75rem' }],
        'big-xl': ['1.5rem', { lineHeight: '2rem' }],
        'big-2xl': ['1.875rem', { lineHeight: '2.25rem' }],
        'big-3xl': ['2.25rem', { lineHeight: '2.5rem' }],
        'big-4xl': ['3rem', { lineHeight: '1' }],
      },
      colors: {
        mainBgColor: 'var(--mainBgColor)',
        secondaryBgColor: 'var(--secondaryBgColor)',
        thirdBgColor: 'var(--thirdBgColor)',
        textColor: 'var(--textColor)',
        contrastColor: 'var(--contrastColor)',
      },
      boxShadow: {
        itemShadow: 'var(--itemShadow)',
        itemShadowBottom: 'var(--itemShadowBottom)',
        itemShadowWithoutTop: 'var(--itemShadowWithoutTop)'
      },
    },
  }
}