module.exports = function (grunt) {
	var path        = require('path'),
	    babelPlugin = require('rollup-plugin-babel');

	grunt.config('rollup', {
		options: {
			format: 'umd',
			plugins: [babelPlugin({
				babelrc: false,
				compact: false,
				presets: ['es2015-loose-rollup']
			})]
		},
		loader: {
			options: {
				moduleName: 'iFrameCommunicator'
			},
			files: [{
				src: 'src/auge-loader.js',
				dest: 'build/umd/auge-loader.js'
			}]
		},
		locales: {
			options: {
				exports: 'none',
				external: [
					path.resolve(__dirname, '../src/auge-loader.js')
				],
				globals: {
					'../core': 'loader'
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
				'rollup:loader'
			];
			/*
			 if (locales) {
			 tasks.push('transpile-custom-raw:' + locales);
			 }
			 */
			grunt.task.run(tasks);
		});
};
