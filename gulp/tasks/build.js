import { src, dest, parallel, series } from 'gulp';
import clean from './clean.js';
import styles from './styles.js';
import fonts from './fonts.js';
import scripts from './scripts.js';
import html from './html.js';
import media from './media.js';
import filterEmptyGlobPatterns from '../utils/filterEmptyGlobPatterns.js';

export function destToBuild() {
	return src(filterEmptyGlobPatterns([
    './app/styles/**/*.css',
    './app/scripts/**/*.js',
    './app/assets/images/**/*',
    './app/assets/icons/**/*',
    './app/assets/fonts/**/*',
    './app/**/*.html'
  ]), { base: 'app' })
		.pipe(dest('build'))
}

const build = series(clean, parallel(html, styles, scripts, media, fonts), destToBuild)
export default build;