import type { Config } from "tailwindcss";

const config: Config = {
   content: [
      "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
      "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
      "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
   ],
   theme: {
      extend: {},
   },
   plugins: [require("@tailwindcss/forms"), require("daisyui")],

   daisyui: {
      themes: [
         "light",
         "dark",
         "cupcake",
         "bumblebee",
         "emerald",
         "corporate",
         "synthwave",
         "retro",
         "cyberpunk",
         "valentine",
         "halloween",
         "forest",
         "aqua",
         "pastel",
         "fantasy",
         "wireframe",
         "black",
         "luxury",
         "dracula",
         "cmyk",
         "autumn",
         "business",
         "acid",
         "lemonade",
         "night",
         "coffee",
         "winter",
      ],
   },
};
export default config;
