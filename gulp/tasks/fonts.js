import { src, dest } from 'gulp';

export default function fonts() {
	return src(['./src/assets/fonts/**/*', '!./src/assets/fonts/**/*.zip'])
		.pipe(dest('./app/assets/fonts/'))
}