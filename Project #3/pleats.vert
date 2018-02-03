#version 330 compatibility

uniform float uK;
uniform float uP;
uniform float uLightX, uLightY, uLightZ;

flat out vec3 vNf;
out vec3 vNs;
flat out vec3 vLf;
out vec3 vLs;
flat out vec3 vEf;
out vec3 vEs;

vec3 eyeLightPosition = vec3( uLightX, uLightY, uLightZ );

void
main( )
{
	float y0 = 1.0;
	float new_z = uK * (y0 - gl_Vertex.y) * sin(2. * 3.14 * gl_Vertex.x / uP);
	vec4 pleat_Vertex = vec4(gl_Vertex.x, gl_Vertex.y, new_z, gl_Vertex.w);
	
	vec4 ECposition = gl_ModelViewMatrix * gl_Vertex;
	
	vNf = normalize( gl_NormalMatrix * gl_Normal ); 	// surface normal vector
	
	vNs = vNf;
	vLf = eyeLightPosition - ECposition.xyz; 			// vector from the point
	vLs = vLf; 											// to the light position
	vEf = vec3( 0., 0., 0. ) - ECposition.xyz; 			// vector from the point
	vEs = vEf ; 										// to the eye position
	gl_Position = gl_ModelViewProjectionMatrix * pleat_Vertex;
}