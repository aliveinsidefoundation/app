// webpack.config.js
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var webpack = require('webpack');

module.exports = ({
  entry: [
    './app/index.js',
    './app/styles/styles.scss'
  ],
  output: {
    filename: 'bundle.js',
    publicPath: '/dist/',
    libraryTarget: 'umd',
  },
  resolve: {
    alias: {
      'appConfig': '../../env/devel-config.js'
    },
    extensions: ['', '.js'],


    //End of Addittions
  },
  module: {
    loaders: [{
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: ['babel'],
        query: {
          presets: ['es2015', 'react'],
        }
      },
      {
        test: /\.scss/,
        exclude: /node_modules/,
        loader: ExtractTextPlugin.extract(
          'style',
          'css!sass'
        )
      },
      {
          test: /\.jpe?g$|\.gif$|\.png$|\.svg$|\.woff$|\.ttf$/,
          loader: 'file'
      }
    ],
  },
  plugins: [
    new webpack.ProvidePlugin({
        'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch',
        'Map': 'core-js/fn/map',
        'Symbol': 'core-js/fn/symbol',
        'Promise': 'core-js/fn/promise',
        'Object.assign': 'core-js/fn/object/assign'
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new ExtractTextPlugin('style.css', {
      allChunks: true
    })
  ],
  watch: true,
  devtool: 'source-map',
});
