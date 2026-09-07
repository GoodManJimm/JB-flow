/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
   ],
  theme: {
    extend: {
      fontFamily: {
         sans: [
           "-apple-system", "BlinkMacSystemFont", "\"Segoe UI\"", "Roboto",
            "Helvetica", "Arial", "system-ui", "sans-serif",
          ],
        },
      colors: {
        brand: {
          50: "#eef2ff",
          100: "#e0e7ff",
          200: "#c7d2fe",
          300: "#a5b4fc",
          400: "#818cf8",
          500: "#6366f1",
          600: "#4f46e5",
          700: "#4338ca",
          800: "#312e81",
          900: "#1e1b4b",
         },
        live: {
          bg: "#ecfdf5",
          fg: "#047857",
          ring: "#a7f3d0",
           },
        info: {
          bg: "#eff6ff",
          fg: "#1d4ed8",
          ring: "#bfdbfe",
           },
        app: {
          bg: "#faf5ff",
          fg: "#7c3aed",
          ring: "#e9d5ff",
           },
        none: {
          bg: "#f3f4f6",
          fg: "#6b7280",
          ring: "#e5e7eb",
           },
        },
      boxShadow: {
        soft: "0 1px 2px rgba(16,24,40,0.04), 0 8px 24px rgba(16,24,40,0.08)",
        card: "0 1px 3px rgba(16,24,40,0.06), 0 12px 32px rgba(16,24,40,0.08)",
       },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",
       },
      keyframes: {
         "fade-up": {
            "0%": { opacity: "0", transform: "translateY(8px)" },
            "100%": { opacity: "1", transform: "translateY(0)" },
            },
       },
      animation: {
        "fade-up": "fade-up 0.35s ease-out both",
      },
    },
   },
  plugins: [],
};

export default config;
