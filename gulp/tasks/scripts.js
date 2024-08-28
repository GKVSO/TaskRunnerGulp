import path from 'path';
import { src, dest } from 'gulp';
import webpack from 'webpack-stream';
import webpackConfig from '../../webpack.config.js';
import plumber from 'gulp-plumber';
import plumberConfig from '../utils/plumberConfig.js';

export default function scripts() {
	return src(path.resolve('src/scripts/index.js'))
		.pipe(plumber(plumberConfig('Scripts')))
		.pipe(webpack(webpackConfig))
		.pipe(dest('./app/scripts/'))
}