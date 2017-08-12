const fs = require('fs-extra')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const config = require('./src/config.js')
const sample = require('./src/config.sample.js')

const base = {
  entry: {
    build: './src/'
  },

  output: {
    publicPath: '/',
    path: '/',
    filename: '[name].js'
  },

  resolve: {
    extensions: ['.js', '.css']
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      config: JSON.stringify(config)
    })
  ],

  devServer: {
    disableHostCheck: true,
    noInfo: true,
    host: '0.0.0.0',
    historyApiFallback: {
      rewrites: [{
        from: /favicon.ico/,
        to: './src/favicon.ico'
      }]
    }
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        loader: ['style-loader', 'css-loader', 'postcss-loader']
      },
      {
        test: /\.svg$/,
        loader: 'svg-inline-loader'
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },

  devtool: '#source-map'
}

if (process.env.NODE_ENV === 'production') {
  base.plugins = [
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false },
      output: { comments: false }
    }),
    new HtmlWebpackPlugin({
      filename: 'index.npm.html',
      template: './src/index.html',
      config: '$config',
      minify: {
        removeComments: true,
        minifyJS: true,
        minifyCSS: true,
        collapseWhitespace: true
      }
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/index.html',
      config: JSON.stringify(sample),
      minify: {
        removeComments: false,
        minifyJS: false,
        minifyCSS: true,
        collapseWhitespace: false
      }
    })
  ]
  base.devtool = false
  base.output = {
    path: `${__dirname}/dist`,
    publicPath: '',
    filename: '[name].[chunkhash:8].js'
  }
}

module.exports = base
