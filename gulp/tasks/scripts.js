import path from 'path';
import { src, dest } from 'gulp';
import webpack from 'webpack-stream';
import webpackConfig from '../../webpack.config.js';
import browserSync from 'browser-sync';
import plumber from 'gulp-plumber';
import plumberConfig from '../utils/plumberConfig.js';
import filterEmptyGlobPatterns from '../utils/filterEmptyGlobPatterns.js';

//TODO: Возможно стоит добавить changed в таск

export default function scripts() {
	return src('./src/scripts/index.js')
		.pipe(plumber(plumberConfig('Scripts')))
		.pipe(webpack(webpackConfig))
		.pipe(dest('./app/scripts/'))
		.pipe(browserSync.stream())
}