import gulp from 'gulp';
import scripts from './gulp/tasks/scripts.js'
import media, { images, icons } from './gulp/tasks/media.js'
import html from './gulp/tasks/html.js'
import styles from './gulp/tasks/styles.js';
import localServer from './gulp/tasks/localServer.js';
import watch from './gulp/tasks/watch.js'
import clean, { cleanApp, cleanBuild, cleanImg } from './gulp/tasks/clean.js';

export {
	scripts,
	images,
	icons, 
	media,
	html,
	styles,
	localServer,
	watch,
	clean,
	cleanApp,
	cleanBuild,
	cleanImg,
}
