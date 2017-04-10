/*eslint no-var: 0*/
const path = require('path');

const autoprefixer = require('autoprefixer');
const webpack = require('webpack');
const StatsPlugin = require('stats-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const gitRevision = JSON.stringify(require('nti-util-git-rev'));

const ENV = process.env.NODE_ENV || 'development';
const PROD = ENV === 'production';

exports = module.exports = {
	entry: {
		index: path.join(__dirname, 'src/main/js/index.js')
	},
	output: {
		path: path.resolve(__dirname, 'dist/client'),
		filename: 'js/[name]-[chunkhash].js',
		publicPath: '/'
	},

	cache: true,
	devtool: 'source-map',

	target: 'web',

	resolve: {
		modules: [
			path.resolve(__dirname, 'src/main/js'),
			path.resolve(__dirname, 'src/main/resources/scss'),
			path.resolve(__dirname, 'node_modules')
		],
		extensions: ['.jsx', '.js']
	},

	node: {
		crypto: 'empty'
	},

	externals: [
		{
			'react' : 'React',
			'react-dom': 'ReactDOM',
			'react/lib/ReactCSSTransitionGroup': 'React.addons.CSSTransitionGroup'
		}
	],

	module: {
		rules: [
			{
				test: /\.jsx?$/,
				enforce: 'pre',
				loader: 'baggage-loader',
				options: {
					'[file].scss':{}
				}
			},
			{
				test: /\.js(x?)$/,
				exclude: /node_modules/,
				loader: 'babel-loader'
			},
			{
				test: /\.(ico|gif|png|jpg|svg)(\?.*)?$/,
				loader: 'url-loader',
				options: {
					limit: 50,
					name: 'resources/images/[hash].[ext]',
					mimeType: 'image/[ext]'
				}
			},
			{
				test: /\.(woff|ttf|eot|otf)(\?.*)?$/,
				loader: 'file-loader',
				options: {
					name: 'resources/fonts/[hash].[ext]'
				}
			},

			{
				test: /\.(s?)css$/,
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: [
						{
							loader: 'css-loader',
							options: {
								sourceMap: true
							}
						},
						{
							loader: 'postcss-loader',
							options: {
								sourceMap: true,
								plugins: () => [
									autoprefixer({ browsers: ['> 1% in US', 'last 2 versions', 'iOS > 8'] })
								]
							}
						},
						{
							loader: 'resolve-url-loader'
						},
						{
							loader: 'sass-loader',
							options: {
								sourceMap: true
							}
						}
					]
				})
			}
		]
	},

	plugins: [
		new webpack.EnvironmentPlugin({
			NODE_ENV: PROD ? 'production' : 'development',
			DEBUG: false
		}),
		PROD && new StatsPlugin('../server/compile-data.json'),
		new webpack.optimize.CommonsChunkPlugin({
			name: 'vendor',
			// names: ['vendor', 'manifest'],
			// children: true,
			minChunks: (module) => (
				// this assumes your vendor imports exist in the node_modules directory
				module.context && module.context.indexOf('node_modules') !== -1
			)
		}),
		new ExtractTextPlugin({
			filename: 'resources/styles.css',
			allChunks: true,
			disable: false
		}),
		new webpack.DefinePlugin({
			'BUILD_SOURCE': gitRevision
		}),

		PROD && new webpack.optimize.UglifyJsPlugin({
			compress: { warnings: false },
			sourceMap: true,
			test: /\.js(x?)($|\?)/i
		})

	].filter(x => x)
};
