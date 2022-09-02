const merge = require("webpack-merge");
const common = require("./webpack.common.js");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = merge(common, {
  mode: "development",
  devtool: "inline-source-map",
  plugins: [
    new CopyWebpackPlugin({
      patterns: [{ from: "src/pwa/manifest.json" }],
    }),
  ],
  devServer: {
    historyApiFallback: true,
    proxy: {
      "/health": "http://localhost:5000",
    },
  },
});
