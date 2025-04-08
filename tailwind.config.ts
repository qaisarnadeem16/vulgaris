import { error } from "console";
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
        background: "var(--background)",
        foreground: "var(--foreground)",
        error:'#ef4444',
        secondary: "#C5C5C5",
        primary: "#EDC265",
        white: "#FFFFFF",
        borderColor: "#FFFFFF4D",
        semiBlack:'#161C2D',
        buttonBg:'#52469E',
        blue:'#3E8FEE'
      },
      fontFamily: {
        poppins: ["var(--font-poppins)", "sans-serif"],
        alice: ["var(--font-alice)", "serif"],
        poetsen: ["var(--font-poetsen)", "cursive"],
      },
    },
  },
  plugins: [],
};

export default config;
