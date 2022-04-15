module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    styled: true,
    themes: ["winter", "cyberpunk", "light", "cupcake", "bumblebee", "emerald", "corporate", "synthwave", "retro", "valentine", "halloween", "garden", "forest", "aqua", "lofi", "pastel", "fantasy", "wireframe", "black", "luxury", "dracula", "cmyk", "autumn", "business", "acid", "lemonade", "night", "coffee"],
    base: true,
    utils: true,
    logs: true,
    rtl: false,
    prefix: "",
  }

};
