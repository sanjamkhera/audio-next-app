/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      screens: {
        'xs': {'max': '390px'},
        'xm': {'min': '391px', 'max': '818px'},
        'sl': {'min': '1024px', 'max': '1179px'},
        'al': {'min': '818px', 'max': '1023px'},
        'mx': {'min': '1180px'},
      },
      keyframes: {
        wave: {
          '0%, 100%': { transform: 'translateY(0)' },
          '25%': { transform: 'translateY(-10px)' },
          '50%': { transform: 'translateY(10px)' },
          '75%': { transform: 'translateY(-10px)' },
        },
        smoothScroll: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' }, 
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
      },
      animation: {
        smoothScroll: 'smoothScroll 20s linear infinite',
        blink: 'blink 1s steps(1, end) infinite',
      },
      colors: {
        customGray: '#C0CBD8', 
        justPretty: '#939CA7',
        prettyGray: 'rgba(13, 17, 38, 0.35)',
        placeHolderGray: 'rgba(10, 15, 41, 0.25)',
      },
      fontFamily: {
        sans: ['"Helvetica Neue"', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
};