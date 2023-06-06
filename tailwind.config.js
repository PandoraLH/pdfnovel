/** @type {import('tailwindcss').Config} */
module.exports = {
   content: [
      "./app/**/*.{js,ts,jsx,tsx}",
      "./pages/**/*.{js,ts,jsx,tsx}",
      "./components/**/*.{js,ts,jsx,tsx}",
   ],
   theme: {
      extend: {
         fontFamily: {
            inter: ["Inter", "sans-serif"],
            poppins: ["Poppins", "sans-serif"],
         },
         colors: {
            transparent: "transparent",
            current: "currentColor",
            "main-bg-color": "#ff9a92",
            "main-text-color": "#f4f4f8",
            "logo-color": "#ffda55",
            "border-color": "rgb(209 213 219 / var(--tw-border-opacity))",
         },
      },
   },
   plugins: [require("@tailwindcss/line-clamp")],
};
