#version 330 compatibility

uniform sampler2D ImageUnit;

uniform float uScenter;
uniform float uTcenter;
uniform float uDs;
uniform float uDt;
uniform float uMagFactor;
uniform float uRotAngle;

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
	if(inLens(vST, false)) {
		vec2 rotST = newST;
		rotST.s = (vST.s - uScenter)*cos(uRotAngle) - (vST.t - uTcenter)*sin(uRotAngle) + uScenter;
		rotST.t = (vST.s - uScenter)*sin(uRotAngle) + (vST.t - uTcenter)*cos(uRotAngle) + uTcenter;
	
		vec2 magST = rotST;
		magST.s = uScenter + (1./uMagFactor)*(rotST.s - uScenter);
		magST.t = uTcenter + (1./uMagFactor)*(rotST.t - uTcenter);
		
		newST = magST;
	}
	
	vec4 rgba = texture2D( ImageUnit,  newST ).rgba;
	gl_FragColor = rgba;
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
	
	return true;
}
