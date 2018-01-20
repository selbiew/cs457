#version 330 compatibility

uniform float uAd;
uniform float uBd;
uniform float uTol;
uniform float uAlpha;
uniform float uNoiseAmp;
uniform float uNoiseFreq;
uniform sampler3D Noise3;

in vec2 vST;
in vec3 vMCposition;
in float vLightIntensity;

const vec4 WHITE = vec4( 1., 1., 1., 1. );
const vec4 vColor = vec4(1.0, 0.5, 0.5, 1.0);

void main( )
{

	vec3 stp = uNoiseFreq * vMCposition;
	vec4 nv = texture(Noise3, stp);
	float sum = nv.r + nv.g + nv.b + nv.a;  //1. -> 3.
	sum = ((sum - 1.) / 2.) * uNoiseAmp;						//0. -> 1.
	
	float Ar = uAd / 2.0;
	float Br = uBd / 2.0;
	
	float s = vST.s + sum;
	float t = vST.t + sum;
	
	int numins = int(s / uAd);
	int numint = int(t / uBd);
	
	float sc = (numins * uAd) + Ar;
	float tc = (numint * uBd) + Br;
	
	float result = pow(float((s - sc) / float(Ar)), 2.0) + pow(float((t - tc) / float(Br)), 2.0);
	
	float mix_t = smoothstep(1.0 - uTol, 1.0 + uTol, result);
	gl_FragColor = mix(vColor, WHITE, mix_t);
	
}