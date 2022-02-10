module.exports = {
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          "style-loader",
          "css-loader",
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
