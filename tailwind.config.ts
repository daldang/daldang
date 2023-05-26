import { type Config } from "tailwindcss";
import daisyui from "daisyui";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "custom-red": "#FFAAA8",
        "custom-yellow": "#fefec0",
        "custom-purple": "#e0c2ff",
      },
    },
  },
  plugins: [daisyui],
  daisyui: {
    styled: true,
    themes: [
      {
        mytheme: {
          primary: "#ffaaa8",
          secondary: "#fefec0",
          accent: "#E0C2FF",
          neutral: "#3D4451",
          "base-100": "#FFFFFF",
          info: "#3ABFF8",
          success: "#36D399",
          warning: "#FBBD23",
          error: "#F87272",
        },
      },
    ],
    base: true,
    utils: true,
    logs: true,
    rtl: false,
    prefix: "",
    darkTheme: "light",
  },
} satisfies Config;
