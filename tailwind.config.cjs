/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        neutral: {
          50: '#fafafa',
          100: '#f5f5f5',
          200: '#e5e5e5',
          300: '#d4d4d4',
          400: '#a3a3a3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
        }
      },
      maxHeight: {
        '120': '30rem',
        '100': '25rem',
      },
      minWidth: {
        '90': '22.5rem',
        '125': '31.25rem',
      },
      width: {
        '125': '31.25rem',
      },
      spacing: {
        '9.5': '2.375rem',
      },
      boxShadow: {
        'xs': '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        '2xs': '0 0 0 1px rgb(0 0 0 / 0.05)',
      }
    },
  },
  plugins: [],
}
