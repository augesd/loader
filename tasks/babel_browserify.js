module.exports = function (grunt) {
    grunt.registerTask('babel_browserify', function () {

        var fileName,
            files = {};

        fileName = 'auge-loader.js'; files['dist/'+fileName] = 'src/'+fileName;

        grunt.config('browserify', {
            options: {
                transform: [["babelify", { "stage": 0 }]],
                bundleOptions: {
                    debug: true
                }
            },
            dist: {
                files: files
            }
        });

        grunt.task.run([
            'browserify'
        ]);
    });
};
