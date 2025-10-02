/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'minecraft-dirt': '#8B7355',
        'minecraft-stone': '#808080',
        'minecraft-nether': '#7B1F1F',
        'minecraft-gold': '#FFD700',
      },
      fontFamily: {
        'minecraft': ['Press Start 2P', 'monospace'],
      }
    },
  },
  plugins: [],
}
