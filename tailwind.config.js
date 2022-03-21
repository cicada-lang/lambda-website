const colors = require("tailwindcss/colors")

module.exports = {
  content: ["./src/**/*.vue"],
  theme: {
    fontFamily: {
      sans: [
        "Linux Biolinum O",
        "LXGW New Clear Gothic",
        "LXGW Clear Gothic",
        "sans-serif",
      ],
      serif: ["Linux Libertine O", "LXGW WenKai", "serif"],
      mono: [
        "Fira Code",
        // NOTE One Chinese character should equal to two English characters.
        "LXGW WenKai Larger",
        "monospace",
      ],
      logo: ["Linux Biolinum O", "LXGW WenKai Larger", "sans-serif"],
    },
    extend: {
      colors: {
        gray: colors.stone,
        theme: colors.amber,
      },
    },
  },
}
