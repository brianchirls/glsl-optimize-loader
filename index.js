'use strict';

const fs = require('fs');
const path = require('path');
const loaderUtils = require('loader-utils');
const glslOptimizer = require('marcs-glsl-optimizer');

module.exports = function (source) {
	const self = this;
	const options = loaderUtils.parseQuery(this.query) || {};
	const fileName = path.basename(this.request);
	const extension = path.extname(this.request).substring(1);

	if (this.cacheable) {
		this.cacheable();
	}

	const target = options.target === 'es3' ? glslOptimizer.TARGET_OPENGLES30 : glslOptimizer.TARGET_OPENGLES20;

	let optType = options.type && options.type.charAt(0);
	if (!optType) {
		optType = extension.charAt(0);
	}

	let type;
	if (optType === 'v') {
		//vertex
		type = glslOptimizer.VERTEX_SHADER;
	} else if (optType === 'f') {
		//fragment
		type = glslOptimizer.FRAGMENT_SHADER;
	} else {
		this.emitError('Unable to determine GLSL shader type');
		return;
	}

	/*
	todo:
	- inject optional defines
	- any kind of other pre- or post-processing
	- define shader name (maybe after optimizing?)
	*/

	// skip optimization step if debug mode
	if (this.debug) {
		return 'module.exports = ' + JSON.stringify(source) + ';';
	}

	const compiler = new glslOptimizer.Compiler(target);
	const shader = new glslOptimizer.Shader(compiler, type, source);
	if (!shader.compiled()) {
		this.emitError('Failed to compile shader ' + fileName);
		return;
	}

	const output = shader.output();
	shader.dispose();
	compiler.dispose();

	return 'module.exports = ' + JSON.stringify(output) + ';';
};
