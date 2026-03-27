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
        "primary": "#0b50da",
        "primary-dark": "#0840b0",
        "primary-light": "#1a5ef5",
        "background": "#0f0f0f",
        "surface": "#1a1a1a",
        "surface-2": "#242424",
        "border": "#2a2a2a",
        "text-primary": "#ffffff",
        "text-secondary": "#b0b0b0",
        "text-tertiary": "#808080",
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
