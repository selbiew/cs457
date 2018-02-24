#version 330 compatibility

uniform bool uUseChromaDepth;
uniform float uChromaRed;
uniform float uChromaBlue;

out vec3  vChromaColor;
out vec3  vMCposition;
out float vLightIntensity; 
out vec2 vST;

vec3 LIGHTPOS   = vec3( -2., 0., 10. );

vec3 ChromaDepth( float t )
{
	t = clamp( t, 0., 1. );

	float r = 1.;
	float g = 0.0;
	float b = 1.  -  6. * ( t - (5./6.) );

        if( t <= (5./6.) )
        {
                r = 6. * ( t - (4./6.) );
                g = 0.;
                b = 1.;
        }

        if( t <= (4./6.) )
        {
                r = 0.;
                g = 1.  -  6. * ( t - (3./6.) );
                b = 1.;
        }

        if( t <= (3./6.) )
        {
                r = 0.;
                g = 1.;
                b = 6. * ( t - (2./6.) );
        }

        if( t <= (2./6.) )
        {
                r = 1.  -  6. * ( t - (1./6.) );
                g = 1.;
                b = 0.;
        }

        if( t <= (1./6.) )
        {
                r = 1.;
                g = 6. * t;
        }

	return vec3( r, g, b );
}

void
main( )
{
	vec3 tnorm      = normalize( gl_NormalMatrix * gl_Normal );
	vec3 ECposition = vec3( gl_ModelViewMatrix * gl_Vertex );
	vLightIntensity  = abs( dot( normalize(LIGHTPOS - ECposition), tnorm ) );

	
	if( uUseChromaDepth )
	{
		float Z = ECposition.z;
		float t = (2./3.) * ( Z - uChromaRed ) / ( uChromaBlue - uChromaRed );
		t = clamp( t, 0., 2./3. );
		vChromaColor = ChromaDepth( t );
	}
	
	vST = gl_MultiTexCoord0.st;
	
	vMCposition  = gl_Vertex.xyz;
	gl_Position = gl_ModelViewProjectionMatrix * gl_Vertex;
}
