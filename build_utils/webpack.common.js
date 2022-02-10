const path = require("path");
/* Extracts CSS into separate files when imported in JS */
const HtmlWebpackPlugin = require("html-webpack-plugin");

/**
 * @param {{mode:"development"|"production", presets:string[], src:string[], dest:string[]}} env
 * @returns The Webpack base configurations inc. HtmlWebpackPlugin
 */
module.exports = ({ mode, src, dest, presets }) => {
  /* Adds the extensions used by each plugin and also adds fallback extensions incase of mismatch */
  const preset_exts = {
    sass: [".sass", ".scss"],
    typescript: [".ts", ".tsx"]
  };
  const fallback_exts = [".js", ".css", ""];
  let extensions = [];
  presets.forEach(
    (preset) => (extensions = extensions.concat(preset_exts[preset] || []))
  );
  extensions.push(...fallback_exts);

  return {
    mode,
    entry: path.resolve(__dirname, "..", ...src),
    resolve: {
      extensions
    },
    output: {
      filename: "[name].bundle.js",
      chunkFilename: "[name].[contenthash:7].js",
      assetModuleFilename: "assets/[hash][ext][query]",
      path: path.resolve(__dirname, "..", ...dest),
      clean: true
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, "..", "public", "index.html")
      })
    ]
  };
};
