/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Esto le dice que busque en TODOS tus componentes
  ],
  theme: {
    extend: {
      colors: {
        "lol-gold": "#c8aa6e",
        "lol-blue": "#010a13",
        "lol-gold-dark": "#785a28",
      },
    },
  },
  plugins: [],
};
