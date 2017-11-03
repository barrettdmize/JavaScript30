const { resolve } = require('path')
const webpack = require('webpack')
const WebpackNotifierPlugin = require('webpack-notifier')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { getIfUtils, removeEmpty } = require('webpack-config-utils')

module.exports = env => {
  const { ifProd, ifNotProd } = getIfUtils(env)
  const config = {
    entry: './app.js',
    output: {
      filename: 'app.js',
      path: resolve(__dirname, 'dist')
    },
    stats: {
      colors: true,
      reasons: true,
      chunks: true
    },
    devtool: ifProd('source-map', 'eval'),
    plugins: removeEmpty([
      new HtmlWebpackPlugin({
        template: './index.html',
        inject: true,
      }),
      new WebpackNotifierPlugin(),
    ]),
    module: {
      loaders: [
        {
          test: /\.js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader'
          }
        },
      ]
    }
  }
  return config
}
