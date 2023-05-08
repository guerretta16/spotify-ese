/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      height: {
        '100': 'calc(100vh - 3.5rem)'
      }
    },
  },
  plugins: [],
}

