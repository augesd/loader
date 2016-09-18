module.exports = function (grunt) {
	grunt.config('copy.index-files', {
		expand: true,
		cwd: 'build/umd/',
		src: [
			'wgm.js',
			'wgm.min.js',
			'wgm-with-locales.js',
			'wgm-with-locales.min.js',
			'locales.js',
			'locales.min.js',
			'locale/*.js'
		],
		dest: '.'
	});

	grunt.registerTask('update-index', ['copy:index-files']);
};
