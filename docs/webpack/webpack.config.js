var webpack = require('webpack');

module.exports = {
  entry: './base/core.js',
  output: {
    path: __dirname + 'js/',
    filename: 'core.js'
  },
  module: {
    rules: [
    {
      test: /\.tag$/,
      enforce: 'pre',
      exclude: /node_modules/,
      use: [
      {
        loader: 'riot-tag-loader',
        options: {
          debug: true
        }
      }]
    },
    {
      test: /\.js|\.tag$/,
      enforce: 'post',
      exclude: /node_modules/,
      use: [
      {
        loader: 'babel-loader',
        options: {
          presets: 'es2015-riot'
        }
      }]
    }]
  },
  resolve: {
    extensions: ['.js', '.tag']
  },
  plugins: [
    new webpack.ProvidePlugin({
      riot: 'riot'
    })
  ]
};