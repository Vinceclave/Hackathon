/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{html,js,jsx,ts,tsx}', // Ensure these paths match your project structure
  ],
  theme: {
    extend: {
      colors: {
        primary: '#22333b',    // Primary color - Dark Slate
        secondary: '#eae0d5',  // Secondary color - Light Beige
        accent: '#5e503f',     // Accent color - Dark Brown
        background: '#c6ac8f', // Background color - Light Brown
        muted: '#0a0908',      // Muted color - Dark Brownish Black
      },
      fontFamily: {
        primary: '"Playfair Display", serif', // Primary font
        secondary: '"Poppins", sans-serif',   // Secondary font
      },
    },
  },
  plugins: [],
}
