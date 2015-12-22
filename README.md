# GLSL Optimizer loader module for webpack

Optimizes GLSL fragment and vertex shaders. For use with [webpack](http://webpack.github.io/docs/)

## Installation
npm install glsl-optimize-loader

## Usage

[Documentation: Using loaders](http://webpack.github.io/docs/using-loaders.html)

``` javascript
var shaderMaterial = new THREE.ShaderMaterial({
    uniforms: {
      // ...
    },
    vertexShader: require('../glsl/particles.vert'),
    fragmentShader: require('../glsl/particles.frag')
});
```

### webpack config

``` javascript
module.exports = {
    module: {
        loaders: [
            {
                test: /\.(vert|frag)$/,
                loader: "glsl-optimize-loader"
            }
        ]
    }
};
```

Then you only need to write: `require("./shader.frag")`


## License
MIT (http://www.opensource.org/licenses/mit-license.php)
