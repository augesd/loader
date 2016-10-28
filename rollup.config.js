var babelPlugin = require('rollup-plugin-babel');

export default {
	entry: 'src/wgm.js',
	moduleName: require('./package.json').name,
	plugins: [babelPlugin({
		babelrc: false,
		compact: false,
		presets: ['es2015-loose-rollup', 'stage-1']
	})],
	targets: [
		{dest: 'build/bundle.js', format: 'umd'}
	]
};