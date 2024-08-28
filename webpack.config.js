import path from 'path';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';

const nodeEnv = procces.env.NODE_ENV;
const isDev = nodeEnv === 'development';
const idProduction = !isDev;

function fileName() {
	return isDev ? '[name].js' : '[name].[hash].js'
}

export default {
	entry: path.resolve('src/scripts/index.js'),
	output: {
		filename: fileName()
	},
	mode: nodeEnv,
	// plugins: [
	// 	new CleanWebpackPlugin
	// ],
	resolve: {
		extensions: ['js'],
		alias: {
			'@': path.resolve('src'),
			'@modules': path.resolve('src/scripts/modules')
		},
		modules: [
			path.resolve('src/scripts/modules'),
			path.resolve('node_modules')
		]
	},
	module: {
		rules: [
			{
				test: '/\.js$/',
				exclude: path.resolve('node_modules'),
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env']
					}
				}
			},
			{
				test: '/\.css/',
				use: ['style-loader', 'css-loader']
			}
		]
	}
}