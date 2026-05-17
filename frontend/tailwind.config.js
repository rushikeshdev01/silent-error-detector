/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        mono: ['"JetBrains Mono"', "monospace"],
        sans: ['"DM Sans"', "sans-serif"],
      },
      colors: {
        bg: "#0d0f14",
        surface: "#13161e",
        border: "#1f2433",
        muted: "#3a3f52",
        dim: "#6b7280",
        text: "#e2e8f0",
        accent: "#7ee8a2",
        warn: "#fbbf24",
        danger: "#f87171",
        info: "#60a5fa",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: 0, transform: "translateY(10px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        pulse2: {
          "0%, 100%": { opacity: 1 },
          "50%": { opacity: 0.4 },
        },
      },
      animation: {
        "fade-up": "fadeUp 0.35s ease both",
        "pulse-dim": "pulse2 1.5s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
