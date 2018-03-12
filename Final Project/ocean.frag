#version 330 compatibility

uniform vec4 uColor;
uniform float uNoiseFreq;
uniform float uNoiseAmp;

uniform sampler3D Noise3;

in float vLightIntensity;

void main()
{
	gl_FragColor = vec4( vLightIntensity*uColor.rgb, 1. );
}