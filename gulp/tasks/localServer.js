import browserSync from 'browser-sync';
import dotenv from 'dotenv';

dotenv.config()

export default function localServer() {
	browserSync.init({
		server: './app',
		port: process.env.PORT || 8000,
		online: true,
		notify: false,
		reloadDelay: 0
	})
}