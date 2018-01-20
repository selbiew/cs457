#version 330 compatibility

uniform float uAd;
uniform float uBd;
uniform float uTol;

in vec3 vMCposition;
in float vLightIntensity;
in float s;
in float t;

const vec4 WHITE = vec4( 1., 1., 1., 1. );
const vec4 RED = vec4(1.0, 0.0, 0.0, 1.0);

void main( )
{

	float Ar = uAd / 2.0;
	float Br = uBd / 2.0;
	
	int numins = int(s / uAd);
	int numint = int(t / uBd);
	
	float sc = (numins * uAd) + Ar;
	float tc = (numint * uBd) + Br;
	
	float result = pow((float(s - sc) / float(Ar)), 2.0) + pow((float(t - tc) / float(Br)), 2.0);
	
	float t = smoothstep(1.0 - uTol, 1.0 + uTol, result);
	gl_FragColor = mix(RED, WHITE, t);
	
}