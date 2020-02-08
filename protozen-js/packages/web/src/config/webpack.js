import '../../../../debug';
import path from 'path';
import { NoEmitOnErrorsPlugin } from 'webpack';
import Debug from 'debug';
import babelConfig from '../../../../babel.config';

const info = Debug('protozen:info:webpack');

const src = path.resolve(__dirname, '..');
const dist = path.resolve(__dirname, '..', '..', 'dist');

module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    port: 3030,
    contentBase: dist,
    historyApiFallback: {
      index: 'index.html'
    }
  },
  entry: [
     path.join(src, 'main.js')
  ],
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: [
        'react-hot-loader/webpack',
        {
          loader: 'babel-loader',
          query: babelConfig({ cache: () => {} })
        }
        ]
    }]
  },
   output: {
    path: dist,
    filename: 'bundle.js'
  },
  plugins: [
    new NoEmitOnErrorsPlugin()
    ]
}