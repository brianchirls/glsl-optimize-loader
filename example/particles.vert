attribute vec3 color;
varying vec3 vColor;

void main() {

	vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
	//float distance = max(1.0, length(mvPosition.xyz) - 0.5);
	float distance = length(mvPosition.xyz);
	float falloff = max(1.0, log2(distance));

	vColor = color / falloff;
	// vColor = vec3(0.0, 0.0, 1.0);

	/*
	todo: this needs to account for screen resolution.
	should be half as much when not in retina display?
	*/
	gl_PointSize = 2.0 / falloff;
	gl_Position = projectionMatrix * mvPosition;
}
