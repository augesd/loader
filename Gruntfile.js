module.exports = function (grunt) {
	require('time-grunt')(grunt);
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		banner: '/*!' +
		'\n * <%= pkg.title %> <%= pkg.version %> (<%= grunt.template.today("yyyy-mm-dd, HH:MM") %>)' +
		'\n * (c) <%= grunt.template.today("yyyy") %> <%= pkg.developer %>, <%= pkg.author %>' +
		'\n * Distributed under <%= pkg.license %> license.' +
		'\n */\n\n',
		uglify: {
			options: {
				//banner: '<%= banner %>',
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
			},
			main: {
				files: {
					//'build/umd/wgm-with-locales.min.js': 'build/umd/wgm-with-locales.js',
					//'build/umd/locales.min.js': 'build/umd/locales.js',
					'build/umd/wgm.min.js': 'build/umd/wgm.js'
				}
			}
		},
		jshint: {
			options: {
				jshintrc: true
			},
			all: [
				'Gruntfile.js',
				'tasks/**.js',
				'src/**/*.js'
			]
		},
		jscs: {
			options: {
				config: '.jscs.json'
			},
			all: [
				'Gruntfile.js',
				'tasks/**.js',
				'src/**/*.js'
			]
		},
		stamp: {
			options: {
				banner: '<%= banner %>'
			},
			main: {
				files: {
					src: '<%= uglify.main.files %>'
				}
			}
		},
		compress: {
			main: {
				options: {
					archive: '<%= pkg.name %>-<%= pkg.version %>-dist.zip',
					mode: 'zip',
					level: 9,
					pretty: true
				},
				files: [
					{
						expand: true,
						cwd: 'build/umd/',
						src: ['**'],
						dest: '<%= pkg.name %>-<%= pkg.version %>-dist'
					}
				]
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
		'build-min',
		'stamp',
		'update-index',
		'compress'
	]);
};

