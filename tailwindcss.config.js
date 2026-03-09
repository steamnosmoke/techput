/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],

  darkMode: "class", // включение dark mode через class

  theme: {
    extend: {
      fontFamily: {
        rubik: ["Rubik", "sans-serif"],
        nk: ["NK89", "sans-serif"],
      },

      colors: {
        deepBlue: "#0c0d33",
        darkBg: "#0f172a",
        orange: "#DD6208",
      },

      screens: {
        'sm': "400px",
      }
    },
    
  },

  plugins: [],
};
