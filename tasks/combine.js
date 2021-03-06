module.exports = function (grunt) {
	var path        = require('path'),
	    babelPlugin = require('rollup-plugin-babel');

	grunt.config('rollup', {
		options: {
			format: 'umd',
			plugins: [babelPlugin({
				babelrc: false,
				compact: false,
				presets: ['es2015-loose-rollup','stage-1']
			})]
		},
		manager: {
			options: {
				moduleName: '<%= pkg.name %>'
			},
			files: [{
				src: 'src/<%= pkg.name %>.js',
				dest: 'build/umd/<%= pkg.name %>.js'
			}]
		},
		locales: {
			options: {
				exports: 'none',
				external: [
					path.resolve(__dirname, '../src/<%= pkg.name %>.js')
				],
				globals: {
					'../core': '<%= pkg.name %>'
				}
			},
			files: [{
				expand: true,
				cwd: 'src/locale',
				src: '*.js',
				dest: 'build/umd/locale'
			}, {
				src: 'src/locales.js',
				dest: 'build/umd/locales.js'
			}]
		}
	});

	grunt.config('clean.build', [
		'build'
	]);

	grunt.task.registerTask('combine',
		'builds all es5 files, optionally creating custom locales',
		function (locales) {
			var tasks = [
				'clean:build',
				//'rollup:locales',
				'rollup:manager'
			];

			//grunt.fail.fatal(locales);
			//if (locales) tasks.push('transpile-custom-raw:' + locales);

			grunt.task.run(tasks);
		});
};
