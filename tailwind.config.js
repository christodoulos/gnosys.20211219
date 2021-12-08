const { guessProductionMode } = require('@ngneat/tailwind');

module.exports = {
  prefix: '',
  purge: {
    enabled: guessProductionMode(),
    content: ['./apps/**/*.{html,ts}', './libs/**/*.{html,ts}'],
    safelist: [
      'bg-green-50',
      'bg-red-50',
      'bg-red-200',
      'bg-yellow-50',
      'bg-yellow-200',
      'bg-blue-50',
      'bg-green-100',
      'bg-green-200',
      'bg-red-100',
      'bg-yellow-100',
      'bg-blue-100',
      'bg-indigo-200',
      'text-green-700',
      'text-red-700',
      'text-yellow-700',
      'text-blue-700',
      'text-green-800',
      'text-red-800',
      'text-yellow-800',
      'text-blue-800',
      'text-green-400',
      'text-red-400',
      'text-yellow-400',
      'text-blue-400',
      'text-green-500',
      'text-red-500',
      'text-yellow-500',
      'text-blue-500',
    ],
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/line-clamp'),
    require('@tailwindcss/typography'),
  ],
};
