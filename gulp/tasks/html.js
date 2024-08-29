import { src, dest } from 'gulp';
import plumber from 'gulp-plumber';
import plumberConfig from '../utils/plumberConfig.js';
import changed from 'gulp-changed';
import ssi from 'gulp-ssi';

export default function html() {
	return src(['./src/html/**/*.html', '!./src/html/blocks/**/*.html'])
		.pipe(plumber(plumberConfig('HTML')))
		.pipe(changed('./app'))
		.pipe(ssi())
		.pipe(dest('./app'), { base: './app' })
}