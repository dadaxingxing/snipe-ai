import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    // extend: {
    //   // Snipes brand colors
    //   colors: {
    //     'greyBG': '#80ff00ff',        
    //   }


    // },
  },
  plugins: [],
};
export default config;