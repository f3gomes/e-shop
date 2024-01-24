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
          bg: "#ffffff",
          white: "#ffffff",
          card: "#f8fafc", // slate-50
          navbar: "#e2e8f0", // slate-200
          "footer-link": "#e2e8f0", // slate-200
          line: "#cbd5e1", // slate-300
          "input-text": "#94a3b8", // slate-400
          link: "#64748b", // slate-500
          btn: "#334155", // slate-700
          title: "#1e293b", // slate-800
          black: "#000000",
        },

        // shop: {
        //   bg: "#ffffff",
        //   white: "#ffffff",
        //   card: "#f8fafc",
        //   navbar: "#CDA140",
        //   "footer-link": "#e2e8f0",
        //   line: "#cbd5e1",
        //   "input-text": "#94a3b8",
        //   link: "#64748b",
        //   btn: "#CDA140",
        //   title: "#1e293b",
        //   black: "#000000",
        // },
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
