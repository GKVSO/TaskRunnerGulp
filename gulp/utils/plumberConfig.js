import notify from 'gulp-notify';

export default function plumberConfig(title) {
	return {
		errorHandler: notify.onError({
			title, 
			message: `\n<%= error %>`,
			sound: false
		})
	}
}