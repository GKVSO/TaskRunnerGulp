import { src, dest } from 'gulp';
import plumber from 'gulp-plumber';
import plumberConfig from '../utils/plumberConfig.js';
import changed from 'gulp-changed';

export default function html() {
	return src(['./src/html/**/*.html', '!./src/html/blocks/**/*.html'])
		.pipe(plumber(plumberConfig('HTML')))
		.pipe(changed('./app'))
		.pipe(dest('./app'), { base: './app' })
}