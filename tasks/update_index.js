module.exports = function (grunt) {
	grunt.config('copy.index-files', {
		expand: true,
		cwd: 'build/umd/',
		src: [
			'auge-loader.js',
			'locale/*.js',
			'min/locales.js',
			'min/auge-loader-with-locales.js'
		],
		dest: '.'
	});

	grunt.registerTask('update-index', ['copy:index-files']);
};
