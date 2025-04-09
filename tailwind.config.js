/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        red: {
          50: "#fef2f2",
          300: "#fca5a5",
          400: "#f87171",
          500: "#ef4444",
          600: "#dc2626",
        },
        orange: {
          500: "#f97316",
        },
        yellow: {
          400: "#facc15",
          500: "#eab308",
        },
        blue: {
          200: "#bfdbfe",
          500: "#3b82f6",
        },
        slate: {
          400: "#94a3b8",
        },
        gray: {
          50: "#f9fafb",
          100: "#f3f4f6",
          200: "#e5e7eb",
          300: "#d1d5db",
          400: "#9ca3af",
          500: "#6b7280",
          700: "#374151",
        },
      },
    },
  },
  plugins: [],
}
