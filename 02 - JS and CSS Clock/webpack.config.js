const { resolve } = require("path")
const webpack = require("webpack")
const ExtractTextPlugin = require("extract-text-webpack-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const WebpackNotifierPlugin = require("webpack-notifier")
const { getIfUtils, removeEmpty } = require("webpack-config-utils")

module.exports = env => {
  const { ifProd, ifNotProd } = getIfUtils(env)
  const config = {
    entry: ["./app.js"],
    output: {
      filename: "app.js",
      path: resolve(__dirname, "dist"),
    },
    devServer: {
      historyApiFallback: true,
    },
    resolve: {
      extensions: [".js", ".jsx", ".json"],
    },
    stats: {
      colors: true,
      reasons: true,
      chunks: true,
    },
    devtool: ifProd("source-map", "eval"),
    plugins: removeEmpty([
      new ExtractTextPlugin({
        filename: "app.css",
        disable: ifProd(false, true),
      }),
      new HtmlWebpackPlugin({
        template: "./index.html",
        minify: { collapseWhitespace: true },
        inject: true,
      }),
      new WebpackNotifierPlugin(),
      // new webpack.ProvidePlugin({
      //   React: "react",
      // }),
    ]),
    module: {
      loaders: [
        {
          test: /\.js|jsx$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: "babel-loader",
          },
        },
        // removeEmpty({
        //   test: /\.scss$/,
        //   use: ifProd(
        //     ExtractTextPlugin.extract({
        //       use: ["css-loader", "sass-loader"],
        //     })
        //   ),
        //   loaders: ifNotProd([
        //     { loader: "style-loader" },
        //     {
        //       loader: "css-loader",
        //       options: {
        //         sourceMap: true,
        //       },
        //     },
        //     {
        //       loader: "sass-loader",
        //       options: {
        //         sourceMap: true,
        //       },
        //     },
        //   ]),
        // }),
      ],
    },
  }
  return config
}
