var path = require('path');
module.exports = {
	entry: './entry.js',
	target: 'node',
	output: {
		path: path.join(__dirname, 'out'),
		filename: 'bundle.js'
	},
	module: {
		loaders: [
			{
				test: /\.vert$/,
				loader: path.join(__dirname, '..'),
				query: {
					type: 'vertex'
				}
			},
			{
				test: /\.frag$/,
				loader: path.join(__dirname, '..'),
				query: {
					type: 'fragment'
				}
			}
		]
	}
};
