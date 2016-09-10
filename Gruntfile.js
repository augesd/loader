module.exports = function (grunt) {
	require('time-grunt')(grunt);
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		meta: {
			banner: '/*!' +
			'\n * <%= pkg.title %> <%= pkg.version %> (<%= grunt.template.today("yyyy-mm-dd, HH:MM") %>)' +
			'\n * (c) <%= grunt.template.today("yyyy") %> <%= pkg.developer %>, <%= pkg.author %>' +
			'\n * Distributed under <%= pkg.license %> license.' +
			'\n */\n\n'
		},
		uglify: {
			main: {
				files: {
					'build/umd/auge-loader-with-locales.min.js': 'build/umd/auge-loader-with-locales.js',
					'build/umd/locales.min.js': 'build/umd/locales.js',
					'build/umd/auge-loader.min.js': 'build/umd/auge-loader.js'
				}
			},
			options: {
				banner: '<%= meta.banner %>',
				stripBanners: true,
				preserveComments: false,
				mangle: true,
				compress: {
					dead_code: false // jshint ignore:line
				},
				output: {
					ascii_only: true // jshint ignore:line
				},
				report: 'min'
			}
		},
		jshint: {
			all: [
				'Gruntfile.js',
				'tasks/**.js',
				'src/**/*.js'
			],
			options: {
				jshintrc: true
			}
		},
		jscs: {
			all: [
				'Gruntfile.js',
				'tasks/**.js',
				'src/**/*.js'
			],
			options: {
				config: '.jscs.json'
			}
		}
	});

	grunt.loadTasks('tasks');

	// These plugins provide necessary tasks.
	require('load-grunt-tasks')(grunt);

	// Default task.
	grunt.registerTask('default', ['lint']);

	// Linting
	grunt.registerTask('lint', ['jshint', 'jscs']);

	// Build
	grunt.registerTask('build', ['default', 'combine']);
	grunt.registerTask('build-min', ['build', 'uglify:main']);

	// Task to be run when releasing a new version
	grunt.registerTask('release', [
		'default',
		'build',
		'update-index',
		'uglify:main'
	]);
};

