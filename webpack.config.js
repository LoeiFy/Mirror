var webpack = require('webpack')
var production = process.env.NODE_ENV === 'production'

var plugins = []

if (production) {
	plugins = plugins.concat(
		new webpack.optimize.UglifyJsPlugin({
			mangle:   true,
			compress: {
				warnings: false,
			}
		})
	)
}

module.exports = {

	entry: {
        build: './src/index.js'
    },

	output: {
		path: __dirname +'/dist/',
        publicPath: 'dist/',
		filename: 'build.js'
	},

	devtool: production ? false : 'source-map',

	module: {
		loaders: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel'
			},
			{
				test: /\.scss$/,
                loader: 'style!css?sourceMap!postcss!sass?sourceMap'
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
