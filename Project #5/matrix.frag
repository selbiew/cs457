#version 330 compatibility

uniform float uAd;
uniform float uBd;
uniform float uTol;
uniform float uAlpha;
uniform float uNoiseAmp;
uniform float uNoiseFreq;
uniform bool  uUseChromaDepth;
uniform sampler3D Noise3;

in vec2 vST;
in vec3 vMCposition;
in vec3 vChromaColor;
in float vLightIntensity;

const vec4 vColor = vec4(1.0, 0.5, 0.5, 1.0);

void main( )
{

	vec4 WHITE = vec4( 1., 1., 1., uAlpha );
	vec4 vChromaColor4 = vec4( vChromaColor.r, vChromaColor.g, vChromaColor.b, 1.0);

	vec3 stp = uNoiseFreq * vMCposition;
	vec4 nv = texture(Noise3, stp);
	float sum = nv.r + nv.g + nv.b + nv.a;  //1. -> 3.
	sum = (sum - 2.) * uNoiseAmp;						//0. -> 1.
	
	float Ar = uAd / 2.0;
	float Br = uBd / 2.0;
	
	float s = vST.s;
	float t = vST.t;
	
	int numins = int(s / uAd);
	int numint = int(t / uBd);
	
	float sc = (numins * uAd) + Ar;
	float tc = (numint * uBd) + Br;
	
	float dS = s - sc;
	float dT = t - tc;
	
	float oD = pow((pow(dS, 2) + pow(dT, 2)), 0.5);
	float nD = oD + sum;
	
	float scale = nD / oD;
	dS *= scale;
	dT *= scale;
	
	float result = pow(float((dS) / float(Ar)), 2.0) + pow(float((dT) / float(Br)), 2.0);
	
	float mix_t = smoothstep(1.0 - uTol, 1.0 + uTol, result);
	
	if(uUseChromaDepth) {
		gl_FragColor = mix(vChromaColor4, WHITE, mix_t);
	}
	else {
		gl_FragColor = mix(vColor, WHITE, mix_t);
	}
	
	if(gl_FragColor.a == 0.) 
	{
		discard;
	}
}