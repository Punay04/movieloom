/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}", // ✅ for Expo Router pages/screens
    "./components/**/*.{js,jsx,ts,tsx}", // ✅ for reusable components
    "./App.tsx", // ✅ for root app file
    "./app/global.css", // ✅ for global CSS used in web
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {},
  },
  plugins: [],
};
