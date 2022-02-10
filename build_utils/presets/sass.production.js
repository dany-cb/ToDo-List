const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const autoprefixer = require("autoprefixer");

module.exports = {
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [autoprefixer()]
              }
            }
          },
          {
            loader: "sass-loader",
            options: {
              // Prefer Dart Sass
              implementation: require("sass"),
              // See https://github.com/webpack-contrib/sass-loader/issues/804
              webpackImporter: false
            }
          }
        ]
      }
    ]
  }
};
