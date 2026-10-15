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
          50: '#F0F7FF',
          100: '#E0EFFF',
          200: '#BAE0FD',
          300: '#7CC4FA',
          400: '#38A3F6',
          500: '#0E85E5',
          600: '#0267C1',
          700: '#02529E',
          800: '#064682',
          900: '#0B3B6D',
          950: '#07264A',
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
        float: '0 10px 25px -5px rgba(2, 82, 158, 0.12), 0 8px 10px -6px rgba(2, 82, 158, 0.08)',
      }
    },
  },
  plugins: [],
}
