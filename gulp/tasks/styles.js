import { src, dest, series } from 'gulp';
import sourceMaps from 'gulp-sourcemaps';
import gulpSass from 'gulp-sass';
import * as compilerSass from 'sass';
import autoprefixer from 'gulp-autoprefixer';
import groupMediaQueries from 'gulp-group-css-media-queries';
import gulpIf from 'gulp-if';
import cleanCss from 'gulp-clean-css';
import plumber from 'gulp-plumber';
import plumberConfig from './gulp/utils/plumberConfig.js';
import changed from 'gulp-changed';
import rename from 'gulp-rename';
import dotenv from 'dotenv';

dotenv.config();
const sass = gulpSass(compilerSass)

const nodeEnv = process.env.NODE_ENV;
const isDev = nodeEnv === 'development';
const isProd = !isDev;

const configRename = {
	basename: 'styles',
	suffix: '.min',
	extname: '.css'
}
const configCleanCss = { 
	level: { 
		1: { 
			specialComments: 0 
		} 
	}
};


export default function styles() {
	return src('./src/scss/main.scss')
		.pipe(plumber(plumberConfig('Styles')))
		.pipe(changed('./app/css'))
		.pipe(gulpIf( isDev, sourceMaps.init() ))
		.pipe(sass())
		.pipe(autoprefixer({ grid: true }))
		.pipe(gulpIf( isProd, series(groupMediaQueries(), cleanCss(configCleanCss)) ))
		.pipe(gulpIf( isDev, sourceMaps.write() ))
		.pipe(rename(configRename))
		.pipe(dest('./app/css'))
}