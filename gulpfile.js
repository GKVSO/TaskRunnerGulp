import gulp from 'gulp';
import scripts from './gulp/tasks/scripts.js'
import media, { images, icons } from './gulp/tasks/media.js'
import html from './gulp/tasks/html.js'
import styles from './gulp/tasks/styles.js';
import localServer from './gulp/tasks/localServer.js';
import watch from './gulp/tasks/watch.js'
import clean, { cleanApp, cleanBuild, cleanImg } from './gulp/tasks/clean.js';
import removeGitkeep from './gulp/tasks/gitkeep.js';
import { glob } from 'glob';

import run from './gulp/tasks/run.js';
import build, { destToBuild } from './gulp/tasks/build.js';

export default run;
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
	build,
	destToBuild,
	removeGitkeep
}