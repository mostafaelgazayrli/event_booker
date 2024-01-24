/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");

module.exports = {
  content: ["./views/**/*.handlebars"],
  theme: {
    extend: { colors: { ...colors } },
  },
  plugins: [require("@tailwindcss/forms")],
};
