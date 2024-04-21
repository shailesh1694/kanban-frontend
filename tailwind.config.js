/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary": "#cce9f1",
        "secondary": "#eaf0ef",
        "light": "#eaf0ef"
      }
    },
  },
  plugins: [],
}
