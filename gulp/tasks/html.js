import { src, dest } from 'gulp';
import plumber from 'gulp-plumber';
import plumberConfig from '../utils/plumberConfig.js';
import changed from 'gulp-changed';
import ssi from 'gulp-ssi';
import gulpIf from 'gulp-if';
import htmlmin from 'gulp-htmlmin';
import prettyHtml from 'gulp-pretty-html';
import dotenv from 'dotenv';
import webpHTML from 'gulp-webp-html';
import browserSync from 'browser-sync';

// Get NODE ENVIRONMENT
dotenv.config()
const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

// Config objects
const prettyHtmlConfig = {
	indent_size: 4,
	preserve_newlines: false,
}
const htmlminConfig = {
	collapseWhitespace: true,
	removeComments: true,
	minifyCSS: true,
	minifyJS: true,
	html5: true,
}

export default function html() {
	return src(['./src/html/**/*.html', '!./src/html/blocks/**/*.html'])
		.pipe(plumber(plumberConfig('HTML')))
		.pipe(changed('./app')) 
		.pipe(ssi())
		.pipe(webpHTML())
		.pipe(gulpIf( isDev, prettyHtml(prettyHtmlConfig) ))
		.pipe(gulpIf( isProd, htmlmin(htmlminConfig) ))
		.pipe(dest('./app'), { base: './app' })
		.on('end', browserSync.reload)
}