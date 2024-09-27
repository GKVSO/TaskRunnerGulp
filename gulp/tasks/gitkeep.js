import { src } from 'gulp';
import clean from 'gulp-clean';

export default function removeGitkeep() {
	return src(['**/*keep.txt', '!./node_modules/'])
		.pipe(clean())
}