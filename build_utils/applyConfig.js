const { merge } = require("webpack-merge");
/**
 * Retrieve configs froms webpack.production.js | webpack.development.js
 * @param {"development"|"production"} mode
 * @returns WebpackConfigObject
 */
const modeConfig = (mode) => require(`./webpack.${mode}`);

/**
 * Merges the appropriate config files
 * @param {{mode:"development"|"production", presets:string[], src:string[], dest:string[]}} env
 * @returns webpackConfigObject
 */
module.exports = (env) => {
  /* Presets that have separate development and production configs */
  const conflictPresets = ["sass"];

  return merge(
    require("./webpack.common")(env),
    modeConfig(env.mode),
    ...env.presets.map((name) =>
      conflictPresets.includes(name)
        ? require(`./presets/${name}.${env.mode}`)
        : require(`./presets/${name}`)(env.mode)
    )
  );
};
