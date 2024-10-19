/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        phudu: ["Phudu", "sans-serif"],
        courier: ["Courier New", "monospace"],
        noto: ["Noto Sans KR", "sans-serif"],
        climate: ["Climate Crisis", "cursive"],
      },
      keyframes: {
        waveDrop: {
          "0%": { top: "-150%" },
          "100%": { top: "00%" },
        },
      },
      animation: {
        waveDrop: "waveDrop 3s ease-in-out forwards",
      },
      backgroundColor: {
        main: "#FFFAF2",
      },
    },
  },
  plugins: [],
};
