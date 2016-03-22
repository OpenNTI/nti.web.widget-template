/*eslint no-var: 0*/
var autoprefixer = require('autoprefixer');
var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var env = process.env.NODE_ENV || 'development';

exports = module.exports = {
	entry: path.join(__dirname, 'src/main/js/index.js'),
	output: {
		path: 'dist',
		filename: 'js/index.js'
	},

	cache: true,
	debug: true,
	devtool: 'source-map',

	target: 'web',

	resolve: {
		root: [
			path.resolve(__dirname, 'src/main/js'),
			path.resolve(__dirname, 'node_modules')
		],
		extensions: ['', '.jsx', '.js']
	},

	externals: [
		{
			'react' : 'React',
			'react-dom': 'ReactDOM'
		}
	],

	plugins: [
		new ExtractTextPlugin('resources/styles.css', {allChunks: true}),
		new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.optimize.DedupePlugin(),
		new webpack.DefinePlugin({
			'process.env': {
				'NODE_ENV': JSON.stringify(env)
			}
		}),

		env !== 'development'
			? new webpack.optimize.UglifyJsPlugin({ test: /\.js(x?)($|\?)/i, compress: { warnings: false } })
			: null

	].filter(function (x) {return x;}),

	module: {
		preLoaders: [
			{ test: /\.jsx$/, loader: 'baggage?[file].scss' }
		],

		loaders: [
			{ test: /\.js(x?)$/, exclude: /node_modules/, loader: 'babel' },
			{ test: /\.json$/, loader: 'json' },
			{ test: /\.(ico|gif|png|jpg|svg)$/, loader: 'url?limit=100000&name=resources/images/[name].[ext]&mimeType=image/[ext]' },
			{ test: /\.(woff|ttf|eot)$/, loader: 'file?name=resources/images/[name].[ext]' },
			{ test: /\.(s?)css$/, loader: ExtractTextPlugin.extract(
				'style-loader',
				'css?sourceMap&-minimize!postcss-loader!resolve-url!sass?sourceMap'
				)
			}
		]
	},

	postcss: [
		autoprefixer({ browsers: ['> 1%', 'last 2 versions'] })
	]
};
