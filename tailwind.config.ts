import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "custom-red": "#FFAA8",
        "custom-yellow": "#FEFEC0",
        "custom-purple": "#E02CFF",
      },
    },
  },
  plugins: [],
} satisfies Config;
