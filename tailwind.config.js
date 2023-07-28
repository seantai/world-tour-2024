// /** @type {import('tailwindcss').Config} */
const {
  default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");
const svgToDataUri = require("mini-svg-data-uri");
const iOSHeight = require("@rvxlab/tailwind-plugin-ios-full-height");

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx,svg}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["amarante", "sans-serif"],
        angkor: ["angkor", "sans-serif"],
      },

      gridTemplateRows: {
        16: "repeat(16, minmax(0, 1fr))",
      },

      gridRowStart: {
        8: "8",
        9: "9",
        10: "10",
        11: "11",
        12: "12",
        13: "13",
        14: "14",
        15: "15",
        16: "16",
      },
      gridRowEnd: {
        8: "8",
        9: "9",
        10: "10",
        11: "11",
        12: "12",
        13: "13",
        14: "14",
        15: "15",
        16: "16",
      },
      // gridRow: {
      //   "span-7": "span 7 / span 7",
      //   "span-8": "span 8 / span 8",
      //   "span-9": "span 9 / span 9",
      //   "span-10": "span 10 / span 10",
      //   "span-11": "span 11 / span 11",
      //   "span-12": "span 12 / span 12",
      //   "span-13": "span 13 / span 13",
      //   "span-14": "span 14 / span 14",
      //   "span-15": "span 15 / span 15",
      // },
      // backgroundImage: (theme) => ({
      //   "gradient-radial":
      //     "radial-gradient(circle,  rgba(42,88,114,1) 30%, rgba(29,42,50,1) 70%)",
      //   "gradient-linear": (theme) => `linear-gradient(
      //     90deg,
      //     rgba(29,42,50,0) 0% ,
      //     rgba(42,88,114,1) 100%)`,
      // }),
      // animation: {
      //   shine: "shine .75s",
      // },
      // keyframes: {
      //   shine: {
      //     "100%": { left: "125%" },
      //   },
      // },
    },
  },
  plugins: [
    require("prettier-plugin-tailwindcss"),
    require("tailwind-scrollbar"),
    function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          "bg-grid": (value) => ({
            backgroundImage: `url("${svgToDataUri(
              `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32" fill="none" stroke="${value}"><path d="M0 .5H31.5V32"/></svg>`
            )}")`,
          }),
        },
        { values: flattenColorPalette(theme("backgroundColor")), type: "color" }
      );
    },
    iOSHeight,
  ],
};
