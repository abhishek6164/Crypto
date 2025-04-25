/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",  // Ensure this includes all the paths where Tailwind classes might be used
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
