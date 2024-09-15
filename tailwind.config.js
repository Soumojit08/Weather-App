/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/index.html"],
  theme: {
    extend: {
      fontFamily: {
        fn: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
  darkMode: "class",
};
