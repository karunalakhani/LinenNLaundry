/** @type {import('tailwindcss').Config} */
import forms from '@tailwindcss/forms';

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        axonic: {
          primary: '#00003B', // Cetacean Blue
          secondary: '#000066', // Navy Blue
          accent: '#000099', // Duke Blue
          yellow: {
            DEFAULT: '#FFD600', // Yellow web
            light: '#FFEE00', // Canary Yellow
            dark: '#FFB800', // Selective Yellow
          },
        },
        text: {
          DEFAULT: '#17191F',
        },
        background: {
          DEFAULT: '#FFFFFF',
        },
      },
      fontFamily: {
        sans: ['Gotham', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [
    forms({
      strategy: 'class',
    }),
  ],
};
