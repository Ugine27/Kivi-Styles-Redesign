/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Editorial New"', 'Editorial', 'Newsreader', 'serif'],
        serif: ['"Editorial New"', 'Editorial', 'Newsreader', 'serif'],
      }
    },
  },
  plugins: [],
}
