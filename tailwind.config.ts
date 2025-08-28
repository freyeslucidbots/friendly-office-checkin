
import type { Config } from "tailwindcss";
export default {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}","./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        primary: {50:"#eef6ff",100:"#d9eefe",200:"#b3dcfd",300:"#80c2fb",400:"#4aa6f7",500:"#1c8cf2",600:"#0d6ed6",700:"#0b55a8",800:"#0d467f",900:"#0e3a63"}
      }
    }
  },
  plugins: []
} satisfies Config;
