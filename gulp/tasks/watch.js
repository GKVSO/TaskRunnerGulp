import { watch } from 'gulp.js';
import scripts from './scripts.js';
import styles from './styles.js';
import html from './html.js';
import { images, icons } from './media.js';

export default function watch(done) {
	watch('./src/scripts/**/*.js', scripts)
	watch('./src/scss/**/*.scss', styles)
	watch('./src/html/**/*.html', html)
	watch('./src/assets/images/**/*', images)
	watch('./src/assets/icons/**/*', icons)
	
	done()
}