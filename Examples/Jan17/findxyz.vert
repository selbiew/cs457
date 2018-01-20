varying vec4  vColor;
varying float vLightIntensity; 
varying vec3  vXYZ;

void main( )
{
	vXYZ = gl_Vertex.xyz;

    	vec3 tnorm = normalize( gl_NormalMatrix * gl_Normal );
	vec3 LightPos = vec3( 5., 10., 10. );
	vec3 ECposition = vec3( gl_ModelViewMatrix * gl_Vertex );
    	vLightIntensity  = abs( dot( normalize(LightPos - ECposition), tnorm ) );
	if( vLightIntensity < 0.2 )
		vLightIntensity = 0.2;
		
	vColor = gl_Color;
	gl_Position = gl_ModelViewProjectionMatrix * gl_Vertex;
}
