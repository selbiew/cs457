#version 330 compatibility

uniform sampler2D ImageUnit;

uniform float uMagTol;
uniform float uQuantize;

in vec2 vST;

float	 ResS, ResT;		// texture size

void
main( )
{
	ivec2 ires = textureSize( ImageUnit, 0 );
	ResS = float( ires.s );
	ResT = float( ires.t );
	vec4 rgba = texture2D( ImageUnit,  vST ).rgba;

	gl_FragColor = rgba;
}
