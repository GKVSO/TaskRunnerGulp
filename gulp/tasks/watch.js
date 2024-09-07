import { watch as watching } from 'gulp';
import scripts from './scripts.js';
import styles from './styles.js';
import html from './html.js';
import { images, icons } from './media.js';

export default function watch(done) {
	watching('./src/scripts/**/*.js', scripts)
	watching('./src/scss/**/*.scss', styles)
	watching('./src/html/**/*.html', html)
	watching('./src/assets/images/**/*', images)
	watching('./src/assets/icons/**/*', icons)
	
	done()
}