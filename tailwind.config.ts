import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        yellowy: "#FFFFDB",
      },
    },
  },
  plugins: [],
} satisfies Config;
