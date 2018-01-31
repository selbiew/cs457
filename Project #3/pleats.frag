#version 120

flat varying vec3 Nf;
     varying vec3 Ns;
flat varying vec3 Lf;
     varying vec3 Ls;
flat varying vec3 Ef;
     varying vec3 Es;

uniform float uKa, uKd, uKs;

uniform vec4 uColor;
uniform vec4 uSpecularColor;

uniform float uShininess;

uniform bool uFlat;

void
main( )
{
	vec3 Normal;
	vec3 Light;
	vec3 Eye;

	if( uFlat )
	{
		Normal = normalize(Nf);
		Light = normalize(Lf);
		Eye = normalize(Ef);
	}
	else
	{
		Normal = normalize(Ns);
		Light = normalize(Ls);
		Eye = normalize(Es);
	}

	vec4 ambient = uKa * uColor;

	float d = max( dot(Normal,Light), 0. );
	vec4 diffuse = uKd * d * uColor;

	float s = 0.;
	if( dot(Normal,Light) > 0. )		// only do specular if the light can see the point
	{
		vec3 ref = normalize( 2. * Normal * dot(Normal,Light) - Light );
		s = pow( max( dot(Eye,ref),0. ), uShininess );
	}
	vec4 specular = uKs * s * uSpecularColor;

	gl_FragColor = vec4( ambient.rgb + diffuse.rgb + specular.rgb, 1. );

}