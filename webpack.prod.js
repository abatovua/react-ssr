const webpack = require('webpack');
var fs = require('fs');
const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

var clientAdminConfig = {
	entry: path.join(__dirname, 'admin', 'index.js'),
	output: {
		path: path.join(__dirname, 'server', 'assets', 'admin'),
		filename: 'bundle.js'
	},
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				exclude: '/node_modules/',
				use: {
					loader: 'babel-loader',
					options: {
						presets: [
							["env", {
								"targets": {
									"browsers": ["last 2 versions"]
								},
								"useBuiltIns": true
							}],
							"react"
						],
						plugins: [
							["transform-object-rest-spread", { "useBuiltIns": true }],
							"transform-class-properties"
						]
					}
				}
			},
			{
				test: /\.scss$/,
				loader: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: ['css-loader', 'sass-loader']
				})
			},
			{
				test: /\.css$/,
				loader: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: ['css-loader']
				})
			},
		]
	},
	plugins: [
		new ExtractTextPlugin({
			filename: 'styles.css',
			allChunks: true
		}),
		new webpack.optimize.UglifyJsPlugin(),
		new webpack.DefinePlugin({
			'process.env':{
				'NODE_ENV': JSON.stringify('production')
			}
		}),
	],
	devtool: 'inline-source-map'
};

var nodeModules = {};
fs.readdirSync('node_modules')
	.filter((x) => {
		return ['.bin'].indexOf(x) === -1;
	})
	.forEach((mod) => {
		nodeModules[mod] = 'commonjs ' + mod;
	});

var serverConfig = {
	entry: path.join(__dirname, 'server', 'index.js'),
	target: 'node',
	node: {
		__dirname: false,
		global: false
	},
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				exclude: '/node_modules/',
				use: {
					loader: 'babel-loader',
					options: {
						presets: [
							["env", {
								"targets": {
									"node": "current"
								},
								"useBuiltIns": true
							}],
							"react"
						],
						"plugins": [
							"transform-object-rest-spread",
							"transform-class-properties"
						]
					}
				}
			},
		]
	},
	output: {
		path: path.join(__dirname, 'server'),
		filename: 'backend-bundle.js'
	},
	externals: nodeModules,
	plugins: [
		new webpack.DefinePlugin({
			'process.env':{
				'NODE_ENV': JSON.stringify('production')
			}
		}),
	],
	devtool: 'inline-source-map'
}

module.exports = [clientAdminConfig, serverConfig];