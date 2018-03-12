#version 330 compatibility

uniform vec4 uColor;
uniform float uNoiseFreq;
uniform float uNoiseAmp;
uniform float uOceanFloorHeight;

uniform sampler3D Noise3;

const vec4 SAND = vec4(1., 0.66, 0.38, 1.0);
const vec4 WATER = vec4(0.0, 0.2, 1.0, 0.7);

in float vLightIntensity;
in vec3 vMCposition;

void main()
{
	if(vMCposition.y > uOceanFloorHeight)
		gl_FragColor = WATER;
	else
		gl_FragColor = SAND;
}