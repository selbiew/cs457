#version 330 compatibility

uniform float uLightX, uLightY, uLightZ;
uniform float uWaveFreq;
uniform float uWaveAmp;
uniform float uWaterHeight;

flat out vec3 vNf;
out vec3 vNs;
flat out vec3 vLf;
out vec3 vLs;
flat out vec3 vEf;
out vec3 vEs;
vec3 eyeLightPosition = vec3( uLightX, uLightY, uLightZ );

out vec3 vModelCoords;

void
main( )
{
	vec4 ECposition = gl_ModelViewMatrix * gl_Vertex;
	vNf = normalize( gl_NormalMatrix * gl_Normal ); // surface normal vector
	vNs = vNf;
	vLf = eyeLightPosition - ECposition.xyz; // vector from the point
	vLs = vLf; // to the light position
	vEf = vec3( 0., 0., 0. ) - ECposition.xyz; // vector from the point
	vEs = vEf ; // to the eye position
	
	vec4 pertVert = gl_Vertex;
	if(pertVert.y > uWaterHeight)
		pertVert.y += uWaveAmp * sin(pertVert.x*pertVert.z*uWaveFreq);
	vModelCoords = pertVert.xyz;
	gl_Position = gl_ModelViewProjectionMatrix * pertVert;
}