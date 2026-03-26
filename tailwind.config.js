/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "primary": "#D4AF37",
        "primary-dark": "#B8960C",
        "primary-light": "#F0D060",
        "gold": "#D4AF37",
        "gold-dark": "#B8960C",
        "gold-light": "#F0D060",
        "background-light": "#0a0a0a",
        "background-dark": "#000000",
        "surface": "#111111",
        "surface-2": "#1a1a1a",
        "border-gold": "#D4AF3730",
      },
      fontFamily: {
        "display": ["Plus Jakarta Sans"],
      },
      borderRadius: {
        "DEFAULT": "0.25rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "full": "9999px"
      },
    },
  },
  plugins: [],
}
