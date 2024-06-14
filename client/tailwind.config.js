const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  mode: "jit",
  content: [
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./layouts/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        Josefin: ["Josefin Sans", ...defaultTheme.fontFamily.sans],
        Roboto: ["Roboto", ...defaultTheme.fontFamily.sans],
      },
      transitionProperty: {
        width: "width",
      },
      colors: {
        background: "#F7F8FA",
        foreground: "#FFFFFF",
        faded: "rgba(173,173,173,0.09)",
        primary: "#0090FF",
        primaryFaded: "#809FB8",
        text: {
          primary: {
            enabled: "#3f3f3f",
          },
        },
        info: "#3ABFF8",
        success: "#36D399",
        warning: "#FBBD23",
        error: "#F87272",
        dash: {
          score: { start: "#B7B7B7", end: "#9f9f9f" },
          critical: { start: "#FF8B87", end: "#ff7672" },
          high: { start: "#ffad65", end: "#ffa957" },
          medium: { start: "#ffcd7b", end: "#ffc059" },
          low: { start: "#83fdd6", end: "#60ffcc" },
          info: { start: "#7ec3f8", end: "#56b6ff" },
        },
      },
    },
  },
  plugins: [],
  daisyui: {
    themes: [],
  },
};
