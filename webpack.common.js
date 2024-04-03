const path = require("path");

module.exports = {
  target: "node",
  entry: {
    app: "./built/index.js",
  },
  plugins: [],
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
};
