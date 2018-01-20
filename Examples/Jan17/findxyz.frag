uniform float uX, uY, uZ;
uniform float uTol;

varying vec3  vXYZ;
varying vec4  vColor;
varying float vLightIntensity; 

void main( )
{
	vec4 newColor = vColor;
	if( uX-uTol <= vXYZ.x  &&  vXYZ.x <= uX+uTol  &&   uY-uTol <= vXYZ.y  &&  vXYZ.y <= uY+uTol  &&  uZ-uTol <= vXYZ.z  &&  vXYZ.z <= uZ+uTol )
		newColor = vec4( 1., 0., 0., 1. );
	newColor.rgb *= vLightIntensity;
	gl_FragColor = newColor;
}
