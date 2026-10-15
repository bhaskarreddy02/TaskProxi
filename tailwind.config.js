/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#F0F5FF',
          100: '#E0EBFF',
          200: '#BAD3FE',
          300: '#85B4FD',
          400: '#488BFA',
          500: '#1A60DF',
          600: '#003B95', // User's Royal Cobalt / Sapphire Blue (#003B95)
          700: '#002F78',
          800: '#00245E',
          900: '#001A45',
          950: '#00102D',
        },
        navy: {
          800: '#152538',
          900: '#0D1826',
          950: '#070D14',
        }
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        subtle: '0 1px 3px 0 rgba(15, 23, 42, 0.06), 0 1px 2px -1px rgba(15, 23, 42, 0.04)',
        card: '0 2px 8px -2px rgba(15, 23, 42, 0.08), 0 1px 4px -1px rgba(15, 23, 42, 0.04)',
        float: '0 10px 25px -5px rgba(0, 59, 149, 0.16), 0 8px 10px -6px rgba(0, 59, 149, 0.10)',
      }
    },
  },
  plugins: [],
}
