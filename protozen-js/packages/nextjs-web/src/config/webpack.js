import "../../../../debug";
import path from "path";
import { NoEmitOnErrorsPlugin } from "webpack";
import babelConfig from "../../../../babel.config";

const src = path.resolve(__dirname, "..");
const dist = path.resolve(__dirname, "..", "..", "dist");

module.exports = {
  mode: "development",
  devtool: "inline-source-map",
  devServer: {
    port: 3032,
    contentBase: dist,
    historyApiFallback: {
      index: "index.html",
    },
  },
  entry: [path.join(src, "Main.bs.js")],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          "react-hot-loader/webpack",
          {
            loader: "babel-loader",
            options: babelConfig({ cache: () => {} }),
          },
        ],
      },
    ],
  },
  output: {
    path: dist,
    filename: "bundle.js",
  },
  plugins: [new NoEmitOnErrorsPlugin()],
};
