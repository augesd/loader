module.exports = function (grunt) {
	grunt.config('copy.index-files', {
		expand: true,
		cwd: 'build/umd/',
		src: [
			'auge-loader.js',
			'auge-loader.min.js',
			'auge-loader-with-locales.js',
			'auge-loader-with-locales.min.js',
			'locales.js',
			'locales.min.js',
			'locale/*.js'
		],
		dest: '.'
	});

	grunt.registerTask('update-index', ['copy:index-files']);
};
