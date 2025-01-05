/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#eef2ff",
          100: "#e0e7ff",
          200: "#c7d2fe",
          300: "#a5b4fc",
          400: "#818cf8",
          500: "#6366f1",
          600: "#4f46e5",
          700: "#4338ca",
          800: "#3730a3",
          900: "#312e81",
          950: "#1e1b4b",
        },
        dark: {
          100: "#1f2937",
          200: "#111827",
          300: "#0a0f1a",
        },
        light: {
          100: "#ffffff",
          200: "#f9fafb",
          300: "#f3f4f6",
        },
      },
      spacing: {
        128: "32rem",
      },
      boxShadow: {
        soft: "0 2px 15px 0 rgba(0, 0, 0, 0.05)",
        strong: "0 0 50px 0 rgba(0, 0, 0, 0.1)",
      },
    },
  },
  plugins: [],
};

export default config;
