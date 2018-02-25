#version 330 compatibility

uniform float uNoiseAmp;
uniform float uNoiseFreq;
uniform float uSideLength;
uniform sampler3D Noise3;

in vec2 vST;
in vec3 vMCposition;
in float vLightIntensity;

const vec4 vColor = vec4(1.0, 0.5, 0.5, 1.0);
const vec4 vGreen = vec4(0.0, 1.0, 0.0, 1.0);

void main( )
{
	vec3 stp = uNoiseFreq * vMCposition;
	vec4 nv = texture(Noise3, stp);
	float sum = nv.r + nv.g + nv.b + nv.a;  //1. -> 3.
	sum = (sum - 2.) * uNoiseAmp;						//0. -> 1.	
	float s = vST.s;
	float t = vST.t;
	int sSquareNum = int(s / uSideLength);
	int tSquareNum = int(t / uSideLength);

	if((sSquareNum + tSquareNum) % 2 == 0) {
		gl_FragColor = vGreen;
	}
	else {
		discard;
	}
}