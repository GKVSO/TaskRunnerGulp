import path from 'path';
import { src } from 'gulp';
import webpack from 'webpack-stream'
import webpackConfig from '../../webpack.config.js'

export default function scripts() {
	return src(path.resolve('src/scripts/index.js'))
		.pipe(webpack(webpackConfig))
}