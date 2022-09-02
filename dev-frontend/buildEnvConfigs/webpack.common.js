const Path = require("path");
const HTMLWebPackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const data = require("../src/pwa/manifest.json");

module.exports = {
  entry: "./src/app.js",
  plugins: [
    new CleanWebpackPlugin(),
    new HTMLWebPackPlugin({
      favicon: "src/media/favicon.png",
      template: "src/index.html",
    }),
    // Copies non-dynamic media and pwa files from the pwa folder
    new CopyWebpackPlugin({
      patterns: [
        { from: "src/pwa/manifest.json" },
        { from: "src/pwa/robots.txt" },
        { from: "src/media/favicon_maskable.png" },
      ],
    }),
  ],
  module: {
    rules: [
      { test: /\.(js)$/, use: [{ loader: "babel-loader" }] },
      {
        test: /\.css$/,
        use: [{ loader: "style-loader" }, { loader: "css-loader" }],
      },
      {
        test: /\.(gif|svg|jpg|png|woff|woff2|eot|ttf|otf)$/,
        use: [{ loader: "file-loader?name=media/[name].[ext]" }],
      },
      { test: /index\.html$/i, use: [{ loader: "raw-loader" }] },
      {
        test: /index\.html$/,
        use: [
          {
            loader: "string-replace-loader",
            options: {
              multiple: [
                // Replaces the theme color in the index.html with the theme color from the manifest.json file on build
                {
                  search:
                    /(<meta name="theme-color" content=")[#a-zA-Z0-9]{0,}/g,
                  replace:
                    '<meta name="theme-color" content="' + data.theme_color ||
                    '<meta name="theme-color" content="#000000',
                  strict: true,
                },
                // Removes the comments from the html
                {
                  search: /(<!--).{0,}/g,
                  replace: "",
                  strict: true,
                },
              ],
            },
          },
        ],
      },
    ],
  },
  output: {
    path: Path.resolve(__dirname, "../../prod-frontend"),
    filename: "bundle.js",
    publicPath: "/",
  },
};
