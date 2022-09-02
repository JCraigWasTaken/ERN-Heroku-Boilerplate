const merge = require("webpack-merge");
const common = require("./webpack.common.js");
const CompressionPlugin = require("compression-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const zlib = require("zlib");
const { WebpackManifestPlugin } = require("webpack-manifest-plugin");
const { ServiceWorkerPlugin } = require("service-worker-webpack");

module.exports = merge(common, {
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
  },
  plugins: [
    //Compressing the files to improve performance
    new CompressionPlugin({
      filename: "[path][base].gz",
      algorithm: "gzip",
      test: /\.js$|\.css$|\.html$/,
      threshold: 10240,
      minRatio: 0.8,
    }),
    new CompressionPlugin({
      filename: "[path][base].br",
      algorithm: "brotliCompress",
      test: /\.(js|css|html|svg)$/,
      compressionOptions: {
        params: {
          [zlib.constants.BROTLI_PARAM_QUALITY]: 11,
        },
      },
      threshold: 10240,
      minRatio: 0.8,
    }),
    // Makes a dynamic manifest file with all of the project files for the service worker
    new WebpackManifestPlugin({
      fileName: "asset-manifest.json",
    }),
    //  Service worker configuration
    new ServiceWorkerPlugin(),
  ],
  mode: "production",
  devtool: "source-map",
});
