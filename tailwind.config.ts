import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        midnight: "var(--midnight-bg)",
        "pearl-amber": "var(--pearl-amber)",
        "glacier-blue": "var(--glacier-blue)",
        "soft-white": "var(--soft-white)",
        "copper-glow": "var(--copper-glow)",
      },
      animation: {
        blink: "blink var(--cursor-blink) step-end infinite",
        pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
    },
  },
  plugins: [],
} satisfies Config;