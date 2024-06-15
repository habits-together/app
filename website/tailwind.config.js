const colors = require("./src/constants/colors");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors: colors,
    extend: {},
  },
  plugins: [],
};
