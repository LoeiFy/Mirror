var webpack = require('webpack')
var production = process.env.NODE_ENV === 'production'

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
