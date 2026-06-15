import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        green: {
          DEFAULT: "#1a6b3c",
          mid: "#2d8a50",
          deep: "#11482a",
          light: "#e8f5ee",
        },
        gold: {
          DEFAULT: "#f5a623",
          dark: "#c47d10",
        },
        terra: {
          DEFAULT: "#c0623a",
          dark: "#a04d2b",
        },
        ink: {
          DEFAULT: "#181c18",
          soft: "#43493f",
          faint: "#767d70",
        },
        paper: {
          DEFAULT: "#f7f3ea",
          deep: "#efe9db",
        },
        rule: "rgba(24, 28, 24, 0.16)",
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "Georgia", "serif"],
        body: ["var(--font-newsreader)", "Georgia", "serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s cubic-bezier(0.23, 1, 0.32, 1) forwards",
        "fade-in": "fade-in 0.4s ease-out forwards",
      },
    },
  },
  plugins: [],
};
export default config;
