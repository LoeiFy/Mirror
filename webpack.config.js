const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const config = require('./src/config.js')
// const isProd = process.env.NODE_ENV === 'production'

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

module.exports = base

/*
var _config = {}

Object.keys(config).forEach(function(key) {
    _config[key] = ''
})

var plugins = []

if (production || fornpm) {
    plugins = plugins.concat(
        new webpack.optimize.UglifyJsPlugin({
            mangle: true,
            compress: {
                warnings: false
            },
            output: {
                comments: false
            }
        })
    )
}

if (production || fornpm) {
    if (production) {
        config = JSON.stringify(_config)
    }
    if (fornpm) {
        config = '$config'
    }

    var minify = {
        removeComments: fornpm,
        minifyJS: fornpm,
        minifyCSS: true,
        collapseWhitespace: fornpm
    }
} else {
    var minify = {}
    config = JSON.stringify(config)
}

plugins = plugins.concat(
     new HtmlWebpackPlugin({                        
         filename: 'index.html',
         template: './src/index.html',
         config: config,
         inject: 'body',
         hash: false,
         minify: minify 
     })
)

module.exports = {

    entry: {
        build: forhtml ? './src/html.js' : './src/index.js'
    },

    output: {
        path: (production || fornpm) ? 'dist' : '',
        filename: (production || fornpm) ? '[name].[hash].js' : '[name].js'
    },

    devtool: (production || forhtml || fornpm) ? false : 'source-map',

    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel'
            },
            {
                test: /\.scss$/,
                loader: (production || fornpm) ? 'style!css!postcss!sass' : 'style!css?sourceMap!postcss!sass?sourceMap'
            },
            {
                test: /\.svg$/,
                loader: 'svg-inline'
            }
        ]
    },

    babel: {
        presets: ['es2015']
    },

    postcss: [
        require('autoprefixer')
    ],
    
    plugins: plugins
}
*/