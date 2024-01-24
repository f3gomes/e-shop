import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  theme: {
    extend: {
      colors: {
        shop: {
          black: "#000000",
          white: "#ffffff",
          title: "#1e293b",         // slate-800
          btn: "#334155",           // slate-700
          link: "#64748b",          // slate-500
          "input-text": "#94a3b8",  // slate-400
          line: "#cbd5e1",          // slate-300
          "footer-link": "#e2e8f0", // slate-200
          card: "#f8fafc",          // slate-50
        },
      },

      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },

  plugins: [],
};

export default config;
