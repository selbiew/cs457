#version 330 compatibility

vec3 LIGHTPOS   = vec3( -2., 0., 10. );
out vec3 vNormal[3];

void
main( )
{
	gl_Position = gl_Vertex;
}
