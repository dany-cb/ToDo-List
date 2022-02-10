const applyConfig = require("./build_utils/applyConfig");

module.exports = (env) => {
  console.log(env);
  const mode = env.mode || "production";
  const presets = env.presets ? env.presets.split(",") : [];
  const src = env.src ? env.src.split("/") : ["src", "index.js"];
  const dest = env.dest ? env.dest.split("/") : ["docs"];

  return applyConfig({ mode, presets, src, dest });
};
