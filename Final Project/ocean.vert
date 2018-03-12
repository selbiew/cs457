#version 330 compatibility
#define PI 3.14

out vec3  vMCposition;
out float vLightIntensity; 
out vec2 vST;

vec3 LIGHTPOS   = vec3( -2., 0., 10. );

void
main( )
{
	vec3 tnorm      = normalize( gl_NormalMatrix * gl_Normal );
	vec3 ECposition = vec3( gl_ModelViewMatrix * gl_Vertex );
	vLightIntensity  = abs( dot( normalize(LIGHTPOS - ECposition), tnorm ) );
	
	vST = gl_MultiTexCoord0.st;
	
	vMCposition  = gl_Vertex.xyz;
	gl_Position = gl_ModelViewProjectionMatrix * gl_Vertex;
}