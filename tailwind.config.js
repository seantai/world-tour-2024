// /** @type {import('tailwindcss').Config} */
const {
  default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");
const svgToDataUri = require("mini-svg-data-uri");
const iOSHeight = require("@rvxlab/tailwind-plugin-ios-full-height");

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["amarante", "sans-serif"],
        angkor: ["angkor", "sans-serif"],
      },
      backgroundImage: (theme) => ({
        "gradient-radial":
          // "radial-gradient(ellipse at center, #1abc9c 0%, #16a085 100%)",
          "radial-gradient(circle,  rgba(42,88,114,1) 30%, rgba(29,42,50,1) 70%)",
        "gradient-linear": (theme) => `linear-gradient(
          90deg,
          rgba(29,42,50,0) 0% ,
          rgba(42,88,114,1) 100%)`,
      }),
      animation: {
        shine: "shine .75s",
      },
      keyframes: {
        shine: {
          "100%": { left: "125%" },
        },
      },
      // cursor: {
      //   grab: "url(img/grab.png), auto",
      // },
      boxShadow: {
        neon: "0 0 10px #00ff00, 0 0 20px #00ff00, 0 0 30px #00ff00, 0 0 40px #00ff00",
      },
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
