import { src, dest, parallel } from 'gulp';
import plumber from 'gulp-plumber';
import plumberConfig from '../utils/plumberConfig.js';
import changed from 'gulp-changed';
import imagemin from 'gulp-imagemin';
import browserSync from 'browser-sync';

export function images() {
	return src('./src/assets/images/**/*')
		.pipe(plumber(plumberConfig('Images')))
		.pipe(changed('./app/assets/images'))
		.pipe(imagemin({ verbose: true }))
		.pipe(dest('./app/assets/images'), { base: './app/assets/images' })
		.on('end', browserSync.reload)
}

export function icons() {
	return src('./src/assets/icons/**/*')
		.pipe(plumber(plumberConfig('Icons')))
		.pipe(changed('./app/assets/icons'))
		.pipe(imagemin({ verbose: true }))
		.pipe(dest('./app/assets/icons'), { base: './app/assets/icons' })
		.on('end', browserSync.reload)
}

const media = parallel(images, icons)
export default media;