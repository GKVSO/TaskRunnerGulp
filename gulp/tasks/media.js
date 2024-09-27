import { src, dest, parallel } from 'gulp';
import plumber from 'gulp-plumber';
import plumberConfig from '../utils/plumberConfig.js';
import changed from 'gulp-changed';
import imagemin from 'gulp-imagemin';
import webp from 'gulp-webp';
import browserSync from 'browser-sync';
import svgSprite from 'gulp-svg-sprite';

const svgSymbolConfig = {
	mode: {
		symbol: {
			sprite: '../sprite.symbol.svg',
		},
	},
	shape: {
		transform: [
			{
				svgo: {
					js2svg: { indent: 4, pretty: true },
					plugins: [
						{
							name: 'removeAttrs',
							params: {
								attrs: '(fill|stroke)',
							},
						},
					],
				},
			},
		],
	},
};

export function images() {
	return src(['./src/assets/images/**/*', '!./src/assets/images/**/*.webp'], { encoding: false })
	  // === Поток преобразования изображения в webp формат ===
		.pipe(plumber(plumberConfig('Images: Webp')))
		.pipe(changed('./app/assets/images'))
		.pipe(webp())
		.pipe(dest('./app/assets/images'), { base: './app/assets/images' })

		// === Поток оптимизации картинок ===
		.pipe(src('./src/assets/images/**/*', { encoding: false }))
		.pipe(plumber(plumberConfig('Images: Optimize')))
		.pipe(changed('./app/assets/images'))
		.pipe(imagemin({ verbose: true }))
		.pipe(dest('./app/assets/images'), { base: './app/assets/images' })

		.on('end', browserSync.reload)
}

export function icons() {
	return src(['./src/assets/icons/**/*', '!./src/assets/icons/**/*.ico'], { encoding: false })
		.pipe(plumber(plumberConfig('Icons')))
		.pipe(changed('./app/assets/icons'))
		.pipe(imagemin({ verbose: true }))
		.pipe(svgSprite(svgSymbolConfig))
		.pipe(dest('./app/assets/icons'), { base: './app/assets/icons' })
		.pipe(src('./src/assets/icons/*.ico', { encoding: false }))
		.pipe(dest('./app/assets/icons'), { base: './app/assets/icons' })
		.on('end', browserSync.reload)
}

const media = parallel(images, icons)
export default media;