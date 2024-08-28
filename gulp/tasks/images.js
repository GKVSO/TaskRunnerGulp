import { src, dest } from 'gulp';
import plumber from 'gulp-plumber';
import plumberConfig from '../utils/plumberConfig.js';
import changed from 'gulp-changed';
import imagemin from 'gulp-imagemin';

const imageminConfig = {};
const iconminConfig = {};

export function images() {
	return src('./src/assets/images/**/*')
		.pipe(plumber(plumberConfig('Images')))
		.pipe(changed('./app/assets/images'))
		.pipe(imagemin(imageminConfig))
		.pipe(dest('./app/assets/images'))
}