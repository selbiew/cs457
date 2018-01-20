#version 330 compatibility

out vec3  vMCposition;
out float vLightIntensity; 
out float s;
out float t;

vec3 LIGHTPOS   = vec3( -2., 0., 10. );

void
main( )
{
	vec3 tnorm      = normalize( gl_NormalMatrix * gl_Normal );
	vec3 ECposition = vec3( gl_ModelViewMatrix * gl_Vertex );
	vLightIntensity  = abs( dot( normalize(LIGHTPOS - ECposition), tnorm ) );

	s = gl_MultiTexCoord0.s;
	t = gl_MultiTexCoord0.t;
	
	vMCposition  = gl_Vertex.xyz;
	gl_Position = gl_ModelViewProjectionMatrix * gl_Vertex;
}