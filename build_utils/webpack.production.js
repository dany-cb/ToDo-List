const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

/**
 * Add MiniCssPlugin and set up css output filenames
 */
module.exports = {
  target: ["browserslist"],
  devtool: "hidden-source-map",
  bail: true,
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.svg/,
        type: "asset",
        parser: {
          dataUrlCondition: {
            maxSize: 4 * 1024, // 4kb
          },
        },
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[name].[contenthash:7].css",
    }),
    new BundleAnalyzerPlugin({
      analyzerPort: 8000,
    }),
  ],
};
