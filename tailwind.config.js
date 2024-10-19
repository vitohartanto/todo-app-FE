/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-custom':
          'linear-gradient(to right, hsl(192, 100%, 67%), hsl(280, 87%, 65%))',
      },
    },
  },
  plugins: [],
};
