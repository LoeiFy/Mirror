var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var production = process.env.NODE_ENV === 'production'
var forhtml = process.env.NODE_ENV === 'html'
var fornpm = process.env.NODE_ENV === 'npm'
var config = require('./src/config.js')
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
                warnings: false,
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
