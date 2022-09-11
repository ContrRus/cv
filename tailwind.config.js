/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        mainBlue: "#1F4258",
        'dnd-1-col-color': "#a2622d",
        'dnd-2-col-color': "#1b6161",
        'dnd-3-col-color': "#248224",
        'dnd-4-col-color': "#a22d22"
      },
      gridTemplateRows: {
        "custom-min-7-max-auto": "minmax(7rem,auto) repeat(5,6rem)",
      },
      container: {
        center: true,
        // padding: {
        //   DEFAULT: "1rem",
        //   sm: "2rem",
        //   lg: "4rem",
        //   xl: "5rem",
        //   "2xl": "6rem",
        // },
      },
    },
  },
  plugins: [],
};
