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
        secondary: "#C5C5C5",
        primary: "#EDC265",
        white: "#FFFFFF",
        borderColor: "#FFFFFF4D",
      },
      fontFamily: {
        poppins: ["var(--font-poppins)", "sans-serif"],
        alice: ["var(--font-alice)", "serif"],
      },
    },
  },
  plugins: [],
};

export default config;
