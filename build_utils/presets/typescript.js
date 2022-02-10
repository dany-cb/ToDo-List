module.exports = (mode) => ({
  stats: {
    warningsFilter: /export .* was not found in/
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "ts-loader",
          options: {
            transpileOnly: mode === "development"
          }
        }
      }
    ]
  }
});
