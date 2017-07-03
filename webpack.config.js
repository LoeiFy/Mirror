const fs = require('fs-extra')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const config = require('./src/config.js')

const token = fs.readFileSync(`${process.cwd()}/token.txt`, 'utf-8')
let _config = {}

config.token = token.replace(/[\r\n]+/g, '')
Object.keys(config).forEach(key => _config[key] = '')

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
    historyApiFallback: true,
    disableHostCheck: true,
    noInfo: true,
    host: '0.0.0.0',
    port: 1234
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
      mangle: true,
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
      config: JSON.stringify(_config),
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
    publicPath: '/',
    filename: '[name].[chunkhash:8].js'
  }
}

module.exports = base
