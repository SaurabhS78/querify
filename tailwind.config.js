module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      primary: "#5C61F0",
      indigo: {
        200: "#C7D2FE",
        300: "#A5B4FC",
        700: "#4338CA",
      },
      dark: "#282B30",
      black: "#1D2025",
      white: "#FFFFFF",
      grey: {
        100: "#6D7175",
        200: "#404348",
        300: "#33363A",
      },
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
