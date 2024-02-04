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
          card: "#f8fafc",
          navbar: "#e2e8f0",
          "footer-link": "#e2e8f0",
          line: "#cbd5e1",
          input: "#ffffff",
          "input-text": "#94a3b8",
          link: "#64748b",
          default: "#64748b",
          star: "#c5c5c5",
          btn: "#334155",
          title: "#1e293b",
          "category-selected": "#1e293b",
          black: "#000000",
        },

        // shop: {
        //   bg: "#222",
        //   white: "#ffffff",
        //   card: "#222",
        //   navbar: "#222",
        //   "footer-link": "#e2e8f0",
        //   line: "#cbd5e1",
        //   input: "#222",
        //   "input-text": "#94a3b8",
        //   link: "#64748b",
        //   default: "#ffffff",
        //   star: "#c5c5c5",
        //   btn: "#CDA140",
        //   title: "#ffffff",
        //   black: "#000000",
        //   "category-selected": "#222",
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
