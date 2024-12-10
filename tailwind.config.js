/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        "gradient-start": "#ff7a18", // Start color of the gradient
        "gradient-end": "#af002d", // End color of the gradient
      },
      backgroundImage: {
        "gradient-progress": "linear-gradient(45deg, #ff7a18, #af002d)", // Gradient from start to end
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        ".stroke-gradient": {
          stroke: "url(#gradient)",
        },
      });
    },
  ],
};
