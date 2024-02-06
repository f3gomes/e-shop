import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  theme: {
    extend: {
      screens: {
        "max-sm": { max: "639px" },
      },
      colors: {
        // shop: {
        //   body: {
        //     bg: "#ffffff",
        //     drop: "#e2e8f0",
        //     banner: {
        //       text: "#ffffff",
        //     },
        //   },

        //   text: {
        //     title: "#1e293b",
        //     default: "#1e293b",
        //     sub: "#64748b",
        //     border: "#cbd5e1",
        //   },

        //   header: {
        //     bg: "#e2e8f0",
        //     text: "#1e293b",
        //     icon: {
        //       color: "#1e293b",
        //       text: "#ffffff",
        //       bg: "#64748b",
        //     },
        //   },

        //   nav: {
        //     bg: "#ffffff",
        //     text: "#64748b",
        //     border: "#1e293b",
        //     selected: "#1e293b",
        //   },

        //   menu: {
        //     bg: "#ffffff",
        //     item: {
        //       hover: "#e2e8f0",
        //       border: "#94a3b8",
        //     },
        //   },

        //   card: {
        //     border: "#e2e8f0",
        //     bg: "#f8fafc",
        //     text: "",
        //     selected: "#64748b",
        //   },

        //   btn: {
        //     bg: "#334155",
        //     border: "#334155",
        //     text: "#ffffff",
        //     outline: {
        //       bg: "#ffffff",
        //       border: "#334155",
        //       text: "#334155",
        //     },
        //   },

        //   tb: {
        //     bg: "#e2e8f0",
        //     border: "#94a3b8",
        //   },

        //   input: {
        //     bg: "#ffffff",
        //     text: "#1e293b",
        //     border: "#cbd5e1",
        //     placeholder: "",
        //   },

        //   star: {
        //     text: "#c5c5c5",
        //   },

        //   footer: {
        //     bg: "#334155",
        //     text: "#e2e8f0",
        //   },
        // },

        shop: {
          body: {
            bg: "#222",
            drop: "#e2e8f0",
            banner: {
              text: "#ffffff",
            },
          },

          text: {
            title: "#fff",
            default: "#ffffff",
            sub: "#fff",
            border: "#cbd5e1",
          },

          header: {
            bg: "#222",
            text: "#1e293b",
            icon: {
              color: "#1e293b",
              text: "#ffffff",
              bg: "#64748b",
            },
          },

          nav: {
            bg: "#222",
            text: "#ffffff",
            border: "#fff",
            selected: "#fff",
          },

          menu: {
            bg: "#222",
            item: {
              hover: "#94a3b8",
              border: "#94a3b8",
            },
          },

          card: {
            border: "#e2e8f0",
            bg: "#222",
            text: "",
            selected: "#64748b",
          },

          btn: {
            bg: "#CDA140",
            border: "#CDA140",
            text: "#ffffff",
            outline: {
              bg: "#ffffff",
              border: "#CDA140",
              text: "#334155",
            },
          },

          tb: {
            bg: "#94a3b8",
            border: "#94a3b8",
          },

          input: {
            bg: "#222",
            text: "#fff",
            border: "#cbd5e1",
            placeholder: "",
          },

          star: {
            text: "#c5c5c5",
          },

          footer: {
            bg: "#CDA140",
            text: "#e2e8f0",
          },
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
