const path = require("path");

module.exports = {
  mode: "development",
  entry: "./dist/index.js",
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "dist"),
  },
  resolve: {
    extensions: [".ts", ".js"],
    alias: {
      browser: path.resolve(__dirname, "path/to/browser"),
    },
  },
};
