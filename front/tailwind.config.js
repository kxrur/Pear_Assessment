/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#A7292A',
        foreground: '#909779',
        secondary: '#D3B58D',
        accent: '#F2EBE2',
        highlight: '#B8C0FF',
      },
    },
  },
  plugins: [],
}

