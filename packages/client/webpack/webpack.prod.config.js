
const { merge } = require('webpack-merge')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const webpack = require('webpack')
const base = require('./webpack.base.config')
const path = require('path')

module.exports = merge({}, {
  mode: "production",
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('development')
      }
    })
  ]
},
base
)