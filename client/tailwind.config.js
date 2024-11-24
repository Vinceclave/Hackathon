/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{html,js,jsx,ts,tsx}', // Make sure these paths match your project structure
  ],
  theme: {
    extend: {
      fontFamily: {
        'playfair': '"Playfair Display", serif', 
        'poppins': '"Poppins", sans-serif', 
      },
    },
  },
  plugins: [],
}
