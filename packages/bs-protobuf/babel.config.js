module.exports = function (api) {
  api.cache(true);
  const presets = [
    "@babel/preset-env",
    "@babel/preset-flow",
    "@babel/preset-react",
  ];
  const plugins = ["@babel/plugin-transform-runtime"];
  return {
    presets,
    plugins,
  };
};
