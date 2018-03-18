#version 330 compatibility

uniform float uKa, uKd, uKs;
uniform vec4 uSpecularColor;
uniform float uShininess;
uniform float uWaterHeight;
uniform float uFloorAmp;
uniform float uFloorFreq;
uniform bool uFlat, uHalf;

uniform sampler3D Noise3;

const vec4 SAND = vec4(0.95, 0.66, 0.41, 1.);
const vec4 WATER = vec4(0., 0., 1., 0.7);

flat in vec3 vNf;
in vec3 vNs;
flat in vec3 vLf;
in vec3 vLs;
flat in vec3 vEf;
in vec3 vEs;

in vec3 vModelCoords;

void
main( )
{
	vec3 Normal;
	vec3 Light;
	vec3 Eye;
	vec4 fragColor = SAND;
	
	vec4 nvx = texture( Noise3, uFloorFreq*vModelCoords );
	float floor_noise = (nvx.r + nvx.g + nvx.b + nvx.a - 2.) * uFloorAmp;
	
	if(vModelCoords.y >= uWaterHeight + floor_noise)
		fragColor = WATER;
	

	
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

	vec4 ambient = uKa * fragColor;
	float d = max( dot(Normal,Light), 0. );
	vec4 diffuse = uKd * d * fragColor;
	float s = 0.;
	if( dot(Normal,Light) > 0. ) // only do specular if the light can see the point
	{
	vec3 ref = normalize( 2. * Normal * dot(Normal,Light) - Light );
	s = pow( max( dot(Eye,ref),0. ), uShininess );
	}
	vec4 specular = uKs * s * uSpecularColor;
	vec4 fFragColor = vec4( ambient.rgb + diffuse.rgb + specular.rgb, fragColor.w );
	
	gl_FragColor = fFragColor;
}