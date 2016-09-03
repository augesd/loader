module.exports = function (grunt) {
    grunt.registerTask('babel_watch', function () {

        grunt.config('watch', {
            files: 'js/*',
            tasks: ['default']
        });

        grunt.task.run([
            'watch'
        ]);
    });
};
