import { parallel, series } from 'gulp';
import html from './html.js';
import styles from './styles.js';
import scripts from './scripts.js';
import media from './media.js';
import localServer from './localServer.js';
import watch from './watch.js';
import { cleanApp } from './clean.js';

const run = series(cleanApp, parallel(html, styles, scripts, media), localServer, watch)
export default run;