import { glob } from 'glob';

/**
 * Удаляет несуществующие директории из массива с glob шаблонами
 * 
 * @param {string[]} globPatterns - Массив с glob шаблонами 
 * @returns {string[]} - Массив с отфильтрованными glob шаблонами 
*/
export default function filterEmptyGlobPatterns(globPatterns) {
	const validGlobPatterns = globPatterns
		.filter(item => {
			const files = glob.sync(item);
			return files.length > 0;
		})

		return validGlobPatterns;
}