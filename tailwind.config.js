/** @type {import('tailwindcss').Config} */
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
    },
  },
  plugins: [
    require("prettier-plugin-tailwindcss"),
    require("tailwind-scrollbar"),
  ],
};
