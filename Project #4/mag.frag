#version 330 compatibility

uniform sampler2D ImageUnit;

uniform float uScenter;
uniform float uTcenter;
uniform float uDs;
uniform float uDt;
uniform float uMagFactor;
uniform float uRotAngle;
uniform float uSharpFactor;
uniform float uImageUnit;
uniform float uRadius;
uniform bool uCircleLens;

in vec2 vST;
float	 ResS, ResT;		// texture size

bool inLens (vec2, bool);

void
main( )
{
	ivec2 ires = textureSize( ImageUnit, 0 );
	ResS = float( ires.s );
	ResT = float( ires.t );
	
	
	vec2 newST = vST;
	if(inLens(vST, uCircleLens)) {
		vec2 rotST = newST;
		rotST.s = (vST.s - uScenter)*cos(uRotAngle) - (vST.t - uTcenter)*sin(uRotAngle) + uScenter;
		rotST.t = (vST.s - uScenter)*sin(uRotAngle) + (vST.t - uTcenter)*cos(uRotAngle) + uTcenter;
	
		vec2 magST = rotST;
		magST.s = uScenter + (1./uMagFactor)*(rotST.s - uScenter);
		magST.t = uTcenter + (1./uMagFactor)*(rotST.t - uTcenter);
		
		newST = magST;
	}
	
	vec2 stp0 = vec2(1./ResS, 0. );
	vec2 st0p = vec2(0. , 1./ResT);
	vec2 stpp = vec2(1./ResS, 1./ResT);
	vec2 stpm = vec2(1./ResS, -1./ResT);
	vec3 i00 = texture2D( ImageUnit, newST ).rgb;
	vec3 im1m1 = texture2D( ImageUnit, newST-stpp ).rgb;
	vec3 ip1p1 = texture2D( ImageUnit, newST+stpp ).rgb;
	vec3 im1p1 = texture2D( ImageUnit, newST-stpm ).rgb;
	vec3 ip1m1 = texture2D( ImageUnit, newST+stpm ).rgb;
	vec3 im10 = texture2D( ImageUnit, newST-stp0 ).rgb;
	vec3 ip10 = texture2D( ImageUnit, newST+stp0 ).rgb;
	vec3 i0m1 = texture2D( ImageUnit, newST-st0p ).rgb;
	vec3 i0p1 = texture2D( ImageUnit, newST+st0p ).rgb;
	vec3 target = vec3(0.,0.,0.);
	target += 1.*(im1m1+ip1m1+ip1p1+im1p1);
	target += 2.*(im10+ip10+i0m1+i0p1);
	target += 4.*(i00);
	target /= 16.;

	vec3 irgb = texture2D( ImageUnit,  newST ).rgb;
	gl_FragColor= vec4( mix( target, irgb, uSharpFactor ), 1. );	
}

bool inLens(vec2 vST, bool isCircle) {
	if(!isCircle) {
		if (vST.s > (uScenter + uDs))
			return false;
		if (vST.s < (uScenter - uDs))
			return false;
		if (vST.t > (uTcenter + uDt))
			return false;
		if (vST.t < (uTcenter - uDt))
			return false;
	}
	else {
		if(pow((pow(vST.s - uScenter, 2) + (pow(vST.t - uTcenter, 2))), 0.5) > uRadius)
			return false;
	}
	
	return true;
}
