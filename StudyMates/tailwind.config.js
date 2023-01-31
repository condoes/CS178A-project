/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,ts,jsx,tsx}", "./screens/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        cream: "#E4E5E3",
        offwhite: "#FFFCEE",
        pink: "#FFB2B2",
        purple: "#C3C3F0",
        lightpurple: "#E6E0FF",
        tan: "#FFF2D4",
        red: "#FF9F9F",
        darkgray: "#505050"
      },
      fontFamily: {
        fredoka: "FredokaMedium",
        worksans: "WorkSansMedium"
      },
      boxShadows: {
        "3xl": "0 16px 0px rgba(0, 0, 0, 0.25)"
      }
    }
  },
  plugins: []
};
