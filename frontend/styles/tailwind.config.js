/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        cyan: {
          400: '#00f5d4',
          500: '#00d1b2',
          600: '#00b894',
        },
        magenta: {
          500: '#f72585',
          600: '#d81e6f',
        },
      },
      animation: {
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'fade-in': 'fade-in 0.5s ease-out',
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 5px rgba(0, 245, 212, 0.5)' },
          '50%': { boxShadow: '0 0 20px rgba(0, 245, 212, 0.8)' },
        },
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};