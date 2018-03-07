#version 330 compatibility

uniform float uSideLength;
uniform float uZeroInner;
uniform float uZeroOuter;
uniform float uOneHeight;
uniform float uOneWidth;
uniform float Timer;
uniform float uAnimationSpeed;

uniform sampler3D Noise3;

in vec2 vST;
in vec3 vMCposition;
in float vLightIntensity;

const vec4 vColor = vec4(1.0, 0.5, 0.5, 1.0);
const vec4 vGreen = vec4(0.0, 1.0, 0.0, 1.0);

bool inRadius(float pS, float pT, float cS, float cT, float cR) {
	float sDist = cS - pS;
	float tDist = cT - pT;
	float trueDist = pow((pow(sDist, 2) + pow(tDist, 2)), 0.5);
	
	if(trueDist <= cR)
		return true;
	else
		return false;
}

bool colorFragment(float s, float t) {
	float relOneHeight = uOneHeight * uSideLength;
	float relOneWidth = uOneWidth * uSideLength;
	float relZeroInner = uZeroInner * uSideLength;
	float relZeroOuter = uZeroOuter * uSideLength;
	

	float oneXStart = ((uSideLength / 2.) - relOneWidth) / 2.;
	float oneXEnd = oneXStart + relOneWidth;
	float oneYStart = uSideLength - (uSideLength - relOneHeight) / 2.;
	float oneYEnd = oneYStart + relOneHeight;
	
	if(s >= oneXStart && s < oneXEnd && t >= oneYStart && t < oneYEnd) 
		return true;
	else if(s >= (oneXStart + uSideLength / 2.) && s < (oneXEnd + uSideLength / 2.) 
		  && t >= (oneYStart - uSideLength / 2.) && t < (oneYEnd - uSideLength / 2.)) 
		return true;
	else if(!inRadius(s, t, .75 * uSideLength, .75 * uSideLength, relZeroInner) 
		  && inRadius(s, t, .75 * uSideLength, .75 * uSideLength, relZeroOuter))
		  return true;
	else if(!inRadius(s, t, .25 * uSideLength, .25 * uSideLength, relZeroInner) 
		  && inRadius(s, t, .25 * uSideLength, .25 * uSideLength, relZeroOuter))
		  return true;
	else
		return false;
}

void main()
{
	float s = vST.s;
	float t = vST.t;
	int ySquareNum = int(t / uSideLength);
	float sModifier = sin(float(ySquareNum)) * Timer * uAnimationSpeed;

	if(colorFragment(mod(t, uSideLength), mod(s+sModifier, uSideLength))) {
		gl_FragColor = vGreen;
	}
	else {
		discard;
	}
}