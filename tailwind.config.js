/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Inclut tous les fichiers JS, JSX, TS et TSX dans le dossier `src`
    "./public/index.html"         // Assure que le fichier HTML principal est pris en compte
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
