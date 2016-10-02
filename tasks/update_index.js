module.exports = function (grunt) {
	grunt.config('copy.index-files', {
		expand: true,
		cwd: 'build/umd/',
		src: [
			'<%= pkg.name %>.js',
			'<%= pkg.name %>.min.js',
			'<%= pkg.name %>-with-locales.js',
			'<%= pkg.name %>-with-locales.min.js',
			'locales.js',
			'locales.min.js',
			'locale/*.js'
		],
		dest: '.'
	});

	grunt.registerTask('update-index', ['copy:index-files']);
};
