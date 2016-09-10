module.exports = function (grunt) {
	grunt.registerTask('set-version', function (version) {
		if (!version || version.split('.').length !== 3) {
			grunt.fail.fatal('malformed version. Use\n\n    grunt set-version:1.2.3');
		}

		grunt.config('string-replace.constants', {
			files: {'src/lib/core/constants.js': 'src/lib/core/constants.js'},
			options: {
				replacements: [
					{
						pattern: /export var VERSION = '.*'/,
						replacement: "export var VERSION = '" + version + "'"
					}
				]
			}
		});

		grunt.config('string-replace.package-json', {
			files: {'package.json': 'package.json'},
			options: {
				replacements: [
					{
						pattern: /"version" : .*/,
						replacement: '"version" : "' + version + '",'
					}
				]
			}
		});

		grunt.task.run([
			'string-replace:constants',
			'string-replace:package-json'
		]);
	});
};
