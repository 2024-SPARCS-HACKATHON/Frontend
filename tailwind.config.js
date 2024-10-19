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
    },
  },
  plugins: [],
};
