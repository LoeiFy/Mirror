var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var production = process.env.NODE_ENV === 'production'
var forhtml = process.env.NODE_ENV === 'html'
var config = require('./src/config.js')

var plugins = []

if (production) {
    plugins = plugins.concat(
        new webpack.optimize.UglifyJsPlugin({
            mangle: true,
            compress: {
                warnings: false,
            }
        })
    )
}

plugins = plugins.concat(
     new HtmlWebpackPlugin({                        
         filename: 'index.html',
         template: './src/index.html',
         config: production ? '$config' : JSON.stringify(config),
         inject: 'head',
         hash: false,
         minify: production ? {
             removeComments: true,
             minifyCSS: true,
             collapseWhitespace: true
         } : {}
     })
)

module.exports = {

    entry: {
        build: forhtml ? './src/html.js' : './src/index.js'
    },

    output: {
        path: production ? 'dist' : '',
        filename: production ? '[name].[hash].js' : '[name].js'
    },

    devtool: production || forhtml ? false : 'source-map',

    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel'
            },
            {
                test: /\.scss$/,
                loader: production ? 'style!css!postcss!sass' : 'style!css?sourceMap!postcss!sass?sourceMap'
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
