/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
            "100": "#FFE8F0",
            DEFAULT: "#EE2B69",
        },
        secondary: "#FBE843",
        black: {
            "100": "#333333",
            "200": "#141413",
            "300": "#7D8087",
            DEFAULT: "#000000",
        },
        white: {
            "100": "#F7F7F7",
            DEFAULT: "#FFFFFF",
        },
    },
    fontFamily: {
        "work-sans": ["var(--font-work-sans)"],
    },
    borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
    },
    boxShadow: {
        100: "2px 2px 0px 0px rgb(0, 0, 0)",
        200: "2px 2px 0px 2px rgb(0, 0, 0)",
        300: "2px 2px 0px 2px rgb(238, 43, 105)",
    },
},
  },
  plugins: [],
}