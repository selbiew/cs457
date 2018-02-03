#version 330 compatibility

uniform float uKa, uKd, uKs;
uniform vec4 uColor;
uniform vec4 uSpecularColor;
uniform float uShininess;
uniform float uNoiseFreq;
uniform float uNoiseAmp;
uniform bool uFlat, uHalf;

uniform sampler3D Noise3;

flat in vec3 vNf;
in vec3 vNs;
flat in vec3 vLf;
in vec3 vLs;
flat in vec3 vEf;
in vec3 vEs;
out vec4 fFragColor;
in vec4 pleat_Vertex;

vec3
RotateNormal( float angx, float angy, vec3 n )
{
        float cx = cos( angx );
        float sx = sin( angx );
        float cy = cos( angy );
        float sy = sin( angy );

        // rotate about x:
        float yp =  n.y*cx - n.z*sx;    // y'
        n.z      =  n.y*sx + n.z*cx;    // z'
        n.y      =  yp;
        // n.x      =  n.x;

        // rotate about y:
        float xp =  n.x*cy + n.z*sy;    // x'
        n.z      = -n.x*sy + n.z*cy;    // z'
        n.x      =  xp;
        // n.y      =  n.y;

        return normalize( n );
}

void
main( )
{
	vec3 Normal;
	vec3 Light;
	vec3 Eye;
	
	if( uFlat )
	{
		Normal = normalize(vNf);
		Light = normalize(vLf);
		Eye = normalize(vEf);
	}
	else
	{
		Normal = normalize(vNs);
		Light = normalize(vLs);
		Eye = normalize(vEs);
	}
	
//	vec4 nvx = texture( Noise3, uNoiseFreq*pleat_Vertex.xyz );
//	float angx = nvx.r + nvx.g + nvx.b + nvx.a  -  2.;
//	angx *= uNoiseAmp;
//  vec4 nvy = texture( Noise3, uNoiseFreq*vec3(pleat_Vertex.xy,pleat_Vertex.z+0.5) );
//	float angy = nvy.r + nvy.g + nvy.b + nvy.a  -  2.;
//	angy *= uNoiseAmp;
	
//	Normal = RotateNormal(angx, angy, Normal);
	
	vec4 ambient = uKa * uColor;
	float d = max( dot(Normal,Light), 0. );
	vec4 diffuse = uKd * d * uColor;
	float s = 0.;
	
	if( dot(Normal,Light) > 0. ) // only do specular if the light can see the point
	{
		vec3 ref = normalize( 2. * Normal * dot(Normal,Light) - Light );
		s = pow( max( dot(Eye,ref),0. ), uShininess );
	}
	
	vec4 specular = uKs * s * uSpecularColor;
	fFragColor = vec4( ambient.rgb + diffuse.rgb + specular.rgb, 1. );
}