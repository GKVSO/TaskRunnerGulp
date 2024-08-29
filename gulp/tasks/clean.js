import { src, parallel } from 'gulp';
import plumber from 'gulp-plumber';
import plumberConfig from '../utils/plumberConfig.js'
import gulpClean from 'gulp-clean';
import filterEmptyGlobPatterns from '../utils/filterEmptyGlobPatterns.js';

export const cleanApp = clean('app/**/*')
export const cleanBuild = clean('build/**/*')
export const cleanImg = clean('app/assets/images/**/*')
export default clean = parallel(cleanApp, cleanBuild)

function clean(glob) {
	return function(done) {
		if(filterEmptyGlobPatterns([glob]).length === 0) {
			console.log(`no such file or directory in: ${glob}`);
			
			done();
			return;
		}

		return src(glob)
			.pipe(plumber(plumberConfig(`Clean: ${glob}`)))
			.pipe(gulpClean())
	}
}