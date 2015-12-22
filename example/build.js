var webpack = require('webpack');
var config = require('./webpack.config');

var path = require('path');
config = {
	entry: path.resolve(__dirname, '../index.js') + '!' + // ?type=frag
		path.resolve(__dirname, './particles.vert'),
	output: {
		path: __dirname + '/out',
		filename: 'bundle.js'
	}
};

webpack(config, function (err, stats) {
	debugger;
	if (err) {
		throw err;
	}
	console.log(stats.toJson());
});
