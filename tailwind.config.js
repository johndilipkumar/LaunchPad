/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        space: {
          darkest: 'hsl(234, 17%, 12%)',  // Slate 900
          darker: 'hsl(235, 16%, 14%)',   // Slate 800
          dark: 'hsl(236, 21%, 26%)',     // Slate 700
          lavender: 'hsl(237, 18%, 59%)',  // Lavender 300
          pink: 'hsl(345, 95%, 68%)',      // Pink 100
          neonPurple: '#a855f7',
          neonBlue: '#3b82f6',
          deepIndigo: '#0f0c1b',
        }
      },
      fontFamily: {
        sans: ['"Outfit"', '"Red Hat Text"', 'sans-serif'],
        redhat: ['"Red Hat Text"', 'sans-serif'],
      },
      boxShadow: {
        'neon-pink': '0 0 15px rgba(244, 63, 94, 0.5), 0 0 30px rgba(244, 63, 94, 0.2)',
        'neon-purple': '0 0 15px rgba(168, 85, 247, 0.5), 0 0 30px rgba(168, 85, 247, 0.2)',
        'neon-blue': '0 0 15px rgba(59, 130, 246, 0.5), 0 0 30px rgba(59, 130, 246, 0.2)',
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
      }
    },
  },
  plugins: [],
}
