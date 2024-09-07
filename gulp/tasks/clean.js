import gulp, { src, parallel, series } from 'gulp';
import plumber from 'gulp-plumber';
import plumberConfig from '../utils/plumberConfig.js'
import gulpClean from 'gulp-clean';
import filterEmptyGlobPatterns from '../utils/filterEmptyGlobPatterns.js';
import chalk from 'chalk';

function getWarningMessage(name, globPattern) {
	name = chalk.bgYellow(`[${name}]`);
	globPattern = chalk.underline(globPattern);

	const resultMessage = `${name}: no such file or directory in: ${globPattern}`

	return resultMessage;
}

export const cleanApp = clean('app/*', 'cleanApp')
export const cleanBuild = clean('build/*', 'cleanBuild')
export const cleanImg = clean('app/assets/images/*', 'cleanImg')
export default clean = series(cleanApp, cleanBuild)

function clean(glob, name = 'clean') {
	const innerFunction = function(done) {
		if(filterEmptyGlobPatterns([glob]).length === 0) {
			console.log(getWarningMessage(name, glob));

			done();
			return;
		}

		return src(glob, {allowEmpty: true})
			.pipe(plumber(plumberConfig(`Clean: ${glob}`)))
			.pipe(gulpClean())
	}

	Object.defineProperty(innerFunction, 'name', { value: name });
	return innerFunction;
}