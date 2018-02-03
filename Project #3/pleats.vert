#version 330 compatibility
#define PI 3.14

uniform float uK;
uniform float uP;
uniform float uLightX, uLightY, uLightZ;

flat out vec3 vNf;
out vec3 vNs;
flat out vec3 vLf;
out vec3 vLs;
flat out vec3 vEf;
out vec3 vEs;
out vec4 pleat_Vertex;

vec3 eyeLightPosition = vec3( uLightX, uLightY, uLightZ );

void
main( )
{
	float y0 = 1.0;
	float new_z = uK * (y0 - gl_Vertex.y) * sin(2. * PI * gl_Vertex.x / uP);
	
	float dzdx = uK * (y0-gl_Vertex.y) * (2.*PI/uP) * cos( 2.*PI*gl_Vertex.x/uP );
	float dzdy = -uK * sin( 2.*PI*gl_Vertex.x/uP );
	vec3 Tx = vec3(1., 0., dzdx );
	vec3 Ty = vec3(0., 1., dzdy );
	vec3 normal = normalize(cross(Tx, Ty));
	
	vec4 pleat_Vertex = vec4(gl_Vertex.x, gl_Vertex.y, new_z, gl_Vertex.w);
	
	vec4 ECposition = gl_ModelViewMatrix * pleat_Vertex;
	
	vNf = normalize( gl_NormalMatrix * normal ); 	// surface normal vector
	
	vNs = vNf;
	vLf = eyeLightPosition - ECposition.xyz; 			// vector from the point
	vLs = vLf; 											// to the light position
	vEf = vec3( 0., 0., 0. ) - ECposition.xyz; 			// vector from the point
	vEs = vEf ; 										// to the eye position
	gl_Position = gl_ModelViewProjectionMatrix * pleat_Vertex;
}