module.exports = function (grunt) {
    grunt.registerTask('babel_runtime', function () {

        var fileName = 'auge-loader.js',
            files = {};
        files['dist/'+fileName] = 'src/'+fileName;

        grunt.config('babel', {
            options: {
                sourceMap: true,
                presets: ['es2015']
            },
            dist: {
                files: files
            }
        });

        grunt.task.run([
            'babel'
        ]);
    });
};
